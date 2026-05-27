"use client";

import { useEffect, useRef } from "react";
import { Rocket, Handshake, ArrowRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useMagnetic } from "@/hooks/useMagnetic";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Scene3D = dynamic(
  () => import("@/components/three/Scene3D").then((m) => ({ default: m.Scene3D })),
  { ssr: false }
);

const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => ({ default: m.HeroScene })),
  { ssr: false }
);

const floatingKeywords = [
  "Build", "Innovate", "Collaborate", "Learn",
  "Network", "Create", "Hack", "Grow", "Lead", "Impact",
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  // Initialize magnetic buttons
  const cta1Ref = useMagnetic<HTMLAnchorElement>(0.25, 65);
  const cta2Ref = useMagnetic<HTMLAnchorElement>(0.2, 65);
  const cta3Ref = useMagnetic<HTMLAnchorElement>(0.2, 65);

  const isDark = resolvedTheme !== "light";
  const particleColors = isDark 
    ? ["#00BF63", "#00ff88", "#ffffff"] 
    : ["#00BF63", "#007a3d", "#555555"];

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Tagline pill
      tl.from(".hero-tagline", {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
      });

      // Headline characters
      tl.from(".hero-headline-word", {
        opacity: 0,
        y: 50,
        rotateX: -40,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out",
      }, "-=0.3");

      // Subheadline
      tl.from(".hero-sub", {
        opacity: 0,
        y: 25,
        duration: 0.6,
        ease: "power3.out",
      }, "-=0.4");

      // Highlight
      tl.from(".hero-highlight", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power3.out",
      }, "-=0.3");

      // CTAs
      tl.from(".hero-cta", {
        opacity: 0,
        y: 25,
        stagger: 0.1,
        duration: 0.5,
        ease: "power3.out",
      }, "-=0.2");

      // Keywords
      tl.from(".hero-keyword", {
        opacity: 0,
        scale: 0.6,
        stagger: 0.04,
        duration: 0.4,
        ease: "back.out(1.5)",
      }, "-=0.3");

      // Scroll indicator
      tl.from(".hero-scroll-indicator", {
        opacity: 0,
        y: -10,
        duration: 0.5,
        ease: "power2.out",
      }, "-=0.2");

      // Gentle floating animation for keyword badges
      gsap.utils.toArray(".hero-keyword").forEach((el, i) => {
        const htmlEl = el as HTMLElement;
        gsap.to(htmlEl, {
          y: "random(-6, 6)",
          x: "random(-4, 4)",
          duration: "random(2.5, 4)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.08,
        });
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="section-viewport relative pt-16 pb-12 overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* 3D Background */}
      <Scene3D camera={{ position: [0, 0, 6], fov: 60 }}>
        <HeroScene isDark={isDark} />
      </Scene3D>

      {/* Radial glow — animated aurora */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 w-[300px] sm:w-[500px] lg:w-[700px] h-[300px] sm:h-[500px] lg:h-[700px] bg-primary/8 blur-[160px] rounded-full"
          style={{ animation: "breathe 6s ease-in-out infinite" }}
        />
        <div
          className="absolute top-[40%] left-[30%] w-[150px] sm:w-[250px] lg:w-[350px] h-[150px] sm:h-[250px] lg:h-[350px] bg-[#00d4aa]/[0.06] blur-[120px] rounded-full animate-float"
        />
      </div>

      <div
        ref={contentRef}
        className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center"
      >
        {/* Tagline pill */}
        <div className="hero-tagline inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs sm:text-sm font-semibold mb-8 tracking-widest uppercase shadow-[0_0_8px_rgba(0,168,82,0.08)] dark:shadow-none dark:neon-border">
          EXPLORE &nbsp;·&nbsp; LEARN &nbsp;·&nbsp; BUILD
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-heading tracking-tight max-w-5xl leading-[1.1] mb-5 text-foreground"
          style={{ perspective: "600px" }}
        >
          <span className="hero-headline-word inline-block">Built&nbsp;</span>
          <span className="hero-headline-word inline-block">for&nbsp;</span>
          <span className="hero-headline-word inline-block">Students.</span>
          <br />
          <span className="hero-headline-word inline-block text-gradient-shimmer">Powered&nbsp;</span>
          <span className="hero-headline-word inline-block text-gradient-shimmer">by&nbsp;</span>
          <span className="hero-headline-word inline-block text-gradient-shimmer">Builders.</span>
        </h1>

        {/* Subheadline */}
        <p className="hero-sub text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-3 leading-relaxed px-2">
          CodeQuesters is a builder-first ecosystem where students grow, developers launch and founders get discovered.
        </p>

        {/* Highlight */}
        <p className="hero-highlight text-sm sm:text-base font-semibold text-primary mb-10 neon-text">
          Be the game changer. Execute with CodeQuesters.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-lg sm:max-w-none justify-center mb-14">
          <Link
            ref={cta1Ref}
            href="/contact"
            className="hero-cta px-7 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm sm:text-base hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_22px_rgba(0,191,99,0.4)] hover:shadow-[0_0_36px_rgba(0,191,99,0.6)] animate-pulse-glow"
          >
            <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
            Join The Community
          </Link>
          <Link
            ref={cta2Ref}
            href="/contact"
            className="hero-cta px-7 py-3.5 rounded-xl glass-card text-foreground font-bold text-sm sm:text-base hover:border-primary/40 transition-all flex items-center justify-center gap-2"
          >
            <Handshake className="w-4 h-4 sm:w-5 sm:h-5" />
            Partner With Us
          </Link>
          <Link
            ref={cta3Ref}
            href="/stories"
            className="hero-cta px-7 py-3.5 rounded-xl text-primary font-bold text-sm sm:text-base hover:bg-primary/10 transition-all flex items-center justify-center gap-2 border border-primary/20"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            Builder Stories
          </Link>
        </div>

        {/* Floating keywords */}
        <div className="flex flex-wrap justify-center gap-2 max-w-xl px-2 mb-12">
          {floatingKeywords.map((word) => (
            <span
              key={word}
              className="hero-keyword px-3 py-1.5 rounded-full text-xs font-semibold border border-primary/20 text-primary/70 bg-primary/10 dark:bg-primary/5 hover:bg-primary/15 hover:text-primary hover:border-primary/40 hover:shadow-[0_0_12px_rgba(0,191,99,0.2)] transition-all cursor-default"
            >
              {word}
            </span>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll-indicator flex flex-col items-center gap-2 text-muted-foreground/50">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-primary rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
