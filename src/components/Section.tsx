// src/components/Section.tsx
"use client";

import React from 'react';
import { useColors } from '@/components/ColorProvider';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export default function Section({ children, id, className = "" }: SectionProps) {
  const colors = useColors();

  return (
    <section 
      id={id} 
      /* Clean, transparent sections inheriting the root text color and layout bounds */
      className={`py-16 md:py-24 px-6 max-w-6xl mx-auto w-full ${colors.text} ${className}`.trim()}
    >
      {children}
    </section>
  );
}