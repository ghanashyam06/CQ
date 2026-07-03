"use client";

import { AboutSnapshot }  from "@/components/sections/AboutSnapshot";
import { Principles }     from "@/components/sections/Principles";
import { GroundRule }     from "@/components/sections/GroundRule";
import { ImpactStats }    from "@/components/sections/ImpactStats";
import { Footer }         from "@/components/Footer";
import { SwipeSlider }    from "@/components/ui/SwipeSlider";

export function AboutClient() {
  return (
    <SwipeSlider>
      <div className="w-full min-h-screen flex items-center justify-center py-12 sm:py-16">
        <div className="w-full">
          <AboutSnapshot />
        </div>
      </div>

      <div className="w-full min-h-screen flex items-center justify-center py-12 sm:py-16">
        <div className="w-full">
          <Principles />
        </div>
      </div>

      <div className="w-full min-h-screen flex items-center justify-center py-12 sm:py-16">
        <div className="w-full">
          <GroundRule />
        </div>
      </div>

      <div className="w-full min-h-screen flex flex-col justify-between py-12 sm:py-16">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full">
            <ImpactStats />
          </div>
        </div>
        <Footer />
      </div>
    </SwipeSlider>
  );
}
