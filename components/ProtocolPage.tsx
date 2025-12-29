import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ProtocolVisual_Geodesic from './ProtocolVisual_Geodesic';

interface ProtocolPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

const ProtocolPage: React.FC<ProtocolPageProps> = ({ onBack, onNavigate }) => {

  const steps = [
    {
      id: '01',
      title: 'The Audit',
      subtitle: 'Diagnosis',
      text: "We stop guessing. Before we build anything, I look at your raw data, your current tools, and your team's workflow. We need to identify exactly where you are leaking time and money to establish a baseline for success."
    },
    {
      id: '02',
      title: 'The Strategy',
      subtitle: 'Design',
      text: "Once we know the problem, we design the solution. We map out exactly how the new system will work—which tools talk to which, and who is responsible for what—before we write a single line of code. We agree on the plan, and we lock the scope."
    },
    {
      id: '03',
      title: 'The Build',
      subtitle: 'Execution',
      text: (
        <>
          This phase adapts to the specific Architecture we are deploying. If we are building for <strong className="text-[#E21E3F]">Acquisition</strong>, I am rewiring your CRM and lead flows. If we are targeting <strong className="text-[#C5A059]">Velocity</strong>, I am training AI agents and automating content pipelines. If we are deploying <strong className="text-black">Intelligence</strong>, I am connecting your fragmented data sources into a central command tower. Regardless of the system, I execute autonomously while you focus on the business.
        </>
      )
    },
    {
      id: '04',
      title: 'The Handoff',
      subtitle: 'Launch',
      text: "I don't just finish the build and leave. A system is only useful if your team knows how to drive it. I train your staff, document the protocols, and only hand over the keys once the engine is stable and running smoothly."
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] pt-32 pb-0 px-0 relative z-[150] overflow-x-hidden flex flex-col"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow">
        
        {/* NAV BACK */}
        <div className="flex justify-between items-center mb-24">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            / Return_to_Engine
          </button>
        </div>

        {/* --- SECTION 1: HERO (Visual + Title Only) --- */}
        <div className="mb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT: TITLE */}
          <div>
            <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block uppercase font-bold">/ OPERATING_PROTOCOL</span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-8">
              The Rules of <br />
              <span className="italic text-black/20">Engagement.</span>
            </h1>
            <p className="font-sans text-xl text-[#1a1a1a]/60 leading-relaxed max-w-md border-l-2 border-[#C5A059] pl-6">
               A strict protocol to move from Chaos to Order.
            </p>
          </div>

          {/* RIGHT: GEODESIC VISUAL */}
          <div className="h-full min-h-[500px] flex items-center justify-center lg:justify-end">
            <ProtocolVisual_Geodesic />
          </div>

        </div>

        {/* --- SECTION 2: THE PHILOSOPHY (Text Only) --- */}
        <div className="mb-40 max-w-5xl">
           <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-16 text-[#1a1a1a]">
             To guarantee results, we break <br/>
             <span className="italic text-[#E21E3F]">standard agency habits.</span>
           </h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 mb-4 block font-bold">01 // The Outcome</span>
                <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed">
                  Most consultants sell you their time. I sell a solved problem. This distinction changes everything. Because I am focused on the Outcome rather than the Hour, my incentive is efficiency, not filling a timesheet.
                </p>
              </div>
              
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 mb-4 block font-bold">02 // The Truth</span>
                <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed">
                  We operate on <strong>Truth over Comfort</strong>. I am not here to validate your current processes; I am here to improve them. If a foundation is cracked, I will tell you. We don't patch symptoms; we fix the root cause.
                </p>
              </div>
           </div>
        </div>

        {/* --- SECTION 3: THE EXECUTION SEQUENCE --- */}
        <div className="mb-32">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] font-bold mb-16 text-[#1a1a1a]/40 border-b border-black/10 pb-4">
            Execution_Sequence
          </div>
          
          <div className="space-y-0 relative border-l border-black/10 ml-4 md:ml-0">
            {steps.map((step, i) => (
              <motion.div 
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group py-12 pl-12 md:pl-0 flex flex-col md:flex-row gap-8 md:items-baseline relative"
              >
                 {/* Timeline Dot */}
                 <div className="absolute left-[-5px] top-16 w-2 h-2 bg-[#1a1a1a] rounded-full md:hidden" />

                 <div className="w-32 shrink-0 font-mono text-xs text-[#E21E3F] font-bold tracking-widest pt-2">
                   {step.id} //
                 </div>

                 <div className="flex-grow grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-black/5 pb-12 group-last:border-none">
                    <div className="md:col-span-4">
                       <span className="font-mono text-[9px] uppercase tracking-widest text-[#C5A059] mb-3 block">{step.subtitle}</span>
                       <h3 className="font-serif text-4xl text-[#1a1a1a]">{step.title}</h3>
                    </div>
                    <div className="md:col-span-7">
                       <p className="font-sans text-lg text-[#1a1a1a]/60 leading-relaxed">
                         {step.text}
                       </p>
                    </div>
                 </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="border-t border-black/10 py-32 flex flex-col items-center text-center">
           <h2 className="font-serif text-5xl md:text-6xl mb-8">Ready to start <br/> the <span className="italic text-[#E21E3F]">Process?</span></h2>
           <button 
             onClick={() => onNavigate('landing', 'booking')}
             className="group relative flex items-center justify-center px-10 py-6 bg-[#1a1a1a] text-[#FFF2EC] font-mono text-xs uppercase tracking-[0.3em] font-bold overflow-hidden transition-all duration-300"
           >
             <div className="absolute inset-0 bg-[#FFF2EC] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
             <span className="relative z-10 flex items-center gap-4 group-hover:text-[#1a1a1a] transition-colors duration-500">
               [ INITIATE_AUDIT ]
               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </span>
           </button>
        </div>

      </div>

    </motion.div>
  );
};

export default ProtocolPage;