import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import herbetMascote from "@/assets/herbet-mascote.png";

const WHATSAPP_URL = "https://wa.me/5535984011430?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20uma%20reserva%20no%20Recanto%20Pitangal.";

const pulseAnimation = {
  scale: [1, 1.08, 1],
  boxShadow: [
    "0 0 0 0 rgba(37, 211, 102, 0)",
    "0 0 0 8px rgba(37, 211, 102, 0.25)",
    "0 0 0 0 rgba(37, 211, 102, 0)",
  ],
};

const pulseTransition = { duration: 2, repeat: Infinity, ease: "easeInOut" as const };

const AmbientAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/nature-ambient.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
    setShowPrompt(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* WhatsApp Button */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full overflow-hidden shadow-lg block"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={pulseAnimation}
        transition={pulseTransition}
      >
        <img src={herbetMascote} alt="Fale conosco no WhatsApp" className="w-full h-full object-cover" />
      </motion.a>

      {/* Audio Button */}
      <div className="flex items-center gap-3">
        <AnimatePresence>
          {showPrompt && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-card/90 backdrop-blur-sm border border-border rounded-lg px-4 py-2 shadow-lg"
            >
              <p className="font-body text-xs text-muted-foreground whitespace-nowrap">
                🎵 Ativar som ambiente
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggleAudio}
          className="w-12 h-12 rounded-full bg-gold/90 hover:bg-gold text-accent-foreground flex items-center justify-center shadow-lg backdrop-blur-sm transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={
            !isPlaying && showPrompt
              ? {
                  scale: [1, 1.08, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(191, 155, 48, 0)",
                    "0 0 0 8px rgba(191, 155, 48, 0.25)",
                    "0 0 0 0 rgba(191, 155, 48, 0)",
                  ],
                }
              : {}
          }
          transition={
            !isPlaying && showPrompt
              ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
              : {}
          }
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default AmbientAudioPlayer;
