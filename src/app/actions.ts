
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

export async function generateAudioAction(
  text: string
): Promise<{ success: boolean; audioDataUri?: string; error?: string }> {
  // Always use the server-side key. This is the definitive fix.
  const elevenLabsApiKey = process.env.ELEVENLABS_API_KEY;

  if (!elevenLabsApiKey) {
    return {
      success: false,
      error: "ElevenLabs API key not configured on the server.",
    };
  }

  const VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // Rachel
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': elevenLabsApiKey,
        'Accept': 'audio/mpeg',
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });
    
    if (!response.ok) {
        const errorBody = await response.json();
        console.error("ElevenLabs API error response:", errorBody);
        const errorMessage = `Failed to generate audio: ${errorBody.detail?.message || response.statusText}`;
        return { success: false, error: errorMessage };
    }

    const audioArrayBuffer = await response.arrayBuffer();
    const audioBuffer = Buffer.from(audioArrayBuffer);
    const audioDataUri = `data:audio/mpeg;base64,${audioBuffer.toString('base64')}`;

    return { success: true, audioDataUri };

  } catch (error) {
    console.error("ElevenLabs API request failed:", error);
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
    return { success: false, error: `Failed to generate audio: ${errorMessage}` };
  }
}
