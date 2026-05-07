import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { ScrollableSlideWrapper } from '../../components/SlideLayout';
import colors from '../../assets/styles/variables/colors';
import typography from '../../assets/styles/variables/typography';
import Logo from '../../components/Logo';
import Particles from '../../components/Particles';

/* ═══════════════════════════════════════════════════════════════════
   ANIMATIONS
   ═══════════════════════════════════════════════════════════════════ */
const fadeIn = keyframes`from{opacity:0}to{opacity:1}`;
const fadeUp = keyframes`from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}`;
const fadeLeft = keyframes`from{opacity:0;transform:translateX(-18px)}to{opacity:1;transform:translateX(0)}`;
const pulseGlow = keyframes`0%,100%{box-shadow:0 0 8px rgba(0,200,232,0.2)}50%{box-shadow:0 0 24px rgba(0,200,232,0.5)}`;
const pulseRing = keyframes`0%{transform:scale(1);opacity:0.6}100%{transform:scale(2.2);opacity:0}`;
const skullBob = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}`;
const ripple = keyframes`0%{transform:scale(0.8);opacity:0.8}100%{transform:scale(2.5);opacity:0}`;
const dash = keyframes`to{stroke-dashoffset:0}`;
const blink = keyframes`0%,100%{opacity:1}50%{opacity:0.3}`;
const slideDown = keyframes`from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)}`;
const gossipSpread = keyframes`0%{r:4;opacity:0.9}100%{r:18;opacity:0}`;

/* ═══════════════════════════════════════════════════════════════════
   STYLED COMPONENTS
   ═══════════════════════════════════════════════════════════════════ */
const Shell = styled(ScrollableSlideWrapper)`
  background:
    radial-gradient(ellipse 55% 45% at 18% 18%, rgba(0, 200, 232, 0.07) 0%, transparent 55%),
    radial-gradient(ellipse 55% 45% at 85% 80%, rgba(0, 120, 180, 0.08) 0%, transparent 55%),
    linear-gradient(180deg, ${colors.bgMid} 0%, ${colors.background} 55%, ${colors.bgDeep} 100%);
`;

const Grid = styled.div`
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background-image:
    linear-gradient(${colors.gridLine} 1px, transparent 1px),
    linear-gradient(90deg, ${colors.gridLine} 1px, transparent 1px);
  background-size: 60px 60px; opacity: 0.55;
`;

const LogoWrap = styled.div`
  position: absolute; top: 32px; right: 48px; z-index: 20;
  animation: ${fadeIn} 1s ease both; animation-delay: 0.12s;
`;

const Content = styled.div`
  position: relative; z-index: 10; width: 100%; max-width: 1500px;
  margin: 0 auto; padding: 36px 56px 100px; min-height: 100vh;
  display: flex; flex-direction: column;
`;

const Eyebrow = styled.div`
  display: inline-flex; align-items: center; gap: 10px;
  padding: 6px 18px; border-radius: 20px;
  border: 1px solid rgba(0,200,232,0.35);
  background: rgba(0,200,232,0.06);
  width: fit-content; margin-bottom: 16px;
  animation: ${fadeUp} 0.8s ease both; animation-delay: 0.1s;
  span {
    font-family: ${typography.fontBody}; font-size: 0.7rem;
    font-weight: ${typography.weightSemibold};
    letter-spacing: 0.22em; text-transform: uppercase;
    color: ${colors.cyan};
  }
