
import { Card, CardContent } from "@/components/ui/card";
import type { Quote } from "@/lib/quotes";

type QuoteOfTheDayCardProps = {
  quote: Quote;
};

export function QuoteOfTheDayCard({ quote }: QuoteOfTheDayCardProps) {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardContent className="p-6 text-center">
        <blockquote className="space-y-4">
          <p className="text-xl italic text-foreground/80 font-serif">
            "{quote.text}"
          </p>
          <footer className="text-base text-muted-foreground font-sans">
            — {quote.author}
          </footer>
        </blockquote>
      </CardContent>
    </Card>
  );
}
