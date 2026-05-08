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
    radial-gradient(ellipse 50% 40% at 20% 20%, rgba(56,189,248,0.06) 0%, transparent 55%),
    radial-gradient(ellipse 45% 40% at 80% 80%, rgba(56,189,248,0.03) 0%, transparent 55%),
    linear-gradient(185deg, #0b1e38 0%, #060f1e 45%, #030810 100%);
  overflow: hidden;
`;
const Grid = styled.div`position: absolute; inset: 0; z-index: 0; pointer-events: none; background-image: linear-gradient(rgba(0,212,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.018) 1px, transparent 1px); background-size: 72px 72px; mask-image: radial-gradient(ellipse at 50% 50%, black 40%, transparent 75%); opacity: 0.6;`;
const LogoWrap = styled.div`position: absolute; top: 24px; right: 40px; z-index: 20; animation: ${fadeIn} 0.8s 0.2s ease both;`;
const Frame = styled.div`position: relative; z-index: 10; width: 100%; height: 100%; padding: 24px 44px 20px; display: flex; flex-direction: column;`;
const Eyebrow = styled.div`font-family: ${typography.fontBody}; font-size: ${typography.size.xs}; font-weight: ${typography.weightSemibold}; letter-spacing: 0.28em; text-transform: uppercase; color: #38bdf8; margin-bottom: 6px; animation: ${fadeLeft} 0.9s 0.2s ease both;`;
const Title = styled.h1`
  font-family: ${typography.fontDisplay}; font-weight: ${typography.weightBlack};
  font-size: clamp(1.4rem, 2.6vw, 2rem); line-height: 1.15; letter-spacing: -0.02em;
  color: #fff; margin-bottom: 4px; animation: ${fadeLeft} 0.9s 0.3s ease both;
  max-width: calc(100% - 260px);
  .accent { background: linear-gradient(90deg, #38bdf8 0%, #06b6d4 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
`;
const Sub = styled.p`font-family: ${typography.fontBody}; font-size: clamp(0.68rem, 0.9vw, 0.8rem); color: rgba(255,255,255,0.4); font-weight: 300; margin-bottom: 10px; animation: ${fadeLeft} 0.9s 0.5s ease both;`;
const DiagramWrap = styled.div`flex: 1; display: flex; align-items: center; justify-content: center; animation: ${fadeUp} 1.2s 0.5s ease both; min-height: 0;`;

const W = 820, H = 400;
const BLUE = '#38bdf8', CYAN = '#00d4ff', MUTED = 'rgba(255,255,255,0.4)';

const TOOLS = [
  { icon: '📊', name: 'get_system_overview', desc: 'SLOs, nodes, drift, errors' },
  { icon: '💓', name: 'get_swim_health', desc: 'SUSPECT / DEAD detection' },
  { icon: '⏱', name: 'get_node_call_latency', desc: 'P50 / P95 / P99 per node' },
  { icon: '📋', name: 'get_recent_logs', desc: 'Errors in last N minutes' },
  { icon: '🔄', name: 'check_node_drift', desc: 'LB ↔ Registry sync check' },
  { icon: '📈', name: 'query_prometheus', desc: 'Custom PromQL queries' },
];

export default function SlideOps3() {
  return (
    <Shell>
      <Grid /><Particles count={8} />
      <LogoWrap><Logo alt="EPAM" width={220} /></LogoWrap>
      <Frame>
        <Eyebrow>MCP Observe · :8200</Eyebrow>
        <Title>The <span className="accent">Eyes</span> — Read-Only Cluster Intelligence</Title>
        <Sub>Zero side effects. The AI can call these tools as many times as it wants — it's just looking.</Sub>
        <DiagramWrap>
          <svg viewBox={`0 0 ${W} ${H}`} style={{width:'100%',maxHeight:'100%',height:'auto'}}>
            <defs>
              <filter id="og"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
            </defs>

            {/* ── Infrastructure sources (left) ── */}
            {[
              { x: 70, y: 80, label: 'Prometheus', sub: ':9090', icon: '📈' },
              { x: 70, y: 160, label: 'Loki Logs', sub: ':3100', icon: '📋' },
              { x: 70, y: 240, label: 'Cache Nodes', sub: ':8081-83', icon: '🖥' },
              { x: 70, y: 320, label: 'Service Registry', sub: ':8090', icon: '📡' },
            ].map((s, i) => (
              <g key={i}>
                <rect x={s.x - 50} y={s.y - 20} width={100} height={40} rx={8} fill="rgba(56,189,248,0.04)" stroke="rgba(56,189,248,0.15)" strokeWidth="0.8" />
                <text x={s.x - 30} y={s.y - 2} fill="white" fontSize="10">{s.icon}</text>
                <text x={s.x - 16} y={s.y - 2} fill="#fff" fontSize="7.5" fontWeight="600">{s.label}</text>
                <text x={s.x} y={s.y + 10} textAnchor="middle" fill={MUTED} fontSize="5.5">{s.sub}</text>
                {/* Arrow to MCP Observe */}
                <line x1={120} y1={s.y} x2={225} y2={200} stroke="rgba(56,189,248,0.15)" strokeWidth="0.8" strokeDasharray="4 3" />
                <circle r={2} fill={BLUE} opacity="0.6">
                  <animate attributeName="cx" values={`120;225`} dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                  <animate attributeName="cy" values={`${s.y};200`} dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                </circle>
              </g>
            ))}

            {/* ── MCP Observe (center) ── */}
            <rect x={230} y={80} width={220} height={240} rx={12} fill="rgba(56,189,248,0.05)" stroke={BLUE} strokeWidth="1.2" />
            <text x={340} y={102} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="800">MCP Observe</text>
            <text x={340} y={116} textAnchor="middle" fill={BLUE} fontSize="7.5" fontWeight="600">:8200 — THE EYES</text>

            {/* READ ONLY badge */}
            <rect x={290} y={124} width={100} height={16} rx={4} fill="rgba(56,189,248,0.1)" stroke="rgba(56,189,248,0.3)" strokeWidth="0.6" />
            <text x={340} y={135} textAnchor="middle" fill={BLUE} fontSize="6.5" fontWeight="800">🔒 READ ONLY</text>

            {/* Tool list inside */}
            {TOOLS.map((t, i) => (
              <g key={i}>
                <rect x={245} y={148 + i * 26} width={190} height={22} rx={5} fill="rgba(56,189,248,0.03)" stroke="rgba(56,189,248,0.08)" strokeWidth="0.5" />
                <text x={256} y={162 + i * 26} fill="white" fontSize="8">{t.icon}</text>
                <text x={270} y={162 + i * 26} fill={BLUE} fontSize="6" fontWeight="600" fontFamily="'JetBrains Mono', monospace">{t.name}</text>
                <text x={425} y={162 + i * 26} textAnchor="end" fill={MUTED} fontSize="5">{t.desc}</text>
              </g>
            ))}

            {/* ── SSE Connection to Ops Agent (right) ── */}
            <line x1={450} y1={200} x2={560} y2={200} stroke={BLUE} strokeWidth="1.2" strokeDasharray="6 4" />
            {/* Animated dots on SSE line */}
            <circle r={3} fill={BLUE} opacity="0.8">
              <animate attributeName="cx" values="455;555" dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="cy" values="200;200" dur="1.8s" repeatCount="indefinite" />
            </circle>
            <text x={505} y={192} textAnchor="middle" fill={BLUE} fontSize="6" fontWeight="600">SSE :8200</text>

            {/* ── Ops Agent (right) ── */}
            <rect x={565} y={140} width={180} height={120} rx={12} fill="rgba(0,200,232,0.05)" stroke={CYAN} strokeWidth="1" />
            <text x={655} y={168} textAnchor="middle" fill="#fff" fontSize="11" fontWeight="800">Ops Agent</text>
            <text x={655} y={182} textAnchor="middle" fill={CYAN} fontSize="7" fontWeight="600">:8100 — THE BRAIN</text>
            {/* Agent internals */}
            <text x={655} y={202} textAnchor="middle" fill={MUTED} fontSize="5.5">Calls tools in a loop</text>
            <text x={655} y={214} textAnchor="middle" fill={MUTED} fontSize="5.5">Builds live snapshot</text>
            <text x={655} y={226} textAnchor="middle" fill={MUTED} fontSize="5.5">Reasons about state</text>

            {/* Response arrow back */}
            <line x1={560} y1={215} x2={450} y2={215} stroke="rgba(56,189,248,0.12)" strokeWidth="0.8" strokeDasharray="3 3" />
            <text x={505} y={225} textAnchor="middle" fill={MUTED} fontSize="5">tool results</text>

            {/* ── Key principle banner (bottom) ── */}
            <rect x={170} y={345} width={480} height={35} rx={8} fill="rgba(56,189,248,0.04)" stroke="rgba(56,189,248,0.15)" strokeWidth="0.7" />
            <text x={190} y={365} fill="white" fontSize="10">👁️</text>
            <text x={210} y={363} fill="rgba(255,255,255,0.6)" fontSize="7.5" fontWeight="500">MCP Observe can </text>
            <text x={312} y={363} fill={BLUE} fontSize="7.5" fontWeight="700">never change anything</text>
            <text x={428} y={363} fill="rgba(255,255,255,0.6)" fontSize="7.5">. It only reads. Zero side effects.</text>
          </svg>
        </DiagramWrap>
      </Frame>
    </Shell>
  );
}
