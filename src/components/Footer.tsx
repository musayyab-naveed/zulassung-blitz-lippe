import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-secondary text-secondary-foreground">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -top-20 -right-24 h-72 w-72 rounded-full bg-primary blur-3xl" />
        <div className="absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-primary blur-3xl" />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img
                src={logo}
                alt="KFZ-Sofortzulassung Logo"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-secondary-foreground/85 mb-4 max-w-xl">
              Ihr lokaler Partner für schnelle KFZ-Zulassungen in Bad Salzuflen und im
              Kreis Lippe. Optional bieten wir den Fahrzeugankauf als Zusatzservice im
              gleichen Ablauf an.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4 tracking-wide">Navigation</h3>
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
                  to="/fahrzeugankauf"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Fahrzeugankauf
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Blog
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
            <h3 className="font-semibold mb-4 tracking-wide">Kontakt</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+4915142462280" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  +4915142462280
                </a>
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
        <div className="relative border-t border-secondary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-secondary-foreground/60">
            <p>&copy; 2026 KFZ-Sofortzulassung. Alle Rechte vorbehalten.</p>
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
