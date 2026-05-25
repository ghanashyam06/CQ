"use client";

import { motion } from "framer-motion";
import { ArrowRight, Trophy, Users, Star, Clock } from "lucide-react";
import Link from "next/link";
import { useMagnetic } from "@/hooks/useMagnetic";
import MagicBento, { type MagicBentoItem } from "@/components/ui/MagicBento";

export function Hackathons() {
  const registerRef = useMagnetic<HTMLAnchorElement>(0.22, 60);

  /* ── Featured hackathon card content ── */
  const featuredItem: MagicBentoItem = {
    title: "",
    description: "",
    className: "lg:col-span-2",
    children: (
      <div className="flex flex-col h-full min-h-[420px]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-6 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Upcoming Event
          </div>

          <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            CodeQuesters <br />Hackathon 4.0
          </h3>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg">
            A 48-hour hybrid hackathon focusing on AI, Web3, and Open Source. Join 2000+ developers building the future.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { icon: <Trophy className="w-6 h-6 text-amber-500 mx-auto mb-2" />, value: "₹5 Lakhs", label: "Prize Pool" },
              { icon: <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />,   value: "2000+",    label: "Participants" },
              { icon: <Clock className="w-6 h-6 text-primary mx-auto mb-2" />,    value: "48 Hrs",   label: "Duration" },
              { icon: <Star className="w-6 h-6 text-purple-500 mx-auto mb-2" />,  value: "15+",      label: "Sponsors" },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-4 rounded-xl text-center">
                {stat.icon}
                <div className="font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-border pt-6 mt-auto">
          <div className="flex items-center gap-4">
            <div className="text-muted-foreground text-sm">Powered by</div>
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-border rounded animate-pulse" />
              <div className="h-6 w-16 bg-border rounded animate-pulse" />
            </div>
          </div>
          <Link
            ref={registerRef}
            href="#"
            className="px-8 py-3 w-full sm:w-auto rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,191,99,0.25)]"
          >
            Register Now
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    ),
  };

  /* ── Past winner cards ── */
  const pastItems: MagicBentoItem[] = [1, 2, 3].map((item) => ({
    title: `CQ Hack ${item}.0`,
    description: "Team Innovators • FinTech",
    label: "Winner",
    icon: (
      <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`https://picsum.photos/seed/${item + 20}/200/200`}
          alt={`CQ Hack ${item}.0`}
          className="w-full h-full object-cover"
        />
      </div>
    ),
    children: (
      <div className="flex items-center gap-1 text-xs font-semibold text-amber-500 mt-2">
        <Trophy className="w-3 h-3" /> 1st Place
      </div>
    ),
  }));

  return (
    <section id="hackathons" className="py-24 relative overflow-hidden border-y border-border">
      {/* Background glows */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-heading mb-4"
          >
            Epic <span className="text-gradient">Hackathons</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Showcase your skills, build innovative solutions, and win exciting prizes in our national-level hackathons.
          </motion.p>
        </div>

        {/* ── Featured hackathon (full-width MagicBento, 2-col span) ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <MagicBento
            items={[featuredItem]}
            gridCols="1fr"
            enableStars
            enableSpotlight
            enableBorderGlow
            enableTilt={false}
            enableMagnetism={false}
            clickEffect
            spotlightRadius={380}
            particleCount={14}
          />
        </motion.div>

        {/* ── Past winners row ── */}
        <div>
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2 mb-6">
            <Star className="w-5 h-5 text-primary" /> Past Winners
          </h3>

          <MagicBento
            items={pastItems}
            gridCols="repeat(auto-fit, minmax(220px, 1fr))"
            enableStars
            enableSpotlight
            enableBorderGlow
            enableTilt
            enableMagnetism
            clickEffect
            spotlightRadius={260}
            particleCount={8}
          />

          <Link
            href="#"
            className="mt-8 py-4 text-center text-primary font-medium hover:text-primary/80 transition-colors flex items-center justify-center gap-2"
          >
            View All Past Hackathons <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
