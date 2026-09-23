// Zentrale SEO-Daten je Seite.
// Wird von den React-Seiten UND vom Prerender-Schritt (scripts/prerender.mjs)
// genutzt, damit Suchmaschinen schon im ausgelieferten HTML den richtigen
// Titel, die richtige Beschreibung und das passende Canonical vorfinden.

import { RATGEBER, RATGEBER_PFAD, ratgeberPfad } from "./ratgeber";

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
  latitude: 52.0830763,
  longitude: 8.7297422,
  priceRange: "€€",
  ratingValue: "5.0",
  reviewCount: 54,
  mapsUrl: "https://maps.google.com/?cid=14697603500579775973",
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
    title: "Zulassungsdienst Bad Salzuflen – ohne Termin, Mo–Sa geöffnet",
    description:
      `KFZ-Zulassung im Kreis Lippe ohne Behördentermin: digital in ca. 20 Minuten, ab 129 € inkl. Gebühren. Mo–Sa geöffnet, online rund um die Uhr. 5,0 ★ (${BUSINESS.reviewCount}).`,
  },
  {
    path: "/angebot",
    title: "Zulassung per WhatsApp anfragen – ohne Termin",
    description:
      "Auto zulassen, abmelden oder verkaufen im Kreis Lippe: zwei, drei Fragen antippen, fertige WhatsApp-Nachricht senden – ohne Termin, ohne Formular.",
  },
  {
    path: "/preise",
    title: "Preise KFZ-Zulassung Bad Salzuflen – ab 129 €",
    description:
      "Sofort-Zulassung ab 129 €, mit Kennzeichen 129 €, Hol- und Bringservice 159 €, Blitzabmeldung 40 €. Verwaltungsgebühren inklusive, keine versteckten Kosten.",
  },
  {
    path: "/zulassungsstelle-bad-salzuflen",
    title: "Zulassungsstelle Bad Salzuflen – Termine & Öffnungszeiten",
    description:
      "Zulassungsstelle Bad Salzuflen: Adresse, Öffnungszeiten, Terminpflicht und die Regeln des Kreises Lippe – plus der Weg ohne Termin, Montag bis Samstag.",
  },
  {
    path: "/evb-nummer",
    title: "eVB-Nummer für die KFZ-Zulassung – einfach erklärt",
    description:
      "Was ist die eVB-Nummer, wann brauchen Sie eine, wie lange gilt sie? Antworten für Neuzulassung, Umschreibung und Wiederzulassung – plus die häufigsten Fehler.",
  },
  {
    path: "/auto-abmelden",
    title: "Auto abmelden Bad Salzuflen – ohne Termin, 40 €",
    description:
      "Auto abmelden in Bad Salzuflen ohne Termin: digital in wenigen Minuten, 40 € inkl. Gebühren. Mo–Fr 9–18, Sa 15–18 Uhr. Beim Fahrzeugverkauf gratis.",
  },
  {
    path: "/auto-ummelden",
    title: "Auto ummelden Bad Salzuflen – ohne Termin, ab 129 €",
    description:
      "Auto ummelden in Bad Salzuflen: Halterwechsel, Umzug oder neues Kennzeichen – ohne Termin beim Amt, digital in ca. 20 Minuten. Ab 129 € inkl. Gebühren.",
  },
  {
    path: "/wunschkennzeichen",
    title: "Wunschkennzeichen Kreis Lippe – LIP, DT oder LE",
    description:
      "Wunschkennzeichen im Kreis Lippe: LIP, DT oder LE reservieren und direkt zulassen – ohne Termin in Bad Salzuflen. Regeln und Umkennzeichnung erklärt.",
  },
  {
    path: "/gewerbekunden",
    title: "Zulassungsservice für Autohändler & Firmen – Lippe",
    description:
      "Zulassungsdienst für Autohändler, Werkstätten und Firmen im Kreis Lippe: mehrere Fahrzeuge auf einmal, ohne Termin, Zahlung per Rechnung, Hol- und Bringservice.",
  },
  {
    path: "/kfz-versicherung",
    title: "eVB-Nummer beantragen & Kfz-Versicherung vergleichen",
    description:
      "eVB-Nummer beantragen: Kfz-Versicherung vergleichen, abschließen, eVB meist sofort per E-Mail erhalten – und danach ohne Termin in Bad Salzuflen zulassen.",
  },
  {
    path: "/faq",
    title: "Welche Unterlagen brauche ich? Checklisten zur Zulassung",
    description:
      "Checklisten für Neuzulassung, Umschreibung, Wiederzulassung und Abmeldung im Kreis Lippe: eVB, Fahrzeugschein, Fahrzeugbrief, SEPA-Mandat – klar aufgelistet.",
  },
  {
    path: "/fahrzeugankauf",
    title: "Auto verkaufen Bad Salzuflen – Ankauf im Kreis Lippe",
    description:
      "Fahrzeug verkaufen in Bad Salzuflen: kostenlose Ersteinschätzung, faire Prüfung vor Ort, Abholung möglich. Beim Ankauf ist die Abmeldung gratis.",
  },
  {
    path: "/dokumente",
    title: "Vollmacht & SEPA-Mandat als PDF zum Ausdrucken",
    description:
      "Vollmacht für Zulassung und Abmeldung sowie SEPA-Lastschriftmandat als PDF herunterladen – für Kunden im Kreis Lippe, die uns ihre Unterlagen zusenden.",
  },
  {
    path: "/ueber-uns",
    title: "Über uns – Zulassungsdienst in Bad Salzuflen",
    description:
      "KFZ-Sofortzulassung in Bad Salzuflen: persönlicher Service für den Kreis Lippe, über 1000 zufriedene Kunden, 5,0 Sterne bei Google, Montag bis Samstag geöffnet.",
  },
  {
    path: "/impressum",
    title: "Impressum | KFZ-Sofortzulassung",
    description:
      "Impressum von KFZ-Sofortzulassung in Bad Salzuflen mit allen gesetzlichen Pflichtangaben und Kontaktinformationen für den Kreis Lippe.",
  },
  {
    path: "/datenschutz",
    title: "Datenschutz | KFZ-Sofortzulassung",
    description:
      "Datenschutzerklärung von KFZ-Sofortzulassung in Bad Salzuflen: welche Daten wir verarbeiten, wozu, und welche Rechte Sie dabei haben.",
  },
];

// Ratgeber: Übersicht und je Artikel eine eigene Seite
ROUTE_SEO.push(
  {
    path: RATGEBER_PFAD,
    title: "Ratgeber KFZ-Zulassung Kreis Lippe – einfach erklärt",
    description:
      "Antworten rund um Zulassung, Abmeldung und Kennzeichen im Kreis Lippe: kein Termin beim Amt, Online-Zulassung, Papiere verloren, Saisonkennzeichen und mehr.",
  },
  ...RATGEBER.map((artikel) => ({
    path: ratgeberPfad(artikel.slug),
    title: artikel.seoTitel,
    description: artikel.beschreibung,
  }))
);

export const getRouteSeo = (path: string): RouteSeo | undefined =>
  ROUTE_SEO.find((route) => route.path === path);

