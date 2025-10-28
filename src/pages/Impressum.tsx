import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, FileText } from "lucide-react";

const Impressum = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-secondary mb-4">
              Impressum
            </h1>
            <p className="text-lg text-muted-foreground">
              Angaben gemäß § 5 TMG
            </p>
          </div>

          {/* Company Information Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-secondary">
                <FileText className="h-6 w-6 text-primary" />
                Unternehmensinformationen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-secondary mb-2">KFZ-Sofortzulassungsdienst</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <span className="font-medium">Inhaber:</span>
                    Mohammad Massyh Haqparwar
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Werler Straße 68
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="ml-6">32105 Bad Salzuflen</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="ml-6">Deutschland</span>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-semibold text-secondary mb-2">Kontakt</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <a href="tel:+4915142462280" className="text-primary hover:underline">
                      +49 151 42462280
                    </a>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a href="mailto:info@sofortzulassung.com" className="text-primary hover:underline">
                      info@sofortzulassung.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-semibold text-secondary mb-2">Umsatzsteuer-Identifikationsnummer</h3>
                <p className="text-muted-foreground">
                  gemäß § 27 a Umsatzsteuergesetz:
                </p>
                <p className="font-mono text-sm bg-muted p-2 rounded mt-2">
                  DE354946854
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Legal Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-secondary">EU-Streitschlichtung</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline ml-1"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
              </p>
              <p className="text-muted-foreground">
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-secondary">Verbraucherstreitbeilegung/Universalschlichtungsstelle</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <div className="mt-12 text-center text-sm text-muted-foreground">
            <p>
              Haftung für Inhalte: Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
            </p>
            <p className="mt-2">
              Haftung für Links: Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Impressum;