"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SectionRevealOptions {
  /** Direction elements slide from */
  direction?: "up" | "left" | "right" | "scale";
  /** Distance in pixels */
  distance?: number;
  /** Delay before animation starts */
  delay?: number;
  /** Duration of each element animation */
  duration?: number;
  /** Stagger between child elements */
  stagger?: number;
  /** CSS selector for child elements to animate */
  childSelector?: string;
  /** ScrollTrigger start position */
  start?: string;
}

/**
 * Reusable hook for GSAP-powered section reveal animations.
 * Animates the container and optionally staggers children.
 */
export function useSectionReveal(options: SectionRevealOptions = {}) {
  const {
    direction = "up",
    distance = 50,
    delay = 0,
    duration = 0.8,
    stagger = 0.1,
    childSelector,
    start = "top 85%",
  } = options;

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const el = sectionRef.current;

    const fromVars: gsap.TweenVars = {
      opacity: 0,
      duration,
      delay,
      ease: "power3.out",
    };

    switch (direction) {
      case "up":
        fromVars.y = distance;
        break;
      case "left":
        fromVars.x = -distance;
        break;
      case "right":
        fromVars.x = distance;
        break;
      case "scale":
        fromVars.scale = 0.9;
        break;
    }

    // Animate section container
    gsap.from(el, {
      ...fromVars,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none reverse",
      },
    });

    // Stagger children if selector provided
    if (childSelector) {
      const children = el.querySelectorAll(childSelector);
      if (children.length > 0) {
        gsap.from(children, {
          opacity: 0,
          y: direction === "up" ? distance * 0.6 : 0,
          x: direction === "left" ? -distance * 0.6 : direction === "right" ? distance * 0.6 : 0,
          scale: direction === "scale" ? 0.9 : 1,
          duration: duration * 0.8,
          stagger,
          delay: delay + 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none reverse",
          },
        });
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
  }, [direction, distance, delay, duration, stagger, childSelector, start]);

  return sectionRef;
}
