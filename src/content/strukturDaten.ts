import faqSchema from "./faqSchema.json";
import { generalFaqs, vorgangChecklists, type FaqItem } from "./faqs";
import { EXTRAS, PACKAGES, PREIS_FAQS } from "./preise";
import { BUSINESS, OG_IMAGE, SITE_URL } from "./seoRoutes";

/**
 * Strukturierte Daten (schema.org) für alle Seiten – die EINZIGE Stelle dafür.
 *
 * scripts/prerender.mjs schreibt sie beim Build direkt ins HTML. Die React-Seiten
 * setzen selbst keine eigenen Daten mehr, sonst stünde z. B. die Firma oder das
 * FAQ doppelt auf der Seite (das hatte Google schon einmal als Fehler gemeldet).
 */

const ORGANISATION_ID = `${SITE_URL}/#organization`;

/** Alle 16 Städte und Gemeinden im Kreis Lippe */
const ORTE_KREIS_LIPPE = [
  "Bad Salzuflen",
  "Detmold",
  "Lemgo",
  "Lage",
  "Leopoldshöhe",
  "Oerlinghausen",
  "Horn-Bad Meinberg",
  "Blomberg",
  "Barntrup",
  "Kalletal",
  "Extertal",
  "Dörentrup",
  "Augustdorf",
  "Schlangen",
  "Lügde",
  "Schieder-Schwalenberg",
];

/** Google-Maps-Eintrag des Unternehmensprofils */
export const GOOGLE_MAPS_URL = BUSINESS.mapsUrl;

export const localBusinessSchema = () => ({
  "@type": ["AutomotiveBusiness", "LocalBusiness"],
  "@id": ORGANISATION_ID,
  name: BUSINESS.name,
  url: `${SITE_URL}/`,
  image: `${SITE_URL}${OG_IMAGE}`,
  logo: `${SITE_URL}${OG_IMAGE}`,
  telephone: BUSINESS.phone,
  email: BUSINESS.email,
  priceRange: BUSINESS.priceRange,
  currenciesAccepted: "EUR",
  paymentAccepted: "Bar, EC-Karte, PayPal, Rechnung, SEPA",
  hasMap: GOOGLE_MAPS_URL,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.street,
    postalCode: BUSINESS.postalCode,
    addressLocality: BUSINESS.city,
    addressRegion: BUSINESS.region,
    addressCountry: BUSINESS.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: BUSINESS.latitude, longitude: BUSINESS.longitude },
  openingHoursSpecification: BUSINESS.openingHours.map((zeit) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: zeit.days,
    opens: zeit.opens,
    closes: zeit.closes,
  })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: BUSINESS.ratingValue,
    reviewCount: BUSINESS.reviewCount,
    bestRating: "5",
    worstRating: "1",
  },
  // Nur Kreis Lippe – Herford und Bielefeld bedienen wir nicht
  areaServed: [
    { "@type": "AdministrativeArea", name: "Kreis Lippe" },
    ...ORTE_KREIS_LIPPE.map((ort) => ({ "@type": "City", name: ort })),
  ],
  knowsAbout: [
    "KFZ-Zulassung",
    "Auto abmelden",
    "Auto ummelden",
    "Wunschkennzeichen",
    "eVB-Nummer",
    "Kurzzeitkennzeichen",
    "Ausfuhrkennzeichen",
  ],
});

export const websiteSchema = () => ({
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: BUSINESS.name,
  alternateName: ["Zulassungsdienst Bad Salzuflen", "sofortzulassung.com"],
  inLanguage: "de-DE",
  publisher: { "@id": ORGANISATION_ID },
});

const faqPage = (pfad: string, eintraege: FaqItem[]) => ({
  "@type": "FAQPage",
  "@id": `${SITE_URL}${pfad === "/" ? "/" : pfad}#faq`,
  mainEntity: eintraege.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
});

