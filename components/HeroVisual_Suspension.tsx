
import React, { useEffect, useMemo, useRef } from 'react';
import { useSpring, useMotionValue, useAnimationFrame } from 'framer-motion';

// --- CONFIG ---
const CUBE_SIZE = 60;
const STACK_GAP = 65; // Closer gap for rigid feel
const FL = 850; // Focal Length
const CUBE_COUNT = 5;

// --- GEOMETRY DEFINITIONS ---
type Point3D = { x: number; y: number; z: number };

const BASE_CUBE_VERTS: Point3D[] = [
  { x: -1, y: -1, z: -1 }, { x: 1, y: -1, z: -1 }, { x: 1, y: 1, z: -1 }, { x: -1, y: 1, z: -1 },
  { x: -1, y: -1, z: 1 }, { x: 1, y: -1, z: 1 }, { x: 1, y: 1, z: 1 }, { x: -1, y: 1, z: 1 }
].map(p => ({ x: p.x * (CUBE_SIZE/2), y: p.y * (CUBE_SIZE/2), z: p.z * (CUBE_SIZE/2) }));

const CUBE_EDGES = [
  [0,1], [1,2], [2,3], [3,0], // Front
  [4,5], [5,6], [6,7], [7,4], // Back
  [0,4], [1,5], [2,6], [3,7]  // Connectors
];

// Octahedron (Diamond)
const CORE_VERTS: Point3D[] = [
  { x: 0, y: -1.3, z: 0 }, { x: 0, y: 1.3, z: 0 }, // Tips
  { x: -1, y: 0, z: 0 }, { x: 0, y: 0, z: -1 }, { x: 1, y: 0, z: 0 }, { x: 0, y: 0, z: 1 } // Equator
].map(p => ({ x: p.x * (CUBE_SIZE/3.5), y: p.y * (CUBE_SIZE/3.5), z: p.z * (CUBE_SIZE/3.5) }));

const CORE_FACES = [
  [0,2,3], [0,3,4], [0,4,5], [0,5,2],
  [1,2,3], [1,3,4], [1,4,5], [1,5,2]
];

// --- MATH HELPERS ---
const rotateY = (p: Point3D, theta: number): Point3D => {
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c };
};

const rotateZ = (p: Point3D, theta: number): Point3D => {
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  return { x: p.x * c - p.y * s, y: p.x * s + p.y * c, z: p.z };
};

const lerp = (start: number, end: number, t: number) => start * (1 - t) + end * t;

