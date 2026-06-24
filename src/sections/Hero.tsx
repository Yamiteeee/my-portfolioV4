// src/sections/Hero.tsx
"use client";

import React from 'react';
import { useColors } from '@/components/ColorProvider';
import TypewriterTitle from '@/components/TypewriterTitle'; // Import typing system

export default function Hero() {
  const colors = useColors();

  return (
    <section className="relative min-h-[75vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden select-none z-10">
      
      {/* --- MAIN HERO CONTENT CONTAINER --- */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Status Badge with Active Pulsing Marker */}
        <div className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 text-[11px] font-medium tracking-[0.18em] ${colors.text} bg-white/75 backdrop-blur-md rounded-full uppercase mb-8 border ${colors.border} shadow-sm transition-all duration-300 hover:bg-white`}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          Available for Remote Work & Freelance Projects
        </div>
        
        {/* Editorial Typographic Header with Staggered Typewriter Sequences */}
        <h1 className={`text-4xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-[1.02] mb-6 max-w-3xl ${colors.text}`}>
          <TypewriterTitle text="Architecting robust Web Applications & " />
          <span className="text-zinc-400 font-bold font-serif italic pr-1 inline-block">
            {/* Starts typing right as the main sentence segment reaches completion */}
            <TypewriterTitle text="scalable" delay={1.1} />
          </span>
          <TypewriterTitle text=" software systems." delay={1.4} />
        </h1>
        
        {/* Professional Human Copy */}
        <p className={`${colors.textMuted} text-base sm:text-lg md:text-xl max-w-2xl mb-12 leading-relaxed font-normal px-4`}>
          Independent Full-Stack Engineer specializing in high-performance Next.js architectures, scalable data workflows, and polished interactive frontends.
        </p>
        
        {/* Premium Core Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-6">
          
          {/* Primary Button with Interactive Sliding Arrow */}
          <a 
            href="#projects" 
            className={`group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 text-sm font-semibold rounded-xl transition-all duration-300 ${colors.buttonBg} shadow-md active:scale-[0.98]`}
          >
            <span>Explore Systems</span>
            <svg 
              className="w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          
          {/* Secondary Button with Clean Document / Contact Icon */}
          <a 
            href="#contact" 
            className={`group flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 text-sm font-semibold rounded-xl border transition-all duration-300 ${colors.buttonSecondary} ${colors.border} shadow-sm active:scale-[0.98]`}
          >
            <svg 
              className="w-4 h-4 text-zinc-500 transition-colors duration-300 group-hover:text-zinc-900" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor" 
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Get In Touch</span>
          </a>
        </div>
      </div>
    </section>
  );
}