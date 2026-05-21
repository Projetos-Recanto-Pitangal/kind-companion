import { motion } from "framer-motion";
import { MapPin, Sparkles, Mountain, Heart, Compass, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import heroBanner from "@/assets/hero-banner-mantiqueira.png";

const seals = [
  { icon: MapPin, label: "Localização estratégica" },
  { icon: Sparkles, label: "Refúgio privativo" },
  { icon: Mountain, label: "Clima de serra" },
  { icon: Heart, label: "Experiência a dois" },
  { icon: Compass, label: "Perto dos principais destinos" },
];

const MantiqueiraHero = () => {
  return (
    <section
      id="mantiqueira-hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBanner}
          alt="Vista da Serra da Mantiqueira ao amanhecer"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, hsla(0, 0%, 0%, 0.75), hsla(0, 0%, 0%, 0.55), hsla(0, 0%, 0%, 0.9))' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, hsla(0, 0%, 0%, 0.45), transparent, hsla(0, 0%, 0%, 0.45))' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-8 py-24 md:py-32 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-body text-primary-foreground/80 text-xs md:text-sm uppercase tracking-[0.4em] mb-8"
        >
          Recanto Pitangal · Serra da Mantiqueira
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.4 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-medium text-primary-foreground leading-[1.1] mb-8 max-w-4xl mx-auto"
        >
          Viva a Mantiqueira sem pressa, em um refúgio entre serras
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="w-16 h-px bg-gold mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-body text-base md:text-lg text-primary-foreground/90 leading-relaxed max-w-3xl mx-auto mb-6"
        >
          Hospede-se em Sapucaí-Mirim, perto de Campos do Jordão, Santo Antônio do Pinhal e São Bento do Sapucaí, com conforto, privacidade e o clima perfeito para desacelerar.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-display italic text-lg md:text-xl text-primary-foreground/85 max-w-2xl mx-auto mb-12"
        >
          Uma experiência para descansar, explorar a região e voltar para um lugar mais reservado, acolhedor e especial.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
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
            href="#hero"
            className="font-body font-medium border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/70 px-9 py-4 rounded-md transition-colors duration-300 text-sm md:text-base uppercase tracking-wider"
          >
            Conheça o Recanto Pitangal
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="font-body text-xs md:text-sm text-primary-foreground/70 italic mb-14 max-w-xl mx-auto"
        >
          Conforto, natureza e localização estratégica para viver a serra de um jeito mais tranquilo.
        </motion.p>

        {/* Seals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:gap-x-8 max-w-4xl mx-auto"
        >
          {seals.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-primary-foreground/85"
            >
              <Icon className="w-4 h-4 text-gold" strokeWidth={1.5} />
              <span className="font-body text-xs md:text-sm tracking-wide">{label}</span>
            </div>
          ))}
        </motion.div>
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