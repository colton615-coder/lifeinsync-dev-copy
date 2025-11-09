// This is the new "master schema" for a single exercise.
// It includes all the new fields required for the dual-mode (time/reps) system and instructions.
export type Exercise = {
  id: string; // e.g., 'push-ups'
  name: string;
  asset: ExerciseAsset;
  instructions: string; // e.g., "Keep your back straight and core engaged..."
  defaultType: 'time' | 'reps';
  defaultDuration?: number; // e.g., 60 (in seconds)
  defaultReps?: number;     // e.g., 10
  defaultSets?: number;     // e.g., 3
};


// The Asset schema remains the same.
export type ExerciseAsset = {
  type: 'gif' | 'api' | 'initials';
  value: string; // e.g., 'push-ups.gif' OR 'pushups exercise' OR 'PU'
};

// The library is now a Record of string to the new Exercise type.
// I have populated all the new fields for every existing exercise with sensible defaults.
export const exerciseLibrary: Record<string, Exercise> = {
  'jumping-jacks': {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    asset: { type: 'api', value: 'jumping jacks' },
    instructions: 'Stand with your feet together and your arms at your sides. In one motion, jump your feet out to the side and raise your arms above your head. Immediately reverse the motion to return to the starting position.',
    defaultType: 'time',
    defaultDuration: 45,
  },
  'push-ups': {
    id: 'push-ups',
    name: 'Push-ups',
    asset: { type: 'api', value: 'push-up fitness' },
    instructions: 'Start in a high plank position. Lower your body until your chest is just above the floor, keeping your back straight. Push back up to the starting position.',
    defaultType: 'reps',
    defaultReps: 10,
    defaultSets: 3,
  },
  'arm-circles': {
    id: 'arm-circles',
    name: 'Arm Circles',
    asset: { type: 'api', value: 'arm circle exercise' },
    instructions: 'Extend your arms straight out to your sides, parallel to the floor. Make small, controlled circles with your hands. Reverse direction halfway through.',
    defaultType: 'time',
    defaultDuration: 30,
  },
  'dynamic-chest-stretch': {
    id: 'dynamic-chest-stretch',
    name: 'Dynamic Chest Stretch',
    asset: { type: 'api', value: 'chest stretch' },
    instructions: 'Stand with your feet shoulder-width apart. Swing both arms open wide, feeling a stretch in your chest, then swing them closed, crossing them in front of your body.',
    defaultType: 'time',
    defaultDuration: 30,
  },
  'scapular-retractions': {
    id: 'scapular-retractions',
    name: 'Scapular Retractions',
    asset: { type: 'api', value: 'back exercise' },
    instructions: 'Stand or sit with a straight back. Without bending your arms, squeeze your shoulder blades together as if you are trying to hold a pencil between them. Hold for a moment, then release.',
    defaultType: 'reps',
    defaultReps: 15,
    defaultSets: 2,
  },
  squats: {
    id: 'squats',
    name: 'Squats',
    asset: { type: 'api', value: 'squat workout' },
    instructions: 'Stand with your feet shoulder-width apart. Lower your hips as if sitting back in a chair, keeping your chest up and back straight. Go as low as you comfortably can, then push through your heels to return to the start.',
    defaultType: 'reps',
    defaultReps: 12,
    defaultSets: 3,
  },
  lunges: {
    id: 'lunges',
    name: 'Lunges',
    asset: { type: 'api', value: 'lunge workout' },
    instructions: 'Step forward with one leg and lower your hips until both knees are bent at a 90-degree angle. Your front knee should be directly above your ankle. Push off your front foot to return to the starting position. Alternate legs.',
    defaultType: 'reps',
    defaultReps: 10, // Per leg
    defaultSets: 3,
  },
  plank: {
    id: 'plank',
    name: 'Plank',
    asset: { type: 'api', value: 'plank exercise' },
    instructions: 'Hold a push-up position, with your body forming a straight line from your head to your heels. Engage your core and glutes. Hold this position without letting your hips sag.',
    defaultType: 'time',
    defaultDuration: 60,
  },
  crunches: {
    id: 'crunches',
    name: 'Crunches',
    asset: { type: 'api', value: 'crunches ab workout' },
    instructions: 'Lie on your back with your knees bent and feet flat on the floor. Place your hands behind your head. Lift your head and shoulders off the floor, engaging your abs. Lower back down with control.',
    defaultType: 'reps',
    defaultReps: 20,
    defaultSets: 3,
  },
  burpees: {
    id: 'burpees',
    name: 'Burpees',
    asset: { type: 'api', value: 'burpee exercise' },
    instructions: 'Start standing, then drop into a squat and place your hands on the floor. Kick your feet back into a plank position, perform a push-up, then jump your feet back to the squat position. Explode up into a jump, clapping your hands overhead.',
    defaultType: 'reps',
    defaultReps: 10,
    defaultSets: 3,
  },
  rest: {
    id: 'rest',
    name: 'Rest',
    asset: { type: 'initials', value: 'R' },
    instructions: 'Breathe and prepare for the next exercise. Take this time to recover, sip some water if needed, and focus on your form for the upcoming set.',
    defaultType: 'time',
    defaultDuration: 60,
  },
};
