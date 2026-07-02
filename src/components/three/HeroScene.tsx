"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ─── Glowing particle field ─── */
function ParticleField({
  count,
  spread,
  color,
}: {
  count: number;
  spread: number;
  color: string;
}) {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = spread * (0.4 + Math.random() * 0.6);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      sz[i] = Math.random() * 2.5 + 0.5;
    }
    return { positions: pos, sizes: sz };
  }, [count, spread]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.008;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Main scene ─── */
export function HeroScene({ isDark = true }: { isDark?: boolean }) {
  const masterGroupRef = useRef<THREE.Group>(null!);
  const { viewport } = useThree();

  // Mouse-reactive group
  useFrame((state) => {
    if (!masterGroupRef.current) return;
    const { x, y } = state.pointer;
    masterGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      masterGroupRef.current.rotation.y,
      x * 0.18,
      0.04
    );
    masterGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      masterGroupRef.current.rotation.x,
      -y * 0.1,
      0.04
    );
  });

  const scale = viewport.width > 10 ? 1.0 : 0.75;
  const isMobile = viewport.width < 5;

  return (
    <>
      {/* ── Lighting ── */}
      <ambientLight intensity={isDark ? 0.2 : 0.7} />

      <group ref={masterGroupRef} scale={scale}>
        {/* ── Particle nebula ── */}
        <ParticleField
          count={isMobile ? 200 : (isDark ? 420 : 600)}
          spread={7.5}
          color={isDark ? "#22c17a" : "#004a22"}
        />
      </group>
    </>
  );
}

