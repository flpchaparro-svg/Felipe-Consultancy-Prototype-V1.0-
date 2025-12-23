import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Activity, Terminal } from 'lucide-react';

interface GlobalFooterProps {
  onNavigate: (view: 'landing' | 'about' | 'architecture' | 'protocol' | 'evidence' | 'digital-revenue', sectionId?: string) => void;
}

const GlobalFooter: React.FC<GlobalFooterProps> = ({ onNavigate }) => {
  return (
    <footer id="footer" className="w-full bg-[#1a1a1a] text-[#FFF2EC] border-t border-white/5 relative z-30 pt-32 pb-12 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#C5A05910,_transparent_70%)] pointer-events-none"></div>
      
      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* SURGICAL TOP ROW - MINIMALIST DIRECTIVE */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-24 gap-10">
          <div className="max-w-2xl">
            <span className="font-mono text-xs text-[#E21E3F] tracking-[0.4em] mb-4 block uppercase font-bold">/ SYSTEM_IDLE</span>
            <h2 className="font-serif text-5xl md:text-7xl leading-[0.9] tracking-tighter">
              Ready to automate <br />
              <span className="italic text-white/20">your legacy?</span>
            </h2>
          </div>
          
          <div className="flex flex-col items-end gap-6 self-end">
            <motion.a 
              href="https://meetings-ap1.hubspot.com/felipe" 
              target="_blank" 
              whileHover={{ scale: 1.05 }}
              className="group relative flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.4em] text-white transition-all duration-300"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-white transition-colors" />
              <span className="border-b border-white pb-1 group-hover:pb-1.5 transition-all">
                Initiate Protocol
              </span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </motion.a>
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse"></span>
              <span className="font-mono text-[9px] text-white/20 uppercase tracking-widest">Awaiting_Command</span>
            </div>
          </div>
        </div>

        {/* MINIMAL FOOTER BAR */}
        <div className="flex flex-col md:flex-row justify-between items-end pt-12 border-t border-white/5 opacity-40">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-[9px] text-white uppercase tracking-[0.4em]">© 2025 Felipe Chaparro</span>
            <span className="font-mono text-[9px] text-white/60 uppercase tracking-[0.4em]">Engineered for Performance</span>
          </div>
          <div className="flex gap-12 font-mono text-[9px] text-white/20 uppercase tracking-[0.4em]">
              <span className="flex items-center gap-2"><Globe className="w-3 h-3"/> Sydney_UTC+11</span>
              <span className="flex items-center gap-2"><Terminal className="w-3 h-3"/> v5.4.0</span>
          </div>
          <div className="mt-8 md:mt-0">
             <a href="#" className="font-mono text-[9px] text-white hover:text-[#C5A059] transition-colors uppercase tracking-[0.5em]">[ End_Transmission ]</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;