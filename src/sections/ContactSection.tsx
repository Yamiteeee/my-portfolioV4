// src/sections/ContactSection.tsx
"use client";

import React from 'react';
import Section from '@/components/Section';
import { useColors } from '@/components/ColorProvider';

export default function ContactSection() {
  const colors = useColors();

  return (
    <Section id="contact">
      {/* Premium Inverted Focal Block */}
      <div 
        className={`relative z-10 rounded-3xl p-10 md:p-20 text-center ${colors.invertedCardBg} border ${colors.invertedBorder} shadow-2xl overflow-hidden px-6`}
      >
        {/* Subtle radial inner glow to break up the flat dark card box */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-800/30 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-zinc-400 uppercase mb-4">
            Get In Touch
          </span>
          
          <h2 className={`text-3xl md:text-5xl font-black tracking-tight mb-4 ${colors.invertedText}`}>
            Let’s collaborate on your next build.
          </h2>
          
          <p className={`${colors.invertedTextMuted} max-w-lg mx-auto mb-10 text-sm md:text-base leading-relaxed`}>
            Looking for a core developer, have an innovative project layout to shape up, or just want to network? My inbox is always open.
          </p>
          
          {/* Inline Re-engineered Premium Button */}
          <a 
            href="mailto:your.email@example.com" 
            className={`w-full sm:w-auto inline-block px-10 py-4 text-sm font-bold rounded-xl transition-all duration-300 transform active:scale-98 text-center shadow-md ${colors.invertedButton}`}
          >
            Say Hello
          </a>
        </div>
      </div>
    </Section>
  );
}