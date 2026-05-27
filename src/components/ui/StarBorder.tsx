"use client";

import React from "react";

interface StarBorderProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
  speed?: string;
}

export default function StarBorder({
  children,
  className = "",
  color = "#00bf63",
  speed = "4s",
}: StarBorderProps) {
  return (
    <div
      className={`relative overflow-hidden p-[1px] rounded-2xl md:rounded-3xl bg-border/40 ${className}`}
    >
      {/* Dynamic Animated Glow Segment */}
      <div
        className="absolute inset-[-1000%] pointer-events-none z-0"
        style={{
          background: `conic-gradient(from 0deg, transparent 60%, ${color} 85%, transparent 100%)`,
          animation: `spin-border ${speed} linear infinite`,
          willChange: "transform",
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
        }}
      />

      {/* Inner Content Backing */}
      <div className="relative z-10 w-full h-full rounded-2xl md:rounded-3xl bg-card overflow-hidden">
        {children}
      </div>
    </div>
  );
}
