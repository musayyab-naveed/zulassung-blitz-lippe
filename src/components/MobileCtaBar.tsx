import { ArrowRight, MessageCircle, Navigation, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { BUSINESS } from "@/content/seoRoutes";

/**
 * Leiste unten am Handy – wie bei Apps: Symbol über kurzem Wort.
 * Viele Kunden buchen nicht, sondern fahren einfach los – deshalb gehört „Route“ dazu.
 */
const knopf =
  "flex h-14 flex-col items-center justify-center gap-0.5 rounded-xl text-[11px] font-semibold leading-tight";

const MobileCtaBar = () => {
  const location = useLocation();

  if (location.pathname === "/impressum" || location.pathname === "/datenschutz") {
    return null;
  }

  // Auf der Anfrage-Seite steht die fertige WhatsApp-Nachricht schon bereit
  const imVorgang = location.pathname === "/angebot";

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background/95 backdrop-blur lg:hidden">
      <div className={`mx-auto grid max-w-6xl gap-2 px-3 py-2 ${imVorgang ? "grid-cols-2" : "grid-cols-4"}`}>
        <a href="tel:+4915142462280" className={`${knopf} border border-border bg-background text-secondary`}>
          <Phone className="h-5 w-5" />
          Anrufen
        </a>
        {!imVorgang && (
          <a
            href="https://wa.me/4915142462280?text=Hallo!%20Ich%20habe%20eine%20Frage.%20Es%20geht%20um%3A%20"
            target="_blank"
            rel="noreferrer"
            onClick={() => window.gtag?.("event", "generate_lead", { method: "whatsapp", quelle: "handy_leiste" })}
            className={`${knopf} bg-[#15803d] text-white`}
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp
          </a>
        )}
        <a
          href={BUSINESS.routeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`${knopf} border border-border bg-background text-secondary`}
        >
          <Navigation className="h-5 w-5" />
          Route
        </a>
        {!imVorgang && (
          <Link to="/angebot" className={`${knopf} bg-[hsl(var(--cta-orange))] text-white`}>
            <ArrowRight className="h-5 w-5" />
            Anfragen
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileCtaBar;
