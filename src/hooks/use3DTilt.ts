"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * A custom React hook that adds a premium 3D parallax tilt effect on hover to an element.
 * Useful for Bento Grid cards, social cards, or CTA sections.
 * 
 * @param maxTilt The maximum degree rotation on X and Y axes
 * @param perspective The 3D depth perspective value in pixels
 */
export function use3DTilt<T extends HTMLElement>(
  maxTilt = 10,
  perspective = 1000
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    // Apply necessary parent-level 3D perspective styles
    el.style.transformStyle = "preserve-3d";
    el.style.willChange = "transform";

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Mouse position relative to the element center
      const mouseX = e.clientX - rect.left - width / 2;
      const mouseY = e.clientY - rect.top - height / 2;

      // Map coordinates to rotation values (-maxTilt to +maxTilt)
      const rotateX = -(mouseY / (height / 2)) * maxTilt;
      const rotateY = (mouseX / (width / 2)) * maxTilt;

      gsap.to(el, {
        transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
        duration: 0.3,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    el.addEventListener("mousemove", onMouseMove, { passive: true });
    el.addEventListener("mouseleave", onMouseLeave, { passive: true });

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [maxTilt, perspective]);

  return ref;
}
