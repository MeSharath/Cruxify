
'use client';

import { MainLayout } from "@/components/main-layout";
import { books, summaries } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { AudioPlayer } from "@/components/audio-player";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { generateAudioAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { BookView } from "@/components/book-view";

export default function BookSummaryPage({ params }: { params: { id: string } }) {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isLoadingAudio, setIsLoadingAudio] = useState(true);
  const { toast } = useToast();

  const book = books.find((b) => b.id === params.id);
  const summary = summaries[params.id];

  useEffect(() => {
    if (!summary) return;

    const getAudio = async () => {
      setIsLoadingAudio(true);
      try {
        const userApiKey = localStorage.getItem("elevenlabs_api_key") || undefined;
        const result = await generateAudioAction(summary, userApiKey);
        if (result.success && result.audioDataUri) {
          setAudioSrc(result.audioDataUri);
        } else {
          console.error("Failed to generate audio:", result.error);
          toast({
            title: "Audio Generation Failed",
            description: result.error,
            variant: "destructive",
          });
          setAudioSrc(null); // Set to null if generation fails
        }
      } catch (error) {
        console.error("Error calling generateAudioAction:", error);
        toast({
            title: "Audio Generation Failed",
            description: "An unexpected error occurred.",
            variant: "destructive",
          });
        setAudioSrc(null);
      } finally {
        setIsLoadingAudio(false);
      }
    };

    getAudio();
  }, [summary, toast]);

  if (!book || !summary) {
    notFound();
  }

  return (
    <MainLayout>
      <div className="bg-background text-foreground font-serif">
        <div className="p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <Button asChild variant="ghost" className="font-sans">
                <Link href="/">
                  <ArrowLeft className="mr-2 size-4" />
                  Back to Library
                </Link>
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-x-8 lg:gap-x-12 items-start">
              <div className="md:col-span-1">
                <div className="sticky top-24">
                  <div className="aspect-[2/3] w-full max-w-[250px] mx-auto md:mx-0 relative mb-4 rounded-lg overflow-hidden shadow-2xl">
                    <Image
                      src={book.coverImageUrl}
                      alt={`Cover of ${book.title}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 80vw, 250px"
                      data-ai-hint={book.imageHint}
                    />
                  </div>
                  <h1 className="text-3xl font-bold leading-tight font-headline text-foreground/90">
                    {book.title}
                  </h1>
                  <p className="text-muted-foreground text-lg mt-1 font-sans">{book.author}</p>
                  <div className="flex flex-wrap gap-2 mt-4 font-sans">
                    <Badge variant="secondary">15-min Summary</Badge>
                    {audioSrc && <Badge variant="secondary">Audio Available</Badge>}
                  </div>
                  <div className="mt-6 font-sans">
                    {isLoadingAudio ? (
                      <div className="flex items-center justify-center h-48 bg-card rounded-lg shadow-lg">
                        <Loader2 className="size-8 animate-spin text-muted-foreground" />
                        <p className="ml-4 text-muted-foreground">Generating audio...</p>
                      </div>
                    ) : (
                      audioSrc ? <AudioPlayer audioSrc={audioSrc} /> : <div className="flex items-center justify-center h-48 bg-card rounded-lg shadow-lg"><p className="text-muted-foreground">Audio could not be generated.</p></div>
                    )}
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-6 mt-8 md:mt-0">
                <BookView summary={summary} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
