import { vorgangChecklists, type VorgangChecklist } from "./faqs";

/**
 * Anfrage per WhatsApp statt Terminkalender.
 *
 * Der Kunde beantwortet höchstens drei Fragen durch Antippen, danach steht eine
 * fertige WhatsApp-Nachricht bereit. Kein Termin, kein Formular. Die Antworten
 * stehen in der Adresse (?vorgang=…&art=…&evb=…&wunsch=1), damit Zurück und Vorwärts im
 * Browser und das Neuladen der Seite ohne Zusatzlogik funktionieren.
 */

export const WHATSAPP_NUMMER = "4915142462280";
export const TELEFON_ANZEIGE = "01514 2462280";
export const TELEFON_LINK = "tel:+4915142462280";

export type Vorgang = "zulassen" | "abmelden" | "sonder" | "verkaufen" | "frage";
export type Art =
  | "neu"
  | "gebraucht"
  | "wieder"
  | "umzug"
  | "unklar"
  | "kurzzeit"
  | "ausfuhr";
export type Evb = "ja" | "vergleich" | "nein";

export interface Auswahl<T extends string> {
  wert: T;
  titel: string;
  text?: string;
}

export const VORGAENGE: Auswahl<Vorgang>[] = [
  { wert: "zulassen", titel: "Fahrzeug zulassen oder ummelden", text: "Neu, gebraucht, geerbt, wieder anmelden oder Umzug" },
  { wert: "abmelden", titel: "Fahrzeug abmelden", text: "Blitzabmeldung direkt vor Ort" },
  { wert: "sonder", titel: "Kurzzeit- oder Ausfuhrkennzeichen", text: "Überführung, Probefahrt oder Export" },
  { wert: "verkaufen", titel: "Auto an uns verkaufen", text: "Wir kaufen Ihr Auto an – kostenlose Anfrage" },
  { wert: "frage", titel: "Ich habe nur eine Frage", text: "Direkt zu WhatsApp" },
];

export const ARTEN: Auswahl<Art>[] = [
  { wert: "neu", titel: "Neuwagen", text: "Fabrikneu, noch nie zugelassen" },
  { wert: "gebraucht", titel: "Auto übernommen – gekauft, geschenkt oder geerbt", text: "Das Auto kommt auf Ihren Namen" },
  { wert: "wieder", titel: "Abgemeldetes Auto wieder anmelden", text: "Wiederzulassung" },
  { wert: "umzug", titel: "Umgezogen – Adresse ändern", text: "Innerhalb von Lippe oder neu zugezogen" },
  { wert: "unklar", titel: "Weiß ich nicht genau", text: "Kein Problem – das klären wir im Chat" },
];

/** Auswahl bei Kurzzeit- oder Ausfuhrkennzeichen */
export const SONDER_ARTEN: Auswahl<Art>[] = [
  { wert: "kurzzeit", titel: "Kurzzeitkennzeichen", text: "5 Tage – für Überführung oder Probefahrt" },
  { wert: "ausfuhr", titel: "Ausfuhrkennzeichen", text: "Für den Export ins Ausland" },
  { wert: "unklar", titel: "Weiß ich nicht genau", text: "Kein Problem – das klären wir im Chat" },
];

/** Hat der Kunde schon eine Versicherung? Nur bei Zulassungen, die eine neue eVB brauchen */
export const EVB_OPTIONEN: Auswahl<Evb>[] = [
  { wert: "ja", titel: "Ja, ich habe die Nummer", text: "Code aus 7 Zeichen von meiner Versicherung" },
  {
    wert: "vergleich",
    titel: "Ja – aber ich möchte Preise vergleichen",
    text: "Vielleicht gibt es eine günstigere Versicherung",
  },
  { wert: "nein", titel: "Nein – oder ich weiß es nicht", text: "Kein Problem – Sie können die Nachricht trotzdem gleich senden" },
];

/** Neuzulassung, Umschreibung und Wiederzulassung brauchen eine eVB – Umzug und Kennzeichenwechsel nicht */
export const brauchtEvbFrage = ({ vorgang, art }: { vorgang?: Vorgang; art?: Art }) =>
  vorgang === "zulassen" && (art === "neu" || art === "gebraucht" || art === "wieder" || art === "unklar");

const EVB_IN_NACHRICHT: Record<Evb, string> = {
  ja: "Eine eVB-Nummer habe ich schon.",
  vergleich: "Eine eVB-Nummer habe ich, ich schaue aber noch nach einer günstigeren Versicherung.",
  nein: "Eine eVB-Nummer habe ich noch nicht.",
};

