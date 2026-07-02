"use client";

import { ReactLenis } from "lenis/react";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  // Sync lenis scroll with GSAP ScrollTrigger
  useEffect(() => {
    // Lenis itself is handled by ReactLenis, but we can hook into its ticker if needed.
    // ReactLenis automatically integrates with ScrollTrigger if configured via options, but 
    // a basic sync is sometimes needed depending on the version. 
    // The current lenis/react component syncs automatically, but calling ScrollTrigger.refresh() 
    // on mount is safe.
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.08, syncTouch: true }}>
      {children}
    </ReactLenis>
  );
}
