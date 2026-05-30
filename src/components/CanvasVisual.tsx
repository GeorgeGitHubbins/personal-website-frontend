import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const CanvasVisual: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 55;
    const connectionDist = 100;
    const mouseInfluenceDist = 130;

    // Resize handler
    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      initParticles();
    };

    // Initialize particles
    const initParticles = () => {
      particles = [];
      const w = canvas.width;
      const h = canvas.height;
      
      // Reduce particle count on very small screens
      const count = w < 600 ? 30 : maxParticles;

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.45, // speed
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 2 + 1,
        });
      }
    };

    // Listeners
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: null, y: null };
    };

    // Attach listeners to container
    // Attach listeners to window for global mouse tracking
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    // Resize Observer for robust width/height tracking
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // Initial setup
    handleResize();

    // Animation Loop
    const draw = () => {
      if (!ctx || !canvas) return;
      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      // Detect theme from DOM
      const isDark = document.body.classList.contains('dark-mode');
      
      // Configure colors based on theme
      const dotColor = isDark ? 'rgba(52, 152, 219, 0.4)' : 'rgba(44, 62, 80, 0.25)';
      const lineColor = isDark ? 'rgba(52, 152, 219, 0.12)' : 'rgba(44, 62, 80, 0.07)';
      const mouseLineColor = isDark ? 'rgba(52, 152, 219, 0.25)' : 'rgba(44, 62, 80, 0.18)';

      const mouse = mouseRef.current;

      // Update and draw particles
      particles.forEach((p) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Keep inside bounds
        p.x = Math.max(0, Math.min(w, p.x));
        p.y = Math.max(0, Math.min(h, p.y));

        // Interactive mouse influence (subtle attraction)
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < mouseInfluenceDist) {
            // Apply slight drift towards cursor
            const force = (mouseInfluenceDist - dist) / mouseInfluenceDist;
            p.x += (dx / dist) * force * 0.45;
            p.y += (dy / dist) * force * 0.45;
          }
        }

        // Draw dot
        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];

        // Draw line to mouse if close
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p1.x;
          const dy = mouse.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseInfluenceDist) {
            ctx.strokeStyle = mouseLineColor;
            ctx.lineWidth = (mouseInfluenceDist - dist) / mouseInfluenceDist * 1.2;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        // Connections to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            ctx.strokeStyle = lineColor;
            // Line becomes thicker the closer the particles are
            ctx.lineWidth = (connectionDist - dist) / connectionDist * 0.8;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="canvas-visual-container">
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
};

export default CanvasVisual;
