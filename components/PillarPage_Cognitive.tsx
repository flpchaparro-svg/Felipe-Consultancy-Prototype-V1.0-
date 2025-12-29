import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Bot, Brain, ShieldAlert, PhoneCall, CheckCircle2 } from 'lucide-react';
import PillarVisual_Brain from './PillarVisual_Brain';

interface PillarPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

const PillarPage_Cognitive: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {

  const services = [
    {
      id: 'concierge',
      icon: Bot,
      accent: 'text-[#E21E3F]',
      bgAccent: 'bg-[#E21E3F]',
      title: 'Tier 01 // The Growth Concierge',
      tagline: 'Always-On. Sales Qualifier.',
      promise: 'The Gatekeeper. An SDR that never sleeps.',
      who: 'For Real Estate, High-Ticket Coaching, & Luxury Sales. You are drowning in "Tire Kickers"—people who ask "Is this available?" but have no money.',
      description: 'We install a "Gatekeeper AI" on your site and socials. It acts as a polite but firm filter. It answers inquiries instantly, checks for budget and timeline, and ONLY lets the qualified leads book a time on your calendar. You stop waking up to junk meetings.',
      specs: ['24/7 Chat Qualification', 'Calendar Booking Sync', 'Human Handoff Logic', 'Tone-of-Voice Calibration']
    },
    {
      id: 'internal',
      icon: Brain,
      accent: 'text-[#C5A059]',
      bgAccent: 'bg-[#C5A059]',
      title: 'Tier 02 // The Internal Analyst',
      tagline: 'Company Brain. Knowledge Wiki.',
      promise: 'Clone your brain. Stop answering the same question twice.',
      who: 'For Agencies & Consultancies. You are the "Bottleneck Founder." Your staff constantly interrupts you to ask things that are already in the handbook.',
      description: 'We ingest your entire Google Drive, Slack history, and SOPs into a private "Company Brain." Your staff can ask: "What is our pricing for Project X?" or "How do I handle this objection?" and get an instant, cited answer. It cuts training time in half.',
      specs: ['Vector Database (Pinecone)', 'Slack/Teams Integration', 'Document Scraping', 'Source Citation']
    },
    {
      id: 'custom',
      icon: ShieldAlert,
      accent: 'text-[#1a1a1a]',
      bgAccent: 'bg-[#1a1a1a]',
      title: 'Tier 03 // Custom Architecture',
      tagline: 'Safety. Data Sovereignty.',
      promise: 'Sovereign AI. Your data never leaves the building.',
      who: 'For FinTech, Law, & Wealth Management. You want to use AI to summarize portfolios or contracts, but you are terrified of a data leak.',
      description: 'We build "Walled Garden" AI environments. We use private APIs and local hosting to ensure that your sensitive client data is processed securely and NEVER used to train a public model. You get the intelligence of GPT-4 with the security of a bank vault.',
      specs: ['PII Redaction Layers', 'Local Model Hosting', 'Zero-Retention APIs', 'Enterprise Compliance']
    },
    {
      id: 'voice',
      icon: PhoneCall,
      accent: 'text-[#E21E3F]',
      bgAccent: 'bg-[#E21E3F]',
      title: 'Tier 04 // The Voice Interface',
      tagline: 'Phone Agent. Zero Latency.',
      promise: 'Never miss a call again. Replaces the "Robot Menu".',
      who: 'For Emergency Trades (Plumbers/Locksmiths) & Medical Clinics. You are physically working and cannot pick up the phone. Every missed ring is revenue lost.',
      description: 'We replace your voicemail with a hyper-realistic Voice AI. It sounds human, understands Australian accents, and can handle the full booking process. It takes the customer\'s details, checks your availability, and books the job while you are under a sink or in surgery.',
      specs: ['Human-Inflection Voice (ElevenLabs)', 'Twilio Telephony Sync', 'Real-Time CRM Logging', 'SMS Follow-Up']
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
                <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block uppercase font-bold">/ SYSTEM_04 // COGNITION</span>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-8">
                  Cognitive <br />
                  <span className="italic text-[#E21E3F]">Infrastructure.</span>
                </h1>
                <p className="font-sans text-xl text-[#1a1a1a]/70 leading-relaxed max-w-md border-l-2 border-[#C5A059] pl-6 mb-12">
                   The Voice & Reason of the business. <br/>
                   We don't just build chatbots; we engineer <strong>Digital Employees</strong> that can reason, speak, and act 24/7.
                </p>
                
                <div className="flex items-center gap-2 animate-bounce cursor-pointer" onClick={() => document.getElementById('tiers')?.scrollIntoView({ behavior: 'smooth' })}>
                    <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">Meet your new team</span>
                    <ArrowRight className="w-4 h-4 rotate-90 opacity-50" />
                </div>
              </div>

              <div className="h-[400px] lg:h-[600px] flex items-center justify-center lg:justify-end relative z-0">
                 <PillarVisual_Brain />
              </div>
           </div>
        </div>

        {/* --- THE SERVICE STACK (Vertical Layout) --- */}
        <div id="tiers" className="py-20">
           
           <div className="mb-20">
              <h2 className="font-serif text-4xl md:text-5xl mb-6">Choose your Agent.</h2>
              <p className="font-sans text-lg text-[#1a1a1a]/60 max-w-2xl">
                AI is not a toy. It is leverage. <br/> Identify the human bottleneck you need to remove.
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
           <h2 className="font-serif text-5xl md:text-6xl mb-8">Stop answering. <br/> <span className="italic text-[#E21E3F]">Start Designing.</span></h2>
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

export default PillarPage_Cognitive;