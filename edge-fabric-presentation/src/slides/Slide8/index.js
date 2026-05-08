import React from 'react';
import styled, { keyframes } from 'styled-components';
import { SlideWrapper } from '../../components/SlideLayout';
import colors from '../../assets/styles/variables/colors';
import typography from '../../assets/styles/variables/typography';
import Logo from '../../components/Logo';
import Particles from '../../components/Particles';

/* ═══ Keyframes ═══ */
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

/* ═══ Styled ═══ */
const Shell = styled(SlideWrapper)`
  background:
    radial-gradient(ellipse 50% 40% at 50% 30%, rgba(0,200,232,0.05) 0%, transparent 55%),
    radial-gradient(ellipse 45% 40% at 80% 80%, rgba(167,139,250,0.04) 0%, transparent 55%),
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
  padding: 24px 44px 16px;
  display: flex; flex-direction: column;
`;

const Eyebrow = styled.div`
  font-family: ${typography.fontBody};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weightSemibold};
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${colors.cyan};
  margin-bottom: 6px;
  animation: ${fadeLeft} 0.9s 0.2s ease both;
`;

const Title = styled.h1`
  font-family: ${typography.fontDisplay};
  font-weight: ${typography.weightBlack};
  font-size: clamp(1.4rem, 2.6vw, 2rem);
  line-height: 1.15; letter-spacing: -0.02em;
  color: #fff; margin-bottom: 10px;
  animation: ${fadeLeft} 0.9s 0.3s ease both;
  max-width: calc(100% - 260px);
  .accent {
    background: linear-gradient(90deg, ${colors.cyan} 0%, #38bdf8 100%);
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Body = styled.div`
  flex: 1; display: flex; gap: 14px; min-height: 0;
`;

const DiagramArea = styled.div`
  flex: 1; display: flex; align-items: center; justify-content: center;
  animation: ${fadeUp} 1.2s 0.5s ease both;
  min-width: 0;
`;

const SideCol = styled.div`
  width: 200px; flex-shrink: 0; display: flex; flex-direction: column; gap: 7px;
  justify-content: center;
`;

const ModeCard = styled.div`
  padding: 10px 14px; border-radius: 10px;
  background: rgba(255,255,255,0.02);
  border: 1px solid ${({ $border }) => $border || 'rgba(0,200,232,0.1)'};
  backdrop-filter: blur(8px);
  opacity: 0;
  animation: ${fadeUp} 0.8s ${({ $delay }) => $delay || '0.6s'} ease both;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${({ $hoverBorder }) => $hoverBorder || 'rgba(0,200,232,0.25)'};
    background: rgba(0,200,232,0.02);
    transform: translateY(-1px);
  }
`;

const ModeHeader = styled.div`
  display: flex; align-items: center; gap: 8px; margin-bottom: 5px;
`;

const ModeIcon = styled.span`font-size: 0.85rem;`;

const ModeTitle = styled.span`
  font-family: ${typography.fontDisplay};
  font-size: 0.72rem; font-weight: 700; color: #fff;
`;

const ModeBadge = styled.span`
  font-family: ${typography.fontBody};
  font-size: 0.45rem; font-weight: 600;
  padding: 2px 6px; border-radius: 4px;
  background: ${({ $bg }) => $bg || 'rgba(0,200,232,0.1)'};
  color: ${({ $color }) => $color || colors.cyan};
  margin-left: auto;
`;

const ModeDesc = styled.p`
  font-family: ${typography.fontBody};
  font-size: 0.58rem; color: rgba(255,255,255,0.4);
  line-height: 1.5;
`;

/* Risk badges */
const RiskRow = styled.div`
  display: flex; gap: 6px; flex-wrap: wrap;
  padding: 8px 12px; border-radius: 8px;
  background: rgba(0,0,0,0.25);
  border: 1px solid rgba(255,255,255,0.04);
  animation: ${fadeUp} 0.8s 1.3s ease both;
`;

const RiskBadge = styled.div`
  display: flex; align-items: center; gap: 4px;
  padding: 3px 8px; border-radius: 5px;
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $border }) => $border};
`;

const RiskLabel = styled.span`
  font-family: ${typography.fontBody};
  font-size: 0.5rem; font-weight: 600;
  color: ${({ $color }) => $color};
