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
import { ChevronDown, AlertTriangle, Database, Clock, EyeOff, ArrowDown } from 'lucide-react';

const TECH_STACK = [
  'OpenAI', 'Anthropic', 'Claude', 'Make.com', 'HubSpot', 'Stripe', 'Shopify', 
  'Next.js', 'Vercel', 'Sanity', 'Zapier', 'n8n', 'ElevenLabs', 'Vapi.ai', 
  'Bland AI', 'Voiceflow', 'BigQuery', 'Python', 'Looker Studio', 'Klaviyo'
];

// --- GrowthGraph Component ---
const GrowthGraph: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = 400;
    const height = 240;
    const margin = { top: 40, right: 60, bottom: 40, left: 20 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    d3.select(containerRef.current).selectAll('*').remove();
    
    const svg = d3.select(containerRef.current)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    const chart = svg.append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    // Vertical grid lines
    const xTicks = [0, 0.25, 0.5, 0.75, 1];
    chart.selectAll('.grid-line')
      .data(xTicks)
      .enter()
      .append('line')
      .attr('x1', d => d * chartWidth)
      .attr('x2', d => d * chartWidth)
      .attr('y1', -10)
      .attr('y2', chartHeight + 10)
      .attr('stroke', '#1a1a1a')
      .attr('stroke-opacity', 0.05)
      .attr('stroke-dasharray', '2,2');

    const barHeight = 12;
    const gap = 60;

    // --- PRODUCTIVITY (GOLD) ---
    const prodG = chart.append('g').attr('transform', `translate(0, ${chartHeight / 2 - gap / 2})`);
    
    prodG.append('text')
      .attr('y', -12)
      .attr('class', 'font-mono text-[9px] uppercase tracking-[0.3em] fill-[#1a1a1a] opacity-40')
      .text('PRODUCTIVITY // ACCELERATING');

    const prodBarBg = prodG.append('rect')
      .attr('width', chartWidth)
      .attr('height', barHeight)
      .attr('fill', '#1a1a1a')
      .attr('opacity', 0.03);

    const prodBar = prodG.append('rect')
      .attr('width', 0)
      .attr('height', barHeight)
      .attr('fill', '#C5A059');

    const prodVal = prodG.append('text')
      .attr('x', 0)
      .attr('y', barHeight / 2 + 4)
      .attr('class', 'font-mono text-[10px] font-bold fill-[#C5A059]')
      .attr('dx', 8)
      .text('0%');

    // --- ADMIN LOAD (RED) ---
    const adminG = chart.append('g').attr('transform', `translate(0, ${chartHeight / 2 + gap / 2})`);
    
    adminG.append('text')
      .attr('y', -12)
      .attr('class', 'font-mono text-[9px] uppercase tracking-[0.3em] fill-[#1a1a1a] opacity-40')
      .text('ADMIN LOAD // MINIMISING');

    const adminBarBg = adminG.append('rect')
      .attr('width', chartWidth)
      .attr('height', barHeight)
      .attr('fill', '#1a1a1a')
      .attr('opacity', 0.03);

    const adminBar = adminG.append('rect')
      .attr('width', chartWidth)
      .attr('height', barHeight)
      .attr('fill', '#E21E3F');

    const adminVal = adminG.append('text')
      .attr('x', chartWidth)
      .attr('y', barHeight / 2 + 4)
      .attr('class', 'font-mono text-[10px] font-bold fill-[#E21E3F]')
      .attr('dx', 8)
      .text('100%');

    function animate() {
      const duration = 4000;
      const ease = d3.easeCubicInOut;

      // Reset
      prodBar.attr('width', 0);
      prodVal.attr('x', 0).text('0%');
      adminBar.attr('width', chartWidth);
      adminVal.attr('x', chartWidth).text('100%');

      // Animate Productivity
      prodBar.transition()
        .duration(duration)
        .ease(ease)
        .attr('width', chartWidth * 0.95);

      prodVal.transition()
        .duration(duration)
        .ease(ease)
        .attr('x', chartWidth * 0.95)
        .tween('text', function() {
          const i = d3.interpolate(0, 95);
          return (t) => {
            prodVal.text(`${Math.round(i(t))}%`);
          };
        });

      // Animate Admin Load
      adminBar.transition()
        .duration(duration)
        .ease(ease)
        .attr('width', chartWidth * 0.12);

      adminVal.transition()
        .duration(duration)
        .ease(ease)
        .attr('x', chartWidth * 0.12)
        .tween('text', function() {
          const i = d3.interpolate(100, 12);
          return (t) => {
            adminVal.text(`${Math.round(i(t))}%`);
          };
        })
        .on('end', () => {
          d3.timeout(animate, 2000);
        });
    }

    animate();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[300px] flex items-center justify-center bg-transparent" />
  );
};

