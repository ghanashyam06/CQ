"use client";

import { Hero }        from "@/components/sections/Hero";
import { TrustedBy }   from "@/components/sections/TrustedBy";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { WhatWeDo }    from "@/components/sections/WhatWeDo";
import { FinalCTA }    from "@/components/sections/FinalCTA";
import { Footer }      from "@/components/Footer";
import { SwipeSlider } from "@/components/ui/SwipeSlider";

export default function Home() {
  return (
    <SwipeSlider>
      {/* Slide 1: Hero Section */}
      <Hero />

      {/* Slide 2: Partners & Features */}
      <div className="w-full min-h-screen py-16 sm:py-24 flex flex-col justify-center">
        <TrustedBy />
        <div className="mt-8">
          <WhatWeDo />
        </div>
      </div>

      {/* Slide 3: Growth Stats & Metrics */}
      <div className="w-full min-h-screen flex items-center justify-center py-16 sm:py-24">
        <ImpactStats />
      </div>

      {/* Slide 4: Call to Action & Footer */}
      <div className="w-full min-h-screen flex flex-col justify-between pt-16 sm:pt-24">
        <div className="flex-1 flex items-center justify-center">
          <FinalCTA />
        </div>
        <Footer />
      </div>
    </SwipeSlider>
  );
}
