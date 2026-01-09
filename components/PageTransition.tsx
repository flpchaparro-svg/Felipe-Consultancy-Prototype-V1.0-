
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageTransition: React.FC<{ children: React.ReactNode, currentView: string }> = ({ children }) => {
  // 1. LOGIC: Session check.
  // We use a specific key 'signature_loaded' to track this specific boot sequence.
  const [isBooting, setIsBooting] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('signature_loaded');
    }
    return true; 
  });

  useEffect(() => {
    if (isBooting) {
      // 2. TIMING: The entire sequence takes ~2.5s.
      // Line draws (1s) -> Text reveals (1s) -> Accent (0.5s) -> Exit.
      const timer = setTimeout(() => {
        setIsBooting(false);
        sessionStorage.setItem('signature_loaded', 'true');
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isBooting]);

  return (
    <div className="relative min-h-screen w-full">
      <AnimatePresence mode="wait">
        {isBooting && (
          <motion.div
            key="signature-preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-[#FFF2EC] flex items-center justify-center overflow-hidden"
          >
            {/* CONTAINER: Centers the signature block */}
            <div className="relative w-full max-w-[300px] md:max-w-[500px] flex flex-col items-center">
                
                {/* 1. TEXT REVEAL: Masked to rise from the line */}
                <div className="overflow-hidden pb-4 relative w-full text-center">
                    <motion.h1
                        initial={{ y: "110%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        transition={{ 
                            duration: 1.2, 
                            delay: 0.4, 
                            ease: [0.16, 1, 0.3, 1] // "Luxury" Ease
                        }}
                        className="font-serif text-4xl md:text-6xl text-[#1a1a1a] tracking-tight italic leading-tight"
                    >
                        Revenue Engine
                    </motion.h1>
                </div>

                {/* 2. THE RED LINE: Draws from center outwards */}
                <div className="relative w-full h-[2px]">
                    {/* Background faint line (optional structure) */}
                    <div className="absolute inset-0 bg-[#E21E3F]/10 w-full h-full" />
                    
                    {/* The Active Drawing Line */}
                    <motion.div 
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="absolute inset-0 bg-[#E21E3F] w-full h-full origin-center"
                    />
                </div>

                {/* 3. THE GOLD ACCENT: A jewel appearing at the center */}
                <motion.div 
                    initial={{ scale: 0, rotate: 45, opacity: 0 }}
                    animate={{ scale: 1, rotate: 45, opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.4, type: "spring", stiffness: 200 }}
                    className="absolute top-[calc(100%-5px)] w-2.5 h-2.5 bg-[#C5A059] border border-[#FFF2EC] z-10"
                    style={{ marginTop: '-2px' }} // Aligns nicely with the line
                />

                {/* Optional: Subtitle for context */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.6, duration: 0.8 }}
                    className="mt-6 font-mono text-[9px] uppercase tracking-[0.4em] text-[#1a1a1a]/40"
                >
                    System_Architecture
                </motion.div>

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
