"use client";

import React, { useState, useEffect } from 'react'; // Added useState & useEffect
import Section from '@/components/Section';
import TypewriterTitle from '@/components/TypewriterTitle';
import { useColors } from '@/components/ColorProvider';
import { bioData } from '@/data/bio';

// ─── Stat chip (Streamlined, Hero-Unified Fonts) ───────────────────────────
function StatChip({ value, label, textClass, mutedClass }: { value: string; label: string; textClass: string; mutedClass: string }) {
  return (
    <div className="flex flex-col items-center sm:items-start gap-1 py-1 px-2 select-none">
      <span className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter ${textClass} leading-none`}>
        {value}
      </span>
      <span className={`text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.18em] ${mutedClass} block truncate max-w-full`}>
        {label}
      </span>
    </div>
  );
}

// ─── Category classy subtle accents ───────────────────────────────────────────
const ACCENT_COLORS = [
  'border-l-zinc-900',
  'border-l-zinc-700',
  'border-l-zinc-500',
  'border-l-zinc-400',
  'border-l-zinc-300',
];

export default function BioSection() {
  const colors = useColors();
  
  // Guard client-side mount to prevent Google Viewer race conditions
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Delay mounting slightly to allow Next.js hydration to finish smoothly
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Section id="about">
      <div className="relative z-10 flex flex-col gap-10 md:gap-14 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">

        {/* =====================================================================
            STAGE 1 — IDENTITY HEADER
            ===================================================================== */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 sm:gap-8 md:gap-10">

          {/* Premium Scaled Avatar Container */}
          <div className="relative shrink-0 select-none">
            <div className={`w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-white shadow-md ring-4 ring-zinc-100/80 ${colors.cardBg || 'bg-zinc-50'}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bioData.avatarSrc}
                alt="Jason Platino"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="eager"
              />
            </div>
            {/* Open-to-work pulse dot */}
            <span
              aria-label="Open to work"
              className="absolute bottom-1 right-1 w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 rounded-full bg-emerald-500 border-2 border-white shadow-sm"
            >
              <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
            </span>
          </div>

          {/* Name + title with matching layout alignments */}
          <div className="flex flex-col justify-center sm:pt-1 max-w-2xl">
            <span className={`text-[9px] sm:text-[10px] font-medium tracking-[0.18em] ${colors.textMuted} uppercase block mb-1.5`}>
              {bioData.sectionIndex}
            </span>
            <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter ${colors.text} leading-[1.15]`}>
              <TypewriterTitle text="Jason Platino" />
            </h1>
            <p className={`text-sm sm:text-base md:text-lg ${colors.textMuted} font-normal mt-2 max-w-xl leading-snug`}>
              Full Stack Web &amp; Software Application Engineer
            </p>
            <div className="mt-3.5 flex justify-center sm:justify-start">
              <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] font-medium tracking-[0.18em] text-emerald-800 bg-emerald-50/60 border border-emerald-200/60 px-3 py-1 rounded-full shadow-xs uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                Open to work
              </span>
            </div>
          </div>
        </div>

        {/* =====================================================================
            STAGE 2 — PROOF STATS BAR (Unified Hero Layout)
            ==================================================================== */}
        <div className={`grid grid-cols-3 gap-2 sm:gap-4 py-6 border-y ${colors.border || 'border-zinc-100'} text-center sm:text-left`}>
          {bioData.stats.map((stat, i) => (
            <StatChip 
              key={i} 
              value={stat.value} 
              label={stat.label} 
              textClass={colors.text} 
              mutedClass={colors.textMuted} 
            />
          ))}
        </div>

        {/* =====================================================================
            STAGE 3 — NARRATIVE + SKILLS CARD
            ==================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left: narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Editorial Typographic Subheader mirroring the Hero font blend */}
            <h2 className={`text-xl sm:text-2xl lg:text-3xl font-bold font-serif italic tracking-tighter leading-[1.2] mb-4 sm:mb-5 ${colors.text}`}>
              Engineering systems with technical intent.
            </h2>
            <div className={`${colors.textMuted} space-y-4 sm:space-y-5 text-base leading-relaxed antialiased font-normal`}>
              {bioData.paragraphs.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Right: skills card */}
          <div className="lg:col-span-5 w-full">
            <div className={`rounded-xl ${colors.cardBg} border ${colors.border} shadow-xs overflow-hidden`}>

              {/* Card header */}
              <div className={`px-5 py-4 border-b ${colors.border} flex items-center justify-between bg-zinc-50/50`}>
                <div>
                  <h3 className={`text-xs font-medium tracking-[0.18em] uppercase ${colors.text}`}>
                    Technical Core
                  </h3>
                  <p className={`text-[11px] mt-0.5 ${colors.textMuted}`}>
                    Stack I deploy daily
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-1 opacity-20">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <span key={i} className="w-1 h-1 rounded-full bg-zinc-400 block" />
                  ))}
                </div>
              </div>

              {/* Skill groups */}
              <div className="p-5 space-y-4 sm:space-y-5">
                {bioData.expertise.map((group, index) => (
                  <div
                    key={index}
                    className={`pl-3 border-l-2 ${ACCENT_COLORS[index % ACCENT_COLORS.length]} space-y-2`}
                  >
                    <h4 className={`text-[9px] font-medium uppercase tracking-[0.18em] ${colors.textMuted}`}>
                      {group.category}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map((skill, sIndex) => (
                        <span
                          key={sIndex}
                          className={`text-[11px] px-2.5 py-1 rounded-md border ${colors.border} bg-white ${colors.text} font-medium transition-all duration-150 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 select-none cursor-default shadow-2xs`}
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

        {/* =====================================================================
            STAGE 4 — CV CANVAS
            ===================================================================== */}
        <div className={`flex flex-col gap-4 sm:gap-5 pt-6 border-t ${colors.border || 'border-zinc-100'}`}>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className={`text-[9px] sm:text-[10px] font-medium tracking-[0.18em] ${colors.textMuted} uppercase`}>
                Full résumé
              </p>
              <p className={`text-[11px] ${colors.textMuted} opacity-80 mt-0.5`}>
                Scroll to read · or download a copy
              </p>
            </div>

            <a
              href={bioData.cvSrc}
              download={bioData.cvDownloadName}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-white bg-zinc-900 hover:bg-zinc-800 transition-colors duration-200 rounded-lg shadow-xs active:scale-[0.99]"
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              <span>Download CV</span>
            </a>
          </div>

          {/* SINGLE RESPONSIVE CANVAS */}
          <div
            className={`relative w-full rounded-xl overflow-hidden border ${colors.border} shadow-xs bg-zinc-100`}
            style={{ contain: 'layout style', height: 'clamp(400px, 55vh, 720px)' }}
          >
            {isMounted ? (
              <iframe
                src={`https://docs.google.com/gview?url=https://jsonporfolio.fun${bioData.cvSrc}&embedded=true`}
                title="Jason Platino — Curriculum Vitae"
                className="w-full h-full border-none"
              />
            ) : (
              // Soothing minimal loading state while the document mounts
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-50/50">
                <span className={`text-xs uppercase tracking-[0.18em] ${colors.textMuted} animate-pulse`}>
                  Loading PDF Preview...
                </span>
              </div>
            )}
          </div>

        </div>

      </div>
    </Section>
  );
}