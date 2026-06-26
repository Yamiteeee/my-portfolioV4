"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // 1. Initialize Lenis explicitly bound to the global window context
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      autoResize: true,
    });

    // Ensure lenis updates on scroll events
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Direct programmatic window scrolling execution
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      
      if (!anchor) return;

      const href = anchor.getAttribute("href");

      // Handle structural hash links directly
      if (href && href.startsWith("#")) {
        e.preventDefault();

        if (href === "#") {
          // Force Lenis to animate directly to the very top coordinate
          lenis.scrollTo(0, { 
            duration: 1.2,
            immediate: false 
          });
        } else {
          // Target custom layout IDs (e.g., #contact)
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            lenis.scrollTo(targetElement, {
              offset: -40,
              duration: 1.2,
              immediate: false
            });
          }
        }
      }
    };

    // Use global window event tracking to capture it before click bubbles freeze
    window.addEventListener("click", handleAnchorClick, { capture: true });

    return () => {
      lenis.destroy();
      window.removeEventListener("click", handleAnchorClick, { capture: true });
    };
  }, []);

  return <>{children}</>;
}