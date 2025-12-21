
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowUpRight, X } from 'lucide-react';

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
    <section id="evidence" className="w-full bg-[#1a1a1a] py-32 px-6 md:px-12 lg:px-20 relative z-30">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-4 block">/ THE EVIDENCE VAULT</span>
            <h2 className="font-serif text-5xl md:text-7xl text-[#FFF2EC] leading-none">System <span className="italic text-white/40">Deployments.</span></h2>
          </div>
          <p className="font-sans text-[#FFF2EC]/50 max-w-xs text-sm uppercase tracking-widest font-mono text-right">
            LIVE_LOGS // VERIFIED_RESULTS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CASE_STUDIES.map((study) => (
            <motion.div 
              key={study.id}
              whileHover={{ y: -5 }}
              onClick={() => setActiveStudy(study)}
              className="group cursor-pointer bg-white/5 border border-white/10 p-12 relative overflow-hidden transition-colors hover:bg-white/10"
            >
              <div className="flex justify-between items-start mb-12">
                <span className="font-mono text-[10px] text-[#C5A059] tracking-[0.3em] uppercase">{study.tag}</span>
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#C5A059] group-hover:text-[#C5A059] transition-colors">
                  <Play className="w-4 h-4 fill-current" />
                </div>
              </div>
              <h3 className="font-serif text-4xl text-[#FFF2EC] mb-4">{study.client}</h3>
              <div className="text-6xl font-sans font-light text-[#C5A059] mb-4">{study.result}</div>
              
              {/* Silicon Proof Stack */}
              <div className="flex flex-wrap gap-2 mb-8">
                {study.stack.map(tech => (
                  <span key={tech} className="px-2 py-0.5 border border-white/20 text-[8px] font-mono text-[#C5A059] uppercase tracking-widest">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 text-[10px] font-mono text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">
                View System Specs <ArrowUpRight className="w-3 h-3" />
              </div>
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
              className="absolute inset-0 bg-black/90 backdrop-blur-xl" 
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#FFF2EC] w-full max-w-4xl relative z-10 p-12 overflow-hidden shadow-2xl"
            >
              <button onClick={() => setActiveStudy(null)} className="absolute top-8 right-8 text-black/40 hover:text-black">
                <X className="w-6 h-6" />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                <div className="md:col-span-7">
                  <span className="font-mono text-[10px] text-[#E21E3F] tracking-widest uppercase mb-4 block">Deployment_Verified // {activeStudy.id}</span>
                  <h3 className="font-serif text-5xl mb-6">{activeStudy.client}</h3>
                  <p className="text-xl text-black/70 italic mb-8 leading-relaxed">"{activeStudy.description}"</p>
                  <div className="aspect-video bg-black flex items-center justify-center group relative cursor-pointer border border-black/10">
                    <span className="font-mono text-xs text-[#C5A059] animate-pulse">[ INITIATE_SYSTEM_WALKTHROUGH ]</span>
                  </div>
                </div>
                <div className="md:col-span-5 border-l border-black/10 pl-12 flex flex-col justify-center">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-widest mb-8">Verified Metrics</h4>
                  <ul className="space-y-6">
                    {activeStudy.metrics.map((m, i) => (
                      <li key={i} className="flex items-center gap-4">
                        <div className="w-1.5 h-1.5 bg-[#C5A059] rounded-full"></div>
                        <span className="font-sans font-medium text-lg tracking-tight">{m}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="https://meetings-ap1.hubspot.com/felipe" target="_blank" className="mt-12 block text-center py-4 bg-[#1a1a1a] text-white font-mono text-xs uppercase tracking-[0.2em] hover:bg-[#C5A059] transition-colors">
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
