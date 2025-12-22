import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import { Menu, X, ArrowRight, ChevronDown, Target, Zap, BarChart3 } from 'lucide-react';

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

  type ViewState = 'landing' | 'about' | 'architecture' | 'protocol' | 'evidence' | 'pillar1' | 'pillar2' | 'pillar3' | 'pillar4' | 'pillar5' | 'pillar6' | 'pillar7' | 'contact';
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
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
      window.removeEventListener('scroll', handleScroll);
      clearInterval(scrambleInterval);
      clearInterval(counterInterval);
    };
  }, []);

  const handleServiceClick = (service: ServiceDetail) => {
    const mapping: Record<string, ViewState> = {
      'capture-core': 'pillar1',
      'nervous-system': 'pillar2',
      'media-logistics': 'pillar3',
      'digital-labor': 'pillar4',
      'augmented-workforce': 'pillar5',
      'team-protocols': 'pillar6',
      'control-tower': 'pillar7'
    };
    
    if (mapping[service.id]) {
      navigateTo(mapping[service.id]);
    } else {
      setSelectedService(service);
      setIsModalOpen(true);
    }
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

  return (
    <div className="bg-[#FFF2EC] selection:bg-[#1a1a1a] selection:text-[#FFF2EC] min-h-screen flex flex-col">
      <D3Background />

      <nav className={`fixed top-0 w-full z-[300] px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-500 border-b ${scrolled || isArchHovered ? 'bg-[#FFF2EC]/95 backdrop-blur-md border-black/5 shadow-sm py-3' : 'border-transparent'}`} onMouseLeave={() => setIsArchHovered(false)}>
        <a href="#" onClick={(e) => { e.preventDefault(); navigateTo('landing'); }} className="flex items-center gap-3 group cursor-pointer" onMouseEnter={() => setIsLogoHovered(true)} onMouseLeave={() => setIsLogoHovered(false)}>
          <div className="font-mono text-xs font-bold border border-black px-2 py-0.5 bg-black text-[#FFF2EC]">[FC)</div>
          <div className="overflow-hidden flex items-center h-6">
            <span className="flex font-bold text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]">Felipe<span className={`ml-2 transition-colors duration-300 ${isLogoHovered ? 'text-[#C5A059]' : ''}`}>{isLogoHovered ? 'Home' : 'Chaparro'}</span></span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-12">
          <button onClick={() => navigateTo('about')} className={`nav-link text-[10px] uppercase tracking-widest transition-colors ${currentView === 'about' ? 'text-[#C5A059]' : 'text-[#1a1a1a]/70 hover:text-[#1a1a1a]'}`}>Origins</button>
          
          <div className="relative" onMouseEnter={() => setIsArchHovered(true)}>
            <button onClick={() => navigateTo('architecture')} className={`nav-link text-[10px] uppercase tracking-widest transition-colors flex items-center gap-2 ${currentView === 'architecture' || currentView.startsWith('pillar') ? 'text-[#C5A059]' : 'text-[#1a1a1a]/70 hover:text-[#1a1a1a]'}`}>Architecture <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isArchHovered ? 'rotate-180' : ''}`} /></button>

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
                          <button key={item.id} onClick={() => navigateTo(item.id as ViewState)} className="block text-left font-serif text-lg leading-tight hover:text-[#C5A059] transition-colors">{item.name}</button>
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

          <button onClick={() => navigateTo('protocol')} className={`nav-link text-[10px] uppercase tracking-widest transition-colors ${currentView === 'protocol' ? 'text-[#C5A059]' : 'text-[#1a1a1a]/70 hover:text-[#1a1a1a]'}`}>Protocol</button>
          <button onClick={() => navigateTo('evidence')} className={`nav-link text-[10px] uppercase tracking-widest transition-colors ${currentView === 'evidence' ? 'text-[#C5A059]' : 'text-[#1a1a1a]/70 hover:text-[#1a1a1a]'}`}>Evidence</button>
          <button onClick={() => navigateTo('contact')} className={`nav-link text-[10px] uppercase tracking-widest transition-colors ${currentView === 'contact' ? 'text-[#C5A059]' : 'text-[#1a1a1a]/70 hover:text-[#1a1a1a]'}`}>Contact</button>
          <a href="https://meetings-ap1.hubspot.com/felipe" target="_blank" className="text-xs font-bold uppercase tracking-widest border-b border-[#E21E3F] pb-0.5 text-[#E21E3F] hover:text-[#C5A059] hover:border-[#C5A059] transition-colors">Audit My System</a>
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-[#1a1a1a] z-[310] relative">
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-[#FFF2EC] z-[290] flex flex-col pt-32 px-12 md:hidden overflow-y-auto"
          >
            <div className="space-y-8 mb-12">
              <button onClick={() => navigateTo('about')} className="block text-4xl font-serif text-[#1a1a1a]">Origins</button>
              
              <div>
                <button onClick={() => navigateTo('architecture')} className="text-4xl font-serif text-[#1a1a1a] mb-6 flex items-center gap-4">
                  Architecture <ChevronDown className="w-6 h-6" />
                </button>
                <div className="pl-6 space-y-6 border-l border-black/10">
                  {archPillars.flatMap(s => s.items).map(item => (
                    <button 
                      key={item.id} 
                      onClick={() => navigateTo(item.id as ViewState)}
                      className="block text-xl font-serif text-black/60"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={() => navigateTo('protocol')} className="block text-4xl font-serif text-[#1a1a1a]">Protocol</button>
              <button onClick={() => navigateTo('evidence')} className="block text-4xl font-serif text-[#1a1a1a]">Evidence</button>
              <button onClick={() => navigateTo('contact')} className="block text-4xl font-serif text-[#1a1a1a]">Contact</button>
              <a href="https://meetings-ap1.hubspot.com/felipe" target="_blank" className="block text-4xl font-serif text-[#E21E3F]">Audit My System</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentView === 'landing' ? (
            <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <section id="hero" className="relative min-h-screen w-full flex items-center pt-20 overflow-hidden content-layer">
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-20">
                  <div className="lg:col-span-10 flex flex-col justify-center">
                    <div className="flex items-center gap-6 mb-10 overflow-hidden">
                      <span className="h-[1px] w-16 bg-[#1a1a1a] animate-extend-line"></span>
                      <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#1a1a1a] mt-[1px]">Business Growth <span className={`font-mono font-bold tracking-widest ml-2 ${isArchitectTarget ? 'text-[#C5A059]' : 'text-[#E21E3F]'}`}>{scrambleText}</span></span>
                    </div>
                    <h1 className="font-serif text-5xl md:text-8xl lg:text-[6.5rem] leading-[0.95] tracking-tighter text-[#1a1a1a] mb-10">
                      <div className="overflow-hidden"><span className="block reveal-text">Not an Agency.</span></div>
                      <div className="overflow-hidden"><span className="block reveal-text" style={{ animationDelay: '0.1s' }}>A Revenue <span className="text-[#C5A059] italic">Engine.</span></span></div>
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

              <div className="w-full bg-[#1a1a1a]/5 py-8 border-y border-black/5 overflow-hidden relative z-30">
                <div className="max-w-[1400px] mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-12 grayscale opacity-40 font-mono text-[10px] font-bold tracking-[0.4em] uppercase">
                  {['OpenAI', 'Anthropic', 'Make.com', 'Stripe', 'AWS', 'Google_Cloud', 'HubSpot', 'Next.js'].map(tech => <span key={tech}>{tech}</span>)}
                </div>
              </div>

              <section id="process" className="w-full border-t border-black/10 relative z-30 bg-[#FFF2EC] content-layer py-32 px-6 md:px-12 lg:px-20">
                <div className="max-w-[1600px] mx-auto">
                  <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-12">
                    <div className="max-w-xl">
                      <span className="font-mono text-xs uppercase tracking-widest text-[#E21E3F] mb-4 block">/ The Friction Audit</span>
                      <h2 className="font-serif text-5xl font-light mb-6">Is Your Business Suffering from <span className="italic">Operational Drag?</span></h2>
                      <p className="font-sans text-lg font-light text-[#1a1a1a]/70">Growth doesn't need more traffic. It needs less friction.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-black/10">
                    {[
                      { id: '01', title: 'Revenue Leakage', text: 'Demand is expiring in the inbox. Your current website is a brochure, not a capture mechanism.' },
                      { id: '02', title: 'Data Silos', text: 'Sales uses one tool. Ops uses another. Finance lives in Excel. Nothing talks to each other.' },
                      { id: '03', title: 'The Busywork Trap', text: 'You are wasting 40% of your week on manual data entry. You are playing COO instead of CEO.' },
                      { id: '04', title: 'Flying Blind', text: 'You manage by gut feeling because you can\'t see the numbers. You don\'t know your LTV in real-time.' }
                    ].map((item, idx) => (
                      <div key={idx} className="group relative border-b border-r border-black/10 p-12 hover:bg-white transition-colors duration-300">
                        <div className="absolute bottom-0 left-0 h-1 bg-[#1a1a1a] w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                        <h3 className="font-serif text-3xl mb-4 text-[#1a1a1a]">{item.title}</h3>
                        <p className="font-sans text-sm text-[#1a1a1a]/60 leading-relaxed">{item.text}</p>
                      </div>
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
                      <span className="font-mono text-xs uppercase tracking-widest text-[#E21E3F] mb-4 block">/ Execution Velocity</span>
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

      <Modal service={selectedService} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;