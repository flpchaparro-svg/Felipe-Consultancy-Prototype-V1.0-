import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Activity, Microscope, LineChart, TowerControl, CheckCircle2 } from 'lucide-react';
import PillarVisual_Radar from './PillarVisual_Radar';

interface PillarPageProps {
  onBack: () => void;
  onNavigate: (view: string, sectionId?: string) => void;
}

const PillarPage_Intelligence: React.FC<PillarPageProps> = ({ onBack, onNavigate }) => {

  const services = [
    {
      id: 'pulse',
      icon: Activity,
      accent: 'text-[#E21E3F]',
      bgAccent: 'bg-[#E21E3F]',
      title: 'Tier 01 // The Revenue Pulse',
      tagline: 'Real-Time Dashboard. Unit Economics.',
      promise: 'Stop guessing. Know exactly which dollar is making profit.',
      who: 'For High-Growth Founders ($5M+). You are spending $20k/month on ads across Google, FB, and LinkedIn, but you have no idea which channel is actually driving the profit.',
      description: 'We don\'t sell "Vanity Metrics" (Clicks/Likes). We build a Revenue Pulse dashboard that connects your Ad Accounts to your Bank Account. You will see the "Unit Economics" of every lead. You stop flying the plane blind and start steering with precision.',
      specs: ['PowerBI / Looker Studio', 'Cross-Channel Attribution', 'Profit Margin Tracking', 'Real-Time Updates']
    },
    {
      id: 'lab',
      icon: Microscope,
      accent: 'text-[#C5A059]',
      bgAccent: 'bg-[#C5A059]',
      title: 'Tier 02 // The Conversion Lab',
      tagline: 'Forensic UX. Heatmaps.',
      promise: 'Fix the leaky bucket. Watch why they aren\'t buying.',
      who: 'For E-commerce & Traffic-Rich Sites. You have thousands of visitors, but your conversion rate is stuck at 1%. You suspect something is broken, but you don\'t know what.',
      description: 'We perform a forensic audit of your user experience. We use Heatmaps and Session Recordings to watch real users struggle with your site. We find the "Rage Clicks," the broken forms, and the confusing copy. We give you a "Fix List" to stop the bleeding instantly.',
      specs: ['Microsoft Clarity / Hotjar', 'Session Replay Analysis', 'Dead-Click Detection', 'UX Friction Audit']
    },
    {
      id: 'oracle',
      icon: LineChart,
      accent: 'text-[#1a1a1a]',
      bgAccent: 'bg-[#1a1a1a]',
      title: 'Tier 03 // The Predictive Oracle',
      tagline: 'Churn Prediction. LTV Modeling.',
      promise: 'Predict the future. Prove your revenue is a certainty.',
      who: 'For Exit-Minded Founders. You are planning to sell the business in 2 years. Buyers are offering a low valuation because they see your revenue as "Risky."',
      description: 'We use Data Science (BigQuery) to model the "Behavioral DNA" of your customers. We predict exactly who will Churn and who will Upsell before it happens. We turn your revenue into a "Financial Instrument," justifying a much higher exit valuation.',
      specs: ['BigQuery Data Warehousing', 'AI Churn Modeling', 'LTV Forecasting', 'Investor-Grade Reporting']
    },
    {
      id: 'tower',
      icon: TowerControl,
      accent: 'text-[#E21E3F]',
      bgAccent: 'bg-[#E21E3F]',
      title: 'Tier 04 // The Control Tower',
      tagline: 'Ecosystem Governance. CDO Service.',
      promise: 'Total Command. The business steers itself.',
      who: 'For Margin-Squeezed Wholesalers & Logistics. Your Sales team doesn\'t talk to Inventory. You are losing margin on hidden waste and shipping errors.',
      description: 'We act as your Fractional Chief Data Officer (CDO). We link every silo—Sales, Inventory, Finance, Logistics—into one central brain. You get a "Control Tower" view of the entire operation. You can spot a 1% margin leak in real-time and fix it before it costs you millions.',
      specs: ['Cross-Platform Sync', 'Inventory Intelligence', 'Executive Governance', 'Fractional CDO Support']
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
                <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block uppercase font-bold">/ SYSTEM_07 // VISION</span>
                <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-8">
                  Intelligence <br />
                  <span className="italic text-[#E21E3F]">Architecture.</span>
                </h1>
                <p className="font-sans text-xl text-[#1a1a1a]/70 leading-relaxed max-w-md border-l-2 border-[#C5A059] pl-6 mb-12">
                   The Eyes of the Business. <br/>
                   We replace "Gut Feeling" with a <strong>Control Tower</strong> that shows you exactly where your profit is coming from.
                </p>
                
                <div className="flex items-center gap-2 animate-bounce cursor-pointer" onClick={() => document.getElementById('tiers')?.scrollIntoView({ behavior: 'smooth' })}>
                    <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">Activate Sensors</span>
                    <ArrowRight className="w-4 h-4 rotate-90 opacity-50" />
                </div>
              </div>

              <div className="h-[400px] lg:h-[600px] flex items-center justify-center lg:justify-end relative z-0">
                 <PillarVisual_Radar />
              </div>
           </div>
        </div>

        {/* --- THE SERVICE STACK (Vertical Layout) --- */}
        <div id="tiers" className="py-20">
           
           <div className="mb-20">
              <h2 className="font-serif text-4xl md:text-5xl mb-6">Gain Clarity.</h2>
              <p className="font-sans text-lg text-[#1a1a1a]/60 max-w-2xl">
                You are data rich, but insight poor. <br/> Identify the blind spot you need to illuminate.
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
           <h2 className="font-serif text-5xl md:text-6xl mb-8">Stop flying blind. <br/> <span className="italic text-[#E21E3F]">Start Seeing.</span></h2>
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

export default PillarPage_Intelligence;