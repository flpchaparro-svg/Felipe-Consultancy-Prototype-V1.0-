
import React, { useEffect, useRef } from 'react';

const PillarVisual_Catchment: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = canvas.parentElement?.clientWidth || 500;
    let height = canvas.height = 450;

    // --- CONFIG ---
    const CENTER_X = width / 2;
    const CENTER_Y = height / 2;
    
    // Funnel Geometry
    const F_TOP_Y = CENTER_Y - 100;
    const F_MID_Y = CENTER_Y + 20;
    const F_BOT_Y = CENTER_Y + 80;
    
    const F_TOP_W = 180; // Width at top
    const F_NECK_W = 40; // Width at neck
    
    // State Variables
    let frameOpacity = 0;    
    let contentOpacity = 0; 
    let fillLevel = 0;       
    let outputY = 0; // Position of the falling lead result
    
    // Lifecycle State
    type AnimState = 'INIT' | 'IDLE_EMPTY' | 'BUILDING' | 'CONVERTING' | 'COMPLETE' | 'CLEARING';
    let currentState: AnimState = 'INIT';
    
    let timer = 0;
    let leadId = 101; 
    
    interface Particle {
        x: number; y: number;
        vx: number; vy: number; 
        speed: number;
        color: string;
        size: number;
        dead: boolean;
    }
    
    let particles: Particle[] = [];

    // Spawn "Traffic" Particles from top
    const spawnParticle = () => {
        // Start above the funnel
        const startX = CENTER_X + (Math.random() - 0.5) * F_TOP_W * 1.5;
        const startY = F_TOP_Y - 60 - Math.random() * 40;
        
        // Aim towards the funnel center
        const targetX = CENTER_X + (Math.random() - 0.5) * 20; // Aim for neck
        
        const dx = targetX - startX;
        const dy = F_MID_Y - startY;
        const angle = Math.atan2(dy, dx);
        const speed = 1.5 + Math.random() * 1;

        particles.push({
            x: startX,
            y: startY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            speed: speed,
            color: Math.random() > 0.6 ? 'rgba(226, 30, 63, 0.6)' : 'rgba(26, 26, 26, 0.3)', // Red/Ink
            size: 1.5 + Math.random() * 1.5,
            dead: false
        });
    };

    const drawFunnel = (frameAlpha: number, dataAlpha: number, progress: number, dropY: number) => {
        ctx.save();
        
        // --- 1. FUNNEL FRAME (Stationary) ---
        ctx.globalAlpha = frameAlpha;
        ctx.strokeStyle = 'rgba(26, 26, 26, 0.2)';
        ctx.lineWidth = 1.5;
        
        // Main Body
        ctx.beginPath();
        // Left Side
        ctx.moveTo(CENTER_X - F_TOP_W/2, F_TOP_Y);
        ctx.lineTo(CENTER_X - F_NECK_W/2, F_MID_Y);
        ctx.lineTo(CENTER_X - F_NECK_W/2, F_BOT_Y);
        // Right Side
        ctx.moveTo(CENTER_X + F_TOP_W/2, F_TOP_Y);
        ctx.lineTo(CENTER_X + F_NECK_W/2, F_MID_Y);
        ctx.lineTo(CENTER_X + F_NECK_W/2, F_BOT_Y);
        ctx.stroke();

        // Top Opening Ellipse
        ctx.beginPath();
        ctx.ellipse(CENTER_X, F_TOP_Y, F_TOP_W/2, 10, 0, 0, Math.PI*2);
        ctx.strokeStyle = 'rgba(226, 30, 63, 0.3)'; // Red rim
        ctx.stroke();
        
        // Technical Markers
        ctx.fillStyle = 'rgba(26, 26, 26, 0.4)';
        ctx.font = '9px monospace';
        ctx.fillText("TRAFFIC_SOURCE", CENTER_X - F_TOP_W/2 - 10, F_TOP_Y - 10);
        ctx.fillText("FILTER_LOGIC", CENTER_X + F_NECK_W + 10, F_MID_Y);

        // --- 2. DYNAMIC FILL (The Liquid) ---
        const activeAlpha = frameAlpha * dataAlpha;
        
        if (activeAlpha > 0.01) {
            ctx.globalAlpha = activeAlpha;
            
            // Clip to Funnel Shape
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(CENTER_X - F_TOP_W/2, F_TOP_Y);
            ctx.lineTo(CENTER_X - F_NECK_W/2, F_MID_Y);
            ctx.lineTo(CENTER_X - F_NECK_W/2, F_BOT_Y);
            ctx.lineTo(CENTER_X + F_NECK_W/2, F_BOT_Y);
            ctx.lineTo(CENTER_X + F_NECK_W/2, F_MID_Y);
            ctx.lineTo(CENTER_X + F_TOP_W/2, F_TOP_Y);
            ctx.closePath();
            ctx.clip();

            // Draw Fill (Rising from bottom of neck up)
            // Total Height = (F_BOT_Y - F_TOP_Y)
            const totalH = F_BOT_Y - F_TOP_Y;
            const fillH = totalH * progress;
            const fillY = F_BOT_Y - fillH;
            
            // Gradient Fill
            const grad = ctx.createLinearGradient(0, F_BOT_Y, 0, F_TOP_Y);
            grad.addColorStop(0, '#E21E3F'); // Solid Red at bottom
            grad.addColorStop(1, 'rgba(226, 30, 63, 0.1)'); // Fade at top
            
            ctx.fillStyle = grad;
            ctx.fillRect(CENTER_X - F_TOP_W/2, fillY, F_TOP_W, fillH);
            
            // Bubbles/Texture inside fluid
            if (progress > 0.1) {
                ctx.fillStyle = 'rgba(255,255,255,0.2)';
                for(let i=0; i<5; i++) {
                    const bx = CENTER_X + (Math.random() - 0.5) * F_NECK_W;
                    const by = F_BOT_Y - Math.random() * fillH;
                    ctx.beginPath(); ctx.arc(bx, by, Math.random()*2, 0, Math.PI*2); ctx.fill();
                }
            }
            
            ctx.restore();

            // --- 3. THE DROP (Qualified Lead) ---
            // Only visible if converting or complete
            if (dropY > 0) {
                const leadY = F_BOT_Y + dropY;
                const leadSize = 24;
                
                // Draw Lead Block
                ctx.fillStyle = '#E21E3F';
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 1;
                
                // Box
                ctx.beginPath();
                ctx.roundRect(CENTER_X - leadSize, leadY, leadSize*2, leadSize, 4);
                ctx.fill();
                ctx.stroke();
                
                // Label
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 9px monospace';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText("LEAD", CENTER_X, leadY + leadSize/2);
                
                // Success Badge (When fully dropped)
                if (dropY > 40) {
                    ctx.font = '9px monospace';
                    ctx.fillStyle = '#1a1a1a';
                    ctx.fillText(`ID: ${leadId} [CAPTURED]`, CENTER_X, leadY + leadSize + 15);
                }
            }
        }

        ctx.restore();
    };

    const animate = () => {
        // Resize
        if (canvas.parentElement) {
             const pWidth = canvas.parentElement.clientWidth;
             const pHeight = canvas.parentElement.clientHeight;
             if(canvas.width !== pWidth || canvas.height !== pHeight){
                 width = canvas.width = pWidth;
                 height = canvas.height = pHeight;
             }
        }

        ctx.clearRect(0, 0, width, height);

        // --- STATE MACHINE ---
        switch (currentState) {
            case 'INIT':
                frameOpacity += 0.02;
                if (frameOpacity >= 1) {
                    frameOpacity = 1;
                    currentState = 'IDLE_EMPTY';
                    timer = 0;
                }
                break;

            case 'IDLE_EMPTY':
                timer++;
                if (timer > 40) {
                    currentState = 'BUILDING';
                    contentOpacity = 1;
                }
                break;

            case 'BUILDING':
                // Spawn particles
                if (Math.random() > 0.5) spawnParticle();
                
                // Fill up
                if (fillLevel < 1) {
                    fillLevel += 0.003; // Fill speed
                } else {
                    fillLevel = 1;
                    currentState = 'CONVERTING';
                    timer = 0;
                }
                break;
            
            case 'CONVERTING':
                // Drop the lead
                if (outputY < 50) {
                    outputY += 2; // Drop speed
                } else {
                    outputY = 50;
                    currentState = 'COMPLETE';
                    timer = 0;
                }
                break;

            case 'COMPLETE':
                timer++;
                if (timer > 150) { // Hold success state
                    currentState = 'CLEARING';
                }
                break;

            case 'CLEARING':
                contentOpacity -= 0.02;
                if (contentOpacity <= 0) {
                    contentOpacity = 0;
                    fillLevel = 0;
                    outputY = 0;
                    leadId++;
                    currentState = 'IDLE_EMPTY';
                    timer = 0;
                }
                break;
        }

        drawFunnel(frameOpacity, contentOpacity, fillLevel, outputY);

        // --- PARTICLE PHYSICS ---
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            
            // Move
            p.x += p.vx;
            p.y += p.vy;
            
            // Gravity (pull towards center as they go down)
            const dx = CENTER_X - p.x;
            p.vx += dx * 0.005;
            
            // Check boundaries
            const distY = Math.abs(p.y - F_MID_Y);
            
            // If inside funnel
            if (p.y > F_TOP_Y && p.y < F_MID_Y) {
                // Converge
                const widthAtY = F_TOP_W * ((F_MID_Y - p.y) / (F_MID_Y - F_TOP_Y)); 
                if (Math.abs(p.x - CENTER_X) > widthAtY/2) {
                    p.vx *= -0.5; // Bounce inward
                    p.x += p.vx;
                }
            }

            // Die if hits the liquid surface or bottom
            const liquidY = F_BOT_Y - (fillLevel * (F_BOT_Y - F_TOP_Y));
            if (p.y > liquidY && currentState === 'BUILDING') {
                p.dead = true;
            }
            if (p.y > F_BOT_Y + 50) p.dead = true;

            if (!p.dead) {
                // Fade out particles with content opacity
                let pAlpha = 1;
                if (currentState === 'CLEARING') pAlpha = contentOpacity;
                
                if (pAlpha > 0.01) {
                    ctx.save();
                    ctx.globalAlpha = pAlpha;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
                    ctx.fillStyle = p.color;
                    ctx.fill();
                    ctx.restore();
                }
            } else {
                particles.splice(i, 1);
            }
        }

        requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    return () => {
        cancelAnimationFrame(animId);
    };

  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden relative bg-[#FFF2EC] border border-[#1a1a1a]/5 rounded-sm">
      <canvas ref={canvasRef} className="block" />
      
      {/* Label */}
      <div className="absolute top-6 left-6 pointer-events-none">
         <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full bg-[#E21E3F] animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#E21E3F]">
               ACQUISITION_FUNNEL
            </span>
         </div>
      </div>
    </div>
  );
};

export default PillarVisual_Catchment;
