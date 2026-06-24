// src/components/Button.tsx
"use client";

import React from 'react';
import { useColors } from '@/components/ColorProvider'; // Import your custom hook

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

export default function Button({ variant = 'primary', children, ...props }: ButtonProps) {
  const colors = useColors(); // Grab your central color values

  const baseStyles = "px-6 py-2.5 rounded-lg font-medium transition-all duration-300 transform active:scale-95 text-sm md:text-base shadow-sm";
  
  // Refactored to map strictly to your black, white, and neutral color scheme
  const variants = {
    primary: `${colors.buttonBg} hover:opacity-90 hover:shadow-lg`,
    secondary: `${colors.buttonSecondary} hover:bg-neutral-50 dark:hover:bg-neutral-900`
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]}`} 
      {...props}
    >
      {children}
    </button>
  );
}