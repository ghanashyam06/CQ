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
        {label} {required && <span className="text-primary">*</span>}
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

type InquiryType = "judge" | "sponsor" | "collaboration" | "partnership";

const INQUIRY_TYPES = [
  { id: "judge", label: "Judge" },
  { id: "sponsor", label: "Sponsor" },
  { id: "collaboration", label: "Collaboration" },
  { id: "partnership", label: "Partnership" },
] as const;

// Config driven fields per inquiry type
const DYNAMIC_FIELDS: Record<InquiryType, { id: string; label: string; placeholder: string; required?: boolean }[]> = {
  judge: [
    { id: "expertise", label: "Areas of Expertise", placeholder: "e.g., Web3, AI, UI/UX", required: true },
    { id: "availability", label: "Availability Dates", placeholder: "When are you available?", required: true },
  ],
  sponsor: [
    { id: "company", label: "Company Name", placeholder: "Your organization", required: true },
    { id: "tier", label: "Sponsorship Tier Interest", placeholder: "e.g., Platinum, Gold, Custom", required: true },
    { id: "budget", label: "Budget Range (Optional)", placeholder: "e.g., $1k - $5k", required: false },
  ],
  collaboration: [
    { id: "project", label: "Project/Community Name", placeholder: "What are you building?", required: true },
    { id: "collabType", label: "Proposed Collaboration", placeholder: "How can we work together?", required: true },
  ],
  partnership: [
    { id: "orgType", label: "Organization Type", placeholder: "e.g., University, Startup, NGO", required: true },
    { id: "goals", label: "Partnership Goals", placeholder: "What do you hope to achieve?", required: true },
  ],
};

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  
  const [inquiryType, setInquiryType] = useState<InquiryType>("collaboration");
  
  // State for base fields
  const [baseState, setBaseState] = useState({ name: "", email: "", org: "", message: "" });
  
  // State for dynamic fields (will store all possible fields across all types to avoid losing data when switching tabs)
  const [dynamicState, setDynamicState] = useState<Record<string, string>>({});
  
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

  const SHEET_URL =
    "https://script.google.com/macros/s/AKfycbxXFj3Mz38IBXlwKiop7x8RoX_FUa10xtiNpnl9r-C7_PMEiqr1LzC97_qAhZeXicmJXQ/exec";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // Gather relevant dynamic fields for the current inquiry type
      const relevantDynamicFields = DYNAMIC_FIELDS[inquiryType].reduce((acc, field) => {
        acc[field.id] = dynamicState[field.id] || "";
        return acc;
      }, {} as Record<string, string>);

      const body = new URLSearchParams({
        name:        baseState.name,
        email:       baseState.email,
        org:         baseState.org,
        inquiryType: inquiryType,
        message:     baseState.message,
        ...relevantDynamicFields,
        timestamp:   new Date().toISOString(),
      });

      // no-cors: response is opaque but the Apps Script still receives and stores the data
      await fetch(SHEET_URL, {
        method: "POST",
        mode:   "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body:   body.toString(),
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

  /* ── MagicBento item wrapping the form ── */
  const formItem: MagicBentoItem = {
    title: "",
    description: "",
    children: (
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 py-2">
        {/* Type Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-2 p-1 bg-background/50 backdrop-blur-md rounded-xl border border-border">
          {INQUIRY_TYPES.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setInquiryType(type.id as InquiryType)}
              className={`flex-1 min-w-[120px] px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                inquiryType === type.id 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "text-muted-foreground hover:text-foreground hover:bg-card"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField
            id="contact-name" label="Your Name" value={baseState.name}
            onChange={(v) => setBaseState((s) => ({ ...s, name: v }))}
            placeholder="John Doe" required
          />
          <FormField
            id="contact-email" label="Email Address" type="email" value={baseState.email}
            onChange={(v) => setBaseState((s) => ({ ...s, email: v }))}
            placeholder="john@example.com" required
          />
        </div>
        
        <FormField
          id="contact-org" label="Organization / Affiliation" value={baseState.org}
          onChange={(v) => setBaseState((s) => ({ ...s, org: v }))}
          placeholder="Where are you from?" required
        />

        {/* Dynamic Fields Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4 rounded-xl border border-border/50 bg-background/30">
          {DYNAMIC_FIELDS[inquiryType].map((field) => (
            <div key={field.id} className={DYNAMIC_FIELDS[inquiryType].length % 2 !== 0 && field === DYNAMIC_FIELDS[inquiryType][DYNAMIC_FIELDS[inquiryType].length - 1] ? "sm:col-span-2" : ""}>
              <FormField
                id={`dynamic-${field.id}`}
                label={field.label}
                placeholder={field.placeholder}
                required={field.required}
                value={dynamicState[field.id] || ""}
                onChange={(v) => setDynamicState((s) => ({ ...s, [field.id]: v }))}
              />
            </div>
          ))}
        </div>

        <FormField
          id="contact-message" label="Message" value={baseState.message}
          onChange={(v) => setBaseState((s) => ({ ...s, message: v }))}
          placeholder="Tell us what you're looking for..." required rows={4}
        />

        <button
          type="submit"
          disabled={status !== "idle"}
          className="w-full px-6 py-4 mt-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm
            hover:bg-primary/90 transition-all flex items-center justify-center gap-2
            shadow-[0_0_20px_rgba(0,191,99,0.3)] hover:shadow-[0_0_30px_rgba(0,191,99,0.5)]
            disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === "sending" && <Loader2 className="w-4 h-4 animate-spin" />}
          {status === "sent"    && <CheckCircle2 className="w-4 h-4" />}
          {status === "idle"    && <Send className="w-4 h-4" />}
          {status === "sending" ? "Sending…" : status === "sent" ? "Message Sent!" : "Submit Inquiry"}
        </button>
      </form>
    ),
  };

  return (
    <section ref={sectionRef} id="contact" className="py-12 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-10 sm:mb-20">
          <p className="contact-label text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground mb-3">
            Get In Touch
          </p>
          <h2 className="contact-heading text-2xl sm:text-3xl md:text-5xl font-bold font-heading">
            Let&apos;s Connect
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 max-w-7xl mx-auto items-start">

          {/* ── Left — Info ── */}
          <div className="contact-left lg:col-span-4 space-y-8 sticky top-32">
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
                href="mailto:contact@codequesters.dev"
                label="Email Us"
                newTab={false}
                className="!w-full !h-auto !rounded-xl p-4 gap-4 border border-border bg-card
                  hover:border-primary/30 group"
              >
                <span className="w-10 h-10 rounded-xl bg-muted/20 flex items-center justify-center shrink-0
                  group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </span>
                <span className="flex flex-col sm:flex-row sm:items-center sm:gap-3 min-w-0">
                  <span className="text-sm font-semibold text-foreground">Email Us</span>
                  <span className="hidden sm:inline text-border">·</span>
                  <span className="text-xs sm:text-sm text-muted-foreground truncate">contact@codequesters.dev</span>
                </span>
              </SocialIconBtn>

              {/* WhatsApp */}
              <SocialIconBtn
                href="https://chat.whatsapp.com/Drc3SOwUSJiJnV3ZZgQz7I"
                label="WhatsApp Community"
                className="!w-full !h-auto !rounded-xl p-4 gap-4 border border-border bg-card
                  hover:border-primary/30 group"
              >
                <span className="w-10 h-10 rounded-xl bg-muted/20 flex items-center justify-center shrink-0
                  group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <MessageCircle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </span>
                <span className="flex flex-col sm:flex-row sm:items-center sm:gap-3 min-w-0">
                  <span className="text-sm font-semibold text-foreground">WhatsApp Community</span>
                  <span className="hidden sm:inline text-border">·</span>
                  <span className="text-xs sm:text-sm text-muted-foreground">Join our active builder group</span>
                </span>
              </SocialIconBtn>

              {/* Location — not clickable, plain row */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card">
                <div className="w-10 h-10 rounded-xl bg-muted/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
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
          <div className="contact-right lg:col-span-8">
            <MagicBento
              items={[formItem]}
              gridCols="1fr"
              enableStars={false}
              enableSpotlight={true}
              enableBorderGlow={false}
              enableTilt={false}
              enableMagnetism={false}
              clickEffect={false}
              spotlightRadius={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
