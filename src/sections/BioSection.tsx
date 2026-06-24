// src/sections/BioSection.tsx
"use client";

import React from 'react';
import Section from '@/components/Section';
import TypewriterTitle from '@/components/TypewriterTitle';
import { useColors } from '@/components/ColorProvider';
import { bioData } from '@/data/bio';

// ─── Stat chip ────────────────────────────────────────────────────────────────
function StatChip({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center sm:items-start gap-0.5">
      <span className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 leading-none">
        {value}
      </span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
        {label}
      </span>
    </div>
  );
}

// ─── Category accent colors ───────────────────────────────────────────────────
const ACCENT_COLORS = [
  'border-l-indigo-400',
  'border-l-emerald-400',
  'border-l-amber-400',
  'border-l-rose-400',
  'border-l-sky-400',
];

export default function BioSection() {
  const colors = useColors();

  return (
    <Section id="about">
      <div className="relative z-10 flex flex-col gap-14 px-4">

        {/* =====================================================================
            STAGE 1 — IDENTITY HEADER
            ===================================================================== */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">

          {/* Avatar with status ring */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-white shadow-md ring-2 ring-indigo-200 bg-zinc-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bioData.avatarSrc}
                alt="Jason Platino"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
            {/* Open-to-work pulse dot */}
            <span
              aria-label="Open to work"
              className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-white shadow-sm"
            >
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
            </span>
          </div>

          {/* Name + title */}
          <div className="flex flex-col justify-center">
            <span className={`text-[10px] font-bold tracking-[0.22em] ${colors.textMuted} uppercase block mb-1`}>
              {bioData.sectionIndex}
            </span>
            <h1 className={`text-2xl sm:text-4xl font-black tracking-tight ${colors.text} leading-tight`}>
              <TypewriterTitle text="Jason Platino" />
            </h1>
            <p className="text-sm sm:text-base text-zinc-500 font-medium mt-1">
              Full Stack Web &amp; Software Application Engineer
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 self-center sm:self-start text-[10px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              Open to work
            </span>
          </div>
        </div>

        {/* =====================================================================
            STAGE 2 — PROOF STATS BAR (driven by bioData.stats)
            ===================================================================== */}
        <div className="grid grid-cols-3 gap-4 py-6 border-y border-zinc-100">
          {bioData.stats.map((stat, i) => (
            <StatChip key={i} value={stat.value} label={stat.label} />
          ))}
        </div>

        {/* =====================================================================
            STAGE 3 — NARRATIVE + SKILLS CARD
            ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Left: narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-[1.15] mb-5 ${colors.text}`}>
              {bioData.headline}
            </h2>
            <div className={`${colors.textMuted} space-y-5 text-sm sm:text-base leading-relaxed`}>
              {bioData.paragraphs.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Right: skills card */}
          <div className="lg:col-span-5 w-full">
            <div className={`rounded-2xl ${colors.cardBg} border ${colors.border} shadow-sm overflow-hidden`}>

              {/* Card header */}
              <div className={`px-6 py-4 border-b ${colors.border} flex items-center justify-between`}>
                <div>
                  <h3 className={`text-sm font-bold tracking-wide uppercase ${colors.text}`}>
                    Technical Core
                  </h3>
                  <p className={`text-xs mt-0.5 ${colors.textMuted}`}>
                    Stack I deploy daily
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-1 opacity-30">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <span key={i} className="w-1 h-1 rounded-full bg-zinc-400 block" />
                  ))}
                </div>
              </div>

              {/* Skill groups */}
              <div className="px-6 py-5 space-y-5">
                {bioData.expertise.map((group, index) => (
                  <div
                    key={index}
                    className={`pl-3 border-l-2 ${ACCENT_COLORS[index % ACCENT_COLORS.length]} space-y-2`}
                  >
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400">
                      {group.category}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {group.skills.map((skill, sIndex) => (
                        <span
                          key={sIndex}
                          className={`text-xs px-2.5 py-1 rounded-lg border ${colors.border} bg-white text-zinc-700 font-medium transition-colors duration-150 hover:bg-zinc-900 hover:text-stone-50 hover:border-zinc-900 select-none cursor-default`}
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
        <div className="flex flex-col gap-5 pt-6 border-t border-zinc-100">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className={`text-[10px] font-bold tracking-[0.22em] ${colors.textMuted} uppercase`}>
                Full résumé
              </p>
              <p className="text-xs text-zinc-400 mt-0.5">
                Scroll to read · or download a copy
              </p>
            </div>

            <a
              href={bioData.cvSrc}
              download={bioData.cvDownloadName}
              className="inline-flex items-center gap-2 self-start sm:self-auto px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-zinc-900 hover:bg-zinc-700 transition-colors duration-200 rounded-xl shadow-sm active:scale-[0.98]"
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              <span>Download CV</span>
            </a>
          </div>

          {/* SINGLE RESPONSIVE CANVAS: Works flawlessly on Mobile, Tablet, and Desktop */}
          <div
            className={`w-full rounded-2xl overflow-hidden border ${colors.border} shadow-sm bg-zinc-50`}
            style={{ contain: 'layout style', height: 'clamp(480px, 60vh, 780px)' }}
          >
            <iframe
              src={`https://docs.google.com/gview?url=https://jsonporfolio.fun${bioData.cvSrc}&embedded=true`}
              title="Jason Platino — Curriculum Vitae"
              className="w-full h-full border-none"
              loading="lazy"
            />
          </div>

        </div>

      </div>
    </Section>
  );
}