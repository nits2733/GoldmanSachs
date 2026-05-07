import React, { useEffect, useMemo, useRef } from 'react';

/**
 * MinimalParticles
 * Subtle, non-distracting particles (single color family).
 */
const Particles = ({ count = 18 }) => {
  const canvasRef = useRef(null);

  const seeds = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        x: Math.random(),
        y: Math.random(),
        r: 0.9 + Math.random() * 1.6,
        a: 0.10 + Math.random() * 0.20,
        vx: -0.00002 + Math.random() * 0.00004,
        vy: -0.00003 + Math.random() * 0.00006,
      })),
    [count]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      canvas.width = Math.floor(w * ratio);
      canvas.height = Math.floor(h * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const particles = seeds.map((p) => ({ ...p }));
    let raf;

    const loop = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05) p.x = -0.05;
        if (p.y < -0.05) p.y = 1.05;
        if (p.y > 1.05) p.y = -0.05;

        const x = p.x * W;
        const y = p.y * H;

        const halo = ctx.createRadialGradient(x, y, 0, x, y, 14);
        halo.addColorStop(0, `rgba(0,200,232,${p.a})`);
        halo.addColorStop(1, 'rgba(0,200,232,0)');
        ctx.beginPath();
        ctx.arc(x, y, 14, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [seeds]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default Particles;
