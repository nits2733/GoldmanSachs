import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from 'styled-components';
import { ScrollableSlideWrapper } from '../../components/SlideLayout';
import colors from '../../assets/styles/variables/colors';
import typography from '../../assets/styles/variables/typography';
import Logo from '../../components/Logo';
import Particles from '../../components/Particles';

const fade = (delay) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.4 },
});

/* ═══ Colors ═══ */
const HTTP_COLOR = "hsl(210 70% 60%)";
const MQTT_COLOR = "hsl(140 60% 50%)";
const UDP_COLOR = "hsl(35 80% 60%)";
const GREEN = "hsl(140 60% 50%)";
const RED = "hsl(0 60% 55%)";
const BLUE = "hsl(210 70% 60%)";
const YELLOW = "hsl(45 80% 55%)";

/* ═══ Styled Components ═══ */
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
`;

const Content = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px 32px 80px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(motion.h2)`
  font-family: ${typography.fontDisplay};
  font-weight: ${typography.weightBlack};
  font-size: clamp(2.2rem, 4.5vw, 3.8rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: ${colors.cyan};
  text-align: center;
  margin-bottom: 8px;
`;

const Subtitle = styled(motion.p)`
  font-family: ${typography.fontBody};
  font-size: clamp(0.85rem, 1.2vw, 1.0rem);
  color: ${colors.textSubtitle};
  text-align: center;
  margin-bottom: 12px;
`;

const Controls = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
  flex-wrap: wrap;
  justify-content: center;
`;

const TabButton = styled.button`
  font-family: ${typography.fontBody};
  font-size: ${typography.size.xs};
  font-weight: ${typography.weightSemibold};
  padding: 6px 14px;
  border-radius: 6px;
  background: ${({ $active, $color }) =>
    $active ? ($color === 'green' ? 'rgba(72, 187, 120, 0.15)' : 'rgba(239, 68, 68, 0.15)') : 'transparent'};
  color: ${({ $active, $color }) =>
    $active ? ($color === 'green' ? GREEN : RED) : 'rgba(255,255,255,0.45)'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ $color }) => ($color === 'green' ? GREEN : RED)};
    opacity: 0.9;
  }

  &::before {
    content: '●';
    margin-right: 6px;
  }
`;

const ControlButton = styled.button`
  font-family: ${typography.fontBody};
  font-size: ${typography.size.xs};
  padding: 6px 14px;
  border-radius: 6px;
  background: rgba(255,255,255,0.08);
  color: ${colors.textPrimary};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255,255,255,0.12);
  }
`;

const DiagramBox = styled(motion.div)`
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(0, 200, 232, 0.12);
  border-radius: 12px;
  padding: 16px;
  width: 100%;
  max-width: 1300px;
`;

/* ═══ Animated Cluster Layout ═══ */
const R = 26; // node radius
const CLUSTER_CX = 520, CLUSTER_CY = 210, CLUSTER_R = 96;
const NODES = Array.from({ length: 5 }, (_, i) => {
  const angle = ((i * 360) / 5 - 90) * (Math.PI / 180);
  return {
    id: i + 1,
    cx: CLUSTER_CX + CLUSTER_R * Math.cos(angle),
    cy: CLUSTER_CY + CLUSTER_R * Math.sin(angle),
    port: 8081 + i,
  };
});

/* ═══ Right-side boxes ═══ */
const REG = { x: 720, y: 80, w: 140, h: 42 };
const MQTT_BOX = { x: 720, y: 260, w: 140, h: 42 };
const regCx = REG.x + REG.w / 2, regCy = REG.y + REG.h / 2;
const mqttCx = MQTT_BOX.x + MQTT_BOX.w / 2, mqttCy = MQTT_BOX.y + MQTT_BOX.h / 2;

/* ═══ LB vertical box - ENLARGED for readability ═══ */
const LB = { x: 185, y: 90, w: 150, h: 240 };
const lbCx = LB.x + LB.w / 2, lbCy = LB.y + LB.h / 2;

/* ═══ Helper Components ═══ */
function PolyArrow({ points, label, labelX, labelY, delay, color, dashed = false, labelAnchor = "middle" }) {
  const pts = points;
  const last = pts[pts.length - 1];
  const prev = pts[pts.length - 2];
  const angle = Math.atan2(last[1] - prev[1], last[0] - prev[0]);
  const h = 7;
  const d = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");
  return (
    <motion.g {...fade(delay)}>
      <path d={d} fill="none" stroke={color} strokeWidth="1.3" strokeDasharray={dashed ? "5 3" : "none"} />
      <polygon
        points={`${last[0]},${last[1]} ${last[0] - h * Math.cos(angle - 0.4)},${last[1] - h * Math.sin(angle - 0.4)} ${last[0] - h * Math.cos(angle + 0.4)},${last[1] - h * Math.sin(angle + 0.4)}`}
        fill={color}
      />
      {label && labelX != null && labelY != null && (
        <text x={labelX} y={labelY} textAnchor={labelAnchor} fill={color} fontSize="6.5" fontWeight="500">{label}</text>
      )}
    </motion.g>
  );
}

function StaticArrow({ x1, y1, x2, y2, label, delay, color, dashed = false, labelDx = 0, labelDy = -5, labelAnchor = "middle" }) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const h = 7;
  const mx = (x1 + x2) / 2 + labelDx, my = (y1 + y2) / 2 + labelDy;
  return (
    <motion.g {...fade(delay)}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1.3" strokeDasharray={dashed ? "5 3" : "none"} />
      <polygon
        points={`${x2},${y2} ${x2 - h * Math.cos(angle - 0.4)},${y2 - h * Math.sin(angle - 0.4)} ${x2 - h * Math.cos(angle + 0.4)},${y2 - h * Math.sin(angle + 0.4)}`}
        fill={color}
      />
      {label && <text x={mx} y={my} textAnchor={labelAnchor} fill={color} fontSize="6.5" fontWeight="500">{label}</text>}
    </motion.g>
  );
}

