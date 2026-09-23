import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, ImagePlus, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

/**
 * Ankaufanfrage per Formular – die Alternative für alle ohne WhatsApp.
 * Geht wie bisher über die Netlify-Funktion /api/lead als E-Mail an uns.
 */

interface Bild {
  id: string;
  name: string;
  type: string;
  size: number;
  dataUrl: string;
}

const MAX_BILDER = 4;
const leadApiUrl = import.meta.env.VITE_LEAD_API_URL || "/api/lead";

/** Handyfotos auf max. 1280 px verkleinern – sonst sprengen vier Bilder das E-Mail-Limit */
const verkleinern = (file: File) =>
  new Promise<Bild>((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      const scale = Math.min(1, 1280 / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.width * scale));
      canvas.height = Math.max(1, Math.round(img.height * scale));
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("canvas_failed"));
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
      resolve({
        id: `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 9)}`,
        name: file.name.replace(/\.[^.]+$/, "") + ".jpg",
        type: "image/jpeg",
        size: Math.round((dataUrl.length * 3) / 4),
        dataUrl,
      });
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("file_read_failed"));
    };
    img.src = objectUrl;
  });

const AnkaufFormular = () => {
  const [daten, setDaten] = useState({ marke: "", modell: "", baujahr: "", kilometerstand: "", telefon: "" });
  const [bilder, setBilder] = useState<Bild[]>([]);
  const [fehler, setFehler] = useState("");
  const [sendet, setSendet] = useState(false);
  const [gesendet, setGesendet] = useState(false);

  const feld = (name: keyof typeof daten) => ({
    value: daten[name],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setDaten((d) => ({ ...d, [name]: e.target.value })),
  });

  const bilderHinzufuegen = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const frei = MAX_BILDER - bilder.length;
    if (frei <= 0) {
      setFehler(`Maximal ${MAX_BILDER} Bilder möglich.`);
      return;
    }
    const neu = Array.from(files).slice(0, frei);
    if (neu.some((f) => !f.type.startsWith("image/"))) {
      setFehler("Nur Bilddateien sind erlaubt.");
      return;
    }
    if (neu.some((f) => f.size > 15 * 1024 * 1024)) {
      setFehler("Ein Bild ist größer als 15 MB. Bitte ein kleineres wählen.");
      return;
    }
    try {
      const fertig = await Promise.all(neu.map(verkleinern));
      setBilder((b) => [...b, ...fertig]);
      setFehler("");
    } catch {
      setFehler("Bilder konnten nicht gelesen werden. Bitte erneut versuchen.");
    }
  };

  const absenden = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!daten.marke.trim() || !daten.telefon.trim()) {
      setFehler("Bitte mindestens Marke und Telefonnummer angeben.");
      return;
    }
    setSendet(true);
    setFehler("");
    try {
      const antwort = await fetch(leadApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "website.ankauf",
          paket: "Fahrzeugankauf",
          fahrzeugankauf: "Ja",
          kontaktwunsch: "Rückruf mit Einschätzung",
          phone: daten.telefon,
          fahrzeugdaten: daten,
          fahrzeugbilder: bilder.map(({ name, type, size }) => ({ name, type, size })),
          imageAttachments: bilder,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!antwort.ok) throw new Error(`HTTP ${antwort.status}`);
      setGesendet(true);
    } catch {
      setFehler(
        "Senden hat nicht geklappt – bitte Internetverbindung prüfen und erneut versuchen, oder rufen Sie uns an."
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
          <span className="font-semibold">Danke, Ihre Anfrage ist angekommen.</span> Wir melden uns
          telefonisch mit einer Einschätzung.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={absenden} className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <Label htmlFor="ank-marke">Marke *</Label>
          <Input id="ank-marke" placeholder="z. B. VW" {...feld("marke")} />
        </div>
        <div>
          <Label htmlFor="ank-modell">Modell</Label>
          <Input id="ank-modell" placeholder="z. B. Golf" {...feld("modell")} />
        </div>
        <div>
          <Label htmlFor="ank-baujahr">Baujahr</Label>
          <Input id="ank-baujahr" inputMode="numeric" placeholder="z. B. 2014" {...feld("baujahr")} />
        </div>
        <div>
          <Label htmlFor="ank-km">Kilometerstand</Label>
          <Input id="ank-km" inputMode="numeric" placeholder="z. B. 145000" {...feld("kilometerstand")} />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="ank-tel">Telefon für den Rückruf *</Label>
          <Input id="ank-tel" type="tel" autoComplete="tel" placeholder="z. B. 0151 …" {...feld("telefon")} />
        </div>
      </div>

      <div>
        <Label>Fotos (bis zu {MAX_BILDER}, freiwillig)</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {bilder.map((bild) => (
            <div key={bild.id} className="relative h-20 w-20 overflow-hidden rounded-lg border border-border">
              <img src={bild.dataUrl} alt={bild.name} className="h-full w-full object-cover" />
              <button
                type="button"
                aria-label="Bild entfernen"
                onClick={() => setBilder((b) => b.filter((x) => x.id !== bild.id))}
                className="absolute right-1 top-1 rounded-full bg-background/90 p-0.5"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
          {bilder.length < MAX_BILDER && (
            <label className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border text-xs text-muted-foreground hover:border-primary hover:text-primary">
              <ImagePlus className="mb-1 h-5 w-5" />
              Foto
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  void bilderHinzufuegen(e.target.files);
                  e.target.value = "";
                }}
              />
            </label>
          )}
        </div>
      </div>

      {fehler && <p className="text-sm font-medium text-destructive">{fehler}</p>}

      <Button type="submit" disabled={sendet} className="w-full sm:w-auto">
        {sendet ? "Wird gesendet …" : "Ankaufanfrage senden"}
      </Button>
      <p className="text-xs text-muted-foreground">
        Ihre Angaben nutzen wir nur für diese Anfrage.{" "}
        <Link to="/datenschutz" className="underline">
          Datenschutz
        </Link>
      </p>
    </form>
  );
};

export default AnkaufFormular;
