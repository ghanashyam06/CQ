import Link from "next/link";
import Image from "next/image";
import { Mail, MessageCircle } from "lucide-react";
import { FaGithub, FaLinkedin, FaXTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="relative z-10 bg-background border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="space-y-4">
            <Link href="#home" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 shrink-0 group-hover:scale-105 transition-transform duration-200">
                <Image src="/logo-CQ-tech.png" alt="CodeQuesters Logo" fill sizes="48px" className="object-contain" />
              </div>
              <span className="text-lg font-bold font-heading text-foreground leading-tight">
                Code<span className="text-primary">Questers</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              A builder-first ecosystem helping students and creators grow through
              opportunities, collaboration, innovation, and execution.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://whatsapp.com/channel/0029VbAjqOJFXUuja0h4G00j" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Channel"  className="text-muted-foreground hover:text-primary transition-colors"><FaWhatsapp  className="w-5 h-5" /></a>
              <a href="https://www.instagram.com/codequesters"                  target="_blank" rel="noopener noreferrer" aria-label="Instagram"         className="text-muted-foreground hover:text-primary transition-colors"><FaInstagram className="w-5 h-5" /></a>
              <a href="https://www.linkedin.com/company/codequesters"           target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"          className="text-muted-foreground hover:text-primary transition-colors"><FaLinkedin  className="w-5 h-5" /></a>
              <a href="https://github.com/"                                     aria-label="GitHub"                                                      className="text-muted-foreground hover:text-primary transition-colors"><FaGithub   className="w-5 h-5" /></a>
              <a href="https://x.com/"                                          aria-label="Twitter/X"                                                   className="text-muted-foreground hover:text-primary transition-colors"><FaXTwitter  className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Sitemap */}
          <div>
            <h4 className="font-semibold text-foreground mb-6">Sitemap</h4>
            <ul className="space-y-3">
              {[
                { label: "Home",         href: "#home" },
                { label: "Events",       href: "#events" },
                { label: "Stories",      href: "#stories" },
                { label: "About Us",     href: "#about" },
                { label: "Contact",      href: "#contact" },
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
          <div>
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
          <div>
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
          <p className="text-sm font-semibold text-primary">
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
