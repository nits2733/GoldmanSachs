import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { SlideWrapper } from "../../components/SlideLayout";
import Logo from "../../components/Logo";

const fadeIn = keyframes`from{opacity:0}to{opacity:1}`;
const gateP  = keyframes`
  0%,100%{box-shadow:0 0 4px 0 rgba(255,140,0,0.1);border-color:rgba(255,140,0,0.7)}
  50%{box-shadow:0 0 18px 6px rgba(255,140,0,0.35);border-color:rgba(255,165,0,1)}
`;
const greenP = keyframes`
  0%,100%{box-shadow:0 0 0 0 rgba(0,210,90,0)}
  50%{box-shadow:0 0 14px 4px rgba(0,210,90,0.3)}
`;

const Shell = styled(SlideWrapper)`
  background:#080d1c;overflow:hidden;
  font-family:"Inter","Segoe UI",system-ui,sans-serif;
`;
const LogoWrap = styled.div`
  position:absolute;top:14px;right:40px;z-index:20;
  animation:${fadeIn} 0.8s 0.2s ease both;
`;
const Grid = styled.div`
  position:absolute;inset:0;pointer-events:none;z-index:0;
  background-image:
    linear-gradient(rgba(255,255,255,0.016) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,0.016) 1px,transparent 1px);
  background-size:48px 48px;
`;
const Header = styled.div`
  position:absolute;top:0;left:0;right:0;z-index:20;padding:13px 44px 0;
  animation:${fadeIn} 0.5s ease both;
`;
const H1   = styled.h1`margin:0;font-size:17px;font-weight:700;color:#fff;letter-spacing:-0.01em;`;
const HSub = styled.p`margin:2px 0 0;font-size:10px;color:rgba(255,255,255,0.32);`;

const Body = styled.div`
  position:absolute;
  top:50px;bottom:8px;left:18px;right:18px;
  display:flex;flex-direction:column;justify-content:center;gap:0;
`;

/* Row heights */
const Row1 = styled.div`display:flex;align-items:stretch;height:150px;`;
const Row2 = styled.div`display:flex;align-items:stretch;height:158px;`;
const Row3 = styled.div`display:flex;align-items:stretch;height:150px;`;

/* ── Standard Card ── */
const Card = styled.div`
  flex:1;min-width:0;
  padding:11px 13px 10px;border-radius:10px;box-sizing:border-box;
  position:relative;display:flex;flex-direction:column;
  background:${p=>
    p.v==="gate"  ?"rgba(255,140,0,0.11)" :
    p.v==="green" ?"rgba(0,210,90,0.08)"  :
    p.v==="blue"  ?"rgba(0,100,255,0.09)" :
    p.v==="teal"  ?"rgba(0,175,120,0.09)" :
    p.v==="purple"?"rgba(110,70,255,0.09)":"rgba(255,255,255,0.048)"};
  border:${p=>p.v==="gate"?"2px":"1.5px"} solid ${p=>
    p.v==="gate"  ?"rgba(255,150,0,0.92)" :
    p.v==="green" ?"rgba(0,200,80,0.5)"   :
    p.v==="blue"  ?"rgba(0,120,255,0.5)"  :
    p.v==="teal"  ?"rgba(0,175,120,0.5)"  :
    p.v==="purple"?"rgba(130,80,255,0.5)" :"rgba(0,200,232,0.28)"};
  opacity:${p=>p.show?1:0};
  transform:${p=>p.show?"translateY(0)":"translateY(8px)"};
  transition:opacity 0.3s ease ${p=>p.t||0}s,transform 0.3s ease ${p=>p.t||0}s;
  ${p=>p.v==="gate" &&css`animation:${gateP} 1.8s ease-in-out infinite;`}
  ${p=>p.v==="green"&&css`animation:${greenP} 2s ease-in-out infinite;`}
`;
const CHead = styled.div`
  display:flex;align-items:flex-start;gap:6px;
  border-bottom:1px solid rgba(255,255,255,0.09);
  padding-bottom:7px;margin-bottom:7px;flex-shrink:0;
`;
const CIcon  = styled.span`font-size:20px;flex-shrink:0;margin-top:1px;`;
const CNameW = styled.div`display:flex;flex-direction:column;min-width:0;`;
const GBadge = styled.div`font-size:7.5px;font-weight:800;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,165,0,0.9);margin-bottom:2px;`;
const CName  = styled.div`font-size:14px;font-weight:700;line-height:1.2;color:${p=>p.gate?"rgba(255,175,30,1)":"#fff"};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;`;
const CTDDSb = styled.div`font-size:9px;font-weight:600;color:rgba(0,220,130,0.9);margin-top:2px;`;
const CRow   = styled.div`display:flex;gap:4px;align-items:flex-start;margin-bottom:5px;`;
const CL     = styled.div`font-size:9px;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;color:rgba(0,200,232,0.75);width:28px;flex-shrink:0;padding-top:1px;`;
const CV     = styled.div`font-size:12px;color:rgba(255,255,255,0.72);line-height:1.45;`;
const Retry  = styled.div`
  position:absolute;top:-15px;left:50%;transform:translateX(-50%);
  font-size:6.5px;font-weight:700;white-space:nowrap;
  color:rgba(255,90,60,0.95);background:rgba(22,5,3,0.96);
  border:1px solid rgba(220,60,40,0.45);border-radius:5px;padding:2px 7px;
`;

