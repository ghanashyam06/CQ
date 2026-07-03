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
      const st = { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" };
      gsap.from(".ground-card",  { opacity: 0, scale: 0.97, y: 24, duration: 0.7, ease: "power3.out", scrollTrigger: st });
      gsap.from(".ground-text",  { opacity: 0, y: 16, stagger: 0.1, duration: 0.5, delay: 0.2, ease: "power3.out", scrollTrigger: st });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ground-card max-w-3xl mx-auto card p-8 sm:p-10 md:p-14 text-center border-primary/20">
          <div className="ground-text icon-box w-12 h-12 mx-auto mb-6">
            <ShieldCheck className="w-6 h-6 text-primary" />
          </div>

          <p className="ground-text text-2xl md:text-3xl font-bold text-foreground mb-4">
            🚨 We Never Charge Builders.
          </p>

          <p className="ground-text text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-6 leading-relaxed">
            We never charge students or builders to access opportunities, events,
            workshops, or growth initiatives.
          </p>

          <div className="ground-text inline-block border-t border-border pt-5">
            <p className="text-primary font-semibold text-sm md:text-base">
              Opportunities should be accessible to everyone willing to build.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
