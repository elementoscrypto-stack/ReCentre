import React, { useMemo, useState } from "react";

const telemetryBase = [
  { key: "BUY", label: "Confidence entering", value: 12, type: "pos" },
  { key: "SELL", label: "Confidence leaving", value: -4, type: "neg" },
  { key: "GAIN", label: "Trust increasing", value: 8, type: "pos" },
  { key: "LOSS", label: "Trust decreasing", value: -2, type: "neg" },
  { key: "BUILD", label: "Structure strengthening", value: 6, type: "pos" },
  { key: "DRIFT", label: "Market misalignment", value: 18, type: "warn" },
  { key: "TRUST", label: "Belief in company", value: 74, type: "pos" },
  { key: "DOUBT", label: "Belief leaving", value: 26, type: "neg" },
  { key: "CENTRE", label: "Returning to alignment", value: 82, type: "pos" },
  { key: "LEAK", label: "Audience attrition", value: 19, type: "warn" },
  { key: "FLOW", label: "Healthy value movement", value: 83, type: "pos" },
  { key: "LOCK", label: "Retention strength", value: 71, type: "pos" },
];

const competitors = [
  { name: "Apple Fitness+", pull: 78, reason: "Ecosystem convenience", signal: "PULL +18" },
  { name: "Nike Training Club", pull: 63, reason: "Free / accessible content", signal: "CHASE +11" },
  { name: "Tonal", pull: 58, reason: "Strength hardware narrative", signal: "BATTLE +9" },
  { name: "Life Fitness", pull: 52, reason: "Commercial gym credibility", signal: "DEFEND +7" },
];

const timeline = [
  { label: "Peak demand", level: 6, text: "Home fitness becomes a premium identity signal." },
  { label: "Demand normalizes", level: 10, text: "Hardware urgency fades as gyms reopen and spend tightens." },
  { label: "Category drift", level: 11, text: "The offer feels trapped between hardware, content, and lifestyle." },
  { label: "Trust rebuild", level: 8, text: "Subscription, community, and pricing clarity start to matter more." },
  { label: "Level 5 target", level: 5, text: "Peloton becomes a confidence-led fitness recovery platform." },
];

const actions = [
  { title: "Rebuild Pricing Confidence", impact: "+11 TRUST", effort: "Medium", detail: "Simplify hardware + membership pricing so buyers understand total value instantly." },
  { title: "Recategorize Beyond Bike", impact: "-7 DRIFT", effort: "High", detail: "Move the narrative from premium equipment to connected fitness recovery, coaching, and habit formation." },
  { title: "Reclaim Community Energy", impact: "+9 LOCK", effort: "Medium", detail: "Make milestones, instructors, groups, and shared progress the emotional core again." },
  { title: "Defend Against Ecosystems", impact: "+8 DEFEND", effort: "High", detail: "Position Peloton as deeper, more human, and more committed than general-purpose fitness apps." },
];

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

