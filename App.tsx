import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useAnimationFrame, useMotionValue, useSpring, useTransform } from 'framer-motion';
import * as d3 from 'd3';
import BentoGrid from './components/BentoGrid';
import Modal from './components/Modal';
import D3Background from './components/D3Background';
import TheArchitect from './components/TheArchitect';
import BookingCTA from './components/BookingCTA';
import EvidencePage from './components/EvidencePage';
import RevenueAudit from './components/RevenueAudit';
import AboutPage from './components/AboutPage'; 
import ArchitecturePage from './components/ArchitecturePage';
import ProtocolPage from './components/ProtocolPage';
import ContactPage from './components/ContactPage';
import Pillar1 from './components/Pillar1';
import Pillar2 from './components/Pillar2';
import PillarPage_Automation from './components/PillarPage_Automation';
import PillarPage_Cognitive from './components/PillarPage_Cognitive';
import PillarPage_Media from './components/PillarPage_Media';
import PillarPage_Adoption from './components/PillarPage_Adoption';
import PillarPage_Intelligence from './components/PillarPage_Intelligence';
import GlobalFooter from './components/GlobalFooter';
import GlobalHeader from './components/GlobalHeader';
import HeroVisual from './components/HeroVisual';
import PageTransition from './components/PageTransition';
import Feature_Group7 from './components/Feature_Group7';
import { ServiceDetail } from './types';
import { ChevronDown, AlertTriangle, Database, Clock, EyeOff, ArrowDown, CheckCircle2, XCircle } from 'lucide-react';

const TECH_STACK = [
  'XERO', 'SHOPIFY', 'PYTHON', 'OPENAI_API', 'MAKE', 'HUBSPOT', 
  'TWILIO', 'SUPABASE', 'KLAVIYO', 'STRIPE_CONNECT'
];

// --- HELPERS (GrowthGraph) ---
const GrowthGraph: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const width = 400; const height = 240;
    const margin = { top: 40, right: 60, bottom: 40, left: 20 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    d3.select(containerRef.current).selectAll('*').remove();
    const svg = d3.select(containerRef.current).append('svg').attr('width', '100%').attr('height', '100%').attr('viewBox', `0 0 ${width} ${height}`).attr('preserveAspectRatio', 'xMidYMid meet');
    const chart = svg.append('g').attr('transform', `translate(${margin.left}, ${margin.top})`);
    const xTicks = [0, 0.25, 0.5, 0.75, 1];
    chart.selectAll('.grid-line').data(xTicks).enter().append('line').attr('x1', d => d * chartWidth).attr('x2', d => d * chartWidth).attr('y1', -10).attr('y2', chartHeight + 10).attr('stroke', '#1a1a1a').attr('stroke-opacity', 0.05).attr('stroke-dasharray', '2,2');
    const barHeight = 12; const gap = 60;
    const prodG = chart.append('g').attr('transform', `translate(0, ${chartHeight / 2 - gap / 2})`);
    prodG.append('text').attr('y', -12).attr('class', 'font-mono text-[9px] uppercase tracking-[0.2em] fill-[#1a1a1a] opacity-40').text('REVENUE_VELOCITY');
    prodG.append('rect').attr('width', chartWidth).attr('height', barHeight).attr('fill', '#1a1a1a').attr('opacity', 0.03);
    const prodBar = prodG.append('rect').attr('width', 0).attr('height', barHeight).attr('fill', '#C5A059');
    const prodVal = prodG.append('text').attr('x', 0).attr('y', barHeight / 2 + 4).attr('class', 'font-mono text-[10px] font-bold fill-[#C5A059]').attr('dx', 8).text('0%');
    const adminG = chart.append('g').attr('transform', `translate(0, ${chartHeight / 2 + gap / 2})`);
    adminG.append('text').attr('y', -12).attr('class', 'font-mono text-[9px] uppercase tracking-[0.2em] fill-[#1a1a1a] opacity-40').text('OPERATIONAL_DRAG');
    adminG.append('rect').attr('width', chartWidth).attr('height', barHeight).attr('fill', '#1a1a1a').attr('opacity', 0.03);
    const adminBar = adminG.append('rect').attr('width', chartWidth).attr('height', barHeight).attr('fill', '#E21E3F');
    const adminVal = adminG.append('text').attr('x', chartWidth).attr('y', barHeight / 2 + 4).attr('class', 'font-mono text-[10px] font-bold fill-[#E21E3F]').attr('dx', 8).text('100%');
    function animate() {
      const duration = 4000; const ease = d3.easeCubicInOut;
      prodBar.attr('width', 0); prodVal.attr('x', 0).text('0%');
      adminBar.attr('width', chartWidth); adminVal.attr('x', chartWidth).text('100%');
      prodBar.transition().duration(duration).ease(ease).attr('width', chartWidth * 0.95);
      prodVal.transition().duration(duration).ease(ease).attr('x', chartWidth * 0.95).tween('text', function() { const i = d3.interpolate(0, 95); return (t) => { prodVal.text(`${Math.round(i(t))}%`); }; });
      adminBar.transition().duration(duration).ease(ease).attr('width', chartWidth * 0.12);
      adminVal.transition().duration(duration).ease(ease).attr('x', chartWidth * 0.12).tween('text', function() { const i = d3.interpolate(100, 12); return (t) => { adminVal.text(`${Math.round(i(t))}%`); }; }).on('end', () => { d3.timeout(animate, 2000); });
    }
    animate();
  }, []);
  return <div ref={containerRef} className="w-full h-full min-h-[300px] flex items-center justify-center bg-transparent" />;
};

