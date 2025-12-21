
import React, { useState, useEffect } from 'react';
import BentoGrid from './components/BentoGrid';
import Modal from './components/Modal';
import D3Background from './components/D3Background';
import { ServiceDetail } from './types';
import { Menu, ArrowRight, ArrowUpRight, AlertTriangle, Layers, Clock, EyeOff, Microscope, Palette, Briefcase, Database, Zap, Cpu, Users } from 'lucide-react';

const App: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrambleText, setScrambleText] = useState("STRATEGIST");
  const [deploymentCounter, setDeploymentCounter] = useState(13.51);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    // Scramble logic
    const roles = ["STRATEGIST", "ARCHITECT", "ENGINEER"];
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
        iterations += 1 / 3;
      }, 45);
    }, 4000);

    // SMARTER COUNTER
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
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[#FFF2EC] selection:bg-[#1a1a1a] selection:text-[#FFF2EC]">
      <D3Background />

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 px-6 md:px-12 py-6 flex justify-between items-center transition-all duration-500 border-b ${scrolled ? 'bg-[#FFF2EC]/90 backdrop-blur-md border-black/5 shadow-sm py-3' : 'border-transparent'}`}>
        <div className="text-xs font-bold tracking-[0.3em] uppercase text-[#1a1a1a]">Felipe Chaparro</div>
        <div className="hidden md:flex items-center gap-12">
          <a href="#hero" className="nav-link text-[10px] uppercase tracking-widest text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors">Origins</a>
          <a href="#services" className="nav-link text-[10px] uppercase tracking-widest text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors">Architecture</a>
          <a href="#protocol" className="nav-link text-[10px] uppercase tracking-widest text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors">Protocol</a>
          <a href="https://meetings-ap1.hubspot.com/felipe" target="_blank" className="text-xs font-bold uppercase tracking-widest border-b border-[#E21E3F] pb-0.5 text-[#E21E3F] hover:text-[#C5A059] hover:border-[#C5A059] transition-colors">
            Audit My System
          </a>
        </div>
        <button className="md:hidden p-2 text-[#1a1a1a]">
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen w-full flex items-center pt-20 overflow-hidden content-layer">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-20">
          <div className="lg:col-span-10 flex flex-col justify-center">
            <div className="flex items-center gap-6 mb-10 overflow-hidden">
              <span className="h-[1px] w-16 bg-[#1a1a1a] animate-extend-line"></span>
              <span className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#1a1a1a] mt-[1px]">
                Business Growth 
                <span className={`font-mono font-bold tracking-widest ml-2 transition-colors duration-500 ${scrambleText === "ARCHITECT" ? 'text-[#C5A059]' : 'text-[#E21E3F]'}`}>
                  {scrambleText}
                </span>
              </span>
            </div>

            <h1 className="font-serif text-5xl md:text-8xl lg:text-[6.5rem] leading-[0.95] tracking-tight text-[#1a1a1a] mb-10">
              <div className="overflow-hidden">
                <span className="block reveal-text">Not an Agency.</span>
              </div>
              <div className="overflow-hidden">
                <span className="block reveal-text" style={{ animationDelay: '0.1s' }}>
                  A Revenue <span className="text-[#C5A059] italic">Engine.</span>
                </span>
              </div>
            </h1>
            
            <p className="font-sans text-lg font-normal text-[#1a1a1a]/70 leading-relaxed mb-8 md:mb-16 max-w-2xl border-l border-black/20 pl-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
              Agencies are slow. Freelancers are unreliable. I combine Strategic Web Design with AI-driven operations to build systems that scale your revenue without adding headcount. Direct collaboration. No fluff.
            </p>

            <div className="flex flex-col sm:flex-row gap-8 items-start animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <a href="https://meetings-ap1.hubspot.com/felipe" target="_blank" className="relative group px-10 py-5 border border-[#1a1a1a] overflow-hidden transition-all duration-300 bg-[#1a1a1a] text-[#FFF2EC] hover:text-[#1a1a1a] hover:border-[#C5A059]">
                <div className="absolute inset-0 bg-[#FFF2EC] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)"></div>
                <span className="relative z-10 font-mono text-xs uppercase tracking-[0.2em]">Apply For Access</span>
              </a>

              <a href="#services" className="relative group px-8 py-5 flex items-center gap-3">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#1a1a1a] group-hover:text-[#C5A059] transition-colors duration-300">See The Engine</span>
                <ArrowRight className="w-4 h-4 text-[#1a1a1a] group-hover:translate-y-1 group-hover:text-[#C5A059] transition-all duration-300 rotate-90" />
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black/20 group-hover:bg-[#C5A059] transition-colors duration-300"></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Friction Audit Section */}
      <section id="process" className="w-full border-t border-black/10 relative z-30 bg-[#FFF2EC] content-layer py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-12">
            <div className="max-w-xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[#E21E3F] mb-4 block">/ The Friction Audit</span>
              <h2 className="font-serif text-5xl font-light mb-6">Is Your Business Suffering from <span className="italic">Operational Drag?</span></h2>
              <p className="font-sans text-lg font-light text-[#1a1a1a]/70">Growth doesn't need more traffic. It needs less friction.</p>
            </div>
            <div className="text-right hidden md:block">
              <span className="font-mono text-xs uppercase tracking-widest text-[#1a1a1a]/40">SYSTEM STATUS: <span className="text-[#E21E3F] animate-pulse">SCANNING</span></span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-black/10">
            {[
              { id: '01 // LEAKAGE', icon: AlertTriangle, title: 'Revenue Leakage', text: 'Demand is expiring in the inbox. Your current website is a brochure, not a capture mechanism. You are burning capital on leads you fail to capture.' },
              { id: '02 // SILOS', icon: Layers, title: 'Data Silos', text: 'Sales uses one tool. Ops uses another. Finance lives in Excel. Nothing talks to each other. You have zero source of truth.' },
              { id: '03 // DRAG', icon: Clock, title: 'The Busywork Trap', text: 'You are wasting 40% of your week on manual data entry. You are playing "Chief Operations Officer" instead of CEO.' },
              { id: '04 // BLIND', icon: EyeOff, title: 'Flying Blind', text: 'You manage by gut feeling because you can\'t see the numbers. You don\'t know your exact Profit or LTV in real-time.' }
            ].map((item, idx) => (
              <div key={idx} className="group relative border-b border-r border-black/10 p-12 hover:bg-white transition-colors duration-300 overflow-hidden">
                <div className="absolute bottom-0 left-0 h-1 bg-[#1a1a1a] w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                <div className="flex justify-between items-start mb-8">
                  <item.icon className="w-8 h-8 text-[#1a1a1a]/80 group-hover:text-[#E21E3F] transition-colors duration-300" />
                  <span className="font-mono text-xs text-[#1a1a1a]/30 group-hover:text-[#E21E3F] group-hover:translate-x-1 transition-all duration-300">{item.id}</span>
                </div>
                <h3 className="font-serif text-3xl mb-4 text-[#1a1a1a] group-hover:translate-x-1 transition-transform duration-500">{item.title}</h3>
                <p className="font-sans text-sm text-[#1a1a1a]/60 leading-relaxed max-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <BentoGrid onServiceClick={handleServiceClick} />

      {/* Philosophy Section */}
      <section id="philosophy" className="w-full relative z-30 bg-[#1a1a1a] text-[#FFF2EC] content-layer py-32 px-6 md:px-12 lg:px-20 overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-[1600px] mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mb-24">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#C5A059] mb-4 block">/ The Operator's Lens</span>
              <h2 className="font-serif text-5xl md:text-6xl leading-[0.9] tracking-tight">
                One Mind.<br />
                Ten Men's <span className="italic text-white/40">Output.</span>
              </h2>
            </div>
            <div className="max-w-xl lg:pt-4">
              <p className="font-sans text-lg text-white/60 leading-relaxed mb-6">
                How do I deliver agency-level results as a solo architect? I leverage advanced infrastructure. You get the output of a full team, for the cost of one expert.
              </p>
            </div>
          </div>

          <div className="group/grid grid grid-cols-1 md:grid-cols-3 border-t border-white/10">
            {[
              { icon: Microscope, title: "The Specialist's Lens", label: "DIRECT ACCESS", text: "No account managers. No games of telephone. You work directly with the Architect. I diagnose the problem, and I build the solution." },
              { icon: Palette, title: "The Artist's Lens", label: "RHYTHM & FLOW", text: "Technology without soul is friction. I design systems that feel human, intuitive, and flow with the natural rhythm of your business." },
              { icon: Briefcase, title: "The Executive's Lens", label: "PHYSICS OF MONEY", text: "Architecture without ROI is just art. Every line of code I write is engineered to increase the Velocity of Capital through your business." }
            ].map((item, idx) => (
              <div key={idx} className="group p-10 md:p-12 transition-all duration-500 hover:bg-white/5 hover:!opacity-100 group-hover/grid:opacity-40 border-b border-white/10 md:border-b-0 md:border-r last:border-r-0">
                <div className="mb-8 text-[#C5A059] transition-transform duration-500 group-hover:rotate-6 origin-bottom-left"><item.icon className="w-8 h-8" /></div>
                <h3 className="font-serif text-3xl mb-3 text-white group-hover:translate-x-1 transition-transform">{item.title}</h3>
                <p className="font-mono text-[10px] text-white/50 mb-6 uppercase tracking-widest group-hover:text-[#C5A059] transition-colors">{item.label}</p>
                <p className="font-sans text-white/70 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Protocol Section */}
      <section id="protocol" className="w-full border-t border-black/10 relative z-30 bg-[#FFF2EC] content-layer py-32 px-6 md:px-12 lg:px-20">
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-black/10 pb-8">
            <div className="max-w-2xl">
              <span className="font-mono text-xs uppercase tracking-widest text-[#E21E3F] mb-4 block">/ Execution Velocity</span>
              <h2 className="font-serif text-5xl md:text-6xl text-[#1a1a1a] leading-[0.9] tracking-tight">
                I don't do "6-Month Strategies."<br />
                I work in <span className="italic text-[#1a1a1a]/40">Sprints.</span>
              </h2>
            </div>
            <div className="hidden md:block pb-2 text-right">
              <p className="font-mono text-[10px] text-[#1a1a1a]/40 tracking-widest mb-1">AVG_DEPLOYMENT_TIME</p>
              <p className="font-sans text-4xl font-light text-[#1a1a1a]">
                <span className="tabular-nums transition-colors duration-300">{deploymentCounter.toFixed(2)}</span> DAYS
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 relative">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-black/10 hidden md:block"></div>
            {[
              { phase: "01 // Diagnostic", title: "The Audit", text: "I deploy the \"Control Tower\" to map your data reality. I identify exactly where revenue is leaking before I build.", est: "3 Days" },
              { phase: "02 // Build", title: "The Engine", text: "\"Wireframe First.\" I configure the CRM, code the automations, and build the \"Digital Employees\" (AI Agents).", est: "14 Days" },
              { phase: "03 // Adoption", title: "The Training", text: "I use \"Behavioral Engineering\" to train your staff so the new system actually sticks.", est: "5 Days" },
              { phase: "04 // Scale", title: "The Watchtower", text: "I transition to active monitoring. Monthly optimization and feature updates to keep the revenue engine running.", est: "Ongoing" }
            ].map((step, idx) => (
              <div key={idx} className="group relative p-8 md:pt-12 md:pr-8 border-l-2 border-dashed border-black/20 md:border-l-0 transition-all duration-500 hover:bg-white hover:shadow-2xl z-10">
                <div className="hidden md:block absolute top-0 left-0 w-full h-[2px] bg-[#C5A059] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <div className="absolute top-[-5px] left-[-5px] md:left-0 w-2.5 h-2.5 bg-[#1a1a1a] rounded-full group-hover:bg-[#C5A059] transition-colors duration-300 z-20"></div>
                <div className="flex flex-col h-full justify-between gap-6">
                  <div>
                    {/* UPDATED: Phase label changed to Gold for architectural prominence */}
                    <span className="font-mono text-xs text-[#C5A059]/80 mb-3 block group-hover:text-[#C5A059] transition-colors tracking-widest uppercase">{step.phase}</span>
                    <h3 className="font-serif text-3xl mb-4 text-[#1a1a1a] group-hover:translate-x-1 transition-transform duration-300">{step.title}</h3>
                    <p className="font-sans text-sm text-[#1a1a1a]/70 leading-relaxed">{step.text}</p>
                  </div>
                  <div className="pt-4 border-t border-black/5 opacity-50 group-hover:opacity-100 transition-opacity">
                    <span className="text-[10px] font-mono uppercase text-[#1a1a1a]/60">Est. Duration: {step.est}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <a href="https://meetings-ap1.hubspot.com/felipe" target="_blank" className="block mt-32 w-full bg-[#1a1a1a] text-[#FFF2EC] p-12 md:p-20 relative overflow-hidden group transition-transform hover:-translate-y-1 duration-500">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="text-center md:text-left">
                <h3 className="font-serif text-4xl md:text-5xl mb-3">Ready to remove yourself from the machine?</h3>
                <p className="font-sans text-white/60 text-lg">Current Capacity: 1 Slot Remaining for Q1.</p>
              </div>
              <div className="relative group/btn px-10 py-5 border border-[#FFF2EC] overflow-hidden transition-all duration-300">
                <div className="absolute inset-0 bg-[#FFF2EC] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-out"></div>
                <span className="relative z-10 font-mono text-sm uppercase tracking-[0.2em] group-hover/btn:text-[#1a1a1a] transition-colors duration-300 flex items-center gap-3">
                  Apply For Access <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#1a1a1a] text-[#FFF2EC] border-t border-white/10 relative z-30 content-layer pt-32 pb-12 px-6 md:px-12 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-[1600px] mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-20 mb-20">
            <div className="max-w-2xl">
              <span className="font-mono text-xs text-[#E21E3F] tracking-widest mb-6 block">/ TRANSMISSION_END</span>
              <h2 className="font-serif text-5xl md:text-8xl leading-[0.85] mb-8">Are we a<br /><span className="italic text-white/40">match?</span></h2>
              <div className="flex items-center gap-4 mt-8">
                <div className="relative w-2 h-2">
                  <div className="absolute inset-0 bg-[#E21E3F] rounded-full animate-ping opacity-75"></div>
                  <div className="relative w-2 h-2 bg-[#E21E3F] rounded-full"></div>
                </div>
                <span className="font-mono text-[10px] text-[#E21E3F] tracking-[0.2em] uppercase">STATUS: 1 SLOT AVAILABLE</span>
              </div>
            </div>
            <div className="mt-16 md:mt-0">
              <a href="https://meetings-ap1.hubspot.com/felipe" target="_blank" className="group flex flex-col items-start gap-1">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-xs text-white/40 group-hover:text-[#C5A059] transition-colors duration-300">01</span>
                  <span className="text-2xl md:text-3xl font-sans font-light border-b border-white/20 pb-1 group-hover:border-[#C5A059] group-hover:text-white transition-all duration-300">Initiate Growth Protocol</span>
                  <ArrowRight className="w-6 h-6 text-white/40 group-hover:text-[#C5A059] group-hover:translate-x-2 transition-all duration-300" />
                </div>
                <span className="text-[10px] font-mono text-white/30 tracking-widest pl-8 group-hover:text-white/60 transition-colors">[ Direct Strategy Call with Felipe ]</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-24">
            <div>
              <span className="font-mono text-[10px] text-white/30 mb-8 block tracking-widest">/ INDEX</span>
              <ul className="space-y-4">
                <li><a href="#hero" className="group flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"><span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#C5A059]">&gt;</span> Origins</a></li>
                <li><a href="#services" className="group flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"><span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#C5A059]">&gt;</span> Architecture</a></li>
                <li><a href="#protocol" className="group flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"><span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#C5A059]">&gt;</span> Protocol</a></li>
              </ul>
            </div>
            <div>
              <span className="font-mono text-[10px] text-white/30 mb-8 block tracking-widest">/ LEGAL</span>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-sm text-white/60 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div className="md:col-span-1 flex flex-col justify-between h-full">
              <div className="mb-6">
                <span className="font-mono text-[10px] text-white/30 mb-2 block tracking-widest">/ SERVER_LOCATION</span>
                <p className="text-sm text-white/80">Sydney, Australia</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end pt-10 border-t border-white/10 text-[10px] font-mono text-white/30 uppercase tracking-widest">
            <span>© 2025 Felipe Chaparro. All Systems Nominal.</span>
            <div className="flex gap-6 mt-4 md:mt-0">
              <span>LATENCY: 8ms</span>
              <span>BUILD: v2.8.2</span>
            </div>
          </div>
        </div>
      </footer>

      <Modal 
        service={selectedService} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default App;
