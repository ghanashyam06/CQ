"use client";

import React, { useRef, useEffect } from "react";

interface FallingTextProps {
  text: string;
  className?: string;
  font?: string;
  textColor?: string;
  gravity?: number;
  restitution?: number; // bounce factor (0 to 1)
  friction?: number; // ground slide friction (0 to 1)
}

interface PhysicsWord {
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  rotation: number;
  vRotation: number;
  isGrounded: boolean;
}

export default function FallingText({
  text,
  className = "",
  font = "bold 42px Poppins, sans-serif",
  textColor = "#00bf63",
  gravity = 0.35,
  restitution = 0.5,
  friction = 0.98,
}: FallingTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wordsRef = useRef<PhysicsWord[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize);

    // Initialize words
    const words = text.split(" ");
    ctx.font = font;

    const initialWords: PhysicsWord[] = words.map((w, index) => {
      const metrics = ctx.measureText(w);
      const textWidth = metrics.width;
      const textHeight = 40; // rough height estimate
      
      // Stagger initial positions across top
      const sectionWidth = width / words.length;
      const x = sectionWidth * index + sectionWidth / 2 - textWidth / 2;
      
      return {
        text: w,
        x,
        y: -100 - index * 60, // staggered start heights
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 2,
        width: textWidth,
        height: textHeight,
        rotation: (Math.random() - 0.5) * 0.5,
        vRotation: (Math.random() - 0.5) * 0.05,
        isGrounded: false,
      };
    });

    wordsRef.current = initialWords;

    // Track mouse speed and location
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
      
      mouseRef.current.vx = currentX - mouseRef.current.lastX;
      mouseRef.current.vy = currentY - mouseRef.current.lastY;
      mouseRef.current.x = currentX;
      mouseRef.current.y = currentY;
      mouseRef.current.lastX = currentX;
      mouseRef.current.lastY = currentY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Main loop
    const update = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = font;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const physicsWords = wordsRef.current;
      const mouse = mouseRef.current;

      physicsWords.forEach((word) => {
        // 1. Gravity
        if (!word.isGrounded) {
          word.vy += gravity;
        }

        // Update positions
        word.x += word.vx;
        word.y += word.vy;
        word.rotation += word.vRotation;

        // 2. Boundary Collisions (Walls)
        const halfW = word.width / 2;
        const halfH = word.height / 2;

        if (word.x - halfW < 0) {
          word.x = halfW;
          word.vx = -word.vx * restitution;
        } else if (word.x + halfW > width) {
          word.x = width - halfW;
          word.vx = -word.vx * restitution;
        }

        // Floor Collision
        if (word.y + halfH > height) {
          word.y = height - halfH;
          word.vy = -word.vy * restitution;
          word.vx *= friction; // roll friction
          word.vRotation *= friction;
          
          if (Math.abs(word.vy) < 0.5) {
            word.vy = 0;
            word.isGrounded = true;
          }
        } else {
          word.isGrounded = false;
        }

        // 3. Mouse interaction (Scattering)
        const dx = word.x - mouse.x;
        const dy = word.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          const force = (120 - distance) / 120; // 0 to 1 based on distance
          const angle = Math.atan2(dy, dx);
          
          // Add impulse pushing away from mouse
          word.vx += Math.cos(angle) * force * 8 + mouse.vx * 0.15;
          word.vy += Math.sin(angle) * force * 8 + mouse.vy * 0.15;
          word.vRotation += (Math.random() - 0.5) * 0.2;
          word.isGrounded = false;
        }

        // 4. Draw word
        ctx.save();
        ctx.translate(word.x, word.y);
        ctx.rotate(word.rotation);
        
        // Dynamic drop shadow for depth
        ctx.shadowColor = "rgba(0, 191, 99, 0.4)";
        ctx.shadowBlur = 10;
        
        ctx.fillStyle = textColor;
        ctx.fillText(word.text, 0, 0);
        ctx.restore();
      });

      // Decay mouse velocities
      mouse.vx *= 0.9;
      mouse.vy *= 0.9;

      animId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animId);
    };
  }, [text, font, textColor, gravity, restitution, friction]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full min-h-[300px] bg-transparent cursor-pointer block ${className}`}
    />
  );
}
