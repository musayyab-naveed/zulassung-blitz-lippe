import faqSchema from "./faqSchema.json";
import type { FaqItem } from "./faqs";

/**
 * Inhalte der Leistungsseiten (Abmelden, Ummelden, Wunschkennzeichen, Gewerbekunden).
 *
 * Jede Seite zielt auf genau eine Suchanfrage, z. B. "Auto abmelden Bad Salzuflen".
 * Die Fragen und Antworten stehen in faqSchema.json, damit Seite und
 * Google-Auszeichnung (scripts/prerender.mjs) immer denselben Text haben.
 *
 * Angaben zum Kreis Lippe (DT/LE, 90 Tage, Zeichenregeln, Terminpflicht) stammen
 * von kreis-lippe.de, abgerufen am 23.09.2026.
 */

export interface Schritt {
  titel: string;
  text: string;
}

export interface Abschnitt {
  titel: string;
  text?: string;
  punkte?: string[];
}

export interface Fall {
  titel: string;
  text: string;
  preis: string;
  link: string;
  linkText: string;
  checkliste: string;
}

export interface LeistungsSeite {
  path: string;
  kicker: string;
  h1: string;
  intro: string;
  chips: string[];
  preis: { betrag: string; text: string };
  /** Statt Preis ein Anfrageformular zeigen (Firmenkunden und Partner) */
  anfrage?: boolean;
  /** Mehrere Varianten (z. B. Halterwechsel, Umzug, Umkennzeichnung) */
  faelle?: Fall[];
  /** Checklisten aus faqs.ts – nur wenn es keine Fälle gibt */
  checklisten?: string[];
  schritteTitel: string;
  schritte: Schritt[];
  abschnitte: Abschnitt[];
  faqTitel: string;
  faqs: FaqItem[];
  cta: { titel: string; text: string; href: string; button: string };
  verwandt: { href: string; text: string }[];
}

const faqs = faqSchema as Record<string, FaqItem[]>;

const OEFFNUNG = "Mo–Fr 9–18 Uhr · Sa 15–18 Uhr";

export const AUTO_ABMELDEN: LeistungsSeite = {
  path: "/auto-abmelden",
  kicker: "Blitzabmeldung ohne Termin",
  h1: "Auto abmelden in Bad Salzuflen – ohne Termin, in wenigen Minuten",
  intro:
    "Bringen Sie Fahrzeugschein und Kennzeichen vorbei – wir melden Ihr Auto digital direkt vor Ort ab. Kein Termin beim Straßenverkehrsamt, keine Wartenummer. Für 40 €, Gebühren inklusive.",
  chips: ["✓ Ohne Termin", `✓ ${OEFFNUNG}`, "✓ 40 € inkl. Gebühren", "✓ Gratis beim Fahrzeugverkauf"],
  preis: {
    betrag: "40 €",
    text: "Blitzabmeldung inklusive Verwaltungsgebühren. Verkaufen Sie uns Ihr Fahrzeug, ist die Abmeldung kostenlos.",
  },
  checklisten: ["abmeldung"],
  schritteTitel: "So läuft die Abmeldung bei uns",
  schritte: [
    {
      titel: "Vorbeikommen",
      text: "Mit Fahrzeugschein, beiden Kennzeichen und Ausweis – Montag bis Freitag 9–18 Uhr, Samstag 15–18 Uhr.",
    },
    {
      titel: "Wir melden ab",
      text: "Mit Sicherheitscodes digital in wenigen Minuten, ohne Codes klassisch bis zum nächsten Werktag.",
    },
    {
      titel: "Fertig",
      text: "Sie bekommen die Abmeldebestätigung. Versicherung und Zoll werden automatisch informiert.",
    },
  ],
  abschnitte: [
    {
      titel: "Die Sicherheitscodes – das Wichtigste für die schnelle Abmeldung",
      text: "Wurde Ihr Fahrzeug ab 2015 zugelassen, finden Sie auf dem Fahrzeugschein und auf den Plaketten der Kennzeichen je einen verdeckten Code. Mit diesen Codes melden wir digital ab – in wenigen Minuten. Bitte nicht selbst freirubbeln, das machen wir vor Ort. Ältere Papiere ohne Codes? Kein Problem, dann melden wir klassisch bis zum nächsten Werktag ab.",
    },
    {
      titel: "Was nach der Abmeldung passiert",
      punkte: [
        "Die KFZ-Steuer endet mit dem Tag der Abmeldung – zu viel gezahlte Steuer erstattet der Zoll.",
        "Ihre Versicherung wird automatisch informiert, Sie müssen nichts kündigen.",
        "Die Kennzeichen werden entwertet. Ihre Papiere bekommen Sie zurück.",
        "Soll das Auto später wieder fahren, geht das mit einer Wiederzulassung – auch bei uns.",
      ],
    },
    {
      titel: "Auto verkaufen statt nur abmelden",
      text: "Das Auto soll weg? Wir kaufen Fahrzeuge an – auch ältere oder nicht fahrbereite. Dann ist die Abmeldung für Sie kostenlos, und Sie erledigen beides in einem Gang.",
    },
  ],
  faqTitel: "Häufige Fragen zur Abmeldung",
  faqs: faqs["/auto-abmelden"],
  cta: {
    titel: "Auto abmelden – heute noch",
    text: "Kurz per WhatsApp Bescheid geben oder einfach vorbeikommen: Werler Straße 68, 32105 Bad Salzuflen.",
    href: "/angebot?vorgang=abmelden",
    button: "ABMELDUNG ANFRAGEN",
  },
  verwandt: [
    { href: "/fahrzeugankauf", text: "Auto verkaufen – Abmeldung gratis" },
    { href: "/preise", text: "Alle Preise im Überblick" },
    { href: "/zulassungsstelle-bad-salzuflen", text: "Zulassungsstelle Bad Salzuflen: Öffnungszeiten & Termine" },
  ],
};

