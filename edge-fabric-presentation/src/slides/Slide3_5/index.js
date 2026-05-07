import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ScrollableSlideWrapper } from '../../components/SlideLayout';
import colors from '../../assets/styles/variables/colors';
import typography from '../../assets/styles/variables/typography';
import Logo from '../../components/Logo';
import Particles from '../../components/Particles';

/* Smooth entrance animations */
const fadeUp = keyframes`
  from { opacity: 0; transform: translate3d(0, 12px, 0); }
  to   { opacity: 1; transform: translate3d(0, 0, 0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

/* Slide shell */
const Shell = styled(ScrollableSlideWrapper)`
  background:
    radial-gradient(ellipse 55% 45% at 18% 18%, rgba(0, 200, 232, 0.07) 0%, rgba(0,0,0,0) 55%),
    radial-gradient(ellipse 55% 45% at 85% 80%, rgba(0, 120, 180, 0.08) 0%, rgba(0,0,0,0) 55%),
    linear-gradient(180deg, ${colors.bgMid} 0%, ${colors.background} 55%, ${colors.bgDeep} 100%);
`;

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

const LogoWrap = styled.div`
  position: absolute;
  top: 32px;
  right: 48px;
  z-index: 10;
  animation: ${fadeIn} 1.0s ease both;
  animation-delay: 0.12s;
`;

const Content = styled.div`
  position: relative;
  z-index: 10;
  padding: 80px 56px 80px 56px;
  max-width: 1400px;
  width: 100%;
`;

/* Eyebrow */
const Eyebrow = styled.p`
  font-family: ${typography.fontBody};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weightSemibold};
  letter-spacing: ${typography.tracking.widest};
  text-transform: uppercase;
  color: ${colors.cyan};
  margin-bottom: 32px;
  animation: ${fadeUp} 1.0s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: 0.15s;
