import { Heart } from "lucide-react";
import logo from "@/assets/logo-recanto-pitangal-footer.png";

const Footer = () => {
  return (
    <footer className="bg-primary py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-10">
          {/* Brand */}
          <div>
            <img src={logo} alt="Recanto Pitangal" className="h-10 w-auto mb-3" loading="lazy" decoding="async" />
            <p className="font-body text-primary-foreground/60 text-sm leading-relaxed">
              Um chalé exclusivo para casais na Serra da Mantiqueira. Natureza, romance e conforto em Sapucaí-Mirim, MG.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-sm font-semibold text-gold uppercase tracking-wider mb-4">Navegação</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "O Chalé", href: "#gallery" },
                { label: "Diferenciais", href: "#amenities" },
                { label: "Depoimentos", href: "#testimonials" },
                { label: "Tarifas", href: "#pricing" },
                { label: "Localização", href: "#location" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="font-body text-sm text-primary-foreground/60 hover:text-gold transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-sm font-semibold text-gold uppercase tracking-wider mb-4">Contato</h4>
            <div className="flex flex-col gap-2">
              <a
                href={buildWhatsAppUrl("em falar com a pousada")}
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-primary-foreground/60 hover:text-gold transition-colors"
              >
                WhatsApp
              </a>
              <a
                href="https://www.instagram.com/pousadarecantopitangal"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-primary-foreground/60 hover:text-gold transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://linktr.ee/pousadarecantopitangal"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-sm text-primary-foreground/60 hover:text-gold transition-colors"
              >
                Linktree
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-moss-light/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-primary-foreground/40">
            © 2026 Recanto Pitangal. Todos os direitos reservados.
          </p>
          <p className="font-body text-xs text-primary-foreground/40 flex items-center gap-1">
            Feito com <Heart className="w-3 h-3 text-terracotta fill-terracotta" /> na Serra da Mantiqueira
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