export default function App() {
  const [trust, setTrust] = useState(74);
  const [doubt, setDoubt] = useState(26);
  const [drift, setDrift] = useState(18);
  const [centre, setCentre] = useState(82);
  const [growth, setGrowth] = useState(46);
  const [retention, setRetention] = useState(71);
  const [visualMode, setVisualMode] = useState("Reactor");
  const [selectedAction, setSelectedAction] = useState(actions[0]);
  const [simulation, setSimulation] = useState(0);

  const model = useMemo(() => {
    const risk = clamp(Math.round((doubt * 0.28) + (drift * 0.36) + ((100 - growth) * 0.2) + ((100 - retention) * 0.16)), 1, 100);
    const level = clamp(Math.round(1 + (risk / 100) * 14), 1, 15);
    const simulatedLevel = clamp(level - simulation, 5, 15);
    const confidence = clamp(Math.round((trust * 0.35) + (centre * 0.24) + (retention * 0.22) + (growth * 0.19)), 1, 100);
    const recoveryProbability = clamp(Math.round(confidence - risk * 0.24 + simulation * 8), 1, 98);

    const telemetry = telemetryBase.map((s) => {
      if (s.key === "TRUST") return { ...s, value: trust };
      if (s.key === "DOUBT") return { ...s, value: doubt };
      if (s.key === "DRIFT") return { ...s, value: drift };
      if (s.key === "CENTRE") return { ...s, value: centre };
      if (s.key === "LOCK") return { ...s, value: retention };
      if (s.key === "FLOW") return { ...s, value: confidence };
      return s;
    });

    return { risk, level, simulatedLevel, confidence, recoveryProbability, telemetry };
  }, [trust, doubt, drift, centre, growth, retention, simulation]);

  function runSimulation() {
    setSimulation((v) => clamp(v + 1, 0, 5));
    setTrust((v) => clamp(v + 3, 0, 100));
    setDoubt((v) => clamp(v - 2, 0, 100));
    setDrift((v) => clamp(v - 3, 0, 100));
    setCentre((v) => clamp(v + 2, 0, 100));
    setGrowth((v) => clamp(v + 3, 0, 100));
    setRetention((v) => clamp(v + 2, 0, 100));
  }

  function reset() {
    setTrust(74); setDoubt(26); setDrift(18); setCentre(82); setGrowth(46); setRetention(71); setSimulation(0); setSelectedAction(actions[0]);
  }

  return (
    <div className="app">
      <div className="aurora a1" />
      <div className="aurora a2" />
      <div className="grid" />
      <div className="scanline" />

      <aside className="sidebar">
        <div className="brand">
          <div className="logo">R</div>
          <div>
            <h1>ReCentre</h1>
            <p>Company Recovery OS</p>
          </div>
        </div>

        <nav>
          {["Company Pulse", "Market Signals", "Trust Engine", "Recovery Lab", "Category Studio", "Executive Report", "AI Copilot"].map((x, i) => (
            <button key={x} className={i === 0 ? "nav active" : "nav"}>{x}</button>
          ))}
        </nav>

        <div className="sidebarCard">
          <span>Focused company</span>
          <strong>Peloton</strong>
          <p>Connected fitness, membership, hardware, community, recovery narrative.</p>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Company Pulse / Peloton Recovery Intelligence</p>
            <h2>Recover. Rebuild. ReCentre.</h2>
          </div>
          <div className="topActions">
            <button onClick={() => setVisualMode(visualMode === "Reactor" ? "Boardroom" : "Reactor")} className="ghostBtn">{visualMode} Mode</button>
            <button onClick={runSimulation} className="primaryBtn">Run Recovery Simulation</button>
          </div>
        </header>

        <SignalRibbon signals={model.telemetry} />

        <section className="heroSurface">
          <CompanyDNA trust={trust} drift={drift} growth={growth} retention={retention} />
          <PulseReactor model={model} visualMode={visualMode} />
          <ExecutiveAI selectedAction={selectedAction} model={model} />
        </section>

        <section className="surfaceGrid">
          <ConfidenceRiver model={model} />
          <RecoveryHorizon model={model} />
          <OpportunityGalaxy setSelectedAction={setSelectedAction} selectedAction={selectedAction} />
        </section>

        <section className="deepGrid">
          <MarketGravity />
          <CompetitorTheft />
          <RecoveryActions selectedAction={selectedAction} setSelectedAction={setSelectedAction} runSimulation={runSimulation} />
          <SignalControls
            trust={trust} setTrust={setTrust}
            doubt={doubt} setDoubt={setDoubt}
            drift={drift} setDrift={setDrift}
            centre={centre} setCentre={setCentre}
            growth={growth} setGrowth={setGrowth}
            retention={retention} setRetention={setRetention}
            reset={reset}
          />
        </section>

        <section className="timelinePanel">
          <div className="panelHead">
            <div>
              <p className="eyebrow">Failure Replay Timeline</p>
              <h3>Peloton pathway to Level 5</h3>
            </div>
            <span className="badge">Target: Level 5 ReCentred</span>
          </div>
          <div className="timeline">
            {timeline.map((t, i) => (
              <div className="timeNode" key={t.label}>
                <div className="nodePulse">L{t.level}</div>
                <strong>{t.label}</strong>
                <p>{t.text}</p>
                {i < timeline.length - 1 && <div className="connector" />}
              </div>
            ))}
          </div>
        </section>
      </main>

      <style>{css}</style>
    </div>
  );
}

