
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a concise, Headway-style summary of a book.
 *
 * - generateBookSummary - A function that takes EPUB content as input and returns a summarized text.
 * - GenerateBookSummaryInput - The input type for the generateBooksummary function, which includes the book's EPUB content.
 * - GenerateBookSummaryOutput - The return type for the generateBookSummary function, which is the generated summary text.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateBookSummaryInputSchema = z.object({
  bookContent: z
    .string()
    .describe('The content of the book in EPUB format.'),
  userApiKey: z.string().optional().describe("User's API key."),
});
export type GenerateBookSummaryInput = z.infer<typeof GenerateBookSummaryInputSchema>;

const GenerateBookSummaryOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise, actionable summary of the book.'),
});
export type GenerateBookSummaryOutput = z.infer<typeof GenerateBookSummaryOutputSchema>;

export async function generateBookSummary(input: GenerateBookSummaryInput): Promise<GenerateBookSummaryOutput> {
  return generateBookSummaryFlow(input);
}

const generateBookSummaryFlow = ai.defineFlow(
  {
    name: 'generateBookSummaryFlow',
    inputSchema: GenerateBookSummaryInputSchema,
    outputSchema: GenerateBookSummaryOutputSchema,
  },
  async (input) => {
    
    const apiKey = input.userApiKey || process.env.PERPLEXITY_API_KEY;

    if (!apiKey) {
      throw new Error("Perplexity API key is not configured. Please add it to your environment variables or provide it in the settings.");
    }
    
    const prompt = `You are a master storyteller and literary artist. Your task is to transform the provided book content into an immersive, narrative-style summary.

Your response must follow this structure:
1.  **Chapters:** The summary must be broken into at least 8 "chapters." Each chapter must begin with a descriptive title formatted with markdown '###'.
2.  **Narrative Flow:** Within each chapter, weave the key insights into a flowing narrative. Go into detail. Do NOT use bullet points or numbered lists. Explain concepts through storytelling.
3.  **Pull-Quotes:** For each chapter, identify one or two powerful, impactful sentences that capture a core idea. Embed them directly within the text using the format: \`{{pullquote: "The quote text goes here."}}\`
4.  **Reflection Questions:** At the end of each chapter, provide one thought-provoking reflection question to encourage deeper engagement. Format it like this: \`{{reflection: "Your question here?"}}\`

Here is an example of a single chapter's format:
### Chapter Title
Here is the first paragraph of the narrative. It flows like a story.
{{pullquote: "This is an important insight that deserves to be highlighted."}}
Here is the second paragraph, continuing the story and elaborating on the concepts. The narrative should be engaging and reflect the author's voice.
{{reflection: "How can you apply this concept to your own life?"}}

---
Book Content:
${input.bookContent}`;

    // Perplexity API call
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'sonar-pro',
        messages: [
          { role: 'system', content: 'You are an expert book summarizer that writes in a narrative, literary style.' },
          { role: 'user', content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Perplexity API request failed with status ${response.status}: ${errorBody}`);
    }

    const data = await response.json();
    const summary = data.choices[0]?.message?.content;
    
    if (!summary) {
      throw new Error('Failed to get a valid summary from Perplexity API.');
    }

    return { summary };
  }
);