export const AUTO_UMMELDEN: LeistungsSeite = {
  path: "/auto-ummelden",
  kicker: "Ummelden ohne Termin",
  h1: "Auto ummelden in Bad Salzuflen – Halterwechsel, Umzug oder neues Kennzeichen",
  intro:
    "Gebrauchtwagen gekauft, umgezogen oder ein neues Kennzeichen gewünscht? Wir melden Ihr Auto um – ohne Termin beim Straßenverkehrsamt. Digital in ca. 20 Minuten oder klassisch bis zum nächsten Werktag.",
  chips: ["✓ Ohne Termin", `✓ ${OEFFNUNG}`, "✓ ab 129 € inkl. Gebühren", "✓ In ca. 20 Minuten möglich"],
  preis: {
    betrag: "ab 129 €",
    text: "Umschreibung auf Ihren Namen inklusive Verwaltungsgebühren. Adressänderung und neues Kennzeichen: Preis kurz per WhatsApp.",
  },
  faelle: [
    {
      titel: "Gebrauchtwagen gekauft",
      text: "Wir schreiben das Auto auf Sie um – mit neuem oder Wunschkennzeichen.",
      preis: "ab 129 €",
      link: "/angebot?vorgang=zulassen&art=gebraucht",
      linkText: "Umschreibung anfragen",
      checkliste: "umschreibung",
    },
    {
      titel: "Umgezogen",
      text: "Neue Adresse in den Fahrzeugschein – egal ob innerhalb von Lippe oder neu zugezogen.",
      preis: "auf Anfrage",
      link: "/angebot?vorgang=zulassen&art=umzug",
      linkText: "Adressänderung anfragen",
      checkliste: "adressaenderung",
    },
    {
      titel: "Neues Kennzeichen",
      text: "Zum Beispiel von LIP auf DT oder LE – ohne Termin beim Amt.",
      preis: "auf Anfrage",
      link: "/angebot?vorgang=zulassen&art=umkennzeichnen",
      linkText: "Neues Kennzeichen anfragen",
      checkliste: "umkennzeichnung",
    },
  ],
  schritteTitel: "So läuft das Ummelden bei uns",
  schritte: [
    {
      titel: "Kurz Bescheid geben",
      text: "Per WhatsApp sagen, worum es geht – oder einfach vorbeikommen. Einen Termin brauchen Sie nicht.",
    },
    {
      titel: "Unterlagen mitbringen",
      text: "Welche Sie brauchen, steht oben bei Ihrem Fall. Unsicher? Wir prüfen alles vorher.",
    },
    {
      titel: "Wir melden um",
      text: "Digital in ca. 20 Minuten oder klassisch bis zum nächsten Werktag – inklusive Kennzeichen bei BASIS und PREMIUM.",
    },
  ],
  abschnitte: [
    {
      titel: "Nach dem Umzug: Kennzeichen behalten oder wechseln?",
      text: "Seit 2015 dürfen Sie Ihr bisheriges Kennzeichen behalten, wenn Sie in einen anderen Kreis ziehen. Nur die Adresse im Fahrzeugschein muss neu. Wer lieber ein lippisches Kennzeichen möchte, kann zwischen LIP, DT und LE wählen.",
    },
    {
      titel: "Gebrauchtwagen: darauf sollten Sie beim Kauf achten",
      punkte: [
        "Lassen Sie sich Fahrzeugschein und Fahrzeugbrief im Original geben.",
        "Ist das Auto noch angemeldet, brauchen wir die alten Kennzeichen.",
        "Prüfen Sie, ob die Hauptuntersuchung (TÜV) noch gültig ist.",
        "Die eVB-Nummer bekommen Sie von Ihrer neuen Versicherung – meist in wenigen Minuten.",
      ],
    },
  ],
  faqTitel: "Häufige Fragen zum Ummelden",
  faqs: faqs["/auto-ummelden"],
  cta: {
    titel: "Auto ummelden – ohne Termin",
    text: "Kurz per WhatsApp Bescheid geben oder einfach vorbeikommen: Werler Straße 68, 32105 Bad Salzuflen.",
    href: "/angebot?vorgang=zulassen",
    button: "UMMELDUNG ANFRAGEN",
  },
  verwandt: [
    { href: "/wunschkennzeichen", text: "Wunschkennzeichen LIP, DT oder LE" },
    { href: "/evb-nummer", text: "eVB-Nummer einfach erklärt" },
    { href: "/dokumente", text: "Vollmacht zum Ausdrucken" },
  ],
};

