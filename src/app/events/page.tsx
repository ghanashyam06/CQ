import type { Metadata } from "next";
import { EventsClient } from "./EventsClient";

export const metadata: Metadata = {
  title: "Events & Hackathons | CodeQuesters",
  description:
    "Explore upcoming and past events, workshops, and hackathons hosted by CodeQuesters for students and builders.",
};

export default function EventsPage() {
  return (
    <>
      <h1 className="sr-only">CodeQuesters Events</h1>
      <EventsClient />
    </>
  );
}
