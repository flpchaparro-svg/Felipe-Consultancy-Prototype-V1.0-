import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Zap, Shield, Layers, Clock, Settings, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';
import GlobalFooter from './GlobalFooter';

interface DigitalRevenueArchitectureProps {
  onBack: () => void;
  onNavigate: (view: 'landing' | 'about' | 'architecture' | 'digital-revenue', sectionId?: string) => void;
}

const DigitalRevenueArchitecture: React.FC<DigitalRevenueArchitectureProps> = ({ onBack, onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const tiers = [
    {
      id: 'tier-1',
      title: 'Local Velocity',
      price: '$2.5k - $4k',
      time: '7 Days',
      target: 'Trades & Local Consultants',
      description: 'A high-speed lead generation machine engineered for local dominance. Focus on capture and call-to-action logic.',
      features: ['Conversion-Ready CMS', 'Local SEO Core', 'GMB Integration', 'Lead Triage Setup']
    },
    {
      id: 'tier-2',
      title: 'Retail Ecosystem',
      price: '$3.5k - $6k',
      time: '14 Days',
      target: 'Growth-Stage E-com',
      description: 'Shopify-driven high-converting storefront. Optimized for LTV and frictionless checkout performance.',
      features: ['Shopify Engine', 'Inventory Sync', 'Retention Automations', 'UGC Integration']
    },
    {
      id: 'tier-3',
      title: 'Performance Architecture',
      price: '$5k - $8k',
      time: '21 Days',
      target: 'SaaS & FinTech',
      description: 'Unhackable, instant-loading Next.js architecture. Built for deep CRM integration and enterprise security.',
      features: ['Headless Architecture', 'Edge Functions', 'Custom CRM Mapping', 'SSO/Auth Ready']
    },
    {
      id: 'tier-4',
      title: 'Flagship Experience',
      price: '$15k+',
      time: 'Custom',
      target: 'Luxury & Enterprise',
      description: 'The "Digital Theatre." A bespoke headless commerce masterpiece designed for brand storytelling and market leadership.',
      features: ['Creative Art Direction', 'Custom GLSL Shaders', 'Global Scalability', 'Priority Concierge']
    }
  ];

  const roadmap = [
    { day: '01', title: 'Architecture', task: 'Mapping logic gates and data flow between Web and CRM.' },
    { day: '02', title: 'Blueprint', task: 'Wireframing high-intent capture zones based on user psychology.' },
    { day: '03-05', title: 'Deployment', task: 'Mechanical build of the UI and technical stack integration.' },
    { day: '06', title: 'Stress Test', task: 'Protocol verification: Load testing, SEO check, and Lead-Sync tests.' },
    { day: '07', title: 'Launch', task: 'System live. Transition to Active Monitoring status.' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="relative min-h-screen w-full bg-[#FFF2EC] text-[#1a1a1a] pt-32 pb-0 px-0 z-10 flex flex-col"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow relative z-20">
        
        {/* NAVIGATION */}
        <div className="flex items-center gap-6 mb-16 overflow-hidden">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            [ RETURN_HOME )
          </button>
          <span className="h-[1px] w-12 bg-black/20"></span>
          <span className="font-mono text-[10px] text-black/40 uppercase tracking-widest">Protocol_01 // Digital_Revenue</span>
        </div>

        {/* HERO */}
        <div className="mb-32">
          <span className="font-mono text-xs text-[#E21E3F] tracking-[0.4em] mb-8 block uppercase">/ THE_ENGINE_ROOM</span>
          <h1 className="font-serif text-5xl md:text-8xl lg:text-[7rem] leading-[0.95] tracking-tighter text-[#1a1a1a] mb-10 max-w-5xl">
            We don't build sites. <br />
            We engineer <span className="text-[#C5A059] italic">Capture Engines.</span>
          </h1>
          <p className="font-sans text-xl font-light text-[#1a1a1a]/70 leading-relaxed max-w-3xl border-l border-black/20 pl-6">
            Most websites are passive billboards. I build Digital Revenue Architectures that replace human friction with autonomous logic. Every pixel serves the CRM; every line of code serves the P&L.
          </p>
        </div>

        {/* COMPARISON SECTION */}
        <section className="py-24 border-t border-black/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="p-10 bg-white/40 border border-black/5">
              <h3 className="font-mono text-xs text-black/30 uppercase tracking-widest mb-6">Passive_Brochure</h3>
              <ul className="space-y-4 text-black/50 font-sans">
                <li>• Static information blocks</li>
                <li>• Manual lead retrieval</li>
                <li>• Disconnected from Sales stack</li>
                <li>• Vanity metrics (Views)</li>
              </ul>
            </div>
            <div className="p-10 bg-[#1a1a1a] text-white">
              <h3 className="font-mono text-xs text-[#C5A059] uppercase tracking-widest mb-6">Revenue_Engine</h3>
              <ul className="space-y-4 font-sans">
                <li>• Dynamic capture mechanisms</li>
                <li>• Automated CRM syncing</li>
                <li>• Real-time demand triage</li>
                <li>• Performance metrics (ROI)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* TIERS GRID */}
        <section className="py-24 border-t border-black/10">
          <div className="mb-16">
            <span className="font-mono text-[10px] text-[#C5A059] tracking-widest uppercase block mb-2">/ SERVICE_PROTOCOLS</span>
            <h2 className="font-serif text-5xl">Engine <span className="italic">Specs.</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <div key={tier.id} className="group p-8 border border-black/10 hover:bg-white hover:border-[#C5A059] transition-all duration-500 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <span className="font-mono text-[9px] text-[#C5A059] tracking-widest">{tier.time} SPRINT</span>
                    <Globe className="w-4 h-4 text-black/20 group-hover:text-[#C5A059] transition-colors" />
                  </div>
                  <h4 className="font-serif text-3xl mb-1">{tier.title}</h4>
                  <p className="font-mono text-[10px] text-black/40 mb-4 tracking-wider">{tier.target}</p>
                  <p className="font-sans text-xs text-black/60 leading-relaxed mb-8">{tier.description}</p>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-[10px] font-mono text-black/80">
                        <CheckCircle2 className="w-3 h-3 text-[#C5A059]" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="pt-6 border-t border-black/5">
                  <p className="font-serif text-2xl mb-4">{tier.price}</p>
                  <a href="https://meetings-ap1.hubspot.com/felipe" target="_blank" className="block w-full text-center py-3 bg-[#1a1a1a] text-white text-[9px] font-mono uppercase tracking-widest hover:bg-[#C5A059] transition-colors">
                    Deploy Engine
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ROADMAP SPRINT */}
        <section className="py-24 border-t border-black/10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-xl">
              <span className="font-mono text-[10px] text-[#E21E3F] tracking-widest uppercase block mb-2">/ DEPLOYMENT_LOGISTICS</span>
              <h2 className="font-serif text-5xl">The 7-Day <span className="italic">Sprint Protocol.</span></h2>
              <p className="font-sans text-sm text-black/60 mt-4 leading-relaxed">Velocity is my competitive advantage. I don't sit in meetings. I deploy code.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-0 border border-black/10">
            {roadmap.map((step, idx) => (
              <div key={step.day} className="p-8 border-b md:border-b-0 md:border-r border-black/10 last:border-0 hover:bg-white transition-colors group">
                <span className="font-mono text-[9px] text-black/30 group-hover:text-[#C5A059] transition-colors">DAY {step.day}</span>
                <h4 className="font-serif text-2xl mt-4 mb-3">{step.title}</h4>
                <p className="font-sans text-xs text-black/50 leading-relaxed">{step.task}</p>
              </div>
            ))}
          </div>
        </section>

        {/* RETAINER PROTOCOL */}
        <section className="py-24 border-t border-black/10 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <span className="font-mono text-[10px] text-[#C5A059] tracking-widest uppercase block mb-2">/ ASSET_PROTECTION</span>
              <h2 className="font-serif text-4xl italic">Retainer Protocols.</h2>
              <p className="font-sans text-sm text-black/60 mt-4 leading-relaxed">
                Software decays. Competition evolves. My retainers are "Insurance Policies" for your revenue infrastructure.
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-10 border border-black/10 bg-white">
                <div className="flex items-center gap-4 mb-6">
                  <Shield className="w-6 h-6 text-[#C5A059]" />
                  <h4 className="font-serif text-2xl">Digital Insurance</h4>
                </div>
                <p className="font-sans text-xs text-black/50 mb-6 leading-relaxed">
                  Daily backups, security hardening, Uptime monitoring, and monthly system patches. Ensuring your engine never stalls.
                </p>
                <p className="font-mono text-sm font-bold">$150 - $300/mo</p>
              </div>
              <div className="p-10 border border-[#C5A059] bg-[#1a1a1a] text-white">
                <div className="flex items-center gap-4 mb-6">
                  <Activity className="w-6 h-6 text-[#C5A059]" />
                  <h4 className="font-serif text-2xl">Growth Ops</h4>
                </div>
                <p className="font-sans text-xs text-white/50 mb-6 leading-relaxed">
                  Includes Insurance + Continuous CRO, landing page variants, and data-flow optimizations. Active revenue expansion.
                </p>
                <p className="font-mono text-sm font-bold text-[#C5A059]">$600 - $1,000/mo</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <GlobalFooter onNavigate={onNavigate} />
    </motion.div>
  );
};

export default DigitalRevenueArchitecture;