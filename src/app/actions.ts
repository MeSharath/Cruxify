
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

type GenerateAudioInput = {
  text: string;
  bookId: string;
};

type GenerateAudioOutput = {
  success: boolean;
  audioData?: string;
  error?: string;
};

export async function generateAudioAction(
  input: GenerateAudioInput
): Promise<GenerateAudioOutput> {
  const apiKey = process.env.ELEVENLABS_API_KEY;

  if (!apiKey) {
    const errorMessage = "ElevenLabs API key is not configured on the server.";
    console.error(errorMessage);
    return {
      success: false,
      error: errorMessage,
    };
  }

  const voiceId = "21m00Tcm4TlvDq8ikWAM"; // A default voice, can be customized
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": apiKey,
      },
      body: JSON.stringify({
        text: input.text,
        model_id: "eleven_multilingual_v2",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.json();
      console.error("ElevenLabs API error response:", errorBody);
      const errorMessage =
        errorBody.detail?.message ||
        `API Error: ${response.status} ${response.statusText}`;
      return {
        success: false,
        error: `Failed to generate audio: ${errorMessage}`,
      };
    }

    const audioArrayBuffer = await response.arrayBuffer();
    const audioBase64 = Buffer.from(audioArrayBuffer).toString("base64");
    const audioDataUri = `data:audio/mpeg;base64,${audioBase64}`;

    return { success: true, audioData: audioDataUri };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    console.error("Failed to generate audio:", errorMessage);
    return {
      success: false,
      error: `Failed to generate audio: ${errorMessage}`,
    };
  }
}

