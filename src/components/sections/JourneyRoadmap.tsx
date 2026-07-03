"use client";

import { useRef, useState, useEffect } from "react";
import { BookOpen, Code2, Rocket, IndianRupee, Target, ChevronRight } from "lucide-react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Step {
  id: string;
  title: string;
  icon: LucideIcon;
  items: string[];
}

const steps: Step[] = [
  {
    id: "LEARN",
    title: "Learn",
    icon: BookOpen,
    items: ["Workshops", "Bootcamps", "DSA Sessions", "Web Development", "AI/ML Learning"],
  },
  {
    id: "BUILD",
    title: "Build",
    icon: Code2,
    items: ["Team Projects", "Open Source", "Portfolio Development", "GitHub Contribution"],
  },
  {
    id: "HACK",
    title: "Hack",
    icon: Rocket,
    items: ["Online Hackathons", "Offline Hackathons", "Coding Challenges", "Innovation Events"],
  },
  {
    id: "EARN",
    title: "Earn",
    icon: IndianRupee,
    items: ["Freelancing Guidance", "Internships", "Startup Opportunities", "Paid Gigs"],
  },
  {
    id: "LEAD",
    title: "Lead",
    icon: Target,
    items: ["Campus Ambassador", "Mentorship", "Organizing Events", "Community Leadership"],
  },
];

function RoadmapStep({ step, index }: { step: Step; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col items-center group w-full"
    >
      {/* Icon */}
      <div className="icon-box w-14 h-14 mb-5 shrink-0 group-hover:border-primary/40 transition-all duration-200">
        <step.icon className="w-6 h-6 text-primary" />
      </div>

      {/* Card */}
      <div className="card p-5 w-full relative overflow-hidden group-hover:border-primary/30 transition-colors duration-200">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary/40 to-transparent" />
        <span className="absolute top-1 right-3 text-5xl font-black text-foreground/[0.04] select-none pointer-events-none leading-none">
          0{index + 1}
        </span>
        <h3 className="text-base font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
          {step.title}
        </h3>
        <ul className="space-y-1.5">
          {step.items.map((item, i) => (
            <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-primary/50 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function JourneyRoadmap() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardWidth = el.scrollWidth / steps.length;
      setActiveIndex(Math.round(el.scrollLeft / cardWidth));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / steps.length;
    el.scrollTo({ left: cardWidth * i, behavior: "smooth" });
  };

  return (
    <section id="journey" className="py-16 sm:py-20 lg:py-28 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
          >
            Your Complete Tech{" "}
            <span className="text-gradient-shimmer">Growth Journey</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Five stages that take you from a curious learner to a confident tech leader.
          </motion.p>
        </div>

        {/* Mobile */}
        <div className="block md:hidden">
          <div className="flex items-center justify-center gap-1 mb-4 text-xs text-muted-foreground">
            <span>Swipe to explore</span>
            <ChevronRight className="w-3.5 h-3.5 text-primary" />
          </div>

          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {steps.map((step, index) => (
              <div key={step.id} className="snap-center shrink-0" style={{ width: "80vw", maxWidth: "300px" }}>
                <RoadmapStep step={step} index={index} />
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-2 mt-5">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to step ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-5 h-2 bg-primary" : "w-2 h-2 bg-border hover:bg-muted-foreground/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden md:block relative max-w-5xl mx-auto">
          {/* Connector line */}
          <div className="hidden lg:block absolute left-0 right-0 h-px bg-border z-0" style={{ top: 28 }} />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
            className="hidden lg:block absolute left-0 right-0 h-px origin-left z-0"
            style={{ top: 28, background: "linear-gradient(90deg, var(--primary), #5be3a8)" }}
          />

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-5 relative z-10">
            {steps.map((step, index) => (
              <RoadmapStep key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
