"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function GroundRule() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".ground-rule-card", {
        opacity: 0,
        scale: 0.92,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".ground-rule-icon", {
        opacity: 0,
        scale: 0.5,
        rotation: -180,
        duration: 0.8,
        delay: 0.2,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".ground-rule-text", {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ground-rule-card max-w-4xl mx-auto glass-card border border-primary/25 bg-primary/5 p-10 md:p-14 text-center relative overflow-hidden neon-border">
          {/* Glow */}
          <div className="absolute inset-0 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <div className="ground-rule-icon w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>

            <p className="ground-rule-text text-2xl md:text-3xl font-black text-foreground mb-4">
              🚨 We Never Charge Builders.
            </p>

            <p className="ground-rule-text text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-6 leading-relaxed">
              We never charge students or builders to access opportunities, events,
              workshops, or growth initiatives.
            </p>

            <div className="ground-rule-text inline-block border-t border-primary/30 pt-4">
              <p className="text-primary font-semibold text-sm md:text-base neon-text">
                Opportunities should be accessible to everyone willing to build.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
