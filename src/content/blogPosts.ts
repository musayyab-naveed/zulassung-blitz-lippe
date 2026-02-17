export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: string;
  keywords: string[];
  sections: { heading: string; paragraphs: string[] }[];
  faqs: BlogFaq[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "kfz-zulassung-bad-salzuflen-checkliste",
    title: "KFZ-Zulassung in Bad Salzuflen: Die komplette Checkliste",
    excerpt:
      "Welche Unterlagen brauchen Sie wirklich? Diese Checkliste hilft bei Neu-, Um- und Wiederzulassung ohne Stress.",
    category: "Zulassung",
    publishedAt: "2026-02-17",
    readTime: "6 Min.",
    keywords: ["kfz zulassung bad salzuflen", "zulassungsdienst lippe", "unterlagen zulassung"],
    sections: [
      {
        heading: "Für wen ist diese Checkliste?",
        paragraphs: [
          "Diese Checkliste ist für Privatkunden gedacht, die in Bad Salzuflen oder im Kreis Lippe ein Fahrzeug anmelden, ummelden oder wieder zulassen möchten.",
          "Der häufigste Fehler ist nicht das fehlende Wissen, sondern eine fehlende Unterlage. Wenn ein Dokument fehlt, verschiebt sich der Termin meist direkt um mehrere Tage.",
        ],
      },
      {
        heading: "Unterlagen für die Standard-Zulassung",
        paragraphs: [
          "Typischerweise brauchen Sie einen gültigen Personalausweis oder Reisepass mit Meldebescheinigung, die eVB-Nummer, die Zulassungsbescheinigung Teil I und Teil II sowie den Nachweis über die letzte Hauptuntersuchung.",
          "Bei Halterwechsel oder Umschreibung kommen je nach Fall zusätzliche Vollmachten oder Kaufunterlagen dazu. Ein sauber vorbereiteter Vorgang spart in der Praxis oft 30 bis 60 Minuten Rückfragen.",
        ],
      },
      {
        heading: "Wunschkennzeichen und Zeitplanung",
        paragraphs: [
          "Wenn Sie ein Wunschkennzeichen möchten, reservieren Sie es frühzeitig. So vermeiden Sie Alternativen in letzter Minute.",
          "Planen Sie die Unterlagen mindestens 24 Stunden vor dem Wunschtermin fertig ein. Das passt ideal zu unserem Ablauf unter /angebot.",
        ],
      },
      {
        heading: "Typische Rückfragen vermeiden",
        paragraphs: [
          "Kontrollieren Sie Namen, Anschrift und Fahrgestellnummer vor der Abgabe. Schon ein Zahlendreher führt sonst zu Nacharbeit.",
          "Wenn Sie zusätzlich ein Altfahrzeug verkaufen möchten, wählen Sie im Buchungsprozess direkt die Ankauf-Option. So können Zulassung und Verkauf in einem Ablauf kombiniert werden.",
        ],
      },
    ],
    faqs: [
      {
        question: "Wie schnell ist die Zulassung möglich?",
        answer:
          "In vielen Fällen ist die Bearbeitung innerhalb von 24 Stunden möglich, wenn alle Unterlagen vollständig sind.",
      },
      {
        question: "Kann ich Unterlagen auch per Versand senden?",
        answer:
          "Ja. Besonders im Premium-Ablauf ist Versand eine feste Option, falls Hol- und Bringservice nicht infrage kommt.",
      },
      {
        question: "Wo buche ich direkt meinen Termin?",
        answer: "Über die Seite /angebot mit Paketwahl und anschließendem Kalender.",
      },
    ],
  },
  {
    slug: "fahrzeug-abmeldung-unterlagen-kosten",
    title: "Fahrzeug abmelden: Unterlagen, Kosten und häufige Fehler",
    excerpt:
      "Was Sie für eine schnelle Abmeldung brauchen, welche Kosten entstehen und wie Sie unnötige Wege vermeiden.",
    category: "Abmeldung",
    publishedAt: "2026-02-17",
    readTime: "5 Min.",
    keywords: ["fahrzeug abmelden bad salzuflen", "abmeldung unterlagen", "zulassungsdienst abmeldung"],
    sections: [
      {
        heading: "Was Sie zur Abmeldung mitbringen sollten",
        paragraphs: [
          "Für die Abmeldung benötigen Sie in der Regel Kennzeichen und Zulassungsbescheinigung Teil I. Je nach Einzelfall kann zusätzlich eine Vollmacht erforderlich sein.",
          "Wenn die Unterlagen vollständig vorliegen, ist die Abmeldung meist der schnellste Vorgang im gesamten Zulassungsbereich.",
        ],
      },
      {
        heading: "Welche Kosten fallen an?",
        paragraphs: [
          "Neben amtlichen Gebühren rechnen viele Kunden mit Servicekosten für die beauftragte Abwicklung. Auf unserer Seite sehen Sie dafür das Abmeldungspaket transparent.",
          "Die klare Paketstruktur hilft, spontane Zusatzkosten zu vermeiden. Für viele Kunden ist genau diese Planbarkeit der größte Vorteil.",
        ],
      },
      {
        heading: "Abmeldung und Fahrzeugankauf kombinieren",
        paragraphs: [
          "Wenn das Fahrzeug nach der Abmeldung verkauft werden soll, lohnt sich die direkte Kombination mit Ankaufanfrage.",
          "Im Buchungsprozess unter /angebot können Sie die Ankaufoption sofort markieren und Basisdaten zum Fahrzeug angeben.",
        ],
      },
      {
        heading: "Die 3 häufigsten Fehler",
        paragraphs: [
          "Erstens: fehlende oder unvollständige Fahrzeugdokumente. Zweitens: Kennzeichen nicht verfügbar. Drittens: falsche Kontaktdaten für Rückfragen.",
          "Wer diese drei Punkte vorab prüft, spart in der Praxis die meisten Verzögerungen.",
        ],
      },
    ],
    faqs: [
      {
        question: "Kann ich ein bereits verkauftes Fahrzeug noch abmelden?",
        answer:
          "Das ist abhängig vom Status und den vorhandenen Unterlagen. Im Zweifel prüfen wir den Fall vorab telefonisch.",
      },
      {
        question: "Wie schnell bekomme ich eine Bestätigung?",
        answer:
          "Nach erfolgreicher Bearbeitung erhalten Sie die Bestätigung direkt im vereinbarten Ablauf.",
      },
      {
        question: "Wo starte ich die Abmeldung online?",
        answer: "Direkt über /angebot und dort das Paket Abmeldung wählen.",
      },
    ],
  },
  {
    slug: "altes-auto-verkaufen-vor-neuzulassung",
    title: "Altes Auto verkaufen vor der Neuzulassung: So holen Sie mehr raus",
    excerpt:
      "Zulassung und Fahrzeugverkauf smart kombinieren: Welche Daten wichtig sind und wie Sie den Verkauf besser vorbereiten.",
    category: "Fahrzeugankauf",
    publishedAt: "2026-02-17",
    readTime: "7 Min.",
    keywords: ["auto verkaufen bad salzuflen", "fahrzeugankauf lippe", "altes auto verkaufen"],
    sections: [
      {
        heading: "Warum die Kombination sinnvoll ist",
        paragraphs: [
          "Viele Kunden melden ein neues Fahrzeug an und möchten das alte direkt abgeben. Wenn beides getrennt läuft, kostet das meist extra Zeit und Abstimmung.",
          "Mit einem kombinierten Ablauf können Sie Dokumente, Termin und Ankauf in einem Prozess bündeln.",
        ],
      },
      {
        heading: "Diese Angaben verbessern die Ersteinschätzung",
        paragraphs: [
          "Für eine sinnvolle Vorprüfung helfen immer Marke, Modell, Erstzulassung und Kilometerstand. Genau diese vier Punkte sind bereits im Buchungsprozess integriert.",
          "Optional helfen Fotos, letzte Werkstattrechnungen und der Hinweis auf bekannte Mängel. Transparenz beschleunigt die Entscheidung.",
        ],
      },
      {
        heading: "Premium, Versand und Hol- und Bringservice",
        paragraphs: [
          "Beim Premium-Paket können Kunden je nach Adresse Hol- und Bringservice nutzen oder auf Versand wechseln.",
          "Damit bleibt der Ablauf flexibel, ohne dass der Kunde das Paket wechseln muss. Das reduziert Abbrüche im Prozess deutlich.",
        ],
      },
      {
        heading: "Praktischer Ablauf in zwei Schritten",
        paragraphs: [
          "Schritt 1: Paket im Bereich /angebot wählen und anklicken, ob ein Fahrzeug verkauft werden soll.",
          "Schritt 2: Termin im Kalender buchen und Unterlagen vollständig vorbereiten. So entsteht ein sauberer, planbarer Ablauf für beide Seiten.",
        ],
      },
    ],
    faqs: [
      {
        question: "Muss ich mein Fahrzeug vor dem Termin professionell aufbereiten?",
        answer:
          "Nicht zwingend. Eine saubere Grundpräsentation und vollständige Unterlagen reichen für eine belastbare Ersteinschätzung.",
      },
      {
        question: "Kann ich auch ohne Ankauf einfach nur zulassen?",
        answer:
          "Ja. Die Ankaufoption ist optional und kann im Prozess bewusst abgewählt werden.",
      },
      {
        question: "Wo finde ich die Ankaufseite?",
        answer: "Unter /fahrzeugankauf mit direktem Einstieg in den Buchungsprozess.",
      },
    ],
  },
];

export const findPostBySlug = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);
