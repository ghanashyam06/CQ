import { Hero } from "@/components/sections/Hero";
import { ImpactStats } from "@/components/sections/ImpactStats";
import { JourneyRoadmap } from "@/components/sections/JourneyRoadmap";
import { EventsWorkshops } from "@/components/sections/EventsWorkshops";
import { Hackathons } from "@/components/sections/Hackathons";
import { WhyJoin } from "@/components/sections/WhyJoin";
import { Testimonials } from "@/components/sections/Testimonials";
import { Sponsors } from "@/components/sections/Sponsors";
import { CommunityEcosystem } from "@/components/sections/CommunityEcosystem";
import { Opportunities } from "@/components/sections/Opportunities";
import { WhatsAppCTA } from "@/components/sections/WhatsAppCTA";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ImpactStats />
      <JourneyRoadmap />
      <EventsWorkshops />
      <Hackathons />
      <WhyJoin />
      <Testimonials />
      <Sponsors />
      <CommunityEcosystem />
      <Opportunities />
      <WhatsAppCTA />
      <FAQ />
      <FinalCTA />
    </>
  );
}
