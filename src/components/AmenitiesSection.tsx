import { motion } from "framer-motion";
import {
  Droplets, Flame, Coffee, Wifi, Wind, Tv, Dog,
  UtensilsCrossed, BedDouble, Sparkles, Leaf, ShoppingBag,
  Armchair, Beef, Bath
} from "lucide-react";

const amenities = [
  { icon: BedDouble, label: "Quarto Aconchegante", desc: "Estruturado e com ar-condicionado" },
  { icon: UtensilsCrossed, label: "Cozinha Equipada", desc: "Geladeira, fogão, micro-ondas, cafeteira e utensílios" },
  { icon: Flame, label: "Sala com Lareira", desc: "Charmosa, com TV 50\" e Netflix" },
  { icon: Droplets, label: "Hidromassagem Dupla", desc: "Com vista panorâmica" },
  { icon: Leaf, label: "Horta Fresquinha", desc: "Disponível para os hóspedes" },
  { icon: ShoppingBag, label: "Mini Mercearia", desc: "Itens práticos com preços justos" },
  { icon: Dog, label: "Pet Friendly", desc: "Seu pet é bem-vindo" },
  { icon: Armchair, label: "Área Externa", desc: "Redes, cadeiras de balanço e fogueira (lenha inclusa)" },
  { icon: Beef, label: "Churrasqueira", desc: "À disposição dos hóspedes" },
  { icon: Bath, label: "Amenities Completos", desc: "Roupões, toalhas, shampoo, sais e espuma de banho" },
  { icon: Wifi, label: "Wi-Fi de Qualidade", desc: "Internet de alta velocidade" },
  { icon: Coffee, label: "Café da Manhã Incluso", desc: "Artesanal e farto" },
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
