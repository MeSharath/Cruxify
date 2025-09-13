
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { Book } from "@/lib/data";
import { cn } from "@/lib/utils";

type BookCardProps = {
  book: Book;
};

export function BookCard({ book }: BookCardProps) {
  const isProcessing = book.status === "processing";
  const cardContent = (
    <Card
      className={cn(
        "overflow-hidden h-full transition-all duration-300 ease-in-out",
        !isProcessing && "group-hover:shadow-primary/20 group-hover:shadow-lg group-hover:-translate-y-1",
        isProcessing && "bg-secondary/50"
      )}
    >
      <CardContent className="p-0">
        <div className="aspect-[2/3] w-full relative">
          <Image
            src={book.coverImageUrl}
            alt={`Cover of ${book.title}`}
            fill
            className={cn(
              "object-cover",
              isProcessing && "filter grayscale opacity-60"
            )}
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 20vw, 15vw"
            data-ai-hint={book.imageHint}
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-base leading-tight truncate">
            {book.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{book.author}</p>
        </div>
      </CardContent>
    </Card>
  );

  if (isProcessing) {
    return (
      <div className="group block cursor-not-allowed" aria-disabled="true">
        {cardContent}
      </div>
    );
  }

  return (
    <Link href={`/library/${book.id}`} className="group block">
      {cardContent}
    </Link>
  );
}
