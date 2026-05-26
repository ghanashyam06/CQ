import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer, ScrollTrigger);
}

interface SwipeSliderProps {
  children: ReactNode[];
  onSlideChange?: (index: number) => void;
}

export function SwipeSlider({ children, onSlideChange }: SwipeSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const animatingRef = useRef(false);
  const observerRef = useRef<Observer | null>(null);

  // We keep a mutable ref of the current index so event handlers always have the fresh value
  const currentIndexRef = useRef(0);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Lock page scrolling when slider is mounted
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";

    const panels = gsap.utils.toArray<HTMLElement>(".swipe-slide-panel");
    const outers = gsap.utils.toArray<HTMLElement>(".swipe-slide-outer");
    const inners = gsap.utils.toArray<HTMLElement>(".swipe-slide-inner");
    const contents = gsap.utils.toArray<HTMLElement>(".swipe-slide-content");

    if (panels.length === 0) return;

    const totalSlides = panels.length;

    // Initial setup: stack all panels and offset them
    gsap.set(panels, { zIndex: (i) => (i === 0 ? 10 : 1) });
    gsap.set(outers, { yPercent: (i) => (i === 0 ? 0 : 100) });
    gsap.set(inners, { yPercent: (i) => (i === 0 ? 0 : -100) });

    // Trigger ScrollTriggers for the first slide immediately on mount
    setTimeout(() => {
      const activePanel = panels[0];
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger && activePanel.contains(st.trigger as Node)) {
          if (st.animation) st.animation.restart();
        }
      });
    }, 400);

    function goToSlide(targetIndex: number, direction: number) {
      if (animatingRef.current) return;
      if (targetIndex < 0 || targetIndex >= totalSlides) return;

      animatingRef.current = true;
      const prevIndex = currentIndexRef.current;

      const activePanel = panels[targetIndex];
      const outer = outers[targetIndex];
      const inner = inners[targetIndex];
      const prevPanel = panels[prevIndex];
      const prevOuter = outers[prevIndex];
      const prevInner = inners[prevIndex];

      // Set zIndexes for proper stacking
      gsap.set(activePanel, { zIndex: 10 });
      gsap.set(prevPanel, { zIndex: 5 });

      // Determine starting yPercent based on navigation direction
      const startY = direction > 0 ? 100 : -100;

      // Reset active panel position before starting animation
      gsap.set(outer, { yPercent: startY });
      gsap.set(inner, { yPercent: -startY });

      // Trigger animations for elements controlled by ScrollTrigger inside the active panel
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger && activePanel.contains(st.trigger as Node)) {
          if (st.animation) {
            st.animation.restart(); // Restart and play from the beginning
          }
        }
        if (prevPanel && st.trigger && prevPanel.contains(st.trigger as Node)) {
          if (st.animation) {
            st.animation.progress(0).pause(); // Reset to start state
          }
        }
      });

      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power2.inOut" },
        onComplete: () => {
          animatingRef.current = false;
          setCurrentIndex(targetIndex);
          if (onSlideChange) onSlideChange(targetIndex);

          // Clean up unused panel z-indices
          panels.forEach((p, idx) => {
            if (idx !== targetIndex) gsap.set(p, { zIndex: 1 });
          });
        },
      });

      // Swipe animation (clip-mask counter scroll)
      tl.to(outer, { yPercent: 0 }, 0)
        .to(inner, { yPercent: 0 }, 0);

      // Slide out previous panel
      if (prevPanel) {
        tl.to(prevOuter, { yPercent: -startY }, 0)
          .to(prevInner, { yPercent: startY }, 0);
      }

      // Parallax text/graphic drift
      const content = contents[targetIndex];
      const prevContent = contents[prevIndex];
      if (content) {
        tl.fromTo(
          content,
          { yPercent: direction > 0 ? 18 : -18 },
          { yPercent: 0 },
          0
        );
      }
      if (prevContent) {
        tl.to(prevContent, { yPercent: direction > 0 ? -18 : 18 }, 0);
      }
    }

    // Connect trigger navigation handler to external triggers
    (container as any)._goToSlideIndex = (idx: number) => {
      const current = currentIndexRef.current;
      if (idx === current || animatingRef.current) return;
      goToSlide(idx, idx > current ? 1 : -1);
    };

    observerRef.current = Observer.create({
      target: container,
      type: "wheel,touch,pointer",
      wheelSpeed: -1.0,
      tolerance: 15,
      preventDefault: false, // Allow normal scrolling inside overflowing content panels
      onUp: () => {
        if (animatingRef.current) return;
        const currentIdx = currentIndexRef.current;

        const currentSlideEl = panels[currentIdx];
        const scrollContainer = currentSlideEl?.querySelector(".scrollable-content") as HTMLElement;

        if (scrollContainer) {
          const isScrollable = scrollContainer.scrollHeight > scrollContainer.clientHeight;
          if (isScrollable) {
            const isAtBottom =
              scrollContainer.scrollTop + scrollContainer.clientHeight >=
              scrollContainer.scrollHeight - 6;
            if (!isAtBottom) return; // Allow scroll container to scroll naturally
          }
        }

        if (currentIdx < totalSlides - 1) {
          goToSlide(currentIdx + 1, 1);
        }
      },
      onDown: () => {
        if (animatingRef.current) return;
        const currentIdx = currentIndexRef.current;

        const currentSlideEl = panels[currentIdx];
        const scrollContainer = currentSlideEl?.querySelector(".scrollable-content") as HTMLElement;

        if (scrollContainer) {
          const isScrollable = scrollContainer.scrollHeight > scrollContainer.clientHeight;
          if (isScrollable) {
            const isAtTop = scrollContainer.scrollTop <= 6;
            if (!isAtTop) return; // Allow scroll container to scroll naturally
          }
        }

        if (currentIdx > 0) {
          goToSlide(currentIdx - 1, -1);
        }
      },
    });

    return () => {
      // Clean up body scroll lock when unmounted
      document.body.style.overflow = "";
      document.body.style.height = "";
      if (observerRef.current) {
        observerRef.current.kill();
      }
    };
  }, [onSlideChange]);

  const handleDotClick = (index: number) => {
    if (animatingRef.current || index === currentIndex) return;
    const container = containerRef.current;
    if (container && (container as any)._goToSlideIndex) {
      (container as any)._goToSlideIndex(index);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-[#060608]"
    >
      {React.Children.map(children, (child, idx) => (
        <div
          key={idx}
          className="swipe-slide-panel absolute inset-0 w-full h-full overflow-hidden"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            willChange: "transform",
          }}
        >
          <div
            className="swipe-slide-outer w-full h-full overflow-hidden"
            style={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
              willChange: "transform",
            }}
          >
            <div
              className="swipe-slide-inner w-full h-full overflow-hidden"
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                willChange: "transform",
              }}
            >
              <div
                className="swipe-slide-content scrollable-content w-full h-full"
                style={{
                  width: "100%",
                  height: "100%",
                  overflowY: "auto",
                  scrollbarWidth: "none",
                }}
              >
                {child}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Premium Side Navigation Dot Indicators */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-[9999] flex flex-col gap-3">
        {React.Children.map(children, (_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className="group relative flex items-center justify-center w-6 h-6 focus:outline-none"
          >
            {/* Outer ring on active or hover */}
            <span
              className={`absolute inset-0 rounded-full border border-primary/40 scale-50 transition-all duration-300 ${
                idx === currentIndex
                  ? "scale-100 opacity-100 border-primary"
                  : "opacity-0 group-hover:scale-75 group-hover:opacity-60"
              }`}
            />
            {/* Inner dot */}
            <span
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "bg-primary shadow-[0_0_8px_#00bf63]"
                  : "bg-gray-600 group-hover:bg-primary/70"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
