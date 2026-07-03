"use client";

import { useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutSnapshot() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: "top 75%", toggleActions: "play none none reverse" };
      gsap.from(".about-left",  { opacity: 0, x: -40, duration: 0.7, ease: "power3.out", scrollTrigger: st });
      gsap.from(".about-right", { opacity: 0, x: 40,  duration: 0.7, delay: 0.15, ease: "power3.out", scrollTrigger: st });
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-16 sm:py-20 lg:py-28 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-5xl mx-auto">

          {/* Left — narrative */}
          <div className="about-left">
            <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary mb-4">About Us</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              More Than a Community.{" "}
              <span className="text-gradient-shimmer">A Builder Ecosystem.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              CodeQuesters was started with one mission: To bridge the gap between
              learning and real-world opportunities.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We built a space where builders don&apos;t just consume content — they
              collaborate, execute ideas, gain exposure, and grow through real experiences
              together.
            </p>
            <blockquote className="border-l-2 border-primary pl-4 py-0.5">
              <p className="text-foreground font-medium italic text-sm">
                &ldquo;Most communities share content. CodeQuesters creates outcomes.&rdquo;
              </p>
            </blockquote>
          </div>

          {/* Right — solution card */}
          <div className="about-right">
            <div className="card p-6 sm:p-8 border border-border">
              <div className="flex items-start gap-4">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-lg text-foreground mb-3">
                    Built for ambitious builders.
                  </p>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    CodeQuesters is a collaborative ecosystem where students, developers,
                    and creators learn together, build real-world projects, explore
                    opportunities, and grow through execution.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      "Real-world collaboration",
                      "Project-based learning",
                      "Strong peer network",
                      "Growth opportunities",
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 rounded-lg border border-border px-3 py-2.5"
                        style={{ background: "color-mix(in srgb, var(--border) 30%, var(--background-card))" }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        <span className="text-sm text-muted-foreground">{item}</span>
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
