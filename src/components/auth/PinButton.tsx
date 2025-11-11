'use client';
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const PinButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      className={cn(
        'w-full shadow-neumorphic-outset active:shadow-neumorphic-inset focus:outline focus:outline-2 focus:outline-accent',
        className
      )}
      {...props}
    />
  );
});

PinButton.displayName = 'PinButton';

export { PinButton };
