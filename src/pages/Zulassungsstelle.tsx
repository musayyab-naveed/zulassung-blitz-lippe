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
  AMT_QUELLE,
  AMT_REGELN,
  AMT_STANDORTE,
  AMT_ZEITEN,
  VERGLEICH,
  ZST_FAQS,
} from "@/content/zulassungsstelle";
import { ArrowRight, Check, Clock, Info, MapPin, Minus, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Zulassungsstelle = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        path="/zulassungsstelle-bad-salzuflen"
      />
      <Header />

      {/* Kopfbereich */}
      <section className="relative overflow-hidden py-14 text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Zulassungsstelle Bad Salzuflen: Termine, Öffnungszeiten – und der Weg ohne Termin
          </h1>
          <p className="text-lg text-primary-foreground/90">
            Alle Angaben zum Straßenverkehrsamt Kreis Lippe auf einen Blick. Und daneben ehrlich:
            wann sich der Gang zum Amt lohnt und wann ein Zulassungsdienst die bessere Wahl ist.
          </p>
        </div>
      </section>

      {/* Klarstellung: wer wir sind */}
      <section className="py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Card className="border-l-4 border-l-muted-foreground/40">
            <CardContent className="flex items-start gap-4 p-5">
              <Info className="mt-0.5 h-5 w-5 flex-none text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-secondary">Damit es keine Verwechslung gibt:</span>{" "}
                Wir sind <b>nicht</b> das Straßenverkehrsamt und gehören nicht zum Kreis Lippe.
                KFZ-Sofortzulassung ist ein privater Zulassungsdienst in Bad Salzuflen, der den
                Behördengang für Sie übernimmt. Diese Seite fasst die offiziellen Angaben des
                Kreises zusammen, damit Sie nicht suchen müssen.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Fakten zum Amt */}
      <section className="pb-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-6 text-center">
            Das Straßenverkehrsamt Kreis Lippe in Zahlen
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="p-5">
                <div className="mb-2 flex items-center gap-2 text-primary">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Adresse</span>
                </div>
                <p className="font-semibold text-secondary">Zulassungsstelle Bad Salzuflen</p>
                <p className="text-sm text-muted-foreground">Louis-Uekermann-Weg 2</p>
                <p className="text-sm text-muted-foreground">32107 Bad Salzuflen</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-5">
                <div className="mb-2 flex items-center gap-2 text-primary">
                  <Phone className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider">Telefon</span>
                </div>
                <p className="font-semibold text-secondary">+49 5231 62-1800</p>
                <p className="text-sm text-muted-foreground">
                  Erreichbar Mo–Fr ab 9:00 Uhr, nachmittags nur Di, Mi und Do
                </p>
              </CardContent>
            </Card>
          </div>

          <h3 className="mb-3 mt-8 flex items-center gap-2 text-lg font-bold text-secondary">
            <Clock className="h-5 w-5 text-primary" />
            Zeiten, zu denen Termine vergeben werden
          </h3>
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[420px] text-sm">
              <thead>
                <tr className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3 font-bold">Tag</th>
                  <th className="px-4 py-3 font-bold">Vormittags</th>
                  <th className="px-4 py-3 font-bold">Nachmittags</th>
                </tr>
              </thead>
              <tbody>
                {AMT_ZEITEN.map((zeile) => {
                  const zu = zeile.vormittags === "geschlossen";
                  return (
                    <tr
                      key={zeile.tag}
                      className={`border-t border-border ${zu ? "bg-muted/30 text-muted-foreground" : ""}`}
                    >
                      <td className="px-4 py-3 font-semibold text-secondary">{zeile.tag}</td>
                      <td className="px-4 py-3">{zeile.vormittags}</td>
                      <td className="px-4 py-3">{zeile.nachmittags}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Quelle: {AMT_QUELLE.name}, abgerufen am {AMT_QUELLE.abgerufen}. Ohne Gewähr – bitte vor
            einem Besuch beim Kreis Lippe gegenprüfen.
          </p>

          <h3 className="mb-3 mt-8 text-lg font-bold text-secondary">
            Die drei Zulassungsstellen im Kreis Lippe
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {AMT_STANDORTE.map((ort) => (
              <div key={ort.ort} className="rounded-xl border border-border bg-muted/30 p-4">
                <div className="font-semibold text-secondary">{ort.ort}</div>
                <div className="mt-1 text-sm text-muted-foreground">{ort.adresse}</div>
                {ort.hinweis && (
                  <div className="mt-1 text-xs text-muted-foreground">({ort.hinweis})</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regeln des Amts */}
      <section className="bg-muted/50 py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="section-title mb-4">Sieben Regeln, die viele erst vor Ort erfahren</h2>
            <p className="section-subtitle">
              Alles davon steht so im Serviceportal des Kreises – man muss es nur finden.
            </p>
          </div>

          <div className="space-y-3">
            {AMT_REGELN.map((regel, index) => (
              <div
                key={regel.titel}
                className="flex items-start gap-4 rounded-xl border border-border bg-background p-5"
              >
                <div className="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-semibold text-secondary">{regel.titel}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{regel.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vergleich */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="section-title mb-4">Selbst zum Amt oder über uns?</h2>
            <p className="section-subtitle">
              Beide Wege führen zum Ziel. Hier steht, worin sie sich unterscheiden – auch da,
              wo das Amt günstiger ist.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-4 py-3 font-bold">Merkmal</th>
                  <th className="px-4 py-3 font-bold">Zulassungsstelle</th>
                  <th className="px-4 py-3 font-bold">KFZ-Sofortzulassung</th>
                </tr>
              </thead>
              <tbody>
                {VERGLEICH.map((zeile) => (
                  <tr key={zeile.merkmal} className="border-t border-border">
                    <td className="px-4 py-3 font-semibold text-secondary">{zeile.merkmal}</td>
                    <td className="px-4 py-3 text-muted-foreground">{zeile.amt}</td>
                    <td className="px-4 py-3">
                      <span className="flex items-start gap-2">
                        {zeile.vorteilWir ? (
                          <Check className="mt-0.5 h-4 w-4 flex-none text-trust-green" />
                        ) : (
                          <Minus className="mt-0.5 h-4 w-4 flex-none text-muted-foreground" />
                        )}
                        <span
                          className={
                            zeile.vorteilWir ? "font-medium text-secondary" : "text-muted-foreground"
                          }
                        >
                          {zeile.wir}
                        </span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Card className="mt-6 border-l-4 border-l-primary">
            <CardContent className="p-5">
              <h3 className="mb-2 font-bold text-secondary">Wann sich der Gang zum Amt lohnt</h3>
              <p className="text-sm text-muted-foreground">
                Ganz ehrlich: Wenn Sie zeitlich flexibel sind, vormittags unter der Woche Zeit haben
                und einen Termin in den nächsten zwei Wochen bekommen, ist der Weg zum
                Straßenverkehrsamt der günstigere. Sie zahlen dann nur die Verwaltungsgebühren.
                Unser Angebot lohnt sich, wenn Sie arbeiten, es eilig haben, samstags Zeit haben
                oder gar nicht erst suchen wollen, welcher Termin noch frei ist.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Unser Weg */}
      <section className="bg-muted/50 py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="section-title mb-4">Der Weg ohne Termin – so läuft er ab</h2>
            <p className="section-subtitle">Drei Schritte, keine Wartenummer</p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                nr: "1",
                titel: "Vorbeikommen oder schreiben",
                text: "Montag bis Freitag 9–18 Uhr, Samstag 15–18 Uhr. Oder vorher kurz per WhatsApp Bescheid geben.",
              },
              {
                nr: "2",
                titel: "Wir erledigen den Behördengang",
                text: "Digital in ca. 20 Minuten, oder klassisch bis zum nächsten Werktag – inklusive Kennzeichen.",
              },
              {
                nr: "3",
                titel: "Papiere abholen und losfahren",
                text: "Sie waren nie bei der Zulassungsstelle, haben keinen Termin gebraucht und keine Wartenummer gezogen.",
              },
            ].map((s) => (
              <div key={s.nr} className="rounded-xl border border-border bg-background p-5">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {s.nr}
                </div>
                <h3 className="font-semibold text-secondary">{s.titel}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Welche Unterlagen Sie brauchen, steht in den{" "}
            <Link to="/faq" className="font-semibold text-link hover:underline">
              Checklisten
            </Link>
            . Ohne{" "}
            <Link to="/evb-nummer" className="font-semibold text-link hover:underline">
              eVB-Nummer
            </Link>{" "}
            geht es weder beim Amt noch bei uns. Was es kostet, steht auf der{" "}
            <Link to="/preise" className="font-semibold text-link hover:underline">
              Preisübersicht
            </Link>
            .
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="section-title mb-4">Häufige Fragen zur Zulassungsstelle</h2>
            <p className="section-subtitle">Kurz beantwortet, mit Angabe der Quelle</p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {ZST_FAQS.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`zst-${index}`}
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
      <section className="pb-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="section-title mb-4">Keinen Termin bekommen? Dann kommen Sie zu uns</h2>
          <p className="section-subtitle mx-auto mb-6 max-w-2xl">
            Werler Straße 68 in Bad Salzuflen – Mo bis Fr von 9 bis 18 Uhr, samstags von 15 bis
            18 Uhr. Ohne Termin, ohne Wartenummer.
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

export default Zulassungsstelle;
