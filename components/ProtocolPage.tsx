
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Microscope, Zap, Users, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProtocolPageProps {
  onBack: () => void;
}

const ProtocolPage: React.FC<ProtocolPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const phases = [
    {
      id: '01',
      title: 'The Diagnostic',
      subtitle: 'Forensic Audit',
      duration: '3 Days',
      desc: 'We map your data reality and identify where revenue is leaking. We define the "Control Tower" metrics that will govern the build.',
      icon: Microscope,
      color: '#E21E3F'
    },
    {
      id: '02',
      title: 'The Build',
      subtitle: 'Engine Engineering',
      duration: '14 Days',
      desc: 'We configure the CRM, code the automations, and build the "Digital Employees" (AI Agents) that will handle your repetitive logic.',
      icon: Zap,
      color: '#C5A059'
    },
    {
      id: '03',
      title: 'The Adoption',
      subtitle: 'Behavioral Engineering',
      duration: '5 Days',
      desc: 'We train your staff and deploy the Internal Media Engine to ensure the system actually sticks and adoption is absolute.',
      icon: Users,
      color: '#1a1a1a'
    },
    {
      id: '04',
      title: 'The Scale',
      subtitle: 'The Watchtower',
      duration: 'Ongoing',
      desc: 'Monthly optimization, feature updates, and performance calibration to keep the engine running at peak ROI.',
      icon: ShieldCheck,
      color: '#C5A059'
    }
  ];

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  // Fix: Added casting to any for ease property and variants to satisfy Framer Motion's strict typing for the Easing property
  const itemFade = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut" as any 
      } 
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="relative min-h-screen w-full bg-[#FFF2EC] text-[#1a1a1a] pb-20 overflow-x-hidden content-layer"
    >
      {/* PROGRESSIVE TIMELINE BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="max-w-[1400px] mx-auto h-full px-6 md:px-12 lg:px-20 relative">
          <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-between">
            {['01', '05', '10', '14', '20+'].map((day) => (
              <div key={day} className="relative h-full flex flex-col items-center">
                <div className="h-full w-[1px] bg-black/[0.03]" />
                <span className="absolute top-32 font-mono text-[9px] text-black/10 uppercase tracking-widest -translate-x-1/2">Day_{day}</span>
              </div>
            ))}
          </div>
          
          {/* Moving Pulse line */}
          <motion.div 
            className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A059]/20 to-transparent"
            animate={{ y: [-100, 100, -100] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        <div className="absolute bottom-[10%] right-[5%] font-mono text-[9px] text-black/10 uppercase tracking-[0.5em] rotate-90 origin-right">
          [ PROTOCOL_V.3.3 // EXECUTION_VELOCITY ]
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 relative z-10 pt-32">
        
        {/* TOP NAV */}
        <div className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-6">
            <button 
              onClick={onBack}
              className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              [ ENGINE OVERVIEW )
            </button>
            <span className="font-mono text-[10px] text-black/20 uppercase tracking-[0.3em]">/ THE_PROTOCOL</span>
          </div>
          <div className="hidden md:block font-mono text-[9px] text-black/40 uppercase tracking-[0.4em]">
            METHODOLOGY_CORE_LOG // 2025
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="mb-40">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-mono text-xs text-[#E21E3F] tracking-[0.4em] mb-6 block uppercase">/ The_Execution_Framework</span>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.9] tracking-tighter mb-10">
              Execution at <br />
              <span className="italic text-[#C5A059]">Velocity.</span>
            </h1>
            <p className="font-sans text-xl md:text-2xl font-light text-[#1a1a1a]/70 max-w-3xl leading-relaxed border-l border-black/20 pl-8">
              I don’t do "6-Month Strategies." I work in high-impact Sprints. We move from diagnostic to deployment in days, not quarters.
            </p>
          </motion.div>
        </section>

        {/* 4-PHASE SPRINT CYCLE */}
        <section className="mb-40">
          <div className="border-t border-black/10 pt-20 mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
            <h2 className="font-serif text-5xl italic">The Sprint Cycle.</h2>
            <span className="font-mono text-[10px] text-black/40 uppercase tracking-widest">/ LINEAR_PHASE_DECOUPLED</span>
          </div>

          <motion.div 
            variants={staggerContainer as any}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 bg-black/5 border border-black/5"
          >
            {phases.map((phase) => (
              <motion.div 
                key={phase.id}
                variants={itemFade as any}
                className="bg-[#FFF2EC] p-10 flex flex-col justify-between hover:bg-white transition-colors duration-500 group min-h-[450px]"
              >
                <div>
                  <div className="flex justify-between items-start mb-12">
                    <span className="font-mono text-[9px] text-black/30 tracking-widest uppercase">Phase_{phase.id}</span>
                    <span className="font-mono text-[9px] text-[#C5A059] tracking-widest uppercase font-bold">{phase.duration}</span>
                  </div>
                  <phase.icon className="w-8 h-8 mb-8 text-black/10 group-hover:text-[#E21E3F] transition-colors duration-500" />
                  <h3 className="font-serif text-3xl mb-2">{phase.title}</h3>
                  <p className="font-mono text-[10px] text-black/40 uppercase tracking-widest mb-6">{phase.subtitle}</p>
                  <p className="font-sans text-sm text-black/60 leading-relaxed">{phase.desc}</p>
                </div>
                
                <div className="mt-12 pt-8 border-t border-black/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#C5A059]">Protocol_Active</span>
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* SPRINT LOGIC SECTION */}
        <section className="mb-40 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 sticky top-32">
            <span className="font-mono text-xs text-[#E21E3F] tracking-[0.4em] mb-6 block uppercase">/ Why_Sprints_Work</span>
            <h2 className="font-serif text-5xl md:text-6xl mb-8 leading-tight">Consulting is Dead. <br /><span className="italic text-[#C5A059]">Sprints are Eternal.</span></h2>
            <p className="font-sans text-lg text-black/60 leading-relaxed mb-8">
              Traditional consulting sells time. I sell outcomes. The Sprint model ensures we stay agile, focused, and move at the speed of modern business.
            </p>
          </div>
          
          <div className="lg:col-span-7 space-y-12">
            {[
              { 
                title: 'Aggressive Feedback Loops', 
                text: 'We don\'t wait for a month-end review. We pivot based on daily data signals. This reduces the "Distance to Truth."' 
              },
              { 
                title: 'Reduced Technical Risk', 
                text: 'Deploying in small, functional units prevents "Massive Failure." If a logic gate breaks, we see it instantly in the Control Tower.' 
              },
              { 
                title: 'Immediate Cash Flow Impact', 
                text: 'By focusing on "Capture Core" first, we create ROI within the first 14 days, effectively funding the rest of the build.' 
              }
            ].map((logic, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="p-10 border border-black/5 bg-white shadow-sm hover:shadow-xl transition-all duration-500 flex gap-8 items-start"
              >
                <div className="font-mono text-xs text-[#C5A059] font-bold">0{idx + 1}</div>
                <div>
                  <h4 className="font-serif text-2xl mb-4">{logic.title}</h4>
                  <p className="font-sans text-sm text-black/50 leading-relaxed">{logic.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="py-24 border-t border-black/10 flex flex-col items-center text-center">
          <span className="font-mono text-[10px] text-black/30 tracking-[0.5em] uppercase mb-8">INITIATE_PROTOCOL_V.3.3</span>
          <h2 className="font-serif text-5xl md:text-7xl mb-12 italic max-w-4xl">Ready to stop planning and start <span className="text-[#C5A059]">deploying?</span></h2>
          <a 
            href="https://meetings-ap1.hubspot.com/felipe" 
            target="_blank"
            className="group relative px-12 py-6 bg-[#1a1a1a] text-white font-mono text-xs uppercase tracking-[0.3em] overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
            <span className="relative z-10 flex items-center gap-4">
              Schedule Diagnostic <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </section>

        <div className="py-12 border-t border-black/10 flex items-center justify-between gap-4 mt-20">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-5 h-5 text-[#C5A059]" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-black/40">PROTOCOL_READY // VELOCITY_OPTIMIZED</span>
          </div>
          <button onClick={onBack} className="font-mono text-[10px] uppercase tracking-[0.4em] text-[#E21E3F] hover:underline underline-offset-4">
            Return to HQ
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProtocolPage;