// --- VISUALS: MINIMALIST WIREFRAMES ---
const FrictionVisual: React.FC<{ type: string }> = ({ type }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    d3.select(container).selectAll('*').remove();
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;
    const svg = d3.select(container).append('svg').attr('width', '100%').attr('height', '100%').attr('viewBox', `0 0 ${width} ${height}`).style('overflow', 'visible');
    const g = svg.append('g').attr('transform', `translate(${width/2}, ${height/2})`);
    
    const stroke = '#1a1a1a';
    const alert = '#E21E3F';

    if (type === 'leakage') {
       g.append('path').attr('d', "M -60 -80 L -20 20 L -20 80 L 20 80 L 20 20 L 60 -80 Z").attr('fill', 'none').attr('stroke', stroke).attr('stroke-width', 1.5).attr('stroke-dasharray', '4,4');
       g.append('line').attr('x1', -20).attr('y1', 40).attr('x2', -40).attr('y2', 60).attr('stroke', alert).attr('stroke-width', 2);
       const pG = g.append('g');
       d3.interval(() => {
          pG.append('circle').attr('cx', 0).attr('cy', -80).attr('r', 2).attr('fill', alert).attr('opacity', 0.6)
            .transition().duration(2500).ease(d3.easeLinear).attr('cy', -60).attr('opacity', 0).remove();
       }, 250);
    }
    else if (type === 'silos') {
       const l = g.append('line').attr('x1', -15).attr('x2', -15).attr('y1', -40).attr('y2', 40).attr('stroke', stroke).attr('stroke-width', 1.5);
       const r = g.append('line').attr('x1', 15).attr('x2', 15).attr('y1', -40).attr('y2', 40).attr('stroke', stroke).attr('stroke-width', 1.5);
       d3.timer((t) => {
          const off = Math.sin(t * 0.002) * 6;
          l.attr('transform', `translate(${-off}, 0)`);
          r.attr('transform', `translate(${off}, 0)`);
       });
    }
    else if (type === 'trap') {
       const box = g.append('rect').attr('x', -25).attr('y', -25).attr('width', 50).attr('height', 50).attr('stroke', alert).attr('stroke-width', 1.5).attr('fill', 'none');
       d3.timer((t) => {
          const s = 1 + Math.sin(t * 0.0015) * 0.05;
          box.attr('transform', `scale(${s})`);
       });
    }
    else if (type === 'blind') {
       const defs = svg.append('defs');
       const filter = defs.append('filter').attr('id', 'blurMe');
       filter.append('feGaussianBlur').attr('stdDeviation', 4);
       const c = g.append('circle').attr('r', 30).attr('fill', stroke).attr('opacity', 0.1).attr('filter', 'url(#blurMe)');
       d3.timer((t) => {
          const s = 1 + Math.sin(t * 0.001) * 0.2;
          c.attr('r', 35 * s);
       });
    }
  }, [type]);
  return <div ref={containerRef} className="w-full h-full" />;
};

