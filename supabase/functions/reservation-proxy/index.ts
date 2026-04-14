import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const API_BASE = "https://pousada-sync-production.up.railway.app";
const ONE_DAY_MS = 86400000;

interface DayInfo {
  available: boolean;
  blocked: boolean;
  past: boolean;
}

interface BlockedDateRow {
  date: string;
}

function jsonResponse(payload: unknown) {
  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function formatUtcDate(date: Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function enumerateDates(start: string, endExclusive: string) {
  const dates: string[] = [];
  let current = new Date(`${start}T00:00:00Z`);
  const end = new Date(`${endExclusive}T00:00:00Z`);

  while (current < end) {
    dates.push(formatUtcDate(current));
    current = new Date(current.getTime() + ONE_DAY_MS);
  }

  return dates;
}

function buildCalendarFromBlockedDates(blockedDates: string[], seedMonth?: string) {
  const calendar: Record<string, Record<string, DayInfo>> = {};
  const today = formatUtcDate(new Date());

  if (seedMonth) {
    calendar[seedMonth] = {};
  }

  for (const date of blockedDates) {
    const month = date.slice(0, 7);
    if (!calendar[month]) {
      calendar[month] = {};
    }

    calendar[month][date] = {
      available: false,
      blocked: true,
      past: date < today,
    };
  }

  return calendar;
}

function createAdminClient() {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );
}

async function readAllBlockedDates() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("blocked_dates")
    .select("date")
    .order("date", { ascending: true });

  if (error) throw error;
  return (data ?? []).map((row: BlockedDateRow) => row.date);
}

async function readBlockedDatesInRange(checkin: string, checkout: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("blocked_dates")
    .select("date")
    .gte("date", checkin)
    .lt("date", checkout)
    .order("date", { ascending: true });

  if (error) throw error;
  return (data ?? []).map((row: BlockedDateRow) => row.date);
}

async function fetchExternal(path: string) {
  const response = await fetch(`${API_BASE}${path}`);

  if (!response.ok) {
    throw new Error(`EXTERNAL_${response.status}`);
  }

  return response.json();
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const body = req.method === "POST" ? await req.json().catch(() => ({})) : {};
    const action = body.action ?? url.searchParams.get("action") ?? "availability";

    if (action === "availability") {
      const month = body.month ?? url.searchParams.get("month") ?? formatUtcDate(new Date()).slice(0, 7);

      try {
        const data = await fetchExternal(`/availability?month=${encodeURIComponent(month)}`);
        return jsonResponse(data);
      } catch (externalError) {
        console.error("reservation-proxy availability external error:", externalError);

        try {
          const blockedDates = await readAllBlockedDates();
          return jsonResponse({
            updatedAt: new Date().toISOString(),
            calendar: buildCalendarFromBlockedDates(blockedDates, month),
            fallback: true,
            error: "SERVICE_UNAVAILABLE",
          });
        } catch (fallbackError) {
          console.error("reservation-proxy availability fallback error:", fallbackError);
          return jsonResponse({
            updatedAt: new Date().toISOString(),
            calendar: buildCalendarFromBlockedDates([], month),
            fallback: true,
            error: "SERVICE_UNAVAILABLE",
          });
        }
      }
    }

    if (action === "check") {
      const checkin = body.checkin ?? url.searchParams.get("checkin");
      const checkout = body.checkout ?? url.searchParams.get("checkout");

      if (!checkin || !checkout) {
        return jsonResponse({
          checkin,
          checkout,
          nights: 0,
          available: false,
          totalPrice: null,
          priceSource: "fallback",
          breakdown: [],
          updatedAt: new Date().toISOString(),
          fallback: true,
          error: "INVALID_DATES",
        });
      }

      try {
        const data = await fetchExternal(
          `/check?checkin=${encodeURIComponent(checkin)}&checkout=${encodeURIComponent(checkout)}`
        );
        return jsonResponse(data);
      } catch (externalError) {
        console.error("reservation-proxy check external error:", externalError);

        try {
          const blockedDates = await readBlockedDatesInRange(checkin, checkout);
          const blockedSet = new Set(blockedDates);
          const nights = enumerateDates(checkin, checkout).length;
          const breakdown = enumerateDates(checkin, checkout).map((date) => ({
            date,
            available: !blockedSet.has(date),
            price: null,
          }));
          const available = blockedDates.length === 0;

          return jsonResponse({
            checkin,
            checkout,
            nights,
            available,
            totalPrice: null,
            priceSource: "fallback",
            breakdown,
            updatedAt: new Date().toISOString(),
            fallback: true,
            error: "SERVICE_UNAVAILABLE",
          });
        } catch (fallbackError) {
          console.error("reservation-proxy check fallback error:", fallbackError);
          return jsonResponse({
            checkin,
            checkout,
            nights: enumerateDates(checkin, checkout).length,
            available: false,
            totalPrice: null,
            priceSource: "fallback",
            breakdown: [],
            updatedAt: new Date().toISOString(),
            fallback: true,
            error: "SERVICE_UNAVAILABLE",
          });
        }
      }
    }

    return jsonResponse({
      fallback: true,
      error: "INVALID_ACTION",
    });
  } catch (error) {
    console.error("reservation-proxy fatal error:", error);
    return jsonResponse({
      fallback: true,
      error: "INTERNAL_ERROR",
    });
  }
});
