import { motion } from "framer-motion";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery9 from "@/assets/gallery-9.jpg";

const images = [
  { src: gallery1, alt: "Foto do chalé 1" },
  { src: gallery2, alt: "Foto do chalé 2" },
  { src: gallery3, alt: "Foto do chalé 3" },
  { src: gallery4, alt: "Foto do chalé 4" },
  { src: gallery5, alt: "Foto do chalé 5" },
  { src: gallery6, alt: "Foto do chalé 6" },
  { src: gallery7, alt: "Foto do chalé 7" },
  { src: gallery8, alt: "Foto do chalé 8" },
  { src: gallery9, alt: "Foto do chalé 9" },
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-16 md:py-28 lg:py-36 bg-background">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 lg:mb-20"
        >
          <p className="font-body text-gold text-base lg:text-lg uppercase tracking-[0.3em] mb-3 lg:mb-5">Exclusivo para dois</p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-4 lg:mb-6">
            Conheça o Chalé
          </h2>
          <p className="font-body text-muted-foreground max-w-xl lg:max-w-2xl mx-auto text-lg md:text-xl lg:text-2xl leading-relaxed">
            Um chalé completo e privativo, pensado em cada detalhe para proporcionar momentos inesquecíveis a dois.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5 lg:gap-6">
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
                decoding="async"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
