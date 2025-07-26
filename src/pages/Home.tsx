import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBadges from "@/components/TrustBadges";
import PriceCard from "@/components/PriceCard";
import { 
  Car, 
  Clock, 
  FileText, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Star,
  Phone
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const steps = [
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Auftrag erstellen",
      description: "Egal ob Auto oder Motorrad – online beauftragen und Wunschkennzeichen auswählen. Wir übernehmen den Rest."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Dokumente übermitteln",
      description: "Einfach vorbeibringen, zusenden oder von uns abholen lassen – sicher und bequem."
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: "Zulassung innerhalb von 24h",
      description: "Ihre Zulassung erfolgt am nächsten Werktag. Rückversand oder Abholung der fertigen Unterlagen inklusive."
    }
  ];

  const services = [
    "KFZ-Zulassung (Neu & Gebraucht)",
    "Motorrad-Zulassung",
    "Umschreibung",
    "Kennzeichen-Reservierung",
    "KFZ-Abmeldung",
    "Hol- und Bringservice"
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
        "Sie bringen Unterlagen zu uns"
      ],
      buttonText: "BASIS PAKET BESTELLEN"
    },
    {
      title: "PREMIUM",
      price: "159 €",
      popular: true,
      features: [
        "Alles vom BASIS",
        "Express-Rückversand inklusive",
        "Wir holen und bringen die Unterlagen"
      ],
      buttonText: "PREMIUM PAKET BESTELLEN",
      buttonVariant: "cta" as const
    },
    {
      title: "ABMELDUNG",
      price: "30 €",
      features: [
        "Abmeldung innerhalb 24h",
        "Verwaltungsgebühren inkl."
      ],
      buttonText: "ONLINE BEANTRAGEN"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-secondary text-primary-foreground py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                Einfach. Schnell. Ohne Wartezeit.
              </h1>
              <p className="text-xl mb-4 text-primary-foreground/90">
                Online-Zulassung für den Kreis Lippe – inkl. 2 Kennzeichen
              </p>
              <p className="text-lg mb-8 text-primary-foreground/80">
                Zulassung innerhalb von 24 Stunden garantiert
              </p>
              
              {/* USP Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                  ✓ Zulassen in 5 Minuten
                </div>
                <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                  ✓ Kein Behördengang
                </div>
                <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-medium">
                  ✓ Kein Stress
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="cta-large" className="bg-white text-primary hover:bg-gray-100" asChild>
                  <Link to="/angebot">
                    JETZT BEAUFTRAGEN
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                  <Phone className="mr-2 h-5 w-5" />
                  +49 171 1507181
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/20">
                <Car className="h-16 w-16 text-primary-foreground mb-4 mx-auto" />
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">24h</div>
                  <div className="text-lg">Garantierte Bearbeitung</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* How it Works */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
              Ablauf in 3 einfachen Schritten
            </h2>
            <p className="text-lg text-muted-foreground">
              So einfach ist Ihre KFZ-Zulassung mit uns
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="text-center border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    {step.icon}
                  </div>
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                    {index + 1}
                  </div>
                  <CardTitle className="text-xl text-secondary">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
              Unsere Leistungen
            </h2>
            <p className="text-lg text-muted-foreground">
              Alles rund um Ihre Fahrzeugzulassung
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-background rounded-lg p-6 shadow-sm border">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-trust-green" />
                  <span className="font-medium text-secondary">{service}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
              Preisübersicht
            </h2>
            <p className="text-lg text-muted-foreground">
              Transparente Preise – keine versteckten Kosten
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricePackages.map((pkg, index) => (
              <PriceCard
                key={index}
                title={pkg.title}
                price={pkg.price}
                popular={pkg.popular}
                features={pkg.features}
                buttonText={pkg.buttonText}
                buttonVariant={pkg.buttonVariant}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Bereit für Ihre schnelle Zulassung?
          </h2>
          <p className="text-xl mb-8 text-secondary-foreground/90">
            Sparen Sie sich den Behördengang und beauftragen Sie uns noch heute.
            Ihre Zulassung ist schon morgen fertig!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="cta-large" className="bg-primary hover:bg-primary/90" asChild>
              <Link to="/angebot">
                JETZT BEAUFTRAGEN
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary">
              <Phone className="mr-2 h-5 w-5" />
              Kostenlos anrufen
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;