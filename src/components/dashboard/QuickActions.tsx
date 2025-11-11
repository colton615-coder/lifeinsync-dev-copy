'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Sparkles, Dumbbell, Calendar } from 'lucide-react';

export function QuickActions() {
  return (
    <Card className="shadow-neumorphic-outset">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link href="/tasks">
            <Button variant="outline" className="w-full h-20 flex flex-col gap-2 shadow-neumorphic-outset hover:shadow-glow-blue hover:scale-105 transition-all duration-300 group">
              <PlusCircle size={20} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs">Add Task</span>
            </Button>
          </Link>
          
          <Link href="/ai-knox">
            <Button variant="outline" className="relative w-full h-20 flex flex-col gap-2 shadow-neumorphic-outset hover:shadow-glow-purple hover:scale-105 transition-all duration-300 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-gradient transition-opacity" />
              <Sparkles size={20} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs relative z-10">AI Knox</span>
            </Button>
          </Link>
          
          <Link href="/workouts">
            <Button variant="outline" className="w-full h-20 flex flex-col gap-2 shadow-neumorphic-outset hover:shadow-glow-orange hover:scale-105 transition-all duration-300 group">
              <Dumbbell size={20} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs">Workout</span>
            </Button>
          </Link>
          
          <Link href="/calendar">
            <Button variant="outline" className="w-full h-20 flex flex-col gap-2 shadow-neumorphic-outset hover:shadow-glow-green hover:scale-105 transition-all duration-300 group">
              <Calendar size={20} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs">Calendar</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
