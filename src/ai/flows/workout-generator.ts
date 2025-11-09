'use server';
/**
 * @fileOverview AI-powered workout plan generator.
 *
 * - generateWorkoutPlan - A function that creates a workout based on a user's prompt.
 * - WorkoutGeneratorInput - The input type for the workout generator.
 * - WorkoutPlan - The output type (the workout plan itself).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { exerciseLibrary, ExerciseAsset } from '@/lib/exerciseDatabase';

const WorkoutGeneratorInputSchema = z.object({
  prompt: z
    .string()
    .describe('A user-provided prompt describing the kind of workout they want. E.g., "20 minute core workout", "upper body strength for 45 mins".'),
});
export type WorkoutGeneratorInput = z.infer<typeof WorkoutGeneratorInputSchema>;


// This is the schema the AI will now output. It's simpler.
const AIExerciseSchema = z.object({
    exerciseId: z.string().describe("The unique ID of the exercise from the provided library (e.g., 'push-ups', 'rest')."),
    duration: z.number().describe("The duration of the exercise in seconds."),
    category: z.enum(['Warm-up', 'Work', 'Cool-down', 'Rest']).describe("The category of the exercise."),
});


const AIWorkoutPlanSchema = z.object({
  name: z.string().describe('A catchy and descriptive name for the generated workout plan. e.g. "Core Crusher"'),
  focus: z.string().describe("The main focus of the workout, e.g., 'Upper Body', 'Core', 'Full Body Cardio'."),
  exercises: z.array(AIExerciseSchema).describe("An array of exercises that make up the workout plan, referencing the exercise library."),
});


// This is the rich object we will send to the client.
const ClientExerciseSchema = z.object({
  name: z.string(),
  description: z.string(),
  duration: z.number(),
  category: z.enum(['Warm-up', 'Work', 'Cool-down', 'Rest']),
  asset: z.custom<ExerciseAsset>(),
});

const WorkoutPlanSchema = z.object({
  name: z.string(),
  focus: z.string(),
  exercises: z.array(ClientExerciseSchema),
});
export type WorkoutPlan = z.infer<typeof WorkoutPlanSchema>;

export async function generateWorkoutPlan(input: WorkoutGeneratorInput): Promise<WorkoutPlan> {
  return workoutGeneratorFlow(input);
}

// We provide the library of available exercises to the AI.
const availableExercises = Object.keys(exerciseLibrary);

const prompt = ai.definePrompt({
  name: 'workoutGeneratorPrompt',
  input: {schema: z.object({ prompt: WorkoutGeneratorInputSchema.shape.prompt, availableExercises: z.array(z.string()) })},
  output: {schema: AIWorkoutPlanSchema},
  prompt: `You are a world-class fitness coach. Your task is to create a complete, structured workout plan based on the user's request. The plan must be logical and include a warm-up, the main work, and a cool-down.

  You MUST select exercises exclusively from the following library of available exercise IDs. Do not invent new exercises. Always include 'rest' periods between work sets.
  
  Available Exercise IDs:
  {{#each availableExercises}}
  - {{this}}
  {{/each}}
  
  Generate a workout based on the following prompt:
  "{{{prompt}}}"

  Structure the output as a valid JSON object. Ensure the workout flows logically from warm-up to cool-down.`,
});


const workoutGeneratorFlow = ai.defineFlow(
  {
    name: 'workoutGeneratorFlow',
    inputSchema: WorkoutGeneratorInputSchema,
    outputSchema: WorkoutPlanSchema,
  },
  async (input) => {
    // 1. Get the structured plan from the AI (with exercise IDs)
    const { output: aiPlan } = await prompt({ ...input, availableExercises });
    if (!aiPlan) {
        throw new Error("AI failed to generate a workout plan.");
    }

    // 2. Map the AI-generated plan to our rich client-side plan
    const clientExercises = aiPlan.exercises.map(aiExercise => {
      const exerciseData = exerciseLibrary[aiExercise.exerciseId];
      if (!exerciseData) {
        // Fallback in case the AI hallucinates an ID
        console.warn(`AI generated an unknown exerciseId: ${aiExercise.exerciseId}. Falling back to 'rest'.`);
        return {
          ...exerciseLibrary.rest,
          duration: aiExercise.duration,
          category: 'Rest',
        };
      }
      return {
        ...exerciseData,
        duration: aiExercise.duration,
        category: aiExercise.category,
      };
    });

    return {
      name: aiPlan.name,
      focus: aiPlan.focus,
      exercises: clientExercises,
    };
  }
);
