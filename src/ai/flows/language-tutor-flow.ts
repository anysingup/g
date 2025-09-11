'use server';

/**
 * @fileOverview Provides an AI-powered language tutor to help users learn English.
 *
 * - `getQuizQuestion` - A function that generates a quiz question.
 * - `LanguageTutorInput` - The input type for the `getQuizQuestion` function.
 * - `LanguageTutorOutput` - The return type for the `getQuizQuestion` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LanguageTutorInputSchema = z.object({
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']).describe('The difficulty level of the quiz question.'),
  topic: z.string().optional().describe('The topic for the quiz question (e.g., "verbs", "food", "travel").'),
});
export type LanguageTutorInput = z.infer<typeof LanguageTutorInputSchema>;

const LanguageTutorOutputSchema = z.object({
  question: z.string().describe('The quiz question.'),
  options: z.array(z.string()).describe('A list of possible answers.'),
  correctAnswer: z.string().describe('The correct answer from the options.'),
  explanation: z.string().optional().describe('An explanation for the correct answer.'),
});
export type LanguageTutorOutput = z.infer<typeof LanguageTutorOutputSchema>;

export async function getQuizQuestion(
  input: LanguageTutorInput
): Promise<LanguageTutorOutput> {
  return languageTutorFlow(input);
}

const languageTutorPrompt = ai.definePrompt({
  name: 'languageTutorPrompt',
  input: {schema: LanguageTutorInputSchema},
  output: {schema: LanguageTutorOutputSchema},
  prompt: `You are an expert English language tutor. Your task is to create a multiple-choice quiz question for a user.
The question should be based on the provided difficulty level and topic.
You need to generate a clear question, four distinct options, identify the correct answer, and provide a brief explanation.

Difficulty: {{difficulty}}
{{#if topic}}
Topic: {{topic}}
{{/if}}

Generate one quiz question.
`,
});

const languageTutorFlow = ai.defineFlow(
  {
    name: 'languageTutorFlow',
    inputSchema: LanguageTutorInputSchema,
    outputSchema: LanguageTutorOutputSchema,
  },
  async input => {
    const {output} = await languageTutorPrompt(input);
    return output!;
  }
);
