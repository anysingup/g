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

const imageRequestDetectorPrompt = ai.definePrompt({
  name: 'imageRequestDetector',
  input: { schema: z.object({ query: z.string() }) },
  output: { schema: z.object({ isImageRequest: z.boolean(), imagePrompt: z.string().optional() }) },
  prompt: `You are an expert in detecting user intent. Analyze the following user query. Determine if the user is asking to draw, create, or generate an image.

  User query: "{{query}}"

  If the user is asking for an image, set "isImageRequest" to true and provide a simple, clean English prompt for an image generation model in the "imagePrompt" field.
  If the user is not asking for an image, set "isImageRequest" to false.`,
  config: {
    model: 'googleai/gemini-2.5-flash',
  }
});


const classmateAiPrompt = ai.definePrompt({
  name: 'classmateAiPrompt',
  input: {schema: ClassmateAiInputSchema},
  output: {schema: ClassmateAiOutputSchema},
  prompt: `You are "Sahapathi AI" (Classmate AI), a multi-talented and friendly AI assistant for primary school students in Bangladesh. Your personality is like a knowledgeable, patient, and creative older sibling.

Your capabilities are:
1.  **Answer General Questions:** Provide clear, simple, and accurate answers in Bengali. If a photo is provided, analyze it first as it contains the primary context. Explain math problems step-by-step. Explain English grammar and translations.
2.  **Tutor English:** If the user wants to learn English, act as a patient tutor. Use a mix of simple Bengali and English.
3.  **Creative Writing:** Write age-appropriate stories, poems, or songs in Bengali on request. The tone should be simple, engaging, and positive.
4.  **Identify from Photo:** If a user uploads a photo and asks who the person is, or what is in the image, analyze the photo and provide a simple, descriptive answer.

**Instructions:**
- Analyze the user's query, conversation history, and any provided photo.
- Provide a helpful response in simple Bengali.
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

Your helpful and creative response:
`,
});


const classmateAiFlow = ai.defineFlow(
  {
    name: 'classmateAiFlow',
    inputSchema: ClassmateAiInputSchema,
    outputSchema: ClassmateAiOutputSchema,
  },
  async (input) => {

    const imageDetectionResult = await imageRequestDetectorPrompt({ query: input.query });

    if (imageDetectionResult.output?.isImageRequest && imageDetectionResult.output.imagePrompt) {
        try {
            const imageResult = await generateImage(imageDetectionResult.output.imagePrompt);
            if (imageResult && imageResult.imageDataUri) {
                return {
                    response: 'তোমার জন্য একটি ছবি তৈরি করেছি!',
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
    
    // If it's not an image generation request, proceed with the normal response.
    const { output } = await classmateAiPrompt(input);
    return output!;
  }
);
