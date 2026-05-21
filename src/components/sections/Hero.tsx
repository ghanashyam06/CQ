"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Subtle radial glow behind content */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/10 blur-[140px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>India&apos;s Fastest Growing Student Community</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading tracking-tight max-w-5xl leading-tight mb-6 text-foreground"
        >
          Build Your Tech Career With{" "}
          <span className="text-gradient">CodeQuesters</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10"
        >
          Join workshops, hackathons, mentorship programs, and real-world project
          experiences designed to help students learn, build, hack, earn, and lead.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
        >
          <Link
            href="#join"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,255,157,0.4)] hover:shadow-[0_0_35px_rgba(0,255,157,0.6)]"
          >
            Join the Community
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="#events"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-card border border-border text-foreground font-semibold text-lg hover:bg-muted transition-all backdrop-blur-sm"
          >
            Explore Events
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl"
        >
          {[
            { label: "Students", value: "10,000+" },
            { label: "Workshops", value: "50+" },
            { label: "Hackathons", value: "25+" },
            { label: "Colleges Reached", value: "100+" },
          ].map((stat, i) => (
            <div
              key={i}
              className="glass-card p-4 flex flex-col items-center justify-center relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="text-3xl font-bold text-foreground mb-1">{stat.value}</span>
              <span className="text-sm text-muted-foreground font-medium">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
