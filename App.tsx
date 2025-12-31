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

// --- HELPERS (GrowthGraph, FrictionVisual) ---
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

const FrictionVisual: React.FC<{ type: string }> = ({ type }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    d3.select(container).selectAll('*').remove();
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;
    const svg = d3.select(container).append('svg').attr('width', '100%').attr('height', '100%').attr('viewBox', `0 0 ${width} ${height}`).attr('preserveAspectRatio', 'xMidYMid meet').style('overflow', 'visible');
    const defs = svg.append('defs');
    const filter = defs.append('filter').attr('id', 'glow');
    filter.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'coloredBlur');
    const merge = filter.append('feMerge');
    merge.append('feMergeNode').attr('in', 'coloredBlur');
    merge.append('feMergeNode').attr('in', 'SourceGraphic');
    const metalGrad = defs.append('linearGradient').attr('id', 'metalGrad').attr('x1', '0%').attr('y1', '0%').attr('x2', '100%').attr('y2', '100%');
    metalGrad.append('stop').attr('offset', '0%').attr('stop-color', '#333');
    metalGrad.append('stop').attr('offset', '50%').attr('stop-color', '#666');
    metalGrad.append('stop').attr('offset', '100%').attr('stop-color', '#333');
    const g = svg.append('g').attr('transform', `translate(${width/2}, ${height/2})`);

    if (type === 'leakage') {
       g.append('rect').attr('x', -180).attr('y', -30).attr('width', 160).attr('height', 60).attr('fill', 'url(#metalGrad)').attr('rx', 4);
       g.append('rect').attr('x', 20).attr('y', -30).attr('width', 160).attr('height', 60).attr('fill', 'url(#metalGrad)').attr('rx', 4);
       g.append('path').attr('d', "M -20 -25 L 0 -40 L 20 -25 L 10 0 L 20 25 L 0 40 L -20 25 L -10 0 Z").attr('fill', 'none').attr('stroke', '#E21E3F').attr('stroke-width', 3).attr('filter', 'url(#glow)');
       const pG = g.append('g');
       d3.interval(() => { for(let i=0; i<3; i++) { pG.append('circle').attr('cx', (Math.random()-0.5)*40).attr('cy', (Math.random()-0.5)*40).attr('r', Math.random()*5+2).attr('fill', '#E21E3F').transition().duration(1500).ease(d3.easeQuadIn).attr('cy', 250).attr('cx', (Math.random()-0.5)*200).attr('r', 0).remove(); } }, 40);
       g.append('text').attr('y', -70).attr('text-anchor', 'middle').attr('class', 'font-mono text-[12px] font-bold fill-[#E21E3F] tracking-widest').text('CRITICAL_FAILURE');
    }
    else if (type === 'silos') {
       [-100, 0, 100].forEach((x, i) => {
          const s = g.append('g').attr('transform', `translate(${x}, -50)`);
          s.append('rect').attr('x', -35).attr('y', -60).attr('width', 70).attr('height', 180).attr('fill', '#1a1a1a').attr('stroke', '#333').attr('stroke-width', 2).attr('rx', 4);
          d3.range(4).forEach(r => {
             const circle = s.append('circle').attr('cx', 20).attr('cy', -40 + r*40).attr('r', 4).attr('fill', i===1 ? '#E21E3F' : '#C5A059').attr('filter', 'url(#glow)').attr('opacity', 1);
             function blink() { circle.transition().duration(400 + Math.random() * 600).attr('opacity', 0.2).transition().duration(400 + Math.random() * 600).attr('opacity', 1).on('end', blink); } blink();
          });
       });
       g.append('text').attr('y', 150).attr('text-anchor', 'middle').attr('class', 'font-mono text-[12px] font-bold fill-[#1a1a1a] tracking-widest opacity-60').text('DISCONNECTED_STACK');
    }
    else if (type === 'trap') {
       const gear = (r: number, t: number) => { let d = ""; for(let i=0; i<t*2; i++){ const a = (Math.PI*2*i)/(t*2); const rad = (i%2===0) ? r+10 : r-5; d += (i===0?"M":"L") + Math.cos(a)*rad + "," + Math.sin(a)*rad + " "; } return d+"Z"; };
       const g1 = g.append('g').attr('transform', 'translate(-65,0)'); g1.append('path').attr('d', gear(60, 12)).attr('fill', 'none').attr('stroke', '#1a1a1a').attr('stroke-width', 4).attr('filter', 'url(#glow)');
       const g2 = g.append('g').attr('transform', 'translate(65,45)'); g2.append('path').attr('d', gear(50, 10)).attr('fill', 'none').attr('stroke', '#1a1a1a').attr('stroke-width', 4).attr('filter', 'url(#glow)');
       d3.timer((e) => { g1.attr('transform', `translate(-65,0) rotate(${e*0.04})`); g2.attr('transform', `translate(65,45) rotate(${e*-0.05})`); });
       g.append('text').attr('y', 160).attr('text-anchor', 'middle').attr('class', 'font-mono text-[12px] font-bold fill-[#E21E3F] tracking-widest').text('OPERATIONAL_DRAG');
    }
    else if (type === 'blind') {
       const rG = g.append('g'); rG.append('circle').attr('r', 120).attr('fill', '#1a1a1a').attr('fill-opacity', 0.05).attr('stroke', '#1a1a1a').attr('stroke-width', 2);
       rG.append('line').attr('x1', -120).attr('x2', 120).attr('y1', 0).attr('y2', 0).attr('stroke', '#1a1a1a').attr('stroke-opacity', 0.2); rG.append('line').attr('y1', -120).attr('y2', 120).attr('x1', 0).attr('x2', 0).attr('stroke', '#1a1a1a').attr('stroke-opacity', 0.2);
       const scan = rG.append('line').attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', -120).attr('stroke', '#E21E3F').attr('stroke-width', 4).attr('filter', 'url(#glow)'); d3.timer((e) => { scan.attr('transform', `rotate(${e*0.15})`); });
       const nG = g.append('g'); d3.interval(() => { nG.selectAll('*').remove(); for(let i=0; i<50; i++) nG.append('rect').attr('x', (Math.random()-0.5)*240).attr('y', (Math.random()-0.5)*240).attr('width', Math.random()*4).attr('height', 4).attr('fill', '#1a1a1a').attr('opacity', Math.random()*0.4); }, 80);
       g.append('text').attr('y', 160).attr('text-anchor', 'middle').attr('class', 'font-mono text-[12px] font-bold fill-[#1a1a1a] tracking-widest opacity-60').text('ZERO_VISIBILITY');
    }
  }, [type]);
  return <div ref={containerRef} className="w-full h-full" />;
};

