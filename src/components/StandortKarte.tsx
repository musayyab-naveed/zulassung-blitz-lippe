import { Button } from "@/components/ui/button";
import { MapPin, Navigation } from "lucide-react";
import { useState } from "react";
import { BUSINESS } from "@/content/seoRoutes";

const KARTE_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2451.8275759481676!2d8.729726099999997!3d52.0828686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47ba15cba7259a3b%3A0xcbf86083359865e5!2sKFZ-Sofortzulassung%20-%20Zulassungsdienst%2C%20Zulassungsservice%20und%20Kennzeichen!5e0!3m2!1sen!2sde!4v1761654634034!5m2!1sen!2sde";

const ROUTE_URL = BUSINESS.routeUrl;

/**
 * Google-Karte erst nach Klick laden.
 *
 * Eine eingebettete Karte meldet sich sofort beim Seitenaufruf bei Google und
 * überträgt dabei die IP-Adresse. Deshalb steht hier zunächst nur die Adresse;
 * die Karte kommt erst, wenn der Besucher sie ausdrücklich anfordert.
 */
const StandortKarte = () => {
  const [geladen, setGeladen] = useState(false);

  if (geladen) {
    return (
      <iframe
        src={KARTE_URL}
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full min-h-[400px]"
        title="KFZ-Sofortzulassung Standort auf Google Maps"
      />
    );
  }

  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 bg-muted/40 p-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <MapPin className="h-7 w-7" />
      </div>
      <div>
        <p className="text-lg font-bold text-secondary">KFZ-Sofortzulassung</p>
        <p className="text-muted-foreground">Werler Straße 68, 32105 Bad Salzuflen</p>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button asChild>
          <a href={ROUTE_URL} target="_blank" rel="noopener noreferrer">
            <Navigation className="mr-2 h-4 w-4" />
            Route planen
          </a>
        </Button>
        <Button variant="outline" onClick={() => setGeladen(true)}>
          Karte hier anzeigen
        </Button>
      </div>
      <p className="max-w-sm text-xs text-muted-foreground">
        Beim Anzeigen der Karte werden Daten an Google übertragen. Näheres in unserer
        Datenschutzerklärung.
      </p>
    </div>
  );
};

export default StandortKarte;
