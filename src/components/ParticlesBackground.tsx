"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Particles from "@/components/ui/Particles";

export function ParticlesBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <Particles
        particleColors={
          isDark
            ? ["#00FF9D", "#00FF9D", "#ffffff"]
            : ["#00C97B", "#00C97B", "#000000"]
        }
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={isDark ? 100 : 80}
        moveParticlesOnHover={false}
        alphaParticles={true}
        sizeRandomness={1}
        disableRotation={false}
        pixelRatio={1}
      />
    </div>
  );
}
