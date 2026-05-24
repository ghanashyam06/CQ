"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { FloatingObject, ParticleCloud } from "./FloatingObjects";

/**
 * Interactive hero 3D scene with shield geometry, floating objects, and particles.
 * Mouse-reactive with parallax effect.
 */
export function HeroScene() {
  const groupRef = useRef<THREE.Group>(null!);
  const { viewport } = useThree();

  // Mouse parallax with smooth lerping for a premium feel
  useFrame((state) => {
    if (!groupRef.current) return;
    const { x, y } = state.pointer;
    
    // Smoothly rotate the central group to follow the cursor (similar to MetaMask fox head)
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      x * 0.32, // More dynamic response range
      0.06 // Highly fluid damping
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -y * 0.22,
      0.06
    );
  });

  return (
    <>
      {/* Ambient + accent lights */}
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#00BF63" />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color="#00d4aa" />
      <pointLight position={[0, 0, 8]} intensity={0.3} color="#ffffff" />

      <group ref={groupRef}>
        {/* Central shield / icosahedron */}
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
          <FloatingObject
            position={[0, 0, 0]}
            scale={viewport.width > 10 ? 1.8 : 1.2}
            geometry="icosahedron"
            color="#00BF63"
            wireframe={true}
            speed={0.5}
            rotationSpeed={0.2}
          />
        </Float>

        {/* Orbiting smaller shapes */}
        <FloatingObject
          position={[-3.5, 1.5, -2]}
          scale={0.4}
          geometry="octahedron"
          color="#00d4aa"
          speed={0.8}
          floatIntensity={1.5}
        />
        <FloatingObject
          position={[3.2, -1, -1.5]}
          scale={0.35}
          geometry="dodecahedron"
          color="#00BF63"
          speed={0.6}
          floatIntensity={1.2}
        />
        <FloatingObject
          position={[-2, -2, 1]}
          scale={0.3}
          geometry="torus"
          color="#00e5c3"
          speed={1}
          floatIntensity={0.8}
        />
        <FloatingObject
          position={[2.5, 2, -3]}
          scale={0.25}
          geometry="torusKnot"
          color="#00BF63"
          speed={0.4}
          floatIntensity={1}
        />

        {/* Particle cloud */}
        <ParticleCloud count={200} radius={6} color="#00BF63" />
      </group>

      {/* Outer ring */}
      <RingGeometry />
    </>
  );
}

function RingGeometry() {
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!ringRef.current) return;
    const { x, y } = state.pointer;
    
    // Constant rotation over time
    ringRef.current.rotation.z = state.clock.elapsedTime * 0.08;
    
    // Counter-parallax: tilts opposite to the mouse to create deep spatial layers
    const targetX = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.2) * 0.05 + (y * 0.12);
    const targetY = -x * 0.15;
    
    ringRef.current.rotation.x = THREE.MathUtils.lerp(ringRef.current.rotation.x, targetX, 0.05);
    ringRef.current.rotation.y = THREE.MathUtils.lerp(ringRef.current.rotation.y, targetY, 0.05);
  });

  return (
    <mesh ref={ringRef} position={[0, 0, -1]}>
      <torusGeometry args={[3, 0.02, 16, 100]} />
      <meshStandardMaterial
        color="#00BF63"
        transparent
        opacity={0.3}
        emissive="#00BF63"
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}
