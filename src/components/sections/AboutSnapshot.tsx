"use client";

import { useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { use3DTilt } from "@/hooks/use3DTilt";

import Threads from "@/components/ui/Threads";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const struggles = [
  "Lack of guidance",
  "Weak peer networks",
  "Limited exposure",
  "Learning without direction",
  "Difficulty finding opportunities",
];

export function AboutSnapshot() {
  const sectionRef = useRef<HTMLElement>(null);
  const strugglesCardRef = use3DTilt<HTMLDivElement>(8, 1000);
  const solutionCardRef = use3DTilt<HTMLDivElement>(8, 1000);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Left column reveal
      gsap.from(".about-left", {
        opacity: 0,
        x: -60,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Right column reveal
      gsap.from(".about-right", {
        opacity: 0,
        x: 60,
        duration: 0.8,
        delay: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // Struggle items stagger
      gsap.from(".struggle-item", {
        opacity: 0,
        x: 20,
        stagger: 0.08,
        duration: 0.5,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });

      // Solution card
      gsap.from(".about-solution", {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.6,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 relative overflow-hidden">
      {/* Threads Canvas Background */}
      <Threads color="rgba(0, 191, 99, 0.06)" count={6} speed={0.4} />

      {/* Subtle glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">

          {/* Left — narrative */}
          <div className="about-left">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
              About Us
            </p>
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 leading-tight">
              More Than a Community.{" "}
              <span className="text-gradient">A Builder Ecosystem.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              CodeQuesters was started with one mission: To bridge the gap between
              learning and real-world opportunities.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We saw students struggling — so we built an ecosystem where builders
              don&apos;t just learn. They execute, collaborate, grow, and create impact together.
            </p>
            <div className="border-l-2 border-primary pl-4 py-1">
              <p className="text-foreground font-semibold italic">
                &ldquo;Most communities share content. CodeQuesters creates outcomes.&rdquo;
              </p>
            </div>
          </div>

          {/* Right — struggles + solution */}
          <div className="about-right space-y-6">
            <div
              ref={strugglesCardRef}
              className="glass-card p-6 border border-border"
              style={{ willChange: "transform" }}
            >
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">
                We saw students struggling with:
              </p>
              <ul className="space-y-3">
                {struggles.map((s, i) => (
                  <li
                    key={i}
                    className="struggle-item flex items-center gap-3 text-muted-foreground text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div
              ref={solutionCardRef}
              className="about-solution glass-card p-6 border border-primary/20 bg-primary/5 neon-border"
              style={{ willChange: "transform" }}
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-foreground mb-1">So we built an ecosystem for execution.</p>
                  <p className="text-sm text-muted-foreground">
                    Where ambitious people find momentum, opportunities, and people
                    who genuinely want to grow together.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
