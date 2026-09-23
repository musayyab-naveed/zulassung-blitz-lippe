import { Button } from "@/components/ui/button";
import {
  CONSENT_OEFFNEN_EVENT,
  ladeAnalytics,
  leseEinwilligung,
  speichereEinwilligung,
  widerrufeEinwilligung,
} from "@/lib/consent";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * Zustimmungs-Banner für Google Analytics.
 *
 * "Ablehnen" und "Akzeptieren" sind bewusst gleich groß und gleich auffällig –
 * eine vorausgewählte oder hervorgehobene Zustimmung wäre nach deutscher
 * Rechtsprechung unwirksam.
 */
const CookieBanner = () => {
  const [sichtbar, setSichtbar] = useState(false);
  const [warAkzeptiert, setWarAkzeptiert] = useState(false);

  useEffect(() => {
    const wahl = leseEinwilligung();
    if (wahl === "akzeptiert") {
      ladeAnalytics();
      setWarAkzeptiert(true);
    } else if (wahl === null) {
      setSichtbar(true);
    }

    const oeffnen = () => {
      setWarAkzeptiert(leseEinwilligung() === "akzeptiert");
      setSichtbar(true);
    };
    window.addEventListener(CONSENT_OEFFNEN_EVENT, oeffnen);
    return () => window.removeEventListener(CONSENT_OEFFNEN_EVENT, oeffnen);
  }, []);

  if (!sichtbar) return null;

  const akzeptieren = () => {
    speichereEinwilligung("akzeptiert");
    ladeAnalytics();
    setSichtbar(false);
  };

  const ablehnen = () => {
    if (warAkzeptiert) {
      widerrufeEinwilligung();
    } else {
      speichereEinwilligung("abgelehnt");
    }
    setSichtbar(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Einwilligung zur Webanalyse"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-border bg-background shadow-[0_-8px_30px_rgba(0,0,0,0.12)] backdrop-blur"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:gap-6 sm:px-6">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-secondary">Dürfen wir messen, wie Sie unsere Seite nutzen?</span>{" "}
          Mit Ihrer Zustimmung setzen wir Google Analytics ein, um zu verstehen, welche Seiten
          hilfreich sind. Ohne Zustimmung wird nichts geladen. Sie können Ihre Wahl jederzeit
          unten auf der Seite unter „Cookie-Einstellungen" ändern.{" "}
          <Link to="/datenschutz" className="font-semibold text-primary hover:underline">
            Mehr dazu
          </Link>
        </p>
        <div className="grid flex-none grid-cols-2 gap-2 sm:w-64">
          <Button variant="outline" onClick={ablehnen}>
            Ablehnen
          </Button>
          <Button variant="outline" onClick={akzeptieren}>
            Akzeptieren
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
