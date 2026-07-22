import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { ArrowRight } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404: Nicht vorhandene Route aufgerufen:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Seite nicht gefunden | KFZ-Sofortzulassung"
        description="Die angeforderte Seite wurde nicht gefunden."
        robots="noindex, nofollow"
        image="/favicon.ico"
      />
      <Header />
      <section className="py-24">
        <div className="mx-auto max-w-xl px-4 text-center">
          <p className="text-6xl font-bold text-primary">404</p>
          <h1 className="mt-4 text-2xl font-bold text-secondary sm:text-3xl">
            Diese Seite gibt es leider nicht
          </h1>
          <p className="mt-3 text-muted-foreground">
            Der Link ist veraltet oder die Adresse wurde falsch eingegeben. Kein Problem –
            hier geht es direkt weiter:
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" variant="cta" asChild>
              <Link to="/angebot">
                Zulassung starten
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/">Zur Startseite</Link>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default NotFound;
