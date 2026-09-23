import { BUSINESS } from "./seoRoutes";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface VorgangChecklist {
  key: string;
  title: string;
  hint?: string;
  items: string[];
}

// Allgemeine Fragen – werden auf der Startseite und der FAQ-Seite angezeigt
export const generalFaqs: FaqItem[] = [
  {
    question: "Wer ist KFZ-Sofortzulassung?",
    answer:
      `Ihr lokaler Zulassungsdienst in Bad Salzuflen für den gesamten Kreis Lippe. Wir übernehmen An-, Um- und Abmeldungen komplett für Sie – ohne Behördengang, bewertet mit 5,0 Sternen bei ${BUSINESS.reviewCount} Google-Bewertungen.`,
  },
  {
    question: "Wie schnell ist eine KFZ-Zulassung möglich?",
    answer:
      "Mit unserer neuen Sofort-Zulassung erfolgt die Zulassung digital in ca. 20 Minuten. Klassisch mit Abgabe der Unterlagen ist alles am nächsten Werktag fertig.",
  },
  {
    question: "Was brauche ich für die Sofort-Zulassung?",
    answer:
      "Die eVB-Nummer Ihrer Versicherung, Ihren Personalausweis, die Zulassungsbescheinigung Teil I und II sowie Ihre IBAN für die KFZ-Steuer – nach ca. 20 Minuten sind Sie zugelassen. Die Kennzeichen besorgen Sie selbst, wann Sie möchten (Wunschkennzeichen möglich, +13 €): vor dem Termin oder danach. Zugelassen sind Sie in jedem Fall – losfahren dürfen Sie, sobald die Schilder montiert sind.",
  },
  {
    question: "Was ist der Unterschied zwischen SOFORT, BASIS und PREMIUM?",
    answer:
      "SOFORT: Sie kommen kurz vorbei, die Zulassung läuft digital in ca. 20 Minuten – die Kennzeichen besorgen Sie selbst. BASIS: Sie geben die Unterlagen ab und holen am nächsten Werktag alles fertig inklusive Kennzeichen wieder ab. PREMIUM: wie BASIS, aber wir holen und bringen die Unterlagen (Abholung im Raum Bad Salzuflen, ca. 10 Minuten Fahrweg – sonst bequem per Versand).",
  },
  {
    question: "Bekomme ich die Kennzeichen bei Ihnen?",
    answer:
      "Ja – bei BASIS und PREMIUM sind die Kennzeichen im Preis enthalten, Sie bekommen alles fertig zurück. Bei der Sofort-Zulassung besorgen Sie die Schilder selbst, vor oder nach dem Termin (Wunschkennzeichen möglich, +13 €). Zugelassen sind Sie in jedem Fall. Hinweis: Kennzeichen geben wir nur zusammen mit einer Zulassung aus – reine Schilderprägung bieten wir nicht an.",
  },
  {
    question: "Was kostet die Zulassung?",
    answer:
      "Die Zulassung gibt es ab 129 €, die Blitzabmeldung direkt vor Ort für 40 € – Verwaltungsgebühren inklusive, keine versteckten Kosten. Optionale Extras: Wunschkennzeichen +13 €, Feinstaubplakette +6 €.",
  },
  {
    question: "Muss ich selbst zur Zulassungsstelle?",
    answer:
      "Nein. Wir erledigen den kompletten Behördengang für Sie – digital per Sofort-Zulassung oder klassisch mit Abgabe der Unterlagen.",
  },
  {
    question: "Kann ich mein altes Fahrzeug gleichzeitig verkaufen?",
    answer:
      "Ja. Sie können den Fahrzeugankauf mit Zulassung, Abmeldung oder auch unabhängig davon beauftragen. Beim Ankauf ist die Abmeldung gratis.",
  },
  {
    question: "Bieten Sie den Service nur in Bad Salzuflen an?",
    answer:
      "Der Schwerpunkt liegt auf Bad Salzuflen und dem Kreis Lippe, inklusive persönlicher Betreuung vor Ort.",
  },
  {
    question: "Brauche ich einen Termin?",
    answer:
      "Nein. Kommen Sie einfach vorbei – Montag bis Freitag 9–18 Uhr, Samstag 15–18 Uhr. Online-Zulassungen erledigen wir rund um die Uhr.",
  },
];

