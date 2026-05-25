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
  videoId: string;
}

const stories: Story[] = [
  { image: "/joshitha-opt.jpg",        text: "Joshitha",        videoId: "1uv8gdNOsFljGz3PMQEAyw-FgDxtu3Eqh" },
  { image: "/omkar-raane-opt.jpg",     text: "Omkar Raane",     videoId: "1ZoO_kRBu5kbYIRZmTJ1A4-kuvqEeDCd4" },
  { image: "/shruthi-opt.jpg",         text: "Shruthi",         videoId: "1tmUez1kLm8ZceudbJeRUMtew2hQhNkEO" },
  { image: "/manas-himay.png",         text: "Maanas & Himay",  videoId: "1k7LUOcJjcDDrmN7EcxVkHv9CVhCLRc-T" },
  { image: "/anamika-kumari-opt.jpg",  text: "Anamika Kumari",  videoId: "1u4zm-evr-VEYfmCadexF66BfLcg4iG8-" },
  { image: "/hassan-ahmed-opt.jpg",    text: "Hassan Ahmed",    videoId: "1DuAc0d-RYm80fY11Ln3kcE7mCyWBgdR-" },
];

export function StoriesPreview() {
  const sectionRef   = useRef<HTMLElement>(null);
  const overlayRef   = useRef<HTMLDivElement>(null);
  const cardRef      = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted]       = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
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

  const textColor = mounted && resolvedTheme === "light" ? "#0a0a0a" : "#ffffff";

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

      {/* ── Gallery — shorter on mobile ── */}
      <div className="stories-gallery w-full h-[360px] sm:h-[460px] lg:h-[560px] relative">
        <CircularGallery
          items={stories}
          bend={3}
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
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
          style={{ backgroundColor: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)" }}
          onClick={(e) => { if (e.target === overlayRef.current) closeVideo(); }}
        >
          <div
            ref={cardRef}
            className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,191,99,0.25)] border border-primary/20"
            style={{ aspectRatio: "16/9" }}
          >
            {/* Close button */}
            <button
              onClick={closeVideo}
              aria-label="Close video"
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-primary/80 border border-white/20 flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Green glow ring */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ boxShadow: "inset 0 0 40px rgba(0,191,99,0.08)" }} />

            {/* Drive embed — /preview renders the native player inline */}
            <iframe
              src={`https://drive.google.com/file/d/${activeVideo}/preview`}
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
              title="Builder Story Video"
              style={{ border: "none", display: "block" }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
