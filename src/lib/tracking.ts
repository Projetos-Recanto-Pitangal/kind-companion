/**
 * Camada centralizada de rastreamento (Meta Pixel).
 * Todos os eventos do site passam por aqui para manter consistência.
 *
 * fbq é carregado em index.html. Aqui apenas envelopamos chamadas
 * com segurança (no-op se o pixel não estiver disponível).
 */

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type StandardEvent =
  | "PageView"
  | "Lead"
  | "Contact"
  | "InitiateCheckout"
  | "Schedule"
  | "ViewContent"
  | "CompleteRegistration";

export function track(event: StandardEvent, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.fbq === "function") {
      if (params) window.fbq("track", event, params);
      else window.fbq("track", event);
    }
  } catch {
    /* no-op */
  }
}

export function trackCustom(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.fbq === "function") {
      if (params) window.fbq("trackCustom", event, params);
      else window.fbq("trackCustom", event);
    }
  } catch {
    /* no-op */
  }
}

/**
 * Deriva o "source" (origem) de um clique de WhatsApp a partir da rota atual.
 */
function sourceFromPathname(pathname: string): string {
  if (pathname.startsWith("/lua-de-mel")) return "lua_de_mel";
  if (pathname.startsWith("/reserva/confirmacao")) return "reserva_confirmacao";
  if (pathname.startsWith("/reserva")) return "reserva";
  if (pathname.startsWith("/como-participar")) return "como_participar";
  if (pathname === "/" || pathname === "") return "home";
  return pathname.replace(/^\//, "").replace(/\//g, "_") || "home";
}

/**
 * Listener global de cliques: detecta WhatsApp (wa.me) e Airbnb.
 * Evita precisar instrumentar cada botão manualmente.
 */
export function initGlobalClickTracking() {
  if (typeof window === "undefined") return;
  const handler = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;
    const anchor = target.closest("a") as HTMLAnchorElement | null;
    if (!anchor || !anchor.href) return;
    const href = anchor.href;
    const source = sourceFromPathname(window.location.pathname);

    if (href.includes("wa.me") || href.includes("api.whatsapp.com")) {
      // Página de reserva = intenção mais alta -> Contact
      const isHighIntent = source === "reserva" || source === "lua_de_mel";
      track(isHighIntent ? "Contact" : "Lead", {
        content_name: "WhatsApp",
        source,
      });
    } else if (href.includes("airbnb.com")) {
      track("Schedule", { content_name: "Airbnb", source });
    }
  };
  document.addEventListener("click", handler, { capture: true });
}

/**
 * Dispara PageView a cada mudança de rota (SPA).
 * O PageView inicial já é disparado pelo snippet em index.html.
 */
export function trackPageView() {
  if (typeof window === "undefined") return;
  try {
    if (typeof window.fbq === "function") {
      window.fbq("track", "PageView");
    }
  } catch {
    /* no-op */
  }
}

/**
 * Marca milestones de scroll (50, 75, 100%) uma única vez por carregamento.
 */
export function initScrollDepthTracking() {
  if (typeof window === "undefined") return;
  const fired = new Set<number>();
  const milestones = [50, 75, 100];

  const onScroll = () => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const pct = Math.round((window.scrollY / scrollable) * 100);
    for (const m of milestones) {
      if (pct >= m && !fired.has(m)) {
        fired.add(m);
        trackCustom("ScrollDepth", {
          percent: m,
          path: window.location.pathname,
        });
      }
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
}
