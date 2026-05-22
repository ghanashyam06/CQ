"use client";

import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export function GroundRule() {
  return (
    <section className="py-16 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto glass-card border border-primary/25 bg-primary/5 p-10 md:p-14 text-center relative overflow-hidden"
        >
          {/* Glow */}
          <div className="absolute inset-0 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>

            <p className="text-2xl md:text-3xl font-black text-foreground mb-4">
              🚨 We Never Charge Builders.
            </p>

            <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-6 leading-relaxed">
              We never charge students or builders to access opportunities, events,
              workshops, or growth initiatives.
            </p>

            <div className="inline-block border-t border-primary/30 pt-4">
              <p className="text-primary font-semibold text-sm md:text-base">
                Opportunities should be accessible to everyone willing to build.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
