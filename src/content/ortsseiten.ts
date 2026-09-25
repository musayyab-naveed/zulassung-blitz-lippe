import type { FaqItem } from "./faqs";
import type { LeistungsSeite } from "./leistungsseiten";

/**
 * Ortsseiten für den Kreis Lippe (z. B. /zulassungsdienst-detmold).
 *
 * Jede Seite hat eine eigene Einleitung und echte, ortsbezogene Angaben: Fahrzeit
 * (Detmold, Lemgo, Lage, Leopoldshöhe, Oerlinghausen und Horn-Bad Meinberg laut Google Maps,
 * abgefragt am 23.09.2026; übrige per Routenplaner am 24.09.2026, aufgerundet), nächste
 * Zulassungsstelle und passendes Kennzeichen.
 *
 * Wichtig: Der Ortsname steht nur dort, wo ein Mensch ihn auch nennen würde – in der
 * Überschrift, einmal in der Einleitung und in einer Frage. Sonst wirkt der Text wie
 * von einer Maschine geschrieben (und genau so bewertet ihn auch Google).
 *
 * Nur Orte im Kreis Lippe – Herford und Bielefeld bedienen wir nicht.
 */

interface Ort {
  slug: string;
  name: string;
  fahrzeit: string;
  /** Entfernung mit dem Auto, nur wo per Routenplaner geprüft */
  strecke?: string;
  /** Eigene Einleitung – nennt den Ort genau einmal */
  einleitung: string;
  /** Zur Zulassungsstelle – ohne den Ortsnamen zu wiederholen */
  zulassungsstelle: string;
  kennzeichen: string;
  /** Weiter Weg: Versand der Unterlagen besonders erwähnen */
  weit?: boolean;
}

const KENNZEICHEN_FREI =
  "Sie können frei zwischen LIP, DT und LE wählen – alle drei gelten im ganzen Kreis Lippe.";

const NUR_MIT_TERMIN = "nur mit vorher online gebuchtem Termin.";

