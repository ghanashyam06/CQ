"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * StatsScene – A Three.js background for the ImpactStats section.
 * Features: subtle geometric arc rings, vertical data-rain lines with glowing tips,
 * a flowing wavy grid terrain at the bottom, and scattered particle dust.
 * Matches the Hero section's visual DNA but is distinct enough to feel fresh.
 */
export function StatsScene() {
  const groupRef = useRef<THREE.Group>(null!);

  // Smooth mouse parallax
  useFrame((state) => {
    if (!groupRef.current) return;
    const { x, y } = state.pointer;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      x * 0.12,
      0.04
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -y * 0.08,
      0.04
    );
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 2, 3]} intensity={1.8} color="#00ff88" decay={1.8} />
      <pointLight position={[-4, -3, 1]} intensity={1.0} color="#00BF63" decay={2.0} />
      <pointLight position={[5, 3, -2]} intensity={0.6} color="#00d4aa" />

      <group ref={groupRef}>
        {/* Geometric Arc Rings */}
        <ArcRings />

        {/* Data Rain Lines */}
        <DataRain />

        {/* Background Particle Dust */}
        <ParticleDust count={200} />
      </group>

      {/* Bottom wavy terrain (outside group for distinct parallax) */}
      <StatsWavyTerrain />
    </>
  );
}

/**
 * Geometric Arc Rings – Subtle semi-transparent arcs at various angles,
 * similar to the orbit rings in the Hero but positioned as background decoration.
 */
function ArcRings() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.getElapsedTime() * 0.015;
    }
  });

  return (
    <group ref={groupRef} position={[-1.5, 0.5, -4]}>
      {/* Large outer arc */}
      <mesh rotation={[0.3, 0.2, 0.1]}>
        <torusGeometry args={[4.5, 0.012, 8, 80, Math.PI * 1.2]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={0.6}
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Medium arc */}
      <mesh rotation={[0.6, -0.3, 0.4]}>
        <torusGeometry args={[3.2, 0.01, 8, 60, Math.PI * 0.9]} />
        <meshStandardMaterial
          color="#00BF63"
          emissive="#00BF63"
          emissiveIntensity={0.5}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Small inner arc */}
      <mesh rotation={[-0.2, 0.5, -0.3]}>
        <torusGeometry args={[2.0, 0.008, 8, 50, Math.PI * 1.5]} />
        <meshStandardMaterial
          color="#00d4aa"
          emissive="#00d4aa"
          emissiveIntensity={0.4}
          transparent
          opacity={0.18}
        />
      </mesh>

      {/* Far right decorative arc */}
      <mesh rotation={[0.1, -0.1, 0.8]} position={[3.5, -0.5, -1]}>
        <torusGeometry args={[2.8, 0.01, 8, 60, Math.PI * 0.7]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={0.5}
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}

/**
 * Data Rain – Vertical glowing lines falling down like digital data streams.
 * Each line has a bright tip at the bottom that pulses.
 */
function DataRain() {
  const groupRef = useRef<THREE.Group>(null!);

  // Deterministic pseudo-random for SSR safety
  const lines = useMemo(() => {
    let seed = 123;
    const random = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    const result: Array<{
      x: number;
      z: number;
      height: number;
      speed: number;
      delay: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < 30; i++) {
      result.push({
        x: (random() - 0.5) * 14,
        z: -1 - random() * 6,
        height: 0.4 + random() * 1.8,
        speed: 0.8 + random() * 1.5,
        delay: random() * Math.PI * 2,
        opacity: 0.12 + random() * 0.25,
      });
    }
    return result;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    groupRef.current.children.forEach((child, i) => {
      if (i >= lines.length) return;
      const line = lines[i];
      // Animate Y position: rain down and loop
      const cycle = (t * line.speed + line.delay) % 4;
      child.position.y = 4 - cycle * 2;
      // Fade based on position
      const mat = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
      if (mat) {
        const fadeIn = Math.min(cycle / 0.5, 1);
        const fadeOut = Math.max(1 - (cycle - 3) / 1, 0);
        mat.opacity = line.opacity * fadeIn * fadeOut;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {lines.map((line, i) => (
        <mesh key={i} position={[line.x, 4, line.z]}>
          <boxGeometry args={[0.008, line.height, 0.008]} />
          <meshStandardMaterial
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={1.2}
            transparent
            opacity={line.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * ParticleDust – Scattered green points forming a soft ambient dust field.
 */
function ParticleDust({ count = 200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);

    let seed = 777;
    const random = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (random() - 0.5) * 16;
      pos[i * 3 + 1] = (random() - 0.5) * 10;
      pos[i * 3 + 2] = -random() * 8;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.008;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.005) * 0.05;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color="#00BF63"
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/**
 * StatsWavyTerrain – A flowing wireframe grid at the bottom of the viewport,
 * matching the Hero section's wavy valley but positioned lower and more subtle.
 */
function StatsWavyTerrain() {
  const geomRef = useRef<THREE.BufferGeometry>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const { viewport } = useThree();

  // Scale terrain width to viewport
  const terrainWidth = Math.max(viewport.width * 2.5, 20);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const geom = geomRef.current;
    if (!geom) return;

    const posAttr = geom.getAttribute("position") as THREE.BufferAttribute;
    if (!posAttr) return;

    const numVerts = posAttr.count;
    const scroll = time * 1.2;

    for (let i = 0; i < numVerts; i++) {
      const x = posAttr.getX(i);
      const y = posAttr.getY(i);

      // Valley: centre low, sides rise
      const absX = Math.abs(x);
      const valley = Math.pow(absX * 0.12, 2) * 0.4;

      // Flowing sine wave
      const wave =
        Math.sin(x * 0.25 + (y - scroll) * 0.3) * 0.2 +
        Math.cos(x * 0.12 - (y - scroll * 0.7) * 0.15) * 0.1;

      posAttr.setZ(i, valley + wave);
    }

    posAttr.needsUpdate = true;
    geom.computeVertexNormals();

    // Subtle mouse tilt
    if (meshRef.current) {
      const { x } = state.pointer;
      meshRef.current.rotation.y = THREE.MathUtils.lerp(
        meshRef.current.rotation.y,
        x * 0.03,
        0.04
      );
    }
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2.1, 0, 0]}
      position={[0, -3.2, -2]}
    >
      <planeGeometry ref={geomRef} args={[terrainWidth, 12, 50, 40]} />
      <meshStandardMaterial
        color="#00ff88"
        wireframe
        transparent
        opacity={0.18}
        emissive="#00BF63"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}
