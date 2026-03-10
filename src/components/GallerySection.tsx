import { motion } from "framer-motion";
import gallery1 from "@/assets/gallery-1.png";
import gallery2 from "@/assets/gallery-2.png";
import gallery3 from "@/assets/gallery-3.png";
import gallery4 from "@/assets/gallery-4.png";
import gallery5 from "@/assets/gallery-5.png";
import gallery6 from "@/assets/gallery-6.png";
import gallery7 from "@/assets/gallery-7.png";
import gallery8 from "@/assets/gallery-8.png";

const images = [
  { src: gallery1, alt: "Foto do chalé 1" },
  { src: gallery2, alt: "Foto do chalé 2" },
  { src: gallery3, alt: "Foto do chalé 3" },
  { src: gallery4, alt: "Foto do chalé 4" },
  { src: gallery5, alt: "Foto do chalé 5" },
  { src: gallery6, alt: "Foto do chalé 6" },
  { src: gallery7, alt: "Foto do chalé 7" },
  { src: gallery8, alt: "Foto do chalé 8" },
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="relative group overflow-hidden rounded-lg aspect-[4/3]"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
