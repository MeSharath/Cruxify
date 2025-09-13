
"use server";

import { generateBookSummary } from "@/ai/flows/generate-book-summary";
import { generateAudio } from "@/ai/flows/generate-audio-flow";

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
  text: string,
  userApiKey?: string
): Promise<{ success: boolean; audioDataUri?: string; error?: string }> {
  const elevenLabsApiKey = userApiKey || process.env.ELEVENLABS_API_KEY;

  if (elevenLabsApiKey) {
    try {
      const { ElevenLabsClient } = await import("elevenlabs-node");
      const elevenlabs = new ElevenLabsClient({
        apiKey: elevenLabsApiKey,
      });

      const audioStream = await elevenlabs.generate({
        stream: true,
        voice: "Rachel",
        model_id: "eleven_multilingual_v2",
        text,
      });

      const chunks: Buffer[] = [];
      for await (const chunk of audioStream) {
        chunks.push(chunk);
      }

      const audioBuffer = Buffer.concat(chunks);
      const audioDataUri = `data:audio/mpeg;base64,${audioBuffer.toString("base64")}`;

      return { success: true, audioDataUri };
    } catch (error) {
      console.warn("ElevenLabs API error, falling back to default TTS:", error);
      // Fall through to the default TTS if ElevenLabs fails
    }
  }

  // Fallback to default TTS
  try {
    const { media } = await generateAudio(text);
    return { success: true, audioDataUri: media };
  } catch (error) {
    console.error("Default TTS error:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
    return { success: false, error: `Failed to generate audio: ${errorMessage}` };
  }
}
