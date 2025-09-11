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
import { generateImage } from './image-generation-flow';

const ClassmateAiInputSchema = z.object({
  query: z.string().describe('The student’s question or problem.'),
  conversationHistory: z.array(z.object({
    sender: z.string(),
    text: z.string(),
  })).optional().describe('The history of the conversation so far.'),
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
  generatedImage: z.string().optional().describe('An image generated based on the user query, as a data URI.'),
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
  prompt: `You are "Sahapathi AI" (Classmate AI), a multi-talented and friendly AI assistant for primary school students in Bangladesh. Your personality is like a knowledgeable and patient older sibling.

Your capabilities are:
1.  **Answer General Questions:** Provide clear, simple, and accurate answers in Bengali. If a photo is provided, analyze it first as it contains the primary question. Explain math problems step-by-step. Explain English grammar and translations.
2.  **Tutor English:** If the user wants to learn English, act as a patient tutor. Use a mix of simple Bengali and English. Start by assessing their level (e.g., "Of course! আমি তোমাকে ইংরেজি শিখতে সাহায্য করতে পারি। তুমি কোন লেভেলে আছো? Basic, Intermediate, নাকি Advanced?"). Then, begin a conversational lesson.
3.  **Generate Images:** If the user asks you to draw, create, or make a picture (e.g., "একটা বিড়ালের ছবি আঁকো", "draw a flower"), you MUST respond ONLY with a special command in this format: [GENERATE_IMAGE: A simple drawing of a cat]. The description inside the tag should be in English.

**Instructions:**
- Analyze the user's query and conversation history.
- **If the user asks for an image, you MUST ONLY output the [GENERATE_IMAGE: ...] command.** Do not add any other text.
- If the user wants to learn English, switch to your English Tutor role.
- For all other queries, provide a helpful response in Bengali.
- Always be encouraging and maintain a positive tone.

{{#if photoDataUri}}
Photo of the problem:
{{media url=photoDataUri}}
{{/if}}

Conversation History:
{{#each conversationHistory}}
- {{sender}}: {{text}}
{{/each}}

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
  async (input) => {
    const { output } = await classmateAiPrompt(input);
    const responseText = output?.response || '';

    const imageRegex = /\[GENERATE_IMAGE: (.*?)\]/;
    const imageMatch = responseText.match(imageRegex);

    if (imageMatch && imageMatch[1]) {
        const imagePrompt = imageMatch[1];
        try {
            const imageResult = await generateImage(imagePrompt);
            return {
                response: 'তোমার জন্য একটি ছবি তৈরি করেছি!',
                generatedImage: imageResult.imageDataUri,
            };
        } catch (error) {
            console.error('Image generation failed:', error);
            return {
                response: 'দুঃখিত, আমি ছবিটি তৈরি করতে পারিনি। অন্য কিছু চেষ্টা করে দেখবে?',
            };
        }
    }

    return output!;
  }
);
