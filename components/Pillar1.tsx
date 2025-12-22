
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Zap, Shield, Layers, Target, Activity, CheckCircle2 } from 'lucide-react';

interface Pillar1Props {
  onBack: () => void;
}

const Pillar1: React.FC<Pillar1Props> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const serviceTiers = [
    {
      id: 'TIER_I',
      title: 'Local Velocity',
      desc: 'A lead-gen machine engineered for local dominance. Focus on capture and conversion logic for trades and expert consultants.',
      icon: Target
    },
    {
      id: 'TIER_II',
      title: 'Retail Ecosystem',
      desc: 'Shopify-driven high-converting storefronts. Optimized for LTV maximization and frictionless mechanical checkout protocols.',
      icon: Globe
    },
    {
      id: 'TIER_III',
      title: 'Performance Architecture',
      desc: 'Instant-loading, unhackable Next.js builds. Engineered for deep CRM integration and enterprise-grade security.',
      icon: Zap
    },
    {
      id: 'TIER_IV',
      title: 'Flagship Experience',
      desc: 'Bespoke, headless "Digital Theatre" designed for high-end brands. Cinematic UI combined with mechanical reliability.',
      icon: Layers
    }
  ];

  const roadmap = [
    { day: '01', title: 'Architecture', task: 'Logic gate mapping and data flow configuration.' },
    { day: '02', title: 'Blueprint', task: 'UX/UI wireframing for high-intent capture zones.' },
    { day: '03-05', title: 'Deployment', task: 'Mechanical build and API/CRM stack integration.' },
    { day: '06', title: 'Stress Test', task: 'Protocol verification and load-balancing checks.' },
    { day: '07', title: 'Launch', task: 'Active Monitoring status initiated.' }
  ];

  // Fix: added casting to any for ease property to satisfy Framer Motion's complex Easing type definition
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
      {/* BLUEPRINT GRID BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0" 
           style={{ backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)', backgroundSize: '60px 60px' }}>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 pt-32">
        
        {/* TOP NAV & MONO LABEL */}
        <div className="flex justify-between items-center mb-16">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            [ ARCHITECTURE OVERVIEW )
          </button>
          <div className="font-mono text-[9px] text-black/40 uppercase tracking-[0.4em]">
            [ PILLAR_01 // REF_GRID_V.1 ]
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="mb-40">
          {/* Fix: casting variants to any to bypass strict index signature checks */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariants as any}>
            <span className="font-mono text-xs text-[#E21E3F] tracking-[0.4em] mb-6 block uppercase">/ Demand_Capture_Engine</span>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-[9rem] leading-[0.9] tracking-tighter mb-10">
              The Digital <br />
              <span className="italic text-[#C5A059]">Face</span> of the Machine.
            </h1>
            <p className="font-sans text-xl md:text-2xl font-light text-[#1a1a1a]/70 max-w-3xl leading-relaxed border-l border-black/20 pl-8">
              We don't build websites. We engineer high-velocity capture terminals designed to stop revenue leakage.
            </p>
          </motion.div>
        </section>

        {/* PHILOSOPHY BLOCK */}
        <section className="mb-40 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6">
            {/* Fix: casting variants to any to bypass strict index signature checks */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariants as any}>
              <h2 className="font-serif text-4xl md:text-5xl mb-8 italic">Passive Billboards <br />vs Data Systems.</h2>
              <div className="space-y-6 text-lg text-black/60 font-light leading-relaxed">
                <p>Most websites are digital graveyards. Passive brochures that wait for permission to be seen. Our architecture is active—engineered to trigger intent, capture demand, and process leads in real-time.</p>
                <p>Every pixel is a logic gate. Every interaction is mapped to your CRM. If a user lands, they are processed.</p>
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-6 relative aspect-square bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
             <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_#C5A059_1px,_transparent_1px)] bg-[size:20px_20px]"></div>
             <div className="text-[#C5A059] animate-pulse">
                <Target className="w-32 h-32 stroke-[0.5]" />
             </div>
             <div className="absolute bottom-6 left-6 font-mono text-[9px] text-white/30 tracking-widest">
                VERIFYING_PROTOCOL_01... [ OK ]
             </div>
          </div>
        </section>

        {/* SERVICE TIERS */}
        <section className="mb-40">
          <div className="border-t border-black/10 pt-20 mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
            <h2 className="font-serif text-5xl italic">Service Tiers.</h2>
            <span className="font-mono text-[10px] text-black/40 uppercase tracking-widest">/ NO_PRICE_FLUFF // EXECUTION_ONLY</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 bg-black/5 border border-black/5">
            {serviceTiers.map((tier) => (
              <motion.div 
                key={tier.id}
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }} 
                /* Fix: casting variants to any to bypass strict index signature checks */
                variants={revealVariants as any}
                className="bg-[#FFF2EC] p-10 flex flex-col justify-between hover:bg-white transition-colors duration-500 group"
              >
                <div>
                  <span className="font-mono text-[9px] text-[#C5A059] mb-8 block tracking-widest uppercase">{tier.id}</span>
                  <tier.icon className="w-8 h-8 mb-6 text-black/20 group-hover:text-[#E21E3F] transition-colors" />
                  <h3 className="font-serif text-3xl mb-4 leading-none">{tier.title}</h3>
                  <p className="font-sans text-sm text-black/50 leading-relaxed">{tier.desc}</p>
                </div>
                <div className="mt-12 pt-8 border-t border-black/5">
                   <button className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-widest text-[#E21E3F]">
                      Protocol Specs <ArrowLeft className="w-3 h-3 rotate-180" />
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ROADMAP SPRINT */}
        <section className="mb-40 py-24 bg-[#1a1a1a] text-white px-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
             <Activity className="w-48 h-48" />
          </div>
          <div className="max-w-xl mb-16 relative z-10">
            <span className="font-mono text-[10px] text-[#C5A059] tracking-widest uppercase block mb-4">/ VELOCITY_LOGISTICS</span>
            <h2 className="font-serif text-5xl mb-6 italic">The 7-Day Sprint.</h2>
            <p className="font-sans text-white/50 leading-relaxed">Velocity is the only metric that matters. We don't sit in discovery meetings for months. We deploy.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border border-white/10 relative z-10">
            {roadmap.map((step) => (
              <div key={step.day} className="p-8 border-r border-white/10 last:border-0 hover:bg-white/5 transition-colors">
                <span className="font-mono text-[9px] text-[#C5A059]">DAY {step.day}</span>
                <h4 className="font-serif text-2xl mt-4 mb-2">{step.title}</h4>
                <p className="font-sans text-[11px] text-white/40 leading-relaxed">{step.task}</p>
              </div>
            ))}
          </div>
        </section>

        {/* RETAINER PROTOCOLS */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-16 pt-20 border-t border-black/10">
          <div className="lg:col-span-5">
            <span className="font-mono text-[10px] text-[#C5A059] tracking-widest uppercase block mb-4">/ ASSET_PROTECTION</span>
            <h2 className="font-serif text-5xl italic leading-tight">Post-Launch <br />Maintenance.</h2>
            <p className="font-sans text-lg text-black/50 mt-6 leading-relaxed">Software decays without attention. Our protocols ensure your revenue engine remains shielded from entropy.</p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 border border-black/10 bg-white shadow-sm">
              <Shield className="w-10 h-10 text-[#C5A059] mb-8" />
              <h4 className="font-serif text-2xl mb-4">Digital Insurance</h4>
              <p className="font-sans text-sm text-black/50 leading-relaxed">Daily backups, security hardening, and real-time uptime monitoring. Ensuring 0% stall time.</p>
            </div>
            <div className="p-10 bg-[#1a1a1a] text-white">
              <Zap className="w-10 h-10 text-[#E21E3F] mb-8" />
              <h4 className="font-serif text-2xl mb-4">Growth Ops</h4>
              <p className="font-sans text-white/50 text-sm leading-relaxed">Continuous CRO, landing page variants, and data-flow calibration to keep your acquisition cost dropping.</p>
            </div>
          </div>
        </section>

        <div className="py-12 border-t border-black/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-black/40">PROTOCOL_AUTHENTICATED // SYSTEM_READY</span>
          </div>
          <button onClick={onBack} className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#E21E3F] hover:underline underline-offset-4">
            Return to HQ
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Pillar1;
