import { useState } from "react";
import { format, differenceInCalendarDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2, CalendarCheck, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

interface ReservationFormProps {
  checkIn: Date;
  checkOut: Date;
  onBack: () => void;
}

export default function ReservationForm({ checkIn, checkOut, onBack }: ReservationFormProps) {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const nights = differenceInCalendarDays(checkOut, checkIn);
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const canSubmit = name.trim().length > 0 && emailValid && phone.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    try {
      const { error } = await supabase.from("reservations").insert({
        guest_name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        check_in: format(checkIn, "yyyy-MM-dd"),
        check_out: format(checkOut, "yyyy-MM-dd"),
        nights,
        notes: notes.trim() || null,
        status: "pending",
      });

      if (error) throw error;

      navigate("/reserva/confirmacao", {
        state: {
          guestName: name.trim(),
          checkIn: format(checkIn, "dd/MM/yyyy"),
          checkOut: format(checkOut, "dd/MM/yyyy"),
          nights,
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("Ops! Algo deu errado. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Summary */}
      <div className="bg-card rounded-2xl shadow-sm border p-5">
        <div className="flex items-center gap-2 mb-4">
          <CalendarCheck className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-foreground">Resumo da Estadia</h2>
        </div>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div>
            <span className="text-muted-foreground">Check-in</span>
            <p className="font-medium text-foreground">{format(checkIn, "dd/MM/yyyy")}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Check-out</span>
            <p className="font-medium text-foreground">{format(checkOut, "dd/MM/yyyy")}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Noites</span>
            <p className="font-medium text-foreground">{nights}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-sm border p-5 space-y-5">
        <h2 className="font-semibold text-foreground text-lg">Dados do Hóspede</h2>

        <div className="space-y-2">
          <Label htmlFor="name">Nome completo *</Label>
          <Input
            id="name"
            placeholder="Seu nome completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={150}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">E-mail *</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            maxLength={255}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Telefone / WhatsApp *</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(00) 00000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={30}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Observações</Label>
          <Textarea
            id="notes"
            placeholder="Informações adicionais, pedidos especiais…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            maxLength={1000}
            rows={3}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            className="gap-2"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <Button
            type="submit"
            size="lg"
            className="flex-1 text-base gap-2"
            disabled={!canSubmit || submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enviando…
              </>
            ) : (
              "Solicitar Reserva"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
