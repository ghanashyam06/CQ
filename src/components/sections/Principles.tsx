"use client";

import { useEffect, useRef, useState } from "react";
import { Star, Telescope, Zap } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { use3DTilt } from "@/hooks/use3DTilt";

import SpotlightCard from "@/components/ui/SpotlightCard";
import MagicRings from "@/components/ui/MagicRings";
import SwipeCarousel from "@/components/ui/SwipeCarousel";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const principles = [
  {
    icon: Star,
    title: "Meaningful Experiences",
    description:
      "Premium hackathons, workshops, networking, and builder experiences designed to create lasting impact.",
  },
  {
    icon: Telescope,
    title: "Real Exposure",
    description:
      "Connecting builders with founders, startups, mentors, and opportunities that accelerate real growth.",
  },
  {
    icon: Zap,
    title: "Creating Impact",
    description:
      "Building growth through execution, contribution, and innovation not just content consumption.",
  },
];

interface PrincipleCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

function PrincipleCard({ icon: Icon, title, description }: PrincipleCardProps) {
  const cardRef = use3DTilt<HTMLDivElement>(12, 1000);

  return (
    <SpotlightCard className="border border-border hover:border-primary/30 p-0 overflow-hidden h-full" spotlightColor="rgba(0, 191, 99, 0.12)" spotlightSize={250}>
      <div
        ref={cardRef}
        className="principle-card p-8 group text-center cursor-default h-full"
      >
        <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,191,99,0.2)] transition-all duration-300">
          <Icon className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed text-sm">{description}</p>
      </div>
    </SpotlightCard>
  );
}

export function Principles() {
  const sectionRef = useRef<HTMLElement>(null);
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
      gsap.from(".principles-label", {
        opacity: 0, y: 20, duration: 0.5, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".principles-heading", {
        opacity: 0, y: 30, duration: 0.7, delay: 0.1, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".principle-card", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.6,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".principles-grid",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">
      {/* Ambient rotating rings */}
      <MagicRings
        count={4}
        primaryColor="rgba(0, 168, 82, 0.04)"
        secondaryColor="rgba(0, 212, 170, 0.03)"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-16">
          <p className="principles-label text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">
            What We Stand For
          </p>
          <h2 className="principles-heading text-2xl sm:text-3xl md:text-5xl font-bold font-heading">
            Our <span className="text-gradient">Principles</span>
          </h2>
        </div>

        {/* Mobile: swipe carousel */}
        {isMobile ? (
          <SwipeCarousel cardWidth="82vw" gap={16} showDots showArrows className="principles-grid -mx-4">
            {principles.map((p, i) => (
              <PrincipleCard
                key={i}
                icon={p.icon}
                title={p.title}
                description={p.description}
              />
            ))}
          </SwipeCarousel>
        ) : (
          /* Desktop: 3-column grid */
          <div className="principles-grid grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {principles.map((p, i) => (
              <PrincipleCard
                key={i}
                icon={p.icon}
                title={p.title}
                description={p.description}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
