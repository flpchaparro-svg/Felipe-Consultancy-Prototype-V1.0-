import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowUpRight } from 'lucide-react';

const TheArchitect: React.FC = () => {
  return (
    <section id="origins" className="w-full bg-[#FFF2EC] py-32 lg:py-64 px-6 md:px-12 lg:px-20 relative z-30 overflow-hidden border-t border-black/5">
      <div className="max-w-[1400px] mx-auto relative">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative">
          
          {/* LEFT: CINEMATIC VIDEO CONTAINER (Takes up more space) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8 relative group"
          >
            {/* Flickering Gold Scan Frame */}
            <div className="absolute -inset-6 border border-[#C5A059]/20 pointer-events-none animate-flicker"></div>
            <div className="absolute top-0 left-0 w-full h-[1px] bg-[#C5A059] animate-scan-line z-20"></div>
            
            <div className="aspect-[16/10] lg:aspect-[16/9] bg-[#1a1a1a] relative overflow-hidden grayscale group-hover:grayscale-[0.5] transition-all duration-1000 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)]">
              {/* CINEMATIC VIDEO */}
              <video 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-1000"
                poster="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-silhouette-of-a-man-in-the-dark-34440-large.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              {/* Technical Labels */}
              <div className="absolute bottom-10 left-10 z-20 font-mono text-[8px] text-[#FFF2EC]/40 uppercase tracking-[0.4em]">
                ARCH_ID: 0xFC_2025 // STATUS: ACTIVE_NODE
              </div>
              <div className="absolute top-10 right-10 z-20 text-[#C5A059]/40 group-hover:text-[#C5A059] transition-colors duration-700">
                <ShieldCheck className="w-8 h-8 stroke-[1]" />
              </div>
            </div>
          </motion.div>

          {/* OVERLAPPING MISSION TEXT: Editorial Mix-Blend Aesthetic */}
          <div className="lg:col-span-6 lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 z-30 pointer-events-none">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 lg:mt-0 p-8 lg:p-16 bg-transparent mix-blend-difference text-white"
            >
              <span className="font-mono text-[10px] text-[#C5A059] tracking-[0.5em] mb-8 block uppercase font-bold">/ THE_ARCHITECT_LOG</span>
              <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.85] mb-12 tracking-tighter">
                I don't hire juniors. <br />
                <span className="italic text-white/40">I hire silicon.</span>
              </h2>
              <div className="space-y-8 max-w-xl pointer-events-auto">
                <p className="font-sans text-lg lg:text-xl font-light text-white/60 border-l border-[#C5A059]/40 pl-8 leading-relaxed">
                  Traditional agencies are bloated with communication layers. I deliver the output of a 10-person unit with the surgical focus of a single mind. I replace human friction with autonomous logic.
                </p>
                
                <div className="pt-12 flex items-center gap-10">
                  <div className="space-y-1">
                    <p className="font-mono text-[9px] text-white/30 uppercase tracking-[0.3em]">Lead Architect</p>
                    <p className="font-serif text-4xl text-[#C5A059]">Felipe Chaparro</p>
                  </div>
                  <a 
                    href="https://meetings-ap1.hubspot.com/felipe" 
                    target="_blank"
                    className="flex items-center justify-center w-16 h-16 rounded-full border border-white/20 hover:border-[#C5A059] transition-all duration-500 group/link"
                  >
                    <ArrowUpRight className="w-6 h-6 text-white group-hover/link:text-[#C5A059] transition-colors" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* BOTTOM METRIC STRIP (Subtle) */}
        <div className="mt-32 pt-10 border-t border-black/5 flex flex-wrap justify-between items-center gap-8 opacity-40">
          <div className="flex gap-12 font-mono text-[9px] uppercase tracking-[0.4em]">
            <span>[ LATENCY: 2ms ]</span>
            <span>[ THROUGHPUT: 1.4PB/S ]</span>
            <span>[ UPTIME: 99.99% ]</span>
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.4em] text-[#A31D33]">
            CRITICAL_PATH_LOCKED
          </div>
        </div>
      </div>
    </section>
  );
};

export default TheArchitect;