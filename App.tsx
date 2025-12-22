import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BentoGrid from './components/BentoGrid';
import Modal from './components/Modal';
import D3Background from './components/D3Background';
import TheArchitect from './components/TheArchitect';
import EvidenceVault from './components/EvidenceVault';
import RevenueAudit from './components/RevenueAudit';
import AboutPage from './components/AboutPage'; 
import ArchitecturePage from './components/ArchitecturePage';
import Pillar1DigitalRevenue from './components/Pillar1DigitalRevenue';
import GlobalFooter from './components/GlobalFooter';
import { ServiceDetail } from './types';
import { Menu, X, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrambleText, setScrambleText] = useState("STRATEGIST");
  const [isArchitectTarget, setIsArchitectTarget] = useState(false);
  const [deploymentCounter, setDeploymentCounter] = useState(13.51);

  type ViewState = 'landing' | 'about' | 'architecture' | 'pillar1';
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
    if (service.id === 'capture-core') {
      navigateTo('pillar1');
    } else {
      setSelectedService(service);
      setIsModalOpen(true);
    }
  };

  const navigateTo = (view: ViewState, sectionId?: string) => {
    setCurrentView(view);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleGlobalNavigate = (view: any, sectionId?: string) => {
    // Map footer paths to internal view state
    const targetView = view === 'digital-revenue' ? 'pillar1' : view;
    navigateTo(targetView as ViewState, sectionId);
  };

  return (
    <div className="bg-[#FFF2EC] selection:bg-[#1a1a1a] selection:text-[#FFF2EC] min-h-screen flex flex-col">
      <D3Background />

      {/* LAYER 0: GLOBAL HEADER */}
      <nav className={`fixed top-0 w-full z-[200] px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-500 border-b ${scrolled ? 'bg-[#FFF2EC]/90 backdrop-blur-md border-black/5 shadow-sm py-3' : 'border-transparent'}`}>
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); navigateTo('landing'); }}
          className="flex items-center gap-3 group cursor-pointer"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          <div className="font-mono text-xs font-bold border border-black px-2 py-0.5 bg-black text-[#FFF2EC]">[FC)</div>
          <div className="overflow-hidden flex items-center h-6">
            <span className="flex font-bold text-[10px] uppercase tracking-[0.2em] text-[#1a1a1a]">
              Felipe
              <span className={`ml-2 transition-colors duration-300 ${isLogoHovered ? 'text-[#C5A059]' : ''}`}>
                {isLogoHovered ? 'Home' : 'Chaparro'}
              </span>
            </span>
          </div>
        </a>

        <div className="hidden md:flex items-center gap-12">
          <button onClick={() => navigateTo('about')} className={`nav-link text-[10px] uppercase tracking-widest transition-colors ${currentView === 'about' ? 'text-[#C5A059]' : 'text-[#1a1a1a]/70 hover:text-[#1a1a1a]'}`}>Origins</button>
          <button onClick={() => navigateTo('architecture')} className={`nav-link text-[10px] uppercase tracking-widest transition-colors ${currentView === 'architecture' ? 'text-[#C5A059]' : 'text-[#1a1a1a]/70 hover:text-[#1a1a1a]'}`}>Architecture</button>
          {['Protocol', 'Evidence'].map((item) => (
            <button 
              key={item} 
              onClick={() => navigateTo('landing', item.toLowerCase())}
              className="nav-link text-[10px] uppercase tracking-widest text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors"
            >
              {item}
            </button>
          ))}
          <a href="https://meetings-ap1.hubspot.com/felipe" target="_blank" className="text-xs font-bold uppercase tracking-widest border-b border-[#E21E3F] pb-0.5 text-[#E21E3F] hover:text-[#C5A059] hover:border-[#C5A059] transition-colors">
            Audit My System
          </a>
        </div>

        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-[#1a1a1a] z-[210] relative">
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-[#FFF2EC]/95 backdrop-blur-xl z-[190] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button onClick={() => navigateTo('about')} className="text-4xl font-serif text-[#1a1a1a]">Origins</button>
            <button onClick={() => navigateTo('architecture')} className="text-4xl font-serif text-[#1a1a1a]">Architecture</button>
            <button onClick={() => navigateTo('landing', 'protocol')} className="text-4xl font-serif text-[#1a1a1a]">Protocol</button>
            <button onClick={() => navigateTo('landing', 'evidence')} className="text-4xl font-serif text-[#1a1a1a]">Evidence</button>
            <a href="https://meetings-ap1.hubspot.com/felipe" target="_blank" className="mt-4 px-8 py-4 bg-[#1a1a1a] text-[#FFF2EC] font-mono text-xs uppercase tracking-widest">Audit My System</a>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {currentView === 'landing' ? (
            <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="content-layer">
              <section id="hero" className="relative min-h-screen w-full flex items-center pt-20 overflow-hidden content-layer">
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-20">
                  <div className="lg:col-span-10 flex flex-col justify-center">
                    <div className="flex items-center gap-6 mb-10 overflow-hidden">
                      <span className="h-[1px] w-16 bg-[#1a1a1a] animate-extend-line"></span>
                      <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#1a1a1a] mt-[1px]">
                        Business Growth <span className={`font-mono font-bold tracking-widest ml-2 ${isArchitectTarget ? 'text-[#C5A059]' : 'text-[#E21E3F]'}`}>{scrambleText}</span>
                      </span>
                    </div>
                    <h1 className="font-serif text-5xl md:text-8xl lg:text-[6.5rem] leading-[0.95] tracking-tighter text-[#1a1a1a] mb-10">
                      <div className="overflow-hidden"><span className="block reveal-text">Not an Agency.</span></div>
                      <div className="overflow-hidden"><span className="block reveal-text" style={{ animationDelay: '0.1s' }}>A Revenue <span className="text-[#C5A059] italic">Engine.</span></span></div>
                    </h1>
                    <p className="font-sans text-lg font-normal text-[#1a1a1a]/70 leading-relaxed mb-8 md:mb-16 max-w-2xl border-l border-black/20 pl-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                      Agencies are slow. Freelancers are unreliable. I combine Strategic Web Design with AI-driven operations to build systems that scale your revenue without adding headcount. Direct collaboration. No fluff.
                    </p>
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
                      { id: '01 // LEAKAGE', icon: Menu, title: 'Revenue Leakage', text: 'Demand is expiring in the inbox. Your current website is a brochure, not a capture mechanism.' },
                      { id: '02 // SILOS', icon: Menu, title: 'Data Silos', text: 'Sales uses one tool. Ops uses another. Finance lives in Excel. Nothing talks to each other.' },
                      { id: '03 // DRAG', icon: Menu, title: 'The Busywork Trap', text: 'You are wasting 40% of your week on manual data entry. You are playing COO instead of CEO.' },
                      { id: '04 // BLIND', icon: Menu, title: 'Flying Blind', text: 'You manage by gut feeling because you can\'t see the numbers. You don\'t know your LTV in real-time.' }
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
                      <p className="font-mono text-[10px] text-[#1a1a1a]/40 tracking-widest mb-1">AVG_DEPLOYMENT_TIME</p>
                      <p className="font-sans text-4xl font-light text-[#1a1a1a]"><span className="tabular-nums transition-colors duration-300">{deploymentCounter.toFixed(2)}</span> DAYS</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 relative">
                    {[
                      { phase: "01 // Diagnostic", title: "The Audit", text: "I deploy the Control Tower to map your data reality.", est: "3 Days" },
                      { phase: "02 // Build", title: "The Engine", text: "I configure the CRM and build the AI workforce.", est: "14 Days" },
                      { phase: "03 // Adoption", title: "The Training", text: "Behavioral engineering to ensure usage.", est: "5 Days" },
                      { phase: "04 // Scale", title: "The Watchtower", text: "Monthly optimization and scale updates.", est: "Ongoing" }
                    ].map((step, idx) => (
                      <div key={idx} className="group relative p-8 md:pt-12 md:pr-8 border-l border-black/20 md:border-l-0 transition-all duration-500 hover:bg-white z-10">
                        <div className="hidden md:block absolute top-0 left-0 w-full h-[2px] bg-[#C5A059] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                        <span className="font-mono text-xs text-[#C5A059]/80 mb-3 block uppercase">{step.phase}</span>
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
            <ArchitecturePage key="architecture" onBack={() => navigateTo('landing')} onNavigatePillar={(id: any) => navigateTo(id as ViewState)} />
          ) : currentView === 'pillar1' ? (
            <Pillar1DigitalRevenue key="pillar1" onBack={() => navigateTo('architecture')} />
          ) : null}
        </AnimatePresence>
      </main>

      {/* LAYER 0: GLOBAL FOOTER */}
      <GlobalFooter onNavigate={handleGlobalNavigate} />

      <Modal service={selectedService} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default App;