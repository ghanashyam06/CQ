"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Building2, CalendarDays, Network, Handshake } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMagnetic } from "@/hooks/useMagnetic";
import SwipeCarousel from "@/components/ui/SwipeCarousel";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { 
    icon: Users, 
    value: "10,000+", 
    target: 10000, 
    label: "Builders Reached",
    description: "Active developers learning and building in our programs."
  },
  { 
    icon: Building2, 
    value: "200+", 
    target: 200, 
    label: "Colleges Connected",
    description: "Vibrant campus coding clubs established nationwide."
  },
  { 
    icon: CalendarDays, 
    value: "50+", 
    target: 50, 
    label: "Events & Workshops",
    description: "Expert-led sessions, bootcamps and coding workshops."
  },
  { 
    icon: Network, 
    value: "100+", 
    target: 100, 
    label: "Industry Connections",
    description: "Mentors from top global tech firms and platforms."
  },
  { 
    icon: Handshake, 
    value: "Countless", 
    target: 0, 
    label: "Collaborations Created",
    description: "Hackathon groups, open source projects and startup teams."
  },
];

interface StatCardProps {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  target: number;
  label: string;
  description: string;
  index: number;
  counterRefSetter: (el: HTMLSpanElement | null) => void;
}

function StatCard({ icon: Icon, value, label, description, counterRefSetter }: StatCardProps) {
  const cardRef = useMagnetic<HTMLDivElement>(0.12, 140);

  return (
    <div
      ref={cardRef}
      className="stat-card w-full h-full"
      style={{ willChange: "transform" }}
    >
      <div
        className="relative z-10 w-full h-full bg-background/80 backdrop-blur-sm p-6 flex flex-col justify-between items-center min-h-[220px] text-center group border border-border/50 rounded-2xl hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
      >
        <div className="flex flex-col items-center w-full">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-105 transition-all duration-300">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <span
            ref={counterRefSetter}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-2 leading-none font-mono"
          >
            {value}
          </span>
          <span className="text-sm font-semibold text-foreground/80 group-hover:text-primary transition-colors duration-300">
            {label}
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-4">
          {description}
        </p>
      </div>
    </div>
  );
}

export function ImpactStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
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

      counterRefs.current.forEach((ref, i) => {
        if (!ref) return;

        if (stats[i].target === 0) {
          gsap.fromTo(
            ref,
            { scale: 0.7, opacity: 0, filter: "blur(4px)" },
            {
              scale: 1, opacity: 1, filter: "blur(0px)",
              duration: 1.5, ease: "back.out(1.5)",
              scrollTrigger: {
                trigger: ref, start: "top 90%",
                toggleActions: "play none none reverse",
              },
            }
          );
          return;
        }

        const counter = { value: 0 };
        gsap.fromTo(counter, { value: 0 }, {
          value: stats[i].target,
          duration: 2.5, ease: "expo.out",
          scrollTrigger: {
            trigger: ref, start: "top 90%",
            toggleActions: "play none none reverse",
          },
          onUpdate: () => {
            if (ref) {
              ref.textContent = Math.round(counter.value).toLocaleString() + "+";
            }
          },
          onComplete: () => {
            if (ref) {
              ref.classList.add("counter-flash");
              setTimeout(() => ref.classList.remove("counter-flash"), 900);
            }
          },
        });
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 lg:py-32 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <p className="stats-label text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
            Impact
          </p>
          <h2 className="stats-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-foreground">
            Numbers That <span className="text-primary">Speak</span>
          </h2>
        </div>

        {/* Mobile: swipe carousel */}
        {isMobile ? (
          <SwipeCarousel cardWidth="85vw" gap={16} showDots showArrows className="stats-grid -mx-4">
            {stats.map((stat, i) => (
              <StatCard
                key={i}
                icon={stat.icon}
                value={stat.value}
                target={stat.target}
                label={stat.label}
                description={stat.description}
                index={i}
                counterRefSetter={(el) => { counterRefs.current[i] = el; }}
              />
            ))}
          </SwipeCarousel>
        ) : (
          /* Desktop: grid layout */
          <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-6xl mx-auto">
            {stats.map((stat, i) => (
              <StatCard
                key={i}
                icon={stat.icon}
                value={stat.value}
                target={stat.target}
                label={stat.label}
                description={stat.description}
                index={i}
                counterRefSetter={(el) => { counterRefs.current[i] = el; }}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
