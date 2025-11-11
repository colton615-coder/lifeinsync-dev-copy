'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { PinButton } from './PinButton';

interface PinInputGridProps {
  value: string[];
  onChange: (index: number, value: string) => void;
  onKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
}

export function PinInputGrid({ value, onChange, onKeyDown, inputRefs }: PinInputGridProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {value.map((digit, index) => (
        <Input
          key={index}
          ref={(el) => { inputRefs.current[index] = el }}
          type="password"
          maxLength={1}
          value={digit}
          onChange={(e) => onChange(index, e.target.value)}
          onKeyDown={(e) => onKeyDown(index, e)}
          className="w-14 h-16 text-center text-3xl font-bold shadow-neumorphic-inset"
        />
      ))}
    </div>
  );
}
