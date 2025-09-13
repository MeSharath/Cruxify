import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SummaryDisplayProps = {
  summary: string;
};

const parseSummary = (text: string) => {
  const sections = text.trim().split("### ").filter(Boolean);
  return sections.map((sectionText) => {
    const [title, ...contentParts] = sectionText.split("\n");
    const content = contentParts.join("\n").trim();
    
    return {
      title: title.trim(),
      paragraphs: content.split("\n\n").filter((p) => p.trim() !== ""),
    };
  });
};

export function SummaryDisplay({ summary }: SummaryDisplayProps) {
  const parsedSummary = parseSummary(summary);

  return (
    <Card className="shadow-2xl bg-transparent border-0">
      <CardHeader>
        <CardTitle className="font-headline text-foreground/80">AI Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-10 font-serif">
        {parsedSummary.map((section, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-3xl font-bold tracking-tight text-primary/90 font-headline border-b pb-2">
              {section.title}
            </h3>
            <div className="space-y-5 text-lg leading-relaxed text-foreground/90 text-justify">
              {section.paragraphs.map((p, pIndex) => (
                <p key={pIndex}>{p}</p>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
