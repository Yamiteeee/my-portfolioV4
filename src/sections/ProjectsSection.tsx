// src/sections/ProjectsSection.tsx
"use client";

import React, { useState } from 'react';
import Section from '@/components/Section';
import Card from '@/components/Card';
import TypewriterTitle from '@/components/TypewriterTitle'; // Integrated typing engine
import { projectsData } from '@/data/projects';
import { useColors } from '@/components/ColorProvider';

interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  folderSlug: string;
  imageExtension: string;
  imageCount?: number;
  projectUrl?: string; 
  githubUrl?: string;  
}

export default function ProjectsSection() {
  const colors = useColors();
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState<number>(0);
  const [animationTrigger, setAnimationTrigger] = useState<boolean>(true);

  const openLightbox = (project: ProjectItem) => {
    setActiveProject(project);
    setCurrentImgIndex(0);
    setAnimationTrigger(true);
    document.body.style.overflow = 'hidden'; 
  };

  const closeLightbox = () => {
    setActiveProject(null);
    document.body.style.overflow = 'unset'; 
  };

  const nextImage = (e: React.MouseEvent, max: number) => {
    e.stopPropagation();
    setAnimationTrigger(false);
    setTimeout(() => {
      setCurrentImgIndex((prev) => (prev + 1) % max);
      setAnimationTrigger(true);
    }, 150); 
  };

  const prevImage = (e: React.MouseEvent, max: number) => {
    e.stopPropagation();
    setAnimationTrigger(false);
    setTimeout(() => {
      setCurrentImgIndex((prev) => (prev - 1 + max) % max);
      setAnimationTrigger(true);
    }, 150);
  };

  return (
    <Section id="projects">
      {/* Editorial Header */}
      <div className="relative z-10 mb-16 text-center md:text-left px-4">
        <span className={`inline-block text-[10px] sm:text-xs font-bold tracking-[0.2em] ${colors.invertedTextMuted} uppercase mb-3`}>
          Selected Works
        </span>
        {/* Dynamic Character Typewriter Selection */}
        <h2 className={`text-3xl md:text-5xl font-black tracking-tight mb-4 ${colors.invertedText}`}>
          <TypewriterTitle text="Featured Projects" />
        </h2>
        <p className={`${colors.invertedTextMuted} max-w-xl text-sm md:text-base leading-relaxed`}>
          A showcase of recent SaaS platforms, internal web tools, and web designs I've shipped. Click a card to explore layouts, or visit them directly via the link buttons.
        </p>
      </div>
      
      {/* --- PREMIUM 3-COLUMN UNIFORM HEIGHT GRID --- */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 px-4 items-stretch">
        {projectsData.map((project: any) => {
          const mainThumbnail = `/projects/${project.folderSlug}/thumbnail.${project.imageExtension}`;

          return (
            <div 
              key={project.id} 
              onClick={() => openLightbox(project)}
              className="relative cursor-pointer group rounded-2xl h-full flex flex-col"
            >
              {/* Action Floating Buttons */}
              <div 
                className="absolute top-4 right-4 z-20 flex items-center gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-0 sm:-translate-y-1 group-hover:translate-y-0"
                onClick={(e) => e.stopPropagation()} 
              >
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    title="View Source Code"
                    className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-stone-50 hover:bg-zinc-800 transition-all shadow-md active:scale-95"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                    title="Launch Live Project"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 text-stone-50 font-semibold text-xs transition-all shadow-sm hover:bg-zinc-800 active:scale-95"
                  >
                    <span>Live</span>
                    <svg className="w-3 h-3 text-stone-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                    </svg>
                  </a>
                )}
              </div>

              <Card 
                title={project.title} 
                description={project.description} 
                tags={project.tags}
                imageSrc={mainThumbnail}
                className="h-full flex flex-col border border-zinc-200/60 bg-white shadow-md hover:shadow-2xl transition-all duration-500 ease-out group-hover:-translate-y-2
                  [&_h3]:text-zinc-800 [&_p]:text-zinc-500 [&_p]:flex-grow
                  [&_span]:bg-zinc-100 [&_span]:text-zinc-700 [&_span]:border-[1px] [&_span]:border-zinc-200
                  [&_span]:font-medium [&_span]:tracking-wide"
              />
            </div>
          );
        })}
      </div>

      {/* --- LIGHTBOX MODAL LAYER --- */}
      {activeProject && (() => {
        const galleryList = activeProject.imageCount && activeProject.imageCount > 0 
          ? Array.from({ length: activeProject.imageCount }, (_, i) => 
              `/projects/${activeProject.folderSlug}/${i + 1}.${activeProject.imageExtension}`
            )
          : [`/projects/${activeProject.folderSlug}/thumbnail.${activeProject.imageExtension}`];

        return (
          <div 
            className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-zinc-950/95 backdrop-blur-xl p-4 sm:p-8"
            onClick={closeLightbox}
          >
            {/* Top Bar Navigation Interface */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10 text-stone-200" onClick={(e) => e.stopPropagation()}>
              <div>
                <h3 className="font-bold text-lg sm:text-xl tracking-tight">{activeProject.title}</h3>
                <p className="text-xs text-zinc-400 font-medium tracking-wide">Layout mockup {currentImgIndex + 1} of {galleryList.length}</p>
              </div>
              
              <button 
                onClick={closeLightbox}
                className="p-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-all active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Main Interactive Stage Area */}
            <div className="relative w-full max-w-5xl h-[65vh] sm:h-[70vh] flex items-center justify-center select-none mt-12">
              
              {/* Left Selector Control */}
              {galleryList.length > 1 && (
                <button 
                  onClick={(e) => prevImage(e, galleryList.length)}
                  className="absolute left-0 sm:left-4 z-20 p-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-900/90 text-white transition-all border border-zinc-800/80 backdrop-blur-md active:scale-90"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Display Canvas Frame Container */}
              <div 
                className="relative max-w-full max-h-full rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 bg-zinc-950 flex items-center justify-center p-2"
                onClick={(e) => e.stopPropagation()}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={galleryList[currentImgIndex]} 
                  alt={`${activeProject.title} viewport capture`}
                  className={`max-w-full max-h-[62vh] object-contain select-none transition-all duration-300 ease-out ${
                    animationTrigger 
                      ? 'opacity-100 scale-100 blur-0' 
                      : 'opacity-0 scale-[0.98] blur-sm'
                  }`}
                />
              </div>

              {/* Right Selector Control */}
              {galleryList.length > 1 && (
                <button 
                  onClick={(e) => nextImage(e, galleryList.length)}
                  className="absolute right-0 sm:right-4 z-20 p-3 rounded-xl bg-zinc-900/60 hover:bg-zinc-900/90 text-white transition-all border border-zinc-800/80 backdrop-blur-md active:scale-90"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>

            {/* Bottom Indicator Dots Track */}
            {galleryList.length > 1 && (
              <div className="mt-8 flex items-center gap-2 z-10" onClick={(e) => e.stopPropagation()}>
                {galleryList.map((_, dotIndex) => (
                  <button
                    key={dotIndex}
                    onClick={() => {
                      setAnimationTrigger(false);
                      setTimeout(() => {
                        setCurrentImgIndex(dotIndex);
                        setAnimationTrigger(true);
                      }, 150);
                    }}
                    className={`h-1 rounded-full transition-all duration-300 ${dotIndex === currentImgIndex ? 'w-8 bg-white' : 'w-2 bg-zinc-700 hover:bg-zinc-500'}`}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })()}
    </Section>
  );
}