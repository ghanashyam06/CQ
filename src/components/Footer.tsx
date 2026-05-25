"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Mail, MessageCircle } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SocialIconBtn from "@/components/ui/SocialIconBtn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!footerRef.current) return;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    const ctx = gsap.context(() => {
      gsap.from(".footer-col", {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
      });
    }, footerRef.current);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [pathname]);

  return (
    <footer ref={footerRef} className="relative z-10 bg-background border-t border-border pt-10 sm:pt-14 lg:pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-14 lg:mb-16">

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
              <SocialIconBtn href="https://whatsapp.com/channel/0029VbAjqOJFXUuja0h4G00j" label="WhatsApp Channel" size={36}><FaWhatsapp className="w-4 h-4" /></SocialIconBtn>
              <SocialIconBtn href="https://www.instagram.com/codequesters" label="Instagram" size={36}><FaInstagram className="w-4 h-4" /></SocialIconBtn>
              <SocialIconBtn href="https://www.linkedin.com/company/codequesters" label="LinkedIn" size={36}><FaLinkedin className="w-4 h-4" /></SocialIconBtn>
              <SocialIconBtn href="https://github.com/" label="GitHub" size={36}><FaGithub className="w-4 h-4" /></SocialIconBtn>
              <SocialIconBtn href="https://x.com/" label="Twitter/X" size={36}><FaXTwitter className="w-4 h-4" /></SocialIconBtn>
            </div>
          </div>

          {/* Sitemap */}
          <div className="footer-col">
            <h4 className="font-semibold text-foreground mb-6">Sitemap</h4>
            <ul className="space-y-3">
              {[
                { label: "Home",    href: "/" },
                { label: "About",   href: "/about" },
                { label: "Events",  href: "/events" },
                { label: "Stories", href: "/stories" },
                { label: "Contact", href: "/contact" },
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
                <SocialIconBtn
                  href="mailto:hello@codequesters.com"
                  label="Email"
                  newTab={false}
                  className="!w-auto !h-auto !rounded-none !bg-transparent !border-none !shadow-none px-0 py-0 gap-2 text-muted-foreground hover:!text-primary text-sm"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>hello@codequesters.com</span>
                </SocialIconBtn>
              </li>
              <li>
                <SocialIconBtn
                  href="https://chat.whatsapp.com/Drc3SOwUSJiJnV3ZZgQz7I"
                  label="WhatsApp Community"
                  className="!w-auto !h-auto !rounded-none !bg-transparent !border-none !shadow-none px-0 py-0 gap-2 text-muted-foreground hover:!text-primary text-sm"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>WhatsApp Community</span>
                </SocialIconBtn>
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
