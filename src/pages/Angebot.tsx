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
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const Angebot = () => {
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
      buttonText: "BASIS PAKET WÄHLEN"
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
      buttonVariant: "cta" as const
    },
    {
      title: "ABMELDUNG",
      price: "30 €",
      features: [
        "Abmeldung innerhalb 24h",
        "Verwaltungsgebühren inkl."
      ],
      buttonText: "ABMELDUNG WÄHLEN"
    }
  ];

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({"namespace":"15min"});
      cal("ui", {"theme":"light","cssVarsPerTheme":{"light":{"cal-brand":"#63ccff"}},"hideEventTypeDetails":false,"layout":"month_view"});
    })();
  }, []);

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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Calendar Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-4">
              2. Termin vereinbaren
            </h2>
            <p className="text-lg text-muted-foreground">
              Wählen Sie einen passenden Termin für Ihre KFZ-Zulassung.
              Wir besprechen alle Details direkt im Termin!
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
            <p className="text-sm text-muted-foreground">
              Fragen? Rufen Sie uns an: <a href="tel:+4915142462280" className="text-primary hover:underline">+4915142462280</a>
            </p>
          </div>
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
            <Button size="lg" variant="outline" className="flex items-center" asChild>
              <a href="tel:+4915142462280">
                <Phone className="mr-2 h-5 w-5" />
                +4915142462280
              </a>
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