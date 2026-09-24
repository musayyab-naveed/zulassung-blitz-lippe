import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, FileText, Info, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqSchema from "@/content/faqSchema.json";

const FORMULAR_FAQS: { question: string; answer: string }[] = faqSchema["/dokumente"];

/** Formulare, die wir mit dem Kunden vor Ort ausfüllen – mit passendem Ratgeber */
const VOR_ORT = [
  {
    title: "Verlusterklärung (Fahrzeugschein oder -brief verloren)",
    description: "Die Erklärung zum Verbleib der Papiere füllen wir mit Ihnen gemeinsam aus.",
    link: { href: "/ratgeber/fahrzeugpapiere-verloren", text: "Was bei verlorenen Papieren zu tun ist" },
  },
  {
    title: "Antrag auf Kurzzeitkennzeichen",
    description: "Füllen wir mit Ihnen gemeinsam aus. Wichtig: eine eigene eVB-Nummer für Kurzzeitkennzeichen.",
    link: { href: "/ratgeber/kurzzeitkennzeichen-ausfuhrkennzeichen", text: "Kurzzeit- oder Ausfuhrkennzeichen?" },
  },
];

const documents = [
  {
    title: "Vollmacht für die Zulassung",
    description:
      "Damit dürfen wir Ihr Fahrzeug in Ihrem Namen an-, um- oder wieder zulassen.",
    href: "/documents/Vollmacht_Zulassung.pdf",
    hinweis: "Bitte unterschreiben – zusammen mit einer Ausweiskopie beilegen.",
  },
  {
    title: "SEPA-Lastschriftmandat",
    description:
      "Für den Einzug der KFZ-Steuer durch das Hauptzollamt. Wird bei jeder Zulassung benötigt.",
    href: "/documents/SEPA_Lastschriftmandat.pdf",
    hinweis: "IBAN eintragen und unterschreiben.",
  },
  {
    title: "Antrag auf Außerbetriebsetzung (Abmeldung)",
    description:
      "Der Antrag für die Abmeldung – nur nötig, wenn Sie uns die Unterlagen zuschicken, statt vorbeizukommen.",
    href: "/documents/Antrag_AB_2026-03.pdf",
    hinweis: "Bitte unterschreiben – zusammen mit einer Ausweiskopie beilegen.",
  },
];

const Dokumente = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        path="/dokumente"
      />
      <Header />

      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="section-title mb-3">Formulare für die KFZ-Zulassung im Kreis Lippe</h1>
            <p className="section-subtitle mx-auto max-w-2xl">
              Vollmacht, SEPA-Lastschriftmandat und Antrag auf Außerbetriebsetzung zum Ausdrucken. Sie brauchen
              sie nur, wenn Sie uns Ihre Unterlagen zusenden oder jemand anderes für Sie kommt. Kommen Sie
              persönlich vorbei, füllen wir alles gemeinsam vor Ort aus.
            </p>
          </div>

          <div className="space-y-4">
            {documents.map((document) => (
              <Card key={document.title} className="surface-card">
                <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <FileText className="h-6 w-6 text-primary" />
                    </span>
                    <div>
                      <h2 className="text-lg font-bold text-secondary">{document.title}</h2>
                      <p className="mt-1 text-sm text-muted-foreground">{document.description}</p>
                      <p className="mt-1 text-xs font-semibold text-secondary">{document.hinweis}</p>
                    </div>
                  </div>
                  <Button variant="cta" className="sm:flex-shrink-0" asChild>
                    <a href={document.href} target="_blank" rel="noreferrer">
                      <Download className="mr-2 h-4 w-4" />
                      PDF öffnen
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <h2 className="mb-4 mt-10 text-xl font-bold text-secondary">Diese Formulare füllen wir mit Ihnen vor Ort aus</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {VOR_ORT.map((formular) => (
              <Card key={formular.title} className="surface-card">
                <CardContent className="p-5">
                  <h3 className="font-bold text-secondary">{formular.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{formular.description}</p>
                  <Link to={formular.link.href} className="mt-3 inline-block text-sm font-semibold text-link hover:underline">
                    {formular.link.text} →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3.5">
            <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <p className="text-sm text-foreground">
              <span className="font-semibold text-secondary">Versandadresse:</span> KFZ-Sofortzulassung ·
              Werler Straße 68 · 32105 Bad Salzuflen. Am besten versichert mit Sendungsverfolgung –
              den Express-Rückversand übernehmen wir.
            </p>
          </div>

          <h2 className="mb-4 mt-12 text-xl font-bold text-secondary">Häufige Fragen zu den Formularen</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {FORMULAR_FAQS.map((faq, index) => (
              <AccordionItem key={faq.question} value={`f-${index}`} className="rounded-xl border border-border px-5">
                <AccordionTrigger className="text-left font-semibold text-secondary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-10 text-center">
            <p className="mb-4 text-muted-foreground">
              Sie kommen lieber persönlich vorbei? Dann brauchen Sie hier gar nichts:
            </p>
            <Button size="lg" variant="cta-large" asChild>
              <Link to="/angebot">
                JETZT KOSTENLOS ANFRAGEN
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dokumente;
