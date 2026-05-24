"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Suspense, type ReactNode } from "react";

interface Scene3DProps {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  camera?: { position?: [number, number, number]; fov?: number };
}

/**
 * Reusable Three.js canvas wrapper with performance defaults.
 */
export function Scene3D({
  children,
  className = "",
  interactive = false,
  camera = { position: [0, 0, 5], fov: 75 },
}: Scene3DProps) {
  return (
    <div className={`canvas-container ${interactive ? "interactive" : ""} ${className}`}>
      <Canvas
        camera={camera}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          {children}
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
