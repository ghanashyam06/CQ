"use client";

import { AboutSnapshot }  from "@/components/sections/AboutSnapshot";
import { Principles }     from "@/components/sections/Principles";
import { GroundRule }      from "@/components/sections/GroundRule";
import { ImpactStats }    from "@/components/sections/ImpactStats";
import { Footer }         from "@/components/Footer";
import { SwipeSlider }    from "@/components/ui/SwipeSlider";

export function AboutClient() {
  return (
    <SwipeSlider>
      {/* Slide 1: About Snapshot */}
      <div className="w-full min-h-screen flex items-center justify-center py-16 sm:py-24">
        <AboutSnapshot />
      </div>

      {/* Slide 2: Principles */}
      <div className="w-full min-h-screen flex items-center justify-center py-16 sm:py-24">
        <Principles />
      </div>

      {/* Slide 3: Ground Rules */}
      <div className="w-full min-h-screen flex items-center justify-center py-16 sm:py-24">
        <GroundRule />
      </div>

      {/* Slide 4: Ecosystem Stats & Footer */}
      <div className="w-full min-h-screen flex flex-col justify-between pt-16 sm:pt-24">
        <div className="flex-1 flex items-center justify-center">
          <ImpactStats />
        </div>
        <Footer />
      </div>
    </SwipeSlider>
  );
}