// --- STICKY TAB SECTION (SYNCED SCROLL) ---
const FrictionAuditSection: React.FC<{ onNavigate: (v:string)=>void }> = ({ onNavigate }) => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const [activeIndex, setActiveIndex] = useState(0);

    const points = [
        { 
          id: 'leakage',
          title: 'Lead Evaporation', 
          stat: '$500/day',
          body: "Demand hits your site and vanishes. Your current form logic is a sieve, not a catcher. You are paying for leads that expire in the inbox.",
        },
        { 
          id: 'silos',
          title: 'Double-Entry Tax', 
          stat: '15hrs/week',
          body: "Sales types it. Ops types it again. Finance types it a third time. You are paying triple wages for the same data entry errors.",
        },
        { 
          id: 'trap',
          title: 'Admin Paralysis', 
          stat: 'Growth Cap',
          body: "You are the 'Chief Admin Officer'. You spend 40% of your week fixing invoices and scheduling instead of steering the ship.",
        },
        { 
          id: 'blind',
          title: 'Profit Blindness', 
          stat: 'Risk: High',
          body: "You know your Revenue, but not your Real-Time Margin. You are flying a 747 through a storm with no radar.",
        }
    ];

    // Determine active index based on scroll position
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        // Break scroll into segments
        const index = Math.min(Math.floor(latest * points.length), points.length - 1);
        setActiveIndex(index);
    });

    return (
        <section ref={targetRef} className="relative bg-[#FFF2EC] z-30 border-t border-[#1a1a1a]/5 h-[500vh]">
            <div className="sticky top-0 h-screen flex flex-col md:flex-row overflow-hidden">
                
                {/* --- LEFT: VISUAL (Changes based on Index) --- */}
                <div className="hidden md:flex w-1/2 h-full items-center justify-center border-r border-[#1a1a1a]/10 bg-[#FFF2EC] relative">
                    {/* Fixed Label */}
                    <div className="absolute top-12 left-12 z-20">
                       <span className="font-mono text-xs text-[#E21E3F] uppercase tracking-widest font-bold block">02 // THE FRICTION AUDIT</span>
                    </div>

                    {/* The Changing Window */}
                    <div className="w-[400px] h-[400px] bg-white border border-[#1a1a1a]/10 shadow-2xl relative flex items-center justify-center overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={points[activeIndex].id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                transition={{ duration: 0.4 }}
                                className="absolute inset-0"
                            >
                                <FrictionVisual type={points[activeIndex].id} />
                            </motion.div>
                        </AnimatePresence>
                        <div className="absolute bottom-6 left-6 font-mono text-[10px] text-[#1a1a1a]/40 uppercase tracking-widest">
                            FIG. 0{activeIndex + 1}
                        </div>
                    </div>
                </div>

                {/* --- RIGHT: CONTENT (Syncs with Index) --- */}
                <div className="w-full md:w-1/2 h-full flex flex-col justify-center relative p-12 md:p-24 bg-[#FFF2EC]">
                    <div className="relative h-[300px] w-full">
                        {points.map((point, index) => (
                            <motion.div
                                key={point.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ 
                                    opacity: activeIndex === index ? 1 : 0,
                                    y: activeIndex === index ? 0 : 20,
                                    pointerEvents: activeIndex === index ? 'auto' : 'none'
                                }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0 flex flex-col justify-center"
                            >
                                <div className="flex justify-between items-start mb-8 border-b border-[#1a1a1a]/10 pb-4">
                                    <h3 className="font-serif text-4xl md:text-5xl text-[#1a1a1a] leading-none tracking-tighter">
                                        {point.title}
                                    </h3>
                                    <div className="flex flex-col items-end">
                                        <span className="font-mono text-[9px] text-[#E21E3F] uppercase tracking-widest mb-1">COST</span>
                                        <span className="font-mono text-sm font-bold text-[#E21E3F]">{point.stat}</span>
                                    </div>
                                </div>
                                <p className="font-sans text-lg text-[#1a1a1a]/60 leading-relaxed">
                                    {point.body}
                                </p>

                                {/* CTA on Last Slide */}
                                {index === points.length - 1 && (
                                    <div className="mt-12">
                                        <button 
                                            onClick={() => onNavigate('architecture')}
                                            className="relative overflow-hidden px-8 py-4 bg-transparent border border-[#C5A059] text-[#C5A059] font-mono text-xs uppercase tracking-[0.2em] group inline-block"
                                        >
                                            <span className="relative z-10 group-hover:text-[#1a1a1a] transition-colors duration-300">
                                                [ VIEW_PROTOCOL ]
                                            </span>
                                            <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

const App: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrambleText, setScrambleText] = useState("ARCHITECT");
  const [isTickerHovered, setIsTickerHovered] = useState(false);
  
  type ViewState = 'landing' | 'about' | 'architecture' | 'protocol' | 'evidence' | 'contact' | 'pillar1' | 'pillar2' | 'pillar3' | 'pillar4' | 'pillar5' | 'pillar6' | 'pillar7';
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  const { scrollY } = useScroll();
  const carouselX = useMotionValue(0);
  const xPercent = useTransform(carouselX, (value) => `${value}%`);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useAnimationFrame((t, delta) => {
    if (currentView !== 'landing') return;
    const speed = isTickerHovered ? 0 : 0.0006;
    let moveBy = speed * delta;
    const currentX = carouselX.get();
    let nextX = currentX - moveBy;
    if (nextX <= -50) nextX = 0;
    carouselX.set(nextX);
  });

  useEffect(() => {
    const roles = ["ARCHITECT", "NAVIGATOR", "ENGINEER"];
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let roleIndex = 0;
    const scrambleInterval = setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      const target = roles[roleIndex];
      let iterations = 0;
      const interval = setInterval(() => {
        setScrambleText(prev => target.split("").map((_, i) => i < iterations ? target[i] : chars[Math.floor(Math.random() * chars.length)]).join(""));
        if (iterations >= target.length) clearInterval(interval);
        iterations += 1;
      }, 60);
    }, 7000);
    return () => clearInterval(scrambleInterval);
  }, []);

  const handleGlobalNavigate = (view: string, sectionId?: string) => {
    if (view.startsWith('pillar') || ['landing', 'about', 'architecture', 'protocol', 'evidence', 'contact'].includes(view)) {
        setCurrentView(view as ViewState);
        window.scrollTo(0,0);
    }
  };

  return (
    <div className="bg-[#FFF2EC] selection:bg-[#1a1a1a] selection:text-[#FFF2EC] min-h-screen flex flex-col">
      <D3Background /> 
      <GlobalHeader currentView={currentView} onNavigate={handleGlobalNavigate} scrolled={scrolled} />

      <PageTransition currentView={currentView}>
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            {currentView === 'landing' ? (
              <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                
                {/* HERO SECTION */}
                <section id="hero" className="min-h-screen w-full flex items-center pt-20 overflow-hidden relative z-20 content-layer">
                  <HeroVisual />

                  <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-20">
                    <div className="lg:col-span-12 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                      <div className="flex items-center gap-4 mb-10 overflow-hidden justify-center lg:justify-start">
                        <span className="h-[1px] w-12 bg-[#1a1a1a]"></span>
                        <span className="text-xs font-bold tracking-widest uppercase text-[#1a1a1a] mt-[1px]">
                          SYDNEY BUSINESS GROWTH 
                          <span className="font-mono font-bold ml-2 text-[#C5A059]">
                            [ {scrambleText} ]
                          </span>
                        </span>
                      </div>
                      
                      <h1 className="font-serif text-5xl md:text-8xl lg:text-[6.5rem] leading-[0.9] tracking-tighter text-[#1a1a1a] mb-10">
                        <div className="overflow-hidden">
                          <span className="block reveal-text">Built on Logic,</span>
                        </div>
                        <div className="overflow-hidden">
                          <span className="block reveal-text" style={{ animationDelay: '0.2s' }}>
                            not <span className="italic font-serif text-[#C5A059] drop-shadow-[0_0_20px_rgba(197,160,89,0.2)]">Guesswork.</span>
                          </span>
                        </div>
                      </h1>

                      <p className="font-sans text-lg font-normal text-[#1a1a1a]/70 leading-relaxed max-w-2xl border-l border-[#1a1a1a]/20 pl-6 animate-fade-in text-left mx-auto lg:mx-0" style={{ animationDelay: '0.6s' }}>
                        Stop burning your best people. I build the digital systems that exit you from the daily grind. Precision is not optional.
                      </p>

                      <div className="mt-16 flex flex-col sm:flex-row items-center gap-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                        <button 
                          onClick={() => handleGlobalNavigate('contact')} 
                          className="group relative px-10 py-5 bg-transparent text-[#FFF2EC] border border-[#1a1a1a] font-mono text-xs uppercase tracking-widest font-bold overflow-hidden transition-all duration-300"
                        >
                          <div className="absolute inset-0 bg-[#1a1a1a] group-hover:-translate-y-full transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                          <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                          <span className="relative z-10 group-hover:text-[#1a1a1a] transition-colors duration-500">[ START_DIAGNOSIS ]</span>
                        </button>
                        
                        <a 
                          href="#architecture" 
                          onClick={(e) => { e.preventDefault(); handleGlobalNavigate('architecture'); }} 
                          className="relative group flex items-center gap-3 cursor-pointer"
                        >
                          <span className="font-mono text-xs uppercase tracking-widest text-[#1a1a1a] border-b border-[#1a1a1a] pb-0.5 group-hover:border-b-2 group-hover:pb-1 transition-all duration-300 font-bold">
                            SEE THE SYSTEM
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-16 w-[1px] bg-[#1a1a1a]/10 overflow-hidden">
                     <motion.div 
                       initial={{ y: '-100%' }}
                       animate={{ y: '100%' }}
                       transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                       className="absolute inset-0 bg-[#1a1a1a]/40"
                     />
                  </div>
                </section>

                {/* CAROUSEL */}
                <div 
                  className="w-full bg-[#1a1a1a]/5 py-10 border-y border-black/5 overflow-hidden relative z-30"
                  style={{ 
                    maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
                  }}
                  onMouseEnter={() => setIsTickerHovered(true)}
                  onMouseLeave={() => setIsTickerHovered(false)}
                >
                  <div className="flex whitespace-nowrap">
                    <motion.div className="flex items-center pr-0" style={{ x: xPercent }}>
                      {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                        <div key={i} className="flex items-center group cursor-default">
                            <span className="font-mono text-sm font-bold tracking-[0.2em] text-[#1a1a1a]/40 group-hover:text-[#C5A059] transition-colors duration-300 px-12">
                              {tech}
                            </span>
                            <span className="text-[#C5A059] text-[10px] opacity-50">//</span>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* DIAGNOSIS SECTION (Global #01) */}
                <motion.section 
                  id="diagnosis" 
                  initial={{ opacity: 0 }} 
                  whileInView={{ opacity: 1 }} 
                  viewport={{ once: true, margin: "-100px" }} 
                  className="w-full bg-[#FFF2EC] py-32 px-6 md:px-12 lg:px-20 relative z-30 overflow-hidden"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-32 w-[1px] bg-[#1a1a1a]/10" />

                  <div className="max-w-[1600px] mx-auto border-t border-l border-[#1a1a1a]/10">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                      
                      {/* INTRO GRID */}
                      <div className="col-span-1 md:col-span-2 p-12 md:p-16 border-r border-b border-[#1a1a1a]/10 flex flex-col justify-center min-h-[350px]">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#E21E3F] mb-10 block">01 / THE DIAGNOSIS</span>
                        <h2 className="font-serif text-5xl md:text-7xl leading-[0.9] text-[#1a1a1a] tracking-tighter">
                          You didn’t start your business to become an <br />
                          <span className="italic text-[#1a1a1a]/60">administrative hostage.</span>
                        </h2>
                      </div>
                      
                      {/* GRAPH */}
                      <div className="col-span-1 border-r border-b border-[#1a1a1a]/10 bg-transparent">
                        <GrowthGraph />
                      </div>
                      
                      {/* SYMPTOMS */}
                      <div className="col-span-1 p-12 border-r border-b border-[#1a1a1a]/10 min-h-[300px]">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#E21E3F] mb-8 block">02 / SYMPTOMS</span>
                        <ul className="space-y-6">
                           <li className="flex items-start gap-4">
                              <XCircle className="w-5 h-5 text-[#E21E3F] shrink-0 mt-0.5" />
                              <div className="font-sans text-lg text-[#1a1a1a]/70">
                                 <strong className="text-[#1a1a1a]">The Bottleneck Boss:</strong> You are answering questions instead of doing deep work.
                              </div>
                           </li>
                           <li className="flex items-start gap-4">
                              <XCircle className="w-5 h-5 text-[#E21E3F] shrink-0 mt-0.5" />
                              <div className="font-sans text-lg text-[#1a1a1a]/70">
                                 <strong className="text-[#1a1a1a]">The Double-Entry Tax:</strong> Typing the same data into two different apps.
                              </div>
                           </li>
                           <li className="flex items-start gap-4">
                              <XCircle className="w-5 h-5 text-[#E21E3F] shrink-0 mt-0.5" />
                              <div className="font-sans text-lg text-[#1a1a1a]/70">
                                 <strong className="text-[#1a1a1a]">The Sunday Grind:</strong> Invoicing and admin eating your weekends.
                              </div>
                           </li>
                        </ul>
                      </div>
                      
                      {/* ERROR */}
                      <div className="col-span-1 p-12 border-r border-b border-[#1a1a1a]/10 bg-[#E21E3F]/5 min-h-[300px]">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#E21E3F] mb-8 block">03 / ERROR DETECTED</span>
                        <div className="space-y-4">
                          <div className="font-sans text-3xl font-bold text-[#E21E3F] uppercase tracking-tighter">BURNING_TALENT</div>
                          <p className="font-sans text-sm text-[#E21E3F]/70 leading-relaxed uppercase tracking-widest">
                            Paying high-value staff to do low-value data entry.
                          </p>
                        </div>
                      </div>
                      
                      {/* RESOLUTION (NO ARROW) */}
                      <div className="col-span-1 p-12 border-r border-b border-[#1a1a1a]/10 bg-[#1a1a1a] text-white min-h-[300px] flex flex-col justify-between border-l-2 border-l-[#C5A059]">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#C5A059] block">04 / RESOLUTION</span>
                        <p className="font-serif text-2xl md:text-3xl leading-tight mb-8">
                          I engineer the exit. We replace human friction with digital code.
                        </p>
                        <button 
                          onClick={() => handleGlobalNavigate('architecture')}
                          className="flex items-center gap-3 font-mono text-[10px] text-[#C5A059] uppercase tracking-[0.3em] hover:text-white transition-colors cursor-pointer group"
                        >
                          [ VIEW PROTOCOL ]
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.section>

                {/* FRICTION SECTION (Global #02 - Sticky Tabs) */}
                <FrictionAuditSection onNavigate={handleGlobalNavigate} />
                
                <section id="architecture"><BentoGrid onServiceClick={(s) => { setSelectedService(s); setIsModalOpen(true); }} /></section>
                <section className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/10 bg-[#FFF2EC]">
                   <Feature_Group7 />
                </section>
                <BookingCTA />
                <TheArchitect />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </main>
      </PageTransition>

      {/* FOOTER & MODAL */}
      {currentView !== 'architecture' && <GlobalFooter onNavigate={handleGlobalNavigate} />}
      <Modal service={selectedService} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onViewPillar={(id) => handleGlobalNavigate(id)} />
    </div>
  );
};

export default App;