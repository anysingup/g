'use server';

/**
 * @fileOverview Provides an AI-powered classmate to help students with their studies.
 *
 * - `getClassmateResponse` - A function that provides answers to student queries.
 * - `ClassmateAiInput` - The input type for the `getClassmateResponse` function.
 * - `ClassmateAiOutput` - The return type for the `getClassmateResponse` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClassmateAiInputSchema = z.object({
  query: z.string().describe('The student’s question or problem.'),
  photoDataUri: z
    .string()
    .optional()
    .describe(
      "An optional photo of the student's problem (e.g., a math equation), as a data URI."
    ),
});
export type ClassmateAiInput = z.infer<typeof ClassmateAiInputSchema>;

const ClassmateAiOutputSchema = z.object({
  response: z
    .string()
    .describe('A helpful and friendly response to the student’s query.'),
});
export type ClassmateAiOutput = z.infer<typeof ClassmateAiOutputSchema>;

export async function getClassmateResponse(
  input: ClassmateAiInput
): Promise<ClassmateAiOutput> {
  return classmateAiFlow(input);
}

const classmateAiPrompt = ai.definePrompt({
  name: 'classmateAiPrompt',
  input: {schema: ClassmateAiInputSchema},
  output: {schema: ClassmateAiOutputSchema},
  prompt: `You are a helpful and friendly AI assistant for primary school students in Bangladesh. Your name is "Sahapathi AI" (Classmate AI).
Your personality is like a knowledgeable and patient older sibling or a very smart classmate.
You must always respond in Bengali.
When a student asks you a question, you should provide a clear, simple, and accurate answer.
If a photo is provided, analyze the photo first as it contains the primary question. The text query will provide additional context.
If it's a math problem (from text or photo), explain the steps to solve it.
If it's an English question (like translation or grammar, from text or photo), explain the concept clearly.
For general knowledge, provide concise and easy-to-understand information.
Always be encouraging and maintain a positive tone.

{{#if photoDataUri}}
Photo of the problem:
{{media url=photoDataUri}}
{{/if}}

Student's Query:
"{{query}}"

Your helpful response:
`,
});

const classmateAiFlow = ai.defineFlow(
  {
    name: 'classmateAiFlow',
    inputSchema: ClassmateAiInputSchema,
    outputSchema: ClassmateAiOutputSchema,
  },
  async input => {
    const {output} = await classmateAiFlow(input);
    return output!;
  }
);
