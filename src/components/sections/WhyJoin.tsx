"use client";

import { motion } from "framer-motion";
import { Laptop, Network, Target, Lightbulb, Globe, Award } from "lucide-react";
import { use3DTilt } from "@/hooks/use3DTilt";
import GlitchText from "@/components/ui/GlitchText";
import { LucideIcon } from "lucide-react";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const cardRef = use3DTilt<HTMLDivElement>(6, 1000);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass-card p-8 group transition-transform duration-300 flex flex-col h-full cursor-default"
      style={{ willChange: "transform" }}
    >
      <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <feature.icon className={`w-7 h-7 ${feature.color}`} />
      </div>
      <h3 className="text-xl font-bold text-foreground mb-3">
        <GlitchText text={feature.title} triggerOn="hover" className="font-bold text-foreground" />
      </h3>
      <p className="text-muted-foreground leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}

export function WhyJoin() {
  const features: Feature[] = [
    {
      title: "Real-World Experience",
      description: "Build production-ready projects that go way beyond your standard college curriculum.",
      icon: Laptop,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Strong Tech Network",
      description: "Connect deeply with talented developers, startup founders, and seasoned mentors.",
      icon: Network,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Career Opportunities",
      description: "Get exclusive access to internships, full-time roles, and early-stage startup programs.",
      icon: Target,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Industry Mentorship",
      description: "Learn directly from professionals working at top tech companies and fast-growing startups.",
      icon: Lightbulb,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      title: "National-Level Exposure",
      description: "Participate and shine in large-scale events, hackathons, and open-source programs.",
      icon: Globe,
      color: "text-cyan-500",
      bg: "bg-cyan-500/10",
    },
    {
      title: "Leadership Growth",
      description: "Step up to lead teams, organize mega events, and manage active tech communities.",
      icon: Award,
      color: "text-rose-500",
      bg: "bg-rose-500/10",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-heading mb-4"
          >
            Why Join <span className="text-gradient">CodeQuesters?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            We are more than just a coding club. We are an ecosystem designed to accelerate your career.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