function SignalRibbon({ signals }) {
  return <div className="signalRibbon">
    <div className="ticker">
      {[...signals, ...signals].map((s, i) => <div className={`signal ${s.type}`} key={s.key + i}>
        <b>{s.key}</b><span>{typeof s.value === "number" && s.value > 0 && s.key !== "SELL" && s.key !== "LOSS" ? "+" : ""}{s.value}</span><small>{s.label}</small>
      </div>)}
    </div>
  </div>;
}

function PulseReactor({ model, visualMode }) {
  return <section className="reactorPanel">
    <div className="reactor">
      <div className="ring r1" />
      <div className="ring r2" />
      <div className="ring r3" />
      <div className="particle p1" />
      <div className="particle p2" />
      <div className="particle p3" />
      <div className="crystal">
        <div className="crack c1" />
        <div className="crack c2" />
        <span>PELOTON</span>
        <strong>L{model.simulatedLevel}</strong>
        <em>{model.simulatedLevel <= 5 ? "ReCentred" : "Recovery Active"}</em>
      </div>
    </div>
    <div className="reactorStats">
      <Metric label="Recovery Probability" value={`${model.recoveryProbability}%`} />
      <Metric label="Confidence Flow" value={model.confidence} />
      <Metric label="Market Risk" value={`${model.risk}%`} />
      <Metric label="Visual Mode" value={visualMode} />
    </div>
  </section>;
}

function CompanyDNA({ trust, drift, growth, retention }) {
  const rows = [
    ["Trust", trust], ["Brand", 68], ["Product", 61], ["Pricing", 49], ["Audience", 64],
    ["Narrative", 55], ["Support", 72], ["Competition", 100 - drift], ["Retention", retention], ["Growth", growth]
  ];
  return <section className="dnaPanel glassPanel">
    <div className="panelHead small"><div><p className="eyebrow">Company DNA</p><h3>Signals bending under pressure</h3></div></div>
    <div className="dna">
      {rows.map(([label, value], i) => <div className="dnaRow" key={label} style={{ '--v': value, '--i': i }}>
        <span>{label}</span><div className="dnaBar"><i /></div><b>{value}</b>
      </div>)}
    </div>
  </section>;
}

function ExecutiveAI({ selectedAction, model }) {
  return <section className="aiPanel glassPanel">
    <div className="panelHead small"><div><p className="eyebrow">Executive Intelligence</p><h3>Highest ROI action</h3></div></div>
    <div className="aiOrb">AI</div>
    <h4>{selectedAction.title}</h4>
    <p>{selectedAction.detail}</p>
    <div className="impactGrid">
      <Metric label="Impact" value={selectedAction.impact} />
      <Metric label="Effort" value={selectedAction.effort} />
      <Metric label="Forecast" value={`${model.recoveryProbability}%`} />
      <Metric label="Target" value="L5" />
    </div>
  </section>;
}

function ConfidenceRiver({ model }) {
  return <section className="glassPanel riverPanel">
    <div className="panelHead"><div><p className="eyebrow">Confidence River</p><h3>Value entering vs leaving Peloton</h3></div><span className="badge">FLOW {model.confidence}</span></div>
    <div className="river">
      <div className="flow in"><span>BUY</span><span>GAIN</span><span>BUILD</span><span>CREATE</span><span>ATTRACT</span></div>
      <div className="water" />
      <div className="flow out"><span>SELL</span><span>LOSS</span><span>LEAK</span><span>DECAY</span><span>REPEL</span></div>
    </div>
  </section>;
}

