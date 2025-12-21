import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const TheArchitect: React.FC = () => {
  return (
    <section id="origins" className="w-full bg-[#FFF2EC] py-32 px-6 md:px-12 lg:px-20 relative z-30 overflow-hidden border-t border-black/5">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        
        {/* LEFT: CINEMATIC VIDEO CONTAINER */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:col-span-5 relative group"
        >
          {/* Gold Scan Frame */}
          <div className="absolute -inset-4 border border-[#C5A059]/30 pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-full h-[1px] bg-[#C5A059] animate-scan-line z-20"></div>
          
          <div className="aspect-[4/5] bg-[#1a1a1a] relative overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl">
            {/* CINEMATIC VIDEO ELEMENT */}
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
              poster="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800"
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-silhouette-of-a-man-in-the-dark-34440-large.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            
            {/* System Overlay Labels */}
            <div className="absolute bottom-6 left-6 z-20 font-mono text-[9px] text-[#FFF2EC]/60 uppercase tracking-[0.3em]">
              Architect_Identity_Verified // 2025
            </div>
            <div className="absolute top-6 right-6 z-20 text-[#C5A059]">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
        </motion.div>

        {/* RIGHT: THE MISSION */}
        <div className="lg:col-span-7">
          <motion.span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block">/ THE ARCHITECT</motion.span>
          <motion.h2 className="font-serif text-5xl md:text-7xl text-[#1a1a1a] leading-[1.1] mb-10">
            I don't hire juniors. <br />
            <span className="italic">I hire silicon.</span>
          </motion.h2>
          <div className="space-y-6 max-w-xl">
            <p className="font-sans text-lg text-[#1a1a1a]/70 border-l-2 border-[#C5A059]/40 pl-8 leading-relaxed">
              Traditional agencies are bloated with project managers. I deliver the output of a 10-person team with the surgical focus of a single mind. I replace human friction with autonomous logic.
            </p>
          </div>
          <div className="mt-12 pt-8 border-t border-black/5 flex items-center gap-6">
            <div>
              <p className="font-mono text-[10px] text-black/40 uppercase tracking-widest mb-2">Lead Architect</p>
              <p className="font-serif text-4xl text-[#C5A059]">Felipe Chaparro</p>
            </div>
            <div className="flex items-center gap-3 ml-auto px-4 py-2 border border-black/5 bg-white/50 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-[#E21E3F] animate-pulse"></div>
              <span className="font-mono text-[10px] text-[#1a1a1a] tracking-widest uppercase">System_Active</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheArchitect;