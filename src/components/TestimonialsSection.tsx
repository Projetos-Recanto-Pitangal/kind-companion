import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Luciana Cristina",
    text: "Um pedacinho do céu... tudo maravilhoso: o atendimento e acolhimento do Herbert, o chalé, o café da manhã, limpeza, todos os detalhes e a delicadeza... perceptível a preocupação e dedicação para que os hóspedes desfrutem de dias cheios de tranquilidade e muitas memórias boas. Ah... e a vista... maravilhosa.",
    source: "Google",
    rating: 5,
  },
  {
    name: "Elizabete Colin Monteiro",
    text: "A hospedagem foi incrível e melhor do que o descrito! Recepção fora do comum, maravilhosa! Café da manhã completo. Utensílios novinhos e completos! Cafeteira dolce gusto, chaleira elétrica, fonduezeira, banheira impecável. Levamos nossa cachorra e ela amou! Os anfitriões são maravilhosos e realmente diferenciados! Com certeza voltaremos!",
    source: "Airbnb",
    rating: 5,
  },
  {
    name: "Camila",
    text: "Nossa estadia foi simplesmente incrível! Casa muito legal e completa, tudo muito novinho, moderno, bonito e limpo. A vista é linda, muita natureza, paz e tranquilidade. O café da manhã é delicioso e super farto! O anfitrião Herbert é extremamente solícito, simpático e deu dicas excelentes. Recomendo muito!",
    source: "Airbnb",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 md:py-28 bg-primary">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="font-body text-gold text-base uppercase tracking-[0.3em] mb-3">O que dizem nossos hóspedes</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-primary-foreground mb-4">
            Avaliações
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-gold fill-gold" />
            ))}
          </div>
          <p className="font-body text-primary-foreground/70 text-base">Nota 5.0 · Preferido dos Hóspedes no Airbnb</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-moss-light/30 backdrop-blur-sm rounded-lg p-6 md:p-8 relative"
            >
              <Quote className="w-8 h-8 text-gold/30 absolute top-4 right-4" />
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>
              <p className="font-body text-primary-foreground/90 text-base md:text-lg leading-relaxed mb-6 italic">
                "{t.text}"
              </p>
              <div className="flex items-center justify-between">
                <span className="font-display text-sm font-semibold text-primary-foreground">{t.name}</span>
                <span className="font-body text-xs text-gold uppercase tracking-wider">{t.source}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
