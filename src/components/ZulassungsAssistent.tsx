import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Car,
  FileX,
  HandCoins,
  Zap,
  Clock,
  Truck,
  Store,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  FileText,
  RotateCcw,
} from "lucide-react";
import fahrzeugbriefImg from "@/assets/dokumente/fahrzeugbrief-zb2.jpg";
import zb1CodeImg from "@/assets/dokumente/zb1-code-verdeckt.jpg";
import plaketteImg from "@/assets/dokumente/plakette-verdeckt.jpg";
// Hinweis: zb1/zb2/plakette sind offizielle Abbildungen des BMV (bmv.de, i-Kfz-Infoseite)

type PackageKey = "sofort" | "basis" | "premium" | "abmeldung" | "ankauf_only";

type Screen =
  | "start"
  | "verkauf"
  | "speed"
  | "codecheck-zulassung"
  | "delivery"
  | "codecheck-abmeldung"
  | "abmeldung-unmoeglich"
  | "result";

interface Props {
  onSelectPackage: (key: PackageKey) => void;
}

const WHATSAPP_CHECK_URL =
  "https://wa.me/4915142462280?text=" +
  encodeURIComponent(
    "Hallo, ich möchte prüfen lassen, ob die Sofort-Zulassung/Blitzabmeldung bei meinem Fahrzeug möglich ist. Ich schicke Ihnen ein Foto von Fahrzeugbrief/Fahrzeugschein."
  );

const WHATSAPP_SELL_URL =
  "https://wa.me/4915142462280?text=" +
  encodeURIComponent(
    "Hallo, ich m\u00f6chte mein Fahrzeug verkaufen.\nMarke/Modell: \nBaujahr: \nKilometerstand: \nFotos schicke ich gleich mit."
  );

interface ResultInfo {
  title: string;
  price: string;
  tagline: string;
  extras?: string;
  checklist: string[];
  kennzeichenHinweis?: string;
}

const RESULTS: Record<Exclude<PackageKey, "ankauf_only">, ResultInfo> = {
  sofort: {
    title: "SOFORT-Zulassung",
    price: "ab 129 €",
    tagline: "Digital zugelassen in ca. 20 Minuten – Sie warten kurz vor Ort und fahren direkt los.",
    extras: "Optionale Extras: Wunschkennzeichen +13 \u20ac \u00b7 Feinstaubplakette +6 \u20ac",
    checklist: [
      "eVB-Nummer Ihrer KFZ-Versicherung",
      "Personalausweis oder Reisepass",
      "Zulassungsbescheinigung Teil I (Fahrzeugschein)",
      "Zulassungsbescheinigung Teil II (Fahrzeugbrief)",
      "IBAN für die KFZ-Steuer",
    ],
    kennzeichenHinweis:
      "Kennzeichen besorgen Sie selbst – vor oder nach der Zulassung (Wunschkennzeichen +13 €). Zugelassen sind Sie in jedem Fall.",
  },
  basis: {
    title: "BASIS",
    price: "129 €",
    tagline: "Unterlagen abgeben, am nächsten Werktag alles fertig abholen – inklusive Kennzeichen.",
    extras: "Optionale Extras: Wunschkennzeichen +13 \u20ac \u00b7 Feinstaubplakette +6 \u20ac",
    checklist: [
      "eVB-Nummer Ihrer KFZ-Versicherung",
      "Personalausweis oder Reisepass",
      "Zulassungsbescheinigung Teil I (Fahrzeugschein)",
      "Zulassungsbescheinigung Teil II (Fahrzeugbrief)",
      "HU-Nachweis – nicht nötig, wenn die HU im Fahrzeugschein eingetragen ist",
      "IBAN für die KFZ-Steuer",
    ],
  },
  premium: {
    title: "PREMIUM",
    price: "159 €",
    tagline: "Wir holen Ihre Unterlagen ab und bringen alles fertig zurück – Sie müssen nirgendwo hin.",
    extras: "Optionale Extras: Wunschkennzeichen +13 \u20ac \u00b7 Feinstaubplakette +6 \u20ac",
    checklist: [
      "eVB-Nummer Ihrer KFZ-Versicherung",
      "Personalausweis oder Reisepass",
      "Zulassungsbescheinigung Teil I (Fahrzeugschein)",
      "Zulassungsbescheinigung Teil II (Fahrzeugbrief)",
      "HU-Nachweis – nicht nötig, wenn die HU im Fahrzeugschein eingetragen ist",
      "IBAN für die KFZ-Steuer",
    ],
  },
  abmeldung: {
    title: "BLITZABMELDUNG",
    price: "40 €",
    tagline: "Sofort vor Ort abgemeldet – Sie warten kurz und alles ist erledigt.",
    checklist: [
      "Beide Kennzeichenschilder",
      "Zulassungsbescheinigung Teil I (Fahrzeugschein)",
      "Personalausweis oder Reisepass",
    ],
  },
};

