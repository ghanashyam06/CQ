"use client";

/**
 * SocialIconBtn
 * A reusable icon button with three layered click effects:
 *  1. GSAP bounce — the button pops up then springs back
 *  2. Ripple ring — an expanding green ring bursts outward
 *  3. Particle burst — 6 tiny dots scatter from the centre
 *
 * On hover: icon scales up, border glows green, background tints.
 * After click: a small green "✓ Opened" toast fades in/out above the button.
 */

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";

interface SocialIconBtnProps {
  href: string;
  label: string;
  children: ReactNode;
  /** Extra Tailwind classes on the outer anchor */
  className?: string;
  /** Open in new tab (default true) */
  newTab?: boolean;
  /** Button size in px — controls w/h (default 40) */
  size?: number;
}

export default function SocialIconBtn({
  href,
  label,
  children,
  className = "",
  newTab = true,
  size = 40,
}: SocialIconBtnProps) {
  const btnRef  = useRef<HTMLAnchorElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);

  const handleClick = () => {
    const btn  = btnRef.current;
    const icon = iconRef.current;
    if (!btn) return;

    /* 1 ── Bounce */
    gsap.timeline()
      .to(btn,  { scale: 0.82, duration: 0.1, ease: "power2.in" })
      .to(btn,  { scale: 1.18, duration: 0.2, ease: "back.out(3)" })
      .to(btn,  { scale: 1,    duration: 0.25, ease: "elastic.out(1, 0.4)" });

    /* 2 ── Icon spin-flash */
    if (icon) {
      gsap.fromTo(icon,
        { rotate: 0, color: "var(--primary)" },
        { rotate: 360, duration: 0.45, ease: "power2.out",
          onComplete: () => gsap.set(icon, { rotate: 0 }) }
      );
    }

    /* 3 ── Ripple ring */
    const ring = document.createElement("span");
    ring.style.cssText = `
      position:absolute;inset:0;border-radius:inherit;
      border:2px solid rgba(0,191,99,0.9);
      pointer-events:none;z-index:20;
    `;
    btn.appendChild(ring);
    gsap.fromTo(ring,
      { scale: 1, opacity: 0.9 },
      { scale: 2.4, opacity: 0, duration: 0.55, ease: "power2.out",
        onComplete: () => ring.remove() }
    );

    /* 4 ── Particle burst (6 dots) */
    const rect = btn.getBoundingClientRect();
    const cx = rect.width  / 2;
    const cy = rect.height / 2;
    Array.from({ length: 6 }).forEach((_, i) => {
      const dot = document.createElement("span");
      const angle = (i / 6) * Math.PI * 2;
      dot.style.cssText = `
        position:absolute;width:5px;height:5px;border-radius:50%;
        background:rgba(0,191,99,0.9);pointer-events:none;z-index:20;
        left:${cx - 2.5}px;top:${cy - 2.5}px;
      `;
      btn.appendChild(dot);
      gsap.to(dot, {
        x: Math.cos(angle) * (28 + Math.random() * 14),
        y: Math.sin(angle) * (28 + Math.random() * 14),
        opacity: 0,
        scale: 0,
        duration: 0.55 + Math.random() * 0.15,
        ease: "power2.out",
        onComplete: () => dot.remove(),
      });
    });

    /* 5 ── "Opened" toast above button */
    const toast = document.createElement("span");
    toast.textContent = "✓";
    toast.style.cssText = `
      position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);
      font-size:10px;font-weight:700;color:rgba(0,191,99,1);
      pointer-events:none;z-index:30;white-space:nowrap;
    `;
    btn.appendChild(toast);
    gsap.fromTo(toast,
      { opacity: 0, y: 4 },
      { opacity: 1, y: 0, duration: 0.2, ease: "power2.out",
        onComplete: () =>
          gsap.to(toast, { opacity: 0, y: -6, duration: 0.3, delay: 0.7,
            onComplete: () => toast.remove() })
      }
    );
  };

  return (
    <a
      ref={btnRef}
      href={href}
      aria-label={label}
      onClick={handleClick}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={[
        "relative overflow-visible flex items-center",
        "rounded-xl bg-card border border-border",
        "text-muted-foreground",
        "hover:text-primary hover:border-primary/40",
        "hover:bg-primary/8",
        "hover:shadow-[0_0_14px_rgba(0,191,99,0.25)]",
        "transition-all duration-200",
        // Default square sizing only when no custom className overrides it
        !className?.includes("!w-") ? `justify-center` : "",
        className,
      ].filter(Boolean).join(" ")}
      style={
        !className?.includes("!w-")
          ? { width: size, height: size, flexShrink: 0 }
          : undefined
      }
    >
      <span ref={iconRef} className="flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
        {children}
      </span>
    </a>
  );
}
