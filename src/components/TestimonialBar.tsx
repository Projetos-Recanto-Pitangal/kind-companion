import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface TestimonialBarProps {
  messages: string[];
  interval?: number;
}

const TestimonialBar = ({ messages, interval = 4000 }: TestimonialBarProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, interval);
    return () => clearInterval(timer);
  }, [messages.length, interval]);

  return (
    <div className="bg-gold/90 text-accent-foreground py-3 overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-2 font-body text-xs md:text-sm italic text-center"
          >
            <Sparkles className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{messages[index]}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TestimonialBar;
