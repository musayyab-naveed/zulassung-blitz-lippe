import faqSchema from "./faqSchema.json";

/**
 * Inhalte der Seite /zulassungsstelle-bad-salzuflen.
 *
 * WICHTIG: Alle Angaben zum Straßenverkehrsamt stammen aus dem Serviceportal des
 * Kreises Lippe (kreis-lippe.de, Bereich Straßenverkehrsamt), abgerufen am 23.09.2026.
 * Nichts davon ist geschätzt. Wenn der Kreis etwas ändert, muss diese Datei nachgezogen
 * werden – deshalb steht das Abrufdatum auch sichtbar auf der Seite.
 */

export const AMT_QUELLE = {
  url: "https://www.kreis-lippe.de/kreis-lippe/optigov?vid=30&ansicht=einrichtung&eintrag=80",
  name: "Serviceportal Kreis Lippe, Bereich Straßenverkehrsamt",
  abgerufen: "23.09.2026",
};

export interface Oeffnungszeit {
  tag: string;
  vormittags: string;
  nachmittags: string;
}

/** Zeiten, zu denen das Amt überhaupt Termine vergibt. */
export const AMT_ZEITEN: Oeffnungszeit[] = [
  { tag: "Montag", vormittags: "7:30 – 12:30 Uhr", nachmittags: "–" },
  { tag: "Dienstag", vormittags: "7:30 – 12:30 Uhr", nachmittags: "13:30 – 16:00 Uhr" },
  { tag: "Mittwoch", vormittags: "7:30 – 12:30 Uhr", nachmittags: "13:30 – 15:00 Uhr" },
  { tag: "Donnerstag", vormittags: "7:30 – 12:30 Uhr", nachmittags: "13:30 – 17:00 Uhr" },
  { tag: "Freitag", vormittags: "7:30 – 12:30 Uhr", nachmittags: "–" },
  { tag: "Samstag", vormittags: "geschlossen", nachmittags: "geschlossen" },
  { tag: "Sonntag", vormittags: "geschlossen", nachmittags: "geschlossen" },
];

export interface Zulassungsstelle {
  ort: string;
  adresse: string;
  hinweis?: string;
}

export const AMT_STANDORTE: Zulassungsstelle[] = [
  { ort: "Bad Salzuflen", adresse: "Louis-Uekermann-Weg 2, 32107 Bad Salzuflen" },
  { ort: "Barntrup", adresse: "Alverdisser Straße 28, 32683 Barntrup" },
  {
    ort: "Detmold",
    adresse: "Felix-Fechenbach-Straße 5, 32756 Detmold",
    hinweis: "hier ist auch die Führerscheinstelle",
  },
];

/** Regeln, die viele erst vor Ort erfahren – alle wörtlich aus dem Serviceportal. */
export const AMT_REGELN = [
  {
    titel: "Ohne Termin geht nichts",
    text: "„Eine persönliche Vorsprache jeglicher Art in der Zulassungsstelle ist grundsätzlich nur mit einem Termin möglich.“ Der Termin wird online gebucht.",
  },
  {
    titel: "Termine nur 14 Tage im Voraus",
    text: "Jeden Morgen werden die Termine für die kommenden zwei Wochen freigeschaltet. Weiter im Voraus planen geht nicht.",
  },
  {
    titel: "Nur der vorbestellte Vorgang wird bearbeitet",
    text: "Wer einen Termin für eine Ummeldung gebucht hat, kann nicht nebenbei noch ein zweites Fahrzeug abmelden.",
  },
  {
    titel: "Wartenummer mitbringen",
    text: "Die Bestätigung kommt per E-Mail und enthält eine Wartenummer. Ohne die geht es nicht weiter.",
  },
  {
    titel: "Wartezeit trotz Termin möglich",
    text: "Der Kreis weist selbst darauf hin, dass es zu Wartezeiten kommen kann, weil die Bearbeitungsdauer schwankt.",
  },
  {
    titel: "Zu spät heißt Termin weg",
    text: "„Ihr Termin wird mit dem Aufruf gelöscht.“ Wer nicht rechtzeitig da ist, fängt von vorne an.",
  },
  {
    titel: "Kein Bargeld",
    text: "In Bad Salzuflen, Barntrup und Detmold wird in der Regel nur noch per Debit- oder Kreditkarte bezahlt.",
  },
];

export interface VergleichsZeile {
  merkmal: string;
  amt: string;
  wir: string;
  vorteilWir: boolean;
}

export const VERGLEICH: VergleichsZeile[] = [
  { merkmal: "Termin nötig", amt: "ja, zwingend und online vorab", wir: "nein, einfach vorbeikommen", vorteilWir: true },
  { merkmal: "Samstags geöffnet", amt: "nein", wir: "ja, 15 – 18 Uhr", vorteilWir: true },
  { merkmal: "Freitagnachmittag", amt: "geschlossen ab 12:30 Uhr", wir: "geöffnet bis 18 Uhr", vorteilWir: true },
  { merkmal: "Erreichbarkeit online", amt: "i-Kfz rund um die Uhr, Sie machen es selbst", wir: "rund um die Uhr, wir machen es für Sie", vorteilWir: true },
  { merkmal: "Wartenummer", amt: "ja, trotz Termin", wir: "nein", vorteilWir: true },
  { merkmal: "Mehrere Vorgänge auf einmal", amt: "nein, nur der gebuchte", wir: "ja", vorteilWir: true },
  { merkmal: "Bezahlung", amt: "nur Karte", wir: "bar, EC, PayPal, SEPA, Rechnung", vorteilWir: true },
  { merkmal: "Kennzeichenschilder", amt: "besorgen Sie selbst", wir: "bei BASIS und PREMIUM inklusive", vorteilWir: true },
  { merkmal: "Kosten", amt: "nur die Verwaltungsgebühren", wir: "ab 99 € inklusive der Gebühren", vorteilWir: false },
  { merkmal: "Ihr Zeitaufwand", amt: "Termin suchen, hinfahren, warten", wir: "Unterlagen abgeben oder schicken", vorteilWir: true },
];

export const ZST_FAQS: { question: string; answer: string }[] =
  faqSchema["/zulassungsstelle-bad-salzuflen"];
