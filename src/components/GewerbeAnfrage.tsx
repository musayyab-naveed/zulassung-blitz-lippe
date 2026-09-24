import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

const leadApiUrl = import.meta.env.VITE_LEAD_API_URL || "/api/lead";

const BITTE_WAEHLEN = "Bitte wählen";
const BETRIEBSARTEN = [
  "Autohaus / Gebrauchtwagenhandel",
  "Werkstatt",
  "Autovermietung / Leasing",
  "Firmenflotte (Pflege, Handwerk, Lieferdienst)",
  "Motorrad / Wohnmobil",
  "Export / Online-Handel",
  "Sonstiges",
];
const MENGEN = ["nur gelegentlich", "1–5 pro Monat", "6–20 pro Monat", "mehr als 20 pro Monat", "weiß ich noch nicht"];

/**
 * Anfrage von Firmen und Partnern (Autohäuser, Werkstätten, Flotten).
 * Bewusst ohne Preis – die Konditionen besprechen wir persönlich.
 * Geht wie der Ankauf per E-Mail über /api/lead an uns.
 */
const GewerbeAnfrage = () => {
  const [daten, setDaten] = useState({
    firma: "",
    ansprechpartner: "",
    telefon: "",
    email: "",
    betrieb: BITTE_WAEHLEN,
    menge: BITTE_WAEHLEN,
    nachricht: "",
  });
  const [sendet, setSendet] = useState(false);
  const [gesendet, setGesendet] = useState(false);
  const [fehler, setFehler] = useState("");

  const feld = (name: keyof typeof daten) => ({
    value: daten[name],
    onChange: (e: { target: { value: string } }) => setDaten({ ...daten, [name]: e.target.value }),
  });

  const absenden = async (e: FormEvent) => {
    e.preventDefault();
    if (!daten.firma.trim() || !daten.ansprechpartner.trim() || !daten.telefon.trim()) {
      setFehler("Bitte Firma, Ansprechpartner und Telefonnummer angeben.");
      return;
    }
    setSendet(true);
    setFehler("");
    try {
      const antwort = await fetch(leadApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "website.gewerbe",
          paket: "Firmenkunde / Partner",
          name: daten.ansprechpartner,
          email: daten.email || undefined,
          phone: daten.telefon,
          firma: daten.firma,
          betrieb: daten.betrieb === BITTE_WAEHLEN ? undefined : daten.betrieb,
          zulassungenProMonat: daten.menge === BITTE_WAEHLEN ? undefined : daten.menge,
          nachricht: daten.nachricht,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!antwort.ok) throw new Error(`HTTP ${antwort.status}`);
      setGesendet(true);
      window.gtag?.("event", "generate_lead", { method: "formular", quelle: "gewerbe" });
    } catch {
      setFehler(
        "Senden hat nicht geklappt – bitte Internetverbindung prüfen und erneut versuchen, oder rufen Sie uns an: 01514 2462280."
      );
    } finally {
      setSendet(false);
    }
  };

  if (gesendet) {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-trust-green/40 bg-trust-green/10 p-4">
        <CheckCircle className="mt-0.5 h-5 w-5 flex-none text-trust-green" />
        <p className="text-sm text-secondary">
          <span className="font-semibold">Danke, Ihre Anfrage ist angekommen.</span> Wir rufen Sie unter der
          angegebenen Nummer zurück und besprechen die Konditionen. Eilt es? Rufen Sie direkt an:{" "}
          <a href="tel:+4915142462280" className="font-semibold text-link hover:underline">
            01514 2462280
          </a>
        </p>
      </div>
    );
  }

  const eingabe =
    "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-secondary focus:border-primary focus:outline-none";

  return (
    <form onSubmit={absenden} className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="text-sm font-medium text-secondary">
          Firma *
          <input className={`mt-1 ${eingabe}`} {...feld("firma")} autoComplete="organization" />
        </label>
        <label className="text-sm font-medium text-secondary">
          Ansprechpartner *
          <input className={`mt-1 ${eingabe}`} {...feld("ansprechpartner")} autoComplete="name" />
        </label>
        <label className="text-sm font-medium text-secondary">
          Telefon *
          <input className={`mt-1 ${eingabe}`} type="tel" {...feld("telefon")} autoComplete="tel" />
        </label>
        <label className="text-sm font-medium text-secondary">
          E-Mail
          <input className={`mt-1 ${eingabe}`} type="email" {...feld("email")} autoComplete="email" />
        </label>
        <label className="text-sm font-medium text-secondary">
          Art des Betriebs
          <select className={`mt-1 ${eingabe}`} {...feld("betrieb")}>
            <option disabled>{BITTE_WAEHLEN}</option>
            {BETRIEBSARTEN.map((art) => (
              <option key={art}>{art}</option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-secondary">
          Zulassungen ungefähr
          <select className={`mt-1 ${eingabe}`} {...feld("menge")}>
            <option disabled>{BITTE_WAEHLEN}</option>
            {MENGEN.map((menge) => (
              <option key={menge}>{menge}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="block text-sm font-medium text-secondary">
        Nachricht (optional)
        <textarea className={`mt-1 ${eingabe}`} rows={3} {...feld("nachricht")} />
      </label>

      {fehler && <p className="text-sm font-medium text-red-600">{fehler}</p>}

      <Button type="submit" size="lg" variant="cta" disabled={sendet} className="w-full">
        {sendet ? "Wird gesendet …" : "Rückruf anfordern"}
      </Button>
      <p className="text-xs text-muted-foreground">
        Ihre Angaben nutzen wir nur, um Ihre Anfrage zu beantworten. Mehr in der{" "}
        <Link to="/datenschutz" className="font-semibold text-link hover:underline">
          Datenschutzerklärung
        </Link>
        .
      </p>
    </form>
  );
};

export default GewerbeAnfrage;
