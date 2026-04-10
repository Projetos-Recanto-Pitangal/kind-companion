import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ONE_DAY_MS = 86400000;

interface VEvent {
  summary: string;
  startMs: number;
  endMs: number;
}

function parseICSBlockedDates(icsText: string): string[] {
  const lines = icsText.replace(/\r\n /g, '').split(/\r?\n/);
  const events: VEvent[] = [];
  let inEvent = false;
  let dtstart = '';
  let dtend = '';
  let summary = '';

  // Pass 1: collect all events
  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') {
      inEvent = true;
      dtstart = '';
      dtend = '';
      summary = '';
    } else if (line === 'END:VEVENT') {
      if (dtstart && dtend) {
        const start = parseDateUTC(dtstart);
        const end = parseDateUTC(dtend);
        if (start && end && end > start) {
          events.push({ summary, startMs: start, endMs: end });
          console.log(`VEVENT: summary="${summary}" dtstart=${dtstart} dtend=${dtend}`);
        }
      }
      inEvent = false;
    } else if (inEvent) {
      if (line.startsWith('DTSTART')) {
        dtstart = line.split(':').pop() || '';
      } else if (line.startsWith('DTEND')) {
        dtend = line.split(':').pop() || '';
      } else if (line.startsWith('SUMMARY')) {
        summary = line.split(':').pop() || '';
      }
    }
  }

  // Pass 2: generate all blocked dates (DTSTART to DTEND-1 for all events)
  const dates: Set<string> = new Set();
  for (const ev of events) {
    let ms = ev.startMs;
    while (ms < ev.endMs) {
      dates.add(formatDateFromMs(ms));
      ms += ONE_DAY_MS;
    }
  }

  // Pass 3: for ALL events, remove DTSTART if the day before is NOT blocked
  // This makes changeover/preparation days available
  for (const ev of events) {
    const dayBefore = formatDateFromMs(ev.startMs - ONE_DAY_MS);
    const startDay = formatDateFromMs(ev.startMs);
    if (!dates.has(dayBefore)) {
      dates.delete(startDay);
      console.log(`  Changeover: removed ${startDay} (day before ${dayBefore} is free)`);
    } else {
      console.log(`  Kept ${startDay} blocked (day before ${dayBefore} is also blocked)`);
    }
  }

  console.log(`Total blocked dates: ${dates.size}`);
  return Array.from(dates);
}

function parseDateUTC(val: string): number | null {
  const clean = val.replace(/[TZ]/g, '').substring(0, 8);
  if (clean.length === 8) {
    const y = parseInt(clean.substring(0, 4));
    const m = parseInt(clean.substring(4, 6)) - 1;
    const d = parseInt(clean.substring(6, 8));
    return Date.UTC(y, m, d);
  }
  return null;
}

function formatDateFromMs(ms: number): string {
  const d = new Date(ms);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const icalUrl = Deno.env.get('AIRBNB_ICS_URL');
    if (!icalUrl) {
      return new Response(
        JSON.stringify({ success: false, error: 'AIRBNB_ICS_URL not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const icsResponse = await fetch(icalUrl);
    if (!icsResponse.ok) {
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to fetch iCal feed' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const icsText = await icsResponse.text();
    const blockedDates = parseICSBlockedDates(icsText);

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Full sync: delete all existing dates then insert fresh data
    const { error: deleteError } = await supabase
      .from('blocked_dates')
      .delete()
      .neq('id', '00000000-0000-0000-0000-000000000000');

    if (deleteError) {
      console.error('Delete error:', deleteError);
    }

    const rows = blockedDates.map(date => ({ date, source: 'airbnb' }));

    if (rows.length > 0) {
      const { error } = await supabase
        .from('blocked_dates')
        .upsert(rows, { onConflict: 'date' });

      if (error) {
        console.error('Upsert error:', error);
        return new Response(
          JSON.stringify({ success: false, error: 'Database upsert failed' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    return new Response(
      JSON.stringify({ success: true, synced: blockedDates.length }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('sync-ical error:', error);
    return new Response(
      JSON.stringify({ success: false, error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
