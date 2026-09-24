import { Clock, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logo320 from "@/assets/logo-320.webp";
import logo400 from "@/assets/logo-400.webp";
import logo640 from "@/assets/logo-640.webp";
import { CONSENT_OEFFNEN_EVENT } from "@/lib/consent";
import { ALLE_ORTE_LIPPE, ORTSSEITEN } from "@/content/ortsseiten";

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
            <div className="mb-4 inline-flex items-center rounded-xl bg-white px-4 py-2">
              <img
                src={logo320}
                srcSet={`${logo320} 320w, ${logo400} 400w, ${logo640} 640w`}
                sizes="292px"
                width={292}
                height={64}
                loading="lazy"
                alt="KFZ-Sofortzulassung Logo"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-secondary-foreground/85 mb-5 max-w-xl">
              Ihr Zulassungsdienst in Bad Salzuflen für den ganzen Kreis Lippe – ohne Termin,
              Mo–Fr 9–18 und Sa 15–18 Uhr. Zulassen, ummelden, abmelden und Wunschkennzeichen.
            </p>
            {/* Name, Adresse, Telefon: überall exakt gleich wie im Google-Profil */}
            <address className="not-italic space-y-2.5 text-sm">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-primary" />
                <span>
                  <span className="font-semibold">KFZ-Sofortzulassung</span>
                  <br />
                  Werler Straße 68, 32105 Bad Salzuflen
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-none text-primary" />
                <a href="tel:+4915142462280" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  01514 2462280
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-none text-primary" />
                <a href="mailto:info@sofortzulassung.com" className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors">
                  info@sofortzulassung.com
                </a>
              </p>
              <p className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 flex-none text-primary" />
                <span className="text-secondary-foreground/80">
                  Mo–Fr 9–18 Uhr · Sa 15–18 Uhr
                  <br />
                  Online-Zulassung rund um die Uhr
                </span>
              </p>
            </address>
          </div>

          {/* Leistungen */}
          <div>
            <h3 className="font-semibold mb-4 tracking-wide">Leistungen</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: "/preise", text: "KFZ-Zulassung & Preise" },
                { to: "/auto-anmelden", text: "Auto anmelden" },
                { to: "/auto-abmelden", text: "Auto abmelden" },
                { to: "/auto-ummelden", text: "Auto ummelden" },
                { to: "/wunschkennzeichen", text: "Wunschkennzeichen LIP, DT, LE" },
                { to: "/gewerbekunden", text: "Für Firmen & Partner" },
                { to: "/kfz-versicherung", text: "Kfz-Versicherung vergleichen" },
                { to: "/fahrzeugankauf", text: "Fahrzeugankauf" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
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
                  to="/ratgeber"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Ratgeber
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/zulassungsstelle-bad-salzuflen"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Zulassungsstelle Bad Salzuflen
                </Link>
              </li>
              <li>
                <Link
                  to="/evb-nummer"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  eVB-Nummer
                </Link>
              </li>
              <li>
                <Link
                  to="/dokumente"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground transition-colors"
                >
                  Formulare
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

        </div>

        {/* Standort und Einzugsgebiet – alle 16 Orte, Ortsseiten verlinkt */}
        <div className="relative mt-10 text-sm text-secondary-foreground/85">
          <p>
            <span className="font-semibold text-secondary-foreground">Unser Standort: Bad Salzuflen</span> –
            Zulassungsdienst für den ganzen Kreis Lippe:
          </p>
          <p className="mt-1">
            {ALLE_ORTE_LIPPE.filter((ort) => ort !== "Bad Salzuflen").map((ort, index) => {
              const seite = ORTSSEITEN.find((s) => s.ort === ort);
              return (
                <span key={ort}>
                  {index > 0 && " · "}
                  {seite ? (
                    <Link to={seite.path} className="hover:text-secondary-foreground hover:underline">
                      {ort}
                    </Link>
                  ) : (
                    ort
                  )}
                </span>
              );
            })}
          </p>
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
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event(CONSENT_OEFFNEN_EVENT))}
                className="hover:text-secondary-foreground transition-colors"
              >
                Cookie-Einstellungen
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
