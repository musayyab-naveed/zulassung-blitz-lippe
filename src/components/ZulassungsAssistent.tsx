import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { checkPickupAddress, type PickupCheckResult } from "@/lib/pickupCheck";
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
  Pencil,
  Sparkles,
  User,
  Building2,
} from "lucide-react";
import fahrzeugbriefImg from "@/assets/dokumente/fahrzeugbrief-zb2.jpg";
import zb1CodeImg from "@/assets/dokumente/zb1-code-verdeckt.jpg";
import plaketteImg from "@/assets/dokumente/plakette-verdeckt.jpg";
// Hinweis: zb1/zb2/plakette sind offizielle Abbildungen des BMV (bmv.de, i-Kfz-Infoseite)

type PackageKey = "sofort" | "basis" | "premium" | "abmeldung" | "ankauf_only";

type Screen =
  | "start"
  | "verkauf"
  | "condition"
  | "holder"
  | "speed"
  | "codecheck-zulassung"
  | "delivery"
  | "pickup-check"
  | "codecheck-abmeldung"
  | "abmeldung-unmoeglich"
  | "result";

export interface PremiumDeliveryOptions {
  mode: "pickup" | "shipping";
  address?: { street: string; postalCode: string; city: string };
  result?: PickupCheckResult;
}

interface Props {
  onSelectPackage: (key: PackageKey, premium?: PremiumDeliveryOptions, summary?: string) => void;
  /** Optional direkt bei einer bestimmten Frage einsteigen (z. B. Verkauf) */
  initialScreen?: Extract<Screen, "start" | "verkauf">;
}

const WHATSAPP_CHECK_URL =
  "https://wa.me/4915142462280?text=" +
  encodeURIComponent(
    "Hallo, ich möchte prüfen lassen, ob die Sofort-Zulassung/Blitzabmeldung bei meinem Fahrzeug möglich ist. Ich schicke Ihnen ein Foto von Fahrzeugbrief/Fahrzeugschein."
  );

const WHATSAPP_SELL_URL =
  "https://wa.me/4915142462280?text=" +
  encodeURIComponent(
    "Hallo, ich möchte mein Fahrzeug verkaufen.\nMarke/Modell: \nBaujahr: \nKilometerstand: \nFotos schicke ich gleich mit."
  );

interface ResultInfo {
  title: string;
  price: string;
  tagline: string;
  extras?: string;
  kennzeichenHinweis?: string;
}

const RESULTS: Record<Exclude<PackageKey, "ankauf_only">, ResultInfo> = {
  sofort: {
    title: "SOFORT-Zulassung",
    price: "ab 129 €",
    tagline: "Digital zugelassen in ca. 20 Minuten – Sie warten kurz vor Ort und fahren direkt los.",
    extras: "Optionale Extras: Wunschkennzeichen +13 € · Feinstaubplakette +6 €",
    kennzeichenHinweis:
      "Kennzeichen besorgen Sie selbst – vor oder nach der Zulassung (Wunschkennzeichen +13 €). Zugelassen sind Sie in jedem Fall.",
  },
  basis: {
    title: "BASIS",
    price: "129 €",
    tagline: "Unterlagen abgeben, am nächsten Werktag alles fertig abholen – inklusive Kennzeichen.",
    extras: "Optionale Extras: Wunschkennzeichen +13 € · Feinstaubplakette +6 €",
  },
  premium: {
    title: "PREMIUM",
    price: "159 €",
    tagline: "Wir holen Ihre Unterlagen ab und bringen alles fertig zurück – Sie müssen nirgendwo hin.",
    extras: "Optionale Extras: Wunschkennzeichen +13 € · Feinstaubplakette +6 €",
  },
  abmeldung: {
    title: "BLITZABMELDUNG",
    price: "40 €",
    tagline: "Sofort vor Ort abgemeldet – Sie warten kurz und alles ist erledigt.",
  },
};

type Condition = "neu" | "gebraucht";
type Holder = "privat" | "firma";