function RecoveryHorizon({ model }) {
  const pts = [12, 10, 9, model.simulatedLevel, 7, 6, 5];
  return <section className="glassPanel horizonPanel">
    <div className="panelHead"><div><p className="eyebrow">Recovery Horizon</p><h3>Projected Level 12 → 5 arc</h3></div><span className="badge">RECENTRE active</span></div>
    <div className="mountains">
      {pts.map((p, i) => <div className="mount" key={i} style={{ height: `${p * 9}px` }}><span>L{p}</span></div>)}
      <svg viewBox="0 0 700 190" preserveAspectRatio="none"><path d="M20 45 C140 70 170 100 250 98 C360 96 390 145 470 132 C565 116 590 154 680 150" /></svg>
    </div>
  </section>;
}

function OpportunityGalaxy({ selectedAction, setSelectedAction }) {
  return <section className="glassPanel galaxyPanel">
    <div className="panelHead"><div><p className="eyebrow">Opportunity Galaxy</p><h3>Recovery opportunities orbiting the company</h3></div></div>
    <div className="galaxy">
      <div className="sun">P</div>
      {actions.map((a, i) => <button key={a.title} onClick={() => setSelectedAction(a)} className={`planet planet${i} ${selectedAction.title === a.title ? "selected" : ""}`}>{a.title.split(" ")[0]}</button>)}
    </div>
  </section>;
}

function MarketGravity() {
  const bodies = [["Customers", 83], ["Investors", 52], ["Instructors", 77], ["Media", 41], ["Competitors", 72], ["Community", 88]];
  return <section className="glassPanel">
    <div className="panelHead small"><div><p className="eyebrow">Market Gravity Engine</p><h3>Who pulls hardest?</h3></div></div>
    <div className="gravityList">{bodies.map(([n, v]) => <div className="gravityItem" key={n}><span>{n}</span><i><b style={{ width: `${v}%` }} /></i><strong>{v}</strong></div>)}</div>
  </section>;
}

function CompetitorTheft() {
  return <section className="glassPanel">
    <div className="panelHead small"><div><p className="eyebrow">Competitor Theft Scanner</p><h3>Trust being stolen</h3></div></div>
    <div className="competitors">{competitors.map((c) => <div className="competitor" key={c.name}><div><strong>{c.name}</strong><p>{c.reason}</p></div><span>{c.signal}</span></div>)}</div>
  </section>;
}

function RecoveryActions({ selectedAction, setSelectedAction, runSimulation }) {
  return <section className="glassPanel">
    <div className="panelHead small"><div><p className="eyebrow">Recovery Action Cards</p><h3>30 / 60 / 90 day moves</h3></div></div>
    <div className="actions">{actions.map((a) => <button key={a.title} onClick={() => setSelectedAction(a)} className={selectedAction.title === a.title ? "action selected" : "action"}><strong>{a.title}</strong><span>{a.impact}</span></button>)}</div>
    <button onClick={runSimulation} className="primaryBtn full">Apply Selected Move</button>
  </section>;
}

function SignalControls(props) {
  const sliders = [
    ["Trust", props.trust, props.setTrust], ["Doubt", props.doubt, props.setDoubt], ["Drift", props.drift, props.setDrift],
    ["Centre", props.centre, props.setCentre], ["Growth", props.growth, props.setGrowth], ["Retention", props.retention, props.setRetention]
  ];
  return <section className="glassPanel">
    <div className="panelHead small"><div><p className="eyebrow">Signal Controls</p><h3>Prototype telemetry tuning</h3></div></div>
    {sliders.map(([l, v, set]) => <label className="slider" key={l}><span>{l}<b>{v}</b></span><input type="range" min="0" max="100" value={v} onChange={(e) => set(Number(e.target.value))} /></label>)}
    <button onClick={props.reset} className="ghostBtn full">Reset Peloton Model</button>
  </section>;
}