const dienstleistung = (
  pfad: string,
  name: string,
  serviceType: string,
  beschreibung: string,
  preis?: { wert: string; ab?: boolean }
) => ({
  "@type": "Service",
  "@id": `${SITE_URL}${pfad}#service`,
  name,
  serviceType,
  description: beschreibung,
  url: `${SITE_URL}${pfad}`,
  provider: { "@id": ORGANISATION_ID },
  areaServed: { "@type": "AdministrativeArea", name: "Kreis Lippe" },
  ...(preis && {
    offers: {
      "@type": "Offer",
      priceCurrency: "EUR",
      ...(preis.ab
        ? { priceSpecification: { "@type": "PriceSpecification", minPrice: preis.wert, priceCurrency: "EUR" } }
        : { price: preis.wert }),
    },
  }),
});

const angebotsKatalog = () => ({
  "@type": "OfferCatalog",
  "@id": `${SITE_URL}/preise#angebote`,
  name: "Preise KFZ-Zulassung Bad Salzuflen",
  itemListElement: [
    ...PACKAGES.map((pkg) => ({
      "@type": "Offer",
      name: pkg.subtitle ? `${pkg.title} – ${pkg.subtitle.split("–")[0].trim()}` : pkg.title,
      ...(pkg.priceValue ? { price: pkg.priceValue } : {}),
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

const alsFaqs = (pfad: string): FaqItem[] => (faqSchema as Record<string, FaqItem[]>)[pfad] ?? [];

/** Seitenspezifische Einträge (zusätzlich zu Firma, Website, Seite und Brotkrumen) */
export const seitenSchema = (pfad: string): Record<string, unknown>[] => {
  switch (pfad) {
    case "/":
      return [faqPage(pfad, generalFaqs)];
    case "/faq":
      return [
        faqPage(pfad, [
          ...generalFaqs,
          ...vorgangChecklists.map((vorgang) => ({
            question: `Welche Unterlagen brauche ich für: ${vorgang.title}?`,
            answer: vorgang.items.join(", "),
          })),
        ]),
      ];
    case "/preise":
      return [angebotsKatalog(), faqPage(pfad, PREIS_FAQS)];
    case "/fahrzeugankauf":
      return [
        dienstleistung(pfad, "Fahrzeugankauf Bad Salzuflen", "Fahrzeugankauf", "Ankauf von Fahrzeugen im Kreis Lippe – mit oder ohne Zulassung, auch nicht fahrbereit. Beim Ankauf ist die Abmeldung gratis."),
        faqPage(pfad, alsFaqs(pfad)),
      ];
    case "/auto-abmelden":
      return [
        dienstleistung(pfad, "Auto abmelden in Bad Salzuflen", "KFZ-Abmeldung", "Blitzabmeldung ohne Termin, digital direkt vor Ort – inklusive Verwaltungsgebühren.", { wert: "40" }),
        faqPage(pfad, alsFaqs(pfad)),
      ];
    case "/auto-ummelden":
      return [
        dienstleistung(pfad, "Auto ummelden in Bad Salzuflen", "KFZ-Ummeldung", "Halterwechsel, Adressänderung und Umkennzeichnung ohne Termin – digital in ca. 20 Minuten oder bis zum nächsten Werktag.", { wert: "129", ab: true }),
        faqPage(pfad, alsFaqs(pfad)),
      ];
    case "/wunschkennzeichen":
      return [
        dienstleistung(pfad, "Wunschkennzeichen im Kreis Lippe (LIP, DT, LE)", "Wunschkennzeichen", "Reservierung des Wunschkennzeichens mit LIP, DT oder LE zusammen mit der Zulassung, ohne Behördentermin.", { wert: "13" }),
        faqPage(pfad, alsFaqs(pfad)),
      ];
    case "/gewerbekunden":
      return [
        dienstleistung(pfad, "Zulassungsservice für Autohändler und Firmen", "KFZ-Zulassung für Gewerbekunden", "Zulassungen, Umschreibungen und Abmeldungen für Autohändler, Werkstätten und Firmen im Kreis Lippe – ohne Termin, per Rechnung."),
        faqPage(pfad, alsFaqs(pfad)),
      ];
    default: {
      const eintraege = alsFaqs(pfad);
      return eintraege.length > 0 ? [faqPage(pfad, eintraege)] : [];
    }
  }
};
