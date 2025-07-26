import { Star, Shield, Clock, Users } from "lucide-react";

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
            <div className="text-lg font-bold text-secondary">4.9/5</div>
            <div className="text-sm text-muted-foreground">100+ Google Bewertungen</div>
          </div>

          {/* Security */}
          <div className="flex flex-col items-center">
            <Shield className="h-8 w-8 text-primary mb-2" />
            <div className="text-lg font-bold text-secondary">100% Sicher</div>
            <div className="text-sm text-muted-foreground">SSL-verschlüsselt</div>
          </div>

          {/* Speed */}
          <div className="flex flex-col items-center">
            <Clock className="h-8 w-8 text-primary mb-2" />
            <div className="text-lg font-bold text-secondary">24h Garantie</div>
            <div className="text-sm text-muted-foreground">Zulassung am nächsten Tag</div>
          </div>

          {/* Customers */}
          <div className="flex flex-col items-center">
            <Users className="h-8 w-8 text-primary mb-2" />
            <div className="text-lg font-bold text-secondary">1000+</div>
            <div className="text-sm text-muted-foreground">Zufriedene Kunden</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustBadges;