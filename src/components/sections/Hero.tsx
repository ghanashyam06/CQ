"use client";

import { useEffect, useRef } from "react";
import { Rocket, Handshake, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const floatingKeywords = [
  "Build", "Innovate", "Collaborate", "Learn",
  "Network", "Create", "Hack", "Grow", "Lead", "Impact",
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(".hero-tagline", {
        opacity: 0, y: 16, duration: 0.5, ease: "power3.out",
      });

      tl.from(".hero-headline-line", {
        opacity: 0, y: 32, duration: 0.8, stagger: 0.1, ease: "power3.out",
      }, "-=0.2");

      tl.from(".hero-sub", {
        opacity: 0, y: 16, duration: 0.5, ease: "power3.out",
      }, "-=0.3");

      tl.from(".hero-highlight", {
        opacity: 0, y: 12, duration: 0.4, ease: "power3.out",
      }, "-=0.2");

      tl.from(".hero-cta", {
        opacity: 0, y: 16, stagger: 0.08, duration: 0.4, ease: "power3.out",
      }, "-=0.2");

      tl.from(".hero-keyword", {
        opacity: 0, scale: 0.8, stagger: 0.04, duration: 0.3, ease: "power3.out",
      }, "-=0.2");

      tl.from(".hero-scroll", {
        opacity: 0, y: -8, duration: 0.4, ease: "power2.out",
      }, "-=0.1");

    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-24 overflow-hidden"
    >
      {/* Top ambient — in dark: subtle green fog; in light: almost invisible */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 0%, color-mix(in srgb, var(--primary) 7%, transparent), transparent 65%)",
        }}
      />

      <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center text-center">

        {/* Tagline pill */}
        <div className="hero-tagline badge-pill mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          Explore · Learn · Build
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
          <span className="hero-headline-line block text-foreground">
            Built for Students.
          </span>
          <span className="hero-headline-line block text-gradient mt-1">
            Powered by Builders.
          </span>
        </h1>

        {/* Subheadline */}
        <p className="hero-sub text-base sm:text-lg text-muted-foreground max-w-xl mb-2 leading-relaxed">
          CodeQuesters is a builder-first ecosystem where students grow, developers
          launch and founders get discovered.
        </p>

        {/* Highlight */}
        <p className="hero-highlight text-base sm:text-lg font-semibold text-primary mb-8">
          Be the game changer. Execute with CodeQuesters.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-10 w-full justify-center">
          <Link
            href="/contact"
            className="hero-cta btn-primary w-full sm:w-auto justify-center"
          >
            <Rocket className="w-4 h-4 shrink-0" />
            Join The Community
          </Link>
          <Link
            href="/contact"
            className="hero-cta btn-secondary w-full sm:w-auto justify-center"
          >
            <Handshake className="w-4 h-4 shrink-0" />
            Partner With Us
          </Link>
          <Link
            href="/stories"
            className="hero-cta w-full sm:w-auto px-5 py-2.5 rounded-lg text-primary font-semibold text-sm hover:bg-card border border-border hover:border-primary/40 transition-all flex items-center justify-center gap-2"
          >
            <ArrowRight className="w-4 h-4 shrink-0" />
            Builder Stories
          </Link>
        </div>

        {/* Floating keywords */}
        <div className="flex flex-wrap justify-center gap-2 max-w-lg">
          {floatingKeywords.map((word) => (
            <span
              key={word}
              className="hero-keyword px-3 py-1 rounded-full text-xs font-medium border border-border text-muted-foreground hover:border-primary/40 hover:text-primary transition-all cursor-default"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50">
        <span className="text-[10px] tracking-[0.15em] uppercase">Scroll</span>
        <div className="w-4 h-7 rounded-full border border-border flex items-start justify-center pt-1.5">
          <div className="w-0.5 h-1.5 bg-primary/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
