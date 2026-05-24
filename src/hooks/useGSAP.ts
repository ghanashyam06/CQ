"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Custom hook that provides a scoped GSAP context with automatic cleanup.
 * Wraps gsap.context() so all animations created inside the callback
 * are automatically reverted on unmount.
 */
export function useGSAPContext(
  callback: (ctx: gsap.Context) => void,
  deps: React.DependencyList = []
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      callback(gsap.context(() => {}, containerRef.current!));
    }, containerRef.current);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return containerRef;
}

/**
 * Creates a GSAP timeline with ScrollTrigger.
 */
export function createScrollTimeline(
  trigger: Element | string,
  options?: ScrollTrigger.Vars
): gsap.core.Timeline {
  return gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
      ...options,
    },
  });
}

export { gsap, ScrollTrigger };
