import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, Database, Activity, GitBranch, CheckCircle2, Shield, Zap } from 'lucide-react';

interface Pillar2Props {
  onBack: () => void;
}

const Pillar2: React.FC<Pillar2Props> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const serviceModules = [
    {
      id: 'MOD_A',
      title: 'The Capture Core',
      desc: 'Foundational setup for high-volume inquiries. Engineering "Missed Call Text Back" and Unified Inbox protocols to ensure zero lead decay.',
      icon: Target
    },
    {
      id: 'MOD_B',
      title: 'Frictionless Pipeline',
      desc: 'Visual sales architecture for B2B teams. Automated Kanban transitions and 90-day cash flow forecasting logic.',
      icon: GitBranch
    },
    {
      id: 'MOD_C',
      title: 'Retention Loop',
      desc: 'Backend architecture for E-com and LTV growth. Automated Win-Back sequences and dynamic VIP segmentation based on RFM data.',
      icon: Database
    },
    {
      id: 'MOD_D',
      title: 'Operational Audit',
      desc: 'Diagnostic intervention for legacy stacks. We identify "Tech Bloat," map internal workflows, and consolidate the truth source.',
      icon: Activity
    }
  ];

  const sprintRoadmap = [
    { day: '01', title: 'Hygiene', task: 'Legacy data scrub and infrastructure sanitization.' },
    { day: '02', title: 'Connection', task: 'API source tracking and attribution flow configuration.' },
    { day: '03', title: 'Logic', task: 'Instant Acknowledge protocols and workflow deployment.' }
  ];

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.25, 1, 0.5, 1] as any 
      } 
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="relative min-h-screen w-full bg-[#FFF2EC] text-[#1a1a1a] pb-20 overflow-x-hidden"
    >
      {/* DATA PULSE BACKGROUND EFFECT */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ backgroundImage: 'radial-gradient(#C5A059 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
        {/* Pulsing vertical lines */}
        <div className="flex justify-around w-full h-full opacity-[0.08]">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="w-[1px] h-full bg-[#C5A059]"
              animate={{ 
                opacity: [0.2, 1, 0.2],
                scaleY: [0.8, 1.1, 0.8]
              }}
              transition={{ 
                duration: 4 + i, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.3
              }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 pt-32">
        
        {/* NAVIGATION & MONO LABEL */}
        <div className="flex justify-between items-center mb-16">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            [ ARCHITECTURE OVERVIEW )
          </button>
          <div className="font-mono text-[9px] text-black/40 uppercase tracking-[0.4em]">
            [ PILLAR_02 // SYSTEM_CORE_V.2 ]
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="mb-40">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariants as any}>
            <span className="font-mono text-xs text-[#E21E3F] tracking-[0.4em] mb-6 block uppercase">/ Intelligence_Nervous_System</span>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.9] tracking-tighter mb-10">
              The Central <br />
              <span className="italic text-[#C5A059]">Nervous System</span> <br />
              of Revenue.
            </h1>
            <p className="font-sans text-xl md:text-2xl font-light text-[#1a1a1a]/70 max-w-3xl leading-relaxed border-l border-black/20 pl-8">
              We don't install databases. We architect single sources of truth that track, nurture, and close capital without human error.
            </p>
          </motion.div>
        </section>

        {/* PHILOSOPHY BLOCK */}
        <section className="mb-40 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariants as any}>
              <h2 className="font-serif text-4xl md:text-5xl mb-8 italic">Truth over Features.</h2>
              <div className="space-y-6 text-lg text-black/60 font-light leading-relaxed max-w-2xl">
                <p>Most businesses manage by "Gut Feeling" because their data is fragmented across silos. We eliminate the guesswork by building a Single Pane of Glass—a unified architecture where every dollar is tracked from initial click to final settlement.</p>
                <p>Features are commodities. Integrity is the asset. We engineer the protocols that ensure your CRM remains a lethal weapon, not an admin burden.</p>
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center p-12 bg-white border border-black/5 shadow-inner">
             <div className="w-full aspect-square border-2 border-dashed border-black/5 rounded-full flex items-center justify-center animate-spin-slow">
                <GitBranch className="w-24 h-24 text-[#C5A059] stroke-[0.5]" />
             </div>
             <div className="mt-8 font-mono text-[9px] text-black/40 tracking-[0.3em] uppercase">
                CALIBRATING_TRUTH_SOURCE... [ 100% ]
             </div>
          </div>
        </section>

        {/* SERVICE MODULES */}
        <section className="mb-40">
          <div className="border-t border-black/10 pt-20 mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
            <h2 className="font-serif text-5xl italic">Intelligence Modules.</h2>
            <span className="font-mono text-[10px] text-black/40 uppercase tracking-widest">/ REVENUE_INTEGRITY_PROTOCOL</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 bg-black/5 border border-black/5">
            {serviceModules.map((mod) => (
              <motion.div 
                key={mod.id}
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={revealVariants as any}
                className="bg-[#FFF2EC] p-10 flex flex-col justify-between hover:bg-white transition-colors duration-500 group"
              >
                <div>
                  <span className="font-mono text-[9px] text-[#E21E3F] mb-8 block tracking-widest uppercase">{mod.id}</span>
                  <mod.icon className="w-8 h-8 mb-6 text-black/20 group-hover:text-[#C5A059] transition-colors" />
                  <h3 className="font-serif text-3xl mb-4 leading-none">{mod.title}</h3>
                  <p className="font-sans text-sm text-black/50 leading-relaxed">{mod.desc}</p>
                </div>
                <div className="mt-12 pt-8 border-t border-black/5">
                   <button className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-[#C5A059]">
                      System Specs <Activity className="w-3 h-3" />
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 3-DAY SPRINT ROADMAP */}
        <section className="mb-40 py-24 bg-[#1a1a1a] text-white px-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <Database className="w-64 h-64" />
          </div>
          <div className="max-w-xl mb-16 relative z-10">
            <span className="font-mono text-[10px] text-[#C5A059] tracking-widest uppercase block mb-4">/ RAPID_DEPLOYMENT</span>
            <h2 className="font-serif text-5xl mb-6 italic">The 3-Day Sprint.</h2>
            <p className="font-sans text-white/50 leading-relaxed">Complexity is the enemy of adoption. We architect and deploy the core intelligence logic in 72 hours.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-white/10 relative z-10">
            {sprintRoadmap.map((step) => (
              <div key={step.day} className="p-8 border-r border-white/10 last:border-0 hover:bg-white/5 transition-colors group">
                <span className="font-mono text-[9px] text-[#C5A059] group-hover:text-white transition-colors">DAY {step.day}</span>
                <h4 className="font-serif text-2xl mt-4 mb-2">{step.title}</h4>
                <p className="font-sans text-[11px] text-white/40 leading-relaxed">{step.task}</p>
              </div>
            ))}
          </div>
        </section>

        {/* RETAINER PROTOCOLS */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-16 pt-20 border-t border-black/10">
          <div className="lg:col-span-5">
            <span className="font-mono text-[10px] text-[#E21E3F] tracking-widest uppercase block mb-4">/ DATA_SANITY</span>
            <h2 className="font-serif text-5xl italic leading-tight">Revenue <br />Hygiene.</h2>
            <p className="font-sans text-lg text-black/50 mt-6 leading-relaxed">Data decays at a rate of 2% per month. Our hygiene protocols ensure your growth metrics remain accurate and actionable as you scale.</p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 border border-black/10 bg-white shadow-sm hover:border-[#C5A059] transition-colors">
              <Shield className="w-10 h-10 text-[#C5A059] mb-8" />
              <h4 className="font-serif text-2xl mb-4">Asset Maintenance</h4>
              <p className="font-sans text-sm text-black/50 leading-relaxed">Continuous field mapping, protocol updates, and data-scrubbing cycles to prevent system entropy.</p>
            </div>
            <div className="p-10 bg-[#1a1a1a] text-white group">
              <Zap className="w-10 h-10 text-[#E21E3F] mb-8 group-hover:animate-pulse" />
              <h4 className="font-serif text-2xl mb-4">Data Integrity</h4>
              <p className="font-sans text-white/50 text-sm leading-relaxed">Monthly integrity audits and decision-matrix calibration to ensure the executive dashboard reflects reality.</p>
            </div>
          </div>
        </section>

        <div className="py-12 border-t border-black/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-black/40">SYSTEM_CORE_SYNC // TRUTH_ESTABLISHED</span>
          </div>
          <button onClick={onBack} className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#E21E3F] hover:underline underline-offset-4">
            Back to Architecture HQ
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </motion.div>
  );
};

export default Pillar2;