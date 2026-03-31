import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Star, Bath, Flame, Home } from "lucide-react";

import heroImage from "@/assets/lua-de-mel-fogueira.jpg";
import logoSelo from "@/assets/logo-selo-recanto-pitangal.png";
import { buildWhatsAppUrl } from "@/components/WhatsAppButton";

const WHATSAPP_URL = buildWhatsAppUrl("no pacote de Lua de Mel");

const highlights = [
  { icon: Bath, label: "Banheira com vista panorâmica" },
  { icon: Flame, label: "Lareira charmosa" },
  { icon: Home, label: "Chalé completo e exclusivo" },
  { icon: Star, label: "Nota 5 estrelas no Google" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const LuaDeMelBanner = () => {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Casal curtindo a lareira no Recanto Pitangal"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.7) 100%)" }}
        />
      </div>

      <div className="relative z-10 text-center px-5 max-w-3xl mx-auto py-20">
        <motion.h2
          className="font-display text-3xl sm:text-5xl lg:text-6xl font-semibold leading-tight mb-5"
          style={{ color: "#f5f0e8" }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={1}
        >
          A Lua de Mel perfeita existe,{" "}
          <span className="italic" style={{ color: "hsl(38 50% 55%)" }}>
            e ela acontece aqui.
          </span>
        </motion.h2>
        <motion.p
          className="font-body text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto"
          style={{ color: "rgba(245,240,232,0.8)" }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={2}
        >
          Um refúgio de luxo, privacidade e romance no meio das montanhas. Feito para transformar esse momento em algo inesquecível.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
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

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={4}
        >
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-body font-medium text-sm sm:text-base uppercase tracking-widest rounded-md px-8 py-4 transition-all duration-300 hover:scale-105"
            style={{ background: "hsl(38 50% 55%)", color: "#1a1a1a" }}
          >
            Quero viver essa experiência
          </a>
          <Link
            to="/lua-de-mel"
            className="inline-block font-body font-medium text-sm sm:text-base uppercase tracking-widest rounded-md px-8 py-4 transition-all duration-300 hover:scale-105 ml-4"
            style={{ border: "2px solid hsl(38 50% 55%)", color: "hsl(38 50% 55%)", background: "transparent" }}
          >
            Quero saber mais
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default LuaDeMelBanner;
