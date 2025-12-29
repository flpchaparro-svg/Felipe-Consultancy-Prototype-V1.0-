import React, { useState, useRef, useEffect } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface EvidenceVisual_CompareProps {
  beforeLabel?: string;
  afterLabel?: string;
}

const EvidenceVisual_Compare: React.FC<EvidenceVisual_CompareProps> = ({ 
  beforeLabel = "LEGACY ARCHITECTURE", 
  afterLabel = "ENGINEERED SOLUTION" 
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    let clientX;

    if ('touches' in event) {
      clientX = event.touches[0].clientX;
    } else {
      clientX = (event as React.MouseEvent).clientX;
    }

    const position = ((clientX - containerRect.left) / containerRect.width) * 100;
    setSliderPosition(Math.min(Math.max(position, 0), 100));
  };

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };

  // Placeholder styles for Before/After images (Replace with real <img> tags later)
  // For now, we use colored divs to represent the transformation.
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[400px] md:h-[600px] overflow-hidden border border-black/10 cursor-col-resize select-none"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
    >
      {/* --- AFTER IMAGE (Background Layer) --- */}
      <div className="absolute inset-0 bg-[#FFF2EC] flex items-center justify-center">
         {/* PLACEHOLDER: Insert Real Screenshot Here */}
         <div className="text-center opacity-20">
            <div className="text-6xl font-serif mb-4">AFTER</div>
            <div className="font-mono text-xs">High Speed / SEO Optimized</div>
         </div>
         {/* Simulating the "Green" success state */}
         <div className="absolute inset-0 bg-emerald-900/5" />
      </div>

      {/* --- BEFORE IMAGE (Clipped Layer) --- */}
      <div 
        className="absolute inset-0 bg-[#E5E5E5] flex items-center justify-center border-r border-white/50"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
         {/* PLACEHOLDER: Insert Real Screenshot Here */}
         <div className="text-center opacity-40">
            <div className="text-6xl font-serif mb-4 text-[#1a1a1a]">BEFORE</div>
            <div className="font-mono text-xs text-[#1a1a1a]">Legacy Code / Generic .com</div>
         </div>
         {/* Simulating the "Red" error state */}
         <div className="absolute inset-0 bg-red-900/10" />
      </div>

      {/* --- SLIDER HANDLE --- */}
      <div 
        className="absolute top-0 bottom-0 w-1 bg-[#1a1a1a] cursor-col-resize flex items-center justify-center z-20"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="w-8 h-8 bg-[#1a1a1a] rounded-full flex items-center justify-center text-white shadow-xl">
           <MoveHorizontal className="w-4 h-4" />
        </div>
      </div>

      {/* --- LABELS --- */}
      <div className="absolute top-6 left-6 bg-[#1a1a1a] text-white px-3 py-1 font-mono text-[9px] tracking-widest z-10">
        {beforeLabel}
      </div>
      <div className="absolute top-6 right-6 bg-[#0F766E] text-white px-3 py-1 font-mono text-[9px] tracking-widest z-10">
        {afterLabel}
      </div>

    </div>
  );
};

export default EvidenceVisual_Compare;