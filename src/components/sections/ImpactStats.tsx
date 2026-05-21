"use client";

import { motion } from "framer-motion";
import { Users, Presentation, Trophy, Briefcase, GraduationCap, Handshake } from "lucide-react";

export function ImpactStats() {
  const stats = [
    { icon: Users, value: "15,000+", label: "Community Members", color: "from-blue-500 to-cyan-400" },
    { icon: Presentation, value: "75+", label: "Online Workshops", color: "from-purple-500 to-pink-400" },
    { icon: Trophy, value: "30+", label: "Hackathons Conducted", color: "from-amber-500 to-orange-400" },
    { icon: Briefcase, value: "150+", label: "Projects Built", color: "from-emerald-500 to-green-400" },
    { icon: GraduationCap, value: "50+", label: "Campus Ambassadors", color: "from-indigo-500 to-blue-400" },
    { icon: Handshake, value: "20+", label: "Industry Partners", color: "from-rose-500 to-red-400" },
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
            Measurable <span className="text-gradient">Impact</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Our community is growing rapidly, empowering students across the nation to build, innovate, and lead.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 flex items-start gap-4 group"
            >
              <div className={`p-4 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-foreground mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-muted-foreground transition-all duration-300">
                  {stat.value}
                </h3>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
