
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Activity } from 'lucide-react';

const QUESTIONS = [
  { 
    id: 1, 
    text: "How much of your week is spent on manual data entry or admin?", 
    options: ["< 5 hours", "5-15 hours", "15-30 hours", "30+ hours"], 
    weights: [0, 10, 20, 30] 
  },
  { 
    id: 2, 
    text: "How long does it take to get a lead from 'Captured' to 'Contacted'?", 
    options: ["< 5 mins", "1-4 hours", "Same day", "Next day+"], 
    weights: [0, 10, 20, 30] 
  },
  { 
    id: 3, 
    text: "Do your Sales, Ops, and Finance tools talk to each other automatically?", 
    options: ["Fully Sync'd", "Partially", "Manual Export", "None"], 
    weights: [0, 10, 20, 30] 
  }
];

const DiagnosticButton: React.FC<{ 
  text: string, 
  onClick: () => void 
}> = ({ text, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group/opt p-6 border border-white/10 text-left overflow-hidden transition-all duration-500 bg-transparent rounded-none"
    >
      {/* 1px Gold Perimeter Drawing Effect - Accelerated to 200ms */}
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-0 w-full h-[1px] bg-[#C5A059] origin-left z-20"
            />
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              exit={{ opacity: 0 }}
              className="absolute top-0 right-0 w-[1px] h-full bg-[#C5A059] origin-top z-20"
            />
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              exit={{ opacity: 0 }}
              className="absolute bottom-0 right-0 w-full h-[1px] bg-[#C5A059] origin-right z-20"
            />
            <motion.div 
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              exit={{ opacity: 0 }}
              className="absolute bottom-0 left-0 w-[1px] h-full bg-[#C5A059] origin-bottom z-20"
            />
          </>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex justify-between items-center w-full">
        <span className={`font-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-300 relative ${isHovered ? 'text-[#C5A059]' : 'text-white/40'}`}>
          {/* Subtle Glow Behind Text */}
          {isHovered && (
            <motion.span 
              layoutId="text-glow"
              className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#C5A059]/30 blur-sm -z-10"
            />
          )}
          {text}
        </span>
        <motion.div
          animate={isHovered ? { x: [0, 3, 0] } : {}}
          transition={{ duration: 0.15, repeat: isHovered ? Infinity : 0, repeatDelay: 1 }}
        >
          <ArrowRight className={`w-4 h-4 transition-colors duration-300 ${isHovered ? 'text-[#C5A059]' : 'text-white/10'}`} />
        </motion.div>
      </div>
    </button>
  );
};

const RevenueAudit: React.FC = () => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isSectionHovered, setIsSectionHovered] = useState(false);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"]
  });

  const yMovement = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const boxOpacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  const handleAnswer = (weight: number) => {
    setScore(prev => prev + weight);
    if (step < QUESTIONS.length - 1) {
      setStep(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const progress = isFinished ? 100 : Math.max(2, (step / QUESTIONS.length) * 100);

  return (
    <section 
      ref={sectionRef} 
      id="audit-quiz" 
      onMouseEnter={() => setIsSectionHovered(true)}
      onMouseLeave={() => setIsSectionHovered(false)}
      className="w-full bg-[#FFF2EC] py-32 px-6 md:px-12 lg:px-20 relative z-30 overflow-hidden border-t border-black/10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#C5A05908,_transparent)] pointer-events-none"></div>
      
      <motion.div 
        style={{ y: yMovement, opacity: boxOpacity }}
        className="max-w-[1000px] mx-auto bg-[#1a1a1a]/95 backdrop-blur-sm p-8 md:p-16 border border-white/10 relative overflow-hidden group/audit rounded-none shadow-2xl"
      >
        {/* Architectural Red Corner Brackets */}
        <div className="absolute inset-0 pointer-events-none p-4">
          {[
            "top-0 left-0 border-t border-l",
            "top-0 right-0 border-t border-r",
            "bottom-0 left-0 border-b border-l",
            "bottom-0 right-0 border-b border-r"
          ].map((pos, i) => (
            <motion.div 
              key={i}
              className={`absolute w-4 h-4 border-[#E21E3F] ${pos}`}
              animate={{ opacity: isSectionHovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />
          ))}
        </div>

        {/* Machine Progress Bar - Signal Red during diagnosis, Gold on completion */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5 overflow-hidden">
          <motion.div 
            className={`h-full relative shadow-[0_0_15px_rgba(197,160,89,0.3)] ${isFinished ? 'bg-[#C5A059]' : 'bg-[#E21E3F]'}`}
            initial={{ width: "2%" }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 45, damping: 15 }}
          />
        </div>

        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div 
              key={step} 
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="relative z-10"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E21E3F] animate-pulse shadow-[0_0_8px_#E21E3F]"></span>
                  <span className="font-mono text-[10px] text-[#E21E3F] tracking-[0.3em] uppercase font-bold">Diagnostic_Active</span>
                </div>
                <span className="font-mono text-[10px] text-white tracking-[0.3em] uppercase">NODE_0{step + 1} // 0{QUESTIONS.length}</span>
              </div>
              
              <h3 className="font-serif text-3xl md:text-5xl text-[#FFF2EC] mb-16 leading-tight tracking-[-0.03em]">
                {QUESTIONS[step].text}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {QUESTIONS[step].options.map((option, idx) => (
                  <DiagnosticButton 
                    key={idx} 
                    text={option} 
                    onClick={() => handleAnswer(QUESTIONS[step].weights[idx])} 
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative z-10 text-center py-10"
            >
              <div className="flex justify-center mb-10">
                 <div className="w-20 h-20 rounded-full border border-[#E21E3F]/20 flex items-center justify-center relative">
                    <motion.div 
                      className="absolute inset-0 rounded-full border border-[#E21E3F]"
                      animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <Activity className="w-8 h-8 text-[#E21E3F]" />
                 </div>
              </div>

              <span className="font-mono text-[10px] text-[#E21E3F] tracking-[0.5em] uppercase font-bold mb-6 block">Diagnostic_Complete // Results_Calculated</span>
              
              <h3 className="font-serif text-4xl md:text-6xl text-[#FFF2EC] mb-6 leading-tight tracking-[-0.03em]">
                Revenue Leakage <br />
                <span className="italic">Analysis:</span>
              </h3>

              <div className="text-8xl md:text-[10rem] font-sans font-extralight text-[#E21E3F] mb-10 tabular-nums tracking-tighter">
                {Math.round((score / 90) * 100)}%
              </div>

              <p className="font-sans text-white/50 max-w-xl mx-auto mb-16 leading-relaxed text-lg">
                Your current infrastructure is failing to capture high-intent demand. This leakage represents a terminal drag on your acquisition velocity. 
              </p>

              <div className="flex justify-center">
                <a 
                  href="https://meetings-ap1.hubspot.com/felipe"
                  target="_blank"
                  className="group relative inline-flex items-center gap-6 px-12 py-6 border border-[#C5A059] bg-transparent text-[#C5A059] overflow-hidden transition-all duration-500 rounded-none"
                >
                  <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <span className="relative z-10 font-mono text-xs uppercase tracking-[0.4em] font-bold transition-colors duration-500 group-hover:text-black">Apply Repair Protocol</span>
                  <ArrowRight className="relative z-10 w-4 h-4 transition-colors duration-500 group-hover:text-black group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default RevenueAudit;
