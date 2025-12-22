import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Globe, Activity, Terminal } from 'lucide-react';

interface GlobalFooterProps {
  onNavigate: (view: 'landing' | 'about' | 'architecture' | 'protocol' | 'evidence' | 'digital-revenue', sectionId?: string) => void;
}

const MagneticLink: React.FC<{ children: React.ReactNode; href: string }> = ({ children, href }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Magnetic pull distance
    const pullX = (clientX - centerX) * 0.35;
    const pullY = (clientY - centerY) * 0.35;
    
    x.set(pullX);
    y.set(pullY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative z-10 block"
    >
      {children}
    </motion.a>
  );
};

const GlobalFooter: React.FC<GlobalFooterProps> = ({ onNavigate }) => {
  return (
    <footer id="footer" className="w-full bg-[#1a1a1a] text-[#FFF2EC] border-t border-white/5 relative z-30 pt-32 pb-12 px-6 md:px-12 lg:px-20 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#C5A05910,_transparent_70%)] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-black to-transparent opacity-50 pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* TRANSMISSION HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-8">
          <div className="flex items-center gap-4">
            <div className="relative w-2 h-2">
              <div className="absolute inset-0 bg-[#E21E3F] rounded-full animate-ping opacity-75"></div>
              <div className="relative w-2 h-2 bg-[#E21E3F] rounded-full"></div>
            </div>
            <span className="font-mono text-[10px] text-[#E21E3F] tracking-[0.5em] uppercase font-bold">Transmission_Terminal_End</span>
          </div>
          <div className="flex gap-12 font-mono text-[9px] text-white/20 uppercase tracking-[0.4em]">
             <span className="flex items-center gap-2"><Globe className="w-3 h-3"/> Local_Time: Sydney_UTC+11</span>
             <span className="flex items-center gap-2"><Terminal className="w-3 h-3"/> Build: v5.4.0_Stable</span>
          </div>
        </div>

        {/* MASSIVE CTA - THE MAGENTIC CENTERPIECE */}
        <div className="mb-48 flex justify-center">
          <MagneticLink href="https://meetings-ap1.hubspot.com/felipe">
            <div className="group cursor-pointer text-center relative">
              <span className="font-mono text-[11px] text-[#C5A059] tracking-[0.6em] mb-12 block uppercase opacity-60 group-hover:opacity-100 transition-opacity duration-700">
                [ Click_to_Initiate_Growth_Protocol ]
              </span>
              <h2 className="font-serif text-[10vw] md:text-[12vw] leading-[0.8] tracking-tighter transition-all duration-700 relative">
                <span className="block group-hover:italic group-hover:text-white transition-all duration-700">Initiate</span>
                <span className="block liquid-gold-text">Protocol.</span>
                
                {/* Secondary Decorative Arrow */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="absolute -right-20 top-1/2 -translate-y-1/2 hidden lg:block"
                >
                  <ArrowRight className="w-24 h-24 text-[#C5A059] group-hover:translate-x-4 transition-transform duration-700 ease-out" />
                </motion.div>
              </h2>
              
              <div className="mt-16 overflow-hidden h-px bg-white/10 w-full relative">
                <motion.div 
                  className="absolute inset-0 bg-[#C5A059] origin-left"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                />
              </div>
            </div>
          </MagneticLink>
        </div>

        {/* SECONDARY NAVIGATION */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-16 mb-32">
          <div className="space-y-10">
            <span className="font-mono text-[10px] text-white/30 tracking-[0.4em] uppercase block">/ Infrastructure</span>
            <ul className="space-y-5">
              <li>
                <button onClick={() => onNavigate('architecture')} className="group flex items-center gap-2 text-sm text-white/50 hover:text-[#C5A059] transition-all duration-300">
                  <span className="font-mono text-[9px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">01</span>
                  The Engine Map
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('protocol')} className="group flex items-center gap-2 text-sm text-white/50 hover:text-[#C5A059] transition-all duration-300">
                  <span className="font-mono text-[9px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">02</span>
                  Execution Protocol
                </button>
              </li>
            </ul>
          </div>
          <div className="space-y-10">
            <span className="font-mono text-[10px] text-white/30 tracking-[0.4em] uppercase block">/ Archive</span>
            <ul className="space-y-5">
              <li>
                <button onClick={() => onNavigate('about')} className="group flex items-center gap-2 text-sm text-white/50 hover:text-[#C5A059] transition-all duration-300">
                  <span className="font-mono text-[9px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">03</span>
                  Architect Origins
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('evidence')} className="group flex items-center gap-2 text-sm text-white/50 hover:text-[#C5A059] transition-all duration-300">
                  <span className="font-mono text-[9px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">04</span>
                  Forensic Evidence
                </button>
              </li>
            </ul>
          </div>
          <div className="space-y-10 md:col-span-2">
            <span className="font-mono text-[10px] text-white/30 tracking-[0.4em] uppercase block">/ Connectivity</span>
            <div className="flex flex-col md:flex-row gap-12">
               <div>
                  <p className="text-white/40 text-[11px] leading-relaxed max-w-xs font-sans uppercase tracking-widest mb-4">
                    Current availability for Q1 architecture deployments is restricted.
                  </p>
                  <span className="text-[#E21E3F] font-mono text-[10px] uppercase tracking-[0.2em] font-bold">1_NODE_REMAINING</span>
               </div>
               <div className="flex items-center gap-4 text-white/20">
                  <Activity className="w-8 h-8 text-[#C5A059]/40" />
                  <span className="font-mono text-[8px] tracking-[0.5em] uppercase">Status: Nominal // Sync_Active</span>
               </div>
            </div>
          </div>
        </div>

        {/* BOTTOM STRIP */}
        <div className="flex flex-col md:flex-row justify-between items-end pt-12 border-t border-white/5">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[9px] text-white/20 uppercase tracking-[0.4em]">© 2025 Felipe Chaparro // Architecture Hub</span>
            <span className="font-mono text-[9px] text-white/10 uppercase tracking-[0.4em]">All Systems Engineered for Performance</span>
          </div>
          <div className="mt-8 md:mt-0">
             <a href="#" className="font-mono text-[9px] text-white/20 hover:text-[#C5A059] transition-colors uppercase tracking-[0.5em]">[ End_Transmission ]</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default GlobalFooter;