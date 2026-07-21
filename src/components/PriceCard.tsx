import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface PriceCardProps {
  title: string;
  price: string;
  popular?: boolean;
  features: string[];
  highlight?: string;
  buttonText: string;
  buttonVariant?: "default" | "cta";
  onSelect?: () => void;
  ctaHref?: string;
  selected?: boolean;
}

const PriceCard = ({
  title,
  price,
  popular = false,
  features,
  highlight,
  buttonText,
  buttonVariant = "default",
  onSelect,
  ctaHref = "/angebot",
  selected = false,
}: PriceCardProps) => {
  return (
    <Card className={`surface-card relative h-full flex flex-col transition-transform duration-200 hover:-translate-y-1 ${popular || selected ? "border-primary shadow-[0_18px_45px_-26px_hsl(var(--primary)/0.7)]" : ""}`}>
      {popular && (
        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary px-3 text-primary-foreground shadow-sm">
          Populär
        </Badge>
      )}
      
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-2xl font-bold text-secondary mb-2">{title}</CardTitle>
        <div className="text-4xl font-bold text-primary mb-1 tracking-tight">{price}</div>
      </CardHeader>
      
      <CardContent className="pt-0 flex flex-col flex-1">
        <ul className="space-y-3 mb-8 flex-1">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <Check className="h-5 w-5 text-trust-green mt-0.5 flex-shrink-0" />
              <span className="text-sm text-foreground">{feature}</span>
            </li>
          ))}
        </ul>

        {highlight && (
          <div className="mb-6 flex items-start gap-2 rounded-lg border border-[hsl(var(--cta-orange))]/40 bg-[hsl(var(--cta-orange))]/10 px-3 py-2.5">
            <AlertCircle className="h-4 w-4 text-[hsl(var(--cta-orange))] mt-0.5 flex-shrink-0" />
            <span className="text-sm font-semibold text-secondary">{highlight}</span>
          </div>
        )}

        {onSelect ? (
          <Button variant={buttonVariant} className="w-full" type="button" onClick={onSelect}>
            {buttonText}
          </Button>
        ) : (
          <Button variant={buttonVariant} className="w-full" asChild>
            <Link to={ctaHref}>{buttonText}</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default PriceCard;
