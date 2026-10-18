import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  EVB_OPTIONEN,
  KENNZEICHEN_OPTIONEN,
  SONDER_ARTEN,
  TELEFON_ANZEIGE,
  TELEFON_LINK,
  VORGAENGE,
  baueNachricht,
  brauchtEvbFrage,
  checklisteFuer,
  kennzeichenAusPaket,
  vorgangAusPaket,
  whatsappLink,
  type Auswahl,
  type Evb,
  type Kennzeichen,
  type SonderArt,
  type Vorgang,
} from "@/content/whatsappAnfrage";
import faqSchema from "@/content/faqSchema.json";
import { BUSINESS } from "@/content/seoRoutes";
import { EXTRAS, PACKAGES, type PackageKey } from "@/content/preise";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Car,
  CheckCircle,
  FileMinus,
  Globe,
  MapPin,
  MessageCircle,
  Navigation,
  Phone,
  RectangleHorizontal,
  ShieldCheck,
  Timer,
  Zap,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";

const ANGEBOT_FAQS: { question: string; answer: string }[] = faqSchema["/angebot"];

const ROUTE_URL = BUSINESS.routeUrl;

const ICONS: Record<string, ReactNode> = {
  zulassen: <Car className="h-6 w-6" />,
  abmelden: <FileMinus className="h-6 w-6" />,
  sonder: <Timer className="h-6 w-6" />,
  verkaufen: <Banknote className="h-6 w-6" />,
  frage: <MessageCircle className="h-6 w-6" />,
  mit: <RectangleHorizontal className="h-6 w-6" />,
  ohne: <Zap className="h-6 w-6" />,
  bleiben: <Car className="h-6 w-6" />,
  kurzzeit: <Timer className="h-6 w-6" />,
  ausfuhr: <Globe className="h-6 w-6" />,
  ja: <CheckCircle className="h-6 w-6" />,
  nein: <ShieldCheck className="h-6 w-6" />,
};

const istVorgang = (v: string | null): v is Vorgang =>
  v === "zulassen" || v === "abmelden" || v === "sonder" || v === "verkaufen" || v === "frage";
const istKz = (v: string | null): v is Kennzeichen => v === "mit" || v === "ohne" || v === "bleiben";
const istSonder = (v: string | null): v is SonderArt => v === "kurzzeit" || v === "ausfuhr";
const istEvb = (v: string | null): v is Evb => v === "ja" || v === "nein";

/** Große Antwortkarte – ein Tipp genügt. Mit Preis, damit klar ist, was es kostet. */
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
    {option.preis && <span className="whitespace-nowrap text-base font-bold text-link sm:text-lg">{option.preis}</span>}
    <ArrowRight className="h-5 w-5 flex-none text-muted-foreground transition-colors group-hover:text-link" />
  </button>
);

const preisVon = (key: PackageKey) => PACKAGES.find((p) => p.key === key)?.price ?? "";
const WUNSCH_PREIS = EXTRAS.find((e) => e.name === "Wunschkennzeichen")?.price ?? "";

