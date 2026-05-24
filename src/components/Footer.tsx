"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MessageCircle } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".footer-col", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, footerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative z-10 bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="footer-col space-y-4">
            <Link href="#home" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 shrink-0 group-hover:scale-105 transition-transform duration-200">
                <Image src="/logo-CQ-tech.png" alt="CodeQuesters Logo" fill sizes="40px" className="object-contain" />
              </div>
              <span className="text-lg font-bold font-heading text-foreground leading-tight">
                Code<span className="text-primary">Questers</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              A builder-first ecosystem helping students and creators grow through
              opportunities, collaboration, innovation, and execution.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="https://whatsapp.com/channel/0029VbAjqOJFXUuja0h4G00j" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Channel" className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-[0_0_10px_rgba(0,191,99,0.15)] transition-all"><FaWhatsapp className="w-4 h-4" /></a>
              <a href="https://www.instagram.com/codequesters" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-[0_0_10px_rgba(0,191,99,0.15)] transition-all"><FaInstagram className="w-4 h-4" /></a>
              <a href="https://www.linkedin.com/company/codequesters" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-[0_0_10px_rgba(0,191,99,0.15)] transition-all"><FaLinkedin className="w-4 h-4" /></a>
              <a href="https://github.com/" aria-label="GitHub" className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-[0_0_10px_rgba(0,191,99,0.15)] transition-all"><FaGithub className="w-4 h-4" /></a>
              <a href="https://x.com/" aria-label="Twitter/X" className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-[0_0_10px_rgba(0,191,99,0.15)] transition-all"><FaXTwitter className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Sitemap */}
          <div className="footer-col">
            <h4 className="font-semibold text-foreground mb-6">Sitemap</h4>
            <ul className="space-y-3">
              {[
                { label: "Home",    href: "#home" },
                { label: "About",   href: "#about" },
                { label: "Events",  href: "#events" },
                { label: "Stories", href: "#stories" },
                { label: "Contact", href: "#contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Secondary Links */}
          <div className="footer-col">
            <h4 className="font-semibold text-foreground mb-6">Get Involved</h4>
            <ul className="space-y-3">
              {["Partnerships", "Collaborations", "Workshops", "Privacy Policy", "Terms"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="font-semibold text-foreground mb-6">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@codequesters.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors">
                  <Mail className="w-4 h-4" />
                  hello@codequesters.com
                </a>
              </li>
              <li>
                <a href="https://chat.whatsapp.com/Drc3SOwUSJiJnV3ZZgQz7I" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Community
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border gap-4">
          <p className="text-sm text-muted-foreground">Made with ❤️ in India</p>
          <p className="text-sm font-semibold text-primary neon-text">
            EXPLORE · LEARN · BUILD
          </p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CodeQuesters. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
