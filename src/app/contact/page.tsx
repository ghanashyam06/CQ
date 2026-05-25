import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact Us | CodeQuesters",
  description: "Get in touch with CodeQuesters. Whether you're a student, company, founder, or partner, we're always open to collaborating.",
};

export default function ContactPage() {
  return (
    <div className="pt-20">
      <div className="text-center pt-12 pb-4">
        <h1 className="sr-only">Contact CodeQuesters</h1>
      </div>
      <ContactSection />
    </div>
  );
}
