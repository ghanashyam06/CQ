"use client";

import { useEffect, useRef, useState } from "react";
import { Users, Building2, CalendarDays, Network, Handshake } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMagnetic } from "@/hooks/useMagnetic";
import BorderGlow from "@/components/ui/BorderGlow";
import { NeuralNetworkBackground } from "@/components/ui/NeuralNetworkBackground";
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
      <BorderGlow
        glowColor="rgba(0, 255, 136, 0.25)"
        glowSize={160}
        borderRadius="1.25rem"
        className="w-full h-full"
      >
        <div
          className="relative z-10 w-full h-full bg-card backdrop-blur-xl p-5 sm:p-6 flex flex-col justify-between items-center min-h-[240px] text-center group border border-border rounded-[1.2rem] shadow-sm hover:border-primary/20 dark:hover:border-border dark:shadow-none hover:shadow-[0_0_35px_rgba(0,191,99,0.08)] transition-all duration-300"
        >
          <div className="flex flex-col items-center w-full">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 border border-primary/20 shadow-[inset_0_0_8px_rgba(0,168,82,0.06)] dark:shadow-none group-hover:bg-primary/20 group-hover:scale-110 group-hover:border-primary/40 group-hover:shadow-[0_0_15px_rgba(0,191,99,0.25)] transition-all duration-300">
              <Icon className="w-5 h-5 text-primary group-hover:rotate-6 transition-transform duration-300" />
            </div>
            <span
              ref={counterRefSetter}
              className="text-2xl sm:text-3xl md:text-4xl font-black bg-clip-text bg-gradient-to-b dark:from-white dark:via-neutral-100 dark:to-neutral-400 from-[#091e12] via-[#1a3826] to-[#3e5145] dark:group-hover:from-[#00ff88] dark:group-hover:to-[#73ffb9] group-hover:from-[#00bf63] group-hover:to-[#007a3d] mb-2 leading-none font-mono transition-colors duration-500"
            >
              {value}
            </span>
            <span className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              {label}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed mt-3 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
            {description}
          </p>
        </div>
      </BorderGlow>
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
          duration: 2.2, ease: "power2.out",
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
    <section ref={sectionRef} className="py-16 sm:py-20 lg:py-28 relative overflow-hidden bg-background">
      {/* Interactive HTML5 Canvas Neural Network Background */}
      <NeuralNetworkBackground />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-20">
          <p className="stats-label text-xs font-bold tracking-[0.25em] uppercase text-primary mb-3">
            The Ecosystem In Motion
          </p>
          <h2 className="stats-heading text-3xl sm:text-4xl md:text-6xl font-bold font-heading tracking-tight leading-none text-foreground">
            Numbers That <span className="text-gradient-shimmer">Speak</span>
          </h2>
        </div>

        {/* Mobile: swipe carousel */}
        {isMobile ? (
          <SwipeCarousel cardWidth="78vw" gap={16} showDots showArrows className="stats-grid -mx-4">
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
          /* Desktop: 5-column grid */
          <div className="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 max-w-7xl mx-auto">
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
