"use client";

import { motion } from "framer-motion";
import { ArrowRight, Rocket, Handshake } from "lucide-react";

const floatingKeywords = [
  "Build", "Innovate", "Collaborate", "Learn",
  "Network", "Create", "Hack", "Grow", "Lead", "Impact",
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 pb-12 overflow-hidden"
    >
      {/* Radial glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/8 blur-[140px] rounded-full" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

        {/* Tagline pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs sm:text-sm font-semibold mb-6 tracking-widest uppercase"
        >
          EXPLORE &nbsp;·&nbsp; LEARN &nbsp;·&nbsp; BUILD
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-heading tracking-tight max-w-5xl leading-[1.1] mb-5 text-foreground"
        >
          Built for Students.{" "}
          <span className="text-gradient">Powered by Builders.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mb-3 leading-relaxed px-2"
        >
          CodeQuesters is a builder-first ecosystem helping students, developers, founders,
          and creators grow through hackathons, workshops, collaborations, networking,
          and real-world opportunities.
        </motion.p>

        {/* Highlight statement */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="text-sm sm:text-base font-semibold text-primary mb-8"
        >
          We don&apos;t just build communities. We build outcomes.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full max-w-lg sm:max-w-none justify-center mb-12"
        >
          <a
            href="#join"
            className="px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm sm:text-base hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_22px_rgba(0,255,157,0.4)] hover:shadow-[0_0_36px_rgba(0,255,157,0.6)]"
          >
            <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
            Join The Community
          </a>
          <a
            href="#contact"
            className="px-6 py-3.5 rounded-xl glass-card text-foreground font-bold text-sm sm:text-base hover:border-primary/40 transition-all flex items-center justify-center gap-2"
          >
            <Handshake className="w-4 h-4 sm:w-5 sm:h-5" />
            Partner With Us
          </a>
          <a
            href="#stories"
            className="px-6 py-3.5 rounded-xl text-primary font-bold text-sm sm:text-base hover:bg-primary/10 transition-all flex items-center justify-center gap-2 border border-primary/20"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            Builder Stories
          </a>
        </motion.div>

        {/* Floating builder keywords */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-2 max-w-xl px-2"
        >
          {floatingKeywords.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.06 }}
              className="px-3 py-1.5 rounded-full text-xs font-semibold border border-primary/20 text-primary/70 bg-primary/5 hover:bg-primary/15 hover:text-primary transition-all cursor-default"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
