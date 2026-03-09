import { motion } from "framer-motion";
import { Calendar, Heart, Sun, Sparkles } from "lucide-react";

const WHATSAPP_NUMBER = "5535984011430";

const packages = [
  {
    icon: Sparkles,
    title: "Tiradentes",
    period: "18 a 21 de Abril/2026",
    price: "R$ 2.580",
    details: "3 diárias para 1 casal · Café da manhã incluso",
    installment: "até 5x sem juros no cartão de crédito",
    highlight: false,
  },
  {
    icon: Calendar,
    title: "Dia do Trabalho",
    period: "30/04 a 03/05/2026",
    price: "R$ 2.580",
    details: "3 diárias para 1 casal · Café da manhã incluso",
    installment: "até 5x sem juros no cartão de crédito",
    highlight: false,
  },
  {
    icon: Sun,
    title: "Corpus Christi",
    period: "04 a 07 de Junho/2026",
    price: "R$ 2.580",
    details: "3 diárias para 1 casal · Café da manhã incluso",
    installment: "até 5x sem juros no cartão de crédito",
    highlight: false,
  },
  {
    icon: Heart,
    title: "Dia dos Namorados",
    period: "12 a 14 de Junho/2026",
    price: "R$ 2.000",
    details: "2 diárias para 1 casal · Café da manhã incluso",
    installment: "até 5x sem juros no cartão de crédito",
    highlight: true,
  },
];

const PricingSection = () => {
  const handleWhatsApp = (packageTitle: string) => {
    const message = encodeURIComponent(
      `Olá! Gostaria de saber mais sobre o pacote "${packageTitle}" do Recanto Pitangal. Podem me ajudar?`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
  };

  return (
    <section id="pricing" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="font-body text-gold text-sm uppercase tracking-[0.3em] mb-3">Valores para 1 casal</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground mb-4">
            Tarifas & Pacotes
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
            Café da manhã incluso em todas as opções. Valores válidos para 2026.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto">
          {packages.map((pkg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`rounded-lg p-6 md:p-8 border transition-shadow duration-300 hover:shadow-xl ${
                pkg.highlight
                  ? "bg-primary text-primary-foreground border-gold/30"
                  : "bg-card text-card-foreground border-border"
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <pkg.icon className={`w-6 h-6 mb-2 ${pkg.highlight ? "text-gold" : "text-gold"}`} />
                  <h3 className="font-display text-xl font-semibold">{pkg.title}</h3>
                  <p className={`font-body text-xs uppercase tracking-wider mt-1 ${
                    pkg.highlight ? "text-primary-foreground/60" : "text-muted-foreground"
                  }`}>
                    {pkg.period}
                  </p>
                </div>
              </div>

              <p className="font-display text-3xl font-bold mb-2">{pkg.price}</p>
              <p className={`font-body text-sm mb-1 ${
                pkg.highlight ? "text-primary-foreground/80" : "text-muted-foreground"
              }`}>
                {pkg.details}
              </p>
              <p className={`font-body text-xs mb-6 ${
                pkg.highlight ? "text-gold" : "text-gold"
              }`}>
                {pkg.installment}
              </p>

              <button
                onClick={() => handleWhatsApp(pkg.title)}
                className={`w-full font-body font-medium py-3 rounded-md transition-colors duration-300 text-sm uppercase tracking-wider ${
                  pkg.highlight
                    ? "bg-gold text-accent-foreground hover:bg-gold-light"
                    : "bg-primary text-primary-foreground hover:bg-moss-light"
                }`}
              >
                Reservar via WhatsApp
              </button>
            </motion.div>
          ))}
        </div>

        {/* External platforms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="font-body text-muted-foreground text-sm mb-4">Também disponível em:</p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://www.airbnb.com.br/rooms/1348774902789161936"
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-sm font-medium text-foreground hover:text-gold border border-border rounded-md px-6 py-2.5 transition-colors duration-300"
            >
              Airbnb
            </a>
            <span
              className="font-body text-sm font-medium text-muted-foreground border border-border rounded-md px-6 py-2.5 cursor-default opacity-60"
            >
              Booking.com (em breve)
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
