// src/components/ColorProvider.tsx
"use client";

import React, { createContext, useContext, useState } from 'react';

const monochromeTheme = {
  bg: "bg-stone-50", // Soft, warm cream/off-white canvas instead of harsh paper white
  text: "text-zinc-800", // Soft dark charcoal instead of sharp off-black
  cardBg: "bg-white", // Warm white card surfaces to subtly float over the cream background
  border: "border-zinc-200/80", // Super gentle, faint border lines
  textMuted: "text-zinc-500", // Soft graphite tone for descriptions
  buttonBg: "bg-zinc-800 text-stone-50 hover:bg-zinc-700", // Softer solid buttons
  buttonSecondary: "bg-transparent text-zinc-800 border border-zinc-300 hover:bg-stone-100/50",

  // Softened inverted tokens for the emphasis sections (e.g., Contact)
  invertedCardBg: "bg-zinc-900", // Warm midnight charcoal instead of pitch black
  invertedText: "text-stone-50", // Soft cream text so it's gentle on the eyes
  invertedTextMuted: "text-zinc-400", 
  invertedBorder: "border-zinc-800",
  invertedButton: "bg-stone-50 text-zinc-900 hover:bg-stone-200"
};

const ColorContext = createContext(monochromeTheme);

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [colors] = useState(monochromeTheme);

  return (
    <ColorContext.Provider value={colors}>
      {children}
    </ColorContext.Provider>
  );
}

export const useColors = () => useContext(ColorContext);