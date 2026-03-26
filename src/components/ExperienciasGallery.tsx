import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import exp1 from "@/assets/experiencia-1.jpg";
import exp2 from "@/assets/experiencia-2.jpg";
import exp3 from "@/assets/experiencia-3.jpg";
import exp4 from "@/assets/experiencia-4.jpg";
import exp5 from "@/assets/experiencia-5.jpg";

const images = [
  { src: exp1, alt: "Banho de cachoeira no Recanto Pitangal" },
  { src: exp2, alt: "Vivência em grupo na cachoeira" },
  { src: exp3, alt: "Grupo de participantes na trilha" },
  { src: exp4, alt: "Atividades físicas ao ar livre" },
  { src: exp5, alt: "Aula prática de culinária natural" },
];

const ExperienciasGallery = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex + 1) % images.length);
  };
  const goPrev = () => {
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  };

  return (
    <>
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-[20px] md:px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <p className="font-body text-gold text-sm uppercase tracking-[0.3em] mb-3">Momentos reais</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-6">
              Experiências vividas no Recanto Pitangal
            </h2>
            <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Cada momento vivido no Recanto Pitangal carrega algo que não se explica, apenas se sente. São dias de contato com a natureza, de silêncio, de cuidado com o corpo e de reconexão com aquilo que muitas vezes se perde na rotina. Entre práticas naturais, caminhadas, alimentação consciente e pausas necessárias, cada experiência acontece no seu tempo, respeitando o ritmo de cada pessoa. Mais do que imagens, esses registros representam vivências reais de quem escolheu parar, respirar e se permitir viver algo diferente.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative group overflow-hidden rounded-lg cursor-pointer ${
                  i === 0 ? "col-span-2 md:col-span-1 aspect-[4/3]" : "aspect-[4/3]"
                }`}
                onClick={() => openLightbox(i)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-75"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10"
            >
              <ChevronRight className="w-10 h-10" />
            </button>

            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExperienciasGallery;
