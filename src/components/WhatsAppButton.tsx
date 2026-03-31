import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5535984011430";

interface WhatsAppButtonProps {
  /** Context message that completes "Oi, eu vim pelo site e gostaria de mais informações sobre..." */
  context: string;
  /** Button label text */
  label: string;
  /** Additional CSS classes */
  className?: string;
  /** Show MessageCircle icon */
  showIcon?: boolean;
  /** Fully override the message (skips the standard intro) */
  customMessage?: string;
  /** onClick callback (in addition to opening WhatsApp) */
  onClick?: () => void;
}

/**
 * Builds standardised WhatsApp URL.
 * Default pattern: "Oi, eu vim pelo site e gostaria de mais informações sobre {context}."
 * Use `customMessage` to send a completely custom text.
 */
export function buildWhatsAppUrl(context: string, customMessage?: string): string {
  const text = customMessage
    ? customMessage
    : `Oi, eu vim pelo site e gostaria de mais informações sobre ${context}.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/**
 * Reusable WhatsApp CTA button.
 * Every WhatsApp button on the site should use this component (or at least `buildWhatsAppUrl`)
 * so messages are always contextual and standardised.
 */
const WhatsAppButton = ({
  context,
  label,
  className = "",
  showIcon = false,
  customMessage,
  onClick,
}: WhatsAppButtonProps) => {
  const url = buildWhatsAppUrl(context, customMessage);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={onClick}
    >
      {showIcon && <MessageCircle className="w-5 h-5" />}
      {label}
    </a>
  );
};

export default WhatsAppButton;
