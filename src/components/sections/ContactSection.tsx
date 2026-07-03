"use client";

import { useEffect, useRef, useState } from "react";
import { Mail, MessageCircle, Send, MapPin, CheckCircle2, Loader2 } from "lucide-react";
import { FaWhatsapp, FaInstagram, FaLinkedin, FaGithub, FaXTwitter } from "react-icons/fa6";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

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

function FormField({
  id, label, type = "text", value, onChange, placeholder, required, rows,
}: {
  id: string; label: string; type?: string; value: string;
  onChange: (v: string) => void; placeholder: string; required?: boolean; rows?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-foreground mb-1.5">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <div className="rounded-lg border border-border overflow-hidden transition-all duration-200 focus-within:border-primary/60 focus-within:ring-2 focus-within:ring-primary/10"
        style={{ background: "var(--background-card)" }}
      >
        {rows ? (
          <textarea
            id={id} rows={rows} value={value} placeholder={placeholder} required={required}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 text-foreground placeholder:text-muted-foreground/50 text-sm outline-none resize-none"
            style={{ background: "transparent" }}
          />
        ) : (
          <input
            id={id} type={type} value={value} placeholder={placeholder} required={required}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-4 py-3 text-foreground placeholder:text-muted-foreground/50 text-sm outline-none"
            style={{ background: "transparent" }}
          />
        )}
      </div>
    </div>
  );
}

type InquiryType = "judge" | "sponsor" | "collaboration" | "partnership";

const INQUIRY_TYPES = [
  { id: "judge",         label: "Judge" },
  { id: "sponsor",       label: "Sponsor" },
  { id: "collaboration", label: "Collaboration" },
  { id: "partnership",   label: "Partnership" },
] as const;

