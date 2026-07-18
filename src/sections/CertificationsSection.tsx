"use client";

import React, { useState, useEffect } from 'react';
import Section from '@/components/Section';
import { certificationsData, type Certification } from '@/data/certifications';
import { useColors } from '@/components/ColorProvider';

// ─── Protected Lightbox Modal Component ───────────────────────────────────────
function CertLightbox({ cert, onClose }: { cert: Certification; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Dynamically targets the clean, cropped image alternative
  const displayImage = cert.imagePath.replace('.pdf', '.jpg');

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-zinc-950/95 p-4 sm:p-8 backdrop-blur-xs"
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 py-4 z-30 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h3 className="font-bold text-base text-stone-100 tracking-tight">{cert.title}</h3>
          <p className="text-[11px] text-zinc-500 mt-0.5">
            Verified Index Preview · esc to close
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Media Stage */}
      <div
        className="relative w-full max-w-5xl flex items-center justify-center mt-16 mb-6 px-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className="w-full h-auto max-h-[65vh] aspect-[4/3] md:h-[65vh] md:w-auto rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl relative z-20 flex items-center justify-center"
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Invisible pointer barrier to block context clicks and dragging */}
          <div className="absolute inset-0 bg-transparent z-30 pointer-events-auto select-none" />

          {/* Clean image container ensuring no layout overflow or internal scrolls */}
          <div className="w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={displayImage} 
              alt={cert.title}
              className="w-full h-full object-contain bg-zinc-950 select-none rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Card Component ──────────────────────────────────────────────────────
function CertificationCard({ cert, onOpen }: { cert: Certification; onOpen: () => void }) {
  const displayImage = cert.imagePath.replace('.pdf', '.jpg');

  return (
    <div 
      onClick={onOpen}
      className="snap-start shrink-0 w-[290px] sm:w-[350px] flex flex-col rounded-2xl overflow-hidden border border-zinc-200/80 bg-white hover:border-zinc-400 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 ease-out hover:-translate-y-1.5 active:scale-[0.99] cursor-pointer group"
      onContextMenu={(e) => e.preventDefault()}
      style={{ willChange: 'transform, box-shadow' }}
    >
      <div className="relative w-full aspect-[4/3] bg-zinc-50 border-b border-zinc-100 overflow-hidden select-none">
        
        {/* Unified Image Viewport for both Desktop and Mobile */}
        <div className="w-full h-full absolute inset-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={displayImage} 
            alt={cert.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.02]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
        </div>
        
        <div className="absolute inset-0 bg-black/0 group-hover:bg-zinc-950/10 z-20 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 bg-zinc-900/90 text-white font-mono font-bold text-[10px] uppercase tracking-widest px-3 py-2 rounded-lg shadow-md z-20 pointer-events-none">
            Expand Review Index
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 justify-between gap-4 bg-white transition-colors duration-300 group-hover:bg-zinc-50/30 relative z-10">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-bold truncate">
              {cert.issuer}
            </span>
            <span className="text-[10px] font-mono text-zinc-400 font-semibold shrink-0">
              {cert.date}
            </span>
          </div>

          <h3 className="text-sm font-bold text-zinc-900 leading-snug tracking-tight group-hover:text-amber-600 transition-colors duration-300 line-clamp-2">
            {cert.title}
          </h3>

          {cert.credentialId && (
            <p className="text-[10px] font-mono text-zinc-500 bg-zinc-50 border border-zinc-100 rounded px-2 py-0.5 w-max">
              ID: <span className="text-zinc-700 font-semibold">{cert.credentialId}</span>
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-1.5">
            {cert.skills.map((skill, i) => (
              <span
                key={i}
                className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200/60 font-medium transition-all duration-300 group-hover:bg-white group-hover:border-zinc-300"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-zinc-100 pt-3">
            <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 font-medium transition-colors duration-300 group-hover:text-zinc-500">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Click to enlarge
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section Module Export Engine ───────────────────────────────────────
export default function CertificationsSection() {
  const colors = useColors();
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  return (
    <Section id="certifications">
      <div className="relative z-10 mb-16 px-4">
        <span className={`inline-block text-[11px] font-mono font-bold tracking-[0.25em] ${colors.textMuted} uppercase mb-4`}>
          Verified Expertise
        </span>
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.15] text-zinc-900 max-w-3xl">
            Professional <span className="font-serif italic font-bold text-zinc-500">Credentials</span> & Certs.
          </h2>
          <p className="text-zinc-500 max-w-sm text-sm leading-relaxed lg:text-right font-normal shrink-0">
            Swipe or scroll horizontally to browse valid industry certifications and micro-credentials.
            Click any deployment card to browse documentation and interface snapshots.
          </p>
        </div>
      </div>

      <div className="relative w-full z-10">
        <div 
          className="flex gap-6 overflow-x-auto pb-8 pt-2 px-4 scrollbar-none snap-x snap-mandatory scroll-smooth will-change-scroll"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {certificationsData.map((cert) => (
            <CertificationCard 
              key={cert.id} 
              cert={cert} 
              onOpen={() => setActiveCert(cert)} 
            />
          ))}
          <div className="shrink-0 w-2" />
        </div>
      </div>

      {activeCert && (
        <CertLightbox 
          cert={activeCert} 
          onClose={() => setActiveCert(null)} 
        />
      )}
    </Section>
  );
}