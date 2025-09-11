import { MainLayout } from "@/components/main-layout";
import { books, summaries } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { AudioPlayer } from "@/components/audio-player";
import { SummaryDisplay } from "@/components/summary-display";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function BookSummaryPage({ params }: { params: { id: string } }) {
  const book = books.find((b) => b.id === params.id);
  const summary = summaries[params.id];

  if (!book || !summary) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button asChild variant="ghost">
              <Link href="/">
                <ArrowLeft className="mr-2 size-4" />
                Back to Library
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <div className="aspect-[2/3] w-full max-w-[250px] mx-auto md:mx-0 relative mb-4 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={book.coverImageUrl}
                    alt={`Cover of ${book.title}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 80vw, 250px"
                    data-ai-hint={book.imageHint}
                  />
                </div>
                <h1 className="text-2xl font-bold leading-tight">
                  {book.title}
                </h1>
                <p className="text-muted-foreground mt-1">{book.author}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant="secondary">15-min Summary</Badge>
                  <Badge variant="secondary">Audio Available</Badge>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <AudioPlayer audioSrc="/placeholder-audio.mp3" />
              <SummaryDisplay summary={summary} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
