import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Reserva from "./pages/Reserva";
import ReservaConfirmacao from "./pages/ReservaConfirmacao";
import LuaDeMel from "./pages/LuaDeMel";
import NotFound from "./pages/NotFound";
import TrackingInit from "./components/TrackingInit";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <TrackingInit />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/reserva" element={<Reserva />} />
          <Route path="/reserva/confirmacao" element={<ReservaConfirmacao />} />
          <Route path="/lua-de-mel" element={<LuaDeMel />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
