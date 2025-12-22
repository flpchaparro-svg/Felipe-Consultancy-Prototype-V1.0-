import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Brain, Mic, ShieldCheck, Database, CheckCircle2, Activity, Zap } from 'lucide-react';

interface Pillar5Props {
  onBack: () => void;
}

const Pillar5: React.FC<Pillar5Props> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const serviceModules = [
    {
      id: 'MOD_A',
      title: '24/7 Growth Concierge',
      desc: 'An external SDR agent specifically for high-intent industries. Qualifies leads, handles FAQs, and books appointments across channels while the team sleeps.',
      icon: Brain
    },
    {
      id: 'MOD_B',
      title: 'The Internal Analyst',
      desc: 'A secure "Company Brain" trained on your SOPs and documentation. Reduces Time-to-Competency for new hires by answering operational queries instantly.',
      icon: Database
    },
    {
      id: 'MOD_C',
      title: 'Voice Interface AI',
      desc: 'Voice-native agents handling inbound phone calls with near-zero latency. Replaces legacy IVR with natural, human-sounding conversation.',
      icon: Mic
    },
    {
      id: 'MOD_D',
      title: 'Model Agnostic Architecture',
      desc: 'Safety-first engineering. We build "Walled Garden" environments that redact sensitive PII before it reaches a public LLM.',
      icon: ShieldCheck
    }
  ];

  const roadmap = [
    { day: '01', title: 'Knowledge', task: 'Expertise extraction and guardrail logic setup.' },
    { day: '02-04', title: 'Flow Design', task: 'Logic mapping and agentic reasoning path architecture.' },
    { day: '05-06', title: 'Simulation', task: 'Model fine-tuning and recursive edge-case testing.' },
    { day: '07', title: 'Deployment', task: 'Live system deployment and performance monitoring.' }
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
      {/* NEURAL LATTICE BACKGROUND EFFECT */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <svg className="w-full h-full opacity-[0.05]" viewBox="0 0 1400 1000">
          <pattern id="lattice" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
             <circle cx="2" cy="2" r="2" fill="#C5A059" />
             <line x1="2" y1="2" x2="200" y2="200" stroke="#C5A059" strokeWidth="0.5" />
             <line x1="2" y1="200" x2="200" y2="2" stroke="#C5A059" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#lattice)" />
        </svg>
        
        {/* Pulsing Neural Nodes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#E21E3F] rounded-full"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%` 
            }}
            animate={{ 
              scale: [1, 2, 1],
              opacity: [0.1, 0.4, 0.1],
              boxShadow: ["0 0 0px #E21E3F", "0 0 15px #E21E3F", "0 0 0px #E21E3F"]
            }}
            transition={{ 
              duration: 3 + Math.random() * 4, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 pt-32">
        
        {/* TOP NAV & MONO LABEL */}
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-6">
            <button 
              onClick={onBack}
              className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              [ ARCHITECTURE OVERVIEW )
            </button>
            <span className="font-mono text-[10px] text-black/20 uppercase tracking-[0.3em]">/ PILLAR_05</span>
          </div>
          <div className="font-mono text-[9px] text-black/40 uppercase tracking-[0.4em]">
            [ PILLAR_05 // AGENTIC_LOGIC_V.5 ]
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="mb-40">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariants as any}>
            <span className="font-mono text-xs text-[#E21E3F] tracking-[0.4em] mb-6 block uppercase">/ Cognitive_Infrastructure_Layer</span>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.9] tracking-tighter mb-10">
              The Cognitive <br />
              <span className="italic text-[#C5A059]">Layer</span> <br />
              of the Enterprise.
            </h1>
            <p className="font-sans text-xl md:text-2xl font-light text-[#1a1a1a]/70 max-w-3xl leading-relaxed border-l border-black/20 pl-8">
              Automation moves data. AI makes decisions. We engineer Digital Employees that read, reason, and respond with human-level logic 24/7.
            </p>
          </motion.div>
        </section>

        {/* PHILOSOPHY BLOCK */}
        <section className="mb-40 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariants as any}>
              <h2 className="font-serif text-4xl md:text-5xl mb-8 italic">Decoupling Sleep from Output.</h2>
              <div className="space-y-6 text-lg text-black/60 font-light leading-relaxed max-w-2xl">
                <p>The first wave of AI was generative—writing poems and drafting emails. The second wave is agentic. We build systems that don't just "chat," they execute. They manage unstructured data, follow SOPs, and close logic loops without human supervision.</p>
                <p>By moving from "Generative" to "Agentic," we allow your enterprise to decouple production from the human sleep cycle.</p>
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-5 relative bg-[#1a1a1a] p-12 overflow-hidden shadow-2xl">
             <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(197,160,89,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(197,160,89,0.1)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
             <div className="relative z-10 flex flex-col items-center">
                <Brain className="w-24 h-24 text-[#C5A059] stroke-[0.5] animate-pulse" />
                <div className="mt-8 font-mono text-[9px] text-white/40 tracking-[0.4em] uppercase text-center">
                   COGNITIVE_ARRAY_CONNECTED... [ READY ]
                </div>
             </div>
          </div>
        </section>

        {/* SERVICE MODULES */}
        <section className="mb-40">
          <div className="border-t border-black/10 pt-20 mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
            <h2 className="font-serif text-5xl italic">Agentic Modules.</h2>
            <span className="font-mono text-[10px] text-black/40 uppercase tracking-widest">/ DIGITAL_EMPLOYEE_FLOTILLA</span>
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
                      Agent Specs <Activity className="w-3 h-3" />
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 7-DAY SPRINT ROADMAP */}
        <section className="mb-40 py-24 bg-[#1a1a1a] text-white px-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <Activity className="w-64 h-64" />
          </div>
          <div className="max-w-xl mb-16 relative z-10">
            <span className="font-mono text-[10px] text-[#C5A059] tracking-widest uppercase block mb-4">/ COGNITIVE_VELOCITY</span>
            <h2 className="font-serif text-5xl mb-6 italic">The 7-Day Sprint.</h2>
            <p className="font-sans text-white/50 leading-relaxed">AI adoption shouldn't take quarters. We deploy functional cognitive units into your workflow in one business cycle.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-white/10 relative z-10">
            {roadmap.map((step) => (
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
            <span className="font-mono text-[10px] text-[#E21E3F] tracking-widest uppercase block mb-4">/ ONGOING_CALIBRATION</span>
            <h2 className="font-serif text-5xl italic leading-tight">Digital Salary.</h2>
            <p className="font-sans text-lg text-black/50 mt-6 leading-relaxed">Like any employee, AI agents require performance reviews and ongoing training. Our retainers ensure your models remain calibrated as your business evolves.</p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 border border-black/10 bg-white shadow-sm hover:border-[#C5A059] transition-colors group">
              <Zap className="w-10 h-10 text-[#C5A059] mb-8 group-hover:animate-pulse" />
              <h4 className="font-serif text-2xl mb-4">Prompt Optimization</h4>
              <p className="font-sans text-sm text-black/50 leading-relaxed">Continuous refinement of reasoning paths and guardrail logic to prevent hallucination and maintain zero-latency output.</p>
            </div>
            <div className="p-10 bg-[#1a1a1a] text-white group">
              <Database className="w-10 h-10 text-[#E21E3F] mb-8" />
              <h4 className="font-serif text-2xl mb-4 text-[#FFF2EC]">Knowledge Curation</h4>
              <p className="font-sans text-white/50 text-sm leading-relaxed">Ongoing ingestion of new SOPs, market data, and internal documentation to keep the "Company Brain" current.</p>
            </div>
          </div>
        </section>

        <div className="py-12 border-t border-black/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-black/40">AGENTIC_OS_ACTIVE // COGNITIVE_INFRASTRUCTURE_VERIFIED</span>
          </div>
          <button onClick={onBack} className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#E21E3F] hover:underline underline-offset-4">
            Back to Architecture HQ
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Pillar5;