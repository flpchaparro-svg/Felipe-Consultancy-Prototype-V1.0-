import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const D3Background: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // Clean up to prevent duplicates
    d3.select(container).selectAll('*').remove();
    const svg = d3.select(container).append("svg").attr("width", "100%").attr("height", "100%");

    // FAST FADE: Ring vanishes by 350px scroll and stays hidden
    const handleScroll = () => {
      const op = 1 - (window.scrollY / 350); 
      if (container) container.style.opacity = Math.max(0, op).toString();
    };
    window.addEventListener('scroll', handleScroll);

    // Track mouse for the initial explosion pull
    const mouse = { x: width / 2, y: height / 2 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Initial Node Setup (120 nodes)
    const nodes = d3.range(120).map((i) => {
      const angle = Math.random() * 2 * Math.PI;
      return { 
        id: i, angle: angle, dist: Math.random() * 10,
        baseR: Math.random() * 12 + 4, speed: Math.random() * 0.5 + 0.2, 
        isSurvivor: i < 22, // 22 particles form the permanent ring
        x: width / 2, y: height / 2,
        ringRadius: 150 + Math.random() * 70, // Orbiting distance
        rotSpeed: (Math.random() * 0.004 + 0.001) * (Math.random() > 0.5 ? 1 : -1) 
      } as any;
    });

    // Create the geometric links
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
      .attr("opacity", 0.15);

    const nodeSelection = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("fill", "#1a1a1a")
      .attr("opacity", 0);

    // Fade in initially
    nodeSelection.transition().duration(1000).attr("opacity", (d: any) => d.isSurvivor ? 0.2 : 0.3);

    // SINGLE UNIFIED TIMER: Prevents the "black flash"
    const mainTimer = d3.timer((elapsed) => {
      if (elapsed < 5000) {
        // --- PHASE 1: EXPLOSION ---
        nodes.forEach(d => {
          const dx = mouse.x - (width / 2 + Math.cos(d.angle) * d.dist);
          const dy = mouse.y - (height / 2 + Math.sin(d.angle) * d.dist);
          const distToMouse = Math.sqrt(dx * dx + dy * dy);
          const pull = Math.max(0, 1 - distToMouse / 500) * 0.05;

          if (d.isSurvivor) {
            if (d.dist < 200) d.dist += d.speed * 2.5;
            else d.dist += 0.1;
          } else {
            d.dist += d.speed * (elapsed * 0.06);
          }
          d.angle += pull;
          
          d.x = width / 2 + Math.cos(d.angle) * d.dist;
          d.y = height / 2 + Math.sin(d.angle) * d.dist;
        });

        linkSelection
          .attr("x1", (d: any) => nodes[d.source].x)
          .attr("y1", (d: any) => nodes[d.source].y)
          .attr("x2", (d: any) => nodes[d.target].x)
          .attr("y2", (d: any) => nodes[d.target].y)
          .attr("opacity", (d: any) => Math.max(0, 0.2 - (nodes[d.source].dist / 1200)));

        nodeSelection
          .attr("cx", (d: any) => d.x)
          .attr("cy", (d: any) => d.y)
          .attr("r", (d: any) => {
            const expansion = 1 + Math.pow(d.dist * 0.002, 2); 
            if (d.isSurvivor && d.dist > 200) return d.baseR; 
            return d.baseR * expansion;
          })
          .attr("opacity", (d: any) => d.isSurvivor ? 0.2 : Math.max(0, 0.3 - (d.dist / 1000)));

      } else {
        // --- PHASE 2: SPINNING RING ---
        if (elapsed < 5050) {
          window.removeEventListener('mousemove', onMouseMove);
          linkSelection.attr("opacity", 0); // Hide links
          nodeSelection.filter((d: any) => !d.isSurvivor).attr("opacity", 0); // Hide non-survivors
        }

        nodes.filter(d => d.isSurvivor).forEach(d => {
          d.angle += d.rotSpeed; // Continuous Orbit
          const targetX = (width / 2) + Math.cos(d.angle) * d.ringRadius;
          const targetY = (height / 2) + Math.sin(d.angle) * d.ringRadius;
          
          // Smoothly lock into orbit
          d.x += (targetX - d.x) * 0.04;
          d.y += (targetY - d.y) * 0.04;
        });

        nodeSelection.filter((d: any) => d.isSurvivor)
          .attr("cx", (d: any) => d.x)
          .attr("cy", (d: any) => d.y)
          .attr("opacity", 0.15); // Stable Ring Presence
      }
    });

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      mainTimer.stop();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return <div id="geometric-container" ref={containerRef} />;
};

export default D3Background;