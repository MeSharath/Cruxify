
"use server";

import { generateBookSummary } from "@/ai/flows/generate-book-summary";

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
