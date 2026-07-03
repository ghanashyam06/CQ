"use client";

import { EventsWorkshops } from "@/components/sections/EventsWorkshops";
import { Hackathons }      from "@/components/sections/Hackathons";
import { JourneyRoadmap }  from "@/components/sections/JourneyRoadmap";
import { Footer }          from "@/components/Footer";
import { SwipeSlider }     from "@/components/ui/SwipeSlider";

export function EventsClient() {
  return (
    <SwipeSlider>
      <div className="w-full min-h-screen flex items-center justify-center py-12 sm:py-16">
        <div className="w-full">
          <EventsWorkshops />
        </div>
      </div>

      <div className="w-full min-h-screen flex items-center justify-center py-12 sm:py-16">
        <div className="w-full">
          <Hackathons />
        </div>
      </div>

      <div className="w-full min-h-screen flex flex-col justify-between py-12 sm:py-16">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full">
            <JourneyRoadmap />
          </div>
        </div>
        <Footer />
      </div>
    </SwipeSlider>
  );
}
