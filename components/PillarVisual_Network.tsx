
import React, { useEffect, useRef } from 'react';

const PillarVisual_Network: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 600;
    let height = canvas.height = 600;
    const padding = 10; // Padding to prevent clipping
    
    // Configuration
    const nodeCount = 40;
    const coreX = width / 2;
    const coreY = height / 2;

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
    }

    const nodes: Node[] = [];

    // Init Nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: padding + Math.random() * (width - padding * 2),
        y: padding + Math.random() * (height - padding * 2),
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2.5 + 2 // Increased size for visibility
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update dimensions if resized (though usually handled by event listener)
      // Note: Changing canvas width/height clears context, so we do it in resize handler, 
      // but we need current width/height for bounds.
      
      // Draw Central Hub
      // Re-calculate core center in case of resize
      const currentCoreX = width / 2;
      const currentCoreY = height / 2;

      ctx.beginPath();
      ctx.arc(currentCoreX, currentCoreY, 8, 0, Math.PI * 2); // Slightly larger core
      ctx.fillStyle = '#C5A059'; // Gold
      ctx.fill();
      
      // Pulse Effect for Core
      ctx.beginPath();
      ctx.arc(currentCoreX, currentCoreY, 24 + Math.sin(Date.now() / 500) * 5, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(197, 160, 89, 0.3)'; // Increased opacity
      ctx.lineWidth = 1.5;
      ctx.stroke();

      nodes.forEach(node => {
        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off walls with padding
        if (node.x < padding || node.x > width - padding) node.vx *= -1;
        if (node.y < padding || node.y > height - padding) node.vy *= -1;

        // Draw Node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = '#1a1a1a';
        ctx.fill();

        // Connect to Core
        const dx = currentCoreX - node.x;
        const dy = currentCoreY - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 250) {
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(currentCoreX, currentCoreY);
          // Increased opacity and line width
          ctx.strokeStyle = `rgba(26, 26, 26, ${1 - dist / 250})`;
          ctx.lineWidth = 1.2; 
          ctx.stroke();
        }

        // Connect to Neighbors
        nodes.forEach(otherNode => {
            const ndx = node.x - otherNode.x;
            const ndy = node.y - otherNode.y;
            const ndist = Math.sqrt(ndx * ndx + ndy * ndy);

            if (ndist < 90) {
                ctx.beginPath();
                ctx.moveTo(node.x, node.y);
                ctx.lineTo(otherNode.x, otherNode.y);
                // Increased opacity and line width
                ctx.strokeStyle = `rgba(26, 26, 26, ${0.4 * (1 - ndist / 90)})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        });
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };

  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden cursor-crosshair relative">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#1a1a1a]/50 uppercase tracking-widest pointer-events-none">
        [ DATA_TOPOLOGY // SYNCHRONIZED ]
      </div>
    </div>
  );
};

export default PillarVisual_Network;
