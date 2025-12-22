import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BarChart3 } from 'lucide-react';

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

const RevenueAudit: React.FC = () => {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
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

  const progress = isFinished ? 100 : ((step) / QUESTIONS.length) * 100;

  // Diagnostic Machine Slide Variants
  const slideVariants = {
    initial: { x: 100, opacity: 0, filter: 'blur(20px)' },
    animate: { x: 0, opacity: 1, filter: 'blur(0px)' },
    exit: { x: -100, opacity: 0, filter: 'blur(20px)' }
  };

  return (
    <section 
      ref={sectionRef} 
      id="audit-quiz" 
      className="w-full bg-[#FFF2EC] py-32 px-6 md:px-12 lg:px-20 relative z-30 overflow-hidden border-t border-black/10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#C5A05908,_transparent)] pointer-events-none"></div>
      
      <motion.div 
        style={{ y: yMovement, opacity: boxOpacity }}
        className="max-w-[1000px] mx-auto bg-[#1a1a1a] p-8 md:p-16 border border-white/5 relative overflow-hidden group/audit rounded-sm shadow-2xl"
      >
        {/* Machine Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5 overflow-hidden">
          <motion.div 
            className="h-full bg-[#C5A059] relative shadow-[0_0_15px_rgba(197,160,89,0.5)]"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 45, damping: 15 }}
          />
        </div>

        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div 
              key={step} 
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="relative z-10"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E21E3F] animate-pulse shadow-[0_0_8px_#E21E3F]"></span>
                  <span className="font-mono text-[10px] text-[#C5A059] tracking-[0.3em] uppercase font-bold">Diagnostic_Active</span>
                </div>
                <span className="font-mono text-[10px] text-white/20 tracking-[0.2em]">NODE_0{step + 1} // 03</span>
              </div>
              
              <h3 className="font-serif text-3xl md:text-5xl text-[#FFF2EC] mb-16 leading-[1.1] tracking-tight">
                {QUESTIONS[step].text}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {QUESTIONS[step].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(QUESTIONS[step].weights[idx])}
                    className="relative group/opt p-6 border border-white/10 text-left overflow-hidden transition-all duration-500 bg-transparent hover:border-[#C5A059]/40"
                  >
                    <div className="absolute inset-0 bg-[#C5A059] translate-y-full group-hover/opt:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)"></div>
                    <div className="relative z-10 flex justify-between items-center w-full font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 group-hover/opt:text-[#1a1a1a] transition-colors duration-300">
                      <span>{option}</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="result" 
              initial={{ opacity: 0, filter: 'blur(20px)' }} 
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              className="text-center py-8"
            >
              <BarChart3 className="w-16 h-16 text-[#C5A059] mx-auto mb-10" />
              <h3 className="font-serif text-5xl md:text-7xl mb-6 text-[#FFF2EC]">Leakage: <span className="text-[#C5A059]">{score}%</span></h3>
              <p className="font-sans text-lg text-white/40 mb-16 max-w-2xl mx-auto leading-relaxed">
                Critical system failure detected. Your architecture is hemorrhaging revenue through manual processing friction. Immediate intervention recommended.
              </p>
              
              <div className="flex flex-col items-center gap-8">
                <a 
                  href="https://meetings-ap1.hubspot.com/felipe" 
                  target="_blank"
                  className="group relative px-12 py-5 bg-[#C5A059] text-[#1a1a1a] font-mono text-xs uppercase tracking-[0.3em] overflow-hidden"
                >
                  <div className="absolute inset-0 bg-[#FFF2EC] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <span className="relative z-10 flex items-center gap-3">Apply Repair Protocol <ArrowRight className="w-4 h-4" /></span>
                </a>
                <button 
                  onClick={() => {setStep(0); setScore(0); setIsFinished(false);}}
                  className="font-mono text-[9px] text-white/20 hover:text-[#C5A059] uppercase tracking-[0.4em] transition-colors"
                >
                  [ Re-initiate_Diagnostic ]
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div className="max-w-[1600px] mx-auto mt-32 border-b border-black/10"></div>
    </section>
  );
};

export default RevenueAudit;