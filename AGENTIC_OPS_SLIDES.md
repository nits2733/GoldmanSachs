# Agentic Ops — Presentation Slides
> EdgeFabric Atlas | MCP Observe · MCP Act · Ops Agent
> Generated: May 8, 2026

---

## SLIDE 1 — The Problem

**Title: Operating a Distributed Cache at Scale is a Manual, Reactive Battle**

---

### Context

EdgeFabric is a distributed in-memory cache cluster — 3 cache nodes, a load balancer, and a service
registry — running with quorum-based replication (2 of 3 nodes). At peak load it handles hundreds of
concurrent requests with SLO targets of:

| SLO | Target |
|---|---|
| P99 read latency | < 100 ms |
| P99 write latency | < 150 ms |
| Error rate | < 1% |
| Quorum success rate | ≥ 99% |
| Cache hit rate | ≥ 70% |

---

### The 4 Core Pain Points

| # | Problem | Real-World Consequence |
|---|---|---|
| 1 | **Reactive-only ops** | Engineers are alerted AFTER an SLO is breached — not when the system is trending toward failure. A node goes SUSPECT in SWIM long before it goes DEAD, but nobody acts on it. |
| 2 | **Manual diagnosis is slow and expensive** | When an alert fires at 3AM, an engineer must SSH into multiple VMs, grep Prometheus, check SWIM state, inspect Loki logs — all manually, across 7 services. Mean time to diagnosis is 20–40 minutes. |
| 3 | **No guard-rails on remediation** | There is no standard playbook. One engineer restarts a node — drops quorum to 1 active. Another disables a node without checking if SWIM has already marked it DEAD. Mistakes cascade. |
| 4 | **No learning loop** | After an incident is resolved, there is no record of what was tried, what worked, and what didn't. The next on-call starts from zero. |

---

### The Risk If Unaddressed

A single node failure reduces quorum headroom to zero — one more failure means **total cache outage**.
With manual ops, the window between "node starts degrading" and "quorum lost" often closes before anyone acts.

---

## SLIDE 2 — The Proposed Solution

**Title: Agentic Ops — An AI SRE That Observes, Diagnoses, and Proposes (With Human Approval)**

---

### Core Idea

Replace the manual observe → diagnose → act loop with an AI agent that runs the loop autonomously —
but always keeps a human in the approval seat for any action that touches the cluster.

---

### Three Principles

**1. Observe everything, decide nothing alone**

The agent continuously monitors all 5 SLO metrics, SWIM node states, LB/SR drift, and error logs.
It builds a live context snapshot before every decision — not from memory, but from a real-time read
of the cluster.

**2. Propose actions, never execute silently**

Every remediation — from restarting a container to deregistering a dead node to adjusting an eviction
policy — goes through a *dry-run first* gate. The agent creates a human-readable proposal describing
exactly what it will do, what the risk level is, and what the rollback is.
**No action executes without explicit human approval.**

**3. Verify and learn**

After every approved action, a background verification task waits for the cluster to settle
(30–180 seconds depending on action type), then re-observes and records whether the issue was
RESOLVED, PARTIAL, or NOT_RESOLVED. This outcome feeds back into the agent's context on the next turn.

---

### What the Agent Can Do

| Category | Capability |
|---|---|
| **Passive monitoring** | Periodic health digest every 10 minutes with full SLO table and SWIM status |
| **Alert-driven investigation** | Receives Alertmanager webhook → uses tools to pinpoint root cause → proposes ranked remediations |
| **Conversational ops** | Natural-language queries: "why is node-2 slow?", "restart node-3", "what happened in the last 30 min?" |
| **Graduated remediation** | Always proposes in risk order: 🟢 Minimal → 🟡 Low → 🟠 Medium → 🔴 High |
| **Post-action verification** | Confirms whether each approved action actually resolved the issue |

---

## SLIDE 3 — Architecture & Working Modes

**Title: Three-Layer Architecture — Eyes, Hands, and Brain**

---

### Component Architecture

```
┌────────────────────────────────────────────────────────────────────┐
│                        Ops Agent  :8100                            │
│                         (the BRAIN)                                │
│                                                                    │
│   3-Layer LLM Context:                                             │
│   Layer 1 — Static system prompt (architecture, SLOs, rules)      │
│   Layer 2 — Live cluster snapshot (fetched before every LLM call) │
│   Layer 3 — Trigger-specific goal (health_check / alert / chat)   │
│                                                                    │
│   Trigger Sources:                                                 │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│   │  Alertmanager│  │  Scheduler   │  │  Human (REST / UI)   │   │
│   │  POST /alert │  │  every 10min │  │  POST /agent/query   │   │
│   └──────┬───────┘  └──────┬───────┘  └──────────┬───────────┘   │
│          └─────────────────┴──────────────────────┘               │
│                             │                                      │
│              Agentic tool-calling loop (max 8 rounds)              │
│              + history compression after round 5                   │
└──────────────┬──────────────────────────────┬──────────────────────┘
               │  SSE :8200                   │  SSE :8300
               ▼                              ▼
┌──────────────────────────┐    ┌───────────────────────────────────┐
│   MCP Observe  :8200     │    │   MCP Act  :8300                  │
│   (the EYES)             │    │   (the HANDS)                     │
│                          │    │                                   │
│ Read-only tools:         │    │ Gated action tools:               │
│ • get_system_overview    │    │ • restart_container               │
│ • get_swim_health        │    │ • force_swim_rejoin               │
│ • get_node_call_latency  │    │ • deregister_dead_node            │
│ • get_recent_logs        │    │ • trigger_rebalance               │
│ • check_node_drift       │    │ • update_cache_node_config        │
│ • query_prometheus       │    │ • toggle_tracing                  │
│ • get_error_count        │    │   (all default: dry_run=True)     │
│   _by_service            │    │   (execute only after approval)   │
└─────────┬────────────────┘    └──────────────┬────────────────────┘
          │ reads                               │ acts on
          ▼                                     ▼
┌──────────────┐ ┌──────────┐      ┌────────────┐ ┌──────────────┐
│  Prometheus  │ │   Loki   │      │Load Balancer│ │ Cache Nodes  │
│  :9090       │ │   :3100  │      │   :8080     │ │:8081/82/83   │
└──────────────┘ └──────────┘      └────────────┘ └──────────────┘
```

