import { motion } from "framer-motion";
import { Star, ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-chalet.jpg";
import logoSelo from "@/assets/logo-selo-recanto-pitangal.png";
import { buildWhatsAppUrl } from "@/components/WhatsAppButton";

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
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/60 to-primary/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
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
          <p className="font-body text-primary-foreground/90 text-base md:text-lg uppercase tracking-[0.3em] mb-4">
            Sapucaí-Mirim · Serra da Mantiqueira
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-semibold text-primary-foreground leading-tight mb-6"
        >
          Recanto Pitangal
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-display text-xl md:text-2xl lg:text-3xl text-primary-foreground/90 italic mb-8 max-w-2xl mx-auto"
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
          <div className="flex items-center gap-1.5 bg-primary/40 backdrop-blur-sm rounded-full px-4 py-2">
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span className="font-body text-base text-primary-foreground">5.0 no Google</span>
          </div>
          <div className="flex items-center gap-1.5 bg-primary/40 backdrop-blur-sm rounded-full px-4 py-2">
            <Star className="w-4 h-4 text-gold fill-gold" />
            <span className="font-body text-base text-primary-foreground">Preferido dos Hóspedes · Airbnb</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href={buildWhatsAppUrl("em fazer uma reserva")}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body font-medium bg-gold hover:bg-gold-light text-accent-foreground px-8 py-3.5 rounded-md transition-colors duration-300 text-base uppercase tracking-wider"
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
          >
            Reserve Agora
          </motion.a>
          <a
            href="#gallery"
            className="font-body font-medium border border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-3.5 rounded-md transition-colors duration-300 text-base uppercase tracking-wider"
          >
            Conheça o Chalé
          </a>
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
