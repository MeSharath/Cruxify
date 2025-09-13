'use client';

import { MainLayout } from "@/components/main-layout";
import { books, summaries } from "@/lib/data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { AudioPlayer } from "@/components/audio-player";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Headphones, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BookView } from "@/components/book-view";
import { useToast } from "@/hooks/use-toast";
import { generateAudioAction } from "@/app/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function BookSummaryPage({ params }: { params: { id: string } }) {
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  const { toast } = useToast();

  const book = books.find((b) => b.id === params.id);
  const summary = summaries[params.id];
  
  if (!book || !summary) {
    notFound();
  }

  const handleGenerateAudio = async () => {
    setIsLoadingAudio(true);
    setAudioError(null);
    try {
      const result = await generateAudioAction(summary);

      if (result.success && result.audioData) {
        setAudioSrc(result.audioData);
      } else {
        const errorMsg = result.error || "An unknown error occurred.";
        setAudioError(errorMsg);
        toast({
          variant: "destructive",
          title: "Audio Generation Failed",
          description: errorMsg,
        });
      }
    } catch (error) {
       const errorMsg = error instanceof Error ? error.message : "An unexpected error occurred.";
       setAudioError(errorMsg)
       toast({
          variant: "destructive",
          title: "An Error Occurred",
          description: errorMsg,
        });
    } finally {
        setIsLoadingAudio(false);
    }
  };


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
                    <Badge variant="secondary">Audio Available</Badge>
                  </div>
                  <div className="mt-6 font-sans">
                      {audioSrc && <AudioPlayer audioSrc={audioSrc} />}

                      {!audioSrc && !isLoadingAudio && !audioError && (
                        <Button onClick={handleGenerateAudio} className="w-full">
                          <Headphones className="mr-2 size-4" />
                          Listen to Summary
                        </Button>
                      )}

                      {isLoadingAudio && (
                        <div className="flex items-center justify-center h-24 bg-card rounded-lg shadow-inner">
                          <Loader2 className="size-6 animate-spin text-muted-foreground" />
                          <p className="ml-4 text-muted-foreground">Generating audio...</p>
                        </div>
                      )}

                      {audioError && !isLoadingAudio && (
                         <Alert variant="destructive" className="bg-destructive/10 border-destructive/30 text-destructive-foreground">
                            <AlertCircle className="h-4 w-4 !text-destructive" />
                            <AlertTitle className="text-destructive">Audio Not Available</AlertTitle>
                            <AlertDescription className="text-destructive/90">
                                {audioError}
                            </AlertDescription>
                        </Alert>
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