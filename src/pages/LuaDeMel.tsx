import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Star, Bath, Flame, Home, ShoppingCart, Car, MessageCircle, ChevronDown, Heart } from "lucide-react";
import heroImage from "@/assets/lua-de-mel-hero.jpg";
import lareiraImage from "@/assets/lua-de-mel-fogueira.jpg";
import logoSelo from "@/assets/logo-selo-recanto-pitangal.png";

import { buildWhatsAppUrl } from "@/components/WhatsAppButton";

const WHATSAPP_URL = buildWhatsAppUrl("no pacote de Lua de Mel");

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const highlights = [
  { icon: Bath, label: "Banheira com vista panorâmica" },
  { icon: Flame, label: "Lareira charmosa" },
  { icon: Home, label: "Chalé completo e exclusivo" },
  { icon: Star, label: "Nota 5 estrelas no Google" },
];

const amenities = [
  { icon: Bath, label: "Hidromassagem com vista" },
  { icon: Flame, label: "Lareira aconchegante" },
  { icon: Home, label: "Cozinha equipada" },
  { icon: ShoppingCart, label: "Mini mercearia com preços justos" },
  { icon: Car, label: "Estacionamento privativo" },
];

const testimonials = [
  {
    name: "Ana & Rafael",
    text: "Simplesmente perfeito. Melhor escolha que fizemos para nossa lua de mel. Cada detalhe foi pensado com carinho.",
    rating: 5,
  },
  {
    name: "Camila & Lucas",
    text: "Tudo impecável, muito mais do que esperávamos. A vista da banheira é de tirar o fôlego. Voltaremos com certeza!",
    rating: 5,
  },
  {
    name: "Juliana & Marcos",
    text: "O lugar mais romântico que já conhecemos. A lareira, o silêncio, a natureza… perfeito para quem busca momentos únicos.",
    rating: 5,
  },
];

