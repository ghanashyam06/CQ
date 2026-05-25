import type { Metadata } from "next";
import { AboutSnapshot }  from "@/components/sections/AboutSnapshot";
import { Principles }     from "@/components/sections/Principles";
import { GroundRule }      from "@/components/sections/GroundRule";
import { ImpactStats }    from "@/components/sections/ImpactStats";
import MagnetLines        from "@/components/ui/MagnetLines";

export const metadata: Metadata = {
  title: "About Us | CodeQuesters Builder Ecosystem",
  description: "Learn about the mission, principles, ground rules, and impact of India's student-first tech builder ecosystem.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <div className="text-center pt-12 pb-4">
        <h1 className="sr-only">About CodeQuesters</h1>
      </div>
      <AboutSnapshot />
      <Principles />
      <GroundRule />
      <div className="my-8">
        <MagnetLines columns={32} rows={1} lineColor="rgba(0, 191, 99, 0.15)" activeLineColor="#00bf63" />
      </div>
      <ImpactStats />
    </div>
  );
}
