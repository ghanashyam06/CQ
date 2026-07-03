import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact Us | CodeQuesters",
  description:
    "Get in touch with CodeQuesters. Whether you're a student, company, founder, or partner, we're always open to collaborating.",
};

export default function ContactPage() {
  return (
    <>
      <h1 className="sr-only">Contact CodeQuesters</h1>
      <ContactSection />
      <Footer />
    </>
  );
}
