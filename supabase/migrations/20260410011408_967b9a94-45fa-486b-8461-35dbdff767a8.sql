
-- TABELA 1: blocked_dates
CREATE TABLE public.blocked_dates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  source TEXT NOT NULL DEFAULT 'airbnb',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.blocked_dates ENABLE ROW LEVEL SECURITY;

-- Leitura pública (o calendário precisa ler as datas bloqueadas)
CREATE POLICY "Anyone can view blocked dates"
  ON public.blocked_dates FOR SELECT
  USING (true);

-- Apenas service_role (Edge Function) pode inserir/atualizar/deletar
CREATE POLICY "Service role can manage blocked dates"
  ON public.blocked_dates FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- TABELA 2: reservations
CREATE TABLE public.reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  nights INTEGER NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- Hóspedes podem criar reservas (inserir)
CREATE POLICY "Anyone can create a reservation"
  ON public.reservations FOR INSERT
  WITH CHECK (true);

-- Somente service_role pode ler/atualizar/deletar reservas
CREATE POLICY "Service role can manage reservations"
  ON public.reservations FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
