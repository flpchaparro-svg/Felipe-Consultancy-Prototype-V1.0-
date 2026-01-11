
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageTransition: React.FC<{ children: React.ReactNode, currentView: string }> = ({ children }) => {
  // 1. LOGIC: Strict Session Check
  // We use a lazy initializer to prevent hydration mismatch and ensure instant access for returning users.
  const [isBooting, setIsBooting] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('ignition_loaded');
    }
    return true; 
  });

  useEffect(() => {
    if (isBooting) {
      // 2. TIMING: Total sequence is approx 2.8s.
      // Drop (0.8) + Expand (0.4) + Read Time (1.0) + Exit (0.6)
      const timer = setTimeout(() => {
        setIsBooting(false);
        sessionStorage.setItem('ignition_loaded', 'true');
      }, 2800);

      return () => clearTimeout(timer);
    }
  }, [isBooting]);

  return (
    <div className="relative min-h-screen w-full bg-[#FFF2EC]">
      <AnimatePresence mode="wait">
        {isBooting && (
          <motion.div
            key="ignition-preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-[9999] bg-[#FFF2EC] flex flex-col items-center justify-center overflow-hidden cursor-wait"
          >
            
            {/* CONTAINER: The Vertical Split Stack */}
            <div className="relative flex flex-col items-center justify-center">

                {/* --- PHASE 3A: UPPER REVEAL (Logo) --- */}
                {/* Overflow hidden masks the element coming from 'below' the line */}
                <div className="h-24 w-64 overflow-hidden flex flex-col justify-end items-center pb-6">
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        transition={{ 
                            delay: 0.9, // Start just after impact
                            duration: 0.8, 
                            ease: [0.22, 1, 0.36, 1] // Custom Cubic Bezier for smooth mechanical stop
                        }}
                    >
                        <div className="bg-[#1a1a1a] text-[#FFF2EC] font-mono text-xs font-bold px-3 py-1.5 shadow-xl">
                            [FC)
                        </div>
                    </motion.div>
                </div>

                {/* --- PHASE 1 & 2: THE IGNITION POINT --- */}
                <div className="relative w-[300px] h-[2px] flex items-center justify-center">
                    
                    {/* The Falling Gold Dot (Gravity) */}
                    <motion.div 
                        initial={{ y: -400, opacity: 1 }}
                        animate={{ y: 0, opacity: 0 }} // Vanishes on impact
                        transition={{ 
                            duration: 0.8, 
                            ease: "easeIn", // Heavy gravity feel
                            opacity: { delay: 0.79, duration: 0.01 } // Instant vanish at end
                        }}
                        className="absolute w-1.5 h-1.5 bg-[#C5A059] rounded-full z-20"
                    />

                    {/* The Red Shockwave Line (Elastic Expansion) */}
                    <motion.div 
                        initial={{ width: 0, opacity: 1 }}
                        animate={{ width: "240px", opacity: 1 }}
                        transition={{ 
                            delay: 0.8, // Wait for dot to hit
                            duration: 1.2, 
                            type: "spring", 
                            bounce: 0.3, // Elastic rebound
                            stiffness: 120 
                        }}
                        className="h-[1px] bg-[#E21E3F] relative z-10"
                    />
                </div>

                {/* --- PHASE 3B: LOWER REVEAL (Title) --- */}
                {/* Overflow hidden masks the element coming from 'above' the line */}
                <div className="h-40 w-full overflow-hidden flex flex-col justify-start items-center pt-6">
                    <motion.div
                        initial={{ y: "-150%" }}
                        animate={{ y: "0%" }}
                        transition={{ 
                            delay: 1.0, // Slight lag after Logo for "Domino" effect
                            duration: 0.8, 
                            ease: [0.22, 1, 0.36, 1] 
                        }}
                        className="text-center"
                    >
                        <h1 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] italic tracking-tight mb-3">
                            Revenue Engine
                        </h1>
                        
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.6, duration: 0.6 }}
                            className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#E21E3F] font-bold"
                        >
                            Sydney Business Automation
                        </motion.div>
                    </motion.div>
                </div>

            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* REAL APP CONTENT */}
      <div className="relative z-0">{children}</div>
    </div>
  );
};

export default PageTransition;
