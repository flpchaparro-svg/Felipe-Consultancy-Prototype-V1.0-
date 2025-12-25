import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useAnimationFrame, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import * as d3 from 'd3';
import BentoGrid from './components/BentoGrid';
import Modal from './components/Modal';
import D3Background from './components/D3Background';
import TheArchitect from './components/TheArchitect';
import EvidenceVault from './components/EvidenceVault';
import EvidenceVaultPage from './components/EvidenceVaultPage';
import RevenueAudit from './components/RevenueAudit';
import AboutPage from './components/AboutPage'; 
import ArchitecturePage from './components/ArchitecturePage';
import ProtocolPage from './components/ProtocolPage';
import ContactPage from './components/ContactPage';
import Pillar1 from './components/Pillar1';
import Pillar2 from './components/Pillar2';
import Pillar3 from './components/Pillar3';
import Pillar4 from './components/Pillar4';
import Pillar5 from './components/Pillar5';
import Pillar6 from './components/Pillar6';
import Pillar7 from './components/Pillar7';
import GlobalFooter from './components/GlobalFooter';
import HeroVisual from './components/HeroVisual';
import { ServiceDetail } from './types';
import { Menu, X, ArrowRight, ChevronDown, Target, Zap, BarChart3, ArrowUpRight, Microscope, Palette, Briefcase, Droplets, Database, Repeat, EyeOff, AlertTriangle, Clock } from 'lucide-react';

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
      .text('ADMIN LOAD // MINIMIZING');

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

