import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Headphones, Scan, Map, Users, CheckCircle2 } from 'lucide-react';
import PillarVisual_Helix from './PillarVisual_Helix';

interface PillarPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

const PillarPage_Adoption: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {

  const services = [
    {
      id: 'media_engine',
      icon: Headphones,
      accent: 'text-[#E21E3F]',
      bgAccent: 'bg-[#E21E3F]',
      title: 'Tier 01 // Internal Media Engine',
      tagline: 'Private Podcast. Audio Learning.',
      promise: 'Turn SOPs into Spotify. Learn while you drive.',
      who: 'For Logistics & Field Fleets (Deskless Workers). Your drivers and tradies never read safety bulletins because they are behind the wheel.',
      description: 'We clone the founder\'s voice and convert boring text updates into a private "Company Podcast." Your team listens to safety briefings and sales updates on their commute. It turns "Dead Time" into "Training Time" without stopping the workflow.',
      specs: ['AI Voice Cloning', 'Private RSS Feed', 'Automated Audio Gen', 'Consumption Analytics']
    },
    {
      id: 'micro_learning',
      icon: Scan,
      accent: 'text-[#C5A059]',
      bgAccent: 'bg-[#C5A059]',
      title: 'Tier 02 // Micro-Learning Matrix',
      tagline: 'QR Codes. Just-in-Time.',
      promise: 'TikTok for Training. Answers in 60 seconds.',
      who: 'For High-Churn Retail & Hospitality. You are tired of repeating the same 5-minute training to every new casual staff member.',
      description: 'We build a library of 60-second video answers linked to QR codes placed physically in your workplace. When a staff member forgets how to use the coffee machine, they scan the code and watch the video. They solve the problem without interrupting the manager.',
      specs: ['QR Code Library', 'AI Avatar Video Gen', 'Mobile-First Hosting', 'Usage Tracking']
    },
    {
      id: 'visual_intel',
      icon: Map,
      accent: 'text-[#1a1a1a]',
      bgAccent: 'bg-[#1a1a1a]',
      title: 'Tier 03 // Visual Intelligence Factory',
      tagline: 'Logic Maps. Cheat Sheets.',
      promise: 'One image is worth 1,000 words. Visualise the invisible.',
      who: 'For Non-Technical Executives & Boards. You have complex processes trapped in 20-page text documents that nobody reads or understands.',
      description: 'We turn dense text SOPs into beautiful, one-page logic maps and cheat sheets. We visualize the money flow, the data flow, and the decision trees. It reduces "Cognitive Load" and makes complex systems instantly understandable for the board and the frontline.',
      specs: ['Process Logic Mapping', 'Infographic Design', 'One-Page Cheat Sheets', 'Flowchart Architecture']
    },
    {
      id: 'analyst',
      icon: Users,
      accent: 'text-[#E21E3F]',
      bgAccent: 'bg-[#E21E3F]',
      title: 'Tier 04 // The Adoption Analyst',
      tagline: 'Internal AI. Support Desk.',
      promise: 'The Instant Answer. Stop the billable interruption.',
      who: 'For Professional Services (Law/Medical). Your senior partners are wasting $500/hr answering basic questions for junior staff.',
      description: 'We deploy an internal AI bot trained on your specific company handbook and past cases. Juniors ask the bot: "How do I file this motion?" or "What is the billing code for X?" and get an instant, cited answer. It protects your senior talent from low-value questions.',
      specs: ['Internal AI Chatbot', 'Policy Training', 'Slack/Teams Integration', 'Citation Logic']
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
                <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block uppercase font-bold">/ SYSTEM_06 // CULTURE</span>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-8">
                  Adoption <br />
                  <span className="italic text-[#E21E3F]">Architecture.</span>
                </h1>
                <p className="font-sans text-xl text-[#1a1a1a]/70 leading-relaxed max-w-md border-l-2 border-[#C5A059] pl-6 mb-12">
                   The best software in the world is useless if nobody uses it. <br/>
                   We engineer the <strong>Behavioral Shift</strong> required to turn "Shelfware" into culture.
                </p>
                
                <div className="flex items-center gap-2 animate-bounce cursor-pointer" onClick={() => document.getElementById('tiers')?.scrollIntoView({ behavior: 'smooth' })}>
                    <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">Explore Learning Tiers</span>
                    <ArrowRight className="w-4 h-4 rotate-90 opacity-50" />
                </div>
              </div>

              <div className="h-[400px] lg:h-[600px] flex items-center justify-center lg:justify-end relative z-0">
                 <PillarVisual_Helix />
              </div>
           </div>
        </div>

        {/* --- THE SERVICE STACK (Vertical Layout) --- */}
        <div id="tiers" className="py-20">
           
           <div className="mb-20">
              <h2 className="font-serif text-4xl md:text-5xl mb-6">Change the Behavior.</h2>
              <p className="font-sans text-lg text-[#1a1a1a]/60 max-w-2xl">
                Training is not an event; it is an infrastructure. <br/> Identify how your team prefers to learn.
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

                            {/* --- STANDARDIZED BUTTON --- */}
                            <button 
                                onClick={() => onNavigate('landing', 'booking')}
                                className="w-full py-4 bg-[#1a1a1a] text-[#FFF2EC] relative overflow-hidden group/btn border border-[#1a1a1a]"
                            >
                                <div className="absolute inset-0 bg-[#FFF2EC] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                                <span className="relative z-10 flex items-center justify-center gap-4 group-hover/btn:text-[#1a1a1a] transition-colors duration-500 font-mono text-[10px] uppercase tracking-[0.2em]">
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
           <h2 className="font-serif text-5xl md:text-6xl mb-8">Stop pushing. <br/> <span className="italic text-[#E21E3F]">Start Pulling.</span></h2>
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

export default PillarPage_Adoption;