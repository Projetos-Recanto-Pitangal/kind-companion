import { motion } from "framer-motion";
import {
  MessageCircle,
  Home,
  CalendarDays,
  Users,
  Leaf,
  Droplets,
  Sun,
  UtensilsCrossed,
  Cookie,
  Sparkles,
  FlameKindling,
  Footprints,
  Waves,
} from "lucide-react";

const WA = "5535984011430";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const imersaoDates = [
  { label: "19 a 26 de maio", param: "19%20a%2026%20de%20maio" },
  { label: "19 a 26 de agosto", param: "19%20a%2026%20de%20agosto" },
  { label: "23 a 30 de setembro", param: "23%20a%2030%20de%20setembro" },
];

const included = [
  { icon: Leaf, text: "Aulas práticas" },
  { icon: Droplets, text: "Terapias naturais (água, terra, sol, banho turco)" },
  { icon: UtensilsCrossed, text: "Alimentação vegetariana completa" },
  { icon: Cookie, text: "Pães e pizzas de fermentação natural" },
  { icon: UtensilsCrossed, text: "Massas artesanais do zero" },
  { icon: Sparkles, text: "Produção de itens naturais (sabão, cremes, extratos)" },
  { icon: FlameKindling, text: "Sauna natural" },
  { icon: Footprints, text: "Atividades físicas simples" },
  { icon: Waves, text: "Caminhadas e banhos de cachoeira" },
];

const ComoParticiparSection = () => {
  return (
    <section id="como-participar" className="py-16 md:py-28 bg-secondary/30">
      {/* Header */}
      <div className="max-w-3xl mx-auto px-5 text-center mb-14">
        <motion.p {...fadeUp} className="font-body text-gold text-sm uppercase tracking-[0.3em] mb-3">
          Recanto Pitangal
        </motion.p>
        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl md:text-5xl font-semibold text-foreground mb-6"
        >
          Como participar
        </motion.h2>
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
        >
          No Recanto Pitangal, você pode viver essa experiência de duas formas:
          hospedagem no chalé ou participação nas imersões conduzidas pela Célia Rabello.
          <br className="hidden md:block" />
          Escolha a opção que mais faz sentido para você e entre em contato para receber todos os detalhes.
        </motion.p>
      </div>

      {/* Card 1 – Hospedagem */}
      <div className="max-w-4xl mx-auto px-5 mb-8">
        <motion.div
          {...fadeUp}
          className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
              <Home className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              Hospedagem no chalé
            </h3>
          </div>
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-8">
            Uma experiência de descanso, conexão com a natureza e possibilidade de vivenciar
            práticas naturais no seu próprio ritmo.
          </p>

          <div className="space-y-3 mb-8">
            {[
              { period: "Segunda a quinta (até 3 pessoas)", price: "R$ 3.000,00" },
              { period: "Segunda a quinta (4 pessoas)", price: "R$ 3.500,00" },
              { period: "Sexta a domingo (até 4 pessoas)", price: "R$ 3.500,00" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 py-3 px-4 rounded-lg bg-secondary/50"
              >
                <span className="font-body text-sm md:text-base text-foreground">{item.period}</span>
                <span className="font-display text-lg md:text-xl font-semibold text-gold whitespace-nowrap">
                  {item.price}
                </span>
              </div>
            ))}
          </div>

          <a
            href={`https://wa.me/${WA}?text=Oi%2C%20vim%20pelo%20site%20da%20Pousada%20Recanto%20Pitangal%20e%20tenho%20interesse%20na%20hospedagem.%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body font-medium bg-gold hover:bg-gold-light text-accent-foreground px-8 py-4 rounded-lg transition-colors duration-300 text-base"
          >
            <MessageCircle className="w-5 h-5" />
            Falar sobre hospedagem
          </a>
        </motion.div>
      </div>

      {/* Card 2 – Imersão */}
      <div className="max-w-4xl mx-auto px-5 mb-8">
        <motion.div
          {...fadeUp}
          className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-gold" />
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
              Imersões com a Célia Rabello
            </h3>
          </div>
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
            Experiências profundas de 7 dias com práticas naturais, acompanhamento e orientações
            para equilíbrio do corpo e da mente.
          </p>

          <div className="inline-flex flex-col items-center bg-gold/10 rounded-xl px-8 py-5 mb-8">
            <span className="font-display text-3xl md:text-4xl font-bold text-gold">R$ 3.900,00</span>
            <span className="font-body text-sm text-muted-foreground mt-1">por pessoa · 12 vagas</span>
          </div>

          <p className="font-body text-base text-foreground font-medium mb-4">Escolha o período:</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {imersaoDates.map((date, i) => (
              <a
                key={i}
                href={`https://wa.me/${WA}?text=Oi%2C%20vim%20pelo%20site%20da%20Pousada%20Recanto%20Pitangal%20e%20tenho%20interesse%20no%20per%C3%ADodo%20de%20${date.param}.%20Gostaria%20de%20mais%20informa%C3%A7%C3%B5es.`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 bg-secondary/50 hover:bg-gold/10 border border-border hover:border-gold/40 rounded-xl p-6 transition-all duration-300"
              >
                <CalendarDays className="w-6 h-6 text-gold mb-1" />
                <span className="font-display text-lg font-semibold text-foreground text-center">
                  {date.label}
                </span>
                <span className="font-body text-sm text-muted-foreground group-hover:text-gold transition-colors">
                  Selecionar este período →
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* O que está incluído */}
      <div className="max-w-4xl mx-auto px-5 mb-8">
        <motion.div
          {...fadeUp}
          className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-sm"
        >
          <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-8 text-center">
            O que está incluído na imersão
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {included.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mt-0.5">
                  <item.icon className="w-5 h-5 text-gold" />
                </div>
                <span className="font-body text-sm md:text-base text-muted-foreground leading-snug pt-2">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Observação final */}
      <div className="max-w-2xl mx-auto px-5 text-center mt-10">
        <motion.p
          {...fadeUp}
          className="font-body text-base text-muted-foreground leading-relaxed italic"
        >
          As vagas são limitadas para garantir um acompanhamento mais próximo.
          <br />
          Se esse espaço faz sentido para você, entre em contato e converse diretamente com a Célia.
        </motion.p>
      </div>
    </section>
  );
};

export default ComoParticiparSection;
