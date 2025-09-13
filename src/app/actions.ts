
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

type GenerateAudioOutput = {
  success: boolean;
  audioData?: string;
  error?: string;
};

export async function generateAudioAction(
  text: string,
): Promise<GenerateAudioOutput> {
  if (!text) {
    return { success: false, error: "No summary text provided." };
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return { success: false, error: "ElevenLabs API key is not configured on the server." };
  }
  
  const VOICE_ID = '21m00Tcm4TlvDq8ikWAM'; // Rachel
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;
  
  try {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': apiKey,
        },
        body: JSON.stringify({
            text: text,
            model_id: 'eleven_monolingual_v1',
            voice_settings: {
                stability: 0.5,
                similarity_boost: 0.5,
            },
        }),
    });

    if (!response.ok) {
        const errorBody = await response.json();
        console.error("ElevenLabs API error response:", errorBody);
        const errorMessage = errorBody.detail?.message || response.statusText;
        return { success: false, error: `Failed to generate audio: ${errorMessage}` };
    }

    const audioArrayBuffer = await response.arrayBuffer();
    const audioData = `data:audio/mpeg;base64,${Buffer.from(audioArrayBuffer).toString('base64')}`;

    return {
      success: true,
      audioData,
    };
  } catch (error) {
    console.error("Audio generation failed:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred.";
    return { success: false, error: `Failed to generate audio: ${errorMessage}` };
  }
}