const ORTE: Ort[] = [
  {
    slug: "detmold",
    name: "Detmold",
    fahrzeit: "ca. 25 Minuten",
    strecke: "rund 22 km über die B239",
    einleitung:
      "Bei der Zulassungsstelle in Detmold geht nichts ohne online gebuchten Termin. Bei uns schon: Über die B239 sind Sie in ca. 25 Minuten in Bad Salzuflen, und die Sofort-Zulassung dauert rund 20 Minuten. Oder Sie schicken uns die Unterlagen einfach zu.",
    zulassungsstelle:
      "Die Zulassungsstelle vor Ort (Felix-Fechenbach-Straße 5) arbeitet – wie alle drei im Kreis – nur mit vorher online gebuchtem Termin. Und Termine gibt es nur 14 Tage im Voraus.",
    kennzeichen:
      "Seit April 2026 gibt es wieder DT, das frühere Detmolder Kennzeichen. Genauso möglich sind LIP und LE – alle drei gelten im ganzen Kreis Lippe.",
  },
  {
    slug: "lemgo",
    name: "Lemgo",
    fahrzeit: "ca. 20 Minuten",
    strecke: "rund 16 km",
    einleitung:
      "Ob neues LE-Kennzeichen, Umschreibung nach dem Autokauf oder Abmeldung: Aus Lemgo sind Sie in ca. 20 Minuten bei uns in Bad Salzuflen – ganz ohne Termin beim Amt. Oder Sie schicken uns die Unterlagen einfach zu.",
    zulassungsstelle: `Vor Ort gibt es keine eigene Zulassungsstelle. Die nächsten sind in Bad Salzuflen, Detmold und Barntrup – alle ${NUR_MIT_TERMIN}`,
    kennzeichen:
      "Seit April 2026 gibt es wieder LE, das frühere Lemgoer Kennzeichen. Genauso möglich sind LIP und DT – alle drei gelten im ganzen Kreis Lippe.",
  },
  {
    slug: "lage",
    name: "Lage",
    fahrzeit: "ca. 15 Minuten",
    strecke: "rund 12,5 km über die B239",
    einleitung:
      "Aus Lage sind Sie über die B239 in ca. 15 Minuten bei uns in Bad Salzuflen. Kommen Sie einfach mit Ihren Unterlagen vorbei – einen Termin brauchen Sie nicht.",
    zulassungsstelle: `Vor Ort gibt es keine eigene Zulassungsstelle. Die nächsten sind in Detmold und Bad Salzuflen – beide ${NUR_MIT_TERMIN}`,
    kennzeichen: KENNZEICHEN_FREI,
  },
  {
    slug: "leopoldshoehe",
    name: "Leopoldshöhe",
    fahrzeit: "ca. 15 Minuten",
    strecke: "rund 10 km",
    einleitung:
      "Leopoldshöhe ist unser direkter Nachbar: In ca. 15 Minuten sind Sie bei uns in Bad Salzuflen. Zulassung, Umschreibung oder Abmeldung erledigen wir ohne Termin – Mo–Fr 9–18 Uhr und Sa 15–18 Uhr.",
    zulassungsstelle: `Vor Ort gibt es keine eigene Zulassungsstelle. Die nächste ist in Bad Salzuflen – ${NUR_MIT_TERMIN}`,
    kennzeichen: KENNZEICHEN_FREI,
  },
  {
    slug: "oerlinghausen",
    name: "Oerlinghausen",
    fahrzeit: "ca. 20 Minuten",
    einleitung:
      "Aus Oerlinghausen sind Sie in ca. 20 Minuten bei uns in Bad Salzuflen. Einen Termin brauchen Sie nicht – kommen Sie einfach mit Ihren Unterlagen vorbei oder schicken Sie sie uns zu.",
    zulassungsstelle: `Vor Ort gibt es keine eigene Zulassungsstelle. Die nächsten sind in Bad Salzuflen und Detmold – beide ${NUR_MIT_TERMIN}`,
    kennzeichen: KENNZEICHEN_FREI,
  },
  {
    slug: "horn-bad-meinberg",
    name: "Horn-Bad Meinberg",
    fahrzeit: "ca. 35 Minuten",
    strecke: "rund 36 km",
    einleitung:
      "Sie wohnen in Horn-Bad Meinberg? Dann müssen Sie für die Zulassung nicht einmal herkommen: Schicken Sie uns die Unterlagen, wir erledigen alles und schicken es zurück. Oder Sie kommen einfach ohne Termin bei uns in Bad Salzuflen vorbei.",
    zulassungsstelle: `Vor Ort gibt es keine eigene Zulassungsstelle. Die nächste ist in Detmold – ${NUR_MIT_TERMIN}`,
    kennzeichen: KENNZEICHEN_FREI,
  },
  {
    slug: "blomberg",
    name: "Blomberg",
    fahrzeit: "ca. 40 Minuten",
    strecke: "rund 37 km",
    einleitung:
      "Aus Blomberg müssen Sie für die Zulassung nicht extra losfahren: Schicken Sie uns die Unterlagen, und Sie bekommen alles fertig zurück. Lieber persönlich? Dann kommen Sie ohne Termin bei uns in Bad Salzuflen vorbei.",
    zulassungsstelle: `Vor Ort gibt es keine eigene Zulassungsstelle. Die nächsten sind in Barntrup und Detmold – beide ${NUR_MIT_TERMIN}`,
    kennzeichen: KENNZEICHEN_FREI,
    weit: true,
  },
  {
    slug: "barntrup",
    name: "Barntrup",
    fahrzeit: "ca. 40 Minuten",
    strecke: "rund 38 km",
    einleitung:
      "In Barntrup gibt es zwar eine Zulassungsstelle, aber nur mit online gebuchtem Termin. Bei uns kommen Sie ohne Termin dran – direkt in Bad Salzuflen, oder Sie schicken uns die Unterlagen einfach zu.",
    zulassungsstelle:
      "Die Zulassungsstelle vor Ort arbeitet – wie alle drei im Kreis – nur mit vorher online gebuchtem Termin. Und Termine gibt es nur 14 Tage im Voraus.",
    kennzeichen: KENNZEICHEN_FREI,
    weit: true,
  },
  {
    slug: "kalletal",
    name: "Kalletal",
    fahrzeit: "ca. 25 Minuten",
    strecke: "rund 21 km",
    einleitung:
      "Aus dem Kalletal sind Sie in ca. 25 Minuten bei uns in Bad Salzuflen. Kommen Sie einfach ohne Termin vorbei – die Sofort-Zulassung dauert rund 20 Minuten.",
    zulassungsstelle: `Vor Ort gibt es keine eigene Zulassungsstelle. Die nächste ist in Bad Salzuflen – ${NUR_MIT_TERMIN}`,
    kennzeichen: KENNZEICHEN_FREI,
  },
  {
    slug: "extertal",
    name: "Extertal",
    fahrzeit: "ca. 40 Minuten",
    strecke: "rund 37 km",
    einleitung:
      "Aus dem Extertal müssen Sie nicht selbst kommen: Mit dem PREMIUM-Paket schicken Sie uns die Unterlagen und bekommen alles per Express zurück. Oder Sie kommen ohne Termin bei uns in Bad Salzuflen vorbei.",
    zulassungsstelle: `Vor Ort gibt es keine eigene Zulassungsstelle. Die nächste ist in Barntrup – ${NUR_MIT_TERMIN}`,
    kennzeichen: KENNZEICHEN_FREI,
    weit: true,
  },
  {
    slug: "doerentrup",
    name: "Dörentrup",
    fahrzeit: "ca. 30 Minuten",
    strecke: "rund 25 km",
    einleitung:
      "Aus Dörentrup sind Sie in ca. 30 Minuten bei uns in Bad Salzuflen – ohne Termin, Mo–Fr 9–18 Uhr und Sa 15–18 Uhr. Zulassung, Umschreibung oder Abmeldung erledigen wir direkt vor Ort.",
    zulassungsstelle: `Vor Ort gibt es keine eigene Zulassungsstelle. Die nächste ist in Barntrup – ${NUR_MIT_TERMIN}`,
    kennzeichen: KENNZEICHEN_FREI,
  },
  {
    slug: "augustdorf",
    name: "Augustdorf",
    fahrzeit: "ca. 35 Minuten",
    einleitung:
      "Sie wohnen in Augustdorf? Kommen Sie ohne Termin bei uns in Bad Salzuflen vorbei – oder schicken Sie uns die Unterlagen einfach zu. Einen Termin beim Amt brauchen Sie in beiden Fällen nicht.",
    zulassungsstelle: `Vor Ort gibt es keine eigene Zulassungsstelle. Die nächste ist in Detmold – ${NUR_MIT_TERMIN}`,
    kennzeichen: KENNZEICHEN_FREI,
  },
  {
    slug: "schlangen",
    name: "Schlangen",
    fahrzeit: "ca. 45 Minuten",
    einleitung:
      "Aus Schlangen geht die Zulassung auch ganz ohne Fahrt: Schicken Sie uns die Unterlagen, wir erledigen alles und schicken es zurück. Oder Sie kommen ohne Termin bei uns in Bad Salzuflen vorbei.",
    zulassungsstelle: `Vor Ort gibt es keine eigene Zulassungsstelle. Die nächste ist in Detmold – ${NUR_MIT_TERMIN}`,
    kennzeichen: KENNZEICHEN_FREI,
    weit: true,
  },
  {
    slug: "luegde",
    name: "Lügde",
    fahrzeit: "ca. 55 Minuten",
    strecke: "rund 52 km",
    einleitung:
      "Lügde liegt ganz im Südosten des Kreises – deshalb machen wir es Ihnen einfach: Unterlagen schicken, wir erledigen die Zulassung und senden alles per Express zurück. Persönlich vorbeikommen geht natürlich auch, ohne Termin.",
    zulassungsstelle: `Vor Ort gibt es keine eigene Zulassungsstelle. Die nächste ist in Barntrup – ${NUR_MIT_TERMIN}`,
    kennzeichen: KENNZEICHEN_FREI,
    weit: true,
  },
  {
    slug: "schieder-schwalenberg",
    name: "Schieder-Schwalenberg",
    fahrzeit: "ca. 50 Minuten",
    strecke: "rund 50 km",
    einleitung:
      "Aus Schieder-Schwalenberg können Sie uns die Unterlagen einfach schicken – wir erledigen die Zulassung, und Sie bekommen alles fertig zurück. Oder Sie kommen ohne Termin bei uns in Bad Salzuflen vorbei.",
    zulassungsstelle: `Vor Ort gibt es keine eigene Zulassungsstelle. Die nächsten sind in Barntrup und Detmold – beide ${NUR_MIT_TERMIN}`,
    kennzeichen: KENNZEICHEN_FREI,
    weit: true,
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

/**
 * Bis 30 Minuten ist die Fahrzeit ein Vorteil und steht oben. Bei weiteren Wegen wirkt sie
 * abschreckend – dort stellen wir den Versand nach vorn; die Fahrzeit steht nur in den Fragen.
 */
const istNah = (ort: Ort) => Number(ort.fahrzeit.match(/\d+/)?.[0] ?? 0) <= 30;

const VORBEIKOMMEN = {
  titel: "Vorbeikommen",
  text: "Werler Straße 68 in Bad Salzuflen – ohne Termin. Die Sofort-Zulassung dauert rund 20 Minuten.",
};
const SCHICKEN = {
  titel: "Unterlagen schicken",
  text: "Mit dem PREMIUM-Paket schicken Sie uns alles zu – der Express-Rückversand ist inklusive.",
};
const ONLINE = {
  titel: "Oder online",
  text: "Online-Zulassungen erledigen wir rund um die Uhr. Schreiben Sie uns einfach per WhatsApp.",
};

const faqsFuer = (ort: Ort): FaqItem[] => [
  {
    question: `Machen Sie auch Zulassungen für ${ort.name}?`,
    answer:
      "Ja. Wir erledigen Zulassungen, Umschreibungen und Abmeldungen für den ganzen Kreis Lippe – ohne Termin beim Straßenverkehrsamt.",
  },
  {
    question: "Wie weit ist es bis zu Ihnen?",
    answer: `Mit dem Auto sind es ${ort.fahrzeit}${ort.strecke ? ` (${ort.strecke})` : ""} bis zur Werler Straße 68 in Bad Salzuflen. Geöffnet ist Montag bis Freitag von 9 bis 18 Uhr und samstags von 15 bis 18 Uhr.`,
  },
  {
    question: "Muss ich für die Zulassung extra nach Bad Salzuflen fahren?",
    answer:
      "Nein. Sie können uns die Unterlagen auch zuschicken – beim PREMIUM-Paket ist der Express-Rückversand inklusive. Online-Zulassungen erledigen wir rund um die Uhr. Schreiben Sie uns einfach per WhatsApp.",
  },
  {
    question: "Kann ich ein Wunschkennzeichen bekommen?",
    answer:
      "Ja, mit LIP, DT oder LE – ganz wie Sie möchten. Dafür kommen 13 € dazu, das ist die Gebühr des Straßenverkehrsamts. Die Reservierung erledigen wir für Sie.",
  },
];

const seiteFuer = (ort: Ort): LeistungsSeite => ({
  path: ortsPfad(ort.slug),
  kicker: "An-, Um- und Abmeldung · Kreis Lippe",
  h1: `Zulassungsdienst für ${ort.name} – ohne Termin beim Straßenverkehrsamt`,
  intro: ort.einleitung,
  chips: [
    "✓ Ohne Termin",
    istNah(ort) ? `✓ ${ort.fahrzeit} Fahrt` : "✓ Auch per Post möglich",
    "✓ ab 99 € inkl. Gebühren",
    "✓ Mo–Fr 9–18 · Sa 15–18 Uhr",
  ],
  preis: {
    betrag: "ab 99 €",
    text: "Ummeldung 99 €, Zulassung 129 € – Verwaltungsgebühren inklusive. Sofortabmeldung 40 €, Wunschkennzeichen +13 € (Gebühr des Straßenverkehrsamts).",
  },
  checklisten: ["umschreibung"],
  schritteTitel: "So einfach geht's",
  // Bei weitem Weg steht der Versand zuerst
  schritte: istNah(ort)
    ? [VORBEIKOMMEN, { ...SCHICKEN, titel: "Oder Unterlagen schicken" }, ONLINE]
    : [SCHICKEN, { ...VORBEIKOMMEN, titel: "Oder vorbeikommen" }, ONLINE],
  abschnitte: [
    { titel: "Und die Zulassungsstelle?", text: ort.zulassungsstelle },
    { titel: "LIP, DT oder LE – Sie haben die Wahl", text: ort.kennzeichen },
    ...(ort.weit
      ? [
          {
            titel: "Weiter Weg? Unterlagen einfach schicken",
            text: "Sie müssen nicht extra herfahren: Mit dem PREMIUM-Paket schicken Sie uns die Unterlagen, wir erledigen die Zulassung und senden alles per Express zurück. Die Vollmacht zum Ausdrucken finden Sie unter Formulare.",
            link: { href: "/dokumente", text: "Vollmacht und SEPA-Mandat zum Ausdrucken" },
          },
        ]
      : []),
    {
      titel: "Was wir für Sie erledigen",
      punkte: [
        "Neuzulassung, Umschreibung nach dem Autokauf und Wiederzulassung",
        "Abmeldung – kostenlos, wenn wir Ihr Auto ankaufen",
        "Ankauf Ihres alten Autos – unverbindliches Angebot, Abholung und Abmeldung inklusive",
        "Adressänderung nach dem Umzug",
        "Wunschkennzeichen mit LIP, DT oder LE",
        "Kurzzeit- und Ausfuhrkennzeichen auf Anfrage",
      ],
    },
  ],
  faqTitel: "Häufige Fragen",
  faqs: faqsFuer(ort),
  cta: {
    titel: "Jetzt Zulassung anfragen",
    text: "Kurz per WhatsApp Bescheid geben oder einfach vorbeikommen: Werler Straße 68, 32105 Bad Salzuflen.",
    href: "/angebot",
    button: "JETZT ANFRAGEN",
  },
  // Die anderen Orte stehen im Fußbereich jeder Seite – hier nicht noch einmal aufzählen
  verwandt: [
    { href: "/preise", text: "Alle Preise im Überblick" },
    { href: "/wunschkennzeichen", text: "Wunschkennzeichen LIP, DT oder LE" },
    { href: "/kfz-versicherung", text: "eVB-Nummer beantragen" },
  ],
});

export const ORTSSEITEN: (LeistungsSeite & { ort: string; seoTitel: string; seoBeschreibung: string })[] =
  ORTE.map((ort) => ({
    ...seiteFuer(ort),
    ort: ort.name,
    // Google zeigt etwa 60 Zeichen – bei langen Ortsnamen die kürzere Form
    seoTitel:
      `Zulassungsdienst ${ort.name} – Zulassung ohne Termin`.length > 60
        ? `Zulassungsdienst ${ort.name} – ohne Termin`
        : `Zulassungsdienst ${ort.name} – Zulassung ohne Termin`,
    seoBeschreibung: istNah(ort)
      ? `KFZ-Zulassung für ${ort.name} ohne Termin beim Amt: ${ort.fahrzeit} bis Bad Salzuflen, ab 99 € inkl. Gebühren. Mo–Fr 9–18, Sa 15–18 Uhr.`
      : `KFZ-Zulassung für ${ort.name} ohne Termin beim Amt – bei uns in Bad Salzuflen oder bequem per Post. Ab 99 € inkl. Gebühren. Mo–Fr 9–18, Sa 15–18 Uhr.`,
  }));

export const findeOrtsseite = (pfad: string) => ORTSSEITEN.find((seite) => seite.path === pfad);
