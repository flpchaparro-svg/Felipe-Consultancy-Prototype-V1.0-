
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const D3Background: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    d3.select(container).selectAll('*').remove();
    const svg = d3.select(container).append("svg").attr("width", "100%").attr("height", "100%");

    const handleScroll = () => {
      const op = 1 - (window.scrollY / 800);
      if (container) container.style.opacity = Math.max(0, op).toString();
    };
    window.addEventListener('scroll', handleScroll);

    // Initial mouse state
    const mouse = { x: width / 2, y: height / 2 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    let nodes = d3.range(120).map((i) => {
      const angle = Math.random() * 2 * Math.PI;
      return { 
        id: i, angle: angle, dist: Math.random() * 10,
        baseR: Math.random() * 12 + 4, speed: Math.random() * 0.5 + 0.2, 
        isSurvivor: i < 15, vx: 0, vy: 0, x: width / 2, y: height / 2 
      } as any;
    });

    const links: any[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() > 0.96) links.push({ source: i, target: j });
      }
    }

    const linkSelection = svg.append("g")
      .selectAll("line")
      .data(links)
      .enter().append("line")
      .attr("stroke", "#1a1a1a")
      .attr("stroke-width", 0.5)
      .attr("opacity", 0.2);

    const nodeSelection = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("fill", "#1a1a1a")
      .attr("opacity", 0.3);

    const startFloatingPhase = (survivors: any[]) => {
      // PERFORMANCE: Remove mouse interaction after settling to avoid background drag on main UI
      window.removeEventListener('mousemove', onMouseMove);
      
      linkSelection.remove();
      nodeSelection.filter((d: any) => !d.isSurvivor).remove();
      
      survivors.forEach(d => {
        d.x = width / 2 + Math.cos(d.angle) * d.dist;
        d.y = height / 2 + Math.sin(d.angle) * d.dist;
      });

      const sim = d3.forceSimulation(survivors)
        .force("charge", d3.forceManyBody().strength(-20))
        .velocityDecay(0.4)
        .on("tick", () => {
          svg.selectAll("circle")
            .attr("cx", (d: any) => d.x)
            .attr("cy", (d: any) => d.y)
            .attr("opacity", 0.08); // Reduced to 0.08 for maximum hero text contrast
        });
    };

    const explosionTimer = d3.timer((elapsed) => {
      nodes.forEach(d => {
        // Slight mouse attraction during explosion phase
        const dx = mouse.x - (width / 2 + Math.cos(d.angle) * d.dist);
        const dy = mouse.y - (height / 2 + Math.sin(d.angle) * d.dist);
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        const pull = Math.max(0, 1 - distToMouse / 500) * 0.05;

        if (d.isSurvivor) {
          if (d.dist < 200) { d.dist += d.speed * 2; }
          else { d.dist += 0.1; }
        } else {
          d.dist += d.speed * (elapsed * 0.05);
        }
        
        d.angle += pull;
      });

      linkSelection
        .attr("x1", (d: any) => width / 2 + Math.cos(nodes[d.source].angle) * nodes[d.source].dist)
        .attr("y1", (d: any) => height / 2 + Math.sin(nodes[d.source].angle) * nodes[d.source].dist)
        .attr("x2", (d: any) => width / 2 + Math.cos(nodes[d.target].angle) * nodes[d.target].dist)
        .attr("y2", (d: any) => height / 2 + Math.sin(nodes[d.target].angle) * nodes[d.target].dist)
        .attr("opacity", (d: any) => Math.max(0, 0.2 - (nodes[d.source].dist / 1200)));

      nodeSelection
        .attr("cx", (d: any) => width / 2 + Math.cos(d.angle) * d.dist)
        .attr("cy", (d: any) => height / 2 + Math.sin(d.angle) * d.dist)
        .attr("r", (d: any) => {
          const expansion = 1 + Math.pow(d.dist * 0.002, 2); 
          if (d.isSurvivor && d.dist > 200) return d.baseR; 
          return d.baseR * expansion;
        })
        .attr("opacity", (d: any) => {
          if (d.isSurvivor) return 0.2; 
          return Math.max(0, 0.3 - (d.dist / 1000)); 
        });

      if (elapsed > 4900) {
        explosionTimer.stop();
        const survivors = nodes.filter(d => d.isSurvivor);
        startFloatingPhase(survivors);
      }
    });

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      explosionTimer.stop();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <div id="geometric-container" ref={containerRef} />;
};

export default D3Background;
