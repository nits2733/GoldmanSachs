import React, { useEffect, useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { SlideWrapper } from '../../components/SlideLayout';

/* ─── Keyframes ─── */
const fadeUp = keyframes`from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}`;
const fadeIn = keyframes`from{opacity:0}to{opacity:1}`;
const glow = keyframes`
  0%,100%{box-shadow:0 0 8px 2px rgba(0,200,232,0.3),0 0 20px 4px rgba(0,200,232,0.1);}
  50%{box-shadow:0 0 20px 6px rgba(0,200,232,0.7),0 0 42px 12px rgba(0,200,232,0.25);}
`;
const redGlow = keyframes`
  0%,100%{box-shadow:0 0 8px 2px rgba(255,80,80,0.3),0 0 20px 4px rgba(255,80,80,0.1);}
  50%{box-shadow:0 0 20px 6px rgba(255,80,80,0.65),0 0 40px 12px rgba(255,80,80,0.2);}
`;
const transformArrow = keyframes`
  0%,100%{transform:scaleX(1);opacity:0.7}
  50%{transform:scaleX(1.08);opacity:1}
`;
const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}`;
const neonText = keyframes`
  0%,100%{text-shadow:0 0 8px rgba(0,200,232,0.7),0 0 18px rgba(0,200,232,0.3);}
  50%{text-shadow:0 0 18px rgba(0,200,232,1),0 0 36px rgba(0,200,232,0.55);}
