// src/sections/BioSection.tsx
"use client";

import React from 'react';
import Section from '@/components/Section';
import { useColors } from '@/components/ColorProvider';

export default function BioSection() {
  const colors = useColors();

  // Clean, professional skill grouping (No generic percentage bars)
  const expertise = [
    {
      category: "Architecture & Frontend",
      skills: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "React Server Components", "State Management"]
    },
    {
      category: "Backend & Systems",
      skills: ["Node.js", "PostgreSQL", "Prisma ORM", "RESTful / GraphQL APIs", "Redis Caching"]
    },
    {
      category: "DevOps & Workflow",
      skills: ["Vercel", "Docker", "AWS (S3/EC2)", "CI/CD Pipelines", "Git / GitHub Automation"]
    }
  ];

  return (
    <Section id="about">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 px-4 items-start">
        
        {/* --- LEFT COLUMN: THE PROFILE & PHILOSOPHY --- */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <span className={`text-[10px] sm:text-xs font-bold tracking-[0.2em] ${colors.textMuted} uppercase mb-3`}>
            01 / Profile
          </span>
          <h2 className={`text-3xl md:text-5xl font-black tracking-tight mb-6 ${colors.text}`}>
            Engineering with intent, <br />not just convention.
          </h2>
          
          <div className={`${colors.textMuted} space-y-6 text-base md:text-lg leading-relaxed font-normal`}>
            <p>
              I am a software engineer focused on bridging the gap between intricate backend architectures and highly polished, interactive user interfaces. I don't just assemble frameworks—I analyze performance bottlenecks, optimize database schemas, and ensure codebases scale cleanly.
            </p>
            <p>
              My approach centers around simplicity and speed. I lean heavily into type safety, robust state management, and semantic, accessible markup to build products that look flawless on the outside and run efficiently under the hood.
            </p>
            <p>
              Whether partnering with early-stage startups to launch their core MVPs or working with established teams to refactor legacy modules into fast, modern Next.js environments, I bring clear communication and systematic problem-solving to the table.
            </p>
          </div>
        </div>

        {/* --- RIGHT COLUMN: TECHNICAL MATRIX --- */}
        <div className="lg:col-span-5 space-y-8 lg:mt-4">
          <div className={`p-6 md:p-8 rounded-2xl ${colors.cardBg} border ${colors.border} shadow-sm space-y-8`}>
            <div>
              <h3 className={`text-sm font-bold tracking-wider uppercase ${colors.text} mb-1`}>
                Technical Core
              </h3>
              <p className={`text-xs ${colors.textMuted}`}>
                Tools and environments I deploy daily.
              </p>
            </div>

            <div className="space-y-6">
              {expertise.map((group, index) => (
                <div key={index} className="space-y-3">
                  <h4 className={`text-xs font-bold uppercase tracking-wide text-zinc-400`}>
                    {group.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, sIndex) => (
                      <span 
                        key={sIndex} 
                        className={`text-xs px-3 py-1.5 rounded-lg border ${colors.border} bg-stone-50 text-zinc-800 font-medium transition-colors duration-200 hover:bg-zinc-900 hover:text-stone-50 hover:border-zinc-900 select-none`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </Section>
  );
}