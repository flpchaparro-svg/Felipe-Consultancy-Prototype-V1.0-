
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Globe, Database, Zap, Bot, Video, Users, BarChart3, ChevronDown, Plus } from 'lucide-react';
import GlobalFooter from './GlobalFooter';
import HeroVisual_Suspension from './HeroVisual_Suspension';
import Modal from './Modal';
import { ServiceDetail } from '../types';
import { VizAcquisition, VizVelocity, VizIntelligence } from './ArchitecturePageVisuals';

interface ArchitecturePageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

// --- DATA ---
const systems = [
  {
    id: 'sys_01',
    label: 'SYS_01 [ ACQUISITION ]',
    systemGroup: 'ACQUISITION_SYS',
    tabLabel: 'GET CLIENTS',
    title: 'Capture & Convert',
    description: 'The goal is to turn attention into leads without losing anyone along the way.',
    accent: '#E21E3F', // Red
    Visual: VizAcquisition,
    pillars: [
      { 
        id: 'pillar1', 
        number: '01',
        icon: Globe, 
        title: 'WEBSITES & E-COMMERCE', 
        subtitle: 'The Face', 
        description: 'Sites that capture leads and sell products — not just look pretty.',
        features: ['Smart Lead Forms', 'Inventory Connected to Sales', 'Fast, Mobile-First Design']
      },
      { 
        id: 'pillar2', 
        number: '02',
        icon: Database, 
        title: 'CRM & LEAD TRACKING', 
        subtitle: 'The Brain', 
        description: 'Track every lead, every call, every deal. Nothing slips through.',
        features: ['Pipeline Visibility', 'Automated Follow-Ups', 'One Source of Truth']
      },
      { 
        id: 'pillar3', 
        number: '03',
        icon: Zap, 
        title: 'AUTOMATION', 
        subtitle: 'The Muscle', 
        description: 'Invoices, follow-ups, data entry — all on autopilot.',
        features: ['Auto-Invoicing', 'Task Triggers', 'System-to-System Sync']
      }
    ]
  },
  {
    id: 'sys_02',
    label: 'SYS_02 [ VELOCITY ]',
    systemGroup: 'VELOCITY_SYS',
    tabLabel: 'SCALE FASTER',
    title: 'Multiply Output',
    description: 'The goal is to do more without hiring more, using AI and content systems.',
    accent: '#C5A059', // Gold
    Visual: VizVelocity,
    pillars: [
      { 
        id: 'pillar4', 
        number: '04',
        icon: Bot, 
        title: 'AI ASSISTANTS', 
        subtitle: 'The Voice', 
        description: 'Answer calls and enquiries 24/7 — even while you sleep.',
        features: ['24/7 Availability', 'Lead Qualification', 'Appointment Booking']
      },
      { 
        id: 'pillar5', 
        number: '05',
        icon: Video, 
        title: 'CONTENT SYSTEMS', 
        subtitle: 'The Presence', 
        description: 'One voice note → blog, socials, newsletter. Auto-published.',
        features: ['Voice-to-Content', 'Auto-Publishing', 'Multi-Platform Distribution']
      },
      { 
        id: 'pillar6', 
        number: '06',
        icon: Users, 
        title: 'TEAM TRAINING', 
        subtitle: 'The Soul', 
        description: 'Short training that makes your team actually use the tools.',
        features: ['Bite-Sized Videos', 'Step-by-Step Guides', 'Team Q&A Library']
      }
    ]
  },
  {
    id: 'sys_03',
    label: 'SYS_03 [ INTELLIGENCE ]',
    systemGroup: 'INTELLIGENCE_SYS',
    tabLabel: 'SEE CLEARLY',
    title: 'Precision Control',
    description: 'The goal is to stop guessing and see your numbers in real time.',
    accent: '#1a1a1a', // Black
    Visual: VizIntelligence,
    pillars: [
      { 
        id: 'pillar7', 
        number: '07',
        icon: BarChart3, 
        title: 'DASHBOARDS & REPORTING', 
        subtitle: 'The Eyes', 
        description: 'Revenue, margins, pipeline — one screen, live.',
        features: ['Live Revenue Tracking', 'Forecasting & Projections', 'One-Screen Business Health']
      }
    ]
  }
];

