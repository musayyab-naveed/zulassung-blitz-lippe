import { MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

const WhatsAppFloatingButton = () => {
  const location = useLocation();

  if (location.pathname === "/impressum" || location.pathname === "/datenschutz") {
    return null;
  }

  return (
    <div className="hidden lg:block fixed bottom-6 right-6 z-50">
      <div className="mb-2 mr-1 rounded-xl border border-[#25D366]/30 bg-white px-3 py-2 text-right shadow-[0_10px_28px_-16px_rgba(0,0,0,0.35)]">
        <p className="text-xs font-semibold text-secondary">Fragen offen?</p>
        <p className="text-xs text-muted-foreground">Klicken und direkt auf WhatsApp schreiben</p>
      </div>

      <a
        href="https://wa.me/4915142462280?text=Hallo%2C%20ich%20habe%20eine%20Frage%20zu%20Zulassung%20und%2Foder%20Fahrzeugankauf."
        target="_blank"
        rel="noreferrer"
        aria-label="Jetzt per WhatsApp schreiben"
        className="group relative flex items-center gap-3 rounded-2xl border border-[#20be5d] bg-[#25D366] px-4 py-3 text-white shadow-[0_18px_40px_-18px_rgba(37,211,102,0.85)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-18px_rgba(37,211,102,0.95)]"
      >
        <span className="absolute -right-1 -top-1 inline-flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
        </span>

        <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#25D366]">
          <MessageCircle className="h-5 w-5" />
        </span>

        <span className="leading-tight">
          <span className="block text-[11px] font-semibold uppercase tracking-wide text-white/90">
            Jetzt chatten
          </span>
          <span className="block text-sm font-bold">WhatsApp Beratung starten</span>
        </span>
      </a>
    </div>
  );
};

export default WhatsAppFloatingButton;
