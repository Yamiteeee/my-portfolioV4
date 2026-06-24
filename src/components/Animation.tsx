// src/components/ScrollReveal.tsx
"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: React.ReactNode;
  variant?: 'fadeUp' | 'fadeIn' | 'scaleUp' | 'leftToRight';
  delay?: number;
  duration?: number;
}

export default function ScrollReveal({ 
  children, 
  variant = 'fadeUp', 
  delay = 0, 
  duration = 0.6 
}: ScrollRevealProps) {
  
  // Define our sleek, premium preset motions
  const variants = {
    fadeUp: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0 }
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    scaleUp: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 }
    },
    leftToRight: {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }} // Triggers slightly before fully entering view
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.215, 0.61, 0.355, 1] // Premium cubic-bezier easing curve
      }}
      variants={variants[variant]}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}