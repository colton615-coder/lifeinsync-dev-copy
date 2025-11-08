'use server';
/**
 * @fileOverview AI-powered habit coaching.
 *
 * - getHabitCoaching - A function that provides coaching feedback on user habits.
 * - HabitCoachInput - The input type for the habit coaching function.
 * - HabitCoachOutput - The return type for the habit coaching function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const HabitCoachInputSchema = z.object({
  habits: z
    .array(
      z.object({
        name: z.string(),
        streak: z.number(),
        done: z.boolean(),
      })
    )
    .describe('An array of the user\'s current habits, including name, streak count, and completion status for the day.'),
});
export type HabitCoachInput = z.infer<typeof HabitCoachInputSchema>;

const HabitCoachOutputSchema = z.object({
  feedback: z
    .string()
    .describe('A single, concise, and direct piece of feedback or observation based on the user\'s habit data. Adopt a tough-love, no-excuses coaching persona (like "Knox").'),
});
export type HabitCoachOutput = z.infer<typeof HabitCoachOutputSchema>;

export async function getHabitCoaching(
  input: HabitCoachInput
): Promise<HabitCoachOutput> {
  return habitCoachFlow(input);
}

const prompt = ai.definePrompt({
  name: 'habitCoachPrompt',
  input: { schema: HabitCoachInputSchema },
  output: { schema: HabitCoachOutputSchema },
  prompt: `You are "Knox," a tough-love life coach. Your task is to provide one single, direct, and powerfully motivating piece of feedback based on the user's habit data. Do not be soft. Do not offer generic praise. Cut to the truth.

Analyze the user's habits:
- Streaks: High streaks show discipline. Low or zero streaks show a lack of commitment.
- Completion: Are they getting things done today?
- Habit Names: What are they trying to achieve?

Based on the JSON data below, give them one piece of harsh reality to get them to improve. If they are doing well, give a begrudgingly respectful nod and tell them not to get complacent.

Habit Data:
{{{json habits}}}

Generate a single, impactful sentence for the 'feedback' field.`,
});

const habitCoachFlow = ai.defineFlow(
  {
    name: 'habitCoachFlow',
    inputSchema: HabitCoachInputSchema,
    outputSchema: HabitCoachOutputSchema,
  },
  async (input) => {
    // If there are no habits, return a default "slacker" message.
    if (!input.habits || input.habits.length === 0) {
      return {
        feedback:
          "You can't build discipline if you don't even define the battlefield. Add a habit.",
      };
    }
    const { output } = await prompt(input);
    return output!;
  }
);
