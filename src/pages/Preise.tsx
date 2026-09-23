import Header from "@/components/Header";
import { BUSINESS } from "@/content/seoRoutes";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import PriceCard from "@/components/PriceCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  PACKAGES,
  EXTRAS,
  IM_PREIS_ENTHALTEN,
  NICHT_IM_ANGEBOT,
  PREIS_TABELLE,
  ZAHLUNGSARTEN,
  PREIS_FAQS,
  PREIS_VERGLEICH,
  buildOfferCatalog,
} from "@/content/preise";
import { SITE_URL } from "@/content/seoRoutes";
import { ArrowRight, Check, CheckCircle, Info, Minus, ShieldCheck, Star } from "lucide-react";
import { Link } from "react-router-dom";

const pricingPackages = PACKAGES.filter((pkg) => !pkg.hideOnPricingPage);

const Preise = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        path="/preise"
      />
      <Header />

      {/* Kopfbereich */}
      <section className="relative overflow-hidden py-14 text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Preise für die KFZ-Zulassung im Kreis Lippe
          </h1>
          <p className="text-lg text-primary-foreground/90">
            Alle Preise inklusive Verwaltungsgebühren. Keine Nachzahlung bei der Behörde,
            keine versteckten Kosten – Sie wissen vorher, was Sie zahlen.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-white">
              <ShieldCheck className="h-4 w-4" />
              Verwaltungsgebühren inklusive
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-white">
              <Star className="h-4 w-4" />
              5,0 ★ bei {BUSINESS.reviewCount} Google-Bewertungen
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-white">
              <CheckCircle className="h-4 w-4" />
              Montag bis Samstag geöffnet
            </span>
          </div>
        </div>
      </section>

      {/* Preisübersicht als Tabelle (mobil als Liste) */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="section-title mb-4">Preise auf einen Blick</h2>
            <p className="section-subtitle mx-auto max-w-2xl">
              Vier Wege zur Zulassung oder Abmeldung – Sie wählen, wie schnell es gehen soll
              und wie viel wir übernehmen.
            </p>
          </div>

          {/* Handy: gestapelte Liste – der Preis steht immer im Bild, kein Wischen nötig */}
          <div className="surface-card overflow-hidden rounded-2xl border md:hidden">
            {PREIS_TABELLE.map((zeile) => (
              <div key={zeile.leistung} className="border-b p-5 last:border-b-0">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-bold text-secondary">
                    {zeile.leistung}
                    {zeile.beliebt && (
                      <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                        beliebt
                      </span>
                    )}
                  </span>
                  <span
                    className={`whitespace-nowrap text-lg font-bold ${
                      zeile.kostenlos ? "text-trust-green" : "text-primary"
                    }`}
                  >
                    {zeile.preis}
                  </span>
                </div>
                <dl className="mt-2 space-y-1 text-sm">
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground">Fertig in:</dt>
                    <dd className="text-foreground">{zeile.dauer}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-muted-foreground">Kennzeichen:</dt>
                    <dd className="text-foreground">{zeile.kennzeichen}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>

          {/* Ab Tablet: klassische Tabelle */}
          <div className="surface-card hidden overflow-hidden rounded-2xl border md:block">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b bg-muted/60">
                  <th className="px-5 py-4 text-sm font-bold text-secondary">Leistung</th>
                  <th className="px-5 py-4 text-sm font-bold text-secondary">Fertig in</th>
                  <th className="px-5 py-4 text-sm font-bold text-secondary">Kennzeichen</th>
                  <th className="px-5 py-4 text-right text-sm font-bold text-secondary">Preis</th>
                </tr>
              </thead>
              <tbody>
                {PREIS_TABELLE.map((zeile) => (
                  <tr key={zeile.leistung} className="border-b last:border-b-0">
                    <td className="px-5 py-4">
                      <span className="font-bold text-secondary">{zeile.leistung}</span>
                      {zeile.beliebt && (
                        <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                          beliebt
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-sm text-foreground">{zeile.dauer}</td>
                    <td className="px-5 py-4 text-sm text-foreground">{zeile.kennzeichen}</td>
                    <td
                      className={`whitespace-nowrap px-5 py-4 text-right text-lg font-bold ${
                        zeile.kostenlos ? "text-trust-green" : "text-primary"
                      }`}
                    >
                      {zeile.preis}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Alle Preise inkl. Verwaltungsgebühren des Straßenverkehrsamts Kreis Lippe.
            Beim Fahrzeugankauf ist die Abmeldung gratis.
          </p>
        </div>
      </section>

      {/* Pakete im Detail */}
      <section className="bg-muted/50 py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="section-title mb-4">Was steckt in welchem Paket?</h2>
            <p className="section-subtitle mx-auto max-w-2xl">
              Der Unterschied liegt nicht im Ergebnis – zugelassen sind Sie überall.
              Er liegt darin, wie schnell es geht und wie viel Weg wir Ihnen abnehmen.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pricingPackages.map((pkg) => (
              <PriceCard
                key={pkg.key}
                title={pkg.title}
                price={pkg.price}
                subtitle={pkg.subtitle}
                popular={pkg.popular}
                features={pkg.features}
                highlight={pkg.highlight}
                buttonText={pkg.buttonText}
                buttonVariant={pkg.buttonVariant}
                ctaHref={`/angebot?paket=${pkg.key}&von=preise`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Preisvergleich: warum andere billiger aussehen */}
      <section className="bg-secondary py-14 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">
              Preise vergleichen – worauf Sie achten sollten
            </h2>
            <p className="mx-auto max-w-2xl text-primary-foreground/85">
              Unsere Preise sind Endpreise. Anderswo steht oft nur das Honorar des Dienstleisters,
              und die Gebühren kommen später dazu. Vier Fragen, mit denen Sie jedes Angebot
              vergleichen können.
            </p>
          </div>

          <div className="space-y-3">
            {PREIS_VERGLEICH.map((punkt, index) => (
              <div
                key={punkt.frage}
                className="rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-white">{punkt.frage}</h3>
                    <p className="mt-1 flex items-start gap-2 text-sm font-semibold text-white">
                      <Check className="mt-0.5 h-4 w-4 flex-none" />
                      Bei uns: {punkt.beiUns}
                    </p>
                    <p className="mt-1.5 text-sm text-primary-foreground/75">{punkt.hinweis}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-white/25 bg-white/10 p-5">
            <h3 className="font-bold text-white">Beispiel: Gebrauchtwagen mit Wunschkennzeichen</h3>
            <p className="mt-2 text-sm text-white">
              BASIS 129 € (mit Schildern und allen Gebühren) + Wunschkennzeichen 13 € ={" "}
              <span className="font-bold">142 € komplett</span>. Keine Versandkosten, keine
              Nachzahlung beim Amt, keine Online-Ausweisprüfung.
            </p>
          </div>

          <p className="mt-6 text-center text-sm text-primary-foreground/75">
            Rechnen Sie ruhig nach. Wir haben nichts zu verstecken – genau deshalb steht bei uns
            die volle Zahl und nicht die kleinste.
          </p>
        </div>
      </section>

      {/* Zusatzleistungen */}
      <section className="py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="section-title mb-4">Zusatzleistungen</h2>
            <p className="section-subtitle">
              Zwei Extras, beide freiwillig – mehr Aufpreise gibt es bei uns nicht.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {EXTRAS.map((extra) => (
              <Card key={extra.name} className="surface-card">
                <CardContent className="p-6">
                  <div className="mb-2 flex items-baseline justify-between gap-3">
                    <h3 className="text-lg font-bold text-secondary">{extra.name}</h3>
                    <span className="text-xl font-bold text-primary">{extra.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{extra.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enthalten / nicht enthalten */}
      <section className="bg-muted/50 py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="section-title mb-4">Was ist im Preis enthalten?</h2>
            <p className="section-subtitle mx-auto max-w-2xl">
              Damit Sie nicht raten müssen – hier steht beides: was drin ist und was nicht.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="surface-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-secondary">Im Preis enthalten</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5">
                  {IM_PREIS_ENTHALTEN.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-trust-green" />
                      <span className="text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="surface-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-secondary">Bieten wir nicht an</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2.5">
                  {NICHT_IM_ANGEBOT.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Minus className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground" />
                      <span className="text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-xl border border-primary/30 bg-primary/5 px-4 py-3.5">
            <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
            <p className="text-sm text-foreground">
              <span className="font-semibold text-secondary">Bezahlung:</span>{" "}
              {ZAHLUNGSARTEN.join(", ")} – bezahlt wird beim Termin, nicht vorab bei der
              Buchung. Welche Unterlagen Sie mitbringen müssen, steht{" "}
              <Link to="/faq" className="font-semibold text-link hover:underline">
                im FAQ-Bereich
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Preis-FAQ */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="section-title mb-4">Häufige Fragen zum Preis</h2>
            <p className="section-subtitle">Kurz und ohne Kleingedrucktes beantwortet</p>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {PREIS_FAQS.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`preis-faq-${index}`}
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
            <p className="mb-4 text-muted-foreground">
              Preis passt? Kein Termin nötig – in wenigen Fingertipps anfragen:
            </p>
            <Button size="lg" variant="cta-large" asChild>
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

export default Preise;
