import { useEffect, useMemo, useState } from "react";
import { Star } from "lucide-react";
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
    { name: "Daniel", rating: 5, time: "vor 3 Monaten", text: "Schneller und unkomplizierter Service, ich musste sehr schnell meinen Neuwagen zulassen und mir wurde kompetent geholfen." },
    { name: "Christoph Meyer", rating: 5, time: "Bearbeitet: vor 2 Monaten", text: "Ich habe diesen Zulassungsdienst schon zum zweiten Mal beauftragt und bin wieder absolut zufrieden." },
    { name: "Olga Keller", rating: 5, time: "vor einem Jahr", text: "Wenn man schnell und unkompliziert sein Auto anmelden möchte, einfach perfekt. Sehr nett und kompetent." },
    { name: "Vivian Stahn-Mayala", rating: 5, time: "vor 6 Monaten", text: "Schneller und zuverlässiger Top Service. Kann ich nur weiterempfehlen." },
    { name: "Martin Cygon", rating: 5, time: "vor einem Jahr", text: "Top Service. Freitag Unterlagen abgegeben, Montag alles fertig. Sehr professionell und digital ausgerüstet." },
    { name: "Faisal Haqparwar", rating: 5, time: "vor 2 Jahren", text: "Herausragendes KFZ-Zulassungserlebnis. Unterlagen abgegeben und am nächsten Tag alles erledigt." },
    { name: "Yusuf", rating: 5, time: "vor 3 Jahren", text: "Super schneller Service. Freitagmorgen angefragt, Freitagnachmittag geliefert." },
    { name: "Thorben Muller", rating: 5, time: "vor 2 Jahren", text: "Hat super geklappt. Innerhalb von einem Tag alles erledigt. Top und sehr zufrieden." },
    { name: "Jan", rating: 5, time: "vor 3 Jahren", text: "Super nette und fahige Mitarbeiter. Kurz angerufen, Termin gemacht, Papiere abgegeben und erledigt." },
    { name: "* anweiser", rating: 5, time: "vor 2 Jahren", text: "Professioneller Service, kompetent und freundlich. Unterlagen kurz vor Schluss gebracht, am nächsten Vormittag zugelassen." },
    { name: "Ahmad Tahir", rating: 5, time: "vor 2 Jahren", text: "Super Service, Anmeldung innerhalb von 24 Stunden fertig. Sehr zuverlassig." },
    { name: "Ralf Thomsen", rating: 5, time: "vor 2 Jahren", text: "Top Service und super freundlich. Freitagabend Unterlagen abgegeben, Montagmittag alles fertig." },
    { name: "Hares", rating: 5, time: "vor 3 Jahren", text: "Guter Service und sehr professionell. Es lief reibungslos ab. Empfehlung 10/10." },
    { name: "Nicole Waldhans", rating: 5, time: "vor einem Jahr", text: "Super Service. Zu 100 Prozent weiterzuempfehlen. Unkompliziert und freundlich." },
    { name: "hale0511", rating: 5, time: "vor 2 Jahren", text: "Super Service und gute Beratung. Unterlagen abends eingereicht, am Folgetag schon wieder abgeholt." },
    { name: "Niklas Haase", rating: 5, time: "vor 2 Jahren", text: "Sehr schnelle Hilfe auch kurz vor Ladenschluss. Top Kommunikation und Abwicklung." },
    { name: "Isabel Liekenbrocker", rating: 5, time: "vor 2 Jahren", text: "Sehr freundlich, zuverlassig und schneller Service. Danke!" },
    { name: "joey demajo", rating: 5, time: "vor einem Jahr", text: "Unfassbar schnell, freundlich und unkompliziert. Beim nächsten Auto wieder hier." },
    { name: "Fasih Haqparwar", rating: 5, time: "vor 2 Jahren", text: "Super freundlicher und schneller Service, top Beratung und Preis-Leistungs-Verhältnis." },
    { name: "Mike", rating: 5, time: "vor 2 Jahren", text: "Top Service, sogar bis vor die Tur gebracht. Sehr empfehlenswert." },
    { name: "Rico Lanzrath (Dermetzger93)", rating: 5, time: "vor 3 Jahren", text: "Schnelle und saubere Abwicklung. Kontakt super nett und freundlich." },
    { name: "Robert", rating: 5, time: "vor 3 Jahren", text: "Kundenservice hat mir sehr gefallen. Mitarbeiter sehr nett und hilfsbereit." },
    { name: "Hilal Yilmaz", rating: 5, time: "vor 3 Jahren", text: "Top zufrieden. Sehr professionell und sehr schnell. Herzliche Weiterempfehlung." },
    { name: "King Zzzz", rating: 5, time: "vor 3 Jahren", text: "Sehr schnell und unkompliziert. Freundlicher Umgang, kann ich weiterempfehlen." },
    { name: "Rashed", rating: 5, time: "vor 2 Jahren", text: "Freundlicher Service und wirklich gute Arbeit. Nur zu empfehlen." },
    { name: "Wayne Albel", rating: 5, time: "vor 2 Jahren", text: "Vielen Dank für die schnelle und unkomplizierte An- und Abmeldung." },
    { name: "Andrei Liubovici", rating: 5, time: "vor 2 Jahren", text: "Sehr schnell, freundlich und zuverlassig. Immer gerne." },
    { name: "Nadine Rehberg", rating: 5, time: "vor einem Jahr", text: "Richtig super, zuverlassig, zuvorkommend und freundlich." },
    { name: "German", rating: 5, time: "vor 2 Jahren", text: "Donnerstag Papiere abgegeben, Freitag erledigte Papiere und Kennzeichen vor der Haustur." },
    { name: "Kaan Yildirim", rating: 5, time: "vor 2 Jahren", text: "Top Arbeit, super professionell. Nur zu empfehlen." },
    { name: "Mark Bschorr", rating: 5, time: "vor 2 Jahren", text: "Hat alles bestens geklappt." },
    { name: "Mordem Sercan", rating: 5, time: "vor 2 Jahren", text: "Schnell und zuverlassig. Kann ich nur empfehlen." },
    { name: "Okami", rating: 5, time: "vor 2 Jahren", text: "Top Service, alles super funktioniert." },
    { name: "Andreas Dahlkotter", rating: 5, time: "vor 2 Jahren", text: "Sehr kompetenter, zuverlassiger und netter Ansprechpartner." },
    { name: "C Y", rating: 5, time: "vor 2 Jahren", text: "Gestern Kennzeichen abgegeben, heute angemeldet abgeholt." },
    { name: "Hausverwaltung Hausverwaltung", rating: 5, time: "vor 3 Jahren", text: "Super Service. Gut, dass es so etwas gibt." },
    { name: "F 44", rating: 5, time: "vor einem Jahr", text: "Super Service, immer wieder gerne." },
    { name: "Peter Althof", rating: 5, time: "vor 2 Jahren", text: "Die Zulassung ging schnell und unkompliziert. Guter Service." },
    { name: "Metehan Ucar", rating: 5, time: "vor 2 Jahren", text: "Top Service, Fahrzeug innerhalb von 24 Stunden angemeldet." },
    { name: "Mashariq Naveed", rating: 5, time: "vor 2 Jahren", text: "Sehr schnell und zuverlassig." },
    { name: "Slaven D", rating: 5, time: "vor 3 Jahren", text: "10/10, empfehle ich weiter." },
    { name: "Muneeb Ahmad Tahir", rating: 5, time: "vor 2 Jahren", text: "Ruckzuck zugelassen." },
    { name: "Mary Birdrock", rating: 5, time: "vor einem Jahr", text: "Sehr gute Erfahrung und schneller Ablauf." },
  ];

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
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
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
          <p className="text-muted-foreground">Basierend auf {reviews.length}+ echten Bewertungen</p>
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
                      <div className="h-11 w-11 rounded-full bg-primary/15 text-primary flex items-center justify-center text-sm font-bold">
                        {initials(review.name)}
                      </div>
                    </div>
                    <div className="min-w-0 w-full">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-secondary leading-tight truncate">{review.name}</p>
                          <p className="text-xs text-muted-foreground">Rezension aus Google - {review.time}</p>
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
