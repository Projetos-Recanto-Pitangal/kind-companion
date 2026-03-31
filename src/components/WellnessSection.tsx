import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";

const WellnessSection = () => {
  return (
    <section className="py-16 md:py-28 bg-card">
      <div className="max-w-3xl mx-auto px-[20px] md:px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-6">
            Um espaço de cuidado e reconexão com a saúde
            <span className="block text-gold mt-2">na Serra da Mantiqueira</span>
          </h2>

          <div className="space-y-5 font-body text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10">
            <p>
              No Recanto Pitangal, natureza, descanso e tranquilidade criam o cenário ideal para momentos de cuidado, reflexão e reconexão com a saúde.
            </p>
            <p>
              Em determinados períodos, o espaço recebe experiências conduzidas por{" "}
              <span className="text-foreground font-semibold">Célia Rabelo</span>, que compartilha práticas e aprendizados desenvolvidos ao longo de sua trajetória na área de saúde natural e integrativa.
            </p>
            <p>
              O Recanto Pitangal atua como anfitrião desses encontros, disponibilizando sua estrutura para que essas vivências aconteçam em meio à natureza, proporcionando um ambiente acolhedor para quem busca desacelerar e cuidar de si.
            </p>
          </div>

          <Link
            to="/como-participar"
            className="inline-flex items-center gap-2 font-body font-medium bg-gold hover:bg-gold-light text-accent-foreground px-8 py-3.5 rounded-md transition-colors duration-300 text-base uppercase tracking-wider"
          >
            <Leaf className="w-5 h-5" />
            Entenda como participar
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default WellnessSection;
