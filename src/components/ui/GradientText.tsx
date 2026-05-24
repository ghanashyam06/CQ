"use client";

import React from "react";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[]; // Array of colors (hex, rgb, hsl, or tailwind names)
  animationSpeed?: number; // Speed of the gradient animation in seconds
  showBorder?: boolean;
}

export default function GradientText({
  children,
  className = "",
  colors = ["#00bf63", "#00f0ff", "#00bf63"],
  animationSpeed = 8,
  showBorder = false,
}: GradientTextProps) {
  const gradientString = colors.join(", ");
  
  return (
    <span
      className={`inline-block bg-clip-text text-transparent relative ${className}`}
      style={{
        backgroundImage: `linear-gradient(90deg, ${gradientString})`,
        backgroundSize: "200% auto",
        animation: `gradient-sweep ${animationSpeed}s linear infinite`,
      }}
    >
      {showBorder && (
        <span
          className="absolute inset-0 rounded-lg border border-transparent pointer-events-none"
          style={{
            background: `linear-gradient(90deg, ${gradientString}) border-box`,
            WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "destination-out",
            maskComposite: "exclude",
            backgroundSize: "200% auto",
            animation: `gradient-sweep ${animationSpeed}s linear infinite`,
          }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </span>
  );
}
