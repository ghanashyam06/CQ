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
import MagnetLines        from "@/components/ui/MagnetLines";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <MagnetLines columns={32} rows={1} lineColor="rgba(0, 191, 99, 0.15)" activeLineColor="#00bf63" />
      <AboutSnapshot />
      <Principles />
      <GroundRule />
      <ImpactStats />
      <MagnetLines columns={32} rows={1} lineColor="rgba(0, 191, 99, 0.15)" activeLineColor="#00bf63" />
      <WhatWeDo />
      <StoriesPreview />
      <MagnetLines columns={32} rows={1} lineColor="rgba(0, 191, 99, 0.15)" activeLineColor="#00bf63" />
      <ContactSection />
      <FinalCTA />
    </>
  );
}
