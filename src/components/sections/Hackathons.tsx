"use client";

import { motion } from "framer-motion";
import { ArrowRight, Trophy, Users, Star, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useMagnetic } from "@/hooks/useMagnetic";
import MagicBento, { type MagicBentoItem } from "@/components/ui/MagicBento";

export function Hackathons() {
  const registerRef = useMagnetic<HTMLAnchorElement>(0.22, 60);

  /* ── Featured: upcoming Summer Internship Challenge ── */
  const featuredItem: MagicBentoItem = {
    title: "",
    description: "",
    children: (
      <div className="flex flex-col h-full min-h-[280px] sm:min-h-[400px]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-5 uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Upcoming · May 31, 2026
          </div>

          <h3 className="text-xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
            Compete &amp; Win:<br />Summer Internship Challenge 2026
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-lg">
            A career-first selection challenge by GradSkills × CodeQuesters. Top 10 builders walk away with
            real paid internship offers, stipends, and mentorship — not just certificates.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { icon: <Trophy className="w-5 h-5 text-amber-500 mx-auto mb-1" />,  value: "Top 5",      label: "Paid Internships" },
              { icon: <Users className="w-5 h-5 text-blue-500 mx-auto mb-1" />,    value: "50+",        label: "Finalists" },
              { icon: <Clock className="w-5 h-5 text-primary mx-auto mb-1" />,     value: "72 Hrs",     label: "Build Round" },
              { icon: <MapPin className="w-5 h-5 text-purple-500 mx-auto mb-1" />, value: "Hyderabad",  label: "Final Round" },
            ].map((stat, i) => (
              <div key={i} className="glass-card p-3 rounded-xl text-center">
                {stat.icon}
                <div className="font-bold text-foreground text-sm">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="space-y-1.5 mb-6">
            {[
              { date: "24–26 May", label: "Round 1 — Online Build Phase" },
              { date: "29 May",    label: "Top 50 Announced" },
              { date: "31 May",    label: "Grand Finale — Offline, Hyderabad" },
            ].map((t, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="text-primary font-semibold w-20 shrink-0">{t.date}</span>
                <span className="text-muted-foreground">{t.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between border-t border-border pt-5 mt-auto">
          <div className="text-sm text-muted-foreground">
            Organized by <span className="text-foreground font-semibold">GradSkills × CodeQuesters</span>
          </div>
          <Link
            ref={registerRef}
            href="https://chat.whatsapp.com/Caytnn7oWsrKI68W3hJDYC"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 w-full sm:w-auto rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,191,99,0.25)] text-sm"
          >
            Register Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    ),
  };

  /* ── Past winners — CODEQUEST 2026 ── */
  const winners = [
    {
      rank: "1st",
      name: "Vivek Goud Adula",
      prize: "₹12,000",
      image: "/1st Winner.JPG",
      color: "dark:text-amber-400 text-amber-700",
      bg: "dark:bg-amber-500/10 bg-amber-500/15",
      border: "dark:border-amber-500/30 border-amber-500/20",
    },
    {
      rank: "2nd",
      name: "Y. Joshitha",
      prize: "₹8,000",
      image: "/2nd winner.JPG",
      color: "dark:text-slate-300 text-slate-700",
      bg: "dark:bg-slate-500/10 bg-slate-500/15",
      border: "dark:border-slate-500/30 border-slate-500/20",
    },
    {
      rank: "3rd",
      name: "Prathmesh Waikar",
      prize: "₹5,000",
      image: "/3rd winner 1.JPG",
      color: "dark:text-orange-400 text-orange-700",
      bg: "dark:bg-orange-500/10 bg-orange-500/15",
      border: "dark:border-orange-500/30 border-orange-500/20",
    },
  ];

  const pastItems: MagicBentoItem[] = winners.map((w) => ({
    title: w.name,
    description: `CODEQUEST 2026 · GenAI Hackathon`,
    label: `${w.rank} Place`,
    icon: (
      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-border">
        <Image
          src={w.image}
          alt={w.name}
          width={64}
          height={64}
          className="w-full h-full object-cover object-top"
        />
      </div>
    ),
    children: (
      <div className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full mt-2 ${w.bg} ${w.border} border ${w.color}`}>
        <Trophy className="w-3 h-3" /> {w.prize} Cash Prize
      </div>
    ),
  }));

  return (
    <section id="hackathons" className="py-12 sm:py-16 lg:py-24 relative overflow-hidden border-y border-border">
      {/* Background glows */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Heading */}
        <div className="text-center mb-10 sm:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold font-heading mb-4"
          >
            Epic <span className="text-gradient">Hackathons</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base"
          >
            Showcase your skills, build innovative solutions, and win exciting prizes in our national-level events.
          </motion.p>
        </div>

        {/* ── Featured upcoming event ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-14"
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

        {/* ── CODEQUEST 2026 winners ── */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              CODEQUEST 2026 Winners
            </h3>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              GenAI Hackathon · Apr 12, 2026
            </span>
          </div>

          <MagicBento
            items={pastItems}
            gridCols="repeat(auto-fit, minmax(min(100%, 220px), 1fr))"
            enableStars
            enableSpotlight
            enableBorderGlow
            enableTilt
            enableMagnetism
            clickEffect
            spotlightRadius={260}
            particleCount={8}
          />
        </div>
      </div>
    </section>
  );
}
