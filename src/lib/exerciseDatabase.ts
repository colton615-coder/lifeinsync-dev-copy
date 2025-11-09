import { PlaceHolderImages } from './placeholder-images';

type ExerciseData = {
  name: string;
  description: string;
  gifUrl: string;
};

// Helper function to find an image URL or return a default
const findImage = (id: string): string => {
  const image = PlaceHolderImages.find(img => img.id === id);
  // Fallback to a generic rest image if nothing is found
  return image ? image.imageUrl : (PlaceHolderImages.find(img => img.id === 'exercise-rest')?.imageUrl || '');
};

// This library is the single source of truth for all exercises.
// The AI model will be instructed to only use the keys from this object.
export const exerciseLibrary: Record<string, ExerciseData> = {
  'jumping-jacks': {
    name: 'Jumping Jacks',
    description: 'A full-body cardio exercise.',
    gifUrl: findImage('exercise-jumping-jacks'),
  },
  'push-ups': {
    name: 'Push-ups',
    description: 'Builds upper body and core strength.',
    gifUrl: findImage('exercise-push-ups'),
  },
  'arm-circles': {
    name: 'Arm Circles',
    description: 'A warm-up to increase shoulder mobility.',
    gifUrl: findImage('exercise-arm-circles'),
  },
  'dynamic-chest-stretch': {
    name: 'Dynamic Chest Stretch',
    description: 'Swing arms to warm up the chest and shoulders.',
    gifUrl: findImage('exercise-dynamic-chest-stretch'),
  },
  'scapular-retractions': {
    name: 'Scapular Retractions',
    description: 'Squeeze shoulder blades to activate back muscles.',
    gifUrl: findImage('exercise-scapular-retractions'),
  },
  squats: {
    name: 'Squats',
    description: 'Builds lower body strength.',
    gifUrl: findImage('exercise-squats'),
  },
  lunges: {
    name: 'Lunges',
    description: 'Targets quads, glutes, and hamstrings.',
    gifUrl: findImage('exercise-lunges'),
  },
  plank: {
    name: 'Plank',
    description: 'Develops core strength and stability.',
    gifUrl: findImage('exercise-plank'),
  },
  crunches: {
    name: 'Crunches',
    description: 'An isolation exercise for the abdominal muscles.',
    gifUrl: findImage('exercise-crunches'),
  },
  burpees: {
    name: 'Burpees',
    description: 'A high-intensity, full-body exercise.',
    gifUrl: findImage('exercise-burpees'),
  },
  rest: {
    name: 'Rest',
    description: 'Take a brief recovery period.',
    gifUrl: findImage('exercise-rest'),
  },
};
