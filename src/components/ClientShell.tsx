"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Remove the forced dark background — let the user's theme take over
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.removeProperty("background-color");
      document.body.style.removeProperty("background-color");
      document.body.removeAttribute("data-preloading");
    }
  }, []);

  // Refresh GSAP ScrollTrigger once route changes
  useEffect(() => {
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
  }, [pathname]);

  return (
    <>
      {/* Global Background Ambient Auroras & Noise */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-background">
        {/* Neutral dark/gray glowing auroras drifting/floating in background */}
        <div className="absolute top-[-10%] left-[-15%] w-[65vw] h-[65vw] sm:w-[50vw] sm:h-[50vw] rounded-full bg-white/[0.01] dark:bg-white/[0.01] blur-[100px] sm:blur-[140px] glow-bubble-1" />
        <div className="absolute bottom-[-10%] right-[-15%] w-[75vw] h-[75vw] sm:w-[60vw] sm:h-[60vw] rounded-full bg-white/[0.01] dark:bg-white/[0.01] blur-[120px] sm:blur-[160px] glow-bubble-2" />
        <div className="absolute top-[25%] right-[10%] w-[45vw] h-[45vw] sm:w-[35vw] sm:h-[35vw] rounded-full bg-white/[0.01] dark:bg-white/[0.01] blur-[90px] sm:blur-[110px] animate-float" />

        {/* Floating decorative orbs (muted colors) */}
        <div className="floating-orb w-6 h-6 bg-white/5 top-[15%] left-[20%]" style={{ animation: "orb-drift-1 12s ease-in-out infinite" }} />
        <div className="floating-orb w-4 h-4 bg-white/5 top-[60%] right-[15%]" style={{ animation: "orb-drift-2 15s ease-in-out infinite 2s" }} />
        <div className="floating-orb w-5 h-5 bg-white/5 bottom-[20%] left-[35%]" style={{ animation: "orb-drift-1 18s ease-in-out infinite 4s" }} />
        <div className="floating-orb w-3 h-3 bg-white/5 top-[35%] right-[30%]" style={{ animation: "orb-drift-2 10s ease-in-out infinite 1s" }} />
        <div className="floating-orb w-4 h-4 bg-white/5 bottom-[40%] left-[65%]" style={{ animation: "orb-drift-1 14s ease-in-out infinite 3s" }} />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </>
  );
}
