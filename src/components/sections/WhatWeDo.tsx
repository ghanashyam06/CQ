"use client";

import { useEffect, useRef } from "react";
import { Trophy, BookOpen, Network, Briefcase, Users, Lightbulb } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagicBento, { type MagicBentoItem } from "@/components/ui/MagicBento";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features: MagicBentoItem[] = [
  {
    icon: <Trophy className="w-7 h-7 text-primary" />,
    label: "Compete",
    title: "Hackathons",
    description: "Compete, collaborate, and solve real-world problems in high-energy builder competitions.",
  },
  {
    icon: <BookOpen className="w-7 h-7 text-primary" />,
    label: "Learn",
    title: "Workshops",
    description: "Practical execution-first learning experiences led by industry professionals.",
  },
  {
    icon: <Network className="w-7 h-7 text-primary" />,
    label: "Connect",
    title: "Networking",
    description: "Connect with founders, mentors, creators, and builders who are building the future.",
  },
  {
    icon: <Briefcase className="w-7 h-7 text-primary" />,
    label: "Grow",
    title: "Opportunities",
    description: "Internships, collaborations, startup exposure, and real growth pathways.",
  },
  {
    icon: <Users className="w-7 h-7 text-primary" />,
    label: "Together",
    title: "Community",
    description: "A support ecosystem where ambitious people grow together through execution.",
  },
  {
    icon: <Lightbulb className="w-7 h-7 text-primary" />,
    label: "Create",
    title: "Innovation",
    description: "Building future-focused products, platforms, and tools that create real impact.",
  },
];

export function WhatWeDo() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const st = {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      };

      gsap.from(".services-label",   { opacity: 0, y: 20, duration: 0.5, ease: "power3.out", scrollTrigger: st });
      gsap.from(".services-heading", { opacity: 0, y: 30, duration: 0.7, delay: 0.1, ease: "power3.out", scrollTrigger: st });
      gsap.from(".services-sub",     { opacity: 0, y: 20, duration: 0.6, delay: 0.2, ease: "power3.out", scrollTrigger: st });
      gsap.from(".mb-card", {
        opacity: 0,
        y: 40,
        stagger: 0.08,
        duration: 0.6,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-bento",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="events" className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <p className="services-label text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
            What We Do
          </p>
          <h2 className="services-heading text-2xl sm:text-3xl md:text-5xl font-bold font-heading mb-4 leading-tight">
            Built Around{" "}
            <span className="text-gradient">Builder Growth</span>
          </h2>
          <p className="services-sub text-muted-foreground max-w-xl mx-auto">
            Every initiative is designed with one goal — helping builders grow through execution.
          </p>
        </div>

        <div className="services-bento max-w-6xl mx-auto">
          <MagicBento
            items={features}
            gridCols="repeat(auto-fit, minmax(min(100%, 280px), 1fr))"
            enableStars
            enableSpotlight
            enableBorderGlow
            enableTilt
            enableMagnetism
            clickEffect
            spotlightRadius={320}
            particleCount={10}
          />
        </div>
      </div>
    </section>
  );
}
