import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PriceCard from "@/components/PriceCard";
import GoogleReviews from "@/components/GoogleReviews";
import Seo from "@/components/Seo";
import heroImage from "@/assets/hero-image-optimized.jpg";
import { blogPosts } from "@/content/blogPosts";
import { Clock, FileText, Shield, CheckCircle, ArrowRight, Phone, MapPin, Mail, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import type { MouseEvent } from "react";

const Home = () => {
  const scrollToPackages = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById("pakete-focus");
    if (!target) return;
    const header = document.querySelector("header");
    const headerHeight = header ? header.getBoundingClientRect().height : 120;
    const top = window.scrollY + target.getBoundingClientRect().top - headerHeight - 24;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const steps = [
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Auftrag erstellen",
      description:
        "Einfach online beauftragen und Wunschkennzeichen auswählen. Wir übernehmen den Rest.",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Dokumente übermitteln",
      description:
        "Vorbeibringen, zusenden oder von uns abholen lassen. Sicher und unkompliziert.",
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "Zulassung innerhalb von 24h",
      description:
        "Ihre Zulassung erfolgt am nächsten Werktag. Rückversand oder Abholung inklusive.",
    },
  ];

  const services = [
    "KFZ-Zulassung (Neu & Gebraucht)",
    "Fahrzeugankauf",
    "Abmeldung",
    "Umschreibung",
    "Kennzeichen-Reservierung",
    "Hol- und Bringservice",
  ];

  const pricePackages = [
    {
      title: "BASIS",
      price: "129 €",
      features: [
        "Zulassung innerhalb von 24h",
        "Inkl. Euro-Kennzeichen",
        "Wunschkennzeichen (+13 €)",
        "Verwaltungsgebühren inkl.",
        "Sie bringen Unterlagen zu uns",
        "Altfahrzeug? Wir kaufen es auf Wunsch direkt mit an",
        "Abmeldung beim Ankauf gratis - keine Zusatzgebühr",
      ],
      buttonText: "BASIS PAKET BESTELLEN",
      buttonVariant: "cta" as const,
      ctaHref: "/angebot?paket=basis",
    },
    {
      title: "PREMIUM",
      price: "159 €",
      popular: true,
      features: [
        "Alles vom BASIS",
        "Express-Rückversand inklusive",
        "Wir holen und bringen die Unterlagen",
        "Altfahrzeug? Wir kaufen es auf Wunsch direkt mit an",
        "Abmeldung beim Ankauf gratis - keine Zusatzgebühr",
      ],
      buttonText: "PREMIUM PAKET BESTELLEN",
      buttonVariant: "cta" as const,
      ctaHref: "/angebot?paket=premium",
    },
    {
      title: "ABMELDUNG",
      price: "30 €",
      features: [
        "Abmeldung innerhalb 24h",
        "Verwaltungsgebühren inkl.",
        "Altfahrzeug? Wir kaufen es auf Wunsch direkt mit an",
        "Abmeldung beim Ankauf gratis - keine Zusatzgebühr",
      ],
      buttonText: "ONLINE BEANTRAGEN",
      buttonVariant: "cta" as const,
      ctaHref: "/angebot?paket=abmeldung",
    },
    {
      title: "FAHRZEUGANKAUF",
      price: "Kostenlos",
      features: [
        "Unverbindliche Ersteinschätzung",
        "Faire Ankaufprüfung vor Ort",
        "Kostenlose Abmeldung bei Ankauf",
        "Abholung des Fahrzeugs möglich",
        "Nicht fahrbereites Fahrzeug? Fachgerechte Verwertung möglich",
      ],
      buttonText: "ANKAUF ANFRAGEN",
      buttonVariant: "cta" as const,
      ctaHref: "/fahrzeugankauf",
    },
  ];

  const latestPosts = blogPosts.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Zulassungsdienst Bad Salzuflen | KFZ-Zulassung in 24h"
        description="KFZ-Zulassung in Bad Salzuflen und Kreis Lippe: Anmelden, Ummelden, Abmelden innerhalb von 24 Stunden. Optional mit Fahrzeugankauf."
        path="/"
        image="/favicon.ico"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "KFZ-Sofortzulassung",
          image: "/favicon.ico",
          telephone: "+49 1514 2462280",
          email: "info@sofortzulassung.com",
          address: {
            "@type": "PostalAddress",
            streetAddress: "Werler Straße 68",
            postalCode: "32105",
            addressLocality: "Bad Salzuflen",
            addressCountry: "DE",
          },
          areaServed: "Kreis Lippe",
          url: "/",
        }}
      />
      <Header />

      <section className="relative overflow-hidden py-16 sm:py-20 text-primary-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-secondary to-primary" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-12 left-[8%] h-24 w-24 rounded-full bg-white/40 blur-2xl" />
          <div className="absolute bottom-10 right-[10%] h-44 w-44 rounded-full bg-cyan-200/60 blur-3xl" />
          <div className="absolute top-[38%] left-[30%] h-20 w-20 rounded-full bg-white/30 blur-xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left relative z-20 stagger-in">
              <p className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs sm:text-sm font-semibold tracking-wide mb-5 text-primary-foreground">
                Vor Ort in Bad Salzuflen
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight text-white">
                Einfach. Schnell. Ohne Wartezeit.
              </h1>
              <p className="text-lg sm:text-xl mb-4 text-primary-foreground/90">
                Online-Zulassung für den Kreis Lippe inkl. 2 Kennzeichen
              </p>
              <p className="text-base sm:text-lg mb-8 text-primary-foreground/80">
                Zulassung innerhalb von 24 Stunden garantiert
              </p>

              <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 justify-center lg:justify-start">
                <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-primary-foreground">
                  ✓ Zulassung in 24 Stunden
                </div>
                <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-primary-foreground">
                  ✓ Kein Behördengang
                </div>
                <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-primary-foreground">
                  ✓ Kein Stress
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 justify-center lg:justify-start relative z-30">
                <Button size="lg" variant="cta-large" asChild>
                  <a href="#pakete" onClick={scrollToPackages}>
                    JETZT BEAUFTRAGEN
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="cta-large"
                  asChild
                >
                  <Link to="/fahrzeugankauf">
                    FAHRZEUGANKAUF
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
              <p className="mt-4 text-sm sm:text-base text-primary-foreground/85">
                Sie möchten Ihr altes Fahrzeug verkaufen? Klicken Sie direkt auf
                {" "}
                <span className="font-semibold text-white">Fahrzeugankauf</span>.
                Auch nicht fahrbereite Fahrzeuge lassen wir fachgerecht verwerten.
              </p>
            </div>

            <div className="relative mt-8 lg:mt-0 z-10 stagger-in stagger-delay-2">
              <div className="relative">
                <div className="relative z-10">
                  <img
                    src={heroImage}
                    alt="KFZ-Sofortzulassung Service"
                    width={1536}
                    height={1152}
                    className="w-full max-w-md mx-auto lg:max-w-lg rounded-2xl border border-white/20 shadow-2xl"
                  />
                </div>

                <div className="absolute -top-6 -right-6 bg-white rounded-2xl p-4 shadow-xl z-20 hidden sm:block">
                  <div className="flex items-center gap-2">
                    <Clock className="h-6 w-6 text-[hsl(var(--cta-orange))]" />
                    <div>
                      <div className="text-2xl font-bold text-secondary">24h</div>
                      <div className="text-xs text-muted-foreground">Garantiert</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-3 shadow-lg z-20 hidden sm:block">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-trust-green" />
                    <span className="text-sm font-medium text-secondary">Volldigital</span>
                  </div>
                </div>

                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/10 rounded-full blur-3xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoogleReviews />

      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 stagger-in">
            <h2 className="section-title mb-4">Ablauf in 3 einfachen Schritten</h2>
            <p className="section-subtitle">So einfach ist Ihre KFZ-Zulassung mit uns</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {steps.map((step, index) => (
              <Card key={index} className="surface-card text-center">
                <CardHeader className="pb-3">
                  <div className="mx-auto w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    {step.icon}
                  </div>
                  <div className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-3 text-xs font-bold">
                    {index + 1}
                  </div>
                  <CardTitle className="text-lg text-secondary">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 stagger-in">
            <h2 className="section-title mb-4">Unsere Leistungen</h2>
            <p className="section-subtitle">Alles rund um Ihre Fahrzeugzulassung</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service, index) => (
              <div key={index} className="surface-soft p-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-trust-green" />
                  <span className="font-medium text-secondary">{service}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
            <div>
              <h2 className="section-title mb-2">Ratgeber & Blog</h2>
              <p className="section-subtitle">
                Hilfreiche Beiträge für Zulassung, Abmeldung und Fahrzeugverkauf
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/blog">Alle Artikel ansehen</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Card key={post.slug} className="surface-card h-full flex flex-col">
                <CardHeader>
                  <p className="text-xs font-semibold text-primary uppercase tracking-wide">{post.category}</p>
                  <CardTitle className="text-xl leading-snug">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-1">
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{post.excerpt}</p>
                  <p className="text-xs text-muted-foreground inline-flex items-center gap-1 mb-4">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {post.publishedAt}
                  </p>
                  <Button variant="cta" asChild className="w-full">
                    <Link to={`/blog/${post.slug}`}>
                      Artikel lesen
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 scroll-mt-28 lg:scroll-mt-40" id="pakete">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="surface-soft p-6 sm:p-8">
          <div className="text-center mb-10" id="pakete-focus">
            <h2 className="section-title mb-4">Preisübersicht</h2>
            <p className="section-subtitle">Transparente Preise - keine versteckten Kosten</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6" id="pakete-grid">
            {pricePackages.map((pkg, index) => (
              <PriceCard
                key={index}
                title={pkg.title}
                price={pkg.price}
                popular={pkg.popular}
                features={pkg.features}
                buttonText={pkg.buttonText}
                buttonVariant={pkg.buttonVariant}
                ctaHref={pkg.ctaHref}
              />
            ))}
          </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="section-title mb-4">Besuchen Sie uns</h2>
            <p className="section-subtitle">
              Finden Sie uns in Bad Salzuflen, im Herzen des Kreises Lippe
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="surface-card overflow-hidden p-1">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2451.8275759481676!2d8.729726099999997!3d52.0828686!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47ba15cba7259a3b%3A0xcbf86083359865e5!2sKFZ-Sofortzulassung%20-%20Zulassungsdienst%2C%20Zulassungsservice%20und%20Kennzeichen!5e0!3m2!1sen!2sde!4v1761654634034!5m2!1sen!2sde"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[400px]"
                title="KFZ-Sofortzulassung Standort auf Google Maps"
              />
            </div>

            <div className="surface-card p-6 space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-secondary mb-4">Wir sind direkt vor Ort für Sie da</h3>
                <p className="text-muted-foreground mb-6">
                  Kommen Sie gerne vorbei oder kontaktieren Sie uns für eine persönliche Beratung.
                  Unser Zulassungsdienst in Bad Salzuflen ist zentral im Kreis Lippe gelegen und leicht zu erreichen.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-secondary">Adresse</h4>
                    <p className="text-muted-foreground">
                      Werler Straße 68
                      <br />
                      32105 Bad Salzuflen
                      <br />
                      Deutschland
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-secondary">Telefon</h4>
                    <a href="tel:+4915142462280" className="text-primary hover:underline">
                      +4915142462280
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-secondary">E-Mail</h4>
                    <a href="mailto:info@sofortzulassung.com" className="text-primary hover:underline">
                      info@sofortzulassung.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button size="lg" variant="cta" className="w-full sm:w-auto" asChild>
                  <Link to="/angebot?paket=premium">
                    JETZT BEAUFTRAGEN
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
