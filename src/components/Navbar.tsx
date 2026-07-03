"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import gsap from "gsap";

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
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileMenu(false); }, [pathname]);

  const handleThemeToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newTheme = theme === "dark" ? "light" : "dark";
    
    // Create overlay for circular wipe animation
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100vw";
    overlay.style.height = "100vh";
    overlay.style.pointerEvents = "none";
    overlay.style.zIndex = "9999";
    overlay.style.backgroundColor = newTheme === "dark" ? "#0a0f0c" : "#f4f5f3";
    
    // Calculate circle origin from button click position
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    // Calculate max radius to cover entire screen
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    
    // Set initial clip-path at click position
    overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`;
    document.body.appendChild(overlay);
    
    // Animate the circular wipe
    gsap.to(overlay.style, {
      clipPath: `circle(${maxRadius}px at ${x}px ${y}px)`,
      duration: 0.7,
      ease: "power2.inOut",
      onComplete: () => {
        // Remove overlay after animation
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.2,
          onComplete: () => overlay.remove()
        });
      }
    });
    
    // Switch theme immediately
    setTheme(newTheme);
  };

  const iconBtnClass =
    "p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors duration-150";

  const isDark = theme === "dark";

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 glass-nav${scrolled ? " glass-nav--scrolled" : ""}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px] gap-4">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Go to home">
            <div className="relative w-8 h-8 shrink-0">
              <Image src="/logo-CQ-tech.png" alt="CodeQuesters" fill sizes="32px" className="object-contain" priority />
            </div>
            <span className="text-sm font-semibold tracking-tight text-foreground">
              Code<span className="text-primary">Questers</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex flex-1 items-center justify-center gap-8">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`nav-link text-sm font-medium transition-colors duration-150 ${
                    active ? "active text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <button onClick={handleThemeToggle} className={iconBtnClass} aria-label="Toggle theme">
              {mounted && isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link
              href="/contact"
              className="px-4 py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Join Community
            </Link>
          </div>

          {/* Mobile right */}
          <div className="lg:hidden flex items-center gap-1">
            <button onClick={handleThemeToggle} className={iconBtnClass} aria-label="Toggle theme">
              {mounted && isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button onClick={() => setMobileMenu(!isMobileMenuOpen)} className={iconBtnClass} aria-label="Toggle menu">
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="absolute top-[60px] left-0 right-0 lg:hidden flex flex-col gap-0.5 p-3 border-t border-border"
          style={{ background: "var(--background-card)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
        >
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
                style={active ? { background: "color-mix(in srgb, var(--primary) 10%, transparent)" } : undefined}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2 pb-1">
            <Link
              href="/contact"
              className="block text-center py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm"
            >
              Join Community
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
