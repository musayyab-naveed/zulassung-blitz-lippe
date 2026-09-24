import { Star, Shield, Clock, MapPin } from "lucide-react";
import { BUSINESS } from "@/content/seoRoutes";

const TrustBadges = () => {
  return (
    <div className="bg-muted py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {/* Google Reviews */}
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-warning-orange text-warning-orange" />
              ))}
            </div>
            <div className="text-lg font-bold text-secondary">5,0 von 5</div>
            <div className="text-sm text-muted-foreground">{BUSINESS.reviewCount} Google-Bewertungen</div>
          </div>

          {/* Security */}
          <div className="flex flex-col items-center">
            <Shield className="h-8 w-8 text-primary mb-2" />
            <div className="text-lg font-bold text-secondary">Ohne Termin</div>
            <div className="text-sm text-muted-foreground">Mo–Fr 9–18 · Sa 15–18 Uhr</div>
          </div>

          {/* Speed */}
          <div className="flex flex-col items-center">
            <Clock className="h-8 w-8 text-primary mb-2" />
            <div className="text-lg font-bold text-secondary">ca. 20 Minuten</div>
            <div className="text-sm text-muted-foreground">Sofort-Zulassung vor Ort</div>
          </div>

          {/* Customers */}
          <div className="flex flex-col items-center">
            <MapPin className="h-8 w-8 text-primary mb-2" />
            <div className="text-lg font-bold text-secondary">Ganz Lippe</div>
            <div className="text-sm text-muted-foreground">alle 16 Städte und Gemeinden</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;