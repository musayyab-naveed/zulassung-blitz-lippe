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
import GewerbeAnfrage from "@/components/GewerbeAnfrage";
import { vorgangChecklists } from "@/content/faqs";
import type { LeistungsSeite } from "@/content/leistungsseiten";
import { ArrowRight, CheckCircle, MapPin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Checkliste = ({ schluessel }: { schluessel: string }) => {
  const liste = vorgangChecklists.find((eintrag) => eintrag.key === schluessel);
  if (!liste) return null;
  return (
    <div>
      <h3 className="mb-3 font-bold text-secondary">{liste.title}</h3>
      <ul className="space-y-2">
        {liste.items.map((punkt) => (
          <li key={punkt} className="flex items-start gap-2 text-sm text-secondary">
            <CheckCircle className="mt-0.5 h-4 w-4 flex-none text-trust-green" />
            <span>{punkt}</span>
          </li>
        ))}
      </ul>
      {liste.hint && <p className="mt-3 text-xs text-muted-foreground">{liste.hint}</p>}
    </div>
  );
};

/** Gemeinsame Vorlage für Abmelden, Ummelden, Wunschkennzeichen und Gewerbekunden */
const Leistungsseite = ({ seite }: { seite: LeistungsSeite }) => {
  return (
    <div className="min-h-screen bg-background">
      <Seo path={seite.path} />
      <Header />

      {/* Kopfbereich */}
      <section className="relative overflow-hidden py-14 text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/80">
            {seite.kicker}
          </p>
          <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl">{seite.h1}</h1>
          <p className="mx-auto max-w-3xl text-lg text-primary-foreground/90">{seite.intro}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {seite.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-xs font-semibold sm:text-sm"
              >
                {chip}
              </span>
            ))}
          </div>
          <div className="mt-8">
            <Button size="lg" variant="cta-large" asChild>
              <Link to={seite.cta.href}>
                {seite.cta.button}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Preis + Unterlagen */}
      <section className="py-14">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {seite.faelle ? (
            <>
              <h2 className="section-title mb-8 text-center">Welcher Fall passt zu Ihnen?</h2>
              <div className={`grid grid-cols-1 gap-5 ${seite.faelle.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
                {seite.faelle.map((fall) => (
                  <Card key={fall.titel} className="surface-card flex flex-col">
                    <CardContent className="flex flex-1 flex-col p-5">
                      <div className="mb-1 text-xs font-bold uppercase tracking-wider text-link">
                        {fall.preis}
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-secondary">{fall.titel}</h3>
                      <p className="mb-4 text-sm text-muted-foreground">{fall.text}</p>
                      <div className="mb-5 flex-1 rounded-xl bg-muted/40 p-4">
                        <Checkliste schluessel={fall.checkliste} />
                      </div>
                      <Button variant="outline" asChild>
                        <Link to={fall.link}>
                          {fall.linkText}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="mt-6 text-center text-sm text-muted-foreground">{seite.preis.text}</p>
            </>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
              {seite.anfrage ? (
                <Card className="surface-card md:col-span-3">
                  <CardContent className="p-6">
                    <h2 className="mb-1 text-xl font-bold text-secondary">Partner werden – Anfrage senden</h2>
                    <p className="mb-5 text-sm text-muted-foreground">
                      Kurz ausfüllen, wir melden uns persönlich und besprechen die Konditionen.
                    </p>
                    <GewerbeAnfrage />
                  </CardContent>
                </Card>
              ) : (
              <Card className="surface-card md:col-span-2">
                <CardContent className="p-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-link">Preis</div>
                  <div className="my-2 text-4xl font-bold text-secondary">{seite.preis.betrag}</div>
                  <p className="text-sm text-muted-foreground">{seite.preis.text}</p>
                  <Link
                    to="/preise"
                    className="mt-4 inline-block text-sm font-semibold text-link hover:underline"
                  >
                    Alle Preise ansehen
                  </Link>
                </CardContent>
              </Card>
              )}
              <Card className={`surface-card ${seite.anfrage ? "md:col-span-2" : "md:col-span-3"}`}>
                <CardContent className="space-y-6 p-6">
                  <h2 className="text-xl font-bold text-secondary">Das bringen Sie mit</h2>
                  {seite.checklisten?.map((schluessel) => (
                    <Checkliste key={schluessel} schluessel={schluessel} />
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Ablauf */}
      <section className="bg-muted/50 py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-8 text-center">{seite.schritteTitel}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {seite.schritte.map((schritt, index) => (
              <div key={schritt.titel} className="rounded-xl border border-border bg-background p-5">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-secondary">{schritt.titel}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{schritt.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fachinhalte */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl space-y-10 px-4 sm:px-6 lg:px-8">
          {seite.abschnitte.map((abschnitt) => (
            <div key={abschnitt.titel}>
              <h2 className="mb-3 text-2xl font-bold text-secondary">{abschnitt.titel}</h2>
              {abschnitt.text && <p className="text-muted-foreground">{abschnitt.text}</p>}
              {abschnitt.punkte && (
                <ul className="space-y-2">
                  {abschnitt.punkte.map((punkt) => (
                    <li key={punkt} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle className="mt-1 h-4 w-4 flex-none text-trust-green" />
                      <span>{punkt}</span>
                    </li>
                  ))}
                </ul>
              )}
              {abschnitt.link && (
                <Link
                  to={abschnitt.link.href}
                  className="mt-3 inline-flex items-center gap-1 font-semibold text-link hover:underline"
                >
                  {abschnitt.link.text}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-muted/50 py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="section-title mb-8 text-center">{seite.faqTitel}</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {seite.faqs.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
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
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="section-title mb-4">{seite.cta.titel}</h2>
          <p className="section-subtitle mx-auto mb-6 max-w-2xl">{seite.cta.text}</p>
          <Button size="lg" variant="cta-large" asChild>
            <Link to={seite.cta.href}>
              <MessageCircle className="mr-2 h-5 w-5" />
              {seite.cta.button}
            </Link>
          </Button>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            Werler Straße 68, 32105 Bad Salzuflen · Mo–Fr 9–18 Uhr · Sa 15–18 Uhr
          </p>

          <div className="mt-10 border-t border-border pt-8">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Das könnte Sie auch interessieren
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {seite.verwandt.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-secondary hover:border-primary hover:text-primary"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Leistungsseite;