// Checkliste passend zu den Antworten zusammenstellen
const buildChecklist = (
  key: Exclude<PackageKey, "ankauf_only">,
  condition: Condition | null,
  holder: Holder | null
): string[] => {
  if (key === "abmeldung") {
    return [
      "Beide Kennzeichenschilder",
      "Zulassungsbescheinigung Teil I (Fahrzeugschein)",
      "Personalausweis oder Reisepass",
    ];
  }

  const items = ["eVB-Nummer Ihrer KFZ-Versicherung", "Personalausweis oder Reisepass"];

  if (condition === "neu") {
    items.push(
      "Zulassungsbescheinigung Teil II (Fahrzeugbrief)",
      "EU-Übereinstimmungsbescheinigung (COC-Papiere vom Händler)"
    );
  } else {
    items.push(
      "Zulassungsbescheinigung Teil I (Fahrzeugschein)",
      "Zulassungsbescheinigung Teil II (Fahrzeugbrief)"
    );
    if (key !== "sofort") {
      items.push("HU-Nachweis – nicht nötig, wenn die HU im Fahrzeugschein eingetragen ist");
    }
  }

  items.push("IBAN für die KFZ-Steuer");

  if (holder === "firma") {
    items.push("Gewerbeanmeldung oder Handelsregisterauszug (bei Firmenfahrzeugen)");
  }

  return items;
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

const ZulassungsAssistent = ({ onSelectPackage, initialScreen }: Props) => {
  const [screen, setScreen] = useState<Screen>(initialScreen ?? "start");
  const [history, setHistory] = useState<Screen[]>([]);
  // Antwort-Chips: ein Eintrag pro beantworteter Frage, parallel zur history
  const [answers, setAnswers] = useState<string[]>([]);
  const [resultKey, setResultKey] = useState<Exclude<PackageKey, "ankauf_only">>("sofort");
  // Sofort-Zulassung nicht möglich -> Kunde wurde in den 24h-Weg umgeleitet
  const [sofortFallback, setSofortFallback] = useState(false);

  // Antworten der neuen Fragen (steuern Siegel-Check und Checkliste)
  const [condition, setCondition] = useState<Condition | null>(null);
  const [holder, setHolder] = useState<Holder | null>(null);

  // Premium: Abwicklung inkl. geprüfter Abholadresse
  const [premiumDelivery, setPremiumDelivery] = useState<PremiumDeliveryOptions | null>(null);
  const [pickupAddress, setPickupAddress] = useState({ street: "", postalCode: "", city: "Bad Salzuflen" });
  const [pickupError, setPickupError] = useState("");
  const [pickupResult, setPickupResult] = useState<PickupCheckResult | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const historyRef = useRef<Screen[]>([]);
  const answersRef = useRef<string[]>([]);
  const isFirstRender = useRef(true);
  // Popstates, die wir selbst ausgelöst haben (Aufräumen/Chip-Sprung) und ignorieren
  const skipPopsRef = useRef(0);

  // Ein Verlaufseintrag pro Frage: jeder Browser-Zurück ist garantiert genau
  // EIN Schritt im Assistenten – auch bei schnellen Doppel-Klicks
  const go = (label: string, next: Screen) => {
    historyRef.current = [...historyRef.current, screen];
    answersRef.current = [...answersRef.current, label];
    setHistory(historyRef.current);
    setAnswers(answersRef.current);
    setScreen(next);
    window.history.pushState({ assistent: true }, "");
  };

  const stepBack = () => {
    if (historyRef.current.length === 0) return;
    const copy = [...historyRef.current];
    const last = copy.pop()!;
    historyRef.current = copy;
    answersRef.current = answersRef.current.slice(0, copy.length);
    setHistory(copy);
    setAnswers(answersRef.current);
    setScreen(last);
  };

  // Chip angeklickt: direkt zu dieser Frage zurückspringen
  const jumpTo = (index: number) => {
    if (index >= historyRef.current.length) return;
    const steps = historyRef.current.length - index;
    const target = historyRef.current[index];
    historyRef.current = historyRef.current.slice(0, index);
    answersRef.current = answersRef.current.slice(0, index);
    setHistory(historyRef.current);
    setAnswers(answersRef.current);
    setScreen(target);
    skipPopsRef.current += 1;
    window.history.go(-steps);
  };

  useEffect(() => {
    const onPop = () => {
      if (skipPopsRef.current > 0) {
        skipPopsRef.current -= 1;
        return;
      }
      stepBack();
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Zurück-Button nutzt den Browser-Verlauf, damit beide Wege identisch sind
  const back = () => {
    window.history.back();
  };

  // Assistenten-Einträge aus dem Verlauf entfernen, bevor er verlassen wird –
  // sonst bleiben stumme Einträge zurück
  const clearGuard = () => {
    const steps = historyRef.current.length;
    if (steps > 0) {
      skipPopsRef.current += 1;
      window.history.go(-steps);
    }
    historyRef.current = [];
    answersRef.current = [];
    setHistory([]);
    setAnswers([]);
  };

  const exitWith = (key: PackageKey, premium?: PremiumDeliveryOptions) => {
    const summary = answersRef.current.join(" · ");
    clearGuard();
    onSelectPackage(key, premium, summary);
  };

  const restart = () => {
    clearGuard();
    setSofortFallback(false);
    setCondition(null);
    setHolder(null);
    setPremiumDelivery(null);
    setPickupResult(null);
    setPickupError("");
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

  const finish = (label: string, key: Exclude<PackageKey, "ankauf_only">) => {
    setResultKey(key);
    go(label, "result");
  };

  const stepNumber =
    screen === "start"
      ? 1
      : screen === "result" || screen === "abmeldung-unmoeglich"
      ? 4
      : Math.min(4, history.length + 1);

  const result = RESULTS[resultKey];
  const checklist = buildChecklist(resultKey, condition, holder);
  const plzValid = /^\d{5}$/.test(pickupAddress.postalCode.trim());

  return (
    <div ref={containerRef} className="mx-auto max-w-2xl">
      {/* Fortschritt + Zurück */}
      <div className="mb-4 flex items-center justify-between">
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

      {/* Antwort-Chips: bisheriger Weg, antippen = dort weitermachen */}
      {answers.length > 0 && (
        <div className="mb-5 flex flex-wrap items-center justify-center gap-2">
          {answers.map((label, index) => (
            <button
              key={`${index}-${label}`}
              type="button"
              onClick={() => jumpTo(index)}
              title="Antippen zum Ändern"
              className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-3 py-1 text-xs font-semibold text-secondary transition-colors hover:border-primary hover:bg-primary/10"
            >
              {label}
              <Pencil className="h-3 w-3 text-muted-foreground" />
            </button>
          ))}
        </div>
      )}

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
            onClick={() => go("Zulassen", "condition")}
          />
          <AnswerCard
            icon={<FileX className="h-7 w-7 text-primary" />}
            title="Fahrzeug abmelden"
            sub="Blitzabmeldung direkt vor Ort"
            onClick={() => go("Abmelden", "codecheck-abmeldung")}
          />
          <AnswerCard
            icon={<HandCoins className="h-7 w-7 text-primary" />}
            title="Fahrzeug verkaufen"
            sub="Kostenlose und unverbindliche Ankaufanfrage"
            onClick={() => go("Verkaufen", "verkauf")}
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
            onClick={() => exitWith("ankauf_only")}
          />
        </div>
      )}

      {/* Frage 2: Neu oder gebraucht (steuert die Checkliste) */}
      {screen === "condition" && (
        <div key="condition" className="animate-in slide-in-from-right-8 fade-in duration-300 space-y-3">
          <h2 className="mb-6 text-center text-2xl font-bold text-secondary sm:text-3xl">
            Neu- oder Gebrauchtfahrzeug?
          </h2>
          <AnswerCard
            icon={<Sparkles className="h-7 w-7 text-primary" />}
            title="Neufahrzeug"
            sub="Erstzulassung – noch nie zugelassen"
            onClick={() => {
              setCondition("neu");
              go("Neufahrzeug", "holder");
            }}
          />
          <AnswerCard
            icon={<Car className="h-7 w-7 text-primary" />}
            title="Gebrauchtfahrzeug"
            sub="Umschreibung oder Wiederzulassung"
            onClick={() => {
              setCondition("gebraucht");
              go("Gebraucht", "holder");
            }}
          />
        </div>
      )}

      {/* Frage 3: Privat oder Firma (steuert die Checkliste) */}
      {screen === "holder" && (
        <div key="holder" className="animate-in slide-in-from-right-8 fade-in duration-300 space-y-3">
          <h2 className="mb-6 text-center text-2xl font-bold text-secondary sm:text-3xl">
            Auf wen wird zugelassen?
          </h2>
          <AnswerCard
            icon={<User className="h-7 w-7 text-primary" />}
            title="Privatperson"
            onClick={() => {
              setHolder("privat");
              go("Privat", "speed");
            }}
          />
          <AnswerCard
            icon={<Building2 className="h-7 w-7 text-primary" />}
            title="Firma"
            sub="Zusätzlich Gewerbeanmeldung oder Handelsregisterauszug mitbringen"
            onClick={() => {
              setHolder("firma");
              go("Firma", "speed");
            }}
          />
        </div>
      )}

      {/* Frage 4: Tempo */}
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
              go("Sofort (20 Min)", "codecheck-zulassung");
            }}
          />
          <AnswerCard
            icon={<Clock className="h-7 w-7 text-primary" />}
            title="Bis zum nächsten Werktag"
            sub="Unterlagen abgeben, fertig abholen – inkl. Kennzeichen"
            onClick={() => {
              setSofortFallback(false);
              go("Bis nächsten Werktag", "delivery");
            }}
          />
        </div>
      )}

      {/* Siegel-Check für Sofort-Zulassung */}
      {screen === "codecheck-zulassung" && (
        <div key="cc-zul" className="animate-in slide-in-from-right-8 fade-in duration-300">
          <h2 className="mb-2 text-center text-2xl font-bold text-secondary sm:text-3xl">
            Kurzer Siegel-Check
          </h2>
          <p className="mb-5 text-center text-muted-foreground">
            {condition === "neu"
              ? "Für die Sofort-Zulassung muss dieses Siegel auf Ihrem Fahrzeugbrief vorhanden sein:"
              : "Für die Sofort-Zulassung müssen diese zwei Siegel vorhanden sein:"}
          </p>

          <div
            className={`mx-auto mb-3 grid max-w-xl grid-cols-1 gap-3 ${
              condition === "neu" ? "sm:max-w-md" : "sm:grid-cols-2"
            }`}
          >
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
                {condition === "neu"
                  ? "Fahrzeugbrief (großes Papier)"
                  : "1. Fahrzeugbrief (großes Papier)"}
              </span>
            </div>
            {condition !== "neu" && (
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
            )}
          </div>
          <p className="mx-auto mb-6 max-w-md text-center text-xs text-muted-foreground">
            Nichts freirubbeln – das machen wir gemeinsam beim Termin.
          </p>

          <div className="space-y-3">
            <AnswerCard
              icon={<CheckCircle className="h-7 w-7 text-trust-green" />}
              title={condition === "neu" ? "Ja, das Siegel ist da" : "Ja, beide Siegel sind da"}
              sub="Super – die Sofort-Zulassung ist möglich"
              onClick={() => finish("Siegel ✓", "sofort")}
            />
            <AnswerCard
              icon={<FileX className="h-7 w-7 text-muted-foreground" />}
              title={condition === "neu" ? "Nein, das Siegel fehlt" : "Nein, ein Siegel fehlt"}
              sub="Kein Problem – wir übernehmen klassisch innerhalb von 24h"
              onClick={() => {
                setSofortFallback(true);
                go("Ohne Siegel → 24h", "delivery");
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

      {/* Bringen oder holen (24h-Weg) */}
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
            sub="BASIS-Paket: Abgeben und am nächsten Werktag fertig abholen"
            onClick={() => {
              setPremiumDelivery(null);
              finish("Selbst bringen", "basis");
            }}
          />
          <AnswerCard
            icon={<Truck className="h-7 w-7 text-primary" />}
            title="Bitte holen und bringen (+30 €)"
            sub="Unser PREMIUM-Paket: Wir holen die Unterlagen ab und liefern alles fertig zurück"
            onClick={() => {
              setPickupResult(null);
              setPickupError("");
              go("Abholung", "pickup-check");
            }}
          />
        </div>
      )}

      {/* Premium: Abholadresse prüfen */}
      {screen === "pickup-check" && (
        <div key="pickup-check" className="animate-in slide-in-from-right-8 fade-in duration-300">
          <h2 className="mb-2 text-center text-2xl font-bold text-secondary sm:text-3xl">
            Wohin sollen wir kommen?
          </h2>
          <p className="mb-6 text-center text-muted-foreground">
            Unser Hol- und Bringservice fährt bis ca. 10 Minuten rund um Bad Salzuflen.
          </p>

          <div className="mx-auto max-w-md space-y-4 rounded-2xl border-2 border-border bg-white p-5 sm:p-6">
            <div className="space-y-2">
              <Label htmlFor="assist-pickup-street">Straße und Hausnummer</Label>
              <div className="relative">
                <Input
                  id="assist-pickup-street"
                  placeholder="z. B. Musterstraße 12"
                  value={pickupAddress.street}
                  onChange={(event) =>
                    setPickupAddress((prev) => ({ ...prev, street: event.target.value }))
                  }
                />
                {pickupAddress.street.trim().length >= 5 && (
                  <CheckCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-trust-green" />
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="assist-pickup-plz">PLZ</Label>
                <div className="relative">
                  <Input
                    id="assist-pickup-plz"
                    placeholder="z. B. 32105"
                    value={pickupAddress.postalCode}
                    onChange={(event) => {
                      setPickupAddress((prev) => ({ ...prev, postalCode: event.target.value }));
                      setPickupResult(null);
                      setPickupError("");
                    }}
                  />
                  {plzValid && (
                    <CheckCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-trust-green" />
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assist-pickup-city">Ort</Label>
                <div className="relative">
                  <Input
                    id="assist-pickup-city"
                    placeholder="z. B. Bad Salzuflen"
                    value={pickupAddress.city}
                    onChange={(event) => {
                      setPickupAddress((prev) => ({ ...prev, city: event.target.value }));
                      setPickupResult(null);
                      setPickupError("");
                    }}
                  />
                  {pickupAddress.city.trim().length >= 3 && (
                    <CheckCircle className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-trust-green" />
                  )}
                </div>
              </div>
            </div>

            {!pickupResult && (
              <Button
                type="button"
                variant="cta"
                className="w-full"
                onClick={() => {
                  if (!pickupAddress.street.trim() || !pickupAddress.postalCode.trim() || !pickupAddress.city.trim()) {
                    setPickupError("Bitte vollständige Adresse eingeben.");
                    return;
                  }
                  setPickupError("");
                  setPickupResult(checkPickupAddress(pickupAddress.city, pickupAddress.postalCode));
                }}
              >
                Adresse prüfen
              </Button>
            )}
            {pickupError && <p className="text-sm text-destructive">{pickupError}</p>}
          </div>

          {pickupResult?.eligible && (
            <div className="mx-auto mt-4 max-w-md space-y-3">
              <div className="flex items-start gap-2 rounded-lg border border-trust-green/40 bg-trust-green/10 px-3 py-2.5">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-trust-green" />
                <span className="text-sm font-semibold text-secondary">
                  Passt – wir holen und bringen bei Ihnen!
                </span>
              </div>
              <Button
                type="button"
                variant="cta"
                size="lg"
                className="w-full"
                onClick={() => {
                  const delivery = { mode: "pickup" as const, address: pickupAddress, result: pickupResult };
                  setPremiumDelivery(delivery);
                  finish(`Abholung: ${pickupAddress.postalCode} ${pickupAddress.city}`, "premium");
                }}
              >
                WEITER
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {pickupResult && !pickupResult.eligible && (
            <div className="mx-auto mt-4 max-w-md space-y-3">
              <div className="flex items-start gap-2 rounded-lg border border-[hsl(var(--cta-orange))]/40 bg-[hsl(var(--cta-orange))]/10 px-3 py-2.5">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[hsl(var(--cta-orange))]" />
                <span className="text-sm font-semibold text-secondary">
                  {pickupResult.message} Kein Problem – so geht es weiter:
                </span>
              </div>
              <AnswerCard
                icon={<Truck className="h-7 w-7 text-primary" />}
                title="Unterlagen per Versand"
                sub="Bleibt PREMIUM: versichert einsenden, Express-Rückversand inklusive"
                onClick={() => {
                  setPremiumDelivery({ mode: "shipping" });
                  finish("Versand", "premium");
                }}
              />
              <AnswerCard
                icon={<Store className="h-7 w-7 text-primary" />}
                title="Ich bringe sie doch selbst vorbei"
                sub="Abgeben und am nächsten Werktag fertig abholen"
                onClick={() => {
                  setPremiumDelivery(null);
                  finish("Selbst bringen", "basis");
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* Sicherheitscode-Check für Blitzabmeldung */}
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
              onClick={() => finish("ab 2015 ✓", "abmeldung")}
            />
            <AnswerCard
              icon={<FileX className="h-7 w-7 text-muted-foreground" />}
              title="Nein, älter als 2015"
              sub="Dann sind keine Sicherheitscodes vorhanden"
              onClick={() => go("vor 2015", "abmeldung-unmoeglich")}
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
              <Button type="button" variant="cta" onClick={() => exitWith("ankauf_only")}>
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
            {resultKey === "premium" && premiumDelivery && (
              <>
                <p className="mt-2 text-sm font-semibold text-secondary">
                  {premiumDelivery.mode === "pickup" && premiumDelivery.address
                    ? `Abholung & Rückbringung: ${premiumDelivery.address.street}, ${premiumDelivery.address.postalCode} ${premiumDelivery.address.city}`
                    : "Abwicklung per Versand – Express-Rückversand inklusive"}
                </p>
                {premiumDelivery.mode === "shipping" && (
                  <div className="mt-2 rounded-lg border bg-muted/40 px-3 py-2.5 text-sm">
                    <p className="font-semibold text-secondary">Senden Sie Ihre Unterlagen an:</p>
                    <p className="text-muted-foreground">
                      KFZ-Sofortzulassung · Werler Straße 68 · 32105 Bad Salzuflen
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Am besten versichert mit Sendungsverfolgung (z. B. DHL). Den Express-Rückversand übernehmen wir.
                    </p>
                  </div>
                )}
              </>
            )}

            <div className="mt-5 border-t pt-5">
              <p className="mb-3 font-semibold text-secondary">Das bringen Sie mit:</p>
              <ul className="space-y-2.5">
                {checklist.map((item) => (
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

              {resultKey !== "abmeldung" && (
                <div className="mt-3 flex items-start gap-2 rounded-lg border border-primary/30 bg-primary/5 px-3 py-2.5">
                  <FileText className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="text-sm text-foreground">
                    {resultKey === "premium"
                      ? "Vollmacht und SEPA-Lastschriftmandat müssen Sie nicht vorbereiten – wir bringen die Formulare mit bzw. legen sie bei und füllen sie gemeinsam mit Ihnen aus."
                      : "Vollmacht und SEPA-Lastschriftmandat füllen Sie einfach bei uns vor Ort aus."}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <Button type="button" variant="outline" onClick={restart}>
                <RotateCcw className="h-4 w-4" />
                Neu starten
              </Button>
              <Button
                type="button"
                variant="cta"
                size="lg"
                onClick={() =>
                  exitWith(resultKey, resultKey === "premium" ? premiumDelivery ?? { mode: "pickup" } : undefined)
                }
              >
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
