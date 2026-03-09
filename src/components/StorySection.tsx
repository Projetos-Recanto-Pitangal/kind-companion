import { motion } from "framer-motion";
import { Instagram, Youtube } from "lucide-react";

const StorySection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="font-body text-gold text-sm uppercase tracking-[0.3em] mb-3">Nossa história</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground">
            No coração da Serra da Mantiqueira
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 space-y-5"
          >
            <p className="font-body text-muted-foreground text-base md:text-lg leading-relaxed">
              No silêncio das montanhas de Sapucaí-Mirim, em meio à natureza preservada da Serra da Mantiqueira, existe um lugar onde muitas pessoas têm buscado algo que vai além do descanso: reencontrar equilíbrio, saúde e sentido para a própria vida.
            </p>
            <p className="font-body text-muted-foreground text-base md:text-lg leading-relaxed">
              O Recanto Pitangal nasceu como uma pousada, um refúgio de tranquilidade e contemplação. Com o tempo, também passou a acolher pessoas que buscam um período de cuidado com o corpo, a mente e o espírito por meio de práticas naturais e acompanhamento baseado em princípios de saúde integrativa.
            </p>
            <p className="font-body text-muted-foreground text-base md:text-lg leading-relaxed">
              Algumas dessas experiências foram registradas pelo youtuber Chico Abelha durante uma visita ao local, onde ele entrevistou Célia Rabelo e conheceu um pouco do trabalho desenvolvido ali.
            </p>
            <p className="font-body text-foreground text-base md:text-lg leading-relaxed font-medium italic">
              Mais do que um espaço de hospedagem, o Recanto Pitangal se tornou, para muitos visitantes, um lugar de pausa, recuperação e transformação.
            </p>

            {/* Social links */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="https://www.instagram.com/celiarabello7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-gold transition-colors"
              >
                <Instagram className="w-5 h-5" />
                @celiarabello7
              </a>
              <a
                href="https://www.instagram.com/chico.abelha"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-gold transition-colors"
              >
                <Instagram className="w-5 h-5" />
                @chico.abelha
              </a>
              <a
                href="https://www.youtube.com/@chicoabelha"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-gold transition-colors"
              >
                <Youtube className="w-5 h-5" />
                Chico Abelha
              </a>
            </div>
          </motion.div>

          {/* Video */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/2 w-full"
          >
            <div className="rounded-lg overflow-hidden shadow-lg aspect-video">
              <iframe
                src="https://www.youtube.com/embed/VIDEO_ID"
                title="Chico Abelha - Um Centro de Cura em Sapucaí-Mirim"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
