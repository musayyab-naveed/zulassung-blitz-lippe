import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBadges from "@/components/TrustBadges";
import PriceCard from "@/components/PriceCard";
import GoogleReviews from "@/components/GoogleReviews";
import heroImage from "@/assets/hero-image.jpg";
import { Car, Clock, FileText, Shield, CheckCircle, ArrowRight, Star, Phone, MapPin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
const Home = () => {
  const steps = [{
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "Auftrag erstellen",
    description: "Egal ob Auto oder Motorrad – online beauftragen und Wunschkennzeichen auswählen. Wir übernehmen den Rest."
  }, {
    icon: <Shield className="h-8 w-8 text-primary" />,
    title: "Dokumente übermitteln",
    description: "Einfach vorbeibringen, zusenden oder von uns abholen lassen – sicher und bequem."
  }, {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: "Zulassung innerhalb von 24h",
    description: "Ihre Zulassung erfolgt am nächsten Werktag. Rückversand oder Abholung der fertigen Unterlagen inklusive."
  }];
  const services = ["KFZ-Zulassung (Neu & Gebraucht)", "Motorrad-Zulassung", "Umschreibung", "Kennzeichen-Reservierung", "KFZ-Abmeldung", "Hol- und Bringservice"];

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"15min"});
      cal("ui", {"theme":"light","cssVarsPerTheme":{"light":{"cal-brand":"#63ccff"}},"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, []);
  const pricePackages = [{
    title: "BASIS",
    price: "129 €",
    features: ["Zulassung innerhalb von 24h", "Inkl. Euro-Kennzeichen", "Wunschkennzeichen (+13 €)", "Verwaltungsgebühren inkl.", "Sie bringen Unterlagen zu uns"],
    buttonText: "BASIS PAKET BESTELLEN"
  }, {
    title: "PREMIUM",
    price: "159 €",
    popular: true,
    features: ["Alles vom BASIS", "Express-Rückversand inklusive", "Wir holen und bringen die Unterlagen"],
    buttonText: "PREMIUM PAKET BESTELLEN",
    buttonVariant: "cta" as const
  }, {
    title: "ABMELDUNG",
    price: "30 €",
    features: ["Abmeldung innerhalb 24h", "Verwaltungsgebühren inkl."],
    buttonText: "ONLINE BEANTRAGEN"
  }];
  return <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-secondary text-primary-foreground py-16 sm:py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Einfach. Schnell. Ohne Wartezeit.
              </h1>
              <p className="text-lg sm:text-xl mb-4 text-primary-foreground/90">
                Online-Zulassung für den Kreis Lippe – inkl. 2 Kennzeichen
              </p>
              <p className="text-base sm:text-lg mb-8 text-primary-foreground/80">
                Zulassung innerhalb von 24 Stunden garantiert
              </p>
              
              {/* USP Badges */}
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-8 justify-center lg:justify-start">
                <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium">
                  ✓ Zulassen in 5 Minuten
                </div>
                <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium">
                  ✓ Kein Behördengang
                </div>
                <div className="bg-primary-foreground/20 backdrop-blur-sm rounded-full px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium">
                  ✓ Kein Stress
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" variant="cta-large" asChild>
                  <Link to="/angebot">
                    JETZT BEAUFTRAGEN
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white hover:bg-white hover:text-secondary text-cyan-400" asChild>
                  <a href="tel:+4915142462280">
                    <Phone className="mr-2 h-5 w-5" />
                    +4915142462280
                  </a>
                </Button>
              </div>
            </div>
            
            <div className="relative mt-8 lg:mt-0">
              {/* Hero Images */}
              <div className="relative">
                <div className="relative z-10">
                  <img src={heroImage} alt="KFZ-Sofortzulassung Service" className="w-full max-w-md mx-auto lg:max-w-lg rounded-2xl shadow-2xl" />
                </div>
                
                {/* Floating Elements */}
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
                
                {/* Background accent */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/10 rounded-full blur-3xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Google Reviews */}
      <GoogleReviews />

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
            {steps.map((step, index) => <Card key={index} className="text-center border-2 hover:border-primary transition-colors">
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
              </Card>)}
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
            {services.map((service, index) => <div key={index} className="bg-background rounded-lg p-6 shadow-sm border">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-trust-green" />
                  <span className="font-medium text-secondary">{service}</span>
                </div>
              </div>)}
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
            {pricePackages.map((pkg, index) => <PriceCard key={index} title={pkg.title} price={pkg.price} popular={pkg.popular} features={pkg.features} buttonText={pkg.buttonText} buttonVariant={pkg.buttonVariant} />)}
          </div>
        </div>
      </section>

      {/* Location Section with Map */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
              Besuchen Sie uns
            </h2>
            <p className="text-lg text-muted-foreground">
              Finden Sie uns in Bad Salzuflen, im Herzen des Kreises Lippe
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Map Container */}
            <div className="rounded-2xl overflow-hidden shadow-xl">
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

            {/* Contact Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-secondary mb-4">
                  Wir sind direkt vor Ort für Sie da
                </h3>
                <p className="text-muted-foreground mb-6">
                  Kommen Sie gerne vorbei oder kontaktieren Sie uns für eine persönliche Beratung.
                  Unser Zulassungsdienst in Bad Salzuflen ist zentral im Kreis Lippe gelegen und
                  leicht zu erreichen.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold text-secondary">Adresse</h4>
                    <p className="text-muted-foreground">
                      Werler Straße 68<br />
                      32105 Bad Salzuflen<br />
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
                  <Link to="/angebot">
                    JETZT BEAUFTRAGEN
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Calendar Section */}
      <section className="py-20 bg-secondary text-secondary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Termin vereinbaren
            </h2>
            <p className="text-xl text-secondary-foreground/90">
              Wählen Sie einen passenden Termin für Ihre KFZ-Zulassung.
              Wir sind für Sie da und machen Sie mobil!
            </p>
          </div>

          <div className="bg-background rounded-2xl shadow-xl p-6 max-h-[80vh] overflow-hidden">
            <Cal
              namespace="15min"
              calLink="sofortzulassung/15min"
              style={{width:"100%",height:"70vh",overflow:"scroll"}}
              config={{"layout":"month_view","theme":"light"}}
            />
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-secondary-foreground/80">
              Fragen? Rufen Sie uns an: <a href="tel:+4915142462280" className="text-primary hover:underline">+4915142462280</a>
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default Home;