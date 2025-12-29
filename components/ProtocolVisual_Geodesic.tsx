import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useAnimationFrame } from 'framer-motion';

// --- MATH UTILS ---
const PHI = (1 + Math.sqrt(5)) / 2;

// Basic Icosahedron Vertices
const getVertices = () => {
  const v = [];
  v.push([-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0]);
  v.push([0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI]);
  v.push([PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1]);
  return v;
};

// Faces (Triangles connecting vertices indices)
const faces = [
  [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
  [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
  [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
  [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
];

const ProtocolVisual_Geodesic: React.FC = () => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Physics for hover effect (Scaling a specific face)
  const [hoveredFace, setHoveredFace] = useState<number | null>(null);

  useAnimationFrame((t) => {
    setRotation({ x: t * 0.0001, y: t * 0.0002 });
  });

  // Project 3D point to 2D
  const project = (p: number[], rX: number, rY: number) => {
    let [x, y, z] = p;

    // Rotate Y
    const cosY = Math.cos(rY);
    const sinY = Math.sin(rY);
    let x2 = x * cosY - z * sinY;
    let z2 = z * cosY + x * sinY;

    // Rotate X
    const cosX = Math.cos(rX);
    const sinX = Math.sin(rX);
    let y2 = y * cosX - z2 * sinX;
    let z3 = z2 * cosX + y * sinX;

    // Perspective scale
    const scale = 200 / (4 + z3); // 4 is camera distance
    return { x: x2 * scale, y: y2 * scale, z: z3, scale };
  };

  const vertices = getVertices();

  return (
    <div ref={containerRef} className="w-full h-[500px] flex items-center justify-center relative overflow-hidden cursor-crosshair">
      <svg viewBox="-150 -150 300 300" className="w-full h-full pointer-events-none">
        <g>
          {faces.map((face, i) => {
            // Get 3D points for this face
            const p1_3d = vertices[face[0]];
            const p2_3d = vertices[face[1]];
            const p3_3d = vertices[face[2]];

            // Project to 2D
            const p1 = project(p1_3d, rotation.x, rotation.y);
            const p2 = project(p2_3d, rotation.x, rotation.y);
            const p3 = project(p3_3d, rotation.x, rotation.y);

            // Z-Sorting: Calculate center Z depth
            const zDepth = (p1.z + p2.z + p3.z) / 3;
            
            // Back-face culling (hide faces facing away)
            // Or simple Z-opacity logic
            const opacity = zDepth > 0.2 ? 0.1 : 1; // Simple approximation
            
            // Interaction: Is this face hovered?
            const isHovered = hoveredFace === i;
            const fillColor = isHovered ? '#E21E3F' : (i % 7 === 0 ? '#C5A059' : 'transparent');
            const fillOpacity = isHovered ? 0.2 : (i % 7 === 0 ? 0.1 : 0);
            
            // Hover Extrusion (Simple Scale from center)
            // In a real 3D engine we'd move vertices. Here we scale the triangle path from centroid.
            const centroid = { x: (p1.x+p2.x+p3.x)/3, y: (p1.y+p2.y+p3.y)/3 };
            const scaleFactor = isHovered ? 1.2 : 1;
            
            const pathData = `M ${(p1.x - centroid.x)*scaleFactor + centroid.x},${(p1.y - centroid.y)*scaleFactor + centroid.y} 
                              L ${(p2.x - centroid.x)*scaleFactor + centroid.x},${(p2.y - centroid.y)*scaleFactor + centroid.y} 
                              L ${(p3.x - centroid.x)*scaleFactor + centroid.x},${(p3.y - centroid.y)*scaleFactor + centroid.y} Z`;

            return (
              <motion.path
                key={i}
                d={pathData}
                fill={fillColor}
                fillOpacity={fillOpacity}
                stroke={isHovered ? '#E21E3F' : '#1a1a1a'}
                strokeWidth={isHovered ? 1 : 0.5}
                strokeOpacity={opacity}
                style={{ opacity: opacity === 0.1 ? 0.1 : 1 }} // Fade back faces
                pointerEvents="auto"
                onMouseEnter={() => setHoveredFace(i)}
                onMouseLeave={() => setHoveredFace(null)}
              />
            );
          })}
        </g>
      </svg>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px] text-[#1a1a1a]/30 uppercase tracking-widest pointer-events-none">
         [ SYSTEM_TOPOLOGY // ROTATING ]
      </div>
    </div>
  );
};

export default ProtocolVisual_Geodesic;