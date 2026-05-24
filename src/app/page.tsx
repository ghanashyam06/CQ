import { Hero }           from "@/components/sections/Hero";
import { TrustedBy }      from "@/components/sections/TrustedBy";
import { AboutSnapshot }  from "@/components/sections/AboutSnapshot";
import { Principles }     from "@/components/sections/Principles";
import { GroundRule }      from "@/components/sections/GroundRule";
import { ImpactStats }    from "@/components/sections/ImpactStats";
import { WhatWeDo }       from "@/components/sections/WhatWeDo";
import { StoriesPreview } from "@/components/sections/StoriesPreview";
import { ContactSection } from "@/components/sections/ContactSection";
import { FinalCTA }       from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <AboutSnapshot />
      <Principles />
      <GroundRule />
      <ImpactStats />
      <WhatWeDo />
      <StoriesPreview />
      <ContactSection />
      <FinalCTA />
    </>
  );
}
