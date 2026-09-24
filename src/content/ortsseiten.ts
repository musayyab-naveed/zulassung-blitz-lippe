import type { FaqItem } from "./faqs";
import type { LeistungsSeite } from "./leistungsseiten";

/**
 * Ortsseiten für den Kreis Lippe (z. B. /zulassungsdienst-detmold).
 *
 * Jede Seite enthält echte, ortsbezogene Angaben: Fahrzeit laut Google Maps
 * (abgefragt am 23.09.2026), nächste Zulassungsstelle und passendes Kennzeichen.
 * Nur Orte im Kreis Lippe – Herford und Bielefeld bedienen wir nicht.
 */

interface Ort {
  slug: string;
  name: string;
  /** Adjektiv für Einwohner, z. B. "Detmolder" */
  einwohner: string;
  fahrzeit: string;
  /** Nur wenn per Google Maps geprüft */
  strecke?: string;
  zulassungsstelle: string;
  kennzeichen: string;
}

const ORTE: Ort[] = [
  {
    slug: "detmold",
    name: "Detmold",
    einwohner: "Detmolder",
    fahrzeit: "ca. 25 Minuten",
    strecke: "rund 22 km über die B239",
    zulassungsstelle:
      "In Detmold gibt es eine Zulassungsstelle des Kreises Lippe (Felix-Fechenbach-Straße 5). Wie alle drei Zulassungsstellen im Kreis arbeitet sie nur mit vorher online gebuchtem Termin – und Termine gibt es nur 14 Tage im Voraus.",
    kennzeichen:
      "Seit April 2026 gibt es wieder das Kennzeichen DT. Sie können aber genauso LIP oder LE wählen – alle drei gelten im ganzen Kreis Lippe.",
  },
  {
    slug: "lemgo",
    name: "Lemgo",
    einwohner: "Lemgoer",
    fahrzeit: "ca. 20 Minuten",
    zulassungsstelle:
      "In Lemgo selbst gibt es keine Zulassungsstelle. Die nächsten sind in Bad Salzuflen, Detmold und Barntrup – alle nur mit vorher online gebuchtem Termin.",
    kennzeichen:
      "Seit April 2026 gibt es wieder das Kennzeichen LE für Lemgo. Genauso möglich sind LIP und DT – alle drei gelten im ganzen Kreis Lippe.",
  },
  {
    slug: "lage",
    name: "Lage",
    einwohner: "Lagenser",
    fahrzeit: "ca. 15 Minuten",
    strecke: "rund 12,5 km über die B239",
    zulassungsstelle:
      "Lage hat keine eigene Zulassungsstelle. Die nächsten sind in Detmold und Bad Salzuflen – beide nur mit vorher online gebuchtem Termin.",
    kennzeichen:
      "Sie können frei zwischen LIP, DT und LE wählen – alle drei gelten im ganzen Kreis Lippe, auch in Lage.",
  },
  {
    slug: "leopoldshoehe",
    name: "Leopoldshöhe",
    einwohner: "Leopoldshöher",
    fahrzeit: "ca. 15 Minuten",
    strecke: "direkt aus der Nachbargemeinde",
    zulassungsstelle:
      "Leopoldshöhe hat keine eigene Zulassungsstelle. Die nächste ist in Bad Salzuflen – nur mit vorher online gebuchtem Termin.",
    kennzeichen:
      "Sie können frei zwischen LIP, DT und LE wählen – alle drei gelten im ganzen Kreis Lippe, auch in Leopoldshöhe.",
  },
  {
    slug: "oerlinghausen",
    name: "Oerlinghausen",
    einwohner: "Oerlinghauser",
    fahrzeit: "ca. 20 Minuten",
    zulassungsstelle:
      "Oerlinghausen hat keine eigene Zulassungsstelle. Die nächsten sind in Bad Salzuflen und Detmold – beide nur mit vorher online gebuchtem Termin.",
    kennzeichen:
      "Sie können frei zwischen LIP, DT und LE wählen – alle drei gelten im ganzen Kreis Lippe, auch in Oerlinghausen.",
  },
  {
    slug: "horn-bad-meinberg",
    name: "Horn-Bad Meinberg",
    einwohner: "Horn-Bad Meinberger",
    fahrzeit: "ca. 35 Minuten",
    zulassungsstelle:
      "Horn-Bad Meinberg hat keine eigene Zulassungsstelle. Die nächste ist in Detmold – nur mit vorher online gebuchtem Termin.",
    kennzeichen:
      "Sie können frei zwischen LIP, DT und LE wählen – alle drei gelten im ganzen Kreis Lippe, auch in Horn-Bad Meinberg.",
  },
];

