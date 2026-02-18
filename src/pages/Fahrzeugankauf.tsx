import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { CheckCircle, ArrowRight, Car, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import autoankaufHeroImage from "@/assets/autoankauf-hero.jpeg";

const Fahrzeugankauf = () => {
  const steps = [
    {
      title: "Ankauf-Interesse angeben",
      description:
        "Sie können Ihr Fahrzeug unabhängig von einer Zulassung direkt zum Verkauf anbieten.",
    },
    {
      title: "Kurze Fahrzeugbewertung",
      description:
        "Wir erfassen die wichtigsten Daten zu Ihrem Fahrzeug und bereiten eine faire Einschätzung vor.",
    },
    {
      title: "Angebot und Abwicklung",
      description:
        "Nach der Prüfung erhalten Sie auf Wunsch direkt ein Ankaufangebot und den nächsten Schritt zur Abwicklung.",
    },
  ];

  const benefits = [
    "Fahrzeugverkauf mit oder ohne Zulassung möglich",
    "Kein zusätzlicher Aufwand mit mehreren Ansprechpartnern",
    "Schnelle Ersteinschätzung bei Ihrem Termin",
    "Auch nicht fahrbereite Fahrzeuge können wir für Sie fachgerecht verwerten lassen",
    "Persönliche Betreuung in Bad Salzuflen und Umgebung",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Fahrzeugankauf in Bad Salzuflen | Mit oder ohne Zulassung"
        description="Fahrzeugverkauf in Bad Salzuflen mit oder ohne Zulassung: schnelle Ersteinschätzung, faire Ankaufprüfung und auf Wunsch kostenlose Abmeldung."
        path="/fahrzeugankauf"
        image="/favicon.ico"
      />
      <Header />

      <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-bold mb-6">
                Fahrzeugankauf mit oder ohne Zulassung
              </h1>
              <p className="text-xl text-primary-foreground/90 mb-8">
                Sie möchten Ihr altes Fahrzeug verkaufen? Das ist bei uns auch ohne
                Zulassung möglich. Auf Wunsch kombinieren wir den Ankauf zusätzlich mit
                An-, Um- oder Abmeldung.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="cta-large" asChild>
                  <Link to="/angebot?ankauf=1">
                    Jetzt Fahrzeug verkaufen
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-cyan-400 hover:bg-white hover:text-secondary"
                  asChild
                >
                  <a href="tel:+4915142462280">
                    <Phone className="mr-2 h-5 w-5" />
                    +4915142462280
                  </a>
                </Button>
              </div>
            </div>

            <div
              role="img"
              aria-label="Fahrzeugankauf in Bad Salzuflen - Auto verkaufen mit oder ohne Zulassung"
              className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-sm min-h-[320px] lg:min-h-[360px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-cyan-200/10" />
              <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8">
                <div className="rounded-2xl border border-cyan-100/30 bg-white/95 p-2 shadow-lg">
                  <img
                    src={autoankaufHeroImage}
                    alt="Fahrzeugankauf: Auto-Verkauf mit Beratung und schneller Abwicklung"
                    className="w-full h-auto rounded-xl object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-3">
              So funktioniert der Ankauf bei uns
            </h2>
            <p className="text-muted-foreground">
              Sie entscheiden selbst: nur Fahrzeugverkauf oder Kombination mit Zulassung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <Card key={step.title} className="border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center mb-3">
                    {index + 1}
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-secondary mb-5">
                Ihre Vorteile beim Fahrzeugankauf
              </h3>
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-trust-green mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-secondary">
                  <Car className="h-6 w-6 text-primary" />
                  Jetzt kombinieren
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  Beauftragen Sie Ihre Zulassung und markieren Sie im Formular
                  direkt, dass Sie Ihr Fahrzeug verkaufen möchten – oder wählen Sie
                  nur den Fahrzeugverkauf ohne Paket. Bei
                  nicht fahrbereiten Fahrzeugen unterstützen wir Sie zusätzlich bei der
                  Verwertung.
                </p>
                <Button variant="cta" className="w-full" asChild>
                  <Link to="/angebot?ankauf=1">Zum Auftragsformular</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Fahrzeugankauf;
