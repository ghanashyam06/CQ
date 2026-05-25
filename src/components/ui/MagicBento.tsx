"use client";

import { useRef, useEffect, useCallback, useState, type ReactNode } from "react";
import { gsap } from "gsap";
import "./MagicBento.css";

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */
const GLOW_COLOR = "0, 191, 99"; // CQ green
const MOBILE_BREAKPOINT = 768;

/* ─────────────────────────────────────────────
   Helpers
───────────────────────────────────────────── */
function createParticle(x: number, y: number) {
  const el = document.createElement("div");
  el.className = "mb-particle";
  el.style.cssText = `
    left:${x}px;top:${y}px;
    background:rgba(${GLOW_COLOR},1);
    box-shadow:0 0 6px rgba(${GLOW_COLOR},0.6);
  `;
  return el;
}

function updateGlowProps(
  card: HTMLElement,
  mouseX: number,
  mouseY: number,
  intensity: number,
  radius: number
) {
  const r = card.getBoundingClientRect();
  card.style.setProperty("--glow-x", `${((mouseX - r.left) / r.width) * 100}%`);
  card.style.setProperty("--glow-y", `${((mouseY - r.top) / r.height) * 100}%`);
  card.style.setProperty("--glow-intensity", String(intensity));
  card.style.setProperty("--glow-radius", `${radius}px`);
}

/* ─────────────────────────────────────────────
   useMobileDetection
───────────────────────────────────────────── */
function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

/* ─────────────────────────────────────────────
   GlobalSpotlight
───────────────────────────────────────────── */
interface GlobalSpotlightProps {
  gridRef: React.RefObject<HTMLDivElement | null>;
  disabled: boolean;
  radius: number;
}

function GlobalSpotlight({ gridRef, disabled, radius }: GlobalSpotlightProps) {
  useEffect(() => {
    if (disabled || !gridRef.current) return;

    const spotlight = document.createElement("div");
    spotlight.className = "mb-global-spotlight";
    spotlight.style.cssText = `
      width:800px;height:800px;opacity:0;
      background:radial-gradient(circle,
        rgba(${GLOW_COLOR},0.14) 0%,
        rgba(${GLOW_COLOR},0.07) 20%,
        rgba(${GLOW_COLOR},0.03) 40%,
        transparent 70%);
    `;
    document.body.appendChild(spotlight);

    const proximity = radius * 0.5;
    const fadeDistance = radius * 0.75;

    const onMove = (e: MouseEvent) => {
      if (!gridRef.current) return;
      const section = gridRef.current.closest(".mb-bento-section");
      const rect = section?.getBoundingClientRect();
      const inside =
        rect &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      const cards = gridRef.current.querySelectorAll<HTMLElement>(".mb-card");

      if (!inside) {
        gsap.to(spotlight, { opacity: 0, duration: 0.3 });
        cards.forEach((c) => c.style.setProperty("--glow-intensity", "0"));
        return;
      }

      let minDist = Infinity;
      cards.forEach((card) => {
        const cr = card.getBoundingClientRect();
        const cx = cr.left + cr.width / 2;
        const cy = cr.top + cr.height / 2;
        const dist = Math.max(
          0,
          Math.hypot(e.clientX - cx, e.clientY - cy) -
            Math.max(cr.width, cr.height) / 2
        );
        minDist = Math.min(minDist, dist);
        const intensity =
          dist <= proximity
            ? 1
            : dist <= fadeDistance
            ? (fadeDistance - dist) / (fadeDistance - proximity)
            : 0;
        updateGlowProps(card, e.clientX, e.clientY, intensity, radius);
      });

      gsap.to(spotlight, { left: e.clientX, top: e.clientY, duration: 0.1 });
      const targetOpacity =
        minDist <= proximity
          ? 0.8
          : minDist <= fadeDistance
          ? ((fadeDistance - minDist) / (fadeDistance - proximity)) * 0.8
          : 0;
      gsap.to(spotlight, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
      });
    };

    const onLeave = () => {
      gridRef.current
        ?.querySelectorAll<HTMLElement>(".mb-card")
        .forEach((c) => c.style.setProperty("--glow-intensity", "0"));
      gsap.to(spotlight, { opacity: 0, duration: 0.3 });
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      spotlight.parentNode?.removeChild(spotlight);
    };
  }, [gridRef, disabled, radius]);

  return null;
}

/* ─────────────────────────────────────────────
   ParticleCard
───────────────────────────────────────────── */
interface ParticleCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  disabled: boolean;
  particleCount: number;
  enableTilt: boolean;
  enableMagnetism: boolean;
  clickEffect: boolean;
}

