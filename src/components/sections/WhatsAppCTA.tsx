"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { FaDiscord } from "react-icons/fa6";
import Link from "next/link";
import { useMagnetic } from "@/hooks/useMagnetic";
import BlurText from "@/components/ui/BlurText";

export function WhatsAppCTA() {
  const whatsappRef = useMagnetic<HTMLAnchorElement>(0.25, 50);
  const discordRef = useMagnetic<HTMLAnchorElement>(0.25, 50);

  return (
    <section id="join" className="py-24 relative overflow-hidden bg-gradient-to-br from-green-500/20 to-background border-y border-border section-noise">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[500px] bg-green-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-20 h-20 bg-green-500 rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.5)] mb-8"
        >
          <MessageCircle className="w-10 h-10 text-white" />
        </motion.div>
        
        <h2 className="text-4xl md:text-6xl font-bold font-heading mb-6 max-w-3xl leading-tight">
          <BlurText text="Join India's Most Active" className="block mb-2 text-foreground" />
          <BlurText
            text="Student Tech Community"
            className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600"
            delay={0.4}
          />
        </h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10"
        >
          Get workshop updates, hackathon alerts, opportunities, and connect with builders across India.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link
            ref={whatsappRef}
            href="https://chat.whatsapp.com/Drc3SOwUSJiJnV3ZZgQz7I"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-xl bg-green-500 text-white font-bold text-lg hover:bg-green-600 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(34,197,94,0.4)]"
          >
            <MessageCircle className="w-5 h-5" />
            Join WhatsApp
          </Link>
          <Link
            ref={discordRef}
            href="https://discord.gg/cq"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-xl bg-indigo-500 text-white font-bold text-lg hover:bg-indigo-600 transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
          >
            <FaDiscord className="w-5 h-5" />
            Join Discord
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
