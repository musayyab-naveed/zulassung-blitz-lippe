import { Star } from "lucide-react";

const GoogleReviews = () => {
  const reviews = [
    {
      name: "Maria Schmidt",
      rating: 5,
      text: "Super schneller Service! Zulassung war wirklich in 24h fertig.",
      time: "vor 2 Wochen"
    },
    {
      name: "Thomas Müller", 
      rating: 5,
      text: "Endlich keine Wartezeit beim Amt! Sehr professionell.",
      time: "vor 1 Monat"
    },
    {
      name: "Anna Weber",
      rating: 5,
      text: "Unkompliziert und zuverlässig. Kann ich nur empfehlen!",
      time: "vor 3 Wochen"
    },
    {
      name: "Stefan Koch",
      rating: 5,
      text: "Perfekter Service von A bis Z. Danke!",
      time: "vor 1 Woche"
    }
  ];

  return (
    <section className="py-12 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="text-2xl font-bold text-secondary ml-2">4.9</span>
          </div>
          <p className="text-muted-foreground">Basierend auf 127+ Bewertungen</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">
                    {review.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-sm text-secondary">{review.name}</p>
                  <p className="text-xs text-muted-foreground">{review.time}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;