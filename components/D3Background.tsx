import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const D3Background: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollVelocityRef = useRef(0);
  const lastScrollPosRef = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    d3.select(container).selectAll('*').remove();
    const svg = d3.select(container).append("svg").attr("width", "100%").attr("height", "100%");

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const diff = currentScroll - lastScrollPosRef.current;
      scrollVelocityRef.current = diff * 0.4; 
      lastScrollPosRef.current = currentScroll;

      const op = 1 - (currentScroll / 600); 
      if (container) container.style.opacity = Math.max(0.1, op).toString();
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const mouse = { x: width / 2, y: height / 2 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', onMouseMove);

    const nodes = d3.range(120).map((i) => {
      const angle = Math.random() * 2 * Math.PI;
      return { 
        id: i, angle: angle, dist: Math.random() * 10,
        baseR: Math.random() * 12 + 4, speed: Math.random() * 0.3 + 0.1, 
        isSurvivor: i < 22, 
        x: width / 2, y: height / 2,
        ringRadius: 150 + Math.random() * 70, 
        rotSpeed: (Math.random() * 0.002 + 0.0005) * (Math.random() > 0.5 ? 1 : -1) 
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
      .attr("opacity", 0.15);

    const nodeSelection = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .enter().append("circle")
      .attr("fill", "#1a1a1a")
      .attr("opacity", 0);

    nodeSelection.transition().duration(2000).attr("opacity", (d: any) => d.isSurvivor ? 0.2 : 0.3);

    const mainTimer = d3.timer((elapsed) => {
      const velocity = scrollVelocityRef.current;
      scrollVelocityRef.current *= 0.92;

      if (elapsed < 5000) {
        // --- PHASE 1: EXPLOSION (RESTORED HIGH SPEED) ---
        nodes.forEach(d => {
          const dx = mouse.x - (width / 2 + Math.cos(d.angle) * d.dist);
          const dy = mouse.y - (height / 2 + Math.sin(d.angle) * d.dist);
          const distToMouse = Math.sqrt(dx * dx + dy * dy);
          const pull = Math.max(0, 1 - distToMouse / 500) * 0.05;

          const dragDist = velocity * 0.05;
          const dragAngle = velocity * 0.0005;

          if (d.isSurvivor) {
            if (d.dist < 200) d.dist += (d.speed) * 3 + Math.abs(dragDist);
            else d.dist += 0.1 + dragDist;
          } else {
            d.dist += (d.speed) * (elapsed * 0.05) + dragDist;
          }
          d.angle += pull + dragAngle;
          
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
          linkSelection.attr("opacity", 0); 
          nodeSelection.filter((d: any) => !d.isSurvivor).attr("opacity", 0); 
        }

        nodes.filter(d => d.isSurvivor).forEach(d => {
          const torque = velocity * 0.0003;
          d.angle += d.rotSpeed + torque; 
          
          const targetRadius = d.ringRadius + (velocity * 0.05);
          const targetX = (width / 2) + Math.cos(d.angle) * targetRadius;
          const targetY = (height / 2) + Math.sin(d.angle) * targetRadius;
          
          d.x += (targetX - d.x) * 0.1;
          d.y += (targetY - d.y) * 0.1;
        });

        nodeSelection.filter((d: any) => d.isSurvivor)
          .attr("cx", (d: any) => d.x)
          .attr("cy", (d: any) => d.y)
          .attr("opacity", 0.15); 
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