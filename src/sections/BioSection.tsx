// src/sections/BioSection.tsx
"use client";

import React from 'react';
import Section from '@/components/Section';
import TypewriterTitle from '@/components/TypewriterTitle'; // Integrated typing engine
import { useColors } from '@/components/ColorProvider';
import { bioData } from '@/data/bio';

export default function BioSection() {
  const colors = useColors();

  return (
    <Section id="about">
      <div className="relative z-10 flex flex-col gap-12 sm:gap-16 px-4">
        
        {/* =========================================================================
            STAGE 1: IDENTITY HEADER (Profile & Title Centered on Mobile)
            ========================================================================= */}
        {/* Changed items-start to items-center globally so image centers on mobile */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-6 pb-4 border-b border-zinc-200/40">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-zinc-200/60 shadow-sm bg-zinc-100 shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={bioData.avatarSrc} 
              alt="Jason Platino"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div>
            <span className={`text-[10px] sm:text-xs font-bold tracking-[0.2em] ${colors.textMuted} uppercase block mb-1`}>
              {bioData.sectionIndex}
            </span>
            <h1 className={`text-2xl sm:text-4xl font-black tracking-tight ${colors.text}`}>
              <TypewriterTitle text="Jason Platino" />
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 font-medium mt-1">
              Full Stack Web & Software Application Engineer
            </p>
          </div>
        </div>

        {/* =========================================================================
            STAGE 2: VALUE PROP & COMPETENCY (Bio Narrative & Technical Stack Grid)
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Block: Narrative Strategy */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-[1.15] mb-6 ${colors.text}`}>
              {bioData.headline}
            </h2>
            
            <div className={`${colors.textMuted} space-y-6 text-sm sm:text-base leading-relaxed font-normal`}>
              {bioData.paragraphs.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Right Block: Capabilities Core Matrix Card */}
          <div className="lg:col-span-5 w-full">
            <div className={`p-6 md:p-8 rounded-3xl ${colors.cardBg} border ${colors.border} shadow-sm space-y-6`}>
              <div>
                <h3 className={`text-sm font-bold tracking-wider uppercase ${colors.text} mb-1`}>
                  Technical Core
                </h3>
                <p className={`text-xs ${colors.textMuted}`}>
                  Tools and architecture systems I deploy daily.
                </p>
              </div>

              <div className="space-y-5">
                {bioData.expertise.map((group, index) => (
                  <div key={index} className="space-y-2.5">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      {group.category}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map((skill, sIndex) => (
                        <span 
                          key={sIndex} 
                          className={`text-xs px-2.5 py-1.5 rounded-lg border ${colors.border} bg-stone-50 text-zinc-800 font-medium transition-colors duration-200 hover:bg-zinc-900 hover:text-stone-50 hover:border-zinc-900 select-none`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* =========================================================================
            STAGE 3: THE PROOF ENGINE (Massive CV Display Canvas)
            ========================================================================= */}
        <div className="flex flex-col gap-4 pt-4 border-t border-zinc-200/40">
          <div className="flex justify-between items-center">
            <span className={`text-[10px] sm:text-xs font-bold tracking-[0.2em] ${colors.textMuted} uppercase`}>
              Curriculum Document Canvas
            </span>
            
            <a 
              href={bioData.cvSrc}
              download={bioData.cvDownloadName}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-800 hover:text-white border border-zinc-200 hover:border-zinc-950 bg-white hover:bg-zinc-950 transition-all duration-300 rounded-xl shadow-sm active:scale-[0.98]"
            >
              <span>Download CV</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </a>
          </div>

          <div className={`w-full h-[500px] sm:h-[650px] lg:h-[750px] rounded-3xl overflow-hidden border ${colors.border} bg-zinc-50 shadow-md`}>
            <iframe 
              src={`${bioData.cvSrc}#toolbar=0&navpanes=0&scrollbar=0`}
              title="Jason Platino Curriculum Vitae Preview"
              className="w-full h-full border-none select-none"
            />
          </div>
        </div>

      </div>
    </Section>
  );
}