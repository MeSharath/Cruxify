import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type SummaryDisplayProps = {
  summary: string;
};

const parseSummary = (text: string) => {
  const sections = text.trim().split("### ").filter(Boolean);
  return sections.map((sectionText) => {
    const [title, ...contentParts] = sectionText.split("\n");
    const content = contentParts.join("\n").trim();
    const actionables = content.match(/\*\*Actionables(?: \(for building good habits\))?:\*\*\n([\s\S]*)/);

    let mainContent = content;
    let actionItems: string[] = [];

    if (actionables) {
      mainContent = content.substring(0, actionables.index).trim();
      actionItems = actionables[1]
        .split(/\n- |\n\d\.\s/)
        .filter((item) => item.trim() !== "")
        .map((item) => item.trim());
    }

    return {
      title: title.trim(),
      paragraphs: mainContent.split("\n").filter((p) => p.trim() !== ""),
      actionItems,
    };
  });
};

export function SummaryDisplay({ summary }: SummaryDisplayProps) {
  const parsedSummary = parseSummary(summary);

  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle className="font-headline">AI Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-10 font-serif">
        {parsedSummary.map((section, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight text-primary font-headline">
              {section.title}
            </h3>
            <div className="space-y-5 text-lg leading-relaxed text-foreground/90 text-justify">
              {section.paragraphs.map((p, pIndex) => (
                <p key={pIndex}>{p}</p>
              ))}
              {section.actionItems.length > 0 && (
                <div className="mt-6 rounded-lg bg-secondary/50 p-6 font-body">
                  <h4 className="font-semibold text-foreground mb-3 text-base">
                    Actionables:
                  </h4>
                  <ul className="list-disc pl-5 space-y-2 text-base">
                    {section.actionItems.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
