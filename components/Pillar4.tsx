import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Cpu, GitMerge, Repeat, CheckCircle2, Activity, Shield } from 'lucide-react';

interface Pillar4Props {
  onBack: () => void;
}

const Pillar4: React.FC<Pillar4Props> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const serviceModules = [
    {
      id: 'MOD_A',
      title: 'The Cognitive Bridge',
      desc: 'Intelligent routing protocols that transform messy text, emails, and unstructured data into clean, actionable database entries using advanced LLM parsing.',
      icon: Cpu
    },
    {
      id: 'MOD_B',
      title: 'Behavioral Email Engine',
      desc: 'Event-driven communication systems that trigger high-impact messaging at the precise moment of user influence, maximizing conversion and LTV.',
      icon: Repeat
    },
    {
      id: 'MOD_C',
      title: 'Fulfillment Autopilot',
      desc: 'Zero-lag onboarding infrastructure connecting Stripe, Jira, and Slack to initiate complex projects instantly without manual oversight.',
      icon: GitMerge
    },
    {
      id: 'MOD_D',
      title: 'Content Velocity Factory',
      desc: 'Multi-model AI pipelines that repurpose raw intellectual capital into 30 days of omni-channel assets with a single point of input.',
      icon: Zap
    }
  ];

  const roadmap = [
    { day: '01', title: 'Mapping', task: 'Logic discovery and operational friction mapping.' },
    { day: '02-03', title: 'Architecture', task: 'Logic gate configuration and API linkage mapping.' },
    { day: '04-05', title: 'The Build', task: 'Mechanical assembly of the automation infrastructure.' },
    { day: '06', title: 'Testing', task: 'Stress testing and edge-case protocol refinement.' },
    { day: '07', title: 'Deployment', task: 'Active system monitoring and live data flow.' }
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
      {/* LOGIC FLOW MATRIX BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" 
             style={{ backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)', backgroundSize: '100px 100px' }}>
        </div>
        
        {/* Animated Pulses on Grid Junctions */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-[#C5A059] rounded-full"
            style={{ 
              top: `${Math.floor(Math.random() * 10) * 10}%`, 
              left: `${Math.floor(Math.random() * 10) * 10}%` 
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
              boxShadow: ["0 0 0px #C5A059", "0 0 10px #C5A059", "0 0 0px #C5A059"]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              delay: i * 0.5,
              ease: "easeInOut"
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
            <span className="font-mono text-[10px] text-black/20 uppercase tracking-[0.3em]">/ PILLAR_04</span>
          </div>
          <div className="font-mono text-[9px] text-black/40 uppercase tracking-[0.4em]">
            [ PILLAR_04 // CODE_LEVERAGE_V.4 ]
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="mb-40">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariants as any}>
            <span className="font-mono text-xs text-[#E21E3F] tracking-[0.4em] mb-6 block uppercase">/ Operational_Leverage_Engine</span>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.9] tracking-tighter mb-10">
              The Digital <br />
              <span className="italic text-[#C5A059]">Musculature</span> <br />
              of Revenue.
            </h1>
            <p className="font-sans text-xl md:text-2xl font-light text-[#1a1a1a]/70 max-w-3xl leading-relaxed border-l border-black/20 pl-8">
              We don’t sell Zapier connections. We engineer code leverage that transforms your team from data-entry clerks into high-leverage strategists.
            </p>
          </motion.div>
        </section>

        {/* PHILOSOPHY BLOCK */}
        <section className="mb-40 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariants as any}>
              <h2 className="font-serif text-4xl md:text-5xl mb-8 italic">Labor vs Code Leverage.</h2>
              <div className="space-y-6 text-lg text-black/60 font-light leading-relaxed max-w-2xl">
                <p>Most businesses solve growth by hiring more people. This is Labor Leverage. It is expensive, slow, and linear. We solve growth by building autonomous infrastructure. This is Code Leverage.</p>
                <p className="font-serif text-2xl text-[#1a1a1a] italic border-b border-[#C5A059]/30 pb-4 inline-block">
                  "Humans should do strategy and empathy. Robots should do the rest."
                </p>
                <p>We decouple your output from your headcount, allowing you to scale with zero marginal cost of operation.</p>
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-5 relative bg-[#1a1a1a] p-12 overflow-hidden shadow-2xl">
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#C5A059_1px,_transparent_1px)] bg-[size:15px_15px]"></div>
             <div className="relative z-10 flex flex-col items-center">
                <Repeat className="w-24 h-24 text-[#C5A059] stroke-[0.5] animate-spin-slow" />
                <div className="mt-8 font-mono text-[9px] text-white/40 tracking-[0.4em] uppercase">
                   REVENUE_OS_CALIBRATED... [ OK ]
                </div>
             </div>
          </div>
        </section>

        {/* SERVICE MODULES */}
        <section className="mb-40">
          <div className="border-t border-black/10 pt-20 mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
            <h2 className="font-serif text-5xl italic">Automation Modules.</h2>
            <span className="font-mono text-[10px] text-black/40 uppercase tracking-widest">/ INFRASTRUCTURE_DEPLOYMENT</span>
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
                      Logic Specs <ArrowLeft className="w-3 h-3 rotate-180" />
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 7-DAY SPRINT ROADMAP */}
        <section className="mb-40 py-24 bg-[#1a1a1a] text-white px-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <GitMerge className="w-64 h-64" />
          </div>
          <div className="max-w-xl mb-16 relative z-10">
            <span className="font-mono text-[10px] text-[#C5A059] tracking-widest uppercase block mb-4">/ AUTOMATION_VELOCITY</span>
            <h2 className="font-serif text-5xl mb-6 italic">The 7-Day Sprint.</h2>
            <p className="font-sans text-white/50 leading-relaxed">Complexity is the enemy of reliability. We map, build, and deploy high-leverage logic in one working cycle.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border border-white/10 relative z-10">
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
            <span className="font-mono text-[10px] text-[#E21E3F] tracking-widest uppercase block mb-4">/ IaaS_ARCHITECTURE</span>
            <h2 className="font-serif text-5xl italic leading-tight">Infrastructure <br />as a Service.</h2>
            <p className="font-sans text-lg text-black/50 mt-6 leading-relaxed">Software interfaces change daily. Our maintenance protocols ensure your logic gates never break as external platforms update.</p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 border border-black/10 bg-white shadow-sm hover:border-[#C5A059] transition-colors group">
              <Activity className="w-10 h-10 text-[#C5A059] mb-8 group-hover:animate-pulse" />
              <h4 className="font-serif text-2xl mb-4">Uptime Monitoring</h4>
              <p className="font-sans text-sm text-black/50 leading-relaxed">Real-time surveillance of API health and payload integrity. We fix bottlenecks before they cost you revenue.</p>
            </div>
            <div className="p-10 bg-[#1a1a1a] text-white group">
              <Shield className="w-10 h-10 text-[#E21E3F] mb-8" />
              <h4 className="font-serif text-2xl mb-4">Logic Hardening</h4>
              <p className="font-sans text-white/50 text-sm leading-relaxed">Continuous refinement of error-handling protocols and recursive logic to ensure 99.9% automated success rates.</p>
            </div>
          </div>
        </section>

        <div className="py-12 border-t border-black/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-black/40">CODE_LEVERAGE_ENGAGED // MUSCULATURE_ACTIVE</span>
          </div>
          <button onClick={onBack} className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#E21E3F] hover:underline underline-offset-4">
            Return to HQ
          </button>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </motion.div>
  );
};

export default Pillar4;