function CircleNode({ node, status }) {
  const fills = {
    normal: "hsl(220 25% 20%)",
    "glow-green": "hsl(140 45% 22%)",
    suspect: "hsl(45 70% 25%)",
    dead: "hsl(0 40% 18%)",
    grey: "hsl(220 10% 16%)",
  };
  const strokes = {
    normal: "hsl(215 20% 40%)",
    "glow-green": "hsl(140 60% 50%)",
    suspect: "hsl(45 80% 55%)",
    dead: "hsl(0 60% 45%)",
    grey: "hsl(220 10% 28%)",
  };
  return (
    <g>
      {status === "glow-green" && (
        <motion.circle cx={node.cx} cy={node.cy} r={R + 4}
          fill="none" stroke={GREEN} strokeWidth="1.5"
          animate={{ opacity: [0.2, 1, 0.2], r: [R + 3, R + 6, R + 3] }}
          transition={{ repeat: Infinity, duration: 1.2 }}
        />
      )}
      <circle cx={node.cx} cy={node.cy} r={R} fill={fills[status]} stroke={strokes[status]} strokeWidth="1.5" />
      <text x={node.cx} y={node.cy - 2} textAnchor="middle" fill="#F1F5F9" fontSize="8" fontWeight="600">
        Node {node.id}
      </text>
      <text x={node.cx} y={node.cy + 8} textAnchor="middle" fill="hsl(215 20% 60%)" fontSize="6">
        :{node.port}
      </text>
      {status === "suspect" && (
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <rect x={node.cx - 18} y={node.cy - R - 13} width={36} height={12} rx={3} fill={YELLOW} />
          <text x={node.cx} y={node.cy - R - 5} textAnchor="middle" fill="#000" fontSize="6" fontWeight="700">SUSPECT</text>
        </motion.g>
      )}
      {status === "dead" && (
        <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <rect x={node.cx - 14} y={node.cy - R - 13} width={28} height={12} rx={3} fill={RED} />
          <text x={node.cx} y={node.cy - R - 5} textAnchor="middle" fill="#fff" fontSize="6" fontWeight="700">DEAD</text>
          <text x={node.cx} y={node.cy + 3} textAnchor="middle" fill="hsl(0 60% 60%)" fontSize="14">✗</text>
        </motion.g>
      )}
    </g>
  );
}