/** Erster Satz der Nachricht – so, wie ein Kunde es selbst schreiben würde */
const ZULASSEN_IN_NACHRICHT: Record<Art, string> = {
  neu: "Hallo! Ich möchte einen Neuwagen zulassen.",
  gebraucht: "Hallo! Ich habe ein Auto übernommen (gekauft, geschenkt oder geerbt) und möchte es auf mich zulassen.",
  wieder: "Hallo! Ich möchte mein abgemeldetes Auto wieder anmelden.",
  umzug: "Hallo! Ich bin umgezogen und möchte die Adresse im Fahrzeugschein ändern lassen.",
  unklar: "Hallo! Ich möchte ein Fahrzeug zulassen, weiß aber nicht genau, welcher Fall das ist.",
  kurzzeit: "Hallo! Ich brauche ein Kurzzeitkennzeichen.",
  ausfuhr: "Hallo! Ich brauche ein Ausfuhrkennzeichen.",
};

/** Paketnamen, wie sie von der Preisseite (?paket=…) mitkommen */
const PAKET_IN_NACHRICHT: Record<string, string> = {
  sofort: "SOFORT (digital in ca. 20 Minuten)",
  basis: "BASIS (nächster Werktag, mit Kennzeichen)",
  premium: "PREMIUM (Hol- und Bringservice)",
  abmeldung: "BLITZABMELDUNG",
  sonderkennzeichen: "KURZZEIT- / AUSFUHRKENNZEICHEN",
};

export interface AnfrageAntworten {
  vorgang?: Vorgang;
  art?: Art;
  evb?: Evb;
  paket?: string;
  /** Kommt von der Wunschkennzeichen-Seite (?wunsch=1) */
  wunsch?: boolean;
}

export const baueNachricht = ({ vorgang, art, evb, paket, wunsch }: AnfrageAntworten): string => {
  if (vorgang === "verkaufen") {
    return [
      "Hallo! Ich möchte mein Auto an Sie verkaufen.",
      "",
      "Marke/Modell: ",
      "Baujahr: ",
      "Kilometerstand: ",
      "",
      "Fotos schicke ich gern hinterher.",
    ].join("\n");
  }

  if (vorgang === "frage") {
    return "Hallo! Ich habe eine Frage zur KFZ-Zulassung: ";
  }

  const ersteZeile =
    vorgang === "abmelden"
      ? "Hallo! Ich möchte mein Auto abmelden."
      : vorgang === "sonder"
        ? art === "kurzzeit" || art === "ausfuhr"
          ? ZULASSEN_IN_NACHRICHT[art]
          : "Hallo! Ich brauche ein Kurzzeit- oder Ausfuhrkennzeichen."
        : art
          ? ZULASSEN_IN_NACHRICHT[art]
          : "Hallo! Ich möchte ein Fahrzeug zulassen.";
  const evbZeile = evb && brauchtEvbFrage({ vorgang, art }) ? EVB_IN_NACHRICHT[evb] : null;
  const wunschZeile = wunsch && vorgang === "zulassen" ? "Ich hätte gern ein Wunschkennzeichen (LIP, DT oder LE)." : null;
  const paketZeile =
    paket && PAKET_IN_NACHRICHT[paket] && vorgang !== "sonder"
      ? `Am liebsten mit dem Paket ${PAKET_IN_NACHRICHT[paket]}.`
      : null;

  return [ersteZeile, evbZeile, wunschZeile, paketZeile, "Wie geht es weiter?"]
    .filter((zeile) => zeile !== null)
    .join("\n");
};

export const whatsappLink = (nachricht: string) =>
  `https://wa.me/${WHATSAPP_NUMMER}?text=${encodeURIComponent(nachricht)}`;

/** Welche Unterlagen-Liste passt zur Antwort? Bei "weiß ich nicht" die häufigste. */
export const checklisteFuer = ({ vorgang, art }: AnfrageAntworten): VorgangChecklist | null => {
  const zulassenListe: Partial<Record<Art, string>> = {
    neu: "neuzulassung",
    wieder: "wiederzulassung",
    umzug: "adressaenderung",
  };
  const key =
    vorgang === "abmelden"
      ? "abmeldung"
      : vorgang === "zulassen"
        ? (art && zulassenListe[art]) || "umschreibung"
        : vorgang === "sonder"
          ? art === "ausfuhr"
            ? "ausfuhrkennzeichen"
            : "kurzzeitkennzeichen"
          : null;
  return key ? vorgangChecklists.find((liste) => liste.key === key) ?? null : null;
};

/** Pakete von der Preisseite in eine Startantwort übersetzen */
export const vorgangAusPaket = (paket: string | null): Vorgang | undefined => {
  if (!paket) return undefined;
  if (paket === "abmeldung") return "abmelden";
  if (paket === "sonderkennzeichen") return "sonder";
  if (paket === "ankauf_only") return "verkaufen";
  if (["sofort", "basis", "premium"].includes(paket)) return "zulassen";
  return undefined;
};
