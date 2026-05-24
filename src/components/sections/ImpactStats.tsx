"use client";

import { useEffect, useRef } from "react";
import { Users, Building2, CalendarDays, Network, Handshake } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { icon: Users,        value: "10,000+",   target: 10000, label: "Builders Reached" },
  { icon: Building2,    value: "200+",      target: 200,   label: "Colleges Connected" },
  { icon: CalendarDays, value: "50+",       target: 50,    label: "Events & Workshops" },
  { icon: Network,      value: "100+",      target: 100,   label: "Industry Connections" },
  { icon: Handshake,    value: "Countless", target: 0,     label: "Collaborations Created" },
];

export function ImpactStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading
      gsap.from(".stats-label", {
        opacity: 0, y: 20, duration: 0.5, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".stats-heading", {
        opacity: 0, y: 30, duration: 0.7, delay: 0.1, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Stat cards stagger
      gsap.from(".stat-card", {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Counter animations
      counterRefs.current.forEach((ref, i) => {
        if (!ref || stats[i].target === 0) return;

        const counter = { value: 0 };
        gsap.to(counter, {
          value: stats[i].target,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          onUpdate: () => {
            if (ref) {
              const val = Math.round(counter.value);
              ref.textContent = val.toLocaleString() + "+";
            }
          },
        });
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="stats-label text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">
            The Ecosystem In Motion
          </p>
          <h2 className="stats-heading text-3xl md:text-5xl font-bold font-heading">
            Numbers That <span className="text-gradient">Speak</span>
          </h2>
        </div>

        <div className="stats-grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-card glass-card p-4 sm:p-6 flex flex-col items-center text-center group hover:-translate-y-1 transition-all duration-300 border border-border hover:border-primary/30 hover:shadow-[0_0_25px_rgba(0,191,99,0.1)]"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 group-hover:shadow-[0_0_12px_rgba(0,191,99,0.2)] transition-all duration-300">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <span
                ref={(el) => { counterRefs.current[i] = el; }}
                className="text-xl sm:text-2xl md:text-3xl font-black text-foreground mb-1"
              >
                {stat.value}
              </span>
              <span className="text-xs font-medium text-muted-foreground leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
