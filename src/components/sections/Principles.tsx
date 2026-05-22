"use client";

import { motion } from "framer-motion";
import { Star, Telescope, Zap } from "lucide-react";

const principles = [
  {
    icon: Star,
    title: "Best Experience",
    description:
      "Premium hackathons, workshops, networking, and builder experiences designed to create lasting impact.",
  },
  {
    icon: Telescope,
    title: "Best Exposure",
    description:
      "Connecting builders with founders, startups, mentors, and opportunities that accelerate real growth.",
  },
  {
    icon: Zap,
    title: "Creating Impact",
    description:
      "Building growth through execution, contribution, and innovation — not just content consumption.",
  },
];

export function Principles() {
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
            What We Stand For
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold font-heading"
          >
            Our <span className="text-gradient">Principles</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {principles.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-card p-8 group hover:-translate-y-2 transition-transform duration-300 border border-border hover:border-primary/30 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <p.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{p.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{p.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
