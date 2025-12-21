
import React, { useEffect, useRef } from 'react';
import * as d3 from 'https://esm.sh/d3@7';

interface ViewportVizProps {
  type: string;
}

const ViewportViz: React.FC<ViewportVizProps> = ({ type }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Clear previous visualization
    d3.select(container).selectAll('*').remove();
    const svg = d3.select(container)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`);

    const color = '#E21E3F';
    const accent = '#FFF2EC';

    const renderGeometric = () => {
      const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);
      const levels = 8;
      for (let i = 0; i < levels; i++) {
        g.append('circle')
          .attr('r', (i + 1) * 30)
          .attr('fill', 'none')
          .attr('stroke', color)
          .attr('stroke-width', 0.5)
          .attr('opacity', 0.2);
        
        const lines = 12;
        for (let j = 0; j < lines; j++) {
          const angle = (j / lines) * Math.PI * 2;
          g.append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', Math.cos(angle) * levels * 30)
            .attr('y2', Math.sin(angle) * levels * 30)
            .attr('stroke', color)
            .attr('stroke-width', 0.5)
            .attr('opacity', 0.1);
        }
      }
    };

    const renderNetwork = () => {
      const nodes = d3.range(30).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height
      }));
      
      const links = [];
      for(let i=0; i<nodes.length; i++) {
        for(let j=i+1; j<nodes.length; j++) {
          if (Math.random() > 0.93) links.push({source: i, target: j});
        }
      }

      svg.selectAll('line')
        .data(links)
        .enter().append('line')
        .attr('x1', d => nodes[d.source].x)
        .attr('y1', d => nodes[d.source].y)
        .attr('x2', d => nodes[d.target].x)
        .attr('y2', d => nodes[d.target].y)
        .attr('stroke', color)
        .attr('stroke-width', 0.5)
        .attr('opacity', 0.3);

      svg.selectAll('circle')
        .data(nodes)
        .enter().append('circle')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 2)
        .attr('fill', color);
    };

    const renderFlow = () => {
      const numLines = 10;
      for (let i = 0; i < numLines; i++) {
        const y = (height / (numLines + 1)) * (i + 1);
        const path = svg.append('path')
          .attr('d', `M 0 ${y} L ${width} ${y}`)
          .attr('stroke', color)
          .attr('stroke-width', 1)
          .attr('fill', 'none')
          .attr('opacity', 0.2);
        
        const totalLength = (path.node() as SVGPathElement).getTotalLength();
        
        svg.append('circle')
          .attr('r', 3)
          .attr('fill', color)
          .append('animateMotion')
          .attr('path', `M 0 ${y} L ${width} ${y}`)
          .attr('dur', `${2 + Math.random() * 3}s`)
          .attr('repeatCount', 'indefinite');
      }
    };

    const renderNeural = () => {
      const g = svg.append('g').attr('transform', `translate(${width / 2}, ${height / 2})`);
      const nodes = d3.range(40).map(i => ({
        id: i,
        angle: Math.random() * Math.PI * 2,
        dist: Math.random() * 150
      }));

      const nodeElems = g.selectAll('circle')
        .data(nodes)
        .enter().append('circle')
        .attr('cx', d => Math.cos(d.angle) * d.dist)
        .attr('cy', d => Math.sin(d.angle) * d.dist)
        .attr('r', 1.5)
        .attr('fill', color);

      d3.timer((elapsed) => {
        nodeElems.attr('cx', (d: any) => Math.cos(d.angle + elapsed * 0.001) * d.dist)
                 .attr('cy', (d: any) => Math.sin(d.angle + elapsed * 0.001) * d.dist);
      });
    };

    const renderSequential = () => {
      const boxSize = 20;
      const count = 12;
      for (let i = 0; i < count; i++) {
        svg.append('rect')
          .attr('x', (width / count) * i + (width / count - boxSize) / 2)
          .attr('y', height / 2 - boxSize / 2)
          .attr('width', boxSize)
          .attr('height', boxSize)
          .attr('fill', 'none')
          .attr('stroke', color)
          .attr('opacity', 0.3);
      }
      svg.append('line')
        .attr('x1', 0)
        .attr('y1', height / 2)
        .attr('x2', width)
        .attr('y2', height / 2)
        .attr('stroke', color)
        .attr('stroke-width', 0.5)
        .attr('stroke-dasharray', '5,5')
        .attr('opacity', 0.2);
    };

    const renderWaves = () => {
      const waveCount = 5;
      for (let i = 0; i < waveCount; i++) {
        const wave = svg.append('path')
          .attr('fill', 'none')
          .attr('stroke', color)
          .attr('stroke-width', 0.5)
          .attr('opacity', 0.2);

        d3.timer((elapsed) => {
          const points = d3.range(0, width, 10).map(x => {
            const y = height / 2 + Math.sin(x * 0.02 + elapsed * 0.002 + i) * 50;
            return [x, y];
          });
          wave.attr('d', d3.line()(points as any));
        });
      }
    };

    const renderDashboard = () => {
      const bars = 15;
      const data = d3.range(bars).map(() => Math.random() * 100);
      svg.selectAll('rect')
        .data(data)
        .enter().append('rect')
        .attr('x', (d, i) => (width / bars) * i + 5)
        .attr('y', d => height - (d / 100) * height)
        .attr('width', (width / bars) - 10)
        .attr('height', d => (d / 100) * height)
        .attr('fill', color)
        .attr('opacity', 0.15);
    };

    switch (type) {
      case 'network': renderNetwork(); break;
      case 'flow': renderFlow(); break;
      case 'neural': renderNeural(); break;
      case 'sequential': renderSequential(); break;
      case 'waves': renderWaves(); break;
      case 'dashboard': renderDashboard(); break;
      default: renderGeometric(); break;
    }

  }, [type]);

  return <div ref={containerRef} className="w-full h-full bg-[#1a1a1a] relative overflow-hidden" />;
};

export default ViewportViz;