`;
const scanLine = keyframes`0%{top:0;opacity:.4}100%{top:100%;opacity:0}`;
const pulse = keyframes`0%,100%{opacity:0.7;transform:scale(1)}50%{opacity:1;transform:scale(1.05)}`;
const slideLeft = keyframes`from{opacity:0;transform:translateX(-24px)}to{opacity:1;transform:translateX(0)}`;
const slideRight = keyframes`from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:translateX(0)}`;
const metricCount = keyframes`from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}`;

/* ─── Layout ─── */
const Shell = styled(SlideWrapper)`
  background:
    radial-gradient(ellipse 55% 50% at 12% 18%,rgba(255,60,60,0.04) 0%,transparent 55%),
    radial-gradient(ellipse 55% 50% at 88% 20%,rgba(0,200,232,0.05) 0%,transparent 55%),
    radial-gradient(ellipse 50% 40% at 50% 80%,rgba(0,60,180,0.07) 0%,transparent 60%),
    linear-gradient(180deg,#040d1f 0%,#020a16 100%);
  overflow:hidden;
`;
const Grid = styled.div`
  position:absolute;inset:0;z-index:0;pointer-events:none;
  background-image:
    linear-gradient(rgba(0,200,232,0.032) 1px,transparent 1px),
    linear-gradient(90deg,rgba(0,200,232,0.032) 1px,transparent 1px);
  background-size:46px 46px;
`;
const Scan = styled.div`
  position:absolute;left:0;width:100%;height:2px;z-index:1;pointer-events:none;
  background:linear-gradient(90deg,transparent,rgba(0,200,232,0.2),transparent);
  animation:${scanLine} 8s linear infinite;
`;

/* Header */
const Header = styled.div`
  position:absolute;top:24px;left:0;right:0;z-index:10;
  display:flex;align-items:flex-start;justify-content:space-between;padding:0 48px;
  animation:${fadeIn} 0.7s ease both;
`;
const Title = styled.h1`
  font-family:'Inter','Segoe UI',sans-serif;
  font-size:clamp(17px,1.55vw,24px);font-weight:700;letter-spacing:0.04em;margin:0;
  background:linear-gradient(135deg,#fff 40%,#00c8e8 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  animation:${neonText} 3s ease-in-out infinite;
`;
const Sub = styled.p`
  font-family:'Inter',sans-serif;font-size:10px;color:rgba(0,200,232,0.65);
  letter-spacing:0.1em;text-transform:uppercase;margin:3px 0 0;
`;
const TopBadge = styled.div`
  font-family:'Inter',sans-serif;font-size:9.5px;font-weight:700;
  letter-spacing:0.1em;text-transform:uppercase;
  color:#00c8e8;border:1px solid rgba(0,200,232,0.4);
  padding:4px 14px;border-radius:20px;background:rgba(0,200,232,0.06);
`;

/* ─── Comparison layout ─── */
const CompareLayout = styled.div`
  position:absolute;
  top:50%;left:50%;transform:translate(-50%,-44%);
  display:flex;align-items:flex-start;gap:0;
  z-index:5;width:90%;max-width:1100px;
`;

/* Single agent column */
const AgentColumn = styled.div`
  flex:1;display:flex;flex-direction:column;align-items:center;gap:14px;
  animation:${slideLeft} 0.7s ease ${p=>p.delay||0}s both;
`;
const MultiColumn = styled.div`
  flex:1;display:flex;flex-direction:column;align-items:center;gap:14px;
  animation:${slideRight} 0.7s ease ${p=>p.delay||0}s both;
`;

/* Column header */
const ColHeader = styled.div`
  font-family:'Inter',sans-serif;font-size:11px;font-weight:700;
  letter-spacing:0.1em;text-transform:uppercase;
  color:${p=>p.c||'rgba(255,80,80,0.85)'};
  border:1px solid ${p=>p.bc||'rgba(255,80,80,0.3)'};
  padding:6px 22px;border-radius:20px;
  background:${p=>p.bg||'rgba(255,60,60,0.06)'};
`;

/* Single AI blob */
const BigBlob = styled.div`
  position:relative;
  width:120px;height:120px;border-radius:50%;
  background:radial-gradient(circle,rgba(255,80,80,0.2),rgba(180,30,30,0.1));
  border:2px solid rgba(255,80,80,0.6);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  animation:${redGlow} 2s ease-in-out infinite;
  font-family:'Inter',sans-serif;
`;
const BlobEmoji = styled.div`font-size:32px;`;
const BlobLabel = styled.div`font-size:10px;font-weight:700;color:rgba(255,100,100,0.9);letter-spacing:0.06em;`;

/* Problem chips around blob */
const ProblemChip = styled.div`
  display:flex;align-items:center;gap:6px;
  font-family:'Inter',sans-serif;font-size:9.5px;font-weight:600;
  color:rgba(255,100,100,0.85);letter-spacing:0.05em;
  background:rgba(255,50,50,0.07);border:1px solid rgba(255,80,80,0.3);
  padding:5px 12px;border-radius:8px;width:fit-content;
  animation:${p=>css`${fadeUp} 0.4s ease ${p.delay||0}s both`};
  transition:all 0.2s;
  &:hover{background:rgba(255,50,50,0.12);border-color:rgba(255,80,80,0.55);transform:scale(1.03);}
`;

/* Multi-agent cluster */
const AgentCluster = styled.div`
  position:relative;
  width:160px;height:120px;
  display:flex;align-items:center;justify-content:center;
`;
const ClusterCenter = styled.div`
  position:absolute;
  width:44px;height:44px;border-radius:50%;
  background:linear-gradient(135deg,rgba(0,200,232,0.25),rgba(0,80,180,0.15));
  border:2px solid rgba(0,200,232,0.7);
  display:flex;align-items:center;justify-content:center;
  font-size:18px;
  animation:${glow} 2s ease-in-out infinite;
  z-index:2;
`;
const MiniAgent = styled.div`
  position:absolute;
  width:32px;height:32px;border-radius:50%;
  background:rgba(0,200,232,0.1);border:1px solid rgba(0,200,232,0.4);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  font-size:12px;
  animation:${p=>css`${fadeIn} 0.4s ease ${p.delay||0}s both, ${pulse} 3s ease-in-out ${p.delay||0}s infinite`};
  ${p=>p.pos}
`;

/* Benefit chips */
const BenefitChip = styled.div`
  display:flex;align-items:center;gap:6px;
  font-family:'Inter',sans-serif;font-size:9.5px;font-weight:600;
  color:rgba(0,220,150,0.9);letter-spacing:0.05em;
  background:rgba(0,200,100,0.07);border:1px solid rgba(0,200,130,0.3);
  padding:5px 12px;border-radius:8px;width:fit-content;
  animation:${p=>css`${fadeUp} 0.4s ease ${p.delay||0}s both`};
  transition:all 0.2s;
  &:hover{background:rgba(0,200,100,0.12);border-color:rgba(0,220,130,0.55);transform:scale(1.03);}
`;

/* CENTER transform arrow */
const TransformZone = styled.div`
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  width:160px;flex-shrink:0;gap:8px;padding-top:60px;
  animation:${fadeIn} 0.8s ease 0.9s both;
`;
const ArrowLabel = styled.div`
  font-family:'Inter',sans-serif;font-size:9px;font-weight:700;
  letter-spacing:0.1em;text-transform:uppercase;
  color:rgba(255,255,255,0.7);text-align:center;
`;
const BigArrow = styled.div`
  font-size:36px;
  animation:${transformArrow} 2s ease-in-out infinite;
  filter:drop-shadow(0 0 10px rgba(0,200,232,0.6));
`;
const TransformText = styled.div`
  font-family:'Inter',sans-serif;font-size:8.5px;font-weight:700;
  letter-spacing:0.06em;color:rgba(0,200,232,0.8);text-align:center;
  padding:5px 12px;border-radius:8px;border:1px solid rgba(0,200,232,0.3);
  background:rgba(0,200,232,0.05);
`;

/* ─── Bottom metrics bar ─── */
const MetricsBar = styled.div`
  position:absolute;bottom:22px;left:50%;transform:translateX(-50%);
  display:flex;gap:16px;z-index:10;
  animation:${metricCount} 0.7s ease 2.2s both;
`;
const MetricCard = styled.div`
  display:flex;flex-direction:column;align-items:center;gap:3px;
  padding:10px 20px;border-radius:10px;
  background:rgba(255,255,255,0.03);
  border:1px solid ${p=>p.bc||'rgba(0,200,232,0.25)'};
  min-width:110px;
  animation:${p=>css`${fadeUp} 0.5s ease ${p.delay||0}s both`};
  transition:all 0.2s;
  &:hover{transform:translateY(-2px);background:rgba(0,200,232,0.05);}
`;
const MetricValue = styled.div`
  font-family:'Inter',sans-serif;font-size:20px;font-weight:800;
  color:${p=>p.c||'#00c8e8'};
  text-shadow:0 0 10px ${p=>p.c||'#00c8e8'};
`;
const MetricLabel = styled.div`
  font-family:'Inter',sans-serif;font-size:8px;font-weight:600;
  color:rgba(255,255,255,0.5);letter-spacing:0.08em;text-transform:uppercase;text-align:center;
`;

const Divider = styled.div`
  width:1px;height:60px;align-self:center;
  background:linear-gradient(180deg,transparent,rgba(0,200,232,0.3),transparent);
`;

export default function SlideSDLC3() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      const id = setInterval(() => setStep(s => s < 10 ? s + 1 : s), 500);
      return () => clearInterval(id);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  const a = (n) => step >= n;

  const problems = [
    { icon: '⚠️', label: 'Context Overload', delay: 0.4 },
    { icon: '🐢', label: 'Slow Validation', delay: 0.55 },
    { icon: '📉', label: 'Poor Scaling', delay: 0.7 },
    { icon: '💸', label: 'Large Token Usage', delay: 0.85 },
  ];

  const benefits = [
    { icon: '🎯', label: 'Specialized Roles', delay: 0.9 },
    { icon: '⚡', label: 'Parallel Execution', delay: 1.0 },
    { icon: '🚀', label: 'Faster Delivery', delay: 1.1 },
    { icon: '✅', label: 'Human Validation', delay: 1.2 },
    { icon: '🔒', label: 'Context Isolation', delay: 1.3 },
    { icon: '🔄', label: 'Reusable Skills', delay: 1.4 },
    { icon: '📋', label: 'Workflow Automation', delay: 1.5 },
    { icon: '🔌', label: 'CI/CD Awareness', delay: 1.6 },
  ];

  return (
    <Shell>
      <Grid />
      <Scan />

      <Header>
        <div>
          <Title>Why Multi-Agent SDLC?</Title>
          <Sub>Enterprise AI Software Delivery</Sub>
        </div>
        <TopBadge>ARCHITECTURE BENEFITS</TopBadge>
      </Header>

      <CompareLayout>
        {/* LEFT — Single Agent */}
        <AgentColumn delay={0.2}>
          <ColHeader>Single Large AI Agent</ColHeader>

          <BigBlob style={{ opacity: a(0) ? 1 : 0.1, transition: 'opacity 0.5s' }}>
            <BlobEmoji>🤖</BlobEmoji>
            <BlobLabel>Monolithic AI</BlobLabel>
          </BigBlob>

          {/* Problem chips */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
            {problems.map((p, i) => (
              <ProblemChip key={p.label} delay={p.delay} style={{ opacity: a(i + 1) ? 1 : 0, transition: 'opacity 0.3s' }}>
                <span>{p.icon}</span>{p.label}
              </ProblemChip>
            ))}
          </div>
        </AgentColumn>

        {/* CENTER transform arrow */}
        <TransformZone>
          <ArrowLabel>Monolithic AI</ArrowLabel>
          <BigArrow style={{ opacity: a(5) ? 1 : 0, transition: 'opacity 0.5s' }}>→</BigArrow>
          <ArrowLabel>Orchestrated SDLC</ArrowLabel>
          <TransformText style={{ opacity: a(5) ? 1 : 0, marginTop: 8, transition: 'opacity 0.5s' }}>
            Re-Architecture
          </TransformText>
        </TransformZone>

        {/* RIGHT — Multi-Agent */}
        <MultiColumn delay={0.4}>
          <ColHeader c="rgba(0,220,150,0.9)" bc="rgba(0,200,130,0.35)" bg="rgba(0,200,100,0.06)">
            Multi-Agent SDLC System
          </ColHeader>

          {/* Agent cluster visual */}
          <AgentCluster style={{ opacity: a(5) ? 1 : 0, transition: 'opacity 0.5s' }}>
            <ClusterCenter>🎯</ClusterCenter>
            <MiniAgent delay={1.0} style={{ position:'absolute', top:'8%', left:'50%', transform:'translateX(-50%)' }}>🔍</MiniAgent>
            <MiniAgent delay={1.1} style={{ position:'absolute', top:'20%', right:'6%' }}>💻</MiniAgent>
            <MiniAgent delay={1.2} style={{ position:'absolute', bottom:'20%', right:'6%' }}>🧪</MiniAgent>
            <MiniAgent delay={1.3} style={{ position:'absolute', bottom:'8%', left:'50%', transform:'translateX(-50%)' }}>🚀</MiniAgent>
            <MiniAgent delay={1.4} style={{ position:'absolute', bottom:'20%', left:'6%' }}>👁️</MiniAgent>
            <MiniAgent delay={1.5} style={{ position:'absolute', top:'20%', left:'6%' }}>🏗️</MiniAgent>
          </AgentCluster>

          {/* Benefit chips — 2 col grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', justifyItems: 'start' }}>
            {benefits.map((b, i) => (
              <BenefitChip key={b.label} delay={b.delay} style={{ opacity: a(i + 5) ? 1 : 0, transition: 'opacity 0.3s' }}>
                <span>{b.icon}</span>{b.label}
              </BenefitChip>
            ))}
          </div>
        </MultiColumn>
      </CompareLayout>

      {/* Bottom metrics */}
      <MetricsBar>
        <MetricCard bc="rgba(0,200,232,0.3)" delay={2.3} style={{ opacity: a(8) ? 1 : 0, transition: 'opacity 0.4s' }}>
          <MetricValue c="#00c8e8">↓60%</MetricValue>
          <MetricLabel>Context Usage</MetricLabel>
        </MetricCard>
        <Divider />
        <MetricCard bc="rgba(0,255,130,0.3)" delay={2.4} style={{ opacity: a(8) ? 1 : 0, transition: 'opacity 0.4s' }}>
          <MetricValue c="#00ff82">3×</MetricValue>
          <MetricLabel>Faster Delivery</MetricLabel>
        </MetricCard>
        <Divider />
        <MetricCard bc="rgba(255,200,0,0.3)" delay={2.5} style={{ opacity: a(9) ? 1 : 0, transition: 'opacity 0.4s' }}>
          <MetricValue c="#ffc800">99%</MetricValue>
          <MetricLabel>Validation Coverage</MetricLabel>
        </MetricCard>
        <Divider />
        <MetricCard bc="rgba(180,100,255,0.3)" delay={2.6} style={{ opacity: a(9) ? 1 : 0, transition: 'opacity 0.4s' }}>
          <MetricValue c="#c864ff">∞</MetricValue>
          <MetricLabel>Enterprise Scalability</MetricLabel>
        </MetricCard>
      </MetricsBar>
    </Shell>
  );
}
