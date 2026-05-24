"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const navLinks = [
  { name: "Home",    href: "#home" },
  { name: "About",   href: "#about" },
  { name: "Events",  href: "#events" },
  { name: "Stories", href: "#stories" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isMobileMenuOpen, setMobileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hasScrolled = useRef(false);

  useEffect(() => setMounted(true), []);

  // GSAP glassmorphism on scroll
  useEffect(() => {
    if (!navRef.current) return;
    const nav = navRef.current;

    const onScroll = () => {
      const scrolled = window.scrollY > 50;
      if (scrolled === hasScrolled.current) return;
      hasScrolled.current = scrolled;

      const isDark = document.documentElement.classList.contains("dark");

      if (scrolled) {
        gsap.to(nav, {
          backgroundColor: isDark ? "rgba(5,8,22,0.85)" : "rgba(255,255,255,0.90)",
          backdropFilter: "blur(20px)",
          borderBottomColor: isDark ? "rgba(0,191,99,0.2)" : "rgba(0,0,0,0.1)",
          boxShadow: isDark
            ? "0 4px 30px rgba(0,0,0,0.3), 0 1px 0 rgba(0,191,99,0.15)"
            : "0 4px 20px rgba(0,0,0,0.08), 0 1px 0 rgba(0,0,0,0.05)",
          duration: 0.4,
          ease: "power2.out",
        });
      } else {
        gsap.to(nav, {
          backgroundColor: "transparent",
          backdropFilter: "blur(0px)",
          borderBottomColor: "transparent",
          boxShadow: "none",
          duration: 0.4,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Mobile menu GSAP animation
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileMenuOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -20, display: "none" },
        { opacity: 1, y: 0, display: "flex", duration: 0.3, ease: "power3.out" }
      );
      // Stagger children
      const items = mobileMenuRef.current.querySelectorAll(".mobile-nav-item");
      gsap.fromTo(
        items,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.05, duration: 0.3, delay: 0.1, ease: "power3.out" }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          if (mobileMenuRef.current) {
            mobileMenuRef.current.style.display = "none";
          }
        },
      });
    }
  }, [isMobileMenuOpen]);

  const scrollTo = useCallback((href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMobileMenu(false);
    }
  }, []);

  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");
  const isDark = !mounted || resolvedTheme === "dark";

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 glass-nav"
      style={{ borderBottom: "1px solid transparent" }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* ── Logo ── */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="Go to home"
          >
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0 group-hover:scale-110 transition-transform duration-200">
              <Image
                src="/logo-CQ-tech.png"
                alt="CodeQuesters Logo"
                fill
                sizes="40px"
                className="object-contain"
                priority
              />
            </div>
            <span className="text-base sm:text-lg font-bold font-heading tracking-tight text-foreground leading-tight">
              Code<span className="text-primary">Questers</span>
            </span>
          </button>

          {/* ── Desktop Navigation (centered) ── */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className={`nav-link px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  activeSection === link.href.slice(1)
                    ? "active text-primary"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* ── Desktop: theme toggle + CTA ── */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-foreground/60 hover:text-primary hover:bg-primary/10 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {mounted && resolvedTheme === "dark"
                ? <Sun className="w-4 h-4" />
                : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => scrollTo("#join")}
              className="px-5 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-[0_0_14px_rgba(0,191,99,0.3)] hover:shadow-[0_0_24px_rgba(0,191,99,0.5)] whitespace-nowrap"
            >
              Join Community
            </button>
          </div>

          {/* ── Mobile controls ── */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-foreground/60 hover:text-primary hover:bg-primary/10 transition-all"
              aria-label="Toggle theme"
            >
              {mounted && resolvedTheme === "dark"
                ? <Sun className="w-4 h-4" />
                : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenu(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-all"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <div
        ref={mobileMenuRef}
        className="absolute top-16 left-0 right-0 lg:hidden flex-col gap-1 p-4"
        style={{
          display: "none",
          background: isDark ? "rgba(5,8,22,0.97)" : "rgba(255,255,255,0.97)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: `1px solid ${isDark ? "rgba(0,191,99,0.15)" : "rgba(0,0,0,0.1)"}`,
          boxShadow: "0 16px 40px rgba(0,0,0,0.15)",
        }}
      >
        {navLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => scrollTo(link.href)}
            className={`mobile-nav-item px-4 py-3 rounded-xl text-left text-base font-medium transition-all ${
              activeSection === link.href.slice(1)
                ? "text-primary bg-primary/10"
                : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
            }`}
          >
            {link.name}
          </button>
        ))}
        <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-border">
          <button
            onClick={() => scrollTo("#join")}
            className="w-full text-center py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-[0_0_14px_rgba(0,191,99,0.3)]"
          >
            Join Community
          </button>
        </div>
      </div>
    </nav>
  );
}
