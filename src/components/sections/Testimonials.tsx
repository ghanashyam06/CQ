"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import CircularGallery from "@/components/ui/CircularGallery";

export function Testimonials() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const items = [
    { image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", text: "Rohan S. - Built 3 projects" },
    { image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80", text: "Sneha M. - Hackathon Winner" },
    { image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80", text: "Karan T. - Landed Internship" },
    { image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80", text: "Priya K. - Open Source Contributor" },
    { image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80", text: "Aman V. - Community Leader" },
    { image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80", text: "Neha D. - Freelance Developer" },
  ];

  // Use black text in light mode so names are visible against light backgrounds
  const textColor = mounted && resolvedTheme === "light" ? "#0a0a0a" : "#ffffff";

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-heading mb-4"
          >
            Success <span className="text-gradient">Stories</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Hear from our members who transformed their careers by learning, building, and hacking together.
          </motion.p>
        </div>
      </div>

      <div className="w-full h-[600px] relative">
        <CircularGallery
          items={items}
          bend={3}
          textColor={textColor}
          borderRadius={0.05}
          scrollEase={0.02}
        />
      </div>
    </section>
  );
}
