"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SwipeCarouselProps {
  children: React.ReactNode[];
  /** Card width as a CSS value shown per slide — e.g. "85vw" or "280px" */
  cardWidth?: string;
  gap?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

export default function SwipeCarousel({
  children,
  cardWidth = "82vw",
  gap = 16,
  showDots = true,
  showArrows = false,
  className = "",
}: SwipeCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = children.length;

  const scrollTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      const card = track.children[index] as HTMLElement;
      if (!card) return;
      track.scrollTo({ left: card.offsetLeft - gap, behavior: "smooth" });
    },
    [gap]
  );

  /* Track active dot on scroll */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const scrollLeft = track.scrollLeft;
      const cards = Array.from(track.children) as HTMLElement[];
      let closest = 0;
      let minDiff = Infinity;
      cards.forEach((card, i) => {
        const diff = Math.abs(card.offsetLeft - gap - scrollLeft);
        if (diff < minDiff) { minDiff = diff; closest = i; }
      });
      setActive(closest);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [gap]);

  return (
    <div className={`relative ${className}`}>
      {/* Scroll track */}
      <div
        ref={trackRef}
        className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 hide-scrollbar"
        style={{ gap: `${gap}px`, paddingLeft: `${gap}px`, paddingRight: `${gap}px` }}
      >
        {children.map((child, i) => (
          <div
            key={i}
            className="snap-center flex-shrink-0"
            style={{ width: cardWidth }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Arrow buttons */}
      {showArrows && (
        <div className="flex justify-center gap-3 mt-2">
          <button
            onClick={() => scrollTo(Math.max(0, active - 1))}
            disabled={active === 0}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 disabled:opacity-30 transition-all"
            aria-label="Previous"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollTo(Math.min(count - 1, active + 1))}
            disabled={active === count - 1}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 disabled:opacity-30 transition-all"
            aria-label="Next"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Dot indicators */}
      {showDots && count > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === active
                  ? "w-5 h-1.5 bg-primary"
                  : "w-1.5 h-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
