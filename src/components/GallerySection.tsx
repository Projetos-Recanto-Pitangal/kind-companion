import { motion } from "framer-motion";
import gallery1 from "@/assets/gallery-1.png";
import gallery2 from "@/assets/gallery-2.png";
import gallery3 from "@/assets/gallery-3.png";
import gallery4 from "@/assets/gallery-4.png";
import gallery5 from "@/assets/gallery-5.png";
import gallery6 from "@/assets/gallery-6.png";

const images = [
  { src: gallery3, alt: "Suíte romântica com cama queen-size e pétalas", label: "Suíte" },
  { src: gallery5, alt: "Área externa do chalé", label: "Área Externa" },
  { src: gallery1, alt: "Vista do chalé na natureza", label: "O Chalé" },
  { src: gallery4, alt: "Café da manhã artesanal completo", label: "Café da manhã" },
  { src: gallery2, alt: "Ambiente acolhedor do chalé", label: "Ambiente" },
  { src: gallery6, alt: "Detalhes do espaço", label: "Detalhes" },
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="font-body text-gold text-sm uppercase tracking-[0.3em] mb-3">Exclusivo para dois</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground mb-4">
            Conheça o Chalé
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
            Um chalé completo e privativo, pensado em cada detalhe para proporcionar momentos inesquecíveis a dois.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative group overflow-hidden rounded-lg ${
                i === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  i === 0 ? "h-64 md:h-full" : "h-64 md:h-72"
                }`}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="absolute bottom-4 left-4 font-body text-sm text-primary-foreground uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {img.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
