'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PullToRefreshIndicatorProps {
  pullDistance: number;
  threshold: number;
  isRefreshing: boolean;
  isPulling: boolean;
  shouldReduceMotion: boolean | null;
}

export function PullToRefreshIndicator({
  pullDistance,
  threshold,
  isRefreshing,
  isPulling,
  shouldReduceMotion,
}: PullToRefreshIndicatorProps) {
  // Calculate opacity based on pull distance
  const opacity = Math.min(pullDistance / threshold, 1);
  
  // Calculate rotation for the spinner (0-360 degrees)
  const rotation = (pullDistance / threshold) * 360;
  
  // Show indicator if pulling or refreshing
  const isVisible = isPulling || isRefreshing;

  return (
    <motion.div
      className={cn(
        'fixed left-0 right-0 z-50 flex items-center justify-center',
        'pt-[env(safe-area-inset-top)]'
      )}
      style={{
        top: 0,
      }}
      initial={{ y: -60 }}
      animate={{
        y: isVisible ? 0 : -60,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.2,
        ease: 'easeOut',
      }}
    >
      <div
        className="mt-4 rounded-full bg-background/95 p-3 shadow-lg backdrop-blur-sm border border-border"
        style={{
          opacity: isRefreshing ? 1 : opacity,
        }}
      >
        {isRefreshing ? (
          <Loader2
            className="h-5 w-5 animate-spin text-primary"
            aria-label="Refreshing"
          />
        ) : (
          <motion.div
            animate={{
              rotate: shouldReduceMotion ? 0 : rotation,
            }}
            transition={{
              duration: 0,
            }}
          >
            <Loader2
              className="h-5 w-5 text-muted-foreground"
              aria-label="Pull to refresh"
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
