"use client";

import { useEffect, useRef } from "react";
import { Users, Building2, CalendarDays, Network, Handshake } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  {
    icon: Users,
    value: "10,000+",
    target: 10000,
    label: "Builders Reached",
    description: "Active developers learning and building in our programs.",
  },
  {
    icon: Building2,
    value: "200+",
    target: 200,
    label: "Colleges Connected",
    description: "Vibrant campus coding clubs established nationwide.",
  },
  {
    icon: CalendarDays,
    value: "50+",
    target: 50,
    label: "Events & Workshops",
    description: "Expert-led sessions, bootcamps and coding workshops.",
  },
  {
    icon: Network,
    value: "100+",
    target: 100,
    label: "Industry Connections",
    description: "Mentors from top global tech firms and platforms.",
  },
  {
    icon: Handshake,
    value: "Countless",
    target: 0,
    label: "Collaborations Created",
    description: "Hackathon groups, open source projects and startup teams.",
  },
];

export function ImpactStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" };

      gsap.from(".stats-label",   { opacity: 0, y: 16, duration: 0.5, ease: "power3.out", scrollTrigger: st });
      gsap.from(".stats-heading", { opacity: 0, y: 24, duration: 0.6, delay: 0.1, ease: "power3.out", scrollTrigger: st });
      gsap.from(".stat-item",     { opacity: 0, y: 24, stagger: 0.08, duration: 0.5, ease: "power3.out",
        scrollTrigger: { trigger: ".stats-grid", start: "top 85%", toggleActions: "play none none reverse" },
      });

      counterRefs.current.forEach((ref, i) => {
        if (!ref) return;

        if (stats[i].target === 0) {
          gsap.fromTo(ref,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.5)",
              scrollTrigger: { trigger: ref, start: "top 90%", toggleActions: "play none none reverse" },
            }
          );
          return;
        }

        const counter = { value: 0 };
        gsap.fromTo(counter, { value: 0 }, {
          value: stats[i].target,
          duration: 2, ease: "expo.out",
          scrollTrigger: { trigger: ref, start: "top 90%", toggleActions: "play none none reverse" },
          onUpdate: () => {
            if (ref) ref.textContent = Math.round(counter.value).toLocaleString() + "+";
          },
          onComplete: () => {
            if (ref) {
              ref.classList.add("counter-flash");
              setTimeout(() => ref.classList.remove("counter-flash"), 800);
            }
          },
        });
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 lg:py-28 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-12 sm:mb-16">
          <p className="stats-label text-xs font-semibold tracking-[0.15em] uppercase text-primary mb-3">
            Impact
          </p>
          <h2 className="stats-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Numbers That <span className="text-gradient">Speak</span>
          </h2>
        </div>

        <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-item card p-6 flex flex-col items-center text-center group hover:border-primary/30"
            >
              <div className="icon-box w-10 h-10 mb-4">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <span
                ref={(el) => { counterRefs.current[i] = el; }}
                className="text-2xl sm:text-3xl font-bold text-foreground mb-1 font-mono tabular-nums"
              >
                {stat.value}
              </span>
              <span className="text-sm font-semibold text-foreground mb-2">{stat.label}</span>
              <p className="text-xs text-muted-foreground leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