// --- FAQ DATA ---
const SYSTEM_FAQS = [
  {
    q: "Do I need all 3 systems?",
    a: "Not necessarily. We start with a Diagnostic Audit to identify your bottleneck. If you have leads but no time, we deploy Velocity. If you have capacity but no leads, we deploy Acquisition."
  },
  {
    q: "Does this replace my current team?",
    a: "No. It empowers them. Automation removes the 'Robot Work' (data entry, scheduling, follow-ups) so your humans can do the 'Human Work' (strategy, relationships, closing)."
  },
  {
    q: "How long does implementation take?",
    a: "We work in 7-Day Sprints. A single system (like a CRM rebuild or AI Agent) is typically live within 14 days. A full-stack transformation takes 6-8 weeks."
  },
  {
    q: "Is it custom code or off-the-shelf?",
    a: "We use a 'Low-Code' architecture (Make.com, HubSpot, Supabase). This gives you the power of custom software without the technical debt or maintenance costs of a custom engineering team."
  }
];

const FAQItem: React.FC<{ q: string; a: string; index: number }> = ({ q, a, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-black/10 first:border-t-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex justify-between items-start text-left group"
      >
        <div className="flex items-baseline gap-6 pr-8">
           <span className="font-mono text-[9px] text-[#C5A059] uppercase tracking-widest min-w-[20px] pt-2">0{index + 1}</span>
           <span className={`font-serif text-2xl md:text-3xl transition-colors duration-300 ${isOpen ? 'text-[#C5A059]' : 'text-[#1a1a1a] group-hover:text-[#C5A059]'}`}>
             {q}
           </span>
        </div>
        <div className={`shrink-0 w-8 h-8 flex items-center justify-center border rounded-full transition-all duration-300 mt-1 ${isOpen ? 'border-[#C5A059] bg-[#C5A059] text-white rotate-45' : 'border-black/10 group-hover:border-[#C5A059] text-black/40'}`}>
           <Plus className="w-4 h-4" />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className="overflow-hidden pl-0 md:pl-11"
          >
            <p className="pb-10 font-sans text-lg text-[#1a1a1a]/60 leading-relaxed max-w-3xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- BLUEPRINT SECTION COMPONENT ---
// This handles the sticky scroll logic and pipe animation for ONE system
const SystemBlueprintSection: React.FC<{ 
  system: typeof systems[0]; 
  onPillarClick: (pillar: any) => void;
  index: number;
}> = ({ system, onPillarClick, index }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const pipeFill = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]); 
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  
  return (
    <section ref={containerRef} className="relative min-h-[150vh] border-t border-[#1a1a1a]/10">
      <div className="sticky top-0 h-screen flex flex-col lg:flex-row overflow-hidden">
        
        {/* LEFT: STICKY INFO (35%) */}
        <div className="hidden lg:flex w-[35%] h-full bg-[#FFF2EC] flex-col justify-center p-16 z-20 border-r border-[#1a1a1a]/10 relative">
           <motion.div style={{ opacity }} className="relative">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] font-bold mb-8" style={{ color: system.accent }}>
                {system.label}
              </div>
              <h2 className="font-serif text-6xl leading-[0.9] text-[#1a1a1a] mb-8">
                {system.title}
              </h2>
              <p className="font-sans text-lg text-[#1a1a1a]/60 leading-relaxed max-w-sm">
                {system.description}
              </p>
              
              <div className="mt-12 pt-12 border-t border-[#1a1a1a]/10 grid grid-cols-2 gap-8 font-mono text-[9px] text-[#1a1a1a]/40 uppercase tracking-widest">
                 <div>
                    <span className="block mb-2 text-[#1a1a1a]">Status</span>
                    ONLINE
                 </div>
                 <div>
                    <span className="block mb-2 text-[#1a1a1a]">Modules</span>
                    {system.pillars.length} UNITS
                 </div>
              </div>
           </motion.div>
        </div>

        {/* RIGHT: SCROLLABLE BLUEPRINT (65%) */}
        <div className="w-full lg:w-[65%] h-full relative bg-[#FFF2EC] overflow-y-auto hide-scrollbar">
           
           {/* MOBILE HEADER */}
           <div className="lg:hidden p-8 pb-0 pt-32">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] font-bold mb-4" style={{ color: system.accent }}>
                {system.label}
              </div>
              <h2 className="font-serif text-4xl text-[#1a1a1a] mb-4">{system.title}</h2>
              <p className="font-sans text-sm text-[#1a1a1a]/60">{system.description}</p>
           </div>

           <div className="relative p-6 md:p-12 lg:p-24 pb-48 min-h-full">
              
              {/* THE BLUEPRINT SVG LAYER (Desktop) */}
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none hidden lg:block">
                 <svg className="w-full h-full overflow-visible">
                    <motion.path
                       d={`M 40 0 V ${system.pillars.length * 400}`} 
                       fill="none"
                       stroke={system.accent}
                       strokeWidth="2"
                       style={{ pathLength: pipeFill, opacity: 0.3 }}
                    />
                    
                    {system.pillars.map((_, i) => (
                       <motion.path
                          key={i}
                          d={`M 40 ${150 + i * 350} H 80`} 
                          fill="none"
                          stroke={system.accent}
                          strokeWidth="2"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                       />
                    ))}
                 </svg>
              </div>

              {/* CARDS COLUMN */}
              <div className="flex flex-col space-y-12 lg:space-y-24 lg:pl-20">
                 {system.pillars.map((pillar) => (
                    <motion.div
                       key={pillar.id}
                       initial={{ opacity: 0, x: 20 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true, margin: "-10%" }}
                       transition={{ duration: 0.5 }}
                       className="relative group"
                    >
                       <div className="hidden lg:block absolute top-1/2 -left-[45px] w-3 h-3 rounded-full bg-[#FFF2EC] border-2 z-10 -translate-y-1/2" style={{ borderColor: system.accent }} />

                       <button 
                          onClick={() => onPillarClick(pillar)}
                          className="w-full text-left bg-white border border-[#1a1a1a]/5 p-8 md:p-10 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group-hover:border-l-4"
                          style={{ borderLeftColor: system.accent }}
                       >
                          <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
                             <div className="shrink-0 w-12 h-12 flex items-center justify-center bg-[#1a1a1a]/5 rounded-sm" style={{ color: system.accent }}>
                                <pillar.icon className="w-6 h-6" />
                             </div>
                             
                             <div className="flex-1">
                                <div className="flex items-center gap-3 mb-3">
                                   <span className="font-mono text-[10px] font-bold text-[#1a1a1a]/30">0{pillar.number}</span>
                                   <span className="font-mono text-[9px] uppercase tracking-widest text-[#1a1a1a]/50">[ {pillar.subtitle} ]</span>
                                </div>
                                <h3 className="font-serif text-2xl md:text-3xl text-[#1a1a1a] mb-4">{pillar.title}</h3>
                                <p className="font-sans text-sm md:text-base text-[#1a1a1a]/60 leading-relaxed mb-6">
                                   {pillar.description}
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                   {pillar.features?.map((f: string, i: number) => (
                                      <div key={i} className="flex items-center gap-2 font-mono text-[9px] text-[#1a1a1a]/50 uppercase tracking-wide">
                                         <div className="w-1 h-1 bg-[#1a1a1a]/20" />
                                         {f}
                                      </div>
                                   ))}
                                </div>
                             </div>

                             <div className="hidden md:flex items-center justify-center w-12 h-12 border border-[#1a1a1a]/10 rounded-full group-hover:bg-[#1a1a1a] group-hover:text-white transition-colors duration-300">
                                <ArrowRight className="w-4 h-4" />
                             </div>
                          </div>
                       </button>
                    </motion.div>
                 ))}

                 {/* FINAL VISUAL NODE */}
                 <div className="w-full h-[300px] md:h-[400px] border border-[#1a1a1a]/10 bg-[#1a1a1a]/5 flex flex-col items-center justify-center relative overflow-hidden mt-12">
                    <div className="absolute inset-0 flex items-center justify-center opacity-80">
                        {system.Visual && <system.Visual color={system.accent} />}
                    </div>
                    <div className="absolute bottom-6 font-mono text-[9px] uppercase tracking-widest bg-white/80 backdrop-blur px-3 py-1 rounded-full" style={{ color: system.accent }}>
                       [ SYSTEM_STATUS: ONLINE ]
                    </div>
                 </div>

              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

