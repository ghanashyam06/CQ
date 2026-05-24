"use client";

import { useEffect, useRef } from "react";
import { Trophy, BookOpen, Network, Briefcase, Users, Lightbulb } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { use3DTilt } from "@/hooks/use3DTilt";
import StarBorder from "@/components/ui/StarBorder";
import SpotlightCard from "@/components/ui/SpotlightCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const features = [
  {
    icon: Trophy,
    title: "Hackathons",
    description: "Compete, collaborate, and solve real-world problems in high-energy builder competitions.",
  },
  {
    icon: BookOpen,
    title: "Workshops",
    description: "Practical execution-first learning experiences led by industry professionals.",
  },
  {
    icon: Network,
    title: "Networking",
    description: "Connect with founders, mentors, creators, and builders who are building the future.",
  },
  {
    icon: Briefcase,
    title: "Opportunities",
    description: "Internships, collaborations, startup exposure, and real growth pathways.",
  },
  {
    icon: Users,
    title: "Community",
    description: "A support ecosystem where ambitious people grow together through execution.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Building future-focused products, platforms, and tools that create real impact.",
  },
];

interface ServiceCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

function ServiceCard({ icon: Icon, title, description }: ServiceCardProps) {
  const cardRef = use3DTilt<HTMLDivElement>(10, 1000);

  return (
    <StarBorder speed="6s">
      <SpotlightCard className="p-0 border-none bg-transparent rounded-none h-full" spotlightColor="rgba(0, 191, 99, 0.12)" spotlightSize={200}>
        <div
          ref={cardRef}
          className="service-card p-7 group cursor-default h-full"
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(0,191,99,0.2)] transition-all duration-300">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
        </div>
      </SpotlightCard>
    </StarBorder>
  );
}

export function WhatWeDo() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.from(".services-label", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".services-heading", {
        opacity: 0,
        y: 30,
        duration: 0.7,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".services-sub", {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Cards stagger from bottom
      gsap.from(".service-card", {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.6,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".service-cards-grid",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="events" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="services-label text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
            What We Do
          </p>
          <h2 className="services-heading text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4 leading-tight">
            Built Around{" "}
            <span className="text-gradient">Builder Growth</span>
          </h2>
          <p className="services-sub text-muted-foreground max-w-xl mx-auto">
            Every initiative is designed with one goal — helping builders grow through execution.
          </p>
        </div>

        <div className="service-cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <ServiceCard
              key={i}
              icon={f.icon}
              title={f.title}
              description={f.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
