"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ParticleCloud } from "./FloatingObjects";

/**
 * Interactive hero 3D scene with a central wireframe geodesic globe,
 * a single orbiting ring, background particles, and mouse-reactive parallax.
 * Fully responsive and theme-aware (light/dark compatibility).
 */
export function HeroScene({ isDark = true }: { isDark?: boolean }) {
  const groupRef = useRef<THREE.Group>(null!);
  const globeRef = useRef<THREE.Group>(null!);
  const innerGlobeRef = useRef<THREE.Mesh>(null!);
  const outerGlobeRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);
  const nodeRef = useRef<THREE.Mesh>(null!);

  const { viewport } = useThree();

  // Mouse parallax with smooth lerping for a premium feel
  useFrame((state) => {
    if (!groupRef.current) return;
    const { x, y } = state.pointer;

    // Smoothly rotate the central group to follow the cursor (similar to MetaMask fox tilt)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      x * 0.24,
      0.06
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -y * 0.15,
      0.06
    );

    // Continuous rotation of the globes and rings
    const time = state.clock.getElapsedTime();
    if (globeRef.current) {
      globeRef.current.rotation.y = time * 0.025;
    }
    if (outerGlobeRef.current) {
      outerGlobeRef.current.rotation.y = -time * 0.012;
      outerGlobeRef.current.rotation.z = time * 0.006;
    }
    if (innerGlobeRef.current) {
      innerGlobeRef.current.rotation.y = time * 0.02;
      innerGlobeRef.current.rotation.x = -time * 0.01;
    }

    // Outer ring rotation
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.08;
      
      // Counter-parallax: tilts opposite to the mouse to create deep spatial layers
      const targetX = Math.PI / 2.2 + Math.sin(time * 0.15) * 0.04 + (y * 0.1);
      const targetY = 0.2 - x * 0.12;
      
      ringRef.current.rotation.x = THREE.MathUtils.lerp(ringRef.current.rotation.x, targetX, 0.05);
      ringRef.current.rotation.y = THREE.MathUtils.lerp(ringRef.current.rotation.y, targetY, 0.05);
    }

    // Orbiting node position on the ring
    if (nodeRef.current) {
      const nodeTime = time * 0.35;
      const radius = 3.25; // slightly larger than torus radius to be clearly visible
      nodeRef.current.position.x = Math.cos(nodeTime) * radius;
      // Elliptical shape on Z/Y plane
      nodeRef.current.position.y = Math.sin(nodeTime) * radius * 0.1;
      nodeRef.current.position.z = Math.sin(nodeTime) * radius * 0.95;
    }
  });

  const scale = viewport.width > 10 ? 1.55 : 1.1;

  // Dynamic theme colors
  const primaryColor = isDark ? "#00ff88" : "#00bf63";
  const secondaryColor = isDark ? "#00d4aa" : "#008050";
  const emissiveColor = isDark ? "#00BF63" : "#007a3d";
  const nodeColor = isDark ? "#00f0ff" : "#0088cc";

  return (
    <>
      {/* Ambient + accent lights */}
      <ambientLight intensity={isDark ? 0.45 : 0.6} />
      <pointLight position={[0, 0, -3.2]} intensity={isDark ? 2.5 : 1.8} color={primaryColor} decay={1.5} />
      <pointLight position={[0, -2.5, -1]} intensity={isDark ? 2.0 : 1.5} color={emissiveColor} decay={1.5} />
      <pointLight position={[6, 5, 2]} intensity={isDark ? 1.2 : 0.8} color={primaryColor} />
      <pointLight position={[-6, -4, 2]} intensity={isDark ? 0.8 : 0.5} color={secondaryColor} />

      {/* Main mouse-reactive group */}
      <group ref={groupRef}>
        
        {/* Central Double-layered Wireframe Globe */}
        <group ref={globeRef} position={[0, 0, -3.2]} scale={scale}>
          {/* Outer wireframe sphere */}
          <mesh ref={outerGlobeRef}>
            <icosahedronGeometry args={[2.3, 1]} />
            <meshStandardMaterial
              color={primaryColor}
              wireframe
              transparent
              opacity={isDark ? 0.28 : 0.35}
              emissive={emissiveColor}
              emissiveIntensity={isDark ? 0.45 : 0.3}
            />
          </mesh>

          {/* Inner wireframe sphere */}
          <mesh ref={innerGlobeRef}>
            <icosahedronGeometry args={[1.8, 1]} />
            <meshStandardMaterial
              color={secondaryColor}
              wireframe
              transparent
              opacity={isDark ? 0.18 : 0.25}
              emissive={emissiveColor}
              emissiveIntensity={isDark ? 0.3 : 0.2}
            />
          </mesh>

          {/* Inner glow core */}
          <mesh>
            <sphereGeometry args={[1.3, 16, 16]} />
            <meshStandardMaterial
              color={isDark ? "#003b21" : "#d8f6e6"}
              transparent
              opacity={isDark ? 0.22 : 0.35}
              blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
            />
          </mesh>
        </group>

        {/* Orbit Ring (torus) and Orbiting Node */}
        <group position={[0, 0, -3.2]} scale={scale}>
          {/* Orbiting Ring */}
          <mesh ref={ringRef} rotation={[Math.PI / 2.2, 0.2, 0]}>
            <torusGeometry args={[3.2, 0.015, 8, 120]} />
            <meshStandardMaterial
              color={primaryColor}
              emissive={emissiveColor}
              emissiveIntensity={isDark ? 0.6 : 0.4}
              transparent
              opacity={isDark ? 0.45 : 0.35}
            />
          </mesh>

          {/* Orbiting signal node */}
          <mesh ref={nodeRef}>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshStandardMaterial
              color={nodeColor}
              emissive={nodeColor}
              emissiveIntensity={isDark ? 1.5 : 1.0}
            />
          </mesh>
        </group>

        {/* Background particle cloud */}
        <ParticleCloud count={260} radius={8.0} color={isDark ? "#00BF63" : "#007a3d"} />
      </group>
    </>
  );
}
