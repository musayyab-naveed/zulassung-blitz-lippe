import { vorgangChecklists, type VorgangChecklist } from "./faqs";
import { PACKAGES } from "./preise";

/**
 * Anfrage per WhatsApp statt Terminkalender.
 *
 * Der Kunde tippt höchstens drei Antworten an, danach steht eine fertige WhatsApp-Nachricht
 * bereit. Kein Termin, kein Formular. Die Antworten stehen in der Adresse
 * (?vorgang=…&kz=…&evb=…&wunsch=1), damit Zurück, Vorwärts und Neuladen ohne Zusatzlogik funktionieren.
 *
 * Wunsch des Betreibers (18.10.2026): Bei Zulassung und Ummeldung nicht nach dem Fall fragen
 * (neu, gebraucht, Umzug …), sondern nur, wie es laufen soll – „Online direkt vor Ort“ oder „Bis zum
 * nächsten Werktag“ (beide 129 €, deshalb nicht „mit/ohne Kennzeichen“ nennen, das verwirrt) oder
 * „Kennzeichen bleiben dran“ – mit Preis, damit der Kunde gleich weiß, was er zahlt.
 */

export const WHATSAPP_NUMMER = "4915142462280";
export const TELEFON_ANZEIGE = "01514 2462280";
export const TELEFON_LINK = "tel:+4915142462280";

/** "frage" gibt es nur noch über direkte Links (z. B. von der Firmen-Seite), nicht als Auswahl */
export type Vorgang = "zulassen" | "abmelden" | "sonder" | "verkaufen" | "frage";
export type Kennzeichen = "mit" | "ohne" | "bleiben";
export type SonderArt = "kurzzeit" | "ausfuhr";
export type Evb = "ja" | "nein";

export interface Auswahl<T extends string> {
  wert: T;
  titel: string;
  text?: string;
  preis?: string;
}

const preisVon = (key: string) => PACKAGES.find((pkg) => pkg.key === key)?.price ?? "";

export const VORGAENGE: Auswahl<Vorgang>[] = [
  { wert: "zulassen", titel: "Auto anmelden oder ummelden", text: "Neu, gebraucht oder umgezogen" },
  { wert: "abmelden", titel: "Auto abmelden", text: "Sofortabmeldung direkt vor Ort" },
  { wert: "verkaufen", titel: "Auto an uns verkaufen", text: "Kostenloses, unverbindliches Angebot" },
  { wert: "sonder", titel: "Kurzzeit- oder Ausfuhrkennzeichen", text: "Überführung, Probefahrt oder Export" },
];

/** Interne Werte: "ohne" = SOFORT (digital, Schilder selbst), "mit" = BASIS (Schilder von uns), "bleiben" = UMMELDUNG */
export const KENNZEICHEN_OPTIONEN: Auswahl<Kennzeichen>[] = [
  { wert: "ohne", titel: "Online – direkt vor Ort", text: "In ca. 20 Minuten – Schilder holen Sie selbst", preis: preisVon("sofort") },
  { wert: "mit", titel: "Bis zum nächsten Werktag", text: "Mit Kennzeichen von uns", preis: preisVon("basis") },
  { wert: "bleiben", titel: "Kennzeichen bleiben dran", text: "Bei Umzug oder Halterwechsel", preis: preisVon("ummeldung") },
];

export const SONDER_ARTEN: Auswahl<SonderArt>[] = [
  { wert: "kurzzeit", titel: "Kurzzeitkennzeichen", text: "5 Tage – für Überführung oder Probefahrt" },
  { wert: "ausfuhr", titel: "Ausfuhrkennzeichen", text: "Für den Export ins Ausland" },
];

/** Ohne eVB-Nummer geht es direkt zum Versicherungsvergleich */
export const EVB_OPTIONEN: Auswahl<Evb>[] = [
  { wert: "ja", titel: "Ja, habe ich" },
  { wert: "nein", titel: "Nein, noch nicht", text: "Dann gleich hier Kfz-Versicherung vergleichen" },
];

/** Neue Schilder heißt neue Zulassung – dafür braucht es eine eVB. Bleiben die Kennzeichen dran, fragen wir nicht. */
export const brauchtEvbFrage = ({ vorgang, kz }: { vorgang?: Vorgang; kz?: Kennzeichen }) =>
  vorgang === "zulassen" && (kz === "mit" || kz === "ohne");

/** Pakete von der Preisseite (?paket=…) beantworten die Kennzeichen-Frage schon */
export const kennzeichenAusPaket = (paket?: string | null): Kennzeichen | undefined =>
  paket === "basis" || paket === "premium" ? "mit" : paket === "sofort" ? "ohne" : paket === "ummeldung" ? "bleiben" : undefined;

export const vorgangAusPaket = (paket: string | null): Vorgang | undefined => {
  if (!paket) return undefined;
  if (paket === "abmeldung") return "abmelden";
  if (paket === "sonderkennzeichen") return "sonder";
  if (paket === "ankauf_only") return "verkaufen";
  if (["ummeldung", "sofort", "basis", "premium"].includes(paket)) return "zulassen";
  return undefined;
};

