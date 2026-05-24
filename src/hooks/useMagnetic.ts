"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * A custom React hook that adds a physics-based magnetic pull effect to elements.
 * 
 * @param magneticStrength The strength of the pull (0 = no pull, 1 = full lock on cursor)
 * @param rangeThreshold The radius in pixels from the element center in which the effect is active
 */
export function useMagnetic<T extends HTMLElement>(
  magneticStrength = 0.35,
  rangeThreshold = 60
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    // Apply smooth styles so the element can transform cleanly
    el.style.willChange = "transform";

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const elementX = rect.left + rect.width / 2;
      const elementY = rect.top + rect.height / 2;

      const deltaX = e.clientX - elementX;
      const deltaY = e.clientY - elementY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance < rangeThreshold) {
        // Smoothly pull toward the mouse coordinates
        gsap.to(el, {
          x: deltaX * magneticStrength,
          y: deltaY * magneticStrength,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      } else {
        // Snap back to origin with a soft bounce
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
          overwrite: "auto",
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.4)",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    el.addEventListener("mouseleave", onMouseLeave, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [magneticStrength, rangeThreshold]);

  return ref;
}
