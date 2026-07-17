import { useState, useMemo, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isBefore,
  isAfter,
  startOfDay,
  differenceInCalendarDays,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

interface ReservationCalendarProps {
  blockedDates: Date[];
  checkIn: Date | null;
  checkOut: Date | null;
  onSelectDate: (date: Date) => void;
}

function isDateInSet(date: Date, set: Set<string>): boolean {
  return set.has(format(date, "yyyy-MM-dd"));
}

export default function ReservationCalendar({
  blockedDates,
  checkIn,
  checkOut,
  onSelectDate,
}: ReservationCalendarProps) {
  const [baseMonth, setBaseMonth] = useState(() => startOfMonth(new Date()));

  const blockedSet = useMemo(() => {
    const s = new Set<string>();
    blockedDates.forEach((d) => s.add(format(d, "yyyy-MM-dd")));
    return s;
  }, [blockedDates]);

  const today = useMemo(() => startOfDay(new Date()), []);

  const handlePrev = () => setBaseMonth((m) => subMonths(m, 1));
  const handleNext = () => setBaseMonth((m) => addMonths(m, 1));

  const isBlocked = useCallback(
    (date: Date) => isDateInSet(date, blockedSet),
    [blockedSet]
  );

  const isPast = useCallback(
    (date: Date) => isBefore(date, today),
    [today]
  );

  const isInRange = useCallback(
    (date: Date) => {
      if (!checkIn || !checkOut) return false;
      return isAfter(date, checkIn) && isBefore(date, checkOut);
    },
    [checkIn, checkOut]
  );

  const getDayClass = useCallback(
    (date: Date, currentMonth: Date) => {
      const base =
        "relative w-9 h-9 sm:w-11 sm:h-11 lg:w-14 lg:h-14 flex items-center justify-center text-[13px] sm:text-base lg:text-lg rounded-lg transition-all duration-150 ";

      if (!isSameMonth(date, currentMonth)) {
        return base + "text-transparent pointer-events-none";
      }
      if (isPast(date)) {
        return base + "text-muted-foreground/40 cursor-default";
      }
      if (isBlocked(date)) {
        return (
          base +
          "bg-destructive/15 text-destructive/60 line-through cursor-default"
        );
      }
      if (checkIn && isSameDay(date, checkIn)) {
        return base + "bg-primary text-primary-foreground font-semibold shadow-md ring-2 ring-gold/60";
      }
      if (checkOut && isSameDay(date, checkOut)) {
        return base + "bg-primary/80 text-primary-foreground font-semibold shadow-md ring-2 ring-gold/60";
      }
      if (isInRange(date)) {
        return base + "bg-primary/15 text-foreground dark:bg-primary/25";
      }
      return (
        base +
        "hover:bg-gold/15 hover:text-foreground cursor-pointer text-foreground/90"
      );
    },
    [isPast, isBlocked, checkIn, checkOut, isInRange]
  );

  const handleClick = (date: Date) => {
    if (isPast(date) || isBlocked(date)) return;
    onSelectDate(date);
  };

  const renderMonth = (month: Date) => {
    const monthStart = startOfMonth(month);
    const monthEnd = endOfMonth(month);
    const calStart = startOfWeek(monthStart, { weekStartsOn: 0 });
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 0 });
    const days = eachDayOfInterval({ start: calStart, end: calEnd });

    const weeks: Date[][] = [];
    for (let i = 0; i < days.length; i += 7) {
      weeks.push(days.slice(i, i + 7));
    }

    return (
      <div className="flex-1 min-w-0 sm:min-w-[280px]">
        <h3 className="text-center font-['Playfair_Display'] font-semibold text-foreground mb-3 capitalize text-base sm:text-lg lg:text-xl">
          {format(month, "MMMM yyyy", { locale: ptBR })}
        </h3>
        <div className="grid grid-cols-7 gap-1 lg:gap-1.5 mb-1">
          {WEEKDAYS.map((d) => (
            <div
              key={d}
              className="text-center text-[10px] sm:text-xs lg:text-sm font-medium text-muted-foreground/80 py-1 uppercase tracking-wider"
            >
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 lg:gap-1.5 justify-items-center">
          {weeks.flat().map((date, i) => {
            const blocked = isBlocked(date) && isSameMonth(date, month) && !isPast(date);
            const dayEl = (
              <button
                key={i}
                type="button"
                onClick={() => handleClick(date)}
                className={getDayClass(date, month)}
                disabled={isPast(date) || blocked}
              >
                {isSameMonth(date, month) ? date.getDate() : ""}
              </button>
            );

            if (blocked) {
              return (
                <Tooltip key={i}>
                  <TooltipTrigger asChild>{dayEl}</TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">
                    Indisponível
                  </TooltipContent>
                </Tooltip>
              );
            }
            return dayEl;
          })}
        </div>
      </div>
    );
  };

  const canGoPrev = !isBefore(subMonths(baseMonth, 1), startOfMonth(today));

  return (
    <div className="bg-gradient-to-br from-card to-card/95 rounded-3xl shadow-xl border border-gold/20 p-3 sm:p-6 lg:p-8 backdrop-blur-sm">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-4 px-1">
        <button
          type="button"
          onClick={handlePrev}
          disabled={!canGoPrev}
          className="p-2 rounded-full hover:bg-gold/15 disabled:opacity-30 disabled:cursor-default transition-colors border border-transparent hover:border-gold/30"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="p-2 rounded-full hover:bg-gold/15 transition-colors border border-transparent hover:border-gold/30"
        >
          <ChevronRight className="h-5 w-5 text-foreground" />
        </button>
      </div>

      {/* Mobile: single month. Desktop: two months side by side */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 lg:gap-16">
        {renderMonth(baseMonth)}
        <div className="hidden sm:block flex-1 min-w-0 sm:min-w-[280px]">
          {renderMonth(addMonths(baseMonth, 1))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-muted-foreground mt-5 pt-4 border-t border-border/60">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-destructive/20 border border-destructive/30 inline-block" />
          Indisponível
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-primary inline-block" />
          Check-in
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-primary/70 inline-block" />
          Check-out
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-primary/10 border border-primary/20 inline-block" />
          Período
        </div>
      </div>
    </div>
  );
}
