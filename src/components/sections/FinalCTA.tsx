"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card max-w-5xl mx-auto p-12 md:p-20 text-center flex flex-col items-center border border-primary/20 shadow-[0_0_50px_rgba(0,255,157,0.1)] relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none" />
          
          <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6 tracking-tight text-foreground relative z-10">
            Start Your <span className="text-gradient">Journey Today</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mb-10 relative z-10">
            Thousands of students are already building, learning, and growing together. Don&apos;t miss out on the opportunity to accelerate your career.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full justify-center">
            <Link
              href="#join"
              className="px-8 py-4 w-full sm:w-auto rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(0,255,157,0.4)] flex items-center justify-center gap-2"
            >
              Join the Movement <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="#events"
              className="px-8 py-4 w-full sm:w-auto rounded-xl bg-background border border-border hover:bg-muted text-foreground font-bold text-lg transition-all flex items-center justify-center"
            >
              Explore Events
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
