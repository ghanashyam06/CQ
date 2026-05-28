"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowRight, X } from "lucide-react";
import { useTheme } from "next-themes";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CircularGallery from "@/components/ui/CircularGallery";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Story {
  image: string;
  text: string;
  /** YouTube video ID — e.g. "dQw4w9WgXcQ" from youtu.be/dQw4w9WgXcQ */
  videoId: string;
}

// ── Replace each videoId with the YouTube video ID for that person ──
// YouTube video ID is the part after "v=" in the URL, e.g.:
//   https://www.youtube.com/watch?v=ABC123  →  videoId: "ABC123"
//   https://youtu.be/ABC123                 →  videoId: "ABC123"
const stories: Story[] = [
  { image: "/joshitha-opt.jpg",        text: "Joshitha",        videoId: "9-cy16B7qro" },
  { image: "/omkar-raane-opt.jpg",     text: "Omkar Raane",     videoId: "9-cy16B7qro" },
  { image: "/shruthi-opt.jpg",         text: "Shruthi",         videoId: "9-cy16B7qro" },
  { image: "/manas-himay.png",         text: "Maanas & Himay",  videoId: "9-cy16B7qro" },
  { image: "/anamika-kumari-opt.jpg",  text: "Anamika Kumari",  videoId: "9-cy16B7qro" },
  { image: "/hassan-ahmed-opt.jpg",    text: "Hassan Ahmed",    videoId: "9-cy16B7qro" },
];

export function StoriesPreview() {
  const sectionRef   = useRef<HTMLElement>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);
  const cardRef      = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted]         = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [isMobile, setIsMobile]       = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  /* ── Detect mobile to disable bend ── */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── Section entrance animations ── */
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" };
      gsap.from(".stories-label", { opacity: 0, y: 20, duration: 0.5, ease: "power3.out", scrollTrigger: st });
      gsap.from(".stories-heading", { opacity: 0, y: 30, duration: 0.7, delay: 0.1, ease: "power3.out", scrollTrigger: st });
      gsap.from(".stories-sub",    { opacity: 0, y: 20, duration: 0.6, delay: 0.15, ease: "power3.out", scrollTrigger: st });
      gsap.from(".stories-link",   { opacity: 0, y: 15, duration: 0.5, delay: 0.2,  ease: "power3.out", scrollTrigger: st });
      gsap.from(".stories-gallery",{ opacity: 0, scale: 0.95, duration: 0.8, delay: 0.3, ease: "power3.out",
        scrollTrigger: { trigger: ".stories-gallery", start: "top 90%", toggleActions: "play none none reverse" },
      });
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  /* ── Open modal ── */
  const openVideo = useCallback((videoId: string) => {
    setActiveVideo(videoId);
    // Animate in after the iframe is mounted (next frame)
    requestAnimationFrame(() => {
      if (!overlayRef.current || !cardRef.current) return;
      gsap.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.35, ease: "power2.out" }
      );
      gsap.fromTo(cardRef.current,
        { opacity: 0, scale: 0.88, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.4)" }
      );
    });
    document.body.style.overflow = "hidden";
  }, []);

  /* ── Close modal ── */
  const closeVideo = useCallback(() => {
    if (!overlayRef.current || !cardRef.current) return;
    gsap.to(cardRef.current,   { opacity: 0, scale: 0.9, y: 30, duration: 0.3, ease: "power2.in" });
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.35, ease: "power2.in", delay: 0.05,
      onComplete: () => {
        setActiveVideo(null);
        document.body.style.overflow = "";
      },
    });
  }, []);

  /* ── Escape key ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeVideo(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeVideo]);

  const textColor = mounted && resolvedTheme === "light" ? "#091e12" : "#ffffff";

  return (
    <section ref={sectionRef} id="stories" className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">

      {/* ── Heading ── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
        <div className="text-center">
          <p className="stories-label text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">
            Stories
          </p>
          <h2 className="stories-heading text-3xl md:text-5xl font-bold font-heading mb-4">
            Real Stories.{" "}
            <span className="text-gradient">Real Growth.</span>
          </h2>
          <p className="stories-sub text-muted-foreground max-w-2xl mx-auto mb-6">
            The strongest proof of impact isn&apos;t numbers — it&apos;s the builders who grew
            through the ecosystem. From first hackathons to internships, startup roles,
            collaborations, and confidence.
          </p>
          <button
            onClick={() => stories[0] && openVideo(stories[0].videoId)}
            className="stories-link inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
          >
            Watch Builder Stories <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Gallery — no bend on mobile to prevent card overlap ── */}
      <div className="stories-gallery w-full h-[360px] sm:h-[460px] lg:h-[560px] relative overflow-hidden">
        <CircularGallery
          items={stories}
          bend={isMobile ? 0 : 3}
          textColor={textColor}
          borderRadius={0.05}
          scrollEase={0.02}
          onItemClick={openVideo}
        />
      </div>

      {/* ── Video Modal ── */}
      {activeVideo && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-8"
          style={{ backgroundColor: "rgba(0,0,0,0.9)", backdropFilter: "blur(12px)" }}
          onClick={(e) => { if (e.target === overlayRef.current) closeVideo(); }}
        >
          {/* Card + close button wrapper — positioned together so X never overlaps navbar */}
          <div className="relative flex flex-col items-end gap-2 w-full max-w-sm">

            {/* Close button — sits just above the video card */}
            <button
              onClick={closeVideo}
              aria-label="Close video"
              className="w-10 h-10 rounded-full bg-black/80 hover:bg-primary border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110 shadow-xl shrink-0"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video card — 9:16 portrait for Shorts */}
            <div
              ref={cardRef}
              className="relative w-full rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,191,99,0.25)] border border-primary/20 bg-black"
              style={{ aspectRatio: "9/16", maxHeight: "80vh" }}
            >
              {/* Green glow ring */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none z-10"
                style={{ boxShadow: "inset 0 0 40px rgba(0,191,99,0.08)" }}
              />

              <iframe
                key={activeVideo}
                src={`https://www.youtube-nocookie.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Builder Story Video"
                style={{ border: "none", display: "block" }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
