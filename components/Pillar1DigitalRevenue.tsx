import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Zap, Shield, CheckCircle2, Activity, Target } from 'lucide-react';

interface Pillar1Props {
  onBack: () => void;
}

const Pillar1DigitalRevenue: React.FC<Pillar1Props> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const modules = [
    {
      title: 'Local Velocity',
      price: '$2.5k - $4k',
      time: '7 Days',
      desc: 'High-speed lead generation machine engineered for local dominance. Focus on capture and conversion logic for trades and consultants.',
      tags: ['Fast-Deploy', 'Capture-Core']
    },
    {
      title: 'Retail Ecosystem',
      price: '$3.5k - $6k',
      time: '14 Days',
      desc: 'Shopify-driven conversion storefront. Optimized for LTV maximization and frictionless mechanical checkout flows.',
      tags: ['E-com', 'LTV-Ops']
    },
    {
      title: 'Performance Architecture',
      price: '$5k - $8k',
      time: '21 Days',
      desc: 'Unhackable, instant-loading Next.js architecture. Built for deep CRM integration and enterprise security protocols.',
      tags: ['Headless', 'Fintech-Spec']
    },
    {
      title: 'Flagship Experience',
      price: '$15k+',
      time: 'Custom',
      desc: 'Luxury digital theatre. A bespoke headless masterpiece designed for market leadership and cinematic brand storytelling.',
      tags: ['Bespoke', 'Elite']
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="relative min-h-screen w-full bg-[#FFF2EC] text-[#1a1a1a] pt-32 pb-20 px-0 z-10 flex flex-col content-layer"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 w-full flex-grow relative z-20">
        
        {/* NAVIGATION */}
        <div className="flex items-center gap-6 mb-16 overflow-hidden">
          <button 
            onClick={onBack}
            className="group flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] hover:text-[#C5A059] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            [ ARCHITECTURE OVERVIEW )
          </button>
          <span className="h-[1px] w-12 bg-black/20"></span>
          <span className="font-mono text-[10px] text-black/40 uppercase tracking-widest">Protocol_01 // Digital_Revenue</span>
        </div>

        {/* HERO SECTION */}
        <div className="mb-32">
          <div className="flex items-center gap-4 text-[#E21E3F] mb-6">
            <Target className="w-5 h-5" />
            <span className="font-mono text-xs uppercase tracking-[0.4em] font-bold">Pillar_01 // Acquisition_Engine</span>
          </div>
          <h1 className="font-serif text-5xl md:text-8xl lg:text-[7.5rem] leading-[0.95] tracking-tighter text-[#1a1a1a] mb-10 max-w-5xl">
            We build Digital <br />
            <span className="text-[#C5A059] italic">Revenue Engines.</span>
          </h1>
          <p className="font-sans text-xl font-light text-[#1a1a1a]/70 leading-relaxed max-w-3xl border-l border-black/20 pl-6">
            Websites are passive billboards. Engines are active assets. We engineer architectures that capture demand, process intent, and sync directly to your sales stack with zero leakage.
          </p>
        </div>

        {/* SERVICE GRID */}
        <div className="mb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1 border border-black/10 bg-black/10">
            {modules.map((m, idx) => (
              <div key={idx} className="bg-[#FFF2EC] p-10 flex flex-col justify-between group hover:bg-white transition-all duration-500">
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <span className="font-mono text-[9px] text-[#C5A059] tracking-[0.2em]">{m.time} SPRINT</span>
                    <Globe className="w-4 h-4 text-black/10 group-hover:text-[#C5A059]" />
                  </div>
                  <h3 className="font-serif text-3xl mb-4 group-hover:text-[#C5A059] transition-colors">{m.title}</h3>
                  <p className="font-sans text-sm text-black/60 mb-8 leading-relaxed">{m.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-10">
                    {m.tags.map(t => (
                      <span key={t} className="px-2 py-1 bg-black/5 font-mono text-[9px] uppercase tracking-widest text-black/40">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="pt-8 border-t border-black/5">
                  <div className="flex justify-between items-end mb-4">
                    <span className="font-mono text-[9px] text-black/30">INVESTMENT_FLOOR</span>
                    <span className="font-serif text-2xl">{m.price}</span>
                  </div>
                  <a href="https://meetings-ap1.hubspot.com/felipe" target="_blank" className="block w-full text-center py-3 bg-[#1a1a1a] text-white text-[9px] font-mono uppercase tracking-widest hover:bg-[#C5A059] transition-colors">
                    Deploy Prototype
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RETAINER PROTOCOLS */}
        <section className="py-24 border-t border-black/10 mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <span className="font-mono text-[10px] text-[#C5A059] tracking-widest uppercase block mb-4">/ ASSET_PROTECTION</span>
              <h2 className="font-serif text-4xl italic leading-tight">Mechanical <br />Insurance.</h2>
              <p className="font-sans text-sm text-black/60 mt-6 leading-relaxed">
                Systems decay without maintenance. Our retainers are engineered to protect your revenue infrastructure from technical entropy and market shifts.
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-10 border border-black/10 bg-white shadow-sm">
                <Shield className="w-8 h-8 text-[#C5A059] mb-6" />
                <h4 className="font-serif text-2xl mb-4">Digital Insurance</h4>
                <p className="font-sans text-sm text-black/50 mb-8 leading-relaxed">Daily backups, security hardening, and uptime monitoring. Ensuring the engine never stalls.</p>
                <div className="flex justify-between items-center border-t border-black/5 pt-6">
                  <span className="font-mono text-[10px] text-black/30">SUBSCRIPTION</span>
                  <span className="font-mono text-xs font-bold">$150 - $300 / MO</span>
                </div>
              </div>
              <div className="p-10 bg-[#1a1a1a] text-white">
                <Activity className="w-8 h-8 text-[#E21E3F] mb-6" />
                <h4 className="font-serif text-2xl mb-4 text-[#FFF2EC]">Growth Ops</h4>
                <p className="font-sans text-sm text-white/50 mb-8 leading-relaxed">Continuous CRO, landing page variants, and data-flow optimization for scaling ROI.</p>
                <div className="flex justify-between items-center border-t border-white/5 pt-6">
                  <span className="font-mono text-[10px] text-white/30">SUBSCRIPTION</span>
                  <span className="font-mono text-xs font-bold text-[#E21E3F]">$600 - $1,000 / MO</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="py-12 border-t border-black/10 flex items-center gap-4">
          <Activity className="w-6 h-6 text-[#C5A059]" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-black/40">Protocol: Capture_Authenticated // Revenue_Asset_Live</span>
        </div>
      </div>
    </motion.div>
  );
};

export default Pillar1DigitalRevenue;