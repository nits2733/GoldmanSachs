import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { SlideWrapper } from "../../components/SlideLayout";
import colors from "../../assets/styles/variables/colors";
import typography from "../../assets/styles/variables/typography";
import Logo from "../../components/Logo";
import Particles from "../../components/Particles";

/* ═══ Keyframes ═══ */
const fadeIn = keyframes`from{opacity:0}to{opacity:1}`;
const fadeUp = keyframes`from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}`;
const fadeLeft = keyframes`from{opacity:0;transform:translateX(-14px)}to{opacity:1;transform:translateX(0)}`;
const fadeRight = keyframes`from{opacity:0;transform:translateX(14px)}to{opacity:1;transform:translateX(0)}`;
const glowPulse = keyframes`0%,100%{box-shadow:0 0 0 0 rgba(0,200,232,0)}50%{box-shadow:0 0 12px 3px rgba(0,200,232,0.12)}`;
const orangePulse = keyframes`0%,100%{box-shadow:0 0 0 0 rgba(240,160,48,0)}50%{box-shadow:0 0 12px 3px rgba(240,160,48,0.12)}`;
const greenPulse = keyframes`0%,100%{box-shadow:0 0 0 0 rgba(109,216,128,0)}50%{box-shadow:0 0 12px 3px rgba(109,216,128,0.12)}`;

/* ═══ Styled ═══ */
const Shell = styled(SlideWrapper)`
  background:
    radial-gradient(ellipse 50% 40% at 50% 20%, rgba(0,200,232,0.04) 0%, transparent 55%),
    radial-gradient(ellipse 40% 35% at 80% 80%, rgba(109,216,128,0.03) 0%, transparent 55%),
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
  padding: 20px 48px 12px;
  display: flex; flex-direction: column;
`;

const Header = styled.header`
  margin-bottom: 6px;
  animation: ${fadeLeft} 0.9s 0.2s ease both;
`;

const Title = styled.h1`
  font-family: ${typography.fontDisplay};
  font-weight: ${typography.weightBlack};
  font-size: clamp(1.5rem, 2.8vw, 2.2rem);
  line-height: 1.15; letter-spacing: -0.02em;
  color: #fff; margin: 0 0 4px;
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
  color: rgba(255,255,255,0.42); font-weight: 300; margin: 0;
`;

const Content = styled.div`
  flex: 1; display: flex; align-items: center; justify-content: center; gap: 0;
  min-height: 0;
`;

const SidePanel = styled.div`
  width: 180px; flex-shrink: 0;
  display: flex; flex-direction: column; justify-content: center; gap: 8px;
  opacity: 0;
  animation: ${({ $right }) => $right ? fadeRight : fadeLeft} 0.9s ${({ $delay }) => $delay || '0.8s'} ease both;
`;

const Chip = styled.div`
  display: flex; align-items: center; gap: 8px;
  padding: 9px 14px; border-radius: 10px;
  background: ${p => p.$lit ? 'rgba(0,200,232,0.06)' : 'rgba(255,255,255,0.025)'};
  border: 1px solid ${p => p.$lit ? 'rgba(0,200,232,0.3)' : 'rgba(255,255,255,0.06)'};
  font-family: ${typography.fontBody};
  font-size: 0.78rem; font-weight: 500;
  color: ${p => p.$lit ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.4)'};
  transition: all 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
  backdrop-filter: blur(6px);
`;

const ConnBar = styled.div`
  width: 24px; flex-shrink: 0;
  display: flex; flex-direction: column; justify-content: center; gap: 16px;
`;

const HLine = styled.div`
  height: 1px;
  background: ${p => p.$on ? 'rgba(0,200,232,0.25)' : 'transparent'};
  transition: background 0.6s ease;
`;

const Pipeline = styled.div`
  flex: 0 0 auto; width: 360px;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0;
  max-height: 100%;
`;

const Block = styled.div`
  width: ${p => p.$wide ? '320px' : '240px'};
  padding: ${p => p.$tall ? '8px 18px 9px' : '6px 16px 7px'};
  border-radius: 12px;
  display: flex; flex-direction: column; align-items: center;
  background: ${p =>
    p.$v === 'orange' ? 'rgba(240,160,48,0.06)' :
    p.$v === 'green'  ? 'rgba(109,216,128,0.06)' :
    p.$v === 'blue'   ? 'rgba(56,189,248,0.08)' : 'rgba(255,255,255,0.025)'};
  border: 1.5px solid ${p =>
    p.$v === 'orange' ? 'rgba(240,160,48,0.45)' :
    p.$v === 'green'  ? 'rgba(109,216,128,0.4)' :
    p.$v === 'blue'   ? 'rgba(56,189,248,0.4)' :
    p.$active         ? 'rgba(0,200,232,0.3)' : 'rgba(255,255,255,0.08)'};
  backdrop-filter: blur(8px);
  opacity: ${p => p.$show ? 1 : 0};
  transform: ${p => p.$show ? 'translateY(0)' : 'translateY(8px)'};
  transition: opacity 0.5s cubic-bezier(0.25,0.46,0.45,0.94), transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94);
  ${p => p.$active && css`animation: ${glowPulse} 3s ease-in-out infinite;`}
  ${p => p.$v === 'orange' && css`animation: ${orangePulse} 2.5s ease-in-out infinite;`}
  ${p => p.$v === 'green' && css`animation: ${greenPulse} 2.5s ease-in-out infinite;`}
`;

const BIcon = styled.div`font-size: 15px; margin-bottom: 0;`;
const BTitle = styled.div`
  font-family: ${typography.fontDisplay};
  font-size: 0.82rem; font-weight: 700; color: #fff;
`;
const BSub = styled.div`
  font-family: ${typography.fontBody};
  font-size: 0.6rem; color: rgba(255,255,255,0.35); margin-top: 1px;
`;

