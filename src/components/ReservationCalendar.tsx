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
        "relative w-10 h-10 flex items-center justify-center text-sm rounded-lg transition-all duration-150 ";

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
        return base + "bg-primary text-primary-foreground font-semibold shadow-md";
      }
      if (checkOut && isSameDay(date, checkOut)) {
        return base + "bg-primary/70 text-primary-foreground font-semibold shadow-md";
      }
      if (isInRange(date)) {
        return base + "bg-primary/10 text-foreground dark:bg-primary/20";
      }
      return (
        base +
        "hover:bg-accent/60 cursor-pointer text-foreground"
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
      <div className="flex-1 min-w-[280px]">
        <h3 className="text-center font-['Playfair_Display'] font-semibold text-foreground mb-3 capitalize text-lg">
          {format(month, "MMMM yyyy", { locale: ptBR })}
        </h3>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {WEEKDAYS.map((d) => (
            <div
              key={d}
              className="text-center text-xs font-medium text-muted-foreground py-1"
            >
              {d}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
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
    <div className="bg-card rounded-2xl shadow-sm border p-4 sm:p-6">
      {/* Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={handlePrev}
          disabled={!canGoPrev}
          className="p-2 rounded-lg hover:bg-accent/60 disabled:opacity-30 disabled:cursor-default transition-colors"
        >
          <ChevronLeft className="h-5 w-5 text-foreground" />
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="p-2 rounded-lg hover:bg-accent/60 transition-colors"
        >
          <ChevronRight className="h-5 w-5 text-foreground" />
        </button>
      </div>

      {/* Two months side by side */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        {renderMonth(baseMonth)}
        {renderMonth(addMonths(baseMonth, 1))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-muted-foreground mt-5 pt-4 border-t">
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
