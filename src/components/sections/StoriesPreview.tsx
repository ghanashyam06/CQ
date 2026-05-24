"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CircularGallery from "@/components/ui/CircularGallery";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stories = [
  { image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", text: "Rohan S. — Built 3 products" },
  { image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80", text: "Sneha M. — Hackathon Winner" },
  { image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80", text: "Karan T. — Landed Internship" },
  { image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80", text: "Priya K. — Open Source Contributor" },
  { image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80", text: "Aman V. — Community Leader" },
  { image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80", text: "Neha D. — Freelance Developer" },
];

export function StoriesPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".stories-label", {
        opacity: 0, y: 20, duration: 0.5, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".stories-heading", {
        opacity: 0, y: 30, duration: 0.7, delay: 0.1, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".stories-sub", {
        opacity: 0, y: 20, duration: 0.6, delay: 0.15, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".stories-link", {
        opacity: 0, y: 15, duration: 0.5, delay: 0.2, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".stories-gallery", {
        opacity: 0, scale: 0.95, duration: 0.8, delay: 0.3, ease: "power3.out",
        scrollTrigger: {
          trigger: ".stories-gallery",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const textColor = mounted && resolvedTheme === "light" ? "#0a0a0a" : "#ffffff";

  return (
    <section ref={sectionRef} id="stories" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
        <div className="text-center">
          <p className="stories-label text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">
            Stories
          </p>
          <h2 className="stories-heading text-3xl md:text-5xl font-bold font-heading mb-4">
            Real Stories.{" "}
            <span className="text-gradient">Real Growth.</span>
          </h2>
          <p className="stories-sub text-muted-foreground max-w-2xl mx-auto mb-6">
            The strongest proof of impact isn&apos;t numbers — it&apos;s the builders who grew
            through the ecosystem. From first hackathons to internships, startup roles,
            collaborations, and confidence.
          </p>
          <a
            href="#stories"
            className="stories-link inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            Watch Builder Stories <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="stories-gallery w-full h-[560px] relative">
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
