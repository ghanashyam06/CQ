"use client";

import React, { useRef, useEffect } from "react";

interface ThreadsProps {
  className?: string;
  color?: string;
  count?: number;
  speed?: number;
}

export default function Threads({
  className = "",
  color = "rgba(0, 191, 99, 0.12)", // CQ Green
  count = 8,
  speed = 0.5,
}: ThreadsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Set up wave/thread configurations
    const threads = Array.from({ length: count }).map((_, i) => ({
      y: height * 0.5 + (i - count / 2) * 25,
      amplitude: 15 + i * 8,
      frequency: 0.001 + i * 0.0005,
      phase: i * Math.PI * 0.25,
      speed: (0.01 + i * 0.005) * speed,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      threads.forEach((t) => {
        t.phase += t.speed;
        
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        
        for (let x = 0; x < width; x += 5) {
          const y = t.y + Math.sin(x * t.frequency + t.phase) * t.amplitude + Math.cos(x * 0.005 - t.phase) * 10;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, count, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
}
