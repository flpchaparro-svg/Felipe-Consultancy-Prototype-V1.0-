
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Mic, Globe, Zap, Layers, CheckCircle2, Activity } from 'lucide-react';

interface Pillar3Props {
  onBack: () => void;
}

const Pillar3: React.FC<Pillar3Props> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const serviceModules = [
    {
      id: 'MOD_A',
      title: 'Synthetic Voice Studio',
      desc: 'Decouple presence from output. Using AI voice cloning to produce studio-quality audio/video assets without you ever needing to be on camera.',
      icon: Mic
    },
    {
      id: 'MOD_B',
      title: 'The Authority Matrix',
      desc: 'Semantic SEO architecture. Building a "Knowledge Graph" using topic clusters that force search engines to recognize you as the definitive expert.',
      icon: Globe
    },
    {
      id: 'MOD_C',
      title: 'The Distribution Grid',
      automated: true,
      desc: 'Automated routing infrastructure. A system where you drop a file in a folder and it is automatically formatted and published across every channel.',
      icon: Share2
    },
    {
      id: 'MOD_D',
      title: 'Conversion Terminals',
      desc: 'Rapid-deployment assets. High-velocity landing pages designed purely for data capture, decoupled from your main site for testing velocity.',
      icon: Layers
    }
  ];

  const sprintRoadmap = [
    { day: '01', title: 'Extraction', task: 'Expertise mining and synthetic voice/identity cloning.' },
    { day: '02', title: 'Templates', task: 'Visual identity mapping and asset component engineering.' },
    { day: '03-04', title: 'Production', task: 'Supply chain linkage and automation flow configuration.' },
    { day: '05', title: 'Deployment', task: 'System live. Automated distribution grid activated.' }
  ];

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.25, 1, 0.5, 1] as any 
      } 
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="relative min-h-screen w-full bg-[#FFF2EC] text-[#1a1a1a] pb-20 overflow-x-hidden"
    >
      {/* INDUSTRIAL SUPPLY CHAIN BACKGROUND EFFECT */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <svg className="w-full h-full opacity-[0.05]" viewBox="0 0 1400 1000">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#1a1a1a" />
            </marker>
          </defs>
          <path d="M100 200 L400 200 L400 400 L700 400 L700 600 L1000 600 L1000 800" fill="none" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="5,5" markerEnd="url(#arrowhead)" />
          <path d="M200 800 L200 500 L500 500 L500 200" fill="none" stroke="#1a1a1a" strokeWidth="1" strokeDasharray="5,5" markerEnd="url(#arrowhead)" />
          
          <text x="110" y="190" className="font-mono text-[10px] uppercase fill-current">[ INPUT ]</text>
          <text x="410" y="390" className="font-mono text-[10px] uppercase fill-current">[ PROCESSING ]</text>
          <text x="1010" y="790" className="font-mono text-[10px] uppercase fill-current">[ DISTRIBUTION ]</text>
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 pt-32">
        
        {/* NAVIGATION & MONO LABEL */}
        <div className="flex justify-between items-center mb-16">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            [ ARCHITECTURE OVERVIEW )
          </button>
          <div className="font-mono text-[9px] text-black/40 uppercase tracking-[0.4em]">
            [ PILLAR_03 // LOGISTICS_ENGINE_V.3 ]
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="mb-40">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariants as any}>
            <span className="font-mono text-xs text-[#E21E3F] tracking-[0.4em] mb-6 block uppercase">/ Media_Manufacturing_Engine</span>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.9] tracking-tighter mb-10">
              From Expertise <br />
              to <span className="italic text-[#C5A059]">Digital Assets.</span>
            </h1>
            <p className="font-sans text-xl md:text-2xl font-light text-[#1a1a1a]/70 max-w-3xl leading-relaxed border-l border-black/20 pl-8">
              We don't create "content." We engineer a manufacturing supply chain that turns your intellectual capital into an automated 24/7 omnipresence.
            </p>
          </motion.div>
        </section>

        {/* PHILOSOPHY BLOCK */}
        <section className="mb-40 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariants as any}>
              <h2 className="font-serif text-5xl md:text-6xl mb-8 italic">The Content Supply Chain.</h2>
              <div className="space-y-6 text-lg text-black/60 font-light leading-relaxed max-w-2xl">
                <p>Most businesses suffer from "Random Acts of Marketing." Content is treated as a chore, not a commodity. We transform this by treating media as an industrial process.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="border-l border-[#C5A059] pl-6 py-2">
                    <span className="font-mono text-[10px] text-black/40 block mb-1">RAW MATERIAL</span>
                    <span className="font-serif text-xl">Expert Ideas</span>
                  </div>
                  <div className="border-l border-[#C5A059] pl-6 py-2">
                    <span className="font-mono text-[10px] text-black/40 block mb-1">PROCESSING</span>
                    <span className="font-serif text-xl">AI & Synthetic Editing</span>
                  </div>
                  <div className="border-l border-[#C5A059] pl-6 py-2">
                    <span className="font-mono text-[10px] text-black/40 block mb-1">DISTRIBUTION</span>
                    <span className="font-serif text-xl">Automated Social Grid</span>
                  </div>
                  <div className="border-l border-[#C5A059] pl-6 py-2">
                    <span className="font-mono text-[10px] text-black/40 block mb-1">INVENTORY</span>
                    <span className="font-serif text-xl">SEO Authority</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-5 relative bg-[#1a1a1a] p-12 overflow-hidden shadow-2xl">
             <div className="absolute inset-0 opacity-10 bg-[linear-gradient(45deg,#C5A059_1px,transparent_1px),linear-gradient(-45deg,#C5A059_1px,transparent_1px)] bg-[size:20px_20px]"></div>
             <div className="relative z-10 flex flex-col items-center">
                <Layers className="w-24 h-24 text-[#C5A059] stroke-[1]" />
                <div className="mt-8 space-y-2 w-full">
                  <div className="h-1 bg-[#C5A059]/20 w-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-[#C5A059]"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <div className="flex justify-between font-mono text-[8px] text-white/40 tracking-widest uppercase">
                    <span>ASSET_ID: 99x2</span>
                    <span>READY_FOR_GRID</span>
                  </div>
                </div>
             </div>
          </div>
        </section>

        {/* SERVICE MODULES */}
        <section className="mb-40">
          <div className="border-t border-black/10 pt-20 mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
            <h2 className="font-serif text-5xl italic">Logistics Modules.</h2>
            <span className="font-mono text-[10px] text-black/40 uppercase tracking-widest">/ OMNIPRESENCE_INFRASTRUCTURE</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 bg-black/5 border border-black/5">
            {serviceModules.map((mod) => (
              <motion.div 
                key={mod.id}
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                variants={revealVariants as any}
                className="bg-[#FFF2EC] p-10 flex flex-col justify-between hover:bg-white transition-colors duration-500 group"
              >
                <div>
                  <span className="font-mono text-[9px] text-[#E21E3F] mb-8 block tracking-widest uppercase">{mod.id}</span>
                  <mod.icon className="w-8 h-8 mb-6 text-black/20 group-hover:text-[#C5A059] transition-colors" />
                  <h3 className="font-serif text-3xl mb-4 leading-none">{mod.title}</h3>
                  <p className="font-sans text-sm text-black/50 leading-relaxed">{mod.desc}</p>
                </div>
                <div className="mt-12 pt-8 border-t border-black/5">
                   <button className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-[#C5A059]">
                      Grid Specs <Zap className="w-3 h-3" />
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5-DAY SPRINT ROADMAP */}
        <section className="mb-40 py-24 bg-[#1a1a1a] text-white px-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <Share2 className="w-64 h-64" />
          </div>
          <div className="max-w-xl mb-16 relative z-10">
            <span className="font-mono text-[10px] text-[#C5A059] tracking-widest uppercase block mb-4">/ LOGISTICS_SPRINT</span>
            <h2 className="font-serif text-5xl mb-6 italic">The 5-Day Sprint.</h2>
            <p className="font-sans text-white/50 leading-relaxed">Stop waiting for "inspiration." We install a factory that produces authority-building assets while you sleep.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-white/10 relative z-10">
            {sprintRoadmap.map((step) => (
              <div key={step.day} className="p-8 border-r border-white/10 last:border-0 hover:bg-white/5 transition-colors group">
                <span className="font-mono text-[9px] text-[#C5A059] group-hover:text-white transition-colors">DAY {step.day}</span>
                <h4 className="font-serif text-2xl mt-4 mb-2">{step.title}</h4>
                <p className="font-sans text-[11px] text-white/40 leading-relaxed">{step.task}</p>
              </div>
            ))}
          </div>
        </section>

        {/* RETAINER PROTOCOLS */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-16 pt-20 border-t border-black/10">
          <div className="lg:col-span-5">
            <span className="font-mono text-[10px] text-[#E21E3F] tracking-widest uppercase block mb-4">/ CONTINUOUS_CALIBRATION</span>
            <h2 className="font-serif text-5xl italic leading-tight">The Content <br />Factory.</h2>
            <p className="font-sans text-lg text-black/50 mt-6 leading-relaxed">Marketing is a maintenance item. Our retainers manage the grid APIs and produce ongoing "slices" of content to maintain high topical authority.</p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 border border-black/10 bg-white shadow-sm hover:border-[#C5A059] transition-colors group">
              <Activity className="w-10 h-10 text-[#C5A059] mb-8 group-hover:animate-pulse" />
              <h4 className="font-serif text-2xl mb-4">Grid Maintenance</h4>
              <p className="font-sans text-sm text-black/50 leading-relaxed">Ongoing management of APIs, scheduling logic, and distribution node optimization for maximum reach.</p>
            </div>
            <div className="p-10 bg-[#1a1a1a] text-white group">
              <Layers className="w-10 h-10 text-[#E21E3F] mb-8" />
              <h4 className="font-serif text-2xl mb-4">Authority Assets</h4>
              <p className="font-sans text-white/50 text-sm leading-relaxed">Continuous manufacturing of social slices and authority assets from your primary intellectual capital inputs.</p>
            </div>
          </div>
        </section>

        <div className="py-12 border-t border-black/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-black/40">SUPPLY_CHAIN_ACTIVE // OMNIPRESENCE_DEPLOYED</span>
          </div>
          <button onClick={onBack} className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#E21E3F] hover:underline underline-offset-4">
            Return to HQ
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Pillar3;
