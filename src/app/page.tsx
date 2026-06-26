"use client";

import Hero from '@/sections/Hero';
import BioSection from '@/sections/BioSection';
import ProjectsSection from '@/sections/ProjectsSection';
import ContactSection from '@/sections/ContactSection';
import LogoAnimation from '@/components/LogoAnimation'; 
import SmoothScroll from '@/components/SmoothScroll'; // Imported your fixed Lenis component
import { useColors } from '@/components/ColorProvider';
import ScrollReveal from '@/components/Animation';

export default function Home() {
  const colors = useColors();

  return (
    <LogoAnimation>
      {/* 1. INITIALIZATION WRAPPER: Implements fluid inertia scrolling page-wide */}
      <SmoothScroll>
        {/* FIXED: Changed min-h-screen to h-auto to unlock the body scroll height constraints for Lenis */}
        <main className={`relative h-auto w-full overflow-x-hidden ${colors.bg} flex flex-col`}>

          {/* =========================================================================
              1. HERO TRACK STAGE
              ========================================================================= */}
          <div
            className="relative pt-12 pb-8 md:pt-20 md:pb-12 z-10 overflow-hidden"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='1' cy='1' r='1' fill='%238090c0' fill-opacity='0.35'/%3E%3C/svg%3E\")",
              backgroundSize: '20px 20px',
              backgroundRepeat: 'repeat',
            }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                willChange: 'transform',
                background: `
                  radial-gradient(ellipse 80% 70% at 50% 115%, rgba(99,120,220,0.14) 0%, transparent 70%),
                  radial-gradient(ellipse 45% 40% at 80% 10%,   rgba(160,190,255,0.07) 0%, transparent 60%)
                `,
              }}
            />

            <div className="relative z-10">
              <ScrollReveal variant="scaleUp" duration={0.8}>
                <Hero />
              </ScrollReveal>
            </div>
          </div>

          {/* =========================================================================
              2. BIO / CV TRACK STAGE (Overview Matrix)
              ========================================================================= */}
          <div className="relative z-10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full border border-zinc-200/60 bg-white shadow-sm text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 z-20">
              Overview Matrix
            </div>

            <div
              className={`bg-white border-y ${colors.border} py-14 md:py-20`}
              style={{ contain: 'layout style' }}
            >
              <div style={{ willChange: 'transform' }}>
                <ScrollReveal variant="fadeUp" delay={0.1}>
                  <BioSection />
                </ScrollReveal>
              </div>
            </div>
          </div>

          {/* =========================================================================
              3. PROJECTS TRACK STAGE
              ========================================================================= */}
          <div className="relative z-10 bg-zinc-950">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800/50 to-transparent" />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-1/3 left-1/4 w-[600px] h-[400px] rounded-full"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(52,211,153,0.05) 0%, transparent 70%)',
                willChange: 'transform',
              }}
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(to right,  rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '24px 24px',
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
          {/* FIXED: Target ID attached here. Lenis intercept engine will auto-scroll here when href="#contact" is clicked */}
          <div
            id="contact"
            className="relative z-10 pt-6 scroll-mt-16"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  135deg,
                  transparent,
                  transparent 18px,
                  rgba(120,120,100,0.055) 18px,
                  rgba(120,120,100,0.055) 19px
                )
              `,
            }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full border border-zinc-200/60 bg-white shadow-sm text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 z-20 whitespace-nowrap">
              Secure Routing
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0"
              style={{
                willChange: 'transform',
                background: 'radial-gradient(ellipse 70% 90% at 50% 50%, rgba(255,255,255,0.72) 0%, transparent 100%)',
              }}
            />

            <div className="relative z-10 py-14 md:py-20">
              <ScrollReveal variant="fadeIn" duration={1}>
                <ContactSection />
              </ScrollReveal>
            </div>
          </div>

        </main>
      </SmoothScroll>
    </LogoAnimation>
  );
}