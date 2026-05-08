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
    radial-gradient(ellipse 50% 40% at 18% 15%, rgba(0,200,232,0.06) 0%, transparent 55%),
    radial-gradient(ellipse 45% 40% at 82% 82%, rgba(109,216,128,0.04) 0%, transparent 55%),
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
  color: #fff; margin-bottom: 4px;
  animation: ${fadeLeft} 0.9s 0.3s ease both;
  max-width: calc(100% - 260px);
  .accent {
    background: linear-gradient(90deg, ${colors.cyan} 0%, #38bdf8 100%);
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Sub = styled.p`
  font-family: ${typography.fontBody};
  font-size: clamp(0.72rem, 0.95vw, 0.85rem);
  color: rgba(255,255,255,0.45); font-weight: 300;
  margin-bottom: 24px;
  animation: ${fadeLeft} 0.9s 0.5s ease both;
`;

const PrinciplesRow = styled.div`
  display: flex; gap: 20px; margin-bottom: 24px;
`;

const PCard = styled.div`
  flex: 1; padding: 20px 22px; border-radius: 14px;
  max-height: 280px;
  background: rgba(255,255,255,0.02);
  border: 1px solid ${({ $borderColor }) => $borderColor || 'rgba(0,200,232,0.12)'};
  backdrop-filter: blur(10px);
  display: flex; flex-direction: column;
  opacity: 0;
  animation: ${fadeUp} 0.9s ${({ $delay }) => $delay || '0.5s'} ease both;
  transition: all 0.4s cubic-bezier(0.25,0.46,0.45,0.94);

  &:hover {
    border-color: ${({ $hoverColor }) => $hoverColor || 'rgba(0,200,232,0.3)'};
    background: ${({ $hoverBg }) => $hoverBg || 'rgba(0,200,232,0.03)'};
    transform: translateY(-2px);
    box-shadow: 0 8px 28px ${({ $shadowColor }) => $shadowColor || 'rgba(0,200,232,0.06)'};
  }
`;

const PIcon = styled.div`
  width: 36px; height: 36px; border-radius: 10px;
  background: ${({ $bg }) => $bg || 'rgba(0,200,232,0.08)'};
  border: 1px solid ${({ $border }) => $border || 'rgba(0,200,232,0.2)'};
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; margin-bottom: 12px;
`;

const PNum = styled.span`
  font-family: ${typography.fontBody};
  font-size: 0.65rem; font-weight: 700;
  text-transform: uppercase; letter-spacing: 0.12em;
  color: ${({ $color }) => $color || colors.cyan};
  margin-bottom: 6px;
`;

const PTitle = styled.h3`
  font-family: ${typography.fontDisplay};
  font-size: 1rem; font-weight: 700;
  color: #fff; margin-bottom: 8px; line-height: 1.25;
`;

const PDesc = styled.p`
  font-family: ${typography.fontBody};
  font-size: 0.72rem; color: rgba(255,255,255,0.45);
  line-height: 1.55;
`;

const PHighlight = styled.span`
  color: ${({ $color }) => $color || colors.cyan}; font-weight: 600;
`;

/* Capabilities Row */
const CapRow = styled.div`
  display: flex; gap: 10px; flex-wrap: wrap;
  animation: ${fadeUp} 1s 1.2s ease both;
`;

const CapBadge = styled.div`
  padding: 8px 14px; border-radius: 8px;
  background: rgba(0,0,0,0.25);
  border: 1px solid rgba(255,255,255,0.06);
  display: flex; align-items: center; gap: 8px;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(0,200,232,0.2);
    background: rgba(0,200,232,0.03);
  }
`;

const CapIcon = styled.span`
  font-size: 0.85rem;
`;

const CapText = styled.div`
  display: flex; flex-direction: column;
`;

const CapTitle = styled.span`
  font-family: ${typography.fontDisplay};
  font-size: 0.75rem; font-weight: 700; color: #fff;
`;

const CapSub = styled.span`
  font-family: ${typography.fontBody};
  font-size: 0.6rem; color: rgba(255,255,255,0.35);
`;

/* Approval Gate */
const GateCard = styled.div`
  margin-top: auto;
  padding: 12px 18px; border-radius: 10px;
  background: rgba(0,0,0,0.3);
  border: 1px solid rgba(109,216,128,0.15);
  display: flex; align-items: center; gap: 16px;
  animation: ${fadeUp} 1s 1.5s ease both;
`;

const GateStep = styled.div`
  display: flex; align-items: center; gap: 6px;
`;

const GateDot = styled.div`
  width: 8px; height: 8px; border-radius: 50%;
  background: ${({ $color }) => $color || '#6dd880'};
  box-shadow: 0 0 6px ${({ $color }) => $color || '#6dd880'}40;
`;

const GateLabel = styled.span`
  font-family: ${typography.fontBody};
  font-size: 0.55rem; color: rgba(255,255,255,0.5);
  font-weight: 500;
`;

const GateArrow = styled.span`
  font-size: 0.6rem; color: rgba(255,255,255,0.15);
`;

/* ═══ Component ═══ */
const Slide7 = () => (
  <Shell>
    <Grid />
    <Particles count={10} />
    <LogoWrap><Logo alt="EPAM" width={220} /></LogoWrap>

    <Frame>
      <Eyebrow>Agentic Ops · The Solution</Eyebrow>
      <Title>
        An AI SRE That Observes, Diagnoses &{' '}
        <span className="accent">Proposes With Human Approval</span>
      </Title>
      <Sub>
        Replace the manual observe → diagnose → act loop with an AI agent — always keeping a human in the approval seat.
      </Sub>

      <PrinciplesRow>
        <PCard $delay="0.6s" $borderColor="rgba(56,189,248,0.15)" $hoverColor="rgba(56,189,248,0.3)" $hoverBg="rgba(56,189,248,0.03)" $shadowColor="rgba(56,189,248,0.06)">
          <PIcon $bg="rgba(56,189,248,0.08)" $border="rgba(56,189,248,0.2)">👁</PIcon>
          <PNum $color="#38bdf8">Principle 1</PNum>
          <PTitle>Observe Everything, Decide Nothing Alone</PTitle>
          <PDesc>
            Continuously monitors all <PHighlight $color="#38bdf8">5 SLO metrics</PHighlight>, SWIM node states, LB/SR drift, and error logs. Builds a <PHighlight $color="#38bdf8">live context snapshot</PHighlight> before every decision — not from memory, but real-time cluster reads.
          </PDesc>
        </PCard>

        <PCard $delay="0.75s" $borderColor="rgba(109,216,128,0.15)" $hoverColor="rgba(109,216,128,0.3)" $hoverBg="rgba(109,216,128,0.03)" $shadowColor="rgba(109,216,128,0.06)">
          <PIcon $bg="rgba(109,216,128,0.08)" $border="rgba(109,216,128,0.2)">🛡</PIcon>
          <PNum $color="#6dd880">Principle 2</PNum>
          <PTitle>Propose Actions, Never Execute Silently</PTitle>
          <PDesc>
            Every remediation goes through a <PHighlight $color="#6dd880">dry-run first</PHighlight> gate. Human-readable proposal with risk level, expected outcome, and rollback plan. <PHighlight $color="#6dd880">No action without explicit approval.</PHighlight>
          </PDesc>
        </PCard>

        <PCard $delay="0.9s" $borderColor="rgba(167,139,250,0.15)" $hoverColor="rgba(167,139,250,0.3)" $hoverBg="rgba(167,139,250,0.03)" $shadowColor="rgba(167,139,250,0.06)">
          <PIcon $bg="rgba(167,139,250,0.08)" $border="rgba(167,139,250,0.2)">🔄</PIcon>
          <PNum $color="#a78bfa">Principle 3</PNum>
          <PTitle>Verify and Learn</PTitle>
          <PDesc>
            After every approved action, a <PHighlight $color="#a78bfa">background verification</PHighlight> task re-observes the cluster (30–180s). Records outcome as <PHighlight $color="#a78bfa">RESOLVED / PARTIAL / NOT_RESOLVED</PHighlight> — feeds back into next turn.
          </PDesc>
        </PCard>
      </PrinciplesRow>

      <CapRow>
        {[
          { icon: '📊', title: 'Passive Monitoring', sub: 'Health digest every 10 min' },
          { icon: '🚨', title: 'Alert Investigation', sub: 'Alertmanager → root cause → fix' },
          { icon: '💬', title: 'Conversational Ops', sub: '"Why is node-2 slow?"' },
          { icon: '🎯', title: 'Graduated Remediation', sub: '🟢 → 🟡 → 🟠 → 🔴 risk order' },
          { icon: '✅', title: 'Post-Action Verify', sub: 'Confirms actual resolution' },
        ].map((c, i) => (
          <CapBadge key={i}>
            <CapIcon>{c.icon}</CapIcon>
            <CapText>
              <CapTitle>{c.title}</CapTitle>
              <CapSub>{c.sub}</CapSub>
            </CapText>
          </CapBadge>
        ))}
      </CapRow>

      <GateCard>
        <span style={{ fontFamily: typography.fontDisplay, fontSize: '0.6rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Human Approval Gate
        </span>
        <GateStep><GateDot $color="#38bdf8" /><GateLabel>Agent proposes (dry_run)</GateLabel></GateStep>
        <GateArrow>→</GateArrow>
        <GateStep><GateDot $color="#f0a030" /><GateLabel>Human reviews in UI</GateLabel></GateStep>
        <GateArrow>→</GateArrow>
        <GateStep><GateDot $color="#6dd880" /><GateLabel>Approved → executes</GateLabel></GateStep>
        <GateArrow>→</GateArrow>
        <GateStep><GateDot $color="#a78bfa" /><GateLabel>Auto-verify result</GateLabel></GateStep>
      </GateCard>
    </Frame>
  </Shell>
);

export default Slide7;

