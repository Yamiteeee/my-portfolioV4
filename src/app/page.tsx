// src/app/page.tsx
"use client";

import Hero from '@/sections/Hero';
import BioSection from '@/sections/BioSection'; 
import ProjectsSection from '@/sections/ProjectsSection';
import ContactSection from '@/sections/ContactSection';
import { useColors } from '@/components/ColorProvider';
import ScrollReveal from '@/components/Animation';

export default function Home() {
  const colors = useColors();

  return (
    <main className={`relative min-h-screen w-full overflow-x-hidden ${colors.bg} transition-colors duration-500 flex flex-col`}>
      
      {/* =========================================================================
          GLOBAL HIGH-CONTRAST ENGINEERING GRID MATRIX (Edge-to-Edge)
          ========================================================================= */}
      {/* Increased color values from #8080800a to #80808022 for sharp architectural lines */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(128, 128, 128, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(128, 128, 128, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Micro-grain subtle texture overlay */}
      <div className="absolute inset-0 bg-repeat opacity-[0.015] pointer-events-none mix-blend-overlay bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=100&auto=format&fit=crop')] z-0" />

      {/* =========================================================================
          1. HERO TRACK STAGE
          ========================================================================= */}
      <div className="relative pt-12 pb-8 md:pt-20 md:pb-12 z-10">
        <ScrollReveal variant="scaleUp" duration={0.8}>
          <Hero />
        </ScrollReveal>
      </div>

      {/* =========================================================================
          2. BIO TRACK STAGE (Overview Matrix - Using mix-blend to let grids shine through)
          ========================================================================= */}
      <div className="relative z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full border border-zinc-200/60 bg-white shadow-sm text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 z-20">
          Overview Matrix
        </div>
        
        {/* Added bg-white/90 and backdrop-blur to let the structural grid peak through beautifully */}
        <div className={`bg-white/90 backdrop-blur-sm border-y ${colors.border} py-14 md:py-20 shadow-[inset_0_1px_3px_rgba(0,0,0,0.01)]`}>
          <ScrollReveal variant="fadeUp" delay={0.1}>
            <BioSection />
          </ScrollReveal>
        </div>
      </div>

      {/* =========================================================================
          3. PROJECTS TRACK STAGE (Cinematic Grid Segment Overlay)
          ========================================================================= */}
      <div className="relative z-10 bg-zinc-950">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800/50 to-transparent" />
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-emerald-500/[0.03] blur-[160px] rounded-full pointer-events-none" />

        {/* Dark Mode Grid Intersection Layer tailored specifically for the projects segment */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '24px 24px'
          }}
        />

        <div className={`${colors.invertedCardBg} py-14 md:py-20 text-stone-100 relative z-10`}>
          <ScrollReveal variant="leftToRight" duration={0.7}>
            <ProjectsSection />
          </ScrollReveal>
        </div>
        
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-900 to-transparent" />
      </div>

      {/* =========================================================================
          4. CONTACT TRACK STAGE
          ========================================================================= */}
      <div className="relative z-10 py-14 md:py-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full border border-zinc-200/60 bg-white shadow-sm text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 z-20">
          Secure Routing
        </div>
        
        <ScrollReveal variant="fadeIn" duration={1}>
          <ContactSection />
        </ScrollReveal>
      </div>

    </main>
  );
}