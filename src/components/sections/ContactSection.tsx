"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, MessageCircle, Send, MapPin } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpotlightCard from "@/components/ui/SpotlightCard";
import BorderGlow from "@/components/ui/BorderGlow";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".contact-label", {
        opacity: 0, y: 20, duration: 0.5, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".contact-heading", {
        opacity: 0, y: 30, duration: 0.7, delay: 0.1, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".contact-left", {
        opacity: 0, x: -50, duration: 0.7, delay: 0.2, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".contact-right", {
        opacity: 0, x: 50, duration: 0.7, delay: 0.3, ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic
    const mailtoLink = `mailto:hello@codequesters.com?subject=Contact from ${formState.name}&body=${encodeURIComponent(formState.message)}%0A%0AFrom: ${formState.email}`;
    window.open(mailtoLink, "_blank");
  };

  return (
    <section ref={sectionRef} id="contact" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="contact-label text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">
            Get In Touch
          </p>
          <h2 className="contact-heading text-3xl md:text-5xl font-bold font-heading">
            Let&apos;s <span className="text-gradient">Connect</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 max-w-6xl mx-auto">
          {/* Left — Info */}
          <div className="contact-left space-y-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Reach Out To Us</h3>
              <p className="text-muted-foreground leading-relaxed">
                Whether you&apos;re a student looking to join, a company wanting to partner,
                or a creator exploring collaborations — we&apos;re always open to meaningful conversations.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="mailto:hello@codequesters.com"
                className="block group"
              >
                <SpotlightCard className="flex items-center gap-4 border border-border hover:border-primary/30 transition-all p-4" spotlightColor="rgba(0, 191, 99, 0.1)">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Email Us</p>
                    <p className="text-xs text-muted-foreground">hello@codequesters.com</p>
                  </div>
                </SpotlightCard>
              </a>

              <a
                href="https://chat.whatsapp.com/Drc3SOwUSJiJnV3ZZgQz7I"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <SpotlightCard className="flex items-center gap-4 border border-border hover:border-primary/30 transition-all p-4" spotlightColor="rgba(0, 191, 99, 0.1)">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">WhatsApp Community</p>
                    <p className="text-xs text-muted-foreground">Join our active builder group</p>
                  </div>
                </SpotlightCard>
              </a>

              <SpotlightCard className="flex items-center gap-4 border border-border p-4" spotlightColor="rgba(0, 191, 99, 0.1)">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Based in India</p>
                  <p className="text-xs text-muted-foreground">Building globally 🌍</p>
                </div>
              </SpotlightCard>
            </div>

            {/* Social links */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-3">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { icon: FaWhatsapp, href: "https://whatsapp.com/channel/0029VbAjqOJFXUuja0h4G00j", label: "WhatsApp" },
                  { icon: FaInstagram, href: "https://www.instagram.com/codequesters", label: "Instagram" },
                  { icon: FaLinkedin, href: "https://www.linkedin.com/company/codequesters", label: "LinkedIn" },
                  { icon: FaGithub, href: "https://github.com/", label: "GitHub" },
                  { icon: FaXTwitter, href: "https://x.com/", label: "Twitter/X" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-[0_0_12px_rgba(0,191,99,0.15)] transition-all"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="contact-right">
            <BorderGlow borderRadius="1rem" glowColor="#00bf63" glowSize={180}>
              <form onSubmit={handleSubmit} className="p-8 space-y-5">
                <div>
                  <label htmlFor="contact-name" className="block text-sm font-semibold text-foreground mb-2">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-sm font-semibold text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all text-sm"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-sm font-semibold text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell us what you're looking for..."
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground/50 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-all text-sm resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,191,99,0.3)] hover:shadow-[0_0_30px_rgba(0,191,99,0.5)]"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </BorderGlow>
          </div>
        </div>
      </div>
    </section>
  );
}
