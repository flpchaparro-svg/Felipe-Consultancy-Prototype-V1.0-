
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Zap, Command, Box, Activity } from 'lucide-react';
import GlobalFooter from './GlobalFooter';

interface AboutPageProps {
  onBack: () => void;
  // Added missing onNavigate prop to match App.tsx implementation
  onNavigate: (view: 'landing' | 'about' | 'architecture' | 'digital-revenue', sectionId?: string) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack, onNavigate }) => {
  // Use a local handleNavigate to provide smooth scrolling when staying on the same view
  const handleNavigate = (view: 'landing' | 'about' | 'architecture' | 'digital-revenue', sectionId?: string) => {
    if (view === 'about') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNavigate(view, sectionId);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] pt-32 pb-0 px-0 relative z-[150] overflow-x-hidden flex flex-col"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow">
        
        <div className="flex justify-between items-center mb-24">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            / Return_to_Engine
          </button>
        </div>

        <div className="relative mb-64">
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 0.03 }}
            className="absolute -top-20 -left-20 pointer-events-none select-none"
          >
            <h1 className="font-serif text-[25vw] leading-none uppercase tracking-tighter">ORIGIN</h1>
          </motion.div>
          <div className="relative z-10">
            <h2 className="font-serif text-6xl md:text-8xl lg:text-[9rem] leading-[0.85] tracking-tight max-w-5xl">
              The Mind <br />
              Behind the <span className="italic text-[#C5A059]">Machine.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-64 items-center">
          <div className="lg:col-span-7 aspect-video bg-[#1a1a1a] relative overflow-hidden grayscale">
            <img 
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000" 
              alt="Technical Logic"
              className="w-full h-full object-cover opacity-40 hover:opacity-60 transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent"></div>
            <div className="absolute bottom-8 left-8 flex items-center gap-4">
              <Activity className="w-5 h-5 text-[#C5A059] animate-pulse" />
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">Logic_Stream_Verified</span>
            </div>
          </div>
          <div className="lg:col-span-5">
            <h3 className="font-serif text-4xl mb-6 italic">Built on Friction.</h3>
            <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed pl-8 border-l border-[#C5A059]">
              I don't believe in "Creative Agencies." I believe in **Systems Architecture.** My years managing teams and driving high-volume sales taught me that the biggest cost in business isn't lack of talent—it's **Friction.**
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-64 border-t border-black/10 pt-20">
          <div className="space-y-6">
            <Box className="w-6 h-6 text-[#C5A059]" />
            <h4 className="font-serif text-3xl">Management</h4>
            <p className="font-sans text-[#1a1a1a]/60">I've led teams of 50+. I know where data dies and where communication fails. I build systems to prevent the "Games of Telephone" that kill profits.</p>
          </div>
          <div className="space-y-6">
            <Zap className="w-6 h-6 text-[#C5A059]" />
            <h4 className="font-serif text-3xl">Marketing</h4>
            <p className="font-sans text-[#1a1a1a]/60">I understand conversion psychology. I don't build "pretty" sites; I build capture mechanisms that align with human behavior.</p>
          </div>
          <div className="space-y-6">
            <Command className="w-6 h-6 text-[#C5A059]" />
            <h4 className="font-serif text-3xl">Sales</h4>
            <p className="font-sans text-[#1a1a1a]/60">Everything I architect is a tool for revenue. If it doesn't move the needle on your ROI, I don't build it. Period.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-32">
          <div className="max-w-2xl">
            <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block uppercase">/ Work_Ethics</span>
            <h3 className="font-serif text-5xl leading-tight italic mb-8">Uncompromising <br />Logic.</h3>
            <p className="font-sans text-xl text-[#1a1a1a]/60 leading-relaxed mb-10">
              My personality is rooted in the "Build-Learn" loop. I am constantly acquiring new technical skills to ensure the "Engine" I build for you remains the most lethal version of itself.
            </p>
            <div className="flex items-center gap-6">
              <ShieldCheck className="w-10 h-10 text-[#C5A059]" />
              <div className="font-serif text-3xl">Felipe Chaparro</div>
            </div>
          </div>
        </div>
      </div>

      <GlobalFooter onNavigate={handleNavigate} />
    </motion.div>
  );
};

export default AboutPage;
