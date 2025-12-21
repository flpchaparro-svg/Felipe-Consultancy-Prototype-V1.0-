
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

const D3Background: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    // Fade logic for scroll depth
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const newOpacity = Math.max(0.1, 1 - scrollPos / 1000); 
      setScrollOpacity(newOpacity);
    };
    window.addEventListener('scroll', handleScroll);

    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Clear any existing content
    svg.selectAll('*').remove();

    // Create nodes starting at the center for the explosion
    const nodeCount = 35;
    const nodes = d3.range(nodeCount).map(() => ({
      x: width / 2,
      y: height / 2,
      // Initial velocity for the "burst"
      vx: (Math.random() - 0.5) * 40,
      vy: (Math.random() - 0.5) * 40,
      r: Math.random() * 35 + 10
    }));

    const simulation = d3.forceSimulation(nodes as any)
      .alphaDecay(0.02) // Slower decay to let the explosion travel
      .velocityDecay(0.1) // Drag factor
      .force('charge', d3.forceManyBody().strength(15))
      .force('center', d3.forceCenter(width / 2, height / 2).strength(0.01)) // Weak centering
      .force('collision', d3.forceCollide().radius((d: any) => d.r + 4));

    const circles = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .enter().append('circle')
      .attr('r', (d: any) => d.r)
      .attr('fill', 'none')
      .attr('stroke', '#C5A059')
      .attr('stroke-width', 0.5)
      .attr('opacity', 0);

    // Fade in circles quickly after mount
    circles.transition().duration(800).attr('opacity', 0.18);

    simulation.on('tick', () => {
      circles
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);
      
      // Boundary checks to keep them in view but not stuck
      nodes.forEach((d: any) => {
        if (d.x < 0) d.x = 0;
        if (d.x > width) d.x = width;
        if (d.y < 0) d.y = 0;
        if (d.y > height) d.y = height;
      });
    });

    // After the initial explosion (alpha drops), add a tiny bit of continuous drift
    setTimeout(() => {
      simulation.alphaTarget(0.1).restart();
    }, 2000);

    return () => {
      simulation.stop();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-500"
      style={{ opacity: scrollOpacity }}
    >
      <svg ref={svgRef} width="100%" height="100%" />
    </div>
  );
};

export default D3Background;
