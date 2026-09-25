/**
 * Ratgeber-Artikel.
 *
 * Jeder Artikel beantwortet genau eine Frage, die Kunden wirklich stellen
 * (aus Google "Weitere Fragen" und aus WhatsApp). Ganz oben steht die kurze
 * Antwort in zwei, drei Sätzen – die lesen Google und KI-Systeme zuerst.
 *
 * Titel und Beschreibung landen über seoRoutes.ts im Prerender, Datum und
 * Überschrift über strukturDaten.ts als Artikel-Auszeichnung.
 *
 * Neue Artikel einfach unten anhängen – Seite, Übersicht, Sitemap und
 * Google-Auszeichnung entstehen automatisch.
 */

export interface RatgeberAbschnitt {
  titel: string;
  absaetze?: string[];
  punkte?: string[];
  link?: { href: string; text: string };
}

export interface RatgeberArtikel {
  slug: string;
  /** Titel für Google (höchstens 60 Zeichen) */
  seoTitel: string;
  /** Beschreibung für Google (130–160 Zeichen) */
  beschreibung: string;
  h1: string;
  /** Die direkte Antwort in zwei, drei Sätzen */
  kurzantwort: string;
  veroeffentlicht: string;
  aktualisiert: string;
  lesezeitMinuten: number;
  abschnitte: RatgeberAbschnitt[];
  cta: { text: string; href: string; button: string };
  verwandt: { href: string; text: string }[];
}

export const RATGEBER_PFAD = "/ratgeber";

export const ratgeberPfad = (slug: string) => `${RATGEBER_PFAD}/${slug}`;

