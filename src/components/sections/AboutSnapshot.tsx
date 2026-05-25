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

export function AboutSnapshot() {
  const sectionRef = useRef<HTMLElement>(null);
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

      // Solution card
      gsap.from(".about-solution", {
        opacity: 0,
        y: 30,
        scale: 0.95,
        duration: 0.6,
        delay: 0.3,
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
    <section
      ref={sectionRef}
      id="about"
      className="py-24 relative overflow-hidden"
    >
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
              <span className="text-gradient">
                A Builder Ecosystem.
              </span>
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-6">
              CodeQuesters was started with one mission: To bridge the gap
              between learning and real-world opportunities.
            </p>

            <p className="text-muted-foreground leading-relaxed mb-8">
              We built a space where builders don&apos;t just consume content —
              they collaborate, execute ideas, gain exposure, and grow through
              real experiences together.
            </p>

            <div className="border-l-2 border-primary pl-4 py-1">
              <p className="text-foreground font-semibold italic">
                &ldquo;Most communities share content. CodeQuesters creates outcomes.&rdquo;
              </p>
            </div>
          </div>

          {/* Right — solution only */}
          <div className="about-right">
            <div
              ref={solutionCardRef}
              className="about-solution glass-card p-8 border border-primary/20 bg-primary/5 neon-border"
              style={{ willChange: "transform" }}
            >
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-1" />

                <div>
                  <p className="font-bold text-xl text-foreground mb-3">
                    Built for ambitious builders.
                  </p>

                  <p className="text-muted-foreground leading-relaxed">
                    CodeQuesters is a collaborative ecosystem where students,
                    developers, and creators learn together, build real-world
                    projects, explore opportunities, and grow through execution.
                  </p>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "Real-world collaboration",
                      "Project-based learning",
                      "Strong peer network",
                      "Growth opportunities",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 rounded-lg border border-border/50 px-3 py-2 bg-background/30"
                      >
                        <span className="w-2 h-2 rounded-full bg-primary" />

                        <span className="text-sm text-muted-foreground">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}