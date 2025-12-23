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
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-black to-transparent opacity-50 pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* RESTORED SURGICAL TOP ROW */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 border-b border-white/10 pb-16 gap-10">
          <div className="max-w-2xl">
            <span className="font-mono text-xs text-[#E21E3F] tracking-[0.4em] mb-4 block uppercase font-bold">/ SYSTEM_IDLE</span>
            <h2 className="font-serif text-5xl md:text-7xl leading-[0.9] tracking-tighter">
              Ready to automate <br />
              <span className="italic text-white/20">your legacy?</span>
            </h2>
          </div>
          
          <div className="flex flex-col items-end gap-6">
            <a 
              href="https://meetings-ap1.hubspot.com/felipe" 
              target="_blank" 
              className="group relative flex items-center gap-6 px-12 py-6 border border-[#E21E3F] text-[#E21E3F] hover:border-[#C5A059] hover:text-[#C5A059] transition-all duration-500 font-mono text-xs uppercase tracking-[0.4em]"
            >
              Initiate Protocol 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse"></span>
              <span className="font-mono text-[9px] text-white/30 uppercase tracking-widest">Awaiting_Command</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-8">
          <div className="flex items-center gap-4">
            <div className="relative w-2 h-2">
              <div className="absolute inset-0 bg-[#E21E3F] rounded-full animate-ping opacity-75"></div>
              <div className="relative w-2 h-2 bg-[#E21E3F] rounded-full"></div>
            </div>
            <span className="font-mono text-[10px] text-[#E21E3F] tracking-[0.5em] uppercase font-bold">Transmission_End</span>
          </div>
          <div className="flex gap-12 font-mono text-[9px] text-white/20 uppercase tracking-[0.4em]">
             <span className="flex items-center gap-2"><Globe className="w-3 h-3"/> Local_Time: Sydney_UTC+11</span>
             <span className="flex items-center gap-2"><Terminal className="w-3 h-3"/> Build: v5.4.0_Stable</span>
          </div>
        </div>

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
                  <span className="font-mono text-[8px] tracking-[0.5em] uppercase">Status: Nominal</span>
               </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end pt-12 border-t border-white/5">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[9px] text-white/20 uppercase tracking-[0.4em]">© 2025 Felipe Chaparro</span>
            <span className="font-mono text-[9px] text-white/10 uppercase tracking-[0.4em]">Engineered for Performance</span>
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