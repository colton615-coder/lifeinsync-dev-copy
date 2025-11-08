'use client';
import { useState, useEffect } from 'react';
import type { WorkoutPlan } from '@/ai/flows/workout-generator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { PauseCircle, PlayCircle, SkipForward, XCircle } from 'lucide-react';

interface ActiveWorkoutProps {
  workout: WorkoutPlan;
  onFinish: () => void;
}

export function ActiveWorkout({ workout, onFinish }: ActiveWorkoutProps) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(workout.exercises[0].duration);
  const [isPaused, setIsPaused] = useState(false);

  const currentExercise = workout.exercises[currentExerciseIndex];
  const nextExercise = workout.exercises[currentExerciseIndex + 1];

  useEffect(() => {
    if (isPaused) return;

    if (timeLeft <= 0) {
      if (currentExerciseIndex < workout.exercises.length - 1) {
        setCurrentExerciseIndex(prev => prev + 1);
        setTimeLeft(workout.exercises[currentExerciseIndex + 1].duration);
      } else {
        onFinish();
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isPaused, currentExerciseIndex, workout.exercises, onFinish]);

  const handleSkip = () => {
    if (currentExerciseIndex < workout.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setTimeLeft(workout.exercises[currentExerciseIndex + 1].duration);
    } else {
      onFinish();
    }
  };

  const totalWorkoutDuration = workout.exercises.reduce((acc, ex) => acc + ex.duration, 0);
  const timeElapsed = workout.exercises.slice(0, currentExerciseIndex).reduce((acc, ex) => acc + ex.duration, 0) + (currentExercise.duration - timeLeft);
  const workoutProgress = (timeElapsed / totalWorkoutDuration) * 100;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="w-full max-w-md">
        <Progress value={workoutProgress} indicatorClassName="bg-accent" />
      </div>
      <Card className="w-full max-w-md shadow-neumorphic-outset">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-accent">ONGOING WORKOUT</CardTitle>
          <CardDescription>{workout.name}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-6 text-center">
          <div className="flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">CURRENT EXERCISE</p>
              <h2 className="text-3xl font-bold">{currentExercise.name}</h2>
          </div>
          
          <div className="font-mono text-8xl font-bold text-foreground">
            {timeLeft}
          </div>
          
          <div className="h-10">
            {nextExercise && (
              <p className="text-muted-foreground">Next up: {nextExercise.name}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button onClick={() => setIsPaused(!isPaused)} size="lg" className="shadow-neumorphic-outset active:shadow-neumorphic-inset w-32">
            {isPaused ? <PlayCircle /> : <PauseCircle />}
            <span className="ml-2">{isPaused ? 'Resume' : 'Pause'}</span>
          </Button>
          <Button onClick={handleSkip} size="lg" variant="outline" className="shadow-neumorphic-outset active:shadow-neumorphic-inset w-32">
            <SkipForward />
            <span className="ml-2">Skip</span>
          </Button>
        </CardFooter>
      </Card>
      <Button onClick={onFinish} variant="ghost" className="text-muted-foreground hover:text-destructive">
        <XCircle className="mr-2 h-4 w-4"/>
        End Workout
      </Button>
    </div>
  );
}
