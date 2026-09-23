// Zentrale Preisliste – die EINZIGE Stelle, an der Preise gepflegt werden.
//
// Wird genutzt von:
//   - /angebot  (Paketauswahl im Assistenten + Buchung)
//   - /preise   (Preisseite)
//   - seoRoutes.ts (Angebots-Schema für Google)
//
// Wer einen Preis ändern will, ändert ihn hier – und nur hier.

export type PackageKey = "sofort" | "basis" | "premium" | "abmeldung" | "sonderkennzeichen" | "ankauf_only";

export interface PackageDef {
  key: PackageKey;
  title: string;
  /** Anzeigepreis inkl. Währung, z. B. "ab 129 €" */
  price: string;
  /** Reine Zahl für schema.org (ohne Währung, ohne "ab") */
  priceValue: string;
  subtitle?: string;
  features: string[];
  highlight?: string;
  buttonText: string;
  popular?: boolean;
  buttonVariant?: "default" | "cta";
  /** Kurzfassung für Google und die Preistabelle */
  schemaDescription: string;
  /** Auf der Preisseite ausblenden (dort führen wir den Ankauf separat) */
  hideOnPricingPage?: boolean;
}

export const PACKAGES: PackageDef[] = [
  {
    key: "sofort",
    title: "SOFORT",
    price: "ab 129 €",
    priceValue: "129",
    subtitle:
      "Fertig in ca. 20 Min – Sie warten kurz vor Ort. Kennzeichen besorgen Sie selbst, vor oder nach der Zulassung – zugelassen sind Sie in jedem Fall.",
    popular: true,
    features: [
      "Zulassung digital in ca. 20 Minuten",
      "Direkt losfahren",
      "Wunschkennzeichen möglich (+13 €)",
      "Verwaltungsgebühren inkl.",
    ],
    buttonText: "SOFORT WÄHLEN",
    buttonVariant: "cta" as const,
    schemaDescription:
      "Digitale Zulassung vor Ort in ca. 20 Minuten. Kennzeichen besorgen Sie selbst, vor oder nach dem Termin.",
  },
  {
    key: "basis",
    title: "BASIS",
    price: "129 €",
    priceValue: "129",
    subtitle: "Fertig am nächsten Werktag – Sie bringen & holen die Unterlagen",
    features: [
      "Fertig am nächsten Werktag",
      "Unterlagen vor Ort abgeben",
      "Verwaltungsgebühren inkl.",
      "Sie möchten Ihr altes Fahrzeug verkaufen? Wir kaufen es gerne an",
      "Kostenlose Abmeldung bei Ankauf",
    ],
    buttonText: "BASIS WÄHLEN",
    buttonVariant: "cta" as const,
    schemaDescription:
      "Unterlagen abgeben, am nächsten Werktag alles fertig abholen – inklusive Kennzeichen.",
  },
  {
    key: "premium",
    title: "PREMIUM",
    price: "159 €",
    priceValue: "159",
    subtitle: "Fertig am nächsten Werktag – wir holen & bringen alles",
    features: [
      "Alles vom BASIS",
      "Hol- und Bringservice möglich",
      "Express-Rückversand inklusive",
      "Sie möchten Ihr altes Fahrzeug verkaufen? Wir kaufen es gerne an",
      "Kostenlose Abmeldung bei Ankauf",
    ],
    buttonText: "PREMIUM WÄHLEN",
    buttonVariant: "cta" as const,
    schemaDescription:
      "Wir holen die Unterlagen ab und bringen alles fertig zurück (Raum Bad Salzuflen) oder wickeln per Versand ab.",
  },
  {
    key: "abmeldung",
    title: "BLITZABMELDUNG",
    price: "40 €",
    priceValue: "40",
    subtitle: "Sofort vor Ort abgemeldet – Sie warten kurz",
    features: [
      "Abmeldung digital direkt vor Ort",
      "Verwaltungsgebühren inkl.",
      "Sie möchten Ihr altes Fahrzeug verkaufen? Wir kaufen es gerne an",
      "Kostenlose Abmeldung bei Ankauf",
    ],
    highlight:
      "Voraussetzung: Sicherheitscodes zum Freirubbeln auf Fahrzeugschein und Kennzeichen (Zulassung ab 2015)",
    buttonText: "BLITZABMELDUNG WÄHLEN",
    buttonVariant: "cta" as const,
    schemaDescription: "Fahrzeug direkt vor Ort digital abmelden – Sie warten nur kurz.",
  },
  {
    key: "sonderkennzeichen",
    title: "KURZZEIT- & AUSFUHRKENNZEICHEN",
    price: "auf Anfrage",
    priceValue: "",
    subtitle: "Für Überführung, Probefahrt oder Export – kurz per WhatsApp anfragen",
    features: [
      "Kurzzeitkennzeichen (5 Tage gültig)",
      "Ausfuhrkennzeichen für den Export",
      "Ohne Termin beim Amt",
      "Preis nennen wir Ihnen direkt im Chat",
    ],
    highlight:
      "Wichtig: Für beide Kennzeichen brauchen Sie eine eigene eVB-Nummer – eine normale eVB passt hier nicht.",
    buttonText: "PER WHATSAPP ANFRAGEN",
    buttonVariant: "cta" as const,
    schemaDescription:
      "Kurzzeitkennzeichen und Ausfuhrkennzeichen ohne Behördentermin – Preis auf Anfrage per WhatsApp.",
  },
  {
    key: "ankauf_only",
    title: "NUR FAHRZEUGVERKAUF",
    price: "0 €",
    priceValue: "0",
    features: [
      "Unverbindliche Ankaufanfrage ohne Zulassungspaket",
      "Fotos per WhatsApp oder Formular schicken",
      "Fachgerechte Verwertung nicht fahrbereiter Fahrzeuge möglich",
    ],
    buttonText: "NUR FAHRZEUGVERKAUF WÄHLEN",
    buttonVariant: "cta" as const,
    schemaDescription:
      "Kostenlose und unverbindliche Ankaufanfrage – beim Ankauf ist die Abmeldung gratis.",
    hideOnPricingPage: true,
  },
];

