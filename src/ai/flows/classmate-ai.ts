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

const imageGenClassifierPrompt = ai.definePrompt({
    name: 'imageGenClassifierPrompt',
    input: { schema: z.object({ query: z.string() }) },
    output: { schema: z.object({ shouldGenerate: z.boolean() }) },
    prompt: `You are a text classifier. Your task is to determine if the user's query is a request to generate an image.
    The user is a primary school student in Bangladesh and will likely ask in Bengali.
    Keywords to look for: "আঁকো" (draw), "ছবি" (picture/image), "তৈরি করো" (create).
    
    Examples:
    - "একটি বিড়ালের ছবি আঁকো" -> shouldGenerate: true
    - "গণিত সমস্যাটি সমাধান কর" -> shouldGenerate: false
    - "একটি সুন্দর ফুলের ছবি তৈরি করো" -> shouldGenerate: true
    - "What is the capital of France?" -> shouldGenerate: false
    - "Draw a house" -> shouldGenerate: true

    User Query: "{{query}}"
    `,
});

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
    // 1. Classify the user's intent
    const { output: classification } = await imageGenClassifierPrompt({query: input.query});

    // 2. If it's an image generation request, call the image generation flow
    if (classification?.shouldGenerate) {
        try {
            const imageResult = await generateImage(input.query);
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

    // 3. Otherwise, get a text-based response
    const {output} = await classmateAiPrompt(input);
    return output!;
  }
);
