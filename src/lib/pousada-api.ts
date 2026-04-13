const API_BASE = "https://pousada-sync-production.up.railway.app";

export interface DayInfo {
  available: boolean;
  blocked: boolean;
  past: boolean;
}

export interface AvailabilityResponse {
  updatedAt: string;
  calendar: Record<string, Record<string, DayInfo>>;
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
}

export async function fetchAvailability(month: string): Promise<AvailabilityResponse> {
  const res = await fetch(`${API_BASE}/availability?month=${month}`);
  if (!res.ok) throw new Error("Erro ao buscar disponibilidade.");
  return res.json();
}

export async function checkPeriod(checkin: string, checkout: string): Promise<CheckResponse> {
  const res = await fetch(`${API_BASE}/check?checkin=${encodeURIComponent(checkin)}&checkout=${encodeURIComponent(checkout)}`);
  if (!res.ok) throw new Error("Erro ao verificar período.");
  return res.json();
}