/* ── Compact mini-card used inside parallel block ── */
const MiniCard = styled.div`
  padding:8px 10px;border-radius:8px;box-sizing:border-box;
  position:relative;display:flex;flex-direction:column;
  flex:1;
  background:${p=>p.v==="teal"?"rgba(0,175,120,0.09)":"rgba(255,255,255,0.048)"};
  border:1.5px solid ${p=>p.v==="teal"?"rgba(0,175,120,0.5)":"rgba(0,200,232,0.28)"};
  opacity:${p=>p.show?1:0};
  transform:${p=>p.show?"translateY(0)":"translateY(6px)"};
  transition:opacity 0.28s ease ${p=>p.t||0}s,transform 0.28s ease ${p=>p.t||0}s;
`;
const MHead = styled.div`
  display:flex;align-items:center;gap:5px;
  border-bottom:1px solid rgba(255,255,255,0.08);
  padding-bottom:5px;margin-bottom:5px;flex-shrink:0;
`;
const MIcon = styled.span`font-size:14px;flex-shrink:0;`;
const MName = styled.div`font-size:11px;font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;`;
const MTDDSb= styled.div`font-size:7.5px;font-weight:600;color:rgba(0,220,130,0.9);margin-top:1px;`;
const MRow  = styled.div`display:flex;gap:3px;align-items:flex-start;margin-bottom:2px;`;
const ML    = styled.div`font-size:7.5px;font-weight:800;text-transform:uppercase;color:rgba(0,200,232,0.7);width:22px;flex-shrink:0;padding-top:1px;`;
const MV    = styled.div`font-size:9px;color:rgba(255,255,255,0.65);line-height:1.4;`;

/* ── Parallel block: fork arrow + two stacked mini-cards + merge arrow ── */
const ParWrap = styled.div`
  flex:0 0 280px;
  display:flex;align-items:stretch;
  opacity:${p=>p.show?1:0};transition:opacity 0.3s ${p=>p.t||0}s;
  position:relative;
`;
const StackWrap = styled.div`flex:1;display:flex;flex-direction:column;gap:6px;`;

/* parallel label */
const ParLabel = styled.div`
  position:absolute;top:-16px;left:50%;transform:translateX(-50%);
  font-size:7px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;
  color:rgba(0,220,255,0.7);background:rgba(8,13,28,0.95);
  border:1px solid rgba(0,200,232,0.25);border-radius:5px;padding:2px 8px;white-space:nowrap;
`;

const C = "rgba(0,220,255,0.9)";

/* SVG branch — right side: entry from Gate1 (splits into 2 arrows pointing RIGHT into cards) */
function BranchEntry({h}) {
  const mid = h / 2;
  const t1  = h * 0.22;
  const b1  = h * 0.78;
  return (
    <svg width="28" height={h} style={{flexShrink:0,overflow:"visible"}}>
      {/* vertical bar on right */}
      <line x1="26" y1={t1} x2="26" y2={b1} stroke={C} strokeWidth="2.5"/>
      {/* top branch → into card (pointing LEFT) */}
      <line x1="26" y1={t1} x2="8" y2={t1} stroke={C} strokeWidth="2.5"/>
      <polygon points={`0,${t1} 10,${t1-5} 10,${t1+5}`} fill={C}/>
      {/* bottom branch → into card (pointing LEFT) */}
      <line x1="26" y1={b1} x2="8" y2={b1} stroke={C} strokeWidth="2.5"/>
      <polygon points={`0,${b1} 10,${b1-5} 10,${b1+5}`} fill={C}/>
    </svg>
  );
}

