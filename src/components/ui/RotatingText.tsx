"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingTextProps {
  texts: string[];
  className?: string;
  itemClassName?: string;
  interval?: number; // millisecond duration for each word
}

export default function RotatingText({
  texts,
  className = "",
  itemClassName = "",
  interval = 2500,
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (texts.length <= 1) return;
    
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, interval);

    return () => clearInterval(timer);
  }, [texts, interval]);

  return (
    <span className={`inline-block overflow-hidden relative ${className}`} style={{ height: "1.2em", verticalAlign: "bottom" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 0.5,
          }}
          className={`block text-left whitespace-nowrap ${itemClassName}`}
        >
          {texts[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
