import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useAnimationFrame, useMotionValue, useSpring, useTransform } from 'framer-motion';
import * as d3 from 'd3';
import BentoGrid from './components/BentoGrid';
import Modal from './components/Modal';
import D3Background from './components/D3Background';
import TheArchitect from './components/TheArchitect';
import EvidenceVault from './components/EvidenceVault';
import BookingCTA from './components/BookingCTA';
import EvidenceVaultPage from './components/EvidenceVaultPage';
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
import Pillar4 from './components/Pillar4';
import Pillar5 from './components/Pillar5';
import Pillar6 from './components/Pillar6';
import Pillar7 from './components/Pillar7';
import GlobalFooter from './components/GlobalFooter';
import GlobalHeader from './components/GlobalHeader';
import HeroVisual from './components/HeroVisual';
import PageTransition from './components/PageTransition';
import Feature_Group7 from './components/Feature_Group7';
import { ServiceDetail } from './types';
import { ArrowRight, ChevronDown, Target, Zap, BarChart3, Clock, AlertTriangle, Database, EyeOff } from 'lucide-react';

const TECH_STACK = [
  'OpenAI', 'Anthropic', 'Claude', 'Make.com', 'HubSpot', 'Stripe', 'Shopify', 
  'Next.js', 'Vercel', 'Sanity', 'Zapier', 'n8n', 'ElevenLabs', 'Vapi.ai', 
  'Bland AI', 'Voiceflow', 'BigQuery', 'Python', 'Looker Studio', 'Klaviyo'
];

