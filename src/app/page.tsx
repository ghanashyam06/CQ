"use client";

import { Hero }        from "@/components/sections/Hero";
import { TrustedBy }   from "@/components/sections/TrustedBy";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { WhatWeDo }    from "@/components/sections/WhatWeDo";
import { FinalCTA }    from "@/components/sections/FinalCTA";
import { Footer }      from "@/components/Footer";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Main Progress Indicator */}
      <motion.div
        className="fixed right-0 top-0 bottom-0 w-1 bg-primary origin-top z-50 mix-blend-difference"
        style={{ scaleY }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative">
        {/* Slide 1: Hero Section */}
        <section id="hero" className="relative">
          <Hero />
        </section>

        {/* Slide 2: Partners & Features */}
        <section id="features" className="relative py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center">
              <div className="w-full max-w-6xl">
                <TrustedBy />
                <div className="mt-16">
                  <WhatWeDo />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 3: Growth Stats & Metrics */}
        <section id="stats" className="relative py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center">
              <div className="w-full max-w-7xl">
                <ImpactStats />
              </div>
            </div>
          </div>
        </section>

        {/* Slide 4: Call to Action */}
        <section id="cta" className="relative py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center">
              <div className="w-full max-w-5xl">
                <FinalCTA />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative border-t border-border/50 bg-background/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Footer />
          </div>
        </footer>
      </div>
    </>
  );
}
