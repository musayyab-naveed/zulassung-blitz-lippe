import { useEffect, useMemo, useState } from "react";
import { Star, Receipt, Banknote } from "lucide-react";
import paypalLogo from "@/assets/payments/paypal.svg";
import mastercardLogo from "@/assets/payments/mastercard.svg";
import visaLogo from "@/assets/payments/visa.svg";
import applePayLogo from "@/assets/payments/applepay.svg";
import sepaLogo from "@/assets/payments/sepa.svg";
import googleLogo from "@/assets/google-g.svg";
import { BUSINESS } from "@/content/seoRoutes";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const GoogleReviews = () => {
  const [api, setApi] = useState<CarouselApi>();

  const reviews = [
    { name: "Daniel", rating: 5, text: "Schneller und unkomplizierter Service, ich musste sehr schnell meinen Neuwagen zulassen und mir wurde kompetent geholfen." },
    { name: "Christoph Meyer", rating: 5, text: "Ich habe diesen Zulassungsdienst schon zum zweiten Mal beauftragt und bin wieder absolut zufrieden." },
    { name: "Olga Keller", rating: 5, text: "Wenn man schnell und unkompliziert sein Auto anmelden möchte, einfach perfekt. Sehr nett und kompetent." },
    { name: "Vivian Stahn-Mayala", rating: 5, text: "Schneller und zuverlässiger Top Service. Kann ich nur weiterempfehlen." },
    { name: "Martin Cygon", rating: 5, text: "Top Service. Freitag Unterlagen abgegeben, Montag alles fertig. Sehr professionell und digital ausgerüstet." },
    { name: "Yusuf", rating: 5, text: "Super schneller Service. Freitagmorgen angefragt, Freitagnachmittag geliefert." },
    { name: "Thorben Muller", rating: 5, text: "Hat super geklappt. Innerhalb von einem Tag alles erledigt. Top und sehr zufrieden." },
    { name: "* anweiser", rating: 5, text: "Professioneller Service, kompetent und freundlich. Unterlagen kurz vor Schluss gebracht, am nächsten Vormittag zugelassen." },
    { name: "Ahmad Tahir", rating: 5, text: "Super Service, Anmeldung innerhalb von 24 Stunden fertig. Sehr zuverlässig." },
    { name: "Ralf Thomsen", rating: 5, text: "Top Service und super freundlich. Freitagabend Unterlagen abgegeben, Montagmittag alles fertig." },
    { name: "Hares", rating: 5, text: "Guter Service und sehr professionell. Es lief reibungslos ab. Empfehlung 10/10." },
    { name: "Nicole Waldhans", rating: 5, text: "Super Service. Zu 100 Prozent weiterzuempfehlen. Unkompliziert und freundlich." },
    { name: "hale0511", rating: 5, text: "Super Service und gute Beratung. Unterlagen abends eingereicht, am Folgetag schon wieder abgeholt." },
    { name: "Niklas Haase", rating: 5, text: "Sehr schnelle Hilfe auch kurz vor Ladenschluss. Top Kommunikation und Abwicklung." },
    { name: "Isabel Liekenbrocker", rating: 5, text: "Sehr freundlich, zuverlässig und schneller Service. Danke!" },
    { name: "joey demajo", rating: 5, text: "Unfassbar schnell, freundlich und unkompliziert. Beim nächsten Auto wieder hier." },
    { name: "Mike", rating: 5, text: "Top Service, sogar bis vor die Tür gebracht. Sehr empfehlenswert." },
    { name: "Rico Lanzrath (Dermetzger93)", rating: 5, text: "Schnelle und saubere Abwicklung. Kontakt super nett und freundlich." },
    { name: "Robert", rating: 5, text: "Kundenservice hat mir sehr gefallen. Mitarbeiter sehr nett und hilfsbereit." },
    { name: "Hilal Yilmaz", rating: 5, text: "Top zufrieden. Sehr professionell und sehr schnell. Herzliche Weiterempfehlung." },
    { name: "King Zzzz", rating: 5, text: "Sehr schnell und unkompliziert. Freundlicher Umgang, kann ich weiterempfehlen." },
    { name: "Rashed", rating: 5, text: "Freundlicher Service und wirklich gute Arbeit. Nur zu empfehlen." },
    { name: "Wayne Albel", rating: 5, text: "Vielen Dank für die schnelle und unkomplizierte An- und Abmeldung." },
    { name: "Andrei Liubovici", rating: 5, text: "Sehr schnell, freundlich und zuverlässig. Immer gerne." },
    { name: "Nadine Rehberg", rating: 5, text: "Richtig super, zuverlässig, zuvorkommend und freundlich." },
    { name: "German", rating: 5, text: "Donnerstag Papiere abgegeben, Freitag erledigte Papiere und Kennzeichen vor der Haustür." },
    { name: "Kaan Yildirim", rating: 5, text: "Top Arbeit, super professionell. Nur zu empfehlen." },
    { name: "Mark Bschorr", rating: 5, text: "Hat alles bestens geklappt." },
    { name: "Mordem Sercan", rating: 5, text: "Schnell und zuverlässig. Kann ich nur empfehlen." },
    { name: "Okami", rating: 5, text: "Top Service, alles super funktioniert." },
    { name: "Andreas Dahlkotter", rating: 5, text: "Sehr kompetenter, zuverlässiger und netter Ansprechpartner." },
    { name: "C Y", rating: 5, text: "Gestern Kennzeichen abgegeben, heute angemeldet abgeholt." },
    { name: "Hausverwaltung Hausverwaltung", rating: 5, text: "Super Service. Gut, dass es so etwas gibt." },
    { name: "F 44", rating: 5, text: "Super Service, immer wieder gerne." },
    { name: "Peter Althof", rating: 5, text: "Die Zulassung ging schnell und unkompliziert. Guter Service." },
    { name: "Metehan Ucar", rating: 5, text: "Top Service, Fahrzeug innerhalb von 24 Stunden angemeldet." },
    { name: "Mashariq Naveed", rating: 5, text: "Sehr schnell und zuverlässig." },
    { name: "Slaven D", rating: 5, text: "10/10, empfehle ich weiter." },
    { name: "Muneeb Ahmad Tahir", rating: 5, text: "Ruckzuck zugelassen." },
    { name: "Mary Birdrock", rating: 5, text: "Sehr gute Erfahrung und schneller Ablauf." },
  ];

  // Gesamtzahl der Bewertungen laut Google-Profil – gepflegt in seoRoutes.ts (BUSINESS)
  const totalReviews = BUSINESS.reviewCount;

  const avgRating = useMemo(
    () => (reviews.reduce((acc, item) => acc + item.rating, 0) / reviews.length).toFixed(1),
    [reviews]
  );

  const initials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("");

  useEffect(() => {
    if (!api) return;
    const timer = window.setInterval(() => api.scrollNext(), 6000);
    return () => window.clearInterval(timer);
  }, [api]);

  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-[15px] sm:text-[17px] font-normal text-secondary">Sicher bezahlen mit</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
            <img src={paypalLogo} alt="PayPal" width={105} height={28} className="h-7 w-auto" loading="lazy" />
            <div className="flex items-center gap-2 text-[#0a4d7a]" aria-label="Kauf auf Rechnung">
              <Receipt className="h-6 w-6" strokeWidth={2.4} />
              <span className="text-lg font-bold uppercase tracking-tight">Rechnung</span>
            </div>
            <img src={mastercardLogo} alt="Mastercard" className="h-9 w-auto" loading="lazy" />
            <img src={visaLogo} alt="Visa" className="h-5 w-auto" loading="lazy" />
            <img src={sepaLogo} alt="SEPA-Lastschrift" width={56} height={24} className="h-6 w-auto" loading="lazy" />
            <img src={applePayLogo} alt="Apple Pay" className="h-7 w-auto" loading="lazy" />
            <div className="flex items-center gap-1.5 text-[#0a4d7a]" aria-label="Barzahlung">
              <Banknote className="h-7 w-7" strokeWidth={2.2} />
              <span className="text-xl font-semibold tracking-tight">Bar</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img
              src={googleLogo}
              alt="Google"
              className="w-6 h-6"
            />
            <span className="text-lg font-semibold text-secondary">Google Bewertungen</span>
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-2xl font-bold text-secondary ml-2">{avgRating}</span>
          </div>
          <p className="text-muted-foreground">Basierend auf {totalReviews} echten Bewertungen</p>
          <a
            href={BUSINESS.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-sm font-semibold text-link hover:underline"
          >
            Alle {totalReviews} Bewertungen auf Google ansehen →
          </a>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          setApi={setApi}
          className="relative rounded-2xl border border-border/70 bg-gradient-to-b from-background to-muted/30 p-3"
        >
          <CarouselContent>
            {reviews.map((review, idx) => (
              <CarouselItem key={`${review.name}-${idx}`} className="md:basis-1/2 xl:basis-1/3">
                <article className="h-full min-h-[172px] rounded-2xl border border-border/80 bg-white px-5 py-4 shadow-[0_14px_34px_-24px_hsl(var(--secondary)/0.42)]">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 mt-0.5">
                      <div className="h-11 w-11 rounded-full bg-primary/15 text-link flex items-center justify-center text-sm font-bold">
                        {initials(review.name)}
                      </div>
                    </div>
                    <div className="min-w-0 w-full">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-secondary leading-tight truncate">{review.name}</p>
                          <p className="text-xs text-muted-foreground">Rezension aus Google</p>
                        </div>
                        <div className="flex gap-0.5 shrink-0 mt-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-border"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-2 text-sm text-foreground/90 leading-relaxed line-clamp-4">{review.text}</p>
                    </div>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 top-1/2 -translate-y-1/2 border-border bg-background/95" />
          <CarouselNext className="right-2 top-1/2 -translate-y-1/2 border-border bg-background/95" />
        </Carousel>
      </div>
    </section>
  );
};

export default GoogleReviews;
