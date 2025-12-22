import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowUpRight, X, Activity } from 'lucide-react';

const CASE_STUDIES = [
  {
    id: 'alpha',
    client: 'SaaS Enterprise',
    result: '+42% Conv',
    tag: 'Capture_Core',
    stack: ['OpenAI', 'Make.com', 'React'],
    videoUrl: '#', 
    description: 'Replaced a manual lead triage team with autonomous AI agents. Zero leakage across 14,000 monthly inquiries.',
    metrics: ['Latency: <200ms', 'Accuracy: 99.4%', 'ROI: 12x']
  },
  {
    id: 'beta',
    client: 'Fintech Series A',
    result: '-30hr/wk',
    tag: 'Digital_Labor',
    stack: ['Anthropic', 'Node.js', 'AWS'],
    videoUrl: '#',
    description: 'Automated the end-to-end data reconciliation engine, removing human friction from the finance stack.',
    metrics: ['Error Rate: 0%', 'Uptime: 100%', 'Saved: 120hrs/mo']
  }
];

const EvidenceVault: React.FC = () => {
  const [activeStudy, setActiveStudy] = useState<typeof CASE_STUDIES[0] | null>(null);

  return (
    <section id="evidence" className="w-full bg-[#FFF2EC] py-32 px-6 md:px-12 lg:px-20 relative z-30 border-t border-black/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-4 block uppercase font-bold">/ THE EVIDENCE VAULT</span>
            <h2 className="font-serif text-5xl md:text-7xl text-[#1a1a1a] leading-none">System <span className="italic text-black/20">Deployments.</span></h2>
          </div>
          <div className="flex items-center gap-3 font-mono text-black/30 text-[10px] uppercase tracking-widest text-right">
            <Activity className="w-3 h-3 text-[#C5A059]" />
            LIVE_LOGS // VERIFIED_RESULTS
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CASE_STUDIES.map((study) => (
            <motion.div 
              key={study.id}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 30px 60px -12px rgba(197, 160, 89, 0.15)",
                transition: { duration: 0.4 }
              }}
              onClick={() => setActiveStudy(study)}
              className="group cursor-pointer bg-[#1a1a1a] border border-white/5 p-12 relative overflow-hidden transition-all duration-500"
            >
              {/* Gold Scanline for the card - Yellow per guidelines */}
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="flex justify-between items-start mb-12 relative z-10">
                {/* Specific tags stay Red as requested */}
                <span className="font-mono text-[10px] text-[#E21E3F] tracking-[0.4em] uppercase font-bold">{study.tag}</span>
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#C5A059] group-hover:text-[#C5A059] transition-all duration-300">
                  <Play className="w-4 h-4 fill-current" />
                </div>
              </div>

              <h3 className="font-serif text-4xl text-[#FFF2EC] mb-4 relative z-10">{study.client}</h3>
              {/* Numbers are Yellow/Gold now */}
              <div className="text-6xl font-sans font-light text-[#C5A059] mb-6 relative z-10 tabular-nums">
                {study.result}
              </div>
              
              {/* Silicon Proof Stack */}
              <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                {study.stack.map(tech => (
                  <span key={tech} className="px-3 py-1 border border-white/10 text-[9px] font-mono text-white/50 uppercase tracking-widest group-hover:border-[#C5A059]/30 group-hover:text-[#FFF2EC] transition-colors">
                    {tech}
                  </span>
                ))}
              </div>

              {/* View System Specs is Yellow now */}
              <div className="flex items-center gap-3 text-[10px] font-mono text-white/20 uppercase tracking-widest group-hover:text-[#C5A059] transition-colors">
                View System Specs <ArrowUpRight className="w-3 h-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>

              {/* Decorative Corner gold bracket */}
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-[#C5A059]/0 group-hover:border-[#C5A059]/40 transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeStudy && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveStudy(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl" 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#FFF2EC] w-full max-w-4xl relative z-10 p-12 overflow-hidden shadow-2xl rounded-sm"
            >
              <button onClick={() => setActiveStudy(null)} className="absolute top-8 right-8 text-black/40 hover:text-[#C5A059] transition-colors z-50">
                <X className="w-8 h-8" />
              </button>
              
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-7">
                  <span className="font-mono text-[10px] text-[#E21E3F] tracking-[0.4em] uppercase mb-4 block font-bold">Deployment_Verified // {activeStudy.id}</span>
                  <h3 className="font-serif text-5xl lg:text-6xl mb-6">{activeStudy.client}</h3>
                  <p className="text-xl text-black/70 italic mb-8 leading-relaxed font-light border-l-2 border-[#C5A059] pl-6">
                    "{activeStudy.description}"
                  </p>
                  <div className="aspect-video bg-[#1a1a1a] flex items-center justify-center group relative cursor-pointer border border-black/10 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#C5A059]/10 to-transparent"></div>
                    <span className="font-mono text-[10px] text-[#C5A059] animate-pulse tracking-[0.2em] relative z-10">[ INITIATE_SYSTEM_WALKTHROUGH ]</span>
                  </div>
                </div>
                
                <div className="md:col-span-5 border-l border-black/10 pl-12 flex flex-col justify-center">
                  <h4 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] mb-10 text-black/30">Verified Metrics</h4>
                  <ul className="space-y-8">
                    {activeStudy.metrics.map((m, i) => (
                      <li key={i} className="flex items-center gap-6 group">
                        <div className="w-2 h-2 bg-[#C5A059] rotate-45 group-hover:rotate-0 transition-transform duration-300"></div>
                        <span className="font-sans font-medium text-xl tracking-tight text-[#1a1a1a]">{m}</span>
                      </li>
                    ))}
                  </ul>
                  <a 
                    href="https://meetings-ap1.hubspot.com/felipe" 
                    target="_blank" 
                    className="mt-16 block text-center py-5 bg-[#1a1a1a] text-white font-mono text-[10px] uppercase tracking-[0.3em] hover:bg-[#C5A059] transition-all duration-500 shadow-xl"
                  >
                    Replicate This Engine
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EvidenceVault;