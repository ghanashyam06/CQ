"use client";

import { useEffect, useRef } from "react";
import { Trophy, BookOpen, Network, Briefcase, Users, Lightbulb } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: Briefcase,
    label: "Grow",
    title: "Opportunities",
    description: "Internships, collaborations, startup exposure, and real growth pathways.",
  },
  {
    icon: Trophy,
    label: "Compete",
    title: "Hackathons",
    description: "Compete, collaborate, and solve real-world problems in high-energy builder competitions.",
  },
  {
    icon: BookOpen,
    label: "Learn",
    title: "Workshops",
    description: "Practical execution-first learning experiences led by industry professionals.",
  },
  {
    icon: Users,
    label: "Together",
    title: "Community",
    description: "A support ecosystem where ambitious people grow together through execution.",
  },
  {
    icon: Network,
    label: "Connect",
    title: "Networking",
    description: "Connect with founders, mentors, creators, and builders who are building the future.",
  },
  {
    icon: Lightbulb,
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
      const st = { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" };

      gsap.from(".whatwedo-label",   { opacity: 0, y: 16, duration: 0.5, ease: "power3.out", scrollTrigger: st });
      gsap.from(".whatwedo-heading", { opacity: 0, y: 24, duration: 0.6, delay: 0.1, ease: "power3.out", scrollTrigger: st });
      gsap.from(".whatwedo-sub",     { opacity: 0, y: 16, duration: 0.5, delay: 0.2, ease: "power3.out", scrollTrigger: st });
      gsap.from(".feature-card", {
        opacity: 0, y: 28, stagger: 0.08, duration: 0.5, ease: "power3.out",
        scrollTrigger: { trigger: ".features-grid", start: "top 85%", toggleActions: "play none none reverse" },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="events" className="py-16 sm:py-20 lg:py-28 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12 sm:mb-16">
          <p className="whatwedo-label text-xs font-semibold tracking-[0.15em] uppercase text-primary mb-3">
            What We Do
          </p>
          <h2 className="whatwedo-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Built Around{" "}
            <span className="text-gradient">Builder Growth</span>
          </h2>
          <p className="whatwedo-sub text-muted-foreground max-w-xl mx-auto">
            Every initiative is designed with one goal — helping builders grow through execution.
          </p>
        </div>

        <div className="features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto">
          {features.map((item, i) => (
            <div
              key={i}
              className="feature-card card p-6 group hover:border-primary/30 transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="icon-box w-10 h-10">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                  {item.label}
                </span>
              </div>
              <h3 className="font-semibold text-foreground text-base mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
