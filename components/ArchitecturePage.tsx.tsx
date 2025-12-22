import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, Zap, BarChart3, ShieldCheck, Cpu, Database, Share2 } from 'lucide-react';

interface ArchitecturePageProps {
  onBack: () => void;
}

const ArchitecturePage: React.FC<ArchitecturePageProps> = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] pt-32 pb-20 px-6 md:px-12 lg:px-20 relative z-[150] overflow-x-hidden"
    >
      <div className="max-w-[1400px] mx-auto">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-24">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            / Return_to_Engine
          </button>
        </div>

        {/* BIG LETTERS HERO */}
        <div className="relative mb-64">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 0.03 }}
            className="absolute -top-20 -left-20 pointer-events-none select-none"
          >
            <h1 className="font-serif text-[20vw] leading-none uppercase tracking-tighter">ENGINE</h1>
          </motion.div>
          
          <div className="relative z-10">
            <span className="font-mono text-xs text-[#E21E3F] tracking-[0.5em] mb-8 block uppercase">
              System_Architecture_Overview
            </span>
            <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.85] tracking-tight max-w-5xl">
              Architecture for <br />
              <span className="italic text-[#C5A059]">Profit Velocity.</span>
            </h2>
            <p className="font-sans text-xl text-[#1a1a1a]/60 mt-12 max-w-2xl leading-relaxed">
              I don't install software. I engineer ecosystems where every pixel serves the CRM and every line of code serves the P&L.
            </p>
          </div>
        </div>

        {/* SYSTEM 1: DEMAND CAPTURE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-64 border-t border-black/10 pt-20">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 text-[#E21E3F] mb-6">
              <Target className="w-8 h-8" />
              <span className="font-mono text-xs uppercase tracking-widest font-bold">Phase 01 // Acquisition</span>
            </div>
            <h3 className="font-serif text-5xl md:text-6xl mb-8 leading-tight">The Capture <br/><span className="italic">Velocity.</span></h3>
            <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed mb-8">
              Stopping "Revenue Leakage" by aligning your digital face with your sales brain. We turn passive traffic into captured intent.
            </p>
            <div className="space-y-4">
              {['Digital Revenue Architecture (Web)', 'CRM Capture Core', 'Media Logistics (SEO/Content)'].map((item) => (
                <div key={item} className="flex items-center gap-4 py-4 border-b border-black/5 group cursor-pointer hover:pl-4 transition-all">
                  <span className="font-mono text-[10px] text-black/30">PILLAR</span>
                  <span className="font-serif text-xl group-hover:text-[#C5A059] transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 bg-[#1a1a1a] p-12 flex items-center justify-center relative overflow-hidden grayscale">
             <div className="absolute inset-0 opacity-10">
                <Target className="w-[100%] h-[100%] scale-150 rotate-12" />
             </div>
             <div className="relative z-10 text-center">
                <p className="font-mono text-[10px] text-[#C5A059] uppercase tracking-[0.4em] mb-4">Strategic Outcome</p>
                <p className="font-serif text-4xl text-white italic">"Never miss a $10k lead again."</p>
             </div>
          </div>
        </div>

        {/* SYSTEM 2: OPERATIONAL MUSCLE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-64 border-t border-black/10 pt-20">
          <div className="lg:col-span-7 bg-[#C5A059] p-12 flex items-center justify-center order-2 lg:order-1 relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 text-black">
                <Cpu className="w-[100%] h-[100%] scale-150 -rotate-12" />
             </div>
             <div className="relative z-10 text-center text-[#1a1a1a]">
                <p className="font-mono text-[10px] uppercase tracking-[0.4em] mb-4">Strategic Outcome</p>
                <p className="font-serif text-4xl italic">"Decouple revenue from headcount."</p>
             </div>
          </div>
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="flex items-center gap-4 text-[#E21E3F] mb-6">
              <Zap className="w-8 h-8" />
              <span className="font-mono text-xs uppercase tracking-widest font-bold">Phase 02 // Productivity</span>
            </div>
            <h3 className="font-serif text-5xl md:text-6xl mb-8 leading-tight">The Operational <br/><span className="italic">Muscle.</span></h3>
            <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed mb-8">
              Converting manual admin into "Digital Labor." We build the automations and AI agents that allow your business to breathe.
            </p>
            <div className="space-y-4">
              {['Automation Service Architecture', 'Cognitive Infrastructure (AI)', 'Adoption Architecture'].map((item) => (
                <div key={item} className="flex items-center gap-4 py-4 border-b border-black/5 group cursor-pointer hover:pl-4 transition-all">
                  <span className="font-mono text-[10px] text-black/30">PILLAR</span>
                  <span className="font-serif text-xl group-hover:text-[#C5A059] transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SYSTEM 3: COMMAND CENTER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-40 border-t border-black/10 pt-20">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4 text-[#E21E3F] mb-6">
              <BarChart3 className="w-8 h-8" />
              <span className="font-mono text-xs uppercase tracking-widest font-bold">Phase 03 // Scale</span>
            </div>
            <h3 className="font-serif text-5xl md:text-6xl mb-8 leading-tight">The Command <br/><span className="italic">Center.</span></h3>
            <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed mb-8">
              Transforming fragmented data into executive navigation. We move you from "Gut-Feeling" to Evidence-Based growth.
            </p>
            <div className="space-y-4">
              {['Intelligence Services (Control Tower)', 'Predictive Forecasting', 'Conversion Labs (CRO)'].map((item) => (
                <div key={item} className="flex items-center gap-4 py-4 border-b border-black/5 group cursor-pointer hover:pl-4 transition-all">
                  <span className="font-mono text-[10px] text-black/30">PILLAR</span>
                  <span className="font-serif text-xl group-hover:text-[#C5A059] transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-7 bg-[#1a1a1a] p-12 flex items-center justify-center relative overflow-hidden grayscale">
             <div className="absolute inset-0 opacity-10">
                <BarChart3 className="w-[100%] h-[100%] scale-150 rotate-6" />
             </div>
             <div className="relative z-10 text-center">
                <p className="font-mono text-[10px] text-[#C5A059] uppercase tracking-[0.4em] mb-4">Strategic Outcome</p>
                <p className="font-serif text-4xl text-white italic">"Scale with empirical certainty."</p>
             </div>
          </div>
        </div>

        {/* FINAL CTA LOGIC */}
        <div className="mt-40 pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="font-serif text-3xl">Ready to map your engine?</div>
          <a 
            href="https://meetings-ap1.hubspot.com/felipe" 
            target="_blank"
            className="px-12 py-6 bg-black text-[#FFF2EC] font-mono text-xs uppercase tracking-widest hover:bg-[#C5A059] transition-colors"
          >
            Initiate Architecture Audit
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ArchitecturePage;