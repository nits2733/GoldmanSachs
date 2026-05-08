import React from 'react';
import styled, { keyframes } from 'styled-components';
import { SlideWrapper } from '../../components/SlideLayout';
import colors from '../../assets/styles/variables/colors';
import typography from '../../assets/styles/variables/typography';
import Logo from '../../components/Logo';
import Particles from '../../components/Particles';
import NetworkGraph from '../../components/NetworkGraph';

const fadeIn = keyframes`from{opacity:0}to{opacity:1}`;
const fadeUp = keyframes`from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}`;
const glowPulse = keyframes`0%,100%{text-shadow:0 0 20px rgba(0,200,232,0.15)}50%{text-shadow:0 0 40px rgba(0,200,232,0.3)}`;

const Shell = styled(SlideWrapper)`
  background:
    radial-gradient(ellipse 55% 45% at 50% 45%, rgba(0,200,232,0.06) 0%, transparent 60%),
    radial-gradient(ellipse 40% 35% at 20% 80%, rgba(109,216,128,0.03) 0%, transparent 55%),
    radial-gradient(ellipse 40% 35% at 80% 20%, rgba(167,139,250,0.03) 0%, transparent 55%),
    linear-gradient(185deg, #0b1e38 0%, #060f1e 45%, #030810 100%);
  overflow: hidden;
`;

const Grid = styled.div`
  position: absolute; inset: 0; z-index: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(0,212,255,0.018) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,212,255,0.018) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(ellipse at 50% 50%, black 30%, transparent 70%);
  opacity: 0.5;
`;

const LogoWrap = styled.div`
  position: absolute; top: 32px; right: 48px; z-index: 20;
  animation: ${fadeIn} 1s 0.2s ease both;
`;

const Center = styled.div`
  position: relative; z-index: 10;
  width: 100%; height: 100%;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  text-align: center;
  padding: 40px;
`;

const ThankYou = styled.h1`
  font-family: ${typography.fontDisplay};
  font-weight: ${typography.weightBlack};
  font-size: clamp(3rem, 6vw, 5.5rem);
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: #fff;
  margin-bottom: 16px;
  opacity: 0;
  animation: ${fadeUp} 1.2s 0.4s cubic-bezier(0.25,0.46,0.45,0.94) both,
             ${glowPulse} 4s 2s ease-in-out infinite;
  .accent {
    background: linear-gradient(90deg, ${colors.cyan} 0%, #38bdf8 50%, #a78bfa 100%);
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Tagline = styled.p`
  font-family: ${typography.fontBody};
  font-weight: 300;
  font-size: clamp(1rem, 1.6vw, 1.3rem);
  color: rgba(255,255,255,0.45);
  line-height: 1.7;
  max-width: 700px;
  margin-bottom: 36px;
  opacity: 0;
  animation: ${fadeUp} 1.2s 0.8s cubic-bezier(0.25,0.46,0.45,0.94) both;
`;

const Divider = styled.div`
  width: 80px; height: 2px; border-radius: 1px;
  background: linear-gradient(90deg, transparent, ${colors.cyan}, transparent);
  margin-bottom: 32px;
  opacity: 0;
  animation: ${fadeIn} 1.5s 1.2s ease both;
`;

const ContactRow = styled.div`
  display: flex; gap: 32px; align-items: center;
  opacity: 0;
  animation: ${fadeUp} 1s 1.4s ease both;
`;

const ContactItem = styled.div`
  display: flex; align-items: center; gap: 8px;
  font-family: ${typography.fontBody};
  font-size: 0.85rem;
  color: rgba(255,255,255,0.4);
  span { color: ${colors.cyan}; font-weight: 600; }
`;

const QABadge = styled.div`
  margin-top: 40px;
  padding: 10px 28px;
  border-radius: 10px;
  background: rgba(0,200,232,0.05);
  border: 1px solid rgba(0,200,232,0.15);
  font-family: ${typography.fontDisplay};
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255,255,255,0.5);
  letter-spacing: 0.06em;
  opacity: 0;
  animation: ${fadeUp} 1s 1.8s ease both;
`;

export default function SlideEnd() {
  return (
    <Shell>
      <Grid />
      <Particles count={16} />
      <LogoWrap><Logo alt="EPAM" width={220} /></LogoWrap>

      <Center>
        <ThankYou>
          Thank <span className="accent">You</span>
        </ThankYou>

        <Tagline>
          EdgeFabric & Agentic Ops — building systems that observe, reason, and heal themselves — with humans always in the loop.
        </Tagline>

        <Divider />

        <ContactRow>
          <ContactItem>🏢 <span>EPAM Systems</span></ContactItem>
          <ContactItem>⚙️ <span>EdgeFabric</span></ContactItem>
          <ContactItem>🤖 <span>Agentic Ops</span></ContactItem>
        </ContactRow>

        <QABadge>Questions & Discussion</QABadge>
      </Center>

      <NetworkGraph height="38%" />
    </Shell>
  );
}

