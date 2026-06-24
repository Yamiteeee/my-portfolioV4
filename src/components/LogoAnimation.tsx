// src/components/LogoAnimation.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface LogoAnimationProps {
  children: React.ReactNode;
}

export default function LogoAnimation({ children }: LogoAnimationProps) {
  const [isComplete, setIsComplete] = useState(false);
  const [textDisappeared, setTextDisappeared] = useState(false);
  const [destroyLoader, setDestroyLoader] = useState(false);

  useEffect(() => {
    // Step 1: Text disappears first (at 1800ms)
    const textTimer = setTimeout(() => {
      setTextDisappeared(true);
    }, 1800);

    // Step 2: The curtains open shortly after the text is gone (at 2300ms)
    const curtainTimer = setTimeout(() => {
      setIsComplete(true);
    }, 2300);

    // Step 3: Completely clear from DOM once offscreen
    const destroyTimer = setTimeout(() => {
      setDestroyLoader(true);
    }, 3500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(curtainTimer);
      clearTimeout(destroyTimer);
    };
  }, []);

  const monogramVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <>
      {/* Main Portfolio Layout Stage underneath */}
      <div className="w-full min-h-screen">
        {children}
      </div>

      {/* Overlaid Studio Curtain Engine */}
      <AnimatePresence>
        {!destroyLoader && (
          <div className="fixed inset-0 z-[9999] flex select-none overflow-hidden pointer-events-none">
            
            {/* Left Curtain Panel */}
            <motion.div 
              initial={{ x: "0%" }}
              animate={isComplete ? { x: "-100%" } : { x: "0%" }}
              transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1] }}
              className="absolute inset-y-0 left-0 w-1/2 bg-zinc-950 border-r border-zinc-900/30 will-change-transform pointer-events-auto"
            />
            
            {/* Right Curtain Panel */}
            <motion.div 
              initial={{ x: "0%" }}
              animate={isComplete ? { x: "100%" } : { x: "0%" }}
              transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1] }}
              className="absolute inset-y-0 right-0 w-1/2 bg-zinc-950 border-l border-zinc-900/30 will-change-transform pointer-events-auto"
            />

            {/* Central Studio Container */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-10">
              
              {/* Scaled-Up Center Emblem Frame */}
              <motion.div 
                className="relative w-32 h-32 flex items-center justify-center"
                animate={textDisappeared ? { scale: 0.95, opacity: 0 } : { scale: 1, opacity: 1 }}
                transition={{ duration: 0.35, ease: "easeIn" }}
              >
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <motion.circle 
                    cx="50" cy="50" r="44" 
                    stroke="rgba(244, 244, 245, 0.1)" strokeWidth="2" 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                  />

                  <motion.path
                    d="M38 32H58V54C58 63 50 68 42 68"
                    stroke="#fafafa" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
                    variants={monogramVariants} initial="hidden" animate="visible"
                  />

                  <motion.path
                    d="M58 32H70C76 32 80 36 80 42C80 48 76 52 70 52H58"
                    stroke="#71717a" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
                    variants={monogramVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}
                  />
                </svg>
              </motion.div>

              {/* Minimalist Professional Typography Layer */}
              <div className="flex flex-col items-center gap-1.5 text-center overflow-hidden">
                <div className="overflow-hidden h-4 flex items-center justify-center">
                  <motion.span 
                    initial={{ opacity: 0, y: 12 }}
                    animate={textDisappeared ? { opacity: 0, y: -12 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2, ease: "easeInOut" }}
                    className="text-[10px] uppercase font-bold tracking-[0.35em] text-zinc-200"
                  >
                    J. PLATINO
                  </motion.span>
                </div>
                
                <div className="overflow-hidden h-4 flex items-center justify-center">
                  <motion.span 
                    initial={{ opacity: 0, y: 12 }}
                    animate={textDisappeared ? { opacity: 0, y: -12 } : { opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1, ease: "easeInOut" }}
                    className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-medium font-mono"
                  >
                    Thank You For Visiting
                  </motion.span>
                </div>
              </div>

            </div>

          </div>
        )}
      </AnimatePresence>
    </>
  );
}