export const WUNSCHKENNZEICHEN: LeistungsSeite = {
  path: "/wunschkennzeichen",
  kicker: "Neu im Kreis Lippe: DT und LE",
  h1: "Wunschkennzeichen im Kreis Lippe – LIP, DT oder LE",
  intro:
    "Seit April 2026 gibt es im Kreis Lippe wieder die Kennzeichen DT und LE. Wir reservieren Ihre Wunschkombination und erledigen die Zulassung gleich mit – ohne Termin beim Straßenverkehrsamt.",
  chips: ["✓ LIP, DT oder LE", "✓ Ohne Termin", "✓ +13 € zur Zulassung", `✓ ${OEFFNUNG}`],
  preis: {
    betrag: "+13 €",
    text: "Zusätzlich zur Zulassung – Reservierung und Gebühr für Ihr Wunschkennzeichen inklusive.",
  },
  checklisten: ["wunschkennzeichen", "umkennzeichnung"],
  schritteTitel: "So kommen Sie zu Ihrem Wunschkennzeichen",
  schritte: [
    {
      titel: "Kombination nennen",
      text: "Schreiben Sie uns Ihre Wunschkombination per WhatsApp – gern mit ein, zwei Alternativen.",
    },
    {
      titel: "Wir prüfen und reservieren",
      text: "Ist die Kombination frei, reservieren wir sie für Sie.",
    },
    {
      titel: "Zulassung mit Wunschkennzeichen",
      text: "Bei der Zulassung kommt Ihr Wunschkennzeichen direkt drauf – bei BASIS und PREMIUM inklusive Schilder.",
    },
  ],
  abschnitte: [
    {
      titel: "LIP, DT und LE – was ist der Unterschied?",
      punkte: [
        "LIP steht für den Kreis Lippe und war lange das einzige Kürzel.",
        "DT (Detmold) und LE (Lemgo) gibt es seit dem 25. April 2026 wieder.",
        "Alle drei gelten für den ganzen Kreis – auch wer in Bad Salzuflen wohnt, darf DT oder LE wählen.",
      ],
    },
    {
      titel: "Die Regeln für Ihre Kombination",
      punkte: [
        "Höchstens 8 Zeichen insgesamt.",
        "Nach LIP passen z. B. 2 Buchstaben und 3 Ziffern (LIP-AB 123).",
        "Nach DT und LE passen 2 Buchstaben und 4 Ziffern (DT-AB 1234).",
        "Kurze Kennzeichen wie DT-A 1 vergibt der Kreis nur persönlich am Schalter, nicht online.",
        "Online-Reservierungen beim Kreis verfallen nach 90 Tagen.",
      ],
    },
    {
      titel: "Von LIP auf DT oder LE wechseln – ohne Termin",
      text: "Sie haben schon ein LIP-Kennzeichen und möchten auf DT oder LE umsteigen? Beim Straßenverkehrsamt brauchen Sie für diese Umkennzeichnung einen gebuchten Termin. Bei uns kommen Sie einfach vorbei – mit Personalausweis, Fahrzeugschein, Fahrzeugbrief und den alten Kennzeichen.",
    },
  ],
  faqTitel: "Häufige Fragen zum Wunschkennzeichen",
  faqs: faqs["/wunschkennzeichen"],
  cta: {
    titel: "Wunschkennzeichen sichern",
    text: "Schreiben Sie uns Ihre Wunschkombination per WhatsApp – wir prüfen, ob sie frei ist.",
    href: "/angebot?vorgang=zulassen&art=umkennzeichnen",
    button: "WUNSCHKENNZEICHEN ANFRAGEN",
  },
  verwandt: [
    { href: "/auto-ummelden", text: "Auto ummelden – Halterwechsel & Umzug" },
    { href: "/preise", text: "Alle Preise im Überblick" },
    { href: "/zulassungsstelle-bad-salzuflen", text: "Zulassungsstelle Bad Salzuflen: Öffnungszeiten & Termine" },
  ],
};