const HeroVisual_Suspension: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cubePathRefs = useRef<SVGPathElement[]>([]);
  const corePathRef = useRef<SVGPathElement>(null);
  const shadowRef = useRef<SVGEllipseElement>(null);

  const progress = useSpring(0, { stiffness: 30, damping: 20 });
  const mouseX = useMotionValue(0);

  // Random chaos positions for entrance
  const chaos = useMemo(() => {
    return Array.from({ length: CUBE_COUNT }).map(() => ({
      x: (Math.random() - 0.5) * 800,
      y: (Math.random() - 0.5) * 800,
      z: (Math.random() - 0.5) * 800
    }));
  }, []);

  useEffect(() => {
    setTimeout(() => progress.set(1), 500);

    const handleMove = (e: MouseEvent) => {
      if(!containerRef.current) return;
      const { left, width } = containerRef.current.getBoundingClientRect();
      const relativeX = (e.clientX - left) / width; 
      mouseX.set(relativeX - 0.5); // -0.5 to 0.5
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [progress, mouseX]);

  useAnimationFrame((t) => {
    if (!containerRef.current) return;
    const w = containerRef.current.clientWidth;
    const h = containerRef.current.clientHeight;
    const cx = w / 2;
    const cy = h / 2;

    const p = progress.get();
    const mx = mouseX.get();
    
    // Global continuous spin (Y-axis)
    const spin = t * 0.0005;
    // Sway angle (Z-axis) controlled by mouse
    const sway = mx * 0.15; // Max lean angle

    // Pivot Point Logic:
    // The stack rotates around the BOTTOM cube's center.
    // Stack structure relative to center (Index 2): 
    // 0(Top): -130, 1: -65, 2: 0, 3: 65, 4(Bottom): 130
    const pivotY = 130; 

    // RENDER CUBES
    for (let i = 0; i < CUBE_COUNT; i++) {
        const stackY = (i - 2) * STACK_GAP;
        
        // 1. Calculate Target Rigid Position
        const projectedVerts = BASE_CUBE_VERTS.map(v => {
            let px = v.x;
            let py = v.y + stackY; // Position in stack
            let pz = v.z;

            // Apply Rigid Physics (Pivot around bottom)
            py -= pivotY; // Shift to Pivot
            const swayed = rotateZ({x: px, y: py, z: pz}, sway); // Apply Sway
            px = swayed.x; py = swayed.y; pz = swayed.z;
            py += pivotY; // Shift back

            const spun = rotateY({x: px, y: py, z: pz}, spin); // Apply Spin
            return spun;
        });

        // 2. Interpolate with Chaos (Entrance Animation)
        const finalVerts = projectedVerts.map(v => ({
            x: lerp(chaos[i].x, v.x, p),
            y: lerp(chaos[i].y, v.y, p),
            z: lerp(chaos[i].z, v.z, p)
        }));

        // 3. Project to 2D
        const projected2D = finalVerts.map(v => {
            const scale = FL / (FL + v.z);
            return {
                x: v.x * scale + cx,
                y: v.y * scale + cy
            };
        });

        // 4. Draw Edges
        let d = "";
        CUBE_EDGES.forEach(([s, e]) => {
            d += `M ${projected2D[s].x} ${projected2D[s].y} L ${projected2D[e].x} ${projected2D[e].y} `;
        });

        if (cubePathRefs.current[i]) {
            cubePathRefs.current[i].setAttribute('d', d);
            cubePathRefs.current[i].setAttribute('stroke-opacity', `${0.2 + p * 0.8}`);
        }

        // RENDER CORE (Inside Middle Cube - Index 2)
        if (i === 2 && corePathRef.current) {
            const coreLocalSpin = -t * 0.002;
            
            const coreVerts = CORE_VERTS.map(v => {
                let cv = rotateY(v, coreLocalSpin); // Local spin
                
                // Match parent cube transforms
                let px = cv.x;
                let py = cv.y + stackY;
                let pz = cv.z;

                py -= pivotY;
                const swayed = rotateZ({x: px, y: py, z: pz}, sway);
                px = swayed.x; py = swayed.y; pz = swayed.z;
                py += pivotY;

                const spun = rotateY({x: px, y: py, z: pz}, spin);
                
                // Chaos Lerp
                return {
                    x: lerp(chaos[i].x, spun.x, p),
                    y: lerp(chaos[i].y, spun.y, p),
                    z: lerp(chaos[i].z, spun.z, p)
                };
            });

            const core2D = coreVerts.map(v => {
                const scale = FL / (FL + v.z);
                return { x: v.x * scale + cx, y: v.y * scale + cy };
            });

            let coreD = "";
            CORE_FACES.forEach(f => {
                coreD += `M ${core2D[f[0]].x} ${core2D[f[0]].y} L ${core2D[f[1]].x} ${core2D[f[1]].y} L ${core2D[f[2]].x} ${core2D[f[2]].y} Z `;
            });
            corePathRef.current.setAttribute('d', coreD);
            corePathRef.current.style.opacity = `${p}`;
        }
    }

    // RENDER SHADOW
    if (shadowRef.current) {
        // Shadow stays under the pivot point (bottom cube)
        const shadowY = 130 + CUBE_SIZE/2 + 20; 
        const scale = FL / FL; // Ground plane
        const sx = cx;
        const sy = cy + shadowY;
        
        // Shadow widens slightly when swaying
        const widthMod = 1 + Math.abs(sway) * 2; 
        
        shadowRef.current.setAttribute('cx', sx.toString());
        shadowRef.current.setAttribute('cy', sy.toString());
        shadowRef.current.setAttribute('rx', (40 * widthMod * p).toString());
        shadowRef.current.setAttribute('ry', (10 * p).toString());
        shadowRef.current.style.opacity = `${p * 0.4}`;
    }
  });

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[600px] flex items-center justify-center overflow-hidden cursor-crosshair select-none"
    >
       {/* 3D SCENE */}
       <svg className="w-full h-full overflow-visible pointer-events-none">
          {/* SHADOW */}
          <ellipse ref={shadowRef} className="fill-[#1a1a1a] blur-xl" />
          
          {/* CUBES */}
          {Array.from({ length: CUBE_COUNT }).map((_, i) => (
             <path 
               key={`cube-${i}`}
               ref={el => { if(el) cubePathRefs.current[i] = el; }}
               fill="none"
               stroke="#1a1a1a"
               strokeWidth="1.2"
               strokeLinecap="round"
               strokeLinejoin="round"
             />
          ))}

          {/* CORE (Solid Gold) */}
          <path 
             ref={corePathRef}
             fill="rgba(197, 160, 89, 0.9)" 
             stroke="#C5A059"
             strokeWidth="1"
             strokeLinecap="round"
             strokeLinejoin="round"
             style={{ filter: 'drop-shadow(0 0 15px rgba(197, 160, 89, 0.4))' }}
          />
       </svg>

       {/* RIGHT SIDE HUD */}
       <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col items-end gap-2 opacity-60 pointer-events-none">
          <div className="h-24 w-[1px] bg-black/20 relative overflow-hidden mb-2">
             <div className="absolute top-0 left-0 w-full h-1/2 bg-[#C5A059] animate-pulse" />
          </div>
          <span className="font-mono text-[9px] tracking-[0.2em] text-[#1a1a1a]">SYSTEM_INTEGRITY</span>
          <span className="font-mono text-[9px] font-bold text-[#C5A059]">100% NOMINAL</span>
       </div>
    </div>
  );
};

export default HeroVisual_Suspension;
