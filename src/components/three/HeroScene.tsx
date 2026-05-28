"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";

/* ─── Floating orbiting satellite ─── */
function Satellite({
  radius,
  speed,
  offset,
  size,
  color,
  emissive,
}: {
  radius: number;
  speed: number;
  offset: number;
  size: number;
  color: string;
  emissive: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + offset;
    meshRef.current.position.x = Math.cos(t) * radius;
    meshRef.current.position.y = Math.sin(t * 0.7) * radius * 0.4;
    meshRef.current.position.z = Math.sin(t) * radius;
    meshRef.current.rotation.x += 0.012;
    meshRef.current.rotation.y += 0.018;
  });

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[size, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={1.2}
        metalness={0.6}
        roughness={0.2}
        wireframe={false}
      />
    </mesh>
  );
}

/* ─── Network node + connections ─── */
function NetworkNode({
  position,
  size,
  color,
}: {
  position: [number, number, number];
  size: number;
  color: string;
}) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[size, 10, 10]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.8}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
}

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

/* ─── 3D Logo Panel with texture ─── */
function LogoModel({ isDark }: { isDark: boolean }) {
  const texture = useLoader(TextureLoader, "/logo-CQ-tech.png");
  const groupRef = useRef<THREE.Group>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Gentle bob
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.12;
      // Mouse-reactive tilt
      const { x, y } = state.pointer;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        x * 0.3,
        0.04
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -y * 0.18,
        0.04
      );
    }
    // Pulse glow
    if (glowRef.current) {
      const mat = glowRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.4 + Math.sin(t * 1.8) * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.1, 0]}>
      {/* Logo quad */}
      <mesh>
        <planeGeometry args={[2.6, 2.6]} />
        <meshStandardMaterial
          map={texture}
          transparent
          alphaTest={0.05}
          roughness={0.15}
          metalness={0.4}
          emissive={isDark ? "#00bf63" : "#004a2a"}
          emissiveIntensity={isDark ? 0.08 : 0.04}
        />
      </mesh>

      {/* Glowing halo behind logo */}
      <mesh ref={glowRef} position={[0, 0, -0.25]}>
        <circleGeometry args={[1.7, 64]} />
        <meshStandardMaterial
          color={isDark ? "#00ff88" : "#00bf63"}
          emissive={isDark ? "#00ff88" : "#00bf63"}
          emissiveIntensity={0.5}
          transparent
          opacity={isDark ? 0.08 : 0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Thin glowing border ring */}
      <mesh position={[0, 0, -0.1]} rotation={[0, 0, 0]}>
        <torusGeometry args={[1.55, 0.012, 8, 128]} />
        <meshStandardMaterial
          color={isDark ? "#00ff88" : "#005e2c"}
          emissive={isDark ? "#00ff88" : "#005e2c"}
          emissiveIntensity={isDark ? 1.8 : 3.0}
          transparent
          opacity={isDark ? 0.75 : 1.0}
        />
      </mesh>
    </group>
  );
}

/* ─── Orbiting decorative rings ─── */
function OrbitRing({
  radius,
  tubeRadius,
  speed,
  rotation,
  color,
  isDark,
}: {
  radius: number;
  tubeRadius: number;
  speed: number;
  rotation: [number, number, number];
  color: string;
  isDark: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    meshRef.current.rotation.z = state.clock.getElapsedTime() * speed;
  });

  return (
    <mesh ref={meshRef} rotation={rotation}>
      <torusGeometry args={[radius, tubeRadius, 6, 180]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={isDark ? 0.8 : 2.5}
        transparent
        opacity={isDark ? 0.35 : 0.75}
      />
    </mesh>
  );
}

/* ─── Energy arc line (LatheGeometry-based) ─── */
function GlowDisk({ isDark }: { isDark: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    meshRef.current.rotation.z += 0.003;
    meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.25) * 0.4;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -1.5]}>
      <ringGeometry args={[3.8, 4.0, 128]} />
      <meshStandardMaterial
        color={isDark ? "#00ff88" : "#005e2c"}
        emissive={isDark ? "#00ff88" : "#005e2c"}
        emissiveIntensity={isDark ? 1.2 : 2.5}
        transparent
        opacity={isDark ? 0.12 : 0.5}
        side={THREE.DoubleSide}
        blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ─── Main scene ─── */