const ZULASSEN_IN_NACHRICHT: Record<Kennzeichen, string> = {
  mit: "Hallo! Ich möchte ein Auto zulassen – bis zum nächsten Werktag, mit Kennzeichen von Ihnen.",
  ohne: "Hallo! Ich möchte ein Auto online direkt bei Ihnen vor Ort zulassen – die Schilder besorge ich selbst.",
  bleiben: "Hallo! Ich möchte mein Auto ummelden – die Kennzeichen bleiben dran.",
};

export interface AnkaufDaten {
  modell: string;
  baujahr: string;
  km: string;
}

export interface AnfrageAntworten {
  vorgang?: Vorgang;
  kz?: Kennzeichen;
  sonder?: SonderArt;
  evb?: Evb;
  paket?: string;
  /** Kommt von der Wunschkennzeichen-Seite (?wunsch=1) */
  wunsch?: boolean;
  ankauf?: AnkaufDaten;
}

export const baueNachricht = ({ vorgang, kz, sonder, evb, paket, wunsch, ankauf }: AnfrageAntworten): string => {
  if (vorgang === "verkaufen") {
    return [
      "Hallo! Ich hätte gern ein unverbindliches Angebot für mein Auto.",
      "",
      `Marke/Modell: ${ankauf?.modell.trim() ?? ""}`,
      `Baujahr: ${ankauf?.baujahr.trim() ?? ""}`,
      `Kilometerstand: ${ankauf?.km.trim() ?? ""}`,
      "",
      "Fotos schicke ich gern hinterher.",
    ].join("\n");
  }

  if (vorgang === "frage") {
    return "Hallo! Ich habe eine Frage: ";
  }

  const ersteZeile =
    vorgang === "abmelden"
      ? "Hallo! Ich möchte mein Auto abmelden."
      : vorgang === "sonder"
        ? sonder === "ausfuhr"
          ? "Hallo! Ich brauche ein Ausfuhrkennzeichen."
          : sonder === "kurzzeit"
            ? "Hallo! Ich brauche ein Kurzzeitkennzeichen."
            : "Hallo! Ich brauche ein Kurzzeit- oder Ausfuhrkennzeichen."
        : kz
          ? ZULASSEN_IN_NACHRICHT[kz]
          : "Hallo! Ich möchte ein Auto zulassen.";
  const evbZeile =
    evb && brauchtEvbFrage({ vorgang, kz })
      ? evb === "ja"
        ? "Eine eVB-Nummer habe ich schon."
        : "Eine eVB-Nummer habe ich noch nicht."
      : null;
  const wunschZeile = wunsch && vorgang === "zulassen" ? "Ich hätte gern ein Wunschkennzeichen (LIP, DT oder LE)." : null;
  const premiumZeile = paket === "premium" && vorgang === "zulassen" ? "Am liebsten mit Hol- und Bringservice (PREMIUM)." : null;

  return [ersteZeile, evbZeile, wunschZeile, premiumZeile, "Wie geht es weiter?"]
    .filter((zeile) => zeile !== null)
    .join("\n");
};

export const whatsappLink = (nachricht: string) =>
  `https://wa.me/${WHATSAPP_NUMMER}?text=${encodeURIComponent(nachricht)}`;

const AUSWEIS = "Personalausweis – oder Reisepass mit Meldebescheinigung";

/** Kurze Listen für die Anfrage – die ausführlichen stehen auf /faq */
const KURZLISTEN: Record<"zulassung" | "ummeldung" | "abmeldung", VorgangChecklist> = {
  zulassung: {
    key: "zulassung-kurz",
    title: "Zulassung",
    items: [
      AUSWEIS,
      "eVB-Nummer Ihrer Kfz-Versicherung",
      "Fahrzeugbrief (Teil II) – und, falls vorhanden, Fahrzeugschein (Teil I)",
      "Bei Neuwagen: COC-Papiere",
      "Noch angemeldet? Die alten Kennzeichen",
      "Bankkarte oder IBAN – davon bucht der Zoll die Kfz-Steuer ab",
    ],
  },
  ummeldung: {
    key: "ummeldung-kurz",
    title: "Ummeldung",
    items: [
      AUSWEIS,
      "Fahrzeugschein (Teil I)",
      "Bei Halterwechsel zusätzlich: Fahrzeugbrief (Teil II), eVB-Nummer und Bankkarte oder IBAN",
    ],
  },
  abmeldung: {
    key: "abmeldung-kurz",
    title: "Sofortabmeldung",
    items: ["Beide Kennzeichen", "Fahrzeugschein (Teil I)", AUSWEIS],
    hint: "Sicherheitscodes auf Fahrzeugschein und Plaketten bitte nicht freirubbeln – das machen wir.",
  },
};

export const checklisteFuer = ({ vorgang, kz, sonder }: AnfrageAntworten): VorgangChecklist | null => {
  if (vorgang === "abmelden") return KURZLISTEN.abmeldung;
  if (vorgang === "zulassen") return kz === "bleiben" ? KURZLISTEN.ummeldung : KURZLISTEN.zulassung;
  if (vorgang === "sonder") {
    const key = sonder === "ausfuhr" ? "ausfuhrkennzeichen" : "kurzzeitkennzeichen";
    return vorgangChecklists.find((liste) => liste.key === key) ?? null;
  }
  return null;
};
