import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo-recanto-pitangal.png";

const navLinks = [
  { label: "Início", href: "#hero" },
  { label: "O Chalé", href: "#gallery" },
  { label: "Diferenciais", href: "#amenities" },
  { label: "Depoimentos", href: "#testimonials" },
  { label: "Tarifas", href: "#pricing" },
  { label: "Localização", href: "#location" },
  { label: "Dúvidas", href: "#faq" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Navbar bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <nav className="bg-primary/95 backdrop-blur-md border-b border-moss-light/20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              <a href="/" className="flex items-center gap-2">
                <img src={logo} alt="Recanto Pitangal" className="h-8 md:h-10 w-auto" />
              </a>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="font-body text-sm text-primary-foreground/80 hover:text-gold transition-colors duration-300 tracking-wide uppercase"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="https://wa.me/5535984011430?text=Ol%C3%A1%21%20Gostaria%20de%20fazer%20uma%20reserva%20no%20Recanto%20Pitangal."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm font-medium bg-gold text-accent-foreground px-5 py-2.5 rounded-md hover:bg-gold-light transition-colors duration-300 uppercase tracking-wider"
                >
                  Reservar
                </a>
              </div>

              {/* Mobile toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-primary-foreground p-2 relative z-50"
                aria-label="Menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile menu - full screen overlay (outside nav for proper z-index) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden fixed inset-0 top-16 z-50 bg-primary"
          >
            <div className="flex flex-col items-center justify-center h-full gap-6 pb-20">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-body text-base text-primary-foreground/80 hover:text-gold py-2 uppercase tracking-widest transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://wa.me/5535984011430?text=Ol%C3%A1%21%20Gostaria%20de%20fazer%20uma%20reserva%20no%20Recanto%20Pitangal."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="font-body text-sm font-medium bg-gold text-accent-foreground px-8 py-3 rounded-md text-center uppercase tracking-wider mt-4"
              >
                Reservar
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
