"use client";

import { Hero }        from "@/components/sections/Hero";
import { TrustedBy }   from "@/components/sections/TrustedBy";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { WhatWeDo }    from "@/components/sections/WhatWeDo";
import { FinalCTA }    from "@/components/sections/FinalCTA";
import { Footer }      from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />

      <div className="section-divider" />
      <TrustedBy />

      <WhatWeDo />

      <div className="section-divider" />
      <ImpactStats />

      <div className="section-divider" />
      <FinalCTA />

      <Footer />
    </>
  );
}
