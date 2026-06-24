// src/app/page.tsx
"use client";

import Hero from '@/sections/Hero';
import ProjectsSection from '@/sections/ProjectsSection';
import ContactSection from '@/sections/ContactSection';
import { useColors } from '@/components/ColorProvider';

export default function Home() {
  const colors = useColors();

  return (
    <main 
      className={`relative min-h-screen w-full ${colors.bg} flex flex-col space-y-16 md:space-y-32 pb-24 overflow-x-hidden transition-colors duration-500`}
    >
      {/* Core Portfolio Sections 
        Each section handles its own internal layering and z-indexing flawlessly.
      */}
      <Hero />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}