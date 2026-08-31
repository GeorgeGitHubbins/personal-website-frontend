import React, { useEffect, useRef, useState } from 'react';

interface PrincipleNode {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  title: string;
  definition: string;
  example: string;
}

interface Edge {
  source: number;
  target: number;
  strength: number;
}

const principlesData = [
  {
    title: "Holism",
    definition: "Systems should be viewed as wholes, not just as a collection of parts.",
    example: "When designing a car, you optimize the engine in context of the fuel system and weight."
  },
  {
    title: "Entropy",
    definition: "The tendency of systems to move towards disorder over time.",
    example: "Software systems require constant maintenance (refactoring) to prevent 'code rot'."
  },
  {
    title: "Emergence",
    definition: "Properties that arise from the interaction of system components.",
    example: "Consciousness emerges from the interaction of billions of neurons in the brain."
  },
  {
    title: "Feedback Loops",
    definition: "Circular processes where the output of a system is returned as input.",
    example: "A thermostat uses a negative feedback loop to maintain a stable temperature."
  },
  {
    title: "Equifinality",
    definition: "A system can reach the same final state from different initial conditions.",
    example: "Multiple architectures can achieve a successful scalable software launch."
  },
  {
    title: "Leverage Points",
    definition: "Places within a system where a small shift produces big changes.",
    example: "Changing the core goal of a system is a high-leverage point that reshapes processes."
  }
];

