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
const nameToColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 50%, 70%)`;
  const bgColor = `hsl(${hash % 360}, 50%, 20%)`;
  return { color, bgColor };
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
      const { color, bgColor } = nameToColor(name);
      return (
        <div
          className={cn(
            "flex items-center justify-center font-bold text-4xl aspect-square w-full",
            className
          )}
          style={{ backgroundColor: bgColor, color: color }}
        >
          {finalAsset.value}
        </div>
      );
    
    // Note: 'gif' type is not used for now, but the structure is here for the future.
    case 'gif':
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
