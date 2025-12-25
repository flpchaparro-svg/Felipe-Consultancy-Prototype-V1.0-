import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { SERVICES } from '../constants';
import { ServiceDetail } from '../types';
import ViewportViz from './ViewportViz';

interface BentoGridProps {
  onServiceClick: (service: ServiceDetail) => void;
}

const TechnicalLabel: React.FC<{ active: boolean; text: string }> = ({ active, text }) => {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (active) {
      setDisplayText("");
      let i = 0;
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayText(prev => text.substring(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 40);
      return () => clearInterval(interval);
    } else {
      setDisplayText(text);
    }
  }, [active, text]);
  
  return (
    <div className={`font-mono text-[8px] uppercase tracking-[0.2em] transition-colors duration-500 h-3 ${active ? 'text-[#E21E3F]' : 'text-black/20 group-hover:text-black/70'}`}>
      {displayText}
    </div>
  );
};

const BentoGrid: React.FC<BentoGridProps> = ({ onServiceClick }) => {
  const [activeId, setActiveId] = useState<string>(SERVICES[0].id);

  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    if (!isMobile) return;

    const interval = setInterval(() => {
      setActiveId(prev => {
        const currentIndex = SERVICES.findIndex(s => s.id === prev);
        const nextIndex = (currentIndex + 1) % SERVICES.length;
        return SERVICES[nextIndex].id;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const activeService = SERVICES.find(s => s.id === activeId) || SERVICES[0];

  return (
    <section id="architecture" className="py-20 px-6 lg:px-12 bg-[#FFF2EC]">
      <div className="max-w-screen-2xl mx-auto">
        
        {/* TOP ROW: SPLIT LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-12 mb-8 h-auto lg:h-[600px]">
          
          {/* LEFT: STATIC HEADER (33%) */}
          <div className="w-full lg:w-1/3 flex flex-col justify-center lg:pr-12 z-10">
            <span className="font-mono text-xs text-[#1a1a1a] tracking-[0.4em] mb-6 block uppercase font-bold">
              <span className="text-[#E21E3F]">/</span> PROCESS ARCHITECTURE
            </span>
            <h2 className="font-serif text-5xl md:text-7xl text-[#1a1a1a] leading-[0.95] tracking-tighter mb-8">
              I Engineer The <span className="italic text-[#C5A059]">Entire System.</span>
            </h2>
            <p className="font-sans text-xl font-light text-[#1a1a1a]/70 leading-relaxed border-l border-[#E21E3F]/30 pl-6">
              I don't just build websites. I treat your business as a single, connected engine. By linking your Marketing, Sales, and Operations into one synchronised flow, I eliminate the friction that burns out your people and ensure data flows seamlessly from the first click to the final invoice.
            </p>
          </div>

          {/* RIGHT: DYNAMIC VISUALIZER (66%) */}
          <div className="w-full lg:w-2/3 relative min-h-[500px] bg-[#1a1a1a] rounded-sm shadow-2xl overflow-hidden group border border-black/20">
             <ViewportViz type={activeService.visualPrompt} />
             
             {/* VIGNETTE OVERLAY */}
             <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle,transparent_30%,rgba(0,0,0,0.8)_110%)] z-10" />
             
             {/* STATUS INDICATOR */}
             <div className="absolute top-6 left-6 flex items-center gap-3 z-20">
               <div className="w-2 h-2 rounded-full bg-[#E21E3F] animate-pulse shadow-[0_0_8px_#E21E3F]" />
               <span className="text-[10px] font-mono text-[#E21E3F] tracking-[0.3em] uppercase">Visual_Buffer_Live</span>
             </div>

             {/* ACTIVE CONTENT OVERLAY */}
             <div className="absolute bottom-0 left-0 right-0 p-10 z-20 pointer-events-none">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={activeService.id}
                   initial={{ opacity: 0, y: 15 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -15 }}
                   transition={{ duration: 0.4, ease: "easeOut" }}
                   className="max-w-2xl pointer-events-auto"
                 >
                   <p className="text-[#C5A059] text-[11px] font-mono tracking-[0.4em] uppercase font-bold mb-3">
                      Protocol_{activeService.id.toUpperCase()}
                   </p>
                   <h3 className="text-white text-4xl lg:text-5xl font-serif mb-4 leading-none tracking-tighter">
                      {activeService.title}
                   </h3>
                   <p className="text-white/60 text-lg font-serif italic font-light leading-relaxed mb-8 max-w-xl">
                     {activeService.description}
                   </p>
                   
                   <button
                     onClick={() => onServiceClick(activeService)}
                     className="group relative px-8 py-4 bg-transparent text-[#FFF2EC] border border-[#FFF2EC]/20 font-mono text-[10px] uppercase tracking-[0.3em] font-bold overflow-hidden"
                   >
                     <div className="absolute inset-0 bg-[#FFF2EC] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                     <span className="relative z-10 group-hover:text-[#1a1a1a] transition-colors duration-500">[ EXPLORE PILLAR PAGE ]</span>
                   </button>
                 </motion.div>
               </AnimatePresence>
             </div>
          </div>
          
        </div>

        {/* BOTTOM ROW: BENTO CONTROLS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map((service, idx) => {
            const isActive = activeId === service.id;
            // First item (Index 0) spans 2 columns
            const spanClass = idx === 0 ? 'lg:col-span-2' : 'col-span-1';
            
            return (
              <div 
                key={service.id}
                onMouseEnter={() => setActiveId(service.id)}
                onClick={() => onServiceClick(service)}
                className={`relative p-8 border border-black/10 transition-all duration-300 cursor-pointer min-h-[180px] flex flex-col justify-between group rounded-sm overflow-hidden ${
                  spanClass
                } ${isActive ? 'bg-white shadow-xl scale-[1.01] z-10' : 'bg-[#FFF2EC] hover:bg-white hover:border-black/20'}`}
              >
                 {/* Top Row: Label & Status */}
                 <div className="flex justify-between items-start mb-4">
                   <div className="space-y-2">
                     <span className={`text-[9px] font-mono font-bold tracking-widest block transition-opacity duration-500 ${isActive ? 'text-[#C5A059]' : 'opacity-40'}`}>
                        PILLAR 0{idx + 1}
                     </span>
                     <TechnicalLabel active={isActive} text={service.technicalLabel} />
                   </div>
                   <LucideIcons.ChevronDown className={`w-4 h-4 transition-all duration-300 ${isActive ? 'text-[#C5A059] -rotate-90' : 'text-black/10 group-hover:text-black/40'}`} />
                 </div>

                 {/* Bottom Row: Title */}
                 <div>
                   <h4 className={`text-xl lg:text-2xl font-serif uppercase tracking-tighter leading-none transition-colors duration-300 ${isActive ? 'text-[#1a1a1a]' : 'text-[#1a1a1a]/40 group-hover:text-[#1a1a1a]'}`}>
                     {service.title}
                   </h4>
                 </div>
                 
                 {/* Active Border Accent */}
                 <div className={`absolute bottom-0 left-0 h-[2px] bg-[#C5A059] transition-all duration-500 ${isActive ? 'w-full' : 'w-0'}`} />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default BentoGrid;