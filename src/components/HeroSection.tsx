import { motion } from "framer-motion";
import { ChevronDown, MapPin, Lock, Mountain, Heart, Compass } from "lucide-react";
import heroImage from "@/assets/hero-chalet.jpg";
import logoSelo from "@/assets/logo-selo-recanto-pitangal.png";

const HeroSection = () => {
  const badges = [
    { icon: MapPin, label: "Localização estratégica" },
    { icon: Lock, label: "Refúgio privativo" },
    { icon: Mountain, label: "Clima de serra" },
    { icon: Heart, label: "Experiência a dois" },
    { icon: Compass, label: "Perto dos principais destinos da região" },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Chalé Recanto Pitangal entre as serras da Mantiqueira ao entardecer"
          className="w-full h-full object-cover scale-105"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/70 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_hsl(var(--primary)/0.5)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <img src={logoSelo} alt="Recanto Pitangal selo" className="w-20 h-20 md:w-24 md:h-24 opacity-95" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <p className="font-body text-gold text-xs md:text-sm uppercase tracking-[0.4em] mb-8">
            Sapucaí-Mirim · Serra da Mantiqueira
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-medium text-primary-foreground leading-[1.1] mb-8 tracking-tight"
        >
          Viva a Mantiqueira sem pressa,
          <br className="hidden md:block" />
          <span className="italic text-gold-light"> em um refúgio entre serras</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="font-body text-base md:text-lg text-primary-foreground/90 leading-relaxed mb-5 max-w-3xl mx-auto"
        >
          Hospede-se em Sapucaí-Mirim, perto de Campos do Jordão, Santo Antônio do Pinhal e
          São Bento do Sapucaí, com conforto, privacidade e o clima perfeito para desacelerar.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="font-display italic text-lg md:text-xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto"
        >
          Uma experiência para descansar, explorar a região e voltar para um lugar mais reservado, acolhedor e especial.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <motion.a
            href="/reserva"
            className="font-body font-medium bg-gold hover:bg-gold-light text-accent-foreground px-10 py-4 rounded-md transition-colors duration-300 text-sm uppercase tracking-[0.18em] shadow-2xl"
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 0 0 hsl(var(--gold) / 0)",
                "0 0 0 10px hsl(var(--gold) / 0.25)",
                "0 0 0 0 hsl(var(--gold) / 0)",
              ],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.97 }}
          >
            Consultar datas disponíveis
          </motion.a>
          <a
            href="#gallery"
            className="font-body font-medium border border-primary-foreground/40 text-primary-foreground hover:border-gold hover:text-gold px-10 py-4 rounded-md transition-colors duration-300 text-sm uppercase tracking-[0.18em] backdrop-blur-sm"
          >
            Conheça o Recanto Pitangal
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="font-body text-sm md:text-base text-primary-foreground/70 max-w-xl mx-auto mb-14"
        >
          Conforto, natureza e localização estratégica para viver a serra de um jeito mais tranquilo.
        </motion.p>

        {/* Diferenciais / selos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-8 border-t border-primary-foreground/15 max-w-4xl mx-auto"
        >
          {badges.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-primary-foreground/80"
            >
              <Icon className="w-3.5 h-3.5 text-gold" strokeWidth={1.5} />
              <span className="font-body text-xs md:text-sm tracking-wide">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#gallery"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-primary-foreground/50 hover:text-gold transition-colors z-10"
      >
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </motion.a>
    </section>
  );
};

export default HeroSection;
