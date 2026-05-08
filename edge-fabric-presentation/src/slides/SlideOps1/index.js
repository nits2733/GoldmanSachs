import React from 'react';
import styled, { keyframes } from 'styled-components';
import { SlideWrapper } from '../../components/SlideLayout';
import colors from '../../assets/styles/variables/colors';
import typography from '../../assets/styles/variables/typography';
import Logo from '../../components/Logo';
import Particles from '../../components/Particles';

const fadeIn = keyframes`from{opacity:0}to{opacity:1}`;
const fadeLeft = keyframes`from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}`;
const fadeUp = keyframes`from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}`;

const Shell = styled(SlideWrapper)`
  background:
    radial-gradient(ellipse 50% 40% at 15% 12%, rgba(0,200,232,0.06) 0%, transparent 55%),
    radial-gradient(ellipse 45% 40% at 85% 85%, rgba(240,160,48,0.04) 0%, transparent 55%),
    linear-gradient(185deg, #0b1e38 0%, #060f1e 45%, #030810 100%);
  overflow: hidden;
`;
const Grid = styled.div`
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background-image: linear-gradient(rgba(0,212,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.018) 1px, transparent 1px);
  background-size: 72px 72px; mask-image: radial-gradient(ellipse at 50% 50%, black 40%, transparent 75%); opacity: 0.6;
`;
const LogoWrap = styled.div`position: absolute; top: 24px; right: 40px; z-index: 20; animation: ${fadeIn} 0.8s 0.2s ease both;`;
const Frame = styled.div`position: relative; z-index: 10; width: 100%; height: 100%; padding: 24px 44px 20px; display: flex; flex-direction: column;`;
const Eyebrow = styled.div`font-family: ${typography.fontBody}; font-size: ${typography.size.xs}; font-weight: ${typography.weightSemibold}; letter-spacing: 0.28em; text-transform: uppercase; color: ${colors.cyan}; margin-bottom: 6px; animation: ${fadeLeft} 0.9s 0.2s ease both;`;
const Title = styled.h1`
  font-family: ${typography.fontDisplay}; font-weight: ${typography.weightBlack};
  font-size: clamp(1.4rem, 2.6vw, 2rem); line-height: 1.15; letter-spacing: -0.02em;
  color: #fff; margin-bottom: 4px; animation: ${fadeLeft} 0.9s 0.3s ease both;
  max-width: calc(100% - 260px);
  .accent { background: linear-gradient(90deg, ${colors.cyan} 0%, #38bdf8 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
`;
const Sub = styled.p`font-family: ${typography.fontBody}; font-size: clamp(0.68rem, 0.9vw, 0.8rem); color: rgba(255,255,255,0.4); font-weight: 300; margin-bottom: 10px; animation: ${fadeLeft} 0.9s 0.5s ease both;`;
const DiagramWrap = styled.div`flex: 1; display: flex; align-items: center; justify-content: center; animation: ${fadeUp} 1.2s 0.5s ease both; min-height: 0;`;

const W = 820, H = 400;
const GREEN = '#6dd880', AMBER = '#f0a030', RED = '#ef4444', CYAN = '#00d4ff', MUTED = 'rgba(255,255,255,0.4)';