export const RATGEBER: RatgeberArtikel[] = [
  {
    slug: "dt-le-kennzeichen-lippe",
    seoTitel: "DT und LE sind zurück: Kennzeichen im Kreis Lippe wechseln",
    beschreibung:
      "Seit April 2026 gibt es im Kreis Lippe wieder DT und LE. Wer sie bekommen kann, was beim Wechsel von LIP nötig ist und wie es ohne Termin beim Amt geht.",
    h1: "DT und LE sind zurück: So wechseln Sie Ihr Kennzeichen im Kreis Lippe",
    kurzantwort:
      "Seit dem 25. April 2026 gibt es im Kreis Lippe wieder die Kennzeichen DT (Detmold) und LE (Lemgo) – zusätzlich zu LIP. Alle drei kann jeder im Kreis wählen. Wer von LIP auf DT oder LE wechseln will, braucht beim Straßenverkehrsamt einen Termin; bei uns läuft es als Wunschkennzeichen ohne Termin.",
    veroeffentlicht: "2026-09-23",
    aktualisiert: "2026-09-23",
    lesezeitMinuten: 3,
    abschnitte: [
      {
        titel: "Was sich geändert hat",
        absaetze: [
          "Lange gab es im Kreis Lippe nur das Kürzel LIP. Seit Samstag, dem 25. April 2026, sind auch DT und LE wieder erhältlich. Zum Start hat der Kreis einen Sonderöffnungstag gemacht – an diesem Tag wurden 425 Fahrzeuge umgekennzeichnet, davon 250 auf DT und 175 auf LE.",
          "Seit dem 28. April 2026 lassen sich DT- und LE-Kennzeichen auch online beim Kreis reservieren.",
        ],
      },
      {
        titel: "Wer DT oder LE bekommen kann",
        absaetze: [
          "Alle drei Kürzel gelten für den ganzen Kreis Lippe. Sie müssen also nicht in Detmold oder Lemgo wohnen: Auch wer in Bad Salzuflen, Lage oder Blomberg lebt, darf DT oder LE wählen.",
        ],
      },
      {
        titel: "Die Regeln für Ihre Kombination",
        punkte: [
          "Höchstens 8 Zeichen insgesamt.",
          "Nach DT und LE passen 2 Buchstaben und 4 Ziffern, nach LIP 2 Buchstaben und 3 Ziffern.",
          "Kurze Kennzeichen wie DT-A 1 vergibt der Kreis nur persönlich am Schalter, nicht online.",
          "Online-Reservierungen beim Kreis verfallen nach 90 Tagen.",
        ],
      },
      {
        titel: "Von LIP auf DT oder LE wechseln",
        absaetze: [
          "Sie haben schon ein LIP-Kennzeichen und möchten wechseln? Das nennt sich Umkennzeichnung. Sie bekommen neue Schilder und neue Eintragungen in den Fahrzeugpapieren. Beim Straßenverkehrsamt geht das nur mit gebuchtem Termin.",
        ],
        punkte: [
          "Personalausweis oder Reisepass",
          "Fahrzeugschein und Fahrzeugbrief (Zulassungsbescheinigung Teil I und II)",
          "Beide bisherigen Kennzeichen",
          "Ihre Wunschkombination",
        ],
      },
      {
        titel: "Bei uns: als Wunschkennzeichen, ohne Termin",
        absaetze: [
          "Bei uns läuft der Wechsel auf DT oder LE einfach als Wunschkennzeichen: Sie nennen uns Ihre Kombination, wir prüfen und reservieren sie und erledigen den Rest – ohne Termin, Mo–Fr 9–18 Uhr und Sa 15–18 Uhr.",
        ],
        link: { href: "/wunschkennzeichen", text: "Wunschkennzeichen LIP, DT oder LE" },
      },
    ],
    cta: {
      text: "DT oder LE gewünscht? Schreiben Sie uns Ihre Wunschkombination per WhatsApp.",
      href: "/angebot?vorgang=zulassen&wunsch=1",
      button: "WUNSCHKENNZEICHEN ANFRAGEN",
    },
    verwandt: [
      { href: "/wunschkennzeichen", text: "Wunschkennzeichen LIP, DT oder LE" },
      { href: "/ratgeber/kein-termin-zulassungsstelle-lippe", text: "Kein Termin bei der Zulassungsstelle?" },
    ],
  },
  {
    slug: "kein-termin-zulassungsstelle-lippe",
    seoTitel: "Kein Termin bei der Zulassungsstelle Lippe? 3 Auswege",
    beschreibung:
      "Termine beim Straßenverkehrsamt Kreis Lippe sind oft weg. Warum das so ist, wann neue Termine frei werden und wie Sie trotzdem schnell zulassen.",
    h1: "Kein Termin bei der Zulassungsstelle Lippe – was jetzt?",
    kurzantwort:
      "Ohne gebuchten Termin werden Sie bei den Zulassungsstellen des Kreises Lippe grundsätzlich nicht bedient. Neue Termine schaltet der Kreis jeden Morgen frei, aber immer nur für die nächsten 14 Tage. Wer schneller sein muss, lässt online über i-Kfz zu oder geht zu einem Zulassungsdienst, der ohne Termin arbeitet.",
    veroeffentlicht: "2026-09-23",
    aktualisiert: "2026-09-23",
    lesezeitMinuten: 3,
    abschnitte: [
      {
        titel: "Warum es so schwer ist, einen Termin zu bekommen",
        absaetze: [
          "Der Kreis Lippe hat drei Zulassungsstellen: in Bad Salzuflen, Barntrup und Detmold. Bei allen gilt: Eine persönliche Vorsprache ist nur mit einem vorher online gebuchten Termin möglich.",
          "Termine gibt es nur vormittags an allen Werktagen und nachmittags nur dienstags, mittwochs und donnerstags. Samstags ist geschlossen. Gebucht werden kann immer nur 14 Tage im Voraus – sind diese Tage voll, bleibt nur, am nächsten Morgen wieder nachzuschauen.",
          "Seit der Kreis im April 2026 die Kennzeichen DT und LE wieder eingeführt hat, wollen zusätzlich viele Lipperinnen und Lipper ihr Kennzeichen wechseln. Auch dafür braucht man beim Amt einen Termin.",
        ],
      },
      {
        titel: "Ausweg 1: Früh am Morgen nachschauen",
        absaetze: [
          "Die neuen Termine werden jeden Morgen freigeschaltet. Wer gleich morgens ins Buchungsportal schaut, hat die besten Chancen. Schauen Sie dabei nicht nur in Bad Salzuflen, sondern auch in Barntrup und Detmold.",
        ],
      },
      {
        titel: "Ausweg 2: Online zulassen mit i-Kfz",
        absaetze: [
          "Viele Vorgänge – Zulassen, Umschreiben, Abmelden – gehen auch online über i-Kfz, rund um die Uhr. Dafür brauchen Sie einen Personalausweis mit Online-Funktion und Fahrzeugpapiere mit Sicherheitscodes. Wie das genau geht und woran es oft scheitert, steht in unserem Artikel zur Online-Zulassung.",
        ],
        link: { href: "/ratgeber/online-zulassung-ikfz", text: "Online-Zulassung (i-Kfz) einfach erklärt" },
      },
      {
        titel: "Ausweg 3: Zulassungsdienst ohne Termin",
        absaetze: [
          "Ein Zulassungsdienst übernimmt den Behördengang für Sie. Bei uns in der Werler Straße 68 in Bad Salzuflen kommen Sie einfach vorbei – Montag bis Freitag von 9 bis 18 Uhr, Samstag von 15 bis 18 Uhr. Mit der Sofort-Zulassung sind Sie in ca. 20 Minuten digital zugelassen.",
          "Das kostet mehr als die reinen Gebühren beim Amt. Dafür sparen Sie sich Terminsuche, Wartenummer und den halben Urlaubstag.",
        ],
        link: { href: "/preise", text: "Preise ansehen" },
      },
      {
        titel: "Sie haben doch einen Termin? Darauf sollten Sie achten",
        punkte: [
          "Die Bestätigung per E-Mail enthält Ihre Wartenummer – ohne sie geht es nicht weiter.",
          "Es wird nur der Vorgang bearbeitet, den Sie gebucht haben – kein zweites Fahrzeug nebenbei.",
          "Seien Sie pünktlich: Mit dem Aufruf wird der Termin gelöscht.",
          "Bezahlt wird in der Regel nur mit Karte, nicht bar.",
          "Alle Unterlagen vollständig mitbringen – welche das sind, steht in unseren Checklisten.",
        ],
        link: { href: "/faq", text: "Checklisten: welche Unterlagen Sie brauchen" },
      },
    ],
    cta: {
      text: "Keinen Termin bekommen? Kommen Sie einfach vorbei oder schreiben Sie uns kurz per WhatsApp.",
      href: "/angebot",
      button: "OHNE TERMIN ANFRAGEN",
    },
    verwandt: [
      { href: "/zulassungsstelle-bad-salzuflen", text: "Zulassungsstelle Bad Salzuflen: Zeiten & Regeln" },
      { href: "/evb-nummer", text: "eVB-Nummer einfach erklärt" },
    ],
  },
  {
    slug: "online-zulassung-ikfz",
    seoTitel: "Online-Zulassung (i-Kfz): So geht's – und wann nicht",
    beschreibung:
      "Auto online zulassen, umschreiben oder abmelden: Was Sie für i-Kfz brauchen, wie es abläuft und woran es am häufigsten scheitert – einfach erklärt.",
    h1: "Online-Zulassung mit i-Kfz: So geht's – und woran es oft scheitert",
    kurzantwort:
      "Mit i-Kfz können Sie Ihr Auto über das Internet zulassen, umschreiben oder abmelden – ohne Termin beim Amt und rund um die Uhr. Sie brauchen dafür einen Personalausweis mit Online-Funktion samt PIN, Fahrzeugpapiere mit Sicherheitscodes und eine eVB-Nummer. Klappt es nicht, übernehmen wir den Vorgang für Sie.",
    veroeffentlicht: "2026-09-23",
    aktualisiert: "2026-09-23",
    lesezeitMinuten: 4,
    abschnitte: [
      {
        titel: "Was ist i-Kfz?",
        absaetze: [
          "i-Kfz steht für „internetbasierte Fahrzeugzulassung“. Über das Portal Ihrer Zulassungsstelle – im Kreis Lippe also über das Serviceportal des Kreises – erledigen Sie Zulassung, Umschreibung, Wiederzulassung oder Abmeldung selbst am Computer oder Smartphone.",
        ],
      },
      {
        titel: "Das brauchen Sie",
        punkte: [
          "Personalausweis mit freigeschalteter Online-Ausweisfunktion und Ihre sechsstellige PIN",
          "Ein Smartphone mit NFC (oder ein Kartenlesegerät) und die kostenlose AusweisApp",
          "Fahrzeugschein und Fahrzeugbrief mit Sicherheitscodes – bei Fahrzeugen, die ab 2015 zugelassen wurden, sind die vorhanden",
          "Bei angemeldeten Fahrzeugen: die Plaketten auf den Kennzeichen mit ihrem Code",
          "Die eVB-Nummer Ihrer Versicherung und Ihre IBAN für die KFZ-Steuer",
          "Eine Möglichkeit, die Gebühren online zu bezahlen",
        ],
        link: { href: "/evb-nummer", text: "Was ist die eVB-Nummer?" },
      },
      {
        titel: "So läuft die Online-Zulassung ab",
        punkte: [
          "Vorgang im Portal auswählen, zum Beispiel „Zulassung“ oder „Außerbetriebsetzung“.",
          "Mit dem Personalausweis online ausweisen.",
          "Fahrzeugdaten eingeben und die Sicherheitscodes freilegen und eintragen.",
          "eVB-Nummer und IBAN angeben, Gebühren bezahlen.",
          "Den Bescheid per E-Mail erhalten. Papiere und Plaketten kommen per Post.",
        ],
        absaetze: [
          "Mit dem Bescheid zum Ausdrucken dürfen Sie in der Regel schon fahren, bis die Unterlagen per Post da sind. Die Kennzeichenschilder brauchen Sie trotzdem – die besorgen Sie selbst.",
        ],
      },
      {
        titel: "Woran es am häufigsten scheitert",
        punkte: [
          "Die Online-Funktion des Ausweises ist nicht aktiv oder die PIN ist vergessen.",
          "Das Smartphone hat kein NFC, und es gibt kein Lesegerät.",
          "Ältere Papiere haben noch keine Sicherheitscodes.",
          "Ein Code wurde beschädigt oder schon früher freigerubbelt.",
          "Das Fahrzeug kommt aus dem Ausland oder hat Sonderfälle wie Umbauten.",
        ],
      },
      {
        titel: "Wenn es nicht klappt: Wir machen es für Sie",
        absaetze: [
          "Bei uns brauchen Sie weder Ausweis-PIN noch Lesegerät. Kommen Sie mit Ihren Unterlagen vorbei, und wir erledigen die Zulassung digital in ca. 20 Minuten. Online-Zulassungen übernehmen wir rund um die Uhr – schreiben Sie uns einfach per WhatsApp.",
        ],
      },
    ],
    cta: {
      text: "Keine Lust auf PIN, App und Codes? Wir erledigen das für Sie.",
      href: "/angebot?vorgang=zulassen",
      button: "ZULASSUNG ANFRAGEN",
    },
    verwandt: [
      { href: "/ratgeber/kein-termin-zulassungsstelle-lippe", text: "Kein Termin bei der Zulassungsstelle?" },
      { href: "/faq", text: "Checklisten: welche Unterlagen Sie brauchen" },
    ],
  },
  {
    slug: "fahrzeugpapiere-verloren",
    seoTitel: "Fahrzeugschein oder Fahrzeugbrief verloren – was tun?",
    beschreibung:
      "Zulassungsbescheinigung Teil I oder Teil II verloren oder gestohlen? Was Sie jetzt tun müssen, welche Unterlagen nötig sind und warum es etwas dauern kann.",
    h1: "Fahrzeugschein oder Fahrzeugbrief verloren – was jetzt?",
    kurzantwort:
      "Ist der Fahrzeugschein weg, stellt die Zulassungsstelle nach einer Verlusterklärung einen neuen aus. Beim Fahrzeugbrief dauert es länger, weil das Amt zuerst prüft, ob das Fahrzeug gesucht wird und wo der alte Brief ist. Wurden die Papiere gestohlen, gehört immer eine Anzeige bei der Polizei dazu.",
    veroeffentlicht: "2026-09-23",
    aktualisiert: "2026-09-23",
    lesezeitMinuten: 3,
    abschnitte: [
      {
        titel: "Erst einmal: Welches Papier fehlt?",
        punkte: [
          "Fahrzeugschein = Zulassungsbescheinigung Teil I. Den haben Sie beim Fahren dabei.",
          "Fahrzeugbrief = Zulassungsbescheinigung Teil II. Der gehört sicher nach Hause – er beweist, wem das Auto gehört.",
        ],
      },
      {
        titel: "Vorher prüfen: Ist der Brief wirklich weg?",
        absaetze: [
          "Wurde das Auto finanziert oder geleast, liegt der Fahrzeugbrief oft noch bei der Bank oder beim Leasinggeber. Ein kurzer Anruf dort spart viel Aufwand. Auch Autohäuser behalten den Brief manchmal, bis alles bezahlt ist.",
        ],
      },
      {
        titel: "Fahrzeugschein verloren",
        absaetze: [
          "Sie beantragen bei der Zulassungsstelle einen neuen Fahrzeugschein. Dafür erklären Sie, dass der alte verloren ist – meist mit einer Versicherung an Eides statt. Das geht in der Regel nur persönlich, weil Sie die Erklärung selbst abgeben müssen.",
        ],
        punkte: [
          "Personalausweis oder Reisepass",
          "Fahrzeugbrief (Zulassungsbescheinigung Teil II)",
          "Nachweis über die gültige Hauptuntersuchung, falls vorhanden",
          "Bei Diebstahl: die Anzeige der Polizei",
        ],
      },
      {
        titel: "Fahrzeugbrief verloren",
        absaetze: [
          "Beim Fahrzeugbrief ist es aufwendiger: Die Zulassungsstelle fragt beim Kraftfahrt-Bundesamt nach und erklärt den alten Brief für ungültig, bevor ein neuer ausgestellt wird. Das kann einige Tage dauern. Auch hier geben Sie eine Versicherung an Eides statt ab.",
        ],
        punkte: [
          "Personalausweis oder Reisepass",
          "Fahrzeugschein (Zulassungsbescheinigung Teil I)",
          "Bei Diebstahl: die Anzeige der Polizei",
          "Bei finanzierten Fahrzeugen gegebenenfalls eine Bestätigung der Bank",
        ],
      },
      {
        titel: "Beides verloren?",
        absaetze: [
          "Dann dauert es am längsten, weil das Amt die Eigentumsverhältnisse besonders gründlich prüft. Schreiben Sie uns kurz, welche Papiere fehlen – wir sagen Ihnen, was in Ihrem Fall zu tun ist und ob wir den Vorgang übernehmen können.",
        ],
      },
    ],
    cta: {
      text: "Unsicher, was Sie in Ihrem Fall brauchen? Fragen Sie uns einfach.",
      href: "/angebot?vorgang=frage",
      button: "FRAGE PER WHATSAPP",
    },
    verwandt: [
      { href: "/faq", text: "Checklisten: welche Unterlagen Sie brauchen" },
      { href: "/zulassungsstelle-bad-salzuflen", text: "Zulassungsstelle Bad Salzuflen: Zeiten & Regeln" },
    ],
  },
  {
    slug: "kurzzeitkennzeichen-ausfuhrkennzeichen",
    seoTitel: "Kurzzeitkennzeichen oder Ausfuhrkennzeichen? Der Unterschied",
    beschreibung:
      "Überführung, Probefahrt oder Export: Wann Sie ein Kurzzeitkennzeichen brauchen, wann ein Ausfuhrkennzeichen und was Sie mitbringen müssen.",
    h1: "Kurzzeitkennzeichen oder Ausfuhrkennzeichen – was brauche ich?",
    kurzantwort:
      "Das Kurzzeitkennzeichen gilt 5 Tage und ist für Probe- und Überführungsfahrten gedacht. Das Ausfuhrkennzeichen brauchen Sie, wenn das Fahrzeug dauerhaft ins Ausland geht. Für beide brauchen Sie eine eigene eVB-Nummer – eine normale eVB passt nicht.",
    veroeffentlicht: "2026-09-23",
    aktualisiert: "2026-09-23",
    lesezeitMinuten: 3,
    abschnitte: [
      {
        titel: "Das Kurzzeitkennzeichen",
        punkte: [
          "Gelbes Feld mit Ablaufdatum, gültig für 5 Tage.",
          "Nur für Probefahrten, Überführungsfahrten und Fahrten zur Prüfung – nicht für den Alltag.",
          "Das Fahrzeug braucht eine gültige Hauptuntersuchung. Ohne sind nur Fahrten zur Prüfung erlaubt.",
          "Im Ausland wird es oft nicht anerkannt.",
        ],
      },
      {
        titel: "Das Ausfuhrkennzeichen",
        punkte: [
          "Rotes Feld mit Ablaufdatum – für Fahrzeuge, die ins Ausland gebracht werden.",
          "Gültig für den Zeitraum, den Sie festlegen – Versicherung und KFZ-Steuer werden für diesen Zeitraum im Voraus bezahlt.",
          "Das Fahrzeug braucht eine Hauptuntersuchung, die mindestens so lange gilt wie das Kennzeichen.",
        ],
      },
      {
        titel: "Und rote Kennzeichen?",
        absaetze: [
          "Rote Kennzeichen („rote Nummern“) sind etwas anderes: Sie bekommen nur Autohändler, Werkstätten und Hersteller für ihren Betrieb sowie Oldtimer-Sammler. Für Privatleute sind sie nicht gedacht.",
        ],
      },
      {
        titel: "Welches passt zu mir?",
        punkte: [
          "Gebrauchtwagen gekauft und nach Hause fahren? → Kurzzeitkennzeichen",
          "Auto zur Prüfung oder in die Werkstatt fahren, ohne es anzumelden? → Kurzzeitkennzeichen",
          "Auto an jemanden im Ausland verkauft und es fährt dorthin? → Ausfuhrkennzeichen",
          "Sie ziehen mit dem Auto ins Ausland? → Ausfuhrkennzeichen",
        ],
      },
      {
        titel: "Bei uns: ohne Termin, Preis auf Anfrage",
        absaetze: [
          "Beim Straßenverkehrsamt brauchen Sie auch dafür einen Termin. Bei uns nicht: Schreiben Sie uns per WhatsApp, welches Kennzeichen Sie brauchen, und wir nennen Ihnen den Preis und die nötigen Unterlagen.",
        ],
      },
    ],
    cta: {
      text: "Kurzzeit- oder Ausfuhrkennzeichen gebraucht? Zwei Fragen antippen, dann geht es zu WhatsApp.",
      href: "/angebot?vorgang=sonder",
      button: "KENNZEICHEN ANFRAGEN",
    },
    verwandt: [
      { href: "/evb-nummer", text: "eVB-Nummer einfach erklärt" },
      { href: "/gewerbekunden", text: "Für Firmen & Partner" },
    ],
  },
  {
    slug: "saisonkennzeichen",
    seoTitel: "Saisonkennzeichen: Für wen es sich lohnt und wie es geht",
    beschreibung:
      "Motorrad, Cabrio oder Wohnmobil nur im Sommer? Wie ein Saisonkennzeichen funktioniert, was Sie sparen und was außerhalb der Saison gilt.",
    h1: "Saisonkennzeichen: Für wen es sich lohnt und wie es geht",
    kurzantwort:
      "Mit einem Saisonkennzeichen ist Ihr Fahrzeug nur in den Monaten zugelassen, die Sie festlegen – mindestens 2 und höchstens 11 Monate im Jahr. KFZ-Steuer und Versicherung zahlen Sie nur für diese Zeit. Außerhalb der Saison darf das Fahrzeug nicht auf öffentlichen Straßen fahren oder parken.",
    veroeffentlicht: "2026-09-23",
    aktualisiert: "2026-09-23",
    lesezeitMinuten: 3,
    abschnitte: [
      {
        titel: "So sieht ein Saisonkennzeichen aus",
        absaetze: [
          "Am rechten Rand stehen zwei Zahlen übereinander, zum Beispiel 04 und 10. Das bedeutet: zugelassen von April bis Oktober. Den Zeitraum legen Sie bei der Zulassung fest – er gilt dann jedes Jahr wieder, ohne dass Sie etwas tun müssen.",
        ],
      },
      {
        titel: "Für wen es sich lohnt",
        punkte: [
          "Motorräder, die im Winter in der Garage stehen",
          "Cabrios und Oldtimer für die schöne Jahreszeit",
          "Wohnmobile und Wohnwagen",
          "Winterfahrzeuge wie Streufahrzeuge oder ein Zweitwagen nur für den Winter",
        ],
      },
      {
        titel: "Was Sie sparen – und was Sie beachten müssen",
        absaetze: [
          "KFZ-Steuer und Versicherungsbeitrag fallen nur für die Saisonmonate an. Viele Versicherer schützen das Fahrzeug außerhalb der Saison trotzdem weiter, zum Beispiel gegen Diebstahl – fragen Sie am besten bei Ihrer Versicherung nach.",
          "Wichtig: Außerhalb der Saison darf das Fahrzeug nicht auf öffentlichen Straßen stehen. Es braucht also einen privaten Stellplatz oder eine Garage.",
        ],
      },
      {
        titel: "So bekommen Sie ein Saisonkennzeichen",
        punkte: [
          "Bei der Versicherung eine eVB-Nummer für den gewünschten Saisonzeitraum anfordern.",
          "Bei der Zulassung sagen, von welchem bis zu welchem Monat das Fahrzeug zugelassen sein soll.",
          "Neue Kennzeichen mit den Monatszahlen besorgen – bei unseren Paketen BASIS und PREMIUM sind die Schilder inklusive.",
        ],
        link: { href: "/preise", text: "Pakete und Preise ansehen" },
      },
    ],
    cta: {
      text: "Saisonkennzeichen gewünscht? Sagen Sie uns einfach die Monate.",
      href: "/angebot?vorgang=zulassen",
      button: "ZULASSUNG ANFRAGEN",
    },
    verwandt: [
      { href: "/wunschkennzeichen", text: "Wunschkennzeichen LIP, DT oder LE" },
      { href: "/evb-nummer", text: "eVB-Nummer einfach erklärt" },
    ],
  },
  {
    slug: "was-macht-ein-zulassungsdienst",
    seoTitel: "Was macht ein Zulassungsdienst – und was kostet er?",
    beschreibung:
      "Zulassungsdienst oder selbst zur Zulassungsstelle? Was ein Zulassungsdienst übernimmt, wie der Preis zustande kommt und worauf Sie beim Vergleich achten.",
    h1: "Was macht ein Zulassungsdienst – und was kostet er?",
    kurzantwort:
      "Ein Zulassungsdienst erledigt den Gang zur Zulassungsstelle für Sie: Sie geben Ihre Unterlagen ab oder kommen kurz vorbei, der Dienst meldet Ihr Fahrzeug an, um oder ab. Der Preis besteht aus den Gebühren des Amts und dem Honorar des Dienstes. Bei uns sind beide zusammen im Endpreis enthalten – ab 99 € für die Ummeldung, 129 € für die Zulassung.",
    veroeffentlicht: "2026-09-23",
    aktualisiert: "2026-09-23",
    lesezeitMinuten: 4,
    abschnitte: [
      {
        titel: "Was ein Zulassungsdienst übernimmt",
        punkte: [
          "Zulassung von Neu- und Gebrauchtwagen",
          "Umschreibung nach dem Kauf, Adressänderung nach dem Umzug",
          "Abmeldung",
          "Wunschkennzeichen und Kennzeichenschilder",
          "Oft auch Kurzzeit- und Ausfuhrkennzeichen",
        ],
        absaetze: [
          "Ein Zulassungsdienst ist ein privates Unternehmen, nicht die Behörde. Er arbeitet mit Ihrer Vollmacht und Ihren Unterlagen – die Zulassung selbst stellt weiterhin das Straßenverkehrsamt aus.",
        ],
      },
      {
        titel: "Woraus sich der Preis zusammensetzt",
        punkte: [
          "Die Verwaltungsgebühren des Straßenverkehrsamts",
          "Das Honorar des Zulassungsdienstes",
          "Gegebenenfalls Kennzeichenschilder, Wunschkennzeichen und Feinstaubplakette",
        ],
        absaetze: [
          "Viele Anbieter nennen nur ihr eigenes Honorar – die Gebühren und Schilder kommen später dazu. Fragen Sie deshalb immer nach dem Endpreis. Unsere Preise sind Endpreise inklusive Verwaltungsgebühren.",
        ],
        link: { href: "/preise", text: "Unsere Preise im Überblick" },
      },
      {
        titel: "Wann sich ein Zulassungsdienst lohnt",
        punkte: [
          "Sie arbeiten tagsüber und haben keine Zeit für einen Behördentermin.",
          "Es eilt, und beim Amt gibt es in den nächsten zwei Wochen keinen Termin.",
          "Sie möchten samstags erledigen, was unter der Woche nicht geht.",
          "Sie wollen nicht selbst herausfinden, welche Unterlagen nötig sind.",
        ],
      },
      {
        titel: "Wann Sie besser selbst gehen",
        absaetze: [
          "Ganz ehrlich: Wenn Sie zeitlich flexibel sind, vormittags unter der Woche Zeit haben und schnell einen Termin bekommen, ist der Weg zum Straßenverkehrsamt günstiger. Dann zahlen Sie nur die Gebühren.",
        ],
        link: { href: "/zulassungsstelle-bad-salzuflen", text: "Zulassungsstelle Bad Salzuflen: Zeiten & Regeln" },
      },
      {
        titel: "Woran Sie einen guten Zulassungsdienst erkennen",
        punkte: [
          "Klare Endpreise inklusive Gebühren",
          "Feste Adresse und Öffnungszeiten, an denen Sie jemanden erreichen",
          "Echte Bewertungen, zum Beispiel bei Google",
          "Ehrliche Auskunft, welche Unterlagen Sie brauchen – bevor Sie losfahren",
        ],
      },
    ],
    cta: {
      text: "Zulassung ohne Termin, Endpreis inklusive Gebühren – kommen Sie vorbei oder schreiben Sie uns.",
      href: "/angebot",
      button: "JETZT ANFRAGEN",
    },
    verwandt: [
      { href: "/auto-ummelden", text: "Auto ummelden ohne Termin" },
      { href: "/auto-abmelden", text: "Auto abmelden ohne Termin" },
    ],
  },
  {
    slug: "auto-ummelden-nach-autokauf",
    seoTitel: "Gebrauchtwagen gekauft: Auto ummelden in Lippe",
    beschreibung:
      "Gebrauchtwagen gekauft – was jetzt? Welche Unterlagen Sie zum Ummelden brauchen, ob die Kennzeichen dranbleiben und wie es in Lippe ohne Termin geht.",
    h1: "Gebrauchtwagen gekauft: So melden Sie das Auto in Lippe um",
    kurzantwort:
      "Nach dem Kauf muss das Auto auf Sie umgeschrieben werden – und zwar zügig. Sie brauchen Ausweis, eVB-Nummer, Fahrzeugschein, Fahrzeugbrief und Ihre IBAN für die KFZ-Steuer. Bei uns in Bad Salzuflen geht das ohne Termin: 99 €, wenn die Kennzeichen dranbleiben, 129 € mit neuen Kennzeichen.",
    veroeffentlicht: "2026-09-24",
    aktualisiert: "2026-09-24",
    lesezeitMinuten: 3,
    abschnitte: [
      {
        titel: "Diese Unterlagen brauchen Sie",
        punkte: [
          "Personalausweis oder Reisepass",
          "eVB-Nummer Ihrer neuen Kfz-Versicherung",
          "Fahrzeugschein (Zulassungsbescheinigung Teil I)",
          "Fahrzeugbrief (Zulassungsbescheinigung Teil II)",
          "Ihre IBAN – davon bucht der Zoll die KFZ-Steuer ab",
          "Die bisherigen Kennzeichen, falls das Auto noch angemeldet ist",
        ],
        link: { href: "/faq", text: "Alle Checklisten zur Zulassung" },
      },
      {
        titel: "Bleiben die Kennzeichen dran?",
        absaetze: [
          "Oft ja: Ist das Auto noch angemeldet und Sie möchten das Kennzeichen behalten, bleibt es einfach dran – das ist eine Ummeldung für 99 €. Möchten Sie neue Kennzeichen, zum Beispiel ein Wunschkennzeichen mit LIP, DT oder LE, kostet die Zulassung 129 €.",
          "Ob in Ihrem Fall die alten Kennzeichen bleiben können, sagen wir Ihnen kurz per WhatsApp.",
        ],
      },
      {
        titel: "Warum Sie nicht zu lange warten sollten",
        absaetze: [
          "Das Gesetz verlangt, dass Sie den Halterwechsel unverzüglich melden. Solange das Auto noch auf den Verkäufer läuft, bekommt er Steuerbescheide und Post – das sorgt schnell für Ärger auf beiden Seiten.",
        ],
      },
      {
        titel: "Und wohin mit dem alten Auto?",
        absaetze: [
          "Wir kaufen es an – auch wenn es nicht mehr fährt. Sie bekommen ein unverbindliches Angebot, wir holen das Auto ab und erledigen die Abmeldung. Beides inklusive.",
        ],
        link: { href: "/fahrzeugankauf", text: "Unverbindliches Angebot holen" },
      },
      {
        titel: "So geht es bei uns",
        punkte: [
          "Kurz per WhatsApp Bescheid geben oder direkt vorbeikommen – ohne Termin.",
          "Werler Straße 68, 32105 Bad Salzuflen, Mo–Fr 9–18 Uhr und Sa 15–18 Uhr.",
          "Bezahlt wird erst, wenn alles fertig ist.",
        ],
        link: { href: "/auto-ummelden", text: "Auto ummelden ohne Termin" },
      },
    ],
    cta: {
      text: "Gebrauchtwagen gekauft? Wir melden ihn für Sie um – ohne Termin, für den ganzen Kreis Lippe.",
      href: "/angebot?vorgang=zulassen&art=gebraucht",
      button: "UMMELDUNG ANFRAGEN",
    },
    verwandt: [
      { href: "/evb-nummer", text: "eVB-Nummer: was sie ist und wie Sie sie bekommen" },
      { href: "/preise", text: "Alle Preise im Überblick" },
    ],
  },
  {
    slug: "auto-abmelden-lippe",
    seoTitel: "Auto abmelden im Kreis Lippe – ohne Termin",
    beschreibung:
      "Auto abmelden im Kreis Lippe: welche Unterlagen Sie brauchen, was mit Steuer und Versicherung passiert und wie die Sofortabmeldung ohne Termin funktioniert.",
    h1: "Auto abmelden im Kreis Lippe – was Sie brauchen und wie es ohne Termin geht",
    kurzantwort:
      "Zum Abmelden brauchen Sie den Fahrzeugschein und beide Kennzeichen. Den Fahrzeugbrief brauchen Sie dafür nicht. Mit den Sicherheitscodes auf Fahrzeugschein und Plaketten (Zulassung ab 2015) melden wir Ihr Auto bei uns in Bad Salzuflen sofort ab – für 40 €, ohne Termin.",
    veroeffentlicht: "2026-09-24",
    aktualisiert: "2026-09-24",
    lesezeitMinuten: 3,
    abschnitte: [
      {
        titel: "Diese Unterlagen brauchen Sie",
        punkte: [
          "Fahrzeugschein (Zulassungsbescheinigung Teil I)",
          "Beide Kennzeichenschilder",
          "Personalausweis oder Reisepass",
          "Bei Verschrottung: den Verwertungsnachweis",
        ],
      },
      {
        titel: "Was mit Steuer und Versicherung passiert",
        absaetze: [
          "Mit der Abmeldung endet die KFZ-Steuer – der Zoll wird automatisch informiert. Auch Ihre Versicherung erfährt von der Abmeldung. Sie müssen dafür nichts extra unternehmen.",
        ],
      },
      {
        titel: "Sofortabmeldung mit Sicherheitscodes",
        absaetze: [
          "Fahrzeuge, die ab 2015 zugelassen wurden, haben verdeckte Sicherheitscodes auf dem Fahrzeugschein und auf den Plaketten der Kennzeichen. Nicht freirubbeln – das machen wir. Damit ist das Auto in wenigen Minuten abgemeldet.",
          "Keine Codes oder schon freigerubbelt? Dann melden wir klassisch bis zum nächsten Werktag ab.",
        ],
      },
      {
        titel: "Auto verkaufen statt nur abmelden?",
        absaetze: [
          "Wir kaufen auch Autos an – auch nicht fahrbereite. Beim Ankauf ist die Abmeldung für Sie kostenlos. Holen Sie sich einfach ein unverbindliches Angebot.",
        ],
        link: { href: "/fahrzeugankauf", text: "Unverbindliches Angebot holen" },
      },
    ],
    cta: {
      text: "Auto abmelden ohne Termin – Sofortabmeldung für 40 €, beim Ankauf kostenlos.",
      href: "/angebot?vorgang=abmelden",
      button: "ABMELDUNG ANFRAGEN",
    },
    verwandt: [
      { href: "/auto-abmelden", text: "Auto abmelden ohne Termin" },
      { href: "/ratgeber/fahrzeugpapiere-verloren", text: "Fahrzeugschein oder -brief verloren?" },
    ],
  },
  {
    slug: "umzug-auto-ummelden-lippe",
    seoTitel: "Umzug nach Lippe: Auto ummelden, Kennzeichen behalten?",
    beschreibung:
      "Umgezogen in den Kreis Lippe oder innerhalb von Lippe? Ob Sie Ihr Kennzeichen behalten dürfen, welche Unterlagen nötig sind und was die Adressänderung kostet.",
    h1: "Umgezogen: Auto ummelden in Lippe – und darf das Kennzeichen bleiben?",
    kurzantwort:
      "Nach einem Umzug müssen Sie die neue Adresse in den Fahrzeugschein eintragen lassen. Ihr bisheriges Kennzeichen dürfen Sie seit 2015 behalten – auch wenn Sie aus einem anderen Kreis nach Lippe ziehen. Bei uns kostet die Adressänderung 99 € inklusive Gebühren, ohne Termin.",
    veroeffentlicht: "2026-09-24",
    aktualisiert: "2026-09-24",
    lesezeitMinuten: 3,
    abschnitte: [
      {
        titel: "Diese Unterlagen brauchen Sie",
        punkte: [
          "Personalausweis mit der neuen Adresse (vorher im Bürgerbüro ummelden)",
          "Fahrzeugschein (Zulassungsbescheinigung Teil I)",
          "Nur wenn Sie neue Kennzeichen möchten: zusätzlich den Fahrzeugbrief und die bisherigen Schilder",
        ],
      },
      {
        titel: "Kennzeichen behalten oder wechseln?",
        absaetze: [
          "Sie können Ihr altes Kennzeichen behalten, auch wenn es aus einem anderen Kreis stammt. Wer lieber ein Lippe-Kennzeichen möchte, kann LIP, DT oder LE wählen – dann kommen neue Schilder dazu und es wird eine Zulassung mit Kennzeichen für 129 €.",
        ],
        link: { href: "/ratgeber/dt-le-kennzeichen-lippe", text: "DT und LE: Kennzeichen in Lippe" },
      },
      {
        titel: "Erst Bürgerbüro, dann Auto",
        absaetze: [
          "Melden Sie zuerst Ihren Wohnsitz im Bürgerbüro Ihrer neuen Stadt um. Erst mit der neuen Adresse im Ausweis kann die Adresse im Fahrzeugschein geändert werden.",
        ],
      },
    ],
    cta: {
      text: "Neue Adresse in den Fahrzeugschein – 99 €, ohne Termin, für den ganzen Kreis Lippe.",
      href: "/angebot?vorgang=zulassen&art=umzug",
      button: "ADRESSÄNDERUNG ANFRAGEN",
    },
    verwandt: [
      { href: "/auto-ummelden", text: "Auto ummelden ohne Termin" },
      { href: "/preise", text: "Alle Preise im Überblick" },
    ],
  },
  {
    slug: "neuwagen-zulassen-lippe",
    seoTitel: "Neuwagen zulassen in Lippe – Unterlagen und Ablauf",
    beschreibung:
      "Neuwagen zulassen im Kreis Lippe: welche Unterlagen Sie vom Autohaus brauchen, wie Sie an die eVB-Nummer kommen und wie die Zulassung ohne Termin läuft.",
    h1: "Neuwagen zulassen im Kreis Lippe – Unterlagen und Ablauf",
    kurzantwort:
      "Für einen Neuwagen brauchen Sie Ausweis, eVB-Nummer, den Fahrzeugbrief und die COC-Papiere vom Autohaus sowie Ihre IBAN für die KFZ-Steuer. Bei uns in Bad Salzuflen kostet die Zulassung 129 € inklusive Gebühren – ohne Termin, digital in ca. 20 Minuten oder mit Kennzeichen bis zum nächsten Werktag.",
    veroeffentlicht: "2026-09-24",
    aktualisiert: "2026-09-24",
    lesezeitMinuten: 3,
    abschnitte: [
      {
        titel: "Diese Unterlagen brauchen Sie",
        punkte: [
          "Personalausweis oder Reisepass",
          "eVB-Nummer Ihrer Kfz-Versicherung",
          "Fahrzeugbrief (Zulassungsbescheinigung Teil II) vom Autohaus",
          "COC-Papiere (Übereinstimmungsbescheinigung) vom Autohaus",
          "Ihre IBAN – davon bucht der Zoll die KFZ-Steuer ab",
        ],
      },
      {
        titel: "SOFORT oder mit Kennzeichen?",
        absaetze: [
          "Bei SOFORT sind Sie in ca. 20 Minuten zugelassen – die Schilder besorgen Sie selbst, ob vorher oder nachher, entscheiden Sie. Bei BASIS sind die Schilder dabei, dann ist alles am nächsten Werktag fertig. Beides kostet 129 €.",
        ],
        link: { href: "/preise", text: "Die Pakete im Vergleich" },
      },
      {
        titel: "Noch keine Versicherung?",
        absaetze: [
          "Ohne eVB-Nummer geht keine Zulassung. Die bekommen Sie mit dem Abschluss einer Kfz-Versicherung – oft innerhalb weniger Minuten.",
        ],
        link: { href: "/kfz-versicherung", text: "Kfz-Versicherung vergleichen" },
      },
      {
        titel: "Und wohin mit dem alten Auto?",
        absaetze: [
          "Wir kaufen es an – auch wenn es nicht mehr fährt. Sie bekommen ein unverbindliches Angebot, wir holen das Auto ab und erledigen die Abmeldung. Beides inklusive.",
        ],
        link: { href: "/fahrzeugankauf", text: "Unverbindliches Angebot holen" },
      },
    ],
    cta: {
      text: "Neuwagen zulassen ohne Termin – für den ganzen Kreis Lippe.",
      href: "/angebot?vorgang=zulassen&art=neu",
      button: "ZULASSUNG ANFRAGEN",
    },
    verwandt: [
      { href: "/auto-anmelden", text: "Auto anmelden ohne Termin" },
      { href: "/wunschkennzeichen", text: "Wunschkennzeichen LIP, DT oder LE" },
    ],
  },
  {
    slug: "auto-fuer-andere-anmelden-vollmacht",
    seoTitel: "Auto für jemand anderen anmelden: Vollmacht & Unterlagen",
    beschreibung:
      "Sie melden ein Auto für Eltern, Partner oder Kinder an? Welche Vollmacht und welche Unterlagen Sie brauchen – mit Vordruck zum Ausdrucken.",
    h1: "Auto für jemand anderen anmelden – Vollmacht und Unterlagen",
    kurzantwort:
      "Sie können ein Auto auch für jemand anderen anmelden, ummelden oder abmelden. Dafür brauchen Sie eine vom Halter unterschriebene Vollmacht, seinen Ausweis oder eine Kopie davon und Ihren eigenen Ausweis. Für die Anmeldung kommen eVB-Nummer, Fahrzeugpapiere und ein SEPA-Mandat des Kontoinhabers dazu.",
    veroeffentlicht: "2026-09-24",
    aktualisiert: "2026-09-24",
    lesezeitMinuten: 3,
    abschnitte: [
      {
        titel: "Das brauchen Sie immer",
        punkte: [
          "Vollmacht, vom Halter unterschrieben",
          "Ausweis des Halters oder eine Kopie davon",
          "Ihren eigenen Ausweis",
        ],
        link: { href: "/dokumente", text: "Vollmacht und SEPA-Mandat zum Ausdrucken" },
      },
      {
        titel: "Zusätzlich für die Anmeldung",
        punkte: [
          "eVB-Nummer – die Versicherung muss auf den Halter laufen",
          "Fahrzeugschein und Fahrzeugbrief, bei Neuwagen die COC-Papiere",
          "SEPA-Lastschriftmandat für die KFZ-Steuer, vom Kontoinhaber unterschrieben",
        ],
      },
      {
        titel: "Für Firmenwagen",
        absaetze: [
          "Ist eine Firma der Halter, kommt meist die Gewerbeanmeldung oder ein Handelsregisterauszug dazu. Für Autohändler und Firmen mit mehreren Fahrzeugen haben wir eine eigene Seite.",
        ],
        link: { href: "/gewerbekunden", text: "Für Firmen und Partner" },
      },
    ],
    cta: {
      text: "Sie erledigen die Zulassung für einen Angehörigen? Wir helfen – ohne Termin, im ganzen Kreis Lippe.",
      href: "/angebot",
      button: "JETZT ANFRAGEN",
    },
    verwandt: [
      { href: "/dokumente", text: "Formulare zum Ausdrucken" },
      { href: "/faq", text: "Welche Unterlagen brauche ich?" },
    ],
  },
];

export const findeArtikel = (slug: string | undefined) =>
  RATGEBER.find((artikel) => artikel.slug === slug);