// Benötigte Unterlagen je Vorgang – nach den Vorgaben des Straßenverkehrsamts Kreis Lippe
export const vorgangChecklists: VorgangChecklist[] = [
  {
    key: "neuzulassung",
    title: "Neuzulassung (Neufahrzeug)",
    items: [
      "Personalausweis oder Reisepass",
      "eVB-Nummer Ihrer KFZ-Versicherung",
      "Fahrzeugbrief (Zulassungsbescheinigung Teil II)",
      "EU-Übereinstimmungsbescheinigung (COC-Papiere)",
      "IBAN für das SEPA-Lastschriftmandat der KFZ-Steuer",
    ],
  },
  {
    key: "umschreibung",
    title: "Umschreibung / Halterwechsel (Gebrauchtwagen)",
    items: [
      "Personalausweis oder Reisepass",
      "eVB-Nummer Ihrer KFZ-Versicherung",
      "Fahrzeugschein (Zulassungsbescheinigung Teil I)",
      "Fahrzeugbrief (Zulassungsbescheinigung Teil II)",
      "HU-Nachweis (TÜV-Bericht) – nicht nötig, wenn die gültige HU mit Stempel im Fahrzeugschein eingetragen ist",
      "Bisherige Kennzeichen (falls das Fahrzeug noch angemeldet ist)",
      "IBAN für das SEPA-Lastschriftmandat der KFZ-Steuer",
    ],
  },
  {
    key: "wiederzulassung",
    title: "Wiederzulassung (nach Abmeldung)",
    items: [
      "Personalausweis oder Reisepass",
      "eVB-Nummer Ihrer KFZ-Versicherung",
      "Fahrzeugschein (Zulassungsbescheinigung Teil I)",
      "Fahrzeugbrief (Zulassungsbescheinigung Teil II)",
      "HU-Nachweis (TÜV-Bericht) – nicht nötig, wenn die gültige HU mit Stempel im Fahrzeugschein eingetragen ist",
      "IBAN für das SEPA-Lastschriftmandat der KFZ-Steuer",
    ],
  },
  {
    key: "abmeldung",
    title: "Blitzabmeldung (Außerbetriebsetzung)",
    items: [
      "Beide Kennzeichenschilder",
      "Fahrzeugschein (Zulassungsbescheinigung Teil I)",
      "Personalausweis oder Reisepass",
      "Sicherheitscodes zum Freirubbeln auf Fahrzeugschein und Kennzeichen-Plaketten (bei Zulassung ab 2015 vorhanden)",
      "Bei Verschrottung: Verwertungsnachweis",
    ],
    hint: "Verkaufen Sie Ihr Fahrzeug an uns, ist die Abmeldung gratis.",
  },
  {
    key: "adressaenderung",
    title: "Adress- oder Namensänderung",
    items: [
      "Personalausweis mit neuer Adresse bzw. Nachweis der Namensänderung",
      "Fahrzeugschein (Zulassungsbescheinigung Teil I)",
    ],
  },
  {
    key: "wunschkennzeichen",
    title: "Wunschkennzeichen / Kennzeichen-Reservierung",
    items: [
      "Ihre Wunschkombination – mehr braucht es nicht",
      "Entweder direkt bei uns vor Ort beauftragen (+13 €) oder vorher selbst online reservieren",
    ],
    hint: "Im Kreis Lippe stehen LIP, DT und LE zur Wahl.",
  },
  {
    key: "umkennzeichnung",
    title: "Neues Kennzeichen (z. B. von LIP auf DT oder LE)",
    items: [
      "Personalausweis oder Reisepass",
      "Fahrzeugschein (Zulassungsbescheinigung Teil I)",
      "Fahrzeugbrief (Zulassungsbescheinigung Teil II)",
      "Beide bisherigen Kennzeichenschilder",
      "Ihre Wunschkombination, falls Sie eine haben",
    ],
  },
  {
    key: "gewerbe",
    title: "Zulassung im Auftrag (Händler, Firmen, Vollmacht)",
    items: [
      "Vollmacht des Halters",
      "Personalausweis des Halters oder eine Kopie davon",
      "eVB-Nummer der Versicherung des Halters",
      "SEPA-Lastschriftmandat für die KFZ-Steuer, vom Halter unterschrieben",
      "Zulassungsbescheinigung Teil I und Teil II",
      "Bei Neuwagen: COC-Papiere",
    ],
    hint: "Vollmacht und SEPA-Mandat gibt es unter Formulare zum Ausdrucken.",
  },
  {
    key: "kurzzeitkennzeichen",
    title: "Kurzzeitkennzeichen (5 Tage)",
    items: [
      "Personalausweis oder Reisepass",
      "eVB-Nummer speziell für Kurzzeitkennzeichen",
      "Zulassungsbescheinigung Teil I oder Teil II des Fahrzeugs",
      "Nachweis über die gültige Hauptuntersuchung (TÜV)",
      "IBAN für das SEPA-Lastschriftmandat der KFZ-Steuer",
    ],
    hint: "Was in Ihrem Fall genau nötig ist, klären wir kurz im Chat.",
  },
  {
    key: "ausfuhrkennzeichen",
    title: "Ausfuhrkennzeichen (Export)",
    items: [
      "Personalausweis oder Reisepass",
      "eVB-Nummer speziell für Ausfuhrkennzeichen",
      "Fahrzeugschein (Zulassungsbescheinigung Teil I)",
      "Fahrzeugbrief (Zulassungsbescheinigung Teil II)",
      "Nachweis über die gültige Hauptuntersuchung (TÜV)",
      "Bisherige Kennzeichen, falls das Fahrzeug noch angemeldet ist",
    ],
    hint: "Was in Ihrem Fall genau nötig ist, klären wir kurz im Chat.",
  },
];

/** Die sechs Fragen, die Kunden zuerst stellen – für die Startseite (Rest auf /faq) */
const STARTSEITEN_FRAGEN = [
  "Brauche ich einen Termin?",
  "Was kostet die Zulassung?",
  "Wie schnell ist eine KFZ-Zulassung möglich?",
  "Was brauche ich für die Sofort-Zulassung?",
  "Was ist der Unterschied zwischen SOFORT, BASIS und PREMIUM?",
  "Kann ich mein altes Fahrzeug gleichzeitig verkaufen?",
];
export const startseitenFaqs: FaqItem[] = STARTSEITEN_FRAGEN.map(
  (frage) => generalFaqs.find((faq) => faq.question === frage)!
);
