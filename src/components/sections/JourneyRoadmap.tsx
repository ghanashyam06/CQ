"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Code2, Rocket, IndianRupee, Target, ChevronRight } from "lucide-react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { LucideIcon } from "lucide-react";

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
  const markerRef = useMagnetic<HTMLDivElement>(0.3, 40);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="flex flex-col items-center group w-full"
    >
      {/* Icon marker */}
      <motion.div
        ref={markerRef}
        animate={{
          boxShadow: [
            "0 0 14px rgba(0, 191, 99, 0.18)",
            "0 0 28px rgba(0, 191, 99, 0.45)",
            "0 0 14px rgba(0, 191, 99, 0.18)",
          ],
        }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shrink-0 transition-all duration-300
          bg-background border-2 border-primary cursor-pointer shadow-[0_2px_12px_rgba(0,80,40,0.06)] dark:shadow-none
          group-hover:scale-110 group-hover:bg-primary/10"
      >
        <step.icon className="w-7 h-7 text-foreground group-hover:text-primary transition-colors duration-300" />
      </motion.div>

      {/* Card */}
      <div
        className="glass-card p-5 w-full relative overflow-hidden
          border border-border hover:border-primary/30 transition-colors duration-300"
      >
        {/* Faint step number watermark */}
        <span className="absolute top-1 right-3 text-6xl font-black text-foreground/[0.06] dark:text-foreground/[0.04] select-none pointer-events-none leading-none">
          0{index + 1}
        </span>
        {/* Green top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/60 to-transparent rounded-t-xl" />

        <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
          {step.title}
        </h3>
        <ul className="space-y-1.5">
          {step.items.map((item, i) => (
            <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function JourneyRoadmap() {
  const ICON_SIZE = 64;
  const LINE_TOP = ICON_SIZE / 2; // 32px — connector sits at icon centre

  /* ── Mobile carousel state ── */
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
    <section id="journey" className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-10 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold font-heading mb-4"
          >
            Your Complete Tech{" "}
            <span className="text-gradient-shimmer">Growth Journey</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Five stages that take you from a curious learner to a confident tech leader.
          </motion.p>
        </div>

        {/* ─────────────────────────────────────────
            MOBILE  (<md) — horizontal scroll-snap
        ───────────────────────────────────────── */}
        <div className="block md:hidden">
          {/* Swipe hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-1 mb-4 text-xs text-muted-foreground"
          >
            <span>Swipe to explore</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
            >
              <ChevronRight className="w-3.5 h-3.5 text-primary" />
            </motion.div>
          </motion.div>

          {/* Scrollable track — peek ~10% of next card to hint continuation */}
          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="snap-center shrink-0"
                style={{ width: "80vw", maxWidth: "320px" }}
              >
                <RoadmapStep step={step} index={index} />
              </div>
            ))}
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center items-center gap-2 mt-5">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                aria-label={`Go to step ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? "w-5 h-2 bg-primary"
                    : "w-2 h-2 bg-border hover:bg-primary/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ─────────────────────────────────────────
            TABLET + DESKTOP  (md+) — original grid
        ───────────────────────────────────────── */}
        <div className="hidden md:block relative max-w-6xl mx-auto">
          {/* Connector line base track — lg only */}
          <div
            className="hidden lg:block absolute left-0 right-0 h-px bg-border z-0"
            style={{ top: LINE_TOP }}
          />
          {/* Animated green fill */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeInOut", delay: 0.3 }}
            className="hidden lg:block absolute left-0 right-0 h-px origin-left z-0"
            style={{
              top: LINE_TOP,
              background: "linear-gradient(90deg, var(--primary), #00e5ff)",
            }}
          />

          {/* Step grid */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, index) => (
              <RoadmapStep key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
