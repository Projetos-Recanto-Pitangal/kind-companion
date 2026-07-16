import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Sparkles, Mountain, Heart, Compass, ChevronDown, PawPrint, ArrowRight, Loader2, CalendarCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { format, differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { toast } from "sonner";
import heroBanner from "@/assets/hero-banner-mantiqueira.png";
import ReservationCalendar from "@/components/ReservationCalendar";
import { fetchAvailability } from "@/lib/pousada-api";

const seals = [
  { icon: MapPin, label: "Localização estratégica" },
  { icon: Sparkles, label: "Refúgio privativo" },
  { icon: Mountain, label: "Clima de serra" },
  { icon: Heart, label: "Experiência a dois" },
  { icon: Compass, label: "Perto dos principais destinos" },
];

const MantiqueiraHero = () => {
  const navigate = useNavigate();
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);
  const [loadingCal, setLoadingCal] = useState(true);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [rangeConflict, setRangeConflict] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const now = new Date();
        const currentMonth = format(now, "yyyy-MM");
        const data = await fetchAvailability(currentMonth);
        const blocked: Date[] = [];
        for (const [, days] of Object.entries(data.calendar)) {
          for (const [dateStr, info] of Object.entries(days)) {
            if ((info as any).blocked) blocked.push(new Date(dateStr + "T12:00:00"));
          }
        }
        setBlockedDates(blocked);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingCal(false);
      }
    })();
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
    const conflict = days.some((d) => blockedSet.has(format(d, "yyyy-MM-dd")));
    setRangeConflict(conflict);
    if (conflict) toast.error("Há datas indisponíveis neste período. Escolha outro intervalo.");
  }, [checkIn, checkOut, blockedSet]);

  const handleSelectDate = (date: Date) => {
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(date);
      setCheckOut(null);
      return;
    }
    if (date <= checkIn) {
      setCheckIn(date);
      setCheckOut(null);
      return;
    }
    setCheckOut(date);
  };

  const nights = checkIn && checkOut ? differenceInCalendarDays(checkOut, checkIn) : 0;
  const canContinue = !!(checkIn && checkOut && !rangeConflict && nights > 0);

  const handleContinue = () => {
    if (!canContinue || !checkIn || !checkOut) return;
    const ci = format(checkIn, "yyyy-MM-dd");
    const co = format(checkOut, "yyyy-MM-dd");
    navigate(`/reserva?checkin=${ci}&checkout=${co}`);
  };

  return (
    <section
      id="mantiqueira-hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="Casal em momento romântico à beira da lareira no chalé do Recanto Pitangal"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, hsla(0, 0%, 0%, 0.25), hsla(0, 0%, 0%, 0.2), hsla(0, 0%, 0%, 0.65))' }}
        />
        <div
          className="absolute inset-0 hidden md:block"
          style={{ background: 'linear-gradient(to left, hsla(0, 0%, 0%, 0.55) 0%, hsla(0, 0%, 0%, 0.35) 40%, hsla(0, 0%, 0%, 0.1) 70%, transparent 100%)' }}
        />
        <div
          className="absolute inset-0 md:hidden"
          style={{ background: 'hsla(0, 0%, 0%, 0.35)' }}
        />
      </div>

      {/* Pet Friendly Sticker */}
      <div className="absolute top-20 md:top-28 lg:top-32 inset-x-0 z-30 flex justify-center px-4 pointer-events-none">
        <motion.a
          href="#pet-friendly"
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          whileHover={{ scale: 1.03 }}
          className="pointer-events-auto flex items-center gap-2.5 px-4 py-2 md:px-5 md:py-2.5 rounded-full bg-background/95 backdrop-blur-md border border-gold/50 shadow-2xl hover:border-gold transition-colors whitespace-nowrap"
          aria-label="Pousada pet friendly — saiba mais"
        >
          <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-gold/15 flex items-center justify-center">
            <PawPrint className="w-4 h-4 md:w-[18px] md:h-[18px] text-gold" />
          </div>
          <p className="font-display text-[13px] md:text-[15px] font-semibold text-foreground">
            Seu pet é bem-vindo por aqui
          </p>
        </motion.a>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-40 md:pt-44 pb-24 md:pb-32">
        <div className="md:ml-auto md:w-[58%] lg:w-[52%] text-center md:text-left bg-black/45 md:bg-black/35 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl p-5 sm:p-6 md:p-8 lg:p-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4 }}
          className="font-display text-[1.7rem] sm:text-4xl md:text-5xl lg:text-6xl font-medium text-primary-foreground leading-[1.2] md:leading-[1.15] mb-5 md:mb-6"
        >
          Talvez esse seja o final de semana que vocês estavam precisando
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="w-16 h-px bg-gold mx-auto md:mx-0 mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-body text-base md:text-lg text-primary-foreground/95 leading-relaxed mb-5"
        >
          Entre a rotina, o trabalho e os compromissos, às vezes tudo o que um casal precisa é de uma pausa. Um lugar tranquilo, uma lareira acesa, uma banheira relaxante, um café sem pressa e tempo de qualidade para viver o momento a dois.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center md:justify-start justify-center gap-4 mb-6"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 0 0 rgba(191, 155, 48, 0)",
                "0 0 0 8px rgba(191, 155, 48, 0.3)",
                "0 0 0 0 rgba(191, 155, 48, 0)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-md"
          >
            <Link
              to="/reserva"
              className="inline-block font-body font-medium bg-gold hover:bg-gold-light text-accent-foreground px-8 py-3.5 rounded-md transition-colors duration-300 text-base uppercase tracking-wider"
            >
              Consultar datas disponíveis
            </Link>
          </motion.div>
          <a
            href="#gallery"
            className="font-body font-medium border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/70 px-9 py-4 rounded-md transition-colors duration-300 text-sm md:text-base uppercase tracking-wider"
          >
            Conheça o Recanto Pitangal
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="font-body text-xs md:text-sm text-primary-foreground/75 italic mb-12"
        >
          Conforto, natureza e localização estratégica para viver a serra de um jeito mais tranquilo.
        </motion.p>

        {/* Seals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="flex flex-wrap items-center md:justify-start justify-center gap-x-5 gap-y-3 md:gap-x-6"
        >
          {seals.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-primary-foreground/90"
            >
              <Icon className="w-4 h-4 text-gold" strokeWidth={1.5} />
              <span className="font-body text-xs md:text-sm tracking-wide">{label}</span>
            </div>
          ))}
        </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/60 hover:text-gold transition-colors"
        aria-label="Rolar para a próxima seção"
      >
        <ChevronDown className="w-7 h-7 animate-bounce" />
      </motion.a>
    </section>
  );
};

export default MantiqueiraHero;