/**
 * Zeilen der Preisübersicht auf /preise.
 * Die Preise werden aus PACKAGES gezogen – nie hier hart eintragen.
 */
export interface TabellenZeile {
  leistung: string;
  dauer: string;
  kennzeichen: string;
  preis: string;
  beliebt?: boolean;
  kostenlos?: boolean;
}

const zeilenInfo: Record<PackageKey, { dauer: string; kennzeichen: string }> = {
  sofort: { dauer: "ca. 20 Minuten", kennzeichen: "besorgen Sie selbst" },
  basis: { dauer: "nächster Werktag", kennzeichen: "inklusive" },
  premium: { dauer: "nächster Werktag", kennzeichen: "inklusive, plus Hol- & Bringservice" },
  abmeldung: { dauer: "sofort vor Ort", kennzeichen: "Schilder bringen Sie mit" },
  sonderkennzeichen: { dauer: "nach Absprache", kennzeichen: "Kurzzeit- oder Ausfuhrkennzeichen" },
  ankauf_only: { dauer: "nach Absprache", kennzeichen: "–" },
};

export const PREIS_TABELLE: TabellenZeile[] = [
  ...PACKAGES.filter((pkg) => !pkg.hideOnPricingPage).map((pkg) => ({
    leistung: pkg.title,
    dauer: zeilenInfo[pkg.key].dauer,
    kennzeichen: zeilenInfo[pkg.key].kennzeichen,
    preis: pkg.price,
    beliebt: pkg.popular,
  })),
  {
    leistung: "Fahrzeugankauf",
    dauer: zeilenInfo.ankauf_only.dauer,
    kennzeichen: zeilenInfo.ankauf_only.kennzeichen,
    preis: "kostenlos",
    kostenlos: true,
  },
];

export interface ExtraDef {
  name: string;
  price: string;
  priceValue: string;
  description: string;
}

export const EXTRAS: ExtraDef[] = [
  {
    name: "Wunschkennzeichen",
    price: "+13 €",
    priceValue: "13",
    description:
      "Ihre Wunschkombination für den Kreis Lippe – wir reservieren sie für Sie. Alternativ reservieren Sie selbst vorab online.",
  },
  {
    name: "Feinstaubplakette",
    price: "+6 €",
    priceValue: "6",
    description: "Grüne Umweltplakette, direkt zusammen mit der Zulassung aufgebracht.",
  },
];

/** Was in jedem Zulassungspreis bereits steckt */
export const IM_PREIS_ENTHALTEN: string[] = [
  "Verwaltungsgebühren des Straßenverkehrsamts Kreis Lippe",
  "Unser kompletter Behördengang – Sie müssen nicht zur Zulassungsstelle",
  "Beratung und Prüfung Ihrer Unterlagen vor der Zulassung",
  "Bei BASIS und PREMIUM: die Kennzeichenschilder",
  "Keine Wartenummer, kein Behördentermin, keine Anfahrt für Sie",
];

/** Ehrliche Abgrenzung – schafft Vertrauen und spart Fehlanfragen */
export const NICHT_IM_ANGEBOT: string[] = [
  "Reine Schilderprägung ohne Zulassung – Kennzeichen gibt es bei uns nur zusammen mit einer Zulassung",
  "Die KFZ-Steuer selbst – die zieht das Hauptzollamt direkt bei Ihnen ein",
  "Ihre KFZ-Versicherung – die eVB-Nummer bringen Sie mit",
];

export const ZAHLUNGSARTEN: string[] = ["Bar", "EC-Karte", "PayPal", "SEPA-Lastschrift", "Rechnung"];

/** Fragen rund um den Preis – erscheinen auf /preise und werden Google als FAQ gemeldet */
export interface PreisFaq {
  question: string;
  answer: string;
}

