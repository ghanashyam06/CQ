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
            <Link href="#home" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-primary/20 shadow-[0_0_10px_rgba(0,255,157,0.15)] group-hover:shadow-[0_0_18px_rgba(0,255,157,0.35)] transition-shadow">
                <Image src="/logo-CQ.png" alt="CodeQuesters Logo" fill sizes="36px" className="object-contain p-0.5" />
              </div>
              <span className="text-lg font-bold font-heading text-foreground">CodeQuesters</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              A builder-first ecosystem helping students and creators grow through
              opportunities, collaboration, innovation, and execution.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" aria-label="WhatsApp"  className="text-muted-foreground hover:text-primary transition-colors"><FaWhatsapp  className="w-5 h-5" /></a>
              <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><FaInstagram className="w-5 h-5" /></a>
              <a href="#" aria-label="LinkedIn"  className="text-muted-foreground hover:text-primary transition-colors"><FaLinkedin  className="w-5 h-5" /></a>
              <a href="#" aria-label="GitHub"    className="text-muted-foreground hover:text-primary transition-colors"><FaGithub   className="w-5 h-5" /></a>
              <a href="#" aria-label="Twitter/X" className="text-muted-foreground hover:text-primary transition-colors"><FaXTwitter  className="w-5 h-5" /></a>
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
                <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors">
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