function Metric({ label, value }) { return <div className="metric"><span>{label}</span><strong>{value}</strong></div>; }

const css = `
*{box-sizing:border-box} body{margin:0;background:#030612;color:#f7fbff;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,sans-serif} button{font:inherit;color:inherit} .app{min-height:100vh;position:relative;display:grid;grid-template-columns:280px 1fr;overflow:hidden;background:radial-gradient(circle at 58% 20%,rgba(67,224,255,.12),transparent 34%),radial-gradient(circle at 86% 12%,rgba(255,70,214,.13),transparent 30%),linear-gradient(135deg,#030612,#071022 52%,#060713)}
.grid{position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px);background-size:54px 54px;mask-image:radial-gradient(circle at 58% 38%,#000 0 42%,transparent 78%);pointer-events:none}.scanline{position:fixed;inset:0;background:linear-gradient(180deg,transparent,rgba(103,232,249,.035),transparent);animation:scan 7s linear infinite;pointer-events:none}.aurora{position:fixed;border-radius:999px;filter:blur(70px);opacity:.55;pointer-events:none}.a1{width:520px;height:520px;background:#23d5ff;left:210px;top:-180px}.a2{width:620px;height:620px;background:#ff2bc3;right:-220px;top:120px}@keyframes scan{from{transform:translateY(-100%)}to{transform:translateY(100%)}}
.sidebar{position:relative;z-index:2;border-right:1px solid rgba(255,255,255,.09);background:linear-gradient(180deg,rgba(255,255,255,.075),rgba(255,255,255,.025));backdrop-filter:blur(24px);padding:26px;min-height:100vh}.brand{display:flex;align-items:center;gap:14px;margin-bottom:34px}.logo{width:52px;height:52px;border-radius:18px;display:grid;place-items:center;font-weight:1000;font-size:26px;background:linear-gradient(135deg,rgba(52,211,153,.9),rgba(34,211,238,.86),rgba(217,70,239,.8));box-shadow:0 0 50px rgba(34,211,238,.34)}h1,h2,h3,h4,p{margin:0}.brand h1{font-size:24px}.brand p,.eyebrow{color:rgba(225,244,255,.56);font-size:12px;letter-spacing:.08em;text-transform:uppercase}.nav{display:block;width:100%;text-align:left;border:1px solid transparent;background:transparent;border-radius:18px;padding:13px 14px;margin-bottom:7px;color:rgba(239,249,255,.68);cursor:pointer}.nav.active,.nav:hover{background:rgba(103,232,249,.1);border-color:rgba(103,232,249,.22);color:white;box-shadow:inset 0 0 30px rgba(103,232,249,.04)}.sidebarCard{position:absolute;left:26px;right:26px;bottom:26px;border:1px solid rgba(255,255,255,.1);background:rgba(0,0,0,.22);border-radius:26px;padding:20px}.sidebarCard span{font-size:11px;color:rgba(255,255,255,.5);text-transform:uppercase;letter-spacing:.08em}.sidebarCard strong{display:block;font-size:30px;margin:5px 0}.sidebarCard p{font-size:13px;line-height:1.55;color:rgba(255,255,255,.56)}
.main{position:relative;z-index:1;padding:26px;min-width:0}.topbar{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:18px}.topbar h2{font-size:48px;line-height:.95;letter-spacing:-.05em}.topActions{display:flex;gap:12px}.primaryBtn,.ghostBtn{border:1px solid rgba(103,232,249,.28);border-radius:999px;padding:12px 18px;cursor:pointer;background:linear-gradient(135deg,rgba(34,211,238,.24),rgba(217,70,239,.18));box-shadow:0 0 42px rgba(34,211,238,.15);font-weight:900}.ghostBtn{background:rgba(255,255,255,.055);box-shadow:none}.full{width:100%;justify-content:center;margin-top:14px}.signalRibbon{height:74px;overflow:hidden;border:1px solid rgba(255,255,255,.09);border-radius:28px;background:rgba(255,255,255,.055);backdrop-filter:blur(20px);margin-bottom:18px}.ticker{display:flex;width:max-content;animation:ticker 30s linear infinite}.signal{display:grid;grid-template-columns:auto auto;grid-template-rows:auto auto;column-gap:8px;min-width:155px;padding:15px 20px;border-right:1px solid rgba(255,255,255,.07)}.signal b{font-size:16px}.signal span{font-weight:1000}.signal small{grid-column:1/3;color:rgba(255,255,255,.48);font-size:11px}.signal.pos span{color:#64ffda}.signal.neg span{color:#ff5fbf}.signal.warn span{color:#ffd166}@keyframes ticker{to{transform:translateX(-50%)}}
.heroSurface{display:grid;grid-template-columns:270px minmax(430px,1fr) 320px;gap:18px;margin-bottom:18px}.glassPanel,.reactorPanel,.timelinePanel{border:1px solid rgba(255,255,255,.1);background:linear-gradient(145deg,rgba(255,255,255,.085),rgba(255,255,255,.035));border-radius:34px;backdrop-filter:blur(22px);box-shadow:0 24px 90px rgba(0,0,0,.34),inset 0 1px 0 rgba(255,255,255,.08);padding:22px;position:relative;overflow:hidden}.glassPanel:before,.reactorPanel:before,.timelinePanel:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 30% 10%,rgba(103,232,249,.13),transparent 34%),radial-gradient(circle at 80% 40%,rgba(217,70,239,.1),transparent 38%);pointer-events:none}.panelHead{position:relative;display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:18px}.panelHead h3{font-size:19px;letter-spacing:-.03em}.panelHead.small h3{font-size:16px}.badge{border:1px solid rgba(103,232,249,.25);background:rgba(103,232,249,.1);color:#bff8ff;border-radius:999px;padding:8px 11px;font-size:12px;font-weight:900;white-space:nowrap}.reactorPanel{min-height:590px;display:flex;flex-direction:column;align-items:center;justify-content:center}.reactor{position:relative;width:min(520px,100%);aspect-ratio:1;display:grid;place-items:center}.ring{position:absolute;border-radius:50%;border:1px solid rgba(103,232,249,.22);box-shadow:0 0 80px rgba(103,232,249,.15),inset 0 0 40px rgba(217,70,239,.06)}.r1{inset:4%;animation:spin 24s linear infinite}.r2{inset:16%;border-color:rgba(217,70,239,.22);animation:spin 18s linear reverse infinite}.r3{inset:28%;border-style:dashed;animation:spin 12s linear infinite}.crystal{width:190px;height:220px;clip-path:polygon(50% 0,92% 24%,78% 88%,50% 100%,22% 88%,8% 24%);background:linear-gradient(135deg,rgba(103,232,249,.5),rgba(255,255,255,.07),rgba(217,70,239,.35));display:grid;place-items:center;text-align:center;box-shadow:0 0 80px rgba(103,232,249,.25);position:relative;animation:breathe 3.6s ease-in-out infinite}.crystal span{font-size:13px;letter-spacing:.16em;color:#d6fbff}.crystal strong{font-size:76px;line-height:.8}.crystal em{font-style:normal;color:rgba(255,255,255,.65);font-size:13px}.crack{position:absolute;width:1px;background:rgba(255,255,255,.45);height:70px}.c1{left:52%;top:38%;transform:rotate(25deg)}.c2{left:42%;top:52%;transform:rotate(-35deg)}.particle{position:absolute;width:9px;height:9px;border-radius:50%;background:#72f7ff;box-shadow:0 0 18px #72f7ff}.p1{animation:orbit1 7s linear infinite}.p2{animation:orbit2 9s linear infinite;background:#ff68d4}.p3{animation:orbit3 6s linear infinite;background:#7cffb6}.reactorStats{position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:10px;width:100%}.metric{border:1px solid rgba(255,255,255,.09);background:rgba(0,0,0,.22);border-radius:20px;padding:14px;position:relative}.metric span{display:block;color:rgba(255,255,255,.48);font-size:11px;text-transform:uppercase;letter-spacing:.07em}.metric strong{display:block;margin-top:4px;font-size:20px}.dnaPanel,.aiPanel{min-height:590px}.dna{position:relative;z-index:1}.dnaRow{display:grid;grid-template-columns:72px 1fr 34px;gap:10px;align-items:center;margin:14px 0;color:rgba(255,255,255,.7);font-size:12px}.dnaBar{height:14px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden;transform:skewX(calc((60 - var(--v))* .06deg))}.dnaBar i{display:block;height:100%;width:calc(var(--v)*1%);background:linear-gradient(90deg,#ff58cf,#39e7ff,#72ffbf);border-radius:999px;box-shadow:0 0 22px rgba(57,231,255,.34)}.aiOrb{position:relative;z-index:1;margin:20px auto;width:116px;height:116px;border-radius:50%;display:grid;place-items:center;font-weight:1000;font-size:38px;background:radial-gradient(circle,#dffbff,rgba(103,232,249,.28) 38%,rgba(217,70,239,.12) 70%);box-shadow:0 0 75px rgba(103,232,249,.25)}.aiPanel h4{position:relative;font-size:24px;letter-spacing:-.04em;margin-bottom:10px}.aiPanel p{position:relative;color:rgba(255,255,255,.62);line-height:1.6;font-size:14px}.impactGrid{position:relative;margin-top:18px;display:grid;grid-template-columns:1fr 1fr;gap:10px}.surfaceGrid{display:grid;grid-template-columns:1fr 1.15fr .85fr;gap:18px;margin-bottom:18px}.river{position:relative;height:230px;border-radius:26px;background:rgba(0,0,0,.22);overflow:hidden;border:1px solid rgba(255,255,255,.08)}.water{position:absolute;inset:35% -20%;height:70px;background:linear-gradient(90deg,transparent,rgba(103,232,249,.25),rgba(115,255,183,.2),transparent);filter:blur(1px);animation:river 4s linear infinite}.flow{position:absolute;left:0;right:0;display:flex;justify-content:space-around;z-index:2}.flow span{border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.06);border-radius:999px;padding:8px 10px;font-size:12px;font-weight:900}.flow.in{top:35px;color:#9dffd5}.flow.out{bottom:35px;color:#ff9bdc}.mountains{position:relative;height:230px;display:flex;align-items:end;gap:16px;padding:14px 16px;border-radius:26px;background:rgba(0,0,0,.22);overflow:hidden;border:1px solid rgba(255,255,255,.08)}.mount{flex:1;border-radius:20px 20px 0 0;background:linear-gradient(180deg,rgba(255,91,213,.72),rgba(57,231,255,.25));display:flex;align-items:flex-start;justify-content:center;padding-top:10px;color:white;font-weight:900;font-size:12px}.mountains svg{position:absolute;inset:16px;width:calc(100% - 32px);height:calc(100% - 32px);pointer-events:none}.mountains path{fill:none;stroke:#8effff;stroke-width:4;filter:drop-shadow(0 0 8px #8effff);stroke-dasharray:8 8;animation:dash 10s linear infinite}.galaxy{height:230px;position:relative;border-radius:26px;background:radial-gradient(circle at 50% 50%,rgba(103,232,249,.14),rgba(0,0,0,.22) 58%);border:1px solid rgba(255,255,255,.08);overflow:hidden}.sun{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:74px;height:74px;border-radius:50%;display:grid;place-items:center;background:rgba(103,232,249,.24);box-shadow:0 0 55px rgba(103,232,249,.35);font-size:34px;font-weight:1000}.planet{position:absolute;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.08);border-radius:999px;padding:8px 12px;cursor:pointer;font-weight:900;font-size:12px}.planet.selected{background:rgba(103,232,249,.22);box-shadow:0 0 35px rgba(103,232,249,.28)}.planet0{left:12%;top:18%}.planet1{right:10%;top:22%}.planet2{left:15%;bottom:18%}.planet3{right:14%;bottom:20%}.deepGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-bottom:18px}.gravityItem{display:grid;grid-template-columns:90px 1fr 34px;align-items:center;gap:10px;margin:13px 0;font-size:13px}.gravityItem i{height:10px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden}.gravityItem b{display:block;height:100%;background:linear-gradient(90deg,#ff58cf,#39e7ff);border-radius:999px}.competitor{display:flex;justify-content:space-between;gap:10px;padding:13px;border:1px solid rgba(255,255,255,.08);background:rgba(0,0,0,.18);border-radius:18px;margin-bottom:10px}.competitor p{font-size:12px;color:rgba(255,255,255,.5);margin-top:4px}.competitor span{color:#ffd166;font-size:12px;font-weight:1000;white-space:nowrap}.actions{position:relative;z-index:1;display:grid;gap:9px}.action{border:1px solid rgba(255,255,255,.08);background:rgba(0,0,0,.18);border-radius:18px;padding:12px;text-align:left;cursor:pointer;display:flex;justify-content:space-between;gap:10px}.action.selected{border-color:rgba(103,232,249,.35);background:rgba(103,232,249,.1)}.action span{color:#7cffd2;font-size:12px;font-weight:900}.slider{position:relative;z-index:1;display:block;margin:10px 0}.slider span{display:flex;justify-content:space-between;font-size:12px;color:rgba(255,255,255,.66);margin-bottom:5px}.slider input{width:100%;accent-color:#67e8f9}.timelinePanel{margin-bottom:26px}.timeline{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;position:relative}.timeNode{position:relative;border:1px solid rgba(255,255,255,.09);background:rgba(0,0,0,.2);border-radius:24px;padding:18px;min-height:180px}.nodePulse{width:56px;height:56px;border-radius:50%;display:grid;place-items:center;background:rgba(103,232,249,.14);border:1px solid rgba(103,232,249,.25);font-weight:1000;margin-bottom:13px;box-shadow:0 0 35px rgba(103,232,249,.14)}.timeNode p{font-size:13px;line-height:1.55;color:rgba(255,255,255,.56);margin-top:7px}.connector{position:absolute;height:2px;background:linear-gradient(90deg,#39e7ff,#ff58cf);left:72%;right:-22%;top:45px;box-shadow:0 0 12px #39e7ff}@keyframes spin{to{transform:rotate(360deg)}}@keyframes breathe{50%{transform:scale(1.04);filter:brightness(1.18)}}@keyframes orbit1{from{transform:rotate(0deg) translateX(215px)}to{transform:rotate(360deg) translateX(215px)}}@keyframes orbit2{from{transform:rotate(130deg) translateX(165px)}to{transform:rotate(490deg) translateX(165px)}}@keyframes orbit3{from{transform:rotate(270deg) translateX(120px)}to{transform:rotate(630deg) translateX(120px)}}@keyframes river{to{transform:translateX(20%)}}@keyframes dash{to{stroke-dashoffset:-160}}
@media(max-width:1200px){.app{grid-template-columns:1fr}.sidebar{display:none}.heroSurface,.surfaceGrid,.deepGrid,.timeline{grid-template-columns:1fr}.reactorStats{grid-template-columns:1fr 1fr}.topbar{flex-direction:column;align-items:flex-start}.topbar h2{font-size:40px}.dnaPanel,.aiPanel,.reactorPanel{min-height:auto}.timeline .connector{display:none}}
@media(max-width:680px){.main{padding:16px}.topActions{width:100%;flex-direction:column}.primaryBtn,.ghostBtn{width:100%}.reactor{width:330px}.reactorStats{grid-template-columns:1fr}.signalRibbon{border-radius:20px}.topbar h2{font-size:34px}.glassPanel,.reactorPanel,.timelinePanel{border-radius:24px;padding:16px}}
`;
