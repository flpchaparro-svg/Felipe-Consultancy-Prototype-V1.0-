import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, AlertTriangle, Terminal } from 'lucide-react';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    frictionPoint: 'Digital Revenue',
    bleedingNeck: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1500);
  };

  const systems = [
    'Digital Revenue (The Face)',
    'CRM Intelligence (The Brain)',
    'Automation Arch (The Muscle)',
    'Cognitive Infra (The Voice)',
    'Media Logistics (The Presence)',
    'Adoption Arch (The Soul)',
    'Intelligence Arch (The Eyes)'
  ];

  return (
    <div className="min-h-screen w-full bg-[#FFF2EC] flex flex-col lg:flex-row relative z-40">
      
      {/* LEFT COLUMN: THE HUMAN ANCHOR (STICKY) */}
      <div className="lg:w-5/12 h-[40vh] lg:h-screen sticky top-0 bg-[#1a1a1a] text-[#FFF2EC] flex flex-col justify-between p-8 md:p-12 lg:p-16 border-r border-white/10">
        <div>
          <button 
            onClick={onBack} 
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] opacity-60 hover:opacity-100 transition-opacity mb-12"
          >
            <ArrowLeft className="w-3 h-3" /> Back_To_System
          </button>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-tight mb-8">
            This is not a <br />
            <span className="italic text-[#C5A059]">Sales Call.</span>
          </h1>
          
          <div className="space-y-6 max-w-md">
            <p className="font-sans text-sm md:text-base font-light opacity-80 leading-relaxed">
              I don't employ salespeople. When you book an audit, you are speaking directly to me (The Architect).
            </p>
            <p className="font-sans text-sm md:text-base font-light opacity-80 leading-relaxed">
              We will review your current architecture, identify the leakage, and determine if my systems can close the gap.
            </p>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="w-full h-[1px] bg-white/10 mb-6" />
          <div className="flex items-center gap-4 opacity-50 font-mono text-[9px] uppercase tracking-[0.2em]">
            <span>[ SYDNEY_BASED ]</span>
            <span>[ GLOBAL_DEPLOYMENT ]</span>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: THE LOGIC INTERFACE (SCROLLABLE) */}
      <div className="lg:w-7/12 min-h-screen bg-[#FFF2EC] text-[#1a1a1a] p-8 md:p-12 lg:p-20 flex flex-col justify-center">
        
        {!isSent ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-12">
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#E21E3F] font-bold block mb-4">
                // INITIATE AUDIT SEQUENCE
              </span>
              <p className="font-sans text-xl font-light text-[#1a1a1a]/70 max-w-xl">
                Please configure your request parameters below. Precision is required.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 max-w-lg">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group">
                  <label className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#1a1a1a]/40 mb-2 group-focus-within:text-[#E21E3F] transition-colors">
                    Identification // Name
                  </label>
                  <input 
                    type="text" 
                    required
                    className="w-full bg-transparent border-b border-[#1a1a1a]/20 py-3 text-[#1a1a1a] font-serif text-xl focus:outline-none focus:border-[#E21E3F] transition-colors placeholder:text-[#1a1a1a]/10"
                    placeholder="Enter full name"
                    value={formState.name}
                    onChange={e => setFormState({...formState, name: e.target.value})}
                  />
                </div>
                <div className="group">
                  <label className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#1a1a1a]/40 mb-2 group-focus-within:text-[#E21E3F] transition-colors">
                    Communication // Email
                  </label>
                  <input 
                    type="email" 
                    required
                    className="w-full bg-transparent border-b border-[#1a1a1a]/20 py-3 text-[#1a1a1a] font-serif text-xl focus:outline-none focus:border-[#E21E3F] transition-colors placeholder:text-[#1a1a1a]/10"
                    placeholder="name@company.com"
                    value={formState.email}
                    onChange={e => setFormState({...formState, email: e.target.value})}
                  />
                </div>
              </div>

              <div className="group">
                <label className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#1a1a1a]/40 mb-2 group-focus-within:text-[#E21E3F] transition-colors">
                  Entity // Company URL
                </label>
                <input 
                  type="url" 
                  className="w-full bg-transparent border-b border-[#1a1a1a]/20 py-3 text-[#1a1a1a] font-serif text-xl focus:outline-none focus:border-[#E21E3F] transition-colors placeholder:text-[#1a1a1a]/10"
                  placeholder="https://company.com"
                  value={formState.company}
                  onChange={e => setFormState({...formState, company: e.target.value})}
                />
              </div>

              <div className="group">
                <label className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#1a1a1a]/40 mb-4 group-focus-within:text-[#E21E3F] transition-colors">
                  System_Failure_Point // Select Pillar
                </label>
                <div className="relative">
                  <select 
                    className="w-full bg-transparent border-b border-[#1a1a1a]/20 py-3 text-[#1a1a1a] font-serif text-xl focus:outline-none focus:border-[#E21E3F] transition-colors appearance-none rounded-none cursor-pointer"
                    value={formState.frictionPoint}
                    onChange={e => setFormState({...formState, frictionPoint: e.target.value})}
                  >
                    {systems.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <Terminal className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1a1a1a]/30 pointer-events-none" />
                </div>
              </div>

              <div className="group">
                <label className="block font-mono text-[9px] uppercase tracking-[0.2em] text-[#1a1a1a]/40 mb-2 group-focus-within:text-[#E21E3F] transition-colors flex items-center gap-2">
                   <AlertTriangle className="w-3 h-3" /> Bleeding_Neck // Define Friction
                </label>
                <textarea 
                  rows={2}
                  className="w-full bg-[#1a1a1a]/5 border-l-2 border-[#1a1a1a]/20 p-4 text-[#1a1a1a] font-sans text-base focus:outline-none focus:border-[#E21E3F] transition-colors placeholder:text-[#1a1a1a]/30 resize-none"
                  placeholder="Describe the problem in 1 sentence (e.g. 'We are losing 30% of leads because we miss calls')"
                  value={formState.bleedingNeck}
                  onChange={e => setFormState({...formState, bleedingNeck: e.target.value})}
                />
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="group w-full relative h-16 bg-[#1a1a1a] text-[#FFF2EC] overflow-hidden flex items-center justify-center mt-8 disabled:opacity-50"
              >
                <div className="absolute inset-0 bg-[#E21E3F] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                <span className="relative z-10 font-mono text-xs uppercase tracking-[0.3em] font-bold flex items-center gap-4">
                  {isSubmitting ? 'PROCESSING...' : '[ INITIATE_AUDIT_SEQUENCE ]'}
                  {!isSubmitting && <ArrowRight className="w-4 h-4" />}
                </span>
              </button>
              
            </form>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md">
             <div className="w-16 h-16 bg-[#C5A059] rounded-full flex items-center justify-center mb-8">
               <Check className="w-8 h-8 text-[#1a1a1a]" />
             </div>
             <h2 className="font-serif text-4xl text-[#1a1a1a] mb-6">Request Logged.</h2>
             <p className="font-sans text-lg font-light opacity-70 mb-8">
               Your audit parameters have been received. I will review your architecture and respond within 24 hours.
             </p>
             <button onClick={onBack} className="font-mono text-xs uppercase tracking-[0.2em] border-b border-[#1a1a1a] pb-1 hover:text-[#E21E3F] hover:border-[#E21E3F] transition-colors">
               Return to System
             </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;