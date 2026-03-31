import { motion } from "framer-motion";
import { MessageCircle, Home, Leaf, Calendar, Utensils, Droplets, Sun, Mountain, Flame, Dumbbell, TreePine, FlaskConical, Bath } from "lucide-react";
import ExperienciasGallery from "./ExperienciasGallery";
import { buildWhatsAppUrl } from "@/components/WhatsAppButton";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7 },
};

const imersaoDates = [
  { label: "19 a 26 de maio" },
  { label: "16 a 23 de junho" },
  { label: "19 a 26 de agosto" },
  { label: "23 a 30 de setembro" },
];

const included = [
  { icon: Leaf, text: "Aulas práticas" },
  { icon: Droplets, text: "Terapias naturais (água, terra, sol, banho turco)" },
  { icon: Utensils, text: "Alimentação vegetariana completa" },
  { icon: Flame, text: "Pães e pizzas de fermentação natural" },
  { icon: FlaskConical, text: "Massas artesanais do zero" },
  { icon: Bath, text: "Produção de itens naturais (sabão, cremes, extratos)" },
  { icon: Sun, text: "Sauna natural" },
  { icon: Dumbbell, text: "Atividades físicas simples" },
  { icon: Mountain, text: "Caminhadas e banhos de cachoeira" },
];

const ComoParticiparHero = () => {
  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28 bg-card">
      <div className="max-w-4xl mx-auto px-[20px] md:px-4">
        {/* Title + Intro */}
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="font-body text-gold text-sm uppercase tracking-[0.3em] mb-4">Recanto Pitangal</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight mb-6">
            Como <span className="text-gold">participar</span>
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            No Recanto Pitangal, você pode viver essa experiência de duas formas: hospedagem no chalé ou participação nas imersões conduzidas pela Célia Rabello.
          </p>
          <p className="font-body text-base text-muted-foreground mt-3 max-w-2xl mx-auto">
            Escolha a opção que mais faz sentido para você e entre em contato para receber todos os detalhes.
          </p>
        </motion.div>

        {/* Two cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Card 1 - Hospedagem */}
          <motion.div
            {...fadeUp}
            className="relative bg-background border border-border rounded-2xl p-8 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                <Home className="w-6 h-6 text-gold" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-foreground">Hospedagem no chalé</h2>
            </div>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-6">
              Uma experiência de descanso, conexão com a natureza e possibilidade de vivenciar práticas naturais no seu próprio ritmo.
            </p>
            <div className="space-y-3 mb-8 flex-1">
              {[
                { label: "Segunda a quinta (até 3 pessoas)", price: "R$ 3.000,00" },
                { label: "Segunda a quinta (4 pessoas)", price: "R$ 3.500,00" },
                { label: "Sexta a domingo (até 4 pessoas)", price: "R$ 3.500,00" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                  <span className="font-body text-sm text-muted-foreground">{item.label}</span>
                  <span className="font-display text-base font-semibold text-foreground whitespace-nowrap ml-4">{item.price}</span>
                </div>
              ))}
            </div>
            <a
              href={hospedagemLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-body font-medium bg-gold hover:bg-gold-light text-accent-foreground px-8 py-4 rounded-lg transition-colors duration-300 text-base w-full"
            >
              <MessageCircle className="w-5 h-5" />
              Falar sobre hospedagem
            </a>
          </motion.div>

          {/* Card 2 - Imersão */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative bg-background border-2 border-gold/30 rounded-2xl p-8 flex flex-col overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-gold/60 via-gold to-gold/60" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center">
                <TreePine className="w-6 h-6 text-gold" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-foreground">Imersões com a Célia Rabello</h2>
            </div>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-6">
              Experiências profundas de 7 dias com práticas naturais, acompanhamento e orientações para equilíbrio do corpo e da mente.
            </p>
            <div className="bg-gold/5 rounded-xl p-6 text-center mb-8 flex-1 flex flex-col justify-center">
              <span className="font-display text-4xl font-bold text-gold">R$ 3.900</span>
              <p className="font-body text-sm text-muted-foreground mt-2">por pessoa · 12 vagas por turma</p>
            </div>

            {/* Datas */}
            <p className="font-body text-sm uppercase tracking-[0.2em] text-gold mb-4 text-center">Escolha seu período</p>
            <div className="grid grid-cols-1 gap-3">
              {imersaoDates.map((date, i) => (
                <a
                  key={i}
                  href={date.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 bg-card hover:bg-gold/10 border border-border rounded-lg px-5 py-4 transition-colors duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gold" />
                    <span className="font-body text-base font-medium text-foreground">{date.label}</span>
                  </div>
                  <span className="font-body text-xs text-muted-foreground group-hover:text-gold transition-colors">Selecionar →</span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* O que está incluído */}
        <motion.div {...fadeUp} className="mb-16">
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground text-center mb-10">
            O que está incluído na imersão
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {included.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-gold" />
                </div>
                <span className="font-body text-sm text-muted-foreground leading-snug pt-2">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Observação final */}
        <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto">
          <p className="font-body text-base text-muted-foreground leading-relaxed italic">
            As vagas são limitadas para garantir um acompanhamento mais próximo. Se esse espaço faz sentido para você, entre em contato e converse diretamente com a Célia.
          </p>
        </motion.div>

        {/* Galeria de Experiências */}
        <ExperienciasGallery />
      </div>
    </section>
  );
};

export default ComoParticiparHero;