/** Alle 16 Städte und Gemeinden im Kreis Lippe – für die Übersicht auf der Startseite */
export const ALLE_ORTE_LIPPE = [
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

export const ortsPfad = (slug: string) => `/zulassungsdienst-${slug}`;

const faqsFuer = (ort: Ort): FaqItem[] => [
  {
    question: `Kann ich mein Auto aus ${ort.name} bei Ihnen zulassen?`,
    answer: `Ja. ${ort.name} gehört zum Kreis Lippe, und wir erledigen Zulassungen, Umschreibungen und Abmeldungen für den ganzen Kreis – ohne Termin beim Straßenverkehrsamt.`,
  },
  {
    question: `Wie lange fahre ich von ${ort.name} zu Ihnen?`,
    answer: `Von ${ort.name} sind es ${ort.fahrzeit} mit dem Auto${ort.strecke ? ` (${ort.strecke})` : ""} bis zur Werler Straße 68 in Bad Salzuflen. Wir haben Montag bis Freitag von 9 bis 18 Uhr und samstags von 15 bis 18 Uhr geöffnet.`,
  },
  {
    question: "Muss ich für die Zulassung extra nach Bad Salzuflen fahren?",
    answer:
      "Nein. Sie können uns die Unterlagen auch zuschicken – beim PREMIUM-Paket ist der Express-Rückversand inklusive. Online-Zulassungen erledigen wir rund um die Uhr. Schreiben Sie uns einfach per WhatsApp.",
  },
  {
    question: `Welches Kennzeichen bekomme ich als ${ort.einwohner}?`,
    answer: ort.kennzeichen,
  },
];

const seiteFuer = (ort: Ort): LeistungsSeite => ({
  path: ortsPfad(ort.slug),
  kicker: `Zulassungsdienst für ${ort.name}`,
  h1: `KFZ-Zulassung für ${ort.name} – ohne Termin beim Straßenverkehrsamt`,
  intro: `Sie wohnen in ${ort.name} und brauchen eine Zulassung, Umschreibung oder Abmeldung? Wir erledigen das für den ganzen Kreis Lippe – ohne Termin, Mo–Fr 9–18 und Sa 15–18 Uhr. Von ${ort.name} sind Sie in ${ort.fahrzeit} bei uns in Bad Salzuflen, oder Sie schicken uns die Unterlagen.`,
  chips: ["✓ Ohne Termin", `✓ ${ort.fahrzeit} von ${ort.name}`, "✓ ab 129 € inkl. Gebühren", "✓ Mo–Fr 9–18 · Sa 15–18 Uhr"],
  preis: {
    betrag: "ab 129 €",
    text: "Zulassung inklusive Verwaltungsgebühren. Sofortabmeldung 40 €, Wunschkennzeichen +13 €.",
  },
  checklisten: ["umschreibung"],
  schritteTitel: `So läuft es für Kunden aus ${ort.name}`,
  schritte: [
    {
      titel: "Vorbeikommen",
      text: `In ${ort.fahrzeit} bei uns in der Werler Straße 68 – ohne Termin. Mit der Sofort-Zulassung sind Sie in ca. 20 Minuten fertig.`,
    },
    {
      titel: "Oder Unterlagen schicken",
      text: "Mit dem PREMIUM-Paket schicken Sie uns alles zu – der Express-Rückversand ist inklusive.",
    },
    {
      titel: "Oder online",
      text: "Online-Zulassungen erledigen wir rund um die Uhr. Schreiben Sie uns einfach per WhatsApp.",
    },
  ],
  abschnitte: [
    { titel: `Zulassungsstelle für ${ort.name}`, text: ort.zulassungsstelle },
    { titel: `Kennzeichen für ${ort.name}: LIP, DT oder LE`, text: ort.kennzeichen },
    {
      titel: "Was wir für Sie erledigen",
      punkte: [
        "Neuzulassung, Umschreibung nach dem Autokauf und Wiederzulassung",
        "Abmeldung – beim Verkauf Ihres Autos an uns kostenlos",
        "Adressänderung nach dem Umzug",
        "Wunschkennzeichen mit LIP, DT oder LE",
        "Kurzzeit- und Ausfuhrkennzeichen auf Anfrage",
      ],
    },
  ],
  faqTitel: `Häufige Fragen aus ${ort.name}`,
  faqs: faqsFuer(ort),
  cta: {
    titel: `Zulassung für ${ort.name} anfragen`,
    text: "Kurz per WhatsApp Bescheid geben oder einfach vorbeikommen: Werler Straße 68, 32105 Bad Salzuflen.",
    href: "/angebot",
    button: "JETZT ANFRAGEN",
  },
  verwandt: [
    { href: "/preise", text: "Alle Preise im Überblick" },
    { href: "/wunschkennzeichen", text: "Wunschkennzeichen LIP, DT oder LE" },
    { href: "/kfz-versicherung", text: "eVB-Nummer beantragen" },
    // Nachbarorte verlinken, damit Google alle Ortsseiten findet
    ...ORTE.filter((anderer) => anderer.slug !== ort.slug).map((anderer) => ({
      href: ortsPfad(anderer.slug),
      text: `Zulassungsdienst ${anderer.name}`,
    })),
  ],
});

export const ORTSSEITEN: (LeistungsSeite & { ort: string; seoTitel: string; seoBeschreibung: string })[] =
  ORTE.map((ort) => ({
    ...seiteFuer(ort),
    ort: ort.name,
    seoTitel: `Zulassungsdienst ${ort.name} – Zulassung ohne Termin`,
    seoBeschreibung: `KFZ-Zulassung für ${ort.name} ohne Termin beim Amt: ${ort.fahrzeit} bis Bad Salzuflen, ab 129 € inkl. Gebühren. Mo–Fr 9–18, Sa 15–18 Uhr.`,
  }));

export const findeOrtsseite = (pfad: string) => ORTSSEITEN.find((seite) => seite.path === pfad);
