import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { SlideWrapper } from '../../components/SlideLayout';
import colors from '../../assets/styles/variables/colors';
import typography from '../../assets/styles/variables/typography';
import Logo from '../../components/Logo';
import Particles from '../../components/Particles';

/* ═══════════════════════════════════════════════════════════════════
   KEYFRAMES
   ═══════════════════════════════════════════════════════════════════ */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;
const fadeLeft = keyframes`
  from { opacity: 0; transform: translateX(-16px); }
  to   { opacity: 1; transform: translateX(0); }
`;
const fadeRight = keyframes`
  from { opacity: 0; transform: translateX(16px); }
  to   { opacity: 1; transform: translateX(0); }
`;
const pulseGlow = keyframes`
  0%, 100% { opacity: 0.35; }
  50%      { opacity: 0.7; }
`;
const rotate = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;
const barFill = keyframes`
  from { width: 0%; }
  to   { width: 78%; }
`;
const countDown = keyframes`
  0%   { stroke-dashoffset: 0; }
  100% { stroke-dashoffset: 88; }
`;
const sweep = keyframes`
  0%   { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;
const flowDot = keyframes`
  0%   { offset-distance: 0%; opacity: 0.9; }
  100% { offset-distance: 100%; opacity: 0.2; }
`;

/* ═══════════════════════════════════════════════════════════════════
   STYLED COMPONENTS
   ═══════════════════════════════════════════════════════════════════ */
const Shell = styled(SlideWrapper)`
  background:
    radial-gradient(ellipse 50% 40% at 15% 12%, rgba(0,200,232,0.06) 0%, transparent 55%),
    radial-gradient(ellipse 45% 40% at 85% 85%, rgba(0,100,180,0.05) 0%, transparent 55%),
    linear-gradient(185deg, #0b1e38 0%, #060f1e 45%, #030810 100%);
  overflow: hidden;
`;

const Grid = styled.div`
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(0,212,255,0.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,212,255,0.018) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(ellipse at 50% 50%, black 40%, transparent 75%);
  opacity: 0.6;
`;

const LogoWrap = styled.div`
  position: absolute; top: 24px; right: 40px; z-index: 20;
  animation: ${fadeIn} 0.8s 0.2s ease both;
`;

const Frame = styled.div`
  position: relative; z-index: 10; width: 100%; height: 100%;
  padding: 24px 40px 20px;
  display: flex; flex-direction: column;
`;

const Header = styled.header`
  margin-bottom: 10px;
  animation: ${fadeLeft} 0.9s 0.3s ease both;
`;

const Title = styled.h1`
  font-family: ${typography.fontDisplay};
  font-weight: ${typography.weightBlack};
  font-size: clamp(1.6rem, 3vw, 2.4rem);
  line-height: 1.15; letter-spacing: -0.02em;
  color: #fff; margin-bottom: 4px;
  .accent {
    background: linear-gradient(90deg, ${colors.cyan} 0%, #38bdf8 100%);
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Subtitle = styled.p`
  font-family: ${typography.fontBody};
  font-size: clamp(0.7rem, 1vw, 0.85rem);
  color: rgba(255,255,255,0.45); font-weight: 300;
`;

const Main = styled.div`
  flex: 1; display: flex; gap: 16px; min-height: 0;
`;

const CardColumn = styled.div`
  width: 240px; flex-shrink: 0;
  display: flex; flex-direction: column; gap: 10px;
  justify-content: center;
`;

const CenterDiagram = styled.div`
  flex: 1; min-width: 0; display: flex;
  align-items: center; justify-content: center;
  animation: ${fadeUp} 1.2s 0.6s ease both;
`;

/* ─── Feature Card ─── */
const Card = styled.div`
  padding: 14px 16px; border-radius: 14px;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(0,200,232,0.1);
  backdrop-filter: blur(12px);
  transition: all 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
  opacity: 0;
  animation: ${({ $dir }) => $dir === 'left' ? fadeLeft : fadeRight}
    0.9s ${({ $delay }) => $delay || '0.5s'} ease both;

  &:hover {
    border-color: rgba(0,200,232,0.35);
    background: rgba(0,200,232,0.04);
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(0,200,232,0.08);
  }
`;

const CardIcon = styled.div`
  width: 28px; height: 28px; border-radius: 8px;
  background: rgba(0,200,232,0.08);
  border: 1px solid rgba(0,200,232,0.2);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; margin-bottom: 8px;
  color: ${colors.cyan};
`;

const CardTitle = styled.h3`
  font-family: ${typography.fontDisplay};
  font-size: 0.78rem; font-weight: 700;
  color: #fff; margin-bottom: 5px; line-height: 1.2;
`;

const CardBullets = styled.div`
  display: flex; flex-direction: column; gap: 3px;
`;

const Bullet = styled.p`
  font-family: ${typography.fontBody};
  font-size: 0.6rem; color: rgba(255,255,255,0.4);
  line-height: 1.45; padding-left: 10px; position: relative;
  &::before {
    content: ''; position: absolute; left: 0; top: 6px;
    width: 4px; height: 4px; border-radius: 50%;
    background: ${({ $color }) => $color || 'rgba(0,200,232,0.5)'};
  }
`;

const CardAnim = styled.div`
  margin-top: 8px; height: ${({ $h }) => $h || '20px'};
  border-radius: 6px; overflow: hidden;
  background: rgba(0,0,0,0.25); position: relative;
`;

/* ═══════════════════════════════════════════════════════════════════
   ARCHITECTURE DIAGRAM CONSTANTS
   ═══════════════════════════════════════════════════════════════════ */
const SVG_W = 520, SVG_H = 420;
const CX = SVG_W / 2, CY = SVG_H / 2;
const RING_R = 120;
const NODE_R = 28;
const NODES = [
  { id: 'N1', angle: -90, color: '#00c8e8' },
  { id: 'N2', angle: -18, color: '#00c8e8' },
  { id: 'N3', angle: 54,  color: '#00c8e8' },
  { id: 'N4', angle: 126, color: '#00c8e8' },
  { id: 'N5', angle: 198, color: '#00c8e8' },
];

function nPos(angle) {
  const r = angle * Math.PI / 180;
  return { x: CX + RING_R * Math.cos(r), y: CY + RING_R * Math.sin(r) };
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
const Slide5 = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => setTick(t => (t + 1) % 60), 800);
    return () => clearInterval(iv);
  }, []);

  /* Quorum write phases */
  const writePhase = tick % 12;
  const quorumAck1 = writePhase >= 3;
  const quorumAck2 = writePhase >= 5;
  const quorumAck3 = writePhase >= 7;
  const quorumDone = writePhase >= 8;

  /* SWIM gossip phase */
  const gossipPhase = tick % 10;

  /* Read repair phase */
  const repairPhase = tick % 14;

  const n = NODES.map(nd => ({ ...nd, ...nPos(nd.angle) }));

  return (
    <Shell>
      <Grid />
      <Particles count={10} />
      <LogoWrap><Logo alt="EPAM" width={220} /></LogoWrap>

      <Frame>
        <Header>
          <Title>
            Core Distributed System <span className="accent">Features</span>
          </Title>
          <Subtitle>Scalable, Fault-Tolerant & Self-Healing Infrastructure</Subtitle>
        </Header>

        <Main>
          {/* ─── LEFT CARDS ─── */}
          <CardColumn>
            {/* Quorum Replication */}
            <Card $dir="left" $delay="0.5s">
              <CardIcon>⚡</CardIcon>
              <CardTitle>Quorum-Based Replication</CardTitle>
              <CardBullets>
                <Bullet $color="#6dd880">RF=3 · W=2 · R=2 majority quorum</Bullet>
                <Bullet $color="#6dd880">Parallel writes with early ACK</Bullet>
                <Bullet $color="#6dd880">503 fallback on quorum failure</Bullet>
              </CardBullets>
              <CardAnim $h="18px">
                <div style={{display:'flex',gap:4,padding:'4px 6px',alignItems:'center'}}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{
                      width:14,height:14,borderRadius:'50%',
                      border:`1.5px solid ${i < 2 ? (quorumDone ? '#6dd880' : (i === 0 && quorumAck1) || (i === 1 && quorumAck2) ? '#6dd880' : 'rgba(255,255,255,0.15)') : quorumAck3 ? '#6dd880' : 'rgba(255,255,255,0.15)'}`,
                      background: i < 2 ? (quorumDone ? 'rgba(109,216,128,0.15)' : 'transparent') : 'transparent',
                      transition:'all 0.5s ease',
                    }} />
                  ))}
                  <span style={{fontSize:'0.5rem',color: quorumDone ? '#6dd880' : 'rgba(255,255,255,0.25)',marginLeft:4,fontWeight:700,transition:'color 0.5s'}}>
                    {quorumDone ? '✓ Quorum' : 'Awaiting…'}
                  </span>
                </div>
              </CardAnim>
            </Card>

            {/* Read Repair */}
            <Card $dir="left" $delay="0.7s">
              <CardIcon>🔄</CardIcon>
              <CardTitle>Read Repair</CardTitle>
              <CardBullets>
                <Bullet $color="#38bdf8">Async stale replica repair</Bullet>
                <Bullet $color="#38bdf8">Background retry queue</Bullet>
                <Bullet $color="#38bdf8">60s dedup window</Bullet>
              </CardBullets>
              <CardAnim $h="18px">
                <div style={{display:'flex',gap:3,padding:'4px 6px',alignItems:'center'}}>
                  <div style={{
                    width:8,height:8,borderRadius:'50%',
                    background: repairPhase >= 4 && repairPhase < 10 ? '#f0a030' : '#38bdf8',
                    boxShadow: repairPhase >= 4 && repairPhase < 10 ? '0 0 6px #f0a030' : 'none',
                    transition:'all 0.6s',
                  }} />
                  <div style={{flex:1,height:3,borderRadius:2,background:'rgba(255,255,255,0.06)',overflow:'hidden'}}>
                    <div style={{
                      height:'100%',borderRadius:2,
                      background: repairPhase >= 10 ? '#6dd880' : '#38bdf8',
                      width: repairPhase < 4 ? '0%' : repairPhase < 10 ? '50%' : '100%',
                      transition:'width 1.5s ease, background 0.5s',
                    }} />
                  </div>
                  <span style={{fontSize:'0.45rem',color: repairPhase >= 10 ? '#6dd880' : 'rgba(255,255,255,0.3)',fontWeight:600,transition:'color 0.5s'}}>
                    {repairPhase >= 10 ? 'synced' : repairPhase >= 4 ? 'repairing' : 'clean'}
                  </span>
                </div>
              </CardAnim>
            </Card>

            {/* LRU Eviction */}
            <Card $dir="left" $delay="0.9s">
              <CardIcon>📦</CardIcon>
              <CardTitle>LRU Eviction</CardTitle>
              <CardBullets>
                <Bullet $color="#e87098">Lock-free hot path</Bullet>
                <Bullet $color="#e87098">Buffered drain · O(1) tracking</Bullet>
                <Bullet $color="#e87098">Memory-pressure triggered</Bullet>
              </CardBullets>
              <CardAnim $h="20px">
                <div style={{padding:'3px 6px'}}>
                  <div style={{display:'flex',justifyContent:'space-between',marginBottom:2}}>
                    <span style={{fontSize:'0.42rem',color:'rgba(255,255,255,0.3)'}}>MEM</span>
                    <span style={{fontSize:'0.42rem',color: tick % 8 > 5 ? '#e87098' : 'rgba(255,255,255,0.3)'}}>
                      {tick % 8 > 5 ? 'evicting…' : `${60 + (tick % 8) * 5}%`}
                    </span>
                  </div>
                  <div style={{height:4,borderRadius:2,background:'rgba(255,255,255,0.06)',overflow:'hidden'}}>
                    <div style={{
                      height:'100%',borderRadius:2,
                      background: tick % 8 > 5 ? 'linear-gradient(90deg,#e87098,#f0a030)' : 'linear-gradient(90deg,#6dd880,#38bdf8)',
                      width: tick % 8 > 5 ? '45%' : `${60 + (tick % 8) * 5}%`,
                      transition:'width 0.7s ease, background 0.5s',
                    }} />
                  </div>
                </div>
              </CardAnim>
            </Card>
          </CardColumn>

          {/* ─── CENTER ARCHITECTURE ─── */}
          <CenterDiagram>
            <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} style={{width:'100%',maxWidth:520,height:'auto'}}>
              <defs>
                <filter id="ng"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                <filter id="sg"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(0,200,232,0.08)" />
                  <stop offset="100%" stopColor="rgba(0,200,232,0)" />
                </radialGradient>
                <linearGradient id="repGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6dd880" stopOpacity="0.7" />
                  <stop offset="100%" stopColor="#6dd880" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Ambient background glow */}
              <circle cx={CX} cy={CY} r={180} fill="url(#coreGlow)" />

              {/* Cluster ring */}
              <circle cx={CX} cy={CY} r={RING_R + 40} fill="none"
                stroke="rgba(0,200,232,0.06)" strokeWidth="1" strokeDasharray="6 4" />
              <circle cx={CX} cy={CY} r={RING_R} fill="none"
                stroke="rgba(0,200,232,0.12)" strokeWidth="1.2" strokeDasharray="4 3" />

              {/* Center label */}
              <text x={CX} y={CY - 8} textAnchor="middle" fill="rgba(0,200,232,0.35)"
                fontSize="7" fontWeight="700" letterSpacing="0.15em">CACHE CLUSTER</text>
              <text x={CX} y={CY + 4} textAnchor="middle" fill="rgba(255,255,255,0.18)"
                fontSize="5.5" letterSpacing="0.08em">5 NODES · RF=3 · SWIM</text>

              {/* Gossip lines between nodes — animated dots */}
              {n.map((a, i) => {
                const b = n[(i + 1) % n.length];
                const active = gossipPhase >= i && gossipPhase < i + 3;
                return (
                  <g key={`g-${i}`}>
                    <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                      stroke="rgba(0,200,232,0.08)" strokeWidth="0.7" strokeDasharray="3 3" />
                    {active && (
                      <circle r={2} fill={colors.cyan} opacity="0.8">
                        <animate attributeName="cx" values={`${a.x};${b.x}`} dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="cy" values={`${a.y};${b.y}`} dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* Cross gossip lines */}
              {[[0,2],[1,3],[2,4]].map(([ai,bi], idx) => {
                const a = n[ai], b = n[bi];
                const active = gossipPhase >= 3 + idx && gossipPhase < 5 + idx;
                return (
                  <g key={`cg-${idx}`}>
                    <line x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                      stroke="rgba(0,200,232,0.05)" strokeWidth="0.5" strokeDasharray="2 4" />
                    {active && (
                      <circle r={1.8} fill={colors.cyan} opacity="0.6">
                        <animate attributeName="cx" values={`${a.x};${b.x}`} dur="2s" repeatCount="indefinite" />
                        <animate attributeName="cy" values={`${a.y};${b.y}`} dur="2s" repeatCount="indefinite" />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* Replication arrows — N1 → N2, N2 → N3 (write flow) */}
              {writePhase >= 1 && writePhase < 10 && (
                <g>
                  {/* Write enters from left to N1 */}
                  <line x1={n[0].x - 60} y1={n[0].y} x2={n[0].x - NODE_R - 4} y2={n[0].y}
                    stroke="#6dd880" strokeWidth="1.2" opacity="0.6" />
                  <polygon points={`${n[0].x - NODE_R - 4},${n[0].y} ${n[0].x - NODE_R - 10},${n[0].y - 3} ${n[0].x - NODE_R - 10},${n[0].y + 3}`}
                    fill="#6dd880" opacity="0.6" />
                  <text x={n[0].x - 48} y={n[0].y - 6} fill="#6dd880" fontSize="5" fontWeight="600" opacity="0.7">WRITE</text>

                  {/* N1 → N2 replication */}
                  {writePhase >= 2 && (
                    <g>
                      <line x1={n[0].x} y1={n[0].y} x2={n[1].x} y2={n[1].y}
                        stroke="#6dd880" strokeWidth="0.8" opacity="0.3" strokeDasharray="4 3" />
                      <circle r={2.5} fill="#6dd880" opacity="0.8">
                        <animate attributeName="cx" values={`${n[0].x};${n[1].x}`} dur="1.2s" repeatCount="indefinite" />
                        <animate attributeName="cy" values={`${n[0].y};${n[1].y}`} dur="1.2s" repeatCount="indefinite" />
                      </circle>
                    </g>
                  )}
                  {/* N1 → N4 replication */}
                  {writePhase >= 2 && (
                    <g>
                      <line x1={n[0].x} y1={n[0].y} x2={n[4].x} y2={n[4].y}
                        stroke="#6dd880" strokeWidth="0.8" opacity="0.3" strokeDasharray="4 3" />
                      <circle r={2.5} fill="#6dd880" opacity="0.8">
                        <animate attributeName="cx" values={`${n[0].x};${n[4].x}`} dur="1.4s" repeatCount="indefinite" />
                        <animate attributeName="cy" values={`${n[0].y};${n[4].y}`} dur="1.4s" repeatCount="indefinite" />
                      </circle>
                    </g>
                  )}
                  {/* N1 → N3 replication */}
                  {writePhase >= 2 && (
                    <g>
                      <line x1={n[0].x} y1={n[0].y} x2={n[2].x} y2={n[2].y}
                        stroke="#6dd880" strokeWidth="0.8" opacity="0.2" strokeDasharray="4 3" />
                      <circle r={2} fill="#6dd880" opacity="0.5">
                        <animate attributeName="cx" values={`${n[0].x};${n[2].x}`} dur="1.6s" repeatCount="indefinite" />
                        <animate attributeName="cy" values={`${n[0].y};${n[2].y}`} dur="1.6s" repeatCount="indefinite" />
                      </circle>
                    </g>
                  )}
                </g>
              )}

              {/* Read repair arrow — N3 stale detection */}
              {repairPhase >= 4 && repairPhase < 12 && (
                <g>
                  <line x1={n[2].x} y1={n[2].y} x2={n[0].x} y2={n[0].y}
                    stroke="#38bdf8" strokeWidth="0.8" opacity="0.4" strokeDasharray="3 3" />
                  <circle r={2} fill="#38bdf8" opacity="0.7">
                    <animate attributeName="cx" values={`${n[0].x};${n[2].x}`} dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="cy" values={`${n[0].y};${n[2].y}`} dur="1.8s" repeatCount="indefinite" />
                  </circle>
                  <text x={(n[0].x + n[2].x) / 2 + 8} y={(n[0].y + n[2].y) / 2}
                    fill="#38bdf8" fontSize="4.5" fontWeight="600" opacity="0.6">REPAIR</text>
                </g>
              )}

              {/* Nodes */}
              {n.map((nd, i) => {
                const isAck = (i === 0 && quorumAck1) || (i === 1 && quorumAck2) || (i === 4 && quorumAck3);
                const isStale = i === 2 && repairPhase >= 4 && repairPhase < 10;
                const nodeStroke = isStale ? '#f0a030' : isAck ? '#6dd880' : nd.color;
                const nodeFill = isStale ? 'rgba(240,160,48,0.08)' : isAck ? 'rgba(109,216,128,0.08)' : 'rgba(0,200,232,0.04)';

                return (
                  <g key={nd.id}>
                    {/* Outer glow */}
                    <circle cx={nd.x} cy={nd.y} r={NODE_R + 6} fill="none"
                      stroke={nodeStroke} strokeWidth="0.6" opacity="0.12" />
                    {/* Quorum ack pulse */}
                    {isAck && (
                      <circle cx={nd.x} cy={nd.y} r={NODE_R + 10} fill="none"
                        stroke="#6dd880" strokeWidth="1" opacity="0">
                        <animate attributeName="r" values={`${NODE_R + 4};${NODE_R + 18}`}
                          dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.5;0"
                          dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    )}
                    {/* Main circle */}
                    <circle cx={nd.x} cy={nd.y} r={NODE_R}
                      fill={nodeFill} stroke={nodeStroke}
                      strokeWidth="1.5" filter="url(#ng)" />
                    {/* Label */}
                    <text x={nd.x} y={nd.y - 3} textAnchor="middle"
                      fill={nodeStroke} fontSize="10" fontWeight="800">{nd.id}</text>
                    {/* Sub-label */}
                    <text x={nd.x} y={nd.y + 8} textAnchor="middle"
                      fill="rgba(255,255,255,0.25)" fontSize="4.5" fontWeight="500">
                      :808{i + 1}
                    </text>

                    {/* WAL indicator — small icon below node */}
                    <g>
                      <rect x={nd.x - 8} y={nd.y + NODE_R + 4} width={16} height={8} rx={2}
                        fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                      <text x={nd.x} y={nd.y + NODE_R + 10} textAnchor="middle"
                        fill="rgba(255,255,255,0.25)" fontSize="3.5" fontWeight="600">WAL</text>
                    </g>

                    {/* TTL badge on one node */}
                    {i === 3 && (
                      <g>
                        <rect x={nd.x + NODE_R + 4} y={nd.y - 6} width={20} height={12} rx={3}
                          fill="rgba(232,168,72,0.1)" stroke="rgba(232,168,72,0.3)" strokeWidth="0.5" />
                        <text x={nd.x + NODE_R + 14} y={nd.y + 2} textAnchor="middle"
                          fill="#e8a848" fontSize="4" fontWeight="700">TTL</text>
                      </g>
                    )}

                    {/* ACK badge */}
                    {isAck && writePhase < 10 && (
                      <g>
                        <rect x={nd.x - 10} y={nd.y - NODE_R - 14} width={20} height={10} rx={3}
                          fill="rgba(109,216,128,0.15)" stroke="rgba(109,216,128,0.4)" strokeWidth="0.5" />
                        <text x={nd.x} y={nd.y - NODE_R - 7} textAnchor="middle"
                          fill="#6dd880" fontSize="4.5" fontWeight="800">ACK</text>
                      </g>
                    )}

                    {/* Stale badge */}
                    {isStale && (
                      <g>
                        <rect x={nd.x - 12} y={nd.y - NODE_R - 14} width={24} height={10} rx={3}
                          fill="rgba(240,160,48,0.15)" stroke="rgba(240,160,48,0.4)" strokeWidth="0.5" />
                        <text x={nd.x} y={nd.y - NODE_R - 7} textAnchor="middle"
                          fill="#f0a030" fontSize="4" fontWeight="800">STALE</text>
                      </g>
                    )}
                  </g>
                );
              })}

              {/* Quorum success indicator */}
              {quorumDone && writePhase < 10 && (
                <g>
                  <rect x={CX - 28} y={CY + 14} width={56} height={14} rx={4}
                    fill="rgba(109,216,128,0.1)" stroke="rgba(109,216,128,0.3)" strokeWidth="0.5" />
                  <text x={CX} y={CY + 24} textAnchor="middle"
                    fill="#6dd880" fontSize="5.5" fontWeight="700">✓ QUORUM</text>
                </g>
              )}

              {/* SWIM labels */}
              <text x={CX} y={CY + RING_R + 55} textAnchor="middle"
                fill="rgba(0,200,232,0.2)" fontSize="5" fontWeight="600" letterSpacing="0.12em">
                GOSSIP · SWIM · REPLICATION · WAL
              </text>
            </svg>
          </CenterDiagram>

          {/* ─── RIGHT CARDS ─── */}
          <CardColumn>
            {/* TTL Expiration */}
            <Card $dir="right" $delay="0.6s">
              <CardIcon>⏱</CardIcon>
              <CardTitle>Bucket-Based TTL</CardTitle>
              <CardBullets>
                <Bullet $color="#e8a848">O(1) expiration buckets</Bullet>
                <Bullet $color="#e8a848">Active + lazy expiration</Bullet>
                <Bullet $color="#e8a848">Custom TTL per key</Bullet>
              </CardBullets>
              <CardAnim $h="20px">
                <div style={{display:'flex',gap:3,padding:'3px 6px',alignItems:'center'}}>
                  {[0,1,2,3].map(i => {
                    const expired = (tick + i * 2) % 10 > 7;
                    return (
                      <div key={i} style={{
                        flex:1,height:10,borderRadius:3,
                        background: expired ? 'rgba(232,168,72,0.05)' : 'rgba(232,168,72,0.12)',
                        border: `1px solid ${expired ? 'rgba(232,168,72,0.1)' : 'rgba(232,168,72,0.3)'}`,
                        opacity: expired ? 0.3 : 1,
                        transition:'all 0.6s ease',
                        display:'flex',alignItems:'center',justifyContent:'center',
                      }}>
                        <span style={{fontSize:'0.35rem',color: expired ? 'rgba(232,168,72,0.3)' : '#e8a848',fontWeight:700}}>
                          {expired ? '—' : `${10 - (tick + i * 2) % 10}s`}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardAnim>
            </Card>

            {/* WAL */}
            <Card $dir="right" $delay="0.8s">
              <CardIcon>💾</CardIcon>
              <CardTitle>Write-Ahead Log</CardTitle>
              <CardBullets>
                <Bullet $color="#a78bfa">Crash recovery support</Bullet>
                <Bullet $color="#a78bfa">Automatic WAL replay</Bullet>
                <Bullet $color="#a78bfa">Persistent per-node logs</Bullet>
              </CardBullets>
              <CardAnim $h="20px">
                <div style={{display:'flex',gap:2,padding:'3px 6px',alignItems:'center'}}>
                  {/* Write flow visualization */}
                  <div style={{display:'flex',alignItems:'center',gap:2,flex:1}}>
                    <div style={{width:6,height:6,borderRadius:2,background:'rgba(167,139,250,0.3)',border:'1px solid rgba(167,139,250,0.5)'}}>
                      <div style={{width:'100%',height:'100%',borderRadius:1,background:'#a78bfa',opacity: writePhase >= 1 && writePhase < 4 ? 0.8 : 0.2,transition:'opacity 0.5s'}}/>
                    </div>
                    <div style={{width:10,height:1,background: writePhase >= 1 && writePhase < 6 ? '#a78bfa' : 'rgba(255,255,255,0.06)',transition:'background 0.5s'}}/>
                    <span style={{fontSize:'0.4rem',color:'rgba(167,139,250,0.5)',fontWeight:600}}>WAL</span>
                    <div style={{width:10,height:1,background: writePhase >= 2 && writePhase < 8 ? '#a78bfa' : 'rgba(255,255,255,0.06)',transition:'background 0.5s'}}/>
                    <span style={{fontSize:'0.4rem',color:'rgba(109,216,128,0.5)',fontWeight:600}}>MEM</span>
                  </div>
                  <span style={{fontSize:'0.42rem',color: writePhase >= 1 && writePhase < 8 ? '#a78bfa' : 'rgba(255,255,255,0.2)',fontWeight:600,transition:'color 0.5s'}}>
                    {writePhase >= 1 && writePhase < 8 ? 'logging…' : 'idle'}
                  </span>
                </div>
              </CardAnim>
            </Card>

            {/* SWIM */}
            <Card $dir="right" $delay="1.0s">
              <CardIcon>🔍</CardIcon>
              <CardTitle>SWIM Protocol</CardTitle>
              <CardBullets>
                <Bullet $color={colors.cyan}>Peer-to-peer failure detection</Bullet>
                <Bullet $color={colors.cyan}>Gossip dissemination O(N)</Bullet>
                <Bullet $color={colors.cyan}>ALIVE → SUSPECT → DEAD</Bullet>
              </CardBullets>
              <CardAnim $h="20px">
                <div style={{display:'flex',gap:3,padding:'3px 6px',alignItems:'center'}}>
                  {['A','B','C','D','E'].map((l,i) => {
                    const isActive = gossipPhase >= i && gossipPhase < i + 3;
                    return (
                      <div key={l} style={{
                        width:14,height:14,borderRadius:'50%',
                        border:`1px solid ${isActive ? colors.cyan : 'rgba(255,255,255,0.1)'}`,
                        background: isActive ? 'rgba(0,200,232,0.1)' : 'transparent',
                        display:'flex',alignItems:'center',justifyContent:'center',
                        transition:'all 0.4s ease',
                        boxShadow: isActive ? `0 0 6px rgba(0,200,232,0.3)` : 'none',
                      }}>
                        <span style={{fontSize:'0.35rem',color: isActive ? colors.cyan : 'rgba(255,255,255,0.2)',fontWeight:700}}>{l}</span>
                      </div>
                    );
                  })}
                  <span style={{fontSize:'0.42rem',color:'rgba(0,200,232,0.4)',marginLeft:2,fontWeight:600}}>gossip</span>
                </div>
              </CardAnim>
            </Card>
          </CardColumn>
        </Main>
      </Frame>
    </Shell>
  );
};

export default Slide5;

