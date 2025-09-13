
"use client";

import { useState } from "react";
import { SummaryDisplay, parseSummary, type Chapter } from "./summary-display";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "./ui/card";

export function BookView({ summary }: { summary: string }) {
  const [currentPage, setCurrentPage] = useState(0);
  const chapters = parseSummary(summary);

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, chapters.length - 1));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  if (chapters.length === 0) {
    return (
      <Card className="flex items-center justify-center h-96">
        <p>No summary content available.</p>
      </Card>
    );
  }

  const currentChapter = chapters[currentPage];

  return (
    <div className="relative">
      <Card className="h-[40rem] rounded-lg shadow-2xl bg-card">
        {currentChapter && <SummaryDisplay chapter={currentChapter} />}
      </Card>

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between">
        {currentPage > 0 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPreviousPage}
            className="absolute left-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/10 hover:bg-black/20 text-white/60 hover:text-white transition-opacity opacity-50 hover:opacity-100"
          >
            <ChevronLeft className="size-8" />
          </Button>
        )}

        {currentPage < chapters.length - 1 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNextPage}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/10 hover:bg-black/20 text-white/60 hover:text-white transition-opacity opacity-50 hover:opacity-100"
          >
            <ChevronRight className="size-8" />
          </Button>
        )}
      </div>

       <div className="text-center mt-4 font-sans text-sm text-muted-foreground">
        Page {currentPage + 1} of {chapters.length}
      </div>
    </div>
  );
}
