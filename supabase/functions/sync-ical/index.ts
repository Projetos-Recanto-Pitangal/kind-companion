import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const ONE_DAY_MS = 86400000;

function parseICSBlockedDates(icsText: string): string[] {
  const lines = icsText.replace(/\r\n /g, '').split(/\r?\n/);
  const dates: Set<string> = new Set();
  let inEvent = false;
  let dtstart = '';
  let dtend = '';
  let summary = '';

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
        const isReserved = summary.toLowerCase().startsWith('reserved');

        console.log(`VEVENT: summary="${summary}" isReserved=${isReserved} dtstart=${dtstart} dtend=${dtend}`);

        if (start && end && end > start) {
          // For "Reserved" events: DTSTART is a changeover day (available for new check-ins)
          //   -> block from DTSTART+1 to DTEND-1 (exclusive end, so iterate < end)
          // For "Not available" events: block all days from DTSTART to DTEND-1
          const blockStart = isReserved ? start + ONE_DAY_MS : start;
          const blockEnd = end; // DTEND is exclusive in iCal spec

          const generatedDays: string[] = [];
          let ms = blockStart;
          while (ms < blockEnd) {
            const day = formatDateFromMs(ms);
            dates.add(day);
            generatedDays.push(day);
            ms += ONE_DAY_MS;
          }
          if (generatedDays.length > 0) {
            console.log(`  -> blocked ${generatedDays.length} days: ${generatedDays[0]} to ${generatedDays[generatedDays.length - 1]}`);
          } else {
            console.log(`  -> no days blocked (single-day reserved event = changeover only)`);
          }
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
  return Array.from(dates);
}

// Parse date string like "20260416" into UTC timestamp (ms)
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
