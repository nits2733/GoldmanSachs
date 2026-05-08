import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { SlideWrapper } from "../../components/SlideLayout";
import colors from "../../assets/styles/variables/colors";
import typography from "../../assets/styles/variables/typography";
import Logo from "../../components/Logo";
import Particles from "../../components/Particles";

/* ═══ Keyframes ═══ */
const fadeIn = keyframes`from{opacity:0}to{opacity:1}`;
const fadeLeft = keyframes`from{opacity:0;transform:translateX(-14px)}to{opacity:1;transform:translateX(0)}`;
const gatePulse = keyframes`
  0%,100%{box-shadow:0 0 4px 0 rgba(240,160,48,0.08);border-color:rgba(240,160,48,0.5)}
  50%{box-shadow:0 0 14px 4px rgba(240,160,48,0.2);border-color:rgba(240,160,48,0.8)}
`;
const greenPulse = keyframes`
  0%,100%{box-shadow:0 0 0 0 rgba(109,216,128,0)}
  50%{box-shadow:0 0 12px 3px rgba(109,216,128,0.15)}
`;

/* ═══ Styled ═══ */
const Shell = styled(SlideWrapper)`
  background:
    radial-gradient(ellipse 50% 40% at 50% 25%, rgba(0,200,232,0.04) 0%, transparent 55%),
    radial-gradient(ellipse 40% 35% at 82% 78%, rgba(167,139,250,0.03) 0%, transparent 55%),
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
  padding: 24px 32px 16px;
  display: flex; flex-direction: column; overflow: hidden;
`;

const Header = styled.header`
  margin-bottom: 10px;
  animation: ${fadeLeft} 0.9s 0.2s ease both;
`;

const Title = styled.h1`
  font-family: ${typography.fontDisplay};
  font-weight: ${typography.weightBlack};
  font-size: clamp(1.4rem, 2.6vw, 2rem);
  line-height: 1.15; letter-spacing: -0.02em;
  color: #fff; margin: 0 0 3px;
  max-width: calc(100% - 260px);
  .accent {
    background: linear-gradient(90deg, ${colors.cyan} 0%, #38bdf8 100%);
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Subtitle = styled.p`
  font-family: ${typography.fontBody};
  font-size: clamp(0.65rem, 0.85vw, 0.78rem);
  color: rgba(255,255,255,0.38); font-weight: 300; margin: 0;
`;

const Body = styled.div`
  flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 6px;
  min-height: 0; padding: 0 6px;
`;

/* Row containers */
const Row = styled.div`
  display: flex; align-items: stretch; height: ${({ $h }) => $h || '130px'};
  position: relative;
`;

/* Card */
const Card = styled.div`
  flex: 1; min-width: 0;
  padding: 10px 13px; border-radius: 12px; box-sizing: border-box;
  position: relative; display: flex; flex-direction: column;
  background: ${p =>
    p.$v === 'gate'   ? 'rgba(240,160,48,0.07)' :
    p.$v === 'green'  ? 'rgba(109,216,128,0.06)' :
    p.$v === 'blue'   ? 'rgba(56,189,248,0.06)' :
    p.$v === 'teal'   ? 'rgba(0,175,120,0.06)' :
    p.$v === 'purple' ? 'rgba(167,139,250,0.06)' : 'rgba(255,255,255,0.025)'};
  border: 1.5px solid ${p =>
    p.$v === 'gate'   ? 'rgba(240,160,48,0.5)' :
    p.$v === 'green'  ? 'rgba(109,216,128,0.4)' :
    p.$v === 'blue'   ? 'rgba(56,189,248,0.4)' :
    p.$v === 'teal'   ? 'rgba(0,175,120,0.4)' :
    p.$v === 'purple' ? 'rgba(167,139,250,0.4)' : 'rgba(0,200,232,0.2)'};
  backdrop-filter: blur(6px);
  opacity: ${p => p.$show ? 1 : 0};
  transform: ${p => p.$show ? 'translateY(0)' : 'translateY(6px)'};
  transition: opacity 0.4s cubic-bezier(0.25,0.46,0.45,0.94) ${p => p.$t || 0}s,
              transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94) ${p => p.$t || 0}s,
              box-shadow 0.3s ease, border-color 0.3s ease;
  ${p => p.$v === 'gate' && css`animation: ${gatePulse} 2.2s ease-in-out infinite;`}
  ${p => p.$v === 'green' && css`animation: ${greenPulse} 2.5s ease-in-out infinite;`}

  &:hover {
    box-shadow: 0 0 18px 4px ${p =>
      p.$v === 'gate'   ? 'rgba(240,160,48,0.2)' :
      p.$v === 'green'  ? 'rgba(109,216,128,0.2)' :
      p.$v === 'blue'   ? 'rgba(56,189,248,0.2)' :
      p.$v === 'teal'   ? 'rgba(0,175,120,0.2)' :
      p.$v === 'purple' ? 'rgba(167,139,250,0.2)' : 'rgba(0,200,232,0.15)'};
    border-color: ${p =>
      p.$v === 'gate'   ? 'rgba(240,160,48,0.8)' :
      p.$v === 'green'  ? 'rgba(109,216,128,0.7)' :
      p.$v === 'blue'   ? 'rgba(56,189,248,0.7)' :
      p.$v === 'teal'   ? 'rgba(0,175,120,0.7)' :
      p.$v === 'purple' ? 'rgba(167,139,250,0.7)' : 'rgba(0,200,232,0.5)'};
    transform: translateY(-2px);
  }
