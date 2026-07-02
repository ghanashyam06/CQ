"use client";

import { useEffect, useRef } from "react";
import { LogoLoop } from "@/components/ui/LogoLoop";
import { FaGithub } from "react-icons/fa6";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const partners = [
  {
    label: "CS CoWorking Spaces",
    src: "/partners/coworking.png",
  },
  {
    label: "DEOREL Squad",
    src: "/partners/devrel.png",
  },
  {
    label: "GreatHire",
    src: "/partners/gh.png",
  },
  {
    label: "GradSkills",
    src: "/partners/grandskills.png",
  },
  {
    label: "ICS",
    src: "/partners/ics.png",
  },
  {
    label: "MeDo",
    src: "/partners/medo.png",
  },
  {
    label: "OSEN",
    src: "/partners/osen.png",
  },
  {
    label: "Rocket",
    src: "/partners/rocket.png",
  },
  {
    label: "Supervity",
    src: "/partners/supervity.png",
  },
];

const githubLogo = {
  node: (
    <div className="flex items-center justify-center px-6 py-3">
      <FaGithub
        className="transition-colors duration-300 text-foreground"
        style={{ width: "auto", height: "80px", display: "block" }}
        aria-label="GitHub"
      />
    </div>
  ),
  title: "GitHub",
};

const logos = [...partners.map((p) => ({
  node: (
    <div className="flex items-center justify-center px-6 py-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={p.src}
        alt={p.label}
        title={p.label}
        draggable={false}
        className="transition-[filter] duration-300 logo-dark-invert"
        style={{
          height: "80px",
          width: "auto",
          maxWidth: "200px",
          objectFit: "contain",
          display: "block",
        }}
      />
    </div>
  ),
  title: p.label,
})), githubLogo];

export function TrustedBy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".trusted-label", {
        opacity: 0, y: 20, duration: 0.5, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".trusted-heading", {
        opacity: 0, y: 25, duration: 0.6, delay: 0.1, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".trusted-sub", {
        opacity: 0, y: 20, duration: 0.5, delay: 0.15, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(".trusted-row-1", {
        x: -400,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      gsap.to(".trusted-row-2", {
        x: 400,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-10 sm:py-14 lg:py-20 relative border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <p className="trusted-label text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-2">
          Trusted By
        </p>
        <h2 className="trusted-heading text-2xl md:text-3xl font-bold text-foreground">
          Builders, Communities &amp;{" "}
          <span className="text-gradient">Innovators</span>
        </h2>
        <p className="trusted-sub text-muted-foreground mt-3 max-w-xl mx-auto text-sm">
          CodeQuesters collaborates with hackathons, student communities, startups,
          institutions, and industry professionals to create meaningful opportunities for everyone.
        </p>
      </div>

      <div className="trusted-loop relative w-full overflow-hidden flex flex-col gap-10 py-4">
        {/* Row 1 moving left */}
        <div className="trusted-row-1 flex items-center gap-16 min-w-max -ml-[200px]">
          {[...logos, ...logos, ...logos, ...logos, ...logos].map((logo, i) => (
            <div key={i} className="flex-shrink-0">
              {logo.node}
            </div>
          ))}
        </div>
        {/* Row 2 moving right */}
        <div className="trusted-row-2 flex items-center gap-16 min-w-max -ml-[800px]">
          {[...logos, ...logos, ...logos, ...logos, ...logos].reverse().map((logo, i) => (
            <div key={i} className="flex-shrink-0">
              {logo.node}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
