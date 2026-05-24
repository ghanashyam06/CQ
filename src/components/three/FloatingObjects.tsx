"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingObjectProps {
  position?: [number, number, number];
  scale?: number;
  color?: string;
  speed?: number;
  geometry?: "icosahedron" | "octahedron" | "torus" | "dodecahedron" | "torusKnot";
  wireframe?: boolean;
  floatIntensity?: number;
  rotationSpeed?: number;
}

/**
 * Reusable floating 3D geometric shape with rotation and hover animations.
 */
export function FloatingObject({
  position = [0, 0, 0],
  scale = 1,
  color = "#00BF63",
  speed = 1,
  geometry = "icosahedron",
  wireframe = true,
  floatIntensity = 1,
  rotationSpeed = 0.3,
}: FloatingObjectProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const initialY = position[1];

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed;
    meshRef.current.rotation.x = t * rotationSpeed;
    meshRef.current.rotation.y = t * rotationSpeed * 0.7;
    meshRef.current.position.y = initialY + Math.sin(t) * 0.3 * floatIntensity;
  });

  const geo = useMemo(() => {
    switch (geometry) {
      case "octahedron":
        return <octahedronGeometry args={[1, 0]} />;
      case "torus":
        return <torusGeometry args={[1, 0.3, 16, 32]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[1, 0]} />;
      case "torusKnot":
        return <torusKnotGeometry args={[0.8, 0.25, 64, 16]} />;
      default:
        return <icosahedronGeometry args={[1, 1]} />;
    }
  }, [geometry]);

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geo}
      <meshStandardMaterial
        color={color}
        wireframe={wireframe}
        transparent
        opacity={0.6}
        emissive={color}
        emissiveIntensity={0.15}
      />
    </mesh>
  );
}

/**
 * Background particle field with floating green dots.
 */
export function ParticleCloud({
  count = 150,
  radius = 8,
  color = "#00BF63",
}: {
  count?: number;
  radius?: number;
  color?: string;
}) {
  const pointsRef = useRef<THREE.Points>(null!);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    
    // A simple seedable LCG pseudo-random generator to remain pure/idempotent
    // and satisfy the react-hooks/purity rule in React 19/Next 16.
    let seed = 42;
    const random = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    for (let i = 0; i < count; i++) {
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);
      const r = radius * (0.3 + random() * 0.7);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, [count, radius]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        color={color}
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
