"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Image from "next/image";

interface PreloaderProps {
  onComplete: () => void;
}

/* --- Terminal boot log lines --- */
const bootLogs = [
  "[SYS] INITIALIZING CODEQUESTERS CORE V2.0...",
  "[R3F] MOUNTING GRAPHICS CANVAS ENGINE...",
  "[R3F] SYNTHESIZING VOLUMETRIC HOLOGRAPH SHADERS...",
  "[GSAP] BUFFERING KINETIC MOTION MATRIX...",
  "[DB] CACHING GUILD LEADERBOARD DATABASES...",
  "[DISCORD] SYNCING 15,000+ ACTIVE BUILDERS...",
  "[SYS] COMPILING RESPONSIVE BENTO SYSTEM...",
  "[API] FETCHING ACTIVE HACKATHON TIMELINE...",
  "[SEC] SECURING PIPELINE CREDENTIALS...",
  "[SYS] ECOSYSTEM COMPILED SUCCESSFULLY. BOOT COMPLETED.",
];

/* --- Scanline particles (deterministic positions) --- */
const PARTICLES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  x: Math.cos((i / 40) * Math.PI * 2) * 140 + (Math.random() - 0.5) * 40,
  y: Math.sin((i / 40) * Math.PI * 2) * 140 + (Math.random() - 0.5) * 40,
  size: 1.5 + Math.random() * 2.5,
  delay: i * 0.04,
  duration: 2 + Math.random() * 2,
}));

/* --- Motion Variants for Premium Text Cascades --- */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.7,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.8, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring" as const, damping: 11, stiffness: 120 },
  },
};

const taglineWords = ["LEARN", "BUILD", "HACK", "EARN", "LEAD"];

const taglineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 1.5,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, damping: 12, stiffness: 100 },
  },
};

