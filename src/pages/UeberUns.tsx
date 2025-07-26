import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustBadges from "@/components/TrustBadges";
import { 
  Users, 
  Clock, 
  Shield, 
  Award, 
  MapPin, 
  Phone,
  Mail,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const UeberUns = () => {
  const values = [
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Schnelligkeit",
      description: "24-Stunden-Garantie für alle Zulassungen – darauf können Sie sich verlassen."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Sicherheit",
      description: "SSL-verschlüsselte Datenübertragung und sicherer Umgang mit Ihren Dokumenten."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Service",
      description: "Persönliche Beratung und Betreuung von der Beauftragung bis zur fertigen Zulassung."
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Qualität",
      description: "Über 1000 zufriedene Kunden und 4.9 Sterne bei Google sprechen für uns."
    }
  ];

  const stats = [
    { number: "1000+", label: "Zufriedene Kunden" },
    { number: "24h", label: "Bearbeitungszeit" },
    { number: "4.9★", label: "Google Bewertung" },
    { number: "5+", label: "Jahre Erfahrung" }
  ];

  const services = [
    "KFZ-Neuzulassung",
    "KFZ-Umschreibung", 
    "Motorrad-Zulassung",
    "Kennzeichen-Reservierung",
    "KFZ-Abmeldung",
    "Hol- und Bringservice",
    "Express-Bearbeitung",
    "Wunschkennzeichen"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                Über KFZ-Sofortzulassung
              </h1>
              <p className="text-xl mb-6 text-primary-foreground/90">
                Ihr zuverlässiger Partner für schnelle und unkomplizierte 
                KFZ-Zulassungen im Kreis Lippe und Umgebung.
              </p>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Wir übernehmen Ihre komplette Zulassung – egal ob An-, Um- oder Abmeldung. 
                Schnell, sicher und komplett stressfrei. Sparen Sie sich lange Wartezeiten 
                und Behördengänge – wir machen Sie mobil.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-primary-foreground/20">
                  <div className="text-3xl font-bold mb-2">{stat.number}</div>
                  <div className="text-sm text-primary-foreground/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* Our Values */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
              Unsere Werte
            </h2>
            <p className="text-lg text-muted-foreground">
              Darauf können Sie bei uns zählen
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-2 hover:border-primary transition-colors">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl text-secondary">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-6">
                Unser Versprechen
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Als lokaler Spezialist für KFZ-Zulassungen im Kreis Lippe kennen wir 
                  die Herausforderungen, mit denen Autobesitzer bei Behördengängen konfrontiert sind.
                </p>
                <p>
                  Lange Wartezeiten, komplizierte Formulare und verlorene Arbeitszeit gehören 
                  mit unserem Service der Vergangenheit an. Wir haben es uns zur Aufgabe gemacht, 
                  Ihnen diese Belastung abzunehmen.
                </p>
                <p>
                  Seit über 5 Jahren helfen wir privaten und gewerblichen Kunden dabei, 
                  ihre Fahrzeuge schnell und unkompliziert zuzulassen. Unser erfahrenes Team 
                  kennt alle Abläufe und sorgt dafür, dass Ihre Zulassung garantiert am nächsten 
                  Werktag fertig ist.
                </p>
              </div>
            </div>
            
            <div className="space-y-6">
              <Card className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-secondary mb-2">Unser Ziel</h3>
                  <p className="text-muted-foreground">
                    Jeden Kunden zufriedenzustellen und ihm Zeit, Nerven und Stress zu ersparen.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-secondary mb-2">Unsere Mission</h3>
                  <p className="text-muted-foreground">
                    KFZ-Zulassungen so einfach wie Online-Shopping zu machen – ohne Behördengang.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-primary">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-secondary mb-2">Unsere Garantie</h3>
                  <p className="text-muted-foreground">
                    24-Stunden-Bearbeitung oder Sie erhalten Ihr Geld zurück.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
              Unsere Services im Überblick
            </h2>
            <p className="text-lg text-muted-foreground">
              Alles rund um Ihre Fahrzeugzulassung
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-background rounded-lg p-6 shadow-sm border hover:border-primary transition-colors">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-trust-green flex-shrink-0" />
                  <span className="font-medium text-secondary">{service}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-20 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-6">
                Kontakt & Standort
              </h2>
              <p className="text-muted-foreground mb-8">
                Wir sind für Sie da und freuen uns auf Ihre Anfrage. 
                Kontaktieren Sie uns gerne telefonisch oder per E-Mail.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-secondary">Servicegebiet</h3>
                    <p className="text-muted-foreground">
                      Kreis Lippe und Umgebung<br />
                      Nordrhein-Westfalen
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-secondary">Telefon</h3>
                    <p className="text-muted-foreground">
                      +49 171 1507181<br />
                      <span className="text-sm">Mo-Fr: 8:00-18:00 Uhr</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-secondary">E-Mail</h3>
                    <p className="text-muted-foreground">
                      info@sofortzulassung.com<br />
                      <span className="text-sm">Antwort innerhalb von 2 Stunden</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="lg:pl-8">
              <Card className="h-full border-2 border-primary">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl text-secondary">
                    Bereit für Ihre Zulassung?
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-6">
                  <p className="text-muted-foreground">
                    Beauftragen Sie uns noch heute und haben Sie morgen 
                    Ihre fertigen Zulassungsunterlagen in den Händen.
                  </p>
                  
                  <div className="space-y-4">
                    <Button size="lg" variant="cta-large" className="w-full" asChild>
                      <Link to="/angebot">
                        JETZT BEAUFTRAGEN
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    
                    <p className="text-sm text-muted-foreground">
                      ✓ Kostenlose Beratung<br />
                      ✓ Unverbindliches Angebot<br />
                      ✓ 24h Bearbeitungsgarantie
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default UeberUns;