`;

const CHead = styled.div`
  display: flex; align-items: center; gap: 7px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  padding-bottom: 6px; margin-bottom: 6px; flex-shrink: 0;
`;
const CIcon = styled.span`font-size: 18px; flex-shrink: 0;`;
const CNameW = styled.div`display: flex; flex-direction: column; min-width: 0;`;
const GBadge = styled.div`
  font-family: ${typography.fontBody};
  font-size: 0.42rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
  color: rgba(240,160,48,0.9); margin-bottom: 1px;
`;
const CName = styled.div`
  font-family: ${typography.fontDisplay};
  font-size: 0.82rem; font-weight: 700; line-height: 1.2;
  color: ${p => p.$gate ? 'rgba(240,175,48,1)' : '#fff'};
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
`;
const CTdd = styled.div`
  font-family: ${typography.fontBody};
  font-size: 0.5rem; font-weight: 600; color: rgba(109,216,128,0.85); margin-top: 1px;
`;
const CRow = styled.div`display: flex; gap: 4px; align-items: flex-start; margin-bottom: 4px;`;
const CL = styled.div`
  font-family: ${typography.fontBody};
  font-size: 0.5rem; font-weight: 800; letter-spacing: 0.06em; text-transform: uppercase;
  color: rgba(0,200,232,0.7); width: 28px; flex-shrink: 0; padding-top: 1px;
`;
const CV = styled.div`
  font-family: ${typography.fontBody};
  font-size: 0.7rem; color: rgba(255,255,255,0.65); line-height: 1.4;
`;
const Retry = styled.div`
  position: absolute; top: 6px; right: 8px;
  font-family: ${typography.fontBody};
  font-size: 0.4rem; font-weight: 700; white-space: nowrap;
  color: rgba(239,68,68,0.9); background: rgba(20,5,5,0.95);
  border: 1px solid rgba(239,68,68,0.35); border-radius: 5px; padding: 2px 7px;
`;

/* Mini-cards for parallel */
const MiniCard = styled.div`
  padding: 7px 10px; border-radius: 10px; box-sizing: border-box;
  position: relative; display: flex; flex-direction: column; flex: 1;
  background: ${p => p.$v === 'teal' ? 'rgba(0,175,120,0.06)' : 'rgba(255,255,255,0.025)'};
  border: 1.5px solid ${p => p.$v === 'teal' ? 'rgba(0,175,120,0.4)' : 'rgba(0,200,232,0.2)'};
  backdrop-filter: blur(4px);
  opacity: ${p => p.$show ? 1 : 0};
  transform: ${p => p.$show ? 'translateY(0)' : 'translateY(5px)'};
  transition: opacity 0.35s ease ${p => p.$t || 0}s, transform 0.35s ease ${p => p.$t || 0}s;
`;
const MHead = styled.div`
  display: flex; align-items: center; gap: 5px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  padding-bottom: 4px; margin-bottom: 4px; flex-shrink: 0;
`;
const MIcon = styled.span`font-size: 13px; flex-shrink: 0;`;
const MName = styled.div`
  font-family: ${typography.fontDisplay};
  font-size: 0.65rem; font-weight: 700; color: #fff;
`;
const MTdd = styled.div`
  font-family: ${typography.fontBody};
  font-size: 0.42rem; font-weight: 600; color: rgba(109,216,128,0.85); margin-left: 4px;
`;
const MRow = styled.div`display: flex; gap: 3px; align-items: flex-start; margin-bottom: 2px;`;
const ML = styled.div`
  font-family: ${typography.fontBody};
  font-size: 0.42rem; font-weight: 800; text-transform: uppercase;
  color: rgba(0,200,232,0.65); width: 22px; flex-shrink: 0; padding-top: 1px;
`;
const MV = styled.div`
  font-family: ${typography.fontBody};
  font-size: 0.55rem; color: rgba(255,255,255,0.58); line-height: 1.4;
