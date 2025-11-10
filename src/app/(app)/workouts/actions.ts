'use server';

import {
  generateWorkoutPlan,
  WorkoutPlan,
} from '@/ai/flows/workout-generator';

export async function getWorkoutPlan(
  prompt: string
): Promise<WorkoutPlan | { error: string }> {
  if (!prompt.trim()) {
    return { error: 'Workout prompt cannot be empty.' };
  }
  try {
    const result = await generateWorkoutPlan({ prompt });
    return result;
  } catch (_error) {
    return { error: 'AI workout generator is unavailable right now. Please try again later.' };
  }
}
