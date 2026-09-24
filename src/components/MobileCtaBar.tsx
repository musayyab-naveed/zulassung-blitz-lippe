import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MobileCtaBar = () => {
  const location = useLocation();

  if (location.pathname === "/impressum" || location.pathname === "/datenschutz") {
    return null;
  }

  // Auf der Assistenten-Seite ist der Kunde bereits im Vorgang
  const imVorgang = location.pathname === "/angebot";

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background/95 backdrop-blur lg:hidden">
      <div className={`max-w-6xl mx-auto px-4 py-3 grid gap-2 ${imVorgang ? "grid-cols-1" : "grid-cols-3"}`}>
        <Button variant="outline" size="sm" asChild>
          <a href="tel:+4915142462280">
            <Phone className="h-4 w-4" />
            {imVorgang ? "Lieber anrufen: 01514 2462280" : "Anrufen"}
          </a>
        </Button>
        {/* Auf /angebot kein zweiter WhatsApp-Knopf – dort gibt es die fertige Nachricht */}
        {!imVorgang && (
        <Button
          size="sm"
          className="border border-[#15803d] bg-[#15803d] text-white hover:bg-[#166534]"
          asChild
        >
          <a
            href="https://wa.me/4915142462280?text=Hallo!%20Ich%20habe%20eine%20Frage.%20Es%20geht%20um%3A%20"
            target="_blank"
            onClick={() => window.gtag?.("event", "generate_lead", { method: "whatsapp", quelle: "handy_leiste" })}
            rel="noreferrer"
          >
            <MessageCircle className="h-4 w-4" />
            Fragen?
          </a>
        </Button>
        )}
        {!imVorgang && (
          <Button variant="cta" size="sm" asChild>
            <Link to="/angebot">Zulassung</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default MobileCtaBar;
