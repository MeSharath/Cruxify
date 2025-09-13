import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

export type ParsedContent = {
  type: 'paragraph' | 'pullquote' | 'reflection';
  content: string;
};

export type Chapter = {
  title: string;
  content: ParsedContent[];
};

// This regex helps to split the content by the custom tags
const tagRegex = /({{pullquote:.*?}}|{{reflection:.*?}})/g;

export const parseSummary = (text: string): Chapter[] => {
  if (!text) return [];
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
      // Split paragraphs by newlines and wrap each in a <p> tag
      const paragraphs = item.content.split('\n').filter(p => p.trim() !== '');
      return paragraphs.map((p, pIndex) => {
        // Replace **word** with <strong>word</strong> and *word* with <em>word</em>
        let sanitizedHtml = p.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        sanitizedHtml = sanitizedHtml.replace(/\*(.*?)\*/g, '<em>$1</em>');
        return <p key={`${index}-${pIndex}`} dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
      });
  }
};


export function SummaryDisplay({ chapter }: { chapter: Chapter }) {

  return (
    <Card className="shadow-none bg-transparent border-0 h-full">
      <CardContent className="font-serif text-lg text-justify leading-relaxed text-foreground/90 h-full overflow-y-auto p-8">
        <div className="space-y-4">
          <h3 className="text-4xl font-bold tracking-tight text-primary/90 font-headline border-b-2 border-primary/20 pb-4">
            {chapter.title}
          </h3>
          <div className="summary-content">
            {chapter.content.map(renderContent)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
