import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * Kfz-Versicherungsvergleich von TARIFCHECK24 (Partner-ID 204728).
 *
 * Wird erst nach einem Klick geladen: Vorher geht keine Verbindung zu
 * partner-versicherung.de raus (Datenschutz) und die Seite bleibt schnell.
 * Pflichten aus dem Partnerprogramm: als Werbung gekennzeichnet, "powered by
 * TARIFCHECK24 GmbH" sichtbar, farblich vom eigenen Inhalt abgesetzt.
 */
const SKRIPT_URL = "https://form.partner-versicherung.de/widgets/204728/tcpp-iframe-kfz/kfz-iframe.js";

const TarifcheckRechner = () => {
  const [geladen, setGeladen] = useState(false);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!geladen || !container.current) return;
    const skript = document.createElement("script");
    skript.src = SKRIPT_URL;
    skript.async = true;
    container.current.appendChild(skript);
  }, [geladen]);

  return (
    <div className="rounded-2xl border-2 border-dashed border-muted-foreground/30 bg-muted/40 p-4 sm:p-6">
      <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Werbung · Vergleichsrechner powered by TARIFCHECK24 GmbH
      </p>

      {geladen ? (
        <div ref={container}>
          <div style={{ width: "100%" }} id="tcpp-iframe-kfz" />
        </div>
      ) : (
        <div className="py-8 text-center">
          <Calculator className="mx-auto mb-3 h-10 w-10 text-muted-foreground" />
          <p className="mx-auto mb-5 max-w-lg text-sm text-muted-foreground">
            Der Vergleich wird von TARIFCHECK24 GmbH bereitgestellt. Erst mit dem Klick wird er
            geladen und Daten an TARIFCHECK24 übertragen – mehr dazu in unserer{" "}
            <a href="/datenschutz" className="font-semibold text-link hover:underline">
              Datenschutzerklärung
            </a>
            .
          </p>
          <Button size="lg" variant="cta" onClick={() => setGeladen(true)}>
            Kfz-Versicherungen vergleichen*
          </Button>
        </div>
      )}
    </div>
  );
};

export default TarifcheckRechner;