export function HeroScene({ isDark = true }: { isDark?: boolean }) {
  const masterGroupRef = useRef<THREE.Group>(null!);
  const { viewport } = useThree();

  // Light mode uses deep, saturated greens for high contrast on the pale background
  const primary   = isDark ? "#00ff88" : "#005e2c";
  const secondary = isDark ? "#00d4aa" : "#003d1e";
  const cyan      = isDark ? "#00e5ff" : "#006b5a";

  // Network node positions arranged in a circular orbit
  const networkNodes = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const r = 2.2;
      return {
        position: [
          Math.cos(angle) * r,
          Math.sin(angle * 0.5) * 0.5,
          Math.sin(angle) * r,
        ] as [number, number, number],
        size: 0.04 + Math.random() * 0.04,
      };
    });
  }, []);

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

  return (
    <>
      {/* ── Lighting ── */}
      <ambientLight intensity={isDark ? 0.3 : 0.7} />
      <pointLight position={[0, 0, 3]}  intensity={isDark ? 3.5 : 4.5} color={primary}   decay={1.2} />
      <pointLight position={[5, 4, 2]}  intensity={isDark ? 2.0 : 3.0} color={primary}   decay={1.5} />
      <pointLight position={[-5, -3, 1]} intensity={isDark ? 1.5 : 2.5} color={secondary} decay={1.5} />
      <pointLight position={[0, -4, -2]} intensity={isDark ? 1.2 : 2.0} color={cyan}      decay={2}   />
      {/* Extra fill light for day mode — punches shadows */}
      {!isDark && <pointLight position={[0, 0, -4]} intensity={3.0} color="#00ff88" decay={1.5} />}
      <directionalLight position={[0, 5, 5]} intensity={isDark ? 0.6 : 1.4} />

      <group ref={masterGroupRef} scale={scale}>
        {/* ── CQ Logo (central hero) ── */}
        <LogoModel isDark={isDark} />

        {/* ── Orbit rings ── */}
        <OrbitRing
          radius={2.5}
          tubeRadius={0.008}
          speed={0.18}
          rotation={[Math.PI / 2.4, 0.3, 0]}
          color={primary}
          isDark={isDark}
        />
        <OrbitRing
          radius={3.4}
          tubeRadius={0.006}
          speed={-0.12}
          rotation={[Math.PI / 3.5, -0.5, 0.2]}
          color={secondary}
          isDark={isDark}
        />
        <OrbitRing
          radius={4.2}
          tubeRadius={0.004}
          speed={0.07}
          rotation={[Math.PI / 2.0, 0.8, -0.3]}
          color={cyan}
          isDark={isDark}
        />

        {/* ── Outer glow disk ── */}
        <GlowDisk isDark={isDark} />

        {/* ── Network nodes ── */}
        {networkNodes.map((n, i) => (
          <NetworkNode key={i} position={n.position} size={n.size} color={i % 2 === 0 ? primary : secondary} />
        ))}

        {/* ── Orbiting satellites (octahedra) ── */}
        <Satellite radius={2.6} speed={0.55} offset={0}           size={0.09} color={primary}    emissive={primary} />
        <Satellite radius={2.6} speed={0.55} offset={Math.PI}     size={0.07} color={secondary}  emissive={secondary} />
        <Satellite radius={3.5} speed={0.38} offset={Math.PI / 3} size={0.11} color={cyan}       emissive={cyan} />
        <Satellite radius={3.5} speed={0.38} offset={Math.PI * 4/3} size={0.08} color={primary}  emissive={primary} />
        <Satellite radius={4.3} speed={0.22} offset={Math.PI / 6} size={0.14} color={secondary}  emissive={secondary} />

        {/* ── Particle nebula ── */}
        <ParticleField
          count={isDark ? 420 : 600}
          spread={7.5}
          color={isDark ? "#00BF63" : "#004a22"}
        />
      </group>
    </>
  );
}
