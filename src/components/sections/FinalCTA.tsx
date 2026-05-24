"use client";

import { useEffect, useRef } from "react";
import { Rocket, Handshake, Mail } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".cta-card", {
        opacity: 0,
        scale: 0.92,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".cta-content > *", {
        opacity: 0,
        y: 25,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="join" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[700px] bg-primary/8 blur-[140px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="cta-card glass-card max-w-5xl mx-auto p-12 md:p-20 text-center flex flex-col items-center border border-primary/20 shadow-[0_0_60px_rgba(0,191,99,0.08)] neon-border">
          <div className="cta-content flex flex-col items-center">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
              Ready To Build?
            </p>

            <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight text-foreground">
              Ready To Build{" "}
              <span className="text-gradient">Something Bigger?</span>
            </h2>

            <p className="text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              Whether you&apos;re a student, builder, founder, mentor, or organization —
              CodeQuesters is built for people who grow through execution.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
              <a
                href="#"
                className="px-8 py-4 w-full sm:w-auto rounded-xl bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 transition-all shadow-[0_0_22px_rgba(0,191,99,0.4)] hover:shadow-[0_0_36px_rgba(0,191,99,0.6)] flex items-center justify-center gap-2 animate-pulse-glow"
              >
                <Rocket className="w-5 h-5" />
                Join Community
              </a>
              <a
                href="#contact"
                className="px-8 py-4 w-full sm:w-auto rounded-xl glass-card text-foreground font-bold text-base hover:border-primary/40 transition-all flex items-center justify-center gap-2"
              >
                <Handshake className="w-5 h-5" />
                Collaborate With Us
              </a>
              <a
                href="#contact"
                className="px-8 py-4 w-full sm:w-auto rounded-xl text-primary font-bold text-base hover:bg-primary/10 transition-all flex items-center justify-center gap-2 border border-primary/20"
              >
                <Mail className="w-5 h-5" />
                Partner With CodeQuesters
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