const ScrambleText: React.FC<{ text: string, trigger: boolean }> = ({ text, trigger }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = "01";
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (trigger) {
      let iteration = 0;
      intervalRef.current = window.setInterval(() => {
        setDisplayText(prev => 
          text.split("").map((_, idx) => {
            if (idx < iteration) return text[idx];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("")
        );
        if (iteration >= text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
        iteration += 0.5;
      }, 30);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayText(text);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [trigger, text]);

  return <span>{displayText}</span>;
};

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

// --- PREMIUM D3 VISUAL COMPONENT ---
const FrictionVisual: React.FC<{ type: string }> = ({ type }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    // Clear previous
    d3.select(container).selectAll('*').remove();

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 600;
    
    const svg = d3.select(container).append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet')
      .style('overflow', 'visible');

    // --- DEFS (GLOWS & GRADIENTS) ---
    const defs = svg.append('defs');
    
    // 1. Glow Filter
    const filter = defs.append('filter').attr('id', 'glow');
    filter.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'coloredBlur');
    const merge = filter.append('feMerge');
    merge.append('feMergeNode').attr('in', 'coloredBlur');
    merge.append('feMergeNode').attr('in', 'SourceGraphic');

    // 2. Gradients
    const metalGrad = defs.append('linearGradient').attr('id', 'metalGrad')
      .attr('x1', '0%').attr('y1', '0%').attr('x2', '100%').attr('y2', '100%');
    metalGrad.append('stop').attr('offset', '0%').attr('stop-color', '#333');
    metalGrad.append('stop').attr('offset', '50%').attr('stop-color', '#666');
    metalGrad.append('stop').attr('offset', '100%').attr('stop-color', '#333');

    const g = svg.append('g').attr('transform', `translate(${width/2}, ${height/2})`);

    // --- SCENE 0: LEAKAGE (Heavy Pipe) ---
    if (type === 'leakage') {
       // Pipes
       g.append('rect').attr('x', -180).attr('y', -30).attr('width', 160).attr('height', 60).attr('fill', 'url(#metalGrad)').attr('rx', 4);
       g.append('rect').attr('x', 20).attr('y', -30).attr('width', 160).attr('height', 60).attr('fill', 'url(#metalGrad)').attr('rx', 4);
       
       // Burst
       g.append('path').attr('d', "M -20 -25 L 0 -40 L 20 -25 L 10 0 L 20 25 L 0 40 L -20 25 L -10 0 Z")
        .attr('fill', 'none').attr('stroke', '#E21E3F').attr('stroke-width', 3).attr('filter', 'url(#glow)');

       // Particles
       const pG = g.append('g');
       d3.interval(() => {
          for(let i=0; i<3; i++) {
             pG.append('circle')
               .attr('cx', (Math.random()-0.5)*40)
               .attr('cy', (Math.random()-0.5)*40)
               .attr('r', Math.random()*5+2)
               .attr('fill', '#E21E3F')
               .transition().duration(1500).ease(d3.easeQuadIn)
               .attr('cy', 250) // Fall
               .attr('cx', (Math.random()-0.5)*200) // Spread
               .attr('r', 0).remove();
          }
       }, 40);
       g.append('text').attr('y', -70).attr('text-anchor', 'middle').attr('class', 'font-mono text-[12px] font-bold fill-[#E21E3F] tracking-widest').text('CRITICAL_FAILURE');
    }

    // --- SCENE 1: SILOS (Monoliths) ---
    else if (type === 'silos') {
       [-100, 0, 100].forEach((x, i) => {
          const s = g.append('g').attr('transform', `translate(${x}, -50)`);
          s.append('rect').attr('x', -35).attr('y', -60).attr('width', 70).attr('height', 180).attr('fill', '#1a1a1a').attr('stroke', '#333').attr('stroke-width', 2).attr('rx', 4);
          // Blinking Lights
          d3.range(4).forEach(r => {
             const circle = s.append('circle')
               .attr('cx', 20)
               .attr('cy', -40 + r*40)
               .attr('r', 4)
               .attr('fill', i===1 ? '#E21E3F' : '#C5A059')
               .attr('filter', 'url(#glow)')
               .attr('opacity', 1);

             function blink() {
                circle.transition()
                    .duration(400 + Math.random() * 600)
                    .attr('opacity', 0.2)
                    .transition()
                    .duration(400 + Math.random() * 600)
                    .attr('opacity', 1)
                    .on('end', blink);
             }
             blink();
          });
       });
       g.append('text').attr('y', 150).attr('text-anchor', 'middle').attr('class', 'font-mono text-[12px] font-bold fill-[#1a1a1a] tracking-widest opacity-60').text('DISCONNECTED_STACK');
    }

    // --- SCENE 2: TRAP (Gears) ---
    else if (type === 'trap') {
       const gear = (r: number, t: number) => {
          let d = "";
          for(let i=0; i<t*2; i++){
             const a = (Math.PI*2*i)/(t*2);
             const rad = (i%2===0) ? r+10 : r-5;
             d += (i===0?"M":"L") + Math.cos(a)*rad + "," + Math.sin(a)*rad + " ";
          }
          return d+"Z";
       };
       const g1 = g.append('g').attr('transform', 'translate(-65,0)');
       g1.append('path').attr('d', gear(60, 12)).attr('fill', 'none').attr('stroke', '#1a1a1a').attr('stroke-width', 4).attr('filter', 'url(#glow)');
       const g2 = g.append('g').attr('transform', 'translate(65,45)');
       g2.append('path').attr('d', gear(50, 10)).attr('fill', 'none').attr('stroke', '#1a1a1a').attr('stroke-width', 4).attr('filter', 'url(#glow)');
       
       d3.timer((e) => {
          g1.attr('transform', `translate(-65,0) rotate(${e*0.04})`);
          g2.attr('transform', `translate(65,45) rotate(${e*-0.05})`);
       });
       g.append('text').attr('y', 160).attr('text-anchor', 'middle').attr('class', 'font-mono text-[12px] font-bold fill-[#E21E3F] tracking-widest').text('OPERATIONAL_DRAG');
    }

    // --- SCENE 3: BLIND (Radar) ---
    else if (type === 'blind') {
       // Radar Rings
       const rG = g.append('g');
       rG.append('circle').attr('r', 120).attr('fill', '#1a1a1a').attr('fill-opacity', 0.05).attr('stroke', '#1a1a1a').attr('stroke-width', 2);
       rG.append('line').attr('x1', -120).attr('x2', 120).attr('y1', 0).attr('y2', 0).attr('stroke', '#1a1a1a').attr('stroke-opacity', 0.2);
       rG.append('line').attr('y1', -120).attr('y2', 120).attr('x1', 0).attr('x2', 0).attr('stroke', '#1a1a1a').attr('stroke-opacity', 0.2);

       // Sweep
       const scan = rG.append('line').attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', -120).attr('stroke', '#E21E3F').attr('stroke-width', 4).attr('filter', 'url(#glow)');
       d3.timer((e) => { scan.attr('transform', `rotate(${e*0.15})`); });

       // Noise
       const nG = g.append('g');
       d3.interval(() => {
          nG.selectAll('*').remove();
          for(let i=0; i<50; i++) nG.append('rect').attr('x', (Math.random()-0.5)*240).attr('y', (Math.random()-0.5)*240).attr('width', Math.random()*4).attr('height', 4).attr('fill', '#1a1a1a').attr('opacity', Math.random()*0.4);
       }, 80);
       g.append('text').attr('y', 160).attr('text-anchor', 'middle').attr('class', 'font-mono text-[12px] font-bold fill-[#1a1a1a] tracking-widest opacity-60').text('ZERO_VISIBILITY');
    }

  }, [type]);

  return <div ref={containerRef} className="w-full h-full" />;
};


