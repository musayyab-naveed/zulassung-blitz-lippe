import { vorgangChecklists, type VorgangChecklist } from "./faqs";

/**
 * Anfrage per WhatsApp statt Terminkalender.
 *
 * Der Kunde beantwortet höchstens drei Fragen durch Antippen, danach steht eine
 * fertige WhatsApp-Nachricht bereit. Kein Termin, kein Formular. Die Antworten
 * stehen in der Adresse (?vorgang=…&art=…&wann=…), damit Zurück und Vorwärts im
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
  | "umkennzeichnen"
  | "unklar"
  | "kurzzeit"
  | "ausfuhr";
export type Wann = "heute" | "morgen" | "woche" | "offen" | "extern";
export type Evb = "ja" | "vergleich" | "nein";

export interface Auswahl<T extends string> {
  wert: T;
  titel: string;
  text?: string;
}

export const VORGAENGE: Auswahl<Vorgang>[] = [
  { wert: "zulassen", titel: "Fahrzeug zulassen oder ummelden", text: "Neu, gebraucht, Umzug oder neues Kennzeichen" },
  { wert: "abmelden", titel: "Fahrzeug abmelden", text: "Blitzabmeldung direkt vor Ort" },
  { wert: "sonder", titel: "Kurzzeit- oder Ausfuhrkennzeichen", text: "Überführung, Probefahrt oder Export" },
  { wert: "verkaufen", titel: "Fahrzeug verkaufen", text: "Kostenlose Ankaufanfrage" },
  { wert: "frage", titel: "Ich habe nur eine Frage", text: "Direkt zu WhatsApp" },
];

export const ARTEN: Auswahl<Art>[] = [
  { wert: "neu", titel: "Neuwagen", text: "Fabrikneu, noch nie zugelassen" },
  { wert: "gebraucht", titel: "Gebrauchtwagen gekauft", text: "Umschreibung auf Ihren Namen" },
  { wert: "wieder", titel: "Abgemeldetes Auto wieder anmelden", text: "Wiederzulassung" },
  { wert: "umzug", titel: "Umgezogen – Adresse ändern", text: "Innerhalb von Lippe oder neu zugezogen" },
  { wert: "umkennzeichnen", titel: "Neues Kennzeichen, z. B. DT oder LE", text: "Kennzeichen wechseln" },
  { wert: "unklar", titel: "Weiß ich nicht genau", text: "Kein Problem – das klären wir im Chat" },
];

/** Auswahl bei Kurzzeit- oder Ausfuhrkennzeichen */
export const SONDER_ARTEN: Auswahl<Art>[] = [
  { wert: "kurzzeit", titel: "Kurzzeitkennzeichen", text: "5 Tage – für Überführung oder Probefahrt" },
  { wert: "ausfuhr", titel: "Ausfuhrkennzeichen", text: "Für den Export ins Ausland" },
  { wert: "unklar", titel: "Weiß ich nicht genau", text: "Kein Problem – das klären wir im Chat" },
];

export const ZEITPUNKTE: Auswahl<Wann>[] = [
  { wert: "heute", titel: "Heute" },
  { wert: "morgen", titel: "Morgen" },
  { wert: "woche", titel: "Diese Woche" },
  { wert: "offen", titel: "Weiß ich noch nicht" },
  { wert: "extern", titel: "Ich kann nicht selbst kommen", text: "Hol- und Bringservice oder Versand" },
];

/** Hat der Kunde schon eine Versicherung? Nur bei Zulassungen, die eine neue eVB brauchen */
export const EVB_OPTIONEN: Auswahl<Evb>[] = [
  { wert: "ja", titel: "Ja, habe ich schon" },
  {
    wert: "vergleich",
    titel: "Ja – aber ich möchte Preise vergleichen",
    text: "Vielleicht gibt es eine günstigere Versicherung",
  },
  { wert: "nein", titel: "Nein, noch keine Versicherung", text: "Kein Problem – das geht online in wenigen Minuten" },
];

/** Neuzulassung, Umschreibung und Wiederzulassung brauchen eine eVB – Umzug und Kennzeichenwechsel nicht */
export const brauchtEvbFrage = ({ vorgang, art }: { vorgang?: Vorgang; art?: Art }) =>
  vorgang === "zulassen" && (art === "neu" || art === "gebraucht" || art === "wieder" || art === "unklar");

