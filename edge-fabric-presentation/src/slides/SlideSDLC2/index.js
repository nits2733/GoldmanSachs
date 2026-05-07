import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { SlideWrapper } from "../../components/SlideLayout";

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
const Grid = styled.div`
  position:absolute;inset:0;pointer-events:none;z-index:0;
  background-image:
    linear-gradient(rgba(255,255,255,0.016) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,0.016) 1px,transparent 1px);
  background-size:48px 48px;
`;
const TopLine = styled.div`
  position:absolute;top:0;left:0;right:0;height:3px;z-index:10;
  background:linear-gradient(90deg,transparent,#00c8e8 35%,#00c8e8 65%,transparent);
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

/* Each row: full width, fixed height */
const Row = styled.div`
  display:flex;align-items:stretch;
  height:158px;
`;

/* Arrow */
const AW = 22;
const ArrWrap = styled.div`
  flex:0 0 ${AW}px;
  display:flex;align-items:center;justify-content:center;
  opacity:${p=>p.show?1:0};transition:opacity 0.2s;
`;
const HL = styled.div`height:2.5px;width:13px;background:rgba(0,220,255,0.85);box-shadow:0 0 4px rgba(0,200,232,0.5);`;
const HT = styled.div`width:0;height:0;border-top:6px solid transparent;border-bottom:6px solid transparent;border-left:9px solid rgba(0,220,255,0.95);`;
function A({show}){ return <ArrWrap show={show}><HL/><HT/></ArrWrap>; }

/* Card: flex:1 so all cards in a row share space equally */
const Card = styled.div`
  flex:1;min-width:0;
  padding:11px 12px 10px;border-radius:10px;box-sizing:border-box;
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
const CIcon = styled.span`font-size:22px;flex-shrink:0;margin-top:1px;`;
const CNameWrap = styled.div`display:flex;flex-direction:column;min-width:0;`;
const GBadge = styled.div`font-size:8px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,165,0,0.9);margin-bottom:3px;`;
const CName = styled.div`
  font-size:14px;font-weight:700;line-height:1.2;
  color:${p=>p.gate?"rgba(255,175,30,1)":"#fff"};
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
`;
const CTDDSub = styled.div`font-size:9px;font-weight:600;color:rgba(0,220,130,0.9);margin-top:2px;`;
const CRow  = styled.div`display:flex;gap:4px;align-items:flex-start;margin-bottom:5px;`;
const CL    = styled.div`font-size:9px;font-weight:800;letter-spacing:0.06em;text-transform:uppercase;color:rgba(0,200,232,0.75);width:28px;flex-shrink:0;padding-top:1px;`;
const CV    = styled.div`font-size:12px;color:rgba(255,255,255,0.72);line-height:1.45;`;
const Retry = styled.div`
  position:absolute;top:-15px;left:50%;transform:translateX(-50%);
  font-size:6.5px;font-weight:700;white-space:nowrap;
  color:rgba(255,90,60,0.95);background:rgba(22,5,3,0.96);
  border:1px solid rgba(220,60,40,0.45);border-radius:5px;padding:2px 7px;
`;

/*
  Snake connector: a wrapper div (height=36px) sits between rows.
  Inside: a right-aligned vertical bar drops from the bottom of the last row,
  a full-width horizontal line sweeps left, and an arrowhead points down-left
  into the next row's first card.
*/
const SnakeWrap = styled.div`
  position:relative;
  height:36px;
  opacity:${p=>p.show?1:0};transition:opacity 0.3s;
`;
/* Vertical drop — right side for snake1 (after row1), left side for snake2 (after reversed row2) */
const SDrop = styled.div`
  position:absolute;${p=>p.left?"left:0":"right:0"};top:0;
  width:3px;height:100%;
  background:rgba(0,220,255,0.9);
  box-shadow:0 0 6px rgba(0,200,232,0.5);
`;
/* Horizontal bar along the BOTTOM */
const SBar = styled.div`
  position:absolute;bottom:0;left:0;right:0;
  height:3px;
  background:rgba(0,220,255,0.9);
  box-shadow:0 0 6px rgba(0,200,232,0.5);
`;
/* Arrowhead pointing DOWN — right end for snake1 (into KB Publish), left end for snake2 (into Gate 2) */
const STip = styled.div`
  position:absolute;bottom:-12px;${p=>p.right?"right:-5px":"left:-5px"};
  width:0;height:0;
  border-left:10px solid transparent;
  border-right:10px solid transparent;
  border-top:14px solid rgba(0,220,255,0.98);
  filter:drop-shadow(0 0 4px rgba(0,220,255,0.7));
`;
function Snake({show, left, tipRight}){
  return (
    <SnakeWrap show={show}>
      <SDrop left={left}/><STip right={tipRight}/>
    </SnakeWrap>
  );
}

