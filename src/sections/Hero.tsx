// src/sections/Hero.tsx
"use client";

import React from 'react';
import { useColors } from '@/components/ColorProvider';

export default function Hero() {
  const colors = useColors();

  return (
    <section className={`relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden`}>
      
      {/* --- DESIGN SYSTEM GRID MESH BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.15] select-none">
        {/* Fine Architectural Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        
        {/* Soft Radial Vignette to fade the grid out gracefully at the edges */}
        <div className={`absolute inset-0 ${colors.bg} [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,transparent_0%,#000_100%)]`} />
      </div>

      {/* --- CENTRAL AMBIENT GLOW ORB --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-zinc-300/50 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse" />

      {/* --- HERO CONTENT CONTAINER --- */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Clean, Refined Pill Badge */}
        <span className={`inline-flex items-center gap-2 px-3 py-1.5 text-[10px] sm:text-xs font-bold tracking-[0.15em] ${colors.text} bg-white/60 backdrop-blur-md rounded-full uppercase mb-8 border ${colors.border} shadow-sm`}>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          Available for Freelance & Full-Time
        </span>
        
        {/* High-Contrast Bold Typography */}
        <h1 className={`text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6 max-w-3xl ${colors.text}`}>
          Crafting digital platforms with <span className="text-zinc-400">precision.</span>
        </h1>
        
        {/* Balanced Body Copy */}
        <p className={`${colors.textMuted} text-base sm:text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-normal px-4`}>
          I specialize in engineering clean, robust frontends using Next.js partnered with high-performance backend systems.
        </p>
        
        {/* Re-engineered Premium Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-6">
          <a 
            href="#projects" 
            className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold rounded-xl shadow-sm transition-all duration-300 transform active:scale-98 bg-zinc-900 text-stone-50 hover:bg-zinc-800 text-center"
          >
            View My Work
          </a>
          
          <a 
            href="#contact" 
            className={`w-full sm:w-auto px-8 py-3.5 text-sm font-semibold rounded-xl border transition-all duration-300 transform active:scale-98 bg-white/80 backdrop-blur-sm text-zinc-900 ${colors.border} hover:bg-stone-100 text-center shadow-sm`}
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}