const DYNAMIC_FIELDS: Record<InquiryType, { id: string; label: string; placeholder: string; required?: boolean }[]> = {
  judge: [
    { id: "expertise",    label: "Areas of Expertise", placeholder: "e.g., Web3, AI, UI/UX",  required: true },
    { id: "availability", label: "Availability Dates", placeholder: "When are you available?", required: true },
  ],
  sponsor: [
    { id: "company", label: "Company Name",           placeholder: "Your organization",          required: true },
    { id: "tier",    label: "Sponsorship Tier",        placeholder: "e.g., Platinum, Gold",        required: true },
    { id: "budget",  label: "Budget Range (Optional)", placeholder: "e.g., $1k – $5k",            required: false },
  ],
  collaboration: [
    { id: "project",    label: "Project/Community Name",    placeholder: "What are you building?",    required: true },
    { id: "collabType", label: "Proposed Collaboration",    placeholder: "How can we work together?", required: true },
  ],
  partnership: [
    { id: "orgType", label: "Organization Type",   placeholder: "e.g., University, Startup",     required: true },
    { id: "goals",   label: "Partnership Goals",   placeholder: "What do you hope to achieve?",  required: true },
  ],
};

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const [inquiryType, setInquiryType] = useState<InquiryType>("collaboration");
  const [baseState, setBaseState]   = useState({ name: "", email: "", org: "", message: "" });
  const [dynamicState, setDynamicState] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none reverse" };
      gsap.from(".contact-label",   { opacity: 0, y: 16, duration: 0.5, ease: "power3.out", scrollTrigger: st });
      gsap.from(".contact-heading", { opacity: 0, y: 24, duration: 0.6, delay: 0.1, ease: "power3.out", scrollTrigger: st });
      gsap.from(".contact-left",    { opacity: 0, x: -30, duration: 0.6, delay: 0.2, ease: "power3.out",
        scrollTrigger: { ...st, start: "top 75%" },
      });
      gsap.from(".contact-right",   { opacity: 0, x: 30, duration: 0.6, delay: 0.3, ease: "power3.out",
        scrollTrigger: { ...st, start: "top 75%" },
      });
    }, sectionRef.current);
    return () => ctx.revert();
  }, []);

  const SHEET_URL =
    "https://script.google.com/macros/s/AKfycbxXFj3Mz38IBXlwKiop7x8RoX_FUa10xtiNpnl9r-C7_PMEiqr1LzC97_qAhZeXicmJXQ/exec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const relevantDynamic = DYNAMIC_FIELDS[inquiryType].reduce((acc, f) => {
        acc[f.id] = dynamicState[f.id] || "";
        return acc;
      }, {} as Record<string, string>);

      const body = new URLSearchParams({
        name: baseState.name, email: baseState.email, org: baseState.org,
        inquiryType, message: baseState.message, ...relevantDynamic,
        timestamp: new Date().toISOString(),
      });

      await fetch(SHEET_URL, {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });

      setStatus("sent");
      setBaseState({ name: "", email: "", org: "", message: "" });
      setDynamicState({});
    } catch {
      setStatus("idle");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section ref={sectionRef} id="contact" className="py-16 sm:py-20 lg:py-28 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center mb-12 sm:mb-16">
          <p className="contact-label text-xs font-semibold tracking-[0.15em] uppercase text-primary mb-3">
            Get In Touch
          </p>
          <h2 className="contact-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Let&apos;s Connect
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 max-w-6xl mx-auto items-start">

          {/* Left info */}
          <div className="contact-left lg:col-span-4 space-y-7 lg:sticky lg:top-24">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Reach Out To Us</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Whether you&apos;re a student looking to join, a company wanting to partner,
                or a creator exploring collaborations — we&apos;re always open to meaningful
                conversations.
              </p>
            </div>

            <div className="space-y-3">
              {/* Email */}
              <a
                href="mailto:contact@codequesters.dev"
                className="flex items-center gap-3 p-4 rounded-lg card border-border group hover:border-primary/30"
              >
                <div className="icon-box w-9 h-9 shrink-0">
                  <Mail className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-medium text-foreground block">Email Us</span>
                  <span className="text-xs text-muted-foreground truncate block">contact@codequesters.dev</span>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="https://chat.whatsapp.com/Drc3SOwUSJiJnV3ZZgQz7I"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg card border-border group hover:border-primary/30"
              >
                <div className="icon-box w-9 h-9 shrink-0">
                  <MessageCircle className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="min-w-0">
                  <span className="text-sm font-medium text-foreground block">WhatsApp Community</span>
                  <span className="text-xs text-muted-foreground">Join our active builder group</span>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-3 p-4 rounded-lg card border-border">
              <div className="icon-box w-9 h-9 shrink-0">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <span className="text-sm font-medium text-foreground block">Based in India</span>
                  <span className="text-xs text-muted-foreground">Building globally 🌍</span>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div>
              <p className="text-sm font-medium text-foreground mb-3">Follow Us</p>
              <div className="flex gap-2.5 flex-wrap">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 rounded-lg card border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all"
                  >
                    <s.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="contact-right lg:col-span-8">
            <div className="card p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                {/* Inquiry type tabs */}
                <div className="flex flex-wrap gap-1 p-1 rounded-lg border border-border"
                  style={{ background: "color-mix(in srgb, var(--border) 25%, var(--background-card))" }}
                >
                  {INQUIRY_TYPES.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setInquiryType(type.id as InquiryType)}
                      className={`flex-1 min-w-[100px] px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        inquiryType === type.id
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground hover:bg-card/80"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField id="c-name"  label="Your Name"   value={baseState.name}
                    onChange={(v) => setBaseState((s) => ({ ...s, name: v }))}  placeholder="John Doe"            required />
                  <FormField id="c-email" label="Email Address" type="email" value={baseState.email}
                    onChange={(v) => setBaseState((s) => ({ ...s, email: v })) } placeholder="john@example.com"    required />
                </div>

                <FormField id="c-org" label="Organization / Affiliation" value={baseState.org}
                  onChange={(v) => setBaseState((s) => ({ ...s, org: v }))}   placeholder="Where are you from?" required />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg border border-border"
                  style={{ background: "color-mix(in srgb, var(--border) 20%, var(--background-card))" }}
                >
                  {DYNAMIC_FIELDS[inquiryType].map((field, idx) => (
                    <div
                      key={field.id}
                      className={
                        DYNAMIC_FIELDS[inquiryType].length % 2 !== 0 &&
                        idx === DYNAMIC_FIELDS[inquiryType].length - 1
                          ? "sm:col-span-2"
                          : ""
                      }
                    >
                      <FormField
                        id={`d-${field.id}`}
                        label={field.label}
                        placeholder={field.placeholder}
                        required={field.required}
                        value={dynamicState[field.id] || ""}
                        onChange={(v) => setDynamicState((s) => ({ ...s, [field.id]: v }))}
                      />
                    </div>
                  ))}
                </div>

                <FormField id="c-msg" label="Message" value={baseState.message}
                  onChange={(v) => setBaseState((s) => ({ ...s, message: v }))}
                  placeholder="Tell us what you're looking for..." required rows={4} />

                <button
                  type="submit"
                  disabled={status !== "idle"}
                  className="btn-primary w-full justify-center mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" && <Loader2 className="w-4 h-4 animate-spin" />}
                  {status === "sent"    && <CheckCircle2 className="w-4 h-4" />}
                  {status === "idle"    && <Send className="w-4 h-4" />}
                  {status === "sending" ? "Sending…" : status === "sent" ? "Message Sent!" : "Submit Inquiry"}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
