"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.style.removeProperty("background-color");
      document.body.style.removeProperty("background-color");
      document.body.removeAttribute("data-preloading");
    }
  }, []);

  // Refresh GSAP ScrollTrigger on route changes
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

  return <>{children}</>;
}
