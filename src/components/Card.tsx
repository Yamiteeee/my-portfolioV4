// src/components/Card.tsx
"use client";

import React from 'react';
import { useColors } from '@/components/ColorProvider';

// 1. Added optional className string to CardProps type definition
interface CardProps {
  title: string;
  description: string;
  tags: string[];
  imageSrc: string;
  className?: string; 
}

export default function Card({ title, description, tags, imageSrc, className = "" }: CardProps) {
  const colors = useColors();

  return (
    // 2. Append the incoming className to the wrapper element along with your tokens
    <div className={`rounded-xl overflow-hidden border ${colors.border} ${colors.cardBg} ${className}`.trim()}>
      {imageSrc && (
        <div className="aspect-video w-full relative overflow-hidden bg-neutral-100">
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500" 
          />
        </div>
      )}
      <div className="p-6">
        <h3 className={`text-xl font-bold mb-2 ${colors.text}`}>{title}</h3>
        <p className={`text-sm mb-4 leading-relaxed ${colors.textMuted}`}>{description}</p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <span 
              key={idx} 
              className={`text-xs px-2.5 py-1 rounded font-medium border ${colors.border} ${colors.textMuted} bg-transparent`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}