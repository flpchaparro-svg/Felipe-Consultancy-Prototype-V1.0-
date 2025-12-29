import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Receipt, FileSignature, Bot, Link2, CheckCircle2 } from 'lucide-react';
import PillarVisual_Turbine from './PillarVisual_Turbine';

interface PillarPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

const PillarPage_Automation: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {

  const services = [
    {
      id: 'finance',
      icon: Receipt,
      accent: 'text-[#E21E3F]',
      bgAccent: 'bg-[#E21E3F]',
      title: 'Tier 01 // Financial Autopilot',
      tagline: 'Zero-Touch. Cashflow.',
      promise: 'From "Deal Won" to "Invoice Paid" without clicking a button.',
      who: 'For Service Providers drowning in admin. You spend your Sunday nights sending invoices and chasing late payments manually.',
      description: 'We decouple your revenue from your admin time. We connect your CRM to your Accounting software (Xero/MYOB). When a deal is signed, the invoice is generated, sent, and reconciled automatically. If they don\'t pay, the system chases them for you. You just watch the bank balance grow.',
      specs: ['CRM to Xero/Stripe Sync', 'Auto-Chasing Logic', 'Receipt Matching', 'Tax Compliance Automation']
    },
    {
      id: 'onboarding',
      icon: FileSignature,
      accent: 'text-[#C5A059]',
      bgAccent: 'bg-[#C5A059]',
      title: 'Tier 02 // The Onboarding Engine',
      tagline: 'Speed. Consistency.',
      promise: 'The Magic Button. Launch a new client in 30 seconds, not 3 hours.',
      who: 'For Agencies & Consultants. Setting up a new client is a friction point. It takes hours to do contracts, folders, and welcome emails.',
      description: 'We turn your onboarding into a single click. You trigger the "Won" stage, and the system generates the custom contract (DocuSign), creates the Google Drive/Slack channels, and sends the welcome sequence. Your client feels an instant, premium experience, and you save hours of admin.',
      specs: ['DocuSign/PandaDoc Automation', 'Project Folder Logic', 'Welcome Sequences', 'Team Task Assignment']
    },
    {
      id: 'ai_workforce',
      icon: Bot,
      accent: 'text-[#1a1a1a]',
      bgAccent: 'bg-[#1a1a1a]',
      title: 'Tier 03 // The AI Workforce',
      tagline: '24/7 Scale. No Headcount.',
      promise: 'Digital Employees that never sleep, never complain, and never miss a lead.',
      who: 'For High-Inquiry Businesses. Your team is burning out answering the same 5 questions all day on email and WhatsApp.',
      description: 'We deploy AI Agents trained on your specific business knowledge. They live on your website and socials, qualifying leads, answering complex FAQs, and booking meetings directly into your calendar. They handle the noise so your humans can handle the high-value deals.',
      specs: ['Custom GPT Training', '24/7 Chat Availability', 'Calendar Booking Sync', 'Tone-of-Voice calibration']
    },
    {
      id: 'ecosystem',
      icon: Link2,
      accent: 'text-[#E21E3F]',
      bgAccent: 'bg-[#E21E3F]',
      title: 'Tier 04 // Ecosystem Sync',
      tagline: 'The Invisible Bridge.',
      promise: 'Connect your disparate systems. Data flows like water.',
      who: 'For E-commerce & Logistics. You are manually moving data between Shopify, your Warehouse, and your CRM. It is slow and error-prone.',
      description: 'We build the middleware infrastructure (Make/Zapier) that acts as the nervous system for your tools. We ensure inventory updates in real-time, shipping labels print automatically, and customer data is perfectly mirrored across your entire stack. No more copy-pasting.',
      specs: ['API Middleware Architecture', 'Inventory Sync Logic', 'Error Handling Protocols', 'Multi-Platform Integration']
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
                <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block uppercase font-bold">/ SYSTEM_03 // VELOCITY</span>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-8">
                  Fulfillment <br />
                  <span className="italic text-[#E21E3F]">Architecture.</span>
                </h1>
                <p className="font-sans text-xl text-[#1a1a1a]/70 leading-relaxed max-w-md border-l-2 border-[#C5A059] pl-6 mb-12">
                   Revenue should not depend on Headcount. <br/>
                   We build the digital workforce that handles the admin, so your human team can focus on the <strong>High-Value</strong> work.
                </p>
                
                <div className="flex items-center gap-2 animate-bounce">
                    <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">Select your Automation</span>
                    <ArrowRight className="w-4 h-4 rotate-90 opacity-50" />
                </div>
              </div>

              <div className="h-[400px] lg:h-[600px] flex items-center justify-center lg:justify-end relative z-0">
                 <PillarVisual_Turbine />
              </div>
           </div>
        </div>

        {/* --- THE SERVICE STACK (Vertical Layout) --- */}
        <div className="py-20">
           
           <div className="mb-20">
              <h2 className="font-serif text-4xl md:text-5xl mb-6">Choose your Engine.</h2>
              <p className="font-sans text-lg text-[#1a1a1a]/60 max-w-2xl">
                Automation is not about being "lazy." It is about being "scalable." <br/> Identify where you are burning human hours.
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
           <h2 className="font-serif text-5xl md:text-6xl mb-8">Stop grinding. <br/> <span className="italic text-[#E21E3F]">Start Scaling.</span></h2>
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

export default PillarPage_Automation;