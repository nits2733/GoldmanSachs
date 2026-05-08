import React, { useState, useEffect, useRef, useCallback } from 'react';
import Logo from '../../components/Logo';
import Particles from '../../components/Particles';

// ─── Layout ───────────────────────────────────────────────────────────────────
const CX = 260;
const CY = 260;
const RADIUS = 190;
const ARC_R = RADIUS;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// ─── Colors ───────────────────────────────────────────────────────────────────
const CYAN = '#00d4ff';
const AMBER = '#f0a030';
const TEXT = '#ffffff';
const MUTED = 'rgba(255,255,255,0.55)';
const DIM = 'rgba(255,255,255,0.28)';

// Nodes placed clockwise: S1 at 0°, S2 at 120°, S3 at 240°
// Each node OWNS the arc from the PREVIOUS node to itself.
//   S1 owns: 240° → 360°  (the arc before S1)
//   S2 owns: 0°   → 120°  (the arc before S2)
//   S3 owns: 120° → 240°  (the arc before S3)
const SERVERS = [
  { id: 's1', angle: 0,   label: 'S1', name: 'Server 1', color: '#5eb8d8' },
  { id: 's2', angle: 120, label: 'S2', name: 'Server 2', color: '#e87098' },
  { id: 's3', angle: 240, label: 'S3', name: 'Server 3', color: '#e8a848' },
];

// S4 joins at 60° — between S1(0°) and S2(120°)
// S4 takes over keys 0°→60° which were owned by S2.
// Only S2 is affected.
const S4 = { id: 's4', angle: 60, label: 'S4', name: 'Server 4', color: '#6dd880' };

