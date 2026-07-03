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
    title: "Meaningful Experiences",
    description:
      "Premium hackathons, workshops, networking, and builder experiences designed to create lasting impact.",
  },
  {
    icon: Telescope,
    title: "Real Exposure",
    description:
      "Connecting builders with founders, startups, mentors, and opportunities that accelerate real growth.",
  },
  {
    icon: Zap,
    title: "Creating Impact",
    description:
      "Building growth through execution, contribution, and innovation not just content consumption.",
  },
];

export function Principles() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" };
      gsap.from(".principles-label",   { opacity: 0, y: 16, duration: 0.5, ease: "power3.out", scrollTrigger: st });
      gsap.from(".principles-heading", { opacity: 0, y: 24, duration: 0.6, delay: 0.1, ease: "power3.out", scrollTrigger: st });
      gsap.from(".principle-card",     { opacity: 0, y: 24, stagger: 0.1, duration: 0.5, delay: 0.15, ease: "power3.out",
        scrollTrigger: { trigger: ".principles-grid", start: "top 85%", toggleActions: "play none none reverse" },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 lg:py-28 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <p className="principles-label text-xs font-semibold tracking-[0.15em] uppercase text-primary mb-3">
            What We Stand For
          </p>
          <h2 className="principles-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Our <span className="text-gradient">Principles</span>
          </h2>
        </div>

        <div className="principles-grid grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {principles.map((p, i) => (
            <div
              key={i}
              className="principle-card card p-7 text-center group hover:border-primary/30"
            >
              <div className="icon-box w-11 h-11 mx-auto mb-5">
                <p.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-3">
                {p.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
