"use client";

import React, { useRef, useEffect, useState } from "react";

interface TextPressureProps {
  text: string;
  className?: string;
  textColor?: string;
}

export default function TextPressure({
  text,
  className = "",
  textColor = "text-white",
}: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const chars = text.split("");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseLeave = () => {
      setMousePos({ x: -1000, y: -1000 });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`flex justify-center select-none ${className}`}
    >
      {chars.map((char, index) => (
        <PressureChar
          key={index}
          char={char}
          mousePos={mousePos}
          textColor={textColor}
        />
      ))}
    </div>
  );
}

interface PressureCharProps {
  char: string;
  mousePos: { x: number; y: number };
  textColor: string;
}

function PressureChar({ char, mousePos, textColor }: PressureCharProps) {
  const charRef = useRef<HTMLSpanElement>(null);
  const [weight, setWeight] = useState(400);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!charRef.current || mousePos.x === -1000) {
      setWeight(400);
      setScale(1);
      return;
    }

    const rect = charRef.current.getBoundingClientRect();
    const parentRect = charRef.current.parentElement?.getBoundingClientRect();
    if (!parentRect) return;

    const centerX = rect.left + rect.width / 2 - parentRect.left;
    const centerY = rect.top + rect.height / 2 - parentRect.top;

    const dx = mousePos.x - centerX;
    const dy = mousePos.y - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Max pressure at distance = 0, fading to baseline by distance = 180
    if (distance < 180) {
      const force = (180 - distance) / 180; // 0 to 1
      const targetWeight = Math.round(400 + force * 500); // 400 to 900
      const targetScale = 1 + force * 0.25; // 1 to 1.25
      setWeight(targetWeight);
      setScale(targetScale);
    } else {
      setWeight(400);
      setScale(1);
    }
  }, [mousePos]);

  return (
    <span
      ref={charRef}
      className={`inline-block transition-all duration-200 ease-out origin-center ${textColor}`}
      style={{
        fontWeight: weight,
        transform: `scale(${scale})`,
        display: char === " " ? "inline" : "inline-block",
        marginRight: char === " " ? "0.3em" : "0.02em",
      }}
    >
      {char}
    </span>
  );
}
