'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { ExerciseAsset } from '@/lib/exerciseDatabase';

interface ExerciseImageProps {
  asset: ExerciseAsset;
  name: string;
  className?: string;
  alt: string;
}

// Helper to generate a consistent color from a string
const nameToHsl = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = hash % 360;
  return `hsl(${h}, 30%, 25%)`;
};


export function ExerciseImage({ asset, name, className, alt }: ExerciseImageProps) {
  const [currentAsset, setCurrentAsset] = useState(asset);
  const [hasApiError, setHasApiError] = useState(false);

  // Fallback to initials if API fails
  const finalAsset = useMemo(() => {
    if (currentAsset.type === 'api' && hasApiError) {
      return {
        type: 'initials',
        value: name.split(' ').map(word => word[0]).join('').toUpperCase() || 'EX',
      } as ExerciseAsset;
    }
    return currentAsset;
  }, [currentAsset, hasApiError, name]);

  const handleError = () => {
    if (finalAsset.type === 'api') {
      setHasApiError(true);
    }
  };

  switch (finalAsset.type) {
    case 'api':
      return (
        <Image
          src={`https://source.unsplash.com/random/600x600/?${encodeURIComponent(finalAsset.value)}`}
          alt={alt}
          width={600}
          height={600}
          className={cn("object-cover aspect-square bg-muted", className)}
          onError={handleError}
          unoptimized // Good for dynamic sources to avoid build-time optimization
          data-ai-hint={finalAsset.value}
        />
      );
    
    case 'initials':
        const backgroundColor = nameToHsl(name);
        const gradient = `linear-gradient(145deg, ${backgroundColor}, hsl(${parseInt(backgroundColor.slice(4, 7)) + 20}, 35%, 15%))`;
      return (
        <div
          className={cn(
            "flex items-center justify-center font-headline font-bold text-6xl text-white/80 aspect-square w-full text-shadow-lg",
            className
          )}
          style={{ background: gradient }}
        >
          {finalAsset.value}
        </div>
      );
    
    case 'gif': // This case now points to a local placeholder if needed
    default:
       // Fallback to API if gif is specified but fails (or isn't implemented)
      return (
         <Image
          src={`https://source.unsplash.com/random/600x600/?${encodeURIComponent(name)}`}
          alt={alt}
          width={600}
          height={600}
          className={cn("object-cover aspect-square bg-muted", className)}
          onError={handleError}
          unoptimized
          data-ai-hint={name}
        />
      );
  }
}
