import React from 'react';
import styled, { keyframes } from 'styled-components';
import { SlideWrapper } from '../../components/SlideLayout';
import typography from '../../assets/styles/variables/typography';
import colors from '../../assets/styles/variables/colors';
import Logo from '../../components/Logo';
import Particles from '../../components/Particles';

const fadeIn = keyframes`from{opacity:0}to{opacity:1}`;
const fadeLeft = keyframes`from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}`;
const fadeUp = keyframes`from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}`;

const Shell = styled(SlideWrapper)`
  background:
    radial-gradient(ellipse 50% 40% at 20% 20%, rgba(109,216,128,0.05) 0%, transparent 55%),
    radial-gradient(ellipse 45% 40% at 80% 80%, rgba(109,216,128,0.03) 0%, transparent 55%),
    linear-gradient(185deg, #0b1e38 0%, #060f1e 45%, #030810 100%);
  overflow: hidden;
`;
const Grid = styled.div`position: absolute; inset: 0; z-index: 0; pointer-events: none; background-image: linear-gradient(rgba(0,212,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.018) 1px, transparent 1px); background-size: 72px 72px; mask-image: radial-gradient(ellipse at 50% 50%, black 40%, transparent 75%); opacity: 0.6;`;
const LogoWrap = styled.div`position: absolute; top: 24px; right: 40px; z-index: 20; animation: ${fadeIn} 0.8s 0.2s ease both;`;
const Frame = styled.div`position: relative; z-index: 10; width: 100%; height: 100%; padding: 24px 44px 20px; display: flex; flex-direction: column;`;
const Eyebrow = styled.div`font-family: ${typography.fontBody}; font-size: ${typography.size.xs}; font-weight: ${typography.weightSemibold}; letter-spacing: 0.28em; text-transform: uppercase; color: #6dd880; margin-bottom: 6px; animation: ${fadeLeft} 0.9s 0.2s ease both;`;
const Title = styled.h1`
  font-family: ${typography.fontDisplay}; font-weight: ${typography.weightBlack};
  font-size: clamp(1.4rem, 2.6vw, 2rem); line-height: 1.15; letter-spacing: -0.02em;
  color: #fff; margin-bottom: 4px; animation: ${fadeLeft} 0.9s 0.3s ease both;
  max-width: calc(100% - 260px);
  .accent { background: linear-gradient(90deg, #6dd880 0%, #34d399 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
`;
const Sub = styled.p`font-family: ${typography.fontBody}; font-size: clamp(0.68rem, 0.9vw, 0.8rem); color: rgba(255,255,255,0.4); font-weight: 300; margin-bottom: 10px; animation: ${fadeLeft} 0.9s 0.5s ease both;`;
const DiagramWrap = styled.div`flex: 1; display: flex; align-items: center; justify-content: center; animation: ${fadeUp} 1.2s 0.5s ease both; min-height: 0;`;

const W = 820, H = 400;
const GREEN = '#6dd880', AMBER = '#f0a030', PINK = '#e87098', RED = '#ef4444', CYAN = '#00d4ff', MUTED = 'rgba(255,255,255,0.4)';

const ACTIONS = [
  { name: 'toggle_tracing', risk: 'Minimal', color: GREEN, emoji: '🟢' },
  { name: 'force_swim_rejoin', risk: 'Low', color: AMBER, emoji: '🟡' },
  { name: 'deregister_dead_node', risk: 'Low', color: AMBER, emoji: '🟡' },
  { name: 'restart_container', risk: 'Medium', color: PINK, emoji: '🟠' },
  { name: 'trigger_rebalance', risk: 'Medium', color: PINK, emoji: '🟠' },
  { name: 'stop_azure_vm', risk: 'High', color: RED, emoji: '🔴' },
];