const FrictionVisual: React.FC<{ activeIndex: number }> = ({ activeIndex }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    d3.select(container).selectAll('*').remove();
    const svg = d3.select(container).append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    const g = svg.append('g').attr('transform', `translate(${width/2}, ${height/2})`);

    // --- SCENE 0: LEAKAGE (Line Chart Crash) ---
    if (activeIndex === 0) {
      const chartW = width * 0.6;
      const chartH = height * 0.4;
      const chartG = g.append('g').attr('transform', `translate(${-chartW/2}, ${-chartH/2})`);

      // Axes
      chartG.append('line').attr('x1', 0).attr('y1', chartH).attr('x2', chartW).attr('y2', chartH).attr('stroke', '#1a1a1a').attr('stroke-opacity', 0.2);
      chartG.append('line').attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', chartH).attr('stroke', '#1a1a1a').attr('stroke-opacity', 0.2);

      // Data: Stable high then crash
      const points = [
        {x: 0, y: 0.2}, {x: 0.2, y: 0.15}, {x: 0.4, y: 0.25}, 
        {x: 0.5, y: 0.2}, {x: 0.6, y: 0.8}, {x: 0.8, y: 0.9}, {x: 1, y: 0.95}
      ];

      // Gradient Line
      const gradient = svg.append('defs').append('linearGradient')
        .attr('id', 'leak-gradient')
        .attr('x1', '0%').attr('y1', '0%').attr('x2', '0%').attr('y2', '100%');
      gradient.append('stop').attr('offset', '0%').attr('stop-color', '#C5A059'); // Gold
      gradient.append('stop').attr('offset', '50%').attr('stop-color', '#E21E3F'); // Red
      
      const line = d3.line<any>()
        .x(d => d.x * chartW)
        .y(d => d.y * chartH)
        .curve(d3.curveMonotoneX);

      const path = chartG.append('path')
        .datum(points)
        .attr('fill', 'none')
        .attr('stroke', 'url(#leak-gradient)')
        .attr('stroke-width', 3)
        .attr('d', line);

      // Animate path drawing
      const totalLength = path.node()?.getTotalLength() || 0;
      path.attr('stroke-dasharray', `${totalLength} ${totalLength}`)
        .attr('stroke-dashoffset', totalLength)
        .transition().duration(2000).ease(d3.easeCubicOut)
        .attr('stroke-dashoffset', 0);

      // Leaking particles
      const particles = chartG.append('g');
      d3.interval(() => {
        const x = (0.5 + Math.random() * 0.5) * chartW; // Right side where it crashes
        const y = (0.2 + Math.random() * 0.6) * chartH;
        particles.append('circle')
          .attr('cx', x)
          .attr('cy', y)
          .attr('r', 2)
          .attr('fill', '#E21E3F')
          .attr('opacity', 1)
          .transition().duration(1500).attr('cy', chartH + 20).attr('opacity', 0).remove();
      }, 100);
    }

    // --- SCENE 1: SILOS (Disconnected Shapes) ---
    else if (activeIndex === 1) {
      const siloGroup = g.append('g');
      const positions = [-100, 0, 100];
      const colors = ['#1a1a1a', '#C5A059', '#E21E3F'];
      
      positions.forEach((xOffset, i) => {
        const silo = siloGroup.append('g').attr('transform', `translate(${xOffset}, 0)`);
        
        // Base
        silo.append('rect')
          .attr('x', -20).attr('y', -60)
          .attr('width', 40).attr('height', 120)
          .attr('rx', 4)
          .attr('fill', 'none')
          .attr('stroke', colors[i])
          .attr('stroke-width', 2);

        // Moving Data inside (trapped)
        const dot = silo.append('circle').attr('r', 4).attr('fill', colors[i]);
        
        const animateDot = () => {
          dot.transition().duration(1000 + Math.random()*1000)
            .attr('cy', -40)
            .transition().duration(1000 + Math.random()*1000)
            .attr('cy', 40)
            .on('end', animateDot);
        };
        animateDot();
      });

      // Attempted connection lines that fail
      const lineG = g.append('g');
      d3.interval(() => {
        const start = Math.floor(Math.random() * 3);
        const end = (start + 1) % 3;
        lineG.append('line')
          .attr('x1', positions[start] + 20).attr('y1', 0)
          .attr('x2', positions[start] + 20).attr('y2', 0)
          .attr('stroke', '#E21E3F').attr('stroke-width', 1).attr('opacity', 0.5)
          .transition().duration(500)
          .attr('x2', positions[start] + 50) // Try to reach
          .transition().duration(200).attr('opacity', 0).remove();
      }, 800);
    }

    // --- SCENE 2: TRAP (Spinning Wheel) ---
    else if (activeIndex === 2) {
      const radius = 80;
      const wheelG = g.append('g');
      
      // Outer ring
      wheelG.append('circle').attr('r', radius).attr('fill', 'none').attr('stroke', '#1a1a1a').attr('stroke-width', 2);
      
      // Inner friction sparks
      const sparkG = g.append('g');
      
      // Spinning elements
      const spokes = 8;
      for(let i=0; i<spokes; i++) {
        wheelG.append('line')
          .attr('x1', 0).attr('y1', 0)
          .attr('x2', 0).attr('y2', -radius)
          .attr('stroke', '#1a1a1a')
          .attr('stroke-width', 1)
          .attr('transform', `rotate(${(360/spokes)*i})`);
      }

      d3.timer((elapsed) => {
        wheelG.attr('transform', `rotate(${elapsed * 0.1})`);
        
        if (Math.random() > 0.8) {
           const angle = Math.random() * Math.PI * 2;
           const r = radius;
           const x = Math.cos(angle) * r;
           const y = Math.sin(angle) * r;
           sparkG.append('line')
             .attr('x1', x).attr('y1', y)
             .attr('x2', x * 1.2).attr('y2', y * 1.2)
             .attr('stroke', '#E21E3F')
             .attr('stroke-width', 2)
             .attr('opacity', 1)
             .transition().duration(300).attr('opacity', 0).remove();
        }
      });
    }

    // --- SCENE 3: BLIND (Foggy Data) ---
    else if (activeIndex === 3) {
      const dotCount = 50;
      const dots = d3.range(dotCount).map(() => ({
        x: (Math.random() - 0.5) * width * 0.6,
        y: (Math.random() - 0.5) * height * 0.6,
        r: Math.random() * 4 + 2
      }));

      // Blurry filter
      const defs = svg.append('defs');
      const filter = defs.append('filter').attr('id', 'blurFilter');
      filter.append('feGaussianBlur').attr('in', 'SourceGraphic').attr('stdDeviation', 4);

      const dotG = g.append('g').attr('filter', 'url(#blurFilter)');
      
      const circles = dotG.selectAll('circle').data(dots).enter().append('circle')
        .attr('cx', d => d.x).attr('cy', d => d.y).attr('r', d => d.r)
        .attr('fill', '#1a1a1a')
        .attr('opacity', 0);

      circles.each(function() {
        const c = d3.select(this);
        const loop = () => {
          c.transition().duration(1000 + Math.random() * 2000)
            .attr('opacity', 0.6)
            .transition().duration(1000 + Math.random() * 2000)
            .attr('opacity', 0)
            .on('end', loop);
        };
        loop();
      });

      // Eye Icon with Slash
      const eyeG = g.append('g');
      eyeG.append('path')
        .attr('d', 'M-30 0 Q0 -30 30 0 Q0 30 -30 0')
        .attr('fill', 'none').attr('stroke', '#E21E3F').attr('stroke-width', 2);
      eyeG.append('circle').attr('r', 10).attr('fill', 'none').attr('stroke', '#E21E3F').attr('stroke-width', 2);
      eyeG.append('line').attr('x1', -35).attr('y1', 35).attr('x2', 35).attr('y2', -35).attr('stroke', '#E21E3F').attr('stroke-width', 3);
    }

  }, [activeIndex]);

  return <div ref={containerRef} className="w-full h-full bg-[#FFF2EC]" />;
};

const FrictionAuditSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const points = [
    { 
      label: '01 // LEAKAGE', 
      title: 'Revenue Leakage', 
      body: "Demand is expiring in the inbox. Your website is a brochure, not a catcher. You are paying for leads you fail to catch.", 
      icon: AlertTriangle 
    },
    { 
      label: '02 // SILOS', 
      title: 'Data Silos', 
      body: "Sales uses one tool. Ops uses another. Finance lives in Excel. Nothing talks to each other. You have zero 'Source of Truth'.", 
      icon: Database 
    },
    { 
      label: '03 // TRAP', 
      title: 'The Busywork Trap', 
      body: "You are wasting 40% of your week on manual data entry. You are playing 'Chief Admin Officer' instead of steering the ship.", 
      icon: Clock 
    },
    { 
      label: '04 // BLIND', 
      title: 'Flying Blind', 
      body: "You manage by gut feeling because you can't see the numbers. You don't know your exact Profit or LTV until the accountant calls.", 
      icon: EyeOff 
    }
  ];

  return (
    <section id="process" className="w-full bg-[#FFF2EC] relative z-30 border-t border-l border-[#1a1a1a]/10">
      
      {/* SECTION HEADER - Compact */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-20 pb-12">
        <div className="flex flex-col max-w-4xl">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-[#1a1a1a] mb-4 font-bold">
            <span className="text-[#E21E3F]">/</span> THE SOURCES OF FRICTION
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-light leading-[0.95] mb-6 text-[#1a1a1a]">
            The 'Grind' isn't random. <br />
            It is <span className='italic text-[#E21E3F]'>Structural.</span>
          </h2>
          <p className="font-sans text-lg font-light text-[#1a1a1a]/70 leading-relaxed border-l border-[#E21E3F]/30 pl-6 max-w-2xl">
            We cannot build your exit until we identify the lock. Most businesses are bleeding out in one of these four specific areas.
          </p>
        </div>
      </div>

      {/* STICKY SPLIT SECTION - REDUCED HEIGHT */}
      <div className="flex flex-col lg:flex-row relative max-w-[1600px] mx-auto border-t border-[#1a1a1a]/10">
        
        {/* LEFT: STICKY VISUAL */}
        <div className="lg:w-1/2 h-[400px] lg:h-[550px] sticky top-24 border-r border-[#1a1a1a]/10 bg-[#FFF2EC] flex items-center justify-center overflow-hidden z-20">
           <div className="w-full h-full relative">
              <FrictionVisual activeIndex={activeIndex} />
           </div>
        </div>

        {/* RIGHT: SCROLLABLE STEPS */}
        <div className="lg:w-1/2">
          {points.map((point, i) => (
            <FrictionStep 
              key={i} 
              point={point} 
              index={i} 
              onInView={() => setActiveIndex(i)} 
            />
          ))}
        </div>

      </div>
    </section>
  );
};

const FrictionStep: React.FC<{ point: any, index: number, onInView: () => void }> = ({ point, index, onInView }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) {
      onInView();
    }
  }, [isInView, onInView]);

  return (
    <div ref={ref} className="h-[400px] lg:h-[550px] flex flex-col justify-center px-12 lg:px-20 border-b border-[#1a1a1a]/10 last:border-b-0">
      <motion.div 
        initial={{ opacity: 0.3 }}
        animate={{ opacity: isInView ? 1 : 0.3, x: isInView ? 0 : 20 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-6">
           <span className="font-mono text-[10px] tracking-[0.2em] text-[#E21E3F] uppercase bg-[#E21E3F]/5 px-2 py-1">
              {point.label}
           </span>
        </div>
        <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] mb-4 flex items-center gap-4">
           {point.title}
           <point.icon className={`w-6 h-6 stroke-[1] transition-colors duration-500 ${isInView ? 'text-[#E21E3F]' : 'text-gray-300'}`} />
        </h3>
        <p className="font-sans text-base text-[#1a1a1a]/60 leading-relaxed max-w-md">
           {point.body}
        </p>
      </motion.div>
    </div>
  );
};

