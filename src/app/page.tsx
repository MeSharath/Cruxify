import { MainLayout } from "@/components/main-layout";
import { PageHeader } from "@/components/page-header";
import { BookUploadButton } from "@/components/book-upload-button";
import { HabitTrackerCard } from "@/components/habit-tracker-card";
import { BookCard } from "@/components/book-card";
import { books } from "@/lib/data";

export default function DashboardPage() {
  return (
    <MainLayout>
      <div className="p-4 md:p-8">
        <PageHeader
          title="My Library"
          description="Your personal collection of book summaries."
          action={<BookUploadButton />}
        />

        <div className="space-y-8">
          <HabitTrackerCard />

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
