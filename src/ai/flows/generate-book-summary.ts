'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a concise, Headway-style summary of a book.
 *
 * - generateBookSummary - A function that takes EPUB content as input and returns a summarized text.
 * - GenerateBookSummaryInput - The input type for the generateBookSummary function, which includes the book's EPUB content.
 * - GenerateBookSummaryOutput - The return type for the generateBookSummary function, which is the generated summary text.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBookSummaryInputSchema = z.object({
  bookContent: z
    .string()
    .describe('The content of the book in EPUB format.'),
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

const prompt = ai.definePrompt({
  name: 'generateBookSummaryPrompt',
  input: {schema: GenerateBookSummaryInputSchema},
  output: {schema: GenerateBookSummaryOutputSchema},
  prompt: `You are an AI assistant designed to provide concise and actionable summaries of books.

  Please provide a 15-minute summary of the book content provided below. Focus on the key insights,
  actionable takeaways, and examples that the reader can immediately apply.

  Format the summary in a Headway-style format, with clear section titles and bullet points for actionables.

  Book Content:
  {{bookContent}}`,
});

const generateBookSummaryFlow = ai.defineFlow(
  {
    name: 'generateBookSummaryFlow',
    inputSchema: GenerateBookSummaryInputSchema,
    outputSchema: GenerateBookSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