function GossipPulse({ from, to, color, visible, delay = 0 }) {
  if (!visible) return null;
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay }}>
      <line x1={from.cx} y1={from.cy} x2={to.cx} y2={to.cy}
        stroke={color} strokeWidth="0.7" strokeDasharray="3 3" opacity={0.4}
      />
      <motion.circle r={2.5} fill={color}
        cx={from.cx} cy={from.cy}
        animate={{
          cx: [from.cx, to.cx, from.cx],
          cy: [from.cy, to.cy, from.cy],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay }}
      />
    </motion.g>
  );
}

function HashRing({ nodeCount }) {
  const ringR = 24; // increased from 22 for better visibility
  const colors_ring = ["hsl(210 70% 60%)", "hsl(140 60% 50%)", "hsl(280 60% 60%)", "hsl(35 70% 55%)", "hsl(0 60% 55%)"];
  return (
    <g>
      {/* Hash ring moved down: was lbCy - 50, now lbCy - 35 */}
      <circle cx={lbCx} cy={lbCy - 35} r={ringR} fill="none" stroke="hsl(187 60% 35%)" strokeWidth="1.3" strokeDasharray="3 3" />
      {Array.from({ length: nodeCount }).map((_, i) => {
        const a = (i * (360 / nodeCount) * Math.PI) / 180 - Math.PI / 2;
        return (
          <motion.circle key={i} cx={lbCx + ringR * Math.cos(a)} cy={lbCy - 35 + ringR * Math.sin(a)} r={4}
            fill={colors_ring[i]} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
          />
        );
      })}
      {/* Label moved down and text size increased */}
      <text x={lbCx} y={lbCy - 63} textAnchor="middle" fill="hsl(187 80% 55%)" fontSize="8" fontWeight="600">Hash Ring</text>
    </g>
  );
}

function AnimArrow({ path, label, labelX, labelY, color, visible, delay = 0 }) {
  if (!visible) return null;
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay }}>
      <motion.path
        d={path} fill="none" stroke={color} strokeWidth="1.3"
        markerEnd={`url(#arrow-${color.replace(/[^a-z0-9]/g, "")})`}
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, delay }}
      />
      {label && (
        <motion.text initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 0.3 }}
          x={labelX} y={labelY} textAnchor="middle" fill={color} fontSize="6" fontWeight="500">
          {label}
        </motion.text>
      )}
    </motion.g>
  );
}

function StraightAnimArrow({ x1, y1, x2, y2, label, color, dashed = false, visible, delay = 0, labelOffset = -7 }) {
  if (!visible) return null;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  const perpX = -Math.sin(angle) * labelOffset, perpY = Math.cos(angle) * labelOffset;
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay }}>
      <motion.line
        x1={x1} y1={y1} x2={x1} y2={y1}
        animate={{ x2, y2 }}
        transition={{ duration: 0.5, delay }}
        stroke={color} strokeWidth="1.3" strokeDasharray={dashed ? "5 3" : "none"}
        markerEnd={`url(#arrow-${color.replace(/[^a-z0-9]/g, "")})`}
      />
      {label && (
        <motion.text initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: delay + 0.3 }}
          x={mx + perpX} y={my + perpY} textAnchor="middle" fill={color} fontSize="6" fontWeight="500">
          {label}
        </motion.text>
      )}
    </motion.g>
  );
}

function StepBadge({ n, color, x, y, visible }) {
  if (!visible) return null;
  return (
    <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <circle cx={x} cy={y} r={8} fill={color} />
      <text x={x} y={y + 3} textAnchor="middle" fill="#fff" fontSize="7" fontWeight="700">{n}</text>
    </motion.g>
  );
}

function Label({ text, x, y, color, visible, delay = 0 }) {
  if (!visible) return null;
  return (
    <motion.text initial={{ opacity: 0, y: y + 4 }} animate={{ opacity: 1, y }} transition={{ duration: 0.3, delay }}
      x={x} textAnchor="middle" fill={color} fontSize="6" fontStyle="italic">
      {text}
    </motion.text>
  );
}

