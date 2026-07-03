"use client";

import { motion } from "framer-motion";
import { ArrowRight, Trophy, Users, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const winners = [
  {
    rank: "1st",
    name: "Vivek Goud Adula",
    prize: "₹12,000",
    image: "/1st Winner.JPG",
    aspectRatio: "3/2",
    color: "text-amber-500",
    bg: "bg-amber-500/8",
    border: "border-amber-500/25",
  },
  {
    rank: "2nd",
    name: "Y. Joshitha",
    prize: "₹8,000",
    image: "/2nd winner.JPG",
    aspectRatio: "3/2",
    color: "text-foreground",
    bg: "bg-border",
    border: "border-border",
  },
  {
    rank: "3rd",
    name: "Prathmesh Waikar",
    prize: "₹5,000",
    image: "/3rd winner 1.JPG",
    aspectRatio: "3/2",
    color: "text-orange-400",
    bg: "bg-orange-500/8",
    border: "border-orange-500/25",
  },
];

export function Hackathons() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" };
      gsap.from(".hackathons-heading", { opacity: 0, y: 24, duration: 0.6, ease: "power3.out", scrollTrigger: st });
      gsap.from(".featured-card",      { opacity: 0, y: 24, duration: 0.6, delay: 0.1, ease: "power3.out", scrollTrigger: st });
      gsap.from(".winner-card",        { opacity: 0, y: 20, stagger: 0.1, duration: 0.5, delay: 0.2, ease: "power3.out",
        scrollTrigger: { trigger: ".winners-grid", start: "top 85%", toggleActions: "play none none reverse" },
      });
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hackathons" className="py-16 sm:py-20 lg:py-28 relative border-t border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12 hackathons-heading">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-primary mb-3">Hackathons</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Epic <span className="text-gradient">Hackathons</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Showcase your skills, build innovative solutions, and win exciting prizes in our national-level events.
          </p>
        </div>

        {/* Featured upcoming event */}
        <div className="featured-card card p-6 sm:p-8 mb-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold text-primary tracking-wider uppercase">Upcoming · May 31, 2026</span>
          </div>

          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight">
            Compete &amp; Win: Summer Internship Challenge 2026
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base mb-6 max-w-2xl">
            A career-first selection challenge by GradSkills × CodeQuesters. Top 10 builders walk away with
            real paid internship offers, stipends, and mentorship — not just certificates.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
            {[
              { icon: <Trophy className="w-4 h-4 text-amber-500 mx-auto mb-1" />, value: "Top 5", label: "Paid Internships" },
              { icon: <Users className="w-4 h-4 text-primary mx-auto mb-1" />,    value: "50+",   label: "Finalists" },
              { icon: <Clock className="w-4 h-4 text-primary mx-auto mb-1" />,    value: "72 Hrs",label: "Build Round" },
              { icon: <MapPin className="w-4 h-4 text-primary mx-auto mb-1" />,   value: "Hyd",   label: "Final Round" },
            ].map((stat, i) => (
              <div key={i} className="card p-3 text-center">
                {stat.icon}
                <div className="font-semibold text-foreground text-sm">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="space-y-2 mb-6 border-l border-border pl-4">
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

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between pt-5 border-t border-border">
            <span className="text-sm text-muted-foreground">
              Organized by <span className="text-foreground font-semibold">GradSkills × CodeQuesters</span>
            </span>
            <Link
              href="https://luma.com/goekfv3b?tk=xTmxzL"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full sm:w-auto justify-center"
            >
              Register Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Past winners */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-semibold text-foreground">CODEQUEST 2026 Winners</h3>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full border border-border text-muted-foreground">
              GenAI Hackathon · Apr 12, 2026
            </span>
          </div>

          <div className="winners-grid grid grid-cols-1 sm:grid-cols-3 gap-4">
            {winners.map((w) => (
              <div key={w.rank} className={`winner-card card p-4 border ${w.border} flex flex-col gap-3`}>
                <div className="flex items-center justify-between">
                  <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${w.bg} border ${w.border} ${w.color}`}>
                    <Trophy className="w-3 h-3" /> {w.rank} Place
                  </div>
                  <span className="text-xs text-muted-foreground">CODEQUEST 2026</span>
                </div>
                <div
                  className="w-full rounded-lg overflow-hidden border border-border"
                  style={{ aspectRatio: w.aspectRatio }}
                >
                  <Image
                    src={w.image}
                    alt={w.name}
                    width={600}
                    height={400}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{w.name}</p>
                  <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full mt-1.5 ${w.bg} border ${w.border} ${w.color}`}>
                    <Trophy className="w-3 h-3" /> {w.prize} Cash Prize
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
