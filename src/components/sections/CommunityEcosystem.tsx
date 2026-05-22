"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { FaDiscord, FaGithub, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";

export function CommunityEcosystem() {
  const platforms = [
    { name: "WhatsApp", icon: MessageCircle, color: "bg-green-500", members: "10K+", delay: 0.1 },
    { name: "Discord", icon: FaDiscord, color: "bg-indigo-500", members: "8K+", delay: 0.2 },
    { name: "LinkedIn", icon: FaLinkedin, color: "bg-blue-600", members: "15K+", delay: 0.3 },
    { name: "Twitter/X", icon: FaXTwitter, color: "bg-neutral-800 dark:bg-neutral-200 dark:text-neutral-900", members: "5K+", delay: 0.4 },
    { name: "GitHub", icon: FaGithub, color: "bg-slate-800", members: "1K+", delay: 0.5 },
    { name: "YouTube", icon: FaYoutube, color: "bg-red-600", members: "12K+", delay: 0.6 },
  ];

  return (
    <section id="community" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-heading mb-4"
          >
            Community <span className="text-gradient">Ecosystem</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Connect, learn, and grow with builders across all major platforms.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {platforms.map((platform, index) => (
            <motion.a
              key={index}
              href="#"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: platform.delay }}
              className={`glass-card p-6 flex flex-col items-center justify-center gap-4 group hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,191,99,0.3)]`}
            >
              <div className={`w-12 h-12 rounded-full ${platform.color} flex items-center justify-center text-white`}>
                <platform.icon className="w-6 h-6" />
              </div>
              <div className="text-center">
                <div className="font-bold text-foreground group-hover:text-primary transition-colors">{platform.name}</div>
                <div className="text-sm text-muted-foreground font-medium">{platform.members}</div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
