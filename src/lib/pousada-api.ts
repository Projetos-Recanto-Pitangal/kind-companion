import { supabase } from "@/integrations/supabase/client";

export interface DayInfo {
  available: boolean;
  blocked: boolean;
  past: boolean;
}

export interface AvailabilityResponse {
  updatedAt: string;
  calendar: Record<string, Record<string, DayInfo>>;
  fallback?: boolean;
  error?: string;
}

export interface CheckResponse {
  checkin: string;
  checkout: string;
  nights: number;
  available: boolean;
  totalPrice: number | null;
  priceSource: string;
  breakdown: { date: string; available: boolean; price: number | null }[];
  updatedAt: string;
  fallback?: boolean;
  error?: string;
}

async function invokeReservationProxy<T>(body: Record<string, string>): Promise<T> {
  const { data, error } = await supabase.functions.invoke("reservation-proxy", {
    body,
  });

  if (error || !data) {
    throw new Error("Erro ao carregar dados de reserva.");
  }

  return data as T;
}

export async function fetchAvailability(month: string): Promise<AvailabilityResponse> {
  return invokeReservationProxy<AvailabilityResponse>({
    action: "availability",
    month,
  });
}

export async function checkPeriod(checkin: string, checkout: string): Promise<CheckResponse> {
  return invokeReservationProxy<CheckResponse>({
    action: "check",
    checkin,
    checkout,
  });
}
