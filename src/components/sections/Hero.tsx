"use client";

import { useEffect, useRef, useState } from "react";
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
  const [mounted, setMounted] = useState(false);

  // Initialize magnetic buttons
  const cta1Ref = useMagnetic<HTMLAnchorElement>(0.25, 65);
  const cta2Ref = useMagnetic<HTMLAnchorElement>(0.2, 65);
  const cta3Ref = useMagnetic<HTMLAnchorElement>(0.2, 65);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme !== "light" : true;
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

      // Headline lines cinematic reveal
      tl.from(".hero-headline-line", {
        y: 80,
        clipPath: "inset(100% 0 0 0)",
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
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

      // Scroll scrub parallax for ambient/bg elements
      gsap.to(".hero-parallax-bg", {
        yPercent: 30,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".hero-parallax-scene", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* ── Background — theme-aware ── */}
      <div className="absolute inset-0 z-0">
        {/* Spotlight glow for atmosphere */}
        <div className="spotlight-glow" />
        {/* Subtle grid - dark mode only */}
        {isDark && (
          <div
            className="absolute inset-0 bg-grid"
          />
        )}
      </div>

      {/* ── 3D Canvas — right half desktop, full-bleed mobile ── */}
      <div className="hero-parallax-scene absolute inset-0 z-[1] pointer-events-none md:left-[45%]">
        {/* Mobile dim overlay — darker in dark mode, lighter in light mode */}
        <div
          className="absolute inset-0 md:hidden z-[2] pointer-events-none"
          style={{ background: isDark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.5)" }}
        />
        <Scene3D camera={{ position: [0, 0, 7], fov: 52 }}>
          <HeroScene isDark={isDark} />
        </Scene3D>
      </div>

      {/* ── Ambient glow orbs ── */}
      <div className="hero-parallax-bg absolute inset-0 z-[2] pointer-events-none">
        <div
          className="absolute top-[15%] left-[50%] w-[320px] sm:w-[460px] h-[320px] sm:h-[460px] rounded-full"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)",
            filter: "blur(70px)",
            animation: "breathe 7s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-[10%] left-[3%] w-[180px] sm:w-[280px] h-[180px] sm:h-[280px] rounded-full"
          style={{
            background: isDark
              ? "radial-gradient(circle, rgba(255,255,255,0.01) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(0,0,0,0.02) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "float 9s ease-in-out infinite",
          }}
        />
      </div>

      {/* ── Hero content ── */}
      <div
        ref={contentRef}
        className="relative z-10 w-full md:max-w-[600px] lg:max-w-[680px] flex flex-col items-center text-center md:items-start md:text-left justify-center min-h-screen px-6 sm:px-10 md:px-0 md:pl-12 lg:pl-20 xl:pl-28 pt-20 pb-28"
      >
        {/* Tagline pill */}
        <div className="hero-tagline inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-background/50 backdrop-blur-md mb-8">
          <span className="w-2 h-2 rounded-full bg-muted-foreground animate-pulse" />
          <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Explore · Learn · Build
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading tracking-[-0.03em] leading-tight mb-2"
          style={{ perspective: "600px", color: isDark ? "#ffffff" : "#091e12" }}
        >
          <span className="hero-headline-line block whitespace-nowrap text-foreground/90">
            Built for Students.
          </span>
          <span className="hero-headline-line block whitespace-nowrap text-primary neon-text mt-1 md:mt-2">
            Powered by Builders.
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="hero-sub text-base sm:text-lg max-w-lg mb-1.5 leading-snug"
          style={{ color: isDark ? "rgba(255,255,255,0.75)" : "rgba(9,30,18,0.7)" }}
        >
          CodeQuesters is a builder-first ecosystem where students grow, developers launch and founders get discovered.
        </p>

        {/* Highlight */}
        <p className="hero-highlight text-base sm:text-lg font-semibold text-primary mb-4 neon-text">
          Be the game changer. Execute with CodeQuesters.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 mb-6 w-full sm:w-auto">
          <Link
            ref={cta1Ref}
            href="/contact"
            className="hero-cta w-full sm:w-auto px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,193,122,0.3)] hover:shadow-[0_0_25px_rgba(52,211,153,0.5)] whitespace-nowrap"
          >
            <Rocket className="w-4 h-4 shrink-0" />
            Join The Community
          </Link>
          <Link
            ref={cta2Ref}
            href="/contact"
            className="hero-cta w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            style={{
              border: "1px solid var(--border)",
              background: "transparent",
              color: "var(--foreground)",
            }}
          >
            <Handshake className="w-4 h-4 shrink-0" />
            Partner With Us
          </Link>
          <Link
            ref={cta3Ref}
            href="/stories"
            className="hero-cta w-full sm:w-auto px-6 py-3.5 rounded-xl text-primary font-bold text-sm hover:bg-primary/10 transition-all flex items-center justify-center gap-2 border border-primary/30 whitespace-nowrap"
          >
            <ArrowRight className="w-4 h-4 shrink-0" />
            Builder Stories
          </Link>
        </div>

        {/* Floating keywords */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 max-w-lg">
          {floatingKeywords.map((word) => (
            <span
              key={word}
              className="hero-keyword px-3 py-1.5 rounded-full text-xs font-semibold border border-primary/20 text-primary/70 bg-primary/10 hover:bg-primary/15 hover:text-primary hover:border-primary/40 hover:shadow-[0_0_12px_rgba(0,191,99,0.2)] transition-all cursor-default"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator — absolute bottom-center ── */}
      <div
        className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        style={{ color: isDark ? "rgba(255,255,255,0.4)" : "rgba(9,30,18,0.35)" }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
        <div
          className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
          style={{ border: isDark ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(9,30,18,0.2)" }}
        >
          <div className="w-1 h-2 bg-primary/80 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
