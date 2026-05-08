# Agentic Ops — Simple Presentation Script
> Just read this. Deliver naturally. Total time: ~15 minutes.

---

## BEFORE YOU START

> Open these in your browser before you walk in:
> - `http://localhost:8100` → Ops Agent Web UI
> - `http://localhost:9090` → Prometheus
> - Keep a terminal ready

---

## SLIDE 1 — START WITH A STORY (2 min)

### Say this:

---

"Let me start with a scenario.

It's 3 in the morning. One of your cache nodes starts behaving strangely —
it's still up, but it's becoming isolated from the cluster.
SWIM — our failure detection protocol — marks it as SUSPECT.

You now have maybe 4 minutes before it goes DEAD.
If one more node goes down in that window — quorum is lost.
Every cache operation fails. Every user request hits the database cold.

Today, nobody wakes up until the alert fires — AFTER the breach.
By then it's too late.

The question we asked ourselves was: what if the system could notice, diagnose,
and recommend a fix — before the alert fires — and all the on-call engineer
had to do was say YES?"

---

> **Pause. Let that land. Then say:**

"That's what Agentic Ops is."

---

## SLIDE 2 — WHAT IS AGENTIC OPS? (1 min)

### Say this:

---

"Agentic Ops is an AI-driven operations layer for EdgeFabric.

It's made of three components:

- **MCP Observe** — the eyes. Read-only view of the entire cluster.
- **MCP Act** — the hands. Actions it CAN take — but only with your approval.
- **Ops Agent** — the brain. The AI that connects everything and decides what to do.

Together they form a loop:
OBSERVE → DIAGNOSE → PROPOSE → you APPROVE → it ACTS → then VERIFIES."

---

> **Draw or show this flow on screen:**

```
Cluster → MCP Observe → Ops Agent (LLM) → MCP Act → Cluster
                              ↑
                        Human Approval
```

---

## SLIDE 3 — MCP OBSERVE: THE EYES (2 min)

### Say this:

---

"MCP Observe runs on port 8200. It's a read-only tool server.

Think of it as a single place where the AI can ask questions about the cluster.

It has about 15 tools. Let me show you the important ones:"

---

| Tool | What it answers |
|---|---|
| `get_system_overview` | Full cluster health in one call — SLOs, nodes, drift, errors |
| `get_swim_health` | Are any nodes SUSPECT or DEAD? |
| `get_node_call_latency` | Which cache node is slowest? P50/P95/P99 |
| `get_recent_logs` | What errors happened in the last N minutes? |
| `check_node_drift` | Is the Load Balancer ring out of sync with the Service Registry? |
| `query_prometheus` | Any custom PromQL query |

---

"The key point: **MCP Observe can never change anything.**
It only reads. Zero side effects. The AI can call these tools as many times as it wants —
it's just looking."

---

> **Show in browser:** `http://localhost:8200` or mention it's queried via SSE by the agent.

---

## SLIDE 4 — MCP ACT: THE HANDS (2 min)

### Say this:

---

"MCP Act runs on port 8300. This is where the actual actions live.

But here's the critical design decision we made:
**Every single action defaults to dry_run=True.**

That means when the AI calls one of these tools,
it gets back a proposal — a description of what WOULD happen.
It does NOT actually do anything.

The AI literally cannot set dry_run=False. Only the human approval endpoint can do that."

---

| Action | Risk | What it does |
|---|---|---|
| `toggle_tracing` | 🟢 Minimal | Enable/disable correlation ID injection |
| `force_swim_rejoin` | 🟡 Low | Force an isolated node back into the cluster |
| `deregister_dead_node` | 🟡 Low | Remove a dead node from Service Registry |
| `restart_container` | 🟠 Medium | Restart a cache node container |
| `trigger_rebalance` | 🟠 Medium | Redistribute keys across nodes |
| `stop_azure_vm` | 🔴 High | Stop an Azure VM (requires explicit unlock) |

---

"The AI always proposes in risk order — lowest risk first.
It will never suggest restarting a node before trying a soft rejoin."

---

## SLIDE 5 — OPS AGENT: THE BRAIN (3 min)

### Say this:

---

"The Ops Agent is the brain. It runs on port 8100.

It's a Python FastAPI service that connects to MCP Observe and MCP Act,
and runs an LLM — we're using GPT-4 via EPAM Dial — in a tool-calling loop.

Let me explain how it thinks."

---

### 3-Layer Context (show this simply)

"Every time the agent is triggered, it builds its context in 3 layers:

**Layer 1 — What it always knows:**
The architecture. SLOs. Rules. 'Never restart if it breaks quorum.'
This never changes.

**Layer 2 — What's happening RIGHT NOW:**
It fetches a live cluster snapshot before every single LLM call.
Current SLO values. SWIM states. Error counts. Not cached. Live.

