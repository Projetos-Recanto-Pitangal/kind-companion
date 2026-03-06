import { motion } from "framer-motion";
import {
  Droplets, Flame, Coffee, Car, Wifi, Wind, Tv, Dog,
  UtensilsCrossed, Shirt, BedDouble, Sparkles
} from "lucide-react";

const amenities = [
  { icon: Droplets, label: "Hidromassagem Climatizada", desc: "Com cromoterapia" },
  { icon: Flame, label: "Lareira na Sala", desc: "Aconchego garantido" },
  { icon: Flame, label: "Fogueira Externa", desc: "Sob as estrelas" },
  { icon: Coffee, label: "Café da Manhã Incluso", desc: "Artesanal e farto" },
  { icon: UtensilsCrossed, label: "Cozinha Equipada", desc: "Completa para uso" },
  { icon: BedDouble, label: "Cama Queen-Size", desc: "Roupas de cama premium" },
  { icon: Wind, label: "Ar-Condicionado", desc: "Split em todos os ambientes" },
  { icon: Tv, label: "TV 50\" com Streaming", desc: "Netflix e mais" },
  { icon: Wifi, label: "Wi-Fi", desc: "Internet de alta velocidade" },
  { icon: Car, label: "Garagem Coberta", desc: "Estacionamento incluso" },
  { icon: Dog, label: "Pet Friendly", desc: "Seu pet é bem-vindo" },
  { icon: Sparkles, label: "Iluminação Romântica", desc: "Ambiente perfeito" },
];

const AmenitiesSection = () => {
  return (
    <section id="amenities" className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="font-body text-gold text-sm uppercase tracking-[0.3em] mb-3">Tudo pensado para você</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground mb-4">
            Comodidades & Diferenciais
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
            Cada detalhe do chalé foi planejado para oferecer conforto, privacidade e uma experiência única.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {amenities.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="bg-card rounded-lg p-5 md:p-6 text-center hover:shadow-lg transition-shadow duration-300 group"
            >
              <item.icon className="w-7 h-7 text-gold mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-display text-sm md:text-base font-semibold text-foreground mb-1">
                {item.label}
              </h3>
              <p className="font-body text-xs md:text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
