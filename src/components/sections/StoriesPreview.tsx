"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, X, Play } from "lucide-react";
import { useTheme } from "next-themes";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CircularGallery = dynamic(() => import("@/components/ui/CircularGallery"), { ssr: false });

const CLOUD = "dihm1rwgk";

function cldVideo(publicId: string, format: string) {
  return `https://res.cloudinary.com/${CLOUD}/video/upload/f_auto,q_auto:good/${publicId}.${format}`;
}

function cldPoster(publicId: string) {
  return `https://res.cloudinary.com/${CLOUD}/video/upload/so_0,f_jpg,q_auto:good,w_640/${publicId}.jpg`;
}

interface Story {
  image: string;
  text: string;
  videoPublicId: string;
  format: "mp4" | "mov";
  role: string;
}

const stories: Story[] = [
  {
    image: "/omkar-raane-opt.jpg",
    text: "Omkar Rane",
    role: "Builder • Hackathon Winner",
    videoPublicId: "Omkar_rane_vva0ct",
    format: "mp4",
  },
  {
    image: "/joshitha-opt.jpg",
    text: "@all",
    role: "Overall Experience",
    videoPublicId: "Experience_h9jl1m",
    format: "mov",
  },
  {
    image: "/hassan-ahmed-opt.jpg",
    text: "Laksh",
    role: "Developer • Open-Source",
    videoPublicId: "Laksh_rzwrd5",
    format: "mp4",
  },
  {
    image: "/anamika-kumari-opt.jpg",
    text: "Event Story",
    role: "CodeQuesters Events",
    videoPublicId: "Eventcrazy_f0n3mf",
    format: "mov",
  },
];

export function StoriesPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" };
      gsap.from(".stories-label",   { opacity: 0, y: 16, duration: 0.5, ease: "power3.out", scrollTrigger: st });
      gsap.from(".stories-heading", { opacity: 0, y: 24, duration: 0.6, delay: 0.1, ease: "power3.out", scrollTrigger: st });
      gsap.from(".stories-sub",     { opacity: 0, y: 16, duration: 0.5, delay: 0.15, ease: "power3.out", scrollTrigger: st });
      gsap.from(".stories-link",    { opacity: 0, y: 12, duration: 0.4, delay: 0.2, ease: "power3.out", scrollTrigger: st });
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  const openVideo = useCallback((videoPublicId: string) => {
    const story = stories.find((s) => s.videoPublicId === videoPublicId) ?? stories[0];
    setVideoReady(false);
    setActiveStory(story);
    requestAnimationFrame(() => {
      if (!overlayRef.current || !cardRef.current) return;
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(cardRef.current,
        { opacity: 0, scale: 0.92, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.4)" }
      );
    });
    document.body.style.overflow = "hidden";
  }, []);

  const closeVideo = useCallback(() => {
    if (!overlayRef.current || !cardRef.current) return;
    videoRef.current?.pause();
    gsap.to(cardRef.current, { opacity: 0, scale: 0.93, y: 20, duration: 0.25, ease: "power2.in" });
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.3, ease: "power2.in", delay: 0.05,
      onComplete: () => {
        setActiveStory(null);
        setVideoReady(false);
        document.body.style.overflow = "";
      },
    });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeVideo(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeVideo]);

  const handleItemClick = useCallback((id: string) => openVideo(id), [openVideo]);

  const galleryItems = stories.map((s) => ({
    image: s.image,
    text: s.text,
    videoId: s.videoPublicId,
  }));

  const textColor = mounted && resolvedTheme === "light" ? "#0d120e" : "#eef2ef";

  return (
    <section ref={sectionRef} id="stories" className="py-16 sm:py-20 lg:py-28 relative overflow-hidden">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
        <div className="text-center">
          <p className="stories-label text-xs font-semibold tracking-[0.15em] uppercase text-primary mb-3">
            Stories
          </p>
          <h2 className="stories-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Real Stories.{" "}
            <span className="text-gradient">Real Growth.</span>
          </h2>
          <p className="stories-sub text-muted-foreground max-w-2xl mx-auto mb-6 leading-relaxed">
            The strongest proof of impact isn&apos;t numbers — it&apos;s the builders who grew
            through the ecosystem. From first hackathons to internships, startup roles,
            collaborations, and confidence.
          </p>
          <button
            onClick={() => stories[0] && openVideo(stories[0].videoPublicId)}
            className="stories-link inline-flex items-center gap-2 text-primary text-sm font-semibold hover:gap-3 transition-all"
          >
            Watch Builder Stories <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Gallery */}
      <div className="w-full h-[340px] sm:h-[440px] lg:h-[540px] relative overflow-hidden">
        <CircularGallery
          items={galleryItems}
          bend={isMobile ? 0 : 3}
          textColor={textColor}
          borderRadius={0.05}
          scrollEase={0.02}
          onItemClick={handleItemClick}
        />
      </div>

      {/* Video Modal */}
      {activeStory && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-8"
          style={{ backgroundColor: "rgba(0,0,0,0.90)", backdropFilter: "blur(12px)" }}
          onClick={(e) => { if (e.target === overlayRef.current) closeVideo(); }}
        >
          <div className="relative flex flex-col items-end gap-2 w-full max-w-sm">
            <button
              onClick={closeVideo}
              aria-label="Close video"
              className="w-9 h-9 rounded-full border border-white/20 bg-black/70 hover:bg-primary flex items-center justify-center text-white transition-all duration-200 shrink-0"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-full flex items-center gap-3 px-1 mb-1">
              <div>
                <p className="text-white font-semibold text-sm">{activeStory.text}</p>
                <p className="text-primary text-xs">{activeStory.role}</p>
              </div>
            </div>

            <div
              ref={cardRef}
              className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-black"
              style={{ aspectRatio: "9/16", maxHeight: "80vh" }}
            >
              {!videoReady && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60">
                  <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                </div>
              )}
              <video
                ref={videoRef}
                key={activeStory.videoPublicId}
                src={cldVideo(activeStory.videoPublicId, activeStory.format)}
                poster={cldPoster(activeStory.videoPublicId)}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                controls
                controlsList="nodownload"
                onCanPlay={() => setVideoReady(true)}
                style={{ display: "block" }}
              />
            </div>

            <div className="flex items-center justify-center gap-2 w-full mt-1">
              {stories.map((s, i) => (
                <button
                  key={s.videoPublicId}
                  onClick={() => openVideo(s.videoPublicId)}
                  aria-label={`Watch ${s.text}`}
                  className={`transition-all duration-200 rounded-full ${
                    activeStory.videoPublicId === s.videoPublicId
                      ? "w-6 h-2 bg-primary"
                      : "w-2 h-2 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
