// src/sections/ContactSection.tsx
"use client";

import React, { useState } from 'react';
import Section from '@/components/Section';
import ContactFormModal from '@/components/ContactFormModal';
import TypewriterTitle from '@/components/TypewriterTitle';
import { useColors } from '@/components/ColorProvider';

export default function ContactSection() {
  const colors = useColors();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <Section id="contact">
      {/* Premium Inverted Focal Block
          FIX: Removed conflicting `px-6` that was fighting `p-10 md:p-24`.
          Replaced with `p-8 sm:p-12 md:p-20` — a clean mobile-first scale
          that gives text room to breathe at every breakpoint.             */}
      <div
        className={`relative z-10 rounded-3xl p-8 sm:p-12 md:p-20 text-center ${colors.invertedCardBg} border ${colors.invertedBorder} shadow-2xl overflow-hidden`}
      >
        {/* Subtle radial inner glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-zinc-800/40 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">

          {/* Status Tracker Tag */}
          <span className="text-[11px] font-semibold tracking-[0.25em] text-zinc-400 uppercase mb-5">
            Get In Touch
          </span>

          {/* Editorial Header
              FIX: Removed `max-w-2xl` from h2 (it fought the parent's own
              max-w-2xl and caused asymmetric clipping on narrow screens).
              Font scale tightened on mobile: text-3xl → sm:text-4xl → md:text-5xl
              so long typewriter strings never overflow the card edge.        */}
          <h2
            className={`w-full text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-[1.1] mb-6 ${colors.invertedText}`}
          >
            <TypewriterTitle text="Let's collaborate on your " />
            <span className="text-zinc-500 font-bold font-serif italic pr-1 inline-block">
              <TypewriterTitle text="next" delay={1.0} />
            </span>
            <TypewriterTitle text=" build." delay={1.2} />
          </h2>

          {/* Body copy */}
          <p
            className={`${colors.invertedTextMuted} w-full mx-auto mb-10 text-sm sm:text-base md:text-lg leading-relaxed font-normal`}
          >
            Looking for an independent developer to own architecture, build
            rapid systems, or consult on a Next.js frontend? Drop me a line.
          </p>

          {/* Primary CTA */}
          <button
            onClick={() => setIsFormOpen(true)}
            className={`group flex items-center justify-center gap-2 w-full sm:w-auto px-10 py-4 text-sm font-semibold rounded-xl transition-all duration-300 active:scale-[0.98] shadow-md ${colors.invertedButton}`}
          >
            <span>Say Hello</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </button>

          {/* Social anchors */}
          <div className="flex items-center justify-center gap-4 mt-12 pt-8 border-t border-zinc-800/60 w-full">
            <a
              href="https://linkedin.com/in/jason-adrian-platino-5486b7233/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs font-medium tracking-wider text-zinc-400 hover:text-stone-50 transition-colors duration-300 px-3 py-2 rounded-lg border border-transparent hover:border-zinc-800 bg-zinc-900/40"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span>LinkedIn</span>
            </a>

            <a
              href="https://github.com/Yamiteeee"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs font-medium tracking-wider text-zinc-400 hover:text-stone-50 transition-colors duration-300 px-3 py-2 rounded-lg border border-transparent hover:border-zinc-800 bg-zinc-900/40"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              </svg>
              <span>GitHub</span>
            </a>
          </div>

        </div>
      </div>

      <ContactFormModal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </Section>
  );
}