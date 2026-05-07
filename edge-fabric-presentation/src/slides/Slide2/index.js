import React from 'react';
import styled, { keyframes } from 'styled-components';
import { ScrollableSlideWrapper } from '../../components/SlideLayout';
import colors from '../../assets/styles/variables/colors';
import typography from '../../assets/styles/variables/typography';
import Logo from '../../components/Logo';
import Particles from '../../components/Particles';

/* Smooth entrance animations */
const fadeUp = keyframes`
  from { opacity: 0; transform: translate3d(0, 8px, 0); }
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
  padding: 64px 56px 80px 56px;
  max-width: 1400px;
`;

/* Eyebrow */
const Eyebrow = styled.div`
  font-family: ${typography.fontBody};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weightSemibold};
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: ${colors.cyan};
  margin-bottom: 24px;
  animation: ${fadeUp} 1.0s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: 0.08s;
`;

/* Title */
const Title = styled.h1`
  font-family: ${typography.fontDisplay};
  font-weight: ${typography.weightBlack};
  font-size: clamp(2.8rem, 5.5vw, 4.8rem);
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: #ffffff;
  margin-bottom: 16px;
  animation: ${fadeUp} 1.1s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: 0.20s;

  .accent {
    color: ${colors.cyan};
  }
`;

/* Subtitle */
const Subtitle = styled.p`
  font-family: ${typography.fontBody};
  font-weight: ${typography.weightLight};
  font-size: clamp(0.95rem, 1.4vw, 1.15rem);
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.58);
  max-width: 920px;
  margin-bottom: 56px;
  animation: ${fadeUp} 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: 0.35s;
`;

/* 3-column card grid */
const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  animation: ${fadeUp} 1.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  animation-delay: 0.50s;
`;

/* Individual challenge card */
const Card = styled.div`
  position: relative;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid rgba(0, 200, 232, 0.12);
  border-radius: 8px;
  padding: 36px 28px 32px 28px;
  min-height: 340px;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    background: rgba(0, 200, 232, 0.04);
    border-color: rgba(0, 200, 232, 0.28);
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 200, 232, 0.15);
  }

  /* Bottom accent line */
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 28px;
    right: 28px;
    height: 2px;
    background: linear-gradient(90deg, ${colors.cyan} 0%, transparent 100%);
    opacity: 0.4;
    transition: opacity 0.4s ease;
  }

  &:hover::after {
    opacity: 0.8;
  }
`;

/* Card header: number + icon */
const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const CardNumber = styled.span`
  font-family: ${typography.fontDisplay};
  font-size: 3.2rem;
  font-weight: ${typography.weightBlack};
  line-height: 1;
  color: rgba(255, 255, 255, 0.08);
  letter-spacing: -0.02em;
`;

/* Icon placeholder (using inline SVGs or emoji-style representation) */
const IconWrap = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.cyan};
  font-size: 28px;
`;

const CardTitle = styled.h3`
  font-family: ${typography.fontDisplay};
  font-size: clamp(1.25rem, 1.6vw, 1.55rem);
  font-weight: ${typography.weightBold};
  line-height: 1.25;
  color: #ffffff;
  margin-bottom: 16px;
`;

const CardDescription = styled.p`
  font-family: ${typography.fontBody};
  font-size: clamp(0.875rem, 1.1vw, 1rem);
  font-weight: ${typography.weightLight};
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.55);
  flex-grow: 1;
`;

/* Challenge data */
const challenges = [
  {
    number: '01',
    icon: '🔗', // represents nodes/connections
    title: 'Data Consistency Across Nodes',
    description:
      'Stale reads, write conflicts, and split-brain scenarios degrade user experience and threaten business logic integrity.',
  },
  {
    number: '02',
    icon: '⚡', // represents crash/failure
    title: 'Unpredictable Failure Recovery',
    description:
      'Node crashes trigger manual interventions, cascading timeouts, and unplanned downtime that erode SLA commitments.',
  },
  {
    number: '03',
    icon: '🌐', // represents complexity at scale
    title: 'Operational Complexity at Scale',
    description:
      'Config drift, topology changes, and observability gaps multiply operational toil as cluster size grows beyond hundreds of nodes.',
  },
];

const Slide2 = () => (
  <Shell>
    <Grid />
    <Particles count={12} />

    <LogoWrap>
      <Logo alt="EPAM" width={220} />
    </LogoWrap>

    <Content>
      <Eyebrow>The Challenge</Eyebrow>

      <Title>
        The Distributed Caching <span className="accent">Challenge</span>
      </Title>

      <Subtitle>
        Scaling a cache layer beyond a single node exposes three fundamental
        problems that compound at production scale.
      </Subtitle>

      <CardGrid>
        {challenges.map((item, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardNumber>{item.number}</CardNumber>
              <IconWrap>{item.icon}</IconWrap>
            </CardHeader>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </Card>
        ))}
      </CardGrid>
    </Content>
  </Shell>
);

export default Slide2;
