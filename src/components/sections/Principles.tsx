"use client";

import { useEffect, useRef } from "react";
import { Star, Telescope, Zap } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const principles = [
  {
    icon: Star,
    title: "Best Experience",
    description:
      "Premium hackathons, workshops, networking, and builder experiences designed to create lasting impact.",
  },
  {
    icon: Telescope,
    title: "Best Exposure",
    description:
      "Connecting builders with founders, startups, mentors, and opportunities that accelerate real growth.",
  },
  {
    icon: Zap,
    title: "Creating Impact",
    description:
      "Building growth through execution, contribution, and innovation — not just content consumption.",
  },
];

export function Principles() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".principles-label", {
        opacity: 0, y: 20, duration: 0.5, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".principles-heading", {
        opacity: 0, y: 30, duration: 0.7, delay: 0.1, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".principle-card", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.6,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".principles-grid",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="principles-label text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">
            What We Stand For
          </p>
          <h2 className="principles-heading text-3xl md:text-5xl font-bold font-heading">
            Our <span className="text-gradient">Principles</span>
          </h2>
        </div>

        <div className="principles-grid grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {principles.map((p, i) => (
            <div
              key={i}
              className="principle-card glass-card p-8 group hover:-translate-y-2 transition-all duration-300 border border-border hover:border-primary/30 hover:shadow-[0_0_30px_rgba(0,191,99,0.1)] text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,191,99,0.2)] transition-all duration-300">
                <p.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{p.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
