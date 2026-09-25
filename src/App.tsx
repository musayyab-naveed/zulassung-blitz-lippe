import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home";
import Angebot from "./pages/Angebot";
import UeberUns from "./pages/UeberUns";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import NotFound from "./pages/NotFound";
import Fahrzeugankauf from "./pages/Fahrzeugankauf";
import MobileCtaBar from "./components/MobileCtaBar";
import WhatsAppFloatingButton from "./components/WhatsAppFloatingButton";
import Faq from "./pages/Faq";
import Dokumente from "./pages/Dokumente";
import Preise from "./pages/Preise";
import EvbNummer from "./pages/EvbNummer";
import Zulassungsstelle from "./pages/Zulassungsstelle";
import CookieBanner from "./components/CookieBanner";
import Leistungsseite from "./pages/Leistungsseite";
import Ratgeber from "./pages/Ratgeber";
import KfzVersicherung from "./pages/KfzVersicherung";
import { ORTSSEITEN } from "./content/ortsseiten";
import RatgeberArtikel from "./pages/RatgeberArtikel";
import { AUTO_ABMELDEN, AUTO_ANMELDEN, AUTO_UMMELDEN, GEWERBEKUNDEN, WUNSCHKENNZEICHEN } from "./content/leistungsseiten";

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search]);

  return null;
};

// Anrufe und Routenplanungen mitzählen – wie die WhatsApp-Klicks nur mit Analytics-Zustimmung
const AnrufZaehler = () => {
  useEffect(() => {
    const klick = (e: MouseEvent) => {
      const ziel = e.target as HTMLElement | null;
      if (ziel?.closest?.('a[href^="tel:"]')) {
        window.gtag?.("event", "generate_lead", { method: "telefon", seite: window.location.pathname });
      } else if (ziel?.closest?.('a[href*="google.com/maps/dir"]')) {
        window.gtag?.("event", "generate_lead", { method: "route", seite: window.location.pathname });
      }
    };
    document.addEventListener("click", klick);
    return () => document.removeEventListener("click", klick);
  }, []);
  return null;
};

// Seiteninhalt ohne Router – wird im Browser mit BrowserRouter und beim
// Build (scripts/prerender.mjs) mit StaticRouter verwendet, damit jede Seite
// ihren Text schon im HTML mitbringt.
export const AppInhalt = () => (
  <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/angebot" element={<Angebot />} />
      <Route path="/preise" element={<Preise />} />
      <Route path="/ueber-uns" element={<UeberUns />} />
      <Route path="/fahrzeugankauf" element={<Fahrzeugankauf />} />
      <Route path="/evb-nummer" element={<EvbNummer />} />
      <Route path="/zulassungsstelle-bad-salzuflen" element={<Zulassungsstelle />} />
      <Route path="/auto-anmelden" element={<Leistungsseite seite={AUTO_ANMELDEN} />} />
      <Route path="/auto-abmelden" element={<Leistungsseite seite={AUTO_ABMELDEN} />} />
      <Route path="/auto-ummelden" element={<Leistungsseite seite={AUTO_UMMELDEN} />} />
      <Route path="/wunschkennzeichen" element={<Leistungsseite seite={WUNSCHKENNZEICHEN} />} />
      <Route path="/gewerbekunden" element={<Leistungsseite seite={GEWERBEKUNDEN} />} />
      <Route path="/kfz-versicherung" element={<KfzVersicherung />} />
      {ORTSSEITEN.map((seite) => (
        <Route key={seite.path} path={seite.path} element={<Leistungsseite seite={seite} />} />
      ))}
      <Route path="/ratgeber" element={<Ratgeber />} />
      <Route path="/ratgeber/:slug" element={<RatgeberArtikel />} />
      <Route path="/faq" element={<Faq />} />
      <Route path="/dokumente" element={<Dokumente />} />
      <Route path="/blog" element={<Navigate to="/faq" replace />} />
      <Route path="/blog/:slug" element={<Navigate to="/faq" replace />} />
      <Route path="/impressum" element={<Impressum />} />
      <Route path="/datenschutz" element={<Datenschutz />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    <AnrufZaehler />
    <WhatsAppFloatingButton />
    <MobileCtaBar />
    <CookieBanner />
  </>
);

const App = () => (
  <BrowserRouter>
    <AppInhalt />
  </BrowserRouter>
);

export default App;
