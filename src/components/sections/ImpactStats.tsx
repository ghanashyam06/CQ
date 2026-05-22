"use client";

import { motion } from "framer-motion";
import { Users, Building2, CalendarDays, Network, Handshake } from "lucide-react";

const stats = [
  { icon: Users,       value: "10,000+",    label: "Builders Reached" },
  { icon: Building2,   value: "200+",       label: "Colleges Connected" },
  { icon: CalendarDays,value: "50+",        label: "Events & Workshops" },
  { icon: Network,     value: "100+",       label: "Industry Connections" },
  { icon: Handshake,   value: "Countless",  label: "Collaborations Created" },
];

export function ImpactStats() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3"
          >
            The Ecosystem In Motion
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold font-heading"
          >
            Numbers That <span className="text-gradient">Speak</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-5 max-w-5xl mx-auto">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-4 sm:p-6 flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300 border border-border hover:border-primary/30"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl sm:text-2xl md:text-3xl font-black text-foreground mb-1">
                {stat.value}
              </span>
              <span className="text-xs font-medium text-muted-foreground leading-tight">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
