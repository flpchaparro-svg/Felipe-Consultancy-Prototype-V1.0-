import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, MessageSquare, Target, Repeat, Search, CheckCircle2 } from 'lucide-react';
import PillarVisual_Network from './PillarVisual_Network';

interface PillarPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

const Pillar2: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {

  const services = [
    {
      id: 'capture',
      icon: MessageSquare,
      accent: 'text-[#E21E3F]',
      bgAccent: 'bg-[#E21E3F]',
      title: 'Tier 01 // The Capture Core',
      tagline: 'Responsiveness. Safety Net.',
      promise: 'Stop the Lead Leak. Every inquiry acknowledged in seconds.',
      who: 'For high-volume service businesses (Trades, Venues, Clinics). You are physically working and missing calls. Every missed call is money to a competitor.',
      description: 'We don\'t sell "Software Setup," we sell Responsiveness. We build a foundational "Safety Net" that unifies your email, SMS, and socials into one inbox. We automate the "First Response" so that even if you are up a ladder or in a meeting, your lead gets an instant reply securing the relationship.',
      specs: ['Unified Inbox Architecture', 'Missed-Call SMS Automation', 'Google Maps Chat Sync', 'Lead Source Tracking']
    },
    {
      id: 'pipeline',
      icon: Target,
      accent: 'text-[#C5A059]',
      bgAccent: 'bg-[#C5A059]',
      title: 'Tier 02 // The Frictionless Pipeline',
      tagline: 'Visibility. Forecasting.',
      promise: 'Visualize the money. Stop flying blind.',
      who: 'For B2B Sales Teams and Agencies. You have deals in progress, but they are hidden in notebooks or heads. You don\'t know if you will hit target next month.',
      description: 'We remove the "Black Box" of revenue. We build a visual Kanban pipeline that tracks every deal from "New" to "Closed." We enforce data entry standards so your reps can\'t hide bad news. You get a dashboard that tells you exactly how much revenue is landing in 30, 60, and 90 days.',
      specs: ['Kanban Deal Stages', 'Weighted Revenue Forecasting', 'Rep Accountability Logic', 'Automated Task Reminders']
    },
    {
      id: 'retention',
      icon: Repeat,
      accent: 'text-[#1a1a1a]',
      bgAccent: 'bg-[#1a1a1a]',
      title: 'Tier 03 // The Retention Loop',
      tagline: 'Lifetime Value. Profit.',
      promise: 'Stop renting customers. Start owning them.',
      who: 'For E-commerce and Subscription brands. You are addicted to ads. You pay to acquire a customer, sell to them once, and then ignore them.',
      description: 'The real profit is in the second sale. We build an automated backend architecture that tracks customer behavior and triggers timely, relevant messages to bring them back. We turn your customer list into a "Printing Press" for revenue without spending a dollar on Zuckerberg.',
      specs: ['Behavioral Email Flows', 'Churn Prevention Logic', 'VIP Segmentation', 'Cross-Sell Automation']
    },
    {
      id: 'audit',
      icon: Search,
      accent: 'text-[#E21E3F]',
      bgAccent: 'bg-[#E21E3F]',
      title: 'Tier 04 // The Operational Audit',
      tagline: 'Data Governance. Consolidation.',
      promise: 'Audit, Rebuild, Consolidate. Delete the software you don\'t need.',
      who: 'For Mature Firms (Law, Medical, Engineering). You have "Software Bloat." You are paying for 10 tools that don\'t talk to each other.',
      description: 'Complexity is the enemy of profit. We perform a forensic audit of your entire tech stack. We map the data flows, identify the "Double Entry" waste, and consolidate your legacy systems into a modern, clean Single Source of Truth. We save you money by deleting what you don\'t use.',
      specs: ['Full Stack Audit', 'Data Migration Protocols', 'Workflow Optimization', 'Legacy System Retirement']
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FFF2EC] text-[#1a1a1a] px-0 relative z-[150] overflow-x-hidden flex flex-col"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow">
        
        {/* NAV BACK */}
        <div className="absolute top-12 left-6 md:left-12 lg:left-20 z-50">
          <button 
            onClick={() => onNavigate('architecture')}
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            / Return_to_Architecture
          </button>
        </div>

        {/* --- HERO SECTION --- */}
        <div className="min-h-[85vh] flex flex-col justify-center border-b border-black/10 relative">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full pt-32 lg:pt-0">
              
              <div className="relative z-10">
                <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block uppercase font-bold">/ SYSTEM_02 // INTELLIGENCE</span>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-8">
                  CRM Revenue <br />
                  <span className="italic text-[#E21E3F]">Intelligence.</span>
                </h1>
                <p className="font-sans text-xl text-[#1a1a1a]/70 leading-relaxed max-w-md border-l-2 border-[#C5A059] pl-6 mb-12">
                   If it’s not in the CRM, it didn't happen. <br/>
                   We transform your business from a chaotic collection of spreadsheets into a synchronized <strong>Nervous System</strong>.
                </p>
                
                <div className="flex items-center gap-2 animate-bounce cursor-pointer" onClick={() => document.getElementById('tiers')?.scrollIntoView({ behavior: 'smooth' })}>
                    <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">Select your objective</span>
                    <ArrowRight className="w-4 h-4 rotate-90 opacity-50" />
                </div>
              </div>

              <div className="h-[400px] lg:h-[600px] flex items-center justify-center lg:justify-end relative z-0">
                 <PillarVisual_Network />
              </div>
           </div>
        </div>

        {/* --- THE SERVICE STACK (Vertical Layout) --- */}
        <div id="tiers" className="py-20">
           
           <div className="mb-20">
              <h2 className="font-serif text-4xl md:text-5xl mb-6">Choose your Architecture.</h2>
              <p className="font-sans text-lg text-[#1a1a1a]/60 max-w-2xl">
                A CRM is not just a database. It is an engine. <br/> Identify your bottleneck to find the right module.
              </p>
           </div>

           <div className="space-y-8">
              {services.map((service) => (
                <div key={service.id} className="group bg-white border border-black/5 p-8 md:p-12 hover:border-[#1a1a1a] transition-all duration-500 relative overflow-hidden">
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        
                        {/* LEFT: HEADER & PROMISE */}
                        <div className="lg:col-span-4 flex flex-col justify-between">
                            <div>
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 bg-black/5 ${service.accent}`}>
                                    <service.icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-serif text-3xl mb-2">{service.title}</h3>
                                <span className={`font-mono text-[10px] uppercase tracking-widest font-bold ${service.accent}`}>
                                    {service.tagline}
                                </span>
                            </div>
                            
                            <div className="mt-8 lg:mt-0">
                                <span className="font-mono text-[9px] uppercase tracking-widest block mb-2 opacity-40">The Promise:</span>
                                <p className="font-serif text-xl italic text-[#1a1a1a]">
                                    "{service.promise}"
                                </p>
                            </div>
                        </div>

                        {/* MIDDLE: DESCRIPTION & WHO */}
                        <div className="lg:col-span-5 border-l border-black/5 pl-0 lg:pl-12">
                             <div className="mb-8">
                                <span className="font-mono text-[9px] uppercase tracking-widest block mb-2 opacity-40">Who is this for?</span>
                                <p className="font-sans text-sm font-bold text-[#1a1a1a]/80 leading-relaxed">
                                    {service.who}
                                </p>
                             </div>
                             <div>
                                <span className="font-mono text-[9px] uppercase tracking-widest block mb-2 opacity-40">The Strategy:</span>
                                <p className="font-sans text-lg text-[#1a1a1a]/60 leading-relaxed">
                                    {service.description}
                                </p>
                             </div>
                        </div>

                        {/* RIGHT: SPECS & CTA */}
                        <div className="lg:col-span-3 bg-[#F9F9F9] -m-8 md:-m-12 p-8 md:p-12 flex flex-col justify-between border-l border-black/5">
                            <ul className="space-y-3 mb-8">
                                {service.specs.map((spec, i) => (
                                    <li key={i} className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/60">
                                        <CheckCircle2 className={`w-3 h-3 ${service.accent}`} />
                                        {spec}
                                    </li>
                                ))}
                            </ul>

                            <button 
                                onClick={() => onNavigate('landing', 'booking')}
                                className="w-full py-4 bg-[#1a1a1a] text-[#FFF2EC] relative overflow-hidden group/btn border border-[#1a1a1a] font-mono text-xs uppercase tracking-[0.2em] flex items-center justify-center"
                            >
                                <div className="absolute inset-0 bg-[#FFF2EC] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                                <span className="relative z-10 flex items-center gap-2 group-hover/btn:text-[#1a1a1a] transition-colors duration-500">
                                    [ BOOK_CONSULTATION ]
                                    <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </div>

                    </div>
                    
                    {/* Hover Bar */}
                    <div className={`absolute left-0 top-0 h-full w-1 ${service.bgAccent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </div>
              ))}
           </div>
        </div>

        {/* BOTTOM CTA */}
        <div className="border-t border-black/10 py-32 flex flex-col items-center text-center">
           <h2 className="font-serif text-5xl md:text-6xl mb-8">Still Unsure? <br/> <span className="italic text-[#E21E3F]">Let's Audit.</span></h2>
           <button 
             onClick={() => onNavigate('landing', 'booking')}
             className="group relative flex items-center justify-center px-10 py-6 bg-[#1a1a1a] text-[#FFF2EC] font-mono text-xs uppercase tracking-[0.3em] font-bold overflow-hidden transition-all duration-300"
           >
             <div className="absolute inset-0 bg-[#FFF2EC] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
             <span className="relative z-10 flex items-center gap-4 group-hover:text-[#1a1a1a] transition-colors duration-500">
               [ BOOK_DISCOVERY_CALL ]
               <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
             </span>
           </button>
        </div>

      </div>
    </motion.div>
  );
};

export default Pillar2;