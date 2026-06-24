// src/components/TypewriterTitle.tsx
"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface TypewriterTitleProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function TypewriterTitle({ text, className = "", delay = 0 }: TypewriterTitleProps) {
  // Split text into an array of individual letters
  const letters = Array.from(text);

  // Added 'as const' to prevent type widening on custom delay functions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (customDelay: number) => ({
      opacity: 1,
      transition: { 
        staggerChildren: 0.03,
        delayChildren: customDelay 
      },
    }),
  };

  // Fixed by adding 'as const' to strictly match Framer Motion's Variant type signatures
  const childVariants: Variants = {
    hidden: { 
      opacity: 0,
      display: "inline-block"
    },
    visible: {
      opacity: 1,
      display: "inline-block",
      transition: {
        duration: 0.1,
        ease: "easeOut" // TypeScript now securely infers this as a literal
      }
    },
  } as const;

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      custom={delay}
      className={`inline-block ${className}`}
    >
      {letters.map((char, index) => (
        <motion.span 
          key={index} 
          variants={childVariants}
          className={char === " " ? "whitespace-pre" : ""}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}