/* SVG branch — left side: exit to Coder (collects 2 lines, exits LEFT with single arrow) */
function BranchExit({h}) {
  const mid = h / 2;
  const t1  = h * 0.22;
  const b1  = h * 0.78;
  return (
    <svg width="28" height={h} style={{flexShrink:0,overflow:"visible"}}>
      {/* vertical bar on left */}
      <line x1="2" y1={t1} x2="2" y2={b1} stroke={C} strokeWidth="2.5"/>
      {/* top branch from card */}
      <line x1="2" y1={t1} x2="24" y2={t1} stroke={C} strokeWidth="2.5"/>
      {/* bottom branch from card */}
      <line x1="2" y1={b1} x2="24" y2={b1} stroke={C} strokeWidth="2.5"/>
    </svg>
  );
}

/* ── Horizontal arrow ── */
const AW = 22;
const ArrW = styled.div`flex:0 0 ${AW}px;display:flex;align-items:center;justify-content:center;opacity:${p=>p.show?1:0};transition:opacity 0.2s;`;
const HL   = styled.div`height:2.5px;width:13px;background:rgba(0,220,255,0.85);box-shadow:0 0 4px rgba(0,200,232,0.5);`;
const HT   = styled.div`width:0;height:0;border-top:6px solid transparent;border-bottom:6px solid transparent;border-left:9px solid rgba(0,220,255,0.95);`;
const HTL  = styled.div`width:0;height:0;border-top:6px solid transparent;border-bottom:6px solid transparent;border-right:9px solid rgba(0,220,255,0.95);`;
function A({show}){  return <ArrW show={show}><HL/><HT/></ArrW>; }
function AL({show}){ return <ArrW show={show}><HTL/><HL/></ArrW>; }

/* ── Snake connector ── */
const SnakeWrap = styled.div`position:relative;height:36px;opacity:${p=>p.show?1:0};transition:opacity 0.3s;`;
const SDrop = styled.div`position:absolute;${p=>p.left?"left:0":"right:0"};top:0;width:3px;height:100%;background:rgba(0,220,255,0.9);box-shadow:0 0 6px rgba(0,200,232,0.5);`;
const STip  = styled.div`position:absolute;bottom:-12px;${p=>p.right?"right:-5px":"left:-5px"};width:0;height:0;border-left:10px solid transparent;border-right:10px solid transparent;border-top:14px solid rgba(0,220,255,0.98);filter:drop-shadow(0 0 4px rgba(0,220,255,0.7));`;
function Snake({show,left,tipRight}){
  return <SnakeWrap show={show}><SDrop left={left}/><STip right={tipRight}/></SnakeWrap>;
}

/* ── Stage card component ── */
function S({icon,name,tdd,ins,outs,v,show,t,retry,gate}) {
  return (
    <Card v={v} show={show} t={t} gate={gate}>
      {retry && <Retry>↺ {retry}</Retry>}
      <CHead>
        <CIcon>{icon}</CIcon>
        <CNameW>
          {gate && <GBadge>⏸ Human Gate</GBadge>}
          <CName gate={gate}>{name}</CName>
          {tdd && <CTDDSb>Failing Tests First</CTDDSb>}
        </CNameW>
      </CHead>
      <CRow><CL>IN</CL><CV>{ins}</CV></CRow>
      <CRow><CL>OUT</CL><CV>{outs}</CV></CRow>
    </Card>
  );
}

/* ── Parallel block: KB Publish || TDD Tests ── */
function Parallel({show,t,h=158}) {
  return (
    <ParWrap show={show} t={t}>
      <ParLabel>⟂ Parallel Execution</ParLabel>
      {/* Left side: exit toward Coder — two lines converge, single arrow points left */}
      <BranchExit h={h}/>
      <StackWrap>
        <MiniCard show={show} t={(t||0)}>
          <MHead><MIcon>📚</MIcon><MName>KB Publish</MName></MHead>
          <MRow><ML>IN</ML><MV>review.json</MV></MRow>
          <MRow><ML>OUT</ML><MV>KB page</MV></MRow>
        </MiniCard>
        <MiniCard show={show} t={(t||0)+0.05} v="teal">
          <MHead><MIcon>🧪</MIcon><MName>TDD Tests</MName><MTDDSb style={{marginLeft:4}}>Failing First</MTDDSb></MHead>
          <MRow><ML>IN</ML><MV>plan.json + api_contract</MV></MRow>
          <MRow><ML>OUT</ML><MV>test stubs + failing tests</MV></MRow>
        </MiniCard>
      </StackWrap>
      {/* Right side: entry from Gate1 — splits into 2 arrows going right into cards */}
      <BranchEntry h={h}/>
    </ParWrap>
  );
}