`;

const Title = styled.h1`
  font-family: ${typography.fontDisplay}; font-weight: ${typography.weightBlack};
  font-size: clamp(2.4rem, 5vw, 4.2rem); line-height: 1.12;
  letter-spacing: -0.02em; color: #fff; margin-bottom: 10px;
  animation: ${fadeUp} 1s ease both; animation-delay: 0.2s;
  .accent { color: ${colors.cyan}; }
  .red { color: #ff6b6b; }
`;

const Subtitle = styled.p`
  font-family: ${typography.fontBody}; font-weight: ${typography.weightLight};
  font-size: clamp(0.9rem, 1.3vw, 1.1rem); line-height: 1.7;
  color: rgba(255,255,255,0.55); max-width: 760px; margin-bottom: 24px;
  animation: ${fadeUp} 1s ease both; animation-delay: 0.35s;
`;

const ControlBar = styled.div`
  display: flex; align-items: center; gap: 12px; flex-wrap: wrap;
  margin-bottom: 20px;
  animation: ${fadeIn} 1s ease both; animation-delay: 0.5s;
`;

const StageButton = styled.button`
  font-family: ${typography.fontBody}; font-size: 0.72rem;
  font-weight: ${typography.weightSemibold}; padding: 7px 16px;
  border-radius: 8px; cursor: pointer; transition: all 0.3s ease;
  border: 1px solid ${({ $active }) => $active ? 'rgba(0,200,232,0.6)' : 'rgba(255,255,255,0.12)'};
  background: ${({ $active }) => $active ? 'rgba(0,200,232,0.12)' : 'rgba(255,255,255,0.04)'};
  color: ${({ $active }) => $active ? colors.cyan : 'rgba(255,255,255,0.5)'};
  &:hover { border-color: rgba(0,200,232,0.4); color: ${colors.cyan}; }
`;

const ActionButton = styled.button`
  font-family: ${typography.fontBody}; font-size: 0.72rem;
  font-weight: ${typography.weightSemibold}; padding: 7px 16px;
  border-radius: 8px; cursor: pointer; transition: all 0.3s ease;
  border: 1px solid ${({ $variant }) => $variant === 'pause' ? 'rgba(0,200,232,0.5)' : 'rgba(255,255,255,0.15)'};
  background: ${({ $variant }) => $variant === 'pause' ? 'rgba(0,200,232,0.1)' : 'rgba(255,255,255,0.05)'};
  color: ${({ $variant }) => $variant === 'pause' ? colors.cyan : 'rgba(255,255,255,0.6)'};
  margin-left: auto;
  &:hover { border-color: rgba(0,200,232,0.4); }
`;

const MainArea = styled.div`
  flex: 1; display: flex; gap: 36px; align-items: flex-start;
  animation: ${fadeUp} 1.2s ease both; animation-delay: 0.5s;
  @media (max-width: 1100px) { flex-direction: column; }
`;

const DiagramPanel = styled.div`
  flex: 1; min-width: 0; background: rgba(0,0,0,0.25);
  border: 1px solid rgba(0,200,232,0.1); border-radius: 16px;
  padding: 20px; position: relative; overflow: hidden;
  backdrop-filter: blur(8px);
`;

const InfoPanel = styled.div`
  width: 340px; flex-shrink: 0; display: flex; flex-direction: column; gap: 16px;
  @media (max-width: 1100px) { width: 100%; }
`;

const InfoCard = styled.div`
  padding: 20px; border-radius: 14px;
  border: 1px solid ${({ $borderColor }) => $borderColor || 'rgba(255,255,255,0.08)'};
  background: ${({ $bg }) => $bg || 'rgba(0,0,0,0.25)'};
  backdrop-filter: blur(6px);
  animation: ${slideDown} 0.8s ease both;
`;

const CardTag = styled.p`
  font-size: 0.55rem; font-weight: 700; text-transform: uppercase;
  letter-spacing: 0.16em; margin-bottom: 10px;
  color: ${({ $color }) => $color || 'rgba(255,255,255,0.3)'};
`;

const CardTitle = styled.p`
  font-size: 1rem; font-weight: 700; color: #fff;
  margin-bottom: 8px; line-height: 1.3;
`;

const CardBody = styled.p`
  font-size: 0.75rem; color: rgba(255,255,255,0.55);
  line-height: 1.7;
`;

const CardNote = styled.p`
  font-size: 0.68rem; color: rgba(255,255,255,0.3);
  margin-top: 8px; font-style: italic;
`;

const MetricRow = styled.div`
  display: flex; align-items: center; gap: 10px;
  margin-top: 12px; padding: 8px 14px; border-radius: 8px;
  background: rgba(0,0,0,0.3);
  border: 1px solid ${({ $color }) => $color || 'rgba(255,255,255,0.1)'}25;
`;

const MetricDot = styled.div`
  width: 8px; height: 8px; border-radius: 50%;
  background: ${({ $color }) => $color};
  box-shadow: 0 0 8px ${({ $color }) => $color};
`;

const StageLabel = styled.div`
  display: inline-flex; align-items: center; gap: 8px;
  padding: 5px 14px; border-radius: 6px;
  background: rgba(0,0,0,0.4);
  border: 1px solid rgba(255,255,255,0.08);
  font-size: 0.72rem; font-weight: 600; color: rgba(255,255,255,0.7);
  margin-bottom: 12px; width: fit-content;
`;

const BottomBar = styled.div`
  margin-top: 28px; padding: 16px 24px; border-radius: 12px;
  background: rgba(0,0,0,0.35); border: 1px solid rgba(255,255,255,0.06);
  text-align: center; animation: ${fadeUp} 1s ease both; animation-delay: 1s;
`;

const BottomTitle = styled.p`
  font-size: 0.95rem; font-weight: 700; line-height: 1.4;
  color: ${({ $color }) => $color || '#ff6b6b'};
  margin-bottom: 4px;
`;

const BottomSub = styled.p`
  font-size: 0.78rem; color: rgba(255,255,255,0.45); line-height: 1.5;
`;

const LegendRow = styled.div`
  display: flex; gap: 20px; flex-wrap: wrap; justify-content: center;
  margin-top: 10px;
`;

const LegendItem = styled.div`
  display: flex; align-items: center; gap: 6px;
  font-size: 0.65rem; color: rgba(255,255,255,0.4);
`;

const LegendDot = styled.div`
  width: 8px; height: 8px; border-radius: 50%;
  background: ${({ $color }) => $color};
  opacity: 0.8;
`;

/* ═══════════════════════════════════════════════════════════════════
   NODE CLUSTER CONFIGURATION
   ═══════════════════════════════════════════════════════════════════ */
const CLUSTER_NODES = [
  { id: 'A', label: 'A', cx: 400, cy: 120 },
  { id: 'B', label: 'B', cx: 560, cy: 220 },
  { id: 'C', label: 'C', cx: 500, cy: 380 },
  { id: 'D', label: 'D', cx: 300, cy: 380 },
  { id: 'E', label: 'E', cx: 240, cy: 220 },
];

const CLIENT_GROUPS = [
  { id: 'c1', cx: 60, cy: 160 },
  { id: 'c2', cx: 60, cy: 270 },
  { id: 'c3', cx: 60, cy: 380 },
];

const DISTRIBUTED_NODES_RIGHT = [
  { id: 'N1', label: 'Node-1', cx: 730, cy: 140, status: 'healthy' },
  { id: 'N2', label: 'Node-2', cx: 730, cy: 270, status: 'crashed' },
  { id: 'N3', label: 'Node-3', cx: 730, cy: 400, status: 'healthy' },
];

/* ═══════════════════════════════════════════════════════════════════
   STAGE DEFINITIONS
   ═══════════════════════════════════════════════════════════════════ */
const STAGES = [
  { id: 0, label: 'Problem', name: 'The Downtime Problem', color: '#ff6b6b' },
  { id: 1, label: 'Stage 1', name: 'Normal Gossip', color: colors.cyan },
  { id: 2, label: 'Stage 2', name: 'Direct Ping Failure', color: '#ff6b6b' },
  { id: 3, label: 'Stage 3', name: 'Indirect Probe Request', color: colors.cyan },
  { id: 4, label: 'Stage 4', name: 'Node Marked SUSPECT', color: '#f0a030' },
  { id: 5, label: 'Stage 5', name: 'Failure Confirmed', color: '#ff6b6b' },
  { id: 6, label: 'Stage 6', name: 'Gossip Dissemination', color: '#6dd880' },
  { id: 7, label: 'Summary', name: 'SWIM vs Traditional', color: colors.cyan },
];

const STAGE_INTERVAL = 6000;

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */
const Slide5 = () => {
  const [stage, setStage] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const [animKey, setAnimKey] = useState(0);

  const clearTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const startAutoPlay = useCallback(() => {
    clearTimer();
    timerRef.current = setInterval(() => {
      setStage(prev => {
        if (prev >= STAGES.length - 1) { clearInterval(timerRef.current); timerRef.current = null; return prev; }
        return prev + 1;
      });
    }, STAGE_INTERVAL);
  }, [clearTimer]);

  useEffect(() => {
    if (!paused) startAutoPlay();
    return clearTimer;
  }, [paused, startAutoPlay, clearTimer]);

  const handleStageClick = (idx) => {
    setStage(idx);
    setAnimKey(k => k + 1);
    clearTimer();
    if (!paused) startAutoPlay();
  };

  const handlePause = () => {
    if (paused) { setPaused(false); }
    else { setPaused(true); clearTimer(); }
  };

  const handleRestart = () => {
    setStage(0); setPaused(false); setAnimKey(k => k + 1);
    clearTimer(); startAutoPlay();
  };

  const currentStage = STAGES[stage];

  /* ─── Eyebrow text ─── */
  const eyebrowText = stage === 0
    ? 'AVAILABILITY · PROBLEM'
    : stage === 7
    ? 'AVAILABILITY · SUMMARY'
    : `AVAILABILITY · SOLUTION ${stage} OF 6`;

  /* ─── Title ─── */
  const titleContent = stage === 0
    ? <><span className="red">The Downtime</span> Problem</>
    : stage === 7
    ? <>SWIM Protocol <span className="accent">Summary</span></>
    : <>Gossip / <span className="accent">SWIM</span> Protocol</>;

  const subtitleContent = stage === 0
    ? 'What happens when a server dies at 3 AM?'
    : stage === 7
    ? 'Why SWIM became the industry standard for membership management in distributed systems.'
    : 'Nodes check on each other. No single monitor. No single point of failure.';

  return (
    <Shell>
      <style>{`
        @keyframes skullBobRaw { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-3px)} }
        .skull-bob { animation: skullBobRaw 2s ease infinite; }
        @keyframes fadeInRaw { from{opacity:0} to{opacity:1} }
        .anim-fade-in { animation: fadeInRaw 0.5s ease both; }
      `}</style>
      <Grid />
      <Particles count={14} />
      <LogoWrap><Logo alt="EPAM" width={220} /></LogoWrap>

      <Content>
        <Eyebrow><span>{eyebrowText}</span></Eyebrow>
        <Title key={`t-${stage}`}>{titleContent}</Title>
        <Subtitle key={`s-${stage}`}>{subtitleContent}</Subtitle>

        <ControlBar>
          <StageLabel>{currentStage.label}: {currentStage.name}</StageLabel>
          {STAGES.map((s, i) => (
            <StageButton key={s.id} $active={stage === i} onClick={() => handleStageClick(i)}>
              {s.label}
            </StageButton>
          ))}
          <ActionButton $variant="pause" onClick={handlePause}>
            {paused ? '▶ Play' : '⏸ Pause'}
          </ActionButton>
          <ActionButton onClick={handleRestart}>↻ Restart</ActionButton>
        </ControlBar>

        {stage === 0 && <ProblemView key={`pv-${animKey}`} />}
        {stage >= 1 && stage <= 6 && <SwimView stage={stage} key={`sv-${animKey}-${stage}`} />}
        {stage === 7 && <SummaryView key={`sum-${animKey}`} />}
      </Content>
    </Shell>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   PROBLEM VIEW — Stage 0
   ═══════════════════════════════════════════════════════════════════ */
const ProblemView = () => {
  const [subPhase, setSubPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setSubPhase(1), 1500);
    const t2 = setTimeout(() => setSubPhase(2), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <>
      <MainArea>
        <DiagramPanel>
          <svg viewBox="0 0 820 500" style={{ width: '100%', height: 'auto' }}>
            <defs>
              <filter id="glow5"><feGaussianBlur stdDeviation="3" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              <marker id="arrowCyan5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill={colors.cyan} />
              </marker>
              <marker id="arrowRed5" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#ff6b6b" />
              </marker>
            </defs>

            {/* Monitoring label */}
            <text x={55} y={120} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="11" fontWeight="700" letterSpacing="0.12em">CLIENTS</text>

            {/* Client groups */}
            {CLIENT_GROUPS.map((g, i) => (
              <g key={g.id}>
                {[0, 1, 2].map(j => (
                  <g key={j}>
                    <circle cx={g.cx - 15 + j * 30} cy={g.cy} r={16} fill="rgba(0,200,232,0.08)" stroke={colors.cyan} strokeWidth="1.2" />
                    <text x={g.cx - 15 + j * 30} y={g.cy + 4} textAnchor="middle" fill={colors.cyan} fontSize="12" fontWeight="700">
                      {['👤','👤','👤'][j]}
                    </text>
                  </g>
                ))}
                {/* Error/Timeout labels appear with subPhase */}
                {subPhase >= 1 && (
                  <g>
                    <text x={g.cx} y={g.cy + 36} textAnchor="middle" fill="#ff6b6b" fontSize="9" fontWeight="700">
                      ⚠ {i === 1 ? 'Timeout' : 'Errors'}
                    </text>
                  </g>
                )}
              </g>
            ))}

            {/* Connection lines from clients to nodes */}
            {CLIENT_GROUPS.map((g, i) => {
              const target = DISTRIBUTED_NODES_RIGHT[i];
              return (
                <line key={`conn-${i}`} x1={g.cx + 50} y1={g.cy} x2={target.cx - 75} y2={target.cy}
                  stroke={target.status === 'crashed' ? '#ff6b6b' : 'rgba(0,200,232,0.15)'}
                  strokeWidth="1" strokeDasharray={target.status === 'crashed' ? '6 4' : '4 3'}
                  opacity={0.5} />
              );
            })}

            {/* Distributed nodes label */}
            <text x={730} y={80} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="11" fontWeight="700" letterSpacing="0.12em">DISTRIBUTED NODES</text>

            {/* Distributed Nodes */}
            {DISTRIBUTED_NODES_RIGHT.map((n, i) => {
              const isCrashed = n.status === 'crashed';
              return (
                <g key={n.id}>
                  {/* Node box */}
                  <rect x={n.cx - 65} y={n.cy - 40} width={130} height={80} rx={10}
                    fill={isCrashed ? 'rgba(80,40,40,0.6)' : 'rgba(0,200,232,0.04)'}
                    stroke={isCrashed ? 'rgba(255,107,107,0.4)' : colors.cyan}
                    strokeWidth={isCrashed ? '1.5' : '1.2'} />

                  {/* Node name */}
                  <text x={n.cx} y={n.cy - 6} textAnchor="middle"
                    fill={isCrashed ? '#ff6b6b' : colors.cyan}
                    fontSize="14" fontWeight="700">{n.label}</text>
                  <text x={n.cx} y={n.cy + 14} textAnchor="middle"
                    fill={isCrashed ? 'rgba(255,107,107,0.7)' : 'rgba(0,200,232,0.6)'}
                    fontSize="10" fontWeight="500">
                    {isCrashed ? 'CRASHED' : 'Healthy'}
                  </text>

                  {/* Skull for crashed */}
                  {isCrashed && (
                    <text x={n.cx + 50} y={n.cy - 28} fontSize="22" className="skull-bob">💀</text>
                  )}

                  {/* Glow ring for healthy */}
                  {!isCrashed && (
                    <circle cx={n.cx} cy={n.cy} r={45} fill="none"
                      stroke={colors.cyan} strokeWidth="0.8" opacity="0.15" />
                  )}
                </g>
              );
            })}

            {/* "Still receiving traffic" badge on Node-3 */}
            {subPhase >= 2 && (
              <g>
                <rect x={645} y={DISTRIBUTED_NODES_RIGHT[2].cy - 68} width={160} height={22} rx={4}
                  fill="rgba(240,160,48,0.15)" stroke="rgba(240,160,48,0.5)" strokeWidth="0.8" />
                <text x={725} y={DISTRIBUTED_NODES_RIGHT[2].cy - 53} textAnchor="middle"
                  fill="#f0a030" fontSize="9" fontWeight="600">Still receiving traffic!</text>
              </g>
            )}

            {/* Manual Intervention badge */}
            {subPhase >= 1 && (
              <g>
                <rect x={40} y={100} width={170} height={28} rx={6}
                  fill="rgba(0,0,0,0.5)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
                <text x={125} y={118} textAnchor="middle" fill="rgba(255,255,255,0.8)"
                  fontSize="10" fontWeight="700">Manual Intervention Required</text>
              </g>
            )}

            {/* Phase info */}
            {subPhase >= 1 && (
              <g>
                <rect x={40} y={440} width={730} height={2} rx={1}
                  fill="rgba(255,255,255,0.05)" />
              </g>
            )}
          </svg>
        </DiagramPanel>

        <InfoPanel>
          <InfoCard $borderColor="rgba(255,107,107,0.2)" $bg="rgba(255,50,50,0.04)">
            <CardTag $color="#ff6b6b">⚠ The Problem</CardTag>
            <CardTitle>Node Failure → Silent Catastrophe</CardTitle>
            <CardBody>
              When a node crashes at 3 AM, the system doesn't know. Clients continue routing
              requests to the dead node — causing timeouts, errors, and cascading failures.
            </CardBody>
            <CardNote>No automatic health checks. No traffic rerouting. Downtime = $5,600/minute.</CardNote>
          </InfoCard>

          <InfoCard $borderColor="rgba(255,255,255,0.06)">
            <CardTag $color="rgba(255,255,255,0.25)">Why Traditional Heartbeats Fail</CardTag>
            <CardTitle>O(N²) Communication Overhead</CardTitle>
            <CardBody>
              All-to-all heartbeat protocols require every node to ping every other node.
              At 1,000 nodes → 1 million health checks per interval. The monitoring system
              itself becomes the bottleneck.
            </CardBody>
            <MetricRow $color="#ff6b6b">
              <MetricDot $color="#ff6b6b" />
              <span style={{fontSize:'0.75rem',fontWeight:700,color:'#ff6b6b'}}>Single point of failure</span>
              <span style={{fontSize:'0.7rem',color:'rgba(255,255,255,0.4)'}}>· Centralized monitor</span>
            </MetricRow>
          </InfoCard>

          <InfoCard $borderColor="rgba(255,255,255,0.06)">
            <CardTag $color="rgba(255,255,255,0.2)">Scale Impact</CardTag>
            <div style={{display:'flex',gap:10,marginTop:6}}>
              {[
                {val:'1,000+',lbl:'Nodes'},
                {val:'O(N²)',lbl:'Messages'},
                {val:'30s+',lbl:'Detection'},
              ].map((m,i) => (
                <div key={i} style={{flex:1,padding:'8px 10px',borderRadius:8,background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)',textAlign:'center'}}>
                  <p style={{fontSize:'1rem',fontWeight:800,color:'#ff6b6b',marginBottom:2}}>{m.val}</p>
                  <p style={{fontSize:'0.6rem',color:'rgba(255,255,255,0.4)'}}>{m.lbl}</p>
                </div>
              ))}
            </div>
          </InfoCard>
        </InfoPanel>
      </MainArea>

      <BottomBar>
        <BottomTitle $color="#ff6b6b">
          Node-2 crashed, but the system doesn't know yet.
        </BottomTitle>
        <BottomSub>
          Clients continue routing requests to the dead node → Timeouts → Errors
        </BottomSub>
      </BottomBar>
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SWIM VIEW — Stages 1-6
   ═══════════════════════════════════════════════════════════════════ */
const NODE_R = 32;
const CX = 400, CY = 260, CR = 150;

const SWIM_NODES = [
  { id: 'A', angle: -90 },
  { id: 'B', angle: -18 },
  { id: 'C', angle: 54 },
  { id: 'D', angle: 126 },
  { id: 'E', angle: 198 },
];

function nodePos(angle) {
  const rad = angle * Math.PI / 180;
  return { x: CX + CR * Math.cos(rad), y: CY + CR * Math.sin(rad) };
}

const SwimView = ({ stage }) => {
  const [subStep, setSubStep] = useState(0);

  useEffect(() => {
    setSubStep(0);
    const t1 = setTimeout(() => setSubStep(1), 800);
    const t2 = setTimeout(() => setSubStep(2), 2000);
    const t3 = setTimeout(() => setSubStep(3), 3500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [stage]);

  const nodeA = nodePos(SWIM_NODES[0].angle);
  const nodeB = nodePos(SWIM_NODES[1].angle);
  const nodeC = nodePos(SWIM_NODES[2].angle);
  const nodeD = nodePos(SWIM_NODES[3].angle);
  const nodeE = nodePos(SWIM_NODES[4].angle);

  const getNodeStatus = (id) => {
    if (id === 'B') {
      if (stage >= 5) return 'dead';
      if (stage >= 4) return 'suspect';
      if (stage >= 2) return 'failed';
      return 'healthy';
    }
    return 'healthy';
  };

  const getNodeFill = (status) => {
    switch(status) {
      case 'healthy': return 'rgba(0,200,232,0.06)';
      case 'failed': return 'rgba(100,80,70,0.5)';
      case 'suspect': return 'rgba(180,130,40,0.15)';
      case 'dead': return 'rgba(120,40,40,0.4)';
      default: return 'rgba(0,200,232,0.06)';
    }
  };

  const getNodeStroke = (status) => {
    switch(status) {
      case 'healthy': return colors.cyan;
      case 'failed': return 'rgba(160,140,120,0.5)';
      case 'suspect': return '#f0a030';
      case 'dead': return '#ff6b6b';
      default: return colors.cyan;
    }
  };

  const getNodeLabelColor = (status) => {
    switch(status) {
      case 'healthy': return '#fff';
      case 'failed': return 'rgba(255,255,255,0.5)';
      case 'suspect': return '#f0a030';
      case 'dead': return '#ff6b6b';
      default: return '#fff';
    }
  };

  /* Info card data per stage */
  const stageCards = {
    1: {
      tag: 'SWIM Stage 1', tagColor: colors.cyan,
      border: `${colors.cyan}33`, bg: `${colors.cyan}08`,
      title: 'Normal Gossip Communication',
      body: 'All nodes are healthy and running peer-to-peer gossip protocol. Each node periodically selects a random peer and exchanges membership state. Information propagates in O(log N) rounds.',
      note: 'Decentralized — no single coordinator. Each node maintains its own membership list.',
      metric: { label: 'O(N) per round', sub: '· Scalable', color: colors.cyan },
    },
    2: {
      tag: 'SWIM Stage 2', tagColor: '#ff6b6b',
      border: 'rgba(255,107,107,0.25)', bg: 'rgba(255,50,50,0.04)',
      title: 'Direct Ping Failure',
      body: 'Node A sends a direct ping to Node B. No response received within timeout window. This could be a transient failure or actual crash. SWIM does NOT immediately declare B dead.',
      note: 'Unlike traditional heartbeats, SWIM uses a multi-stage verification process to reduce false positives.',
      metric: { label: 'Ping timeout', sub: '· Verification needed', color: '#ff6b6b' },
    },
    3: {
      tag: 'SWIM Stage 3', tagColor: colors.cyan,
      border: `${colors.cyan}33`, bg: `${colors.cyan}06`,
      title: 'Indirect Probe Request',
      body: 'A asks helper nodes (D and E): "Can YOU reach B?" — this is the ping-req mechanism. Helpers attempt to ping B independently, reducing false positives from network partitions between A and B.',
      note: 'Key insight: If A can\'t reach B but D can → it\'s a network partition, not a failure.',
      metric: { label: 'K helpers probing', sub: '· K typically 2-3', color: colors.cyan },
    },
    4: {
      tag: 'SWIM Stage 4', tagColor: '#f0a030',
      border: 'rgba(240,160,48,0.25)', bg: 'rgba(240,160,48,0.04)',
      title: 'Node Marked SUSPECT',
      body: 'Neither A nor helpers could reach B. B is marked as SUSPECT in the membership list — not dead yet. This grace period allows for temporary network delays, GC pauses, or brief CPU spikes.',
      note: 'Suspect state gives the node a chance to refute the suspicion by sending an "alive" message.',
      metric: { label: 'Grace period active', sub: '· Awaiting refutation', color: '#f0a030' },
    },
    5: {
      tag: 'SWIM Stage 5', tagColor: '#ff6b6b',
      border: 'rgba(255,107,107,0.25)', bg: 'rgba(255,50,50,0.04)',
      title: 'Failure Confirmed',
      body: 'Timeout expired. No refutation received from B. Node B is now marked as DEAD in the membership list. All nodes will be notified through gossip dissemination.',
      note: 'Multi-stage verification ensures extremely low false positive rate.',
      metric: { label: 'Node confirmed dead', sub: '· Membership updated', color: '#ff6b6b' },
    },
    6: {
      tag: 'SWIM Stage 6', tagColor: '#6dd880',
      border: 'rgba(109,216,128,0.25)', bg: 'rgba(109,216,128,0.04)',
      title: 'Gossip Dissemination',
      body: 'Failure information spreads across all cluster members using infection-style gossip propagation. Each node piggybacks the failure notification onto regular protocol messages.',
      note: 'Guaranteed cluster-wide convergence in O(log N) protocol rounds. Zero extra network overhead.',
      metric: { label: 'Cluster converged', sub: '· All nodes updated', color: '#6dd880' },
    },
  };

  const card = stageCards[stage];

  return (
    <>
      <MainArea>
        <DiagramPanel>
          <svg viewBox="0 0 800 500" style={{ width: '100%', height: 'auto' }}>
            <defs>
              <filter id="sGlow"><feGaussianBlur stdDeviation="4" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
              <filter id="sGlowStrong"><feGaussianBlur stdDeviation="6" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>

            {/* Cluster ring */}
            <circle cx={CX} cy={CY} r={CR + 50} fill="none"
              stroke={colors.cyan} strokeWidth="0.8" strokeDasharray="8 5" opacity="0.15" />
            <text x={CX} y={CY - CR - 62} textAnchor="middle"
              fill={colors.cyan} fontSize="10" fontWeight="700" letterSpacing="0.15em" opacity="0.6">
              DISTRIBUTED NODES
            </text>

            {/* Gossip lines — Stage 1 */}
            {stage === 1 && subStep >= 1 && (
              <>
                <AnimatedGossipLine from={nodeA} to={nodeB} color={colors.cyan} delay={0} />
                <AnimatedGossipLine from={nodeB} to={nodeC} color={colors.cyan} delay={0.3} />
                <AnimatedGossipLine from={nodeC} to={nodeD} color={colors.cyan} delay={0.6} />
                <AnimatedGossipLine from={nodeD} to={nodeE} color={colors.cyan} delay={0.9} />
                <AnimatedGossipLine from={nodeE} to={nodeA} color={colors.cyan} delay={1.2} />
                <AnimatedGossipLine from={nodeA} to={nodeD} color={colors.cyan} delay={0.5} />
              </>
            )}

            {/* Stage 2: Ping failure A → B */}
            {stage === 2 && subStep >= 1 && (
              <>
                <AnimatedArrow from={nodeA} to={nodeB} color="#ff6b6b" label="ping" delay={0} />
                {subStep >= 2 && (
                  <g>
                    <text x={(nodeA.x + nodeB.x)/2 + 20} y={(nodeA.y + nodeB.y)/2 + 5}
                      fill="#ff6b6b" fontSize="16" fontWeight="900">✗</text>
                    <text x={(nodeA.x + nodeB.x)/2 + 20} y={(nodeA.y + nodeB.y)/2 + 20}
                      fill="#ff6b6b" fontSize="8" fontWeight="600">timeout</text>
                  </g>
                )}
              </>
            )}

            {/* Stage 3: Indirect probe A → D,E → B */}
            {stage === 3 && subStep >= 1 && (
              <>
                <AnimatedArrow from={nodeA} to={nodeE} color={colors.cyan} label="ping-req" delay={0} />
                <AnimatedArrow from={nodeA} to={nodeD} color={colors.cyan} label="ping-req" delay={0.3} />
                {subStep >= 2 && (
                  <>
                    <AnimatedArrow from={nodeE} to={nodeB} color="rgba(255,255,255,0.3)" label="ping" delay={0} dashed />
                    <AnimatedArrow from={nodeD} to={nodeB} color="rgba(255,255,255,0.3)" label="ping" delay={0.3} dashed />
                  </>
                )}
                {subStep >= 3 && (
                  <>
                    <text x={nodeB.x + 45} y={nodeB.y - 10} fill="#ff6b6b" fontSize="14" fontWeight="900">✗</text>
                    <text x={nodeB.x + 45} y={nodeB.y + 5} fill="#ff6b6b" fontSize="7">no reply</text>
                  </>
                )}
              </>
            )}

            {/* Stage 4: SUSPECT badge */}
            {stage === 4 && (
              <g>
                <rect x={nodeB.x - 28} y={nodeB.y - NODE_R - 22} width={56} height={18} rx={4}
                  fill="#f0a030" opacity="0.9" />
                <text x={nodeB.x} y={nodeB.y - NODE_R - 9} textAnchor="middle"
                  fill="#000" fontSize="8" fontWeight="800">SUSPECT</text>
                {/* Timeout indicator */}
                {subStep >= 2 && (
                  <g>
                    <rect x={nodeB.x - 40} y={nodeB.y + NODE_R + 12} width={80} height={6} rx={3}
                      fill="rgba(240,160,48,0.15)" stroke="rgba(240,160,48,0.3)" strokeWidth="0.5" />
                    <rect x={nodeB.x - 40} y={nodeB.y + NODE_R + 12}
                      width={subStep >= 3 ? 80 : 40} height={6} rx={3}
                      fill="#f0a030" opacity="0.7">
                    </rect>
                    <text x={nodeB.x} y={nodeB.y + NODE_R + 30} textAnchor="middle"
                      fill="rgba(240,160,48,0.7)" fontSize="7" fontWeight="500">
                      grace period {subStep >= 3 ? 'expired' : 'active...'}
                    </text>
                  </g>
                )}
              </g>
            )}

            {/* Stage 5: DEAD badge */}
            {stage === 5 && (
              <g>
                <rect x={nodeB.x - 22} y={nodeB.y - NODE_R - 22} width={44} height={18} rx={4}
                  fill="#ff6b6b" />
                <text x={nodeB.x} y={nodeB.y - NODE_R - 9} textAnchor="middle"
                  fill="#fff" fontSize="8" fontWeight="800">DEAD</text>
                <text x={nodeB.x} y={nodeB.y + 4} textAnchor="middle"
                  fill="#ff6b6b" fontSize="20">✗</text>
              </g>
            )}

            {/* Stage 6: Gossip spread */}
            {stage === 6 && subStep >= 1 && (
              <>
                {/* Gossip ripples from each healthy node */}
                {[nodeA, nodeC, nodeD, nodeE].map((n, i) => (
                  subStep >= (i < 2 ? 1 : 2) && (
                    <g key={`gossip-${i}`}>
                      <GossipRipple cx={n.x} cy={n.y} color="#6dd880" delay={i * 0.4} />
                      <AnimatedGossipLine from={n} to={[nodeA, nodeC, nodeD, nodeE][(i + 1) % 4]}
                        color="#6dd880" delay={i * 0.3} />
                    </g>
                  )
                ))}
                {/* "Updated" labels */}
                {subStep >= 2 && [nodeA, nodeC, nodeD, nodeE].map((n, i) => (
                  <g key={`upd-${i}`}>
                    <rect x={n.x - 22} y={n.y + NODE_R + 8} width={44} height={14} rx={3}
                      fill="rgba(109,216,128,0.15)" stroke="rgba(109,216,128,0.3)" strokeWidth="0.5" />
                    <text x={n.x} y={n.y + NODE_R + 18} textAnchor="middle"
                      fill="#6dd880" fontSize="7" fontWeight="600">updated</text>
                  </g>
                ))}
                {/* Dead badge on B */}
                <rect x={nodeB.x - 22} y={nodeB.y - NODE_R - 22} width={44} height={18} rx={4}
                  fill="#ff6b6b" />
                <text x={nodeB.x} y={nodeB.y - NODE_R - 9} textAnchor="middle"
                  fill="#fff" fontSize="8" fontWeight="800">DEAD</text>
                <text x={nodeB.x} y={nodeB.y + 4} textAnchor="middle"
                  fill="#ff6b6b" fontSize="20">✗</text>
              </>
            )}

            {/* All nodes */}
            {SWIM_NODES.map((n) => {
              const pos = nodePos(n.angle);
              const status = getNodeStatus(n.id);
              return (
                <g key={n.id}>
                  {/* Outer glow ring for healthy */}
                  {status === 'healthy' && (
                    <circle cx={pos.x} cy={pos.y} r={NODE_R + 8} fill="none"
                      stroke={colors.cyan} strokeWidth="1" opacity="0.12" />
                  )}
                  {/* Main node circle */}
                  <circle cx={pos.x} cy={pos.y} r={NODE_R}
                    fill={getNodeFill(status)} stroke={getNodeStroke(status)}
                    strokeWidth="2" filter="url(#sGlow)" />
                  {/* Label */}
                  {!(stage === 5 && n.id === 'B') && !(stage === 6 && n.id === 'B') && (
                    <text x={pos.x} y={pos.y + 5} textAnchor="middle"
                      fill={getNodeLabelColor(status)} fontSize="16" fontWeight="800">
                      {n.id}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </DiagramPanel>

        <InfoPanel>
          {card && (
            <InfoCard key={stage} $borderColor={card.border} $bg={card.bg}>
              <CardTag $color={card.tagColor}>{card.tag}</CardTag>
              <CardTitle>{card.title}</CardTitle>
              <CardBody>{card.body}</CardBody>
              {card.note && <CardNote>{card.note}</CardNote>}
              {card.metric && (
                <MetricRow $color={card.metric.color}>
                  <MetricDot $color={card.metric.color} />
                  <span style={{fontSize:'0.75rem',fontWeight:700,color:card.metric.color}}>{card.metric.label}</span>
                  <span style={{fontSize:'0.7rem',color:'rgba(255,255,255,0.4)'}}>{card.metric.sub}</span>
                </MetricRow>
              )}
            </InfoCard>
          )}

          {/* Protocol details card */}
          <InfoCard $borderColor="rgba(255,255,255,0.06)">
            <CardTag $color="rgba(255,255,255,0.2)">Protocol Details</CardTag>
            <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
              {[
                {label:'Detection',val: stage <= 2 ? '~2s' : stage <= 4 ? '~4s' : '~5s', color: colors.cyan},
                {label:'Messages',val:'O(N)', color: '#6dd880'},
                {label:'False +',val:stage >= 3 ? 'Very Low' : 'Low', color: '#f0a030'},
              ].map((m,i) => (
                <div key={i} style={{flex:1,minWidth:80,padding:'8px 10px',borderRadius:8,background:'rgba(0,0,0,0.2)',border:'1px solid rgba(255,255,255,0.06)',textAlign:'center'}}>
                  <p style={{fontSize:'0.85rem',fontWeight:800,color:m.color,marginBottom:2}}>{m.val}</p>
                  <p style={{fontSize:'0.55rem',color:'rgba(255,255,255,0.35)'}}>{m.label}</p>
                </div>
              ))}
            </div>
          </InfoCard>

          {/* Progress indicator */}
          <InfoCard $borderColor="rgba(255,255,255,0.06)">
            <CardTag $color="rgba(255,255,255,0.2)">SWIM Stages Progress</CardTag>
            <div style={{display:'flex',gap:4,marginTop:4}}>
              {[1,2,3,4,5,6].map(s => (
                <div key={s} style={{
                  flex:1,height:6,borderRadius:3,
                  background: s <= stage ? STAGES[s].color : 'rgba(255,255,255,0.06)',
                  opacity: s <= stage ? 0.8 : 0.3,
                  transition: 'all 0.5s ease',
                }} />
              ))}
            </div>
            <div style={{display:'flex',justifyContent:'space-between',marginTop:6}}>
              <span style={{fontSize:'0.55rem',color:'rgba(255,255,255,0.3)'}}>Ping</span>
              <span style={{fontSize:'0.55rem',color:'rgba(255,255,255,0.3)'}}>Gossip</span>
            </div>
          </InfoCard>
        </InfoPanel>
      </MainArea>

      <BottomBar>
        <BottomTitle $color={STAGES[stage].color}>
          {stage === 1 && 'All nodes healthy, running peer-to-peer gossip protocol'}
          {stage === 2 && 'A pings B directly — no response. Possible failure detected.'}
          {stage === 3 && "A asks D and E: 'Can YOU reach B?' (ping-req)"}
          {stage === 4 && 'B marked SUSPECT (brief grace period)'}
          {stage === 5 && 'Grace period expired → B confirmed DEAD'}
          {stage === 6 && 'Failure info propagates via gossip — cluster converges in O(log N) rounds'}
        </BottomTitle>
        <BottomSub>
          {stage === 1 && 'Scalable membership protocol — O(N) messages per round, not O(N²)'}
          {stage === 2 && 'SWIM does not immediately declare failure. Multi-stage verification begins.'}
          {stage === 3 && 'Indirect probing eliminates false positives from network partitions between A and B'}
          {stage === 4 && 'Suspect state allows recovery from GC pauses, temporary network hiccups, CPU spikes'}
          {stage === 5 && 'Only after multi-stage verification with zero false positive tolerance'}
          {stage === 6 && 'Infection-style dissemination guarantees eventual consistency with zero extra overhead'}
        </BottomSub>
        <LegendRow>
          <LegendItem><LegendDot $color={colors.cyan} />Healthy</LegendItem>
          <LegendItem><LegendDot $color="#f0a030" />Suspect</LegendItem>
          <LegendItem><LegendDot $color="#ff6b6b" />Dead</LegendItem>
          <LegendItem><LegendDot $color="#6dd880" />Gossip Update</LegendItem>
          <LegendItem>
            <div style={{width:14,height:2,background:colors.cyan,borderRadius:1}} />
            <span>Ping/Gossip</span>
          </LegendItem>
          <LegendItem>
            <div style={{width:14,height:2,background:'#ff6b6b',borderRadius:1,borderTop:'1px dashed #ff6b6b'}} />
            <span>Failed</span>
          </LegendItem>
        </LegendRow>
      </BottomBar>
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════════
   SUMMARY VIEW — Stage 7
   ═══════════════════════════════════════════════════════════════════ */
const SummaryView = () => (
  <>
    <MainArea>
      <div style={{flex:1,display:'flex',flexDirection:'column',gap:20}}>
        {/* Comparison Table */}
        <InfoCard $borderColor={`${colors.cyan}22`} $bg="rgba(0,0,0,0.3)">
          <CardTag $color={colors.cyan}>SWIM vs Traditional Heartbeats</CardTag>
          <div style={{marginTop:12}}>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.78rem'}}>
              <thead>
                <tr style={{borderBottom:'1px solid rgba(255,255,255,0.08)'}}>
                  <th style={{padding:'10px 12px',textAlign:'left',color:'rgba(255,255,255,0.4)',fontWeight:600,fontSize:'0.68rem',letterSpacing:'0.1em',textTransform:'uppercase'}}>Metric</th>
                  <th style={{padding:'10px 12px',textAlign:'center',color:'#ff6b6b',fontWeight:600,fontSize:'0.68rem',letterSpacing:'0.1em',textTransform:'uppercase'}}>Traditional</th>
                  <th style={{padding:'10px 12px',textAlign:'center',color:'#6dd880',fontWeight:600,fontSize:'0.68rem',letterSpacing:'0.1em',textTransform:'uppercase'}}>SWIM</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Scalability','O(N²) messages','O(N) messages'],
                  ['Detection Speed','30-60 seconds','2-5 seconds'],
                  ['Network Traffic','High — grows quadratically','Low — constant per node'],
                  ['False Positives','Frequent','Near zero'],
                  ['Fault Tolerance','Single point of failure','Fully decentralized'],
                  ['Complexity','Central coordinator required','Peer-to-peer, self-organizing'],
                ].map(([metric, trad, swim], i) => (
                  <tr key={i} style={{borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
                    <td style={{padding:'10px 12px',color:'rgba(255,255,255,0.7)',fontWeight:600}}>{metric}</td>
                    <td style={{padding:'10px 12px',textAlign:'center',color:'rgba(255,107,107,0.8)'}}>{trad}</td>
                    <td style={{padding:'10px 12px',textAlign:'center',color:'rgba(109,216,128,0.9)',fontWeight:600}}>{swim}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </InfoCard>

        {/* Advantages Grid */}
        <div style={{display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:12}}>
          {[
            {icon:'⚡',title:'Scalable',desc:'O(N) communication — handles 10,000+ nodes'},
            {icon:'🔄',title:'Decentralized',desc:'No single point of failure or coordinator'},
            {icon:'📡',title:'Low Overhead',desc:'Piggybacks on existing protocol messages'},
            {icon:'🎯',title:'Fast Detection',desc:'Sub-second failure detection at scale'},
            {icon:'🛡️',title:'Fault Tolerant',desc:'Survives network partitions gracefully'},
            {icon:'✅',title:'Low False +',desc:'Multi-stage verification eliminates errors'},
          ].map((item, i) => (
            <InfoCard key={i} $borderColor="rgba(0,200,232,0.1)" $bg="rgba(0,200,232,0.02)"
              style={{animationDelay:`${0.1 + i * 0.1}s`}}>
              <div style={{fontSize:'1.5rem',marginBottom:8}}>{item.icon}</div>
              <p style={{fontSize:'0.85rem',fontWeight:700,color:'#fff',marginBottom:4}}>{item.title}</p>
              <p style={{fontSize:'0.68rem',color:'rgba(255,255,255,0.45)',lineHeight:1.5}}>{item.desc}</p>
            </InfoCard>
          ))}
        </div>
      </div>

      <InfoPanel>
        <InfoCard $borderColor={`${colors.cyan}33`} $bg={`${colors.cyan}06`}>
          <CardTag $color={colors.cyan}>Real-World Adoption</CardTag>
          <CardTitle>Industry Standard</CardTitle>
          <CardBody>
            SWIM powers membership management in production systems handling millions of requests per second.
          </CardBody>
          <div style={{display:'flex',flexDirection:'column',gap:8,marginTop:14}}>
            {[
              {name:'HashiCorp Consul',desc:'Service mesh & discovery'},
              {name:'HashiCorp Serf',desc:'Cluster membership'},
              {name:'Uber Ringpop',desc:'Application-layer sharding'},
              {name:'EdgeFabric',desc:'Our distributed cache layer'},
            ].map((item, i) => (
              <div key={i} style={{display:'flex',alignItems:'center',gap:10,padding:'8px 12px',borderRadius:8,background:'rgba(0,0,0,0.2)',border:'1px solid rgba(0,200,232,0.08)'}}>
                <div style={{width:8,height:8,borderRadius:'50%',background:colors.cyan,boxShadow:`0 0 6px ${colors.cyan}`}} />
                <div>
                  <p style={{fontSize:'0.78rem',fontWeight:700,color:'#fff'}}>{item.name}</p>
                  <p style={{fontSize:'0.6rem',color:'rgba(255,255,255,0.4)'}}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </InfoCard>

        <InfoCard $borderColor="rgba(109,216,128,0.2)" $bg="rgba(109,216,128,0.03)">
          <CardTag $color="#6dd880">Key Takeaway</CardTag>
          <CardTitle style={{color:'#6dd880'}}>✓ Minimal Disruption</CardTitle>
          <CardBody>
            SWIM provides provably scalable, decentralized failure detection with near-zero false positives — making it the foundation of modern distributed systems.
          </CardBody>
          <MetricRow $color="#6dd880">
            <MetricDot $color="#6dd880" />
            <span style={{fontSize:'0.75rem',fontWeight:700,color:'#6dd880'}}>Production proven</span>
            <span style={{fontSize:'0.7rem',color:'rgba(255,255,255,0.4)'}}>· 10M+ nodes globally</span>
          </MetricRow>
        </InfoCard>
      </InfoPanel>
    </MainArea>

    <BottomBar>
      <BottomTitle $color={colors.cyan}>
        SWIM: The industry standard for scalable membership management
      </BottomTitle>
      <BottomSub>
        From HashiCorp Consul to EdgeFabric — decentralized failure detection that scales to any cluster size
      </BottomSub>
    </BottomBar>
  </>
);

/* ═══════════════════════════════════════════════════════════════════
   HELPER SVG COMPONENTS
   ═══════════════════════════════════════════════════════════════════ */
const AnimatedGossipLine = ({ from, to, color, delay = 0 }) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.sqrt(dx*dx + dy*dy);
  const ux = dx / len * NODE_R;
  const uy = dy / len * NODE_R;

  return (
    <g>
      <line x1={from.x + ux} y1={from.y + uy} x2={to.x - ux} y2={to.y - uy}
        stroke={color} strokeWidth="0.8" strokeDasharray="4 3" opacity="0.35"
        className="anim-fade-in" style={{animationDelay: `${delay}s`}} />
      {/* Traveling dot */}
      <circle r={2.5} fill={color} opacity="0.9">
        <animate attributeName="cx" values={`${from.x + ux};${to.x - ux};${from.x + ux}`}
          dur="2.5s" begin={`${delay}s`} repeatCount="indefinite" />
        <animate attributeName="cy" values={`${from.y + uy};${to.y - uy};${from.y + uy}`}
          dur="2.5s" begin={`${delay}s`} repeatCount="indefinite" />
      </circle>
    </g>
  );
};

const AnimatedArrow = ({ from, to, color, label, delay = 0, dashed = false }) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.sqrt(dx*dx + dy*dy);
  const ux = dx / len * (NODE_R + 4);
  const uy = dy / len * (NODE_R + 4);
  const x1 = from.x + ux, y1 = from.y + uy;
  const x2 = to.x - ux, y2 = to.y - uy;
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const angle = Math.atan2(dy, dx);
  const perpX = -Math.sin(angle) * 12;
  const perpY = Math.cos(angle) * 12;
  const arrowLen = 8;

  return (
    <g className="anim-fade-in" style={{animationDelay: `${delay}s`, opacity: 0}}>
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={color} strokeWidth="1.5"
        strokeDasharray={dashed ? '6 4' : 'none'} />
      {/* Arrowhead */}
      <polygon
        points={`${x2},${y2} ${x2 - arrowLen * Math.cos(angle - 0.4)},${y2 - arrowLen * Math.sin(angle - 0.4)} ${x2 - arrowLen * Math.cos(angle + 0.4)},${y2 - arrowLen * Math.sin(angle + 0.4)}`}
        fill={color} />
      {/* Label */}
      {label && (
        <text x={mx + perpX} y={my + perpY} textAnchor="middle"
          fill={color} fontSize="8" fontWeight="600" opacity="0.85">{label}</text>
      )}
    </g>
  );
};

const GossipRipple = ({ cx, cy, color, delay = 0 }) => (
  <g>
    <circle cx={cx} cy={cy} r={4} fill="none" stroke={color} strokeWidth="1.5" opacity="0">
      <animate attributeName="r" values="4;24" dur="1.5s" begin={`${delay}s`} repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.7;0" dur="1.5s" begin={`${delay}s`} repeatCount="indefinite" />
    </circle>
    <circle cx={cx} cy={cy} r={4} fill="none" stroke={color} strokeWidth="1" opacity="0">
      <animate attributeName="r" values="4;32" dur="2s" begin={`${delay + 0.5}s`} repeatCount="indefinite" />
      <animate attributeName="opacity" values="0.4;0" dur="2s" begin={`${delay + 0.5}s`} repeatCount="indefinite" />
    </circle>
  </g>
);

export default Slide5;

