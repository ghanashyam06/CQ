"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface MobileSwipeCarouselProps {
  /** Each element becomes one snap card */
  items: React.ReactNode[];
  /** Tailwind grid-template-columns class(es) for md+ screens, e.g. "sm:grid-cols-2 xl:grid-cols-3" */
  desktopGridClass?: string;
  /** Label shown in the swipe hint. Defaults to "Swipe to explore" */
  hint?: string;
}

/**
 * On mobile  (<md): renders items as a horizontal scroll-snap carousel
 *                   with animated swipe hint + dot indicators.
 * On tablet+ (md+): falls back to a standard responsive grid.
 */
export function MobileSwipeCarousel({
  items,
  desktopGridClass = "sm:grid-cols-2 xl:grid-cols-3",
  hint = "Swipe to explore",
}: MobileSwipeCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardWidth = el.scrollWidth / items.length;
      setActiveIndex(Math.round(el.scrollLeft / cardWidth));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [items.length]);

  const scrollTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / items.length;
    el.scrollTo({ left: cardWidth * i, behavior: "smooth" });
  };

  return (
    <>
      {/* ── MOBILE: horizontal scroll-snap ── */}
      <div className="block md:hidden">
        {/* Swipe hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-1 mb-3 text-xs text-muted-foreground"
        >
          <span>{hint}</span>
          <motion.div
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
          >
            <ChevronRight className="w-3.5 h-3.5 text-primary" />
          </motion.div>
        </motion.div>

        {/* Scrollable track — shows ~10% of next card as peek */}
        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item, i) => (
            <div
              key={i}
              className="snap-center shrink-0"
              style={{ width: "82vw", maxWidth: "340px" }}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Dot indicators */}
        {items.length > 1 && (
          <div className="flex justify-center items-center gap-2 mt-4">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to item ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-5 h-2 bg-primary"
                    : "w-2 h-2 bg-border hover:bg-primary/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── TABLET+: standard responsive grid ── */}
      <div className={`hidden md:grid grid-cols-1 ${desktopGridClass} gap-4 sm:gap-6`}>
        {items.map((item, i) => (
          <div key={i}>{item}</div>
        ))}
      </div>
    </>
  );
}
