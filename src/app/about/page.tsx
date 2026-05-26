import type { Metadata } from "next";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
  title: "About Us | CodeQuesters Builder Ecosystem",
  description: "Learn about the mission, principles, ground rules, and impact of India's student-first tech builder ecosystem.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <div className="pt-4 sm:pt-8 pb-2">
        <h1 className="sr-only">About CodeQuesters</h1>
      </div>
      <AboutClient />
    </div>
  );
}
