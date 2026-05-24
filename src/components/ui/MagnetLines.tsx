"use client";

import React, { useRef, useEffect, useState } from "react";

interface MagnetLinesProps {
  className?: string;
  lineColor?: string;
  activeLineColor?: string;
  rows?: number;
  columns?: number;
}

export default function MagnetLines({
  className = "",
  lineColor = "rgba(255, 255, 255, 0.1)",
  activeLineColor = "#00bf63",
  rows = 1,
  columns = 24,
}: MagnetLinesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const totalLines = rows * columns;
  const lines = Array.from({ length: totalLines });

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: -1000, y: -1000 });
      }}
      className={`relative w-full py-6 flex items-center justify-around overflow-hidden select-none ${className}`}
      style={{ minHeight: "40px" }}
    >
      <div 
        className="w-full max-w-7xl mx-auto px-4 grid gap-4 items-center justify-items-center"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
        }}
      >
        {lines.map((_, i) => {
          return (
            <MagnetLine
              key={i}
              mousePos={mousePos}
              isParentHovered={isHovered}
              lineColor={lineColor}
              activeLineColor={activeLineColor}
            />
          );
        })}
      </div>
    </div>
  );
}

interface MagnetLineProps {
  mousePos: { x: number; y: number };
  isParentHovered: boolean;
  lineColor: string;
  activeLineColor: string;
}

function MagnetLine({
  mousePos,
  isParentHovered,
  lineColor,
  activeLineColor,
}: MagnetLineProps) {
  const lineRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!lineRef.current || !isParentHovered) {
      setRotation(0);
      setIsActive(false);
      return;
    }

    const rect = lineRef.current.getBoundingClientRect();
    const parentRect = lineRef.current.parentElement?.getBoundingClientRect();
    if (!parentRect) return;

    // Get center coordinates of this line relative to parent container
    const centerX = rect.left + rect.width / 2 - parentRect.left;
    const centerY = rect.top + rect.height / 2 - parentRect.top;

    const dx = mousePos.x - centerX;
    const dy = mousePos.y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Calculate rotation angle pointing towards mouse
    const angleRad = Math.atan2(dy, dx);
    const angleDeg = (angleRad * 180) / Math.PI;

    // Line reacts stronger when cursor is close
    if (distance < 200) {
      setRotation(angleDeg);
      setIsActive(true);
    } else {
      // Return to baseline rotation (0 degrees)
      setRotation(0);
      setIsActive(false);
    }
  }, [mousePos, isParentHovered]);

  return (
    <div
      ref={lineRef}
      className="w-1 h-8 rounded-full transition-all duration-300 ease-out origin-center"
      style={{
        transform: `rotate(${rotation}deg)`,
        backgroundColor: isActive ? activeLineColor : lineColor,
        boxShadow: isActive ? `0 0 10px ${activeLineColor}` : "none",
      }}
    />
  );
}
