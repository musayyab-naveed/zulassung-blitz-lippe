// Zentrale Preisliste – die EINZIGE Stelle, an der Preise gepflegt werden.
//
// Wird genutzt von:
//   - /angebot  (Paketauswahl im Assistenten + Buchung)
//   - /preise   (Preisseite)
//   - seoRoutes.ts (Angebots-Schema für Google)
//
// Wer einen Preis ändern will, ändert ihn hier – und nur hier.

export type PackageKey = "ummeldung" | "sofort" | "basis" | "premium" | "abmeldung" | "sonderkennzeichen" | "ankauf_only";

export interface PackageDef {
  key: PackageKey;
  title: string;
  /** Anzeigepreis inkl. Währung, z. B. "129 €" */
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
    key: "ummeldung",
    title: "UMMELDUNG",
    price: "99 €",
    priceValue: "99",
    subtitle: "Halterwechsel oder neue Adresse – Ihre Kennzeichen bleiben am Auto",
    features: [
      "Umschreibung auf Ihren Namen oder Adressänderung",
      "Kennzeichen bleiben dran",
      "Ohne Termin beim Amt",
      "Verwaltungsgebühren inkl.",
    ],
    buttonText: "UMMELDUNG WÄHLEN",
    buttonVariant: "cta" as const,
    schemaDescription:
      "Halterwechsel oder Adressänderung, bei der die Kennzeichen am Auto bleiben – Verwaltungsgebühren inklusive.",
  },
  {
    key: "sofort",
    title: "SOFORT",
    price: "129 €",
    priceValue: "129",
    subtitle:
      "Digital direkt vor Ort in ca. 20 Min – Sie warten kurz. Die Schilder besorgen Sie selbst, ob vorher oder nachher, entscheiden Sie.",
    popular: true,
    features: [
      "Zulassung digital in ca. 20 Minuten",
      "Losfahren, sobald die Schilder dran sind",
      "Wunschkennzeichen möglich (+13 €)",
      "Verwaltungsgebühren inkl.",
    ],
    buttonText: "SOFORT WÄHLEN",
    buttonVariant: "cta" as const,
    schemaDescription:
      "Digitale Zulassung vor Ort in ca. 20 Minuten. Kennzeichen besorgen Sie selbst, vorher oder nachher.",
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
    title: "SOFORTABMELDUNG",
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
    buttonText: "SOFORTABMELDUNG WÄHLEN",
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
    title: "FAHRZEUGANKAUF",
    price: "kostenlos",
    priceValue: "0",
    subtitle: "Wir kaufen Ihr Auto an – auch ohne Zulassung bei uns",
    features: [
      "Kostenlose und unverbindliche Anfrage",
      "Auch ältere oder nicht fahrbereite Fahrzeuge",
      "Abmeldung beim Ankauf gratis",
      "Fachgerechte Verwertung auf Wunsch",
    ],
    buttonText: "AUTO VERKAUFEN",
    buttonVariant: "cta" as const,
    schemaDescription:
      "Kostenlose und unverbindliche Ankaufanfrage – beim Ankauf ist die Abmeldung gratis.",
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
  ummeldung: { dauer: "ca. 20 Minuten oder nächster Werktag", kennzeichen: "bleiben am Auto" },
  sofort: { dauer: "ca. 20 Minuten", kennzeichen: "besorgen Sie selbst" },
  basis: { dauer: "nächster Werktag", kennzeichen: "inklusive" },
  premium: { dauer: "nächster Werktag", kennzeichen: "inklusive, plus Hol- & Bringservice" },
  abmeldung: { dauer: "sofort vor Ort", kennzeichen: "Schilder bringen Sie mit" },
  sonderkennzeichen: { dauer: "nach Absprache", kennzeichen: "Kurzzeit- oder Ausfuhrkennzeichen" },
  ankauf_only: { dauer: "nach Absprache", kennzeichen: "–" },
};

export const PREIS_TABELLE: TabellenZeile[] = [
  ...PACKAGES.filter((pkg) => !pkg.hideOnPricingPage && pkg.key !== "ankauf_only").map((pkg) => ({
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
      "Gebühr des Straßenverkehrsamts für Ihre Wunschkombination im Kreis Lippe – wir reservieren sie für Sie. Alternativ reservieren Sie selbst vorab online.",
  },
  {
    name: "Feinstaubplakette",
    price: "+6 €",
    priceValue: "6",
    description: "Gebühr des Straßenverkehrsamts für die grüne Umweltplakette – direkt zusammen mit der Zulassung aufgebracht.",
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
      "Ja. Die Gebühren des Straßenverkehrsamts sind in unseren Preisen bereits enthalten. Sie zahlen 99 € für die Ummeldung, 129 € für die Zulassung mit Kennzeichen beziehungsweise 40 € für die Sofortabmeldung – es kommt keine Nachzahlung an der Behörde dazu.",
  },
  {
    question: "Was ist der Unterschied zwischen SOFORT und BASIS?",
    answer:
      "Beide kosten 129 €. Bei SOFORT sind Sie digital direkt vor Ort in ca. 20 Minuten zugelassen – die Schilder besorgen Sie selbst, ob vorher oder nachher, entscheiden Sie. Bei BASIS sind die Schilder dabei, dafür ist alles am nächsten Werktag fertig. PREMIUM (159 €) ist BASIS mit Hol- und Bringservice.",
  },
  {
    question: "Gibt es versteckte Kosten?",
    answer:
      "Nein. Es gibt genau zwei Aufpreise, und beide entscheiden Sie selbst: Wunschkennzeichen +13 € und Feinstaubplakette +6 €. Das sind Gebühren des Straßenverkehrsamts, keine Aufschläge von uns. Alles andere ist im Paketpreis enthalten.",
  },
  {
    question: "Was kostet eine Ummeldung?",
    answer:
      "99 € inklusive Verwaltungsgebühren – für den Halterwechsel nach dem Autokauf oder eine neue Adresse, wenn Ihre Kennzeichen am Auto bleiben. Brauchen Sie neue Kennzeichen, ist es eine Zulassung mit Kennzeichen für 129 €.",
  },
  {
    question: "Was kostet die Abmeldung?",
    answer:
      "Die Sofortabmeldung kostet 40 € und läuft digital direkt vor Ort. Verkaufen Sie Ihr Fahrzeug an uns, ist die Abmeldung kostenlos – die 40 € entfallen dann.",
  },
  {
    question: "Kostet die Ankaufanfrage etwas?",
    answer:
      "Nein. Die Ersteinschätzung und das Angebot für Ihr Fahrzeug sind kostenlos und unverbindlich – auch für nicht fahrbereite Fahrzeuge.",
  },
  {
    question: "Wie kann ich bezahlen?",
    answer:
      "Bar, mit EC-Karte, per PayPal, per SEPA-Lastschrift oder auf Rechnung. Bezahlt wird erst, wenn alles fertig ist – also wenn Ihr Auto zugelassen oder abgemeldet ist.",
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
    beiUns: "Ja, wir nennen den Endpreis, bevor wir anfangen",
    hinweis:
      "Keine Nachzahlung bei der Behörde, keine Überraschung an der Kasse.",
  },
];
