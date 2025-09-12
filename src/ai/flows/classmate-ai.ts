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
import { googleAI } from '@genkit-ai/googleai';


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
      "An optional photo of the student's problem (e.g., a math equation, or a person to identify), as a data URI."
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
  output: {schema: z.object({
    response: z.string(),
    imagePrompt: z.string().optional(),
  })},
  prompt: `You are "Sahapathi AI" (Classmate AI), a multi-talented and friendly AI assistant for primary school students in Bangladesh. Your personality is like a knowledgeable, patient, and creative older sibling.

Your capabilities are:
1.  **Answer General Questions:** Provide clear, simple, and accurate answers in Bengali. If a photo is provided, analyze it first as it contains the primary context. Explain math problems step-by-step. Explain English grammar and translations.
2.  **Tutor English:** If the user wants to learn English, act as a patient tutor. Use a mix of simple Bengali and English.
3.  **Creative Writing:** Write age-appropriate stories, poems, or songs in Bengali on request. The tone should be simple, engaging, and positive.
4.  **Identify from Photo:** If a user uploads a photo and asks who the person is, or what is in the image, analyze the photo and provide a simple, descriptive answer.
5.  **Generate Images:** If the user asks you to draw, create, or generate an image, you MUST set the "imagePrompt" field to a simple, clean English prompt for an image generation model.

**Instructions:**
- Analyze the user's query, conversation history, and any provided photo.
- If the query is a request to draw, create, or generate an image, set the "imagePrompt" field with a suitable English prompt. Provide a short confirmation message in Bengali in the "response" field (e.g., "তোমার জন্য একটি ছবি তৈরি করছি!").
- For all other queries, provide a helpful response in simple Bengali in the "response" field and leave "imagePrompt" empty.
- Always be encouraging, maintain a friendly and positive tone, like a true classmate.

{{#if photoDataUri}}
The user has provided this photo for context. Analyze it carefully.
{{media url=photoDataUri}}
{{/if}}

Conversation History:
{{#each conversationHistory}}
- {{sender}}: {{text}}
{{/each}}

Student's Query:
"{{query}}"

Your analysis and response:
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

    if (output?.imagePrompt) {
        try {
            const imageResult = await generateImage(output.imagePrompt);
            if (imageResult && imageResult.imageDataUri) {
                return {
                    response: output.response || 'তোমার জন্য একটি ছবি তৈরি করেছি!',
                    generatedImage: imageResult.imageDataUri,
                };
            }
            throw new Error('Image generation result is invalid.');
        } catch (error) {
            console.error('Image generation failed:', error);
            return {
                response: 'দুঃখিত, আমি ছবিটি তৈরি করতে পারিনি। অন্য কিছু চেষ্টা করে দেখবে?',
            };
        }
    }
    
    return { response: output!.response };
  }
);
