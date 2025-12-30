import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const HeroVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Interaction values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 80 }; // Heavy, slow feel
  const rotateX = useSpring(useTransform(mouseY, [-500, 500], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-500, 500], [-3, 3]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    // Z-10: Sits between D3 (0) and Content (20). 
    // Opacity reduced to 0.15 to blend with the Lattice.
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-15 select-none">
      <motion.div 
        style={{ rotateX, rotateY, perspective: 1200, transformStyle: "preserve-3d" }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <div className="relative w-[700px] h-[700px] flex items-center justify-center border-[0.5px] border-[#1a1a1a]/20 rounded-full">
           {/* Center Crosshair */}
           <div className="absolute w-[90%] h-[1px] bg-[#1a1a1a]/10" />
           <div className="absolute h-[90%] w-[1px] bg-[#1a1a1a]/10" />
           
           {/* Rotating Ring */}
           <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[15%] border-[1px] border-dashed border-[#1a1a1a]/20 rounded-full"
           />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroVisual;