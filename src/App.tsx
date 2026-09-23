import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search]);

  return null;
};

// Seiteninhalt ohne Router – wird im Browser mit BrowserRouter und beim
// Build (scripts/prerender.mjs) mit StaticRouter verwendet, damit jede Seite
// ihren Text schon im HTML mitbringt.
export const AppInhalt = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/angebot" element={<Angebot />} />
        <Route path="/preise" element={<Preise />} />
        <Route path="/ueber-uns" element={<UeberUns />} />
        <Route path="/fahrzeugankauf" element={<Fahrzeugankauf />} />
        <Route path="/evb-nummer" element={<EvbNummer />} />
        <Route path="/zulassungsstelle-bad-salzuflen" element={<Zulassungsstelle />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/dokumente" element={<Dokumente />} />
        <Route path="/blog" element={<Navigate to="/faq" replace />} />
        <Route path="/blog/:slug" element={<Navigate to="/faq" replace />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <WhatsAppFloatingButton />
      <MobileCtaBar />
      <CookieBanner />
    </TooltipProvider>
  </QueryClientProvider>
);

const App = () => (
  <BrowserRouter>
    <AppInhalt />
  </BrowserRouter>
);

export default App;
