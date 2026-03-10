import { motion } from "framer-motion";
import { MapPin, Mountain } from "lucide-react";

const nearbyCities = [
  { name: "São Bento do Sapucaí", distance: "15 min" },
  { name: "Campos do Jordão", distance: "40 min" },
  { name: "Santo Antônio do Pinhal", distance: "30 min" },
  { name: "Gonçalves", distance: "50 min" },
];

const LocationSection = () => {
  return (
    <section id="location" className="py-16 md:py-28 bg-secondary">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <p className="font-body text-gold text-sm uppercase tracking-[0.3em] mb-3">Serra da Mantiqueira</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-foreground mb-4">
            Localização Privilegiada
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
            Em Sapucaí-Mirim (MG), no coração da Serra da Mantiqueira, cercado por natureza e próximo às melhores cidades turísticas da região.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Map embed */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-lg overflow-hidden shadow-lg h-72 md:h-96"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29324.15!2d-45.74!3d-22.68!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94cc8f1a4a3a3a3b%3A0x4a3a3a3b4a3a3a3b!2sSapuca%C3%AD-Mirim%2C%20MG!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização Recanto Pitangal"
            />
          </motion.div>

          {/* Nearby cities */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-gold" />
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground">Sapucaí-Mirim, MG</h3>
                <p className="font-body text-sm text-muted-foreground">Serra da Mantiqueira</p>
              </div>
            </div>

            <p className="font-body text-muted-foreground mb-6 leading-relaxed">
              Check-in a partir das <strong className="text-foreground">15h</strong> · Check-out até as <strong className="text-foreground">12h</strong>
            </p>

            <h4 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Mountain className="w-5 h-5 text-gold" />
              Cidades Próximas
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {nearbyCities.map((city, i) => (
                <div key={i} className="bg-card rounded-lg p-4 border border-border">
                  <p className="font-display text-sm font-semibold text-foreground">{city.name}</p>
                  <p className="font-body text-xs text-muted-foreground">≈ {city.distance}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
