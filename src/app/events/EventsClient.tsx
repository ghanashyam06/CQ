"use client";

import { EventsWorkshops } from "@/components/sections/EventsWorkshops";
import { Hackathons }      from "@/components/sections/Hackathons";
import { JourneyRoadmap }  from "@/components/sections/JourneyRoadmap";
import { Footer }          from "@/components/Footer";
import { SwipeSlider }     from "@/components/ui/SwipeSlider";

export function EventsClient() {
  return (
    <SwipeSlider>
      {/* Slide 1: Workshops & Seminars */}
      <div className="w-full min-h-screen flex items-center justify-center py-16 sm:py-24">
        <EventsWorkshops />
      </div>

      {/* Slide 2: Hackathons */}
      <div className="w-full min-h-screen flex items-center justify-center py-16 sm:py-24">
        <Hackathons />
      </div>

      {/* Slide 3: Growth Roadmap & Footer */}
      <div className="w-full min-h-screen flex flex-col justify-between pt-16 sm:pt-24">
        <div className="flex-1 flex items-center justify-center">
          <JourneyRoadmap />
        </div>
        <Footer />
      </div>
    </SwipeSlider>
  );
}
