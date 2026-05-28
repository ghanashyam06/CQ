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
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      {/* ── Deep space background ── */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(0,191,99,0.13) 0%, rgba(0,100,50,0.06) 35%, transparent 70%), radial-gradient(ellipse 60% 80% at 20% 70%, rgba(0,212,170,0.08) 0%, transparent 55%), linear-gradient(135deg, #030b06 0%, #060e09 40%, #050d08 70%, #030b06 100%)",
          }}
        />
        {/* Subtle green grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,191,99,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,191,99,0.8) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        {/* Aurora sweep */}
        <div
          className="absolute top-0 left-0 right-0 h-[55%] opacity-25"
          style={{
            background: "linear-gradient(180deg, rgba(0,191,99,0.2) 0%, transparent 100%)",
            maskImage: "radial-gradient(ellipse 70% 100% at 55% 0%, black 0%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 100% at 55% 0%, black 0%, transparent 80%)",
          }}
        />
      </div>

      {/* ── 3D Canvas — right half on desktop, full-bleed centered on mobile ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none md:left-[45%]">
        {/* On mobile, dim the canvas so overlaid text stays legible */}
        <div className="absolute inset-0 md:hidden bg-black/30 z-[2] pointer-events-none" />
        <Scene3D camera={{ position: [0, 0, 7], fov: 52 }}>
          <HeroScene isDark={isDark} />
        </Scene3D>
      </div>

      {/* ── Ambient glow orbs ── */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        <div
          className="absolute top-[15%] left-[50%] w-[320px] sm:w-[460px] h-[320px] sm:h-[460px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,191,99,0.11) 0%, transparent 70%)",
            filter: "blur(70px)",
            animation: "breathe 7s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-[10%] left-[3%] w-[180px] sm:w-[280px] h-[180px] sm:h-[280px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(0,212,170,0.08) 0%, transparent 70%)",
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
        <div className="hero-tagline inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold mb-2 tracking-widest uppercase w-fit">
          EXPLORE &nbsp;·&nbsp; LEARN &nbsp;·&nbsp; BUILD
        </div>

        {/* Headline */}
        <h1
          ref={headlineRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading tracking-tight leading-tight mb-2 text-white"
          style={{ perspective: "600px" }}
        >
          <span className="block whitespace-nowrap">
            <span className="hero-headline-word inline-block">Built&nbsp;</span>
            <span className="hero-headline-word inline-block">for&nbsp;</span>
            <span className="hero-headline-word inline-block">Students.</span>
          </span>
          <span className="block" style={{ color: "#00ff88" }}>
            <span className="hero-headline-word inline-block">Powered&nbsp;</span>
            <span className="hero-headline-word inline-block">by&nbsp;</span>
            <span className="hero-headline-word inline-block">Builders.</span>
          </span>
        </h1>

        {/* Subheadline */}
        <p className="hero-sub text-base sm:text-lg max-w-lg mb-1.5 leading-snug text-white/75">
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
            className="hero-cta w-full sm:w-auto px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_22px_rgba(0,191,99,0.4)] hover:shadow-[0_0_36px_rgba(0,191,99,0.6)] animate-pulse-glow whitespace-nowrap"
          >
            <Rocket className="w-4 h-4 shrink-0" />
            Join The Community
          </Link>
          <Link
            ref={cta2Ref}
            href="/contact"
            className="hero-cta w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-white font-bold text-sm hover:border-primary/50 hover:bg-white/10 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
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
      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/40">
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/25 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-primary/80 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
