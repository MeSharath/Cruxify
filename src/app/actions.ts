
"use server";

import { generateBookSummary } from "@/ai/flows/generate-book-summary";
import { summaries, audioData } from "@/lib/data";
import { preGeneratedAudio } from "@/lib/audio-data";

export async function handleFileUpload(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const file = formData.get("epub-file") as File;
  const userApiKey = formData.get("user_api_key") as string | null;

  if (!file || file.size === 0) {
    return { success: false, error: "No file selected. Please choose an EPUB file to upload." };
  }

  if (!file.name.endsWith(".epub")) {
    return { success: false, error: "Invalid file type. Please upload a valid .epub file." };
  }

  try {
    const bookContent = await file.text();
    await generateBookSummary({ bookContent, userApiKey: userApiKey ?? undefined });

    return { success: true };
  } catch (error) {
    console.error("File upload failed:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred during summarization.";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

type GetAudioOutput = {
  success: boolean;
  audioData?: string;
  error?: string;
};

// This function simulates fetching pre-generated audio from a backend store.
export async function getPreGeneratedAudio(
  bookId: string
): Promise<GetAudioOutput> {
  console.log(`Searching for pre-generated audio for book ID: ${bookId}`);
  
  // Simulate network/database latency
  await new Promise(resolve => setTimeout(resolve, 2500));

  const audio = preGeneratedAudio[bookId];

  if (audio) {
    console.log(`Audio found for ${bookId}.`);
    return {
      success: true,
      audioData: audio,
    };
  } else {
    console.log(`No pre-generated audio found for ${bookId}.`);
    return {
      success: false,
      error: "An audio summary is not yet available for this book.",
    };
  }
}
