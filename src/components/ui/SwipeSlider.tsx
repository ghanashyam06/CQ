"use client";

import React, { type ReactNode, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SwipeSliderProps {
  children: ReactNode;
  onSlideChange?: (index: number) => void;
}

export function SwipeSlider({ children, onSlideChange }: SwipeSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const childrenArray = React.Children.toArray(children).filter(Boolean);

  useEffect(() => {
    if (!containerRef.current) return;
    const sections = containerRef.current.querySelectorAll(".swipe-slide");
    
    const ctx = gsap.context(() => {
      sections.forEach((section, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              setActiveIndex(i);
              onSlideChange?.(i);
            }
          }
        });

        // Parallax effect
        gsap.fromTo(
          section,
          { y: 50, opacity: 0.8 },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onSlideChange]);

  const scrollTo = (index: number) => {
    if (!containerRef.current) return;
    const sections = containerRef.current.querySelectorAll(".swipe-slide");
    const section = sections[index];
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="w-full bg-background relative flex flex-col">
      {/* Progress Dots */}
      <div className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {childrenArray.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`w-2 transition-all duration-300 rounded-full ${
              activeIndex === i ? "h-8 bg-primary" : "h-2 bg-primary/30 hover:bg-primary/50"
            }`}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </div>

      {childrenArray.map((child, idx) => (
        <div key={idx} className="swipe-slide w-full relative min-h-screen">
          {child}
        </div>
      ))}
    </div>
  );
}
