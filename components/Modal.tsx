import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';
import { ServiceDetail } from '../types';
import { COLORS } from '../constants';
import ViewportViz from './ViewportViz';

interface ModalProps {
  service: ServiceDetail | null;
  isOpen: boolean;
  onClose: () => void;
  onViewPillar: (pillarId: string) => void;
}

const Modal: React.FC<ModalProps> = ({ service, isOpen, onClose, onViewPillar }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!service) return null;

  const handlePillarNavigation = () => {
    const mapping: Record<string, string> = {
      'capture-core': 'pillar1',
      'nervous-system': 'pillar2',
      'media-logistics': 'pillar3',
      'digital-labor': 'pillar4',
      'augmented-workforce': 'pillar5',
      'team-protocols': 'pillar6',
      'control-tower': 'pillar7'
    };

    const pillarId = mapping[service.id];
    if (pillarId) {
      onViewPillar(pillarId);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl"
          />
          
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="relative w-full max-w-5xl bg-[#FFF2EC] text-[#1a1a1a] shadow-2xl rounded-sm overflow-hidden z-[101]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col">
              {/* Header Visual */}
              <div className="h-48 bg-[#1a1a1a] relative border-b border-black/10 overflow-hidden">
                 <ViewportViz type={service.visualPrompt} />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent opacity-60" />
                 <button 
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 transition-colors rounded-full text-white z-50"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 lg:p-16">
                <div className="mb-12">
                  <span className="text-[#E21E3F] text-[10px] font-mono tracking-[0.4em] font-bold mb-4 block uppercase">System_Blueprint_2025</span>
                  <h2 className="text-5xl lg:text-7xl font-serif font-light leading-none mb-4">
                    {service.title}
                  </h2>
                  <p className="text-sm font-mono tracking-widest text-[#1a1a1a]/40 uppercase">{service.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                  <div className="lg:col-span-7">
                    <p className="text-xl lg:text-2xl text-[#1a1a1a] leading-relaxed mb-8 font-light italic">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs font-mono opacity-50">
                      <span className="px-2 py-1 border border-black/10">STABILITY: 99.9%</span>
                      <span className="px-2 py-1 border border-black/10">SCALABILITY: 100X</span>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-8 border-b border-black/10 pb-2">Technical Features</h3>
                    <ul className="space-y-4">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <ChevronRight className="w-4 h-4 text-[#E21E3F]" />
                          <span className="text-sm font-semibold tracking-widest uppercase">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-16 pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="text-[10px] font-mono opacity-30 tracking-tighter">
                    UID: {service.id.toUpperCase()}_REV_ENG_v5.0.0
                  </div>
                  <button 
                    onClick={handlePillarNavigation}
                    className="group flex items-center gap-4 px-10 py-5 bg-[#1a1a1a] text-white hover:bg-[#E21E3F] transition-all duration-500 text-xs font-bold tracking-widest uppercase"
                  >
                    Explore System Architecture <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;