"use client";

import { motion } from "framer-motion";
import { Trophy, BookOpen, Network, Briefcase, Users, Lightbulb } from "lucide-react";

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

export function WhatWeDo() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3"
          >
            What We Do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold font-heading mb-4"
          >
            Built Around{" "}
            <span className="text-gradient">Builder Growth</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            Every initiative is designed with one goal — helping builders grow through execution.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-7 group hover:-translate-y-2 transition-transform duration-300 border border-border hover:border-primary/30"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {f.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
