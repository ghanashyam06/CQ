"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import CircularGallery from "@/components/ui/CircularGallery";

const stories = [
  { image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", text: "Rohan S. — Built 3 products" },
  { image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80", text: "Sneha M. — Hackathon Winner" },
  { image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80", text: "Karan T. — Landed Internship" },
  { image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80", text: "Priya K. — Open Source Contributor" },
  { image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80", text: "Aman V. — Community Leader" },
  { image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80", text: "Neha D. — Freelance Developer" },
];

export function StoriesPreview() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const textColor = mounted && resolvedTheme === "light" ? "#0a0a0a" : "#ffffff";

  return (
    <section id="stories" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3"
          >
            Stories
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold font-heading mb-4"
          >
            Real Stories.{" "}
            <span className="text-gradient">Real Growth.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-muted-foreground max-w-2xl mx-auto mb-6"
          >
            The strongest proof of impact isn&apos;t numbers — it&apos;s the builders who grew
            through the ecosystem. From first hackathons to internships, startup roles,
            collaborations, and confidence.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            href="#stories"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            Watch Builder Stories <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>
      </div>

      <div className="w-full h-[560px] relative">
        <CircularGallery
          items={stories}
          bend={3}
          textColor={textColor}
          borderRadius={0.05}
          scrollEase={0.02}
        />
      </div>
    </section>
  );
}