// --- Friction Visual Component ---
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
        
        // Simple visuals restoration
        if(type === 'leakage') {
           g.append('circle').attr('r', 40).attr('fill', '#E21E3F').attr('opacity', 0.2);
           g.append('text').attr('text-anchor','middle').attr('dy', 5).attr('fill','#E21E3F').attr('font-size', '10px').text('LEAKAGE');
        } else if(type === 'silos') {
           g.append('rect').attr('x',-30).attr('y',-40).attr('width',20).attr('height',80).attr('fill','#1a1a1a');
           g.append('rect').attr('x',10).attr('y',-40).attr('width',20).attr('height',80).attr('fill','#1a1a1a');
        } else {
           g.append('circle').attr('r', 30).attr('stroke', '#1a1a1a').attr('fill', 'none');
        }
        
    }, [type]);
    return <div ref={containerRef} className="w-full h-full" />;
};

const FrictionAuditSection: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
    const points = [
        { id: 'leakage', label: '01 // LEAKAGE', title: 'Revenue Leakage', body: "Demand is expiring in the inbox...", icon: AlertTriangle },
        { id: 'silos', label: '02 // SILOS', title: 'Data Silos', body: "Nothing talks to each other...", icon: Database },
        { id: 'trap', label: '03 // TRAP', title: 'The Busywork Trap', body: "Wasting 40% of your week...", icon: Clock },
        { id: 'blind', label: '04 // BLIND', title: 'Flying Blind', body: "Managing by gut feeling...", icon: EyeOff }
    ];
    return (
        <section ref={targetRef} className="relative h-[400vh] bg-white z-30">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                <motion.div style={{ x }} className="flex">
                    {points.map((point, index) => (
                        <div key={point.id} className={`relative h-screen w-screen flex-shrink-0 flex items-center justify-center p-20 ${index % 2 === 0 ? 'bg-white' : 'bg-[#FFF2EC]'}`}>
                            <div className="w-full max-w-[1400px] grid grid-cols-2 gap-24 items-center">
                                <div className="order-1">
                                    <h3 className="font-serif text-7xl text-[#1a1a1a] mb-8">{point.title}</h3>
                                    <p className="font-sans text-2xl text-[#1a1a1a]/60 border-l-2 border-black/10 pl-8">{point.body}</p>
                                </div>
                                <div className="order-2 h-[600px] bg-[#1a1a1a]/5 border border-black/10">
                                   <FrictionVisual type={point.id} />
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const App: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrambleText, setScrambleText] = useState("ARCHITECT");
  
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
    let moveBy = 0.0006 * delta;
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
                  
                  {/* VISUAL: The Constellation */}
                  <HeroVisual />

                  <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-20">
                    <div className="lg:col-span-12 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
                      
                      {/* Eyebrow */}
                      <div className="flex items-center gap-4 mb-10 overflow-hidden justify-center lg:justify-start">
                        <span className="h-[1px] w-12 bg-[#1a1a1a]"></span>
                        <span className="text-[11px] font-bold tracking-widest uppercase text-[#1a1a1a] mt-[1px]">
                          SYDNEY BUSINESS GROWTH 
                          <span className="font-mono font-bold ml-2 text-[#C5A059]">
                            [ {scrambleText} ]
                          </span>
                        </span>
                      </div>
                      
                      {/* HEADLINE: Industrial Compression */}
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

                      {/* SUBHEADLINE */}
                      <p className="font-sans text-lg font-normal text-[#1a1a1a]/70 leading-relaxed max-w-2xl border-l border-[#1a1a1a]/20 pl-6 animate-fade-in text-left mx-auto lg:mx-0" style={{ animationDelay: '0.6s' }}>
                        Stop burning your best people. I build the digital systems that exit you from the daily grind. Precision is not optional.
                      </p>

                      {/* CTAs */}
                      <div className="mt-16 flex flex-col sm:flex-row items-center gap-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                        
                        {/* Primary: START_DIAGNOSIS */}
                        <button 
                          onClick={() => handleGlobalNavigate('contact')} 
                          className="group relative px-10 py-5 bg-transparent text-[#FFF2EC] border border-[#1a1a1a] font-mono text-xs uppercase tracking-widest font-bold overflow-hidden transition-all duration-300"
                        >
                          <div className="absolute inset-0 bg-[#1a1a1a] group-hover:-translate-y-full transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                          <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                          <span className="relative z-10 group-hover:text-[#1a1a1a] transition-colors duration-500">[ START_DIAGNOSIS ]</span>
                        </button>
                        
                        {/* Secondary: EXPLORE_THE_SYSTEM (Decoupled from Plumb Line) */}
                        <a 
                          href="#architecture" 
                          onClick={(e) => { e.preventDefault(); handleGlobalNavigate('architecture'); }} 
                          className="relative group flex items-center gap-3 cursor-pointer"
                        >
                          <span className="font-mono text-xs uppercase tracking-widest text-[#1a1a1a] border-b border-[#1a1a1a] pb-0.5 group-hover:border-b-2 group-hover:pb-1 transition-all duration-300 font-bold">
                            EXPLORE_THE_SYSTEM
                          </span>
                          <ArrowDown className="w-4 h-4 text-[#1a1a1a] transition-all duration-300 group-hover:translate-y-1" />
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* REFINED PLUMB LINE: Shorter, slower, and grey to prevent distraction */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-16 w-[1px] bg-[#1a1a1a]/10 overflow-hidden">
                    <motion.div 
                      initial={{ y: '-100%' }}
                      animate={{ y: '100%' }}
                      transition={{ 
                        duration: 3,        // Slower for a calmer effect
                        repeat: Infinity, 
                        ease: 'linear' 
                      }}
                      className="absolute inset-0 bg-[#1a1a1a]/40" // Grey instead of strong black
                    />
                  </div>
                </section>

                {/* TECH TICKER */}
                <div className="w-full bg-[#1a1a1a]/5 py-10 border-y border-black/5 overflow-hidden relative z-30">
                  <div className="flex whitespace-nowrap">
                    <motion.div className="flex gap-32 items-center pr-20" style={{ x: xPercent }}>
                      {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                        <span key={i} className="font-mono text-[10px] font-bold tracking-widest uppercase mix-blend-luminosity opacity-20">{tech}</span>
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* --- RESTORED DIAGNOSIS SECTION --- */}
                <motion.section id="diagnosis" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-100px" }} className="w-full bg-[#FFF2EC] py-32 px-6 md:px-12 lg:px-20 relative z-30 overflow-hidden">
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
                        <p className="font-sans text-lg font-light text-[#1a1a1a]/70 leading-relaxed">
                          If you are reading this while the rest of the world is quiet, you know the feeling. Revenue is up, but so is the friction, and your team is drowning in manual work.
                        </p>
                      </div>
                      <div className="col-span-1 p-12 border-r border-b border-[#1a1a1a]/10 bg-[#E21E3F]/5 min-h-[300px]">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#E21E3F] mb-8 block">03 / ERROR DETECTED</span>
                        <div className="space-y-4">
                          <div className="font-sans text-3xl font-bold text-[#E21E3F] uppercase tracking-tighter">Burning People</div>
                          <p className="font-sans text-sm text-[#E21E3F]/70 leading-relaxed uppercase tracking-widest">
                            Using expensive human talent to bridge the gap in your software.
                          </p>
                        </div>
                      </div>
                      <div className="col-span-1 p-12 border-r border-b border-[#1a1a1a]/10 bg-[#1a1a1a] text-white min-h-[300px] flex flex-col justify-between border-l-2 border-l-[#C5A059]">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#C5A059] block">04 / RESOLUTION</span>
                        <p className="font-serif text-2xl md:text-3xl leading-tight mb-8">
                          I build synchronised systems that exit you from the daily grind.
                        </p>
                        <div className="flex items-center gap-3 font-mono text-[9px] text-[#C5A059] uppercase tracking-[0.3em]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
                          SYSTEMS_OPTIMISED
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.section>

                <FrictionAuditSection />
                <RevenueAudit />
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