export default function SlideSDLC2() {
  const [step, setStep] = useState(0);
  useEffect(()=>{
    const t=[0,280,530,760,970,1160,1380,1620,1840,2040,2220,2380,2520,2640];
    const ts=t.map((d,i)=>setTimeout(()=>setStep(i+1),d));
    return ()=>ts.forEach(clearTimeout);
  },[]);
  const s=step;

  return (
    <Shell>
      <Grid/>
      <LogoWrap><Logo alt="EPAM" width={220}/></LogoWrap>
      <Header>
        <H1>feature.yaml Workflow Execution</H1>
        <HSub>AI-Driven SDLC Orchestration · Parallel Execution · Human Approval Gates · Sequential Flow</HSub>
      </Header>
      <Body>

        {/* ── Row 1: Feature Req → Analyst → Planner → Reviewer → Gate 1 ── */}
        <Row1>
          <S icon="📥" name="Feature Req."  ins="User Input + Jira"       outs="trigger event"           show={s>=1}  t={0}/>
          <A show={s>=2}/>
          <S icon="🔍" name="Analyst"       ins="User Input + Jira"       outs="requirement.json"        show={s>=2}  t={0}/>
          <A show={s>=3}/>
          <S icon="📋" name="Planner"       ins="requirement.json"        outs="plan.json + api_contract" show={s>=3} t={0}/>
          <A show={s>=4}/>
          <S icon="👁️" name="Reviewer"      ins="plan.json"               outs="review.json"             show={s>=4}  t={0} retry="→ Planner" v="purple"/>
          <A show={s>=5}/>
          <S icon="🔐" name="Gate 1"        ins="review.json"             outs="Approved / Rejected"     show={s>=5}  t={0} retry="→ Analyst" v="gate" gate/>
        </Row1>

        {/* Snake: Gate1 (right) → down → into parallel block */}
        <Snake show={s>=5} tipRight/>

        {/* ── Row 2: [Parallel: KB Publish || TDD Tests] → Coder → Coverage → Guardian ── */}
        <Row2 style={{flexDirection:"row-reverse"}}>
          <Parallel show={s>=6} t={0}/>
          <AL show={s>=7}/>
          <S icon="💻" name="Coder"         ins="plan + test stubs"       outs="changes.json + src files" show={s>=7} t={0} v="blue"/>
          <AL show={s>=8}/>
          <S icon="🔬" name="Coverage"      ins="src files + plan"        outs="test_report.json"         show={s>=8} t={0} v="teal"/>
          <AL show={s>=9}/>
          <S icon="🛡️" name="Guardian"      ins="changes.json + test_report" outs="quality_report.json"   show={s>=9} t={0}/>
        </Row2>

        {/* Snake: Guardian (left of reversed row) → down → Gate 2 */}
        <Snake show={s>=9} left/>

        {/* ── Row 3: Gate 2 → Pipeline → Gate 3 → Merge Request ── */}
        <Row3>
          <S icon="🔐" name="Gate 2"        ins="quality_report.json"     outs="Approved / Rejected"     show={s>=10} t={0} retry="→ Coder"  v="gate" gate/>
          <A show={s>=11}/>
          <S icon="⚙️" name="Pipeline"      ins="changes + approved"      outs="pipeline_status.json"    show={s>=11} t={0} retry="↩ Retry"/>
          <A show={s>=12}/>
          <S icon="🔐" name="Gate 3"        ins="pipeline_status.json"    outs="MR Approved"             show={s>=12} t={0}                   v="gate" gate/>
          <A show={s>=13}/>
          <S icon="🚀" name="Merge Request" ins="MR Approved"             outs="pipeline_status + MR + Deploy" show={s>=13} t={0}            v="green"/>
        </Row3>

      </Body>
    </Shell>
  );
}
