"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, MessageCircle, Send, MapPin, CheckCircle2, Loader2 } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagicBento, { type MagicBentoItem } from "@/components/ui/MagicBento";
import SocialIconBtn from "@/components/ui/SocialIconBtn";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const socials = [
  { icon: FaWhatsapp,  href: "https://whatsapp.com/channel/0029VbAjqOJFXUuja0h4G00j", label: "WhatsApp" },
  { icon: FaInstagram, href: "https://www.instagram.com/codequesters",                label: "Instagram" },
  { icon: FaLinkedin,  href: "https://www.linkedin.com/company/codequesters",         label: "LinkedIn" },
  { icon: FaGithub,    href: "https://github.com/",                                   label: "GitHub" },
  { icon: FaXTwitter,  href: "https://x.com/",                                        label: "Twitter/X" },
];

/* ── Animated input — glows green on focus ── */
function FormField({
  id, label, type = "text", value, onChange, placeholder, required, rows,
}: {
  id: string; label: string; type?: string; value: string;
  onChange: (v: string) => void; placeholder: string; required?: boolean; rows?: number;
}) {
  const baseClass =
    "w-full px-4 py-3 bg-background text-foreground placeholder:text-muted-foreground/40 text-sm outline-none resize-none";

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-foreground mb-2">
        {label}
      </label>
      <div
        className="rounded-xl border border-border overflow-hidden transition-all duration-300 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 focus-within:shadow-[0_0_15px_rgba(0,168,82,0.06)] dark:focus-within:shadow-[0_0_20px_rgba(0,191,99,0.15)]"
      >
        {rows ? (
          <textarea
            id={id} rows={rows} value={value} placeholder={placeholder} required={required}
            onChange={(e) => onChange(e.target.value)}
            className={baseClass}
          />
        ) : (
          <input
            id={id} type={type} value={value} placeholder={placeholder} required={required}
            onChange={(e) => onChange(e.target.value)}
            className={baseClass}
          />
        )}
      </div>
    </div>
  );
}

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  /* ── Entrance animations ── */
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" };
      gsap.from(".contact-label",   { opacity: 0, y: 20, duration: 0.5, ease: "power3.out", scrollTrigger: st });
      gsap.from(".contact-heading", { opacity: 0, y: 30, duration: 0.7, delay: 0.1, ease: "power3.out", scrollTrigger: st });
      gsap.from(".contact-left",    { opacity: 0, x: -50, duration: 0.7, delay: 0.2, ease: "power3.out", scrollTrigger: { ...st, start: "top 75%" } });
      gsap.from(".contact-right",   { opacity: 0, x: 50,  duration: 0.7, delay: 0.3, ease: "power3.out", scrollTrigger: { ...st, start: "top 75%" } });
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate brief delay then open mailto
    setTimeout(() => {
      const mailtoLink = `mailto:hello@codequesters.com?subject=Contact from ${encodeURIComponent(formState.name)}&body=${encodeURIComponent(formState.message)}%0A%0AFrom: ${encodeURIComponent(formState.email)}`;
      window.open(mailtoLink, "_blank");
      setStatus("sent");
      setTimeout(() => setStatus("idle"), 3000);
    }, 600);
  };

  /* ── MagicBento item wrapping the form ── */
  const formItem: MagicBentoItem = {
    title: "",
    description: "",
    children: (
      <form onSubmit={handleSubmit} className="space-y-5 py-2">
        <FormField
          id="contact-name" label="Your Name" value={formState.name}
          onChange={(v) => setFormState((s) => ({ ...s, name: v }))}
          placeholder="Enter your full name" required
        />
        <FormField
          id="contact-email" label="Email Address" type="email" value={formState.email}
          onChange={(v) => setFormState((s) => ({ ...s, email: v }))}
          placeholder="Enter your email" required
        />
        <FormField
          id="contact-message" label="Message" value={formState.message}
          onChange={(v) => setFormState((s) => ({ ...s, message: v }))}
          placeholder="Tell us what you're looking for..." required rows={5}
        />

        <button
          type="submit"
          disabled={status !== "idle"}
          className="w-full px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm
            hover:bg-primary/90 transition-all flex items-center justify-center gap-2
            shadow-[0_0_20px_rgba(0,191,99,0.3)] hover:shadow-[0_0_30px_rgba(0,191,99,0.5)]
            disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === "sending" && <Loader2 className="w-4 h-4 animate-spin" />}
          {status === "sent"    && <CheckCircle2 className="w-4 h-4" />}
          {status === "idle"    && <Send className="w-4 h-4" />}
          {status === "sending" ? "Sending…" : status === "sent" ? "Message Sent!" : "Send Message"}
        </button>
      </form>
    ),
  };

  return (
    <section ref={sectionRef} id="contact" className="py-12 sm:py-16 lg:py-24 relative overflow-hidden">
      {/* Background glow — capped width so it never overflows on mobile */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[200px] sm:w-[350px] lg:w-[500px] h-[200px] sm:h-[350px] lg:h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-16">
          <p className="contact-label text-xs font-bold tracking-[0.2em] uppercase text-primary mb-3">
            Get In Touch
          </p>
          <h2 className="contact-heading text-2xl sm:text-3xl md:text-5xl font-bold font-heading">
            Let&apos;s <span className="text-gradient">Connect</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 max-w-6xl mx-auto">

          {/* ── Left — Info ── */}
          <div className="contact-left space-y-8">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">Reach Out To Us</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">
                Whether you&apos;re a student looking to join, a company wanting to partner,
                or a creator exploring collaborations — we&apos;re always open to meaningful conversations.
              </p>
            </div>

            {/* Contact info rows — icon + text inline */}
            <div className="space-y-3">
              {/* Email */}
              <SocialIconBtn
                href="mailto:hello@codequesters.com"
                label="Email Us"
                newTab={false}
                className="!w-full !h-auto !rounded-xl p-4 gap-4 border border-border bg-card
                  hover:border-primary/30 hover:shadow-[0_0_16px_rgba(0,191,99,0.08)] group"
              >
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0
                  group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <Mail className="w-5 h-5 text-primary" />
                </span>
                <span className="flex flex-col sm:flex-row sm:items-center sm:gap-3 min-w-0">
                  <span className="text-sm font-semibold text-foreground">Email Us</span>
                  <span className="hidden sm:inline text-border">·</span>
                  <span className="text-xs sm:text-sm text-muted-foreground truncate">hello@codequesters.com</span>
                </span>
              </SocialIconBtn>

              {/* WhatsApp */}
              <SocialIconBtn
                href="https://chat.whatsapp.com/Drc3SOwUSJiJnV3ZZgQz7I"
                label="WhatsApp Community"
                className="!w-full !h-auto !rounded-xl p-4 gap-4 border border-border bg-card
                  hover:border-primary/30 hover:shadow-[0_0_16px_rgba(0,191,99,0.08)] group"
              >
                <span className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0
                  group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </span>
                <span className="flex flex-col sm:flex-row sm:items-center sm:gap-3 min-w-0">
                  <span className="text-sm font-semibold text-foreground">WhatsApp Community</span>
                  <span className="hidden sm:inline text-border">·</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">Join our active builder group</span>
                </span>
              </SocialIconBtn>

              {/* Location — not clickable, plain row */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 min-w-0">
                  <span className="text-sm font-semibold text-foreground">Based in India</span>
                  <span className="hidden sm:inline text-border">·</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">Building globally 🌍</span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-sm font-semibold text-foreground mb-3">Follow Us</p>
              <div className="flex gap-3 flex-wrap">
                {socials.map((s) => (
                  <SocialIconBtn key={s.label} href={s.href} label={s.label} size={40}>
                    <s.icon className="w-4 h-4" />
                  </SocialIconBtn>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right — Form wrapped in MagicBento ── */}
          <div className="contact-right">
            <MagicBento
              items={[formItem]}
              gridCols="1fr"
              enableStars
              enableSpotlight
              enableBorderGlow
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={false}
              spotlightRadius={350}
              particleCount={10}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
