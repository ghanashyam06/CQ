"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const struggles = [
  "Lack of guidance",
  "Weak peer networks",
  "Limited exposure",
  "Learning without direction",
  "Difficulty finding opportunities",
];

export function AboutSnapshot() {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">

          {/* Left — narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
              About Us
            </p>
            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6 leading-tight">
              More Than a Community.{" "}
              <span className="text-gradient">A Builder Ecosystem.</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              CodeQuesters was started with one mission: To bridge the gap between
              learning and real-world opportunities.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We saw students struggling — so we built an ecosystem where builders
              don&apos;t just learn. They execute, collaborate, grow, and create impact together.
            </p>

            {/* Highlight line */}
            <div className="border-l-2 border-primary pl-4 py-1">
              <p className="text-foreground font-semibold italic">
                &ldquo;Most communities share content. CodeQuesters creates outcomes.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Right — struggles + solution */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="glass-card p-6 border border-border">
              <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4">
                We saw students struggling with:
              </p>
              <ul className="space-y-3">
                {struggles.map((s, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.08 }}
                    className="flex items-center gap-3 text-muted-foreground text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
                    {s}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-6 border border-primary/20 bg-primary/5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-foreground mb-1">So we built an ecosystem for execution.</p>
                  <p className="text-sm text-muted-foreground">
                    Where ambitious people find momentum, opportunities, and people
                    who genuinely want to grow together.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
