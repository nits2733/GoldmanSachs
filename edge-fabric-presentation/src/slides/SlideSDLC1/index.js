import React, { useEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { SlideWrapper } from "../../components/SlideLayout";
import Logo from "../../components/Logo";

const fadeIn  = keyframes`from{opacity:0}to{opacity:1}`;
const glowB   = keyframes`0%,100%{box-shadow:0 0 0 0 rgba(0,200,232,0)}50%{box-shadow:0 0 0 6px rgba(0,200,232,0.12)}`;
const orangeB = keyframes`0%,100%{box-shadow:0 0 0 0 rgba(255,160,0,0);border-color:rgba(255,160,0,0.5)}50%{box-shadow:0 0 0 6px rgba(255,160,0,0.14);border-color:rgba(255,160,0,0.9)}`;
const greenB  = keyframes`0%,100%{box-shadow:0 0 0 0 rgba(0,200,100,0)}50%{box-shadow:0 0 0 6px rgba(0,200,100,0.15)}`;
const panelL  = keyframes`from{opacity:0;transform:translateX(-12px)}to{opacity:1;transform:translateX(0)}`;
const panelR  = keyframes`from{opacity:0;transform:translateX(12px)}to{opacity:1;transform:translateX(0)}`;

const Shell = styled(SlideWrapper)`
  background:#080d1c;overflow:hidden;
  font-family:"Inter","Segoe UI",system-ui,sans-serif;
`;
const LogoWrap = styled.div`
  position:absolute;top:14px;right:40px;z-index:20;
  animation:${fadeIn} 0.8s 0.2s ease both;
`;
const Grid = styled.div`
  position:absolute;inset:0;z-index:0;pointer-events:none;
  background-image:
    linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),
    linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);
  background-size:56px 56px;
`;
const Header = styled.div`
  position:absolute;top:0;left:0;right:0;z-index:20;padding:22px 48px 0;
  animation:${fadeIn} 0.5s ease both;
`;
const H1   = styled.h1`margin:0;font-size:20px;font-weight:700;color:#fff;letter-spacing:-0.01em;`;
const HSub = styled.p`margin:3px 0 0;font-size:11px;color:rgba(255,255,255,0.35);`;

/* Root layout */
const Layout = styled.div`
  position:absolute;top:68px;bottom:46px;left:0;right:0;
  display:flex;align-items:stretch;justify-content:center;padding:0;
`;

/* ── Side panel ── */
const SidePanel = styled.div`
  width:190px;flex-shrink:0;
  display:flex;flex-direction:column;justify-content:center;gap:8px;
  padding:${p=>p.right?"0 0 0 20px":"0 20px 0 0"};
  animation:${p=>p.right
    ? css`${panelR} 0.5s ease ${p.delay||1}s both`
    : css`${panelL} 0.5s ease ${p.delay||0.6}s both`};
`;
const Chip = styled.div`
  display:flex;align-items:center;gap:10px;
  padding:12px 16px;border-radius:9px;
  background:${p=>p.lit?"rgba(0,200,232,0.07)":"rgba(255,255,255,0.04)"};
  border:1px solid ${p=>p.lit?"rgba(0,200,232,0.38)":"rgba(255,255,255,0.09)"};
  font-size:13px;font-weight:500;
  color:${p=>p.lit?"rgba(255,255,255,0.92)":"rgba(255,255,255,0.48)"};
  transition:all 0.4s ease;
`;

/* Thin connector between panel and pipeline */
const ConnBar = styled.div`
  width:20px;flex-shrink:0;
  display:flex;flex-direction:column;justify-content:center;gap:14px;
`;
const HLine = styled.div`
  height:1px;
  background:${p=>p.on?"rgba(0,200,232,0.22)":"rgba(0,200,232,0)"};
  transition:background 0.5s ease;
`;

/* ── Pipeline column ── */
const Pipeline = styled.div`
  flex:0 0 auto;width:420px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;
`;

/* Block */
const Block = styled.div`
  width:${p=>p.wide?"360px":"280px"};
  padding:${p=>p.tall?"15px 22px 16px":"12px 20px"};
  border-radius:10px;
  display:flex;flex-direction:column;align-items:center;
  background:${p=>
    p.v==="orange"?"rgba(255,150,0,0.07)":
    p.v==="green" ?"rgba(0,200,90,0.07)" :
    p.v==="blue"  ?"rgba(0,110,255,0.1)" :"rgba(255,255,255,0.04)"};
  border:1.5px solid ${p=>
    p.v==="orange"?"rgba(255,150,0,0.55)" :
    p.v==="green" ?"rgba(0,200,90,0.45)"  :
    p.v==="blue"  ?"rgba(0,130,255,0.45)" :
    p.active     ?"rgba(0,200,232,0.38)"  :"rgba(255,255,255,0.09)"};
  opacity:${p=>p.show?1:0};
  transform:${p=>p.show?"translateY(0)":"translateY(7px)"};
  transition:opacity 0.35s ease,transform 0.35s ease;
  ${p=>p.active&&css`animation:${glowB} 2.5s ease-in-out infinite;`}
  ${p=>p.v==="orange"&&css`animation:${orangeB} 2s ease-in-out infinite;`}
  ${p=>p.v==="green" &&css`animation:${greenB}  2s ease-in-out infinite;`}
`;
const BIcon  = styled.div`font-size:22px;margin-bottom:3px;`;
const BTitle = styled.div`font-size:15px;font-weight:700;color:#fff;`;
const BSub   = styled.div`font-size:10.5px;color:rgba(255,255,255,0.38);margin-top:2px;`;

/* Arrow */
const Arr  = styled.div`display:flex;flex-direction:column;align-items:center;opacity:${p=>p.show?1:0};transition:opacity 0.3s;`;
const VLine= styled.div`width:2px;height:12px;background:linear-gradient(180deg,rgba(0,200,232,0.5),rgba(0,200,232,0.85));`;
const Tip  = styled.div`width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:7px solid rgba(0,200,232,0.85);`;

/* Agents grid */
const AgentsGrid = styled.div`display:flex;flex-wrap:wrap;justify-content:center;gap:6px;margin-top:10px;width:100%;`;
const APill = styled.div`
  display:flex;align-items:center;gap:5px;padding:5px 11px;border-radius:20px;
  background:rgba(0,200,232,0.06);border:1px solid rgba(0,200,232,0.2);
  font-size:11px;font-weight:600;color:rgba(255,255,255,0.78);
  opacity:${p=>p.show?1:0};transform:${p=>p.show?"scale(1)":"scale(0.93)"};
  transition:opacity 0.22s ease ${p=>p.t||0}s,transform 0.22s ease ${p=>p.t||0}s;
`;

/* Bottom tag row */
const TagRow = styled.div`
  position:absolute;bottom:14px;left:0;right:0;
  display:flex;justify-content:center;gap:10px;z-index:20;
  animation:${fadeIn} 0.5s ease 3s both;
`;
const Tag = styled.div`
  font-size:9.5px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;
  color:rgba(0,200,232,0.6);padding:4px 14px;border-radius:20px;
  border:1px solid rgba(0,200,232,0.18);background:rgba(0,200,232,0.04);
`;

export default function SlideSDLC1() {
  const [step, setStep] = useState(0);
  useEffect(()=>{
    const t=[0,500,950,1380,1750,2080,2360,2600];
    const ts=t.map((d,i)=>setTimeout(()=>setStep(i+1),d));
    return ()=>ts.forEach(clearTimeout);
  },[]);
  const s=step;
  const left=[
    {icon:"🔒",label:"Context Isolation"},
    {icon:"🔄",label:"Workflows"},
    {icon:"🎯",label:"Skills"},
    {icon:"🔌",label:"MCP"},
  ];
  const right=[
    {icon:"⏱️",label:"Temp State"},
    {icon:"📸",label:"Context Snapshot"},
    {icon:"✅",label:"Approval Gates"},
    {icon:"👤",label:"Human-in-the-Loop"},
  ];
  const agents=[
    {e:"🔍",l:"Analyst"},{e:"🔭",l:"Scout"},
    {e:"📋",l:"Planner"},{e:"🏗️",l:"Architect"},
    {e:"💻",l:"Coder"},{e:"🧪",l:"Tester"},
    {e:"👁️",l:"Reviewer"},{e:"🛡️",l:"Guardian"},
    {e:"⚙️",l:"Pipeline Ops"},
  ];
  return (
    <Shell>
      <Grid/>
      <LogoWrap><Logo alt="EPAM" width={220}/></LogoWrap>
      <Header><H1>AI-Driven SDLC Orchestration</H1><HSub>Simulating the Complete Software Development Lifecycle</HSub></Header>
      <Layout>
        {/* Left */}
        <SidePanel>
          {left.map(x=>(
            <Chip key={x.label} lit={s>=5?1:0}>
              <span style={{fontSize:16}}>{x.icon}</span>{x.label}
            </Chip>
          ))}
        </SidePanel>
        <ConnBar>{[0,1,2,3,4].map(i=><HLine key={i} on={s>=5}/>)}</ConnBar>

        {/* Pipeline */}
        <Pipeline>
          <Block show={s>=1} active>
            <BIcon>👤</BIcon><BTitle>User Request</BTitle><BSub>Feature · Fix · Command</BSub>
          </Block>
          <Arr show={s>=2}><VLine/><Tip/></Arr>
          <Block show={s>=2} active v="blue">
            <BIcon>🎯</BIcon><BTitle>Orchestrator</BTitle><BSub>Route · Plan · Coordinate</BSub>
          </Block>
          <Arr show={s>=3}><VLine/><Tip/></Arr>
          <Block show={s>=3} active>
            <BIcon>⚙️</BIcon><BTitle>Workflow Engine</BTitle><BSub>DAG · Parallel Execution · State</BSub>
          </Block>
          <Arr show={s>=4}><VLine/><Tip/></Arr>
          <Block show={s>=4} wide tall>
            <BTitle>Specialized Subagents</BTitle>
            <AgentsGrid>
              {agents.map((a,i)=>(
                <APill key={a.l} show={s>=4} t={i*0.05}>
                  <span style={{fontSize:10}}>{a.e}</span>{a.l}
                </APill>
              ))}
            </AgentsGrid>
          </Block>
          <Arr show={s>=6}><VLine/><Tip/></Arr>
          <Block show={s>=6} wide v="orange">
            <BIcon>🔐</BIcon><BTitle>Validation + Human Approval</BTitle><BSub>QA · Review · Gate</BSub>
          </Block>
          <Arr show={s>=7}><VLine/><Tip/></Arr>
          <Block show={s>=7} v="green">
            <BIcon>🚀</BIcon><BTitle>CI/CD Delivery</BTitle><BSub>Build · Test · Deploy</BSub>
          </Block>
        </Pipeline>

        {/* Right connector + panel */}
        <ConnBar>{[0,1,2,3].map(i=><HLine key={i} on={s>=6}/>)}</ConnBar>
        <SidePanel right delay={1.2}>
          {right.map(x=>(
            <Chip key={x.label} lit={s>=6?1:0}>
              <span style={{fontSize:16}}>{x.icon}</span>{x.label}
            </Chip>
          ))}
        </SidePanel>
      </Layout>
    
    </Shell>
  );
}