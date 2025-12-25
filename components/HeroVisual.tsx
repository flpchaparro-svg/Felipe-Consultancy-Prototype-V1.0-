import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const HeroVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Interaction values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for high-end feel
  const springConfig = { damping: 30, stiffness: 100 };
  const rotateX = useSpring(useTransform(mouseY, [-500, 500], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-500, 500], [-10, 10]), springConfig);
  const translateX = useSpring(useTransform(mouseX, [-500, 500], [-20, 20]), springConfig);
  const translateY = useSpring(useTransform(mouseY, [-500, 500], [-20, 20]), springConfig);

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
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-40 select-none">
      <motion.div 
        style={{ 
          rotateX, 
          rotateY, 
          x: translateX,
          y: translateY,
          perspective: 1200,
          transformStyle: "preserve-3d"
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* The Navigator Assemble */}
        <div className="relative w-[1000px] h-[1000px] flex items-center justify-center">
          
          {/* Concentric Layer 1: Perimeter Pulse */}
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-[5%] border border-[#C5A059]/20 rounded-full"
          />

          {/* Concentric Layer 2: Rotating HUD Ring */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[15%] border-[0.5px] border-[#C5A059]/30 rounded-full border-dashed"
            style={{ borderDasharray: "20 40" }}
          />

          {/* Concentric Layer 3: Technical Scale */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 180, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[25%] opacity-40"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="48" fill="none" stroke="#1a1a1a" strokeWidth="0.1" strokeDasharray="1 3" />
            </svg>
          </motion.div>

          {/* Concentric Layer 4: Floating Status Nodes */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-[#C5A059] rounded-full"
              style={{
                top: `${50 + 35 * Math.sin(i * Math.PI / 3)}%`,
                left: `${50 + 35 * Math.cos(i * Math.PI / 3)}%`,
                transform: "translate(-50%, -50%)",
                transformStyle: "preserve-3d",
                translateZ: "40px"
              }}
            >
              <div className="absolute top-4 left-4 font-mono text-[7px] text-[#1a1a1a]/40 whitespace-nowrap uppercase tracking-[0.2em] pointer-events-none">
                SYS_NODE_0{i} // {Math.random() > 0.5 ? 'ACTIVE' : 'READY'}
              </div>
              <motion.div 
                animate={{ scale: [1, 2.5, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                className="absolute inset-[-100%] rounded-full border border-[#C5A059]"
              />
            </motion.div>
          ))}

          {/* Center PrecisionHUD */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className="w-full h-[0.5px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />
            <div className="h-full w-[0.5px] bg-gradient-to-b from-transparent via-[#C5A059] to-transparent absolute" />
          </div>

          {/* Floating Data Streams (Curved Surgical Lines) */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.08]" viewBox="0 0 1000 1000">
            <motion.path 
              d="M300,500 Q500,200 700,500" 
              fill="none" 
              stroke="#C5A059" 
              strokeWidth="0.5"
              strokeDasharray="400"
              animate={{ strokeDashoffset: [400, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.path 
              d="M700,500 Q500,800 300,500" 
              fill="none" 
              stroke="#E21E3F" 
              strokeWidth="0.5"
              strokeDasharray="400"
              animate={{ strokeDashoffset: [400, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 1 }}
            />
          </svg>
        </div>
      </motion.div>
      
      {/* HUD Scanline Effect */}
      <motion.div 
        animate={{ top: ['-10%', '110%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 w-full h-[100px] bg-gradient-to-b from-transparent via-[#C5A059]/5 to-transparent pointer-events-none z-10"
      />
    </div>
  );
};

export default HeroVisual;