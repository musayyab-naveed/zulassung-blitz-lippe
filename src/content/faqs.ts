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
      "Ihr lokaler Zulassungsdienst in Bad Salzuflen für den gesamten Kreis Lippe. Wir übernehmen An-, Um- und Abmeldungen komplett für Sie – ohne Behördengang, bewertet mit 5,0 Sternen bei 46 Google-Bewertungen.",
  },
  {
    question: "Wie schnell ist eine KFZ-Zulassung möglich?",
    answer:
      "Mit unserer neuen Sofort-Zulassung erfolgt die Zulassung digital in ca. 20 Minuten. Klassisch mit Abgabe der Unterlagen dauert es maximal 24 Stunden.",
  },
  {
    question: "Was brauche ich für die Sofort-Zulassung?",
    answer:
      "Die eVB-Nummer Ihrer Versicherung, Ihren Personalausweis, die Zulassungsbescheinigung Teil I und II sowie Ihre IBAN für die KFZ-Steuer – nach ca. 20 Minuten sind Sie zugelassen. Die Kennzeichen besorgen Sie selbst, wann Sie möchten (Wunschkennzeichen möglich, +13 €): vor dem Termin oder danach. Zugelassen sind Sie in jedem Fall – losfahren dürfen Sie, sobald die Schilder montiert sind.",
  },
  {
    question: "Was ist der Unterschied zwischen SOFORT, BASIS und PREMIUM?",
    answer:
      "SOFORT: Sie kommen kurz vorbei, die Zulassung läuft digital in ca. 20 Minuten – die Kennzeichen besorgen Sie selbst. BASIS: Sie geben die Unterlagen ab und holen am nächsten Werktag alles fertig inklusive Kennzeichen wieder ab. PREMIUM: wie BASIS, aber wir holen und bringen die Unterlagen – Sie müssen gar nicht erst zu uns kommen.",
  },
  {
    question: "Was kostet die Zulassung?",
    answer:
      "Die Zulassung gibt es ab 129 €, die Abmeldung für 30 € – Verwaltungsgebühren inklusive, keine versteckten Kosten. Ein Wunschkennzeichen kostet 13 € Aufpreis.",
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
    question: "Wie buche ich einen Termin?",
    answer:
      "Paket auswählen, kurz die Optionen beantworten und direkt online einen Termin buchen – alles in unter 2 Minuten.",
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
      "Zulassungsbescheinigung Teil II (Fahrzeugbrief)",
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
      "Zulassungsbescheinigung Teil I (Fahrzeugschein)",
      "Zulassungsbescheinigung Teil II (Fahrzeugbrief)",
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
      "Zulassungsbescheinigung Teil I (Fahrzeugschein)",
      "Zulassungsbescheinigung Teil II (Fahrzeugbrief)",
      "HU-Nachweis (TÜV-Bericht) – nicht nötig, wenn die gültige HU mit Stempel im Fahrzeugschein eingetragen ist",
      "IBAN für das SEPA-Lastschriftmandat der KFZ-Steuer",
    ],
  },
  {
    key: "abmeldung",
    title: "Abmeldung (Außerbetriebsetzung)",
    items: [
      "Beide Kennzeichenschilder",
      "Zulassungsbescheinigung Teil I (Fahrzeugschein)",
      "Personalausweis oder Reisepass",
      "Bei Verschrottung: Verwertungsnachweis",
    ],
    hint: "Verkaufen Sie Ihr Fahrzeug an uns, ist die Abmeldung gratis.",
  },
  {
    key: "adressaenderung",
    title: "Adress- oder Namensänderung",
    items: [
      "Personalausweis mit neuer Adresse bzw. Nachweis der Namensänderung",
      "Zulassungsbescheinigung Teil I (Fahrzeugschein)",
    ],
  },
  {
    key: "wunschkennzeichen",
    title: "Wunschkennzeichen / Kennzeichen-Reservierung",
    items: [
      "Keine besonderen Unterlagen nötig – Wunschkombination genügt",
      "Reservierung übernehmen wir für Sie (+13 €)",
    ],
  },
];
