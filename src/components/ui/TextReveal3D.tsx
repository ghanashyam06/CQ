"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface TextReveal3DProps {
  items: string[];
  radius?: number; // Distance from center
  perspective?: number; // CSS perspective
  autoRotate?: boolean;
  autoRotateSpeed?: number; // Speed multiplier (higher = faster)
  mouseInteractive?: boolean;
  fontSize?: string;
  fontWeight?: string | number;
  className?: string;
  textClassName?: string;
  rotationAxis?: "x" | "y"; // 'x' for vertical drum roll, 'y' for horizontal carousel
}

export default function TextReveal3D({
  items,
  radius = 180,
  perspective = 1000,
  autoRotate = true,
  autoRotateSpeed = 1,
  mouseInteractive = true,
  fontSize = "clamp(2rem, 4vw, 4rem)",
  fontWeight = "900",
  className = "",
  textClassName = "",
  rotationAxis = "x",
}: TextReveal3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cylinderRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const cylinder = cylinderRef.current;
    const container = containerRef.current;
    if (!cylinder || !container) return;

    // Use gsap.context to manage all animations and clean them up automatically on unmount
    const ctx = gsap.context(() => {
      let activeAnimation: gsap.core.Tween | null = null;

      // 1. Auto-rotation animation
      if (autoRotate) {
        const duration = 20 / autoRotateSpeed;
        const targetRotation = rotationAxis === "x" ? { rotateX: "-=360" } : { rotateY: "+=360" };
        
        activeAnimation = gsap.to(cylinder, {
          ...targetRotation,
          duration,
          repeat: -1,
          ease: "none",
        });
      }

      // 2. Mouse Parallax (Interactive 3D tilt)
      if (mouseInteractive) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = container.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          // Normalized coordinates (-1 to 1)
          const normX = (e.clientX - centerX) / (rect.width / 2);
          const normY = (e.clientY - centerY) / (rect.height / 2);

          // Target tilt values (max 15 degrees)
          mouseRef.current.targetX = normX * 15;
          mouseRef.current.targetY = -normY * 15;
        };

        const tick = () => {
          const { x, y, targetX, targetY } = mouseRef.current;
          
          // Smoothly interpolate current coordinates towards target using lerp
          const lerpFactor = 0.08;
          mouseRef.current.x = x + (targetX - x) * lerpFactor;
          mouseRef.current.y = y + (targetY - y) * lerpFactor;

          if (!autoRotate) {
            // Apply rotation offset directly to the cylinder
            gsap.set(cylinder, {
              transform: `rotateY(${mouseRef.current.x}deg) rotateX(${mouseRef.current.y}deg)`,
            });
          } else {
            // If auto-rotating, tilt the outer container instead to keep rotation axis aligned
            gsap.set(container, {
              transform: `rotateY(${mouseRef.current.x}deg) rotateX(${mouseRef.current.y}deg)`,
            });
          }
        };

        window.addEventListener("mousemove", handleMouseMove);
        gsap.ticker.add(tick);

        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
          gsap.ticker.remove(tick);
        };
      }
    }, container);

    return () => ctx.revert(); // Reverts all animations and kills listeners
  }, [autoRotate, autoRotateSpeed, mouseInteractive, rotationAxis]);

  const totalItems = items.length;
  const gap = 360 / totalItems;

  // CSS mask style to fade out top/bottom elements
  const maskStyle = rotationAxis === "x"
    ? {
        WebkitMaskImage: "linear-gradient(to bottom, transparent, white 20%, white 80%, transparent)",
        maskImage: "linear-gradient(to bottom, transparent, white 20%, white 80%, transparent)",
      }
    : {
        WebkitMaskImage: "linear-gradient(to right, transparent, white 20%, white 80%, transparent)",
        maskImage: "linear-gradient(to right, transparent, white 20%, white 80%, transparent)",
      };

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-visible ${className}`}
      style={{
        height: `${radius * 2.2}px`,
        perspective: `${perspective}px`,
        transformStyle: "preserve-3d",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        ref={cylinderRef}
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...maskStyle,
        }}
      >
        {items.map((item, idx) => {
          const angle = idx * gap;
          const transformValue = rotationAxis === "x"
            ? `rotateX(${angle}deg) translateZ(${radius}px)`
            : `rotateY(${angle}deg) translateZ(${radius}px)`;

          return (
            <div
              key={idx}
              className={`absolute text-center select-none backface-hidden ${textClassName}`}
              style={{
                fontSize,
                fontWeight,
                transform: transformValue,
                backfaceVisibility: "hidden",
                transformStyle: "preserve-3d",
                color: "var(--foreground)",
                fontFamily: "var(--font-heading)",
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}
