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

  // Skip preloader on reload inside the same session (disabled to let reload animations play every time)
  useEffect(() => {
    /*
    if (typeof window !== "undefined") {
      const hasLoaded = sessionStorage.getItem("cq-preloader-loaded") === "true";
      if (hasLoaded) {
        setLoading(false);
        setShowContent(true);
      }
    }
    */
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setLoading(false);
    /*
    if (typeof window !== "undefined") {
      sessionStorage.setItem("cq-preloader-loaded", "true");
    }
    */
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

      {/* Main content — render after preloader is done to sync entrance animations */}
      <div
        style={{
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.6s ease-out",
        }}
      >
        {showContent && children}
      </div>
    </>
  );
}
