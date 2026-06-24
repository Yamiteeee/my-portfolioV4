// src/sections/ProjectsSection.tsx
"use client";

import React, { useState } from 'react';
import Section from '@/components/Section';
import Card from '@/components/Card';
import { projectsData } from '@/data/projects';
import { useColors } from '@/components/ColorProvider';

// Explicit type interface mapping out our sequential count structure
interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tags: string[];
  folderSlug: string;
  imageExtension: string;
  imageCount?: number; // 👈 Handles tracking the dynamic count safely
}

export default function ProjectsSection() {
  const colors = useColors();
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null);
  const [currentImgIndex, setCurrentImgIndex] = useState<number>(0);

  const openLightbox = (project: ProjectItem) => {
    setActiveProject(project);
    setCurrentImgIndex(0);
    document.body.style.overflow = 'hidden'; // Freeze main layout scrolling
  };

  const closeLightbox = () => {
    setActiveProject(null);
    document.body.style.overflow = 'unset'; // Re-enable main layout scrolling
  };

  const nextImage = (e: React.MouseEvent, max: number) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % max);
  };

  const prevImage = (e: React.MouseEvent, max: number) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + max) % max);
  };

  return (
    <Section id="projects">
      <div className="relative z-10 mb-16 text-center md:text-left px-4">
        <span className={`inline-block text-[10px] sm:text-xs font-bold tracking-[0.2em] ${colors.textMuted} uppercase mb-3`}>
          Selected Works
        </span>
        <h2 className={`text-3xl md:text-5xl font-black tracking-tight mb-4 ${colors.text}`}>
          Featured Projects
        </h2>
        <p className={`${colors.textMuted} max-w-xl text-sm md:text-base leading-relaxed`}>
          A showcase of recent SaaS platforms, internal web tools, and web designs I've shipped. Click any card to explore the full layout gallery.
        </p>
      </div>
      
      {/* Grid container rendering thumbnails */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {projectsData.map((project: any) => {
          const mainThumbnail = `/projects/${project.folderSlug}/thumbnail.${project.imageExtension}`;

          return (
            <div 
              key={project.id} 
              onClick={() => openLightbox(project)}
              className="cursor-pointer"
            >
              <Card 
                title={project.title} 
                description={project.description} 
                tags={project.tags}
                imageSrc={mainThumbnail}
                className={`border ${colors.border} ${colors.cardBg} shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
              />
            </div>
          );
        })}
      </div>

      {/* --- PREMIUM IMMERSIVE LIGHTBOX MODAL LAYER --- */}
      {activeProject && (() => {
        // Dynamically build the numeric image path array (e.g., 1.jpg, 2.jpg) if imageCount exists
        const galleryList = activeProject.imageCount && activeProject.imageCount > 0 
          ? Array.from({ length: activeProject.imageCount }, (_, i) => 
              `/projects/${activeProject.folderSlug}/${i + 1}.${activeProject.imageExtension}`
            )
          : [`/projects/${activeProject.folderSlug}/thumbnail.${activeProject.imageExtension}`];

        return (
          <div 
            className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-zinc-950/90 backdrop-blur-md p-4 sm:p-8"
            onClick={closeLightbox}
          >
            {/* Top Bar Navigation UI */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10 text-stone-200">
              <div>
                <h3 className="font-bold text-base sm:text-lg">{activeProject.title}</h3>
                <p className="text-xs text-zinc-400">Image {currentImgIndex + 1} of {galleryList.length}</p>
              </div>
              <button 
                onClick={closeLightbox}
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 active:scale-95"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Main Interactive Stage Area */}
            <div className="relative w-full max-w-5xl h-[70vh] flex items-center justify-center select-none">
              
              {/* Left Selector Control */}
              {galleryList.length > 1 && (
                <button 
                  onClick={(e) => prevImage(e, galleryList.length)}
                  className="absolute left-2 sm:left-4 z-20 p-3 rounded-xl bg-black/40 hover:bg-black/60 text-white transition-all border border-zinc-700/50 backdrop-blur-sm active:scale-90"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}

              {/* Display Canvas Frame Container */}
              <div 
                className="relative max-w-full max-h-full rounded-2xl overflow-hidden shadow-2xl border border-zinc-800 bg-zinc-900 flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={galleryList[currentImgIndex]} 
                  alt={`${activeProject.title} viewport view`}
                  className="max-w-full max-h-[68vh] object-contain select-none transition-all duration-300"
                />
              </div>

              {/* Right Selector Control */}
              {galleryList.length > 1 && (
                <button 
                  onClick={(e) => nextImage(e, galleryList.length)}
                  className="absolute right-2 sm:right-4 z-20 p-3 rounded-xl bg-black/40 hover:bg-black/60 text-white transition-all border border-zinc-700/50 backdrop-blur-sm active:scale-90"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>

            {/* Bottom Indicator Dots Track */}
            {galleryList.length > 1 && (
              <div className="mt-6 flex items-center gap-1.5 z-10" onClick={(e) => e.stopPropagation()}>
                {galleryList.map((_, dotIndex) => (
                  <button
                    key={dotIndex}
                    onClick={() => setCurrentImgIndex(dotIndex)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${dotIndex === currentImgIndex ? 'w-6 bg-white' : 'w-1.5 bg-zinc-600 hover:bg-zinc-400'}`}
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