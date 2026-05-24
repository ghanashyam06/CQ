"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}

export default function SplitText({
  text,
  className = "",
  delay = 0,
  stagger = 0.03,
}: SplitTextProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  
  const words = text.split(" ");

  return (
    <span ref={containerRef} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split("").map((char, cIdx) => {
            // Absolute index calculation
            const prevWordsLength = words.slice(0, wIdx).join("").length;
            const absoluteIdx = prevWordsLength + cIdx;
            
            return (
              <motion.span
                key={cIdx}
                initial={{ opacity: 0, y: "40%", filter: "blur(4px)" }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: "40%", filter: "blur(4px)" }
                }
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                  delay: delay + absoluteIdx * stagger,
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