const LuaDeMel = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <div className="min-h-screen" style={{ background: "#0d0d0d", color: "#f5f0e8" }}>
      {/* Fixed WhatsApp Button */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-5 py-3.5 font-body text-sm font-medium shadow-2xl"
        style={{ background: "#25D366", color: "#fff" }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline">Fale conosco</span>
      </motion.a>

      {/* ── HERO with Parallax ── */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img
            src={heroImage}
            alt="Banheira com vista para montanhas ao entardecer"
            className="w-full h-full object-cover scale-110"
            fetchPriority="high"
            decoding="async"
          />
        </motion.div>
        <motion.div className="absolute inset-0" style={{ opacity: heroOpacity, background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.7) 100%)" }} />

        <div className="relative z-10 text-center px-5 max-w-3xl mx-auto">
          <motion.img
            src={logoSelo}
            alt="Recanto Pitangal"
            className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0}
          />
          <motion.h1
            className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-5"
            style={{ color: "#f5f0e8" }}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            A Lua de Mel perfeita existe,{" "}
            <span className="italic" style={{ color: "hsl(38 50% 55%)" }}>
              e ela acontece aqui.
            </span>
          </motion.h1>
          <motion.p
            className="font-body text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto"
            style={{ color: "rgba(245,240,232,0.8)" }}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            Um refúgio de luxo, privacidade e romance no meio das montanhas. Feito para transformar esse momento em algo inesquecível.
          </motion.p>

          {/* Highlights */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-10"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            {highlights.map((h) => (
              <div
                key={h.label}
                className="flex items-center gap-2 rounded-full px-4 py-2 text-xs sm:text-sm font-body"
                style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <h.icon className="w-4 h-4" style={{ color: "hsl(38 50% 55%)" }} />
                <span style={{ color: "#f5f0e8" }}>{h.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-body font-medium text-sm sm:text-base uppercase tracking-widest rounded-md px-8 py-4 transition-all duration-300"
            style={{ background: "hsl(38 50% 55%)", color: "#1a1a1a" }}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(191,155,48,0.4)" }}
            whileTap={{ scale: 0.97 }}
          >
            Quero viver essa experiência
          </motion.a>
        </div>

        <motion.a
          href="#emocional"
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 2.5 }}
        >
          <ChevronDown className="w-7 h-7 animate-bounce" style={{ color: "hsl(38 50% 55%)" }} />
        </motion.a>
      </section>

      {/* ── EMOTIONAL SECTION ── */}
      <section id="emocional" className="py-20 md:py-32 px-5" style={{ background: "#111" }}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            custom={0}
          >
            <Heart className="w-8 h-8 mx-auto mb-6" style={{ color: "hsl(38 50% 55%)", opacity: 0.6 }} />
          </motion.div>
          {[
            "Imagine chegar em um lugar onde o tempo desacelera…",
            "Onde o silêncio das montanhas encontra o calor da lareira.",
            "Onde vocês dois podem simplesmente viver o momento, sem pressa, sem distrações.",
            "Aqui, cada detalhe foi pensado para criar memórias inesquecíveis.",
          ].map((line, i) => (
            <motion.p
              key={i}
              className="font-display text-lg sm:text-xl md:text-2xl leading-relaxed mb-4 last:mb-0"
              style={{ color: i === 3 ? "hsl(38 50% 55%)" : "rgba(245,240,232,0.85)" }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              custom={i + 1}
            >
              {i === 3 ? <em>{line}</em> : line}
            </motion.p>
          ))}
        </div>
      </section>

      {/* ── LUXURY & EXCLUSIVITY ── */}
      <section className="py-20 md:py-28 px-5" style={{ background: "#0d0d0d" }}>
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <img
              src={lareiraImage}
              alt="Lareira aconchegante no chalé"
              className="w-full rounded-lg shadow-2xl"
              loading="lazy"
              decoding="async"
              width={1200}
              height={800}
            />
          </motion.div>
          <div>
            <motion.h2
              className="font-display text-2xl sm:text-4xl font-semibold mb-6 leading-tight"
              style={{ color: "#f5f0e8" }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              Uma experiência de{" "}
              <span style={{ color: "hsl(38 50% 55%)" }}>luxo e exclusividade</span>{" "}
              na sua lua de mel.
            </motion.h2>
            <motion.p
              className="font-body text-sm sm:text-base leading-relaxed mb-8"
              style={{ color: "rgba(245,240,232,0.7)" }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
            >
              Não é apenas uma hospedagem.
              <br />
              É um espaço pensado para casais que valorizam conforto, privacidade e momentos únicos.
            </motion.p>
            <div className="space-y-4">
              {amenities.map((a, i) => (
                <motion.div
                  key={a.label}
                  className="flex items-center gap-4"
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i + 2}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: "rgba(191,155,48,0.12)", border: "1px solid rgba(191,155,48,0.2)" }}
                  >
                    <a.icon className="w-5 h-5" style={{ color: "hsl(38 50% 55%)" }} />
                  </div>
                  <span className="font-body text-sm sm:text-base" style={{ color: "rgba(245,240,232,0.9)" }}>
                    {a.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PAIN POINT ── */}
      <section className="py-20 md:py-28 px-5 relative overflow-hidden" style={{ background: "#0a0a0a" }}>
        <div
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 50% 50%, hsl(38 50% 55%) 0%, transparent 60%)" }}
        />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.p
            className="font-body text-xs uppercase tracking-[0.3em] mb-6"
            style={{ color: "hsl(38 50% 55%)" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            A verdade que ninguém conta
          </motion.p>
          {[
            "A verdade é que muitos casais se frustram na Lua de Mel…",
            "Lugares comuns, sem privacidade, sem clima…",
            "E um momento que deveria ser único acaba sendo só mais uma viagem.",
          ].map((line, i) => (
            <motion.p
              key={i}
              className="font-display text-lg sm:text-xl md:text-2xl leading-relaxed mb-3"
              style={{ color: "rgba(245,240,232,0.7)" }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i + 1}
            >
              {line}
            </motion.p>
          ))}
          <motion.p
            className="font-display text-xl sm:text-2xl md:text-3xl font-semibold mt-6"
            style={{ color: "hsl(38 50% 55%)" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
          >
            Aqui, isso não acontece.
          </motion.p>
        </div>
      </section>

      {/* ── IDEAL DESTINATION ── */}
      <section className="py-20 md:py-28 px-5" style={{ background: "#111" }}>
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            className="font-display text-2xl sm:text-4xl font-semibold mb-6 leading-tight"
            style={{ color: "#f5f0e8" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            O destino certo para quem sonha com a{" "}
            <span className="italic" style={{ color: "hsl(38 50% 55%)" }}>
              Lua de Mel perfeita
            </span>
          </motion.h2>
          {[
            "Existem muitos lugares…",
            "Mas poucos são realmente inesquecíveis.",
            "A escolha certa transforma tudo.",
          ].map((line, i) => (
            <motion.p
              key={i}
              className="font-body text-base sm:text-lg leading-relaxed mb-2 last:mb-0"
              style={{ color: i === 2 ? "hsl(38 50% 55%)" : "rgba(245,240,232,0.7)" }}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i + 1}
            >
              {i === 2 ? <em>{line}</em> : line}
            </motion.p>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 md:py-28 px-5" style={{ background: "#0d0d0d" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-14"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <p className="font-body text-xs uppercase tracking-[0.3em] mb-3" style={{ color: "hsl(38 50% 55%)" }}>
              Prova social
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-semibold" style={{ color: "#f5f0e8" }}>
              Quem já viveu, recomenda
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="rounded-lg p-6 md:p-8 relative"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-current" style={{ color: "hsl(38 50% 55%)" }} />
                  ))}
                </div>
                <p
                  className="font-body text-sm leading-relaxed mb-5 italic"
                  style={{ color: "rgba(245,240,232,0.8)" }}
                >
                  "{t.text}"
                </p>
                <span className="font-display text-sm font-semibold" style={{ color: "hsl(38 50% 55%)" }}>
                  {t.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 md:py-36 px-5 relative overflow-hidden" style={{ background: "#0a0a0a" }}>
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(ellipse at 50% 100%, hsl(38 50% 55%) 0%, transparent 50%)" }}
        />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <Heart className="w-6 h-6 mx-auto mb-6" style={{ color: "hsl(38 50% 55%)", opacity: 0.5 }} />
          </motion.div>
          <motion.h2
            className="font-display text-2xl sm:text-4xl font-semibold mb-4 leading-tight"
            style={{ color: "#f5f0e8" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
          >
            A sua Lua de Mel merece mais do que o básico.
          </motion.h2>
          <motion.p
            className="font-display text-lg sm:text-xl italic mb-10"
            style={{ color: "hsl(38 50% 55%)" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={2}
          >
            Merece ser lembrada para sempre.
          </motion.p>
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-body font-medium text-sm sm:text-base uppercase tracking-widest rounded-md px-8 py-4 transition-all duration-300"
            style={{ background: "hsl(38 50% 55%)", color: "#1a1a1a" }}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(191,155,48,0.4)" }}
            whileTap={{ scale: 0.97 }}
          >
            Ver disponibilidade agora no WhatsApp
          </motion.a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-8 px-5 text-center" style={{ background: "#080808", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <img src={logoSelo} alt="Recanto Pitangal" className="w-10 h-10 mx-auto mb-3 opacity-50" loading="lazy" />
        <p className="font-body text-xs" style={{ color: "rgba(245,240,232,0.3)" }}>
          © {new Date().getFullYear()} Recanto Pitangal · Sapucaí-Mirim, MG
        </p>
      </footer>
    </div>
  );
};

export default LuaDeMel;