export const AnswerCard = ({
  icon,
  title,
  sub,
  onClick,
  accent = false,
  selected = false,
}: {
  icon: React.ReactNode;
  title: string;
  sub?: string;
  onClick: () => void;
  accent?: boolean;
  selected?: boolean;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={selected}
    className={`group flex w-full items-center gap-4 rounded-2xl border-2 p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:p-6 ${
      selected
        ? "border-[hsl(var(--cta-orange))] bg-[hsl(var(--cta-orange))]/5"
        : accent
        ? "border-[hsl(var(--cta-orange))]/60 bg-white"
        : "border-border bg-white hover:border-primary/60"
    }`}
  >
    <span
      className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full ${
        accent ? "bg-[hsl(var(--cta-orange))]/10" : "bg-primary/10"
      }`}
    >
      {icon}
    </span>
    <span className="flex-1">
      <span className="block text-lg font-bold text-secondary">{title}</span>
      {sub && <span className="mt-0.5 block text-sm text-muted-foreground">{sub}</span>}
    </span>
    <ArrowRight className="h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
  </button>
);

const ZulassungsAssistent = ({ onSelectPackage }: Props) => {
  const [screen, setScreen] = useState<Screen>("start");
  const [history, setHistory] = useState<Screen[]>([]);
  const [resultKey, setResultKey] = useState<Exclude<PackageKey, "ankauf_only">>("sofort");
  // Sofort-Zulassung nicht möglich -> Kunde wurde in den 24h-Weg umgeleitet
  const [sofortFallback, setSofortFallback] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const historyRef = useRef<Screen[]>([]);
  const isFirstRender = useRef(true);

  const go = (next: Screen) => {
    historyRef.current = [...historyRef.current, screen];
    setHistory(historyRef.current);
    setScreen(next);
    // eigener Verlaufseintrag pro Frage, damit der Browser-Zurück-Button
    // einen Schritt im Assistenten zurückgeht statt die Seite zu verlassen
    window.history.pushState({ assistent: true }, "");
  };

  const stepBack = () => {
    if (historyRef.current.length === 0) return;
    const copy = [...historyRef.current];
    const last = copy.pop()!;
    historyRef.current = copy;
    setHistory(copy);
    setScreen(last);
  };

  useEffect(() => {
    const onPop = () => stepBack();
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Zurück-Button nutzt den Browser-Verlauf, damit beide Wege identisch sind
  const back = () => {
    window.history.back();
  };

  const restart = () => {
    historyRef.current = [];
    setHistory([]);
    setSofortFallback(false);
    setScreen("start");
  };

  // Bei jedem Schrittwechsel an den Anfang des Assistenten scrollen,
  // damit Hinweise oben (z. B. "Kein Problem ...") immer sichtbar sind
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const el = containerRef.current;
    if (!el) return;
    const top = window.scrollY + el.getBoundingClientRect().top - 130;
    window.scrollTo({ top: Math.max(top, 0), behavior: "auto" });
  }, [screen]);

  const finish = (key: Exclude<PackageKey, "ankauf_only">) => {
    setResultKey(key);
    go("result");
  };

  const stepNumber =
    screen === "start" ? 1 : screen === "result" || screen === "abmeldung-unmoeglich" ? 4 : history.length + 1;

  const result = RESULTS[resultKey];

  return (
    <div ref={containerRef} className="mx-auto max-w-2xl">
      {/* Fortschritt + Zurück */}
      <div className="mb-6 flex items-center justify-between">
        {history.length > 0 ? (
          <Button type="button" variant="ghost" size="sm" onClick={back}>
            <ArrowLeft className="h-4 w-4" />
            Zurück
          </Button>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-1.5">
          {[1, 2, 3, 4].map((dot) => (
            <span
              key={dot}
              className={`h-2 rounded-full transition-all duration-300 ${
                dot <= stepNumber ? "w-6 bg-primary" : "w-2 bg-muted-foreground/25"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Frage 1: Anliegen */}
      {screen === "start" && (
        <div key="start" className="animate-in slide-in-from-right-8 fade-in duration-300 space-y-3">
          <h2 className="mb-6 text-center text-2xl font-bold text-secondary sm:text-3xl">
            Was möchten Sie erledigen?
          </h2>
          <AnswerCard
            icon={<Car className="h-7 w-7 text-primary" />}
            title="Fahrzeug zulassen"
            sub="Neuzulassung, Umschreibung oder Wiederzulassung"
            onClick={() => go("speed")}
          />
          <AnswerCard
            icon={<FileX className="h-7 w-7 text-primary" />}
            title="Fahrzeug abmelden"
            sub="Blitzabmeldung direkt vor Ort"
            onClick={() => go("codecheck-abmeldung")}
          />
          <AnswerCard
            icon={<HandCoins className="h-7 w-7 text-primary" />}
            title="Fahrzeug verkaufen"
            sub="Kostenlose und unverbindliche Ankaufanfrage"
            onClick={() => go("verkauf")}
          />
        </div>
      )}

      {/* Verkauf: WhatsApp oder Formular */}
      {screen === "verkauf" && (
        <div key="verkauf" className="animate-in slide-in-from-right-8 fade-in duration-300 space-y-3">
          <h2 className="mb-6 text-center text-2xl font-bold text-secondary sm:text-3xl">
            Wie möchten Sie Ihr Fahrzeug anbieten?
          </h2>
          <AnswerCard
            accent
            icon={<MessageCircle className="h-7 w-7 text-[#1fb658]" />}
            title="Fotos per WhatsApp schicken"
            sub="Der schnellste Weg – wir melden uns mit einer Einschätzung"
            onClick={() => window.open(WHATSAPP_SELL_URL, "_blank", "noopener")}
          />
          <AnswerCard
            icon={<Car className="h-7 w-7 text-primary" />}
            title="Formular ausfüllen"
            sub="Fahrzeugdaten angeben, dann Termin oder Rückruf wählen"
            onClick={() => onSelectPackage("ankauf_only")}
          />
        </div>
      )}

      {/* Frage 2: Tempo */}
      {screen === "speed" && (
        <div key="speed" className="animate-in slide-in-from-right-8 fade-in duration-300 space-y-3">
          <h2 className="mb-6 text-center text-2xl font-bold text-secondary sm:text-3xl">
            Wie schnell soll es gehen?
          </h2>
          <AnswerCard
            accent
            icon={<Zap className="h-7 w-7 text-[hsl(var(--cta-orange))]" />}
            title="Sofort – in ca. 20 Minuten"
            sub="Digital vor Ort, kurz warten, direkt losfahren"
            onClick={() => {
              setSofortFallback(false);
              go("codecheck-zulassung");
            }}
          />
          <AnswerCard
            icon={<Clock className="h-7 w-7 text-primary" />}
            title="Bis zum nächsten Werktag"
            sub="Unterlagen abgeben, fertig abholen – inkl. Kennzeichen"
            onClick={() => {
              setSofortFallback(false);
              go("delivery");
            }}
          />
        </div>
      )}

      {/* Frage 3a: Sicherheitscode-Check für Sofort-Zulassung */}
      {screen === "codecheck-zulassung" && (
        <div key="cc-zul" className="animate-in slide-in-from-right-8 fade-in duration-300">
          <h2 className="mb-2 text-center text-2xl font-bold text-secondary sm:text-3xl">
            Kurzer Siegel-Check
          </h2>
          <p className="mb-5 text-center text-muted-foreground">
            Für die Sofort-Zulassung müssen diese zwei Siegel vorhanden sein:
          </p>

          <div className="mx-auto mb-3 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="relative overflow-hidden rounded-xl border shadow-md">
              <img
                src={fahrzeugbriefImg}
                alt="Fahrzeugbrief mit markiertem Siegel-Feld"
                className="w-full"
              />
              <span
                className="absolute animate-pulse rounded-lg border-4 border-[hsl(var(--cta-orange))]"
                style={{ left: "2.5%", top: "34.5%", width: "17%", height: "15.5%" }}
              />
              <span
                className="absolute rounded-md bg-[hsl(var(--cta-orange))] px-2 py-1 text-[11px] font-bold text-white shadow"
                style={{ left: "21%", top: "40%" }}
              >
                ← Siegel
              </span>
              <span className="absolute bottom-0 left-0 right-0 bg-secondary/80 px-2 py-1 text-center text-[11px] text-white">
                1. Fahrzeugbrief (großes Papier)
              </span>
            </div>
            <div className="relative overflow-hidden rounded-xl border shadow-md">
              <div className="h-full w-full overflow-hidden">
                <img
                  src={zb1CodeImg}
                  alt="Fahrzeugschein mit Siegel-Aufkleber auf der Rückseite"
                  className="h-full w-[200%] max-w-none object-cover"
                />
              </div>
              <span className="absolute bottom-0 left-0 right-0 bg-secondary/80 px-2 py-1 text-center text-[11px] text-white">
                2. Fahrzeugschein (Rückseite): Aufkleber
              </span>
            </div>
          </div>
          <p className="mx-auto mb-6 max-w-md text-center text-xs text-muted-foreground">
            Nichts freirubbeln – das machen wir gemeinsam beim Termin.
          </p>

          <div className="space-y-3">
            <AnswerCard
              icon={<CheckCircle className="h-7 w-7 text-trust-green" />}
              title="Ja, beide Siegel sind da"
              sub="Super – die Sofort-Zulassung ist möglich"
              onClick={() => finish("sofort")}
            />
            <AnswerCard
              icon={<FileX className="h-7 w-7 text-muted-foreground" />}
              title="Nein, ein Siegel fehlt"
              sub="Kein Problem – wir übernehmen klassisch innerhalb von 24h"
              onClick={() => {
                setSofortFallback(true);
                go("delivery");
              }}
            />
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Nicht sicher?{" "}
            <a
              href={WHATSAPP_CHECK_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#1fb658] hover:underline"
            >
              <MessageCircle className="h-4 w-4" />
              Foto per WhatsApp schicken – wir prüfen das sofort
            </a>
          </p>
        </div>
      )}

      {/* Frage 3b: Bringen oder holen (24h-Weg) */}
      {screen === "delivery" && (
        <div key="delivery" className="animate-in slide-in-from-right-8 fade-in duration-300 space-y-3">
          {sofortFallback && (
            <div className="mb-4 flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3">
              <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
              <p className="text-sm text-foreground">
                Kein Problem: Ohne die Siegel übernehmen wir Ihre Zulassung klassisch –
                fertig innerhalb von 24 Stunden, inklusive Kennzeichen.
              </p>
            </div>
          )}
          <h2 className="mb-6 text-center text-2xl font-bold text-secondary sm:text-3xl">
            Wie kommen die Unterlagen zu uns?
          </h2>
          <AnswerCard
            icon={<Store className="h-7 w-7 text-primary" />}
            title="Ich bringe sie vorbei"
            sub="Abgeben und am nächsten Werktag fertig abholen"
            onClick={() => finish("basis")}
          />
          <AnswerCard
            icon={<Truck className="h-7 w-7 text-primary" />}
            title="Bitte holen und bringen"
            sub="Wir holen die Unterlagen ab und liefern alles fertig zurück"
            onClick={() => finish("premium")}
          />
        </div>
      )}

      {/* Frage 2b: Sicherheitscode-Check für Blitzabmeldung */}
      {screen === "codecheck-abmeldung" && (
        <div key="cc-abm" className="animate-in slide-in-from-right-8 fade-in duration-300">
          <h2 className="mb-2 text-center text-2xl font-bold text-secondary sm:text-3xl">
            Kurzer Check für die Blitzabmeldung
          </h2>
          <p className="mb-5 text-center text-muted-foreground">
            Die Blitzabmeldung geht nur bei Fahrzeugen mit Zulassung <strong>ab 2015</strong> –
            dann sind diese Siegel vorhanden:
          </p>

          <div className="mx-auto mb-6 max-w-xl space-y-3">
            <div className="relative overflow-hidden rounded-xl border shadow-md">
              <img
                src={plaketteImg}
                alt="Kennzeichen mit Stempelplakette und verdecktem Sicherheitscode (offizielle Abbildung)"
                className="w-full"
              />
              <span className="absolute bottom-0 left-0 right-0 bg-secondary/80 px-2 py-1 text-center text-[11px] text-white">
                Stempelplakette auf dem Kennzeichen – darunter sitzt der verdeckte Code
              </span>
            </div>
            <div className="relative overflow-hidden rounded-xl border shadow-md">
              <img
                src={zb1CodeImg}
                alt="Rückseite des Fahrzeugscheins mit verdecktem und freigelegtem Sicherheitscode (offizielle Abbildung)"
                className="w-full"
              />
              <span className="absolute bottom-0 left-0 right-0 bg-secondary/80 px-2 py-1 text-center text-[11px] text-white">
                Rückseite des Fahrzeugscheins: Aufkleber mit verdecktem Code (links) – freigelegt (rechts)
              </span>
            </div>
            <p className="text-center text-xs text-muted-foreground">
              Wichtig: Noch nichts freirubbeln oder abziehen – das machen wir gemeinsam beim Termin.
            </p>
          </div>

          <div className="space-y-3">
            <AnswerCard
              icon={<CheckCircle className="h-7 w-7 text-trust-green" />}
              title="Ja, mein Fahrzeug ist ab 2015 zugelassen"
              sub="Die Codes sind vorhanden – Blitzabmeldung möglich"
              onClick={() => finish("abmeldung")}
            />
            <AnswerCard
              icon={<FileX className="h-7 w-7 text-muted-foreground" />}
              title="Nein, älter als 2015"
              sub="Dann sind keine Sicherheitscodes vorhanden"
              onClick={() => go("abmeldung-unmoeglich")}
            />
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Nicht sicher?{" "}
            <a
              href={WHATSAPP_CHECK_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[#1fb658] hover:underline"
            >
              <MessageCircle className="h-4 w-4" />
              Foto per WhatsApp schicken – wir prüfen das sofort
            </a>
          </p>
        </div>
      )}

      {/* Abmeldung nicht möglich */}
      {screen === "abmeldung-unmoeglich" && (
        <div key="abm-no" className="animate-in slide-in-from-right-8 fade-in duration-300">
          <div className="rounded-xl border border-[hsl(var(--cta-orange))]/40 bg-[hsl(var(--cta-orange))]/10 p-6 text-center">
            <AlertCircle className="mx-auto mb-3 h-10 w-10 text-[hsl(var(--cta-orange))]" />
            <h2 className="mb-2 text-xl font-bold text-secondary">
              Die Blitzabmeldung ist hier leider nicht möglich
            </h2>
            <p className="text-muted-foreground">
              Ohne die Sicherheitscodes (Fahrzeuge mit Zulassung vor 2015) kann die Abmeldung nicht
              digital durchgeführt werden. In diesem Fall hilft nur der direkte Weg zur
              Zulassungsstelle.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Tipp: Sie möchten das Fahrzeug ohnehin loswerden? Beim Verkauf an uns ist die
              Abmeldung gratis – wir kümmern uns darum.
            </p>
            <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
              <Button type="button" variant="cta" onClick={() => onSelectPackage("ankauf_only")}>
                Fahrzeug verkaufen
              </Button>
              <Button type="button" variant="outline" onClick={restart}>
                <RotateCcw className="h-4 w-4" />
                Neu starten
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Ergebnis: Paket + Preis + Checkliste */}
      {screen === "result" && (
        <div key="result" className="animate-in slide-in-from-right-8 fade-in duration-300">
          <div className="rounded-2xl border-2 border-primary bg-white p-6 shadow-[0_18px_45px_-26px_hsl(var(--primary)/0.7)] sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Unsere Empfehlung für Sie
            </p>
            <div className="mt-1 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="text-2xl font-bold text-secondary sm:text-3xl">{result.title}</h2>
              <span className="text-3xl font-bold text-primary">{result.price}</span>
            </div>
            <p className="mt-2 text-muted-foreground">{result.tagline}</p>
            {result.extras && (
              <p className="mt-1 text-sm text-muted-foreground">({result.extras})</p>
            )}

            <div className="mt-5 border-t pt-5">
              <p className="mb-3 font-semibold text-secondary">Das bringen Sie mit:</p>
              <ul className="space-y-2.5">
                {result.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-trust-green" />
                    <span className="text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              {result.kennzeichenHinweis && (
                <div className="mt-4 flex items-start gap-2 rounded-lg border border-[hsl(var(--cta-orange))]/40 bg-[hsl(var(--cta-orange))]/10 px-3 py-2.5">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--cta-orange))]" />
                  <span className="text-sm font-semibold text-secondary">{result.kennzeichenHinweis}</span>
                </div>
              )}

              <div className="mt-3 flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2.5">
                <FileText className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span className="text-sm text-foreground">
                  Vollmacht und SEPA-Lastschriftmandat füllen Sie einfach bei uns vor Ort aus.
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <Button type="button" variant="outline" onClick={restart}>
                <RotateCcw className="h-4 w-4" />
                Neu starten
              </Button>
              <Button type="button" variant="cta" size="lg" onClick={() => onSelectPackage(resultKey)}>
                WEITER ZUR BUCHUNG
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ZulassungsAssistent;