function ParticleCard({
  children,
  className = "",
  style,
  disabled,
  particleCount,
  enableTilt,
  enableMagnetism,
  clickEffect,
}: ParticleCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isHovered = useRef(false);
  const magnetAnim = useRef<gsap.core.Tween | null>(null);

  const clearParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetAnim.current?.kill();
    particlesRef.current.forEach((p) => {
      gsap.to(p, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => p.parentNode?.removeChild(p),
      });
    });
    particlesRef.current = [];
  }, []);

  const spawnParticles = useCallback(() => {
    if (!ref.current || !isHovered.current) return;
    const { width, height } = ref.current.getBoundingClientRect();
    Array.from({ length: particleCount }).forEach((_, i) => {
      const tid = setTimeout(() => {
        if (!isHovered.current || !ref.current) return;
        const p = createParticle(Math.random() * width, Math.random() * height);
        ref.current.appendChild(p);
        particlesRef.current.push(p);
        gsap.fromTo(p, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" });
        gsap.to(p, { x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 100, rotation: Math.random() * 360, duration: 2 + Math.random() * 2, ease: "none", repeat: -1, yoyo: true });
        gsap.to(p, { opacity: 0.3, duration: 1.5, ease: "power2.inOut", repeat: -1, yoyo: true });
      }, i * 100);
      timeoutsRef.current.push(tid);
    });
  }, [particleCount]);

  useEffect(() => {
    if (disabled || !ref.current) return;
    const el = ref.current;

    const onEnter = () => {
      isHovered.current = true;
      spawnParticles();
      if (enableTilt) gsap.to(el, { rotateX: 5, rotateY: 5, duration: 0.3, ease: "power2.out", transformPerspective: 1000 });
    };

    const onLeave = () => {
      isHovered.current = false;
      clearParticles();
      if (enableTilt) gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3, ease: "power2.out" });
      if (enableMagnetism) gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: "power2.out" });
    };

    const onMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const cx = r.width / 2;
      const cy = r.height / 2;
      if (enableTilt) gsap.to(el, { rotateX: ((y - cy) / cy) * -10, rotateY: ((x - cx) / cx) * 10, duration: 0.1, ease: "power2.out", transformPerspective: 1000 });
      if (enableMagnetism) magnetAnim.current = gsap.to(el, { x: (x - cx) * 0.05, y: (y - cy) * 0.05, duration: 0.3, ease: "power2.out" });
    };

    const onClick = (e: MouseEvent) => {
      if (!clickEffect) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const maxD = Math.max(Math.hypot(x, y), Math.hypot(x - r.width, y), Math.hypot(x, y - r.height), Math.hypot(x - r.width, y - r.height));
      const ripple = document.createElement("div");
      ripple.style.cssText = `position:absolute;width:${maxD * 2}px;height:${maxD * 2}px;border-radius:50%;background:radial-gradient(circle,rgba(${GLOW_COLOR},0.4) 0%,rgba(${GLOW_COLOR},0.2) 30%,transparent 70%);left:${x - maxD}px;top:${y - maxD}px;pointer-events:none;z-index:1000;`;
      el.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: "power2.out", onComplete: () => ripple.remove() });
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("click", onClick);
    return () => {
      isHovered.current = false;
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("click", onClick);
      clearParticles();
    };
  }, [spawnParticles, clearParticles, disabled, enableTilt, enableMagnetism, clickEffect]);

  return (
    <div ref={ref} className={className} style={{ ...style, position: "relative", overflow: "hidden" }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Public Props
───────────────────────────────────────────── */
export interface MagicBentoItem {
  /** Icon element or any ReactNode shown top-left */
  icon?: ReactNode;
  /** Small label shown top-right */
  label?: string;
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Extra className for the card (e.g. span classes) */
  className?: string;
  /** Extra content rendered below description */
  children?: ReactNode;
}

export interface MagicBentoProps {
  items: MagicBentoItem[];
  /** CSS grid-template-columns value — defaults to responsive auto-fit */
  gridCols?: string;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  /** Extra className on the grid wrapper */
  className?: string;
}

/* ─────────────────────────────────────────────
   MagicBento
───────────────────────────────────────────── */
export default function MagicBento({
  items,
  gridCols,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  enableTilt = false,
  enableMagnetism = true,
  clickEffect = true,
  spotlightRadius = 300,
  particleCount = 12,
  className = "",
}: MagicBentoProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const disabled = isMobile;

  const cardClass = [
    "mb-card",
    enableBorderGlow ? "mb-card--border-glow" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="mb-bento-section">
      {enableSpotlight && (
        <GlobalSpotlight gridRef={gridRef} disabled={disabled} radius={spotlightRadius} />
      )}

      <div
        ref={gridRef}
        className={`mb-card-grid ${className}`}
        style={gridCols ? { gridTemplateColumns: gridCols } : undefined}
      >
        {items.map((item, i) => {
          const cardStyle: React.CSSProperties = {
            ["--glow-color" as string]: GLOW_COLOR,
          };

          if (enableStars) {
            return (
              <ParticleCard
                key={i}
                className={`${cardClass} ${item.className ?? ""}`}
                style={cardStyle}
                disabled={disabled}
                particleCount={particleCount}
                enableTilt={enableTilt}
                enableMagnetism={enableMagnetism}
                clickEffect={clickEffect}
              >
                <CardInner item={item} />
              </ParticleCard>
            );
          }

          return (
            <div
              key={i}
              className={`${cardClass} ${item.className ?? ""}`}
              style={cardStyle}
            >
              <CardInner item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CardInner({ item }: { item: MagicBentoItem }) {
  return (
    <>
      {(item.icon || item.label) && (
        <div className="flex items-start justify-between mb-4 relative z-10">
          {item.icon && <div className="shrink-0">{item.icon}</div>}
          {item.label && (
            <span className="text-xs font-bold tracking-widest uppercase text-primary/70 ml-auto">
              {item.label}
            </span>
          )}
        </div>
      )}
      <div className="relative z-10 mt-auto">
        <h3 className="font-bold text-foreground text-lg mb-1 leading-snug">{item.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
        {item.children && <div className="mt-4">{item.children}</div>}
      </div>
    </>
  );
}
