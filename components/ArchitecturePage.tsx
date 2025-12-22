import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, Zap, BarChart3, ShieldCheck, Activity, ArrowRight } from 'lucide-react';

interface ArchitecturePageProps {
  onBack: () => void;
}

const ArchitecturePage: React.FC<ArchitecturePageProps> = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="relative min-h-screen w-full bg-[#FFF2EC] text-[#1a1a1a] pt-32 pb-20 px-6 md:px-12 lg:px-20 z-10"
    >
      <div className="max-w-[1400px] mx-auto relative z-20">
        
        {/* BREADCRUMB - MATCHES HOME PAGE STYLE */}
        <div className="flex items-center gap-6 mb-16 overflow-hidden">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            [ RETURN_HOME )
          </button>
          <span className="h-[1px] w-12 bg-black/20"></span>
          <span className="font-mono text-[10px] text-black/40 uppercase tracking-widest">System_Architecture_v4.0</span>
        </div>

        {/* HERO HEADER - MATCHES HOME PAGE HERO SIZING */}
        <div className="mb-32">
          <span className="font-mono text-xs text-[#E21E3F] tracking-[0.4em] mb-8 block uppercase">/ THE_MACHINE</span>
          <h1 className="font-serif text-5xl md:text-8xl lg:text-[7rem] leading-[0.95] tracking-tighter text-[#1a1a1a] mb-10 max-w-5xl">
            Systems Built for <br />
            <span className="text-[#C5A059] italic">Profit Velocity.</span>
          </h1>
          <p className="font-sans text-lg font-normal text-[#1a1a1a]/70 leading-relaxed max-w-2xl border-l border-black/20 pl-6">
            I don't install software. I engineer ecosystems where every pixel serves the CRM and every line of code serves the P&L. Direct architectural implementation.
          </p>
        </div>

        {/* OUTCOME SYSTEM 01: ACQUISITION */}
        <section className="py-24 border-t border-black/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 text-[#E21E3F] mb-6">
                <Target className="w-6 h-6" />
                <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Phase 01 // Acquisition</span>
              </div>
              <h2 className="font-serif text-4xl md:text-6xl mb-8 leading-tight">Demand Capture <br/><span className="italic text-black/40">Infrastructure.</span></h2>
              <p className="font-sans text-base text-[#1a1a1a]/70 leading-relaxed mb-12">
                Stopping "Revenue Leakage" by aligning your digital face with your sales brain. We turn passive traffic into captured intent.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { pillar: "01", name: "Digital Revenue Architecture", desc: "Lead-gen machines built for speed." },
                { pillar: "02", name: "CRM Capture Core", desc: "The Central Nervous System for data." },
                { pillar: "05", name: "Media Logistics", desc: "Manufacturing omnipresence for experts." }
              ].map((item) => (
                <div key={item.pillar} className="group p-8 border border-black/10 hover:bg-white hover:border-[#C5A059] transition-all duration-500">
                  <span className="font-mono text-[9px] text-[#C5A059] block mb-4">PILLAR_{item.pillar}</span>
                  <h3 className="font-serif text-2xl mb-3">{item.name}</h3>
                  <p className="font-sans text-xs text-black/50 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OUTCOME SYSTEM 02: PRODUCTIVITY */}
        <section className="py-24 border-t border-black/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 text-[#E21E3F] mb-6">
                <Zap className="w-6 h-6" />
                <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Phase 02 // Productivity</span>
              </div>
              <h2 className="font-serif text-4xl md:text-6xl mb-8 leading-tight">Operational <br/><span className="italic text-black/40">Muscle.</span></h2>
              <p className="font-sans text-base text-[#1a1a1a]/70 leading-relaxed mb-12">
                Converting manual busywork into "Digital Labor." We build the automations and AI agents that allow your business to breathe.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { pillar: "03", name: "Automation Architecture", desc: "Robots do the admin; humans do the strategy." },
                { pillar: "04", name: "Cognitive Infrastructure", desc: "Agentic AI that reasons and makes decisions." },
                { pillar: "06", name: "Adoption Architecture", desc: "Behavioral engineering to ensure usage." }
              ].map((item) => (
                <div key={item.pillar} className="group p-8 border border-black/10 hover:bg-white hover:border-[#C5A059] transition-all duration-500">
                  <span className="font-mono text-[9px] text-[#C5A059] block mb-4">PILLAR_{item.pillar}</span>
                  <h3 className="font-serif text-2xl mb-3">{item.name}</h3>
                  <p className="font-sans text-xs text-black/50 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OUTCOME SYSTEM 03: SCALE */}
        <section className="py-24 border-t border-black/10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-4 text-[#E21E3F] mb-6">
                <BarChart3 className="w-6 h-6" />
                <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Phase 03 // Scale</span>
              </div>
              <h2 className="font-serif text-4xl md:text-6xl mb-8 leading-tight">The Command <br/><span className="italic text-black/40">Center.</span></h2>
              <p className="font-sans text-base text-[#1a1a1a]/70 leading-relaxed mb-12">
                Transforming fragmented data into executive navigation. We move you from "Gut-Feeling" to Evidence-Based growth.
              </p>
            </div>
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { pillar: "07", name: "Intelligence Services", desc: "Fractional C-suite advisory via data." },
                { pillar: "08", name: "Conversion Labs", desc: "Qualitative analysis of user friction." }
              ].map((item) => (
                <div key={item.pillar} className="group p-8 border border-black/10 hover:bg-white hover:border-[#C5A059] transition-all duration-500">
                  <span className="font-mono text-[9px] text-[#C5A059] block mb-4">PILLAR_{item.pillar}</span>
                  <h3 className="font-serif text-2xl mb-3">{item.name}</h3>
                  <p className="font-sans text-xs text-black/50 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BOTTOM NAV BAR */}
        <div className="mt-32 pt-12 border-t border-black/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <Activity className="w-6 h-6 text-[#C5A059]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-black/40">Status: Blueprint_Authenticated</span>
          </div>
          <a 
            href="https://meetings-ap1.hubspot.com/felipe" 
            target="_blank"
            className="group px-10 py-5 bg-[#1a1a1a] text-[#FFF2EC] hover:bg-[#C5A059] transition-colors duration-300 flex items-center gap-4"
          >
            <span className="font-mono text-xs uppercase tracking-widest">Apply for Audit</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ArchitecturePage;