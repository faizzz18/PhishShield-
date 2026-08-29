import React, { useEffect, useRef } from 'react';

interface CyberBackgroundProps {
  theme?: 'cyan' | 'emerald' | 'purple';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  pulseSpeed: number;
}

export const CyberBackground: React.FC<CyberBackgroundProps> = ({ theme = 'cyan' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Color definitions based on theme
    const themeColors = {
      cyan: {
        primary: 'rgba(6, 182, 212, ',
        secondary: 'rgba(56, 189, 248, ',
        accent: 'rgba(168, 85, 247, ',
      },
      emerald: {
        primary: 'rgba(16, 185, 129, ',
        secondary: 'rgba(52, 211, 153, ',
        accent: 'rgba(6, 182, 212, ',
      },
      purple: {
        primary: 'rgba(168, 85, 247, ',
        secondary: 'rgba(236, 72, 153, ',
        accent: 'rgba(56, 189, 248, ',
      },
    };

    const activeColor = themeColors[theme] || themeColors.cyan;

    // Particle nodes
    let particles: Particle[] = [];
    const count = Math.min(Math.floor((width * height) / 18000), 75);

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          size: Math.random() * 1.8 + 0.8,
          alpha: Math.random() * 0.5 + 0.2,
          pulseSpeed: (Math.random() * 0.02 + 0.008) * (Math.random() > 0.5 ? 1 : -1),
        });
      }
    };

    initParticles();

    // Render loop
    let tick = 0;
    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle perspective grid lines at bottom
      const gridY = height * 0.72;
      ctx.strokeStyle = activeColor.primary + '0.04)';
      ctx.lineWidth = 1;

      // Horizontal depth lines
      for (let i = 0; i < 8; i++) {
        const y = gridY + Math.pow(i / 7, 2) * (height - gridY);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Vanishing perspective rays
      const vanishX = width * 0.5;
      const vanishY = gridY - 60;
      for (let x = -width * 0.5; x <= width * 1.5; x += width * 0.08) {
        ctx.beginPath();
        ctx.moveTo(vanishX, vanishY);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // 2. Draw & connect floating cyber constellation particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Pulsing alpha
        p.alpha += p.pulseSpeed;
        if (p.alpha > 0.75 || p.alpha < 0.15) {
          p.pulseSpeed = -p.pulseSpeed;
        }

        // Draw particle node
        ctx.fillStyle = activeColor.primary + p.alpha + ')';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 115) {
            const lineAlpha = (1 - dist / 115) * 0.12;
            ctx.strokeStyle = activeColor.secondary + lineAlpha + ')';
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Interactive mouse connection
        const mdx = p.x - mousePos.current.x;
        const mdy = p.y - mousePos.current.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < 140) {
          const mAlpha = (1 - mdist / 140) * 0.28;
          ctx.strokeStyle = activeColor.accent + mAlpha + ')';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mousePos.current.x, mousePos.current.y);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      style={{ willChange: 'transform' }}
    />
  );
};
