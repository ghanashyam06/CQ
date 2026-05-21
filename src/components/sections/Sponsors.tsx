"use client";

import { motion } from "framer-motion";
import { LogoLoop } from "@/components/ui/LogoLoop";
import { FaGoogle, FaMicrosoft, FaAmazon, FaGithub, FaStripe, FaPaypal } from "react-icons/fa6";

export function Sponsors() {
  const techLogos = [
    { node: <FaGoogle />, title: "Google", href: "#" },
    { node: <FaMicrosoft />, title: "Microsoft", href: "#" },
    { node: <FaAmazon />, title: "AWS", href: "#" },
    { node: <FaGithub />, title: "GitHub", href: "#" },
    { node: <FaStripe />, title: "Stripe", href: "#" },
    { node: <FaPaypal />, title: "PayPal", href: "#" },
  ];

  return (
    <section className="py-24 relative border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-muted-foreground tracking-widest uppercase mb-4"
          >
            Trusted By Leading Partners
          </motion.h2>
        </div>
      </div>

      <div className="relative w-full overflow-hidden flex flex-col gap-8">
        <LogoLoop
          logos={techLogos}
          speed={120}
          direction="left"
          logoHeight={48}
          gap={80}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="var(--background)"
        />
        <LogoLoop
          logos={techLogos.slice().reverse()}
          speed={80}
          direction="right"
          logoHeight={48}
          gap={80}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="var(--background)"
        />
      </div>

      <div className="container mx-auto px-4 mt-16 flex justify-center">
        <button className="px-6 py-3 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-colors">
          Partner With Us
        </button>
      </div>
    </section>
  );
}