// ─── Helpers ──────────────────────────────────────────────────────────────────
function pos(angle, r = RADIUS) {
  const rad = (angle - 90) * (Math.PI / 180);
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function arcD(a1, a2, r) {
  const sweep = ((a2 - a1) + 360) % 360;
  if (sweep <= 0) return '';
  const p1 = pos(a1, r);
  const p2 = pos(a2, r);
  return `M ${p1.x} ${p1.y} A ${r} ${r} 0 ${sweep > 180 ? 1 : 0} 1 ${p2.x} ${p2.y}`;
}

function midAngle(a1, a2) {
  const sweep = ((a2 - a1) + 360) % 360;
  return (a1 + sweep / 2) % 360;
}

// ─── Component ────────────────────────────────────────────────────────────────
const Slide4 = () => {
  const [phase, setPhase] = useState(0);
  const [paused, setPaused] = useState(false);
  const timersRef = useRef([]);
  const mountedRef = useRef(false);
  const pausedAtRef = useRef(null);
  const remainingRef = useRef([]);

  // Phase schedule: [delay from start, phaseValue]
  // Phases 1-3 (ring, servers, keys) are fast; phases 4+ are original pacing
  const SCHEDULE = [
    [800, 1], [2500, 2], [5000, 3], [12000, 4],
    [22000, 5], [30000, 6], [40000, 7], [48000, 8],
  ];

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const startTimersFromSchedule = useCallback((schedule) => {
    clearTimers();
    const now = Date.now();
    timersRef.current = schedule.map(([delay, p]) =>
      setTimeout(() => setPhase(p), delay)
    );
    pausedAtRef.current = null;
    remainingRef.current = schedule.map(([delay, p]) => ({ end: now + delay, phase: p }));
  }, [clearTimers]);

  // Single mount effect — only runs once
  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    const now = Date.now();
    timersRef.current = SCHEDULE.map(([delay, p]) =>
      setTimeout(() => setPhase(p), delay)
    );
    remainingRef.current = SCHEDULE.map(([delay, p]) => ({ end: now + delay, phase: p }));

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePausePlay = useCallback(() => {
    if (paused) {
      // Resume: schedule remaining timers
      const remaining = remainingRef.current.filter(r => r.phase > phase);
      let acc = 0;
      const newSchedule = remaining.map((r, i) => {
        if (i === 0) { acc = 500; return [500, r.phase]; }
        const gap = remaining[i].end - remaining[i - 1].end;
        acc += gap;
        return [acc, r.phase];
      });
      startTimersFromSchedule(newSchedule);
      setPaused(false);
    } else {
      // Pause: clear all timers, save remaining
      const now = Date.now();
      clearTimers();
      remainingRef.current = remainingRef.current.filter(r => r.phase > phase).map(r => ({ ...r, end: r.end - now + Date.now() }));
      pausedAtRef.current = now;
      setPaused(true);
    }
  }, [paused, phase, startTimersFromSchedule, clearTimers]);

  const handleRestart = useCallback(() => {
    clearTimers();
    setPhase(0);
    setPaused(false);
    setTimeout(() => {
      startTimersFromSchedule(SCHEDULE);
    }, 50);
  }, [clearTimers, startTimersFromSchedule]);

  const showRing    = phase >= 1;
  const showServers = phase >= 2;
  const showKeys    = phase >= 3;
  const s4Joining   = phase >= 4;
  const s4Settled   = phase >= 5;
  const s2Leaving   = phase >= 6;
  const s2Gone      = phase >= 7;
  const summary     = phase >= 8;

  // Stable key for arc config — only changes when arcs actually change
  const arcConfigKey = s2Gone ? 'gone' : s4Joining ? 'joined' : 'initial';

  // Ownership percentages
  // Initial:  S1=33%(240°-360°), S2=33%(0°-120°), S3=33%(120°-240°)
  // +S4:      S1=33%(240°-360°), S4=17%(0°-60°), S2=17%(60°-120°), S3=33%(120°-240°)
  // -S2:      S1=33%(240°-360°), S4=17%(0°-60°), S3=50%(60°-240°)
  const own = s2Gone
    ? { s1: 33, s2: 0, s3: 50, s4: 17 }
    : s4Joining
    ? { s1: 33, s2: 17, s3: 33, s4: 17 }
    : { s1: 33, s2: 33, s3: 33, s4: 0 };

  // Arcs — each arc represents the range a node OWNS (from prev node to itself)
  const arcs = s2Gone
    ? [
        // S1 owns 240°→360°
        { a1: 240, a2: 360, color: SERVERS[0].color, label: 'S1', pct: 33 },
        // S4 owns 0°→60°
        { a1: 0,   a2: 60,  color: S4.color,         label: 'S4', pct: 17 },
        // S3 owns 60°→240° (absorbed S2's old range)
        { a1: 60,  a2: 240, color: SERVERS[2].color, label: 'S3', pct: 50 },
      ]
    : s4Joining
    ? [
        // S1 owns 240°→360°
        { a1: 240, a2: 360, color: SERVERS[0].color, label: 'S1', pct: 33 },
        // S4 owns 0°→60° (taken from S2)
        { a1: 0,   a2: 60,  color: S4.color,         label: 'S4', pct: 17 },
        // S2 now owns 60°→120° (half its original range)
        { a1: 60,  a2: 120, color: SERVERS[1].color, label: 'S2', pct: 17 },
        // S3 owns 120°→240° (unchanged)
        { a1: 120, a2: 240, color: SERVERS[2].color, label: 'S3', pct: 33 },
      ]
    : [
        // S1 owns 240°→360°
        { a1: 240, a2: 360, color: SERVERS[0].color, label: 'S1', pct: 33 },
        // S2 owns 0°→120°
        { a1: 0,   a2: 120, color: SERVERS[1].color, label: 'S2', pct: 33 },
        // S3 owns 120°→240°
        { a1: 120, a2: 240, color: SERVERS[2].color, label: 'S3', pct: 33 },
      ];

  const keyColor = (angle) => {
    for (let i = arcs.length - 1; i >= 0; i--) {
      const a = arcs[i];
      if (a.a2 > 360) { if (angle >= a.a1 || angle < (a.a2 % 360)) return a.color; }
      else if (angle >= a.a1 && angle < a.a2) return a.color;
    }
    return arcs[0].color;
  };

  const statusCard = () => {
    if (phase >= 2 && phase < 4) return {
      border: 'rgba(255,255,255,0.1)', bg: 'rgba(0,0,0,0.25)',
      tag: 'Initial State', tagColor: DIM,
      title: '3 servers on the ring',
      body: 'Each server owns ~33% of the hash space. Each node is responsible for the arc from the previous node to itself (clockwise).',
      metric: null, note: null,
    };
    if (phase >= 4 && phase < 6) return {
      border: `${CYAN}55`, bg: `${CYAN}08`,
      tag: '\uFF0B Node Addition', tagColor: CYAN,
      title: 'S4 joins at 60\u00B0',
      body: `S4 is placed between S1 (0°) and S2 (120°). It takes over the range 0°–60° which was previously owned by S2.`,
      metric: s4Settled ? { moved: 17, stable: 83, color: S4.color } : null,
      note: 'Only S2 loses data to S4. S1 and S3 are completely unaffected.',
    };
    if (phase >= 6 && phase < 8) return {
      border: `${AMBER}55`, bg: `${AMBER}08`,
      tag: '\u26A0 Node Removal', tagColor: AMBER,
      title: 'S2 goes offline',
      body: 'S2\'s range (60°–120°) is absorbed by the next clockwise node — S3. Only S2\'s keys move.',
      metric: s2Gone ? { moved: 17, stable: 83, color: SERVERS[2].color } : null,
      note: 'S1 and S4 are completely unaffected.',
    };
    if (summary) return {
      border: `${CYAN}66`, bg: `${CYAN}0d`,
      tag: null, tagColor: null,
      title: '\u2713 Minimal Disruption',
      body: 'Add or remove servers \u2014 only the next clockwise node\'s data is affected. Everything else stays perfectly stable.',
      metric: null, note: null,
    };
    return null;
  };

  const card = statusCard();

  const activeServers = s2Gone
    ? [SERVERS[0], S4, SERVERS[2]]
    : s4Joining
    ? [SERVERS[0], S4, SERVERS[1], SERVERS[2]]
    : [...SERVERS];

  return (
    <div style={{
      position: 'relative', width: '100vw', minHeight: '100vh', overflow: 'hidden',
      background: 'radial-gradient(ellipse 50% 40% at 20% 15%, rgba(0,212,255,0.05) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 82% 80%, rgba(240,160,48,0.04) 0%, transparent 60%), linear-gradient(185deg, #0b1e38 0%, #060f1e 45%, #030810 100%)',
      color: TEXT, fontFamily: "'Inter','Source Sans Pro','Segoe UI',sans-serif",
    }}>
      <style>{`
        @keyframes ringDraw { from { stroke-dashoffset: ${CIRCUMFERENCE}; } to { stroke-dashoffset: 0; } }
        @keyframes ringGlow { 0%,100% { opacity:0.3; } 50% { opacity:0.55; } }
        @keyframes nodePop { 0% { opacity:0; transform:scale(0); } 70% { transform:scale(1.1); } 100% { opacity:1; transform:scale(1); } }
        @keyframes nodeAdd { 0% { opacity:0; transform:scale(0); } 55% { opacity:1; transform:scale(1.18); } 100% { opacity:1; transform:scale(1); } }
        @keyframes nodeRemove { 0% { opacity:1; transform:scale(1); } 40% { opacity:0.6; transform:scale(0.85); } 100% { opacity:0; transform:scale(0); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(14px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeLeft { from { opacity:0; transform:translateX(-14px); } to { opacity:1; transform:translateX(0); } }
        @keyframes fadeRight { from { opacity:0; transform:translateX(14px); } to { opacity:1; transform:translateX(0); } }
        @keyframes arcReveal { from { stroke-dashoffset: 700; } to { stroke-dashoffset: 0; } }
        @keyframes migPulse { 0%,100% { opacity:0.35; } 50% { opacity:1; } }
        @keyframes slideUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pctPop { 0% { opacity:0; transform:scale(0.5); } 100% { opacity:1; transform:scale(1); } }
        .slide4-paused, .slide4-paused * {
          animation-play-state: paused !important;
        }
      `}</style>

      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0, backgroundImage:'linear-gradient(rgba(0,212,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.018) 1px, transparent 1px)', backgroundSize:'72px 72px', maskImage:'radial-gradient(ellipse at 35% 35%, black 30%, transparent 70%)', opacity:0.7 }} />
      <Particles count={14} />

      <div style={{ position:'absolute', top:28, right:44, zIndex:20, opacity:0, animation:'fadeRight 0.8s 0.3s ease-out both' }}>
        <Logo alt="EPAM" width={220} />
      </div>

      <div className={paused ? 'slide4-paused' : ''} style={{ position:'relative', zIndex:10, maxWidth:1440, margin:'0 auto', padding:'32px 52px 40px', minHeight:'100vh', display:'flex', flexDirection:'column' }}>

        <header style={{ marginBottom:6 }}>
          <h1 style={{ fontFamily:"'Museo Sans','Josefin Sans','Inter',sans-serif", fontSize:'clamp(2rem,3.8vw,3.2rem)', fontWeight:900, letterSpacing:'-0.025em', lineHeight:1.15, marginBottom:6, opacity:0, animation:'fadeLeft 1s 0.5s ease-out both', maxWidth:'calc(100% - 260px)' }}>
            <span style={{ color: TEXT }}>Consistent Hashing</span>
            <span style={{ color:'rgba(255,255,255,0.2)', margin:'0 12px', fontWeight:300 }}>+</span>
            <span style={{ background:`linear-gradient(90deg, ${CYAN} 0%, #38bdf8 100%)`, WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent' }}>Rebalancing</span>
          </h1>
          <p style={{ fontSize:'clamp(0.85rem,1.2vw,1.05rem)', color:MUTED, maxWidth:700, lineHeight:1.6, opacity:0, animation:'fadeLeft 1s 0.9s ease-out both' }}>
            Add or remove servers without reshuffling everything — only the next clockwise node is affected.
          </p>
          <div style={{ display:'flex', gap:10, marginTop:14, opacity:0, animation:'fadeIn 1s 1.2s ease-out both' }}>
            <button onClick={handlePausePlay} style={{
              padding:'8px 18px', borderRadius:8,
              border:`1px solid ${paused ? 'rgba(0,212,255,0.5)' : 'rgba(255,255,255,0.2)'}`,
              background: paused ? 'rgba(0,212,255,0.1)' : 'rgba(255,255,255,0.05)',
              color: paused ? CYAN : 'rgba(255,255,255,0.7)',
              fontSize:12, fontWeight:600, cursor:'pointer',
              transition:'all 0.3s ease',
              animationPlayState: 'running',
            }}>
              {paused ? '▶ Play' : '⏸ Pause'}
            </button>
            <button onClick={handleRestart} style={{
              padding:'8px 18px', borderRadius:8,
              border:'1px solid rgba(255,255,255,0.15)',
              background:'rgba(255,255,255,0.05)',
              color:'rgba(255,255,255,0.7)',
              fontSize:12, fontWeight:600, cursor:'pointer',
              transition:'all 0.3s ease',
              animationPlayState: 'running',
            }}>
              ↻ Restart
            </button>
          </div>
        </header>

        <section style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', marginTop:4 }}>
          <div style={{ display:'flex', alignItems:'flex-start', gap:44 }}>

            <div style={{ width:520, height:520, flexShrink:0, position:'relative' }}>
              <svg viewBox="0 0 520 520" width="520" height="520">
                <defs>
                  <filter id="nodeGlow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                </defs>

                {showRing && (
                  <circle cx={CX} cy={CY} r={RADIUS} fill="none" stroke={CYAN} strokeWidth="1.8" opacity="0.35"
                    strokeDasharray={CIRCUMFERENCE} strokeDashoffset={CIRCUMFERENCE}
                    style={{ animation:'ringDraw 2s 0.2s ease-out forwards' }} />
                )}

                {showRing && Array.from({ length: 12 }, (_, i) => {
                  const a = i * 30;
                  const inner = pos(a, RADIUS - 3);
                  const outer = pos(a, RADIUS + 3);
                  return <line key={`t${i}`} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke={CYAN} strokeWidth="0.6" opacity="0" style={{ animation:`fadeIn 0.4s ${0.8 + i * 0.06}s ease-out forwards` }} />;
                })}

                {showServers && arcs.map((arc, i) => (
                  <path key={`arc-${arc.a1}-${arc.a2}-${arcConfigKey}`} d={arcD(arc.a1, arc.a2, ARC_R)} fill="none"
                    stroke={arc.color} strokeWidth="16" opacity="0.18" strokeLinecap="round"
                    strokeDasharray="700" strokeDashoffset="700"
                    style={{ animation:`arcReveal 1.5s ${0.2 + i * 0.25}s ease-out forwards` }} />
                ))}

                {showServers && arcs.map((arc, i) => {
                  const mid = midAngle(arc.a1, arc.a2);
                  const p = pos(mid, RADIUS - 42);
                  return (
                    <g key={`pct-${arc.a1}-${arc.a2}-${arcConfigKey}`} style={{ opacity:0, animation:`pctPop 0.6s ${1 + i * 0.3}s ease-out forwards` }}>
                      <text x={p.x} y={p.y + 4} textAnchor="middle" fill={arc.color} fontSize="11" fontWeight="700" opacity="0.75">
                        {arc.pct}%
                      </text>
                    </g>
                  );
                })}

                {showRing && (
                  <g style={{ opacity:0, animation:'fadeIn 1.5s 2s ease-out forwards' }}>
                    <text x={CX} y={CY - 6} textAnchor="middle" fill={CYAN} fontSize="10" opacity="0.45" letterSpacing="0.08em">{'\u21BB'} clockwise</text>
                    <text x={CX} y={CY + 10} textAnchor="middle" fill={DIM} fontSize="8.5">hash space 0°–360°</text>
                  </g>
                )}

                {showKeys && Array.from({ length: 12 }, (_, i) => {
                  const angle = i * 30 + 15;
                  const p = pos(angle, RADIUS);
                  const col = keyColor(angle);
                  return (
                    <g key={`key-${i}`} style={{ opacity:0, animation:`fadeIn 0.8s ${0.5 + i * 0.15}s ease-out forwards` }}>
                      <circle cx={p.x} cy={p.y} r="4" fill={col} opacity="0.9" />
                      <circle cx={p.x} cy={p.y} r="7" fill="none" stroke={col} strokeWidth="0.7" opacity="0.3" />
                    </g>
                  );
                })}

                {/* Migration: S2 → S4 (keys in range 0°-60° move from S2 to S4) */}
                {(phase === 4) && [5, 15, 25, 35, 45, 55].map((a, i) => {
                  const p = pos(a, RADIUS + 20);
                  return <circle key={`m1-${i}`} cx={p.x} cy={p.y} r="4.5" fill={S4.color}
                    style={{ animation:`migPulse 3s ${i * 0.5}s ease-in-out infinite` }} />;
                })}
                {phase === 4 && (
                  <g style={{ opacity:0, animation:'fadeIn 2s 2s ease-out forwards' }}>
                    <text x={CX} y={CY + 48} textAnchor="middle" fill={S4.color} fontSize="9.5" fontWeight="600" opacity="0.85">
                      S2 → S4 · migrating 17% of data
                    </text>
                  </g>
                )}

                {/* Migration: S2 → S3 (keys in range 60°-120° move from S2 to S3) */}
                {(phase === 6) && [65, 75, 85, 95, 105, 115].map((a, i) => {
                  const p = pos(a, RADIUS + 20);
                  return <circle key={`m2-${i}`} cx={p.x} cy={p.y} r="4.5" fill={SERVERS[2].color}
                    style={{ animation:`migPulse 3s ${i * 0.45}s ease-in-out infinite` }} />;
                })}
                {phase === 6 && (
                  <g style={{ opacity:0, animation:'fadeIn 2s 2s ease-out forwards' }}>
                    <text x={CX} y={CY + 48} textAnchor="middle" fill={SERVERS[2].color} fontSize="9.5" fontWeight="600" opacity="0.85">
                      S2 → S3 · redistributing 17%
                    </text>
                  </g>
                )}

                {showServers && SERVERS.map((s, idx) => {
                  const p = pos(s.angle);
                  const removing = s2Leaving && s.id === 's2';
                  const gone = s2Gone && s.id === 's2';
                  if (gone) return null;
                  return (
                    <g key={s.id} style={{
                      animation: removing
                        ? 'nodeRemove 5s ease-in forwards'
                        : `nodePop 1.2s ${0.3 + idx * 0.5}s ease-out both`,
                      transformOrigin: `${p.x}px ${p.y}px`,
                      opacity: removing ? undefined : 0,
                    }}>
                      <circle cx={p.x} cy={p.y} r="30" fill="none" stroke={s.color} strokeWidth="1.2" opacity="0.25" />
                      <circle cx={p.x} cy={p.y} r="24" fill={`${s.color}18`} stroke={s.color} strokeWidth="2" filter="url(#nodeGlow)" />
                      <circle cx={p.x} cy={p.y} r="14" fill={s.color} opacity="0.88" />
                      <text x={p.x} y={p.y + 4.5} textAnchor="middle" fill="#1a1a2e" fontSize="11" fontWeight="800">{s.label}</text>
                      <text x={p.x} y={p.y + 44} textAnchor="middle" fill={s.color} fontSize="9" fontWeight="600" opacity="0.75">{s.name}</text>
                    </g>
                  );
                })}

                {s4Joining && (() => {
                  const p = pos(S4.angle);
                  return (
                    <g style={{ animation:'nodeAdd 3.5s ease-out forwards', transformOrigin:`${p.x}px ${p.y}px` }}>
                      <circle cx={p.x} cy={p.y} r="30" fill="none" stroke={S4.color} strokeWidth="1.2" opacity="0.25" />
                      <circle cx={p.x} cy={p.y} r="24" fill={`${S4.color}18`} stroke={S4.color} strokeWidth="2" filter="url(#nodeGlow)" />
                      <circle cx={p.x} cy={p.y} r="14" fill={S4.color} opacity="0.88" />
                      <text x={p.x} y={p.y + 4.5} textAnchor="middle" fill="#1a1a2e" fontSize="11" fontWeight="800">{S4.label}</text>
                      <text x={p.x} y={p.y + 44} textAnchor="middle" fill={S4.color} fontSize="9" fontWeight="600" opacity="0.75">{S4.name}</text>
                    </g>
                  );
                })()}
              </svg>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:14, width:320, flexShrink:0 }}>

              {card && (
                <div key={`card-${phase}`} style={{
                  padding:'18px 20px', borderRadius:12,
                  border:`1px solid ${card.border}`,
                  background: card.bg,
                  backdropFilter:'blur(6px)',
                  opacity:0, animation:'slideUp 1.5s ease-out forwards',
                }}>
                  {card.tag && (
                    <p style={{ fontSize:9, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.16em', color:card.tagColor, marginBottom:8 }}>{card.tag}</p>
                  )}
                  <p style={{ fontSize:15, color:TEXT, fontWeight:700, marginBottom:6, lineHeight:1.3 }}>{card.title}</p>
                  <p style={{ fontSize:11, color:MUTED, lineHeight:1.7 }}>{card.body}</p>
                  {card.note && <p style={{ fontSize:10, color:DIM, marginTop:6, fontStyle:'italic' }}>{card.note}</p>}
                  {card.metric && (
                    <div style={{ marginTop:12, padding:'8px 14px', borderRadius:8, background:'rgba(0,0,0,0.3)', border:`1px solid ${card.metric.color}25`, display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ width:8, height:8, borderRadius:'50%', background:card.metric.color, boxShadow:`0 0 8px ${card.metric.color}` }} />
                      <span style={{ fontSize:12, fontWeight:700, color:card.metric.color }}>{card.metric.moved}% migrated</span>
                      <span style={{ fontSize:11, color:MUTED }}>{'\u00B7'} {card.metric.stable}% stable</span>
                    </div>
                  )}
                </div>
              )}

              {showServers && (
                <div style={{
                  padding:'16px 18px', borderRadius:12,
                  border:'1px solid rgba(255,255,255,0.06)',
                  background:'rgba(0,0,0,0.2)',
                  backdropFilter:'blur(4px)',
                  opacity:0, animation:'fadeIn 1.5s 1.5s ease-out forwards',
                }}>
                  <p style={{ fontSize:8.5, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.16em', color:DIM, marginBottom:12 }}>Data Ownership</p>
                  {activeServers.map((s) => {
                    const pct = s.id === 's4' ? own.s4 : own[s.id];
                    const fading = s2Leaving && !s2Gone && s.id === 's2';
                    return (
                      <div key={s.id} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:7, opacity: fading ? 0.3 : 1, transition:'opacity 2s ease' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:9 }}>
                          <div style={{ width:10, height:10, borderRadius:'50%', background:s.color, boxShadow:`0 0 5px ${s.color}40` }} />
                          <span style={{ fontSize:10.5, color:MUTED, fontWeight:500 }}>{s.name}</span>
                        </div>
                        <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                          <div style={{ width:60, height:5, borderRadius:3, background:'rgba(255,255,255,0.06)', overflow:'hidden' }}>
                            <div style={{ width:`${pct}%`, height:'100%', borderRadius:3, background:s.color, transition:'width 2.5s ease', opacity:0.7 }} />
                          </div>
                          <span style={{ fontSize:11, fontWeight:700, color:s.color, minWidth:28, textAlign:'right' }}>{pct}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {showKeys && (
                <div style={{
                  padding:'14px 18px', borderRadius:10,
                  borderTop:`2px solid ${CYAN}30`,
                  background:'rgba(0,0,0,0.25)',
                  opacity:0, animation:'fadeIn 1.5s 1s ease-out forwards',
                }}>
                  <p style={{ fontSize:8, fontWeight:700, textTransform:'uppercase', letterSpacing:'0.14em', color:DIM, marginBottom:8 }}>Why This Matters</p>
                  <div style={{ display:'flex', gap:12, alignItems:'stretch' }}>
                    <div style={{ flex:1, padding:'8px 10px', borderRadius:6, background:'rgba(240,160,48,0.06)', border:'1px solid rgba(240,160,48,0.15)' }}>
                      <code style={{ fontSize:9, color:AMBER, fontWeight:600 }}>hash % N</code>
                      <p style={{ fontSize:9.5, color:MUTED, marginTop:3, lineHeight:1.4 }}>100% keys reshuffle</p>
                    </div>
                    <div style={{ flex:1, padding:'8px 10px', borderRadius:6, background:`${CYAN}06`, border:`1px solid ${CYAN}18` }}>
                      <code style={{ fontSize:9, color:CYAN, fontWeight:600 }}>hash ring</code>
                      <p style={{ fontSize:9.5, color:MUTED, marginTop:3, lineHeight:1.4 }}>Only K/N keys move</p>
                    </div>
                  </div>
                </div>
              )}

              {showKeys && (
                <div style={{ display:'flex', gap:14, flexWrap:'wrap', opacity:0, animation:'fadeIn 1.5s 2s ease-out forwards' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <div style={{ width:7, height:7, borderRadius:'50%', background:'white', border:'1.5px solid rgba(255,255,255,0.4)' }} />
                    <span style={{ fontSize:8.5, color:DIM }}>Data key</span>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <div style={{ width:14, height:4, borderRadius:2, background:`linear-gradient(90deg, ${CYAN}50, ${CYAN}00)` }} />
                    <span style={{ fontSize:8.5, color:DIM }}>Hash range</span>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:5 }}>
                    <div style={{ width:7, height:7, borderRadius:'50%', background:S4.color, opacity:0.7 }} />
                    <span style={{ fontSize:8.5, color:DIM }}>Migration</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Slide4;