const Arr = styled.div`
  display: flex; flex-direction: column; align-items: center;
  opacity: ${p => p.$show ? 1 : 0}; transition: opacity 0.4s ease; padding: 0;
`;
const VLine = styled.div`width: 2px; height: 7px; background: linear-gradient(180deg, rgba(0,200,232,0.4), rgba(0,200,232,0.8));`;
const Tip = styled.div`width: 0; height: 0; border-left: 4px solid transparent; border-right: 4px solid transparent; border-top: 5px solid rgba(0,200,232,0.8);`;

const AgentsGrid = styled.div`display: flex; flex-wrap: wrap; justify-content: center; gap: 4px; margin-top: 5px; width: 100%;`;
const APill = styled.div`
  display: flex; align-items: center; gap: 5px;
  padding: 4px 10px; border-radius: 20px;
  background: rgba(0,200,232,0.05); border: 1px solid rgba(0,200,232,0.18);
  font-family: ${typography.fontBody};
  font-size: 0.68rem; font-weight: 600; color: rgba(255,255,255,0.75);
  opacity: ${p => p.$show ? 1 : 0}; transform: ${p => p.$show ? 'scale(1)' : 'scale(0.9)'};
  transition: opacity 0.3s ease ${p => p.$t || 0}s, transform 0.3s ease ${p => p.$t || 0}s;
`;

export default function SlideSDLC1() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const delays = [0, 600, 1200, 1800, 2400, 3000, 3500, 4000];
    const timers = delays.map((d, i) => setTimeout(() => setStep(i + 1), d));
    return () => timers.forEach(clearTimeout);
  }, []);

  const s = step;

  const leftItems = [
    { icon: '🔒', label: 'Context Isolation' },
    { icon: '🔄', label: 'Workflows' },
    { icon: '🎯', label: 'Skills' },
    { icon: '🔌', label: 'MCP' },
  ];

  const rightItems = [
    { icon: '⏱️', label: 'Temp State' },
    { icon: '📸', label: 'Context Snapshot' },
    { icon: '✅', label: 'Approval Gates' },
    { icon: '👤', label: 'Human-in-the-Loop' },
  ];

  const agents = [
    { e: '🔍', l: 'Analyst' }, { e: '🔭', l: 'Scout' },
    { e: '📋', l: 'Planner' }, { e: '🏗️', l: 'Architect' },
    { e: '💻', l: 'Coder' }, { e: '🧪', l: 'Tester' },
    { e: '👁️', l: 'Reviewer' }, { e: '🛡️', l: 'Guardian' },
    { e: '⚙️', l: 'Pipeline Ops' },
  ];

  return (
    <Shell>
      <Grid />
      <Particles count={10} />
      <LogoWrap><Logo alt="EPAM" width={220} /></LogoWrap>

      <Frame>
        <Header>
          <Title>AI-Driven SDLC <span className="accent">Orchestration</span></Title>
          <Subtitle>Simulating the Complete Software Development Lifecycle</Subtitle>
        </Header>

        <Content>
          <SidePanel $delay="0.8s">
            {leftItems.map(x => (
              <Chip key={x.label} $lit={s >= 5}>
                <span style={{ fontSize: 15 }}>{x.icon}</span>{x.label}
              </Chip>
            ))}
          </SidePanel>

          <ConnBar>{[0, 1, 2, 3, 4].map(i => <HLine key={i} $on={s >= 5} />)}</ConnBar>

          <Pipeline>
            <Block $show={s >= 1} $active>
              <BIcon>👤</BIcon><BTitle>User Request</BTitle><BSub>Feature · Fix · Command</BSub>
            </Block>
            <Arr $show={s >= 2}><VLine /><Tip /></Arr>
            <Block $show={s >= 2} $active $v="blue">
              <BIcon>🎯</BIcon><BTitle>Orchestrator</BTitle><BSub>Route · Plan · Coordinate</BSub>
            </Block>
            <Arr $show={s >= 3}><VLine /><Tip /></Arr>
            <Block $show={s >= 3} $active>
              <BIcon>⚙️</BIcon><BTitle>Workflow Engine</BTitle><BSub>DAG · Parallel Execution · State</BSub>
            </Block>
            <Arr $show={s >= 4}><VLine /><Tip /></Arr>
            <Block $show={s >= 4} $wide $tall>
              <BTitle>Specialized Subagents</BTitle>
              <AgentsGrid>
                {agents.map((a, i) => (
                  <APill key={a.l} $show={s >= 4} $t={i * 0.06}>
                    <span style={{ fontSize: 10 }}>{a.e}</span>{a.l}
                  </APill>
                ))}
              </AgentsGrid>
            </Block>
            <Arr $show={s >= 6}><VLine /><Tip /></Arr>
            <Block $show={s >= 6} $wide $v="orange">
              <BIcon>🔐</BIcon><BTitle>Validation + Human Approval</BTitle><BSub>QA · Review · Gate</BSub>
            </Block>
            <Arr $show={s >= 7}><VLine /><Tip /></Arr>
            <Block $show={s >= 7} $v="green">
              <BIcon>🚀</BIcon><BTitle>CI/CD Delivery</BTitle><BSub>Build · Test · Deploy</BSub>
            </Block>
          </Pipeline>

          <ConnBar>{[0, 1, 2, 3].map(i => <HLine key={i} $on={s >= 6} />)}</ConnBar>

          <SidePanel $right $delay="1.2s">
            {rightItems.map(x => (
              <Chip key={x.label} $lit={s >= 6}>
                <span style={{ fontSize: 15 }}>{x.icon}</span>{x.label}
              </Chip>
            ))}
          </SidePanel>
        </Content>
      </Frame>
    </Shell>
  );
}
