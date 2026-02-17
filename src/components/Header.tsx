import { Phone, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Startseite", href: "/" },
    { name: "Angebot", href: "/angebot" },
    { name: "Blog", href: "/blog" },
    { name: "Fahrzeugankauf", href: "/fahrzeugankauf" },
    { name: "Über uns", href: "/ueber-uns" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl">
      <div className="hidden lg:block border-b border-border/60 bg-secondary text-secondary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 text-xs flex items-center justify-between">
          <span>Zulassungsdienst in Bad Salzuflen und Kreis Lippe</span>
          <span>24h Bearbeitung und optionaler Fahrzeugankauf</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={logo} alt="KFZ-Sofortzulassung Logo" className="h-14 w-auto object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2 rounded-full border border-border/70 bg-background px-2 py-1 shadow-sm">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`rounded-full px-3 py-2 text-sm font-semibold transition-colors ${
                  isActive(item.href)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted hover:text-secondary"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Phone Number */}
          <div className="hidden lg:flex items-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-4 py-2 text-secondary shadow-sm">
              <Phone className="h-4 w-4 text-primary" />
              <a href="tel:+4915142462280" className="text-sm font-semibold hover:text-primary transition-colors">
                +4915142462280
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden rounded-lg border border-border/70 bg-background p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted hover:text-primary"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center space-x-2 text-secondary mb-1">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href="tel:+4915142462280" className="text-sm font-semibold hover:text-primary transition-colors">
                    +4915142462280
                  </a>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
