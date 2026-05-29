"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const Preloader = dynamic(() => import("@/components/ui/Preloader"), {
  ssr: false,
});
const CustomCursor = dynamic(() => import("@/components/ui/CustomCursor"), {
  ssr: false,
});

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);


  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);

    // Remove the forced dark background — let the user's theme take over
    if (typeof window !== "undefined") {
      document.documentElement.style.removeProperty("background-color");
      document.body.style.removeProperty("background-color");
      document.body.removeAttribute("data-preloading");
    }

    // Delay for exit animation to complete before showing content
    setTimeout(() => setShowContent(true), 200);
  }, []);

  // Refresh GSAP ScrollTrigger once page transitions to visible or route changes
  useEffect(() => {
    if (showContent) {
      const timer = setTimeout(() => {
        import("gsap").then(({ gsap }) => {
          import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
            gsap.registerPlugin(ScrollTrigger);
            gsap.ticker.lagSmoothing(1000, 16);
            ScrollTrigger.refresh();
          });
        });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [showContent, pathname]);

  // Add custom cursor class to body
  useEffect(() => {
    // Only on non-touch devices
    if (typeof window !== "undefined" && !("ontouchstart" in window)) {
      document.body.classList.add("custom-cursor-active");
    }
    return () => {
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <>
      {/* Custom cursor (desktop only) */}
      <CustomCursor />

      {/* Preloader overlay */}
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Global Background Ambient Auroras & Cyber Grid */}
      {showContent && (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background">
          {/* Scrolling perspective cyber-grid */}
          <div className="perspective-grid-container opacity-[0.35] dark:opacity-[0.8] transition-opacity duration-500">
            <div className="perspective-grid-content" />
          </div>

          {/* Glowing auroras drifting/floating in background */}
          <div className="absolute top-[-10%] left-[-15%] w-[65vw] h-[65vw] sm:w-[50vw] sm:h-[50vw] rounded-full bg-primary/[0.08] dark:bg-primary/[0.08] blur-[100px] sm:blur-[140px] glow-bubble-1" />
          <div className="absolute bottom-[-10%] right-[-15%] w-[75vw] h-[75vw] sm:w-[60vw] sm:h-[60vw] rounded-full bg-primary/[0.05] dark:bg-primary/[0.08] blur-[120px] sm:blur-[160px] glow-bubble-2" />
          <div className="absolute top-[25%] right-[10%] w-[45vw] h-[45vw] sm:w-[35vw] sm:h-[35vw] rounded-full bg-[#00d4aa]/[0.05] dark:bg-[#00d4aa]/[0.06] blur-[90px] sm:blur-[110px] animate-float" />

          {/* Floating decorative orbs */}
          <div className="floating-orb w-6 h-6 bg-primary/20 dark:bg-primary/10 top-[15%] left-[20%]" style={{ animation: "orb-drift-1 12s ease-in-out infinite" }} />
          <div className="floating-orb w-4 h-4 bg-[#00d4aa]/25 dark:bg-[#00d4aa]/10 top-[60%] right-[15%]" style={{ animation: "orb-drift-2 15s ease-in-out infinite 2s" }} />
          <div className="floating-orb w-5 h-5 bg-primary/15 dark:bg-primary/8 bottom-[20%] left-[35%]" style={{ animation: "orb-drift-1 18s ease-in-out infinite 4s" }} />
          <div className="floating-orb w-3 h-3 bg-[#00d4aa]/20 dark:bg-[#00d4aa]/8 top-[35%] right-[30%]" style={{ animation: "orb-drift-2 10s ease-in-out infinite 1s" }} />
          <div className="floating-orb w-4 h-4 bg-primary/18 dark:bg-primary/8 bottom-[40%] left-[65%]" style={{ animation: "orb-drift-1 14s ease-in-out infinite 3s" }} />
        </div>
      )}

      {/* Main content — render after preloader is done to sync entrance animations */}
      <div
        style={{
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.6s ease-out",
        }}
        className="relative z-10"
      >
        {showContent && children}
      </div>
    </>
  );
}
