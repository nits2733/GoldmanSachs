import React, { useEffect, useRef } from 'react';

/**
 * ArchitectureDiagram
 * Canvas-based animated architecture showing:
 * - User Applications → Load Balancer → Cache Cluster (5 nodes in circle)
 * - Service Registry & Mosquitto MQTT
 * - Particles travelling along connection lines
 */
const ArchitectureDiagram = () => {
  const canvasRef = useRef(null);

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

    // Box positions (as % of canvas)
    const boxes = {
      userApps: { x: 0.08, y: 0.50, w: 160, h: 90, label: 'User Applications', sublabel: 'HTTP REST' },
      loadBalancer: { x: 0.28, y: 0.50, w: 180, h: 140, label: 'Load Balancer(s)', sublabel: ':8080', color: '#2563A8' },
      serviceRegistry: { x: 0.78, y: 0.22, w: 180, h: 70, label: 'Service Registry', sublabel: ':8500', color: '#1E7E5E' },
      mosquitto: { x: 0.78, y: 0.70, w: 180, h: 70, label: 'Mosquitto MQTT', sublabel: ':1883', color: '#1E7E5E' },
    };

    // Cache cluster circle (5 nodes)
    const clusterCenter = { x: 0.53, y: 0.45 };
    const clusterRadius = 0.12;
    const nodeCount = 5;
    const nodes = Array.from({ length: nodeCount }).map((_, i) => {
      const angle = (i / nodeCount) * Math.PI * 2 - Math.PI / 2;
      return {
        x: clusterCenter.x + Math.cos(angle) * clusterRadius,
        y: clusterCenter.y + Math.sin(angle) * clusterRadius,
        label: `Node ${i + 1}`,
        port: `:808${i + 1}`,
      };
    });

    // Connections (paths for particles to travel)
    const connections = [
      // User Apps → Load Balancer
      { from: 'userApps', to: 'loadBalancer', type: 'http', color: '#60A5FA' },
      // Load Balancer → Each cache node (3 lines)
      { from: 'loadBalancer', to: 'node0', type: 'http', color: '#60A5FA' },
      { from: 'loadBalancer', to: 'node2', type: 'http', color: '#60A5FA' },
      { from: 'loadBalancer', to: 'node4', type: 'http', color: '#60A5FA' },
      // Cluster → Service Registry (top arc)
      { from: 'node0', to: 'serviceRegistry', type: 'mqtt', color: '#34D399' },
      // Cluster → Mosquitto (bottom arc)
      { from: 'node3', to: 'mosquitto', type: 'mqtt', color: '#34D399' },
      // Gossip within cluster (yellow dashed circle)
      { from: 'gossip', to: 'gossip', type: 'gossip', color: '#FBBF24' },
    ];

    // Travelling particles (one per connection path)
    const particles = connections.map(() => ({
      t: Math.random(),
      speed: 0.003 + Math.random() * 0.004,
    }));

    const draw = () => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;

      ctx.clearRect(0, 0, W, H);

      // Helper: draw box
      const drawBox = (box, color = 'rgba(100,100,100,0.3)') => {
        const x = box.x * W - box.w / 2;
        const y = box.y * H - box.h / 2;

        ctx.fillStyle = color;
        ctx.strokeStyle = 'rgba(0,200,232,0.25)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(x, y, box.w, box.h, 6);
        ctx.fill();
        ctx.stroke();

        // Label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 15px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(box.label, box.x * W, box.y * H - 8);

        ctx.fillStyle = 'rgba(255,255,255,0.55)';
        ctx.font = '12px sans-serif';
        ctx.fillText(box.sublabel, box.x * W, box.y * H + 12);
      };

      // Draw boxes
      drawBox(boxes.userApps);
      drawBox(boxes.loadBalancer, boxes.loadBalancer.color);
      drawBox(boxes.serviceRegistry, boxes.serviceRegistry.color);
      drawBox(boxes.mosquitto, boxes.mosquitto.color);

      // Draw cache cluster label + dashed circle
      ctx.strokeStyle = '#FBBF24';
      ctx.setLineDash([6, 4]);
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(clusterCenter.x * W, clusterCenter.y * H, clusterRadius * W, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#FBBF24';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('CACHE CLUSTER', clusterCenter.x * W, (clusterCenter.y - clusterRadius - 0.03) * H);

      // Draw cache nodes
      nodes.forEach((node, i) => {
        const nx = node.x * W;
        const ny = node.y * H;

        // Node circle
        const grd = ctx.createRadialGradient(nx, ny, 0, nx, ny, 32);
        grd.addColorStop(0, 'rgba(0,200,232,0.25)');
        grd.addColorStop(1, 'rgba(0,200,232,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(nx, ny, 32, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#1E3A5F';
        ctx.strokeStyle = 'rgba(0,200,232,0.5)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(nx, ny, 28, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Label
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, nx, ny - 2);
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '10px sans-serif';
        ctx.fillText(node.port, nx, ny + 12);
      });

      // Draw connection lines
      const getPos = (key) => {
        if (key.startsWith('node')) {
          const idx = parseInt(key.replace('node', ''));
          return { x: nodes[idx].x * W, y: nodes[idx].y * H };
        }
        if (key === 'gossip') return { x: clusterCenter.x * W, y: clusterCenter.y * H };
        const box = boxes[key];
        return { x: box.x * W, y: box.y * H };
      };

      connections.forEach((conn, idx) => {
        if (conn.type === 'gossip') return; // already drawn as dashed circle

        const p1 = getPos(conn.from);
        const p2 = getPos(conn.to);

        ctx.strokeStyle = conn.color + '40';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        // Travelling particle
        const part = particles[idx];
        part.t += part.speed;
        if (part.t > 1) part.t = 0;

        const px = p1.x + (p2.x - p1.x) * part.t;
        const py = p1.y + (p2.y - p1.y) * part.t;

        ctx.fillStyle = conn.color;
        ctx.shadowColor = conn.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Gossip particles (travel along circle)
      const gossipParticles = 8;
      for (let i = 0; i < gossipParticles; i++) {
        const angle = ((Date.now() / 3000 + i / gossipParticles) % 1) * Math.PI * 2;
        const gx = clusterCenter.x * W + Math.cos(angle) * clusterRadius * W;
        const gy = clusterCenter.y * H + Math.sin(angle) * clusterRadius * W;

        ctx.fillStyle = '#FBBF24';
        ctx.shadowColor = '#FBBF24';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(gx, gy, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      requestAnimationFrame(draw);
    };

    const raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    />
  );
};

export default ArchitectureDiagram;
