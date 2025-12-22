import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BarChart3, Eye, Search, TrendingUp, CheckCircle2, Activity, Shield } from 'lucide-react';

interface Pillar7Props {
  onBack: () => void;
}

const Pillar7: React.FC<Pillar7Props> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const serviceModules = [
    {
      id: 'MOD_A',
      title: 'The Control Tower',
      desc: 'Centralized executive dashboards (Looker Studio/PowerBI) that aggregate GA4, HubSpot, and Xero into one screen. Blended ROAS and real-time P&L visibility.',
      icon: BarChart3
    },
    {
      id: 'MOD_B',
      title: 'The Conversion Lab',
      desc: 'Qualitative behavioral analysis. We watch session recordings (Clarity/Hotjar) to find exactly where users "rage click" and abandon your checkout flow.',
      icon: Eye
    },
    {
      id: 'MOD_C',
      title: 'The Predictive Oracle',
      desc: 'Forward-looking modeling using Python/Pandas. We model historical CRM data to tell you exactly how many leads you need today to hit your 90-day target.',
      icon: TrendingUp
    },
    {
      id: 'MOD_D',
      title: 'Data Hygiene Sprint',
      desc: 'A forensic database scrub. We remove duplicates, fix capitalization issues (Jane vs JANE), and verify emails to protect your domain reputation.',
      icon: Search
    }
  ];

  const roadmap = [
    { day: '01', title: 'Tracking Audit', task: 'Current data integrity and attribution logic audit.' },
    { day: '02-04', title: 'API Connectivity', task: 'Establishing secure pipelines between fragmented silos.' },
    { day: '05', title: 'Architecture', task: 'Visual dashboard layout and executive metric mapping.' },
    { day: '06', title: 'Logic Calibration', task: 'Stress testing data accuracy and weighting logic.' },
    { day: '07', title: 'Live Training', task: 'Active deployment and executive system training.' }
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
      {/* DATA VISUALIZATION GRID BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)', backgroundSize: '150px 150px' }}>
        </div>
        
        {/* Flickering Chart Elements */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute opacity-[0.1]"
              style={{ 
                top: `${Math.random() * 80 + 10}%`, 
                left: `${Math.random() * 80 + 10}%`,
              }}
              animate={{ 
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{ 
                duration: 2 + Math.random() * 3, 
                repeat: Infinity, 
                ease: "linear",
                delay: i * 0.4
              }}
            >
              <svg width="120" height="80" viewBox="0 0 120 80">
                 <rect x="0" y="60" width="15" height="20" fill="#C5A059" />
                 <rect x="25" y="40" width="15" height="40" fill="#C5A059" />
                 <rect x="50" y="20" width="15" height="60" fill="#C5A059" />
                 <rect x="75" y="50" width="15" height="30" fill="#C5A059" />
                 <rect x="100" y="10" width="15" height="70" fill="#E21E3F" />
              </svg>
            </motion.div>
          ))}
        </div>

        {/* Floating Technical Label */}
        <div className="absolute top-[15%] right-[5%] font-mono text-[9px] text-black/10 uppercase tracking-[0.5em] rotate-90 origin-right">
          [ PILLAR_07 // CONTROL_TOWER_V.7 ]
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 pt-32">
        
        {/* TOP NAV & BREADCRUMB */}
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-6">
            <button 
              onClick={onBack}
              className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              [ ARCHITECTURE OVERVIEW )
            </button>
            <span className="font-mono text-[10px] text-black/20 uppercase tracking-[0.3em]">/ PILLAR_07</span>
          </div>
          <div className="font-mono text-[9px] text-black/40 uppercase tracking-[0.4em]">
            [ INTELLIGENCE_SPEC_V.7 ]
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="mb-40">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariants as any}>
            <span className="font-mono text-xs text-[#E21E3F] tracking-[0.4em] mb-6 block uppercase">/ Scale_Intelligence_Infrastructure</span>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.9] tracking-tighter mb-10">
              The <span className="italic text-[#C5A059]">Eyes</span> <br />
              of the Machine.
            </h1>
            <p className="font-sans text-xl md:text-2xl font-light text-[#1a1a1a]/70 max-w-3xl leading-relaxed border-l border-black/20 pl-8">
              Data without context is just noise. We engineer unified intelligence environments that move you from gut-feeling management to evidence-based growth.
            </p>
          </motion.div>
        </section>

        {/* PHILOSOPHY BLOCK */}
        <section className="mb-40 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={revealVariants as any}>
              <h2 className="font-serif text-4xl md:text-5xl mb-8 italic">Navigation vs Reporting.</h2>
              <div className="space-y-6 text-lg text-black/60 font-light leading-relaxed max-w-2xl">
                <p>We don’t sell Reports. We sell Navigation. Most CEOs suffer from an Epistemological Crisis—they are drowning in data but starving for wisdom because "Truth" is fragmented across 5 browser tabs.</p>
                <p className="font-serif text-2xl text-[#1a1a1a] italic border-b border-[#C5A059]/30 pb-4 inline-block">
                  "Truth shouldn't require five passwords to find."
                </p>
                <p>We build the Single Source of Truth that allows you to manage by the numbers, not by your gut. We make your business observable.</p>
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-5 relative bg-[#1a1a1a] p-12 overflow-hidden shadow-2xl">
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#C5A059_1px,_transparent_1px)] bg-[size:15px_15px]"></div>
             <div className="relative z-10 flex flex-col items-center">
                <BarChart3 className="w-24 h-24 text-[#C5A059] stroke-[0.5]" />
                <div className="mt-8 font-mono text-[9px] text-white/40 tracking-[0.4em] uppercase">
                   INTELLIGENCE_OS_CALIBRATED... [ ACTIVE ]
                </div>
             </div>
          </div>
        </section>

        {/* SERVICE MODULES */}
        <section className="mb-40">
          <div className="border-t border-black/10 pt-20 mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
            <h2 className="font-serif text-5xl italic">Intelligence Modules.</h2>
            <span className="font-mono text-[10px] text-black/40 uppercase tracking-widest">/ OBSERVABILITY_GRID_DEPLOYMENT</span>
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
                      Logic Specs <TrendingUp className="w-3 h-3" />
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 7-DAY SPRINT ROADMAP */}
        <section className="mb-40 py-24 bg-[#1a1a1a] text-white px-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <TrendingUp className="w-64 h-64" />
          </div>
          <div className="max-w-xl mb-16 relative z-10">
            <span className="font-mono text-[10px] text-[#C5A059] tracking-widest uppercase block mb-4">/ FORECASTING_VELOCITY</span>
            <h2 className="font-serif text-5xl mb-6 italic">The 7-Day Sprint.</h2>
            <p className="font-sans text-white/50 leading-relaxed">Intelligence shouldn't be a quarterly goal. We install your observability infrastructure in one business cycle.</p>
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

        {/* RETAINER TIER */}
        <section className="mb-32 grid grid-cols-1 lg:grid-cols-12 gap-16 pt-20 border-t border-black/10">
          <div className="lg:col-span-5">
            <span className="font-mono text-[10px] text-[#E21E3F] tracking-widest uppercase block mb-4">/ FRACTIONAL_CSUITE</span>
            <h2 className="font-serif text-5xl italic leading-tight">Fractional <br />Intelligence.</h2>
            <p className="font-sans text-lg text-black/50 mt-6 leading-relaxed">Data integrity is a marathon. Our retainers provide ongoing surveillance of your attribution logic and monthly experimentation cycles.</p>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 border border-black/10 bg-white shadow-sm hover:border-[#C5A059] transition-colors group">
              <Activity className="w-10 h-10 text-[#C5A059] mb-8 group-hover:animate-pulse" />
              <h4 className="font-serif text-2xl mb-4">The Analyst</h4>
              <p className="font-sans text-sm text-black/50 leading-relaxed">Weekly surveillance of your Control Tower. We catch data anomalies before they impact your growth forecasting.</p>
            </div>
            <div className="p-10 bg-[#1a1a1a] text-white group">
              <Shield className="w-10 h-10 text-[#E21E3F] mb-8" />
              <h4 className="font-serif text-2xl mb-4">The Scientist</h4>
              <p className="font-sans text-white/50 text-sm leading-relaxed">Monthly CRO (Conversion Rate Optimization) experiments using the Conversion Lab findings to squeeze more profit from existing traffic.</p>
            </div>
          </div>
        </section>

        <div className="py-12 border-t border-black/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-black/40">INTELLIGENCE_DEPLOYED // SCALE_VISIBLE // ENGINE_OBSERVABLE</span>
          </div>
          <button onClick={onBack} className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#E21E3F] hover:underline underline-offset-4">
            Return to HQ
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Pillar7;