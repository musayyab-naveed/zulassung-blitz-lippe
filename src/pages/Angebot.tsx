import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import AnkaufFormular from "@/components/AnkaufFormular";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ARTEN,
  EVB_OPTIONEN,
  SONDER_ARTEN,
  TELEFON_ANZEIGE,
  TELEFON_LINK,
  VORGAENGE,
  baueNachricht,
  checklisteFuer,
  vorgangAusPaket,
  whatsappLink,
  brauchtEvbFrage,
  type Art,
  type Evb,
  type Auswahl,
  type Vorgang,
} from "@/content/whatsappAnfrage";
import faqSchema from "@/content/faqSchema.json";
import zb1CodeImg from "@/assets/dokumente/zb1-code-verdeckt.jpg";
import plaketteImg from "@/assets/dokumente/plakette-verdeckt.jpg";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Car,
  CheckCircle,
  FileMinus,
  Globe,
  HelpCircle,
  Home as HomeIcon,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Timer,
} from "lucide-react";
import type { ReactNode } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";

const ANGEBOT_FAQS: { question: string; answer: string }[] = faqSchema["/angebot"];

const ROUTE_URL =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent("KFZ-Sofortzulassung, Werler Straße 68, 32105 Bad Salzuflen");

const ICONS: Record<string, ReactNode> = {
  zulassen: <Car className="h-6 w-6" />,
  abmelden: <FileMinus className="h-6 w-6" />,
  sonder: <Timer className="h-6 w-6" />,
  umzug: <HomeIcon className="h-6 w-6" />,
  kurzzeit: <Timer className="h-6 w-6" />,
  ausfuhr: <Globe className="h-6 w-6" />,
  verkaufen: <Banknote className="h-6 w-6" />,
  frage: <MessageCircle className="h-6 w-6" />,
  neu: <Sparkles className="h-6 w-6" />,
  gebraucht: <Car className="h-6 w-6" />,
  wieder: <RotateCcw className="h-6 w-6" />,
  unklar: <HelpCircle className="h-6 w-6" />,
  ja: <CheckCircle className="h-6 w-6" />,
  vergleich: <ShieldCheck className="h-6 w-6" />,
  nein: <HelpCircle className="h-6 w-6" />,
};

const istVorgang = (v: string | null): v is Vorgang =>
  v === "zulassen" || v === "abmelden" || v === "sonder" || v === "verkaufen" || v === "frage";
const ALLE_ARTEN: string[] = [...ARTEN, ...SONDER_ARTEN].map((a) => a.wert);
const istArt = (v: string | null): v is Art => v !== null && ALLE_ARTEN.includes(v);
const istEvb = (v: string | null): v is Evb => v === "ja" || v === "vergleich" || v === "nein";

/** Große Antwortkarte – ein Tipp genügt */
const Karte = <T extends string>({ option, onWahl }: { option: Auswahl<T>; onWahl: (wert: T) => void }) => (
  <button
    type="button"
    onClick={() => onWahl(option.wert)}
    className="group flex w-full items-center gap-4 rounded-2xl border border-border bg-background p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-md sm:p-5"
  >
    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-primary/10 text-primary">
      {ICONS[option.wert]}
    </span>
    <span className="flex-1">
      <span className="block text-base font-semibold text-secondary sm:text-lg">{option.titel}</span>
      {option.text && <span className="block text-sm text-muted-foreground">{option.text}</span>}
    </span>
    <ArrowRight className="h-5 w-5 flex-none text-muted-foreground transition-colors group-hover:text-primary" />
  </button>
);

