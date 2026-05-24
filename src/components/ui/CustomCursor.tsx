"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "text">(
    "default"
  );
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { stiffness: 350, damping: 26, mass: 0.6 };
  const cursorSpringX = useSpring(cursorX, springConfig);
  const cursorSpringY = useSpring(cursorY, springConfig);

  const isVisibleRef = useRef(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch devices
    if (typeof window !== "undefined" && "ontouchstart" in window) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("interactive-item") ||
        target.getAttribute("role") === "button";

      if (isClickable) {
        setCursorType("pointer");
      } else if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.classList.contains("text-hover-item")
      ) {
        setCursorType("text");
      } else {
        setCursorType("default");
      }
    };

    const handleMouseLeaveWindow = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  const cursorVariants = {
    default: {
      width: 20,
      height: 20,
      border: "1.5px solid rgba(0, 191, 99, 0.4)",
      backgroundColor: "rgba(0, 191, 99, 0.03)",
      borderRadius: "50%",
    },
    pointer: {
      width: 48,
      height: 48,
      border: "2px solid #00bf63",
      backgroundColor: "rgba(0, 191, 99, 0.08)",
      boxShadow: "0 0 15px rgba(0, 191, 99, 0.25)",
      borderRadius: "50%",
    },
    text: {
      width: 4,
      height: 24,
      border: "0px solid transparent",
      backgroundColor: "#00bf63",
      borderRadius: "2px",
    },
  };

  return (
    <>
      {/* Outer Follower Laser Ring */}
      <motion.div
        className="fixed pointer-events-none z-[9999] top-0 left-0 -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          x: cursorSpringX,
          y: cursorSpringY,
        }}
        animate={cursorType}
        variants={cursorVariants}
        transition={{ type: "spring", stiffness: 350, damping: 26 }}
      />
      {/* Inner Precision Dot */}
      <motion.div
        className="fixed pointer-events-none z-[9999] top-0 left-0 w-1.5 h-1.5 bg-[#00bf63] rounded-full -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
    </>
  );
}
