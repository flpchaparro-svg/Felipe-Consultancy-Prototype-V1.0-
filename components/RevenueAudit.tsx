import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const handleAnswer = (weight: number) => {
    setScore(prev => prev + weight);
    if (step < QUESTIONS.length - 1) {
      setStep(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <section id="audit-quiz" className="w-full bg-white py-24 px-6 md:px-12 lg:px-20 relative z-30 overflow-hidden border-t border-black/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#E21E3F05,_transparent)] pointer-events-none"></div>
      <div className="max-w-[1000px] mx-auto bg-white p-8 md:p-16 border border-black/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#C5A059]"></div>
        
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div 
              key="quiz" 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="relative z-10"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#E21E3F] animate-pulse"></span>
                  <span className="font-mono text-[10px] text-[#E21E3F] tracking-widest uppercase">/ Diagnostic_In_Progress</span>
                </div>
                <span className="font-mono text-[10px] text-black/40 tracking-[0.2em]">STEP 0{step + 1} // 03</span>
              </div>
              
              <h3 className="font-serif text-3xl md:text-5xl text-[#1a1a1a] mb-12 leading-tight">
                {QUESTIONS[step].text}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {QUESTIONS[step].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(QUESTIONS[step].weights[idx])}
                    className="relative group p-6 border border-black/10 text-left overflow-hidden transition-all duration-300 bg-white"
                  >
                    {/* Mechanical Fill: White to Black */}
                    <div className="absolute inset-0 bg-[#1a1a1a] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)"></div>
                    
                    <div className="relative z-10 flex justify-between items-center w-full font-mono text-[11px] uppercase tracking-widest text-[#1a1a1a] group-hover:text-white transition-colors duration-300">
                      <span>{option}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="result" 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "circOut" }}
              className="text-center py-8"
            >
              <div className="relative inline-block mb-8">
                <BarChart3 className="w-20 h-20 text-[#C5A059] mx-auto" />
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute -bottom-2 left-0 h-0.5 bg-[#C5A059]"
                />
              </div>
              
              <h3 className="font-serif text-5xl md:text-6xl mb-6">Leakage Score: <span className={score > 50 ? 'text-[#E21E3F]' : 'text-[#C5A059]'}>{score}%</span></h3>
              
              <p className="font-sans text-lg md:text-xl text-black/60 mb-12 max-w-2xl mx-auto leading-relaxed italic">
                {score > 50 
                  ? "Critical operational drag detected. Your current system is hemorrhaging revenue through manual friction and protocol failure. Immediate intervention required."
                  : "Moderate leakage detected. Your engine is functional but lacks professional-grade scale logic. You are likely capped by human bandwidth rather than market demand."}
              </p>
              
              <div className="flex flex-col items-center gap-6">
                <a 
                  href="https://meetings-ap1.hubspot.com/felipe" 
                  target="_blank"
                  className="group relative inline-flex items-center gap-3 px-12 py-6 bg-white text-[#1a1a1a] font-mono text-xs uppercase tracking-[0.2em] overflow-hidden transition-all duration-500 shadow-xl border border-black/10 hover:text-white"
                >
                  <div className="absolute inset-0 bg-[#1a1a1a] translate-y-full group-hover:translate-y-0 transition-transform duration-500 cubic-bezier(0.23, 1, 0.32, 1)"></div>
                  <span className="relative z-10 flex items-center gap-3">
                    Initiate Repair Protocol <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
                <button 
                  onClick={() => {setStep(0); setScore(0); setIsFinished(false);}}
                  className="font-mono text-[9px] text-black/30 hover:text-black/60 uppercase tracking-[0.3em] transition-colors"
                >
                  [ RE-RUN_DIAGNOSTIC ]
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default RevenueAudit;