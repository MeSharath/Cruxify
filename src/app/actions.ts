
"use server";

import { generateBookSummary } from "@/ai/flows/generate-book-summary";
import { summaries } from "@/lib/data";

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


export async function generateAudioAction(
  bookId: string
): Promise<{ success: true; audioData: string } | { success: false; error: string }> {
    try {
        const summaryText = summaries[bookId];
        if (!summaryText) {
            return { success: false, error: "Summary not found for this book." };
        }

        const apiKey = process.env.ELEVENLABS_API_KEY;
        if (!apiKey) {
            return { success: false, error: "ElevenLabs API key is not configured on the server." };
        }

        const response = await fetch(
            "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM", // Bella voice
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "xi-api-key": apiKey,
                },
                body: JSON.stringify({
                    text: summaryText,
                    model_id: "eleven_multilingual_v2",
                    voice_settings: {
                        stability: 0.5,
                        similarity_boost: 0.75,
                    },
                }),
            }
        );

        if (!response.ok) {
            const errorBody = await response.json();
            console.error("ElevenLabs API error response:", errorBody);
            const errorMessage = errorBody.detail?.message || response.statusText || 'An unknown error occurred';
            return { success: false, error: `Failed to generate audio: ${errorMessage}` };
        }

        const audioArrayBuffer = await response.arrayBuffer();
        const audioBase64 = Buffer.from(audioArrayBuffer).toString("base64");
        const audioDataUri = `data:audio/mpeg;base64,${audioBase64}`;

        return { success: true, audioData: audioDataUri };

    } catch (error) {
        console.error("Audio generation failed:", error);
        const errorMessage = error instanceof Error ? error.message : "An unexpected server error occurred.";
        return { success: false, error: errorMessage };
    }
}