export const GEWERBEKUNDEN: LeistungsSeite = {
  path: "/gewerbekunden",
  kicker: "Für Autohändler, Werkstätten, Firmen & Partner",
  h1: "Zulassungsservice für Firmen und Partner im Kreis Lippe",
  intro:
    "Sie verkaufen Fahrzeuge, betreuen eine Flotte oder haben regelmäßig Zulassungen für Ihre Kunden? Werden Sie Partner: Wir übernehmen Zulassung, Umschreibung und Abmeldung – ohne Termin, auch mehrere Fahrzeuge auf einmal. Die Konditionen besprechen wir persönlich mit Ihnen.",
  chips: ["✓ Mehrere Fahrzeuge auf einmal", "✓ Feste Konditionen für Partner", "✓ Zahlung per Rechnung", `✓ ${OEFFNUNG}`],
  preis: {
    betrag: "",
    text: "",
  },
  anfrage: true,
  checklisten: ["gewerbe"],
  schritteTitel: "So arbeiten wir mit Ihnen zusammen",
  schritte: [
    {
      titel: "Auftrag per WhatsApp",
      text: "Kurz schreiben, welche Fahrzeuge anstehen und bis wann sie fertig sein sollen.",
    },
    {
      titel: "Unterlagen bringen oder abholen lassen",
      text: "Sie geben die Unterlagen ab, oder wir holen sie im Raum Bad Salzuflen bei Ihnen ab.",
    },
    {
      titel: "Fertig zurück",
      text: "Zulassung digital in ca. 20 Minuten oder bis zum nächsten Werktag – mit Kennzeichen, per Rechnung.",
    },
  ],
  abschnitte: [
    {
      titel: "Was wir für Gewerbekunden übernehmen",
      punkte: [
        "Neuzulassungen, Umschreibungen und Wiederzulassungen für Ihre Kunden",
        "Abmeldungen von Inzahlungnahmen – auch mehrere am Tag",
        "Wunschkennzeichen mit LIP, DT oder LE",
        "Kurzzeit- und Ausfuhrkennzeichen auf Anfrage",
        "Ankauf von Fahrzeugen, die Sie nicht selbst vermarkten möchten",
      ],
    },
    {
      titel: "Warum Händler mit uns arbeiten",
      text: "Beim Straßenverkehrsamt Kreis Lippe geht nichts ohne Termin, und Termine gibt es nur 14 Tage im Voraus. Bei uns geben Sie die Unterlagen ab, wann es Ihnen passt – Montag bis Samstag. Ihre Kunden fahren schneller vom Hof, und Sie sparen die Wege zum Amt.",
    },
  ],
  faqTitel: "Häufige Fragen von Gewerbekunden",
  faqs: faqs["/gewerbekunden"],
  cta: {
    titel: "Lieber direkt per WhatsApp?",
    text: "Schreiben Sie uns kurz, wie viele Fahrzeuge im Monat Sie ungefähr zulassen – wir melden uns direkt.",
    href: "/angebot?vorgang=frage",
    button: "PER WHATSAPP ANFRAGEN",
  },
  verwandt: [
    { href: "/dokumente", text: "Vollmacht & SEPA-Mandat zum Ausdrucken" },
    { href: "/preise", text: "Alle Preise im Überblick" },
    { href: "/fahrzeugankauf", text: "Fahrzeugankauf" },
  ],
};

export const LEISTUNGSSEITEN = [AUTO_ABMELDEN, AUTO_UMMELDEN, WUNSCHKENNZEICHEN, GEWERBEKUNDEN];
