import { motion } from "framer-motion";
import { PawPrint, Shield, Trees, Sparkles } from "lucide-react";
import { buildWhatsAppUrl } from "@/components/WhatsAppButton";
import petImage from "@/assets/pet-friendly-chale.jpg";

const highlights = [
  {
    icon: Shield,
    title: "Área cercada com alambrado",
    desc: "Espaço externo seguro ao redor do chalé para o seu pet ficar à vontade.",
  },
  {
    icon: PawPrint,
    title: "Mais liberdade para o pet",
    desc: "Lugar para correr, brincar e descansar durante o dia ou à noite.",
  },
  {
    icon: Trees,
    title: "Em meio à natureza",
    desc: "Ar puro da Mantiqueira, gramado e contato direto com o verde.",
  },
];

const PetFriendlySection = () => {
  return (
    <section id="pet-friendly" className="py-16 md:py-28 lg:py-36 bg-background scroll-mt-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 mb-5">
            <Sparkles className="w-4 h-4 text-gold" />
            <p className="font-body text-gold text-sm lg:text-base uppercase tracking-[0.25em]">
              Novidade
            </p>
          </div>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 lg:mb-6">
            Novidade para quem vem com pets
          </h2>
          <p className="font-body text-muted-foreground max-w-2xl lg:max-w-3xl mx-auto text-lg md:text-xl lg:text-2xl leading-relaxed">
            Mais liberdade, conforto e segurança para o seu melhor amigo.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={petImage}
              alt="Cachorro feliz descansando no gramado ao lado do chalé na Mantiqueira"
              loading="lazy"
              width={1024}
              height={1024}
              className="w-full h-full object-cover aspect-[4/5] lg:aspect-square"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 flex items-center gap-2 px-4 py-2 rounded-full bg-background/90 backdrop-blur-sm border border-border">
              <PawPrint className="w-4 h-4 text-gold" />
              <span className="font-body text-sm text-foreground font-medium">
                Pet Friendly de verdade
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-7"
          >
            <div className="space-y-5">
              <p className="font-body text-foreground text-lg lg:text-xl leading-relaxed">
                Pensando nas famílias que viajam acompanhadas dos seus pets, criamos uma{" "}
                <strong className="text-gold">área externa cercada com alambrado</strong>{" "}
                ao redor do chalé. Esse espaço permite que os tutores deixem seus animaizinhos
                mais livres durante o dia ou em alguns momentos da noite, sempre com mais
                tranquilidade e segurança.
              </p>
              <p className="font-body text-muted-foreground text-base lg:text-lg leading-relaxed">
                Assim, o pet também pode aproveitar melhor a estadia, circular com mais
                liberdade, brincar, descansar e viver momentos especiais junto à família, em
                contato com a natureza.
              </p>
            </div>

            <ul className="space-y-4">
              {highlights.map(({ icon: Icon, title, desc }) => (
                <li
                  key={title}
                  className="flex gap-4 p-4 rounded-xl bg-secondary/60 border border-border"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-full bg-gold/15 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-base lg:text-lg font-semibold text-foreground mb-1">
                      {title}
                    </h3>
                    <p className="font-body text-sm lg:text-base text-muted-foreground leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href={buildWhatsAppUrl(
                "Disponibilidade Pet Friendly",
                "Olá! Gostaria de verificar disponibilidade para uma estadia com meu pet na Pousada Recanto Pitangal."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-gold text-primary-foreground font-body font-semibold text-base lg:text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              <PawPrint className="w-5 h-5" />
              Ver disponibilidade para minha estadia com pet
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PetFriendlySection;