export const PREIS_FAQS: PreisFaq[] = [
  {
    question: "Sind die Verwaltungsgebühren im Preis enthalten?",
    answer:
      "Ja. Die Gebühren des Straßenverkehrsamts sind in unseren Preisen bereits enthalten. Sie zahlen 129 € für die Zulassung beziehungsweise 40 € für die Blitzabmeldung – es kommt keine Nachzahlung an der Behörde dazu.",
  },
  {
    question: "Warum steht bei SOFORT „ab 129 €“?",
    answer:
      "Weil bei der Sofort-Zulassung die Kennzeichenschilder nicht enthalten sind – die besorgen Sie selbst, vor oder nach dem Termin. Zugelassen sind Sie in jedem Fall nach ca. 20 Minuten. Möchten Sie die Schilder von uns, wählen Sie BASIS oder PREMIUM für 129 € beziehungsweise 159 € – dort sind sie im Preis enthalten.",
  },
  {
    question: "Gibt es versteckte Kosten?",
    answer:
      "Nein. Es gibt genau zwei Aufpreise, und beide entscheiden Sie selbst: Wunschkennzeichen +13 € und Feinstaubplakette +6 €. Alles andere ist im Paketpreis enthalten.",
  },
  {
    question: "Was kostet die Abmeldung?",
    answer:
      "Die Blitzabmeldung kostet 40 € und läuft digital direkt vor Ort. Verkaufen Sie Ihr Fahrzeug an uns, ist die Abmeldung kostenlos – die 40 € entfallen dann.",
  },
  {
    question: "Kostet die Ankaufanfrage etwas?",
    answer:
      "Nein. Die Ersteinschätzung und das Angebot für Ihr Fahrzeug sind kostenlos und unverbindlich – auch für nicht fahrbereite Fahrzeuge.",
  },
  {
    question: "Wie kann ich bezahlen?",
    answer:
      "Bar, mit EC-Karte, per PayPal, per SEPA-Lastschrift oder auf Rechnung. Bezahlt wird beim Termin, nicht vorab bei der Buchung.",
  },
  {
    question: "Ist die KFZ-Steuer im Preis enthalten?",
    answer:
      "Nein, und das kann kein Anbieter leisten: Die KFZ-Steuer zieht das Hauptzollamt direkt von Ihrem Konto ein. Dafür unterschreiben Sie bei der Zulassung ein SEPA-Lastschriftmandat. Die Höhe hängt von Ihrem Fahrzeug ab.",
  },
];

/** Angebots-Katalog im schema.org-Format – für die Google-Auszeichnung */
export const buildOfferCatalog = () => ({
  "@type": "OfferCatalog",
  name: "Leistungen",
  itemListElement: [
    ...PACKAGES.map((pkg) => ({
      "@type": "Offer",
      name: pkg.subtitle ? `${pkg.title} – ${pkg.subtitle.split("–")[0].trim()}` : pkg.title,
      price: pkg.priceValue,
      priceCurrency: "EUR",
      description: pkg.schemaDescription,
    })),
    ...EXTRAS.map((extra) => ({
      "@type": "Offer",
      name: extra.name,
      price: extra.priceValue,
      priceCurrency: "EUR",
      description: extra.description,
    })),
  ],
});

/**
 * Hilfe beim Preisvergleich.
 *
 * Hintergrund: Viele Anbieter weisen nur ihr eigenes Honorar aus, die
 * Verwaltungsgebuehren und die Schilder kommen dann obendrauf. Unsere Preise
 * sind Endpreise. Ohne diesen Abschnitt wirken wir teurer, als wir sind.
 * Bewusst ohne Namen und ohne fremde Zahlen - wir erklaeren nur, worauf man
 * beim Vergleichen achten muss.
 */
export interface VergleichsPunkt {
  frage: string;
  beiUns: string;
  hinweis: string;
}

export const PREIS_VERGLEICH: VergleichsPunkt[] = [
  {
    frage: "Sind die Verwaltungsgebühren des Kreises enthalten?",
    beiUns: "Ja, in jedem Paket",
    hinweis:
      "Viele Anbieter nennen nur ihr Honorar. Die Gebühren des Straßenverkehrsamts werden dann zusätzlich nach Beleg abgerechnet.",
  },
  {
    frage: "Sind die Kennzeichenschilder enthalten?",
    beiUns: "Bei BASIS und PREMIUM ja",
    hinweis:
      "Schilder kosten sonst extra. Bei SOFORT besorgen Sie sie selbst – deshalb steht dort „ab“ und nicht ein fester Preis.",
  },
  {
    frage: "Steht ein „ab“ oder ein Sternchen am Preis?",
    beiUns: "Nur bei SOFORT, und dort steht auch warum",
    hinweis:
      "Ein Sternchen am Preis heißt fast immer: Da kommt noch etwas dazu. Lesen Sie, was im Kleingedruckten steht.",
  },
  {
    frage: "Wissen Sie vorher, was Sie am Ende zahlen?",
    beiUns: "Ja, wir nennen den Endpreis vor dem Termin",
    hinweis:
      "Keine Nachzahlung bei der Behörde, keine Überraschung an der Kasse.",
  },
];
