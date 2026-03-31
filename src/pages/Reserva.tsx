import { useState, useEffect, useMemo } from "react";
import { format, eachDayOfInterval, parseISO, isWithinInterval, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CalendarIcon, CheckCircle, XCircle, Loader2 } from "lucide-react";

interface BlockedRange {
  start: string;
  end: string;
}

import { buildWhatsAppUrl } from "@/components/WhatsAppButton";

const WHATSAPP_URL = buildWhatsAppUrl("fazer uma pré-reserva");

export default function Reserva() {
  const [blockedRanges, setBlockedRanges] = useState<BlockedRange[]>([]);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [checkIn, setCheckIn] = useState<Date | undefined>();
  const [checkOut, setCheckOut] = useState<Date | undefined>();
  const [result, setResult] = useState<{ available: boolean; message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch blocked dates on mount
  useEffect(() => {
    async function fetchBlocked() {
      try {
        const { data, error: fnError } = await supabase.functions.invoke("check-availability", {
          method: "GET",
        });
        if (fnError) throw fnError;
        if (data?.error) {
          setError(data.error);
        } else {
          setBlockedRanges(data.blockedRanges || []);
        }
      } catch (e: any) {
        console.error(e);
        setError("Não foi possível carregar as datas do calendário.");
      } finally {
        setLoading(false);
      }
    }
    fetchBlocked();
  }, []);

  // Compute all blocked individual dates for calendar visual
  const blockedDates = useMemo(() => {
    const dates: Date[] = [];
    for (const range of blockedRanges) {
      try {
        const start = parseISO(range.start);
        const end = parseISO(range.end);
        // end is exclusive in Airbnb .ics, so we go up to end - 1 day
        if (end > start) {
          const days = eachDayOfInterval({ start, end: addDays(end, -1) });
          dates.push(...days);
        }
      } catch { /* skip invalid */ }
    }
    return dates;
  }, [blockedRanges]);

  const handleCheckAvailability = async () => {
    if (!checkIn || !checkOut) return;
    setChecking(true);
    setResult(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke("check-availability", {
        body: {
          checkIn: format(checkIn, "yyyy-MM-dd"),
          checkOut: format(checkOut, "yyyy-MM-dd"),
        },
      });
      if (fnError) throw fnError;
      if (data?.available === true) {
        setResult({ available: true, message: "Datas disponíveis! Você pode prosseguir com a pré-reserva." });
      } else {
        setResult({
          available: false,
          message: data?.conflictMessage || "Estas datas não estão disponíveis.",
        });
      }
    } catch (e: any) {
      console.error(e);
      setResult({ available: false, message: "Erro ao verificar disponibilidade. Tente novamente." });
    } finally {
      setChecking(false);
    }
  };

  const isDateBlocked = (date: Date) => {
    return blockedDates.some(
      (bd) =>
        bd.getFullYear() === date.getFullYear() &&
        bd.getMonth() === date.getMonth() &&
        bd.getDate() === date.getDate()
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Consulte a Disponibilidade
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Selecione as datas de check-in e check-out para verificar se o período está disponível no Recanto Pitangal.
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Carregando calendário…</p>
            </div>
          ) : error ? (
            <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6 text-center max-w-lg mx-auto">
              <XCircle className="h-8 w-8 text-destructive mx-auto mb-3" />
              <p className="text-destructive font-medium">{error}</p>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Calendars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Check-in */}
                <div className="bg-card rounded-2xl shadow-sm border p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CalendarIcon className="h-5 w-5 text-accent" />
                    <h2 className="font-semibold text-foreground">Check-in</h2>
                  </div>
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={(d) => {
                      setCheckIn(d);
                      setResult(null);
                    }}
                    disabled={(date) => date < new Date() || isDateBlocked(date)}
                    locale={ptBR}
                    className="pointer-events-auto mx-auto"
                    modifiers={{ blocked: blockedDates }}
                    modifiersClassNames={{ blocked: "line-through text-destructive opacity-50" }}
                  />
                  {checkIn && (
                    <p className="mt-3 text-sm text-center text-muted-foreground">
                      Selecionado: <span className="font-medium text-foreground">{format(checkIn, "dd/MM/yyyy")}</span>
                    </p>
                  )}
                </div>

                {/* Check-out */}
                <div className="bg-card rounded-2xl shadow-sm border p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <CalendarIcon className="h-5 w-5 text-accent" />
                    <h2 className="font-semibold text-foreground">Check-out</h2>
                  </div>
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={(d) => {
                      setCheckOut(d);
                      setResult(null);
                    }}
                    disabled={(date) =>
                      date < new Date() ||
                      (checkIn ? date <= checkIn : false) ||
                      isDateBlocked(date)
                    }
                    locale={ptBR}
                    className="pointer-events-auto mx-auto"
                    modifiers={{ blocked: blockedDates }}
                    modifiersClassNames={{ blocked: "line-through text-destructive opacity-50" }}
                  />
                  {checkOut && (
                    <p className="mt-3 text-sm text-center text-muted-foreground">
                      Selecionado: <span className="font-medium text-foreground">{format(checkOut, "dd/MM/yyyy")}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Action */}
              <div className="flex flex-col items-center gap-4">
                <Button
                  size="lg"
                  className="min-w-[280px] text-base"
                  disabled={!checkIn || !checkOut || checking}
                  onClick={handleCheckAvailability}
                >
                  {checking ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verificando…
                    </>
                  ) : (
                    "Verificar Disponibilidade"
                  )}
                </Button>

                {/* Result */}
                {result && (
                  <div
                    className={`flex items-center gap-3 rounded-xl p-5 max-w-lg w-full ${
                      result.available
                        ? "bg-primary/10 border border-primary/30"
                        : "bg-destructive/10 border border-destructive/30"
                    }`}
                  >
                    {result.available ? (
                      <CheckCircle className="h-6 w-6 text-primary shrink-0" />
                    ) : (
                      <XCircle className="h-6 w-6 text-destructive shrink-0" />
                    )}
                    <p className={result.available ? "text-primary font-medium" : "text-destructive font-medium"}>
                      {result.message}
                    </p>
                  </div>
                )}

                {result?.available && (
                  <Button
                    size="lg"
                    className="min-w-[280px] text-base bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={() => window.open(WHATSAPP_URL, "_blank")}
                  >
                    Falar sobre pré-reserva no WhatsApp
                  </Button>
                )}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-destructive/50 inline-block" />
                  Indisponível
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary inline-block" />
                  Selecionado
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
