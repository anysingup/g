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

const languageLearningClassifierPrompt = ai.definePrompt({
    name: 'languageLearningClassifierPrompt',
    input: { schema: z.object({ query: z.string() }) },
    output: { schema: z.object({ wantsToLearn: z.boolean() }) },
    prompt: `You are a text classifier. Your task is to determine if the user wants to learn English.
    The user is a primary school student or teacher in Bangladesh.
    Keywords to look for: "শিখব" (learn), "শিখতে চাই" (want to learn), "ইংলিশ" (English), "ইংরেজি", "English".
    
    Examples:
    - "আমি ইংরেজি শিখব" -> wantsToLearn: true
    - "গণিত সমস্যাটি সমাধান কর" -> wantsToLearn: false
    - "I want to learn English" -> wantsToLearn: true
    - "How are you?" -> wantsToLearn: false
    - "আমাকে ইংরেজি শেখাও" -> wantsToLearn: true

    User Query: "{{query}}"
    `,
});

const englishTutorPrompt = ai.definePrompt({
  name: 'englishTutorPrompt',
  input: {schema: ClassmateAiInputSchema},
  output: {schema: ClassmateAiOutputSchema},
  prompt: `You are "Sahapathi AI" (Classmate AI), but you are now in a special role as a friendly and patient English Language Tutor.
Your student is from Bangladesh (can be a child or an adult teacher) and wants to learn English.
You must always respond in a mix of simple Bengali and English to make them comfortable.

Your task is to guide the student through learning English, from basic to advanced levels.
1.  **Assess their level:** If the conversation is new, start by asking about their current English level. Say something like, "Of course! আমি তোমাকে ইংরেজি শিখতে সাহায্য করতে পারি। তুমি ইংরেজি কেমন পারো? Basic, Intermediate, নাকি Advanced?"
2.  **Start the lesson:** Based on their answer, or if they just want to start, begin with a very basic lesson. For example, "চলো, তাহলে শুরু করা যাক! Let's start with some simple greetings. 'Hello' মানে 'ওহে'। তুমি কি কাউকে 'Hello' বলতে পারবে?"
3.  **Be conversational:** Maintain a conversation. Use the provided conversation history to understand the context and continue the lesson from where you left off. Ask questions, give small quizzes, and provide encouragement.
4.  **Keep it simple:** Use simple language. Explain one concept at a time.
5.  **Encourage practice:** After explaining something, ask the user to try it themselves. For example, "Now, you try! 'আমার নাম [Your Name]' - এটাকে ইংরেজিতে কীভাবে বলবে?"

Conversation History:
{{#each conversationHistory}}
- {{sender}}: {{text}}
{{/each}}

Student's new message: "{{query}}"

Your encouraging and helpful tutor response:
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
    try {
        const { output: imageClassification } = await imageGenClassifierPrompt({query: input.query});

        if (imageClassification?.shouldGenerate) {
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

        const { output: learningClassification } = await languageLearningClassifierPrompt({query: input.query});

        if(learningClassification?.wantsToLearn) {
             const {output} = await englishTutorPrompt(input);
             return output!;
        }

    } catch (error) {
        console.error('Classification failed. Falling back to text generation.', error);
    }

    const {output} = await classmateAiPrompt(input);
    return output!;
  }
);
