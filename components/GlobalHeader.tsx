import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Target, Zap, BarChart3, ArrowRight } from 'lucide-react';

interface GlobalHeaderProps {
  currentView: string;
  onNavigate: (view: string, sectionId?: string) => void;
  scrolled: boolean;
}

const GlobalHeader: React.FC<GlobalHeaderProps> = ({ currentView, onNavigate, scrolled }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isArchHovered, setIsArchHovered] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const isContact = currentView === 'contact';

  // --- DATA ---
  const archPillars = [
    { 
      system: 'ACQUISITION', 
      icon: Target, 
      color: 'text-[#E21E3F]', 
      items: [
        { id: 'pillar1', name: '01 // Digital Revenue' },
        { id: 'pillar2', name: '02 // Capture Core' },
        { id: 'pillar3', name: '03 // Auto-Fulfillment' }
      ]
    },
    { 
      system: 'VELOCITY', 
      icon: Zap, 
      color: 'text-[#C5A059]', 
      items: [
        { id: 'pillar4', name: '04 // AI Agents' },
        { id: 'pillar5', name: '05 // Media Logistics' },
        { id: 'pillar6', name: '06 // Internal Adoption' }
      ]
    },
    { 
      system: 'INTELLIGENCE', 
      icon: BarChart3, 
      color: 'text-[#1a1a1a]', 
      items: [
        { id: 'pillar7', name: '07 // Control Tower' }
      ]
    }
  ];

  // Dynamic Nav Class: Split Colors for Contact Page
  const navClass = (view: string) => `
    relative text-[10px] uppercase tracking-[0.25em] font-bold transition-colors duration-300
    ${currentView === view 
       ? 'text-[#C5A059]' // Active State (Gold)
       : isContact 
         ? 'text-white/60 hover:text-white' // Contact Page: White Text (on Black BG)
         : 'text-[#1a1a1a]/60 hover:text-[#1a1a1a]' // Normal Pages: Black Text (on Cream BG)
     }
  `;

  // --- RENDER ---
  return (
    <>
      {/* =======================
          1. TOP NAVIGATION (Visible when NOT scrolled)
      ======================== */}
      <AnimatePresence>
        {!scrolled && (
          <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            // Transparent Background to show the split layout underneath
            className="fixed top-0 w-full z-[300] px-6 md:px-12 h-24 flex justify-between items-center bg-transparent border-b border-transparent"
            onMouseLeave={() => setIsArchHovered(false)}
          >
            {/* LOGO - ALWAYS BLACK (Sits on Cream Left Side) */}
            <button 
              onClick={() => onNavigate('landing')} 
              className="flex items-center gap-3 group z-[310]"
              onMouseEnter={() => setIsLogoHovered(true)} 
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <div className="font-mono text-[10px] font-bold border border-[#1a1a1a] px-2 py-0.5 bg-[#1a1a1a] text-[#FFF2EC] group-hover:bg-[#E21E3F] group-hover:border-[#E21E3F] transition-colors">
                [FC)
              </div>
              <div className="flex flex-col h-4 overflow-hidden text-[#1a1a1a]">
                 <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-transform duration-300 ${isLogoHovered ? '-translate-y-full' : 'translate-y-0'}`}>
                   Felipe Chaparro
                 </span>
                 <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#C5A059] transition-transform duration-300 ${isLogoHovered ? '-translate-y-full' : 'translate-y-0'}`}>
                   System_Home
                 </span>
              </div>
            </button>

            {/* DESKTOP MENU - ADAPTS TO WHITE ON CONTACT PAGE */}
            <div className="hidden md:flex items-center gap-12 font-mono">
              <button onClick={() => onNavigate('about')} className={navClass('about')}>ORIGINS</button>

              {/* ARCHITECTURE MEGA MENU */}
              <div className="relative h-full flex items-center" onMouseEnter={() => setIsArchHovered(true)}>
                <button onClick={() => onNavigate('architecture')} className={`${navClass('architecture')} flex items-center gap-2`}>
                  ARCHITECTURE <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isArchHovered ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isArchHovered && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, clipPath: 'inset(0% 0% 100% 0%)' }}
                      animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
                      exit={{ opacity: 0, y: 10, clipPath: 'inset(0% 0% 100% 0%)' }}
                      transition={{ duration: 0.3, ease: 'circOut' }}
                      className="absolute top-full -left-20 mt-6 w-[700px] bg-white border border-[#1a1a1a]/10 shadow-2xl p-8 grid grid-cols-3 gap-8 cursor-default"
                    >
                      {archPillars.map((group) => (
                        <div key={group.system} className="space-y-4">
                          <div className={`flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] ${group.color} border-b border-black/5 pb-2`}>
                             <group.icon className="w-3 h-3" /> {group.system}
                          </div>
                          <div className="flex flex-col gap-2">
                            {group.items.map((item) => (
                              <button 
                                key={item.id} 
                                onClick={(e) => { e.stopPropagation(); onNavigate(item.id); setIsArchHovered(false); }}
                                className="text-left font-serif text-lg text-[#1a1a1a]/80 hover:text-[#C5A059] hover:pl-2 transition-all duration-200"
                              >
                                {item.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button onClick={() => onNavigate('protocol')} className={navClass('protocol')}>PROTOCOL</button>
              <button onClick={() => onNavigate('evidence')} className={navClass('evidence')}>EVIDENCE</button>
            </div>

            {/* TOP CTA - ADAPTS TO WHITE ON CONTACT PAGE */}
            <div className="hidden md:flex items-center">
               <button 
                 onClick={() => onNavigate('contact')} 
                 className={`group flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] border-b border-transparent pb-0.5 transition-colors ${
                   isContact 
                    ? 'text-white hover:text-[#C5A059] hover:border-[#C5A059]' 
                    : 'text-[#1a1a1a] hover:text-[#E21E3F] hover:border-[#E21E3F]'
                 }`}
               >
                 <span>[ INITIATE_AUDIT ]</span>
                 <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>


      {/* =======================
          2. SIDE DOCK (Visible when SCROLLED)
      ======================== */}
      <AnimatePresence>
        {scrolled && (
          <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-[300] hidden md:flex flex-col bg-white/90 backdrop-blur-md border-l border-y border-[#1a1a1a]/10 rounded-l-lg shadow-xl overflow-hidden"
          >
             {/* COMPACT LOGO */}
             <button 
               onClick={() => onNavigate('landing')} 
               className={`p-4 transition-all duration-300 border-b border-black/5 ${
                 currentView === 'landing' 
                   ? 'bg-[#1a1a1a] text-[#FFF2EC]' 
                   : 'hover:bg-black/5 text-[#1a1a1a]'
               }`}
             >
                <span className="font-mono text-[10px] font-bold">[FC)</span>
             </button>

             {/* VERTICAL MENU */}
             <div className="flex flex-col">
                {['Origins:about', 'Arch:architecture', 'Proto:protocol', 'Evid:evidence'].map((item) => {
                  const [label, view] = item.split(':');
                  const isActive = currentView === view;
                  return (
                    <button 
                      key={view}
                      onClick={() => onNavigate(view)}
                      className={`group relative h-24 w-12 flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? 'bg-[#1a1a1a] text-[#FFF2EC]' 
                          : 'text-[#1a1a1a]/40 hover:text-[#1a1a1a] hover:bg-black/5'
                      }`}
                    >
                       <span className="block -rotate-90 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.2em] font-bold">
                         {label}
                       </span>
                    </button>
                  );
                })}
             </div>

             {/* BOTTOM CTA */}
             <button 
               onClick={() => onNavigate('contact')}
               className="p-4 border-t border-black/5 hover:bg-[#E21E3F] hover:text-white transition-colors group"
             >
                <Target className="w-4 h-4" />
             </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE TOGGLE (ALWAYS BLACK) */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)} 
        className={`md:hidden fixed top-6 right-6 p-2 z-[310] transition-colors ${scrolled ? 'bg-white shadow-lg rounded-full text-black' : 'text-black'}`}
      >
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#FFF2EC] z-[300] flex flex-col pt-32 px-6"
          >
             <button onClick={() => { onNavigate('about'); setIsMenuOpen(false); }} className="text-3xl font-serif mb-6 text-left hover:text-[#C5A059]">Origins</button>
             <button onClick={() => { onNavigate('architecture'); setIsMenuOpen(false); }} className="text-3xl font-serif mb-6 text-left hover:text-[#C5A059]">Architecture</button>
             <button onClick={() => { onNavigate('protocol'); setIsMenuOpen(false); }} className="text-3xl font-serif mb-6 text-left hover:text-[#C5A059]">Protocol</button>
             <button onClick={() => { onNavigate('evidence'); setIsMenuOpen(false); }} className="text-3xl font-serif mb-6 text-left hover:text-[#C5A059]">Evidence</button>
             <button onClick={() => { onNavigate('contact'); setIsMenuOpen(false); }} className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-[#E21E3F] border-b border-[#E21E3F] pb-2 w-fit text-left">Initiate Audit</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalHeader;