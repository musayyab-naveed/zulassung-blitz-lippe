import StandortKarte from "@/components/StandortKarte";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleReviews from "@/components/GoogleReviews";
import Seo from "@/components/Seo";
import { startseitenFaqs } from "@/content/faqs";
import hero480 from "@/assets/hero-480.webp";
import hero680 from "@/assets/hero-680.webp";
import hero800 from "@/assets/hero-800.webp";
import hero1200 from "@/assets/hero-1200.webp";
import { Car, FileText, Shield, ShieldCheck, CheckCircle, ArrowRight, Phone, MapPin, Mail, Zap, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { RATGEBER, ratgeberPfad } from "@/content/ratgeber";
import { ALLE_ORTE_LIPPE, ORTSSEITEN } from "@/content/ortsseiten";
import { BUSINESS } from "@/content/seoRoutes";

const ROUTE_URL = BUSINESS.routeUrl;

const Home = () => {

  const steps = [
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Kurz Bescheid geben",
      description:
        "Per WhatsApp in wenigen Fingertipps – oder einfach vorbeikommen. Einen Termin brauchen Sie nicht.",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Unterlagen mitbringen",
      description:
        "Vorbeibringen, zuschicken oder im Raum Bad Salzuflen von uns abholen lassen.",
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "Zugelassen in 20 Min – oder am nächsten Werktag",
      description:
        "Sofort-Zulassung: in ca. 20 Minuten zugelassen – losfahren, sobald Ihre Schilder dran sind. Klassisch: am nächsten Werktag fertig, mit Schildern, inkl. Rückversand oder Abholung.",
    },
  ];

  const checklistZulassung = [
    "Personalausweis oder Reisepass",
    "eVB-Nummer Ihrer KFZ-Versicherung",
    "Fahrzeugbrief (Zulassungsbescheinigung Teil II)",
    "Gebrauchtwagen: Fahrzeugschein (Zulassungsbescheinigung Teil I)",
    "Neuwagen: COC-Papiere (Übereinstimmungsbescheinigung) statt Fahrzeugschein",
    "HU-Nachweis bei Gebrauchtwagen – nicht nötig, wenn die HU im Fahrzeugschein eingetragen ist",
    "IBAN für die KFZ-Steuer",
  ];

  const checklistAbmeldung = [
    "Beide Kennzeichenschilder",
    "Fahrzeugschein (Zulassungsbescheinigung Teil I)",
    "Personalausweis oder Reisepass",
    "Sicherheitscodes zum Freirubbeln auf Fahrzeugschein und Kennzeichen-Plaketten (bei Zulassung ab 2015 vorhanden)",
  ];


  return (
    <div className="min-h-screen bg-background">
      <Seo
        path="/"
      />
      <Header />

      <section className="relative overflow-hidden py-16 sm:py-20 text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-12 left-[8%] h-24 w-24 rounded-full bg-white/40 blur-2xl" />
          <div className="absolute bottom-10 right-[10%] h-44 w-44 rounded-full bg-cyan-200/60 blur-3xl" />
          <div className="absolute top-[38%] left-[30%] h-20 w-20 rounded-full bg-white/30 blur-xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left relative z-20">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide mb-5 text-primary-foreground">
                <Zap className="h-4 w-4 text-[hsl(var(--cta-orange))]" />
                NEU: Sofort-Zulassung in ca. 20 Minuten
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight text-white">
                Zulassungsdienst Bad Salzuflen –<br className="hidden sm:block" /> KFZ-Zulassung ohne Termin für ganz Lippe
              </h1>
              <p className="text-lg sm:text-xl mb-6 font-semibold text-primary-foreground/95">
                Digital in ca. 20 Minuten oder klassisch bis zum nächsten Werktag – ab 99 € inklusive
                aller Gebühren. Für den ganzen Kreis Lippe.
              </p>

              <p className="mb-4 text-sm font-semibold text-white sm:text-base">
                <span className="text-[hsl(var(--cta-orange))]">★★★★★</span> 5,0 · {BUSINESS.reviewCount} Google-Bewertungen
              </p>
              <ul className="mb-8 flex flex-wrap justify-center gap-2 sm:gap-3 lg:justify-start">
                {["Ohne Termin", "Mo–Fr 9–18 · Sa 15–18 Uhr", "Online rund um die Uhr"].map((punkt) => (
                  <li
                    key={punkt}
                    className="rounded-full bg-white/15 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm sm:px-4 sm:text-sm"
                  >
                    ✓ {punkt}
                  </li>
                ))}
              </ul>

              {/* Eine Hauptaktion, zwei Nebenaktionen */}
              <div className="relative z-30 flex flex-col gap-3 sm:max-w-xl lg:max-w-none">
                <Button size="lg" variant="cta-large" asChild className="w-full sm:w-auto">
                  <Link to="/angebot">
                    JETZT KOSTENLOS ANFRAGEN
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <p className="-mt-1 text-sm text-primary-foreground/90">
                  Anmelden, ummelden oder abmelden · wenige Fingertipps · unverbindlich per WhatsApp
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Button size="lg" variant="cta" asChild className="h-auto py-4 text-base font-bold">
                    <Link to="/kfz-versicherung">
                      <ShieldCheck className="mr-2 h-5 w-5" />
                      eVB-Nummer beantragen
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    asChild
                    className="h-auto rounded-xl bg-white py-4 text-base font-bold text-secondary hover:bg-white/90"
                  >
                    <Link to="/fahrzeugankauf">
                      <Car className="mr-2 h-5 w-5" />
                      Auto an uns verkaufen
                    </Link>
                  </Button>
                </div>
              </div>
              <p className="mt-4 text-sm text-primary-foreground/85">
                Auto verkaufen: unverbindliches Angebot holen – auch für nicht fahrbereite Fahrzeuge. Beim Ankauf ist die Abmeldung gratis.
              </p>

              <a
                href={ROUTE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white hover:underline"
              >
                <MapPin className="h-4 w-4 flex-none text-primary" />
                Werler Straße 68, 32105 Bad Salzuflen · Route planen
              </a>
            </div>

            <div className="relative mt-8 lg:mt-0 z-10 stagger-in stagger-delay-2">
              <div className="relative">
                <div className="relative z-10">
                  <img
                    src={hero800}
                    srcSet={`${hero480} 480w, ${hero680} 680w, ${hero800} 800w, ${hero1200} 1200w`}
                    sizes="(min-width: 1024px) 512px, (min-width: 640px) 448px, calc(100vw - 32px)"
                    alt="KFZ-Sofortzulassung Service"
                    width={1600}
                    height={1200}
                    decoding="async"
                    className="w-full max-w-md mx-auto lg:max-w-lg rounded-2xl border border-white/20 shadow-2xl"
                  />
                </div>

                <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl z-20 hidden sm:block">
                  <div className="flex items-center gap-2">
                    <Zap className="h-6 w-6 text-[hsl(var(--cta-orange))]" />
                    <div>
                      <div className="text-2xl font-bold text-secondary">20 Min</div>
                      <div className="text-xs text-muted-foreground">Sofort-Zulassung</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-lg z-20 hidden sm:block">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-trust-green" />
                    <span className="text-sm font-medium text-secondary">Volldigital</span>
                  </div>
                </div>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/10 rounded-full blur-3xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Kfz-Versicherung: gut sichtbar direkt unter dem Startbereich */}
      <section className="border-b border-border bg-trust-green/10 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 text-center sm:px-6 md:flex-row md:justify-between md:text-left lg:px-8">
          <div className="flex items-center gap-3">
            <ShieldCheck className="hidden h-10 w-10 flex-none text-trust-green sm:block" />
            <div>
              <p className="text-lg font-bold text-secondary">Noch keine eVB-Nummer?</p>
              <p className="text-sm text-muted-foreground">
                Kfz-Versicherung vergleichen und abschließen – die eVB-Nummer kommt per E-Mail. Danach
                ohne Termin bei uns zulassen.
              </p>
            </div>
          </div>
          <Button size="lg" variant="cta" asChild className="w-full flex-none md:w-auto">
            <Link to="/kfz-versicherung">
              eVB-Nummer beantragen
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>


      <GoogleReviews />


      <section className="py-14 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 stagger-in">
            <h2 className="section-title mb-4">Ablauf in 3 einfachen Schritten</h2>
            <p className="section-subtitle">So läuft Ihre Zulassung bei uns ab</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((step, index) => (
              <Card key={index} className="surface-card text-center">
                <CardHeader className="pb-3">
                  <div className="mx-auto w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    {step.icon}
                  </div>
                  <div className="w-7 h-7 bg-primary text-secondary rounded-full flex items-center justify-center mx-auto mb-3 text-xs font-bold">
                    {index + 1}
                  </div>
                  <CardTitle className="text-lg text-secondary">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title mb-4">Checkliste: Das bringen Sie mit</h2>
            <p className="section-subtitle">Mit diesen Unterlagen geht alles ohne Verzögerung</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="surface-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-secondary">Auto anmelden (neu oder gebraucht)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2.5">
                  {checklistZulassung.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle className="h-5 w-5 text-trust-green mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">
                        {item}
                        {item.startsWith("eVB-Nummer") && (
                          <>
                            {" – "}
                            <Link
                              to="/evb-nummer"
                              className="font-semibold text-link hover:underline"
                            >
                              was ist das?
                            </Link>
                          </>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-start gap-2 rounded-lg border border-[hsl(var(--cta-orange))]/40 bg-[hsl(var(--cta-orange))]/10 px-3 py-2.5">
                  <AlertCircle className="h-4 w-4 text-[hsl(var(--cta-orange))] mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-semibold text-secondary">
                    Sofort-Zulassung: Kennzeichen besorgen Sie selbst, wann Sie möchten – für die
                    Zulassung selbst sind sie nicht nötig
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="surface-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-secondary">Sofortabmeldung</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ul className="space-y-2.5">
                  {checklistAbmeldung.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <CheckCircle className="h-5 w-5 text-trust-green mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-start gap-2 rounded-lg border border-trust-green/40 bg-trust-green/10 px-3 py-2.5">
                  <CheckCircle className="h-4 w-4 text-trust-green mt-0.5 flex-shrink-0" />
                  <span className="text-sm font-semibold text-secondary">
                    Verkauf an uns? Dann ist die Abmeldung gratis
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3.5">
            <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-foreground">
              <span className="font-semibold text-secondary">Vollmacht und SEPA-Lastschriftmandat</span>{" "}
              müssen Sie nicht vorbereiten – beide Formulare bekommen Sie bei uns und füllen sie einfach
              vor Ort aus.
            </p>
          </div>

          <div className="mt-8 text-center">
            <Button size="lg" variant="cta-large" asChild>
              <Link to="/angebot">
                JETZT KOSTENLOS ANFRAGEN
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>


      <section className="py-14 bg-muted">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title mb-4">Häufige Fragen</h2>
            <p className="section-subtitle">
              Alles Wichtige zu Zulassung, Sofort-Zulassung und Fahrzeugankauf – kurz beantwortet
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {startseitenFaqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="surface-card rounded-xl border px-5"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-secondary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Alle Vorgänge und Unterlagen im Detail finden Sie in unserem{" "}
            <Link to="/faq" className="font-semibold text-link hover:underline">
              FAQ-Bereich
            </Link>
            . Was das jeweils kostet, steht auf der{" "}
            <Link to="/preise" className="font-semibold text-link hover:underline">
              Preisübersicht
            </Link>
            . Keine oder keine passende{" "}
            <Link to="/evb-nummer" className="font-semibold text-link hover:underline">
              eVB-Nummer
            </Link>
            ? Dort steht, woher Sie eine bekommen.
          </p>

          <div className="mt-6 text-center">
            <Button size="lg" variant="cta-large" asChild>
              <Link to="/angebot">
                JETZT KOSTENLOS ANFRAGEN
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>



      {/* Standort Bad Salzuflen – für alle 16 Orte im Kreis Lippe */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="section-title mb-4">Unser Standort: Bad Salzuflen – für den ganzen Kreis Lippe</h2>
          <p className="section-subtitle mx-auto mb-8 max-w-2xl">
            Unser Laden ist in der Werler Straße 68 in Bad Salzuflen. Von hier erledigen wir die Zulassung für
            alle 16 Städte und Gemeinden im Kreis Lippe.
          </p>
          <a
            href={ROUTE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mb-5 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--cta-orange))] px-6 py-3 text-base font-bold text-white shadow-md hover:bg-[hsl(var(--cta-orange-hover))]"
          >
            <MapPin className="h-5 w-5" />
            Bad Salzuflen – hier sind wir
          </a>
          <div className="flex flex-wrap justify-center gap-2">
            {ALLE_ORTE_LIPPE.filter((ort) => ort !== "Bad Salzuflen").map((ort) => {
              const seite = ORTSSEITEN.find((s) => s.ort === ort);
              // Alle Orte sehen gleich aus – nur Bad Salzuflen (Standort) ist hervorgehoben
              const stil = "rounded-full border border-border bg-background px-4 py-2 text-sm text-secondary";
              return seite ? (
                <Link key={ort} to={seite.path} className={`${stil} hover:border-primary hover:text-link`}>
                  {ort}
                </Link>
              ) : (
                <span key={ort} className={stil}>
                  {ort}
                </span>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-14 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="section-title mb-4">Aus dem Ratgeber</h2>
            <p className="section-subtitle">Die häufigsten Fragen unserer Kunden – einfach erklärt</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              "auto-ummelden-nach-autokauf",
              "auto-abmelden-lippe",
              "neuwagen-zulassen-lippe",
              "umzug-auto-ummelden-lippe",
              "dt-le-kennzeichen-lippe",
              "kein-termin-zulassungsstelle-lippe",
            ]
              .map((slug) => RATGEBER.find((a) => a.slug === slug))
              .filter((artikel): artikel is (typeof RATGEBER)[number] => Boolean(artikel))
              .map((artikel) => (
              <Link
                key={artikel.slug}
                to={ratgeberPfad(artikel.slug)}
                className="surface-card group p-5 transition-colors hover:border-primary"
              >
                <h3 className="font-bold text-secondary group-hover:text-link">{artikel.h1}</h3>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-link">
                  Weiterlesen
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link to="/ratgeber" className="font-semibold text-link hover:underline">
              Alle Ratgeber-Artikel ansehen
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="section-title mb-4">Besuchen Sie uns</h2>
            <p className="section-subtitle">
              Finden Sie uns in Bad Salzuflen, im Herzen des Kreises Lippe
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="surface-card overflow-hidden p-1">
              <StandortKarte />
            </div>

            <div className="surface-card p-6 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-secondary mb-4">Wir sind direkt vor Ort für Sie da</h3>
                <p className="text-muted-foreground mb-6">
                  Kommen Sie einfach vorbei – ohne Termin. Aus Detmold, Lemgo, Lage und dem übrigen
                  Kreis Lippe sind Sie schnell bei uns; alternativ schicken Sie uns die Unterlagen oder
                  wir erledigen die Zulassung online.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-secondary">Adresse</h4>
                    <p className="text-muted-foreground">
                      Werler Straße 68
                      <br />
                      32105 Bad Salzuflen
                      <br />
                      Deutschland
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-secondary">Telefon</h4>
                    <a href="tel:+4915142462280" className="text-link hover:underline">
                      01514 2462280
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-secondary">E-Mail</h4>
                    <a href="mailto:info@sofortzulassung.com" className="text-link hover:underline">
                      info@sofortzulassung.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button size="lg" variant="cta" className="w-full sm:w-auto" asChild>
                  <Link to="/angebot">
                    JETZT KOSTENLOS ANFRAGEN
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
