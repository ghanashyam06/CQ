"use client";

import { motion } from "framer-motion";
import { LogoLoop } from "@/components/ui/LogoLoop";
import { FaMicrosoft, FaGithub } from "react-icons/fa6";
import { Users, Building2, Rocket, GraduationCap, Network, Lightbulb } from "lucide-react";

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

// Duplicate for seamless loop
const logos = [
  ...partnerCategories,
  ...partnerCategories,
].map((p, i) => ({
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
  return (
    <section className="py-20 relative border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2"
        >
          Trusted By
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold text-foreground"
        >
          Builders, Communities &amp;{" "}
          <span className="text-gradient">Innovators</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="text-muted-foreground mt-3 max-w-xl mx-auto text-sm"
        >
          CodeQuesters collaborates with hackathons, student communities, startups,
          institutions, and industry professionals to create meaningful opportunities for builders.
        </motion.p>
      </div>

      <div className="relative w-full overflow-hidden flex flex-col gap-6">
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
