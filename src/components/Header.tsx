'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useSidebarStore } from '@/lib/stores/useSidebarStore';
import { Bot, Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

/**
 * Header Component
 * 
 * This is the persistent header for the application.
 * It should only be rendered once in the app/(app)/layout.tsx.
 * 
 * Features:
 * - Hamburger menu button that toggles the sidebar (mobile only)
 * - App logo and title
 * - Responsive spacing
 */
export function Header() {
  const { toggle } = useSidebarStore();

  return (
    <header className="flex h-14 items-center justify-between border-b border-border px-4 md:hidden">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={toggle}
        className="shadow-neumorphic-outset active:shadow-neumorphic-inset"
        aria-label="Toggle sidebar menu"
      >
        <Menu className="h-6 w-6 text-foreground" />
      </Button>
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/20 text-primary shadow-neumorphic-outset">
          <Bot className="h-5 w-5 text-accent" />
        </div>
        <h1 className="text-lg font-bold font-headline text-accent">LiFE-iN-SYNC</h1>
      </div>
      <ThemeToggle />
    </header>
  );
}
