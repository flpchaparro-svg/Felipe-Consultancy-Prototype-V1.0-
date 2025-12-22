import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, Zap, BarChart3, Activity, ArrowRight } from 'lucide-react';

interface ArchitecturePageProps {
  onBack: () => void;
  onNavigatePillar: (pillarId: string) => void;
}

const ArchitecturePage: React.FC<ArchitecturePageProps> = ({ onBack, onNavigatePillar }) => {
  const systems = [
    {
      title: 'Acquisition System',
      icon: Target,
      color: '#E21E3F',
      pillars: [
        { id: 'pillar1', name: 'Digital Revenue Architecture', desc: 'Engineering web engines for high-velocity demand capture.' },
        { id: 'pillar2', name: 'CRM Capture Core', desc: 'The central nervous system for unified data integrity.' },
        { id: 'pillar3', name: 'Media Logistics', desc: 'Automated assembly lines for global content distribution.' }
      ]
    },
    {
      title: 'Productivity System',
      icon: Zap,
      color: '#C5A059',
      pillars: [
        { id: 'pillar4', name: 'Automation Architecture', desc: 'Mechanical efficiency through autonomous admin protocols.' },
        { id: 'pillar5', name: 'Cognitive Infrastructure', desc: 'Deploying agentic AI units for triage and context management.' },
        { id: 'pillar6', name: 'Adoption Architecture', desc: 'Behavioral engineering to maximize team protocol adherence.' }
      ]
    },
    {
      title: 'Scale System',
      icon: BarChart3,
      color: '#1a1a1a',
      pillars: [
        { id: 'pillar7', name: 'Intelligence Services', desc: 'Executive dashboarding for real-time forecasting and BI.' }
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="relative min-h-screen w-full bg-[#FFF2EC] text-[#1a1a1a] pt-32 pb-0 px-0 z-10 flex flex-col content-layer"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow relative z-20">
        
        <div className="flex items-center gap-6 mb-16 overflow-hidden">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            [ RETURN_HOME )
          </button>
          <span className="h-[1px] w-12 bg-black/20"></span>
          <span className="font-mono text-[10px] text-black/40 uppercase tracking-widest">Architecture_Overview_v5.2</span>
        </div>

        <div className="mb-32">
          <span className="font-mono text-xs text-[#E21E3F] tracking-[0.4em] mb-8 block uppercase">/ SYSTEMS_ENGINEERING</span>
          <h1 className="font-serif text-5xl md:text-8xl lg:text-[7.5rem] leading-[0.95] tracking-tighter text-[#1a1a1a] mb-10 max-w-5xl">
            The Blueprint for <br />
            <span className="text-[#C5A059] italic">Autonomous Growth.</span>
          </h1>
          <p className="font-sans text-xl font-light text-[#1a1a1a]/70 leading-relaxed max-w-2xl border-l border-black/20 pl-6">
            I don't solve problems with people; I solve them with systems. The architecture is divided into three core subsystems designed to capture demand, eliminate friction, and enable empirical scale.
          </p>
        </div>

        <div className="space-y-32 mb-40">
          {systems.map((system, idx) => (
            <section key={idx} className="border-t border-black/10 pt-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-4 mb-8" style={{ color: system.color }}>
                    <system.icon className="w-8 h-8" />
                    <span className="font-mono text-xs uppercase tracking-[0.4em] font-bold">{system.title}</span>
                  </div>
                  <h2 className="font-serif text-5xl md:text-6xl mb-8 leading-tight">
                    {system.title.split(' ')[0]} <br />
                    <span className="italic text-black/40">{system.title.split(' ')[1]}</span>
                  </h2>
                </div>
                <div className="lg:col-span-7 space-y-4">
                  {system.pillars.map((pillar) => (
                    <button 
                      key={pillar.id}
                      onClick={() => onNavigatePillar(pillar.id)}
                      className="w-full group flex items-center justify-between p-10 bg-white border border-black/5 hover:border-[#C5A059] hover:shadow-2xl transition-all duration-500 text-left overflow-hidden relative"
                    >
                      <div className="absolute top-0 left-0 w-1 h-0 bg-[#C5A059] group-hover:h-full transition-all duration-500"></div>
                      <div>
                        <span className="font-mono text-[10px] text-[#C5A059] mb-2 block uppercase tracking-widest">PILLAR_DEEP_DIVE</span>
                        <h3 className="font-serif text-3xl group-hover:text-[#C5A059] transition-colors">{pillar.name}</h3>
                        <p className="font-sans text-sm text-black/50 mt-2">{pillar.desc}</p>
                      </div>
                      <ArrowRight className="w-6 h-6 text-black/10 group-hover:text-[#C5A059] group-hover:translate-x-2 transition-all duration-500" />
                    </button>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="py-12 border-t border-black/10 flex items-center gap-4">
          <Activity className="w-6 h-6 text-[#C5A059]" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-black/40">Status: Blueprint_Authenticated // Verified_Systems</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ArchitecturePage;