import { Hero }        from "@/components/sections/Hero";
import { TrustedBy }   from "@/components/sections/TrustedBy";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { WhatWeDo }    from "@/components/sections/WhatWeDo";
import { FinalCTA }    from "@/components/sections/FinalCTA";
import MagnetLines     from "@/components/ui/MagnetLines";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <div className="my-8">
        <MagnetLines columns={32} rows={1} lineColor="rgba(0, 191, 99, 0.15)" activeLineColor="#00bf63" />
      </div>
      <WhatWeDo />
      <div className="my-8">
        <MagnetLines columns={32} rows={1} lineColor="rgba(0, 191, 99, 0.15)" activeLineColor="#00bf63" />
      </div>
      <ImpactStats />
      <div className="my-8">
        <MagnetLines columns={32} rows={1} lineColor="rgba(0, 191, 99, 0.15)" activeLineColor="#00bf63" />
      </div>
      <FinalCTA />
    </>
  );
}
