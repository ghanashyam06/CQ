"use client";

import { useEffect, useRef } from "react";
import { FaGithub } from "react-icons/fa6";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const partners = [
  { label: "CS CoWorking Spaces", src: "/partners/coworking.png" },
  { label: "DEOREL Squad",        src: "/partners/devrel.png" },
  { label: "GreatHire",           src: "/partners/gh.png" },
  { label: "GradSkills",          src: "/partners/grandskills.png" },
  { label: "ICS",                 src: "/partners/ics.png" },
  { label: "MeDo",                src: "/partners/medo.png" },
  { label: "OSEN",                src: "/partners/osen.png" },
  { label: "Rocket",              src: "/partners/rocket.png" },
  { label: "Supervity",           src: "/partners/supervity.png" },
];

const githubLogo = {
  node: (
    <div className="flex items-center justify-center px-6 py-3">
      <FaGithub
        className="text-foreground"
        style={{ width: "auto", height: "52px", display: "block" }}
        aria-label="GitHub"
      />
    </div>
  ),
  title: "GitHub",
};

const logos = [
  ...partners.map((p) => ({
    node: (
      <div key={p.label} className="flex items-center justify-center px-6 py-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={p.src}
          alt={p.label}
          title={p.label}
          draggable={false}
          className="logo-dark-invert"
          style={{ height: "52px", width: "auto", maxWidth: "160px", objectFit: "contain", display: "block" }}
        />
      </div>
    ),
    title: p.label,
  })),
  githubLogo,
];

export function TrustedBy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const st = {
        trigger: sectionRef.current,
        start: "top 85%",
        toggleActions: "play none none reverse",
      };

      gsap.from(".trusted-label",   { opacity: 0, y: 16, duration: 0.5, ease: "power3.out", scrollTrigger: st });
      gsap.from(".trusted-heading", { opacity: 0, y: 20, duration: 0.6, delay: 0.1, ease: "power3.out", scrollTrigger: st });
      gsap.from(".trusted-sub",     { opacity: 0, y: 16, duration: 0.5, delay: 0.15, ease: "power3.out", scrollTrigger: st });

      gsap.to(".trusted-row-1", {
        x: -360, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
      });
      gsap.to(".trusted-row-2", {
        x: 360, ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 sm:py-20 relative border-t border-b border-border overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <p className="trusted-label text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground mb-3">
          Trusted By
        </p>
        <h2 className="trusted-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
          Builders, Communities &amp;{" "}
          <span className="text-gradient">Innovators</span>
        </h2>
        <p className="trusted-sub text-muted-foreground mt-2 max-w-xl mx-auto text-sm">
          CodeQuesters collaborates with hackathons, student communities, startups,
          institutions, and industry professionals to create meaningful opportunities for everyone.
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex flex-col gap-8 py-2">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--background), transparent)" }} />
        <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--background), transparent)" }} />

        {/* Row 1 */}
        <div className="trusted-row-1 flex items-center gap-12 min-w-max opacity-60 dark:opacity-70 hover:opacity-100 transition-opacity duration-300">
          {[...logos, ...logos, ...logos, ...logos, ...logos].map((logo, i) => (
            <div key={i} className="shrink-0">{logo.node}</div>
          ))}
        </div>
        {/* Row 2 */}
        <div className="trusted-row-2 flex items-center gap-12 min-w-max -ml-[600px] opacity-60 dark:opacity-70 hover:opacity-100 transition-opacity duration-300">
          {[...logos, ...logos, ...logos, ...logos, ...logos].reverse().map((logo, i) => (
            <div key={i} className="shrink-0">{logo.node}</div>
          ))}
        </div>
      </div>
    </section>
  );
}