`;

/* Parallel wrapper */
const ParWrap = styled.div`
  flex: 0 0 260px; display: flex; align-items: stretch;
  opacity: ${p => p.$show ? 1 : 0}; transition: opacity 0.35s ${p => p.$t || 0}s;
  position: relative;
`;
const StackWrap = styled.div`flex: 1; display: flex; flex-direction: column; gap: 5px;`;
const ParLabel = styled.div`
  position: absolute; top: 4px; left: 50%; transform: translateX(-50%);
  font-family: ${typography.fontBody};
  font-size: 0.4rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
  color: rgba(0,200,232,0.65); background: rgba(8,13,28,0.95);
  border: 1px solid rgba(0,200,232,0.2); border-radius: 5px; padding: 2px 8px; white-space: nowrap;
  z-index: 2;
`;

const C_COLOR = "rgba(0,200,232,0.85)";

function BranchEntry({ h }) {
  const t1 = h * 0.22, b1 = h * 0.78;
  return (
    <svg width="26" height={h} style={{ flexShrink: 0, overflow: 'visible' }}>
      <line x1="24" y1={t1} x2="24" y2={b1} stroke={C_COLOR} strokeWidth="2" />
      <line x1="24" y1={t1} x2="6" y2={t1} stroke={C_COLOR} strokeWidth="2" />
      <polygon points={`0,${t1} 8,${t1 - 4} 8,${t1 + 4}`} fill={C_COLOR} />
      <line x1="24" y1={b1} x2="6" y2={b1} stroke={C_COLOR} strokeWidth="2" />
      <polygon points={`0,${b1} 8,${b1 - 4} 8,${b1 + 4}`} fill={C_COLOR} />
    </svg>
  );
}

function BranchExit({ h }) {
  const t1 = h * 0.22, b1 = h * 0.78;
  return (
    <svg width="26" height={h} style={{ flexShrink: 0, overflow: 'visible' }}>
      <line x1="2" y1={t1} x2="2" y2={b1} stroke={C_COLOR} strokeWidth="2" />
      <line x1="2" y1={t1} x2="22" y2={t1} stroke={C_COLOR} strokeWidth="2" />
      <line x1="2" y1={b1} x2="22" y2={b1} stroke={C_COLOR} strokeWidth="2" />
    </svg>
  );
}

/* Horizontal arrows */
const ArrW = styled.div`
  flex: 0 0 20px; display: flex; align-items: center; justify-content: center;
  opacity: ${p => p.$show ? 1 : 0}; transition: opacity 0.3s ease;
