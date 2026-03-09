import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users } from "lucide-react";

const notifications = [
  { name: "Maria", city: "São Paulo", time: "há 2 horas" },
  { name: "Carlos", city: "Rio de Janeiro", time: "há 3 horas" },
  { name: "Ana", city: "Belo Horizonte", time: "há 5 horas" },
  { name: "Pedro", city: "Curitiba", time: "há 1 dia" },
  { name: "Juliana", city: "Brasília", time: "há 1 dia" },
  { name: "Roberto", city: "Campinas", time: "há 2 dias" },
  { name: "Fernanda", city: "Salvador", time: "há 3 dias" },
];

const SocialProofBar = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % notifications.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const current = notifications[index];

  return (
    <div className="bg-gold/90 text-accent-foreground py-1.5 text-center overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-2 font-body text-xs md:text-sm"
          >
            <Users className="w-3.5 h-3.5 flex-shrink-0" />
            <span>
              <strong>{current.name}</strong> de {current.city} fez uma reserva {current.time}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SocialProofBar;
