"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, Home, CalendarDays, BookOpen, Info, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Dock from "@/components/ui/Dock";

const navLinks = [
  { name: "Home",    href: "#home",    icon: <Home       size={20} /> },
  { name: "Events",  href: "#events",  icon: <CalendarDays size={20} /> },
  { name: "Stories", href: "#stories", icon: <BookOpen   size={20} /> },
  { name: "About",   href: "#about",   icon: <Info       size={20} /> },
  { name: "Contact", href: "#contact", icon: <Mail       size={20} /> },
];

export function Navbar() {
  const [isScrolled, setIsScrolled]       = useState(false);
  const [isMobileMenuOpen, setMobileMenu] = useState(false);
  const [mounted, setMounted]             = useState(false);
  const { resolvedTheme, setTheme }       = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => setTheme(resolvedTheme === "dark" ? "light" : "dark");

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const dockItems = navLinks.map((link) => ({
    icon: link.icon,
    label: link.name,
    onClick: () => scrollTo(link.href),
  }));

  const isDark = !mounted || resolvedTheme === "dark";

  // Light mode: white/light glass. Dark mode: dark glass.
  const bgScrolled   = isDark ? "rgba(5,8,22,0.75)"    : "rgba(255,255,255,0.85)";
  const bgUnscrolled = isDark ? "rgba(5,8,22,0.25)"    : "rgba(255,255,255,0.55)";
  const borderColor  = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
  const shadowScrolled = isDark
    ? "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)"
    : "0 4px 24px rgba(0,0,0,0.08), inset 0 -1px 0 rgba(0,0,0,0.06)";

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "border-b" : "border-b border-transparent"
      )}
      style={{
        background: isScrolled ? bgScrolled : bgUnscrolled,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: isScrolled ? borderColor : "transparent",
        boxShadow: isScrolled ? shadowScrolled : "none",
      }}
    >
      {/* Full-width container — no max-width cap */}
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-24 gap-4">

          {/* ── Logo ── */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-2.5 group shrink-0"
          >
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-border shadow-[0_0_12px_rgba(0,255,157,0.2)] group-hover:shadow-[0_0_20px_rgba(0,255,157,0.4)] transition-shadow">
              <Image
                src="/logo-CQ.png"
                alt="CodeQuesters Logo"
                fill
                sizes="48px"
                className="object-contain p-0.5"
                priority
              />
            </div>
            <span className="text-2xl font-bold font-heading tracking-tight text-foreground drop-shadow-sm">
              CodeQuesters
            </span>
          </button>

          {/* ── Desktop: Dock nav (icon + label, magnify on hover) ── */}
          <div className="hidden md:flex flex-1 items-center justify-center">
            <Dock
              items={dockItems}
              panelHeight={72}
              baseItemSize={72}
              magnification={92}
              distance={150}
              dockHeight={72}
              spring={{ mass: 0.1, stiffness: 200, damping: 14 }}
            />
          </div>

          {/* ── Desktop: theme toggle + CTAs ── */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-foreground/60 hover:text-foreground hover:bg-foreground/10 transition-all"
              aria-label="Toggle theme"
            >
              {mounted && resolvedTheme === "dark"
                ? <Sun className="w-5 h-5" />
                : <Moon className="w-5 h-5" />}
            </button>
            <a
              href="#contact"
              className="px-4 py-2 rounded-xl border border-primary/30 text-primary font-semibold text-sm hover:bg-primary/10 transition-all"
            >
              Partner With Us
            </a>
            <button
              onClick={() => scrollTo("#join")}
              className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-[0_0_15px_rgba(0,255,157,0.35)] hover:shadow-[0_0_25px_rgba(0,255,157,0.55)]"
            >
              Join Community
            </button>
          </div>

          {/* ── Mobile controls ── */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-foreground/60 hover:text-foreground hover:bg-foreground/10 transition-all"
              aria-label="Toggle theme"
            >
              {mounted && resolvedTheme === "dark"
                ? <Sun className="w-5 h-5" />
                : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenu(!isMobileMenuOpen)}
              className="p-2 text-foreground/70 hover:text-foreground"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="absolute top-24 left-0 right-0 md:hidden flex flex-col gap-1 p-4"
            style={{
              background: isDark ? "rgba(5,8,22,0.95)" : "rgba(255,255,255,0.95)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderBottom: `1px solid ${borderColor}`,
              boxShadow: "0 16px 40px rgba(0,0,0,0.15)",
            }}
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => { scrollTo(link.href); setMobileMenu(false); }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-foreground/70 hover:text-foreground hover:bg-foreground/8 transition-all font-medium text-left"
              >
                <span className="text-primary/80">{link.icon}</span>
                {link.name}
              </button>
            ))}
            <button
              onClick={() => { scrollTo("#join"); setMobileMenu(false); }}
              className="mt-2 w-full text-center py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-[0_0_15px_rgba(0,255,157,0.3)]"
            >
              Join Community
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