// --- MAIN HORIZONTAL SCROLL COMPONENT ---
const FrictionAuditSection: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Map vertical scroll (0 to 1) -> Horizontal slide (0% to -75%)
  // We use -75% because there are 4 items (100% / 4 = 25% each). We stop when the last one is in view.
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
    // Height 400vh -> Gives us "Time" to scroll through the 4 horizontal slides
    <section ref={targetRef} className="relative h-[400vh] bg-white z-30">
      
      {/* Sticky Frame: This locks the screen while we scroll sideways */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Horizontal Track */}
        <motion.div style={{ x }} className="flex">
          {points.map((point, index) => (
            <div 
              key={point.id} 
              className={`relative h-screen w-screen flex-shrink-0 flex items-center justify-center p-6 md:p-20 ${
                index % 2 === 0 ? 'bg-white' : 'bg-[#FFF2EC]'
              }`}
            >
              <div className="w-full max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                
                {/* Text Content */}
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

                {/* Visual Content */}
                <div className="order-1 lg:order-2 h-[400px] lg:h-[600px] w-full relative bg-[#1a1a1a]/[0.02] border border-[#1a1a1a]/10 rounded-sm overflow-hidden flex items-center justify-center group">
                   <div className="absolute top-6 right-6 z-10">
                     <point.icon className="w-8 h-8 text-[#1a1a1a]/20 group-hover:text-[#E21E3F] transition-colors duration-500" />
                   </div>
                   
                   {/* D3 Visual */}
                   <div className="w-full h-full p-8 md:p-16">
                      <FrictionVisual type={point.id} />
                   </div>
                   
                   {/* Technical Corners */}
                   <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#1a1a1a]/20" />
                   <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#1a1a1a]/20" />
                </div>

              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom Progress Bar */}
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
  const [hoveredCardIdx, setHoveredCardIdx] = useState<number | null>(null);

  type ViewState = 'landing' | 'about' | 'architecture' | 'protocol' | 'evidence' | 'pillar1' | 'pillar2' | 'pillar3' | 'pillar4' | 'pillar5' | 'pillar6' | 'pillar7' | 'contact';
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  const { scrollY } = useScroll();
  const scrollVelocity = useMotionValue(0);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [1, 8], { clamp: false });

  const carouselX = useMotionValue(0);
  const isCarouselHovered = useRef(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    const diff = latest - previous;
    scrollVelocity.set(Math.abs(diff));
    setScrolled(latest > 50);
  });

  useAnimationFrame((t, delta) => {
    if (currentView !== 'landing') return;
    let moveBy = 0.0006 * delta;
    moveBy *= Math.max(1, velocityFactor.get());
    if (isCarouselHovered.current) moveBy *= 0.05;
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
        setScrambleText(prev => 
          target.split("").map((letter, index) => {
            if (index < iterations) return target[index];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("")
        );
        if (iterations >= target.length) clearInterval(interval);
        iterations += 1;
      }, 60); 
    }, 7000); 

    return () => clearInterval(scrambleInterval);
  }, []);

  const handleServiceClick = (service: ServiceDetail) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const navigateTo = (view: ViewState, sectionId?: string) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleGlobalNavigate = (view: string, sectionId?: string) => {
    const viewMap: Record<string, ViewState> = {
      'landing': 'landing',
      'about': 'about',
      'architecture': 'architecture',
      'protocol': 'protocol',
      'evidence': 'evidence',
      'contact': 'contact'
    };
    // Map pillars if string comes as 'pillar1' etc.
    if (view.startsWith('pillar')) {
       navigateTo(view as ViewState, sectionId);
    } else {
       navigateTo(viewMap[view] || (view as ViewState), sectionId);
    }
  };

  const xPercent = useTransform(carouselX, (value) => `${value}%`);

  return (
    <div className="bg-[#FFF2EC] selection:bg-[#1a1a1a] selection:text-[#FFF2EC] min-h-screen flex flex-col">
      <D3Background />

      <GlobalHeader 
        currentView={currentView} 
        onNavigate={handleGlobalNavigate} 
        scrolled={scrolled} 
      />

      <PageTransition currentView={currentView}>
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            {currentView === 'landing' ? (
              <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <section id="hero" className="min-h-screen w-full flex items-center pt-20 overflow-hidden relative z-20 content-layer">
                  <HeroVisual />
                  <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-20">
                    <div className="lg:col-span-12 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-10 overflow-hidden">
                        <span className="h-[1px] w-12 bg-[#1a1a1a]"></span>
                        <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#1a1a1a] mt-[1px]">
                          SYDNEY BUSINESS GROWTH 
                          <span className="font-mono font-bold tracking-widest ml-2 text-[#C5A059]">
                            [ {scrambleText} ]
                          </span>
                        </span>
                      </div>
                      
                      <h1 className="font-serif text-7xl md:text-8xl lg:text-[6.5rem] leading-[0.9] tracking-tighter text-[#1a1a1a] mb-10">
                        <div className="overflow-hidden">
                          <span className="block reveal-text">Built on Logic,</span>
                        </div>
                        <div className="overflow-hidden">
                          <span className="block reveal-text" style={{ animationDelay: '0.2s' }}>
                            not <span className="italic font-serif text-[#C5A059] drop-shadow-[0_0_20px_rgba(197,160,89,0.4)]">Guesswork.</span>
                          </span>
                        </div>
                      </h1>

                      <p className="font-sans text-lg font-normal text-[#1a1a1a]/70 leading-relaxed max-w-2xl border-l border-[#1a1a1a]/20 pl-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                        Stop burning your best people. I build the digital systems that exit you from the daily grind. Precision is not optional.
                      </p>

                      <div className="mt-16 flex flex-col sm:flex-row items-center gap-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                        <button 
                          onClick={() => navigateTo('contact')} 
                          className="group relative px-10 py-5 bg-transparent text-[#FFF2EC] border border-[#1a1a1a] font-mono text-xs uppercase tracking-[0.15em] font-bold overflow-hidden transition-all duration-300"
                        >
                          <div className="absolute inset-0 bg-[#1a1a1a] group-hover:-translate-y-full transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                          <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                          <span className="relative z-10 group-hover:text-white transition-colors duration-500">[ START DIAGNOSIS ]</span>
                        </button>
                        
                        <a 
                          href="#architecture" 
                          onClick={(e) => { e.preventDefault(); navigateTo('architecture'); }} 
                          className="relative group flex items-center gap-3 cursor-pointer"
                        >
                          <span className="font-mono text-xs uppercase tracking-[0.1em] text-[#1a1a1a] border-b border-[#1a1a1a] pb-0.5 group-hover:border-b-2 group-hover:pb-1 transition-all duration-300 font-bold">SEE THE SYSTEM</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Plumb Line */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-32 w-[1px] bg-[#1a1a1a]/10 overflow-hidden">
                     <motion.div 
                       initial={{ height: 0 }}
                       animate={{ height: "100%" }}
                       transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
                       className="w-full bg-[#1a1a1a]"
                     />
                  </div>
                </section>

                <div className="w-full bg-[#1a1a1a]/5 py-10 border-y border-black/5 overflow-hidden relative z-30 carousel-mask" onMouseEnter={() => isCarouselHovered.current = true} onMouseLeave={() => isCarouselHovered.current = false}>
                  <div className="flex whitespace-nowrap">
                    <motion.div className="flex gap-32 items-center pr-20" style={{ x: xPercent }}>
                      {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                        <span key={i} className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase mix-blend-luminosity opacity-15 hover:opacity-60 hover:text-[#C5A059] transition-all duration-300 cursor-default">{tech}</span>
                      ))}
                    </motion.div>
                  </div>
                </div>

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
                <section id="architecture"><BentoGrid onServiceClick={handleServiceClick} /></section>
                
                {/* ==============================================
                    SECTION: EVIDENCE / CASE STUDY
                    (Replacing the old "Two Video" Grid)
                ============================================== */}
                <section className="py-32 px-6 md:px-12 lg:px-20 border-t border-black/10 bg-[#FFF2EC]">
                  <div className="max-w-[1400px] mx-auto">
                    
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                       <div className="max-w-2xl">
                          <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block uppercase font-bold">/ EVIDENCE_LOG_01</span>
                          <h2 className="font-serif text-4xl md:text-6xl mb-6 text-[#1a1a1a]">
                            Authority <br/>
                            <span className="italic text-[#1a1a1a]/40">Architecture.</span>
                          </h2>
                          <p className="font-sans text-lg text-[#1a1a1a]/70 leading-relaxed border-l-2 border-[#C5A059] pl-6">
                            We don't just build websites; we engineer turnarounds. <br/>
                            See how we migrated Group 7 Security from a slow, global generic to a high-speed local authority.
                          </p>
                       </div>
                       
                       {/* Optional: Stat or Label */}
                       <div className="hidden md:block text-right">
                          <div className="font-mono text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 mb-2">Total Speed Increase</div>
                          <div className="font-serif text-5xl text-[#0F766E]">+940%</div>
                       </div>
                    </div>

                    {/* INSERT THE NEW FEATURE COMPONENT */}
                    <Feature_Group7 />

                  </div>
                </section>

                <BookingCTA />
                <TheArchitect />
              </motion.div>
            ) : currentView === 'about' ? (
              <AboutPage key="about" onBack={() => navigateTo('landing')} onNavigate={handleGlobalNavigate} />
            ) : currentView === 'architecture' ? (
              <ArchitecturePage key="architecture" onBack={() => navigateTo('landing')} onNavigate={handleGlobalNavigate} />
            ) : currentView === 'protocol' ? (
              <ProtocolPage key="protocol" onBack={() => navigateTo('landing')} onNavigate={handleGlobalNavigate} />
            ) : currentView === 'evidence' ? (
              <EvidencePage key="evidence" onBack={() => navigateTo('landing')} onNavigate={handleGlobalNavigate} />
            ) : currentView === 'contact' ? (
              <ContactPage key="contact" onBack={() => navigateTo('landing')} />
            ) : currentView.startsWith('pillar') ? (
              <motion.div key={currentView} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                 {currentView === 'pillar1' && <Pillar1 onBack={() => navigateTo('architecture')} onNavigate={handleGlobalNavigate} />}
                 {currentView === 'pillar2' && <Pillar2 onBack={() => navigateTo('architecture')} onNavigate={handleGlobalNavigate} />}
                 {currentView === 'pillar3' && <PillarPage_Automation onBack={() => navigateTo('architecture')} onNavigate={handleGlobalNavigate} />}
                 {currentView === 'pillar4' && <PillarPage_Cognitive onBack={() => navigateTo('architecture')} onNavigate={handleGlobalNavigate} />}
                 {currentView === 'pillar5' && <PillarPage_Media onBack={() => navigateTo('architecture')} onNavigate={handleGlobalNavigate} />}
                 {currentView === 'pillar6' && <PillarPage_Adoption onBack={() => navigateTo('architecture')} onNavigate={handleGlobalNavigate} />}
                 {currentView === 'pillar7' && <PillarPage_Intelligence onBack={() => navigateTo('architecture')} onNavigate={handleGlobalNavigate} />}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </main>
      </PageTransition>

      {currentView !== 'architecture' && <GlobalFooter onNavigate={handleGlobalNavigate} />}

      <Modal service={selectedService} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onViewPillar={(pillarId) => navigateTo(pillarId as ViewState)} />
    </div>
  );
};

export default App;