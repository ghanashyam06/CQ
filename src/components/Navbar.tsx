"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import StarBorder from "@/components/ui/StarBorder";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const navLinks = [
  { name: "Home",    href: "/" },
  { name: "About",   href: "/about" },
  { name: "Events",  href: "/events" },
  { name: "Stories", href: "/stories" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setMobileMenu] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hasScrolled = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

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
          backgroundColor: isDark ? "rgba(5,8,22,0.85)" : "rgba(240,245,242,0.88)",
          backdropFilter: "blur(20px)",
          borderBottomColor: isDark ? "rgba(0,191,99,0.2)" : "rgba(0,80,40,0.08)",
          boxShadow: isDark
            ? "0 4px 30px rgba(0,0,0,0.3), 0 1px 0 rgba(0,191,99,0.15)"
            : "0 8px 30px rgba(0,40,20,0.04), 0 1px 0 rgba(255,255,255,0.8) inset",
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

  const handleThemeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetTheme = resolvedTheme === "dark" ? "light" : "dark";

    // Capture button center or click coordinates
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX ?? (rect.left + rect.width / 2);
    const y = e.clientY ?? (rect.top + rect.height / 2);

    // Create temporary theme transition circular wipe overlay
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.zIndex = "99999";
    overlay.style.pointerEvents = "none";

    const bgColor = targetTheme === "dark" ? "#050816" : "#f3f7f5";
    overlay.style.backgroundColor = bgColor;

    // Start with 0 radius circle
    overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`;
    document.body.appendChild(overlay);

    const maxRadius = Math.hypot(window.innerWidth, window.innerHeight) * 1.25;

    // Animate the clipPath using GSAP
    gsap.to(overlay, {
      clipPath: `circle(${maxRadius}px at ${x}px ${y}px)`,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        // Toggle the Next-Themes context classes
        setTheme(targetTheme);

        // Softly fade out the overlay card
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.25,
          ease: "power1.out",
          onComplete: () => {
            overlay.remove();
          },
        });
      },
    });
  };

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
          <Link
            href="/"
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
          </Link>

          {/* ── Desktop Navigation (centered) ── */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`nav-link px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "active text-primary"
                      : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* ── Desktop: theme toggle + audio controls + CTA ── */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              className="p-2 rounded-full text-foreground/60 hover:text-primary hover:bg-primary/10 transition-all duration-200"
              aria-label="Toggle theme"
            >
              {mounted && resolvedTheme === "dark"
                ? <Sun className="w-4 h-4" />
                : <Moon className="w-4 h-4" />}
            </button>
            
            <StarBorder className="!rounded-lg !p-[1.5px]" color="#00bf63" speed="3s">
              <Link
                href="/contact"
                className="block px-5 py-2 rounded-[calc(0.5rem-1.5px)] bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all whitespace-nowrap"
              >
                Join Community
              </Link>
            </StarBorder>
          </div>

          {/* ── Mobile controls ── */}
          <div className="lg:hidden flex items-center gap-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={handleThemeToggle}
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
          background: isDark ? "rgba(5,8,22,0.97)" : "rgba(243,247,245,0.97)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: `1px solid ${isDark ? "rgba(0,191,99,0.15)" : "rgba(0,0,0,0.1)"}`,
          boxShadow: "0 16px 40px rgba(0,0,0,0.15)",
        }}
      >
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenu(false)}
              className={`mobile-nav-item px-4 py-3 rounded-xl text-left text-base font-medium transition-all ${
                isActive
                  ? "text-primary bg-primary/10"
                  : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
        <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-border">
          <Link
            href="/contact"
            onClick={() => setMobileMenu(false)}
            className="w-full text-center py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-[0_0_14px_rgba(0,191,99,0.3)]"
          >
            Join Community
          </Link>
        </div>
      </div>
    </nav>
  );
}