const REG_STEPS = 6;
const DEREG_STEPS = 8;
const REG_INTERVAL = 3000;
const DEREG_INTERVAL = 3500;
const PAUSE_TIME = 2500;

const Slide3 = () => {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState("idle");
  const [paused, setPaused] = useState(false);

  const regStep = phase === "reg" ? step : (phase === "pause" || phase === "dereg" || phase === "done") ? REG_STEPS : 0;
  const deregStep = phase === "dereg" ? step : phase === "done" ? DEREG_STEPS : 0;

  const reset = useCallback(() => { setStep(0); setPhase("idle"); setPaused(false); }, []);

  useEffect(() => {
    if (paused || phase === "idle") return;
    let t;
    if (phase === "reg" && step < REG_STEPS) t = setTimeout(() => setStep(s => s + 1), REG_INTERVAL);
    else if (phase === "reg") t = setTimeout(() => { setPhase("pause"); setStep(0); }, REG_INTERVAL);
    else if (phase === "pause") t = setTimeout(() => { setPhase("idle"); setStep(0); }, PAUSE_TIME);
    else if (phase === "dereg" && step < DEREG_STEPS) t = setTimeout(() => setStep(s => s + 1), DEREG_INTERVAL);
    else if (phase === "dereg") t = setTimeout(() => setPhase("done"), DEREG_INTERVAL);
    return () => clearTimeout(t);
  }, [phase, step, paused]);

  let n5Status = phase === "idle" ? "normal" : "grey";
  if (regStep >= 1) n5Status = "glow-green";
  if (regStep >= 3) n5Status = "normal";
  if (deregStep >= 1) n5Status = "grey";
  if (deregStep >= 4) n5Status = "suspect";
  if (deregStep >= 5) n5Status = "dead";

  const hashCount = phase === "idle" ? 5 : regStep >= 6 ? (deregStep >= 8 ? 4 : 5) : 4;

  const n1 = NODES[0], n2 = NODES[1], n3 = NODES[2], n4 = NODES[3], n5 = NODES[4];
  const showGossip = phase === "idle" || (regStep >= 3 && deregStep < 1) || (deregStep >= 1 && deregStep < 5);

  const edgePt = (from, to) => {
    const tx = 'cx' in to && to.cx != null ? to.cx : to.x + to.w / 2;
    const ty = 'cy' in to && to.cy != null ? to.cy : to.y + to.h / 2;
    const angle = Math.atan2(ty - from.cy, tx - from.cx);
    return { x: from.cx + R * Math.cos(angle), y: from.cy + R * Math.sin(angle) };
  };

  const n5ToReg = edgePt(n5, { cx: regCx, cy: regCy });
  const n4ToReg = edgePt(n4, { cx: regCx, cy: regCy });

  return (
    <Shell>
      <Grid />
      <Particles count={12} />

      <LogoWrap>
        <Logo alt="EPAM" width={220} />
      </LogoWrap>

      <Content>
        <Title {...fade(0)}>EdgeFabric Architecture</Title>
        <Subtitle {...fade(0.1)}>Live Node Lifecycle — Registration & Failure Detection</Subtitle>

        <Controls>
          <TabButton
            $active={phase === "reg" || phase === "pause"}
            $color="green"
            onClick={() => { setPhase("reg"); setStep(0); setPaused(false); }}
          >
            Registration
          </TabButton>
          <TabButton
            $active={phase === "dereg"}
            $color="red"
            onClick={() => { setPhase("dereg"); setStep(0); setPaused(false); }}
          >
            Deregistration
          </TabButton>
          {phase !== "idle" && (
            <ControlButton onClick={reset}>Initial State</ControlButton>
          )}
          {phase !== "done" && phase !== "idle" ? (
            <ControlButton onClick={() => setPaused(p => !p)}>
              {paused ? "Play" : "Pause"}
            </ControlButton>
          ) : phase === "done" ? (
            <ControlButton onClick={reset}>Replay</ControlButton>
          ) : null}
        </Controls>

        <DiagramBox {...fade(0.15)}>
          <svg viewBox="0 0 900 410" style={{ width: '100%', height: 'auto' }}>
            <defs>
              {[GREEN, RED, BLUE, MQTT_COLOR, UDP_COLOR, YELLOW].map((c, idx) => (
                <marker key={`arrow-${idx}`} id={`arrow-${c.replace(/[^a-z0-9]/g, "")}`} viewBox="0 0 10 10" refX="9" refY="5"
                  markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill={c} />
                </marker>
              ))}
            </defs>

            {/* User Applications */}
            <motion.g {...fade(0.2)}>
              <rect x={15} y={185} width={120} height={44} rx={6} fill="hsl(220 25% 22%)" stroke="hsl(215 20% 35%)" strokeWidth="1" />
              <text x={75} y={203} textAnchor="middle" fill="#F1F5F9" fontSize="9" fontWeight="600">User Applications</text>
              <text x={75} y={215} textAnchor="middle" fill="hsl(215 20% 72%)" fontSize="6.5">HTTP REST</text>
            </motion.g>

            <StaticArrow x1={135} y1={207} x2={LB.x} y2={207} label="PUT/GET" delay={0.3} color={HTTP_COLOR} labelDy={-7} />

            {/* Load Balancer - ENLARGED */}
            <motion.g {...fade(0.3)}>
              <rect x={LB.x} y={LB.y} width={LB.w} height={LB.h} rx={8} fill="hsl(217 60% 28%)" stroke="hsl(217 50% 45%)" strokeWidth="1.5" />
              <text x={lbCx} y={LB.y + 22} textAnchor="middle" fill="#F1F5F9" fontSize="12" fontWeight="700">Load Balancer(s)</text>
              <text x={lbCx} y={LB.y + 40} textAnchor="middle" fill="hsl(215 20% 70%)" fontSize="9">:8080</text>
            </motion.g>

            <HashRing nodeCount={hashCount} />

            <motion.g {...fade(0.4)}>
              <text x={lbCx} y={lbCy + 25} textAnchor="middle" fill="hsl(187 80% 55%)" fontSize="7.5">• Hash ring + quorum</text>
              <text x={lbCx} y={lbCy + 42} textAnchor="middle" fill="hsl(187 80% 55%)" fontSize="7.5">• RF=3, read repair</text>
            </motion.g>

            <StaticArrow x1={LB.x + LB.w} y1={LB.y + 40} x2={CLUSTER_CX - CLUSTER_R - R - 5} y2={CLUSTER_CY - 60} label="HTTP" delay={0.5} color={HTTP_COLOR} labelDy={-6} />
            <StaticArrow x1={LB.x + LB.w} y1={lbCy} x2={CLUSTER_CX - CLUSTER_R - R - 5} y2={CLUSTER_CY} label="HTTP" delay={0.5} color={HTTP_COLOR} labelDy={-7} />
            <StaticArrow x1={LB.x + LB.w} y1={LB.y + LB.h - 40} x2={CLUSTER_CX - CLUSTER_R - R - 5} y2={CLUSTER_CY + 60} label="HTTP" delay={0.5} color={HTTP_COLOR} labelDy={6} />

            {/* Cache Cluster */}
            <motion.circle cx={CLUSTER_CX} cy={CLUSTER_CY} r={CLUSTER_R + 35}
              fill="hsl(50 60% 50% / 0.04)" stroke="hsl(50 60% 50%)" strokeWidth="0.8" strokeDasharray="6 3" />
            <text x={CLUSTER_CX} y={CLUSTER_CY - CLUSTER_R - 40} textAnchor="middle"
              fill="hsl(50 60% 50%)" fontSize="7" fontWeight="600" letterSpacing="0.5">CACHE CLUSTER</text>

            {NODES.slice(0, 4).map(n => (
              <CircleNode key={n.id} node={n} status="normal" />
            ))}
            <CircleNode node={n5} status={n5Status} />

            <GossipPulse from={n1} to={n2} color={UDP_COLOR} visible={showGossip} delay={0} />
            <GossipPulse from={n2} to={n3} color={UDP_COLOR} visible={showGossip} delay={0.5} />
            <GossipPulse from={n3} to={n4} color={UDP_COLOR} visible={showGossip} delay={1.0} />
            <GossipPulse from={n1} to={n3} color={UDP_COLOR} visible={showGossip} delay={1.5} />
            <GossipPulse from={n2} to={n4} color={UDP_COLOR} visible={showGossip} delay={0.7} />
            <GossipPulse from={n4} to={n5} color={UDP_COLOR} visible={showGossip && n5Status === "normal"} delay={0.3} />
            <GossipPulse from={n5} to={n1} color={UDP_COLOR} visible={showGossip && n5Status === "normal"} delay={1.2} />

            {/* Service Registry + Mosquitto */}
            <motion.g {...fade(0.6)}>
              <rect x={REG.x} y={REG.y} width={REG.w} height={REG.h} rx={7} fill="hsl(160 40% 22%)" stroke="hsl(160 40% 40%)" strokeWidth="1" />
              <text x={regCx} y={REG.y + 16} textAnchor="middle" fill="#F1F5F9" fontSize="8" fontWeight="600">Service Registry</text>
              <text x={regCx} y={REG.y + 28} textAnchor="middle" fill="hsl(215 20% 60%)" fontSize="6">:8090</text>
            </motion.g>

            <motion.g {...fade(0.6)}>
              <rect x={MQTT_BOX.x} y={MQTT_BOX.y} width={MQTT_BOX.w} height={MQTT_BOX.h} rx={7} fill="hsl(140 35% 22%)" stroke="hsl(140 40% 40%)" strokeWidth="1" />
              <text x={mqttCx} y={MQTT_BOX.y + 16} textAnchor="middle" fill="#F1F5F9" fontSize="8" fontWeight="600">Mosquitto MQTT</text>
              <text x={mqttCx} y={MQTT_BOX.y + 28} textAnchor="middle" fill="hsl(215 20% 60%)" fontSize="6">:1883</text>
            </motion.g>

            <StaticArrow x1={regCx} y1={REG.y + REG.h} x2={mqttCx} y2={MQTT_BOX.y} label="" delay={0.7} color={MQTT_COLOR} />
            {regStep < 5 && deregStep < 7 && (
              <motion.text {...fade(0.7)} x={regCx + 20} y={(regCy + mqttCy) / 2} textAnchor="start" fill={MQTT_COLOR} fontSize="5.5" fontWeight="500">
                MQTT publish
              </motion.text>
            )}

            {regStep < 6 && deregStep < 8 && (
              <PolyArrow
                points={[[mqttCx, MQTT_BOX.y + MQTT_BOX.h], [mqttCx, 355], [lbCx, 355], [lbCx, LB.y + LB.h]]}
                label="MQTT node-events" labelX={450} labelY={350} delay={0.75} color={MQTT_COLOR}
              />
            )}

            <PolyArrow
              points={[[lbCx, LB.y], [lbCx, 40], [regCx, 40], [regCx, REG.y]]}
              label="" delay={0.8} color={HTTP_COLOR} dashed
            />
            <motion.text {...fade(0.8)} x={(lbCx + regCx) / 2} y={35} textAnchor="middle" fill={HTTP_COLOR} fontSize="5.5" fontStyle="italic">
              periodic sync / poll (safety net)
            </motion.text>

            {/* REGISTRATION */}
            <AnimatePresence>
              <StepBadge n={1} color={GREEN} x={n5.cx - R - 10} y={n5.cy - R} visible={regStep >= 1 && deregStep < 1} />
              <Label text="Node 5 starts" x={n5.cx} y={n5.cy + R + 14} color={GREEN} visible={regStep >= 1 && regStep < 2} />

              <AnimArrow
                path={`M${edgePt(n5, n1).x},${edgePt(n5, n1).y} L${edgePt(n1, n5).x},${edgePt(n1, n5).y}`}
                label="SWIM join" labelX={(n5.cx + n1.cx) / 2 - 20} labelY={(n5.cy + n1.cy) / 2 - 8}
                color={BLUE} visible={regStep >= 2 && deregStep < 1} />
              <StepBadge n={2} color={GREEN} x={(n5.cx + n1.cx) / 2 - 15} y={(n5.cy + n1.cy) / 2 + 5} visible={regStep >= 2 && regStep < 3} />

              <StepBadge n={3} color={GREEN} x={CLUSTER_CX} y={CLUSTER_CY - 8} visible={regStep >= 3 && regStep < 4} />
              <Label text="Gossip spreads membership" x={CLUSTER_CX} y={CLUSTER_CY + 5} color={GREEN} visible={regStep >= 3 && regStep < 4} />

              <StraightAnimArrow x1={n5ToReg.x} y1={n5ToReg.y} x2={REG.x + 5} y2={REG.y + REG.h}
                label="HTTP register" color={BLUE} visible={regStep >= 4 && deregStep < 1} />
              <StepBadge n={4} color={GREEN} x={REG.x - 8} y={regCy + 20} visible={regStep >= 4 && regStep < 5} />

              <StraightAnimArrow x1={regCx} y1={REG.y + REG.h} x2={mqttCx} y2={MQTT_BOX.y}
                label="NODE_ADDED" color={MQTT_COLOR} visible={regStep >= 5 && deregStep < 1} labelOffset={-20} />
              <StepBadge n={5} color={GREEN} x={regCx + 25} y={(regCy + mqttCy) / 2} visible={regStep >= 5 && regStep < 6} />

              <AnimArrow
                path={`M${mqttCx},${MQTT_BOX.y + MQTT_BOX.h} L${mqttCx},355 L${lbCx},355 L${lbCx},${LB.y + LB.h}`}
                label="MQTT event → LB" labelX={450} labelY={345}
                color={MQTT_COLOR} visible={regStep >= 6 && deregStep < 1} />
              <StepBadge n={6} color={GREEN} x={lbCx} y={LB.y - 10} visible={regStep >= 6 && deregStep < 1} />
              <Label text="LB adds Node 5 to hash ring ✓" x={lbCx} y={LB.y + LB.h + 14} color={GREEN} visible={regStep >= 6 && deregStep < 1} />
            </AnimatePresence>

            {/* DEREGISTRATION */}
            <AnimatePresence>
              <StepBadge n={1} color={RED} x={n5.cx - R - 10} y={n5.cy - R} visible={deregStep >= 1} />
              <Label text="Node 5 crashes" x={n5.cx} y={n5.cy + R + 14} color={RED} visible={deregStep >= 1 && deregStep < 2} />

              <StraightAnimArrow x1={edgePt(n4, n5).x} y1={edgePt(n4, n5).y} x2={edgePt(n5, n4).x} y2={edgePt(n5, n4).y}
                label="PING ✗" color={RED} visible={deregStep >= 2} />
              <StepBadge n={2} color={RED} x={(n4.cx + n5.cx) / 2 - 15} y={(n4.cy + n5.cy) / 2 - 12} visible={deregStep >= 2 && deregStep < 3} />

              <AnimArrow
                path={`M${edgePt(n4, n2).x},${edgePt(n4, n2).y} L${edgePt(n2, n4).x},${edgePt(n2, n4).y}`}
                label="PING_REQ" labelX={(n4.cx + n2.cx) / 2 + 10} labelY={(n4.cy + n2.cy) / 2 + 10}
                color={UDP_COLOR} visible={deregStep >= 3} />
              <StraightAnimArrow x1={edgePt(n2, n5).x} y1={edgePt(n2, n5).y} x2={edgePt(n5, n2).x} y2={edgePt(n5, n2).y}
                label="PING ✗" color={RED} visible={deregStep >= 3} delay={0.3} labelOffset={-8} />
              <StepBadge n={3} color={RED} x={n2.cx + R + 10} y={n2.cy} visible={deregStep >= 3 && deregStep < 4} />

              <StepBadge n={4} color={YELLOW} x={n5.cx - R - 10} y={n5.cy} visible={deregStep >= 4 && deregStep < 5} />
              <StraightAnimArrow x1={edgePt(n4, n3).x} y1={edgePt(n4, n3).y} x2={edgePt(n3, n4).x} y2={edgePt(n3, n4).y}
                label="SUSPECT" color={YELLOW} dashed visible={deregStep >= 4} />
              <StraightAnimArrow x1={edgePt(n4, n1).x} y1={edgePt(n4, n1).y} x2={edgePt(n1, n4).x} y2={edgePt(n1, n4).y}
                label="SUSPECT" color={YELLOW} dashed visible={deregStep >= 4} delay={0.2} />

              <StepBadge n={5} color={RED} x={n5.cx - R - 10} y={n5.cy} visible={deregStep >= 5} />
              <StraightAnimArrow x1={edgePt(n1, n2).x} y1={edgePt(n1, n2).y} x2={edgePt(n2, n1).x} y2={edgePt(n2, n1).y}
                label="DEAD" color={RED} dashed visible={deregStep >= 5} />

              <AnimArrow
                path={`M${n4ToReg.x},${n4ToReg.y} L${REG.x + 10},${REG.y + REG.h}`}
                label="HTTP DELETE" labelX={(n4.cx + regCx) / 2 + 30} labelY={(n4.cy + regCy) / 2 + 15}
                color={BLUE} visible={deregStep >= 6} />
              <StepBadge n={6} color={RED} x={REG.x - 10} y={regCy} visible={deregStep >= 6 && deregStep < 7} />

              <StraightAnimArrow x1={regCx} y1={REG.y + REG.h} x2={mqttCx} y2={MQTT_BOX.y}
                label="NODE_REMOVED" color={RED} visible={deregStep >= 7} labelOffset={-20} />
              <StepBadge n={7} color={RED} x={regCx + 25} y={(regCy + mqttCy) / 2} visible={deregStep >= 7 && deregStep < 8} />

              <AnimArrow
                path={`M${mqttCx},${MQTT_BOX.y + MQTT_BOX.h} L${mqttCx},355 L${lbCx},355 L${lbCx},${LB.y + LB.h}`}
                label="MQTT event → LB" labelX={450} labelY={345}
                color={RED} visible={deregStep >= 8} />
              <StepBadge n={8} color={RED} x={lbCx} y={LB.y - 10} visible={deregStep >= 8} />
              <Label text="LB removes Node 5. Traffic rerouted ✓" x={lbCx} y={LB.y + LB.h + 14} color={RED} visible={deregStep >= 8} />
            </AnimatePresence>

            {/* Legend */}
            <motion.g {...fade(0.9)}>
              <rect x={15} y={385} width={420} height={22} rx={4} fill="hsl(220 20% 14%)" stroke="hsl(215 20% 28%)" strokeWidth="0.7" />
              <circle cx={28} cy={396} r={3.5} fill={GREEN} />
              <text x={35} y={399} fill={GREEN} fontSize="6.5">Registration</text>
              <circle cx={105} cy={396} r={3.5} fill={RED} />
              <text x={112} y={399} fill={RED} fontSize="6.5">Deregistration</text>
              <line x1={190} y1={396} x2={205} y2={396} stroke={HTTP_COLOR} strokeWidth="1.5" />
              <text x={210} y={399} fill={HTTP_COLOR} fontSize="6.5">HTTP</text>
              <line x1={240} y1={396} x2={255} y2={396} stroke={MQTT_COLOR} strokeWidth="1.5" />
              <text x={260} y={399} fill={MQTT_COLOR} fontSize="6.5">MQTT</text>
              <line x1={295} y1={396} x2={310} y2={396} stroke={UDP_COLOR} strokeWidth="1.5" strokeDasharray="3 2" />
              <text x={315} y={399} fill={UDP_COLOR} fontSize="6.5">UDP (SWIM)</text>
              <motion.circle cx={380} cy={396} r={2.5} fill={UDP_COLOR}
                animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1 }} />
              <text x={387} y={399} fill={UDP_COLOR} fontSize="6.5">Gossip</text>
            </motion.g>

          </svg>
        </DiagramBox>
      </Content>
    </Shell>
  );
};

export default Slide3;
