import React, { useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  tx: number; // Target X (Order)
  ty: number; // Target Y (Order)
  vx: number;
  vy: number;
  color: string;
}

const D3Background: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // PERFORMANCE: Fade out and disable pointer events on scroll
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Canvas Setup
    let width = containerRef.current.clientWidth;
    let height = containerRef.current.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // 1. GENERATE THE LATTICE (ORDER)
    const particles: Particle[] = [];
    const cols = 24; 
    const rows = 16;
    const spacingX = width / cols;
    const spacingY = height / rows;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        // Target: Perfect Grid
        const tx = i * spacingX + spacingX / 2;
        const ty = j * spacingY + spacingY / 2;
        
        // Start: Random Chaos (Off-screen or scattered)
        const startX = Math.random() * width;
        const startY = Math.random() * height;

        particles.push({
          x: startX,
          y: startY,
          tx: tx,
          ty: ty,
          vx: (Math.random() - 0.5) * 5,
          vy: (Math.random() - 0.5) * 5,
          color: Math.random() > 0.9 ? '#C5A059' : '#1a1a1a' // 10% Gold, 90% Black
        });
      }
    }

    // 2. PHYSICS LOOP
    let animationFrameId: number;
    let mouseX = -1000;
    let mouseY = -1000;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw Connections (The Structure)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(26, 26, 26, 0.05)';
      ctx.lineWidth = 0.5;

      particles.forEach((p) => {
        // PHYSICS: Attraction to Target (Crystallization)
        const dx = p.tx - p.x;
        const dy = p.ty - p.y;
        
        p.vx += dx * 0.03; // Attraction strength
        p.vy += dy * 0.03;

        // MOUSE: Repulsion/Disturbance
        const mdx = mouseX - p.x;
        const mdy = mouseY - p.y;
        const dist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.vx -= mdx * force * 0.8;
          p.vy -= mdy * force * 0.8;
        }

        // Friction
        p.vx *= 0.85;
        p.vy *= 0.85;

        p.x += p.vx;
        p.y += p.vy;

        // Draw Particle
        ctx.fillStyle = p.color === '#C5A059' ? 'rgba(197, 160, 89, 0.8)' : 'rgba(26, 26, 26, 0.3)';
        const r = p.color === '#C5A059' ? 1.5 : 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();

        // Connect only if close to target (Structure forming)
        if (Math.abs(dx) < 20 && Math.abs(dy) < 20) {
           ctx.moveTo(p.x, p.y);
           ctx.lineTo(p.x + (Math.random()-0.5)*10, p.y + (Math.random()-0.5)*10); // Simulated lattice noise
        }
      });
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    // Events
    const onMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      }
    };
    const onResize = () => {
      width = containerRef.current?.clientWidth || window.innerWidth;
      height = containerRef.current?.clientHeight || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [scrollY]);

  return (
    <motion.div 
      ref={containerRef} 
      style={{ opacity }} 
      className="absolute inset-0 z-0 pointer-events-none"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  );
};

export default D3Background;