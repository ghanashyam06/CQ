"use client";

import React from "react";
import { motion } from "framer-motion";

interface MagicRingsProps {
  className?: string;
  count?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

export default function MagicRings({
  className = "",
  count = 6,
  primaryColor = "rgba(0, 191, 99, 0.08)", // CQ Green
  secondaryColor = "rgba(0, 240, 255, 0.03)", // CQ Blue
}: MagicRingsProps) {
  const rings = Array.from({ length: count });

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center ${className}`}>
      <div className="relative w-[600px] h-[600px] flex items-center justify-center">
        {rings.map((_, i) => {
          const size = 120 + i * 80; // concentric circles growing outward
          const isEven = i % 2 === 0;
          const rotationDirection = isEven ? 360 : -360;
          const duration = 20 + i * 8; // outer rings rotate slower
          const color = isEven ? primaryColor : secondaryColor;

          return (
            <motion.div
              key={i}
              className="absolute rounded-full border border-dashed"
              style={{
                width: size,
                height: size,
                borderColor: color,
                borderWidth: isEven ? "1px" : "1.5px",
                borderStyle: isEven ? "dashed" : "solid",
                willChange: "transform",
                backfaceVisibility: "hidden",
              }}
              animate={{
                rotate: rotationDirection,
                scale: [1, 1.02, 0.98, 1],
              }}
              transition={{
                rotate: {
                  repeat: Infinity,
                  duration,
                  ease: "linear",
                },
                scale: {
                  repeat: Infinity,
                  duration: 6 + i * 2,
                  ease: "easeInOut",
                },
              }}
            />
          );
        })}
        {/* Glow at center */}
        <div className="absolute w-[200px] h-[200px] bg-[#00bf63]/[0.02] rounded-full blur-[80px]" />
      </div>
    </div>
  );
}
