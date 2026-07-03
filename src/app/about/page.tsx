import type { Metadata } from "next";
import { AboutClient } from "./AboutClient";

export const metadata: Metadata = {
  title: "About | CodeQuesters",
  description:
    "Learn about CodeQuesters — a builder-first ecosystem bridging the gap between learning and real-world opportunities for students and developers.",
};

export default function AboutPage() {
  return (
    <>
      <h1 className="sr-only">About CodeQuesters</h1>
      <AboutClient />
    </>
  );
}
