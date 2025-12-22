import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="relative min-h-screen w-full bg-[#1a1a1a] text-[#FFF2EC] pb-20 overflow-x-hidden content-layer"
    >
      {/* Background Decor - Technical Grid */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.05]" 
           style={{ backgroundImage: 'linear-gradient(rgba(255, 242, 236, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 242, 236, 0.1) 1px, transparent 1px)', backgroundSize: '80px 80px' }}>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 pt-32">
        
        {/* TOP NAV */}
        <div className="flex justify-between items-center mb-16">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-[#FFF2EC]/60 hover:text-[#C5A059] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            [ RETURN_HOME )
          </button>
          <div className="font-mono text-[9px] text-[#FFF2EC]/20 uppercase tracking-[0.4em]">
            [ TERMINAL_INTAKE // REVENUE_OPS_v.1 ]
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-xs text-[#E21E3F] tracking-[0.4em] mb-6 block uppercase">/ Diagnostic_Protocol</span>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.9] tracking-tighter mb-10">
              Initiate the <br />
              <span className="italic text-[#C5A059]">Diagnostic.</span>
            </h1>
            <p className="font-sans text-xl md:text-2xl font-light text-[#FFF2EC]/50 max-w-3xl leading-relaxed border-l border-[#FFF2EC]/10 pl-8">
              Do not send a generic inquiry. Tell us where the machine is breaking. We respond with logic, not a sales pitch.
            </p>
          </motion.div>
        </section>

        {/* FORM SECTION */}
        <div className="max-w-4xl py-20 border-t border-white/5">
          <form className="space-y-20" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <div className="space-y-4">
                <label className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#FFF2EC]/30">01. Full_Name</label>
                <input 
                  type="text" 
                  placeholder="Identify Source_"
                  className="w-full bg-transparent border-b border-white/10 py-4 focus:border-[#C5A059] outline-none transition-colors font-serif text-2xl placeholder:text-white/5"
                />
              </div>
              <div className="space-y-4">
                <label className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#FFF2EC]/30">02. Corporate_Email</label>
                <input 
                  type="email" 
                  placeholder="node@enterprise.com"
                  className="w-full bg-transparent border-b border-white/10 py-4 focus:border-[#C5A059] outline-none transition-colors font-serif text-2xl placeholder:text-white/5"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#FFF2EC]/30">03. Operational_Friction</label>
              <textarea 
                rows={4}
                placeholder="Where is the revenue leaking? (Describe technical or process bottlenecks)"
                className="w-full bg-transparent border-b border-white/10 py-4 focus:border-[#C5A059] outline-none transition-colors font-serif text-2xl placeholder:text-white/5 resize-none"
              />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-12 pt-10">
              <div className="flex items-center gap-4 text-[#FFF2EC]/20">
                <ShieldCheck className="w-5 h-5" />
                <span className="font-mono text-[9px] uppercase tracking-widest text-white/40">Secure Log Transmission Active</span>
              </div>
              
              <button 
                type="submit"
                className="relative group px-12 py-6 border border-[#FFF2EC] overflow-hidden transition-all duration-300 bg-[#FFF2EC] text-[#1a1a1a] hover:text-[#FFF2EC] hover:border-[#C5A059]"
              >
                <div className="absolute inset-0 bg-[#1a1a1a] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)"></div>
                <span className="relative z-10 font-mono text-xs uppercase tracking-[0.2em] flex items-center gap-4">
                  [ SEND_SIGNAL ) <Send className="w-4 h-4" />
                </span>
              </button>
            </div>
          </form>
        </div>

        {/* Footer info inside the dark page */}
        <div className="py-12 border-t border-white/5 flex items-center justify-between gap-4 mt-20">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#FFF2EC]/30">CHANNEL_ENCRYPTED // STATION_01_READY</span>
          </div>
          <div className="font-mono text-[9px] text-[#FFF2EC]/10 uppercase tracking-[0.3em]">
            UTC+11 // SYDNEY_NODE
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;