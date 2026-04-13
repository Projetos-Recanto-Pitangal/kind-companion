import { useState, useEffect, useMemo } from "react";
import { format, differenceInCalendarDays, eachDayOfInterval, addMonths } from "date-fns";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReservationCalendar from "@/components/ReservationCalendar";
import ReservationForm from "@/components/ReservationForm";
import { Button } from "@/components/ui/button";
import { Loader2, XCircle, CalendarCheck, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { fetchAvailability, checkPeriod, type CheckResponse } from "@/lib/pousada-api";

type Step = "calendar" | "form";

export default function Reserva() {
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [rangeConflict, setRangeConflict] = useState(false);
  const [step, setStep] = useState<Step>("calendar");
  const [priceInfo, setPriceInfo] = useState<CheckResponse | null>(null);
  const [checkingPrice, setCheckingPrice] = useState(false);

  // Fetch blocked dates from external API
  useEffect(() => {
    async function fetchBlocked() {
      try {
        const now = new Date();
        const currentMonth = format(now, "yyyy-MM");
        const data = await fetchAvailability(currentMonth);

        const blocked: Date[] = [];
        for (const [, days] of Object.entries(data.calendar)) {
          for (const [dateStr, info] of Object.entries(days)) {
            if (info.blocked) {
              blocked.push(new Date(dateStr + "T12:00:00"));
            }
          }
        }
        setBlockedDates(blocked);
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

  // Check availability and price when both dates are selected
  useEffect(() => {
    if (!checkIn || !checkOut) {
      setRangeConflict(false);
      setPriceInfo(null);
      return;
    }

    // Quick local check for blocked days in range
    const days = eachDayOfInterval({ start: checkIn, end: checkOut });
    const hasLocalConflict = days.some((d) => blockedSet.has(format(d, "yyyy-MM-dd")));

    if (hasLocalConflict) {
      setRangeConflict(true);
      setPriceInfo(null);
      toast.error("Há datas indisponíveis neste período. Por favor, escolha outro intervalo.");
      return;
    }

    // Call external API for definitive check + pricing
    setCheckingPrice(true);
    setRangeConflict(false);
    setPriceInfo(null);

    const ciStr = format(checkIn, "yyyy-MM-dd");
    const coStr = format(checkOut, "yyyy-MM-dd");

    checkPeriod(ciStr, coStr)
      .then((result) => {
        if (!result.available) {
          setRangeConflict(true);
          setPriceInfo(null);
          toast.error("Estas datas não estão disponíveis. Por favor, escolha outro período.");
        } else {
          setRangeConflict(false);
          setPriceInfo(result);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Erro ao verificar disponibilidade. Tente novamente.");
      })
      .finally(() => setCheckingPrice(false));
  }, [checkIn, checkOut, blockedSet]);

  const handleSelectDate = (date: Date) => {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
      setRangeConflict(false);
      setPriceInfo(null);
      return;
    }
    if (date <= checkIn) {
      setCheckIn(date);
      setCheckOut(null);
      setRangeConflict(false);
      setPriceInfo(null);
      return;
    }
    setCheckOut(date);
  };

  const nights = checkIn && checkOut ? differenceInCalendarDays(checkOut, checkIn) : 0;
  const canContinue = checkIn && checkOut && !rangeConflict && !checkingPrice && nights > 0 && priceInfo?.available;

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
                    Estas datas não estão disponíveis. Por favor, escolha outro período.
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
                  <p className="text-sm text-muted-foreground mb-2">
                    Total: <span className="font-semibold text-foreground">{nights} noite{nights > 1 ? "s" : ""}</span>
                  </p>
                )}

                {checkingPrice && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Verificando disponibilidade e preço…
                  </div>
                )}

                {priceInfo?.available && priceInfo.totalPrice !== null && (
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-4">
                    <p className="text-sm text-muted-foreground">Valor total do período:</p>
                    <p className="text-2xl font-bold text-primary">
                      R$ {priceInfo.totalPrice.toLocaleString("pt-BR", { minimumFractionDigits: 0 })}
                    </p>
                    {priceInfo.breakdown && priceInfo.breakdown.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Média de R$ {Math.round(priceInfo.totalPrice / priceInfo.nights).toLocaleString("pt-BR")} por noite
                      </p>
                    )}
                  </div>
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
              totalPrice={priceInfo?.totalPrice ?? null}
              onBack={() => setStep("calendar")}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