const FrictionAuditSection: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    
    // SCROLL FIX: Ensure we scroll through all 4 cards
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]); 

    const points = [
        { 
          id: 'leakage',
          label: '01 // LEAKAGE', 
          title: 'Revenue Leakage', 
          body: "Demand is expiring in the inbox because your website is just a brochure, not a catcher. You are paying for leads you fail to catch.",
          icon: AlertTriangle
        },
        { 
          id: 'silos',
          label: '02 // SILOS', 
          title: 'Data Silos', 
          body: "Sales uses one tool, Ops uses another, and Finance lives in Excel. Nothing talks to each other, so you have zero 'Source of Truth'.",
          icon: Database
        },
        { 
          id: 'trap',
          label: '03 // TRAP', 
          title: 'The Busywork Trap', 
          body: "You are wasting 40% of your week on manual data entry, playing 'Chief Admin Officer' instead of steering the ship.",
          icon: Clock
        },
        { 
          id: 'blind',
          label: '04 // BLIND', 
          title: 'Flying Blind', 
          body: "You manage by gut feeling because you can't see the numbers. You don't know your exact Profit or LTV until the accountant calls.",
          icon: EyeOff
        }
    ];
    return (
        // INCREASED HEIGHT TO 500vh FOR BETTER SCROLL TIMING
        <section ref={targetRef} className="relative h-[500vh] bg-[#FFF2EC] z-30 border-t border-[#1a1a1a]/5">
            <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
                
                {/* RESTORED: FULL INTRO BLOCK */}
                <div className="absolute top-8 left-6 md:top-12 md:left-20 z-40 pointer-events-none max-w-lg">
                   <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-[1px] bg-[#E21E3F]" />
                      <span className="font-mono text-xs text-[#E21E3F] uppercase tracking-widest font-bold">02 // THE FRICTION AUDIT</span>
                   </div>
                   <h2 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] mb-4">
                     Where your margin <span className="italic text-[#1a1a1a]/40">evaporates.</span>
                   </h2>
                   <p className="font-sans text-sm md:text-base text-[#1a1a1a]/60 leading-relaxed border-l border-[#E21E3F] pl-4">
                     Revenue is vanity. Profit is sanity. These are the four silent killers destroying your bottom line right now.
                   </p>
                </div>

                {/* TRACK: WIDTH FIXED TO 400vw */}
                <motion.div style={{ x }} className="flex h-full w-[400vw]">
                    {points.map((point, index) => (
                        <div 
                          key={point.id} 
                          // ALTERNATING: Cream -> White -> Cream -> White
                          className={`relative h-full w-screen flex-shrink-0 flex items-center justify-center p-6 md:p-20 
                            ${index % 2 === 0 ? 'bg-[#FFF2EC]' : 'bg-white'} 
                          `}
                        >
                            <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                                {/* TEXT */}
                                <div className="order-2 lg:order-1">
                                   <div className="flex items-center gap-4 mb-8">
                                     <span className="font-mono text-xs text-[#E21E3F] uppercase tracking-[0.3em] font-bold bg-[#E21E3F]/10 px-3 py-1">
                                       {point.label}
                                     </span>
                                     <div className="h-[1px] w-12 bg-[#E21E3F]/20" />
                                   </div>
                                   <h3 className="font-serif text-5xl md:text-7xl text-[#1a1a1a] mb-8 leading-[0.95] tracking-tighter">
                                     {point.title}
                                   </h3>
                                   <p className="font-sans text-xl md:text-2xl text-[#1a1a1a]/60 leading-relaxed max-w-xl border-l-2 border-[#1a1a1a]/10 pl-8">
                                     {point.body}
                                   </p>
                                </div>
                                {/* VISUAL */}
                                <div className="order-1 lg:order-2 h-[400px] lg:h-[600px] w-full relative bg-[#1a1a1a]/[0.02] border border-[#1a1a1a]/10 rounded-sm overflow-hidden flex items-center justify-center group">
                                   <FrictionVisual type={point.id} />
                                   {/* Tech Corners */}
                                   <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#1a1a1a]/20" />
                                   <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#1a1a1a]/20" />
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
                
                {/* Progress Bar */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 h-1 bg-[#1a1a1a]/10 rounded-full overflow-hidden">
                   <motion.div 
                     className="h-full bg-[#E21E3F]"
                     style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
                   />
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

                {/* PREMIUM CAROUSEL */}
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

                {/* DIAGNOSIS */}
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
                      
                      <div className="col-span-1 md:col-span-2 p-12 md:p-16 border-r border-b border-[#1a1a1a]/10 flex flex-col justify-center min-h-[350px]">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#E21E3F] mb-10 block">01 / THE DIAGNOSIS</span>
                        <h2 className="font-serif text-5xl md:text-7xl leading-[0.9] text-[#1a1a1a] tracking-tighter">
                          You didn’t start your business to become an <br />
                          <span className="italic text-[#1a1a1a]/60">administrative hostage.</span>
                        </h2>
                      </div>
                      
                      <div className="col-span-1 border-r border-b border-[#1a1a1a]/10 bg-transparent">
                        <GrowthGraph />
                      </div>
                      
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
                      
                      <div className="col-span-1 p-12 border-r border-b border-[#1a1a1a]/10 bg-[#E21E3F]/5 min-h-[300px]">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#E21E3F] mb-8 block">03 / ERROR DETECTED</span>
                        <div className="space-y-4">
                          <div className="font-sans text-3xl font-bold text-[#E21E3F] uppercase tracking-tighter">BURNING_TALENT</div>
                          <p className="font-sans text-sm text-[#E21E3F]/70 leading-relaxed uppercase tracking-widest">
                            Paying high-value staff to do low-value data entry.
                          </p>
                        </div>
                      </div>
                      
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

                <FrictionAuditSection />
                
                <section id="architecture"><BentoGrid onServiceClick={(s) => { setSelectedService(s); setIsModalOpen(true); }} /></section>
                <section className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/10 bg-[#FFF2EC]">
                   <Feature_Group7 />
                </section>
                <BookingCTA />
                <TheArchitect />
              </motion.div>
            ) : currentView === 'contact' ? (
              <ContactPage key="contact" onBack={() => handleGlobalNavigate('landing')} />
            ) : currentView === 'architecture' ? (
               <ArchitecturePage key="arch" onBack={() => handleGlobalNavigate('landing')} onNavigate={handleGlobalNavigate} />
            ) : currentView === 'about' ? (
               <AboutPage key="about" onBack={() => handleGlobalNavigate('landing')} onNavigate={handleGlobalNavigate} />
            ) : currentView === 'protocol' ? (
               <ProtocolPage key="protocol" onBack={() => handleGlobalNavigate('landing')} onNavigate={handleGlobalNavigate} />
            ) : currentView === 'evidence' ? (
               <EvidencePage key="evidence" onBack={() => handleGlobalNavigate('landing')} onNavigate={handleGlobalNavigate} />
            ) : currentView.startsWith('pillar') ? (
              <motion.div key={currentView} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                 {currentView === 'pillar1' && <Pillar1 onBack={() => handleGlobalNavigate('architecture')} onNavigate={handleGlobalNavigate} />}
                 {currentView === 'pillar2' && <Pillar2 onBack={() => handleGlobalNavigate('architecture')} onNavigate={handleGlobalNavigate} />}
                 {currentView === 'pillar3' && <PillarPage_Automation onBack={() => handleGlobalNavigate('architecture')} onNavigate={handleGlobalNavigate} />}
                 {currentView === 'pillar4' && <PillarPage_Cognitive onBack={() => handleGlobalNavigate('architecture')} onNavigate={handleGlobalNavigate} />}
                 {currentView === 'pillar5' && <PillarPage_Media onBack={() => handleGlobalNavigate('architecture')} onNavigate={handleGlobalNavigate} />}
                 {currentView === 'pillar6' && <PillarPage_Adoption onBack={() => handleGlobalNavigate('architecture')} onNavigate={handleGlobalNavigate} />}
                 {currentView === 'pillar7' && <PillarPage_Intelligence onBack={() => handleGlobalNavigate('architecture')} onNavigate={handleGlobalNavigate} />}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </main>
      </PageTransition>

      {currentView !== 'architecture' && <GlobalFooter onNavigate={handleGlobalNavigate} />}
      <Modal service={selectedService} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onViewPillar={(id) => handleGlobalNavigate(id)} />
    </div>
  );
};

export default App;