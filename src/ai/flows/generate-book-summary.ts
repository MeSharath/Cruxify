
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
    
    const prompt = `You are a world-class AI assistant that specializes in distilling books into powerful, life-changing summaries. Your goal is to maximize user retention and empower them to apply the book's wisdom immediately.

For the book content provided, create a compelling 15-minute summary. Go beyond just listing key points. For each key insight, you must:
1.  **Explain the Insight Clearly:** Break down the core concept in a simple, memorable way.
2.  **Highlight the 'Why':** Explain why this insight is crucial for the user's personal growth, productivity, or well-being. Make them feel the importance of this knowledge.
3.  **Provide Actionable 'How-Tos':** Give concrete, step-by-step actions the user can take *today* to implement this insight. Frame these as small, easy-to-start habits.
4.  **Connect to Habit Formation:** For the actionables, explicitly suggest a technique from "Atomic Habits" (like habit stacking, environment design, or the two-minute rule) to help the user integrate this into their life.

Structure the output in a Headway-style format with clear section titles (using markdown '###') for each key insight and bulleted lists for the actionables.

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
          { role: 'system', content: 'You are an expert book summarizer.' },
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
