
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { SERVICES, COLORS } from '../constants';
import { ServiceDetail } from '../types';
import ViewportViz from './ViewportViz';

interface BentoGridProps {
  onServiceClick: (service: ServiceDetail) => void;
}

const BentoGrid: React.FC<BentoGridProps> = ({ onServiceClick }) => {
  const [activeId, setActiveId] = useState<string>(SERVICES[0].id);

  const activeService = SERVICES.find(s => s.id === activeId) || SERVICES[0];

  return (
    <section id="services" className="relative h-screen max-h-[1000px] min-h-[750px] py-12 px-6 lg:px-12 bg-[#FFF2EC] overflow-hidden flex flex-col">
      <div className="max-w-screen-2xl mx-auto w-full h-full flex flex-col">
        {/* Header Area */}
        <div className="flex justify-between items-end mb-8 shrink-0">
          <div>
            <span className="text-[#E21E3F] text-[10px] font-mono tracking-[0.5em] font-bold mb-2 block uppercase">Architecture_Protocol_v4</span>
            <h2 className="text-5xl lg:text-7xl font-serif text-[#1a1a1a] leading-none">
              The Revenue <span className="italic">Engine.</span>
            </h2>
          </div>
          <div className="hidden lg:block text-right">
            <span className="text-[#1a1a1a]/40 text-[10px] font-mono tracking-widest uppercase block">Active_Module:</span>
            <span className="text-[#1a1a1a] text-xs font-bold font-mono uppercase">{activeService.id.replace('-', '_')}</span>
          </div>
        </div>

        {/* Bento Layout */}
        <div className="flex-1 grid grid-cols-12 grid-rows-4 gap-4 overflow-hidden">
          
          {/* PILLAR 1: THE VIEWPORT (Main Terminal) */}
          <div className="col-span-12 lg:col-span-7 row-span-3 relative border border-black/10 overflow-hidden group">
            <ViewportViz type={activeService.visualPrompt} />
            <div className="absolute top-4 left-4 flex items-center gap-2 z-20">
              <div className="w-1.5 h-1.5 rounded-full bg-[#E21E3F] animate-pulse" />
              <span className="text-[9px] font-mono text-white/50 tracking-widest">LIVE_VISUALIZATION_STREAM</span>
            </div>
            <div className="absolute bottom-6 left-6 right-6 z-20 pointer-events-none">
              <h3 className="text-white text-4xl lg:text-5xl font-serif mb-2">{activeService.title}</h3>
              <p className="text-white/40 text-[10px] font-mono tracking-[0.3em] uppercase">{activeService.subtitle}</p>
            </div>
          </div>

          {/* PILLAR 2: CRM INTELLIGENCE */}
          <motion.div 
            onMouseEnter={() => setActiveId('crm-intelligence')}
            onClick={() => onServiceClick(SERVICES[1])}
            className={`col-span-12 lg:col-span-5 row-span-1 border border-black/10 p-6 cursor-pointer transition-all duration-500 interactive-bento flex flex-col justify-between ${activeId === 'crm-intelligence' ? 'bg-[#1a1a1a] text-[#FFF2EC]' : 'bg-white hover:border-[#E21E3F]'}`}
          >
            <div className="flex justify-between items-start">
              <LucideIcons.Database className={`w-5 h-5 ${activeId === 'crm-intelligence' ? 'text-[#E21E3F]' : 'text-black'}`} />
              <span className="text-[9px] font-mono opacity-40">01</span>
            </div>
            <h4 className="text-xl font-serif uppercase tracking-tight">CRM Intelligence</h4>
          </motion.div>

          {/* PILLAR 3: AUTOMATION */}
          <motion.div 
            onMouseEnter={() => setActiveId('automation')}
            onClick={() => onServiceClick(SERVICES[2])}
            className={`col-span-12 lg:col-span-5 row-span-1 border border-black/10 p-6 cursor-pointer transition-all duration-500 interactive-bento flex flex-col justify-between ${activeId === 'automation' ? 'bg-[#1a1a1a] text-[#FFF2EC]' : 'bg-white hover:border-[#E21E3F]'}`}
          >
            <div className="flex justify-between items-start">
              <LucideIcons.Zap className={`w-5 h-5 ${activeId === 'automation' ? 'text-[#E21E3F]' : 'text-black'}`} />
              <span className="text-[9px] font-mono opacity-40">02</span>
            </div>
            <h4 className="text-xl font-serif uppercase tracking-tight">Automation</h4>
          </motion.div>

          {/* PILLAR 4: AI AGENTS */}
          <motion.div 
            onMouseEnter={() => setActiveId('ai-agents')}
            onClick={() => onServiceClick(SERVICES[3])}
            className={`col-span-12 lg:col-span-5 row-span-1 border border-black/10 p-6 cursor-pointer transition-all duration-500 interactive-bento flex flex-col justify-between ${activeId === 'ai-agents' ? 'bg-[#1a1a1a] text-[#FFF2EC]' : 'bg-white hover:border-[#E21E3F]'}`}
          >
            <div className="flex justify-between items-start">
              <LucideIcons.Cpu className={`w-5 h-5 ${activeId === 'ai-agents' ? 'text-[#E21E3F]' : 'text-black'}`} />
              <span className="text-[9px] font-mono opacity-40">03</span>
            </div>
            <h4 className="text-xl font-serif uppercase tracking-tight">AI Agents</h4>
          </motion.div>

          {/* PILLAR 5: CONTENT SUPPLY CHAIN */}
          <motion.div 
            onMouseEnter={() => setActiveId('content-supply')}
            onClick={() => onServiceClick(SERVICES[4])}
            className={`col-span-6 lg:col-span-3 row-span-1 border border-black/10 p-6 cursor-pointer transition-all duration-500 interactive-bento flex flex-col justify-between ${activeId === 'content-supply' ? 'bg-[#1a1a1a] text-[#FFF2EC]' : 'bg-white hover:border-[#E21E3F]'}`}
          >
            <div className="flex justify-between items-start">
              <LucideIcons.Layers className={`w-5 h-5 ${activeId === 'content-supply' ? 'text-[#E21E3F]' : 'text-black'}`} />
              <span className="text-[9px] font-mono opacity-40">04</span>
            </div>
            <h4 className="text-lg font-serif uppercase tracking-tight leading-none">Content Supply Chain</h4>
          </motion.div>

          {/* PILLAR 6: BEHAVIORAL ENGINEERING */}
          <motion.div 
            onMouseEnter={() => setActiveId('behavioral-eng')}
            onClick={() => onServiceClick(SERVICES[5])}
            className={`col-span-6 lg:col-span-4 row-span-1 border border-black/10 p-6 cursor-pointer transition-all duration-500 interactive-bento flex flex-col justify-between ${activeId === 'behavioral-eng' ? 'bg-[#1a1a1a] text-[#FFF2EC]' : 'bg-white hover:border-[#E21E3F]'}`}
          >
            <div className="flex justify-between items-start">
              <LucideIcons.Users className={`w-5 h-5 ${activeId === 'behavioral-eng' ? 'text-[#E21E3F]' : 'text-black'}`} />
              <span className="text-[9px] font-mono opacity-40">05</span>
            </div>
            <h4 className="text-lg font-serif uppercase tracking-tight leading-none">Behavioral Engineering</h4>
          </motion.div>

          {/* PILLAR 7: BUSINESS INTELLIGENCE */}
          <motion.div 
            onMouseEnter={() => setActiveId('biz-intel')}
            onClick={() => onServiceClick(SERVICES[6])}
            className={`col-span-12 lg:col-span-5 row-span-1 border border-black/10 p-6 cursor-pointer transition-all duration-500 interactive-bento flex flex-col justify-between ${activeId === 'biz-intel' ? 'bg-[#1a1a1a] text-[#FFF2EC]' : 'bg-white hover:border-[#E21E3F]'}`}
          >
            <div className="flex justify-between items-start">
              <LucideIcons.BarChart3 className={`w-5 h-5 ${activeId === 'biz-intel' ? 'text-[#E21E3F]' : 'text-black'}`} />
              <span className="text-[9px] font-mono opacity-40">06</span>
            </div>
            <h4 className="text-lg font-serif uppercase tracking-tight leading-none">Business Intelligence</h4>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BentoGrid;
