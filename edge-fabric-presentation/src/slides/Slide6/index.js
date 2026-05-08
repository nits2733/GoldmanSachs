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
const fadeRight = keyframes`
  from { opacity: 0; transform: translateX(16px); }
  to   { opacity: 1; transform: translateX(0); }
`;
const pulseWarn = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(0,200,232,0); }
  50%      { box-shadow: 0 0 20px 2px rgba(0,200,232,0.15); }
`;

/* ═══ Styled ═══ */
const Shell = styled(SlideWrapper)`
  background:
    radial-gradient(ellipse 50% 40% at 15% 12%, rgba(0,200,232,0.06) 0%, transparent 55%),
    radial-gradient(ellipse 45% 40% at 85% 85%, rgba(0,120,180,0.05) 0%, transparent 55%),
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
  padding: 28px 44px 20px;
  display: flex; flex-direction: column;
`;

const Eyebrow = styled.div`
  font-family: ${typography.fontBody};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weightSemibold};
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: ${colors.cyan};
  margin-bottom: 10px;
  animation: ${fadeLeft} 0.9s 0.2s ease both;
`;

const Title = styled.h1`
  font-family: ${typography.fontDisplay};
  font-weight: ${typography.weightBlack};
  font-size: clamp(1.5rem, 2.8vw, 2.2rem);
  line-height: 1.15; letter-spacing: -0.02em;
  color: #fff; margin-bottom: 6px;
  animation: ${fadeLeft} 0.9s 0.3s ease both;
  max-width: calc(100% - 260px);
  .accent {
    background: linear-gradient(90deg, ${colors.cyan} 0%, #38bdf8 100%);
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Subtitle = styled.p`
  font-family: ${typography.fontBody};
  font-size: clamp(0.72rem, 0.95vw, 0.85rem);
  color: rgba(255,255,255,0.45); font-weight: 300;
  margin-bottom: 16px;
  animation: ${fadeLeft} 0.9s 0.5s ease both;
`;

const Body = styled.div`
  flex: 1; display: flex; gap: 20px; min-height: 0;
`;

const LeftCol = styled.div`
  width: 230px; flex-shrink: 0; display: flex; flex-direction: column; gap: 12px;
  justify-content: flex-start; padding-top: 4px;
  animation: ${fadeLeft} 1s 0.6s ease both;
`;

const RightCol = styled.div`
  flex: 1; display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 12px;
`;

/* SLO Table */
const SloCard = styled.div`
  padding: 14px 16px; border-radius: 12px;
  background: rgba(0,0,0,0.3);
  border: 1px solid rgba(0,200,232,0.12);
  backdrop-filter: blur(8px);
`;

const SloTitle = styled.p`
  font-family: ${typography.fontDisplay};
  font-size: 0.65rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.14em;
  color: ${colors.cyan}; margin-bottom: 10px;
`;

const SloRow = styled.div`
  display: flex; justify-content: space-between; align-items: center;
  padding: 4px 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  &:last-child { border-bottom: none; }
`;

const SloLabel = styled.span`
  font-family: ${typography.fontBody};
  font-size: 0.72rem; color: rgba(255,255,255,0.5);
`;

const SloValue = styled.span`
  font-family: ${typography.fontBody};
  font-size: 0.72rem; font-weight: 700;
  color: ${({ $color }) => $color || '#6dd880'};
`;

/* Pain Point Card */
const PainCard = styled.div`
  padding: 16px 18px; border-radius: 14px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(0,200,232,0.12);
  backdrop-filter: blur(10px);
  display: flex; flex-direction: column;
  transition: all 0.4s cubic-bezier(0.25,0.46,0.45,0.94);
  opacity: 0;
  animation: ${fadeUp} 0.9s ${({ $delay }) => $delay || '0.5s'} ease both;

  &:hover {
    border-color: rgba(0,200,232,0.3);
    background: rgba(0,200,232,0.03);
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(0,200,232,0.06);
  }
`;

const PainNumber = styled.span`
  font-family: ${typography.fontDisplay};
  font-size: 2.2rem; font-weight: 900;
  color: rgba(0,200,232,0.1); line-height: 1;
  margin-bottom: 6px;
`;

const PainTitle = styled.h3`
  font-family: ${typography.fontDisplay};
  font-size: 0.95rem; font-weight: 700;
  color: #fff; margin-bottom: 6px; line-height: 1.25;
`;

const PainDesc = styled.p`
  font-family: ${typography.fontBody};
  font-size: 0.72rem; color: rgba(255,255,255,0.45);
  line-height: 1.55; flex: 1;
`;

/* Risk Banner */
const RiskBanner = styled.div`
  margin-top: auto;
  padding: 10px 18px; border-radius: 10px;
  background: rgba(240,160,48,0.06);
  border: 1px solid rgba(240,160,48,0.2);
  display: flex; align-items: center; gap: 12px;
  animation: ${fadeUp} 1s 1.4s ease both, ${pulseWarn} 4s 2s ease infinite;
`;

const RiskIcon = styled.span`
  font-size: 1.1rem;
`;

const RiskText = styled.p`
  font-family: ${typography.fontBody};
  font-size: 0.72rem; color: rgba(255,255,255,0.55);
  line-height: 1.5;
  strong { color: #f0a030; font-weight: 700; }
`;

/* ═══ Data ═══ */
const SLOS = [
  { label: 'P99 read latency', value: '< 100 ms', color: '#6dd880' },
  { label: 'P99 write latency', value: '< 150 ms', color: '#6dd880' },
  { label: 'Error rate', value: '< 1%', color: '#6dd880' },
  { label: 'Quorum success', value: '≥ 99%', color: '#38bdf8' },
  { label: 'Cache hit rate', value: '≥ 70%', color: '#38bdf8' },
];

const PAINS = [
  { n: '01', title: 'Reactive-Only Ops', desc: 'Engineers alerted AFTER SLO breach — not when trending toward failure. SWIM SUSPECT state goes unnoticed until DEAD.' },
  { n: '02', title: 'Manual Diagnosis is Slow', desc: 'SSH into multiple VMs, grep Prometheus, check SWIM state, inspect Loki logs — across 7 services. MTTD: 20–40 min.' },
  { n: '03', title: 'No Guard-Rails on Fix', desc: 'No standard playbook. One engineer restarts a node — drops quorum to 1. Another disables without checking SWIM. Mistakes cascade.' },
  { n: '04', title: 'No Learning Loop', desc: 'After incident resolved, no record of what was tried, what worked. Next on-call engineer starts from zero every time.' },
];

/* ═══ Component ═══ */
const Slide6 = () => (
  <Shell>
    <Grid />
    <Particles count={10} />
    <LogoWrap><Logo alt="EPAM" width={220} /></LogoWrap>

    <Frame>
      <Eyebrow>Agentic Ops · The Problem</Eyebrow>
      <Title>
        Operating a Distributed Cache at Scale is a{' '}
        <span className="accent">Manual, Reactive Battle</span>
      </Title>
      <Subtitle>
        EdgeFabric: 3 cache nodes, load balancer, service registry — quorum-based replication (2 of 3)
      </Subtitle>

      <Body>
        <LeftCol>
          <SloCard>
            <SloTitle>SLO Targets</SloTitle>
            {SLOS.map((s, i) => (
              <SloRow key={i}>
                <SloLabel>{s.label}</SloLabel>
                <SloValue $color={s.color}>{s.value}</SloValue>
              </SloRow>
            ))}
          </SloCard>

          {/* Context card */}
          <div style={{
            padding: '12px 14px', borderRadius: 10,
            background: 'rgba(0,0,0,0.25)',
            border: '1px solid rgba(255,255,255,0.05)',
          }}>
            <p style={{ fontFamily: typography.fontBody, fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.6, letterSpacing: '0.02em' }}>
              At peak load: hundreds of concurrent requests. SLO monitoring is manual. Incident response relies on human intuition + SSH.
            </p>
          </div>
        </LeftCol>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <RightCol>
            {PAINS.map((p, i) => (
              <PainCard key={p.n} $delay={`${0.6 + i * 0.15}s`}>
                <PainNumber>{p.n}</PainNumber>
                <PainTitle>{p.title}</PainTitle>
                <PainDesc>{p.desc}</PainDesc>
              </PainCard>
            ))}
          </RightCol>

          <RiskBanner>
            <RiskIcon>⚠️</RiskIcon>
            <RiskText>
              A single node failure reduces quorum headroom to <strong>zero</strong> — one more failure means <strong>total cache outage</strong>. The window between "node starts degrading" and "quorum lost" often closes before anyone acts.
            </RiskText>
          </RiskBanner>
        </div>
      </Body>
    </Frame>
  </Shell>
);

export default Slide6;