const ArchitecturePage: React.FC<ArchitecturePageProps> = ({ onBack, onNavigate }) => {
  const [selectedPillar, setSelectedPillar] = useState<ServiceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePillarClick = (pillar: any, systemGroup: string) => {
    const isDesktop = window.innerWidth >= 1024;
    
    if (isDesktop) {
      const modalData: ServiceDetail = {
        id: pillar.id,
        title: pillar.title,
        subtitle: pillar.subtitle,
        description: pillar.description,
        technicalLabel: `MOD_0${pillar.number}_ACTIVE`,
        systemGroup: systemGroup, 
        symptom: "Efficiency Loss Detected",
        visualPrompt: 'helix',
        features: pillar.features,
        bgImage: '',
        icon: 'Box' 
      };
      setSelectedPillar(modalData);
      setIsModalOpen(true);
    } else {
      onNavigate(pillar.id);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] pt-0 relative z-[150] overflow-x-hidden flex flex-col"
    >
        {/* HEADER SECTION */}
        <div className="pt-32 pb-24 px-6 md:px-12 lg:px-20 max-w-[1400px] mx-auto w-full">
           <button onClick={onBack} className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors mb-12">
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
             / Return to Home
           </button>
           
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             <div>
               <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block uppercase font-bold">/ THE BLUEPRINT</span>
               <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-8">
                 7 Ways I Fix <br />
                 <span className="italic text-black/20">Your Business.</span>
               </h1>
               <p className="font-sans text-xl text-[#1a1a1a]/60 leading-relaxed max-w-xl border-l-2 border-[#C5A059] pl-6">
                 I don't just build websites. I treat your business as one connected system. By linking Marketing, Sales, and Operations together, I eliminate the friction that burns out your people.
               </p>
             </div>
             <div className="h-[400px] lg:h-full flex items-center justify-center lg:justify-end relative">
                <HeroVisual_Suspension />
             </div>
           </div>
           
           <div className="mt-24 flex justify-center animate-bounce opacity-20">
              <ChevronDown className="w-6 h-6" />
           </div>
        </div>

        {/* BLUEPRINT SECTIONS */}
        <div className="w-full border-t border-[#1a1a1a]/10">
           {systems.map((system, index) => (
              <SystemBlueprintSection 
                 key={system.id} 
                 system={system} 
                 index={index} 
                 onPillarClick={(p) => handlePillarClick(p, system.systemGroup)} 
              />
           ))}
        </div>

        {/* FAQ Section */}
        <div className="border-t border-[#1a1a1a]/10 bg-[#FFF2EC] py-24 px-6 md:px-12 lg:px-20">
           <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-4">
                 <span className="font-mono text-xs text-[#C5A059] tracking-widest mb-6 block uppercase font-bold">/ FAQ</span>
                 <h2 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] mb-6">Questions?</h2>
                 <p className="font-sans text-lg text-[#1a1a1a]/60">Everything you need to know before we start engineering.</p>
              </div>
              <div className="lg:col-span-8">
                 {SYSTEM_FAQS.map((faq, index) => (
                    <FAQItem key={index} index={index} q={faq.q} a={faq.a} />
                 ))}
              </div>
           </div>
        </div>
      
        <GlobalFooter onNavigate={onNavigate} />

        {/* MODAL */}
        <AnimatePresence>
          {isModalOpen && selectedPillar && (
            <Modal
              service={selectedPillar}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onViewPillar={(pillarId) => {
                setIsModalOpen(false);
                onNavigate(pillarId);
              }}
            />
          )}
        </AnimatePresence>

    </motion.div>
  );
};

export default ArchitecturePage;
