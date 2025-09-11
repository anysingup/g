'use server';

/**
 * @fileOverview An AI flow for generating images from text prompts.
 *
 * - `generateImage` - Generates an image based on a text prompt.
 * - `ImageGenerationOutput` - The output type for the `generateImage` function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

const ImageGenerationOutputSchema = z.object({
  imageDataUri: z.string().describe("The generated image as a data URI."),
});
export type ImageGenerationOutput = z.infer<typeof ImageGenerationOutputSchema>;

export async function generateImage(prompt: string): Promise<ImageGenerationOutput> {
  return imageGenerationFlow(prompt);
}

const imageGenerationFlow = ai.defineFlow(
  {
    name: 'imageGenerationFlow',
    inputSchema: z.string(),
    outputSchema: ImageGenerationOutputSchema,
  },
  async (prompt) => {
    const { media } = await ai.generate({
        model: googleAI('imagen-4.0-fast-generate-001'),
        prompt: `A beautiful, vibrant, and simple illustration for a child. Style: storybook, colorful, friendly. Prompt: ${prompt}`,
    });
    
    if (!media.url) {
        throw new Error('Image generation failed to return a data URI.');
    }

    return { imageDataUri: media.url };
  }
);