export default function SlideOps1() {
  return (
    <Shell>
      <Grid /><Particles count={10} />
      <LogoWrap><Logo alt="EPAM" width={220} /></LogoWrap>
      <Frame>
        <Eyebrow>Agentic Ops · The Problem</Eyebrow>
        <Title>Operating a Distributed Cache is a <span className="accent">Manual, Reactive Battle</span></Title>
        <Sub>3 cache nodes · Quorum 2-of-3 · SWIM failure detection · Human response too slow</Sub>
        <DiagramWrap>
          <svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%',maxHeight:'100%',height:'auto'}}>
            <defs>
              <filter id="g1"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <linearGradient id="dangerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={GREEN} stopOpacity="0.8"/>
                <stop offset="50%" stopColor={AMBER} stopOpacity="0.8"/>
                <stop offset="100%" stopColor={RED} stopOpacity="0.8"/>
              </linearGradient>
            </defs>

            {/* ── 3 Cache Nodes ── */}
            {[
              { x: 80, y: 100, label: 'Node 1', status: 'ALIVE', color: GREEN },
              { x: 80, y: 200, label: 'Node 2', status: 'ALIVE', color: GREEN },
              { x: 80, y: 300, label: 'Node 3', status: 'SUSPECT', color: AMBER },
            ].map((n, i) => (
              <g key={i}>
                <circle cx={n.x} cy={n.y} r={30} fill={`${n.color}10`} stroke={n.color} strokeWidth="1.5" filter="url(#g1)" />
                {n.status === 'SUSPECT' && (
                  <circle cx={n.x} cy={n.y} r={36} fill="none" stroke={AMBER} strokeWidth="1" opacity="0.4">
                    <animate attributeName="r" values="32;40;32" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                <text x={n.x} y={n.y - 3} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">{n.label}</text>
                <text x={n.x} y={n.y + 8} textAnchor="middle" fill={n.color} fontSize="6.5" fontWeight="600">{n.status}</text>
                {i < 2 && <line x1={n.x} y1={n.y + 30} x2={80} y2={n.y + 70} stroke="rgba(0,200,232,0.08)" strokeWidth="0.7" strokeDasharray="3 3" />}
              </g>
            ))}
            <rect x={40} y={48} width={80} height={16} rx={4} fill="rgba(0,0,0,0.3)" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            <text x={80} y={59} textAnchor="middle" fill={MUTED} fontSize="6" fontWeight="600" letterSpacing="0.08em">CACHE CLUSTER</text>
            <rect x={40} y={340} width={80} height={14} rx={3} fill="rgba(0,200,232,0.06)" stroke="rgba(0,200,232,0.15)" strokeWidth="0.5" />
            <text x={80} y={350} textAnchor="middle" fill={CYAN} fontSize="5.5" fontWeight="600">Quorum: 2 of 3</text>

            {/* ── Timeline Arrow (top) ── */}
            <rect x={180} y={55} width={430} height={6} rx={3} fill="url(#dangerGrad)" opacity="0.25" />
            {[
              { x: 180, label: '0 min', sub: 'Normal', color: GREEN },
              { x: 310, label: 'SUSPECT', sub: 'Node isolating', color: AMBER },
              { x: 440, label: '~4 min DEAD', sub: 'Quorum at risk', color: RED },
              { x: 570, label: 'OUTAGE', sub: 'Quorum lost', color: RED },
            ].map((t, i) => (
              <g key={i}>
                <line x1={t.x} y1={50} x2={t.x} y2={67} stroke={t.color} strokeWidth="1" />
                <text x={t.x} y={78} textAnchor="middle" fill={t.color} fontSize="7" fontWeight="700">{t.label}</text>
                <text x={t.x} y={88} textAnchor="middle" fill={MUTED} fontSize="5.5">{t.sub}</text>
              </g>
            ))}

            {/* ── Manual Loop Box ── */}
            <rect x={180} y={110} width={200} height={155} rx={10} fill="rgba(239,68,68,0.04)" stroke="rgba(239,68,68,0.18)" strokeWidth="1" />
            <text x={280} y={128} textAnchor="middle" fill={RED} fontSize="7.5" fontWeight="700" letterSpacing="0.06em">TODAY — MANUAL OPS</text>
            {[
              { y: 148, icon: '🚨', label: 'Alert fires AFTER breach' },
              { y: 170, icon: '📱', label: 'On-call paged at 3 AM' },
              { y: 192, icon: '💻', label: 'SSH + grep + Prometheus' },
              { y: 214, icon: '🔧', label: 'Trial-and-error fix' },
            ].map((s, i) => (
              <g key={i}>
                <text x={198} y={s.y + 3} fill="white" fontSize="9">{s.icon}</text>
                <text x={215} y={s.y + 3} fill={MUTED} fontSize="6.5">{s.label}</text>
                {i < 3 && (
                  <g>
                    <line x1={205} y1={s.y + 8} x2={205} y2={s.y + 17} stroke="rgba(239,68,68,0.2)" strokeWidth="0.8" />
                    <polygon points={`202,${s.y + 17} 205,${s.y + 20} 208,${s.y + 17}`} fill="rgba(239,68,68,0.25)" />
                  </g>
                )}
              </g>
            ))}
            <rect x={195} y={238} width={160} height={16} rx={4} fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.2)" strokeWidth="0.5" />
            <text x={275} y={249} textAnchor="middle" fill={RED} fontSize="7" fontWeight="700">MTTD: 20–40 min ❌</text>

            {/* ── VS Arrow ── */}
            <text x={425} y={195} textAnchor="middle" fill="rgba(255,255,255,0.12)" fontSize="30" fontWeight="300">→</text>

            {/* ── Agentic Ops Box ── */}
            <rect x={470} y={110} width={200} height={155} rx={10} fill="rgba(109,216,128,0.04)" stroke="rgba(109,216,128,0.18)" strokeWidth="1" />
            <text x={570} y={128} textAnchor="middle" fill={GREEN} fontSize="7.5" fontWeight="700" letterSpacing="0.06em">AGENTIC OPS</text>
            {[
              { y: 148, label: 'Observe', sub: 'auto every 10 min', color: '#38bdf8' },
              { y: 175, label: 'Diagnose', sub: 'AI root-cause analysis', color: CYAN },
              { y: 202, label: 'Propose', sub: 'dry_run fix + risk level', color: AMBER },
              { y: 229, label: 'Approve → Act', sub: 'human says YES → execute', color: GREEN },
            ].map((s, i) => (
              <g key={i}>
                <circle cx={490} cy={s.y + 2} r={5} fill={`${s.color}30`} stroke={s.color} strokeWidth="1" />
                <text x={502} y={s.y + 3} fill="rgba(255,255,255,0.75)" fontSize="7" fontWeight="600">{s.label}</text>
                <text x={502} y={s.y + 13} fill={MUTED} fontSize="5.5">{s.sub}</text>
                {i < 3 && <line x1={490} y1={s.y + 10} x2={490} y2={s.y + 20} stroke={`${s.color}30`} strokeWidth="1" />}
              </g>
            ))}

            {/* Verify loop arrow back */}
            <path d="M 660 235 Q 680 200 660 160" fill="none" stroke="rgba(167,139,250,0.3)" strokeWidth="0.8" strokeDasharray="3 2" />
            <text x={680} y={198} fill="rgba(167,139,250,0.5)" fontSize="5" fontWeight="600" transform="rotate(90,680,198)">verify</text>

            {/* ── Bottom Scenario strip ── */}
            <rect x={155} y={282} width={530} height={85} rx={10} fill="rgba(240,160,48,0.03)" stroke="rgba(240,160,48,0.1)" strokeWidth="0.7" />
            <text x={175} y={298} fill={AMBER} fontSize="7.5" fontWeight="700">⏰ The 3 AM Scenario</text>
            {[
              { x: 210, label: 'Node isolates', sub: 'SWIM: SUSPECT', color: AMBER },
              { x: 330, label: '~4 min window', sub: 'Before DEAD', color: RED },
              { x: 450, label: 'One more fails', sub: 'Quorum = LOST', color: RED },
              { x: 570, label: 'Total outage', sub: 'All ops fail', color: RED },
            ].map((s, i) => (
              <g key={i}>
                <rect x={s.x - 42} y={310} width={84} height={38} rx={6} fill={`${s.color}08`} stroke={`${s.color}20`} strokeWidth="0.7" />
                <text x={s.x} y={325} textAnchor="middle" fill="#fff" fontSize="6.5" fontWeight="600">{s.label}</text>
                <text x={s.x} y={337} textAnchor="middle" fill={s.color} fontSize="5.5">{s.sub}</text>
                {i < 3 && (
                  <g>
                    <line x1={s.x + 42} y1={329} x2={s.x + 68} y2={329} stroke={`${s.color}30`} strokeWidth="1" />
                    <polygon points={`${s.x + 68},326 ${s.x + 73},329 ${s.x + 68},332`} fill={`${s.color}50`} />
                  </g>
                )}
              </g>
            ))}
            {/* Key Question */}
            <rect x={640} y={310} width={130} height={38} rx={6} fill="rgba(0,200,232,0.06)" stroke="rgba(0,200,232,0.2)" strokeWidth="0.8" />
            <text x={705} y={325} textAnchor="middle" fill={CYAN} fontSize="6.5" fontWeight="700">What if the system</text>
            <text x={705} y={337} textAnchor="middle" fill={CYAN} fontSize="6.5" fontWeight="700">fixed this BEFORE you?</text>
          </svg>
        </DiagramWrap>
      </Frame>
    </Shell>
  );
}
