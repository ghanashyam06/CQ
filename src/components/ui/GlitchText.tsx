"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  triggerOn?: "hover" | "always";
  speed?: number;
}

export default function GlitchText({
  text,
  className = "",
  triggerOn = "hover",
  speed = 30,
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*+=?[]";

  const triggerGlitch = useCallback(() => {
    if (isGlitching) return;
    setIsGlitching(true);

    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        setIsGlitching(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 3;
    }, speed);
  }, [isGlitching, text, speed, chars]);

  useEffect(() => {
    if (triggerOn === "always") {
      const timer = setInterval(() => {
        triggerGlitch();
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [triggerOn, triggerGlitch]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <span
      onMouseEnter={triggerOn === "hover" ? triggerGlitch : undefined}
      className={`inline-block select-none cursor-default transition-all duration-300 ${
        isGlitching ? "text-primary drop-shadow-[0_0_8px_rgba(0,191,99,0.5)]" : ""
      } ${className}`}
    >
      {displayText}
    </span>
  );
}
