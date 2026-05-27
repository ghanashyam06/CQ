"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ExternalLink, CheckCircle2, Clock } from "lucide-react";
import { use3DTilt } from "@/hooks/use3DTilt";
import Image from "next/image";

interface Event {
  id: number;
  title: string;
  category: string;
  date: string;
  /** ISO date — used to auto-compute past/upcoming and sort order */
  endDate: string;
  mode: string;
  speaker: string;
  tags: string[];
  image: string;
  registerUrl?: string;
}

type EventWithStatus = Event & { status: "completed" | "upcoming" };

/* ── Raw data — add new events here, endDate drives status automatically ── */
const RAW_EVENTS: Event[] = [
  {
    id: 1,
    title: "Supervity Workshop — Build Your First AI Agent LIVE!",
    category: "Workshops",
    date: "Apr 2, 2026 · 7:00 PM – 9:00 PM IST",
    endDate: "2026-04-02",
    mode: "Virtual",
    speaker: "T Rishik Goud · Supervity",
    tags: ["AI Agents", "No-Code"],
    image: "/supervity-ai-workshop.avif",
  },
  {
    id: 2,
    title: "CODEQUEST 2026 — GenAI Hackathon",
    category: "Hackathons",
    date: "Apr 12, 2026",
    endDate: "2026-04-12",
    mode: "Hybrid",
    speaker: "CodeQuesters",
    tags: ["GenAI", "Hackathon"],
    image: "/1st Winner.JPG",
  },
  {
    id: 3,
    title: "Compete & Win: Summer Internship Challenge 2026",
    category: "Internship",
    date: "May 31, 2026 · 9:00 AM – 5:00 PM IST",
    endDate: "2026-06-01",   // flips to "completed" automatically after June 1
    mode: "CS Coworking Spaces, Raidurg, Hyderabad + Virtual",
    speaker: "GradSkills × CodeQuesters",
    tags: ["Internship", "AI"],
    image: "/summership-2026.png",
    registerUrl: "https://chat.whatsapp.com/Caytnn7oWsrKI68W3hJDYC",
  },
];

/* ── Card ── */
function EventCard({ event }: { event: EventWithStatus }) {
  const cardRef = use3DTilt<HTMLDivElement>(6, 1000);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      ref={cardRef}
      className="glass-card overflow-hidden group flex flex-col h-full cursor-default"
      style={{ willChange: "transform" }}
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {/* Tags */}
        <div className="absolute top-3 right-3 z-20 flex flex-wrap gap-1.5 justify-end">
          {event.tags.map((tag, i) => (
            <span key={i} className="px-2 py-0.5 text-xs font-semibold rounded-md bg-background/80 backdrop-blur-md text-foreground">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-base font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
          {event.title}
        </h3>

        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 text-primary shrink-0" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <span className="line-clamp-1">{event.mode}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
          <div className="text-sm min-w-0 mr-3">
            <span className="text-muted-foreground">By </span>
            <span className="font-semibold text-foreground line-clamp-1">{event.speaker}</span>
          </div>
          {event.status === "upcoming" && event.registerUrl ? (
            <a
              href={event.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary text-sm font-semibold hover:gap-2 transition-all shrink-0"
            >
              Register <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <span className="text-xs text-muted-foreground shrink-0">Ended</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Section ── */
export function EventsWorkshops() {
  const { upcoming, past } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const withStatus: EventWithStatus[] = RAW_EVENTS.map((e) => ({
      ...e,
      status: new Date(e.endDate) < today ? "completed" : "upcoming",
    }));

    const upcoming = withStatus
      .filter((e) => e.status === "upcoming")
      .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()); // soonest first

    const past = withStatus
      .filter((e) => e.status === "completed")
      .sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime()); // latest first

    return { upcoming, past };
  }, []);

  return (
    <section id="events" className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20">

        {/* ── Upcoming Events ── */}
        {upcoming.length > 0 && (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading">
                  Upcoming <span className="text-gradient">Events</span>
                </h2>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                {upcoming.length} event{upcoming.length !== 1 ? "s" : ""}
              </span>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {upcoming.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  {/* Upcoming badge on card */}
                  <div className="relative">
                    <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-primary/20 border border-primary/40 text-primary text-xs font-semibold backdrop-blur-md">
                      <Clock className="w-3 h-3" /> Upcoming
                    </div>
                    <EventCard event={event} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ── Past Events ── */}
        {past.length > 0 && (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading">
                  Past <span className="text-gradient">Events</span>
                </h2>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                {past.length} completed
              </span>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {past.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  {/* Completed badge on card */}
                  <div className="relative">
                    <div className="absolute top-3 left-3 z-30 flex items-center gap-1 px-2 py-0.5 rounded-md bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-semibold backdrop-blur-md">
                      <CheckCircle2 className="w-3 h-3" /> Completed
                    </div>
                    <EventCard event={event} />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {upcoming.length === 0 && past.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No events yet. Check back soon!
          </div>
        )}

      </div>
    </section>
  );
}
