import { Button } from "@/components/ui/button";
import { ChevronDown, Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo320 from "@/assets/logo-320.webp";
import logo640 from "@/assets/logo-640.webp";
import { ZULASSUNGSSERVICE, ZULASSUNGSSERVICE_PFADE, type MenuePunkt } from "@/content/leistungsMenue";
import { RATGEBER, RATGEBER_PFAD, ratgeberPfad } from "@/content/ratgeber";

interface Hauptpunkt {
  name: string;
  href: string;
  /** Pfade, auf denen der Punkt als aktiv gilt */
  pfade: string[];
  unterpunkte?: MenuePunkt[];
  alleText?: string;
}

// Kurzer Menütitel aus der Artikel-Überschrift (Teil vor Gedankenstrich/Doppelpunkt)
const RATGEBER_MENUE: MenuePunkt[] = RATGEBER.map((artikel) => ({
  name: artikel.h1.split(/\s[–:]\s|:\s/)[0],
  href: ratgeberPfad(artikel.slug),
}));

// Aufbau wie bei großen Zulassungsdiensten: eigene Menüzeile, Großbuchstaben, Aufklapplisten
const HAUPTMENUE: Hauptpunkt[] = [
  {
    name: "Zulassungsservice",
    href: "/preise",
    pfade: ZULASSUNGSSERVICE_PFADE,
    unterpunkte: ZULASSUNGSSERVICE,
    alleText: "Alle Preise im Überblick",
  },
  { name: "eVB & Versicherung", href: "/kfz-versicherung", pfade: ["/kfz-versicherung", "/evb-nummer"] },
  { name: "Fahrzeugankauf", href: "/fahrzeugankauf", pfade: ["/fahrzeugankauf"] },
  { name: "Firmen & Partner", href: "/gewerbekunden", pfade: ["/gewerbekunden"] },
  {
    name: "Ratgeber",
    href: RATGEBER_PFAD,
    pfade: [RATGEBER_PFAD],
    unterpunkte: RATGEBER_MENUE,
    alleText: "Alle Ratgeber-Artikel",
  },
];

const KLEINE_LINKS = [
  { name: "Über uns", href: "/ueber-uns" },
  { name: "FAQ", href: "/faq" },
  { name: "Formulare", href: "/dokumente" },
];

// Nach dem Klick den Fokus lösen, damit die Aufklappliste auf der neuen Seite zu ist
const fokusLoesen = () => (document.activeElement as HTMLElement | null)?.blur();

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const istAktiv = (punkt: Hauptpunkt) =>
    punkt.pfade.some((pfad) => location.pathname === pfad || location.pathname.startsWith(`${pfad}/`));

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      {/* Schmale Leiste oben */}
      <div className="hidden lg:block bg-muted">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 text-xs flex items-center justify-between text-muted-foreground">
          <span>Bad Salzuflen &amp; Kreis Lippe · Ohne Termin · Mo–Fr 9–18, Sa 15–18 Uhr · Online rund um die Uhr</span>
          <div className="flex items-center gap-5">
            {KLEINE_LINKS.map((link) => (
              <Link key={link.href} to={link.href} className="font-medium text-link hover:underline">
                {link.name}
              </Link>
            ))}
            <a href="tel:+4915142462280" className="inline-flex items-center gap-1.5 whitespace-nowrap font-semibold text-secondary hover:underline">
              <Phone className="h-3.5 w-3.5" />
              01514 2462280
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo und Knopf */}
        <div className="flex justify-between items-center py-3">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src={logo320}
              srcSet={`${logo320} 320w, ${logo640} 640w`}
              sizes="256px"
              width={256}
              height={56}
              alt="KFZ-Sofortzulassung Logo"
              className="h-12 w-auto object-contain lg:h-14"
            />
          </Link>

          <Button variant="cta" asChild className="hidden lg:inline-flex whitespace-nowrap rounded-full px-6">
            <Link to="/angebot">Jetzt anfragen</Link>
          </Button>

          <button
            className="lg:hidden rounded-lg border border-border/70 bg-background p-2"
            aria-label={isMobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Menüzeile */}
        <nav className="hidden lg:flex items-center justify-between gap-2 pb-1" aria-label="Hauptmenü">
          {HAUPTMENUE.map((punkt, index) => {
            const aktiv = istAktiv(punkt);
            // Listen der hinteren Punkte nach rechts ausrichten, sonst ragen sie über den Rand
            const seite = index >= HAUPTMENUE.length / 2 ? "right-0" : "left-0";
            const stil = `inline-flex items-center gap-1 whitespace-nowrap border-b-2 py-3 text-sm font-bold uppercase tracking-wide transition-colors ${
              aktiv ? "border-primary text-secondary" : "border-transparent text-secondary hover:border-primary/50"
            }`;
            if (!punkt.unterpunkte) {
              return (
                <Link key={punkt.name} to={punkt.href} className={stil}>
                  {punkt.name}
                </Link>
              );
            }
            return (
              <div key={punkt.name} className="group relative">
                <Link to={punkt.href} className={stil} onClick={fokusLoesen}>
                  {punkt.name}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                </Link>
                <div className={`invisible absolute ${seite} top-full z-50 pt-1 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100`}>
                  <ul className="w-80 rounded-xl border border-border bg-background py-2 shadow-xl">
                    {punkt.unterpunkte.map((unter) => (
                      <li key={unter.name}>
                        <Link
                          to={unter.href}
                          onClick={fokusLoesen}
                          className="block px-5 py-2.5 text-sm font-medium text-secondary hover:bg-muted hover:text-link"
                        >
                          {unter.name}
                        </Link>
                      </li>
                    ))}
                    {punkt.alleText && (
                      <li className="mt-1 border-t border-border pt-1">
                        <Link
                          to={punkt.href}
                          onClick={fokusLoesen}
                          className="block px-5 py-2.5 text-sm font-bold text-link hover:bg-muted"
                        >
                          {punkt.alleText} →
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            );
          })}
        </nav>

        {/* Handy-Menü */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border py-4">
            <nav className="flex flex-col gap-4" aria-label="Hauptmenü">
              {HAUPTMENUE.map((punkt) => (
                <div key={punkt.name}>
                  <Link
                    to={punkt.href}
                    className={`block rounded-xl px-3 py-2 text-sm font-bold uppercase tracking-wide ${
                      istAktiv(punkt) ? "bg-primary text-primary-foreground" : "text-secondary hover:bg-muted"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {punkt.name}
                  </Link>
                  {punkt.unterpunkte && punkt.href !== RATGEBER_PFAD && (
                    <ul className="ml-3 mt-1 space-y-1 border-l-2 border-border pl-3">
                      {punkt.unterpunkte.map((unter) => (
                        <li key={unter.name}>
                          <Link
                            to={unter.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block rounded-lg px-2 py-1.5 text-sm text-secondary hover:bg-muted"
                          >
                            {unter.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
              <div className="flex flex-wrap gap-x-5 gap-y-2 border-t border-border px-3 pt-4 text-sm">
                {KLEINE_LINKS.map((link) => (
                  <Link key={link.href} to={link.href} className="font-medium text-link" onClick={() => setIsMobileMenuOpen(false)}>
                    {link.name}
                  </Link>
                ))}
                <a href="tel:+4915142462280" className="inline-flex items-center gap-1.5 font-semibold text-secondary">
                  <Phone className="h-4 w-4" />
                  01514 2462280
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
