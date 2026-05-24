"use client";

import { motion } from "framer-motion";
import { ArrowRight, Trophy, Users, Star, Clock } from "lucide-react";
import Link from "next/link";
import { use3DTilt } from "@/hooks/use3DTilt";
import { useMagnetic } from "@/hooks/useMagnetic";
import StarBorder from "@/components/ui/StarBorder";

export function Hackathons() {
  const featuredRef = use3DTilt<HTMLDivElement>(5, 1000);
  const registerRef = useMagnetic<HTMLAnchorElement>(0.22, 60);

  return (
    <section id="hackathons" className="py-24 relative overflow-hidden border-y border-border">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-heading mb-4"
          >
            Epic{" "}
            <span className="text-gradient">Hackathons</span>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Hackathon */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <StarBorder speed="6s">
              <div
                ref={featuredRef}
                className="rounded-2xl overflow-hidden flex flex-col relative group bg-card cursor-default"
                style={{ willChange: "transform" }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="p-8 md:p-12 flex flex-col justify-between h-full z-10">
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
                        { icon: <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />, value: "2000+", label: "Participants" },
                        { icon: <Clock className="w-6 h-6 text-primary mx-auto mb-2" />, value: "48 Hrs", label: "Duration" },
                        { icon: <Star className="w-6 h-6 text-purple-500 mx-auto mb-2" />, value: "15+", label: "Sponsors" },
                      ].map((stat, i) => (
                        <div key={i} className="glass-card p-4 rounded-xl text-center">
                          {stat.icon}
                          <div className="font-bold text-foreground">{stat.value}</div>
                          <div className="text-xs text-muted-foreground">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-border pt-6">
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
              </div>
            </StarBorder>
          </motion.div>

          {/* Past Hackathons */}
          <div className="flex flex-col gap-6">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" /> Past Winners
            </h3>

            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: item * 0.1 }}
                className="glass-card rounded-xl p-5 hover:border-primary/30 transition-all flex gap-4 cursor-pointer group"
              >
                <div className="w-20 h-20 rounded-lg bg-border/40 overflow-hidden flex-shrink-0 relative">
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://picsum.photos/seed/${item + 20}/200/200`}
                    alt="Project"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors">
                    CQ Hack {item}.0
                  </h4>
                  <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                    Team Innovators • FinTech
                  </p>
                  <div className="flex items-center gap-1 text-xs font-medium text-amber-500">
                    <Trophy className="w-3 h-3" /> Winner
                  </div>
                </div>
              </motion.div>
            ))}

            <Link
              href="#"
              className="mt-auto py-4 text-center text-primary font-medium hover:text-primary/80 transition-colors flex items-center justify-center gap-2"
            >
              View All Past Hackathons <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

