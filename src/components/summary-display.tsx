import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

type ParsedContent = {
  type: 'paragraph' | 'pullquote' | 'reflection';
  content: string;
};

type Chapter = {
  title: string;
  content: ParsedContent[];
};

// This regex helps to split the content by the custom tags
const tagRegex = /({{pullquote:.*?}}|{{reflection:.*?}})/g;

const parseSummary = (text: string): Chapter[] => {
  const chapters = text.trim().split(/\n?### /).filter(Boolean);
  
  return chapters.map((chapterText) => {
    const [title, ...contentParts] = chapterText.split('\n');
    const contentString = contentParts.join('\n').trim();

    const parts = contentString.split(tagRegex).filter(Boolean);

    const parsedContent: ParsedContent[] = parts.map(part => {
      if (part.startsWith('{{pullquote:')) {
        return {
          type: 'pullquote',
          content: part.match(/{{pullquote: "(.*?)"}}/)?.[1] || ''
        };
      }
      if (part.startsWith('{{reflection:')) {
        return {
          type: 'reflection',
          content: part.match(/{{reflection: "(.*?)"}}/)?.[1] || ''
        };
      }
      return {
        type: 'paragraph',
        content: part.trim()
      };
    }).filter(item => item.content); // Filter out any empty content

    return {
      title: title.trim(),
      content: parsedContent,
    };
  });
};

const renderContent = (item: ParsedContent, index: number) => {
  switch (item.type) {
    case 'pullquote':
      return (
        <blockquote key={index} className="my-6 border-l-4 border-primary pl-4 italic text-xl font-headline text-foreground/80">
          {`"${item.content}"`}
        </blockquote>
      );
    case 'reflection':
      return (
        <div key={index} className="my-6 p-4 bg-primary/10 rounded-lg flex items-start gap-4">
          <Lightbulb className="size-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-headline font-semibold text-lg text-primary/90">Reflection Question</h4>
            <p className="text-foreground/80 !mb-0">{item.content}</p>
          </div>
        </div>
      );
    case 'paragraph':
    default:
      const sanitizedHtml = item.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return <div key={index} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
  }
};


export function SummaryDisplay({ summary }: { summary: string }) {
  const parsedSummary = parseSummary(summary);

  return (
    <Card className="shadow-none bg-transparent border-0">
      <CardContent className="space-y-12 font-serif text-lg text-justify leading-relaxed text-foreground/90">
        {parsedSummary.map((section, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-4xl font-bold tracking-tight text-primary/90 font-headline border-b-2 border-primary/20 pb-4">
              {section.title}
            </h3>
            <div className="summary-content">
              {section.content.map(renderContent)}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
