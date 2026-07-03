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
      const st = { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" };
      gsap.from(".cta-label",   { opacity: 0, y: 16, duration: 0.5, ease: "power3.out", scrollTrigger: st });
      gsap.from(".cta-heading", { opacity: 0, y: 24, duration: 0.7, delay: 0.1, ease: "power3.out", scrollTrigger: st });
      gsap.from(".cta-body",    { opacity: 0, y: 16, duration: 0.5, delay: 0.2, ease: "power3.out", scrollTrigger: st });
      gsap.from(".cta-btn",     { opacity: 0, y: 16, stagger: 0.08, duration: 0.4, delay: 0.3, ease: "power3.out", scrollTrigger: st });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="join" className="py-16 sm:py-20 lg:py-28 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">

          <p className="cta-label text-xs font-semibold tracking-[0.15em] uppercase text-primary mb-4">
            Ready To Build?
          </p>

          <h2 className="cta-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Ready To Build{" "}
            <span className="text-gradient-shimmer">Something Bigger?</span>
          </h2>

          <p className="cta-body text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Whether you&apos;re a student, builder, founder, mentor, or organization —
            CodeQuesters is built for people who grow through execution.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://chat.whatsapp.com/Drc3SOwUSJiJnV3ZZgQz7I"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn btn-primary w-full sm:w-auto justify-center"
            >
              <Rocket className="w-4 h-4" />
              Join Community
            </a>
            <a
              href="/contact"
              className="cta-btn btn-secondary w-full sm:w-auto justify-center"
            >
              <Handshake className="w-4 h-4" />
              Collaborate With Us
            </a>
            <a
              href="/contact"
              className="cta-btn w-full sm:w-auto px-5 py-2.5 rounded-lg text-primary font-semibold text-sm hover:bg-card border border-border hover:border-primary/40 transition-all flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Partner With CodeQuesters
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
