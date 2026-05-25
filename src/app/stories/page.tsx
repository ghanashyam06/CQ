import type { Metadata } from "next";
import { StoriesPreview } from "@/components/sections/StoriesPreview";
import StoriesBackground from "@/components/sections/StoriesBackground";

export const metadata: Metadata = {
  title: "Builder Stories | CodeQuesters",
  description: "Read real stories of tech builders growing through the CodeQuesters ecosystem — from first hackathons to paid gigs, internships, and startups.",
};

export default function StoriesPage() {
  return (
    <div className="pt-20 relative">
      {/* Full-page particle background */}
      <StoriesBackground />

      <div className="text-center pt-12 pb-4">
        <h1 className="sr-only">CodeQuesters Builder Stories</h1>
      </div>
      <StoriesPreview />
    </div>
  );
}
