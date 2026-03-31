import { useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Leaf, Scale, TreePine, Home, Mountain, Volume2, BedDouble, CloudSun, MessageCircle, HeartPulse, Sun } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { buildWhatsAppUrl } from "@/components/WhatsAppButton";
import TestimonialBar from "@/components/TestimonialBar";
import ComoParticiparHero from "@/components/ComoParticiparHero";

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

      {/* Seção Como Participar */}
      <ComoParticiparHero />

      {/* Hero / Intro */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-card">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.p {...fadeUp} className="font-body text-gold text-sm uppercase tracking-[0.3em] mb-4">
            Um convite para desacelerar
          </motion.p>
          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-8"
          >
            Às vezes o corpo pede <span className="text-gold">pausa</span>
          </motion.h1>
          <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.2 }} className="space-y-5 font-body text-lg md:text-xl text-muted-foreground leading-relaxed">
            <p>No meio da correria da vida moderna, muitas pessoas começam a perceber sinais de cansaço profundo.</p>
            <p className="text-foreground font-medium italic">
              O corpo pede descanso.<br />
              A mente pede silêncio.<br />
              A alma pede reconexão.
            </p>
            <p>Foi justamente desse desejo de mudança que nasceu uma nova história no Recanto Pitangal.</p>
          </motion.div>
        </div>
      </section>
      <TestimonialBar messages={barMessages1} />

      {/* Story */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-3xl mx-auto px-4 space-y-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
          <motion.p {...fadeUp}>
            Localizado em meio às montanhas da Serra da Mantiqueira, o espaço começou como uma pousada tranquila, um lugar para descansar e se afastar do ritmo acelerado das cidades.
          </motion.p>
          <motion.p {...fadeUp}>Mas com o tempo, algo especial começou a acontecer ali.</motion.p>
          <motion.p {...fadeUp}>
            Algumas pessoas passaram a buscar o local não apenas para descansar, mas para cuidar da própria saúde de forma mais profunda.
          </motion.p>
          <motion.p {...fadeUp}>
            Foi nesse contexto que o trabalho de <span className="text-foreground font-semibold">Célia Rabello</span> encontrou seu lugar no Recanto Pitangal.
          </motion.p>
          <motion.p {...fadeUp}>
            Depois de anos trabalhando na área de publicidade e enfrentando problemas de saúde, ela decidiu transformar sua própria vida. Ao estudar e aplicar princípios naturais de cuidado com o corpo e mudança de hábitos, experimentou uma grande transformação pessoal.
          </motion.p>
          <motion.p {...fadeUp}>A partir dessa experiência, começou a orientar outras pessoas que buscavam caminhos semelhantes.</motion.p>
          <motion.p {...fadeUp}>Hoje, algumas dessas experiências acontecem no ambiente acolhedor da pousada.</motion.p>
          <motion.p {...fadeUp}>
            Ali, em meio ao silêncio da natureza, muitas pessoas passam alguns dias desacelerando, reorganizando hábitos e redescobrindo formas mais simples de viver.
          </motion.p>
          <motion.p {...fadeUp} className="text-foreground font-medium">Não se trata de promessas ou fórmulas prontas.</motion.p>
          <motion.p {...fadeUp} className="text-foreground font-medium italic">É apenas um convite para voltar ao essencial.</motion.p>
          <motion.p {...fadeUp} className="text-foreground italic">
            Respirar o ar puro das montanhas.<br />
            Descansar.<br />
            Cuidar do corpo.<br />
            E lembrar que, muitas vezes, a natureza ainda guarda respostas que esquecemos de ouvir.
          </motion.p>
        </div>
      </section>
      <TestimonialBar messages={barMessages2} interval={5000} />

      {/* Períodos de Acompanhamento */}
      <section className="py-20 md:py-28 bg-card">
        <div className="max-w-4xl mx-auto px-[20px] md:px-4">
          <motion.div
            {...fadeUp}
            className="relative bg-background border-2 border-gold/30 rounded-2xl shadow-[0_8px_40px_-12px_rgba(191,155,48,0.15)] p-8 md:p-12 overflow-hidden"
          >
            {/* Decorative accent */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-gold/60 via-gold to-gold/60" />

            <div className="text-center mb-10">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center ring-4 ring-gold/10">
                  <HeartPulse className="w-8 h-8 text-gold" />
                </div>
              </div>
              <p className="font-body text-gold text-sm uppercase tracking-[0.3em] mb-3">Períodos de Acompanhamento</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                Dias dedicados ao cuidado com a saúde
              </h2>
            </div>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto mb-10">
              Em determinados períodos, o Recanto Pitangal recebe pessoas que desejam passar alguns dias em um ambiente tranquilo, com orientação sobre práticas naturais de saúde.
            </p>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed text-center mb-8">
              Durante esse tempo, os participantes podem:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-10">
              {[
                { icon: RefreshCw, text: "reorganizar hábitos de vida" },
                { icon: Leaf, text: "aprender práticas naturais de cuidado com o corpo" },
                { icon: Scale, text: "experimentar rotinas mais equilibradas" },
                { icon: TreePine, text: "descansar em meio à natureza" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-gold" />
                  </div>
                  <span className="font-body text-base text-muted-foreground leading-snug pt-2">{item.text}</span>
                </div>
              ))}
            </div>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed text-center italic mb-8">
              Cada experiência é única e respeita o momento de cada pessoa.
            </p>
            <div className="text-center">
              <a
                href={buildWhatsAppUrl("participar dos dias de cuidados com a saúde")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body font-medium bg-gold hover:bg-gold-light text-accent-foreground px-10 py-4 rounded-md transition-colors duration-300 text-base uppercase tracking-wider"
              >
                <MessageCircle className="w-5 h-5" />
                Quero Participar
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      <TestimonialBar messages={barMessages3} interval={4500} />

      {/* Day Use */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-3xl mx-auto px-[20px] md:px-4">
          <motion.div
            {...fadeUp}
            className="relative bg-card border-2 border-gold/30 rounded-2xl shadow-[0_8px_40px_-12px_rgba(191,155,48,0.15)] p-8 md:p-12 overflow-hidden"
          >
            {/* Decorative accent */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-gold/60 via-gold to-gold/60" />

            <div className="text-center mb-10">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center ring-4 ring-gold/10">
                  <Sun className="w-8 h-8 text-gold" />
                </div>
              </div>
              <p className="font-body text-gold text-sm uppercase tracking-[0.3em] mb-3">Day Use Terapêutico</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground">
                Uma experiência de cuidado em um único dia
              </h2>
            </div>
            <div className="space-y-5 font-body text-base md:text-lg text-muted-foreground leading-relaxed text-center">
              <p>
                Para quem deseja conhecer o espaço ou iniciar esse processo de forma mais breve, também existe a opção de Day Use.
              </p>
              <p>
                Nesta modalidade, a pessoa passa o dia no Recanto Pitangal, utilizando o chalé e participando de algumas práticas naturais de cuidado e relaxamento.
              </p>
              <p className="italic">
                É uma forma de vivenciar o ambiente e iniciar um processo de reconexão com a saúde.
              </p>
            </div>
            <div className="text-center mt-8">
              <a
                href={buildWhatsAppUrl("a experiência de Day Use")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-body font-medium bg-gold hover:bg-gold-light text-accent-foreground px-10 py-4 rounded-md transition-colors duration-300 text-base uppercase tracking-wider"
              >
                <MessageCircle className="w-5 h-5" />
                Quero Participar
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      <TestimonialBar messages={barMessages4} interval={5500} />

      {/* O Ambiente */}
      <section className="py-20 md:py-28 bg-card">
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
      <section className="py-20 md:py-28 bg-background">
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
              href="https://wa.me/5535984011430?text=Ol%C3%A1%2C%20acabo%20de%20vir%20do%20site%20e%20gostaria%20de%20saber%20mais%20sobre%20o%20Recanto%20Pitangal."
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
