"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, Home, CalendarDays, BookOpen, Info, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Dock from "@/components/ui/Dock";

const navLinks = [
  { name: "Home",    href: "#home",    icon: <Home         size={20} /> },
  { name: "Events",  href: "#events",  icon: <CalendarDays size={20} /> },
  { name: "Stories", href: "#stories", icon: <BookOpen     size={20} /> },
  { name: "About",   href: "#about",   icon: <Info         size={20} /> },
  { name: "Contact", href: "#contact", icon: <Mail         size={20} /> },
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

  const bgScrolled     = isDark ? "rgba(5,8,22,0.80)"     : "rgba(255,255,255,0.90)";
  const bgUnscrolled   = isDark ? "rgba(5,8,22,0.25)"     : "rgba(255,255,255,0.60)";
  const borderColor    = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
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
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-24 gap-4">

          {/* ── Logo + Brand name ── */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-3 group shrink-0"
            aria-label="Go to home"
          >
            {/* Logo image — larger so the shield/Q mark is clearly visible */}
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/logo-CQ-tech.png"
                alt="CodeQuesters Logo"
                fill
                sizes="(max-width: 640px) 48px, 56px"
                className="object-contain"
                priority
              />
            </div>
            {/* Brand text */}
            <span className="text-lg sm:text-xl font-bold font-heading tracking-tight text-foreground leading-tight">
              Code<span className="text-primary">Questers</span>
            </span>
          </button>

          {/* ── Desktop: Dock nav ── */}
          <div className="hidden lg:flex flex-1 items-center justify-center py-3">
            <Dock
              items={dockItems}
              panelHeight={60}
              baseItemSize={60}
              magnification={80}
              distance={150}
              dockHeight={60}
              spring={{ mass: 0.1, stiffness: 200, damping: 14 }}
            />
          </div>

          {/* ── Desktop: theme toggle + CTAs ── */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
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
              className="px-4 py-2 rounded-xl border border-primary/30 text-primary font-semibold text-sm hover:bg-primary/10 transition-all whitespace-nowrap"
            >
              Partner With Us
            </a>
            <button
              onClick={() => scrollTo("#join")}
              className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all shadow-[0_0_14px_rgba(0,191,99,0.35)] hover:shadow-[0_0_24px_rgba(0,191,99,0.55)] whitespace-nowrap"
            >
              Join Community
            </button>
          </div>

          {/* ── Mobile / tablet controls ── */}
          <div className="lg:hidden flex items-center gap-2">
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
              className="p-2 rounded-lg text-foreground/70 hover:text-foreground hover:bg-foreground/10 transition-all"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile / tablet menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="absolute top-24 left-0 right-0 lg:hidden flex flex-col gap-1 p-4"
            style={{
              background: isDark ? "rgba(5,8,22,0.97)" : "rgba(255,255,255,0.97)",
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
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-foreground/70 hover:text-foreground hover:bg-foreground/8 transition-all font-medium text-left text-base"
              >
                <span className="text-primary">{link.icon}</span>
                {link.name}
              </button>
            ))}
            <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-border">
              <a
                href="#contact"
                onClick={() => setMobileMenu(false)}
                className="w-full text-center py-3 rounded-xl border border-primary/30 text-primary font-semibold"
              >
                Partner With Us
              </a>
              <button
                onClick={() => { scrollTo("#join"); setMobileMenu(false); }}
                className="w-full text-center py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-[0_0_14px_rgba(0,191,99,0.3)]"
              >
                Join Community
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
