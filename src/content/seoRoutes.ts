import { buildOfferCatalog } from "./preise";

// Zentrale SEO-Daten je Seite.
// Wird von den React-Seiten UND vom Prerender-Schritt (scripts/prerender.mjs)
// genutzt, damit Suchmaschinen schon im ausgelieferten HTML den richtigen
// Titel, die richtige Beschreibung und das passende Canonical vorfinden.

export const SITE_URL = "https://sofortzulassung.com";
export const SITE_NAME = "KFZ-Sofortzulassung";
export const OG_IMAGE = "/og-image.jpg";

export const BUSINESS = {
  name: SITE_NAME,
  legalName: "KFZ-Sofortzulassung",
  street: "Werler Straße 68",
  postalCode: "32105",
  city: "Bad Salzuflen",
  region: "Nordrhein-Westfalen",
  country: "DE",
  phone: "+4915142462280",
  email: "info@sofortzulassung.com",
  latitude: 52.0828686,
  longitude: 8.7297261,
  priceRange: "€€",
  ratingValue: "5.0",
  reviewCount: 46,
  mapsUrl: "https://maps.app.goo.gl/",
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
    { days: ["Saturday"], opens: "15:00", closes: "18:00" },
  ],
} as const;

export interface RouteSeo {
  path: string;
  title: string;
  description: string;
  /** Von der Sitemap/Prerender ausgeschlossen bzw. nicht indexierbar */
  noindex?: boolean;
}

export const ROUTE_SEO: RouteSeo[] = [
  {
    path: "/",
    title: "Zulassungsdienst Bad Salzuflen – KFZ-Zulassung in 20 Min | Kreis Lippe",
    description:
      "KFZ-Zulassung in Bad Salzuflen ohne Behördentermin: Sofort-Zulassung digital in ca. 20 Minuten ab 129 €, klassisch zum nächsten Werktag, Blitzabmeldung 40 €. 5,0 ★ bei 46 Bewertungen. Auch samstags geöffnet.",
  },
  {
    path: "/angebot",
    title: "Zulassung online beauftragen – Termin buchen | KFZ-Sofortzulassung",
    description:
      "Auto zulassen, ummelden oder abmelden im Kreis Lippe: In wenigen Klicks zum passenden Paket und direkt online einen Termin in Bad Salzuflen buchen – ohne Wartezeit bei der Zulassungsstelle.",
  },
  {
    path: "/preise",
    title: "Preise KFZ-Zulassung Bad Salzuflen – ab 129 € inkl. Gebühren",
    description:
      "Alle Preise auf einen Blick: Sofort-Zulassung ab 129 €, Zulassung mit Kennzeichen 129 €, Hol- und Bringservice 159 €, Blitzabmeldung 40 €. Verwaltungsgebühren inklusive, keine versteckten Kosten – Zulassungsdienst im Kreis Lippe.",
  },
  {
    path: "/evb-nummer",
    title: "eVB-Nummer für die KFZ-Zulassung – einfach erklärt | Bad Salzuflen",
    description:
      "Was ist die eVB-Nummer, wann brauchen Sie eine und wie lange gilt sie? Alle Antworten für Neuzulassung, Umschreibung und Wiederzulassung – plus die fünf häufigsten Fehler aus der Praxis. Zulassungsdienst Bad Salzuflen, Kreis Lippe.",
  },
  {
    path: "/faq",
    title: "Welche Unterlagen brauche ich? FAQ zur KFZ-Zulassung | Kreis Lippe",
    description:
      "Checklisten für Neuzulassung, Umschreibung, Wiederzulassung und Abmeldung im Kreis Lippe: eVB-Nummer, Fahrzeugschein, Fahrzeugbrief, SEPA-Mandat – plus Antworten auf die häufigsten Fragen.",
  },
  {
    path: "/fahrzeugankauf",
    title: "Auto verkaufen in Bad Salzuflen – Fahrzeugankauf Kreis Lippe",
    description:
      "Fahrzeug verkaufen in Bad Salzuflen: kostenlose Ersteinschätzung, faire Ankaufprüfung vor Ort, Abholung möglich. Beim Ankauf ist die Abmeldung gratis – auch nicht fahrbereite Fahrzeuge.",
  },
  {
    path: "/dokumente",
    title: "Vollmacht & SEPA-Mandat als PDF – Formulare zum Ausdrucken",
    description:
      "Vollmacht für Zulassung und Abmeldung sowie SEPA-Lastschriftmandat als PDF herunterladen. Für Kunden im Kreis Lippe, die uns ihre Unterlagen zusenden möchten.",
  },
  {
    path: "/ueber-uns",
    title: "Über uns – Ihr Zulassungsdienst in Bad Salzuflen seit 5+ Jahren",
    description:
      "KFZ-Sofortzulassung in Bad Salzuflen: persönlicher Service für den Kreis Lippe, über 1000 zufriedene Kunden, 5,0 Sterne bei Google und Sofort-Zulassung in ca. 20 Minuten.",
  },
  {
    path: "/impressum",
    title: "Impressum | KFZ-Sofortzulassung",
    description:
      "Impressum von KFZ-Sofortzulassung in Bad Salzuflen mit allen gesetzlichen Pflichtangaben und Kontaktinformationen.",
  },
  {
    path: "/datenschutz",
    title: "Datenschutz | KFZ-Sofortzulassung",
    description:
      "Datenschutzerklärung von KFZ-Sofortzulassung: Informationen zur Verarbeitung personenbezogener Daten nach DSGVO.",
  },
];

export const getRouteSeo = (path: string): RouteSeo | undefined =>
  ROUTE_SEO.find((route) => route.path === path);

/** LocalBusiness-Daten als schema.org-Objekt (absolute URLs, wie von Google verlangt) */
export const buildLocalBusinessSchema = () => ({
  "@type": ["AutomotiveBusiness", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: BUSINESS.name,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}${OG_IMAGE}`,
  logo: `${SITE_URL}${OG_IMAGE}`,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  priceRange: BUSINESS.priceRange,
  currenciesAccepted: "EUR",
  paymentAccepted: "Bar, EC-Karte, PayPal, Rechnung, SEPA",
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.street,
    postalCode: BUSINESS.postalCode,
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.region,
    addressCountry: BUSINESS.country,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.latitude,
    longitude: BUSINESS.longitude,
  },
  openingHoursSpecification: BUSINESS.openingHours.map((slot) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: slot.days,
    opens: slot.opens,
    closes: slot.closes,
  })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: BUSINESS.ratingValue,
    reviewCount: BUSINESS.reviewCount,
    bestRating: "5",
    worstRating: "1",
  },
  areaServed: [
    { "@type": "City", name: "Bad Salzuflen" },
    { "@type": "City", name: "Detmold" },
    { "@type": "City", name: "Lemgo" },
    { "@type": "City", name: "Lage" },
    { "@type": "City", name: "Herford" },
    { "@type": "AdministrativeArea", name: "Kreis Lippe" },
  ],
  // Preise kommen aus src/content/preise.ts – dort werden sie gepflegt.
  hasOfferCatalog: buildOfferCatalog(),
});
