import { useEffect, useRef } from 'react';

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const isTouchRef = useRef(false);

  useEffect(() => {
    isTouchRef.current = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (isTouchRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      for (let i = 0; i < 2; i++) {
        sparklesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 - 0.3,
          life: 0,
          maxLife: 40 + Math.random() * 20,
          size: 1.5 + Math.random() * 2.5,
        });
      }
      if (sparklesRef.current.length > 160) {
        sparklesRef.current.splice(0, sparklesRef.current.length - 160);
      }
    };

    window.addEventListener('mousemove', handleMove);

    let raf: number;
    const colors = ['#ffb3d6', '#f766ab', '#c794ff', '#ffe9b8'];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sparklesRef.current = sparklesRef.current.filter((s) => s.life < s.maxLife);

      sparklesRef.current.forEach((s) => {
        s.life += 1;
        s.x += s.vx;
        s.y += s.vy;
        const t = 1 - s.life / s.maxLife;
        ctx.globalAlpha = Math.max(t, 0);
        ctx.fillStyle = colors[Math.floor(s.life) % colors.length];
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * t, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (isTouchRef.current) return null;

  return (
    <>
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[9998]" />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sakura-300 shadow-glowSm transition-transform duration-75 ease-out"
      />
    </>
  );
}
