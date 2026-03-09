import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo-recanto-pitangal.png";
import SocialProofBar from "./SocialProofBar";

const navLinks = [
  { label: "Início", href: "#hero" },
  { label: "O Chalé", href: "#gallery" },
  { label: "Diferenciais", href: "#amenities" },
  { label: "Depoimentos", href: "#testimonials" },
  { label: "Tarifas", href: "#pricing" },
  { label: "Localização", href: "#location" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <SocialProofBar />
        <nav className="bg-primary/95 backdrop-blur-md border-b border-moss-light/20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#hero" className="flex items-center gap-2">
            <img src={logo} alt="Recanto Pitangal" className="h-12 md:h-14 w-auto" />
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
              href="#pricing"
              className="font-body text-sm font-medium bg-gold text-accent-foreground px-5 py-2.5 rounded-md hover:bg-gold-light transition-colors duration-300 uppercase tracking-wider"
            >
              Reservar
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary-foreground p-2"
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary/98 backdrop-blur-md border-t border-moss-light/20"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="font-body text-sm text-primary-foreground/80 hover:text-gold py-2 uppercase tracking-wide"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#pricing"
                onClick={() => setIsOpen(false)}
                className="font-body text-sm font-medium bg-gold text-accent-foreground px-5 py-2.5 rounded-md text-center uppercase tracking-wider mt-2"
              >
                Reservar
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </nav>
      </div>
    </>
  );
};

export default Navbar;
