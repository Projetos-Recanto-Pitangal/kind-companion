import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  initGlobalClickTracking,
  initScrollDepthTracking,
  trackPageView,
} from "@/lib/tracking";

/**
 * Inicializa rastreamento global: cliques (WhatsApp/Airbnb), scroll depth
 * e PageView por rota (SPA). Deve ficar dentro do <BrowserRouter>.
 */
const TrackingInit = () => {
  const location = useLocation();

  useEffect(() => {
    initGlobalClickTracking();
    initScrollDepthTracking();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Pula o primeiro PageView, já enviado pelo snippet em index.html
    const isInitial = window.history.state?.idx === 0 || window.history.state == null;
    if (isInitial) return;
    trackPageView();
  }, [location.pathname]);

  return null;
};

export default TrackingInit;