`;
const HL = styled.div`height: 2px; width: 11px; background: rgba(0,200,232,0.8);`;
const HT = styled.div`width: 0; height: 0; border-top: 5px solid transparent; border-bottom: 5px solid transparent; border-left: 7px solid rgba(0,200,232,0.9);`;
const HTL = styled.div`width: 0; height: 0; border-top: 5px solid transparent; border-bottom: 5px solid transparent; border-right: 7px solid rgba(0,200,232,0.9);`;
function A({ show }) { return <ArrW $show={show}><HL /><HT /></ArrW>; }
function AL({ show }) { return <ArrW $show={show}><HTL /><HL /></ArrW>; }

/* Snake connector */
const SnakeWrap = styled.div`position: relative; height: 24px; margin: 4px 0; opacity: ${p => p.$show ? 1 : 0}; transition: opacity 0.4s;`;
const SDrop = styled.div`position: absolute; ${p => p.$left ? 'left:0' : 'right:0'}; top: 0; width: 2.5px; height: 100%; background: rgba(0,200,232,0.8);`;
const STip = styled.div`position: absolute; bottom: -10px; ${p => p.$right ? 'right:-4px' : 'left:-4px'}; width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-top: 11px solid rgba(0,200,232,0.9);`;
function Snake({ show, left, tipRight }) {
  return <SnakeWrap $show={show}><SDrop $left={left} /><STip $right={tipRight} /></SnakeWrap>;
}

/* Stage card component */
function S({ icon, name, tdd, ins, outs, v, show, t, retry, gate }) {
  return (
    <Card $v={v} $show={show} $t={t}>
      {retry && <Retry>↺ {retry}</Retry>}
      <CHead>
        <CIcon>{icon}</CIcon>
        <CNameW>
          {gate && <GBadge>⏸ Human Gate</GBadge>}
          <CName $gate={gate}>{name}</CName>
          {tdd && <CTdd>Failing Tests First</CTdd>}
        </CNameW>
      </CHead>
      <CRow><CL>IN</CL><CV>{ins}</CV></CRow>
      <CRow><CL>OUT</CL><CV>{outs}</CV></CRow>
    </Card>
  );
}

/* Parallel block */
function Parallel({ show, t, h = 136 }) {
  return (
    <ParWrap $show={show} $t={t}>
      <ParLabel>⟂ Parallel Execution</ParLabel>
      <BranchExit h={h} />
      <StackWrap>
        <MiniCard $show={show} $t={t || 0}>
          <MHead><MIcon>📚</MIcon><MName>KB Publish</MName></MHead>
          <MRow><ML>IN</ML><MV>review.json</MV></MRow>
          <MRow><ML>OUT</ML><MV>KB page</MV></MRow>
        </MiniCard>
        <MiniCard $show={show} $t={(t || 0) + 0.05} $v="teal">
          <MHead><MIcon>🧪</MIcon><MName>TDD Tests</MName><MTdd>Failing First</MTdd></MHead>
          <MRow><ML>IN</ML><MV>plan.json + api_contract</MV></MRow>
          <MRow><ML>OUT</ML><MV>test stubs + failing tests</MV></MRow>
        </MiniCard>
      </StackWrap>
      <BranchEntry h={h} />
    </ParWrap>
  );
}

export default function SlideSDLC2() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const delays = [0, 350, 650, 930, 1180, 1400, 1650, 1900, 2150, 2380, 2580, 2760, 2920, 3060];
    const timers = delays.map((d, i) => setTimeout(() => setStep(i + 1), d));
    return () => timers.forEach(clearTimeout);
  }, []);

  const s = step;

  return (
    <Shell>
      <Grid />
      <Particles count={8} />
      <LogoWrap><Logo alt="EPAM" width={220} /></LogoWrap>

      <Frame>
        <Header>
          <Title>Agentic Feature <span className="accent">Workflow Execution</span></Title>
          <Subtitle>AI-Driven SDLC · Parallel Execution · Human Approval Gates · Sequential Flow</Subtitle>
        </Header>

        <Body>
          {/* Row 1: Feature Req → Analyst → Planner → Reviewer → Gate 1 */}
          <Row $h="128px">
            <S icon="📥" name="Feature Req." ins="User Input + Jira" outs="trigger event" show={s >= 1} t={0} />
            <A show={s >= 2} />
            <S icon="🔍" name="Analyst" ins="User Input + Jira" outs="requirement.json" show={s >= 2} t={0} />
            <A show={s >= 3} />
            <S icon="📋" name="Planner" ins="requirement.json" outs="plan.json + api_contract" show={s >= 3} t={0} />
            <A show={s >= 4} />
            <S icon="👁️" name="Reviewer" ins="plan.json" outs="review.json" show={s >= 4} t={0} retry="→ Planner" v="purple" />
            <A show={s >= 5} />
            <S icon="🔐" name="Gate 1" ins="review.json" outs="Approved / Rejected" show={s >= 5} t={0} retry="→ Analyst" v="gate" gate />
          </Row>

          <Snake show={s >= 5} tipRight />

          {/* Row 2: [Parallel] → Coder → Coverage → Guardian (reversed) */}
          <Row $h="136px" style={{ flexDirection: 'row-reverse' }}>
            <Parallel show={s >= 6} t={0} />
            <AL show={s >= 7} />
            <S icon="💻" name="Coder" ins="plan + test stubs" outs="changes.json + src files" show={s >= 7} t={0} v="blue" />
            <AL show={s >= 8} />
            <S icon="🔬" name="Coverage" ins="src files + plan" outs="test_report.json" show={s >= 8} t={0} v="teal" />
            <AL show={s >= 9} />
            <S icon="🛡️" name="Guardian" ins="changes.json + test_report" outs="quality_report.json" show={s >= 9} t={0} />
          </Row>

          <Snake show={s >= 9} left />

          {/* Row 3: Gate 2 → Pipeline → Gate 3 → Merge Request */}
          <Row $h="128px">
            <S icon="🔐" name="Gate 2" ins="quality_report.json" outs="Approved / Rejected" show={s >= 10} t={0} retry="→ Coder" v="gate" gate />
            <A show={s >= 11} />
            <S icon="⚙️" name="Pipeline" ins="changes + approved" outs="pipeline_status.json" show={s >= 11} t={0} retry="↩ Retry" />
            <A show={s >= 12} />
            <S icon="🔐" name="Gate 3" ins="pipeline_status.json" outs="MR Approved" show={s >= 12} t={0} v="gate" gate />
            <A show={s >= 13} />
            <S icon="🚀" name="Merge Request" ins="MR Approved" outs="pipeline_status + MR + Deploy" show={s >= 13} t={0} v="green" />
          </Row>
        </Body>
      </Frame>
    </Shell>
  );
}