const SystemsNodeGraph: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeNode, setActiveNode] = useState<PrincipleNode | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = container.clientWidth;
    let height = container.clientHeight || 500;
    canvas.width = width;
    canvas.height = height;

    const nodes: PrincipleNode[] = principlesData.map((p, i) => ({
      id: i,
      x: Math.random() * (width - 100) + 50,
      y: Math.random() * (height - 100) + 50,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: 45,
      title: p.title,
      definition: p.definition,
      example: p.example,
    }));

    // Create a fully connected graph but with weak edges, or a ring
    const edges: Edge[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        // randomly connect some, or connect all with low strength
        edges.push({ source: i, target: j, strength: 0.0005 });
      }
    }
    // Strong central pulling edge to keep them in center
    
    let isDragging = false;
    let draggedNodeIndex = -1;

    const handleResize = () => {
      width = container.clientWidth;
      height = container.clientHeight || 500;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    const getMousePos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };

    const handleDown = (e: MouseEvent | TouchEvent) => {
      const pos = getMousePos(e);
      for (let i = nodes.length - 1; i >= 0; i--) {
        const node = nodes[i];
        const dx = pos.x - node.x;
        const dy = pos.y - node.y;
        if (Math.sqrt(dx * dx + dy * dy) < node.radius) {
          isDragging = true;
          draggedNodeIndex = i;
          setActiveNode(node);
          break;
        }
      }
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (isDragging && draggedNodeIndex !== -1) {
        const pos = getMousePos(e);
        nodes[draggedNodeIndex].x = pos.x;
        nodes[draggedNodeIndex].y = pos.y;
        nodes[draggedNodeIndex].vx = 0;
        nodes[draggedNodeIndex].vy = 0;
      }
    };

    const handleUp = () => {
      isDragging = false;
      draggedNodeIndex = -1;
    };

    canvas.addEventListener('mousedown', handleDown);
    canvas.addEventListener('mousemove', handleMove);
    canvas.addEventListener('mouseup', handleUp);
    canvas.addEventListener('mouseleave', handleUp);
    
    canvas.addEventListener('touchstart', handleDown, { passive: false });
    canvas.addEventListener('touchmove', (e) => { e.preventDefault(); handleMove(e); }, { passive: false });
    canvas.addEventListener('touchend', handleUp);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const isDark = document.body.classList.contains('dark-mode');
      
      const textColor = isDark ? '#ffffff' : '#08060d';
      const nodeColor = isDark ? 'rgba(170, 59, 255, 0.15)' : 'rgba(170, 59, 255, 0.1)';
      const nodeBorder = isDark ? 'rgba(170, 59, 255, 0.8)' : 'rgba(170, 59, 255, 0.6)';
      const lineColor = isDark ? 'rgba(170, 59, 255, 0.2)' : 'rgba(170, 59, 255, 0.15)';

      // Physics step
      nodes.forEach((node, i) => {
        if (!isDragging || draggedNodeIndex !== i) {
          // Center gravity
          const dxCenter = (width / 2) - node.x;
          const dyCenter = (height / 2) - node.y;
          node.vx += dxCenter * 0.0001;
          node.vy += dyCenter * 0.0001;

          // Repulsion from other nodes
          nodes.forEach((other, j) => {
            if (i !== j) {
              const dx = node.x - other.x;
              const dy = node.y - other.y;
              const dist = Math.sqrt(dx * dx + dy * dy) || 1;
              if (dist < 150) {
                const force = (150 - dist) / dist * 0.05;
                node.vx += dx * force;
                node.vy += dy * force;
              }
            }
          });

          // Damping
          node.vx *= 0.95;
          node.vy *= 0.95;

          node.x += node.vx;
          node.y += node.vy;

          // Bounds
          if (node.x < node.radius) { node.x = node.radius; node.vx *= -1; }
          if (node.x > width - node.radius) { node.x = width - node.radius; node.vx *= -1; }
          if (node.y < node.radius) { node.y = node.radius; node.vy *= -1; }
          if (node.y > height - node.radius) { node.y = height - node.radius; node.vy *= -1; }
        }
      });

      // Draw edges
      edges.forEach(edge => {
        const source = nodes[edge.source];
        const target = nodes[edge.target];
        
        // Spring force
        if (!isDragging || (draggedNodeIndex !== edge.source && draggedNodeIndex !== edge.target)) {
          const dx = target.x - source.x;
          const dy = target.y - source.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const force = (dist - 200) * edge.strength;
          
          if (!isDragging || draggedNodeIndex !== edge.source) {
            source.vx += dx * force;
            source.vy += dy * force;
          }
          if (!isDragging || draggedNodeIndex !== edge.target) {
            target.vx -= dx * force;
            target.vy -= dy * force;
          }
        }

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = nodeColor;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = activeNode?.id === node.id ? '#1abc9c' : nodeBorder;
        ctx.stroke();
        
        ctx.fillStyle = textColor;
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        // Simple word wrap
        const words = node.title.split(' ');
        if (words.length > 1) {
            ctx.fillText(words[0], node.x, node.y - 6);
            ctx.fillText(words[1], node.x, node.y + 8);
        } else {
            ctx.fillText(node.title, node.x, node.y);
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousedown', handleDown);
      canvas.removeEventListener('mousemove', handleMove);
      canvas.removeEventListener('mouseup', handleUp);
      canvas.removeEventListener('mouseleave', handleUp);
    };
  }, [activeNode]);

  return (
    <div className="systems-graph-container" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div 
        ref={containerRef} 
        style={{ 
          width: '100%', 
          height: 'min(500px, 60vh)', 
          position: 'relative', 
          borderRadius: '12px',
          background: 'var(--accent-bg)',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          cursor: 'grab'
        }}
      >
        <canvas ref={canvasRef} style={{ display: 'block' }} />
        <div style={{ position: 'absolute', top: 10, left: 15, opacity: 0.7, fontSize: '0.85em' }}>
          💡 Drag nodes to interact with the system
        </div>
      </div>

      {activeNode && (
        <div className="principle-detail card" style={{ 
          padding: '25px', 
          textAlign: 'left',
          animation: 'fadeIn 0.5s ease-out',
          borderLeft: '4px solid #1abc9c'
        }}>
          <h4 style={{ color: 'var(--text-h)', marginTop: 0, fontSize: '1.3em' }}>{activeNode.title}</h4>
          <p><strong>Definition:</strong> {activeNode.definition}</p>
          <p style={{ marginTop: '10px' }}><strong>Example:</strong> {activeNode.example}</p>
        </div>
      )}
    </div>
  );
};

export default SystemsNodeGraph;