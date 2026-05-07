import React, { useEffect, useMemo, useRef } from 'react';

/**
 * NetworkGraph (16:9 slide bottom visualization)
 * - Thin glowing links
 * - Cyan/blue nodes with subtle pulsing
 * - Heartbeat line with slow travelling highlight
 * - Lightweight, no deps
 */
const NetworkGraph = ({ height = '52%' }) => {
  const canvasRef = useRef(null);

  const nodesPct = useMemo(
    () => [
      { x: 0.16, y: 0.55 },
      { x: 0.27, y: 0.30 },
      { x: 0.30, y: 0.68 },
      { x: 0.40, y: 0.40 },
      { x: 0.50, y: 0.56 }, // hub
      { x: 0.60, y: 0.38 },
      { x: 0.66, y: 0.70 },
      { x: 0.74, y: 0.28 },
      { x: 0.86, y: 0.52 },
    ],
    []
  );

  const edges = useMemo(
    () => [
      [0, 1], [0, 2],
      [1, 3], [2, 3],
      [3, 4],
      [4, 5], [4, 6],
      [5, 7], [6, 8],
      [7, 8],
    ],
    []
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

    const hubIndex = 4;
    const pulseOffsets = nodesPct.map(() => Math.random() * 1000);

    const heartbeatBase = (W, baseY) => [
      { x: 0, y: baseY },
      { x: W * 0.18, y: baseY },
      { x: W * 0.20, y: baseY - 18 },
      { x: W * 0.215, y: baseY + 14 },
      { x: W * 0.235, y: baseY - 28 },
      { x: W * 0.255, y: baseY + 10 },
      { x: W * 0.275, y: baseY },
      { x: W, y: baseY },
    ];

    const draw = (t) => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;

      ctx.clearRect(0, 0, W, H);

      // node coords
      const nodes = nodesPct.map((p) => ({ x: p.x * W, y: p.y * H }));

      // edges
      ctx.save();
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(0,200,232,0.30)';
      ctx.shadowColor = 'rgba(0,200,232,0.35)';
      ctx.shadowBlur = 6;
      edges.forEach(([a, b]) => {
        ctx.beginPath();
        ctx.moveTo(nodes[a].x, nodes[a].y);
        ctx.lineTo(nodes[b].x, nodes[b].y);
        ctx.stroke();
      });
      ctx.restore();

      // nodes
      nodes.forEach((n, i) => {
        const isHub = i === hubIndex;
        const pulse = 0.75 + 0.25 * Math.sin((t + pulseOffsets[i]) / 900);
        const r = isHub ? 7 : 5;
        const haloR = isHub ? 26 : 18;

        // halo
        const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, haloR);
        halo.addColorStop(0, `rgba(0,229,255,${0.22 * pulse})`);
        halo.addColorStop(1, 'rgba(0,229,255,0)');
        ctx.beginPath();
        ctx.arc(n.x, n.y, haloR, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        if (isHub) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 16, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0,200,232,${0.35 * pulse})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // core
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,200,232,${0.95 * pulse})`;
        ctx.shadowColor = 'rgba(0,229,255,0.85)';
        ctx.shadowBlur = 14;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // heartbeat line
      const baseY = H * 0.92;
      const pts = heartbeatBase(W, baseY);
      const progress = ((t / 1000) % 6) / 6; // slow travel
      const headX = progress * W;

      // baseline
      ctx.beginPath();
      ctx.moveTo(0, baseY);
      ctx.lineTo(W, baseY);
      ctx.strokeStyle = 'rgba(0,200,232,0.20)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // glow segment up to head
      ctx.save();
      ctx.beginPath();
      pts.forEach((p, idx) => {
        if (p.x > headX) return;
        if (idx === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      if (headX > pts[pts.length - 2].x) ctx.lineTo(headX, baseY);
      ctx.strokeStyle = 'rgba(0,229,255,0.95)';
      ctx.lineWidth = 1.7;
      ctx.shadowColor = 'rgba(0,229,255,0.9)';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.restore();

      // head dot
      ctx.beginPath();
      ctx.arc(headX, baseY, 2.8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,229,255,1)';
      ctx.shadowColor = 'rgba(0,229,255,1)';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      requestAnimationFrame(draw);
    };

    const raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [edges, nodesPct]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        height,
        zIndex: 2,
        pointerEvents: 'none',
      }}
    />
  );
};

export default NetworkGraph;
