"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Text3DRevealProps {
  text: string;
  className?: string;
  /** Delay before the animation starts (seconds) */
  delay?: number;
  /** Stagger between each word (seconds) */
  stagger?: number;
}

/**
 * Splits text into words and animates each one with a 3D flip-up reveal:
 * words start rotated back (rotateX: -90deg) and below the baseline,
 * then spring forward into place — like pages flipping open toward the viewer.
 */
export function Text3DReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.1,
}: Text3DRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const words = text.split(" ");

  const container = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  const wordVariant = {
    hidden: {
      opacity: 0,
      y: "60%",
      rotateX: -80,
      scale: 0.92,
    },
    visible: {
      opacity: 1,
      y: "0%",
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 14,
        mass: 0.8,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap justify-center gap-x-[0.3em] ${className}`}
      style={{ perspective: "800px" }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariant}
          className="inline-block"
          style={{ transformOrigin: "50% 100%", transformStyle: "preserve-3d" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
