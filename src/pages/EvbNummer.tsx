import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  EVB_ECKDATEN,
  EVB_FAQS,
  EVB_FEHLER,
  EVB_KURZANTWORT,
  EVB_VORGAENGE,
} from "@/content/evb";
import { SITE_URL } from "@/content/seoRoutes";
import { AlertCircle, ArrowRight, Check, MessageCircle, ShieldCheck, X } from "lucide-react";
import { Link } from "react-router-dom";

const WHATSAPP_EVB_URL =
  "https://wa.me/4915142462280?text=" +
  encodeURIComponent(
    "Hallo, ich habe eine Frage zu meiner eVB-Nummer für die Zulassung.\n\nIch hänge gleich ein Foto meiner Unterlagen an."
  );

const EvbNummer = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        path="/evb-nummer"
        structuredData={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "FAQPage",
              "@id": `${SITE_URL}/evb-nummer#faq`,
              mainEntity: EVB_FAQS.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: { "@type": "Answer", text: faq.answer },
              })),
            },
          ],
        }}
      />
      <Header />

      {/* Kopfbereich */}
      <section className="relative overflow-hidden py-14 text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Die eVB-Nummer für die KFZ-Zulassung – einfach erklärt
          </h1>
          <p className="text-lg text-primary-foreground/90">
            Ohne eVB-Nummer geht keine Zulassung. Hier steht, was sie ist, wann Sie eine brauchen
            und woran es im Alltag am häufigsten scheitert – aus der täglichen Praxis unseres
            Zulassungsdienstes in Bad Salzuflen.
          </p>
        </div>
      </section>

      {/* Kurzantwort – bewusst ganz oben und sachlich formuliert */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Card className="border-l-4 border-l-primary shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <h2 className="mb-3 text-xl font-bold text-secondary">
                Was ist die eVB-Nummer? Die kurze Antwort
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">{EVB_KURZANTWORT}</p>
            </CardContent>
          </Card>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {EVB_ECKDATEN.map((eintrag) => (
              <div
                key={eintrag.label}
                className="rounded-xl border border-border bg-muted/40 p-4"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {eintrag.label}
                </div>
                <div className="mt-1 text-sm font-medium text-secondary">{eintrag.wert}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wann brauche ich eine eVB */}
      <section className="bg-muted/50 py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="section-title mb-4">Wann Sie eine eVB-Nummer brauchen</h2>
            <p className="section-subtitle">
              Die Faustregel: Immer dann, wenn ein Fahrzeug auf die Straße kommt.
              Geht es von der Straße, brauchen Sie keine.
            </p>
          </div>

          <div className="space-y-3">
            {EVB_VORGAENGE.map((eintrag) => (
              <div
                key={eintrag.vorgang}
                className="flex items-start gap-4 rounded-xl border border-border bg-background p-4"
              >
                <div
                  className={`mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full ${
                    eintrag.benoetigt ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {eintrag.benoetigt ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <X className="h-4 w-4" />
                  )}
                </div>
                <div>
                  <div className="font-semibold text-secondary">
                    {eintrag.vorgang}
                    <span className="ml-2 text-sm font-medium text-muted-foreground">
                      {eintrag.benoetigt ? "– eVB nötig" : "– keine eVB nötig"}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">{eintrag.beschreibung}</div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Welche Unterlagen Sie sonst noch brauchen, steht in den{" "}
            <Link to="/faq" className="font-semibold text-primary hover:underline">
              Checklisten im FAQ-Bereich
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Woher bekomme ich sie */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="section-title mb-4">Woher Sie die eVB-Nummer bekommen</h2>
            <p className="section-subtitle">
              Es gibt genau eine Quelle: Ihre KFZ-Versicherung.
            </p>
          </div>

          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-2 font-bold text-secondary">
                  Sie haben bereits eine KFZ-Versicherung
                </h3>
                <p className="text-sm text-muted-foreground">
                  Dann rufen Sie dort an oder schauen ins Kundenkonto beziehungsweise in die App.
                  Die eVB-Nummer kommt meist innerhalb weniger Minuten per SMS oder E-Mail. Sagen
                  Sie dazu, um welches Fahrzeug es geht und wer als Halter eingetragen wird.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-2 font-bold text-secondary">
                  Sie haben noch keine Versicherung für das Fahrzeug
                </h3>
                <p className="text-sm text-muted-foreground">
                  Dann schließen Sie zuerst eine KFZ-Versicherung ab – die eVB-Nummer bekommen Sie
                  dabei automatisch. Welche Versicherung Sie wählen, ist allein Ihre Entscheidung.
                  Wir beraten nicht zu Versicherungen und vermitteln auch keine.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-muted-foreground/30">
              <CardContent className="p-6">
                <h3 className="mb-2 font-bold text-secondary">
                  Von uns bekommen Sie keine eVB-Nummer
                </h3>
                <p className="text-sm text-muted-foreground">
                  Das wird oft gefragt, deshalb steht es hier klar: Ein Zulassungsdienst darf und
                  kann keine eVB ausstellen. Das können ausschließlich Versicherungen. Was wir
                  machen: Wir prüfen vorab kostenlos, ob Ihre eVB für Ihren Vorgang passt.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Häufige Fehler */}
      <section className="bg-muted/50 py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="section-title mb-4">Die fünf häufigsten Fehler</h2>
            <p className="section-subtitle">
              Genau diese Fälle erleben wir jede Woche am Tresen – und jeder davon kostet den
              Kunden eine zweite Fahrt.
            </p>
          </div>

          <div className="space-y-4">
            {EVB_FEHLER.map((fehler, index) => (
              <div
                key={fehler.titel}
                className="flex items-start gap-4 rounded-xl border border-border bg-background p-5"
              >
                <div className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-destructive/10 text-sm font-bold text-destructive">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-secondary">{fehler.titel}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{fehler.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kostenlose Prüfung per WhatsApp */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Card className="border-l-4 border-l-primary shadow-lg">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary/10 text-primary">
                  <AlertCircle className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="mb-2 text-xl font-bold text-secondary">
                    Unsicher, ob Ihre eVB passt? Wir prüfen das kostenlos
                  </h2>
                  <p className="mb-5 text-muted-foreground">
                    Schicken Sie uns ein Foto Ihrer Unterlagen per WhatsApp. Wir sagen Ihnen
                    innerhalb weniger Minuten, ob alles vollständig ist – bevor Sie sich auf den
                    Weg machen. Das kostet Sie nichts und Sie sparen sich im Zweifel eine zweite
                    Fahrt.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button size="lg" asChild className="bg-[#25D366] text-white hover:bg-[#1fb257]">
                      <a href={WHATSAPP_EVB_URL} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-5 w-5" />
                        Unterlagen per WhatsApp prüfen lassen
                      </a>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <a href="tel:+4915142462280">Lieber anrufen</a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/50 py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="section-title mb-4">Häufige Fragen zur eVB-Nummer</h2>
            <p className="section-subtitle">Kurz und ohne Fachchinesisch beantwortet</p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {EVB_FAQS.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`evb-${index}`}
                className="rounded-xl border border-border bg-background px-5"
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
        </div>
      </section>

      {/* Abschluss */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
            <ShieldCheck className="h-4 w-4" />
            Zulassungsdienst in Bad Salzuflen, Kreis Lippe
          </div>
          <h2 className="section-title mb-4">eVB beisammen? Dann kann es losgehen</h2>
          <p className="section-subtitle mx-auto mb-6 max-w-2xl">
            Mit gültiger eVB-Nummer erledigen wir Ihre Zulassung digital in ca. 20 Minuten – ohne
            Behördentermin und ohne Wartenummer. Was das kostet, steht auf der{" "}
            <Link to="/preise" className="font-semibold text-primary hover:underline">
              Preisübersicht
            </Link>
            .
          </p>
          <Button size="lg" variant="cta-large" asChild>
            <Link to="/angebot">
              JETZT ZULASSUNG STARTEN
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EvbNummer;
