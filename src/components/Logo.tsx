// src/components/Logo.tsx
"use client";

import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export default function Logo({ className = "", size = 32 }: LogoProps) {
  return (
    <div className={`group inline-flex items-center gap-3 font-sans select-none cursor-pointer ${className}`}>
      
      {/* Injecting optimized inline CSS for the fine mechanical animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes subtleSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes textShimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-ring-spin {
          animation: subtleSpin 40s linear infinite;
        }
        .group:hover .animate-shimmer-text {
          animation: textShimmer 1.8s infinite linear;
          background: linear-gradient(to right, currentColor 20%, #a1a1aa 40%, currentColor 60%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}} />

      {/* Icon Frame Block */}
      <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transition-all duration-500 group-hover:scale-105"
        >
          {/* Outer Rotating Architectural Track */}
          <circle 
            cx="50" 
            cy="50" 
            r="44" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            className="text-zinc-200 dark:text-zinc-800/80 animate-ring-spin"
            strokeDasharray="6 6"
          />

          {/* Precision Laser Engineering Indicators (Crosshairs) */}
          <path d="M50 4v6M50 90v6M4 50h6M90 50h6" stroke="currentColor" strokeWidth="2" className="text-zinc-300 dark:text-zinc-700/60" strokeLinecap="round" />
          
          {/* Core Geometric Paths (With reactive group hover offsets) */}
          <path
            d="M38 32H58V54C58 63 50 68 42 68"
            stroke="currentColor"
            strokeWidth="7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-zinc-900 dark:text-stone-50 transition-all duration-300 group-hover:stroke-emerald-500 dark:group-hover:stroke-emerald-400"
          />
          <path
            d="M58 32H70C76 32 80 36 80 42C80 48 76 52 70 52H58"
            stroke="currentColor"
            strokeWidth="7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-zinc-400/80 dark:text-zinc-500 transition-all duration-300 group-hover:translate-x-0.5"
          />
        </svg>

        {/* Floating Center Radar Dot */}
        <div className="absolute w-1 h-1 rounded-full bg-zinc-900 dark:bg-stone-50 group-hover:bg-emerald-500 dark:group-hover:bg-emerald-400 transition-colors duration-300" />
      </div>

      {/* Editorial Text Layer Component with Hover Laser Shimmer */}
      <span className="animate-shimmer-text text-sm font-black tracking-[0.3em] uppercase text-zinc-900 dark:text-stone-100 transition-colors duration-300">
        J.Platino
      </span>
    </div>
  );
}