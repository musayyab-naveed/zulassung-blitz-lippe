import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PriceCard from "@/components/PriceCard";
import { CheckCircle, Phone, Mail, FileText } from "lucide-react";
import { useState } from "react";

const Angebot = () => {
  const [selectedPackage, setSelectedPackage] = useState("premium");

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
      buttonText: "BASIS PAKET WÄHLEN",
      value: "basis"
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
      buttonText: "PREMIUM PAKET WÄHLEN",
      buttonVariant: "cta" as const,
      value: "premium"
    },
    {
      title: "ABMELDUNG",
      price: "30 €",
      features: [
        "Abmeldung innerhalb 24h",
        "Verwaltungsgebühren inkl."
      ],
      buttonText: "ABMELDUNG WÄHLEN",
      value: "abmeldung"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle form submission
    console.log("Form submitted");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-primary-foreground py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Jetzt KFZ-Zulassung beauftragen
          </h1>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Wählen Sie Ihr Paket und füllen Sie das Formular aus. 
            Wir kümmern uns um den Rest!
          </p>
          
          <div className="flex justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>24h Garantie</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Kein Behördengang</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Inkl. Kennzeichen</span>
            </div>
          </div>
        </div>
      </section>

      {/* Package Selection */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-4">
              1. Paket auswählen
            </h2>
            <p className="text-lg text-muted-foreground">
              Wählen Sie das passende Paket für Ihre Bedürfnisse
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {pricePackages.map((pkg, index) => (
              <div key={index} className="relative">
                <PriceCard
                  title={pkg.title}
                  price={pkg.price}
                  popular={pkg.popular}
                  features={pkg.features}
                  buttonText={pkg.buttonText}
                  buttonVariant={pkg.buttonVariant}
                />
                {selectedPackage === pkg.value && (
                  <div className="absolute inset-0 bg-primary/5 border-2 border-primary rounded-lg pointer-events-none"></div>
                )}
                <Button
                  variant={selectedPackage === pkg.value ? "cta" : "outline"}
                  className="w-full mt-4"
                  onClick={() => setSelectedPackage(pkg.value)}
                >
                  {selectedPackage === pkg.value ? "✓ Ausgewählt" : "Auswählen"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-4">
              2. Ihre Daten eingeben
            </h2>
            <p className="text-lg text-muted-foreground">
              Damit wir Ihre Zulassung bearbeiten können
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-primary" />
                <span>Antragsformular</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="vorname">Vorname *</Label>
                    <Input id="vorname" name="vorname" required />
                  </div>
                  <div>
                    <Label htmlFor="nachname">Nachname *</Label>
                    <Input id="nachname" name="nachname" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">E-Mail Adresse *</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                  <div>
                    <Label htmlFor="telefon">Telefonnummer *</Label>
                    <Input id="telefon" name="telefon" type="tel" required />
                  </div>
                </div>

                {/* Address */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="strasse">Straße & Hausnummer *</Label>
                    <Input id="strasse" name="strasse" required />
                  </div>
                  <div>
                    <Label htmlFor="plz">PLZ *</Label>
                    <Input id="plz" name="plz" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="ort">Ort *</Label>
                  <Input id="ort" name="ort" required />
                </div>

                {/* Vehicle Information */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold text-secondary mb-4">Fahrzeugdaten</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fahrzeugtyp">Fahrzeugtyp *</Label>
                      <Select name="fahrzeugtyp" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Fahrzeugtyp wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pkw">PKW</SelectItem>
                          <SelectItem value="motorrad">Motorrad</SelectItem>
                          <SelectItem value="lkw">LKW</SelectItem>
                          <SelectItem value="anhanger">Anhänger</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zulassungsart">Zulassungsart *</Label>
                      <Select name="zulassungsart" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Art wählen" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="neuzulassung">Neuzulassung</SelectItem>
                          <SelectItem value="umschreibung">Umschreibung</SelectItem>
                          <SelectItem value="wiederzulassung">Wiederzulassung</SelectItem>
                          <SelectItem value="abmeldung">Abmeldung</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="marke">Fahrzeugmarke</Label>
                      <Input id="marke" name="marke" placeholder="z.B. BMW, Mercedes" />
                    </div>
                    <div>
                      <Label htmlFor="modell">Modell</Label>
                      <Input id="modell" name="modell" placeholder="z.B. Golf, A4" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="wunschkennzeichen">Wunschkennzeichen</Label>
                    <Input 
                      id="wunschkennzeichen" 
                      name="wunschkennzeichen" 
                      placeholder="z.B. LIP-AB 123 (optional, +13€)" 
                    />
                  </div>
                </div>

                {/* Additional Information */}
                <div className="border-t pt-6">
                  <Label htmlFor="bemerkungen">Zusätzliche Bemerkungen</Label>
                  <Textarea 
                    id="bemerkungen" 
                    name="bemerkungen" 
                    placeholder="Besondere Wünsche oder Anmerkungen..."
                    className="min-h-[100px]"
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-2">
                  <Checkbox id="agb" required />
                  <Label htmlFor="agb" className="text-sm leading-5">
                    Ich stimme den Allgemeinen Geschäftsbedingungen zu und bestätige, 
                    dass ich die Datenschutzerklärung gelesen habe. *
                  </Label>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="newsletter" />
                  <Label htmlFor="newsletter" className="text-sm leading-5">
                    Ich möchte über weitere Angebote und Services informiert werden.
                  </Label>
                </div>

                {/* Submit Button */}
                <div className="text-center pt-6">
                  <Button type="submit" size="lg" variant="cta-large">
                    Auftrag verbindlich absenden
                  </Button>
                  <p className="text-sm text-muted-foreground mt-2">
                    Nach dem Absenden erhalten Sie eine Bestätigung per E-Mail
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-secondary mb-6">
            Fragen? Wir helfen gerne!
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Rufen Sie uns an oder schreiben Sie uns – wir beraten Sie kostenlos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="flex items-center">
              <Phone className="mr-2 h-5 w-5" />
              +49 171 1507181
            </Button>
            <Button size="lg" variant="outline" className="flex items-center">
              <Mail className="mr-2 h-5 w-5" />
              info@sofortzulassung.com
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Angebot;