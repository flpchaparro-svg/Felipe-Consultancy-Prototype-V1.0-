
import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, ArrowRight, ShieldCheck, Activity, Database } from 'lucide-react';
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

// --- STANDARDIZED SHAKE BUTTON ---
const ShakeButton: React.FC<{ onClick?: () => void; children: React.ReactNode; className?: string }> = ({ onClick, children, className = "" }) => (
  <motion.button
    onClick={onClick}
    whileHover={{ x: [0, -2, 2, -2, 0], transition: { duration: 0.3 } }}
    className={`px-8 py-4 border border-[#1a1a1a] bg-transparent text-[#1a1a1a] font-mono text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#1a1a1a] hover:text-[#FFF2EC] transition-colors flex items-center gap-3 justify-center ${className}`}
  >
    {children}
  </motion.button>
);

const EvidencePage: React.FC<EvidencePageProps> = ({ onBack, onNavigate }) => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] pt-32 relative z-[150] overflow-x-hidden flex flex-col">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow pb-32">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-24">
          <ShakeButton onClick={onBack} className="!px-4 !py-2 border-black/20 hover:border-black">
            <ArrowLeft className="w-4 h-4" />
            / Return_to_HQ
          </ShakeButton>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-30">CASE_LOG: GROUP_7</span>
        </div>

        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-center">
           <div>
              <span className="font-mono text-xs text-[#C5A059] tracking-widest mb-6 block uppercase font-bold">/ ENGINEERING_AUDIT_001</span>
              <h1 className="font-serif text-5xl md:text-7xl leading-[0.9] mb-8">
                 Is your architecture <br/><span className="italic text-[#C5A059]">leaking?</span>
              </h1>
              <p className="font-sans text-xl text-[#1a1a1a]/60 leading-relaxed max-w-md border-l-2 border-[#C5A059] pl-6">
                 We don't guess. We measure. Here is what happens when you replace "Opinion" with "Engineering."
              </p>
           </div>
           <div>
              {/* THE VISUAL SLIDER */}
              <EvidenceVisual_Compare />
           </div>
        </div>

        {/* METRICS GRID (With Live Counters) */}
        <div className="mb-32 grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="p-8 border border-black/10 bg-white hover:border-[#C5A059] transition-colors group">
              <Activity className="w-8 h-8 text-[#C5A059] mb-6" />
              <div className="font-mono text-xs uppercase tracking-widest text-black/40 mb-2">Google Speed Index</div>
              <div className="text-6xl font-serif text-[#1a1a1a] mb-2 group-hover:text-[#C5A059] transition-colors">
                 <CountUp value={94} suffix="/100" />
              </div>
              <p className="text-sm text-black/50">Up from 42/100. Friction eliminated.</p>
           </div>
           
           <div className="p-8 border border-black/10 bg-white hover:border-[#C5A059] transition-colors group">
              <Database className="w-8 h-8 text-[#C5A059] mb-6" />
              <div className="font-mono text-xs uppercase tracking-widest text-black/40 mb-2">Data Integrity</div>
              <div className="text-6xl font-serif text-[#1a1a1a] mb-2 group-hover:text-[#C5A059] transition-colors">
                 <CountUp value={100} suffix="%" />
              </div>
              <p className="text-sm text-black/50">Tracking accuracy. Zero lost leads.</p>
           </div>

           <div className="p-8 border border-black/10 bg-white hover:border-[#C5A059] transition-colors group">
              <ShieldCheck className="w-8 h-8 text-[#C5A059] mb-6" />
              <div className="font-mono text-xs uppercase tracking-widest text-black/40 mb-2">Lead Velocity</div>
              <div className="text-6xl font-serif text-[#1a1a1a] mb-2 group-hover:text-[#C5A059] transition-colors">
                 <CountUp value={12} suffix="s" />
              </div>
              <p className="text-sm text-black/50">Time to first response (Automation).</p>
           </div>
        </div>

        {/* --- THE VAULT BRIDGE --- */}
        <div className="py-24 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
           <div>
              <h3 className="font-serif text-4xl text-[#1a1a1a]">Need more data?</h3>
              <p className="font-sans text-lg text-[#1a1a1a]/60 mt-2 max-w-lg">
                 One result is luck. A pattern is engineering. Access the full repository of performance audits across Trade, Law, and SaaS.
              </p>
           </div>
           <ShakeButton onClick={() => onNavigate('evidence-vault')}>
             [ OPEN_CASE_VAULT ] <ArrowRight className="w-4 h-4" />
           </ShakeButton>
        </div>

        {/* BOOKING CTA - ZINC THEME ENFORCED */}
        <div className="bg-zinc-900 border border-zinc-800 text-zinc-100 p-12 md:p-24 relative overflow-hidden mb-32 rounded-sm">
           <div className="relative z-10 flex flex-col items-center text-center">
              <h2 className="font-serif text-5xl md:text-6xl mb-8">
                 Stop leaking <span className="italic text-zinc-400">revenue.</span>
              </h2>
              
              <ShakeButton 
                onClick={() => onNavigate('landing', 'booking')}
                className="bg-zinc-100 text-zinc-900 border-none hover:bg-white hover:text-black"
              >
                 [ SCHEDULE_DIAGNOSTIC ]
              </ShakeButton>
           </div>
        </div>

      </div>
    </motion.div>
  );
};

export default EvidencePage;
