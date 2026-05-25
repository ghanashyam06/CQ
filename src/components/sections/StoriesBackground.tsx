"use client";

import dynamic from "next/dynamic";

/* Load Particles only on the client — it uses WebGL */
const Particles = dynamic(() => import("@/components/ui/Particles"), { ssr: false });

export default function StoriesBackground() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Particles
        particleColors={["#00bf63", "#00d97e", "#00f090"]}
        particleCount={180}
        particleSpread={12}
        speed={0.06}
        particleBaseSize={80}
        sizeRandomness={1.2}
        alphaParticles
        moveParticlesOnHover
        particleHoverFactor={0.4}
        disableRotation={false}
        pixelRatio={typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1}
      />
    </div>
  );
}
