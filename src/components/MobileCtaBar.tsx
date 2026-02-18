import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const MobileCtaBar = () => {
  const location = useLocation();

  if (location.pathname === "/impressum" || location.pathname === "/datenschutz") {
    return null;
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-background/95 backdrop-blur lg:hidden">
      <div className="max-w-6xl mx-auto px-4 py-3 grid grid-cols-3 gap-2">
        <Button variant="outline" size="sm" asChild>
          <a href="tel:+4915142462280">
            <Phone className="h-4 w-4" />
            Anrufen
          </a>
        </Button>
        <Button
          size="sm"
          className="border border-[#20be5d] bg-[#25D366] text-white hover:bg-[#1fb658]"
          asChild
        >
          <a
            href="https://wa.me/4915142462280?text=Hallo%2C%20ich%20habe%20eine%20Frage%20zu%20Zulassung%20und%2Foder%20Fahrzeugankauf."
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle className="h-4 w-4" />
            Fragen?
          </a>
        </Button>
        <Button variant="cta" size="sm" asChild>
          <Link to="/angebot?paket=premium">Starten</Link>
        </Button>
      </div>
    </div>
  );
};

export default MobileCtaBar;
