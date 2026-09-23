import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { RATGEBER, RATGEBER_PFAD, ratgeberPfad } from "@/content/ratgeber";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

/** Übersicht aller Ratgeber-Artikel, neueste zuerst */
const Ratgeber = () => {
  const artikel = [...RATGEBER].sort((a, b) => b.veroeffentlicht.localeCompare(a.veroeffentlicht));

  return (
    <div className="min-h-screen bg-background">
      <Seo path={RATGEBER_PFAD} />
      <Header />

      <section className="relative overflow-hidden py-14 text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
            Ratgeber: Zulassung im Kreis Lippe einfach erklärt
          </h1>
          <p className="text-lg text-primary-foreground/90">
            Antworten auf die Fragen, die uns Kunden am häufigsten stellen – kurz, verständlich
            und ohne Behördendeutsch.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          {artikel.map((a) => (
            <Link
              key={a.slug}
              to={ratgeberPfad(a.slug)}
              className="surface-card group flex flex-col p-6 transition-colors hover:border-primary"
            >
              <h2 className="mb-2 text-xl font-bold text-secondary group-hover:text-link">{a.h1}</h2>
              <p className="mb-4 flex-1 text-sm text-muted-foreground">{a.kurzantwort}</p>
              <span className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1.5 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {a.lesezeitMinuten} Min. Lesezeit
                </span>
                <span className="flex items-center gap-1 font-semibold text-link">
                  Weiterlesen
                  <ArrowRight className="h-4 w-4" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Ratgeber;
