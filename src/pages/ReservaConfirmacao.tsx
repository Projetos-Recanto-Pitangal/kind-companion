import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Home } from "lucide-react";
import { useEffect } from "react";

interface ConfirmationState {
  guestName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
}

export default function ReservaConfirmacao() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ConfirmationState | null;

  useEffect(() => {
    if (!state) navigate("/reserva", { replace: true });
  }, [state, navigate]);

  if (!state) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-lg mx-auto px-4 sm:px-6 text-center">
          <div className="bg-card rounded-2xl shadow-sm border p-8 space-y-6">
            <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto" />
            <h1 className="font-['Playfair_Display'] text-2xl sm:text-3xl font-bold text-foreground">
              Solicitação recebida com sucesso!
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Em breve entraremos em contato pelo WhatsApp para confirmar
              sua reserva e combinar os detalhes.
            </p>

            <div className="bg-accent/30 rounded-xl p-5 text-sm space-y-2 text-left">
              <p><span className="text-muted-foreground">Hóspede:</span> <span className="font-medium text-foreground">{state.guestName}</span></p>
              <p><span className="text-muted-foreground">Check-in:</span> <span className="font-medium text-foreground">{state.checkIn}</span></p>
              <p><span className="text-muted-foreground">Check-out:</span> <span className="font-medium text-foreground">{state.checkOut}</span></p>
              <p><span className="text-muted-foreground">Total:</span> <span className="font-medium text-foreground">{state.nights} noite{state.nights > 1 ? "s" : ""}</span></p>
            </div>

            <Button
              size="lg"
              className="gap-2"
              onClick={() => navigate("/")}
            >
              <Home className="h-4 w-4" />
              Voltar ao Início
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
