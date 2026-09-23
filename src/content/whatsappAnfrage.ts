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

export type Vorgang = "zulassen" | "abmelden" | "verkaufen" | "frage";
export type Art = "neu" | "gebraucht" | "wieder" | "unklar";
export type Wann = "heute" | "morgen" | "woche" | "offen" | "extern";

export interface Auswahl<T extends string> {
  wert: T;
  titel: string;
  text?: string;
}

export const VORGAENGE: Auswahl<Vorgang>[] = [
  { wert: "zulassen", titel: "Fahrzeug zulassen", text: "Neu, gebraucht oder wieder anmelden" },
  { wert: "abmelden", titel: "Fahrzeug abmelden", text: "Blitzabmeldung direkt vor Ort" },
  { wert: "verkaufen", titel: "Fahrzeug verkaufen", text: "Kostenlose Ankaufanfrage" },
  { wert: "frage", titel: "Ich habe nur eine Frage", text: "Direkt zu WhatsApp" },
];

export const ARTEN: Auswahl<Art>[] = [
  { wert: "neu", titel: "Neuwagen", text: "Fabrikneu, noch nie zugelassen" },
  { wert: "gebraucht", titel: "Gebrauchtwagen gekauft", text: "Umschreibung auf Ihren Namen" },
  { wert: "wieder", titel: "Abgemeldetes Auto wieder anmelden", text: "Wiederzulassung" },
  { wert: "unklar", titel: "Weiß ich nicht genau", text: "Kein Problem – das klären wir im Chat" },
];

export const ZEITPUNKTE: Auswahl<Wann>[] = [
  { wert: "heute", titel: "Heute" },
  { wert: "morgen", titel: "Morgen" },
  { wert: "woche", titel: "Diese Woche" },
  { wert: "offen", titel: "Weiß ich noch nicht" },
  { wert: "extern", titel: "Ich kann nicht selbst kommen", text: "Hol- und Bringservice oder Versand" },
];

const ART_IN_NACHRICHT: Record<Art, string> = {
  neu: "Neuwagen (Neuzulassung)",
  gebraucht: "Gebrauchtwagen gekauft (Umschreibung)",
  wieder: "Abgemeldetes Fahrzeug wieder anmelden",
  unklar: "weiß ich noch nicht genau",
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
};

export interface AnfrageAntworten {
  vorgang?: Vorgang;
  art?: Art;
  wann?: Wann;
  paket?: string;
}

export const baueNachricht = ({ vorgang, art, wann, paket }: AnfrageAntworten): string => {
  const paketZeile = paket && PAKET_IN_NACHRICHT[paket] ? `Gewünschtes Paket: ${PAKET_IN_NACHRICHT[paket]}` : null;

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
    vorgang === "abmelden" ? "Hallo, ich möchte ein Fahrzeug abmelden." : "Hallo, ich möchte ein Fahrzeug zulassen.";

  if (wann === "extern") {
    return [
      wasZeile.replace(/\.$/, ", kann aber nicht selbst vorbeikommen."),
      "",
      vorgang === "zulassen" && art ? `Vorgang: ${ART_IN_NACHRICHT[art]}` : null,
      paketZeile,
      "",
      "Geht Abholung oder Versand der Unterlagen?",
      "Mein Wohnort: ",
    ]
      .filter((zeile) => zeile !== null)
      .join("\n")
      .replace(/\n{3,}/g, "\n\n");
  }

  return [
    wasZeile,
    "",
    vorgang === "zulassen" && art ? `Vorgang: ${ART_IN_NACHRICHT[art]}` : null,
    wann ? `Ich komme: ${WANN_IN_NACHRICHT[wann]}` : null,
    paketZeile,
  ]
    .filter((zeile) => zeile !== null)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n");
};

export const whatsappLink = (nachricht: string) =>
  `https://wa.me/${WHATSAPP_NUMMER}?text=${encodeURIComponent(nachricht)}`;

/** Welche Unterlagen-Liste passt zur Antwort? Bei "weiß ich nicht" die häufigste. */
export const checklisteFuer = ({ vorgang, art }: AnfrageAntworten): VorgangChecklist | null => {
  const key =
    vorgang === "abmelden"
      ? "abmeldung"
      : vorgang === "zulassen"
        ? art === "neu"
          ? "neuzulassung"
          : art === "wieder"
            ? "wiederzulassung"
            : "umschreibung"
        : null;
  return key ? vorgangChecklists.find((liste) => liste.key === key) ?? null : null;
};

/** Pakete von der Preisseite in eine Startantwort übersetzen */
export const vorgangAusPaket = (paket: string | null): Vorgang | undefined => {
  if (!paket) return undefined;
  if (paket === "abmeldung") return "abmelden";
  if (paket === "ankauf_only") return "verkaufen";
  if (["sofort", "basis", "premium"].includes(paket)) return "zulassen";
  return undefined;
};
