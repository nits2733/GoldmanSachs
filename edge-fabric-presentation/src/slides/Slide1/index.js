import React from 'react';
import styled, { keyframes } from 'styled-components';
import { SlideWrapper } from '../../components/SlideLayout';
import colors from '../../assets/styles/variables/colors';
import typography from '../../assets/styles/variables/typography';
import Logo from '../../components/Logo';
import Particles from '../../components/Particles';
import NetworkGraph from '../../components/NetworkGraph';

/* Subtle, smooth entrance animations */
const fadeUp = keyframes`
  from { opacity: 0; transform: translate3d(0, 8px, 0); }
  to   { opacity: 1; transform: translate3d(0, 0, 0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

/* 16:9 slide canvas */
const Shell = styled(SlideWrapper)`
  /* ONLY deep navy family */
  background:
    radial-gradient(ellipse 55% 45% at 18% 18%, rgba(0, 200, 232, 0.07) 0%, rgba(0,0,0,0) 55%),
    radial-gradient(ellipse 55% 45% at 85% 80%, rgba(0, 120, 180, 0.08) 0%, rgba(0,0,0,0) 55%),
    linear-gradient(180deg, ${colors.bgMid} 0%, ${colors.background} 55%, ${colors.bgDeep} 100%);
`;

/* Subtle square grid */
const Grid = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;

  background-image:
    linear-gradient(${colors.gridLine} 1px, transparent 1px),
    linear-gradient(90deg, ${colors.gridLine} 1px, transparent 1px);
  background-size: 60px 60px;
  opacity: 0.55;
`;

/* Layout container to guarantee no clipping */
const Frame = styled.div`
  position: relative;
  z-index: 3;
  width: 100%;
  height: 100%;
  padding: clamp(28px, 3.0vw, 48px);
`;

/* Top-right logo - matching reference screenshot positioning */
const LogoWrap = styled.div`
  position: absolute;
  top: 32px;
  right: 48px;
  z-index: 5;
  animation: ${fadeIn} 1.0s ease both;
  animation-delay: 0.12s;
`;

/* Content region */
const Content = styled.div`
  position: relative;
  z-index: 5;
  max-width: min(1080px, 78vw);
  padding-top: clamp(40px, 6vh, 72px);
`;

/* Eyebrow */
const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 14px;
  margin-bottom: clamp(18px, 2.0vw, 28px);
  animation: ${fadeUp} 1.0s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: 0.08s;
`;

const EyebrowRule = styled.span`
  width: 34px;
  height: 2px;
  border-radius: 1px;
  background: rgba(0, 200, 232, 1);
`;

const EyebrowText = styled.span`
  font-family: ${typography.fontBody};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weightSemibold};
  letter-spacing: ${typography.tracking.widest};
  text-transform: uppercase;
  color: ${colors.cyan};
`;

/* Title — left aligned, large, bold */
const Title = styled.h1`
  font-family: ${typography.fontDisplay};
  font-weight: ${typography.weightBlack};
  font-size: clamp(3.0rem, 6.1vw, 5.7rem);
  line-height: ${typography.lineHeight.snug};
  letter-spacing: ${typography.tracking.tight};
  color: ${colors.textPrimary};

  animation: ${fadeUp} 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: 0.20s;

  .accent {
    /* ONLY cyan/blue gradient */
    background: linear-gradient(90deg, ${colors.cyan} 0%, ${colors.blue} 78%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 18px rgba(0, 200, 232, 0.18));
  }
`;

/* Subtitle */
const Subtitle = styled.p`
  margin-top: clamp(14px, 1.6vw, 22px);
  max-width: min(860px, 76vw);

  font-family: ${typography.fontBody};
  font-weight: ${typography.weightLight};
  font-size: clamp(1.0rem, 1.55vw, 1.25rem);
  line-height: ${typography.lineHeight.loose};
  color: ${colors.textSubtitle};

  animation: ${fadeUp} 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: 0.35s;
`;

/**
 * Slide 1 — MUST match reference style:
 * - deep navy background + subtle grid
 * - left aligned title + subtitle
 * - exact logo top-right
 * - bottom network graph with heartbeat
 * - very minimal particles
 */
const Slide1 = () => (
  <Shell>
    <Grid />
    <Particles count={12} />

    <LogoWrap>
      {/* EPAM Logo - exact positioning from reference */}
      <Logo alt="EPAM" width={220} />
    </LogoWrap>

    <Frame>
      <Content>

        <Title>
          EdgeFabric System &amp; <span className="accent">Agentic Operations</span>
        </Title>

        <Subtitle>
          Building systems that autonomously detect issues, adapt in real time,
          and heal themselves.
        </Subtitle>
      </Content>
    </Frame>

    <NetworkGraph height="54%" />
  </Shell>
);

export default Slide1;
