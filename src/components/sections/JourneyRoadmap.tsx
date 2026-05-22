"use client";

import { motion } from "framer-motion";
import { BookOpen, Code2, Rocket, IndianRupee, Target } from "lucide-react";

const steps = [
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

export function JourneyRoadmap() {
  // Icon marker is w-16 h-16 (64px). The connector line should sit at the
  // vertical center of the icon row, which is 32px from the top of the marker.
  // We position it absolutely at top=32px (half of 64px icon height).
  const ICON_SIZE = 64; // px — matches w-16 h-16
  const LINE_TOP = ICON_SIZE / 2; // 32px from top of the relative grid wrapper

  return (
    <section id="journey" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-heading mb-4"
          >
            Your Complete Tech{" "}
            <span className="text-gradient">Growth Journey</span>
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

        <div className="relative max-w-6xl mx-auto">
          {/* ── Connector line — desktop only, sits exactly at icon centre ── */}
          {/* Base track */}
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

          {/* ── Step grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="flex flex-col items-center group"
              >
                {/* Icon marker — sits on the connector line */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 shrink-0 transition-all duration-300
                    bg-background border-2 border-primary
                    shadow-[0_0_14px_rgba(0,191,99,0.18)]
                    group-hover:shadow-[0_0_28px_rgba(0,191,99,0.45)]
                    group-hover:scale-110 group-hover:bg-primary/10"
                >
                  <step.icon
                    className="w-7 h-7 text-foreground group-hover:text-primary transition-colors duration-300"
                  />
                </div>

                {/* Card */}
                <div className="glass-card p-5 w-full relative overflow-hidden
                  border border-border hover:border-primary/30 transition-colors duration-300">
                  {/* Faint step number watermark */}
                  <span className="absolute top-1 right-3 text-6xl font-black text-foreground/[0.04] select-none pointer-events-none leading-none">
                    0{index + 1}
                  </span>

                  {/* Green top accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/60 to-transparent rounded-t-xl" />

                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {step.title}
                  </h3>

                  <ul className="space-y-1.5">
                    {step.items.map((item, i) => (
                      <li
                        key={i}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        {/* Green dot bullet */}
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
