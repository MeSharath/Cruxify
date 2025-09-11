import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import type { Book } from "@/lib/data";

type BookCardProps = {
  book: Book;
};

export function BookCard({ book }: BookCardProps) {
  return (
    <Link href={`/library/${book.id}`} className="group block">
      <Card className="overflow-hidden h-full transition-all duration-300 ease-in-out group-hover:shadow-primary/20 group-hover:shadow-lg group-hover:-translate-y-1">
        <CardContent className="p-0">
          <div className="aspect-[2/3] w-full relative">
            <Image
              src={book.coverImageUrl}
              alt={`Cover of ${book.title}`}
              fill
              className="object-cover"
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
    </Link>
  );
}
