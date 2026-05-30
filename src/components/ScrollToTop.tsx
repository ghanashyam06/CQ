"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const hero = document.querySelector("#home");
    if (hero) hero.scrollIntoView();
    else window.scrollTo({ top: 0 });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full"
          style={{
            /* Dark jungle green background — clearly visible in both modes */
            background: "#1B4332",
            border: "1.5px solid #2D6A4F",
            boxShadow: "0 4px 18px rgba(27,67,50,0.55), 0 2px 8px rgba(0,0,0,0.3)",
            color: "#ffffff",
          }}
          whileHover={{
            scale: 1.1,
            background: "#2D6A4F",
            boxShadow: "0 6px 24px rgba(27,67,50,0.7), 0 2px 10px rgba(0,0,0,0.35)",
          }}
          whileTap={{ scale: 0.92 }}
        >
          <ChevronUp className="w-5 h-5" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
