import { PlaceHolderImages } from './placeholder-images';

// The new "Asset" schema for our 3-layer fallback system
export type ExerciseAsset = {
  type: 'gif' | 'api' | 'initials';
  value: string; // e.g., 'push-ups.gif' OR 'pushups exercise' OR 'PU'
};


type ExerciseData = {
  name: string;
  description: string;
  asset: ExerciseAsset;
};


// This library is the single source of truth for all exercises.
// The AI model will be instructed to only use the keys from this object.
export const exerciseLibrary: Record<string, ExerciseData> = {
  'jumping-jacks': {
    name: 'Jumping Jacks',
    description: 'A full-body cardio exercise.',
    asset: { type: 'api', value: 'jumping jacks' },
  },
  'push-ups': {
    name: 'Push-ups',
    description: 'Builds upper body and core strength.',
    asset: { type: 'api', value: 'push-up fitness' },
  },
  'arm-circles': {
    name: 'Arm Circles',
    description: 'A warm-up to increase shoulder mobility.',
    asset: { type: 'api', value: 'arm circle exercise' },
  },
  'dynamic-chest-stretch': {
    name: 'Dynamic Chest Stretch',
    description: 'Swing arms to warm up the chest and shoulders.',
    asset: { type: 'api', value: 'chest stretch' },
  },
  'scapular-retractions': {
    name: 'Scapular Retractions',
    description: 'Squeeze shoulder blades to activate back muscles.',
    asset: { type: 'api', value: 'back exercise' },
  },
  squats: {
    name: 'Squats',
    description: 'Builds lower body strength.',
    asset: { type: 'api', value: 'squat workout' },
  },
  lunges: {
    name: 'Lunges',
    description: 'Targets quads, glutes, and hamstrings.',
    asset: { type: 'api', value: 'lunge workout' },
  },
  plank: {
    name: 'Plank',
    description: 'Develops core strength and stability.',
    asset: { type: 'api', value: 'plank exercise' },
  },
  crunches: {
    name: 'Crunches',
    description: 'An isolation exercise for the abdominal muscles.',
    asset: { type: 'api', value: 'crunches ab workout' },
  },
  burpees: {
    name: 'Burpees',
    description: 'A high-intensity, full-body exercise.',
    asset: { type: 'api', value: 'burpee exercise' },
  },
  rest: {
    name: 'Rest',
    description: 'Take a brief recovery period.',
    asset: { type: 'initials', value: 'R' },
  },
};