export default function SlideOps4() {
  return (
    <Shell>
      <Grid /><Particles count={8} />
      <LogoWrap><Logo alt="EPAM" width={220} /></LogoWrap>
      <Frame>
        <Eyebrow>MCP Act · :8300</Eyebrow>
        <Title>The <span className="accent">Hands</span> — Gated Action Execution</Title>
        <Sub>Every action defaults to dry_run=True. The AI proposes — only humans approve execution.</Sub>
        <DiagramWrap>
          <svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%',maxHeight:'100%',height:'auto'}}>
            <defs>
              <filter id="ag"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>

            {/* ── Ops Agent (left) ── */}
            <rect x={30} y={130} width={140} height={100} rx={12} fill="rgba(0,200,232,0.05)" stroke={CYAN} strokeWidth="1" />
            <text x={100} y={160} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="800">Ops Agent</text>
            <text x={100} y={174} textAnchor="middle" fill={CYAN} fontSize="6.5" fontWeight="600">THE BRAIN</text>
            <text x={100} y={192} textAnchor="middle" fill={MUTED} fontSize="5.5">Calls with dry_run=True</text>
            <text x={100} y={204} textAnchor="middle" fill={MUTED} fontSize="5.5">Gets proposal back</text>

            {/* Arrow Agent → MCP Act */}
            <line x1={170} y1={175} x2={230} y2={175} stroke={GREEN} strokeWidth="1.2" strokeDasharray="5 3" />
            <polygon points="230,172 236,175 230,178" fill={GREEN} />
            <text x={200} y={168} textAnchor="middle" fill={GREEN} fontSize="5.5" fontWeight="600">SSE :8300</text>

            {/* ── MCP Act (center) ── */}
            <rect x={240} y={40} width={240} height={320} rx={12} fill="rgba(109,216,128,0.04)" stroke={GREEN} strokeWidth="1.2" />
            <text x={360} y={62} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="800">MCP Act</text>
            <text x={360} y={76} textAnchor="middle" fill={GREEN} fontSize="7.5" fontWeight="600">:8300 — THE HANDS</text>

            {/* GATED badge */}
            <rect x={315} y={82} width={90} height={16} rx={4} fill="rgba(240,160,48,0.1)" stroke="rgba(240,160,48,0.3)" strokeWidth="0.6" />
            <text x={360} y={93} textAnchor="middle" fill={AMBER} fontSize="6.5" fontWeight="800">⚠️ GATED</text>

            {/* Risk escalation ladder */}
            {ACTIONS.map((a, i) => {
              const y = 108 + i * 38;
              const barW = 200;
              return (
                <g key={i}>
                  <rect x={260} y={y} width={barW} height={30} rx={6} fill={`${a.color}08`} stroke={`${a.color}20`} strokeWidth="0.7" />
                  {/* Risk dot */}
                  <circle cx={275} cy={y + 15} r={5} fill={`${a.color}30`} stroke={a.color} strokeWidth="1" />
                  <text x={275} y={y + 18} textAnchor="middle" fill="white" fontSize="6">{a.emoji}</text>
                  {/* Action name */}
                  <text x={290} y={y + 12} fill="#fff" fontSize="6.5" fontWeight="600" fontFamily="'JetBrains Mono', monospace">{a.name}</text>
                  {/* Risk label */}
                  <rect x={290} y={y + 18} width={35 + a.risk.length * 3} height={10} rx={3} fill={`${a.color}15`} stroke={`${a.color}25`} strokeWidth="0.4" />
                  <text x={293} y={y + 25} fill={a.color} fontSize="4.5" fontWeight="700">{a.risk}</text>
                  {/* Arrow on right showing risk direction */}
                  {i < 5 && <line x1={450} y1={y + 30} x2={450} y2={y + 38} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />}
                </g>
              );
            })}
            {/* Risk direction label */}
            <text x={462} y={140} fill="rgba(255,255,255,0.15)" fontSize="5" fontWeight="600" transform="rotate(90,462,180)">RISK ▲</text>

            {/* ── Targets (right) ── */}
            {[
              { x: 620, y: 100, label: 'Load Balancer', sub: ':8080', color: GREEN },
              { x: 620, y: 180, label: 'Cache Nodes', sub: ':8081-83', color: GREEN },
              { x: 620, y: 260, label: 'Service Registry', sub: ':8090', color: GREEN },
            ].map((t, i) => (
              <g key={i}>
                <line x1={480} y1={140 + i * 60} x2={t.x - 50} y2={t.y} stroke="rgba(109,216,128,0.15)" strokeWidth="0.8" strokeDasharray="3 3" />
                <rect x={t.x - 48} y={t.y - 20} width={96} height={40} rx={8} fill="rgba(109,216,128,0.04)" stroke="rgba(109,216,128,0.15)" strokeWidth="0.8" />
                <text x={t.x} y={t.y - 2} textAnchor="middle" fill="#fff" fontSize="7.5" fontWeight="600">{t.label}</text>
                <text x={t.x} y={t.y + 10} textAnchor="middle" fill={MUTED} fontSize="5.5">{t.sub}</text>
              </g>
            ))}

            {/* Acts on label */}
            <text x={540} y={185} fill="rgba(109,216,128,0.3)" fontSize="5.5" fontWeight="600">acts on →</text>

            {/* ── Dry Run flow at bottom ── */}
            <rect x={80} y={340} width={620} height={40} rx={8} fill="rgba(240,160,48,0.03)" stroke="rgba(240,160,48,0.12)" strokeWidth="0.7" />

            {/* Flow: AI calls → dry_run=True → Proposal → Human → dry_run=False → Execute */}
            {[
              { x: 120, label: 'AI calls tool', color: CYAN },
              { x: 230, label: 'dry_run=True', color: AMBER },
              { x: 350, label: 'ActionProposal', color: AMBER },
              { x: 475, label: 'Human Approves', color: GREEN },
              { x: 600, label: 'dry_run=False ✓', color: GREEN },
            ].map((s, i) => (
              <g key={i}>
                <circle cx={s.x} cy={360} r={4} fill={`${s.color}30`} stroke={s.color} strokeWidth="0.8" />
                <text x={s.x} y={356} textAnchor="middle" fill={s.color} fontSize="5.5" fontWeight="600">{s.label}</text>
                {i < 4 && (
                  <g>
                    <line x1={s.x + 20} y1={360} x2={s.x + 65} y2={360} stroke={`${s.color}30`} strokeWidth="0.8" />
                    <polygon points={`${s.x + 65},358 ${s.x + 69},360 ${s.x + 65},362`} fill={`${s.color}50`} />
                  </g>
                )}
              </g>
            ))}
            <text x={660} y={375} fill="rgba(239,68,68,0.6)" fontSize="5" fontWeight="700">AI cannot bypass gate</text>
          </svg>
        </DiagramWrap>
      </Frame>
    </Shell>
  );
}
