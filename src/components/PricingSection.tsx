import { motion } from "framer-motion";
import { Calendar, Heart, Sun, Sparkles } from "lucide-react";
import { buildWhatsAppUrl } from "@/components/WhatsAppButton";
import { track } from "@/lib/tracking";
import { Badge } from "@/components/ui/badge";

const packages = [
  {
    icon: Sparkles,
    title: "Tiradentes",
    period: "18 a 21 de Abril/2026",
    price: "R$ 2.580",
    details: "3 diárias para 1 casal · Café da manhã incluso",
    installment: "até 5x sem juros no cartão de crédito",
    highlight: false,
    soldOut: true,
  },
  {
    icon: Calendar,
    title: "Dia do Trabalho",
    period: "30/04 a 03/05/2026",
    price: "R$ 2.580",
    details: "3 diárias para 1 casal · Café da manhã incluso",
    installment: "até 5x sem juros no cartão de crédito",
    highlight: false,
    soldOut: true,
  },
  {
    icon: Sun,
    title: "Corpus Christi",
    period: "04 a 07 de Junho/2026",
    price: "R$ 2.580",
    details: "3 diárias para 1 casal · Café da manhã incluso",
    installment: "até 5x sem juros no cartão de crédito",
    highlight: false,
    soldOut: true,
  },
  {
    icon: Heart,
    title: "Dia dos Namorados",
    period: "12 a 14 de Junho/2026",
    price: "R$ 2.000",
    details: "2 diárias para 1 casal · Café da manhã incluso",
    installment: "até 5x sem juros no cartão de crédito",
    highlight: false,
    soldOut: true,
  },
];

const PricingSection = () => {
  const handleWhatsApp = (pkg: typeof packages[0]) => {
    track("ViewContent", {
      content_name: pkg.title,
      content_category: "pacote",
      period: pkg.period,
      sold_out: pkg.soldOut,
    });
    const url = buildWhatsAppUrl(
      pkg.soldOut
        ? `em consultar outras datas disponíveis (vi que o pacote ${pkg.title} — ${pkg.period} — já está esgotado)`
        : `no pacote ${pkg.title}, para o período ${pkg.period}, no valor de ${pkg.price}`
    );
    window.open(url, "_blank");
  };

  return (
    <section id="pricing" className="py-16 md:py-28 lg:py-36 bg-background">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 lg:mb-20"
        >
          <p className="font-body text-gold text-base lg:text-lg uppercase tracking-[0.3em] mb-3 lg:mb-5">Valores para 1 casal</p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 lg:mb-6">
            Tarifas & Pacotes
          </h2>
          <p className="font-body text-muted-foreground max-w-xl lg:max-w-2xl mx-auto text-lg md:text-xl lg:text-2xl leading-relaxed">
            Café da manhã incluso em todas as opções. Valores válidos para 2026.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 lg:gap-8 max-w-4xl lg:max-w-5xl mx-auto">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative rounded-lg p-6 md:p-8 lg:p-10 border transition-shadow duration-300 overflow-hidden ${
                pkg.soldOut
                  ? "bg-card/60 text-card-foreground border-border opacity-80"
                  : pkg.highlight
                    ? "bg-primary text-primary-foreground border-gold/30 hover:shadow-xl"
                    : "bg-card text-card-foreground border-border hover:shadow-xl"
              }`}
            >
              {/* Sold-out ribbon */}
              {pkg.soldOut && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-destructive text-destructive-foreground border-none text-xs font-bold uppercase tracking-wider px-3 py-1.5 shadow-md">
                    Esgotado
                  </Badge>
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div>
                  <pkg.icon className={`w-6 h-6 lg:w-8 lg:h-8 mb-2 lg:mb-3 ${pkg.soldOut ? "text-muted-foreground" : "text-gold"}`} />
                  <h3 className={`font-display text-xl lg:text-2xl font-semibold ${pkg.soldOut ? "text-muted-foreground" : ""}`}>{pkg.title}</h3>
                  <p className={`font-body text-sm lg:text-base uppercase tracking-wider mt-1 lg:mt-2 ${
                    pkg.soldOut
                      ? "text-muted-foreground/60"
                      : pkg.highlight ? "text-primary-foreground/60" : "text-muted-foreground"
                  }`}>
                    {pkg.period}
                  </p>
                </div>
              </div>

              <p className={`font-display text-3xl lg:text-4xl font-bold mb-2 lg:mb-3 ${pkg.soldOut ? "text-muted-foreground line-through decoration-destructive/50" : ""}`}>
                {pkg.price}
              </p>
              <p className={`font-body text-base lg:text-lg mb-1 lg:mb-2 ${
                pkg.soldOut
                  ? "text-muted-foreground/60"
                  : pkg.highlight ? "text-primary-foreground/80" : "text-muted-foreground"
              }`}>
                {pkg.details}
              </p>
              <p className={`font-body text-sm lg:text-base mb-4 lg:mb-6 ${
                pkg.soldOut ? "text-muted-foreground/60" : "text-gold"
              }`}>
                {pkg.installment}
              </p>

              {pkg.soldOut && (
                <p className="font-body text-sm text-muted-foreground mb-4 italic">
                  Essa data já foi reservada. Consulte novos períodos disponíveis.
                </p>
              )}

              <button
                onClick={() => handleWhatsApp(pkg)}
                className={`w-full font-body font-medium py-3 lg:py-4 rounded-md transition-colors duration-300 text-base lg:text-lg uppercase tracking-wider shadow-sm ${
                  pkg.soldOut
                    ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    : pkg.highlight
                      ? "bg-gold text-accent-foreground hover:bg-gold-light"
                      : "bg-primary text-primary-foreground hover:bg-moss-light"
                }`}
              >
                {pkg.soldOut ? "Consultar outras datas" : "Reservar via WhatsApp"}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Social proof badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 flex flex-col items-center gap-6"
        >
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 bg-card border border-gold/30 rounded-full px-5 py-2.5 shadow-sm">
              <span className="text-gold text-lg font-bold">★</span>
              <span className="font-body text-base font-semibold text-foreground">Nota 5,0</span>
              <span className="font-body text-sm text-muted-foreground">no Google</span>
            </div>
            <div className="flex items-center gap-2 bg-card border border-gold/30 rounded-full px-5 py-2.5 shadow-sm">
              <span className="text-gold text-lg font-bold">♥</span>
              <span className="font-body text-base font-semibold text-foreground">Preferido dos Hóspedes</span>
              <span className="font-body text-sm text-muted-foreground">no Airbnb</span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="font-body text-muted-foreground text-base">Também disponível em:</p>
            <a
              href="https://www.airbnb.com.br/rooms/1348774902789161936"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-base font-medium text-foreground hover:text-gold border border-border rounded-md px-6 py-2.5 transition-colors duration-300"
            >
              Airbnb
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
