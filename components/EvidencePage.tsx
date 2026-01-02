
import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShieldCheck, Activity, Database } from 'lucide-react';
import GlobalFooter from './GlobalFooter';
import EvidenceVisual_Compare from './EvidenceVisual_Compare';

interface EvidencePageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

// --- HELPER: ANIMATED COUNTER ---
const CountUp: React.FC<{ value: number, suffix?: string }> = ({ value, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const incrementTime = duration / value;
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [value, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const EvidencePage: React.FC<EvidencePageProps> = ({ onBack, onNavigate }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] pt-32 relative z-[150] overflow-x-hidden flex flex-col">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-24">
          <button onClick={onBack} className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            / Return_to_HQ
          </button>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-30">CASE_LOG: GROUP_7</span>
        </div>

        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
           <div>
              <span className="font-mono text-xs text-[#0F766E] tracking-widest mb-6 block uppercase font-bold">/ ENGINEERING_AUDIT_001</span>
              <h1 className="font-serif text-5xl md:text-7xl leading-[0.9] mb-8">
                 Is your architecture <br/><span className="italic text-[#0F766E]">leaking?</span>
              </h1>
              <p className="font-sans text-xl text-[#1a1a1a]/60 leading-relaxed max-w-md border-l-2 border-[#0F766E] pl-6">
                 We don't guess. We measure. Here is what happens when you replace "Opinion" with "Engineering."
              </p>
           </div>
           <div>
              {/* THE NEW VISUAL SLIDER */}
              <EvidenceVisual_Compare />
           </div>
        </div>

        {/* METRICS GRID (With Live Counters) */}
        <div className="mb-32 grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="p-8 border border-black/10 bg-white hover:border-[#0F766E] transition-colors group">
              <Activity className="w-8 h-8 text-[#0F766E] mb-6" />
              <div className="font-mono text-xs uppercase tracking-widest text-black/40 mb-2">Google Speed Index</div>
              <div className="text-6xl font-serif text-[#1a1a1a] mb-2 group-hover:text-[#0F766E] transition-colors">
                 <CountUp value={94} suffix="/100" />
              </div>
              <p className="text-sm text-black/50">Up from 42/100. Friction eliminated.</p>
           </div>
           
           <div className="p-8 border border-black/10 bg-white hover:border-[#0F766E] transition-colors group">
              <Database className="w-8 h-8 text-[#0F766E] mb-6" />
              <div className="font-mono text-xs uppercase tracking-widest text-black/40 mb-2">Data Integrity</div>
              <div className="text-6xl font-serif text-[#1a1a1a] mb-2 group-hover:text-[#0F766E] transition-colors">
                 <CountUp value={100} suffix="%" />
              </div>
              <p className="text-sm text-black/50">Tracking accuracy. Zero lost leads.</p>
           </div>

           <div className="p-8 border border-black/10 bg-white hover:border-[#0F766E] transition-colors group">
              <ShieldCheck className="w-8 h-8 text-[#0F766E] mb-6" />
              <div className="font-mono text-xs uppercase tracking-widest text-black/40 mb-2">Lead Velocity</div>
              <div className="text-6xl font-serif text-[#1a1a1a] mb-2 group-hover:text-[#0F766E] transition-colors">
                 <CountUp value={12} suffix="s" />
              </div>
              <p className="text-sm text-black/50">Time to first response (Automation).</p>
           </div>
        </div>

        {/* --- THE VAULT BRIDGE (NEW) --- */}
        <div className="py-24 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
           <div>
              <h3 className="font-serif text-4xl text-[#1a1a1a]">Need more data?</h3>
              <p className="font-sans text-lg text-[#1a1a1a]/60 mt-2 max-w-lg">
                 One result is luck. A pattern is engineering. Access the full repository of performance audits across Trade, Law, and SaaS.
              </p>
           </div>
           <button 
             onClick={() => onNavigate('evidence-vault')}
             className="group flex items-center gap-4 px-8 py-4 border border-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-[#FFF2EC] transition-all duration-300"
           >
             <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold">
               [ OPEN_CASE_VAULT ]
             </span>
             <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
           </button>
        </div>

        {/* BOOKING CTA */}
        <div className="bg-[#1a1a1a] text-[#FFF2EC] p-12 md:p-24 relative overflow-hidden">
           <div className="relative z-10 flex flex-col items-center text-center">
              <h2 className="font-serif text-5xl md:text-6xl mb-8">Stop leaking <span className="italic text-[#0F766E]">revenue.</span></h2>
              <button 
                onClick={() => onNavigate('landing', 'booking')}
                className="px-8 py-4 bg-[#FFF2EC] text-[#1a1a1a] font-mono text-xs uppercase tracking-[0.2em] hover:scale-105 transition-transform"
              >
                 [ SCHEDULE_DIAGNOSTIC ]
              </button>
           </div>
        </div>

      </div>
      <GlobalFooter onNavigate={onNavigate} />
    </motion.div>
  );
};

export default EvidencePage;
