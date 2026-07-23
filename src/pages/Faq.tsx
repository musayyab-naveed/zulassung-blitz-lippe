import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { generalFaqs, vorgangChecklists } from "@/content/faqs";
import { CheckCircle, FileText, ArrowRight, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Faq = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="FAQ & Unterlagen | KFZ-Sofortzulassung Bad Salzuflen"
        description="Alle Unterlagen für Zulassung, Umschreibung, Wiederzulassung und Abmeldung im Kreis Lippe – plus Antworten auf die häufigsten Fragen zur Sofort-Zulassung."
        path="/faq"
        image="/favicon.ico"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            ...generalFaqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
            ...vorgangChecklists.map((vorgang) => ({
              "@type": "Question",
              name: `Welche Unterlagen brauche ich für: ${vorgang.title}?`,
              acceptedAnswer: { "@type": "Answer", text: vorgang.items.join(", ") },
            })),
          ],
        }}
      />
      <Header />

      <section className="relative overflow-hidden py-14 text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-white">FAQ & Unterlagen</h1>
          <p className="text-lg text-primary-foreground/90">
            Alle Vorgänge und benötigten Unterlagen im Überblick – nach den Vorgaben des
            Straßenverkehrsamts Kreis Lippe.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title mb-4">Welche Unterlagen brauche ich?</h2>
            <p className="section-subtitle">Vorgang aufklappen und Checkliste ansehen</p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {vorgangChecklists.map((vorgang) => (
              <AccordionItem
                key={vorgang.key}
                value={vorgang.key}
                className="surface-card rounded-xl border px-5"
              >
                <AccordionTrigger className="text-left text-base font-semibold text-secondary hover:no-underline">
                  {vorgang.title}
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2.5">
                    {vorgang.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle className="h-5 w-5 text-trust-green mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                  {vorgang.hint && (
                    <div className="mt-3 flex items-start gap-2 rounded-lg border border-trust-green/40 bg-trust-green/10 px-3 py-2.5">
                      <CheckCircle className="h-4 w-4 text-trust-green mt-0.5 flex-shrink-0" />
                      <span className="text-sm font-semibold text-secondary">{vorgang.hint}</span>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3.5">
            <FileText className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <p className="text-sm text-foreground">
              <span className="font-semibold text-secondary">Vollmacht und SEPA-Lastschriftmandat</span>{" "}
              müssen Sie nicht vorbereiten – beide Formulare bekommen Sie bei uns und füllen sie einfach
              vor Ort aus. Wenn Sie uns die Unterlagen zusenden möchten, finden Sie die Formulare{" "}
              <Link to="/dokumente" className="font-semibold text-primary hover:underline">
                hier zum Ausdrucken
              </Link>
              .
            </p>
          </div>

          <div className="mt-3 flex items-start gap-3 rounded-xl border border-[hsl(var(--cta-orange))]/40 bg-[hsl(var(--cta-orange))]/10 px-4 py-3.5">
            <AlertCircle className="h-5 w-5 text-[hsl(var(--cta-orange))] mt-0.5 flex-shrink-0" />
            <p className="text-sm text-foreground">
              <span className="font-semibold text-secondary">Bitte beachten:</span> Kurzzeitkennzeichen
              und Ausfuhrkennzeichen bieten wir nicht an.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 bg-muted/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="section-title mb-4">Häufige Fragen</h2>
            <p className="section-subtitle">Alles Wichtige zu Sofort-Zulassung, Preisen und Ablauf</p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {generalFaqs.map((faq, index) => (
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

          <div className="mt-10 text-center">
            <p className="mb-4 text-muted-foreground">Alle Unterlagen beisammen? Dann direkt starten:</p>
            <Button size="lg" variant="cta" asChild>
              <Link to="/angebot">
                JETZT ZULASSUNG STARTEN
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

export default Faq;
