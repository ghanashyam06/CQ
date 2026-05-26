import type { Metadata } from "next";
import { StoriesPreview } from "@/components/sections/StoriesPreview";
import StoriesBackground from "@/components/sections/StoriesBackground";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Builder Stories | CodeQuesters",
  description: "Read real stories of tech builders growing through the CodeQuesters ecosystem — from first hackathons to paid gigs, internships, and startups.",
};

export default function StoriesPage() {
  return (
    <div className="pt-20 relative">
      {/* Full-page particle background */}
      <StoriesBackground />

      <div className="pt-4 sm:pt-8 pb-2">
        <h1 className="sr-only">CodeQuesters Builder Stories</h1>
      </div>
      <StoriesPreview />
      <Footer />
    </div>
  );
}
