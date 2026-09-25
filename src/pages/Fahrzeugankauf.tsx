import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { ArrowRight, Car, FileCheck, MapPin, MessageCircle, Navigation, Phone, Tag, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import hero480 from "@/assets/hero-480.webp";
import hero800 from "@/assets/hero-800.webp";
import hero1200 from "@/assets/hero-1200.webp";
import faqSchema from "@/content/faqSchema.json";
import { BUSINESS } from "@/content/seoRoutes";

const ANKAUF_FAQS: { question: string; answer: string }[] = faqSchema["/fahrzeugankauf"];

const VORTEILE = [
  {
    icon: Tag,
    titel: "Unverbindliches Angebot",
    text: "Sie schreiben uns kurz Marke, Modell, Baujahr und Kilometerstand. Wir machen Ihnen ein Angebot – und Sie entscheiden in Ruhe.",
  },
  {
    icon: Truck,
    titel: "Abholung inklusive",
    text: "Wir holen das Auto ab – bei Ihnen zu Hause oder dort, wo es gerade steht.",
  },
  {
    icon: FileCheck,
    titel: "Abmeldung inklusive",
    text: "Wir melden das Auto für Sie ab. Damit enden KFZ-Steuer und Versicherung – und die 40 € für die Abmeldung sparen Sie.",
  },
  {
    icon: Car,
    titel: "Neues Auto gleich mit anmelden",
    text: "Ihr neues Auto melden wir ohne Termin an. Alles aus einer Hand – ein Ansprechpartner für beides.",
  },
];

const SCHRITTE = [
  {
    titel: "Kurz schreiben",
    text: "Per WhatsApp: Marke, Modell, Baujahr und Kilometerstand. Fotos gern hinterher.",
  },
  {
    titel: "Angebot bekommen",
    text: "Kostenlos und unverbindlich. Sie entscheiden erst, wenn Sie unser Angebot kennen.",
  },
  {
    titel: "Wir holen ab und melden ab",
    text: "Wir holen das Auto ab und erledigen die Abmeldung – Sie müssen nichts weiter tun.",
  },
];

const Fahrzeugankauf = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo path="/fahrzeugankauf" />
      <Header />

      {/* Kopfbereich – gleiche Farben wie alle anderen Seiten */}
      <section className="relative overflow-hidden py-14 text-primary-foreground sm:py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary" />
        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/80">
              Fahrzeugankauf · Bad Salzuflen &amp; Kreis Lippe
            </p>
            <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Auto verkaufen in Bad Salzuflen – wir holen es ab und melden es ab
            </h1>
            <p className="mb-6 text-lg text-primary-foreground/90">
              Neues Auto gekauft und wohin mit dem alten? Wir kaufen es Ihnen ab – auch wenn es nicht mehr
              fährt. Sie bekommen ein unverbindliches Angebot, wir holen das Auto ab und erledigen die
              Abmeldung.
            </p>
            <ul className="mb-8 flex flex-wrap gap-2">
              {["Unverbindliches Angebot", "Abholung inklusive", "Abmeldung inklusive", "Auch nicht fahrbereit"].map(
                (punkt) => (
                  <li
                    key={punkt}
                    className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white sm:text-sm"
                  >
                    ✓ {punkt}
                  </li>
                )
              )}
            </ul>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" variant="cta-large" asChild>
                <Link to="/angebot?start=verkauf">
                  Unverbindliches Angebot holen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-white bg-white text-secondary hover:bg-white/90">
                <a href="tel:+4915142462280">
                  <Phone className="mr-2 h-5 w-5" />
                  Anrufen: 01514 2462280
                </a>
              </Button>
            </div>
          </div>

          {/* Echtes Foto statt Symbolbild – so sieht der Kunde, wohin er sein Auto verkauft */}
          <figure className="relative">
            <img
              src={hero800}
              srcSet={`${hero480} 480w, ${hero800} 800w, ${hero1200} 1200w`}
              sizes="(min-width: 1024px) 544px, calc(100vw - 32px)"
              width={1200}
              height={900}
              alt="Unser Laden in der Werler Straße 68 in Bad Salzuflen"
              className="w-full rounded-3xl border-4 border-white/90 shadow-2xl"
            />
            <figcaption className="absolute -bottom-4 left-4 right-4 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-secondary shadow-xl sm:left-auto sm:right-6">
              <MapPin className="h-5 w-5 flex-none text-[hsl(var(--cta-orange))]" />
              Werler Straße 68, Bad Salzuflen
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Die Kernbotschaft */}
      <section className="bg-gradient-to-b from-[hsl(197_100%_95%)] to-background py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="section-title mb-3">Neues Auto gekauft – wohin mit dem alten?</h2>
            <p className="section-subtitle mx-auto max-w-2xl">
              Wir nehmen Ihnen alles ab: vom Angebot über die Abholung bis zur Abmeldung.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VORTEILE.map(({ icon: Icon, titel, text }) => (
              <div key={titel} className="rounded-2xl border-2 border-primary/25 bg-background p-6 shadow-sm">
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mb-2 text-lg font-bold text-secondary">{titel}</h3>
                <p className="text-sm text-secondary/80">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-secondary">
            Neues Auto anmelden?{" "}
            <Link to="/auto-anmelden" className="font-semibold text-link hover:underline">
              So läuft die Zulassung ohne Termin →
            </Link>
          </p>
        </div>
      </section>

      {/* Ablauf */}
      <section className="bg-muted/50 py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-8 text-center">So einfach geht's</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {SCHRITTE.map((schritt, index) => (
              <div key={schritt.titel} className="rounded-xl border border-border bg-background p-5">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-secondary">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-secondary">{schritt.titel}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{schritt.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fragen */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-8 text-center">Häufige Fragen zum Autoverkauf</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {ANKAUF_FAQS.map((faq, index) => (
              <AccordionItem key={faq.question} value={`a-${index}`} className="rounded-xl border border-border bg-background px-5">
                <AccordionTrigger className="text-left text-base font-semibold text-secondary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Abschluss */}
      <section className="bg-muted/50 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="section-title mb-4">Was ist Ihr Auto wert?</h2>
          <p className="section-subtitle mx-auto mb-6 max-w-2xl">
            Ein kurzer Fingertipp – dann steht Ihre WhatsApp-Nachricht bereit. Kostenlos und unverbindlich.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" variant="cta-large" asChild>
              <Link to="/angebot?start=verkauf">
                <MessageCircle className="mr-2 h-5 w-5" />
                UNVERBINDLICHES ANGEBOT HOLEN
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={BUSINESS.routeUrl} target="_blank" rel="noopener noreferrer">
                <Navigation className="mr-2 h-5 w-5" />
                Route planen
              </a>
            </Button>
          </div>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            Werler Straße 68, 32105 Bad Salzuflen · Mo–Fr 9–18 Uhr · Sa 15–18 Uhr
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Fahrzeugankauf;
