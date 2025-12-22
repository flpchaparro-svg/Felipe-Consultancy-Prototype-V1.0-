import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, Microscope, Zap, Command, Cpu, Box, Activity, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] pt-32 pb-0 px-0 relative z-[150] overflow-x-hidden flex flex-col"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow">
        
        {/* 1. NAVIGATION */}
        <div className="flex justify-between items-center mb-24">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            / Return_to_Engine
          </button>
        </div>

        {/* 2. KINETIC HERO (BIG LETTERS) */}
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

        {/* 3. ABSTRACT IMAGE BREAK (No Photos of You) */}
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

        {/* 4. THE LENSES (Experience) */}
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

        {/* 5. ETHICS SECTION */}
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

      {/* FOOTER */}
      <footer id="footer" className="w-full bg-[#1a1a1a] text-[#FFF2EC] border-t border-white/10 relative z-30 pt-32 pb-12 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ffffff05,_transparent)] pointer-events-none"></div>
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-20 mb-20">
            <div className="max-w-2xl">
              <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block">/ TRANSMISSION_END</span>
              <h2 className="font-serif text-5xl md:text-8xl leading-[0.85] mb-8">Are we a<br /><span className="italic text-white/40">match?</span></h2>
              <div className="flex items-center gap-4 mt-8">
                <div className="relative w-2 h-2">
                  <div className="absolute inset-0 bg-[#E21E3F] rounded-full animate-ping opacity-75"></div>
                  <div className="relative w-2 h-2 bg-[#E21E3F] rounded-full"></div>
                </div>
                <span className="font-mono text-[10px] text-[#E21E3F] tracking-[0.2em] uppercase">STATUS: 1 SLOT AVAILABLE</span>
              </div>
            </div>
            <div className="mt-16 md:mt-0">
              <a href="https://meetings-ap1.hubspot.com/felipe" target="_blank" className="group flex flex-col items-start gap-1">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-white/40 group-hover:text-[#C5A059] transition-colors duration-300">01</span>
                  <span className="text-2xl md:text-3xl font-sans font-light border-b border-white/20 pb-1 group-hover:border-[#C5A059] group-hover:text-white transition-all duration-300">Initiate Growth Protocol</span>
                  <ArrowRight className="w-6 h-6 text-white/40 group-hover:text-[#C5A059] group-hover:translate-x-2 transition-all duration-300" />
                </div>
                <span className="text-[10px] font-mono text-white/30 tracking-widest pl-8 group-hover:text-white/60 transition-colors">[ Direct Strategy Call with Felipe ]</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
            <div>
              <span className="font-mono text-[10px] text-white/30 mb-8 block tracking-widest">/ INDEX</span>
              <ul className="space-y-4">
                <li><a href="#" onClick={(e) => { e.preventDefault(); onBack(); }} className="group flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"><span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#C5A059]">&gt;</span> Home</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="group flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"><span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#C5A059]">&gt;</span> Origins</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onBack(); setTimeout(() => { window.location.hash = 'architecture'; }, 100); }} className="group flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"><span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#C5A059]">&gt;</span> Architecture</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); onBack(); setTimeout(() => { window.location.hash = 'protocol'; }, 100); }} className="group flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"><span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#C5A059]">&gt;</span> Protocol</a></li>
              </ul>
            </div>
            <div>
              <span className="font-mono text-[10px] text-white/30 mb-8 block tracking-widest">/ LEGAL</span>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div className="md:col-span-1 flex flex-col justify-between h-full">
              <div className="mb-6">
                <span className="font-mono text-[10px] text-white/30 mb-2 block tracking-widest">/ SERVER_LOCATION</span>
                <p className="text-sm text-white/80">Sydney, Australia</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end pt-10 border-t border-white/10 text-[10px] font-mono text-white/30 uppercase tracking-widest">
            <span>© 2025 Felipe Chaparro. All Systems Nominal.</span>
            <div className="flex gap-6 mt-4 md:mt-0">
              <span>LATENCY: 8ms</span>
              <span>BUILD: v3.3.0</span>
            </div>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default AboutPage;