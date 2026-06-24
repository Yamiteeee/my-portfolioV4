// src/sections/ProjectsSection.tsx
"use client";

import React from 'react';
import Section from '@/components/Section';
import Card from '@/components/Card';
import { projectsData } from '@/data/projects';
import { useColors } from '@/components/ColorProvider';

export default function ProjectsSection() {
  const colors = useColors();

  return (
    <Section id="projects">
      {/* Structural alignment matching the clean layout rhythm of our new hero */}
      <div className="relative z-10 mb-16 text-center md:text-left px-4">
        <span className={`inline-block text-[10px] sm:text-xs font-bold tracking-[0.2em] ${colors.textMuted} uppercase mb-3`}>
          Selected Works
        </span>
        <h2 className={`text-3xl md:text-5xl font-black tracking-tight mb-4 ${colors.text}`}>
          Featured Projects
        </h2>
        <p className={`${colors.textMuted} max-w-xl text-sm md:text-base leading-relaxed`}>
          A showcase of recent SaaS platforms, internal web tools, and web designs I've shipped.
        </p>
      </div>
      
      {/* Grid container inheriting stacking priority with cleaner padding anchors */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        {projectsData.map((project) => {
          const mainThumbnail = `/projects/${project.folderSlug}/thumbnail.${project.imageExtension}`;

          return (
            <Card 
              key={project.id}
              title={project.title} 
              description={project.description} 
              tags={project.tags}
              imageSrc={mainThumbnail}
              /* Clean shadow layer so the cards float flawlessly over our mesh grid backdrop */
              className={`border ${colors.border} ${colors.cardBg} shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1`}
            />
          );
        })}
      </div>
    </Section>
  );
}