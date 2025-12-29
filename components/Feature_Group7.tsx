import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertTriangle, ArrowRight, Activity, Globe, Zap, X } from 'lucide-react';
import Modal from './Modal';
import EvidenceVisual_Compare from './EvidenceVisual_Compare';

const Feature_Group7: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="w-full relative z-20">
        
        {/* --- THE TRIGGER CARD --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-[#1a1a1a] border border-white/10 p-1 rounded-sm overflow-hidden relative group cursor-pointer hover:border-[#C5A059]/50 transition-colors duration-500"
        >
          
          {/* Header Bar */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-black/40">
              <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#C5A059] rounded-full animate-pulse" />
                  <span className="font-mono text-[10px] text-[#C5A059] tracking-widest uppercase">
                     Deployment_Log // G7_SEC
                  </span>
              </div>
              <span className="font-mono text-[9px] text-white/30 uppercase flex items-center gap-2">
                  [ CLICK_TO_INSPECT_EVIDENCE ]
                  <Zap className="w-3 h-3 text-[#C5A059]" />
              </span>
          </div>

          {/* The Transformation Engine (Visual Abstract) */}
          <div className="p-8 md:p-16 relative min-h-[300px] flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
              
              {/* Background Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />

              {/* NODE A: LEGACY */}
              <div className="relative z-10 flex flex-col items-center gap-4 opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-16 h-16 rounded-full border border-[#E21E3F]/50 flex items-center justify-center bg-[#E21E3F]/5">
                      <AlertTriangle className="w-6 h-6 text-[#E21E3F]" />
                  </div>
                  <div className="text-center">
                      <div className="font-mono text-[10px] text-[#E21E3F] mb-2 uppercase tracking-widest">Legacy State</div>
                      <div className="font-serif text-white/60 text-lg mb-1">group7security.com</div>
                      <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#E21E3F]">
                          <Activity className="w-3 h-3" />
                          <span>4.2s Load</span>
                      </div>
                  </div>
              </div>

              {/* STREAM CORD */}
              <div className="flex-grow w-full md:w-auto h-[100px] md:h-[1px] bg-white/10 relative mx-4 md:mx-12 flex items-center justify-center">
                  <div className="absolute inset-0 bg-white/5" />
                  <motion.div 
                      className="absolute top-0 bottom-0 left-0 h-full bg-gradient-to-r from-transparent via-[#C5A059] to-transparent w-1/3 opacity-50"
                      animate={{ left: ['-30%', '130%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                  <div className="relative z-10 bg-[#1a1a1a] border border-[#C5A059]/30 px-4 py-2 rounded-full flex items-center gap-3">
                      <span className="font-mono text-[9px] text-[#C5A059] uppercase tracking-widest">
                          VIEW TRANSFORMATION
                      </span>
                  </div>
              </div>

              {/* NODE B: AUTHORITY */}
              <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-20 h-20 rounded-full border-2 border-[#C5A059] flex items-center justify-center bg-[#C5A059]/10 shadow-[0_0_50px_rgba(197,160,89,0.2)]">
                      <ShieldCheck className="w-8 h-8 text-[#C5A059]" />
                  </div>
                  <div className="text-center">
                      <div className="font-mono text-[10px] text-[#C5A059] mb-2 uppercase tracking-widest">Authority State</div>
                      <div className="font-serif text-white text-xl mb-1">group7security.com.au</div>
                      <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#0F766E] bg-[#0F766E]/10 px-3 py-1 rounded-full">
                          <Globe className="w-3 h-3" />
                          <span>0.4s Load</span>
                      </div>
                  </div>
              </div>

          </div>

          {/* Footer Action */}
          <div className="py-4 border-t border-white/5 bg-black/40 flex items-center justify-center gap-3 text-white group-hover:text-[#C5A059] transition-colors">
               <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Open Case File</span>
               <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>

        </motion.div>
      </div>

      {/* --- THE EVIDENCE MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 md:px-8">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-6xl bg-[#FFF2EC] overflow-hidden shadow-2xl rounded-sm max-h-[90vh] flex flex-col"
            >
               
               {/* Modal Header */}
               <div className="flex justify-between items-center p-6 border-b border-black/10 bg-white">
                  <div>
                    <h3 className="font-serif text-2xl text-[#1a1a1a]">Group 7 Security</h3>
                    <p className="font-mono text-[10px] text-[#1a1a1a]/50 uppercase tracking-widest">Migration & Performance Audit</p>
                  </div>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-black/5 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-[#1a1a1a]" />
                  </button>
               </div>

               {/* Modal Body: The Slider */}
               <div className="flex-grow overflow-y-auto p-0">
                  <EvidenceVisual_Compare 
                    beforeLabel="OLD SITE (.COM)"
                    afterLabel="NEW AUTHORITY (.COM.AU)"
                  />
                  
                  {/* --- PLACEHOLDER INSTRUCTION FOR USER --- */}
                  {/* TO ADD REAL IMAGES:
                      Open 'components/EvidenceVisual_Compare.tsx'.
                      Look for the <div className="absolute inset-0 bg-[#E5E5E5] ..."> blocks.
                      Replace those <div>s with:
                      <img src="/path-to-before-image.jpg" className="absolute inset-0 w-full h-full object-cover object-top" />
                  */}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-12 bg-white border-t border-black/10">
                      <div>
                        <h4 className="font-bold text-[#E21E3F] mb-2 text-sm uppercase tracking-widest">The Problem</h4>
                        <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">
                          The client was using a generic <strong>.com</strong> domain with zero local SEO targeting. Google assumed they were a global software company, not a Sydney security firm.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#C5A059] mb-2 text-sm uppercase tracking-widest">The Fix</h4>
                        <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">
                          We migrated to <strong>.com.au</strong> and rebuilt the site on a high-speed Headless stack. We injected local schema ("Security Guards Sydney") to force Google to recognize the location.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#0F766E] mb-2 text-sm uppercase tracking-widest">The Result</h4>
                        <p className="text-sm text-[#1a1a1a]/70 leading-relaxed">
                          <strong>94/100 PageSpeed</strong> score. Immediate increase in local inquiries. The site now loads instantly on mobile, securing jobs while competitors are still loading.
                        </p>
                      </div>
                  </div>
               </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Feature_Group7;