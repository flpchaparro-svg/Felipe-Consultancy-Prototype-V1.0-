import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, XCircle, Gauge, Globe, Search, ArrowRight } from 'lucide-react';
import EvidenceVisual_Compare from './EvidenceVisual_Compare';

interface EvidencePageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

const EvidencePage: React.FC<EvidencePageProps> = ({ onBack, onNavigate }) => {

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] pt-32 pb-0 px-0 relative z-[150] overflow-x-hidden flex flex-col"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow">
        
        {/* NAV BACK */}
        <div className="flex justify-between items-center mb-24">
          <button 
            onClick={() => onNavigate('landing')}
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            / Return_to_Base
          </button>
        </div>

        {/* --- SECTION 1: THE PHILOSOPHY --- */}
        <div className="mb-32 max-w-4xl">
           <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block uppercase font-bold">/ CASE_STUDY_LOGIC</span>
           <h1 className="font-serif text-5xl md:text-7xl leading-[0.9] tracking-tight mb-8">
             I don't just build. <br />
             <span className="italic text-[#1a1a1a]/40">I fix.</span>
           </h1>
           <p className="font-sans text-xl text-[#1a1a1a]/70 leading-relaxed border-l-2 border-[#C5A059] pl-6 mb-8">
             Throughout my career, I have driven feature improvements and engineered digital turnarounds for diverse clients. 
             I don't look at a website as "Art"; I look at it as a bucket. If the bucket has holes (slow speed, bad SEO, confusing UX), 
             pouring more water (ads) is a waste of money.
           </p>
           <p className="font-sans text-lg text-[#1a1a1a]/60 leading-relaxed">
             Here is an example of a forensic turnaround executed right here in Sydney.
           </p>
        </div>

        {/* --- SECTION 2: THE CASE STUDY (GROUP 7) --- */}
        <div className="mb-12 border-t border-black/10 pt-12">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
              <div>
                 <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/40 block mb-2">Project_01</span>
                 <h2 className="font-serif text-4xl">Group 7 Security</h2>
              </div>
              <div className="mt-4 md:mt-0 font-mono text-[10px] uppercase tracking-widest flex gap-4">
                 <span className="bg-[#1a1a1a] text-white px-3 py-1">Migration</span>
                 <span className="bg-[#1a1a1a] text-white px-3 py-1">Performance</span>
                 <span className="bg-[#1a1a1a] text-white px-3 py-1">SEO</span>
              </div>
           </div>

           {/* THE VISUAL SLIDER */}
           <div className="mb-24 shadow-2xl">
              <EvidenceVisual_Compare 
                beforeLabel="GROUP7SECURITY.COM (OLD)" 
                afterLabel="GROUP7SECURITY.COM.AU (NEW)"
              />
           </div>

           {/* THE FORENSIC ANALYSIS GRID */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
              
              {/* LEFT: THE DIAGNOSIS (BEFORE) */}
              <div className="bg-red-50/50 p-10 border border-red-100">
                 <div className="flex items-center gap-3 mb-8 text-[#E21E3F]">
                    <XCircle className="w-6 h-6" />
                    <h3 className="font-mono text-sm uppercase tracking-widest font-bold">The Problem (Before)</h3>
                 </div>
                 <ul className="space-y-8">
                    <li className="flex gap-4">
                       <Globe className="w-5 h-5 text-[#E21E3F] shrink-0" />
                       <div>
                          <h4 className="font-bold text-[#1a1a1a] text-sm mb-1">Domain Confusion (.com)</h4>
                          <p className="text-sm text-[#1a1a1a]/60 leading-relaxed">
                             The client was using a generic global domain. Google didn't know if they were in Sydney or Seattle. Zero local authority signal.
                          </p>
                       </div>
                    </li>
                    <li className="flex gap-4">
                       <Search className="w-5 h-5 text-[#E21E3F] shrink-0" />
                       <div>
                          <h4 className="font-bold text-[#1a1a1a] text-sm mb-1">Keyword Void</h4>
                          <p className="text-sm text-[#1a1a1a]/60 leading-relaxed">
                             The content was generic "Corporate Speak." It didn't target specific services like "Mobile Patrols" or "Concierge Security," making them invisible to intent-based search.
                          </p>
                       </div>
                    </li>
                    <li className="flex gap-4">
                       <Gauge className="w-5 h-5 text-[#E21E3F] shrink-0" />
                       <div>
                          <h4 className="font-bold text-[#1a1a1a] text-sm mb-1">Heavy Code Load</h4>
                          <p className="text-sm text-[#1a1a1a]/60 leading-relaxed">
                             Bloated assets and unoptimized scripts meant the site took 4+ seconds to load on mobile. Users bounced before seeing the offer.
                          </p>
                       </div>
                    </li>
                 </ul>
              </div>

              {/* RIGHT: THE INTERVENTION (AFTER) */}
              <div className="bg-emerald-50/50 p-10 border border-emerald-100">
                 <div className="flex items-center gap-3 mb-8 text-[#0F766E]">
                    <CheckCircle2 className="w-6 h-6" />
                    <h3 className="font-mono text-sm uppercase tracking-widest font-bold">The Engineer's Fix</h3>
                 </div>
                 <ul className="space-y-8">
                    <li className="flex gap-4">
                       <Globe className="w-5 h-5 text-[#0F766E] shrink-0" />
                       <div>
                          <h4 className="font-bold text-[#1a1a1a] text-sm mb-1">Localized Authority (.com.au)</h4>
                          <p className="text-sm text-[#1a1a1a]/60 leading-relaxed">
                             We migrated to a local domain, sending a hard signal to Google that this business serves Australia. Immediate trust lift.
                          </p>
                       </div>
                    </li>
                    <li className="flex gap-4">
                       <Search className="w-5 h-5 text-[#0F766E] shrink-0" />
                       <div>
                          <h4 className="font-bold text-[#1a1a1a] text-sm mb-1">Semantic Architecture</h4>
                          <p className="text-sm text-[#1a1a1a]/60 leading-relaxed">
                             I restructured the sitemap to match user intent. Specific pages for "Security Guards Sydney" and "Retail Security" to capture long-tail traffic.
                          </p>
                       </div>
                    </li>
                    <li className="flex gap-4">
                       <Gauge className="w-5 h-5 text-[#0F766E] shrink-0" />
                       <div>
                          <h4 className="font-bold text-[#1a1a1a] text-sm mb-1">Performance Tuning</h4>
                          <p className="text-sm text-[#1a1a1a]/60 leading-relaxed">
                             Stripped the bloat. Optimized images. The new site loads instantly, improving both SEO rankings and User Experience (UX).
                          </p>
                       </div>
                    </li>
                 </ul>
              </div>

           </div>

           {/* METRICS VISUAL */}
           <div className="border-t border-black/10 pt-16 mb-24">
              <h3 className="font-serif text-3xl mb-8 text-center">The Optimization Impact</h3>
              <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-24">
                 {/* METRIC 1 */}
                 <div className="text-center">
                    <div className="font-mono text-[10px] uppercase tracking-widest mb-2 opacity-50">PageSpeed Performance</div>
                    <div className="text-5xl md:text-6xl font-serif text-[#0F766E] mb-2">94/100</div>
                    <div className="text-xs text-[#E21E3F] line-through decoration-red-500/50 opacity-50">Was 42/100</div>
                 </div>
                 {/* METRIC 2 */}
                 <div className="text-center">
                    <div className="font-mono text-[10px] uppercase tracking-widest mb-2 opacity-50">SEO Structure</div>
                    <div className="text-5xl md:text-6xl font-serif text-[#0F766E] mb-2">100%</div>
                    <div className="text-xs text-[#E21E3F] line-through decoration-red-500/50 opacity-50">Was Unstructured</div>
                 </div>
                 {/* METRIC 3 */}
                 <div className="text-center">
                    <div className="font-mono text-[10px] uppercase tracking-widest mb-2 opacity-50">Local Signals</div>
                    <div className="text-5xl md:text-6xl font-serif text-[#0F766E] mb-2">Native</div>
                    <div className="text-xs text-[#E21E3F] line-through decoration-red-500/50 opacity-50">Was Global</div>
                 </div>
              </div>
           </div>

        </div>

        {/* BOTTOM CTA */}
        <div className="border-t border-black/10 py-32 flex flex-col items-center text-center">
           <h2 className="font-serif text-5xl md:text-6xl mb-8">Do you have a <br/> <span className="italic text-[#E21E3F]">Digital Bucket?</span></h2>
           <p className="font-sans text-lg text-[#1a1a1a]/60 max-w-lg mb-12">
             Don't pour money into a leaking website. Let's fix the foundation first.
           </p>
           
           <button 
             onClick={() => onNavigate('landing', 'booking')}
             className="w-auto px-12 py-4 bg-[#1a1a1a] text-[#FFF2EC] relative overflow-hidden group border border-[#1a1a1a]"
           >
             <div className="absolute inset-0 bg-[#FFF2EC] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
             <span className="relative z-10 flex items-center justify-center gap-4 group-hover:text-[#1a1a1a] transition-colors duration-500 font-mono text-[10px] uppercase tracking-[0.2em]">
               [ AUDIT_MY_ARCHITECTURE ]
               <ArrowRight className="w-3 h-3" />
             </span>
           </button>
        </div>

      </div>
    </motion.div>
  );
};

export default EvidencePage;