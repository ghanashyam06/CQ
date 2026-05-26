"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
}

interface Pulse {
  from: Node;
  to: Node;
  progress: number;
  speed: number;
}

export function NeuralNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== "light";
  const isDarkRef = useRef(isDark);

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Node configuration
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    
    // Config values
    const maxDistance = 140;
    const maxPulses = 12;
    const mouseRadius = 180;
    const mousePull = 0.08;

    // Resize handler
    const handleResize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Re-initialize nodes based on the new size
      initNodes();
    };

    // Initialize nodes
    const initNodes = () => {
      const isMobile = width < 768;
      const nodeCount = isMobile ? 30 : 65;
      
      nodes = [];
      pulses = [];

      for (let i = 0; i < nodeCount; i++) {
        const radius = 1.5 + Math.random() * 2;
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius,
          baseRadius: radius,
        });
      }
    };

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    // Setup events
    window.addEventListener("resize", handleResize);
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    // Initialize sizes
    handleResize();

    // Helper: Find neighbors of a node
    const getNeighbors = (node: Node): Node[] => {
      const neighbors: Node[] = [];
      for (const other of nodes) {
        if (other === node) continue;
        const dx = other.x - node.x;
        const dy = other.y - node.y;
        const dist = Math.hypot(dx, dy);
        if (dist < maxDistance) {
          neighbors.push(other);
        }
      }
      return neighbors;
    };

    // Spawn a pulse along a valid connection
    const spawnPulse = () => {
      if (nodes.length < 2 || pulses.length >= maxPulses) return;

      // Select a random node that has neighbors
      const candidates = nodes.filter(n => getNeighbors(n).length > 0);
      if (candidates.length === 0) return;

      const fromNode = candidates[Math.floor(Math.random() * candidates.length)];
      const neighbors = getNeighbors(fromNode);
      const toNode = neighbors[Math.floor(Math.random() * neighbors.length)];

      pulses.push({
        from: fromNode,
        to: toNode,
        progress: 0,
        speed: 0.008 + Math.random() * 0.012, // speed percentage per frame
      });
    };

    // Animation Loop
    const animate = () => {
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;
      const themeDark = isDarkRef.current;
      
      const lineColor = themeDark ? "rgba(0, 191, 99, " : "rgba(0, 140, 70, ";
      const nodeColor = themeDark ? "rgba(0, 191, 99, 0.4)" : "rgba(0, 140, 70, 0.35)";
      const coreColor = themeDark ? "rgba(0, 255, 136, 0.9)" : "rgba(0, 191, 99, 0.95)";
      const pulseColor = themeDark ? "#00ff88" : "#00BF63";
      const mouseLineColor = themeDark ? "rgba(0, 255, 136, " : "rgba(0, 191, 99, ";

      // 1. Update and draw nodes
      for (const node of nodes) {
        // Apply mouse reaction forces
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseRadius) {
            // Gentle attraction
            const force = (1 - dist / mouseRadius) * mousePull;
            node.vx += (dx / dist) * force * 0.15;
            node.vy += (dy / dist) * force * 0.15;
            
            // Temporary glow size scaling
            node.radius = node.baseRadius + (1 - dist / mouseRadius) * 2;
          } else {
            node.radius = node.baseRadius;
          }
        } else {
          node.radius = node.baseRadius;
        }

        // Apply friction to limit extreme speeds from mouse attraction
        node.vx *= 0.95;
        node.vy *= 0.95;

        // Add default tiny drift speed
        const driftAngle = Math.random() * Math.PI * 2;
        const driftForce = 0.02;
        node.vx += Math.cos(driftAngle) * driftForce;
        node.vy += Math.sin(driftAngle) * driftForce;

        // Speed limit
        const speed = Math.hypot(node.vx, node.vy);
        const maxSpeed = 0.8;
        if (speed > maxSpeed) {
          node.vx = (node.vx / speed) * maxSpeed;
          node.vy = (node.vy / speed) * maxSpeed;
        }

        // Move node
        node.x += node.vx;
        node.y += node.vy;

        // Boundary wrap-around
        const margin = 10;
        if (node.x < -margin) node.x = width + margin;
        if (node.x > width + margin) node.x = -margin;
        if (node.y < -margin) node.y = height + margin;
        if (node.y > height + margin) node.y = -margin;

        // Draw node dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();

        // Node center core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = coreColor;
        ctx.fill();
      }

      // 2. Draw connections (lines)
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.16;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `${lineColor}${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // 3. Draw mouse-to-node connections
      if (mouse.x !== null && mouse.y !== null) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = coreColor;
        ctx.shadowBlur = 10;
        ctx.shadowColor = pulseColor;
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow for optimization

        for (const node of nodes) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouseRadius) {
            const alpha = (1 - dist / mouseRadius) * 0.22;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(node.x, node.y);
            ctx.strokeStyle = `${mouseLineColor}${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // 4. Update and draw pulses
      // Spawn new pulses to maintain density
      if (pulses.length < maxPulses && Math.random() < 0.05) {
        spawnPulse();
      }

      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.progress += pulse.speed;

        // Check if connection is still valid (nodes are within bounds and not too far apart)
        const dist = Math.hypot(pulse.to.x - pulse.from.x, pulse.to.y - pulse.from.y);
        if (dist > maxDistance * 1.5) {
          // Break pulse if nodes drift too far
          pulses.splice(i, 1);
          continue;
        }

        if (pulse.progress >= 1) {
          // Reached target! Choose next node or terminate
          const neighbors = getNeighbors(pulse.to);
          // 85% chance to propagate to keep the chain alive, if neighbors exist
          if (neighbors.length > 0 && Math.random() < 0.8) {
            // Select next target node (exclude current start to prevent immediate backtracking)
            const nextCandidates = neighbors.filter(n => n !== pulse.from);
            const nextTarget = nextCandidates.length > 0 
              ? nextCandidates[Math.floor(Math.random() * nextCandidates.length)]
              : neighbors[Math.floor(Math.random() * neighbors.length)];
            
            pulse.from = pulse.to;
            pulse.to = nextTarget;
            pulse.progress = 0;
            // randomize speed slightly
            pulse.speed = 0.008 + Math.random() * 0.012;
          } else {
            // Terminate pulse
            pulses.splice(i, 1);
          }
          continue;
        }

        // Draw the energy pulse dot
        const px = pulse.from.x + (pulse.to.x - pulse.from.x) * pulse.progress;
        const py = pulse.from.y + (pulse.to.y - pulse.from.y) * pulse.progress;

        // Draw double layered pulse glow
        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = pulseColor;
        ctx.shadowBlur = 6;
        ctx.shadowColor = pulseColor;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // IntersectionObserver to pause/resume canvas when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            cancelAnimationFrame(animationFrameId);
            animate();
          } else {
            cancelAnimationFrame(animationFrameId);
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
      />
      {/* Soft gradient backdrop overlays to blend canvas neatly with dark/light context */}
      <div 
        className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0)_40%,rgba(255,255,255,0.7)_100%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(4,10,6,0)_40%,rgba(4,10,6,0.7)_100%)]"
      />
      {/* Top & bottom fading edges */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white dark:from-[#040a06] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-[#040a06] to-transparent" />
    </div>
  );
}
