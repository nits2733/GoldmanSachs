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
    radial-gradient(ellipse 50% 40% at 50% 25%, rgba(0,200,232,0.05) 0%, transparent 55%),
    radial-gradient(ellipse 45% 40% at 80% 80%, rgba(167,139,250,0.03) 0%, transparent 55%),
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

export default function SlideOps5() {
  return (
    <Shell>
      <Grid /><Particles count={8} />
      <LogoWrap><Logo alt="EPAM" width={220} /></LogoWrap>
      <Frame>
        <Eyebrow>Ops Agent · :8100</Eyebrow>
        <Title>The <span className="accent">Brain</span> — AI-Driven Decision Engine</Title>
        <Sub>Python FastAPI + GPT-4 via EPAM Dial · Tool-calling loop (max 8 rounds) · 3-layer context</Sub>
        <DiagramWrap>
          <svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%',maxHeight:'100%',height:'auto'}}>
            <defs>
              <filter id="bg"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(0,200,232,0.08)"/>
                <stop offset="100%" stopColor="rgba(56,189,248,0.04)"/>
              </linearGradient>
            </defs>

            {/* ── Central Brain ── */}
            <rect x={250} y={30} width={300} height={190} rx={14} fill="url(#bgGrad)" stroke={CYAN} strokeWidth="1.2" />
            <text x={400} y={55} textAnchor="middle" fill="#fff" fontSize="14" fontWeight="800">Ops Agent</text>
            <text x={400} y={70} textAnchor="middle" fill={CYAN} fontSize="8" fontWeight="600">:8100 — THE BRAIN · GPT-4 via EPAM Dial</text>

            {/* 3-Layer Context Stack */}
            {[
              { y: 85, label: 'L1: System Prompt', desc: 'Architecture · SLOs · Rules · "Never break quorum"', color: BLUE, w: 270 },
              { y: 118, label: 'L2: Live Snapshot', desc: 'Current SLO values · SWIM states · Error counts · LIVE', color: GREEN, w: 270 },
              { y: 151, label: 'L3: Trigger Goal', desc: 'Why was I called? Health check / Alert / Human question', color: PURPLE, w: 270 },
            ].map((l, i) => (
              <g key={i}>
                <rect x={265} y={l.y} width={l.w} height={28} rx={6} fill={`${l.color}08`} stroke={`${l.color}25`} strokeWidth="0.7" />
                <circle cx={278} cy={l.y + 14} r={6} fill={`${l.color}20`} stroke={l.color} strokeWidth="0.8" />
                <text x={278} y={l.y + 17} textAnchor="middle" fill={l.color} fontSize="6" fontWeight="800">{i + 1}</text>
                <text x={292} y={l.y + 11} fill={l.color} fontSize="6.5" fontWeight="700">{l.label}</text>
                <text x={292} y={l.y + 21} fill={MUTED} fontSize="5">{l.desc}</text>
              </g>
            ))}

            {/* Tool-calling loop indicator */}
            <path d="M 545 90 Q 565 125 545 160" fill="none" stroke="rgba(0,200,232,0.25)" strokeWidth="1" strokeDasharray="3 2" />
            <polygon points="543,160 548,166 540,166" fill="rgba(0,200,232,0.3)" />
            <text x={562} y={128} fill="rgba(0,200,232,0.4)" fontSize="5" fontWeight="600">max 8</text>
            <text x={562} y={137} fill="rgba(0,200,232,0.4)" fontSize="5" fontWeight="600">rounds</text>

            {/* ── SSE connections to MCP Observe & Act ── */}
            {/* Left: MCP Observe */}
            <line x1={250} y1={120} x2={155} y2={120} stroke={BLUE} strokeWidth="1" strokeDasharray="5 3" />
            <circle r={2.5} fill={BLUE} opacity="0.7">
              <animate attributeName="cx" values="248;158" dur="2s" repeatCount="indefinite" />
              <animate attributeName="cy" values="120;120" dur="2s" repeatCount="indefinite" />
            </circle>
            <rect x={30} y={85} width={120} height={70} rx={10} fill="rgba(56,189,248,0.04)" stroke={BLUE} strokeWidth="0.8" />
            <text x={90} y={108} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">MCP Observe</text>
            <text x={90} y={120} textAnchor="middle" fill={BLUE} fontSize="6" fontWeight="600">:8200 · THE EYES</text>
            <text x={90} y={134} textAnchor="middle" fill={MUTED} fontSize="5">🔒 Read Only</text>

            {/* Right: MCP Act */}
            <line x1={550} y1={150} x2={640} y2={150} stroke={GREEN} strokeWidth="1" strokeDasharray="5 3" />
            <circle r={2.5} fill={GREEN} opacity="0.7">
              <animate attributeName="cx" values="552;638" dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="cy" values="150;150" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <rect x={645} y={115} width={120} height={70} rx={10} fill="rgba(109,216,128,0.04)" stroke={GREEN} strokeWidth="0.8" />
            <text x={705} y={138} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">MCP Act</text>
            <text x={705} y={150} textAnchor="middle" fill={GREEN} fontSize="6" fontWeight="600">:8300 · THE HANDS</text>
            <text x={705} y={164} textAnchor="middle" fill={MUTED} fontSize="5">⚠️ Gated</text>

            {/* ── 4 Trigger Sources (bottom) ── */}
            <text x={400} y={245} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize="6" fontWeight="600" letterSpacing="0.1em">TRIGGER SOURCES</text>
            <line x1={160} y1={250} x2={640} y2={250} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />

            {/* Arrows up from triggers to brain */}
            {[
              { x: 115, icon: '⏱', title: 'Health Check', sub: 'Every 10 min', detail: 'Checks SLOs, SWIM, drift', badge: 'AUTO', badgeColor: CYAN },
              { x: 305, icon: '🚨', title: 'Alert', sub: 'Alertmanager webhook', detail: 'Root cause + blast radius', badge: 'EVENT', badgeColor: RED },
              { x: 495, icon: '💬', title: 'Chat', sub: 'Natural language', detail: 'Multi-turn · 20 turns TTL', badge: 'HUMAN', badgeColor: GREEN },
              { x: 685, icon: '✅', title: 'Verify', sub: 'Post-action auto', detail: 'Wait → Re-check → Report', badge: 'BG', badgeColor: PURPLE },
            ].map((t, i) => (
              <g key={i}>
                {/* Arrow up to brain */}
                <line x1={t.x} y1={265} x2={400} y2={220} stroke="rgba(0,200,232,0.1)" strokeWidth="0.7" strokeDasharray="3 3" />

                {/* Trigger card */}
                <rect x={t.x - 75} y={270} width={150} height={100} rx={10} fill="rgba(255,255,255,0.02)" stroke={`${t.badgeColor}18`} strokeWidth="0.7" />
                <text x={t.x - 52} y={292} fill="white" fontSize="14">{t.icon}</text>
                <text x={t.x - 35} y={290} fill="#fff" fontSize="8" fontWeight="700">{t.title}</text>
                {/* Badge */}
                <rect x={t.x + 20} y={281} width={30} height={12} rx={3} fill={`${t.badgeColor}15`} stroke={`${t.badgeColor}30`} strokeWidth="0.4" />
                <text x={t.x + 35} y={290} textAnchor="middle" fill={t.badgeColor} fontSize="4.5" fontWeight="700">{t.badge}</text>

                <text x={t.x} y={310} textAnchor="middle" fill={MUTED} fontSize="6">{t.sub}</text>
                <line x1={t.x - 50} y1={318} x2={t.x + 50} y2={318} stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" />
                <text x={t.x} y={330} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="5.5">{t.detail}</text>

                {/* Outcome labels */}
                {i === 0 && <text x={t.x} y={350} textAnchor="middle" fill={CYAN} fontSize="5" fontWeight="600">Healthy → report · Degraded → proposal</text>}
                {i === 1 && <text x={t.x} y={350} textAnchor="middle" fill={RED} fontSize="5" fontWeight="600">Full investigation + ranked fixes</text>}
                {i === 2 && <text x={t.x} y={350} textAnchor="middle" fill={GREEN} fontSize="5" fontWeight="600">"Why is node-2 slow?" + approvals</text>}
                {i === 3 && <text x={t.x} y={350} textAnchor="middle" fill={PURPLE} fontSize="5" fontWeight="600">RESOLVED / PARTIAL / NOT_RESOLVED</text>}
              </g>
            ))}
          </svg>
        </DiagramWrap>
      </Frame>
    </Shell>
  );
}
