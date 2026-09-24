import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import TarifcheckRechner from "@/components/TarifcheckRechner";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqSchema from "@/content/faqSchema.json";
import { ArrowRight, CheckCircle, Info } from "lucide-react";
import { Link } from "react-router-dom";

const FAQS: { question: string; answer: string }[] = faqSchema["/kfz-versicherung"];

const SCHRITTE = [
  {
    titel: "Versicherung vergleichen",
    text: "Tarife im Rechner unten vergleichen und den passenden direkt online abschließen.",
  },
  {
    titel: "eVB-Nummer erhalten",
    text: "Die eVB-Nummer kommt bei den meisten Versicherern direkt nach dem Abschluss per E-Mail.",
  },
  {
    titel: "Bei uns zulassen",
    text: "Mit der eVB-Nummer zu uns – ohne Termin, digital in ca. 20 Minuten.",
  },
];

const TIPPS = [
  "Versicherungsnehmer und späterer Halter sollten dieselbe Person sein – sonst passt die eVB-Nummer nicht zur Zulassung.",
  "Die richtige Fahrzeugart wählen: Eine eVB für ein Auto gilt nicht für ein Motorrad oder einen Anhänger.",
  "Als Versicherungsbeginn den Tag angeben, an dem Sie zulassen möchten.",
  "Haben Sie schon eine Schadenfreiheitsklasse aus einem anderen Vertrag, geben Sie sie an – das senkt den Beitrag oft deutlich.",
];

const KfzVersicherung = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo path="/kfz-versicherung" />
      <Header />

      <section className="relative overflow-hidden py-14 text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/80">
            eVB-Nummer in wenigen Minuten
          </p>
          <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            eVB-Nummer beantragen: Kfz-Versicherung vergleichen und direkt bei uns zulassen
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-primary-foreground/90">
            Die eVB-Nummer bekommen Sie, sobald Sie eine Kfz-Versicherung abschließen – meist sofort
            per E-Mail. Hier können Sie Tarife vergleichen und direkt abschließen. Danach kommen Sie
            ohne Termin zu uns nach Bad Salzuflen.
          </p>
        </div>
      </section>

      {/* Ablauf */}
      <section className="py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-8 text-center">In drei Schritten zum zugelassenen Auto</h2>
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

      {/* Rechner */}
      <section className="bg-muted/50 py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-4 text-center">Versicherung vergleichen und eVB-Nummer erhalten</h2>
          <p className="section-subtitle mx-auto mb-8 max-w-2xl text-center">
            Bitte nutzen Sie den Vergleich nur, wenn Sie das Fahrzeug auch wirklich versichern und
            zulassen möchten.
          </p>
          <TarifcheckRechner />
          <p className="mt-4 text-xs text-muted-foreground">
            * Werbung: Der Vergleichsrechner stammt von TARIFCHECK24 GmbH. Schließen Sie darüber einen
            Vertrag ab, erhalten wir eine Provision. Für Sie entstehen dadurch keine Nachteile beim
            Preis oder Vertrag. Vermittler des Vertrags ist TARIFCHECK24 GmbH, nicht KFZ-Sofortzulassung.
          </p>
        </div>
      </section>

      {/* Tipps */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-4 text-2xl font-bold text-secondary">
            Darauf sollten Sie achten, damit die Zulassung klappt
          </h2>
          <ul className="space-y-3">
            {TIPPS.map((tipp) => (
              <li key={tipp} className="flex items-start gap-2 text-muted-foreground">
                <CheckCircle className="mt-1 h-4 w-4 flex-none text-trust-green" />
                <span>{tipp}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-start gap-3 rounded-xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
            <Info className="mt-0.5 h-5 w-5 flex-none" />
            <p>
              Wir sind Zulassungsdienst, kein Versicherungsvermittler, und beraten nicht zu
              Versicherungen. Was die eVB-Nummer genau ist und welche Fehler häufig passieren, steht
              auf unserer Seite{" "}
              <Link to="/evb-nummer" className="font-semibold text-link hover:underline">
                eVB-Nummer einfach erklärt
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/50 py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-8 text-center">Häufige Fragen</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {FAQS.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="rounded-xl border border-border bg-background px-5"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-secondary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="section-title mb-4">eVB-Nummer da? Dann kommen Sie vorbei</h2>
          <p className="section-subtitle mx-auto mb-6 max-w-2xl">
            Werler Straße 68, 32105 Bad Salzuflen – Montag bis Freitag 9–18 Uhr, Samstag 15–18 Uhr.
            Ohne Termin.
          </p>
          <Button size="lg" variant="cta-large" asChild>
            <Link to="/angebot?vorgang=zulassen">
              ZULASSUNG ANFRAGEN
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default KfzVersicherung;
