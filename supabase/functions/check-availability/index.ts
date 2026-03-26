import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function parseICSEvents(icsText: string): { start: string; end: string }[] {
  const events: { start: string; end: string }[] = [];
  const lines = icsText.replace(/\r\n /g, '').split(/\r?\n/);
  let inEvent = false;
  let dtstart = '';
  let dtend = '';

  for (const line of lines) {
    if (line === 'BEGIN:VEVENT') {
      inEvent = true;
      dtstart = '';
      dtend = '';
    } else if (line === 'END:VEVENT') {
      if (dtstart && dtend) {
        events.push({ start: dtstart, end: dtend });
      }
      inEvent = false;
    } else if (inEvent) {
      if (line.startsWith('DTSTART')) {
        const val = line.split(':').pop() || '';
        dtstart = normalizeDate(val);
      } else if (line.startsWith('DTEND')) {
        const val = line.split(':').pop() || '';
        dtend = normalizeDate(val);
      }
    }
  }
  return events;
}

function normalizeDate(val: string): string {
  // Airbnb .ics uses VALUE=DATE:20250401 or 20250401T000000Z
  const clean = val.replace(/[TZ]/g, '').substring(0, 8);
  if (clean.length === 8) {
    return `${clean.substring(0, 4)}-${clean.substring(4, 6)}-${clean.substring(6, 8)}`;
  }
  return val;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const icsUrl = Deno.env.get('AIRBNB_ICS_URL');
    if (!icsUrl) {
      return new Response(
        JSON.stringify({ error: 'Calendário não configurado. Configure a URL do calendário .ics.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const icsResponse = await fetch(icsUrl);
    if (!icsResponse.ok) {
      return new Response(
        JSON.stringify({ error: 'Não foi possível acessar o calendário do Airbnb.' }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const icsText = await icsResponse.text();
    const blockedRanges = parseICSEvents(icsText);

    // If client sends check-in/check-out, validate
    let available: boolean | null = null;
    let conflictMessage: string | null = null;

    if (req.method === 'POST') {
      const body = await req.json();
      const { checkIn, checkOut } = body;

      if (checkIn && checkOut) {
        const ciDate = new Date(checkIn);
        const coDate = new Date(checkOut);

        for (const range of blockedRanges) {
          const bStart = new Date(range.start);
          const bEnd = new Date(range.end);
          // Overlap: ciDate < bEnd && coDate > bStart
          if (ciDate < bEnd && coDate > bStart) {
            available = false;
            conflictMessage = 'Estas datas não estão disponíveis. Por favor, escolha outro período.';
            break;
          }
        }
        if (available === null) available = true;
      }
    }

    return new Response(
      JSON.stringify({
        blockedRanges,
        ...(available !== null ? { available, conflictMessage } : {}),
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in check-availability:', error);
    return new Response(
      JSON.stringify({ error: 'Erro interno ao verificar disponibilidade.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
