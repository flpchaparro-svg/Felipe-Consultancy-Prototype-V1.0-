import React from 'react';
import { ArrowRight } from 'lucide-react';

interface GlobalFooterProps {
  onNavigate: (view: 'landing' | 'about' | 'architecture' | 'digital-revenue', sectionId?: string) => void;
}

const GlobalFooter: React.FC<GlobalFooterProps> = ({ onNavigate }) => {
  return (
    <footer id="footer" className="w-full bg-[#1a1a1a] text-[#FFF2EC] border-t border-white/10 relative z-30 pt-32 pb-12 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff05,_transparent)] pointer-events-none"></div>
      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-20 mb-20">
          <div className="max-w-2xl">
            <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block uppercase">/ TRANSMISSION_END</span>
            <h2 className="font-serif text-5xl md:text-8xl leading-[0.85] mb-8">Are we a<br /><span className="italic text-white/40">match?</span></h2>
            <div className="flex items-center gap-4 mt-8">
              <div className="relative w-2 h-2">
                <div className="absolute inset-0 bg-[#E21E3F] rounded-full animate-ping opacity-75"></div>
                <div className="relative w-2 h-2 bg-[#E21E3F] rounded-full"></div>
              </div>
              <span className="font-mono text-[10px] text-[#E21E3F] tracking-[0.2em] uppercase">STATUS: 1 SLOT AVAILABLE</span>
            </div>
          </div>
          <div className="mt-16 md:mt-0">
            <a href="https://meetings-ap1.hubspot.com/felipe" target="_blank" className="group flex flex-col items-start gap-1">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-white/40 group-hover:text-[#C5A059] transition-colors duration-300">01</span>
                <span className="text-2xl md:text-3xl font-sans font-light border-b border-white/20 pb-1 group-hover:border-[#C5A059] group-hover:text-white transition-all duration-300">Initiate Growth Protocol</span>
                <ArrowRight className="w-6 h-6 text-white/40 group-hover:text-[#C5A059] group-hover:translate-x-2 transition-all duration-300" />
              </div>
              <span className="text-[10px] font-mono text-white/30 tracking-widest pl-8 group-hover:text-white/60 transition-colors">[ Direct Strategy Call with Felipe ]</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
          <div>
            <span className="font-mono text-[10px] text-white/30 mb-8 block tracking-widest">/ INDEX</span>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => onNavigate('landing')}
                  className="group flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#C5A059]">&gt;</span> 
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')}
                  className="group flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#C5A059]">&gt;</span> 
                  Origins
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('architecture')}
                  className="group flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#C5A059]">&gt;</span> 
                  Architecture
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('digital-revenue')}
                  className="group flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
                >
                  <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#C5A059]">&gt;</span> 
                  Web_Engines
                </button>
              </li>
            </ul>
          </div>
          <div>
            <span className="font-mono text-[10px] text-white/30 mb-8 block tracking-widest">/ LEGAL</span>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          <div className="md:col-span-1 flex flex-col justify-between h-full">
            <div className="mb-6">
              <span className="font-mono text-[10px] text-white/30 mb-2 block tracking-widest">/ SERVER_LOCATION</span>
              <p className="text-sm text-white/80">Sydney, Australia</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end pt-10 border-t border-white/10 text-[10px] font-mono text-white/30 uppercase tracking-widest">
          <span>© 2025 Felipe Chaparro. All Systems Nominal.</span>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>LATENCY: 8ms</span>
            <span>BUILD: v4.2.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default GlobalFooter;