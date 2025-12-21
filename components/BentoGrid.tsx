
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { SERVICES } from '../constants';
import { ServiceDetail } from '../types';
import ViewportViz from './ViewportViz';

interface BentoGridProps {
  onServiceClick: (service: ServiceDetail) => void;
}

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

  const bottomRowServices = [
    SERVICES[6], // 07 // Control Tower
    SERVICES[5], // 06 // Team Protocols
    SERVICES[4], // 05 // Media Logistics
    SERVICES[3], // 04 // Augmented Workforce
  ];

  return (
    <section id="architecture" className="relative h-screen max-h-[900px] min-h-[850px] py-12 px-6 lg:px-12 bg-[#FFF2EC] overflow-hidden flex flex-col content-layer">
      <div className="max-w-screen-2xl mx-auto w-full h-full flex flex-col">
        <div className="flex justify-between items-end mb-8 shrink-0">
          <div>
            <span className="text-[#E21E3F] text-[10px] font-mono tracking-[0.5em] font-bold mb-2 block uppercase">Architecture_Protocol_v5.4</span>
            <h2 className="text-4xl lg:text-7xl font-serif text-[#1a1a1a] leading-none">
              The Revenue <span className="italic">Engine.</span>
            </h2>
          </div>
          <div className="hidden lg:block text-right">
            <span className="text-[#1a1a1a]/40 text-[9px] font-mono tracking-widest uppercase block">Sensor_Array:</span>
            <span className="text-[#1a1a1a] text-xs font-bold font-mono uppercase">LIVE // SYNC_ACTIVE</span>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-12 grid-rows-6 gap-4 overflow-hidden">
          <div className="col-span-12 lg:col-span-8 row-span-4 relative border border-black/10 overflow-hidden bg-[#1a1a1a] shadow-2xl">
            <ViewportViz type={activeService.visualPrompt} />
            
            <div className="absolute top-6 left-6 flex items-center gap-3 z-20">
              <div className="w-2 h-2 rounded-full bg-[#E21E3F] animate-pulse" />
              <span className="text-[10px] font-mono text-white/40 tracking-[0.3em] uppercase">Architecture_Output_Buffer</span>
            </div>
            
            <div className="absolute bottom-10 left-10 right-10 z-20 pointer-events-none">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="max-w-xl"
                >
                  <p className="text-[#E21E3F] text-[11px] font-mono tracking-[0.4em] uppercase font-bold mb-2">Protocol_{activeService.id.toUpperCase()}</p>
                  <h3 className="text-white text-4xl lg:text-6xl font-serif mb-4 leading-none">{activeService.title}</h3>
                  <p className="text-white/60 text-lg lg:text-xl font-serif italic font-light leading-relaxed">
                    {activeService.description.split('.')[0]}.
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 row-span-4 grid grid-rows-3 gap-4">
            {SERVICES.slice(0, 3).map((service, idx) => {
              const isActive = activeId === service.id;
              return (
                <motion.div 
                  key={service.id}
                  onMouseEnter={() => setActiveId(service.id)}
                  onClick={() => onServiceClick(service)}
                  className={`group border border-black/10 p-6 cursor-pointer transition-all duration-500 interactive-bento flex flex-col justify-between overflow-hidden relative ${isActive ? 'bg-white shadow-xl' : 'bg-white/60 hover:bg-white'}`}
                >
                  <div className="flex justify-between items-start z-10">
                    <span className={`text-[11px] font-mono font-bold tracking-widest ${isActive ? 'text-[#C5A059]' : 'opacity-30'}`}>0{idx + 1}</span>
                    <motion.div 
                      animate={isActive ? { y: [0, 6, 0] } : {}}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <LucideIcons.ChevronDown className={`w-5 h-5 transition-opacity duration-300 ${isActive ? 'text-[#C5A059] opacity-100' : 'text-black opacity-10 group-hover:opacity-60'}`} />
                    </motion.div>
                  </div>
                  <div className="z-10">
                    <h4 className="text-2xl font-serif uppercase tracking-tight leading-tight mb-2">{service.title}</h4>
                    <div className={`text-[9px] font-mono font-bold uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 ${isActive ? 'text-[#C5A059] opacity-100' : 'text-[#C5A059] opacity-0 group-hover:opacity-100'}`}>
                      [ OPEN PROTOCOL ] <LucideIcons.ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="col-span-12 row-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {bottomRowServices.map((service) => {
              const isActive = activeId === service.id;
              const labelMap: Record<string, string> = {
                'control-tower': '07',
                'team-protocols': '06',
                'media-logistics': '05',
                'augmented-workforce': '04'
              };
              const displayLabel = labelMap[service.id];
              const isNoArrow = service.id === 'control-tower';

              return (
                <motion.div 
                  key={service.id}
                  onMouseEnter={() => setActiveId(service.id)}
                  onClick={() => onServiceClick(service)}
                  className={`group border border-black/10 p-6 cursor-pointer transition-all duration-500 interactive-bento flex flex-col justify-between overflow-hidden relative ${isActive ? 'bg-white shadow-xl' : 'bg-white/60 hover:bg-white'}`}
                >
                  <div className="flex justify-between items-start z-10">
                    <span className={`text-[11px] font-mono font-bold tracking-widest ${isActive ? 'text-[#C5A059]' : 'opacity-30'}`}>{displayLabel}</span>
                    {!isNoArrow && (
                      <motion.div 
                        animate={isActive ? { x: [0, -6, 0] } : {}}
                        transition={{ repeat: Infinity, duration: 2 }}
                      >
                        <LucideIcons.ChevronLeft className={`w-5 h-5 transition-opacity duration-300 ${isActive ? 'text-[#C5A059] opacity-100' : 'text-black opacity-10 group-hover:opacity-60'}`} />
                      </motion.div>
                    )}
                  </div>
                  <div className="z-10">
                    <h4 className="text-xl font-serif uppercase tracking-tight leading-tight mb-2">{service.title}</h4>
                    <div className={`text-[9px] font-mono font-bold uppercase tracking-[0.2em] transition-all duration-300 ${isActive ? 'text-[#C5A059] opacity-100 translate-x-1' : 'text-[#C5A059] opacity-0 group-hover:opacity-100'}`}>
                      [ SPECS ]
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
