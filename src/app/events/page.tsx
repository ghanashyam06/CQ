import type { Metadata } from "next";
import { EventsClient } from "./EventsClient";

export const metadata: Metadata = {
  title: "Events & Hackathons | CodeQuesters",
  description: "Discover upcoming workshops, hybrid hackathons, bootcamps, and track your complete technology growth journey with CodeQuesters.",
};

export default function EventsPage() {
  return (
    <div className="pt-20">
      <div className="pt-4 sm:pt-8 pb-2">
        <h1 className="sr-only">CodeQuesters Events & Hackathons</h1>
      </div>
      <EventsClient />
    </div>
  );
}