const EVB_IN_NACHRICHT: Record<Evb, string> = {
  ja: "vorhanden",
  vergleich: "vorhanden",
  nein: "noch nicht vorhanden",
};

const ART_IN_NACHRICHT: Record<Art, string> = {
  neu: "Neuwagen (Neuzulassung)",
  gebraucht: "Gebrauchtwagen gekauft (Umschreibung)",
  wieder: "Abgemeldetes Fahrzeug wieder anmelden",
  umzug: "Umzug – Adresse im Fahrzeugschein ändern",
  umkennzeichnen: "Neues Kennzeichen (Umkennzeichnung)",
  unklar: "weiß ich noch nicht genau",
  kurzzeit: "Kurzzeitkennzeichen",
  ausfuhr: "Ausfuhrkennzeichen",
};

const WANN_IN_NACHRICHT: Record<Exclude<Wann, "extern">, string> = {
  heute: "heute",
  morgen: "morgen",
  woche: "diese Woche",
  offen: "weiß ich noch nicht",
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
  wann?: Wann;
  paket?: string;
}

export const baueNachricht = ({ vorgang, art, evb, wann, paket }: AnfrageAntworten): string => {
  const paketZeile =
    paket && PAKET_IN_NACHRICHT[paket] && vorgang !== "sonder"
      ? `Gewünschtes Paket: ${PAKET_IN_NACHRICHT[paket]}`
      : null;

  if (vorgang === "verkaufen") {
    return [
      "Hallo, ich möchte ein Fahrzeug verkaufen.",
      "",
      "Marke/Modell: ",
      "Baujahr: ",
      "Kilometerstand: ",
      "",
      "Fotos hänge ich gleich an.",
    ].join("\n");
  }

  if (vorgang === "frage") {
    return "Hallo, ich habe eine Frage zur KFZ-Zulassung: ";
  }

  const wasZeile =
    vorgang === "abmelden"
      ? "Hallo, ich möchte ein Fahrzeug abmelden."
      : vorgang === "sonder"
        ? art === "kurzzeit"
          ? "Hallo, ich brauche ein Kurzzeitkennzeichen."
          : art === "ausfuhr"
            ? "Hallo, ich brauche ein Ausfuhrkennzeichen."
            : "Hallo, ich brauche ein Kurzzeit- oder Ausfuhrkennzeichen."
        : "Hallo, ich möchte ein Fahrzeug zulassen.";
  // Bei Sonderkennzeichen steht alles schon in der ersten Zeile
  const mitArt = vorgang === "zulassen" && art;
  const evbZeile = evb && brauchtEvbFrage({ vorgang, art }) ? `eVB-Nummer: ${EVB_IN_NACHRICHT[evb]}` : null;

  if (wann === "extern") {
    return [
      wasZeile.replace(/\.$/, ", kann aber nicht selbst vorbeikommen."),
      "",
      mitArt ? `Vorgang: ${ART_IN_NACHRICHT[mitArt]}` : null,
      evbZeile,
      paketZeile,
      "",
      "Geht Abholung oder Versand der Unterlagen?",
      "Mein Wohnort: ",
    ]
      .filter((zeile) => zeile !== null)
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
    .trim();
  }

  return [
    wasZeile,
    "",
    mitArt ? `Vorgang: ${ART_IN_NACHRICHT[mitArt]}` : null,
    evbZeile,
    wann ? `Ich komme: ${WANN_IN_NACHRICHT[wann]}` : null,
    paketZeile,
  ]
    .filter((zeile) => zeile !== null)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};

export const whatsappLink = (nachricht: string) =>
  `https://wa.me/${WHATSAPP_NUMMER}?text=${encodeURIComponent(nachricht)}`;

/** Welche Unterlagen-Liste passt zur Antwort? Bei "weiß ich nicht" die häufigste. */
export const checklisteFuer = ({ vorgang, art }: AnfrageAntworten): VorgangChecklist | null => {
  const zulassenListe: Partial<Record<Art, string>> = {
    neu: "neuzulassung",
    wieder: "wiederzulassung",
    umzug: "adressaenderung",
    umkennzeichnen: "umkennzeichnung",
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
