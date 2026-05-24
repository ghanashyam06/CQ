"use client";

import { useEffect, useRef } from "react";
import { LogoLoop } from "@/components/ui/LogoLoop";
import { FaMicrosoft, FaGithub } from "react-icons/fa6";
import { Users, Building2, Rocket, GraduationCap, Network, Lightbulb } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const partnerCategories = [
  { label: "SummerSaaS", icon: <Rocket className="w-5 h-5" /> },
  { label: "Microsoft Sessions", icon: <FaMicrosoft className="w-5 h-5" /> },
  { label: "GradSkills", icon: <GraduationCap className="w-5 h-5" /> },
  { label: "Startup Communities", icon: <Lightbulb className="w-5 h-5" /> },
  { label: "Partner Colleges", icon: <Building2 className="w-5 h-5" /> },
  { label: "Builder Networks", icon: <Network className="w-5 h-5" /> },
  { label: "GitHub", icon: <FaGithub className="w-5 h-5" /> },
  { label: "Student Clubs", icon: <Users className="w-5 h-5" /> },
];

const logos = [
  ...partnerCategories,
  ...partnerCategories,
].map((p) => ({
  node: (
    <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
      {p.icon}
      <span className="text-sm font-semibold whitespace-nowrap">{p.label}</span>
    </div>
  ),
  title: p.label,
  href: "#",
}));

export function TrustedBy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".trusted-label", {
        opacity: 0, y: 20, duration: 0.5, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".trusted-heading", {
        opacity: 0, y: 25, duration: 0.6, delay: 0.1, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".trusted-sub", {
        opacity: 0, y: 20, duration: 0.5, delay: 0.15, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".trusted-loop", {
        opacity: 0, duration: 0.8, delay: 0.3, ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <p className="trusted-label text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2">
          Trusted By
        </p>
        <h2 className="trusted-heading text-2xl md:text-3xl font-bold text-foreground">
          Builders, Communities &amp;{" "}
          <span className="text-gradient">Innovators</span>
        </h2>
        <p className="trusted-sub text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
          CodeQuesters collaborates with hackathons, student communities, startups,
          institutions, and industry professionals to create meaningful opportunities for builders.
        </p>
      </div>

      <div className="trusted-loop relative w-full overflow-hidden flex flex-col gap-6">
        <LogoLoop
          logos={logos}
          speed={100}
          direction="left"
          logoHeight={40}
          gap={60}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="var(--background)"
        />
        <LogoLoop
          logos={[...logos].reverse()}
          speed={80}
          direction="right"
          logoHeight={40}
          gap={60}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="var(--background)"
        />
      </div>
    </section>
  );
}
