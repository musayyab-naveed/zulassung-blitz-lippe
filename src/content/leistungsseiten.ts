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
  link?: { href: string; text: string };
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

export const AUTO_ANMELDEN: LeistungsSeite = {
  path: "/auto-anmelden",
  kicker: "Zulassung ohne Termin",
  h1: "Auto anmelden in Bad Salzuflen – ohne Termin, in ca. 20 Minuten",
  intro:
    "Neuwagen, Gebrauchtwagen oder ein abgemeldetes Auto wieder anmelden: Wir erledigen die Zulassung für den ganzen Kreis Lippe – ohne Termin beim Straßenverkehrsamt. Digital in ca. 20 Minuten oder klassisch bis zum nächsten Werktag.",
  chips: ["✓ Ohne Termin", `✓ ${OEFFNUNG}`, "✓ ab 129 € inkl. Gebühren", "✓ In ca. 20 Minuten fertig"],
  preis: {
    betrag: "ab 129 €",
    text: "Zulassung inklusive Verwaltungsgebühren. Bei BASIS und PREMIUM sind die Kennzeichen dabei, Wunschkennzeichen +13 €.",
  },
  faelle: [
    {
      titel: "Neuwagen",
      text: "Fabrikneues Auto, das noch nie zugelassen war.",
      preis: "ab 129 €",
      link: "/angebot?vorgang=zulassen&art=neu",
      linkText: "Neuzulassung anfragen",
      checkliste: "neuzulassung",
    },
    {
      titel: "Gebrauchtwagen",
      text: "Auto gekauft – wir schreiben es auf Sie um.",
      preis: "ab 129 €",
      link: "/angebot?vorgang=zulassen&art=gebraucht",
      linkText: "Umschreibung anfragen",
      checkliste: "umschreibung",
    },
    {
      titel: "Wieder anmelden",
      text: "Ihr Auto war abgemeldet und soll wieder fahren.",
      preis: "ab 129 €",
      link: "/angebot?vorgang=zulassen&art=wieder",
      linkText: "Wiederzulassung anfragen",
      checkliste: "wiederzulassung",
    },
  ],
  schritteTitel: "So melden Sie Ihr Auto bei uns an",
  schritte: [
    {
      titel: "Kurz Bescheid geben",
      text: "Per WhatsApp in wenigen Fingertipps – oder einfach vorbeikommen. Einen Termin brauchen Sie nicht.",
    },
    {
      titel: "Unterlagen mitbringen",
      text: "Welche Sie brauchen, steht oben bei Ihrem Fall. Die eVB-Nummer bekommen Sie von Ihrer Versicherung.",
    },
    {
      titel: "Zugelassen",
      text: "Mit der Sofort-Zulassung in ca. 20 Minuten, klassisch am nächsten Werktag – inklusive Kennzeichen bei BASIS und PREMIUM.",
    },
  ],
  abschnitte: [
    {
      titel: "Sofort, BASIS oder PREMIUM – was passt zu Ihnen?",
      punkte: [
        "SOFORT: Sie warten kurz bei uns, die Zulassung läuft digital in ca. 20 Minuten. Die Kennzeichen besorgen Sie selbst.",
        "BASIS: Unterlagen abgeben, am nächsten Werktag alles fertig abholen – mit Kennzeichen.",
        "PREMIUM: Wir holen die Unterlagen ab und bringen alles fertig zurück, oder Sie schicken uns alles per Post.",
      ],
      link: { href: "/preise", text: "Alle Pakete und Preise" },
    },
    {
      titel: "Noch keine eVB-Nummer?",
      text: "Ohne Kfz-Versicherung keine Zulassung. Die eVB-Nummer bekommen Sie, sobald Sie eine Versicherung abschließen – meist sofort per E-Mail. Auf unserer Seite können Sie Tarife vergleichen.",
      link: { href: "/kfz-versicherung", text: "eVB-Nummer beantragen" },
    },
    {
      titel: "Warum nicht selbst zum Amt?",
      text: "Beim Straßenverkehrsamt Kreis Lippe geht nichts ohne Termin, und Termine gibt es nur 14 Tage im Voraus. Wenn Sie flexibel sind und einen Termin bekommen, ist das günstiger. Wenn es schnell gehen soll oder Sie tagsüber arbeiten, sind Sie bei uns richtig – auch samstags.",
      link: { href: "/zulassungsstelle-bad-salzuflen", text: "Zulassungsstelle Bad Salzuflen: Zeiten & Regeln" },
    },
  ],
  faqTitel: "Häufige Fragen zum Auto anmelden",
  faqs: faqs["/auto-anmelden"],
  cta: {
    titel: "Auto anmelden – ohne Termin",
    text: "Kurz per WhatsApp Bescheid geben oder einfach vorbeikommen: Werler Straße 68, 32105 Bad Salzuflen.",
    href: "/angebot?vorgang=zulassen",
    button: "ZULASSUNG ANFRAGEN",
  },
  verwandt: [
    { href: "/wunschkennzeichen", text: "Wunschkennzeichen LIP, DT oder LE" },
    { href: "/kfz-versicherung", text: "eVB-Nummer beantragen" },
    { href: "/auto-abmelden", text: "Auto abmelden" },
  ],
};

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
  h1: "Auto ummelden in Bad Salzuflen – nach dem Autokauf oder Umzug",
  intro:
    "Gebrauchtwagen gekauft oder umgezogen? Wir melden Ihr Auto um – ohne Termin beim Straßenverkehrsamt. Digital in ca. 20 Minuten oder klassisch bis zum nächsten Werktag.",
  chips: ["✓ Ohne Termin", `✓ ${OEFFNUNG}`, "✓ ab 129 € inkl. Gebühren", "✓ In ca. 20 Minuten möglich"],
  preis: {
    betrag: "ab 129 €",
    text: "Umschreibung auf Ihren Namen inklusive Verwaltungsgebühren. Adressänderung: Preis kurz per WhatsApp. Ein neues Kennzeichen wie DT oder LE läuft über unser Wunschkennzeichen.",
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
    href: "/angebot?vorgang=zulassen&wunsch=1",
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
  kicker: "Für Autohändler, Werkstätten, Vermieter und Firmenflotten im Kreis Lippe",
  h1: "Zulassungen abgeben statt zum Amt fahren – Zulassungsservice für Händler und Firmen im Kreis Lippe",
  intro:
    "Sie geben die Unterlagen ab, wir erledigen Anmeldung, Ummeldung und Abmeldung – ohne Termin beim Straßenverkehrsamt. Ein Fahrzeug oder mehrere auf einmal, bezahlt wird per Rechnung. Die Konditionen für regelmäßige Aufträge besprechen wir persönlich – am schnellsten am Telefon.",
  chips: [
    "✓ Ohne Behördentermin",
    "✓ Mehrere Fahrzeuge in einem Auftrag",
    "✓ Zahlung per Rechnung",
    "✓ Abholung der Unterlagen möglich",
    `✓ ${OEFFNUNG}`,
  ],
  preis: {
    betrag: "",
    text: "",
  },
  anfrage: true,
  checklisten: ["gewerbe"],
  schritteTitel: "So läuft die Zusammenarbeit",
  schritte: [
    {
      titel: "Kurz sprechen",
      text: "Am Telefon, per E-Mail oder WhatsApp: Welche Fahrzeuge stehen an, was soll passieren, bis wann? Fangen Sie ruhig mit einem einzigen Fahrzeug an.",
    },
    {
      titel: "Unterlagen übergeben",
      text: "Ohne Termin vorbeibringen – Mo–Fr 9–18, Sa 15–18 Uhr – oder wir holen sie im Raum Bad Salzuflen bei Ihnen ab.",
    },
    {
      titel: "Fertig zurück, per Rechnung",
      text: "Digital in ca. 20 Minuten oder klassisch bis zum nächsten Werktag. Papiere und Rechnung bekommen Sie von uns zurück.",
    },
  ],
  abschnitte: [
    {
      titel: "Was Sie davon haben",
      punkte: [
        "Keine Fahrten zum Straßenverkehrsamt, keine Jagd nach Terminen: Sie geben ab, wir erledigen.",
        "Mehrere Fahrzeuge in einem Auftrag – eine Übergabe statt vieler Wege.",
        "Ihr Kunde fährt schneller vom Hof, solange die Freude am neuen Auto noch frisch ist.",
        "Abmeldungen von Inzahlungnahmen gleich mit – damit enden KFZ-Steuer und Versicherung für das Fahrzeug.",
        "Fahrzeuge, die Sie nicht selbst verkaufen möchten, kaufen wir an – auch nicht fahrbereite.",
        "Unterlagen auch samstags von 15 bis 18 Uhr abgeben.",
      ],
    },
    {
      titel: "Was wir für Händler und Firmen übernehmen",
      punkte: [
        "Neuzulassungen, Umschreibungen und Wiederzulassungen für Ihre Kunden",
        "Abmeldungen von Inzahlungnahmen – auch mehrere am Tag",
        "Firmenwagen, Motorräder, Wohnmobile und Anhänger",
        "Wunschkennzeichen mit LIP, DT oder LE",
        "Kurzzeit- und Ausfuhrkennzeichen für Überführung und Export",
        "Ankauf von Fahrzeugen, die Sie nicht selbst vermarkten möchten",
      ],
    },
    {
      titel: "Rechnen Sie kurz nach",
      text: "Ein Gang zum Amt heißt: hinfahren, warten, zurückfahren. Setzen Sie Ihre eigenen Werte ein – Stunden pro Gang mal Zulassungen im Monat. Beispiel: 1,5 Stunden × 8 Zulassungen sind 12 Stunden im Monat, also rund anderthalb Arbeitstage, in denen Ihr Verkäufer nicht verkauft.",
    },
    {
      titel: "Erst testen, dann entscheiden",
      text: "Geben Sie uns zuerst ein einziges Fahrzeug. So sehen Sie ohne großen Aufwand, wie die Zusammenarbeit läuft – und entscheiden danach, ob wir regelmäßig für Sie arbeiten.",
    },
  ],
  faqTitel: "Häufige Fragen von Gewerbekunden",
  faqs: faqs["/gewerbekunden"],
  cta: {
    titel: "Lieber gleich sprechen?",
    text: "Ein kurzer Anruf klärt das meiste – oder schreiben Sie uns per WhatsApp, wie viele Fahrzeuge im Monat ungefähr anstehen.",
    href: "/angebot?vorgang=frage",
    button: "PER WHATSAPP SCHREIBEN",
  },
  verwandt: [
    { href: "/fahrzeugankauf", text: "Fahrzeugankauf" },
    { href: "/angebot?vorgang=sonder", text: "Kurzzeit- & Ausfuhrkennzeichen" },
    { href: "/dokumente", text: "Vollmacht & SEPA-Mandat zum Ausdrucken" },
  ],
};

export const LEISTUNGSSEITEN = [AUTO_ANMELDEN, AUTO_ABMELDEN, AUTO_UMMELDEN, WUNSCHKENNZEICHEN, GEWERBEKUNDEN];