**Layer 3 — Why it was called:**
Was it a scheduled health check? An alert? A human question?
Each trigger gets different instructions."

---

### 4 Ways to Trigger It

"There are 4 ways the agent can be triggered:"

---

**1. Scheduled Health Check — every 10 minutes**
> "Automatic. Checks all 5 SLOs, SWIM state, node drift.
> Healthy? Stores a compact report.
> Degraded? Creates a proposal for the safest fix."

**2. Alert from Prometheus/Alertmanager**
> "Alertmanager fires a webhook to `POST /agent/alert`.
> The agent gets the alert, investigates, produces a full report:
> root cause, blast radius, ranked remediation steps."

**3. You ask it a question — Chat**
> "Natural language. 'Why is node-2 slow?' 'Restart node-3.' 'What happened at 2AM?'
> Multi-turn conversation with memory — it remembers what you discussed."

**4. Post-Action Verification — automatic**
> "After you approve any action, the agent waits for the cluster to settle —
> 10 seconds for a config toggle, 60 seconds for a container restart —
> then re-checks and tells you: RESOLVED, PARTIAL, or NOT_RESOLVED."

---

## SLIDE 6 — THE APPROVAL FLOW (1 min)

### Say this:

---

"Let me show you exactly what happens when the agent finds a problem.

1. Agent calls `force_swim_rejoin(node='node-3', dry_run=True)`
2. MCP Act returns an ActionProposal — no side effects
3. Agent stores it as a **pending proposal** with:
   - What tool will run
   - What arguments
   - Risk level
   - Expected outcome
   - How to roll back
   - An expiry timer — you have 20 minutes to decide

4. You see it in the Web UI or call `POST /agent/approve/{id}`
5. Only NOW does it execute with `dry_run=False`
6. Background verification starts automatically

**The AI cannot bypass this. Ever.**"

---

## LIVE DEMO (5 min)

### Step 1 — Show the Web UI (30 sec)
> Open `http://localhost:8100`
> "This is the dashboard. Health reports, proposals queue, action history, chat."

---

### Step 2 — Ask a health question (1 min)
> In the chat box, type:
```
are all nodes healthy?
```
> "Watch the tool calls stream in real time. It calls get_system_overview,
> checks SWIM health, formats a structured SRE report. All live data."

---

### Step 3 — Stop a node and watch the agent respond (2 min)
> In terminal:
```bash
docker stop cache-node-3
```
> Wait 15 seconds. Then in chat:
```
check cluster status
```
> "Node-3 is SUSPECT. The agent sees it — proposes force_swim_rejoin first.
> Lower risk than a restart. Notice it states: '2 nodes remain, quorum still met.'"

---

### Step 4 — Approve the proposal (1 min)
> Click **Approve** in the Proposals tab.
> "Action executed. In 35 seconds, verification will tell us the outcome."
> After ~35 seconds, show `GET /agent/history`
> "RESOLVED. Node rejoined SWIM, re-registered, back on the ring."

---

### Step 5 — Clean up (15 sec)
```bash
docker start cache-node-3
```

---

## CLOSING (30 sec)

### Say this:

---

"What we've built is not autopilot. It's a co-pilot.

The AI runs the observe-diagnose loop at machine speed.
It proposes with full risk context.
You decide. You approve. It verifies.

The human stays in the loop — but the loop runs in seconds, not 40 minutes.

That's Agentic Ops."

---

## LIKELY QUESTIONS — SHORT ANSWERS

**"What if the AI proposes the wrong thing?"**
> "You reject it. It can't execute without your approval. The worst case is a bad proposal — not a bad action."

**"What LLM are you using?"**
> "GPT-4 via EPAM Dial. Swappable at runtime — no restart needed. Groq also supported."

**"What if the AI hallucinates a tool call?"**
> "Unknown tools return an error. The agent sees the error and corrects itself. Max 8 rounds per trigger."

**"Is this production-ready?"**
> "It's integrated with our full monitoring stack. For Azure deployment, it runs on a dedicated AgentOpsVM — MCP servers are VNet-internal only, not exposed to internet."

**"What if ops-agent itself goes down?"**
> "The rest of the system — load balancer, cache nodes, service registry — is completely unaffected. Ops Agent is observability only. It has zero coupling to the data plane."

**"Can it handle multiple alerts at once?"**
> "Yes — each POST /agent/alert runs independently. Proposals stack up in the queue. You review and approve at your own pace."

---

## CHEAT SHEET — Key Numbers

| | |
|---|---|
| Cache nodes | 3 |
| Quorum | 2 of 3 |
| Health check | Every 10 min |
| Max AI rounds | 8 per trigger |
| Restart verify wait | 60 seconds |
| MCP Observe port | 8200 |
| MCP Act port | 8300 |
| Ops Agent port | 8100 |
| Risk levels | 🟢🟡🟠🔴 |

