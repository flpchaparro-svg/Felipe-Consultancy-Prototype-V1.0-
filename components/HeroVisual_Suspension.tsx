
import React, { useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform, useAnimationFrame } from 'framer-motion';

const HeroVisual_Suspension: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse Interaction Inputs (-1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth Physics
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 1 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 1 });

  // Event Listeners
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      mouseX.set(x);
      mouseY.set(y);
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', () => { mouseX.set(0); mouseY.set(0); });
    }
    return () => container?.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // --- SVG GEOMETRY CONSTANTS ---
  const CX = 250;
  const CY = 50; // Anchor Point

  // Rotations driven by mouse
  const rotateMain = useTransform(smoothX, [-1, 1], [-15, 15]);
  const rotateLeft = useTransform(smoothX, [-1, 1], [10, -30]);
  const rotateRight = useTransform(smoothX, [-1, 1], [30, -10]);
  const stretch = useTransform(smoothY, [-1, 1], [0.9, 1.1]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-[500px] relative flex items-center justify-center cursor-move overflow-hidden select-none"
    >
      <svg viewBox="0 0 500 500" className="w-full h-full pointer-events-none overflow-visible">
        
        {/* GLOBAL GROUP (Anchored at Top Center) */}
        <motion.g 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
        >
           {/* Main Vertical Wire */}
           <line x1={CX} y1="0" x2={CX} y2={CY} stroke="#1a1a1a" strokeWidth="1" strokeDasharray="2 2" opacity="0.3" />
           <circle cx={CX} cy={CY} r="3" fill="#1a1a1a" />

           {/* MAIN BEAM (Rotates) */}
           <motion.g style={{ rotate: rotateMain, originX: `${CX}px`, originY: `${CY}px` }}>
              
              {/* Beam Line */}
              <line x1={CX-120} y1={CY+40} x2={CX+120} y2={CY+20} stroke="#1a1a1a" strokeWidth="1.5" />
              <line x1={CX} y1={CY} x2={CX-120} y2={CY+40} stroke="#1a1a1a" strokeWidth="1" opacity="0.5" />
              <line x1={CX} y1={CY} x2={CX+120} y2={CY+20} stroke="#1a1a1a" strokeWidth="1" opacity="0.5" />

              {/* LEFT ARM SYSTEM */}
              <motion.g style={{ x: CX-120, y: CY+40, rotate: rotateLeft, originX: 0, originY: 0 }}>
                 <line x1="0" y1="0" x2="0" y2="100" stroke="#1a1a1a" strokeWidth="1" />
                 <circle cx="0" cy="100" r="40" fill="none" stroke="#E21E3F" strokeWidth="1" strokeOpacity="0.8" />
                 <motion.circle cx="0" cy="100" r="20" fill="#E21E3F" opacity="0.1" />
                 <text x="0" y="160" textAnchor="middle" className="font-mono text-[8px] tracking-widest fill-[#E21E3F] font-bold">ACQUISITION</text>
                 
                 {/* Dangling Sub-Node */}
                 <motion.g style={{ x: 0, y: 100, rotate: useTransform(smoothX, v => v * 20) }}>
                    <line x1="0" y1="40" x2="0" y2="80" stroke="#1a1a1a" strokeWidth="0.5" strokeDasharray="2 2" />
                    <rect x="-10" y="80" width="20" height="20" fill="#1a1a1a" rx="2" />
                 </motion.g>
              </motion.g>

              {/* RIGHT ARM SYSTEM */}
              <motion.g style={{ x: CX+120, y: CY+20, rotate: rotateRight, originX: 0, originY: 0 }}>
                 <line x1="0" y1="0" x2="0" y2="80" stroke="#1a1a1a" strokeWidth="1" />
                 <rect x="-30" y="80" width="60" height="60" fill="none" stroke="#C5A059" strokeWidth="1" />
                 <motion.rect x="-15" y="95" width="30" height="30" fill="#C5A059" opacity="0.1" />
                 <text x="0" y="160" textAnchor="middle" className="font-mono text-[8px] tracking-widest fill-[#C5A059] font-bold">VELOCITY</text>

                 {/* Counter Balance */}
                 <line x1="30" y1="110" x2="80" y2="110" stroke="#1a1a1a" strokeWidth="1" opacity="0.5" />
                 <circle cx="80" cy="110" r="5" fill="#C5A059" />
              </motion.g>

           </motion.g>

           {/* CENTER GRAVITY LINE (Stays relatively stable but stretches) */}
           <motion.g style={{ x: CX, y: CY, scaleY: stretch }}>
              <line x1="0" y1="0" x2="0" y2="250" stroke="#1a1a1a" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.2" />
              <motion.g style={{ x: 0, y: 250, rotate: useTransform(smoothX, v => v * -10) }}>
                 <circle cx="0" cy="0" r="30" fill="#1a1a1a" />
                 <circle cx="0" cy="0" r="45" fill="none" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="2 2" />
                 <text x="0" y="60" textAnchor="middle" className="font-mono text-[8px] tracking-widest fill-[#1a1a1a] font-bold">INTELLIGENCE_CORE</text>
              </motion.g>
           </motion.g>

        </motion.g>
      </svg>

      <div className="absolute bottom-6 font-mono text-[9px] text-[#1a1a1a]/30 uppercase tracking-[0.3em] pointer-events-none">
         [ SYSTEM_EQUILIBRIUM // STABLE ]
      </div>
    </div>
  );
};

export default HeroVisual_Suspension;
