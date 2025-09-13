
'use client';

import { useState } from "react";
import { MainLayout } from "@/components/main-layout";
import { PageHeader } from "@/components/page-header";
import { BookUploadButton } from "@/components/book-upload-button";
import { HabitTrackerCard } from "@/components/habit-tracker-card";
import { BookCard } from "@/components/book-card";
import { books as initialBooks, type Book } from "@/lib/data";

export default function DashboardPage() {
  const [books, setBooks] = useState<Book[]>(initialBooks);

  const handleBookUploaded = (fileName: string) => {
    const newBook: Book = {
      // In a real app, this ID would be generated securely
      id: `new-book-${Math.random().toString(36).substring(2, 9)}`,
      title: fileName.replace(/\.epub$/, ""),
      author: "New Author",
      // Use a new random image for the cover
      coverImageUrl: `https://picsum.photos/seed/${Math.random()}/400/600`,
      imageHint: "book cover",
    };
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  return (
    <MainLayout>
      <div className="p-4 md:p-8">
        <PageHeader
          title="My Library"
          description="Your personal collection of book summaries."
          action={<BookUploadButton onBookUploaded={handleBookUploaded} />}
        />

        <div className="space-y-8">
          <HabitTrackerCard booksInLibrary={books.length} />

          <div>
            <h2 className="text-xl font-semibold tracking-tight mb-4">
              Your Books
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
