import { useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Leaf, Scale, TreePine, Home, Mountain, Volume2, BedDouble, CloudSun, MessageCircle, HeartPulse, Sun } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { buildWhatsAppUrl } from "@/components/WhatsAppButton";
import celiaImage from "@/assets/celia.jpg";
import TestimonialBar from "@/components/TestimonialBar";
import ComoParticiparHero from "@/components/ComoParticiparHero";
import StorySection from "@/components/StorySection";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const barMessages1 = [
  "Todas as pessoas que passam por esta experiência saem daqui renovadas.",
  "Muitos dos nossos visitantes mudaram completamente suas vidas após a estadia.",
  "Quem vem uma vez, volta sempre — e volta diferente.",
  "A transformação começa quando você decide parar e ouvir seu corpo.",
];

const barMessages2 = [
  "Cada participante descobre seu próprio caminho de cura e equilíbrio.",
  "Pessoas chegam cansadas e partem com uma nova perspectiva de vida.",
  "A reconexão com a natureza desperta algo que estava adormecido.",
  "Aqui, o tempo desacelera e a saúde encontra espaço para florescer.",
];

const barMessages3 = [
  "Um único dia pode ser o início de uma grande transformação.",
  "Muitos visitantes dizem que o Day Use foi o ponto de virada nas suas vidas.",
  "Basta um dia para sentir a diferença que o silêncio e a natureza fazem.",
  "A experiência de um dia planta sementes que duram a vida inteira.",
];

const barMessages4 = [
  "O ambiente acolhedor é parte essencial da transformação.",
  "A Serra da Mantiqueira guarda uma energia que renova corpo e alma.",
  "Muitos chegam para descansar e encontram algo muito maior.",
  "A natureza ao redor cura de formas que a medicina nem sempre alcança.",
];

const barMessages5 = [
  "Sua jornada de recomeço pode começar hoje.",
  "Centenas de pessoas já transformaram suas vidas passando por aqui.",
  "O primeiro passo é sempre o mais corajoso — e o mais importante.",
  "Permita-se essa pausa. Você merece esse cuidado.",
];

const ComoParticipar = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Bloco Célia Rabello - Introdução */}
      <section className="pt-36 pb-6 md:pt-48 md:pb-8 bg-card">
        <div className="max-w-4xl mx-auto px-[20px] md:px-4">
          <motion.div
            {...fadeUp}
            className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
          >
            {/* Foto */}
            <div className="flex-shrink-0">
              <img
                src={celiaImage}
                alt="Célia Rabello - Recanto Pitangal"
                className="w-40 h-40 md:w-52 md:h-52 object-cover rounded-2xl shadow-lg"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Info */}
            <div className="text-center md:text-left">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-2">
                Célia Rabello
              </h2>
              <p className="font-body text-sm text-gold tracking-wide mb-4">
                Naturologista • Chef Vegetariana • Professora • Palestrante
              </p>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-4 max-w-lg">
                Célia atua na área de saúde natural e integrativa, com formação em Gastronomia pelo SENAC e especialização em Medicina Funcional Integrativa. Ao longo de sua trajetória, já impactou mais de 20 mil pessoas com suas práticas e ensinamentos.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <span className="inline-flex items-center gap-1.5 bg-gold/10 text-foreground text-xs font-medium px-3 py-1.5 rounded-full">
                  Saúde natural e integrativa
                </span>
                <span className="inline-flex items-center gap-1.5 bg-gold/10 text-foreground text-xs font-medium px-3 py-1.5 rounded-full">
                  Gastronomia (SENAC)
                </span>
                <span className="inline-flex items-center gap-1.5 bg-gold/10 text-foreground text-xs font-medium px-3 py-1.5 rounded-full">
                  Medicina Funcional Integrativa
                </span>
                <span className="inline-flex items-center gap-1.5 bg-gold/10 text-gold text-xs font-semibold px-3 py-1.5 rounded-full">
                  +20.000 pessoas impactadas
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seção Como Participar */}
      <ComoParticiparHero />

      {/* Nossa História - movido da Home */}
      <StorySection />


      {/* O Ambiente */}
      <section className="py-16 md:py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <p className="font-body text-gold text-sm uppercase tracking-[0.3em] mb-3">O Ambiente</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
              Natureza, silêncio e simplicidade
            </h2>
          </motion.div>
          <motion.p {...fadeUp} className="font-body text-base md:text-lg text-muted-foreground leading-relaxed text-center mb-10">
            O Recanto Pitangal oferece:
          </motion.p>
          <motion.div {...fadeUp} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10">
            {[
              { icon: Home, text: "chalé confortável em meio à natureza" },
              { icon: Mountain, text: "vista para as montanhas da Mantiqueira" },
              { icon: Volume2, text: "ambiente silencioso e acolhedor" },
              { icon: BedDouble, text: "espaço para descanso e reflexão" },
              { icon: CloudSun, text: "clima ideal para desacelerar" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-gold" />
                </div>
                <span className="font-body text-base text-muted-foreground">{item.text}</span>
              </div>
            ))}
          </motion.div>
          <motion.p {...fadeUp} className="font-body text-base md:text-lg text-muted-foreground leading-relaxed text-center italic max-w-2xl mx-auto">
            Muitas pessoas chegam apenas para descansar e acabam encontrando algo ainda mais profundo: um momento de reconexão com a própria vida.
          </motion.p>
        </div>
      </section>
      <TestimonialBar messages={barMessages5} interval={4000} />

      {/* CTA Final */}
      <section className="py-16 md:py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div {...fadeUp}>
            <p className="font-body text-gold text-sm uppercase tracking-[0.3em] mb-3">Venha nos visitar</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-6">
              Conheça o Recanto Pitangal
            </h2>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
              Se você deseja saber mais sobre os períodos de acompanhamento ou sobre a experiência de Day Use, entre em contato conosco.
            </p>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-10">
              O Recanto Pitangal continua sendo uma pousada acolhedora na Serra da Mantiqueira, mas para muitos visitantes também se tornou um lugar de transformação e recomeço.
            </p>
            <a
              href={buildWhatsAppUrl("o Recanto Pitangal")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body font-medium bg-gold hover:bg-gold-light text-accent-foreground px-10 py-4 rounded-md transition-colors duration-300 text-base uppercase tracking-wider"
            >
              <MessageCircle className="w-5 h-5" />
              Falar conosco
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ComoParticipar;