const App: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isArchHovered, setIsArchHovered] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrambleText, setScrambleText] = useState("ARCHITECT");
  const [deploymentCounter, setDeploymentCounter] = useState(13.51);
  const [navVisible, setNavVisible] = useState(true);
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

    if (latest > previous && latest > 150) {
      setNavVisible(false);
    } else {
      setNavVisible(true);
    }
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
    setIsMenuOpen(false);
    setIsArchHovered(false);
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
    navigateTo(viewMap[view] || (view as ViewState), sectionId);
  };

  const archPillars = [
    { system: 'Acquisition', icon: Target, items: [
      { id: 'pillar1', name: 'Digital Revenue Architecture' },
      { id: 'pillar2', name: 'CRM Capture Core' },
      { id: 'pillar3', name: 'Media Logistics' }
    ]},
    { system: 'Productivity', icon: Zap, items: [
      { id: 'pillar4', name: 'Automation Architecture' },
      { id: 'pillar5', name: 'Cognitive Infrastructure' },
      { id: 'pillar6', name: 'Adoption Architecture' }
    ]},
    { system: 'Scale', icon: BarChart3, items: [
      { id: 'pillar7', name: 'Intelligence Services' }
    ]}
  ];

  const xPercent = useTransform(carouselX, (value) => `${value}%`);

  return (
    <div className="bg-[#FFF2EC] selection:bg-[#1a1a1a] selection:text-[#FFF2EC] min-h-screen flex flex-col">
      <D3Background />

      <motion.nav 
        initial={{ y: 0 }}
        animate={{ y: navVisible ? 0 : -100 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-[300] px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-500 ${scrolled || isArchHovered ? 'bg-[#FFF2EC]/95 backdrop-blur-md border-b border-black/5 shadow-sm py-3' : 'border-b border-transparent'}`} 
        onMouseLeave={() => setIsArchHovered(false)}
      >
        <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('landing'); }} className="flex items-center gap-3 group cursor-pointer" onMouseEnter={() => setIsLogoHovered(true)} onMouseLeave={() => setIsLogoHovered(false)}>
          <div className="font-mono text-[10px] font-bold border border-[#1a1a1a] px-2 py-0.5 bg-[#1a1a1a] text-[#FFF2EC] shrink-0 select-none">[FC)</div>
          <div className="flex font-bold text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a] items-center h-4 overflow-hidden select-none">
            <span>Felipe</span>
            <div className="relative ml-2 h-4 overflow-hidden">
              <motion.div animate={{ y: isLogoHovered ? -16 : 0 }} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col">
                <span className="h-4 flex items-center whitespace-nowrap">Chaparro</span>
                <span className="h-4 flex items-center text-[#C5A059]">Home</span>
              </motion.div>
            </div>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-12">
          <button onClick={() => navigateTo('about')} className={`nav-link text-[10px] font-bold uppercase transition-colors ${currentView === 'about' ? 'text-[#C5A059] opacity-100' : 'text-[#1a1a1a] opacity-70 hover:opacity-100'}`}>Origins</button>
          <div className="relative" onMouseEnter={() => setIsArchHovered(true)}>
            <button onClick={() => navigateTo('architecture')} className={`nav-link text-[10px] font-bold uppercase transition-colors flex items-center gap-2 ${currentView === 'architecture' || currentView.startsWith('pillar') ? 'text-[#C5A059] opacity-100' : 'text-[#1a1a1a] opacity-70 hover:opacity-100'}`}>
              Architecture <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isArchHovered ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
              {isArchHovered && (
                <motion.div initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }} className="absolute top-full -left-20 mt-4 w-[600px] bg-[#FFF2EC] border border-black/5 shadow-2xl p-8 grid grid-cols-3 gap-8 z-[500]">
                  {archPillars.map((system) => (
                    <div key={system.system}>
                      <div className="flex items-center gap-2 mb-4 text-[#1a1a1a]">
                        <system.icon className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold">{system.system}</span>
                      </div>
                      <div className="space-y-2.5">
                        {system.items.map((item) => (
                          <button key={item.id} onClick={() => navigateTo(item.id as ViewState)} className="block text-left font-serif text-[1.1rem] leading-tight text-[#1a1a1a] hover:text-[#C5A059] transition-colors tracking-wide">{item.name}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <button onClick={() => navigateTo('protocol')} className={`nav-link text-[10px] font-bold uppercase transition-colors ${currentView === 'protocol' ? 'text-[#C5A059] opacity-100' : 'text-[#1a1a1a] opacity-70 hover:opacity-100'}`}>Protocol</button>
          <button onClick={() => navigateTo('evidence')} className={`nav-link text-[10px] font-bold uppercase transition-colors ${currentView === 'evidence' ? 'text-[#C5A059] opacity-100' : 'text-[#1a1a1a] opacity-70 hover:opacity-100'}`}>Evidence</button>
          <button onClick={() => navigateTo('contact')} className={`nav-link text-[10px] font-bold uppercase transition-colors ${currentView === 'contact' ? 'text-[#C5A059] opacity-100' : 'text-[#1a1a1a] opacity-70 hover:opacity-100'}`}>Contact</button>
          <a href="https://meetings-ap1.hubspot.com/felipe" target="_blank" className="text-xs font-bold uppercase tracking-[0.25em] text-[#E21E3F] border-b border-[#E21E3F] pb-0.5 hover:border-b-2 hover:pb-1 transition-all duration-300">Audit My System</a>
        </div>
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-[#1a1a1a] z-[310] relative">
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.nav>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentView === 'landing' ? (
            <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <section id="hero" className="min-h-screen w-full flex items-center pt-20 overflow-hidden relative z-20 content-layer">
                <HeroVisual />
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-20">
                  <div className="lg:col-span-12 flex flex-col justify-center">
                    <div className="flex items-center gap-6 mb-10 overflow-hidden">
                      <span className="h-[1px] w-12 bg-[#1a1a1a] animate-extend-line"></span>
                      <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#1a1a1a] mt-[1px]">
                        SYDNEY BUSINESS GROWTH 
                        <span 
                          className="font-mono font-bold tracking-widest ml-2 transition-colors duration-700"
                          style={{ color: scrambleText === "NAVIGATOR" ? "#C5A059" : (scrambleText === "ENGINEER" ? "#E21E3F" : "#1a1a1a") }}
                        >
                          [ {scrambleText} ]
                        </span>
                      </span>
                    </div>
                    
                    <h1 className="font-serif text-7xl md:text-8xl lg:text-[6.5rem] leading-[0.95] tracking-tight text-[#1a1a1a] mb-10">
                      <div className="overflow-hidden">
                        <span className="block reveal-text">Built on Drive.</span>
                      </div>
                      <div className="overflow-hidden">
                        <span className="block reveal-text" style={{ animationDelay: '0.4s' }}>
                          Not <span className="italic text-[#C5A059]">Paperwork.</span>
                        </span>
                      </div>
                    </h1>

                    <p className="font-sans text-lg font-normal text-[#1a1a1a]/70 leading-relaxed max-w-2xl border-l border-[#1a1a1a]/20 pl-6 animate-fade-in" style={{ animationDelay: '0.8s' }}>
                      Stop burning your best people on repetitive tasks. I build the digital systems that let you reclaim your margin and your sanity. No jargon. No fluff. Just logic that works.
                    </p>

                    <div className="mt-16 flex flex-col sm:flex-row items-center gap-12 animate-fade-in" style={{ animationDelay: '1s' }}>
                      <a 
                        href="https://meetings-ap1.hubspot.com/felipe" 
                        target="_blank" 
                        className="group relative px-10 py-5 bg-transparent text-[#FFF2EC] border border-[#1a1a1a] font-mono text-xs uppercase tracking-[0.3em] font-bold overflow-hidden transition-all duration-300"
                      >
                        <div className="absolute inset-0 bg-[#1a1a1a] group-hover:-translate-y-full transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)" />
                        <span className="relative z-10 group-hover:text-[#1a1a1a] transition-colors duration-500">[ GET MY 15-MIN FRICTION MAP ]</span>
                      </a>
                      
                      <a 
                        href="#diagnosis" 
                        onClick={(e) => { e.preventDefault(); const el = document.getElementById('diagnosis'); el?.scrollIntoView({ behavior: 'smooth' }); }} 
                        className="relative group flex items-center gap-3"
                      >
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#1a1a1a] border-b border-[#1a1a1a] pb-0.5 group-hover:border-b-2 group-hover:pb-1 transition-all duration-300 font-bold uppercase">EXPLORE THE 7 PILLARS</span>
                        <ChevronDown className="w-5 h-5 text-[#1a1a1a] transition-all duration-300 group-hover:translate-y-1.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              <div className="w-full bg-[#1a1a1a]/5 py-10 border-y border-black/5 overflow-hidden relative z-30 carousel-mask" onMouseEnter={() => isCarouselHovered.current = true} onMouseLeave={() => isCarouselHovered.current = false}>
                <div className="flex whitespace-nowrap">
                  <motion.div className="flex gap-32 items-center pr-20" style={{ x: xPercent }}>
                    {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                      <span key={i} className="font-mono text-[10px] font-bold tracking-[0.5em] uppercase mix-blend-luminosity opacity-15 hover:opacity-60 hover:text-[#C5A059] transition-all duration-300 cursor-default">{tech}</span>
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
                        If you are reading this while the rest of the world is quiet, you know the feeling. Revenue is up, but so is the friction. Your team is drowning in manual work.
                      </p>
                    </div>
                    <div className="col-span-1 p-12 border-r border-b border-[#1a1a1a]/10 bg-[#E21E3F]/5 min-h-[300px]">
                      <span className="font-mono text-xs uppercase tracking-widest text-[#E21E3F] mb-8 block">03 / ERROR DETECTED</span>
                      <div className="space-y-4">
                        <div className="font-sans text-3xl font-bold text-[#E21E3F] uppercase tracking-tighter">Burning People</div>
                        <p className="font-sans text-sm text-[#E21E3F]/70 leading-relaxed uppercase tracking-widest">
                          Using expensive human talent to bridge gap in your software.
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
                        SYSTEMS_OPTIMIZED
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>

              <FrictionAuditSection />

              <RevenueAudit />
              <section id="architecture"><BentoGrid onServiceClick={handleServiceClick} /></section>
              <EvidenceVault />
              <TheArchitect />
            </motion.div>
          ) : currentView === 'about' ? (
            <AboutPage key="about" onBack={() => navigateTo('landing')} onNavigate={handleGlobalNavigate} />
          ) : currentView === 'architecture' ? (
            <ArchitecturePage key="architecture" onBack={() => navigateTo('landing')} onNavigatePillar={(id: string) => navigateTo(id as ViewState)} />
          ) : currentView === 'protocol' ? (
            <ProtocolPage key="protocol" onBack={() => navigateTo('landing')} />
          ) : currentView === 'evidence' ? (
            <EvidenceVaultPage key="evidence" onBack={() => navigateTo('landing')} />
          ) : currentView === 'contact' ? (
            <ContactPage key="contact" onBack={() => navigateTo('landing')} />
          ) : currentView.startsWith('pillar') ? (
            <motion.div key={currentView} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
               {currentView === 'pillar1' && <Pillar1 onBack={() => navigateTo('architecture')} />}
               {currentView === 'pillar2' && <Pillar2 onBack={() => navigateTo('architecture')} />}
               {currentView === 'pillar3' && <Pillar3 onBack={() => navigateTo('architecture')} />}
               {currentView === 'pillar4' && <Pillar4 onBack={() => navigateTo('architecture')} />}
               {currentView === 'pillar5' && <Pillar5 onBack={() => navigateTo('architecture')} />}
               {currentView === 'pillar6' && <Pillar6 onBack={() => navigateTo('architecture')} />}
               {currentView === 'pillar7' && <Pillar7 onBack={() => navigateTo('architecture')} />}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </main>

      <GlobalFooter onNavigate={handleGlobalNavigate} />

      <Modal service={selectedService} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onViewPillar={(pillarId) => navigateTo(pillarId as ViewState)} />
    </div>
  );
};

export default App;