---

### 4 Working Modes

#### Mode 1 — Health Check (Scheduled, every 10 min)

- Triggered by the internal scheduler automatically
- Agent fetches live cluster snapshot → checks all 5 SLOs, SWIM state, drift
- If healthy → compact digest stored, no action
- If degraded → proposes 1–3 remediation actions using only the 3 safest ACT tools:
  `force_swim_rejoin`, `deregister_dead_node`, `restart_container`
- Output stored in `GET /agent/reports`

#### Mode 2 — Alert Investigation (Event-driven)

- Triggered by Alertmanager `POST /agent/alert` when a Prometheus SLO rule fires
- Agent receives the alert payload and maps it to the affected component
- Runs full investigation: tools → root cause → blast radius → ranked remediations
- Full ACT tool set available — all proposals require human approval
- Output stored in `GET /agent/queries` + pending proposals in `GET /agent/proposals`

#### Mode 3 — Conversational Chat (Human-initiated)

- Triggered by operator via `POST /agent/query` or the Web UI
- Supports multi-turn memory — each session maintains conversation history
  (up to 20 turns, expires after 30 min idle)
- Operator can ask diagnostic questions, request specific actions, or approve/reject proposals
- Full OBSERVE + ACT tool set available
- Output streamed via SSE at `GET /agent/query/stream`

#### Mode 4 — Post-Action Verification (Automatic background)

- Triggered automatically after any approved action
- Wait time varies by action type:

| Action | Wait Before Verification |
|---|---|
| toggle_tracing | 10 s |
| update config | 15 s |
| stop_container | 20 s |
| deregister_dead_node | 25 s |
| force_swim_rejoin | 35 s |
| restart_container | 60 s |
| trigger_rebalance | 120 s |
| start_azure_vm | 180 s |

- Runs observe-only agent loop (max 3 rounds) — no new proposals allowed
- Classifies outcome as `RESOLVED` / `PARTIAL` / `NOT_RESOLVED` / `IN_PROGRESS`
- Result written back to the originating session and to `GET /agent/history`

---

### Human Approval Gate

```
Agent proposes action
(dry_run=True — zero side effects)
         │
         ▼
Proposal stored with:
  • Tool name + arguments
  • Risk level (🟢 Minimal / 🟡 Low / 🟠 Medium / 🔴 High)
  • Expected outcome
  • Rollback instructions
  • Expiry TTL (10 min to 60 min depending on action type)
         │
         ▼
Human reviews in Web UI or REST API:
  POST /agent/approve/{id}   →  executes with dry_run=False
  POST /agent/reject/{id}    →  discards the proposal
         │
         ▼
Action executes → background verification starts automatically
```

---

### Risk Classification of ACT Tools

| Risk Level | Tools |
|---|---|
| 🟢 Minimal | `toggle_tracing` |
| 🟡 Low | `force_swim_rejoin`, `deregister_dead_node`, `start_container`, `update_lb_config`, `update_cache_node_config`, `update_default_ttl`, `update_lru_eviction_ratio`, `control_rebalance`, `adjust_rebalance_throttle` |
| 🟠 Medium | `restart_container`, `stop_container`, `trigger_rebalance`, `update_eviction_policy` |
| 🔴 High | `start_azure_vm`, `stop_azure_vm` (require `AZURE_VM_ACTIONS_ENABLED=true`) |

> **Quorum safety rule:** Restarting or stopping a cache node leaves 2 nodes active — quorum (2 of 3)
> is still met. Stopping 2 nodes simultaneously = quorum lost = ALL cache operations fail.
> The agent always states quorum impact in its remediation proposals.

---

### Key Configuration

| Parameter | Default | Purpose |
|---|---|---|
| `MONITOR_INTERVAL_MIN` | 10 | Scheduled health check interval |
| `MAX_TOOL_ROUNDS` | 8 | Max LLM tool-calling rounds per invocation |
| `COMPRESS_AFTER_ROUNDS` | 5 | Compress old tool history after N rounds |
| `MAX_SESSION_TURNS` | 20 | Max conversation turns kept per session |
| `SESSION_EXPIRY_MIN` | 30 | Session idle timeout |
| `DEPLOY_MODE` | `local` | `local` = Docker socket, `azure` = az vm run-command |
| `AZURE_VM_ACTIONS_ENABLED` | `false` | Unlock VM start/stop tools |

---

### Ports Reference

| Component | Port | Protocol | Role |
|---|---|---|---|
| Ops Agent | 8100 | HTTP / SSE | AI brain — REST API + Web UI |
| MCP Observe | 8200 | SSE | Read-only tools (eyes) |
| MCP Act | 8300 | SSE | Gated action tools (hands) |
| Prometheus | 9090 | HTTP | Metrics store |
| Loki | 3100 | HTTP | Log store |
| Alertmanager | 9093 | HTTP | Alert routing → Ops Agent |

