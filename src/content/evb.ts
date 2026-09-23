import faqSchema from "./faqSchema.json";

/**
 * Inhalte der Seite /evb-nummer.
 *
 * Die Fragen und Antworten stehen bewusst in faqSchema.json und nicht hier:
 * Der Prerender-Schritt (scripts/prerender.mjs) liest dieselbe Datei und legt
 * die FAQ-Auszeichnung direkt in das ausgelieferte HTML. Suchmaschinen und
 * KI-Systeme, die kein JavaScript ausführen, sehen die Antworten dadurch sofort.
 */

export interface EvbFaq {
  question: string;
  answer: string;
}

export const EVB_FAQS: EvbFaq[] = faqSchema["/evb-nummer"];

/** Die kurze Antwort ganz oben – bewusst sachlich, damit sie zitierbar ist. */
export const EVB_KURZANTWORT =
  "Die eVB-Nummer ist die elektronische Versicherungsbestätigung Ihrer KFZ-Versicherung. " +
  "Sie besteht aus sieben Zeichen und beweist der Zulassungsstelle, dass für das Fahrzeug " +
  "eine Haftpflichtversicherung besteht. Ohne eVB-Nummer kann in Deutschland kein Fahrzeug " +
  "zugelassen werden. Sie ist für Sie kostenlos und kommt ausschließlich von Ihrer Versicherung.";

export const EVB_ECKDATEN = [
  { label: "Wofür", wert: "Nachweis der KFZ-Haftpflicht bei der Zulassungsstelle" },
  { label: "Aussehen", wert: "sieben Zeichen, z. B. AB12C34" },
  { label: "Kosten", wert: "für Sie kostenlos" },
  { label: "Woher", wert: "von Ihrer KFZ-Versicherung, meist in wenigen Minuten" },
  { label: "Gültigkeit", wert: "keine gesetzliche Frist – Versicherer begrenzen sie meist auf Wochen" },
  { label: "Versicherungsschutz", wert: "beginnt erst mit der Zulassung, nicht mit der eVB" },
];

export interface EvbVorgang {
  vorgang: string;
  beschreibung: string;
  benoetigt: boolean;
}

export const EVB_VORGAENGE: EvbVorgang[] = [
  {
    vorgang: "Neuzulassung",
    beschreibung: "Fabrikneues Fahrzeug, noch nie zugelassen",
    benoetigt: true,
  },
  {
    vorgang: "Umschreibung",
    beschreibung: "Gebrauchtwagen gekauft, Fahrzeug läuft künftig auf Sie",
    benoetigt: true,
  },
  {
    vorgang: "Wiederzulassung",
    beschreibung: "Abgemeldetes Fahrzeug kommt wieder auf die Straße",
    benoetigt: true,
  },
  {
    vorgang: "Abmeldung",
    beschreibung: "Außerbetriebsetzung – das Fahrzeug kommt von der Straße",
    benoetigt: false,
  },
  {
    vorgang: "Adressänderung im selben Kreis",
    beschreibung: "Umzug ohne neues Kennzeichen",
    benoetigt: false,
  },
];

export interface EvbFehler {
  titel: string;
  text: string;
}

/** Aus der täglichen Praxis im Zulassungsdienst – die Fälle, die Kunden zurückwerfen. */
export const EVB_FEHLER: EvbFehler[] = [
  {
    titel: "Die eVB läuft auf die falsche Person",
    text:
      "Häufigster Fall beim Gebrauchtwagen: Die eVB steht noch auf den Verkäufer oder auf den " +
      "Ehepartner. Sie muss auf die Person lauten, die als Halter eingetragen wird.",
  },
  {
    titel: "Die eVB gilt für eine andere Fahrzeugart",
    text:
      "Eine eVB für ein Motorrad oder einen Anhänger passt nicht für einen PKW. Sagen Sie Ihrer " +
      "Versicherung genau, worum es geht.",
  },
  {
    titel: "Die eVB ist abgelaufen oder zurückgezogen",
    text:
      "Wer seine Nummer vor Monaten geholt und den Autokauf verschoben hat, steht oft mit einer " +
      "ungültigen eVB da. Kurz bei der Versicherung nachfragen kostet zwei Minuten.",
  },
  {
    titel: "Ein Zahlendreher beim Abschreiben",
    text:
      "Null und großes O, Eins und großes I sehen in vielen Schriften gleich aus. Leiten Sie die " +
      "SMS lieber weiter, statt die Nummer abzutippen.",
  },
  {
    titel: "Es ist eine eVB für ein Kurzzeitkennzeichen",
    text:
      "Für Kurzzeitkennzeichen gibt es eine eigene eVB-Art. Für eine normale Zulassung ist sie " +
      "nicht zu gebrauchen. Brauchen Sie wirklich ein Kurzzeitkennzeichen, fragen Sie uns kurz per WhatsApp.",
  },
];
