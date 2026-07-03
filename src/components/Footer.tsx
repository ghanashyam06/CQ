"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MessageCircle } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!footerRef.current) return;
    const timer = setTimeout(() => ScrollTrigger.refresh(), 100);
    const ctx = gsap.context(() => {
      gsap.from(".footer-col", {
        opacity: 0, y: 20, stagger: 0.08, duration: 0.5, ease: "power3.out",
        scrollTrigger: { trigger: footerRef.current, start: "top 95%", toggleActions: "play none none reverse" },
      });
    }, footerRef.current);
    return () => { clearTimeout(timer); ctx.revert(); };
  }, [pathname]);

  const socials = [
    { icon: FaWhatsapp,  href: "https://whatsapp.com/channel/0029VbAjqOJFXUuja0h4G00j", label: "WhatsApp" },
    { icon: FaInstagram, href: "https://www.instagram.com/codequesters",                label: "Instagram" },
    { icon: FaLinkedin,  href: "https://www.linkedin.com/company/codequesters",         label: "LinkedIn" },
    { icon: FaGithub,    href: "https://github.com/",                                   label: "GitHub" },
    { icon: FaXTwitter,  href: "https://x.com/",                                        label: "Twitter/X" },
  ];

  return (
    <footer ref={footerRef} className="border-t border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

          {/* Brand */}
          <div className="footer-col space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-8 shrink-0">
                <Image src="/logo-CQ-tech.png" alt="CodeQuesters Logo" fill sizes="32px" className="object-contain" />
              </div>
              <span className="text-sm font-semibold text-foreground">
                Code<span className="text-primary">Questers</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              A builder-first ecosystem helping students and creators grow through
              opportunities, collaboration, innovation, and execution.
            </p>
            <div className="flex gap-2.5 pt-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all text-sm"
                >
                  <s.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Sitemap */}
          <div className="footer-col">
            <h4 className="text-sm font-semibold text-foreground mb-4">Sitemap</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home",    href: "/" },
                { label: "About",   href: "/about" },
                { label: "Events",  href: "/events" },
                { label: "Stories", href: "/stories" },
                { label: "Contact", href: "/contact" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved */}
          <div className="footer-col">
            <h4 className="text-sm font-semibold text-foreground mb-4">Get Involved</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Partnerships",   href: "/contact" },
                { label: "Collaborations", href: "/contact" },
                { label: "Workshops",      href: "/events" },
                { label: "Privacy Policy", href: "#" },
                { label: "Terms",          href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4 className="text-sm font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:contact@codequesters.dev"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 shrink-0" />
                  contact@codequesters.dev
                </a>
              </li>
              <li>
                <a
                  href="https://chat.whatsapp.com/Drc3SOwUSJiJnV3ZZgQz7I"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                  WhatsApp Community
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="glow-line mb-6" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">Made with ❤️ in India</p>
          <p className="text-xs font-semibold text-primary tracking-wider">
            EXPLORE · LEARN · BUILD
          </p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} CodeQuesters. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
