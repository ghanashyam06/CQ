"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export function FAQ() {
  const faqs = [
    {
      question: "Is CodeQuesters free?",
      answer: "Yes, joining the community and most of our online workshops/sessions are completely free. We believe in accessible education for all students. Some special offline events or hackathons might have a nominal fee to cover venue costs."
    },
    {
      question: "Who can join?",
      answer: "Any student who is passionate about technology! Whether you are a first-year beginner just starting with HTML, or a final-year student building complex AI models, there is a place for you here."
    },
    {
      question: "Are workshops beginner-friendly?",
      answer: "Absolutely. We clearly label the difficulty level of all our workshops. We regularly host 'Zero to One' bootcamps specifically designed for absolute beginners."
    },
    {
      question: "How do hackathons work?",
      answer: "Our hackathons are typically 24-48 hour events where you form teams to build software solutions to specific problem statements. We provide mentorship, resources, and exciting prizes for the winners."
    },
    {
      question: "Can colleges collaborate?",
      answer: "Yes! We actively collaborate with college tech clubs and societies to co-host events. You can apply to become a Campus Ambassador to bring CodeQuesters to your college."
    },
    {
      question: "How can companies sponsor?",
      answer: "We offer various sponsorship tiers that provide brand visibility, direct access to our talent pool for hiring, and event branding. Reach out to us via the contact form or email for a detailed sponsorship deck."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 relative border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold font-heading mb-4"
          >
            Frequently Asked <span className="text-gradient">Questions</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold text-lg text-foreground">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 pt-0 text-muted-foreground border-t border-border mt-2 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
