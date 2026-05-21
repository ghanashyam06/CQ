"use client";

import { motion } from "framer-motion";
import { Briefcase, ArrowRight } from "lucide-react";
import Link from "next/link";

export function Opportunities() {
  const jobs = [
    { title: "Frontend Developer Intern", company: "TechNova", type: "Internship", status: "Active" },
    { title: "Campus Ambassador", company: "CodeQuesters", type: "Volunteer", status: "Active" },
    { title: "React Native Freelancer", company: "StartUp Inc.", type: "Freelance", status: "Closing Soon" },
    { title: "Open Source Maintainer", company: "CQ OS", type: "Open Source", status: "Active" },
  ];

  return (
    <section id="opportunities" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold font-heading mb-4"
            >
              Career <span className="text-gradient">Opportunities</span>
            </motion.h2>
            <p className="text-muted-foreground max-w-xl">
              Exclusive roles for community members from our partners and sponsors.
            </p>
          </div>
          <Link href="#" className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
            View All Board <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 group hover:-translate-y-1"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{job.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{job.company}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${
                  job.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'
                }`}>
                  {job.status}
                </span>
                <button className="px-4 py-2 rounded-lg bg-background border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors text-sm font-semibold w-full sm:w-auto">
                  Apply
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
