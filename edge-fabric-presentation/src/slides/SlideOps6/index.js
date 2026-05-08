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
    radial-gradient(ellipse 50% 40% at 50% 30%, rgba(0,200,232,0.04) 0%, transparent 55%),
    radial-gradient(ellipse 45% 40% at 80% 80%, rgba(109,216,128,0.03) 0%, transparent 55%),
    linear-gradient(185deg, #0b1e38 0%, #060f1e 45%, #030810 100%);
  overflow: hidden;
`;
const Grid = styled.div`position: absolute; inset: 0; z-index: 0; pointer-events: none; background-image: linear-gradient(rgba(0,212,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.018) 1px, transparent 1px); background-size: 72px 72px; mask-image: radial-gradient(ellipse at 50% 50%, black 40%, transparent 75%); opacity: 0.6;`;
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
const BLUE = '#38bdf8', GREEN = '#6dd880', PURPLE = '#a78bfa', CYAN = '#00d4ff', AMBER = '#f0a030', RED = '#ef4444', MUTED = 'rgba(255,255,255,0.4)';

export default function SlideOps6() {
  const STEPS = [
    { x: 75,  icon: '🤖', title: 'Agent Detects', sub: 'Problem found', color: BLUE },
    { x: 225, icon: '🔧', title: 'Calls Tool', sub: 'dry_run=True', color: CYAN },
    { x: 375, icon: '📋', title: 'Proposal Created', sub: 'Pending approval', color: AMBER },
    { x: 525, icon: '👤', title: 'Human Reviews', sub: 'Approve / Reject', color: GREEN },
    { x: 675, icon: '⚡', title: 'Execute + Verify', sub: 'dry_run=False → check', color: GREEN },
  ];

  return (
    <Shell>
      <Grid /><Particles count={8} />
      <LogoWrap><Logo alt="EPAM" width={220} /></LogoWrap>
      <Frame>
        <Eyebrow>Approval Flow</Eyebrow>
        <Title>The Human Gate — <span className="accent">Propose, Review, Execute, Verify</span></Title>
        <Sub>Every remediation goes through a dry-run gate. No action without explicit human approval.</Sub>
        <DiagramWrap>
          <svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%',maxHeight:'100%',height:'auto'}}>
            <defs>
              <filter id="fg"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>

            {/* ── Main Flow Line ── */}
            <line x1={75} y1={100} x2={675} y2={100} stroke="rgba(0,200,232,0.1)" strokeWidth="2" />

            {/* ── Flow Steps ── */}
            {STEPS.map((s, i) => (
              <g key={i}>
                {/* Node circle */}
                <circle cx={s.x} cy={100} r={28} fill={`${s.color}08`} stroke={s.color} strokeWidth="1.5" filter="url(#fg)" />
                <text x={s.x} y={97} textAnchor="middle" fill="white" fontSize="16">{s.icon}</text>
                {/* Step number */}
                <circle cx={s.x + 20} cy={78} r={8} fill={`${s.color}25`} stroke={s.color} strokeWidth="0.8" />
                <text x={s.x + 20} y={81} textAnchor="middle" fill={s.color} fontSize="6" fontWeight="800">{i + 1}</text>
                {/* Labels */}
                <text x={s.x} y={142} textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700">{s.title}</text>
                <text x={s.x} y={155} textAnchor="middle" fill={s.color} fontSize="6" fontWeight="500">{s.sub}</text>
                {/* Arrow to next */}
                {i < 4 && (
                  <g>
                    <line x1={s.x + 28} y1={100} x2={STEPS[i + 1].x - 28} y2={100} stroke={`${s.color}40`} strokeWidth="1.5" />
                    <polygon points={`${STEPS[i + 1].x - 30},96 ${STEPS[i + 1].x - 24},100 ${STEPS[i + 1].x - 30},104`} fill={`${s.color}50`} />
                    {/* Animated dot on arrow */}
                    <circle r={2.5} fill={s.color} opacity="0.7">
                      <animate attributeName="cx" values={`${s.x + 30};${STEPS[i + 1].x - 32}`} dur={`${1.5 + i * 0.2}s`} repeatCount="indefinite" />
                      <animate attributeName="cy" values="100;100" dur="1s" repeatCount="indefinite" />
                    </circle>
                  </g>
                )}
              </g>
            ))}

            {/* ── Verify Loop Arrow back ── */}
            <path d="M 695 110 Q 720 170 695 195 L 95 195 Q 60 195 60 170 L 60 115" fill="none" stroke="rgba(167,139,250,0.2)" strokeWidth="1" strokeDasharray="5 3" />
            <polygon points="57,118 60,110 63,118" fill="rgba(167,139,250,0.3)" />
            <text x={380} y={190} textAnchor="middle" fill={PURPLE} fontSize="5.5" fontWeight="600">Auto-verify loop: wait 10–60s → re-observe → report outcome</text>

            {/* ── Proposal Detail Box (center-bottom) ── */}
            <rect x={120} y={215} width={340} height={155} rx={12} fill="rgba(240,160,48,0.03)" stroke="rgba(240,160,48,0.15)" strokeWidth="0.8" />
            <text x={140} y={236} fill={AMBER} fontSize="8" fontWeight="700">📦 ActionProposal Example</text>

            {/* Code-like proposal display */}
            {[
              { key: 'tool', val: 'force_swim_rejoin', color: BLUE },
              { key: 'args', val: "node='node-3'", color: MUTED },
              { key: 'risk', val: '🟡 Low', color: AMBER },
              { key: 'expected', val: 'Node rejoins SWIM cluster', color: GREEN },
              { key: 'rollback', val: 'deregister_dead_node', color: PURPLE },
              { key: 'expires', val: '20 minutes', color: MUTED },
            ].map((p, i) => (
              <g key={i}>
                <text x={140} y={256 + i * 16} fill="rgba(255,255,255,0.3)" fontSize="6" fontWeight="600" fontFamily="'JetBrains Mono', monospace">{p.key}:</text>
                <text x={210} y={256 + i * 16} fill={p.color} fontSize="6.5" fontWeight="500" fontFamily="'JetBrains Mono', monospace">{p.val}</text>
              </g>
            ))}

            {/* ── Safety / Key Point (right-bottom) ── */}
            <rect x={490} y={215} width={260} height={80} rx={12} fill="rgba(239,68,68,0.04)" stroke="rgba(239,68,68,0.2)" strokeWidth="0.8" />
            <text x={520} y={240} fill="white" fontSize="18">🔒</text>
            <text x={545} y={240} fill="#fff" fontSize="10" fontWeight="800">The AI cannot bypass this.</text>
            <text x={545} y={256} fill={RED} fontSize="8" fontWeight="700">Ever.</text>
            <text x={520} y={278} fill={MUTED} fontSize="5.5">Only POST /agent/approve/{'{id}'} can set</text>
            <text x={520} y={290} fill={MUTED} fontSize="5.5">dry_run=False and trigger execution.</text>

            {/* ── Closing Statement ── */}
            <rect x={490} y={310} width={260} height={60} rx={10} fill="rgba(0,200,232,0.04)" stroke="rgba(0,200,232,0.15)" strokeWidth="0.7" />
            <text x={620} y={332} textAnchor="middle" fill={CYAN} fontSize="7.5" fontWeight="700">Not autopilot — co-pilot.</text>
            <text x={620} y={348} textAnchor="middle" fill={MUTED} fontSize="5.5">AI runs observe-diagnose at machine speed.</text>
            <text x={620} y={360} textAnchor="middle" fill={MUTED} fontSize="5.5">You decide. You approve. It verifies.</text>
          </svg>
        </DiagramWrap>
      </Frame>
    </Shell>
  );
}
