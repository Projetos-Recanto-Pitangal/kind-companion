import { motion } from "framer-motion";
import { Star, ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-chalet.jpg";
import logoSelo from "@/assets/logo-selo-recanto-pitangal.png";

const HeroSection = () => {
  return (
    <section id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Chalé Recanto Pitangal ao entardecer com fogueira e montanhas"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div
          className="absolute inset-0"
        style={{ background: 'linear-gradient(to top, hsla(0, 0%, 0%, 0.90), hsla(0, 0%, 0%, 0.60), hsla(0, 0%, 0%, 0.30))' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl lg:max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <img src={logoSelo} alt="Recanto Pitangal selo" className="w-20 h-20 md:w-28 md:h-28" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <p className="font-body text-primary-foreground/90 text-base md:text-lg lg:text-xl uppercase tracking-[0.3em] mb-4 lg:mb-6">
            Sapucaí-Mirim · Serra da Mantiqueira
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-display text-4xl md:text-6xl lg:text-8xl font-semibold text-primary-foreground leading-tight mb-6 lg:mb-8"
        >
          Recanto Pitangal
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-display text-xl md:text-2xl lg:text-4xl text-primary-foreground/90 italic mb-8 lg:mb-12 max-w-2xl lg:max-w-3xl mx-auto leading-relaxed"
        >
          Um refúgio exclusivo para dois, onde a natureza encontra o romance
        </motion.p>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-10"
        >
          <div className="flex items-center gap-1.5 bg-primary/40 backdrop-blur-sm rounded-full px-4 py-2 lg:px-6 lg:py-3">
            <Star className="w-4 h-4 lg:w-5 lg:h-5 text-gold fill-gold" />
            <span className="font-body text-base lg:text-lg text-primary-foreground">5.0 no Google</span>
          </div>
          <div className="flex items-center gap-1.5 bg-primary/40 backdrop-blur-sm rounded-full px-4 py-2 lg:px-6 lg:py-3">
            <Star className="w-4 h-4 lg:w-5 lg:h-5 text-gold fill-gold" />
            <span className="font-body text-base lg:text-lg text-primary-foreground">Preferido dos Hóspedes · Airbnb</span>
          </div>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#gallery"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary-foreground/60 hover:text-gold transition-colors"
      >
        <ChevronDown className="w-8 h-8 animate-bounce" />
      </motion.a>
    </section>
  );
};

export default HeroSection;
