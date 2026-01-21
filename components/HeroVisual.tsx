
import React, { useEffect, useRef, useMemo } from 'react';
import { motion, useSpring, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';

// --- 3D MATH HELPERS ---
interface Point3D { 
  x: number; 
  y: number; 
  z: number; 
  id: number;
  color: string;
  baseSize: number;
}
interface Connection { p1: number; p2: number }

const PROJECT_SCALE = 320; // Scale factor for the human figure

// 1. Generate Humanoid Geometry (Procedural Body Volumes)
const generateHumanoidData = (count: number) => {
  const verts: Point3D[] = [];
  
  for (let i = 0; i < count; i++) {
    let x=0, y=0, z=0;
    const r = Math.random();

    // Body Proportions (approximate)
    // Head: Top 12%
    // Torso: Middle 38%
    // Arms: Sides 20%
    // Legs: Bottom 30%

    if (r < 0.12) { 
        // HEAD (Sphere)
        const rad = 0.14;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r_dist = rad * Math.cbrt(Math.random()); 
        x = r_dist * Math.sin(phi) * Math.cos(theta);
        y = 0.75 + r_dist * Math.sin(phi) * Math.sin(theta); 
        z = r_dist * Math.cos(phi);
    } 
    else if (r < 0.50) { 
        // TORSO (Cylinder with taper)
        const h = 0.55; 
        const y_pos = Math.random() * h;
        y = 0.15 + y_pos; 
        
        const angle = Math.random() * Math.PI * 2;
        const width = 0.15 + (y_pos / h) * 0.10; 
        const rad = Math.sqrt(Math.random()) * width;
        
        x = rad * Math.cos(angle);
        z = rad * Math.sin(angle) * 0.6; 
    }
    else if (r < 0.70) { 
        // ARMS (Cylinders hanging)
        const isLeft = Math.random() > 0.5;
        const h = 0.6;
        const y_pos = Math.random() * h;
        y = 0.1 + y_pos; 
        
        const angle = Math.random() * Math.PI * 2;
        const rad = 0.04 * Math.sqrt(Math.random());
        const cx = isLeft ? -0.28 : 0.28; 
        
        x = cx + rad * Math.cos(angle);
        z = rad * Math.sin(angle);
    }
    else { 
        // LEGS (Cylinders standing)
        const isLeft = Math.random() > 0.5;
        const h = 0.85;
        const y_pos = Math.random() * h;
        y = -0.7 + y_pos; 
        
        const angle = Math.random() * Math.PI * 2;
        const rad = 0.06 * Math.sqrt(Math.random());
        const cx = isLeft ? -0.1 : 0.1; 
        
        x = cx + rad * Math.cos(angle);
        z = rad * Math.sin(angle);
    }

    // Colors: 10% Gold Nodes (Data), 90% Ink (Structure) - Reduced Gold density
    const isGold = Math.random() > 0.90;
    
    verts.push({ 
      x, y, z, 
      id: i,
      color: isGold ? '#C5A059' : '#1a1a1a',
      baseSize: isGold ? 3 : 1.5 // Smaller particles
    });
  }

  // Connections (Based on PROXIMITY in the Target Shape)
  const connections: Connection[] = [];
  for (let i = 0; i < verts.length; i++) {
    for (let j = i + 1; j < verts.length; j++) {
      const dx = verts[i].x - verts[j].x;
      const dy = verts[i].y - verts[j].y;
      const dz = verts[i].z - verts[j].z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      
      // Connection Threshold - adjusted for cleaner look
      if (dist < 0.11) { 
         // Only add random % of connections to avoid clutter
         if (Math.random() > 0.85) connections.push({ p1: i, p2: j }); 
      }
    }
  }
  return { verts, connections };
};

const HeroVisual: React.FC = () => {
  // Density: 450 points for better definition
  const { verts: targetVerts, connections } = useMemo(() => generateHumanoidData(450), []);
  
  // Motion: Starts at 0 (Chaos), animates to 1 (Order)
  // SIGNIFICANTLY SLOWER PHYSICS: High Mass, Low Stiffness
  const progress = useSpring(0, { stiffness: 2, damping: 10, mass: 3 });
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(mouseY, { stiffness: 15, damping: 40 });
  const rotateY = useSpring(mouseX, { stiffness: 15, damping: 40 });

  // Chaos Start Positions (Scattered VERY wide)
  const startVerts = useMemo(() => {
    return targetVerts.map((_, i) => ({
      x: (Math.random() - 0.5) * 15, // Wider scatter
      y: (Math.random() - 0.5) * 15,
      z: (Math.random() - 0.5) * 15,
      id: i
    }));
  }, [targetVerts]);

  const projectedPoints = useRef<Point3D[]>(targetVerts.map(v => ({ ...v })));
  const [, setFrame] = React.useState(0);

  useEffect(() => {
    // Longer delay before assembly begins to let user appreciate chaos
    const timer = setTimeout(() => progress.set(1), 1000);
    
    const handleMouseMove = (e: MouseEvent) => {
      // Gentle rotation based on mouse
      const x = (e.clientX / window.innerWidth - 0.5) * 0.3; 
      const y = (e.clientY / window.innerHeight - 0.5) * 0.15; 
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useAnimationFrame((time) => {
    const p = progress.get();
    
    // Slow idle rotation
    const rx = rotateX.get() + Math.sin(time * 0.0002) * 0.05; 
    const ry = rotateY.get() + time * 0.00005; // Extremely slow spin

    projectedPoints.current = targetVerts.map((target, i) => {
      const start = startVerts[i];
      
      // Interpolate position
      // Use cubic easing for smooth start/end
      const smoothP = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      
      // Add drift to start position so it feels alive before assembling
      const driftX = Math.sin(time * 0.001 + i) * 0.5 * (1 - p);
      const driftY = Math.cos(time * 0.001 + i) * 0.5 * (1 - p);

      let x = (start.x + driftX) + (target.x - (start.x + driftX)) * smoothP;
      let y = (start.y + driftY) + (target.y - (start.y + driftY)) * smoothP;
      let z = start.z + (target.z - start.z) * smoothP;

      // Spiral Effect: Particles orbit as they come in
      // Angle decreases as p increases (1 - smoothP)
      const orbitAngle = (1 - smoothP) * 2.5; 
      const radius = Math.sqrt(x*x + z*z);
      const currentTheta = Math.atan2(z, x);
      const newTheta = currentTheta + orbitAngle;
      
      x = radius * Math.cos(newTheta);
      z = radius * Math.sin(newTheta);

      // 3D Rotation (Camera)
      // Rotate Y
      let x1 = x * Math.cos(ry) - z * Math.sin(ry);
      let z1 = z * Math.cos(ry) + x * Math.sin(ry);
      // Rotate X
      let y1 = y * Math.cos(rx) - z1 * Math.sin(rx);
      let z2 = z1 * Math.cos(rx) + y * Math.sin(rx);

      return { ...target, x: x1, y: y1, z: z2 };
    });
    setFrame(time);
  });

  // Opacity handling: Lines fade in very late
  const lineOpacity = useTransform(progress, [0.7, 1], [0, 0.12]); 
  
  // Shadow fades in slowly
  const shadowOpacity = useTransform(progress, [0.4, 1], [0, 0.2]);
  const shadowScale = useTransform(progress, [0, 1], [3, 1]);

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
      <svg className="w-full h-full max-w-[900px] max-h-[900px]" viewBox="-450 -450 900 900">
        <defs>
          <radialGradient id="shadowGrad" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#1a1a1a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* SHADOW (Grounding) */}
        <motion.ellipse 
          cx="0" 
          cy="320" 
          rx="100" 
          ry="20" 
          fill="url(#shadowGrad)" 
          style={{ opacity: shadowOpacity, scale: shadowScale }} 
        />

        {/* Connections (Lines) */}
        <motion.g style={{ opacity: lineOpacity, stroke: '#C5A059', strokeWidth: 0.5 }}>
          {connections.map((conn, i) => {
            const p1 = projectedPoints.current[conn.p1];
            const p2 = projectedPoints.current[conn.p2];
            // Depth check for line opacity
            const depth = (p1.z + p2.z) / 2; 
            return (
              <line 
                key={i}
                x1={p1.x * PROJECT_SCALE} 
                y1={p1.y * PROJECT_SCALE} 
                x2={p2.x * PROJECT_SCALE} 
                y2={p2.y * PROJECT_SCALE} 
                strokeOpacity={0.2 + depth * 0.15} 
              />
            );
          })}
        </motion.g>

        {/* Particles (Nodes) */}
        {projectedPoints.current.map((pt, i) => (
          <motion.circle
            key={pt.id}
            cx={pt.x * PROJECT_SCALE}
            cy={pt.y * PROJECT_SCALE}
            r={pt.baseSize + (pt.z * 1.5)} // Perspective scaling
            fill={pt.color}
            // Z-index sort simulation via opacity
            // Reduced max opacity for "not too strong" look
            opacity={0.25 + (pt.z + 0.5) * 0.4} 
          />
        ))}
      </svg>
    </div>
  );
};

export default HeroVisual;
