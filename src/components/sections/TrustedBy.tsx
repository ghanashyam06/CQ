"use client";

import { useEffect, useRef } from "react";
import { LogoLoop } from "@/components/ui/LogoLoop";
import { FaGithub } from "react-icons/fa6";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const partners = [
  {
    label: "GreatHire",
    color: "#1a1a1a",
    bg: "#f5f5f5",
    node: (
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/10 hover:border-primary/40 transition-all">
        <span className="text-sm font-bold text-foreground whitespace-nowrap tracking-tight">GreatHire</span>
      </div>
    ),
  },
  {
    label: "Supervity",
    node: (
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/10 hover:border-primary/40 transition-all">
        <span className="text-lg font-black text-foreground leading-none">&amp;</span>
        <span className="text-sm font-bold text-foreground whitespace-nowrap tracking-tight">Supervity</span>
      </div>
    ),
  },
  {
    label: "GradSkills",
    node: (
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/10 hover:border-primary/40 transition-all">
        <span className="text-sm font-bold whitespace-nowrap tracking-tight">
          <span className="text-orange-500">Grad</span><span className="text-foreground">Skills</span>
        </span>
      </div>
    ),
  },
  {
    label: "CS CoWorking Spaces",
    node: (
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/10 hover:border-primary/40 transition-all">
        <div className="grid grid-cols-2 gap-0.5 w-4 h-4 shrink-0">
          <div className="w-1.5 h-1.5 rounded-sm bg-red-500" />
          <div className="w-1.5 h-1.5 rounded-sm bg-red-500" />
          <div className="w-1.5 h-1.5 rounded-sm bg-red-500" />
          <div className="w-1.5 h-1.5 rounded-sm bg-red-500" />
        </div>
        <span className="text-sm font-bold text-foreground whitespace-nowrap tracking-tight">CS CoWorking Spaces</span>
      </div>
    ),
  },
  {
    label: "DEOREL Squad",
    node: (
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/10 hover:border-primary/40 transition-all">
        <span className="text-sm font-black text-foreground whitespace-nowrap tracking-widest uppercase">DEOREL<span className="text-primary">®</span> SQUAD</span>
      </div>
    ),
  },
  {
    label: "Rocket",
    node: (
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/10 hover:border-primary/40 transition-all">
        <svg className="w-4 h-4 text-foreground shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L8 8H4l4 4-2 10 6-4 6 4-2-10 4-4h-4L12 2z"/></svg>
        <span className="text-sm font-bold text-foreground whitespace-nowrap tracking-tight">rocket</span>
      </div>
    ),
  },
  {
    label: "OSEN",
    node: (
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/10 hover:border-primary/40 transition-all">
        <div className="w-5 h-5 rounded-md bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shrink-0">
          <span className="text-white text-[8px] font-black">O</span>
        </div>
        <span className="text-sm font-bold text-blue-400 whitespace-nowrap tracking-wider">OSEN</span>
      </div>
    ),
  },
  {
    label: "GitHub",
    node: (
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/10 hover:border-primary/40 transition-all">
        <FaGithub className="w-5 h-5 text-foreground shrink-0" />
        <span className="text-sm font-bold text-foreground whitespace-nowrap tracking-tight">GitHub</span>
      </div>
    ),
  },
  {
    label: "MeDo",
    node: (
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/10 hover:border-primary/40 transition-all">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shrink-0" />
        <span className="text-sm font-bold text-foreground whitespace-nowrap tracking-tight">MeDo</span>
      </div>
    ),
  },
  {
    label: "ICS",
    node: (
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 border border-white/10 hover:border-primary/40 transition-all">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-400 to-sky-300 flex items-center justify-center shrink-0">
          <span className="text-white text-[7px] font-black">ICS</span>
        </div>
        <span className="text-sm font-bold text-foreground whitespace-nowrap tracking-tight">ICS</span>
      </div>
    ),
  },
];

const logos = partners.map((p) => ({
  node: p.node,
  title: p.label,
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
    <section ref={sectionRef} className="py-10 sm:py-14 lg:py-20 relative border-y border-border overflow-hidden">
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
          institutions, and industry professionals to create meaningful opportunities for everyone.
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
