import type { Metadata } from "next";
import { EventsWorkshops } from "@/components/sections/EventsWorkshops";
import { Hackathons }      from "@/components/sections/Hackathons";
import { JourneyRoadmap }  from "@/components/sections/JourneyRoadmap";
import MagnetLines         from "@/components/ui/MagnetLines";

export const metadata: Metadata = {
  title: "Events & Hackathons | CodeQuesters",
  description: "Discover upcoming workshops, hybrid hackathons, bootcamps, and track your complete technology growth journey with CodeQuesters.",
};

export default function EventsPage() {
  return (
    <div className="pt-20">
      <div className="text-center pt-12 pb-4">
        <h1 className="sr-only">CodeQuesters Events & Hackathons</h1>
      </div>
      <EventsWorkshops />
      <div className="my-8">
        <MagnetLines columns={32} rows={1} lineColor="rgba(0, 191, 99, 0.15)" activeLineColor="#00bf63" />
      </div>
      <Hackathons />
      <div className="my-8">
        <MagnetLines columns={32} rows={1} lineColor="rgba(0, 191, 99, 0.15)" activeLineColor="#00bf63" />
      </div>
      <JourneyRoadmap />
    </div>
  );
}
