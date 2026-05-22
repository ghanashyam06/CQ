"use client";

import { motion } from "framer-motion";
import { Rocket, Handshake, Mail } from "lucide-react";

export function FinalCTA() {
  return (
    <section id="join" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[700px] bg-primary/8 blur-[140px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card max-w-5xl mx-auto p-12 md:p-20 text-center flex flex-col items-center border border-primary/20 shadow-[0_0_60px_rgba(0,255,157,0.08)]"
        >
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4"
          >
            Ready To Build?
          </motion.p>

          <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight text-foreground">
            Ready To Build{" "}
            <span className="text-gradient">Something Bigger?</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            Whether you&apos;re a student, builder, founder, mentor, or organization —
            CodeQuesters is built for people who grow through execution.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <a
              href="#"
              className="px-8 py-4 w-full sm:w-auto rounded-xl bg-primary text-primary-foreground font-bold text-base hover:bg-primary/90 transition-all shadow-[0_0_22px_rgba(0,255,157,0.4)] flex items-center justify-center gap-2"
            >
              <Rocket className="w-5 h-5" />
              Join Community
            </a>
            <a
              href="#contact"
              className="px-8 py-4 w-full sm:w-auto rounded-xl glass-card text-foreground font-bold text-base hover:border-primary/40 transition-all flex items-center justify-center gap-2"
            >
              <Handshake className="w-5 h-5" />
              Collaborate With Us
            </a>
            <a
              href="#contact"
              className="px-8 py-4 w-full sm:w-auto rounded-xl text-primary font-bold text-base hover:bg-primary/10 transition-all flex items-center justify-center gap-2 border border-primary/20"
            >
              <Mail className="w-5 h-5" />
              Partner With CodeQuesters
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
