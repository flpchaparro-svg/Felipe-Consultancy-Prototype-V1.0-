
import React, { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import BentoGrid from './components/BentoGrid';
import Modal from './components/Modal';
import { ServiceDetail } from './types';
import { Menu, Search, ArrowRight } from 'lucide-react';

const App: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleServiceClick = (service: ServiceDetail) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen selection:bg-[#E21E3F] selection:text-white">
      <CustomCursor />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[80] p-6 lg:p-10 flex justify-between items-center mix-blend-difference">
        <div className="text-white text-xl font-serif tracking-tighter">
          REVENUE_ENGINE_
        </div>
        <div className="flex items-center gap-8">
          <button className="hidden lg:block text-white text-xs font-semibold tracking-widest uppercase">Architecture</button>
          <button className="hidden lg:block text-white text-xs font-semibold tracking-widest uppercase">Systems</button>
          <button className="hidden lg:block text-white text-xs font-semibold tracking-widest uppercase">Intel</button>
          <button className="text-white p-2">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden bg-[#1a1a1a]">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="w-full h-full border-[1px] border-white/5 grid grid-cols-12 grid-rows-12" />
        </div>
        
        <div className="relative z-10 text-center">
          <span className="text-[#E21E3F] text-sm tracking-[0.5em] font-medium mb-6 block uppercase animate-pulse">
            High-Performance Growth Strategy
          </span>
          <h1 className="text-7xl lg:text-[12rem] font-serif leading-[0.85] text-white tracking-tighter mb-12">
            Architecting <br /> <span className="italic">Revenue.</span>
          </h1>
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-center">
            <button className="px-10 py-5 bg-[#E21E3F] text-white text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-[#1a1a1a] transition-all duration-500">
              Initial Assessment
            </button>
            <button className="px-10 py-5 border border-white/20 text-white text-sm font-bold tracking-widest uppercase hover:bg-white/10 transition-all duration-500">
              View Methodology
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
          <div className="text-white/40 text-[10px] font-mono max-w-[200px]">
            EST. 2024 // MELBOURNE_HQ <br />
            PROTOCOL_V3.1.2_BETA
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="w-px h-16 bg-white/20" />
            <span className="text-white/20 text-[10px] font-mono rotate-90 origin-bottom-right mb-2">SCROLL_SYSTEM</span>
          </div>
        </div>
      </header>

      {/* Main Services Section */}
      <BentoGrid onServiceClick={handleServiceClick} />

      {/* Philosophy Section */}
      <section className="py-32 px-6 lg:px-12 bg-[#1a1a1a] text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl lg:text-7xl font-serif leading-tight mb-16">
            We operate at the intersection of <span className="text-[#E21E3F]">code</span>, <span className="italic">design</span>, and <span className="text-[#E21E3F]">behavioral psychology.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-12 border-t border-white/10 pt-16">
            <div>
              <span className="text-[#E21E3F] font-mono text-xs mb-4 block">01 // PRECISION</span>
              <p className="text-white/60 text-sm leading-relaxed">Everything is measured. If it doesn't move the needle, it doesn't belong in the engine.</p>
            </div>
            <div>
              <span className="text-[#E21E3F] font-mono text-xs mb-4 block">02 // SCALE</span>
              <p className="text-white/60 text-sm leading-relaxed">Systems are built to break at 10x current volume. We build for the 100x horizon.</p>
            </div>
            <div>
              <span className="text-[#E21E3F] font-mono text-xs mb-4 block">03 // AUTONOMY</span>
              <p className="text-white/60 text-sm leading-relaxed">The goal is a self-healing revenue environment that reduces cognitive overhead.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 lg:px-12 bg-[#FFF2EC] border-t border-black/5 text-[#1a1a1a]">
        <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-12">
          <div className="max-w-md">
            <h3 className="text-4xl font-serif mb-6 leading-none">Ready to engineer your growth?</h3>
            <p className="text-[#1a1a1a]/60 mb-8 font-light italic">Currently accepting 2 new high-volume enterprise clients for Q4.</p>
            <button className="flex items-center gap-4 group text-sm font-bold tracking-[0.2em] uppercase">
              Start Project Inquiry <div className="w-12 h-12 bg-[#1a1a1a] text-white rounded-full flex items-center justify-center group-hover:bg-[#E21E3F] transition-all"><ArrowRight className="w-5 h-5" /></div>
            </button>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-16">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest mb-6 block">Navigation</span>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" className="hover:text-[#E21E3F] transition-colors">Architecture</a></li>
                <li><a href="#" className="hover:text-[#E21E3F] transition-colors">Methodology</a></li>
                <li><a href="#" className="hover:text-[#E21E3F] transition-colors">Protocols</a></li>
                <li><a href="#" className="hover:text-[#E21E3F] transition-colors">Intel</a></li>
              </ul>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-widest mb-6 block">Legal</span>
              <ul className="space-y-4 text-sm font-medium">
                <li><a href="#" className="hover:text-[#E21E3F] transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-[#E21E3F] transition-colors">Terms</a></li>
              </ul>
            </div>
            <div className="col-span-2 lg:col-span-1">
              <span className="text-xs font-bold uppercase tracking-widest mb-6 block">Contact</span>
              <p className="text-sm font-medium mb-2">hq@revenuearchitect.com.au</p>
              <p className="text-sm font-medium text-[#1a1a1a]/40">+61 (0)3 9000 0000</p>
            </div>
          </div>
        </div>
        <div className="mt-24 pt-8 border-t border-black/5 flex justify-between items-center text-[10px] font-mono opacity-40">
          <div>© 2024 REVENUE ENGINE ARCHITECT. ALL RIGHTS RESERVED.</div>
          <div>DEVELOPED BY _ARCHITECT_01</div>
        </div>
      </footer>

      {/* Modal Integration */}
      <Modal 
        service={selectedService} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </div>
  );
};

export default App;
