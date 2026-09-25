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
import { BUSINESS } from "@/content/seoRoutes";
import { EXTRAS, PACKAGES, type PackageKey } from "@/content/preise";
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

const ROUTE_URL = BUSINESS.routeUrl;

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
    className="group flex w-full items-center gap-4 rounded-2xl border-2 border-primary/25 bg-[hsl(197_100%_98%)] p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:bg-white hover:shadow-md sm:p-5"
  >
    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-secondary text-primary">
      {ICONS[option.wert]}
    </span>
    <span className="flex-1">
      <span className="block text-base font-semibold text-secondary sm:text-lg">{option.titel}</span>
      {option.text && <span className="block text-sm text-muted-foreground">{option.text}</span>}
    </span>
    <ArrowRight className="h-5 w-5 flex-none text-muted-foreground transition-colors group-hover:text-link" />
  </button>
);

const preisVon = (key: PackageKey) => PACKAGES.find((p) => p.key === key)?.price ?? "";
const WUNSCH_PREIS = EXTRAS.find((e) => e.name === "Wunschkennzeichen")?.price ?? "";

/** „Was es kostet" – passend zum gewählten Vorgang; am Computer rechts neben der Anfrage */
const PreisKasten = ({ vorgang, paket }: { vorgang?: Vorgang; paket?: string | null }) => {
  const zeilen: { name: string; preis: string; key?: string }[] =
    vorgang === "zulassen"
      ? [
          { name: "Ummeldung (Kennzeichen bleiben dran)", preis: preisVon("ummeldung"), key: "ummeldung" },
          { name: "Sofort-Zulassung (ca. 20 Min., ohne Schilder)", preis: preisVon("sofort"), key: "sofort" },
          { name: "Mit Kennzeichen (nächster Werktag)", preis: preisVon("basis"), key: "basis" },
          { name: "Mit Hol- und Bringservice", preis: preisVon("premium"), key: "premium" },
          { name: "Wunschkennzeichen (Gebühr des Amts)", preis: WUNSCH_PREIS },
        ]
      : vorgang === "abmelden"
        ? [
            { name: "Sofortabmeldung", preis: preisVon("abmeldung"), key: "abmeldung" },
            { name: "Wenn wir Ihr Auto ankaufen", preis: "kostenlos" },
          ]
        : vorgang === "sonder"
          ? [{ name: "Kurzzeit- oder Ausfuhrkennzeichen", preis: "Preis im Chat" }]
          : vorgang === "verkaufen"
            ? [
                { name: "Angebot für Ihr Auto", preis: "kostenlos" },
                { name: "Abmeldung beim Ankauf", preis: "gratis" },
              ]
            : [
                { name: "Ummeldung", preis: preisVon("ummeldung") },
                { name: "Zulassung mit Kennzeichen", preis: preisVon("basis") },
                { name: "Sofortabmeldung", preis: preisVon("abmeldung") },
                { name: "Wunschkennzeichen", preis: WUNSCH_PREIS },
                { name: "Angebot für Ihr Auto", preis: "kostenlos" },
              ];

  return (
    <div className="rounded-2xl bg-secondary p-5 text-white shadow-lg">
      <h2 className="mb-3 text-lg font-bold text-white">Was es kostet</h2>
      <ul className="space-y-2">
        {zeilen.map((zeile) => (
          <li
            key={zeile.name}
            className={`flex items-baseline justify-between gap-3 rounded-lg px-2 py-1.5 text-sm ${
              zeile.key && zeile.key === paket ? "bg-white/15 font-semibold" : ""
            }`}
          >
            <span className="text-white/90">{zeile.name}</span>
            <span className="whitespace-nowrap font-bold text-primary">{zeile.preis}</span>
          </li>
        ))}
      </ul>
      {vorgang !== "verkaufen" && (
        <p className="mt-3 text-sm text-white/85">
          Alle Preise inklusive Gebühren des Kreises.{" "}
          <span className="font-semibold text-white">
            Bezahlt wird erst, wenn alles fertig ist – also wenn Ihr Auto zugelassen oder abgemeldet ist.
          </span>
        </p>
      )}
      {vorgang === "verkaufen" && (
        <p className="mt-3 text-sm text-white/85">Sie entscheiden erst, wenn Sie unser Angebot kennen.</p>
      )}
      <p className="mt-3 border-t border-white/20 pt-3 text-sm font-semibold text-white">
        <span className="text-[hsl(var(--cta-orange))]">★★★★★</span> 5,0 · {BUSINESS.reviewCount} Google-Bewertungen
      </p>
    </div>
  );
};

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

  const wunsch = params.get("wunsch") === "1";
  const antworten = { vorgang, art, evb, paket: paket ?? undefined, wunsch };
  const nachricht = baueNachricht(antworten);
  const checkliste = checklisteFuer(antworten);

  const whatsappGeklickt = () => {
    // Zählt nur, wenn Analytics per Zustimmung geladen wurde
    window.gtag?.("event", "generate_lead", { method: "whatsapp", quelle: "anfrage", vorgang: vorgang ?? "unbekannt" });
  };

  const titel =
    schritt === "was"
      ? "Was möchten Sie erledigen?"
      : schritt === "art"
        ? "Worum geht es genau?"
        : schritt === "evb"
          ? "Haben Sie schon die eVB-Nummer für dieses Auto?"
          : vorgang === "verkaufen"
            ? "Unverbindliches Angebot für Ihr Auto"
            : vorgang === "frage"
              ? "Stellen Sie uns Ihre Frage"
              : "Fast geschafft – nur noch absenden";

  return (
    <div className="min-h-screen bg-background">
      <Seo
        path="/angebot"
      />
      <Header />

      <section className="bg-gradient-to-b from-[hsl(197_100%_90%)] via-[hsl(197_90%_95%)] to-background py-8 sm:py-12">
        <div
          className={`mx-auto max-w-2xl px-4 sm:px-6 ${
            schritt === "fertig" ? "lg:grid lg:max-w-5xl lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-8" : ""
          }`}
        >
          <div>
          {schritt === "was" && (
            <div className="mb-6 text-center">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-link">
                Kein Termin nötig
              </p>
              <h1 className="text-2xl font-bold text-secondary sm:text-3xl">
                Anfrage in wenigen Fingertipps
              </h1>
              <p className="mt-2 text-base text-secondary">
                Zwei, drei Antworten antippen – dann steht Ihre WhatsApp-Nachricht fertig bereit.
                Kostenlos und unverbindlich.
              </p>
              <p className="mt-2 text-sm font-semibold text-secondary">
                <span className="text-[hsl(var(--cta-orange))]">★★★★★</span> 5,0 · {BUSINESS.reviewCount} Google-Bewertungen
              </p>
              <p className="mt-2 text-sm text-secondary">
                Kein WhatsApp? Rufen Sie an:{" "}
                <a href={TELEFON_LINK} className="font-semibold text-link hover:underline">
                  {TELEFON_ANZEIGE}
                </a>{" "}
                (Mo–Fr 9–18 Uhr, Sa 15–18 Uhr)
              </p>
            </div>
          )}

          <div className="overflow-hidden rounded-3xl border border-primary/30 bg-background shadow-lg">
            {/* Farbiger Fortschrittsbalken */}
            <div className="h-2 bg-primary/20">
              <div
                className="h-full bg-[hsl(var(--cta-orange))] transition-all"
                style={{ width: `${schritt === "fertig" ? 100 : Math.round((aktuellerSchritt / (gesamtSchritte + 1)) * 100)}%` }}
              />
            </div>
            <div className="p-5 sm:p-8">
            {/* Kopf: Zurück + Fortschritt */}
            <div className="mb-5 flex items-center justify-between gap-3">
              {schritt !== "was" || vonPreise ? (
                <button
                  type="button"
                  onClick={zurueck}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-base font-semibold text-secondary hover:border-primary hover:text-link"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Zurück
                </button>
              ) : (
                <span />
              )}
              {schritt !== "fertig" && gesamtSchritte > 1 && (
                <span className="rounded-full bg-secondary px-3 py-1 text-sm font-semibold text-white">
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
              <>
                <div className="space-y-3">
                  {(vorgang === "sonder" ? SONDER_ARTEN : ARTEN).map((o) => (
                    <Karte key={o.wert} option={o} onWahl={(w) => setze("art", w)} />
                  ))}
                </div>
                {vorgang === "zulassen" && (
                  <p className="mt-4 text-sm text-secondary">
                    Motorrad, Anhänger, Wohnmobil, Saison- oder Wunschkennzeichen? Wählen Sie einfach den
                    passenden Fall – die Besonderheit schreiben Sie mit in die Nachricht.
                  </p>
                )}
              </>
            )}

            {schritt === "evb" && (
              <>
                <p className="-mt-3 mb-4 text-base text-secondary">
                  Die eVB-Nummer ist ein Code aus 7 Zeichen, zum Beispiel AB12C34. Sie bekommen ihn von Ihrer
                  Kfz-Versicherung per SMS oder E-Mail. Auch wenn Sie schon versichert sind, braucht dieses
                  Auto eine eigene Nummer – meist reicht ein Anruf bei Ihrer Versicherung.
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
                {/* Die fertige Nachricht */}
                {/* Auf dem Handy steht der Preis hier, am Computer rechts daneben */}
                <div className="lg:hidden">
                  <PreisKasten vorgang={vorgang} paket={paket} />
                </div>

                <div>
                  <p className="mb-2 text-base text-secondary">
                    {vorgang === "frage"
                      ? "Tippen Sie auf den grünen Knopf – WhatsApp öffnet sich, dann schreiben Sie Ihre Frage dazu."
                      : vorgang === "verkaufen"
                        ? "Tippen Sie auf den grünen Knopf. In WhatsApp schreiben Sie hinter jeden Doppelpunkt kurz die Antwort und tippen auf Senden ➤."
                        : "Tippen Sie auf den grünen Knopf – WhatsApp öffnet sich mit dieser Nachricht. Dann nur noch auf Senden ➤ tippen."}
                  </p>
                  <div className="ml-auto max-w-md whitespace-pre-wrap rounded-2xl rounded-br-sm bg-[#dcf8c6] p-4 text-base text-secondary shadow-sm">
                    {nachricht}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <Button
                    size="lg"
                    asChild
                    className="h-auto min-h-14 whitespace-normal bg-[#15803d] py-3 text-center text-base font-bold text-white hover:bg-[#166534]"
                  >
                    <a href={whatsappLink(nachricht)} target="_blank" rel="noopener noreferrer" onClick={whatsappGeklickt}>
                      <MessageCircle className="mr-2 h-5 w-5" />
                      WhatsApp öffnen – Nachricht ist fertig
                    </a>
                  </Button>
                  <p className="text-center text-sm text-secondary">
                    <span className="text-[hsl(var(--cta-orange))]">★</span> 5,0 bei {BUSINESS.reviewCount} Google-Bewertungen ·
                    Kostenlos und unverbindlich – mit der Nachricht beauftragen Sie noch nichts.
                  </p>
                  <Button size="lg" variant="outline" asChild className="h-auto whitespace-normal py-3 text-center">
                    <a href={TELEFON_LINK}>
                      <Phone className="mr-2 h-4 w-4 flex-none" />
                      Kein WhatsApp oder am Computer? Anrufen: {TELEFON_ANZEIGE}
                    </a>
                  </Button>
                  {vorgang !== "frage" && vorgang !== "verkaufen" && (
                    <p className="text-sm text-secondary">
                      Sie erledigen das für einen Angehörigen oder haben einen besonderen Fall? Schreiben Sie
                      es einfach mit in die Nachricht. Wir sagen Ihnen dann genau, welche Papiere Sie brauchen.
                    </p>
                  )}
                </div>

                {/* Versicherung erst nach dem Absenden – vorher würde der Kunde die Seite verlassen */}
                {(evb === "nein" || evb === "vergleich") && (
                  <a
                    href="/kfz-versicherung"
                    target="_blank"
                    rel="noopener"
                    className="flex items-center gap-3 rounded-xl border-2 border-trust-green/50 bg-trust-green/10 p-4 transition-colors hover:border-trust-green"
                  >
                    <ShieldCheck className="h-9 w-9 flex-none text-trust-green" />
                    <span className="flex-1">
                      <span className="block font-bold text-secondary">
                        {evb === "nein"
                          ? "Nach dem Absenden: Kfz-Versicherung vergleichen"
                          : "Erst absenden, dann in Ruhe vergleichen"}
                      </span>
                      <span className="block text-sm text-secondary">
                        {evb === "nein"
                          ? "Schicken Sie uns die Nachricht ruhig jetzt schon. Die eVB-Nummer bekommen Sie mit einer Kfz-Versicherung – hier können Sie Tarife vergleichen und online abschließen. Die Nummer schreiben Sie uns dann einfach in den Chat."
                          : "Ihre Anfrage bleibt bestehen. Schauen Sie in Ruhe, ob es günstiger geht – der Vergleich öffnet sich in einem neuen Fenster."}
                      </span>
                    </span>
                    <ArrowRight className="h-5 w-5 flex-none text-trust-green" />
                  </a>
                )}

                {/* Abmeldung: Sicherheitscodes erklären */}
                {vorgang === "abmelden" && (
                  <div className="rounded-xl border border-border p-4">
                    <h2 className="mb-2 font-bold text-secondary">
                      Für die Sofortabmeldung in wenigen Minuten
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
                    <p className="mt-3 text-sm text-secondary">
                      Keine Codes oder schon freigerubbelt? Kein Problem – dann erledigen wir die Abmeldung
                      klassisch bis zum nächsten Werktag. Kennzeichen oder Fahrzeugschein verloren? Schreiben
                      Sie es einfach mit in die Nachricht – wir sagen Ihnen, was Sie brauchen.
                    </p>
                  </div>
                )}

                {/* Checkliste */}
                {checkliste && (
                  <div className="rounded-xl border border-border p-4">
                    <h2 className="mb-1 font-bold text-secondary">Das bringen Sie mit</h2>
                    <p className="mb-3 text-sm text-secondary">
                      {checkliste.title}
                      {art === "unklar" && " – die häufigste Liste, im Chat klären wir den Rest"}
                    </p>
                    <ul className="space-y-2">
                      {checkliste.items.map((punkt) => (
                        <li key={punkt} className="flex items-start gap-2 text-base text-secondary">
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
                    {checkliste.hint && <p className="mt-3 text-sm text-secondary">{checkliste.hint}</p>}
                    {vorgang === "zulassen" && (
                      <p className="mt-3 text-sm text-secondary">
                        Sie sind selbst der Halter? Dann füllen Sie Vollmacht und SEPA-Mandat einfach bei uns
                        aus. Sie erledigen das für jemand anderen (z. B. Eltern oder Partner)? Dann bringen Sie
                        die vom Halter unterschriebene Vollmacht, seinen Ausweis oder eine Kopie und das
                        unterschriebene SEPA-Mandat mit –{" "}
                        <Link to="/dokumente" className="font-semibold text-link hover:underline">
                          Vordrucke unter Formulare
                        </Link>
                        .
                      </p>
                    )}
                  </div>
                )}



                {/* Ankauf: Formular als Alternative */}
                {vorgang === "verkaufen" && (
                  <details className="group rounded-xl border border-border p-4">
                    <summary className="cursor-pointer list-none font-semibold text-secondary">
                      <span className="text-link group-open:hidden">▸ </span>
                      <span className="hidden text-link group-open:inline">▾ </span>
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
                  <Link to="/angebot" className="text-sm font-semibold text-muted-foreground hover:text-link">
                    Andere Anfrage starten
                  </Link>
                </div>
              </div>
            )}
            </div>
          </div>

          {schritt !== "fertig" && (
            <p className="mt-4 text-center text-sm text-secondary">
              Lieber direkt sprechen?{" "}
              <a href={TELEFON_LINK} className="font-semibold text-link hover:underline">
                {TELEFON_ANZEIGE}
              </a>
            </p>
          )}
          </div>

          {/* Preis rechts neben der fertigen Nachricht (nur Computer) */}
          {schritt === "fertig" && (
            <aside className="hidden lg:sticky lg:top-44 lg:block">
              <PreisKasten vorgang={vorgang} paket={paket} />
            </aside>
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