`;

/* ═══ SVG Architecture Constants ═══ */
const W = 500, H = 400;

/* ═══ Component ═══ */
const Slide8 = () => (
  <Shell>
    <Grid />
    <Particles count={10} />
    <LogoWrap><Logo alt="EPAM" width={220} /></LogoWrap>

    <Frame>
      <Eyebrow>Agentic Ops · Architecture</Eyebrow>
      <Title>
        Three-Layer Architecture — <span className="accent">Eyes, Brain & Hands</span>
      </Title>

      <Body>
        <DiagramArea>
          <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', maxHeight: '100%', height: 'auto' }}>
            <defs>
              <filter id="archGlow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(0,200,232,0.12)" />
                <stop offset="100%" stopColor="rgba(56,189,248,0.06)" />
              </linearGradient>
            </defs>

            {/* ═══ Trigger Sources (top) ═══ */}
            {[
              { x: 100, label: 'Alertmanager', sub: 'POST /alert', icon: '🚨' },
              { x: 250, label: 'Scheduler', sub: 'every 10 min', icon: '⏱' },
              { x: 400, label: 'Human / UI', sub: 'POST /query', icon: '👤' },
            ].map((t, i) => (
              <g key={t.label}>
                <rect x={t.x - 48} y={8} width={96} height={32} rx={6}
                  fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
                <text x={t.x} y={22} textAnchor="middle" fill="#fff" fontSize="7.5" fontWeight="600">{t.label}</text>
                <text x={t.x} y={33} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="5.5">{t.sub}</text>
                {/* Arrow down to brain */}
                <line x1={t.x} y1={40} x2={t.x} y2={70} stroke="rgba(0,200,232,0.2)" strokeWidth="0.8" strokeDasharray="3 2" />
                <circle r={1.5} fill={colors.cyan} opacity="0.7">
                  <animate attributeName="cy" values="42;68" dur={`${1.5 + i * 0.3}s`} repeatCount="indefinite" />
                  <animate attributeName="cx" values={`${t.x};${t.x}`} dur="1s" repeatCount="indefinite" />
                </circle>
              </g>
            ))}

            {/* ═══ Ops Agent / Brain (center) ═══ */}
            <rect x={80} y={70} width={340} height={90} rx={10}
              fill="url(#brainGrad)" stroke={colors.cyan} strokeWidth="1" opacity="0.9" />
            <text x={250} y={92} textAnchor="middle" fill="#fff" fontSize="13" fontWeight="800">Ops Agent</text>
            <text x={250} y={107} textAnchor="middle" fill={colors.cyan} fontSize="7.5" fontWeight="600">:8100 — THE BRAIN</text>

            {/* 3-layer context labels */}
            <text x={95} y={124} fill="rgba(255,255,255,0.35)" fontSize="5.5">
              L1: System Prompt  ·  L2: Live Snapshot  ·  L3: Trigger Goal
            </text>
            <text x={95} y={135} fill="rgba(255,255,255,0.28)" fontSize="5">
              Agentic tool-calling loop (max 8 rounds) + history compression
            </text>

            {/* ═══ SSE connection lines ═══ */}
            {/* Brain → MCP Observe (left) */}
            <line x1={180} y1={160} x2={140} y2={200} stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
            <text x={145} y={185} fill="#38bdf8" fontSize="5.5" fontWeight="600" transform="rotate(-25,145,185)">SSE :8200</text>
            <circle r={2} fill="#38bdf8" opacity="0.7">
              <animate attributeName="cx" values="178;142" dur="2s" repeatCount="indefinite" />
              <animate attributeName="cy" values="162;198" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Brain → MCP Act (right) */}
            <line x1={320} y1={160} x2={360} y2={200} stroke="#6dd880" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
            <text x={348} y={185} fill="#6dd880" fontSize="5.5" fontWeight="600" transform="rotate(25,348,185)">SSE :8300</text>
            <circle r={2} fill="#6dd880" opacity="0.7">
              <animate attributeName="cx" values="322;358" dur="2.2s" repeatCount="indefinite" />
              <animate attributeName="cy" values="162;198" dur="2.2s" repeatCount="indefinite" />
            </circle>

            {/* ═══ MCP Observe (left box) ═══ */}
            <rect x={40} y={200} width={180} height={100} rx={8}
              fill="rgba(56,189,248,0.04)" stroke="#38bdf8" strokeWidth="0.8" />
            <text x={130} y={220} textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700">MCP Observe</text>
            <text x={130} y={233} textAnchor="middle" fill="#38bdf8" fontSize="6.5" fontWeight="600">:8200 — THE EYES</text>

            {/* Tools list */}
            {[
              'get_system_overview', 'get_swim_health', 'get_node_latency',
              'get_recent_logs', 'query_prometheus', 'check_node_drift'
            ].map((tool, i) => (
              <text key={tool} x={55} y={248 + i * 8.5} fill="rgba(255,255,255,0.35)" fontSize="5">
                • {tool}
              </text>
            ))}

            {/* Read-only badge */}
            <rect x={148} y={244} width={55} height={14} rx={3}
              fill="rgba(56,189,248,0.1)" stroke="rgba(56,189,248,0.3)" strokeWidth="0.5" />
            <text x={175} y={254} textAnchor="middle" fill="#38bdf8" fontSize="5" fontWeight="700">READ ONLY</text>

            {/* ═══ MCP Act (right box) ═══ */}
            <rect x={280} y={200} width={180} height={100} rx={8}
              fill="rgba(109,216,128,0.04)" stroke="#6dd880" strokeWidth="0.8" />
            <text x={370} y={220} textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700">MCP Act</text>
            <text x={370} y={233} textAnchor="middle" fill="#6dd880" fontSize="6.5" fontWeight="600">:8300 — THE HANDS</text>

            {/* Tools list */}
            {[
              'restart_container', 'force_swim_rejoin', 'deregister_dead_node',
              'trigger_rebalance', 'update_config', 'toggle_tracing'
            ].map((tool, i) => (
              <text key={tool} x={295} y={248 + i * 8.5} fill="rgba(255,255,255,0.35)" fontSize="5">
                • {tool}
              </text>
            ))}

            {/* Gated badge */}
            <rect x={387} y={244} width={58} height={14} rx={3}
              fill="rgba(240,160,48,0.1)" stroke="rgba(240,160,48,0.3)" strokeWidth="0.5" />
            <text x={416} y={254} textAnchor="middle" fill="#f0a030" fontSize="5" fontWeight="700">GATED</text>

            {/* ═══ Infrastructure layer (bottom) ═══ */}
            <line x1={40} y1={330} x2={460} y2={330} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
            <text x={250} y={326} textAnchor="middle" fill="rgba(255,255,255,0.18)" fontSize="5" letterSpacing="0.1em">
              INFRASTRUCTURE
            </text>

            {/* Observe targets */}
            {[
              { x: 80, label: 'Prometheus', sub: ':9090', color: '#38bdf8' },
              { x: 170, label: 'Loki', sub: ':3100', color: '#38bdf8' },
            ].map(t => (
              <g key={t.label}>
                <rect x={t.x - 35} y={340} width={70} height={26} rx={5}
                  fill="rgba(56,189,248,0.03)" stroke="rgba(56,189,248,0.12)" strokeWidth="0.6" />
                <text x={t.x} y={352} textAnchor="middle" fill={t.color} fontSize="6.5" fontWeight="600">{t.label}</text>
                <text x={t.x} y={362} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="5">{t.sub}</text>
              </g>
            ))}

            {/* Arrow from Observe to infra */}
            <line x1={130} y1={300} x2={120} y2={340} stroke="rgba(56,189,248,0.2)" strokeWidth="0.6" strokeDasharray="2 2" />

            {/* Act targets */}
            {[
              { x: 330, label: 'Load Balancer', sub: ':8080', color: '#6dd880' },
              { x: 420, label: 'Cache Nodes', sub: ':8081-83', color: '#6dd880' },
            ].map(t => (
              <g key={t.label}>
                <rect x={t.x - 40} y={340} width={80} height={26} rx={5}
                  fill="rgba(109,216,128,0.03)" stroke="rgba(109,216,128,0.12)" strokeWidth="0.6" />
                <text x={t.x} y={352} textAnchor="middle" fill={t.color} fontSize="6.5" fontWeight="600">{t.label}</text>
                <text x={t.x} y={362} textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="5">{t.sub}</text>
              </g>
            ))}

            {/* Arrow from Act to infra */}
            <line x1={370} y1={300} x2={375} y2={340} stroke="rgba(109,216,128,0.2)" strokeWidth="0.6" strokeDasharray="2 2" />

            {/* Labels */}
            <text x={80} y={382} fill="rgba(56,189,248,0.25)" fontSize="5" fontWeight="600" letterSpacing="0.08em">reads ↑</text>
            <text x={380} y={382} fill="rgba(109,216,128,0.25)" fontSize="5" fontWeight="600" letterSpacing="0.08em">acts on ↑</text>
          </svg>
        </DiagramArea>

        <SideCol>
          {[
            { icon: '⏱', title: 'Health Check', badge: 'AUTO', badgeBg: 'rgba(0,200,232,0.1)', badgeColor: colors.cyan, desc: 'Every 10 min. Checks all SLOs, SWIM, drift. Proposes fixes if degraded.', border: 'rgba(0,200,232,0.1)', hoverBorder: 'rgba(0,200,232,0.25)', delay: '0.7s' },
            { icon: '🚨', title: 'Alert Investigation', badge: 'EVENT', badgeBg: 'rgba(239,68,68,0.1)', badgeColor: '#ef4444', desc: 'Alertmanager fires → full investigation → root cause → ranked remediations.', border: 'rgba(239,68,68,0.1)', hoverBorder: 'rgba(239,68,68,0.25)', delay: '0.85s' },
            { icon: '💬', title: 'Conversational Chat', badge: 'HUMAN', badgeBg: 'rgba(109,216,128,0.1)', badgeColor: '#6dd880', desc: 'Multi-turn memory (20 turns, 30 min TTL). "Why is node-2 slow?" + approvals.', border: 'rgba(109,216,128,0.1)', hoverBorder: 'rgba(109,216,128,0.25)', delay: '1.0s' },
            { icon: '✅', title: 'Post-Action Verify', badge: 'BG', badgeBg: 'rgba(167,139,250,0.1)', badgeColor: '#a78bfa', desc: 'Auto-triggered after approval. Wait 30-180s → re-observe → RESOLVED/PARTIAL/NOT_RESOLVED.', border: 'rgba(167,139,250,0.1)', hoverBorder: 'rgba(167,139,250,0.25)', delay: '1.15s' },
          ].map((m) => (
            <ModeCard key={m.title} $border={m.border} $hoverBorder={m.hoverBorder} $delay={m.delay}>
              <ModeHeader>
                <ModeIcon>{m.icon}</ModeIcon>
                <ModeTitle>{m.title}</ModeTitle>
                <ModeBadge $bg={m.badgeBg} $color={m.badgeColor}>{m.badge}</ModeBadge>
              </ModeHeader>
              <ModeDesc>{m.desc}</ModeDesc>
            </ModeCard>
          ))}

          <RiskRow>
            <span style={{ fontFamily: typography.fontBody, fontSize: '0.45rem', fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.08em', width: '100%', marginBottom: 2 }}>
              Risk Classification
            </span>
            {[
              { emoji: '🟢', label: 'Minimal', bg: 'rgba(109,216,128,0.06)', border: 'rgba(109,216,128,0.15)', color: '#6dd880' },
              { emoji: '🟡', label: 'Low', bg: 'rgba(240,160,48,0.06)', border: 'rgba(240,160,48,0.15)', color: '#f0a030' },
              { emoji: '🟠', label: 'Medium', bg: 'rgba(232,112,152,0.06)', border: 'rgba(232,112,152,0.15)', color: '#e87098' },
              { emoji: '🔴', label: 'High', bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.15)', color: '#ef4444' },
            ].map(r => (
              <RiskBadge key={r.label} $bg={r.bg} $border={r.border}>
                <span style={{ fontSize: '0.5rem' }}>{r.emoji}</span>
                <RiskLabel $color={r.color}>{r.label}</RiskLabel>
              </RiskBadge>
            ))}
          </RiskRow>
        </SideCol>
      </Body>
    </Frame>
  </Shell>
);

export default Slide8;

