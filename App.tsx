import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useAnimationFrame, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
import { ServiceDetail } from './types';
import { Menu, X, ArrowRight, ChevronDown, Target, Zap, BarChart3, ArrowUpRight, Microscope, Palette, Briefcase } from 'lucide-react';

const TECH_STACK = [
  'OpenAI', 'Anthropic', 'Claude', 'Make.com', 'HubSpot', 'Stripe', 'Shopify', 
  'Next.js', 'Vercel', 'Sanity', 'Zapier', 'n8n', 'ElevenLabs', 'Vapi.ai', 
  'Bland AI', 'Voiceflow', 'BigQuery', 'Python', 'Looker Studio', 'Klaviyo'
];

const FrictionCard: React.FC<{ item: any, idx: number }> = ({ item, idx }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Refined Lens Flare
  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(197, 160, 89, 0.1), transparent 80%)`
  );

  return (
    <motion.div 
      onMouseMove={onMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, duration: 0.8 }}
      className="group relative glass-card p-12 overflow-hidden cursor-default transition-all duration-700"
    >
      {/* Glow Border on Hover */}
      <div className="absolute inset-0 border border-black/5 group-hover:border-[#C5A059]/30 transition-colors duration-700 pointer-events-none" />
      
      {/* Lens Flare Follow Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"
        style={{ background }}
      />

      {/* Laser Cut Gold Line */}
      <div className="absolute bottom-0 left-0 h-[1px] bg-[#C5A059] w-0 group-hover:w-full transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] z-20 shadow-[0_0_10px_rgba(197,160,89,0.5)]" />
      
      <span className="font-mono text-[9px] text-black/30 mb-8 block tracking-widest uppercase">NODE_ERR_0{item.id}</span>
      <h3 className="font-serif text-3xl mb-4 text-[#1a1a1a] group-hover:text-[#C5A059] transition-colors duration-500 relative z-20">{item.title}</h3>
      <p className="font-sans text-sm text-[#1a1a1a]/60 leading-relaxed relative z-20">{item.text}</p>
    </motion.div>
  );
};

const App: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isArchHovered, setIsArchHovered] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrambleText, setScrambleText] = useState("STRATEGIST");
  const [isArchitectTarget, setIsArchitectTarget] = useState(false);
  const [deploymentCounter, setDeploymentCounter] = useState(13.51);
  const [navVisible, setNavVisible] = useState(true);

  type ViewState = 'landing' | 'about' | 'architecture' | 'protocol' | 'evidence' | 'pillar1' | 'pillar2' | 'pillar3' | 'pillar4' | 'pillar5' | 'pillar6' | 'pillar7' | 'contact';
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  const { scrollY } = useScroll();
  const scrollVelocity = useMotionValue(0);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [1, 5], { clamp: false });

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
    
    // Variable Speed: Base speed + Scroll multiplier
    let moveBy = 0.04 * delta;
    moveBy *= Math.max(1, velocityFactor.get());
    
    // Slow down on hover for "Prestige" look
    if (isCarouselHovered.current) {
      moveBy *= 0.15;
    }

    const currentX = carouselX.get();
    let nextX = currentX - moveBy;
    
    // Wrap at 50% (assuming tech stack is doubled)
    if (nextX <= -50) nextX = 0;
    carouselX.set(nextX);
  });

  useEffect(() => {
    const roles = ["STRATEGIST", "ARCHITECT", "ENGINEER"];
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let roleIndex = 0;
    
    const scrambleInterval = setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      const target = roles[roleIndex];
      setIsArchitectTarget(target === "ARCHITECT");
      let iterations = 0;
      const interval = setInterval(() => {
        setScrambleText(prev => 
          target.split("").map((letter, index) => {
            if (index < iterations) return target[index];
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("")
        );
        if (iterations >= target.length) clearInterval(interval);
        iterations += 1 / 3;
      }, 45);
    }, 4000);

    const targetValue = 14.00;
    const counterInterval = setInterval(() => {
      setDeploymentCounter(prev => {
        if (prev < targetValue - 0.05) {
          return Number((prev + (targetValue - prev) * 0.1).toFixed(2));
        }
        const jitter = (Math.random() - 0.5) * 0.03;
        const result = targetValue + jitter;
        return Number(Math.max(13.94, Math.min(14.06, result)).toFixed(2));
      });
    }, 150);

    return () => {
      clearInterval(scrambleInterval);
      clearInterval(counterInterval);
    };
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

      {/* SMART NAVIGATION BAR */}
      <motion.nav 
        initial={{ y: 0 }}
        animate={{ y: navVisible ? 0 : -100 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 w-full z-[300] px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-500 ${scrolled || isArchHovered ? 'bg-[#FFF2EC]/95 backdrop-blur-md border-b border-black/5 shadow-sm py-3' : 'border-b border-transparent'}`} 
        onMouseLeave={() => setIsArchHovered(false)}
      >
        <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('landing'); }} className="flex items-center gap-3 group cursor-pointer" onMouseEnter={() => setIsLogoHovered(true)} onMouseLeave={() => setIsLogoHovered(false)}>
          <div className="font-mono text-xs font-bold border border-black px-2 py-0.5 bg-black text-[#FFF2EC]">[FC)</div>
          <div className="overflow-hidden flex items-center h-6">
            <span className={`flex font-bold text-[10px] uppercase tracking-[0.25em] transition-all duration-300 ${isLogoHovered ? 'logo-bloom' : 'text-[#1a1a1a]'}`}>
              Felipe<span className="ml-2">{isLogoHovered ? 'Home' : 'Chaparro'}</span>
            </span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-12">
          <button onClick={() => navigateTo('about')} className={`nav-link text-[10px] uppercase tracking-[0.25em] transition-colors ${currentView === 'about' ? 'text-[#C5A059]' : 'text-[#1a1a1a]/70 hover:text-[#1a1a1a]'}`}>Origins</button>
          
          <div className="relative" onMouseEnter={() => setIsArchHovered(true)}>
            <button onClick={() => navigateTo('architecture')} className={`nav-link text-[10px] uppercase tracking-[0.25em] transition-colors flex items-center gap-2 ${currentView === 'architecture' || currentView.startsWith('pillar') ? 'text-[#C5A059]' : 'text-[#1a1a1a]/70 hover:text-[#1a1a1a]'}`}>Architecture <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isArchHovered ? 'rotate-180' : ''}`} /></button>

            <AnimatePresence>
              {isArchHovered && (
                <motion.div initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }} className="absolute top-full -left-20 mt-4 w-[600px] bg-[#FFF2EC]/98 backdrop-blur-2xl border border-black/5 shadow-2xl p-8 grid grid-cols-3 gap-8">
                  {archPillars.map((system) => (
                    <div key={system.system}>
                      <div className="flex items-center gap-2 mb-4 text-[#C5A059]">
                        <system.icon className="w-4 h-4" />
                        <span className="font-mono text-[9px] uppercase tracking-[0.2em]">{system.system}</span>
                      </div>
                      <div className="space-y-3">
                        {system.items.map((item) => (
                          <button key={item.id} onClick={() => navigateTo(item.id as ViewState)} className="block text-left font-serif text-lg leading-tight hover:text-[#C5A059] transition-colors tracking-wide">{item.name}</button>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="col-span-3 pt-6 border-t border-black/5 mt-2">
                    <button onClick={() => navigateTo('architecture')} className="group flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-black/40 hover:text-black transition-colors">View Full Infrastructure Map <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" /></button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={() => navigateTo('protocol')} className={`nav-link text-[10px] uppercase tracking-[0.25em] transition-colors ${currentView === 'protocol' ? 'text-[#C5A059]' : 'text-[#1a1a1a]/70 hover:text-[#1a1a1a]'}`}>Protocol</button>
          <button onClick={() => navigateTo('evidence')} className={`nav-link text-[10px] uppercase tracking-[0.25em] transition-colors ${currentView === 'evidence' ? 'text-[#C5A059]' : 'text-[#1a1a1a]/70 hover:text-[#1a1a1a]'}`}>Evidence</button>
          <button onClick={() => navigateTo('contact')} className={`nav-link text-[10px] uppercase tracking-[0.25em] transition-colors ${currentView === 'contact' ? 'text-[#C5A059]' : 'text-[#1a1a1a]/70 hover:text-[#1a1a1a]'}`}>Contact</button>
          <a href="https://meetings-ap1.hubspot.com/felipe" target="_blank" className="text-xs font-bold uppercase tracking-[0.25em] border-b border-[#A31D33] pb-0.5 text-[#A31D33] hover:text-[#C5A059] hover:border-[#C5A059] transition-colors">Audit My System</a>
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-[#1a1a1a] z-[310] relative">
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </motion.nav>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentView === 'landing' ? (
            <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <section id="hero" className="relative min-h-screen w-full flex items-center pt-20 overflow-hidden content-layer">
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-20">
                  <div className="lg:col-span-10 flex flex-col justify-center">
                    <div className="flex items-center gap-6 mb-10 overflow-hidden">
                      <span className="h-[1px] w-16 bg-[#1a1a1a] animate-extend-line"></span>
                      <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#1a1a1a] mt-[1px]">Business Growth <span className={`font-mono font-bold tracking-widest ml-2 transition-colors duration-700 ${isArchitectTarget ? 'text-[#C5A059]' : 'text-[#A31D33]'}`}>{scrambleText}</span></span>
                    </div>
                    <h1 className="font-serif text-5xl md:text-8xl lg:text-[6.5rem] leading-[0.95] tracking-tighter text-[#1a1a1a] mb-10">
                      <div className="overflow-hidden"><span className="block reveal-text">Not an Agency.</span></div>
                      <div className="overflow-hidden"><span className="block reveal-text" style={{ animationDelay: '0.1s' }}>A <span className="liquid-gold-text italic">Revenue Engine.</span></span></div>
                    </h1>
                    <p className="font-sans text-lg font-normal text-[#1a1a1a]/70 leading-relaxed mb-8 md:mb-16 max-w-2xl border-l border-black/20 pl-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>Agencies are slow. Freelancers are unreliable. I combine Strategic Web Design with AI-driven operations to build systems that scale your revenue without adding headcount. Direct collaboration. No fluff.</p>
                    <div className="flex flex-col sm:flex-row gap-8 items-start animate-fade-in" style={{ animationDelay: '0.8s' }}>
                      <a href="https://meetings-ap1.hubspot.com/felipe" target="_blank" className="relative group px-10 py-5 border border-[#1a1a1a] overflow-hidden transition-all duration-300 bg-[#1a1a1a] text-[#FFF2EC] hover:text-[#1a1a1a] hover:border-[#C5A059]">
                        <div className="absolute inset-0 bg-[#FFF2EC] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)"></div>
                        <span className="relative z-10 font-mono text-xs uppercase tracking-[0.2em]">Apply For Access</span>
                      </a>
                      <a href="#process" className="relative group px-8 py-5 flex items-center gap-3">
                        <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#1a1a1a] group-hover:text-[#C5A059] transition-colors duration-300">Audit The Friction</span>
                        <ArrowRight className="w-4 h-4 text-[#1a1a1a] group-hover:translate-y-1 group-hover:text-[#C5A059] transition-all duration-300 rotate-90" />
                        <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black/20 group-hover:bg-[#C5A059] transition-colors duration-300"></span>
                      </a>
                    </div>
                  </div>
                </div>
              </section>

              {/* TECHNOLOGY CAROUSEL - Prestige Edges & Variable Speed */}
              <div 
                className="w-full bg-[#1a1a1a]/5 py-10 border-y border-black/5 overflow-hidden relative z-30 carousel-mask"
                onMouseEnter={() => isCarouselHovered.current = true}
                onMouseLeave={() => isCarouselHovered.current = false}
              >
                <div className="flex whitespace-nowrap">
                  <motion.div 
                    className="flex gap-20 items-center pr-20"
                    style={{ x: xPercent }}
                  >
                    {[...TECH_STACK, ...TECH_STACK].map((tech, i) => (
                      <span key={i} className="font-mono text-[10px] font-bold tracking-[0.4em] uppercase grayscale opacity-40 hover:opacity-100 transition-opacity duration-300">
                        {tech}
                      </span>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* FRICTION AUDIT - Prestige Glassmorphism */}
              <section id="process" className="w-full relative z-30 bg-[#FFF2EC] content-layer py-32 px-6 md:px-12 lg:px-20">
                <div className="max-w-[1600px] mx-auto">
                  <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-12">
                    <div className="max-w-xl">
                      <span className="font-mono text-xs uppercase tracking-widest text-[#A31D33] mb-4 block">/ The Friction Audit</span>
                      <h2 className="font-serif text-5xl font-light mb-6">Is Your Business Suffering from <span className="italic">Operational Drag?</span></h2>
                      <p className="font-sans text-lg font-light text-[#1a1a1a]/70">Growth doesn't need more traffic. It needs less friction.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { id: '101', title: 'Revenue Leakage', text: 'Demand is expiring in the inbox. Your current website is a brochure, not a capture mechanism.' },
                      { id: '102', title: 'Data Silos', text: 'Sales uses one tool. Ops uses another. Finance lives in Excel. Nothing talks to each other.' },
                      { id: '103', title: 'The Busywork Trap', text: 'You are wasting 40% of your week on manual data entry. You are playing COO instead of CEO.' },
                      { id: '104', title: 'Flying Blind', text: 'You manage by gut feeling because you can\'t see the numbers. You don\'t know your LTV in real-time.' }
                    ].map((item, idx) => (
                      <FrictionCard key={idx} item={item} idx={idx} />
                    ))}
                  </div>
                </div>
              </section>

              <RevenueAudit />
              <section id="architecture"><BentoGrid onServiceClick={handleServiceClick} /></section>
              <EvidenceVault />
              <TheArchitect />

              <section id="protocol" className="w-full border-t border-black/10 relative z-30 bg-[#FFF2EC] content-layer py-32 px-6 md:px-12 lg:px-20">
                <div className="max-w-[1600px] mx-auto relative z-10">
                  <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-black/10 pb-8">
                    <div className="max-w-2xl">
                      <span className="font-mono text-xs uppercase tracking-widest text-[#A31D33] mb-4 block">/ Execution Velocity</span>
                      <h2 className="font-serif text-5xl md:text-6xl text-[#1a1a1a] leading-[0.9] tracking-tight">I don't do "6-Month Strategies."<br /><span className="italic text-[#1a1a1a]/40">Sprints.</span></h2>
                    </div>
                    <div className="hidden md:block pb-2 text-right">
                      <p className="font-mono text-[10px] text-[#1a1a1a]/40 trackingest mb-1">AVG_DEPLOYMENT_TIME</p>
                      <p className="font-sans text-4xl font-light text-[#1a1a1a]"><span className="tabular-nums transition-colors duration-300">{deploymentCounter.toFixed(2)}</span> DAYS</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 relative">
                    {[
                      { phase: "01", title: "The Audit", text: "I deploy the Control Tower to map your data reality.", est: "3 Days" },
                      { phase: "02", title: "The Engine", text: "I configure the CRM and build the AI workforce.", est: "14 Days" },
                      { phase: "03", title: "The Training", text: "Behavioral engineering to ensure usage.", est: "5 Days" },
                      { phase: "04", title: "The Scale", text: "Monthly optimization and scale updates.", est: "Ongoing" }
                    ].map((step, idx) => (
                      <div key={idx} className="group relative p-8 md:pt-12 md:pr-8 border-l border-black/20 md:border-l-0 transition-all duration-500 hover:bg-white z-10">
                        <div className="hidden md:block absolute top-0 left-0 w-full h-[2px] bg-[#C5A059] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        <span className="font-mono text-xs text-[#C5A059]/80 mb-3 block uppercase">PHASE {step.phase}</span>
                        <h3 className="font-serif text-3xl mb-4 text-[#1a1a1a]">{step.title}</h3>
                        <p className="font-sans text-sm text-[#1a1a1a]/70 leading-relaxed">{step.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* SECTION 9: CTA BUFFER (THE MACHINE BOX) */}
              <section className="bg-[#FFF2EC] py-20 px-6 md:px-12 lg:px-20 relative z-30">
                <a href="https://meetings-ap1.hubspot.com/felipe" target="_blank" className="block w-full bg-[#1a1a1a] text-[#FFF2EC] p-12 md:p-20 relative overflow-hidden group transition-transform hover:-translate-y-1 duration-500">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_#C5A05920,_transparent)] pointer-events-none"></div>
                  <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="text-center md:text-left">
                      <h3 className="font-serif text-4xl md:text-5xl mb-3 italic">Ready to remove yourself from the machine?</h3>
                      <p className="font-sans text-white/60 text-lg">Current Capacity: 1 Slot Remaining for Q1.</p>
                    </div>
                    <div className="relative group/btn px-10 py-5 border border-[#FFF2EC] overflow-hidden transition-all duration-300">
                      <div className="absolute inset-0 bg-[#FFF2EC] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out"></div>
                      <span className="relative z-10 font-mono text-sm uppercase tracking-[0.2em] group-hover/btn:text-[#1a1a1a] transition-colors duration-300 flex items-center gap-3">Apply For Access <ArrowUpRight className="w-3 h-3" /></span>
                    </div>
                  </div>
                </a>
              </section>

              {/* SECTION 10: PHILOSOPHY */}
              <section id="philosophy" className="w-full relative z-30 bg-[#FFF2EC] text-[#1a1a1a] py-32 px-6 md:px-12 lg:px-20 border-t border-black/5">
                <div className="max-w-[1600px] mx-auto relative">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-24">
                    <div><span className="font-mono text-xs uppercase tracking-widest text-[#C5A059] mb-4 block">/ The Operator's Lens</span><h2 className="font-serif text-5xl md:text-6xl leading-[0.9] tracking-tight text-[#1a1a1a]">One Mind.<br />Ten Men's <span className="italic text-black/20">Output.</span></h2></div>
                    <div className="max-w-xl lg:pt-4"><p className="font-sans text-lg text-[#1a1a1a]/60 leading-relaxed mb-6">I leverage advanced infrastructure to deliver agency-level results as a solo architect. No juniors. No games of telephone. I diagnose the problem, and I build the solution.</p></div>
                  </div>
                  <div className="group/grid grid grid-cols-1 md:grid-cols-3 border-t border-black/10">
                    {[
                      { icon: Microscope, title: "The Specialist's Lens", label: "DIRECT ACCESS", text: "I diagnose the problem, and I build the solution. No account managers. No games of telephone. Direct collaboration with the architect." },
                      { icon: Palette, title: "The Artist's Lens", label: "RHYTHM & FLOW", text: "Technology without soul is friction. I design systems that feel human, intuitive, and flow with the natural rhythm of your business." },
                      { icon: Briefcase, title: "The Executive's Lens", label: "PHYSICS OF MONEY", text: "Architecture without ROI is just art. Every line of code I write is engineered to increase the Velocity of Capital through your business." }
                    ].map((item, idx) => (
                      <div key={idx} className="group p-10 md:p-12 border-b border-black/10 md:border-b-0 md:border-r last:border-r-0 hover:bg-white transition-colors duration-500">
                        <div className="mb-8 text-[#C5A059] transition-transform duration-500 group-hover:rotate-6 origin-bottom-left"><item.icon className="w-8 h-8" /></div>
                        <h3 className="font-serif text-3xl mb-3 text-[#1a1a1a] group-hover:translate-x-1 transition-transform tracking-tight">{item.title}</h3>
                        <p className="font-mono text-[10px] text-black/50 mb-6 uppercase tracking-widest group-hover:text-[#C5A059] transition-colors">{item.label}</p>
                        <p className="font-sans text-[#1a1a1a]/70 text-sm leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
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

      <Modal 
        service={selectedService} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onViewPillar={(pillarId) => navigateTo(pillarId as ViewState)} 
      />
    </div>
  );
};

export default App;