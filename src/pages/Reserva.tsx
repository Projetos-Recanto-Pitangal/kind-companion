import { useState, useEffect, useMemo } from "react";
import { format, parseISO, differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReservationCalendar from "@/components/ReservationCalendar";
import ReservationForm from "@/components/ReservationForm";
import { Button } from "@/components/ui/button";
import { Loader2, XCircle, CalendarCheck, ArrowRight } from "lucide-react";
import { toast } from "sonner";

type Step = "calendar" | "form";

export default function Reserva() {
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [rangeConflict, setRangeConflict] = useState(false);
  const [step, setStep] = useState<Step>("calendar");

  useEffect(() => {
    async function fetchBlocked() {
      try {
        const { data, error: dbError } = await supabase
          .from("blocked_dates")
          .select("date");
        if (dbError) throw dbError;
        const dates = (data || []).map((r: { date: string }) => parseISO(r.date));
        setBlockedDates(dates);
      } catch (e: any) {
        console.error(e);
        setError("Não foi possível carregar as datas do calendário.");
      } finally {
        setLoading(false);
      }
    }
    fetchBlocked();
  }, []);

  const blockedSet = useMemo(() => {
    const s = new Set<string>();
    blockedDates.forEach((d) => s.add(format(d, "yyyy-MM-dd")));
    return s;
  }, [blockedDates]);

  useEffect(() => {
    if (!checkIn || !checkOut) {
      setRangeConflict(false);
      return;
    }
    const days = eachDayOfInterval({ start: checkIn, end: checkOut });
    const hasConflict = days.some((d) => blockedSet.has(format(d, "yyyy-MM-dd")));
    setRangeConflict(hasConflict);
    if (hasConflict) {
      toast.error("Há datas indisponíveis neste período. Por favor, escolha outro intervalo.");
    }
  }, [checkIn, checkOut, blockedSet]);

  const handleSelectDate = (date: Date) => {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
      setRangeConflict(false);
      return;
    }
    if (date <= checkIn) {
      setCheckIn(date);
      setCheckOut(null);
      setRangeConflict(false);
      return;
    }
    setCheckOut(date);
  };

  const nights = checkIn && checkOut ? differenceInCalendarDays(checkOut, checkIn) : 0;
  const canContinue = checkIn && checkOut && !rangeConflict && nights > 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h1 className="font-['Playfair_Display'] text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Reservas
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {step === "calendar"
                ? "Selecione as datas de check-in e check-out para verificar a disponibilidade."
                : "Preencha seus dados para solicitar a reserva."}
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
          ) : step === "calendar" ? (
            <div className="space-y-6">
              <ReservationCalendar
                blockedDates={blockedDates}
                checkIn={checkIn}
                checkOut={checkOut}
                onSelectDate={handleSelectDate}
              />

              {rangeConflict && (
                <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 flex items-center gap-3 max-w-lg mx-auto">
                  <XCircle className="h-5 w-5 text-destructive shrink-0" />
                  <p className="text-destructive text-sm font-medium">
                    Há datas indisponíveis neste período. Por favor, escolha outro intervalo.
                  </p>
                </div>
              )}

              <div className="bg-card rounded-2xl shadow-sm border p-5 max-w-lg mx-auto">
                <div className="flex items-center gap-2 mb-4">
                  <CalendarCheck className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold text-foreground">Resumo</h2>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                  <div>
                    <span className="text-muted-foreground">Check-in:</span>
                    <p className="font-medium text-foreground">
                      {checkIn ? format(checkIn, "dd/MM/yyyy") : "—"}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Check-out:</span>
                    <p className="font-medium text-foreground">
                      {checkOut ? format(checkOut, "dd/MM/yyyy") : "—"}
                    </p>
                  </div>
                </div>
                {nights > 0 && (
                  <p className="text-sm text-muted-foreground mb-4">
                    Total: <span className="font-semibold text-foreground">{nights} noite{nights > 1 ? "s" : ""}</span>
                  </p>
                )}
                {canContinue && (
                  <Button
                    size="lg"
                    className="w-full text-base gap-2"
                    onClick={() => setStep("form")}
                  >
                    Continuar para reserva
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <ReservationForm
              checkIn={checkIn!}
              checkOut={checkOut!}
              onBack={() => setStep("calendar")}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
