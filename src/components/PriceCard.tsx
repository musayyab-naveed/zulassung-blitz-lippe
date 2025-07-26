import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

interface PriceCardProps {
  title: string;
  price: string;
  popular?: boolean;
  features: string[];
  buttonText: string;
  buttonVariant?: "default" | "cta";
}

const PriceCard = ({ 
  title, 
  price, 
  popular = false, 
  features, 
  buttonText,
  buttonVariant = "default"
}: PriceCardProps) => {
  return (
    <Card className={`relative h-full ${popular ? 'border-primary shadow-lg' : ''}`}>
      {popular && (
        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
          Populär
        </Badge>
      )}
      
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-2xl font-bold text-secondary mb-2">{title}</CardTitle>
        <div className="text-4xl font-bold text-primary mb-1">{price}</div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start space-x-3">
              <Check className="h-5 w-5 text-trust-green mt-0.5 flex-shrink-0" />
              <span className="text-sm text-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button 
          variant={buttonVariant} 
          className="w-full"
          asChild
        >
          <Link to="/angebot">{buttonText}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PriceCard;