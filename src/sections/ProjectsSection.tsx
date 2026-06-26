"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Section from '@/components/Section';
import TypewriterTitle from '@/components/TypewriterTitle';
import { projectsData, type Project } from '@/data/projects';
import { useColors } from '@/components/ColorProvider';

// ─── Status badge ─────────────────────────────────────────────────────────────
const STATUS_CONFIG = {
  live:          { label: 'Live',        className: 'bg-emerald-500 text-white border-emerald-600' },
  internal:      { label: 'Internal',    className: 'bg-zinc-700   text-zinc-200 border-zinc-600'  },
  'in-progress': { label: 'In Progress', className: 'bg-amber-500  text-white    border-amber-600' },
} as const;

// Strict priority mapping engine
const STATUS_PRIORITY: Record<keyof typeof STATUS_CONFIG, number> = {
  'live': 1,
  'in-progress': 2,
  'internal': 3,
};

function StatusBadge({ status }: { status: keyof typeof STATUS_CONFIG }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${cfg.className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current inline-block opacity-80" />
      {cfg.label}
    </span>
  );
}

// ─── Project card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const thumbnail = `/projects/${project.folderSlug}/thumbnail.${project.imageExtension}`;
  const status = project.status ?? 'live';

  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer flex flex-col rounded-2xl overflow-hidden border border-zinc-200 bg-white hover:border-zinc-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
      style={{ willChange: 'transform' }}
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-100 shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnail}
          alt={project.title}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Status badge */}
        <div className="absolute top-3 left-3 drop-shadow-sm">
          <StatusBadge status={status} />
        </div>

        {/* Action buttons */}
        <div
          className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              title="View source"
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors shadow-md"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          )}
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noreferrer"
              title="Open live project"
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-900 text-white font-bold text-[11px] hover:bg-zinc-700 transition-colors shadow-md"
            >
              Live
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          )}
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5 gap-3 bg-white">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-bold text-zinc-900 leading-snug">
            {project.title}
          </h3>
          {project.role && (
            <span className="text-[10px] text-zinc-400 font-medium shrink-0 mt-0.5 whitespace-nowrap">
              {project.role}
            </span>
          )}
        </div>

        <p className="text-xs text-zinc-500 leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.map((tag, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-600 border border-zinc-200 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Gallery hint */}
        {project.imageCount && project.imageCount > 1 && (
          <div className="flex items-center gap-1.5 pt-1 text-[10px] text-zinc-400 font-medium">
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 00(1.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            {project.imageCount} screenshots · click to browse
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({ project, onClose }: { project: Project; onClose: () => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  const gallery = project.imageCount && project.imageCount > 0
    ? Array.from({ length: project.imageCount }, (_, i) =>
        `/projects/${project.folderSlug}/${i + 1}.${project.imageExtension}`
      )
    : [`/projects/${project.folderSlug}/thumbnail.${project.imageExtension}`];

  const total = gallery.length;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const goTo = useCallback((idx: number) => {
    setVisible(false);
    setTimeout(() => { setCurrentIdx(idx); setVisible(true); }, 150);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goTo((currentIdx + 1) % total);
      if (e.key === 'ArrowLeft') goTo((currentIdx - 1 + total) % total);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [currentIdx, total, onClose, goTo]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-zinc-950/95 p-4 sm:p-8"
      onClick={onClose}
    >
      {/* Top bar */}
      <div
        className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 py-4 z-10 border-b border-zinc-800/60 bg-zinc-950/80"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h3 className="font-bold text-base text-stone-100 tracking-tight">{project.title}</h3>
          <p className="text-[11px] text-zinc-500 mt-0.5">
            {currentIdx + 1} / {total} · press ← → to navigate · esc to close
          </p>
        </div>

        <div className="flex items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-zinc-600"
              onClick={(e) => e.stopPropagation()}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              Source
            </a>
          )}
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-white bg-white/10 hover:bg-white/20 transition-colors px-3 py-1.5 rounded-lg border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              Visit live
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-600 text-zinc-400 hover:text-white transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Image stage */}
      <div
        className="relative w-full max-w-5xl flex items-center justify-center mt-16 mb-6"
        onClick={(e) => e.stopPropagation()}
      >
        {total > 1 && (
          <button
            onClick={() => goTo((currentIdx - 1 + total) % total)}
            className="absolute left-0 z-20 p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white hover:bg-zinc-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}

        <div className="rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-2xl max-h-[65vh] flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={gallery[currentIdx]}
            alt={`${project.title} screenshot ${currentIdx + 1}`}
            className="max-w-full max-h-[65vh] object-contain select-none transition-opacity duration-150"
            style={{ opacity: visible ? 1 : 0 }}
          />
        </div>

        {total > 1 && (
          <button
            onClick={() => goTo((currentIdx + 1) % total)}
            className="absolute right-0 z-20 p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-white hover:bg-zinc-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>

      {/* Dot track */}
      {total > 1 && (
        <div className="flex items-center gap-2 z-10" onClick={(e) => e.stopPropagation()}>
          {gallery.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === currentIdx ? 'w-8 bg-white' : 'w-2 bg-zinc-700 hover:bg-zinc-500'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function ProjectsSection() {
  const colors = useColors();
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // FIXED: Memoise and sort projectsData by requested status alignment hierarchies
  const sortedProjects = useMemo(() => {
    return [...projectsData].sort((a, b) => {
      const statusA = a.status ?? 'live';
      const statusB = b.status ?? 'live';
      return STATUS_PRIORITY[statusA] - STATUS_PRIORITY[statusB];
    });
  }, []);

  // Legend sorting to visually match layout presentation matrix output
  const sortedLegendStatus = useMemo(() => {
    return (Object.keys(STATUS_CONFIG) as Array<keyof typeof STATUS_CONFIG>).sort(
      (a, b) => STATUS_PRIORITY[a] - STATUS_PRIORITY[b]
    );
  }, []);

  return (
    <Section id="projects">

      {/* Header */}
      <div className="relative z-10 mb-12 px-4">
        <span className={`inline-block text-[10px] font-bold tracking-[0.22em] ${colors.invertedTextMuted} uppercase mb-3`}>
          Selected Works
        </span>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight whitespace-nowrap ${colors.invertedText}`}>
            <TypewriterTitle text="Featured Projects" />
          </h2>
          <p className={`${colors.invertedTextMuted} max-w-sm text-sm leading-relaxed md:text-right`}>
            Production apps, internal tools, and side projects — all built solo.
            Click any card to browse screenshots.
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-6 pt-5 border-t border-zinc-800/60">
          {sortedLegendStatus.map((s) => (
            <StatusBadge key={s} status={s} />
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-4">
        {sortedProjects.map((project: Project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={() => setActiveProject(project)}
          />
        ))}
      </div>

      {/* Lightbox */}
      {activeProject && (
        <Lightbox
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      )}

    </Section>
  );
}