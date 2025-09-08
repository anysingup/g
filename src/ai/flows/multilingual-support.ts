'use server';

/**
 * @fileOverview Provides multilingual support for the application, offering tips and guidance in the user's preferred language.
 *
 * - `getMultilingualSupport` - A function that translates and provides support messages.
 * - `MultilingualSupportInput` - The input type for the `getMultilingualSupport` function.
 * - `MultilingualSupportOutput` - The return type for the `getMultilingualSupport` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MultilingualSupportInputSchema = z.object({
  userQuery: z
    .string()
    .describe('The user query or request for support in any language.'),
});
export type MultilingualSupportInput = z.infer<typeof MultilingualSupportInputSchema>;

const MultilingualSupportOutputSchema = z.object({
  translatedMessage: z
    .string()
    .describe('The translated support message in the user\u0027s language.'),
});
export type MultilingualSupportOutput = z.infer<typeof MultilingualSupportOutputSchema>;

export async function getMultilingualSupport(input: MultilingualSupportInput): Promise<MultilingualSupportOutput> {
  return multilingualSupportFlow(input);
}

const multilingualSupportPrompt = ai.definePrompt({
  name: 'multilingualSupportPrompt',
  input: {schema: MultilingualSupportInputSchema},
  output: {schema: MultilingualSupportOutputSchema},
  prompt: `You are a multilingual support assistant. A user has the following query:
\n{{userQuery}}
\nTranslate this query into English, then provide a helpful and concise response to the query in the same language as the original query.
\nResponse:
`,
});

const multilingualSupportFlow = ai.defineFlow(
  {
    name: 'multilingualSupportFlow',
    inputSchema: MultilingualSupportInputSchema,
    outputSchema: MultilingualSupportOutputSchema,
  },
  async input => {
    const {output} = await multilingualSupportPrompt(input);
    return output!;
  }
);