/** „Was es kostet" – passend zur Antwort; am Computer rechts neben der Anfrage */
const PreisKasten = ({ vorgang, kz, paket }: { vorgang?: Vorgang; kz?: Kennzeichen; paket?: string | null }) => {
  const zeilen: { name: string; preis: string; aktiv?: boolean }[] =
    vorgang === "zulassen" && kz === "mit"
      ? [
          { name: "Bis zum nächsten Werktag, mit Kennzeichen", preis: preisVon("basis"), aktiv: paket !== "premium" },
          { name: "Mit Hol- und Bringservice", preis: preisVon("premium"), aktiv: paket === "premium" },
          { name: "Wunschkennzeichen (Gebühr des Amts)", preis: WUNSCH_PREIS },
        ]
      : vorgang === "zulassen" && kz === "ohne"
        ? [
            { name: "Online direkt vor Ort, ca. 20 Min. – Schilder besorgen Sie selbst", preis: preisVon("sofort"), aktiv: true },
            { name: "Wunschkennzeichen (Gebühr des Amts)", preis: WUNSCH_PREIS },
          ]
        : vorgang === "zulassen"
          ? [{ name: "Ummeldung – Kennzeichen bleiben dran", preis: preisVon("ummeldung"), aktiv: true }]
          : vorgang === "abmelden"
            ? [
                { name: "Sofortabmeldung", preis: preisVon("abmeldung"), aktiv: true },
                { name: "Wenn wir Ihr Auto ankaufen", preis: "kostenlos" },
              ]
            : vorgang === "sonder"
              ? [{ name: "Kurzzeit- oder Ausfuhrkennzeichen", preis: "Preis im Chat" }]
              : [
                  { name: "Angebot für Ihr Auto", preis: "kostenlos" },
                  { name: "Abmeldung beim Ankauf", preis: "gratis" },
                ];

  return (
    <div className="rounded-2xl bg-secondary p-5 text-white shadow-lg">
      <h2 className="mb-3 text-lg font-bold text-white">Was es kostet</h2>
      <ul className="space-y-2">
        {zeilen.map((zeile) => (
          <li
            key={zeile.name}
            className={`flex items-baseline justify-between gap-3 rounded-lg px-2 py-1.5 text-sm ${
              zeile.aktiv ? "bg-white/15 font-semibold" : ""
            }`}
          >
            <span className="text-white/90">{zeile.name}</span>
            <span className="whitespace-nowrap font-bold text-primary">{zeile.preis}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-white/85">
        {vorgang === "verkaufen"
          ? "Sie entscheiden erst, wenn Sie unser Angebot kennen."
          : "Inklusive Gebühren des Amts – bezahlt wird erst, wenn alles fertig ist."}
      </p>
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
  const [ankauf, setAnkauf] = useState({ modell: "", baujahr: "", km: "" });
  const [ankaufFehler, setAnkaufFehler] = useState("");

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
  const kzAusUrl = params.get("kz");
  // Alte Links mit ?art=umzug heißen jetzt „Kennzeichen bleiben dran"
  const kz: Kennzeichen | undefined = istKz(kzAusUrl)
    ? kzAusUrl
    : kennzeichenAusPaket(paket) ?? (params.get("art") === "umzug" ? "bleiben" : undefined);
  // Neuwagen oder Wiederzulassung (alte Links) können die Kennzeichen nicht behalten
  const neueSchilderNoetig = params.get("art") === "neu" || params.get("art") === "wieder";
  const sonder = istSonder(params.get("art")) ? (params.get("art") as SonderArt) : undefined;
  const evb = istEvb(params.get("evb")) ? (params.get("evb") as Evb) : undefined;
  const mitEvbSchritt = brauchtEvbFrage({ vorgang, kz });

  // Keine Frage nach dem Zeitpunkt – das klären wir im Chat, sonst schreckt es ab
  const schritt: "was" | "kz" | "sonder" | "evb" | "fertig" = !vorgang
    ? "was"
    : vorgang === "zulassen" && !kz
      ? "kz"
      : vorgang === "sonder" && !sonder
        ? "sonder"
        : mitEvbSchritt && evb !== "ja"
          ? "evb"
          : "fertig";

  const gesamtSchritte =
    vorgang === "zulassen" ? (kz === "bleiben" ? 2 : 3) : vorgang === "sonder" ? 2 : 1;
  const aktuellerSchritt = schritt === "was" ? 1 : schritt === "kz" || schritt === "sonder" ? 2 : schritt === "evb" ? 3 : gesamtSchritte;

  /** Jede Antwort ist ein eigener Verlaufseintrag – Browser-Zurück geht genau einen Schritt zurück */
  const setze = (schluessel: "vorgang" | "kz" | "art" | "evb", wert: string) => {
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
    if (schritt === "fertig" && evb) neu.delete("evb");
    else if (istKz(kzAusUrl)) neu.delete("kz");
    else if (sonder) neu.delete("art");
    else if (!vorgangVorgegeben && istVorgang(vorgangAusUrl)) neu.delete("vorgang");
    else {
      navigate(vonPreise ? "/preise" : "/");
      return;
    }
    const rest = neu.toString();
    navigate(rest ? `/angebot?${rest}` : "/angebot");
  };

  const wunsch = params.get("wunsch") === "1";
  const antworten = { vorgang, kz, sonder, evb, paket: paket ?? undefined, wunsch, ankauf };
  const nachricht = baueNachricht(antworten);
  const checkliste = checklisteFuer(antworten);

  const whatsappGeklickt = () => {
    // Zählt nur, wenn Analytics per Zustimmung geladen wurde
    window.gtag?.("event", "generate_lead", { method: "whatsapp", quelle: "anfrage", vorgang: vorgang ?? "unbekannt" });
  };

  const titel =
    schritt === "was"
      ? "Was möchten Sie erledigen?"
      : schritt === "kz"
        ? "Wie möchten Sie zulassen?"
        : schritt === "sonder"
          ? "Welches Kennzeichen brauchen Sie?"
          : schritt === "evb"
            ? "Haben Sie schon eine eVB-Nummer?"
            : vorgang === "verkaufen"
              ? "Unverbindliches Angebot für Ihr Auto"
              : vorgang === "frage"
                ? "Stellen Sie uns Ihre Frage"
                : "Fast geschafft – nur noch absenden";

  const eingabe =
    "mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-base text-secondary focus:border-primary focus:outline-none";

  return (
    <div className="min-h-screen bg-background">
      <Seo path="/angebot" />
      <Header />

      <section className="bg-gradient-to-b from-[hsl(197_100%_90%)] via-[hsl(197_90%_95%)] to-background py-8 sm:py-12">
        <div
          className={`mx-auto max-w-2xl px-4 sm:px-6 ${
            schritt === "fertig" && vorgang !== "frage"
              ? "lg:grid lg:max-w-5xl lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-8"
              : ""
          }`}
        >
          <div>
            {schritt === "was" && (
              <div className="mb-6 text-center">
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-link">Kein Termin nötig</p>
                <h1 className="text-2xl font-bold text-secondary sm:text-3xl">Anfrage in wenigen Fingertipps</h1>
                <p className="mt-2 text-base text-secondary">Kostenlos und unverbindlich – per WhatsApp.</p>
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

                {schritt === "kz" && (
                  <div className="space-y-3">
                    {KENNZEICHEN_OPTIONEN.filter((o) => !(neueSchilderNoetig && o.wert === "bleiben")).map((o) => (
                      <Karte key={o.wert} option={o} onWahl={(w) => setze("kz", w)} />
                    ))}
                  </div>
                )}

                {schritt === "sonder" && (
                  <div className="space-y-3">
                    {SONDER_ARTEN.map((o) => (
                      <Karte key={o.wert} option={o} onWahl={(w) => setze("art", w)} />
                    ))}
                  </div>
                )}

                {schritt === "evb" && (
                  <>
                    <p className="-mt-3 mb-4 text-base text-secondary">
                      Die bekommen Sie von Ihrer Kfz-Versicherung – ein Code aus 7 Zeichen, z. B. AB12C34.
                    </p>
                    <div className="space-y-3">
                      {EVB_OPTIONEN.map((o) => (
                        <Karte
                          key={o.wert}
                          option={o}
                          // Ohne eVB geht keine Zulassung – direkt zum Vergleich, dort gibt es auch Hilfe per Telefon und WhatsApp
                          onWahl={(w) => (w === "nein" ? navigate("/kfz-versicherung#vergleich") : setze("evb", w))}
                        />
                      ))}
                    </div>
                  </>
                )}

                {schritt === "fertig" && (
                  <div className="space-y-6">
                    {vorgang === "verkaufen" ? (
                      <div className="space-y-3">
                        <p className="text-base text-secondary">
                          Kurz eintragen – dann öffnet sich WhatsApp mit Ihren Angaben.
                        </p>
                        <label className="block text-sm font-medium text-secondary">
                          Marke und Modell *
                          <input
                            className={eingabe}
                            placeholder="z. B. VW Golf"
                            value={ankauf.modell}
                            onChange={(e) => {
                              setAnkauf({ ...ankauf, modell: e.target.value });
                              setAnkaufFehler("");
                            }}
                          />
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <label className="block text-sm font-medium text-secondary">
                            Baujahr
                            <input
                              className={eingabe}
                              inputMode="numeric"
                              placeholder="z. B. 2014"
                              value={ankauf.baujahr}
                              onChange={(e) => setAnkauf({ ...ankauf, baujahr: e.target.value })}
                            />
                          </label>
                          <label className="block text-sm font-medium text-secondary">
                            Kilometerstand
                            <input
                              className={eingabe}
                              inputMode="numeric"
                              placeholder="z. B. 145000"
                              value={ankauf.km}
                              onChange={(e) => setAnkauf({ ...ankauf, km: e.target.value })}
                            />
                          </label>
                        </div>
                        {ankaufFehler && <p className="text-sm font-medium text-red-600">{ankaufFehler}</p>}
                      </div>
                    ) : (
                      <div>
                        <p className="mb-2 text-base text-secondary">
                          {vorgang === "frage"
                            ? "WhatsApp öffnet sich – dann schreiben Sie Ihre Frage dazu."
                            : "WhatsApp öffnet sich mit dieser Nachricht – dann nur noch auf Senden ➤ tippen."}
                        </p>
                        <div className="ml-auto max-w-md whitespace-pre-wrap rounded-2xl rounded-br-sm bg-[#dcf8c6] p-4 text-base text-secondary shadow-sm">
                          {nachricht}
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col gap-3">
                      <Button
                        size="lg"
                        asChild
                        className="h-auto min-h-14 whitespace-normal bg-[#15803d] py-3 text-center text-base font-bold text-white hover:bg-[#166534]"
                      >
                        <a
                          href={whatsappLink(nachricht)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            if (vorgang === "verkaufen" && !ankauf.modell.trim()) {
                              e.preventDefault();
                              setAnkaufFehler("Bitte tragen Sie mindestens Marke und Modell ein.");
                              return;
                            }
                            whatsappGeklickt();
                          }}
                        >
                          <MessageCircle className="mr-2 h-5 w-5" />
                          {vorgang === "verkaufen" ? "Per WhatsApp senden" : "WhatsApp öffnen – Nachricht ist fertig"}
                        </a>
                      </Button>
                      {vorgang === "verkaufen" && (
                        <p className="text-center text-sm text-secondary">Fotos können Sie in WhatsApp gleich hinterherschicken.</p>
                      )}
                      <Button size="lg" variant="outline" asChild className="h-auto whitespace-normal py-3 text-center">
                        <a href={TELEFON_LINK}>
                          <Phone className="mr-2 h-4 w-4 flex-none" />
                          Kein WhatsApp? Anrufen: {TELEFON_ANZEIGE}
                        </a>
                      </Button>
                    </div>

                    {/* Auf dem Handy steht der Preis unter dem WhatsApp-Knopf (der Preis stand schon auf der Auswahl), am Computer rechts daneben */}
                    {vorgang !== "frage" && (
                      <div className="lg:hidden">
                        <PreisKasten vorgang={vorgang} kz={kz} paket={paket} />
                      </div>
                    )}

                    {/* Unterlagen – kurz */}
                    {checkliste && (
                      <div className="rounded-xl border border-border p-4">
                        <h2 className="mb-3 font-bold text-secondary">Das bringen Sie mit</h2>
                        <ul className="space-y-2">
                          {checkliste.items.map((punkt) => (
                            <li key={punkt} className="flex items-start gap-2 text-base text-secondary">
                              <CheckCircle className="mt-0.5 h-4 w-4 flex-none text-trust-green" />
                              <span>{punkt}</span>
                            </li>
                          ))}
                        </ul>
                        {checkliste.hint && <p className="mt-3 text-sm text-secondary">{checkliste.hint}</p>}
                        {vorgang === "zulassen" && (
                          <p className="mt-3 text-sm text-secondary">
                            Für jemand anderen? Dann Vollmacht und Ausweis des Halters mitbringen –{" "}
                            <Link to="/dokumente" className="font-semibold text-link hover:underline">
                              Vordrucke unter Formulare
                            </Link>
                            .
                          </p>
                        )}
                      </div>
                    )}

                    {/* So finden Sie uns */}
                    {vorgang !== "frage" && vorgang !== "verkaufen" && (
                      <div className="rounded-xl bg-muted/50 p-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="mt-0.5 h-5 w-5 flex-none text-primary" />
                          <div className="text-sm">
                            <p className="font-bold text-secondary">Werler Straße 68, 32105 Bad Salzuflen</p>
                            <p className="text-muted-foreground">Mo–Fr 9–18 Uhr · Sa 15–18 Uhr · ohne Termin</p>
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
          {schritt === "fertig" && vorgang !== "frage" && (
            <aside className="hidden lg:sticky lg:top-44 lg:block">
              <PreisKasten vorgang={vorgang} kz={kz} paket={paket} />
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
