"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { use3DTilt } from "@/hooks/use3DTilt";

interface Event {
  id: number;
  title: string;
  category: string;
  date: string;
  mode: string;
  speaker: string;
  tags: string[];
  image: string;
}

function EventCard({ event }: { event: Event }) {
  const cardRef = use3DTilt<HTMLDivElement>(6, 1000);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      ref={cardRef}
      className="glass-card overflow-hidden group flex flex-col h-full cursor-default"
      style={{ willChange: "transform" }}
    >
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          {event.tags.map((tag, i) => (
            <span key={i} className="px-2.5 py-1 text-xs font-semibold rounded-md bg-background/80 backdrop-blur-md text-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {event.title}
        </h3>
        
        <div className="space-y-2 mb-6 mt-auto">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{event.mode}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
          <div className="text-sm">
            <span className="text-muted-foreground">By </span>
            <span className="font-semibold text-foreground">{event.speaker}</span>
          </div>
          <button className="flex items-center gap-1 text-primary text-sm font-semibold hover:gap-2 transition-all">
            Register <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function EventsWorkshops() {
  const [activeTab, setActiveTab] = useState("All");

  const tabs = ["All", "Workshops", "Bootcamps", "Sessions"];

  const events: Event[] = [
    {
      id: 1,
      title: "Full Stack Next.js Bootcamp",
      category: "Bootcamps",
      date: "Oct 15, 2025",
      mode: "Online",
      speaker: "Rahul S.",
      tags: ["Web Dev", "Next.js"],
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    },
    {
      id: 2,
      title: "AI/ML Demystified",
      category: "Workshops",
      date: "Oct 22, 2025",
      mode: "Offline • IIT Delhi",
      speaker: "Sneha M.",
      tags: ["AI/ML", "Python"],
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    },
    {
      id: 3,
      title: "Mastering System Design",
      category: "Sessions",
      date: "Nov 05, 2025",
      mode: "Online",
      speaker: "Karan T.",
      tags: ["Architecture", "System Design"],
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
    },
    {
      id: 4,
      title: "Web3 & Smart Contracts",
      category: "Workshops",
      date: "Nov 12, 2025",
      mode: "Online",
      speaker: "Priya K.",
      tags: ["Blockchain", "Solidity"],
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
    },
  ];

  const filteredEvents = activeTab === "All" ? events : events.filter(e => e.category === activeTab);

  return (
    <section id="events" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold font-heading mb-4"
            >
              Upcoming <span className="text-gradient">Events</span>
            </motion.h2>
            <p className="text-muted-foreground max-w-xl">
              Join our upcoming workshops, bootcamps, and sessions to learn from industry experts.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 p-1 rounded-2xl bg-card border border-border backdrop-blur-sm"
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {tab}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