const Angebot = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const paket = params.get("paket");
  const vonPreise = params.get("von") === "preise";
  const vorgangAusUrl = params.get("vorgang");
  // Alte Links (?start=verkauf) und Pakete von der Preisseite weiter unterstützen
  const vorgang: Vorgang | undefined = istVorgang(vorgangAusUrl)
    ? vorgangAusUrl
    : params.get("start") === "verkauf"
      ? "verkaufen"
      : vorgangAusPaket(paket);
  const vorgangVorgegeben = !istVorgang(vorgangAusUrl) && vorgang !== undefined;
  const art = istArt(params.get("art")) ? (params.get("art") as Art) : undefined;
  const evb = istEvb(params.get("evb")) ? (params.get("evb") as Evb) : undefined;
  // Wer zulässt, wird gefragt, ob die Versicherung (eVB) schon da ist – auch um einen Preisvergleich anzubieten
  const mitEvbSchritt = brauchtEvbFrage({ vorgang, art });

  // Keine Frage nach dem Zeitpunkt – das klären wir im Chat, sonst schreckt es ab
  const schritt: "was" | "art" | "evb" | "fertig" = !vorgang
    ? "was"
    : (vorgang === "zulassen" || vorgang === "sonder") && !art
      ? "art"
      : mitEvbSchritt && !evb
        ? "evb"
        : "fertig";

  const mitArtSchritt = vorgang === "zulassen" || vorgang === "sonder";
  // Solange die Art noch offen ist, rechnen wir bei Zulassungen mit der eVB-Frage
  const evbZaehlt = mitEvbSchritt || (vorgang === "zulassen" && !art);
  const gesamtSchritte = (mitArtSchritt ? 2 : 1) + (evbZaehlt ? 1 : 0);
  const aktuellerSchritt = schritt === "was" ? 1 : schritt === "art" ? 2 : schritt === "evb" ? 3 : gesamtSchritte;

  /** Jede Antwort ist ein eigener Verlaufseintrag – Browser-Zurück geht genau einen Schritt zurück */
  const setze = (schluessel: "vorgang" | "art" | "evb", wert: string) => {
    const neu = new URLSearchParams(params);
    if (schluessel === "vorgang") neu.delete("start");
    neu.set(schluessel, wert);
    navigate(`/angebot?${neu.toString()}`);
  };

  const zurueck = () => {
    // Innerhalb der Website: echter Browser-Schritt zurück (erhält Scrollposition, z. B. auf /preise)
    if (location.key !== "default") {
      navigate(-1);
      return;
    }
    // Direkt aufgerufen: eine Ebene nach oben
    const neu = new URLSearchParams(params);
    neu.delete("wann"); // aus alten Links
    if (schritt === "fertig" && evb) neu.delete("evb");
    else if ((schritt === "fertig" || schritt === "evb") && art) neu.delete("art");
    else if (!vorgangVorgegeben) neu.delete("vorgang");
    else {
      navigate(vonPreise ? "/preise" : "/");
      return;
    }
    const rest = neu.toString();
    navigate(rest ? `/angebot?${rest}` : "/angebot");
  };

  const antworten = { vorgang, art, evb, paket: paket ?? undefined };
  const nachricht = baueNachricht(antworten);
  const checkliste = checklisteFuer(antworten);

  const whatsappGeklickt = () => {
    // Zählt nur, wenn Analytics per Zustimmung geladen wurde
    window.gtag?.("event", "generate_lead", { method: "whatsapp", vorgang: vorgang ?? "unbekannt" });
  };

  const titel =
    schritt === "was"
      ? "Was möchten Sie erledigen?"
      : schritt === "art"
        ? "Worum geht es genau?"
        : schritt === "evb"
          ? "Haben Sie schon eine eVB-Nummer?"
          : vorgang === "verkaufen"
            ? "Fahrzeug verkaufen – so geht's weiter"
            : vorgang === "frage"
              ? "Stellen Sie uns Ihre Frage"
              : "Ihre Nachricht ist fertig";

  return (
    <div className="min-h-screen bg-background">
      <Seo
        path="/angebot"
      />
      <Header />

      <section className="bg-muted/40 py-8 sm:py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          {schritt === "was" && (
            <div className="mb-6 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
                Kein Termin nötig
              </p>
              <h1 className="text-2xl font-bold text-secondary sm:text-3xl">
                Zulassung anfragen – in wenigen Fingertipps
              </h1>
              <p className="mt-2 text-muted-foreground">
                Ein, zwei Antworten antippen – dann steht Ihre WhatsApp-Nachricht fertig bereit.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Kein WhatsApp? Rufen Sie an:{" "}
                <a href={TELEFON_LINK} className="font-semibold text-link hover:underline">
                  {TELEFON_ANZEIGE}
                </a>{" "}
                – oder kommen Sie einfach vorbei, Werler Straße 68.
              </p>
            </div>
          )}

          <div className="rounded-3xl border border-border bg-background p-5 shadow-sm sm:p-8">
            {/* Kopf: Zurück + Fortschritt */}
            <div className="mb-5 flex items-center justify-between gap-3">
              {schritt !== "was" || vonPreise ? (
                <button
                  type="button"
                  onClick={zurueck}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-primary"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Zurück
                </button>
              ) : (
                <span />
              )}
              {schritt !== "fertig" && gesamtSchritte > 1 && (
                <span className="text-xs font-semibold text-muted-foreground">
                  Schritt {aktuellerSchritt} von {gesamtSchritte}
                </span>
              )}
            </div>

            {schritt === "was" ? (
              <h2 className="mb-5 text-xl font-bold text-secondary">{titel}</h2>
            ) : (
              <h1 className="mb-5 text-xl font-bold text-secondary sm:text-2xl">{titel}</h1>
            )}

            {schritt === "was" && (
              <div className="space-y-3">
                {VORGAENGE.map((o) => (
                  <Karte key={o.wert} option={o} onWahl={(w) => setze("vorgang", w)} />
                ))}
              </div>
            )}

            {schritt === "art" && (
              <div className="space-y-3">
                {(vorgang === "sonder" ? SONDER_ARTEN : ARTEN).map((o) => (
                  <Karte key={o.wert} option={o} onWahl={(w) => setze("art", w)} />
                ))}
              </div>
            )}

            {schritt === "evb" && (
              <>
                <p className="-mt-3 mb-4 text-sm text-muted-foreground">
                  Die eVB-Nummer bekommen Sie von Ihrer Kfz-Versicherung. Ohne sie geht keine Zulassung.
                </p>
                <div className="space-y-3">
                  {EVB_OPTIONEN.map((o) => (
                    <Karte key={o.wert} option={o} onWahl={(w) => setze("evb", w)} />
                  ))}
                </div>
              </>
            )}


            {schritt === "fertig" && (
              <div className="space-y-6">
                {/* Versicherung vergleichen: ganz oben, wenn die eVB fehlt oder der Kunde vergleichen will */}
                {(evb === "nein" || evb === "vergleich") && (
                  <Link
                    to="/kfz-versicherung"
                    className="flex items-center gap-3 rounded-xl border-2 border-trust-green/50 bg-trust-green/10 p-4 transition-colors hover:border-trust-green"
                  >
                    <ShieldCheck className="h-9 w-9 flex-none text-trust-green" />
                    <span className="flex-1">
                      <span className="block font-bold text-secondary">
                        {evb === "nein"
                          ? "Zuerst: eVB-Nummer beantragen"
                          : "Kfz-Versicherung vergleichen"}
                      </span>
                      <span className="block text-sm text-muted-foreground">
                        {evb === "nein"
                          ? "Kfz-Versicherung vergleichen und online abschließen – die eVB-Nummer kommt per E-Mail. Danach schicken Sie uns einfach die Nachricht unten."
                          : "Schauen Sie, ob es günstiger geht – Ihre Anfrage bei uns können Sie trotzdem gleich abschicken."}
                      </span>
                    </span>
                    <ArrowRight className="h-5 w-5 flex-none text-trust-green" />
                  </Link>
                )}

                {/* Die fertige Nachricht */}
                <div>
                  <p className="mb-2 text-sm text-muted-foreground">
                    {vorgang === "frage"
                      ? "WhatsApp öffnet sich – schreiben Sie Ihre Frage einfach dazu."
                      : vorgang === "verkaufen"
                        ? "Die Nachricht ist vorbereitet – ergänzen Sie Marke, Baujahr und Kilometerstand."
                        : "Diese Nachricht geht an uns – Sie müssen sie nur noch absenden:"}
                  </p>
                  <div className="whitespace-pre-wrap rounded-xl border border-[#25D366]/40 bg-[#25D366]/10 p-4 font-mono text-sm text-secondary">
                    {nachricht}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    size="lg"
                    asChild
                    className="h-14 bg-[#25D366] text-base font-bold text-white hover:bg-[#1fb257]"
                  >
                    <a href={whatsappLink(nachricht)} target="_blank" rel="noopener noreferrer" onClick={whatsappGeklickt}>
                      <MessageCircle className="mr-2 h-5 w-5" />
                      In WhatsApp öffnen und senden
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href={TELEFON_LINK}>
                      <Phone className="mr-2 h-4 w-4" />
                      Kein WhatsApp? Anrufen: {TELEFON_ANZEIGE}
                    </a>
                  </Button>
                </div>

                {/* Abmeldung: Sicherheitscodes erklären */}
                {vorgang === "abmelden" && (
                  <div className="rounded-xl border border-border p-4">
                    <h2 className="mb-2 font-bold text-secondary">
                      Für die Blitzabmeldung in wenigen Minuten
                    </h2>
                    <p className="mb-3 text-sm text-muted-foreground">
                      Fahrzeuge, die ab 2015 zugelassen wurden, haben Sicherheitscodes zum Freirubbeln –
                      auf dem Fahrzeugschein und auf den Plaketten der Kennzeichen. Nicht freirubbeln,
                      das machen wir.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      <img src={zb1CodeImg} alt="Verdeckter Sicherheitscode auf dem Fahrzeugschein" className="rounded-lg border border-border" loading="lazy" />
                      <img src={plaketteImg} alt="Verdeckter Sicherheitscode auf der Kennzeichen-Plakette" className="rounded-lg border border-border" loading="lazy" />
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">
                      Keine Codes? Kein Problem – dann erledigen wir die Abmeldung klassisch bis zum
                      nächsten Werktag.
                    </p>
                  </div>
                )}

                {/* Checkliste */}
                {checkliste && (
                  <div className="rounded-xl border border-border p-4">
                    <h2 className="mb-1 font-bold text-secondary">Das bringen Sie mit</h2>
                    <p className="mb-3 text-xs text-muted-foreground">
                      {checkliste.title}
                      {art === "unklar" && " – die häufigste Liste, im Chat klären wir den Rest"}
                    </p>
                    <ul className="space-y-2">
                      {checkliste.items.map((punkt) => (
                        <li key={punkt} className="flex items-start gap-2 text-sm text-secondary">
                          <CheckCircle className="mt-0.5 h-4 w-4 flex-none text-trust-green" />
                          <span>
                            {punkt}
                            {punkt.startsWith("eVB-Nummer") && (
                              <>
                                {" – "}
                                <Link to="/evb-nummer" className="font-semibold text-link hover:underline">
                                  was ist das?
                                </Link>
                              </>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-xs text-muted-foreground">
                      Vollmacht und SEPA-Mandat füllen Sie einfach bei uns vor Ort aus.
                    </p>
                  </div>
                )}



                {/* Ankauf: Formular als Alternative */}
                {vorgang === "verkaufen" && (
                  <details className="group rounded-xl border border-border p-4">
                    <summary className="cursor-pointer list-none font-semibold text-secondary">
                      <span className="text-primary group-open:hidden">▸ </span>
                      <span className="hidden text-primary group-open:inline">▾ </span>
                      Lieber per Formular? Fotos hier hochladen
                    </summary>
                    <div className="mt-4">
                      <AnkaufFormular />
                    </div>
                  </details>
                )}

                {/* So finden Sie uns */}
                {vorgang !== "frage" && (
                  <div className="rounded-xl bg-muted/50 p-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="mt-0.5 h-5 w-5 flex-none text-primary" />
                      <div className="text-sm">
                        <p className="font-bold text-secondary">Werler Straße 68, 32105 Bad Salzuflen</p>
                        <p className="text-muted-foreground">Mo–Fr 9–18 Uhr · Sa 15–18 Uhr · ohne Termin</p>
                        <p className="text-muted-foreground">Online-Zulassung rund um die Uhr</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild className="mt-3">
                      <a href={ROUTE_URL} target="_blank" rel="noopener noreferrer">
                        <Navigation className="mr-2 h-4 w-4" />
                        Route planen
                      </a>
                    </Button>
                  </div>
                )}

                <div className="text-center">
                  <Link to="/angebot" className="text-sm font-semibold text-muted-foreground hover:text-primary">
                    Andere Anfrage starten
                  </Link>
                </div>
              </div>
            )}
          </div>

          {schritt !== "fertig" && (
            <p className="mt-4 text-center text-sm text-muted-foreground">
              Lieber direkt sprechen?{" "}
              <a href={TELEFON_LINK} className="font-semibold text-link hover:underline">
                {TELEFON_ANZEIGE}
              </a>
            </p>
          )}
        </div>
      </section>

      {/* Häufige Fragen */}
      <section className="py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="section-title mb-6 text-center">Kurz beantwortet</h2>
          <Accordion type="single" collapsible className="space-y-3">
            {ANGEBOT_FAQS.map((faq, i) => (
              <AccordionItem key={faq.question} value={`a-${i}`} className="rounded-xl border border-border px-5">
                <AccordionTrigger className="text-left font-semibold text-secondary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {faq.answer}
                  {faq.question.startsWith("Was kostet") && (
                    <>
                      {" "}
                      <Link to="/preise" className="font-semibold text-link hover:underline">
                        Zur Preisübersicht
                      </Link>
                    </>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Angebot;
