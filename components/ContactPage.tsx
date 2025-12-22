import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Send, ShieldCheck } from 'lucide-react';

interface ContactPageProps {
  onBack: () => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onBack }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subHeadline = "Do not send a generic inquiry. Tell us where the machine is breaking. We respond with logic, not a sales pitch.";
  
  const sentenceVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="relative min-h-screen w-full bg-[#FFF2EC] text-[#1a1a1a] pb-20 overflow-x-hidden content-layer"
    >
      {/* SYSTEM INPUT BACKGROUND EFFECT */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <div className="max-w-[1400px] mx-auto h-full px-6 md:px-12 lg:px-20 relative">
          <div className="absolute top-[20%] left-[10%] font-mono text-[14vw] text-black/[0.02] flex gap-20">
            <span>[</span>
            <span>]</span>
          </div>
          <motion.div 
            className="absolute bottom-[20%] right-[15%] font-mono text-4xl text-[#C5A059]/10"
            animate={{ opacity: [0, 1, 0] }}
            // Fix: Changed 'steps(1)' to 'linear' as 'steps()' strings are not natively supported in the framer-motion ease type.
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            _
          </motion.div>
        </div>
        
        <div className="absolute top-[15%] right-[5%] font-mono text-[9px] text-black/10 uppercase tracking-[0.5em] rotate-90 origin-right">
          [ TERMINAL_INTAKE // REVENUE_OPS_v.1 ]
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 pt-32">
        
        {/* TOP NAV / BREADCRUMB */}
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-6">
            <button 
              onClick={onBack}
              className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              [ RETURN_HOME )
            </button>
            <span className="font-mono text-[10px] text-black/20 uppercase tracking-[0.3em]">/ INITIATE_PROTOCOL</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
            <span className="font-mono text-[9px] text-black/40 uppercase tracking-[0.4em]">STATION_READY // ENCRYPTED_CHANNEL</span>
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="mb-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-mono text-xs text-[#E21E3F] tracking-[0.4em] mb-6 block uppercase">/ Diagnostic_Inquiry</span>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.9] tracking-tighter mb-10">
              Initiate the <br />
              <span className="italic text-[#C5A059]">Diagnostic.</span>
            </h1>
            
            <motion.p 
              variants={sentenceVariants}
              initial="hidden"
              animate="visible"
              className="font-sans text-xl md:text-2xl font-light text-[#1a1a1a]/70 max-w-3xl leading-relaxed border-l border-black/20 pl-8"
            >
              {subHeadline.split("").map((char, index) => (
                <motion.span key={index} variants={letterVariants}>
                  {char}
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
        </section>

        {/* DIAGNOSTIC FORM */}
        <div className="max-w-4xl mx-auto py-20 border-t border-black/5">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                <div className="space-y-4">
                  <label className="font-mono text-[10px] uppercase tracking-[0.4em] text-black/40">01. Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="Enter Identity_"
                    className="w-full bg-transparent border-b border-black/10 py-4 focus:border-[#C5A059] outline-none transition-colors font-serif text-2xl placeholder:text-black/10"
                  />
                </div>
                <div className="space-y-4">
                  <label className="font-mono text-[10px] uppercase tracking-[0.4em] text-black/40">02. Business Email</label>
                  <input 
                    required
                    type="email" 
                    placeholder="name@company.com"
                    className="w-full bg-transparent border-b border-black/10 py-4 focus:border-[#C5A059] outline-none transition-colors font-serif text-2xl placeholder:text-black/10"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="font-mono text-[10px] uppercase tracking-[0.4em] text-black/40">03. The Diagnostic Question</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Describe the Operational Friction (Where is the revenue leaking?)"
                  className="w-full bg-transparent border-b border-black/10 py-4 focus:border-[#C5A059] outline-none transition-colors font-serif text-2xl placeholder:text-black/10 resize-none"
                />
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center gap-12 pt-10">
                <div className="flex items-center gap-4 text-black/30">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-mono text-[9px] uppercase tracking-widest">End-to-end encryption active</span>
                </div>
                
                <button 
                  type="submit"
                  className="group relative px-16 py-6 bg-[#1a1a1a] text-white font-mono text-xs uppercase tracking-[0.3em] overflow-hidden transition-all duration-500 hover:bg-[#C5A059]"
                >
                  <span className="relative z-10 flex items-center gap-4">
                    [ SEND_SIGNAL ) <Send className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-20 text-center space-y-8"
            >
              <div className="inline-block p-6 bg-[#1a1a1a] rounded-full text-[#C5A059] mb-4">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="font-serif text-5xl italic">Signal Received.</h2>
              <p className="font-sans text-xl text-black/50 max-w-xl mx-auto leading-relaxed">
                The diagnostic request has been logged. Our strategist will analyze the friction points and respond with a technical brief within 24 hours.
              </p>
              <button 
                onClick={onBack}
                className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#E21E3F] hover:underline underline-offset-4"
              >
                Return to Command Center
              </button>
            </motion.div>
          )}
        </div>

        <div className="py-12 border-t border-black/10 flex items-center justify-between gap-4 mt-20">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-black/40">TERMINAL_NOMINAL // UPLINK_STANDBY</span>
          </div>
          <div className="font-mono text-[9px] text-black/20 uppercase tracking-[0.3em]">
            SYDNEY_AU // UTC+11
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;