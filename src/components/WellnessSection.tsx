import { motion } from "framer-motion";
import { RefreshCw, Leaf, Scale, TreePine } from "lucide-react";
import celiaImage from "@/assets/celia.png";

const WellnessSection = () => {
  return (
    <section className="py-20 md:py-28 bg-card">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-12 md:gap-16">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-64 h-64 md:w-80 md:h-80 flex-shrink-0"
        >
          <img
            src={celiaImage}
            alt="Celia - Recanto Pitangal"
            className="w-full h-full object-cover rounded-2xl shadow-lg"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center md:text-left"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-6">
            Um espaço de cuidado e reconexão com a saúde
            <span className="block text-gold mt-2">na Serra da Mantiqueira</span>
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-xl">
            No Recanto Pitangal, natureza, descanso e princípios naturais de saúde se unem para oferecer períodos de cuidado, reflexão e equilíbrio para o corpo, mente e espírito.
          </p>

          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-4 max-w-xl">
            Em determinados períodos, o Recanto Pitangal recebe pessoas que desejam passar alguns dias em um ambiente tranquilo, com orientação sobre práticas naturais de saúde. Esses momentos de cuidado são conduzidos por{" "}
            <span className="text-foreground font-semibold">Célia Rabelo</span>, que atua na área de saúde natural e integrativa, com formação em Gastronomia pelo SENAC e especialização em Medicina Funcional Integrativa, além de anos de estudo e experiência prática no acompanhamento de pessoas que buscam melhorar sua qualidade de vida por meio de mudanças de hábitos e princípios naturais de saúde.
          </p>

          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-3 max-w-xl">
            Durante esse tempo no Recanto Pitangal, os participantes têm a oportunidade de:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 max-w-xl">
            {[
              { icon: RefreshCw, text: "reorganizar hábitos de vida" },
              { icon: Leaf, text: "aprender práticas naturais de cuidado com o corpo" },
              { icon: Scale, text: "experimentar rotinas mais equilibradas" },
              { icon: TreePine, text: "descansar em meio à natureza" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-gold" />
                </div>
                <span className="font-body text-base text-muted-foreground leading-snug pt-2">{item.text}</span>
              </div>
            ))}
          </div>

          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl italic">
            Cada experiência é conduzida com atenção e respeito ao momento de cada pessoa, valorizando o processo individual de cuidado, descanso e reconexão com a própria saúde.
          </p>
          <a
            href="#gallery"
            className="inline-block font-body font-medium bg-gold hover:bg-gold-light text-accent-foreground px-8 py-3.5 rounded-md transition-colors duration-300 text-base uppercase tracking-wider"
          >
            Quero conhecer o Recanto Pitangal
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WellnessSection;
