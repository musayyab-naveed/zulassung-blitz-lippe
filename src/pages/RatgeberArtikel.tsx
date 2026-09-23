import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { RATGEBER_PFAD, findeArtikel, ratgeberPfad } from "@/content/ratgeber";
import NotFound from "@/pages/NotFound";
import { ArrowRight, CheckCircle, ChevronRight, MessageCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const datumLesbar = (iso: string) => {
  const [jahr, monat, tag] = iso.split("-");
  return `${tag}.${monat}.${jahr}`;
};

const RatgeberArtikel = () => {
  const { slug } = useParams();
  const artikel = findeArtikel(slug);
  if (!artikel) return <NotFound />;

  return (
    <div className="min-h-screen bg-background">
      <Seo path={ratgeberPfad(artikel.slug)} />
      <Header />

      <article>
        <header className="bg-muted/40 py-10 sm:py-14">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Brotkrumen" className="mb-4 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
              <Link to="/" className="hover:text-link">Startseite</Link>
              <ChevronRight className="h-4 w-4" />
              <Link to={RATGEBER_PFAD} className="hover:text-link">Ratgeber</Link>
            </nav>
            <h1 className="mb-4 text-3xl font-bold leading-tight text-secondary sm:text-4xl">{artikel.h1}</h1>
            <p className="text-sm text-muted-foreground">
              Von KFZ-Sofortzulassung, Bad Salzuflen · Stand: {datumLesbar(artikel.aktualisiert)} ·{" "}
              {artikel.lesezeitMinuten} Min. Lesezeit
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
          {/* Die kurze Antwort zuerst – für eilige Leser, Google und KI */}
          <div className="mb-10 rounded-2xl border-l-4 border-primary bg-primary/5 p-5">
            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-link">Kurz gesagt</p>
            <p className="text-secondary">{artikel.kurzantwort}</p>
          </div>

          <div className="space-y-10">
            {artikel.abschnitte.map((abschnitt) => (
              <section key={abschnitt.titel}>
                <h2 className="mb-3 text-2xl font-bold text-secondary">{abschnitt.titel}</h2>
                {abschnitt.absaetze?.map((absatz) => (
                  <p key={absatz} className="mb-3 leading-relaxed text-muted-foreground">
                    {absatz}
                  </p>
                ))}
                {abschnitt.punkte && (
                  <ul className="mb-3 space-y-2">
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
                    className="inline-flex items-center gap-1 font-semibold text-link hover:underline"
                  >
                    {abschnitt.link.text}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </section>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-secondary p-6 text-center text-primary-foreground">
            <p className="mb-4 text-lg font-semibold text-white">{artikel.cta.text}</p>
            <Button size="lg" variant="cta-large" asChild>
              <Link to={artikel.cta.href}>
                <MessageCircle className="mr-2 h-5 w-5" />
                {artikel.cta.button}
              </Link>
            </Button>
            <p className="mt-4 text-sm text-primary-foreground/80">
              Werler Straße 68, 32105 Bad Salzuflen · Mo–Fr 9–18 Uhr · Sa 15–18 Uhr
            </p>
          </div>

          <div className="mt-10">
            <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Weiterlesen
            </h2>
            <div className="flex flex-wrap gap-3">
              {artikel.verwandt.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-secondary hover:border-primary hover:text-link"
                >
                  {link.text}
                </Link>
              ))}
              <Link
                to={RATGEBER_PFAD}
                className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-secondary hover:border-primary hover:text-link"
              >
                Alle Ratgeber-Artikel
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default RatgeberArtikel;
