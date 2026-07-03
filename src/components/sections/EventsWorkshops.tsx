"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ExternalLink, CheckCircle2, Clock } from "lucide-react";
import Image from "next/image";

interface Event {
  id: number;
  title: string;
  category: string;
  date: string;
  endDate: string;
  mode: string;
  speaker: string;
  tags: string[];
  image: string;
  imageAspectRatio?: string;
  imageFit?: "contain" | "cover";
  registerUrl?: string;
}

type EventWithStatus = Event & { status: "completed" | "upcoming" };

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
    image: "/supervity-workshop.png",
    imageAspectRatio: "1/1",
    imageFit: "contain",
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
    image: "/CodeQuest-2026.jpg",
    imageAspectRatio: "1/1",
    imageFit: "contain",
  },
  {
    id: 3,
    title: "Compete & Win: Summer Internship Challenge 2026",
    category: "Internship",
    date: "May 31, 2026 · 9:00 AM – 5:00 PM IST",
    endDate: "2026-05-31",
    mode: "CS Coworking Spaces, Raidurg, Hyderabad + Virtual",
    speaker: "GradSkills × CodeQuesters",
    tags: ["Internship", "AI"],
    image: "/summership-2026.jpg",
    imageAspectRatio: "9/16",
    imageFit: "contain",
    registerUrl: "https://luma.com/goekfv3b?tk=xTmxzL",
  },
  {
    id: 4,
    title: "GitHub to Income: Building Real Opportunities Through Open Source",
    category: "Workshops",
    date: "May 30, 2026 · 5:00 PM – 7:00 PM IST",
    endDate: "2026-05-30",
    mode: "Virtual",
    speaker: "CodeQuesters × CDN IGNOU",
    tags: ["GitHub", "Open Source"],
    image: "/github_speaker_post.jpg",
    imageAspectRatio: "1587/2245",
    imageFit: "contain",
    registerUrl: "https://luma.com/7igei972?tk=4QSEVV",
  },
];

function EventCard({ event }: { event: EventWithStatus }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card overflow-hidden group flex flex-col h-full"
    >
      {/* Image */}
      <div
        className="relative w-full overflow-hidden bg-card"
        style={{ aspectRatio: event.imageAspectRatio ?? "16/9", maxHeight: "22rem" }}
      >
        <Image
          src={event.image}
          alt={event.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className={`${(event.imageFit ?? "contain") === "contain" ? "object-contain" : "object-cover"} group-hover:scale-[1.02] transition-transform duration-500`}
        />
        {/* Tags */}
        <div className="absolute top-3 right-3 z-20 flex flex-wrap gap-1.5 justify-end">
          {event.tags.map((tag, i) => (
            <span key={i} className="px-2 py-0.5 text-xs font-medium rounded-md backdrop-blur-sm text-foreground border border-border"
              style={{ background: "color-mix(in srgb, var(--background-card) 85%, transparent)" }}
            >
              {tag}
            </span>
          ))}
        </div>
        {/* Status badge */}
        <div className="absolute top-3 left-3 z-20">
          {event.status === "upcoming" ? (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md backdrop-blur-sm text-primary border border-primary/30 text-xs font-medium"
              style={{ background: "color-mix(in srgb, var(--background-card) 85%, transparent)" }}
            >
              <Clock className="w-3 h-3" /> Upcoming
            </div>
          ) : (
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-md backdrop-blur-sm text-green-600 dark:text-green-400 border border-green-500/30 text-xs font-medium"
              style={{ background: "color-mix(in srgb, var(--background-card) 85%, transparent)" }}
            >
              <CheckCircle2 className="w-3 h-3" /> Completed
            </div>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-sm font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
          {event.title}
        </h3>
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
            <span className="line-clamp-1">{event.mode}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
          <div className="text-xs min-w-0 mr-3">
            <span className="text-muted-foreground">By </span>
            <span className="font-medium text-foreground line-clamp-1">{event.speaker}</span>
          </div>
          {event.status === "upcoming" && event.registerUrl ? (
            <a
              href={event.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary text-xs font-semibold hover:gap-2 transition-all shrink-0"
            >
              Register <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-xs text-muted-foreground shrink-0">Ended</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function EventsWorkshops() {
  const { upcoming, past } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const withStatus: EventWithStatus[] = RAW_EVENTS.map((e) => ({
      ...e,
      status: new Date(e.endDate) < today ? "completed" : "upcoming",
    }));

    return {
      upcoming: withStatus
        .filter((e) => e.status === "upcoming")
        .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime()),
      past: withStatus
        .filter((e) => e.status === "completed")
        .sort((a, b) => new Date(b.endDate).getTime() - new Date(a.endDate).getTime()),
    };
  }, []);

  return (
    <section id="events" className="py-16 sm:py-20 lg:py-28 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-18">

        {/* Upcoming */}
        {upcoming.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                Upcoming <span className="text-gradient">Events</span>
              </h2>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full border border-border text-muted-foreground">
                {upcoming.length} event{upcoming.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {upcoming.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* Past */}
        {past.length > 0 && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
                Past <span className="text-gradient">Events</span>
              </h2>
              <span className="text-xs font-medium px-2.5 py-1 rounded-full border border-green-500/30 text-green-500">
                {past.length} completed
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {past.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {upcoming.length === 0 && past.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">
            No events yet. Check back soon!
          </div>
        )}
      </div>
    </section>
  );
}
