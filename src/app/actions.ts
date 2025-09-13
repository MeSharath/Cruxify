
"use server";

import { generateBookSummary } from "@/ai/flows/generate-book-summary";
import ElevenLabs from "elevenlabs-node";

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

  if (!elevenLabsApiKey) {
    return { success: false, error: "ElevenLabs API key is not configured. Please add it on the Settings page." };
  }

  const voice = new ElevenLabs({
    apiKey: elevenLabsApiKey,
  });

  try {
    const audioStream = await voice.textToSpeechStream({
      textInput: text,
      voiceId: "21m00Tcm4TlvDq8ikWAM", // Rachel
      modelId: "eleven_multilingual_v2",
       outputFormat: "mp3_44100_128",
    });

    const chunks: Buffer[] = [];
    for await (const chunk of audioStream) {
      chunks.push(chunk);
    }

    const audioBuffer = Buffer.concat(chunks);
    const audioDataUri = `data:audio/mpeg;base64,${audioBuffer.toString("base64")}`;

    return { success: true, audioDataUri };
  } catch (error) {
    console.error("ElevenLabs API error:", error);
    return { success: false, error: "Failed to generate audio from ElevenLabs. Please check your API key and subscription status." };
  }
}