`;

/* Title */
const Title = styled.h1`
  font-family: ${typography.fontDisplay};
  font-weight: ${typography.weightBlack};
  font-size: clamp(2.8rem, 5.5vw, 4.8rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  margin-bottom: 24px;
  animation: ${fadeUp} 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: 0.25s;

  .white {
    color: ${colors.textPrimary};
  }

  .cyan {
    color: ${colors.cyan};
  }
`;

/* Subtitle */
const Subtitle = styled.p`
  font-family: ${typography.fontBody};
  font-weight: ${typography.weightLight};
  font-size: clamp(1.0rem, 1.4vw, 1.2rem);
  line-height: 1.7;
  color: ${colors.textSubtitle};
  max-width: 900px;
  margin-bottom: 64px;
  animation: ${fadeUp} 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: 0.35s;
`;

/* Card Grid */
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  width: 100%;
`;

/* Feature Card */
const Card = styled.div`
  position: relative;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(0, 200, 232, 0.15);
  border-radius: 12px;
  padding: 40px 32px;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  overflow: hidden;
  animation: ${fadeUp} 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: ${({ $delay }) => $delay || '0.5s'};

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${colors.cyan} 0%, ${colors.blue} 100%);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &:hover {
    border-color: ${colors.cyan};
    background: rgba(0, 200, 232, 0.04);
    transform: translateY(-6px);

    &::before {
      transform: scaleX(1);
    }

    .icon {
      transform: scale(1.1);
      filter: drop-shadow(0 0 12px ${colors.cyan});
    }
  }
`;

/* Card Number */
const CardNumber = styled.div`
  position: absolute;
  top: 32px;
  left: 32px;
  font-family: ${typography.fontDisplay};
  font-size: 4rem;
  font-weight: ${typography.weightBlack};
  color: rgba(0, 200, 232, 0.08);
  line-height: 1;
  z-index: 0;
`;

/* Card Icon */
const CardIcon = styled.div`
  position: absolute;
  top: 32px;
  right: 32px;
  font-size: 2.5rem;
  color: ${colors.cyan};
  transition: all 0.4s ease;
  z-index: 1;
`;

/* Card Title */
const CardTitle = styled.h3`
  font-family: ${typography.fontDisplay};
  font-size: ${typography.size.xl};
  font-weight: ${typography.weightBold};
  color: ${colors.textPrimary};
  margin-bottom: 16px;
  margin-top: 80px;
  position: relative;
  z-index: 1;
`;

/* Card Description */
const CardDescription = styled.p`
  font-family: ${typography.fontBody};
  font-size: ${typography.size.sm};
  font-weight: ${typography.weightLight};
  color: ${colors.textSubtitle};
  line-height: 1.7;
  flex-grow: 1;
  position: relative;
  z-index: 1;
`;

const Slide3_5 = () => {
  return (
    <Shell>
      <Grid />
      <Particles count={12} />

      <LogoWrap>
        <Logo alt="EPAM" width={220} />
      </LogoWrap>

      <Content>
        <Eyebrow>The Solution</Eyebrow>

        <Title>
          <span className="white">Meet </span>
          <span className="cyan">EdgeFabric</span>
        </Title>

        <Subtitle>
          Production-grade distributed cache — built for consistency, resilience and scale.
        </Subtitle>

        <CardGrid>
          {/* Card 01 */}
          <Card $delay="0.5s">
            <CardNumber>01</CardNumber>
            <CardIcon className="icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="10" cy="25" r="3" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="30" cy="25" r="3" stroke="currentColor" strokeWidth="1.5" />
                <line x1="20" y1="13" x2="20" y2="20" stroke="currentColor" strokeWidth="1.5" />
                <line x1="20" y1="20" x2="13" y2="23" stroke="currentColor" strokeWidth="1.5" />
                <line x1="20" y1="20" x2="27" y2="23" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </CardIcon>
            <CardTitle>Quorum Consistency</CardTitle>
            <CardDescription>
              Majority-vote writes guarantee every read reflects the latest committed state — no stale data, no split-brain.
            </CardDescription>
          </Card>

          {/* Card 02 */}
          <Card $delay="0.6s">
            <CardNumber>02</CardNumber>
            <CardIcon className="icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="20" cy="20" r="2" fill="currentColor" />
                <line x1="20" y1="8" x2="20" y2="12" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </CardIcon>
            <CardTitle>SWIM Failure Detection</CardTitle>
            <CardDescription>
              Scalable Weakly-consistent Infection-style Membership detects node failures in seconds without centralised co-ordination.
            </CardDescription>
          </Card>

          {/* Card 03 */}
          <Card $delay="0.7s">
            <CardNumber>03</CardNumber>
            <CardIcon className="icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="20" r="3" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="20" cy="14" r="3" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="28" cy="20" r="3" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="20" cy="26" r="3" stroke="currentColor" strokeWidth="1.5" />
                <line x1="14" y1="19" x2="18" y2="15" stroke="currentColor" strokeWidth="1.5" />
                <line x1="22" y1="15" x2="26" y2="19" stroke="currentColor" strokeWidth="1.5" />
                <line x1="26" y1="21" x2="22" y2="25" stroke="currentColor" strokeWidth="1.5" />
                <line x1="18" y1="25" x2="14" y2="21" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </CardIcon>
            <CardTitle>Smart Key Distribution</CardTitle>
            <CardDescription>
              Consistent hashing with virtual nodes balances load evenly and minimises key remapping during topology changes.
            </CardDescription>
          </Card>

          {/* Card 04 */}
          <Card $delay="0.8s">
            <CardNumber>04</CardNumber>
            <CardIcon className="icon">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="12" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <line x1="14" y1="16" x2="26" y2="16" stroke="currentColor" strokeWidth="1.5" />
                <line x1="14" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="1.5" />
                <line x1="14" y1="24" x2="24" y2="24" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </CardIcon>
            <CardTitle>Built-in Observability</CardTitle>
            <CardDescription>
              Prometheus metrics, structured logs and distributed traces ship out-of-the-box — zero instrumentation overhead.
            </CardDescription>
          </Card>
        </CardGrid>
      </Content>
    </Shell>
  );
};

export default Slide3_5;
