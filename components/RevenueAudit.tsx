import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, AlertCircle } from 'lucide-react';

const RevenueAudit: React.FC = () => {
  const [revenue, setRevenue] = useState(50000); // Monthly Revenue (Reference)
  const [hours, setHours] = useState(10); // Weekly Admin Hours
  const [bloat, setBloat] = useState(3); // Redundant Apps
  const [leakage, setLeakage] = useState(0);

  useEffect(() => {
    // STRICT CALCULATION LOGIC:
    // 1. Labor Waste: Hours * $150/hr (Exec Value) * 52 weeks
    // 2. Tech Waste: Apps * $50/mo * 12 months
    
    const laborCost = hours * 150 * 52;
    const techCost = bloat * 50 * 12;
    
    setLeakage(laborCost + techCost);
  }, [hours, bloat]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <section id="audit" className="w-full bg-[#FFF2EC] py-32 px-6 md:px-12 lg:px-20 relative z-30 border-t border-[#1a1a1a]/10">
      <div className="max-w-[1600px] mx-auto">
        
        {/* BRIDGE COPY */}
        <div className="mb-20 max-w-4xl">
           <span className="font-mono text-xs text-[#1a1a1a] tracking-[0.4em] mb-6 block uppercase font-bold">
             <span className="text-[#E21E3F]">/</span> THE COST OF CHAOS
           </span>
           <h2 className="font-serif text-5xl md:text-7xl text-[#1a1a1a] leading-[0.95] tracking-tighter mb-8">
             Friction isn't just annoying. <br />
             It is <span className="italic text-[#E21E3F]">Expensive.</span>
           </h2>
           <p className="font-sans text-xl font-light text-[#1a1a1a]/70 leading-relaxed border-l border-[#E21E3F]/30 pl-6 max-w-2xl">
             I identified the potential leaks in the previous section. Now, use this tool to quantify exactly what that "Operational Drag" is costing your bottom line.
           </p>
        </div>

        {/* CALCULATOR INTERFACE */}
        <div className="bg-white border border-[#1a1a1a]/10 p-8 md:p-16 relative shadow-sm">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              
              {/* INPUTS COLUMN */}
              <div className="space-y-16">
                 {/* Question 1 - Reference Only */}
                 <div>
                    <div className="flex justify-between items-end mb-6">
                       <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/60">01 // Monthly Revenue</label>
                       <span className="font-serif text-3xl text-[#1a1a1a]">{formatCurrency(revenue)}</span>
                    </div>
                    <p className="font-sans text-xs text-[#1a1a1a]/40 mb-6 italic pl-1">For context only. Does not affect waste calculation.</p>
                    <input 
                      type="range" 
                      min="5000" 
                      max="500000" 
                      step="5000" 
                      value={revenue}
                      onChange={(e) => setRevenue(Number(e.target.value))}
                      className="w-full h-[2px] bg-[#1a1a1a]/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#1a1a1a] [&::-webkit-slider-thumb]:rounded-none hover:[&::-webkit-slider-thumb]:bg-[#C5A059] transition-colors focus:outline-none"
                    />
                 </div>

                 {/* Question 2 */}
                 <div>
                    <div className="flex justify-between items-end mb-6">
                       <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/60">02 // Weekly Admin Hours</label>
                       <span className="font-serif text-3xl text-[#1a1a1a]">{hours} hrs</span>
                    </div>
                    <p className="font-sans text-xs text-[#1a1a1a]/40 mb-6 italic pl-1">Data entry, email chasing, admin.</p>
                    <input 
                      type="range" 
                      min="0" 
                      max="40" 
                      step="1" 
                      value={hours}
                      onChange={(e) => setHours(Number(e.target.value))}
                      className="w-full h-[2px] bg-[#1a1a1a]/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#1a1a1a] [&::-webkit-slider-thumb]:rounded-none hover:[&::-webkit-slider-thumb]:bg-[#C5A059] transition-colors focus:outline-none"
                    />
                 </div>

                 {/* Question 3 */}
                 <div>
                    <div className="flex justify-between items-end mb-6">
                       <label className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]/60">03 // Redundant Apps</label>
                       <span className="font-serif text-3xl text-[#1a1a1a]">{bloat} apps</span>
                    </div>
                    <input 
                      type="range" 
                      min="0" 
                      max="20" 
                      step="1" 
                      value={bloat}
                      onChange={(e) => setBloat(Number(e.target.value))}
                      className="w-full h-[2px] bg-[#1a1a1a]/10 appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:bg-[#1a1a1a] [&::-webkit-slider-thumb]:rounded-none hover:[&::-webkit-slider-thumb]:bg-[#C5A059] transition-colors focus:outline-none"
                    />
                 </div>
              </div>

              {/* OUTPUT COLUMN */}
              <div className="bg-[#1a1a1a]/[0.02] border border-[#1a1a1a]/10 p-12 flex flex-col justify-center items-center text-center relative overflow-hidden">
                 {/* Top Accent Line */}
                 <div className={`absolute top-0 left-0 w-full h-1 transition-colors duration-500 ${leakage > 0 ? 'bg-[#E21E3F]' : 'bg-[#1a1a1a]/20'}`}></div>
                 
                 <AlertCircle className={`w-12 h-12 mb-8 opacity-80 stroke-[1.5] transition-colors duration-500 ${leakage > 0 ? 'text-[#E21E3F]' : 'text-[#1a1a1a]/20'}`} />
                 
                 <span className={`font-mono text-[10px] tracking-[0.3em] uppercase mb-6 font-bold transition-colors duration-500 ${leakage > 0 ? 'text-[#E21E3F]' : 'text-[#1a1a1a]/40'}`}>
                   Estimated Annual Waste
                 </span>
                 
                 <motion.div 
                   key={leakage}
                   initial={{ scale: 0.95, opacity: 0.5 }}
                   animate={{ scale: 1, opacity: 1 }}
                   className={`font-serif text-5xl md:text-7xl lg:text-8xl mb-8 tracking-tighter leading-none transition-colors duration-500 ${leakage > 0 ? 'text-[#E21E3F]' : 'text-[#1a1a1a]'}`}
                 >
                    {formatCurrency(leakage)}
                 </motion.div>
                 
                 <p className="font-sans text-sm text-[#1a1a1a]/50 max-w-xs mb-12 leading-relaxed">
                    {leakage > 0 
                      ? "This is capital currently evaporating from your P&L due to operational inefficiencies and manual drag." 
                      : "System operational. No estimated waste detected based on current inputs."}
                 </p>

                 <AnimatePresence>
                   {leakage > 0 && (
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                     >
                       <a 
                         href="https://meetings-ap1.hubspot.com/felipe"
                         target="_blank"
                         className="group relative inline-flex items-center gap-4 px-10 py-5 bg-transparent border border-[#C5A059] text-white font-mono text-[10px] uppercase tracking-[0.3em] font-bold overflow-hidden"
                       >
                          <div className="absolute inset-0 bg-[#C5A059] group-hover:-translate-y-full transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                          <span className="relative z-10 transition-colors duration-500 group-hover:text-[#C5A059]">[ STOP THE BLEEDING ]</span>
                          <ArrowRight className="w-4 h-4 relative z-10 transition-all duration-500 group-hover:translate-x-1 group-hover:text-[#C5A059]" />
                       </a>
                     </motion.div>
                   )}
                 </AnimatePresence>
              </div>

           </div>
        </div>

      </div>
    </section>
  );
};

export default RevenueAudit;