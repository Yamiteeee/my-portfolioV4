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
    // PERF: Removed `transition-colors duration-500` from <main> — it triggers
    // a full-page style recalculation on every color token change.
    // Color transitions are now handled at the component level where needed.
    <main className={`relative min-h-screen w-full overflow-x-hidden ${colors.bg} flex flex-col`}>

      {/* =========================================================================
          1. HERO TRACK STAGE
          — Dot-matrix (inline SVG data URI, zero network req) +
            indigo radial bloom from bottom-center.
          ========================================================================= */}
      <div
        className="relative pt-12 pb-8 md:pt-20 md:pb-12 z-10 overflow-hidden"
        style={{
          // Dot-matrix: inline data URI — no fetch, no CLS, instant paint
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20'%3E%3Ccircle cx='1' cy='1' r='1' fill='%238090c0' fill-opacity='0.35'/%3E%3C/svg%3E\")",
          backgroundSize: '20px 20px',
          backgroundRepeat: 'repeat',
        }}
      >
        {/* Bloom layer — own compositing layer via `will-change: transform`
            so it never triggers a repaint on the hero content above it.       */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            willChange: 'transform', // promote to GPU layer — isolates from scroll repaints
            background: `
              radial-gradient(ellipse 80% 70% at 50% 115%, rgba(99,120,220,0.14) 0%, transparent 70%),
              radial-gradient(ellipse 45% 40% at 80% 10%,  rgba(160,190,255,0.07) 0%, transparent 60%)
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

          PERF FIXES:
          ① Removed `backdrop-blur-sm` — blur forces the browser to create a
            stacking context and re-composite on EVERY scroll frame. With a
            heavy CV inside, this caused the FPS drop you were seeing.
          ② Replaced `bg-white/90` with solid `bg-white` — semi-transparent
            backgrounds also trigger compositing overhead.
          ③ Added `contain: layout style` so the bio box's internal reflows
            (e.g. lazy images, dynamic content) don't bubble up to the root.
          ④ `will-change: transform` on the ScrollReveal wrapper so the
            entrance animation runs on the GPU, not the CPU paint thread.
          ========================================================================= */}
      <div className="relative z-10">
        {/* Section label — positioned relative to this wrapper, always visible */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full border border-zinc-200/60 bg-white shadow-sm text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 z-20">
          Overview Matrix
        </div>

        <div
          className={`bg-white border-y ${colors.border} py-14 md:py-20`}
          style={{ contain: 'layout style' }} // ③ isolate internal reflows
        >
          <div style={{ willChange: 'transform' }}> {/* ④ GPU-composited entrance */}
            <ScrollReveal variant="fadeUp" delay={0.1}>
              <BioSection />
            </ScrollReveal>
          </div>
        </div>
      </div>

      {/* =========================================================================
          3. PROJECTS TRACK STAGE

          PERF FIX: Replaced `blur-[160px]` blob with a cheaper CSS radial
          gradient on a ::before-equivalent div. `blur-[160px]` on a 600×400
          element is one of the most expensive paint operations you can do —
          it runs on CPU, blocks the main thread, and recalculates on resize.
          The gradient achieves the same soft-glow effect at near-zero cost.
          ========================================================================= */}
      <div className="relative z-10 bg-zinc-950">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-800/50 to-transparent" />

        {/* Cheap glow: gradient instead of blur-[160px] */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/3 left-1/4 w-[600px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(52,211,153,0.05) 0%, transparent 70%)',
            willChange: 'transform',
          }}
        />

        {/* Dark grid overlay — kept but GPU-promoted */}
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

          BUG FIX — "Secure Routing" label was overlapping the Projects section:
          The pill uses `-translate-y-1/2` to straddle the top edge, but the
          contact div had no top clearance, so the pill sat over the dark
          Projects block and was invisible / clipped.
          Fix: wrap in an outer div with `pt-6` so there's physical space above
          the contact content for the pill to occupy. The pill is now anchored
          to the *outer* wrapper's top edge, which has room above it.

          PERF: Diagonal hatch via repeating-linear-gradient (pure CSS, ~50 bytes)
          and radial vignette on isolated GPU layers.
          ========================================================================= */}
      <div
        className="relative z-10 pt-6" // ← pt-6 creates clearance for the pill
        style={{
          // Diagonal hairline hatch — pure CSS, zero network cost
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
        {/* "Secure Routing" pill — now has room to breathe above the content */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full border border-zinc-200/60 bg-white shadow-sm text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400 z-20 whitespace-nowrap">
          Secure Routing
        </div>

        {/* Vignette on its own layer so it doesn't cause paint on scroll */}
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
  );
}