export default function Preloader({ onComplete }: PreloaderProps) {
  /* --- State --- */
  const [phase, setPhase] = useState<"logo" | "terminal" | "exit">("logo");
  const [percent, setPercent] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [logoReady, setLogoReady] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const controls = useAnimation();

  /* --- Phase transitions --- */
  const startTerminalPhase = useCallback(() => {
    setPhase("terminal");
  }, []);

  const startExitPhase = useCallback(() => {
    setPhase("exit");
    setTimeout(() => {
      document.body.style.overflow = "";
      onComplete();
    }, 900);
  }, [onComplete]);

  /* --- Interactive 3D logo tilt --- */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window === "undefined") return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = ((clientX - innerWidth / 2) / (innerWidth / 2)) * 16;
    const y = ((clientY - innerHeight / 2) / (innerHeight / 2)) * -16;
    setTilt({ x, y });
  };

  /* --- Phase 1: Logo reveal timing --- */
  useEffect(() => {
    document.body.style.overflow = "hidden";

    // Show logo for 2.8 seconds then transition to terminal
    const logoTimer = setTimeout(() => {
      startTerminalPhase();
    }, 2800);

    return () => {
      clearTimeout(logoTimer);
    };
  }, [startTerminalPhase]);

  /* --- Phase 2: Terminal boot sequence --- */
  useEffect(() => {
    if (phase !== "terminal") return;

    const duration = 2600;
    const intervalTime = 26;
    const steps = duration / intervalTime;
    let currentStep = 0;

    timerRef.current = setInterval(() => {
      currentStep++;
      const targetPercent = Math.min(
        Math.floor((currentStep / steps) * 100),
        100
      );
      setPercent(targetPercent);

      const logIdx = Math.floor((targetPercent / 100) * bootLogs.length);
      if (logIdx < bootLogs.length) {
        setLogs((prev) => {
          if (!prev.includes(bootLogs[logIdx])) {
            return [...prev, bootLogs[logIdx]];
          }
          return prev;
        });
      }

      if (currentStep >= steps) {
        if (timerRef.current) clearInterval(timerRef.current);
        setTimeout(() => startExitPhase(), 400);
      }
    }, intervalTime);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, startExitPhase]);

  /* --- Logo load handler --- */
  const handleLogoLoad = useCallback(() => {
    setLogoReady(true);
    controls.start("visible");
  }, [controls]);

  return (
    <AnimatePresence>
      {phase !== "exit" ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.08,
            filter: "blur(12px)",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          onMouseMove={handleMouseMove}
          className="fixed inset-0 z-[10000] flex flex-col justify-between bg-[#060608] font-mono text-xs text-gray-500 overflow-hidden"
        >
          {/* --- Shared background layers --- */}
          {/* Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

          {/* Radial glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00bf63]/[0.03] rounded-full blur-[120px] pointer-events-none" />

          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
            }}
          />

          {/* =========== PHASE 1: LOGO REVEAL =========== */}
          <AnimatePresence mode="wait">
            {phase === "logo" && (
              <motion.div
                key="logo-phase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                  y: -30,
                  filter: "blur(8px)",
                  transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
                }}
                className="absolute inset-0 flex flex-col items-center justify-center z-20"
              >
                {/* Unified Centered Logo & Rings Container */}
                <div className="relative flex items-center justify-center w-[300px] h-[300px] sm:w-[340px] sm:h-[340px]">
                  {/* Concentric expanding cyber shockwaves */}
                  {logoReady && (
                    <>
                      <motion.div
                        className="absolute rounded-full border-2 border-[#00bf63]/30 pointer-events-none"
                        style={{ width: 140, height: 140 }}
                        initial={{ scale: 0.3, opacity: 0.8 }}
                        animate={{ scale: 3.2, opacity: 0 }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
                      />
                      <motion.div
                        className="absolute rounded-full border border-[#00f0ff]/20 pointer-events-none"
                        style={{ width: 140, height: 140 }}
                        initial={{ scale: 0.3, opacity: 0.6 }}
                        animate={{ scale: 4.4, opacity: 0 }}
                        transition={{ duration: 1.9, ease: "easeOut", delay: 0.3 }}
                      />
                    </>
                  )}

                  {/* Particle ring around logo */}
                  <div className="absolute w-[320px] h-[320px] pointer-events-none">
                    {PARTICLES.map((p) => (
                      <motion.div
                        key={p.id}
                        className="absolute rounded-full bg-[#00bf63]"
                        style={{
                          width: p.size,
                          height: p.size,
                          left: "50%",
                          top: "50%",
                        }}
                        initial={{ opacity: 0, x: 0, y: 0 }}
                        animate={
                          logoReady
                            ? {
                                opacity: [0, 0.9, 0.5, 0],
                                x: [0, p.x * 0.6, p.x],
                                y: [0, p.y * 0.6, p.y],
                              }
                            : {}
                        }
                        transition={{
                          duration: p.duration,
                          delay: p.delay,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </div>

                  {/* Rotating dashed border ring */}
                  <motion.div
                    className="absolute w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] rounded-full border-2 border-dashed border-[#00bf63]/20"
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 8,
                      ease: "linear",
                    }}
                  />

                  {/* Second counter-rotating ring */}
                  <motion.div
                    className="absolute w-[260px] h-[260px] sm:w-[310px] sm:h-[310px] rounded-full border border-[#00bf63]/10"
                    animate={{ rotate: -360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 12,
                      ease: "linear",
                    }}
                  />

                  {/* Logo container with glow & 3D tilt */}
                  <motion.div
                    className="relative z-10 flex items-center justify-center"
                    initial={{ scale: 0.3, opacity: 0, rotate: -25, filter: "blur(15px)" }}
                    animate={
                      logoReady
                        ? {
                            scale: 1,
                            opacity: 1,
                            rotate: 0,
                            filter: "blur(0px)",
                          }
                        : {}
                    }
                    style={{
                      rotateY: tilt.x,
                      rotateX: tilt.y,
                      transformStyle: "preserve-3d",
                      perspective: 1000,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 80,
                      damping: 14,
                      mass: 1,
                      delay: 0.1,
                    }}
                  >
                    {/* Glow behind logo */}
                    <motion.div
                      className="absolute inset-0 -m-8 rounded-full"
                      animate={{
                        boxShadow: [
                          "0 0 40px rgba(0, 191, 99, 0.1), 0 0 80px rgba(0, 191, 99, 0.05)",
                          "0 0 60px rgba(0, 191, 99, 0.25), 0 0 120px rgba(0, 191, 99, 0.1)",
                          "0 0 40px rgba(0, 191, 99, 0.1), 0 0 80px rgba(0, 191, 99, 0.05)",
                        ],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.5,
                        ease: "easeInOut",
                      }}
                    />

                    <Image
                      src="/logo-CQ-tech.png"
                      alt="CodeQuesters"
                      width={180}
                      height={180}
                      priority
                      onLoad={handleLogoLoad}
                      className="relative z-10 drop-shadow-[0_0_30px_rgba(0,191,99,0.3)] select-none pointer-events-none"
                      style={{ width: "clamp(120px, 25vw, 180px)", height: "auto" }}
                    />
                  </motion.div>
                </div>

                {/* Staggered Letter-by-Letter Title Text Reveal */}
                <motion.div
                  className="mt-8 text-center z-10 select-none pointer-events-none"
                  variants={containerVariants}
                  initial="hidden"
                  animate={logoReady ? "visible" : "hidden"}
                >
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-[0.25em] uppercase text-white flex justify-center items-center">
                    {"CODE".split("").map((char, index) => (
                      <motion.span
                        key={`code-${index}`}
                        variants={letterVariants}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                    {"QUESTERS".split("").map((char, index) => (
                      <motion.span
                        key={`quester-${index}`}
                        variants={letterVariants}
                        className="inline-block text-[#00bf63] neon-text"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </h1>

                  {/* Staggered Tagline Words Reveal */}
                  <motion.div
                    className="mt-3 flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs tracking-[0.3em] uppercase text-gray-500"
                    variants={taglineVariants}
                  >
                    {taglineWords.map((word, wordIdx) => (
                      <div key={wordIdx} className="flex items-center gap-1.5 sm:gap-2">
                        <motion.span variants={wordVariants}>
                          {word}
                        </motion.span>
                        {wordIdx < taglineWords.length - 1 && (
                          <motion.span
                            variants={wordVariants}
                            className="text-[#00bf63] opacity-40 font-bold"
                          >
                            ·
                          </motion.span>
                        )}
                      </div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Pulsing "initializing" indicator */}
                <motion.div
                  className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={logoReady ? { opacity: 1 } : {}}
                  transition={{ delay: 2.0 }}
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full bg-[#00bf63]"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.2,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500">
                    Initializing System
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* =========== PHASE 2: TERMINAL BOOTLOADER =========== */}
          {phase === "terminal" && (
            <motion.div
              key="terminal-phase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12 z-20"
            >
              {/* Top Header */}
              <div className="flex items-center justify-between border-b border-white/[0.04] pb-4">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#00bf63] animate-ping" />
                  <span className="tracking-widest uppercase font-semibold text-white text-[10px] sm:text-xs">
                    CodeQuesters Terminal Bootloader
                  </span>
                </div>
                <span className="text-[10px] text-[#00bf63]/70 border border-[#00bf63]/20 px-2 py-0.5 rounded uppercase tracking-wider">
                  SYS STATUS: ACTIVATE
                </span>
              </div>

              {/* Center: Logo mini + Logs */}
              <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full space-y-8 my-8">
                {/* Mini logo + title */}
                <div className="flex flex-col items-center justify-center space-y-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "linear",
                    }}
                    className="w-16 h-16 rounded-2xl border-2 border-dashed border-[#00bf63]/30 flex items-center justify-center relative"
                    style={{
                      boxShadow: "0 0 20px rgba(0, 191, 99, 0.05)",
                    }}
                  >
                    <div className="w-10 h-10 rounded-xl overflow-hidden">
                      <Image
                        src="/logo-CQ-tech.png"
                        alt="CQ"
                        width={40}
                        height={40}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </motion.div>
                  <h2 className="font-bold text-xl tracking-wider text-white uppercase mt-2">
                    Code<span className="text-[#00bf63]">Questers</span>
                  </h2>
                </div>

                {/* Rolling boot logs console */}
                <div className="bg-[#0c0c0f]/80 border border-white/[0.04] rounded-2xl p-4 sm:p-5 h-44 overflow-y-auto space-y-1.5 scrollbar-none flex flex-col justify-end backdrop-blur-sm shadow-2xl">
                  {logs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      className={
                        log.includes("SUCCESSFULLY")
                          ? "text-[#00bf63] font-bold"
                          : "text-gray-400"
                      }
                    >
                      {log}
                    </motion.div>
                  ))}
                  {/* Blinking cursor */}
                  <motion.span
                    className="inline-block w-2 h-4 bg-[#00bf63]/60"
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      times: [0, 0.5, 0.5, 1],
                    }}
                  />
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-bold uppercase tracking-wider text-xs">
                    <span className="text-gray-400">
                      Booting Core Modules
                    </span>
                    <span className="text-[#00bf63]">{percent}%</span>
                  </div>
                  <div className="w-full h-[3px] bg-white/[0.04] rounded-full overflow-hidden border border-white/[0.02]">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#00bf63] to-[#00f0ff]"
                      style={{
                        width: `${percent}%`,
                        boxShadow: "0 0 12px #00bf63",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom metadata */}
              <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/[0.04] pt-4 gap-3">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-500">
                    LOC: 28.6139° N, 77.2090° E (IN)
                  </span>
                  <span className="text-gray-600 hidden sm:inline">|</span>
                  <span className="text-gray-500 hidden sm:inline">
                    PORT: 3000
                  </span>
                </div>
                <span className="text-gray-600 uppercase tracking-widest text-[9px] text-center">
                  &copy; {new Date().getFullYear()} CodeQuesters Network.
                  Engine core loaded.
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