function S({icon,name,tdd,ins,outs,v,show,t,retry,gate}) {
  return (
    <Card v={v} show={show} t={t} gate={gate}>
      {retry && <Retry>↺ {retry}</Retry>}
      <CHead>
        <CIcon>{icon}</CIcon>
        <CNameWrap>
          {gate && <GBadge>⏸ Human Gate</GBadge>}
          <CName gate={gate}>{name}</CName>
          {tdd && <CTDDSub>Failing Tests First</CTDDSub>}
        </CNameWrap>
      </CHead>
      <CRow><CL>IN</CL><CV>{ins}</CV></CRow>
      <CRow><CL>OUT</CL><CV>{outs}</CV></CRow>
    </Card>
  );
}

export default function SlideSDLC2() {
  const [step, setStep] = useState(0);
  useEffect(()=>{
    const t=[0,280,530,760,970,1160,1340,1510,1670,1820,1960,2090,2210,2320];
    const ts=t.map((d,i)=>setTimeout(()=>setStep(i+1),d));
    return ()=>ts.forEach(clearTimeout);
  },[]);
  const s=step;

  return (
    <Shell>
      <Grid/><TopLine/>
      <Header>
        <H1>feature.yaml Workflow Execution</H1>
        <HSub>AI-Driven SDLC Orchestration · Human Approval Gates · Sequential Execution</HSub>
      </Header>
      <Body>

        {/* ── Row 1: Feature Req → Analyst → Planner → Reviewer → Gate 1 ── */}
        <Row>
          <S icon="📥" name="Feature Req."  ins="User Input + Jira"        outs="trigger event"              show={s>=1}  t={0}/>
          <A show={s>=2}/>
          <S icon="🔍" name="Analyst"       ins="User Input + Jira"        outs="requirement.json"           show={s>=2}  t={0}/>
          <A show={s>=3}/>
          <S icon="📋" name="Planner"       ins="requirement.json"         outs="plan.json + api_contract"   show={s>=3}  t={0}/>
          <A show={s>=4}/>
          <S icon="👁️" name="Reviewer"      ins="plan.json"                outs="review.json"                show={s>=4}  t={0} retry="→ Planner" v="purple"/>
          <A show={s>=5}/>
          <S icon="🔐" name="Gate 1"        ins="review.json"              outs="Approved / Rejected"        show={s>=5}  t={0} retry="→ Analyst" v="gate" gate/>
        </Row>

        {/* Snake: right drop → sweeps left → tip on RIGHT into KB Publish */}
        <Snake show={s>=5} tipRight/>

        {/* ── Row 2 (reversed): Guardian ← Coverage ← Coder ← TDD Tests ← KB Publish ── */}
        <Row style={{flexDirection:"row-reverse"}}>
          <S icon="📚" name="KB Publish"    ins="review.json"              outs="KB page"                    show={s>=6}  t={0}/>
          <A show={s>=7}/>
          <S icon="🧪" name="TDD Tests"     ins="plan.json + api_contract" outs="test stubs + failing tests" show={s>=7}  t={0}   v="teal" tdd/>
          <A show={s>=8}/>
          <S icon="💻" name="Coder"         ins="plan + test stubs"        outs="changes.json + src files"   show={s>=8}  t={0}   v="blue"/>
          <A show={s>=9}/>
          <S icon="🔬" name="Coverage"      ins="src files + plan"         outs="test_report.json"           show={s>=9}  t={0}   v="teal"/>
          <A show={s>=10}/>
          <S icon="🛡️" name="Guardian"      ins="changes.json + test_report" outs="quality_report.json"      show={s>=10} t={0}/>
        </Row>

        {/* Snake: left drop → sweeps right → tip on LEFT into Gate 2 */}
        <Snake show={s>=10} left/>

        {/* ── Row 3: Gate 2 → Pipeline → Gate 3 → Merge Request ── */}
        <Row>
          <S icon="🔐" name="Gate 2"        ins="quality_report.json"      outs="Approved / Rejected"        show={s>=11} t={0} retry="→ Coder"  v="gate" gate/>
          <A show={s>=12}/>
          <S icon="⚙️" name="Pipeline"      ins="changes + approved"       outs="pipeline_status.json"       show={s>=12} t={0} retry="↩ Retry"/>
          <A show={s>=13}/>
          <S icon="🔐" name="Gate 3"        ins="pipeline_status.json"     outs="MR Approved"                show={s>=13} t={0}                   v="gate" gate/>
          <A show={s>=14}/>
          <S icon="🚀" name="Merge Request" ins="MR Approved"              outs="pipeline_status + MR + Deploy" show={s>=14} t={0}               v="green"/>
        </Row>

      </Body>
    </Shell>
  );
}
