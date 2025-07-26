import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">S</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">KFZ-Sofortzulassung</h2>
                <p className="text-sm text-primary">Wir machen sie mobil.</p>
              </div>
            </div>
            <p className="text-sm text-secondary-foreground/80 mb-4">
              Ihre zuverlässigen Partner für schnelle und unkomplizierte KFZ-Zulassungen 
              im Kreis Lippe und Umgebung. Sparen Sie Zeit und Nerven – wir übernehmen 
              den Behördengang für Sie.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/" 
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Startseite
                </Link>
              </li>
              <li>
                <Link 
                  to="/angebot" 
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Antragsformular
                </Link>
              </li>
              <li>
                <Link 
                  to="/ueber-uns" 
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Über uns
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+49 171 1507181</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@sofortzulassung.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Kreis Lippe, NRW</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-secondary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-secondary-foreground/60">
            <p>&copy; 2024 KFZ-Sofortzulassung. Alle Rechte vorbehalten.</p>
            <div className="flex space-x-6 mt-4 sm:mt-0">
              <Link 
                to="/impressum" 
                className="hover:text-secondary-foreground transition-colors"
              >
                Impressum
              </Link>
              <Link 
                to="/datenschutz" 
                className="hover:text-secondary-foreground transition-colors"
              >
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;