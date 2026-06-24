import React, { useMemo, useState } from "react";

const signalsBase = [
  { key: "BUY", label: "Confidence entering", value: 12, type: "up" },
  { key: "SELL", label: "Confidence leaving", value: -4, type: "down" },
  { key: "LOCK", label: "Subscriber retention", value: 71, type: "up", suffix: "%" },
  { key: "LEAK", label: "Churn pressure", value: 18, type: "down", suffix: "%" },
  { key: "FLOW", label: "Value movement", value: 83, type: "up", suffix: "%" },
  { key: "BUILD", label: "Structure improving", value: 9, type: "up" },
  { key: "TRUST", label: "Belief in brand", value: 74, type: "up" },
  { key: "DRIFT", label: "Market misalignment", value: 21, type: "down" },
  { key: "RECENTRE", label: "Return to Level 5", value: 68, type: "up", suffix: "%" },
];

const actions = [
  { name: "Lower hardware friction", impact: "+9 Trust", detail: "Reduce purchase anxiety with bundles, financing clarity, and trade-in value." },
  { name: "Bundle family plans", impact: "+7 Lock", detail: "Turn one-bike households into multi-user subscription anchors." },
  { name: "Rebuild instructor-led identity", impact: "+12 Brand", detail: "Make instructors the emotional centre of the Peloton recovery story." },
  { name: "Launch mid-market entry offer", impact: "+8 Flow", detail: "Create a lighter path into Peloton without damaging premium perception." },
  { name: "Refocus community challenges", impact: "+6 Loyalty", detail: "Recover belonging, streaks, and shared achievement as the retention engine." },
];

const threats = [
  { name: "Apple Fitness+", pull: 76, reason: "Ecosystem convenience" },
  { name: "Tonal", pull: 61, reason: "Premium connected strength" },
  { name: "Gyms", pull: 58, reason: "Post-pandemic social return" },
  { name: "YouTube Fitness", pull: 49, reason: "Free content pressure" },
  { name: "Lululemon Studio", pull: 36, reason: "Lifestyle adjacency" },
];

const heatZones = [
  ["Premium", 72],
  ["Trust", 64],
  ["Affordability", 41],
  ["Motivation", 78],
  ["Culture", 69],
  ["Community", 74],
];

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

export default function App() {
  const [simulation, setSimulation] = useState(0);
  const [mode, setMode] = useState("Insane Visual");
  const [selectedAction, setSelectedAction] = useState(actions[2]);

  const data = useMemo(() => {
    const recoveryLevel = clamp(8 - Math.floor(simulation / 2), 5, 8);
    const trust = 74 + simulation * 3;
    const churn = clamp(18 - simulation * 2, 7, 18);
    const recoveryProbability = clamp(68 + simulation * 5, 68, 92);
    const confidence = clamp(72 + simulation * 4, 72, 96);
    const drift = clamp(21 - simulation * 3, 6, 21);
    return { recoveryLevel, trust, churn, recoveryProbability, confidence, drift };
  }, [simulation]);

  const signals = signalsBase.map((s) => {
    if (s.key === "TRUST") return { ...s, value: data.trust };
    if (s.key === "LEAK") return { ...s, value: data.churn };
    if (s.key === "DRIFT") return { ...s, value: data.drift };
    if (s.key === "RECENTRE") return { ...s, value: data.recoveryProbability };
    if (s.key === "LOCK") return { ...s, value: clamp(71 + simulation * 3, 71, 91) };
    return s;
  });

  return (
    <main className={mode === "Boardroom" ? "app boardroom" : "app"}>
      <div className="ambient one" />
      <div className="ambient two" />
      <div className="mesh" />

      <aside className="sideRail">
        <div className="brandMark">R</div>
        <nav>
          {["Pulse", "Signals", "Threats", "Subscribers", "Forecast", "Memo", "Certification"].map((x, i) => (
            <button key={x} className={i === 0 ? "navItem active" : "navItem"}>{x}</button>
          ))}
        </nav>
      </aside>

      <section className="surface">
        <header className="topbar">
          <div>
            <p className="eyebrow">ReCentre / Peloton recovery mission</p>
            <h1>Company Pulse</h1>
          </div>
          <div className="topActions">
            <button onClick={() => setMode(mode === "Boardroom" ? "Insane Visual" : "Boardroom")} className="ghostBtn">{mode} Mode</button>
            <button onClick={() => setSimulation((x) => clamp(x + 1, 0, 6))} className="primaryBtn">Run 90-Day Recovery</button>
            <button onClick={() => setSimulation(0)} className="ghostBtn">Reset</button>
          </div>
        </header>

        <SignalTicker signals={signals} />

        <section className="heroGrid">
          <CompanyDNA data={data} />
          <Reactor data={data} simulation={simulation} />
          <ExecutiveIntel selectedAction={selectedAction} data={data} />
        </section>

        <section className="moduleGrid">
          <Thesis data={data} />
          <ThreatRings />
          <SubscriberEngine data={data} />
          <HardwareSplit simulation={simulation} />
          <BrandHeatZones />
          <RecoveryActions selectedAction={selectedAction} setSelectedAction={setSelectedAction} setSimulation={setSimulation} />
          <Forecast data={data} simulation={simulation} />
          <BoardMemo selectedAction={selectedAction} data={data} />
          <Certification data={data} />
        </section>
      </section>
      <style>{css}</style>
    </main>
  );
}

function SignalTicker({ signals }) {
  return <div className="ticker">{signals.map((s) => <div className={`tick ${s.type}`} key={s.key}><strong>{s.key}</strong><span>{s.value > 0 && !s.suffix ? "+" : ""}{s.value}{s.suffix || ""}</span><small>{s.label}</small></div>)}</div>;
}

function Reactor({ data, simulation }) {
  return <section className="reactorPanel">
    <div className="ring r1" /><div className="ring r2" /><div className="ring r3" />
    <div className="particleField">{Array.from({ length: 42 }, (_, i) => <i key={i} style={{ '--i': i }} />)}</div>
    <div className="reactorCore">
      <p>PELOTON</p>
      <h2>Level {data.recoveryLevel}</h2>
      <span>Target Level 5</span>
      <b>{data.recoveryProbability}% recovery probability</b>
    </div>
    <div className="formulaStrip">BUY + TRUST = GAIN · REPAIR + RELEVANCE = GROWTH · RECENTRE = LEVEL 5</div>
    <div className="simMeter"><span style={{ width: `${20 + simulation * 13}%` }} /></div>
  </section>;
}

function CompanyDNA({ data }) {
  const strands = [["Trust", data.trust], ["Brand", 76], ["Product", 68], ["Price", 43], ["Community", 81], ["Competition", 52], ["Narrative", 69]];
  return <section className="panel dnaPanel"><Title kicker="01" title="Company DNA" />
    <div className="dna">
      {strands.map((s, i) => <div key={s[0]} className="gene"><span>{s[0]}</span><div><b style={{ width: `${s[1]}%` }} /></div><em>{s[1]}</em></div>)}
    </div>
  </section>;
}

function ExecutiveIntel({ selectedAction, data }) {
  return <section className="panel intelPanel"><Title kicker="AI" title="Executive Intelligence" />
    <div className="aiOrb">AI</div>
    <h3>Today's highest ROI action</h3>
    <h2>{selectedAction.name}</h2>
    <p>{selectedAction.detail}</p>
    <div className="impactStack"><span>{selectedAction.impact}</span><span>{data.confidence}% Confidence</span><span>-{data.drift} Drift</span></div>
  </section>;
}

function Thesis({ data }) {
  return <section className="panel wide"><Title kicker="02" title="Peloton Recovery Thesis" />
    <h2 className="thesis">Peloton should stop selling hardware as the hero and recenter around <span>habit, community, and instructor-led confidence</span>.</h2>
    <p className="copy">The recovery path is not simply cheaper bikes. It is restoring belief that Peloton is the most motivating fitness relationship in the home.</p>
    <div className="miniStats"><Metric label="Current Level" value={`L${data.recoveryLevel}`} /><Metric label="Target" value="L5" /><Metric label="Trust" value={data.trust} /><Metric label="Churn Pressure" value={`${data.churn}%`} /></div>
  </section>;
}

function ThreatRings() {
  return <section className="panel"><Title kicker="03" title="Competitor Threat Rings" />
    <div className="orbitBox"><div className="pelotonDot">P</div>{threats.map((t, i) => <div className={`threat t${i}`} key={t.name}><b>{t.name}</b><span>{t.pull}</span></div>)}</div>
  </section>;
}

function SubscriberEngine({ data }) {
  return <section className="panel"><Title kicker="04" title="Subscriber Confidence Engine" />
    {[['LOCK', 82], ['LEAK', data.churn], ['COMMUNITY', 76], ['PRICING TRUST', 47]].map(([l, v]) => <div className="confidenceRow" key={l}><span>{l}</span><div><b style={{ width: `${v}%` }} /></div><em>{v}{l === 'LEAK' ? '%' : ''}</em></div>)}
  </section>;
}

function HardwareSplit({ simulation }) {
  const hardware = clamp(42 + simulation * 4, 42, 66); const subscription = clamp(76 + simulation * 3, 76, 94);
  return <section className="panel"><Title kicker="05" title="Hardware vs Subscription Split" />
    <div className="split"><div><span>Hardware Friction</span><h2>{hardware}%</h2><p>Improving when price anxiety is reduced.</p></div><div><span>Subscription Strength</span><h2>{subscription}%</h2><p>Core recovery asset: habit, classes, community.</p></div></div>
  </section>;
}

function BrandHeatZones() {
  return <section className="panel"><Title kicker="06" title="Brand Heat Zones" />
    <div className="heat">{heatZones.map(([l, v]) => <div key={l} style={{ background: `linear-gradient(135deg, rgba(0,229,255,${v/150}), rgba(255,46,220,${(100-v)/130}))` }}><b>{v}</b><span>{l}</span></div>)}</div>
  </section>;
}

function RecoveryActions({ selectedAction, setSelectedAction, setSimulation }) {
  return <section className="panel wide"><Title kicker="07" title="Recovery Actions With Impact" />
    <div className="actionGrid">{actions.map((a) => <button key={a.name} onClick={() => { setSelectedAction(a); setSimulation((x) => clamp(x + 1, 0, 6)); }} className={selectedAction.name === a.name ? "action active" : "action"}><strong>{a.name}</strong><span>{a.impact}</span><small>{a.detail}</small></button>)}</div>
  </section>;
}

function Forecast({ data, simulation }) {
  const points = [8, 8, 7, 7, 6, 6, 5].slice(0, 4 + simulation);
  return <section className="panel"><Title kicker="08" title="90-Day Recovery Forecast" />
    <div className="horizon">{points.map((p, i) => <div key={i} className="mount" style={{ height: `${120 - p * 8}px` }}><span>L{p}</span></div>)}</div>
    <p className="copy">Projected route: Level {data.recoveryLevel} → Level 5 through subscriber confidence and lower hardware friction.</p>
  </section>;
}

function BoardMemo({ selectedAction, data }) {
  return <section className="panel"><Title kicker="09" title="AI Board Memo" />
    <p className="memo">Recommendation: prioritize <b>{selectedAction.name}</b>. This action has the strongest immediate effect on trust recovery, churn pressure, and brand coherence. The expected board-level outcome is a cleaner route from Level {data.recoveryLevel} to Level 5.</p>
    <button className="ghostBtn full">Generate Board Pack</button>
  </section>;
}

function Certification({ data }) {
  const checklist = [['Trust above 85', data.trust >= 85], ['Churn below 10%', data.churn <= 10], ['Recovery probability above 85%', data.recoveryProbability >= 85], ['Company Level 5', data.recoveryLevel <= 5]];
  return <section className="panel"><Title kicker="10" title="ReCentre Certification Path" />
    <div className="badge">LEVEL 5<br/><span>RECENTRED</span></div>
    {checklist.map(([t, ok]) => <div className="check" key={t}><b>{ok ? '✓' : '○'}</b><span>{t}</span></div>)}
  </section>;
}

function Title({ kicker, title }) { return <div className="title"><span>{kicker}</span><h3>{title}</h3></div>; }
function Metric({ label, value }) { return <div className="metric"><small>{label}</small><b>{value}</b></div>; }

const css = `
*{box-sizing:border-box}body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Arial;background:#02040b;color:#fff}.app{min-height:100vh;display:grid;grid-template-columns:92px 1fr;position:relative;overflow-x:hidden}.mesh{position:fixed;inset:0;background:linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(0deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:74px 74px;mask-image:radial-gradient(circle at 50% 20%,#000 0,transparent 72%);pointer-events:none}.ambient{position:fixed;border-radius:999px;filter:blur(70px);opacity:.55;pointer-events:none}.one{width:620px;height:620px;background:#00e5ff33;left:5%;top:-15%}.two{width:720px;height:720px;background:#ff2edc30;right:-10%;top:10%}.sideRail{border-right:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.035);backdrop-filter:blur(24px);padding:22px 14px;z-index:5}.brandMark{height:54px;width:54px;border-radius:20px;display:grid;place-items:center;font-size:28px;font-weight:1000;background:linear-gradient(135deg,#00e5ff55,#ff2edc44);box-shadow:0 0 45px #00e5ff44}nav{margin-top:34px;display:grid;gap:12px}.navItem{writing-mode:vertical-rl;min-height:82px;border:1px solid rgba(255,255,255,.08);border-radius:18px;background:rgba(255,255,255,.035);color:#ffffff99;font-weight:800}.navItem.active{color:white;border-color:#00e5ff66;background:#00e5ff18}.surface{z-index:2;padding:28px;max-width:1600px;width:100%;margin:0 auto}.topbar{display:flex;justify-content:space-between;gap:20px;align-items:center;margin-bottom:18px}.eyebrow{margin:0;color:#00e5ff;text-transform:uppercase;letter-spacing:.18em;font-size:12px;font-weight:900}.topbar h1{font-size:54px;line-height:.9;margin:6px 0 0;letter-spacing:-.06em}.topActions{display:flex;gap:10px;flex-wrap:wrap}.primaryBtn,.ghostBtn{border:1px solid rgba(0,229,255,.35);border-radius:999px;padding:12px 18px;color:white;font-weight:900;background:linear-gradient(135deg,#00e5ff33,#ff2edc22);box-shadow:0 0 35px #00e5ff22;cursor:pointer}.ghostBtn{background:rgba(255,255,255,.045);box-shadow:none}.full{width:100%;justify-content:center}.ticker{display:flex;gap:10px;overflow:auto;padding:12px;border:1px solid rgba(255,255,255,.08);border-radius:28px;background:rgba(255,255,255,.045);backdrop-filter:blur(22px);margin-bottom:18px}.tick{min-width:145px;padding:12px 14px;border-radius:20px;background:rgba(0,0,0,.28);border:1px solid rgba(255,255,255,.08)}.tick strong{display:block;font-size:13px;color:#fff}.tick span{font-size:22px;font-weight:1000}.tick small{display:block;color:#ffffff80}.tick.up span{color:#00e5ff}.tick.down span{color:#ff5edc}.heroGrid{display:grid;grid-template-columns:300px minmax(440px,1fr) 330px;gap:18px;margin-bottom:18px}.panel,.reactorPanel{position:relative;border:1px solid rgba(255,255,255,.09);border-radius:34px;background:linear-gradient(145deg,rgba(255,255,255,.075),rgba(255,255,255,.03));box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 28px 80px rgba(0,0,0,.35);backdrop-filter:blur(26px);padding:22px;overflow:hidden}.panel:before,.reactorPanel:before{content:"";position:absolute;inset:-1px;background:radial-gradient(circle at 15% 0,#00e5ff22,transparent 36%),radial-gradient(circle at 85% 20%,#ff2edc18,transparent 34%);pointer-events:none}.title{position:relative;display:flex;align-items:center;gap:12px;margin-bottom:18px}.title span{height:34px;width:34px;border-radius:13px;display:grid;place-items:center;color:#00e5ff;font-weight:1000;background:#00e5ff16;border:1px solid #00e5ff33}.title h3{margin:0;font-size:16px}.reactorPanel{min-height:560px;display:grid;place-items:center}.ring{position:absolute;border-radius:50%;border:1px solid #00e5ff33;box-shadow:0 0 55px #00e5ff1f}.r1{width:520px;height:520px;animation:spin 28s linear infinite}.r2{width:390px;height:390px;border-color:#ff2edc33;animation:spin 18s linear reverse infinite}.r3{width:270px;height:270px;border-style:dashed;animation:spin 12s linear infinite}.reactorCore{position:relative;width:220px;height:220px;border-radius:50%;display:grid;place-items:center;text-align:center;background:radial-gradient(circle,#00e5ff33,#02040b 68%);border:1px solid #00e5ff77;box-shadow:0 0 100px #00e5ff55}.reactorCore p,.reactorCore h2,.reactorCore span,.reactorCore b{margin:0;display:block}.reactorCore p{font-size:13px;letter-spacing:.2em;color:#00e5ff}.reactorCore h2{font-size:48px;letter-spacing:-.06em}.reactorCore span{color:#ffffff99}.reactorCore b{color:#fff;font-size:12px}.particleField i{position:absolute;width:3px;height:3px;border-radius:50%;background:#00e5ff;left:50%;top:50%;animation:particle 4s linear infinite;animation-delay:calc(var(--i)*-.09s);transform:rotate(calc(var(--i)*19deg)) translateX(260px)}.formulaStrip{position:absolute;bottom:42px;left:32px;right:32px;text-align:center;color:#ffffff88;font-size:12px;letter-spacing:.08em}.simMeter{position:absolute;left:70px;right:70px;bottom:24px;height:7px;border-radius:99px;background:#ffffff12;overflow:hidden}.simMeter span{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,#00e5ff,#ff2edc)}.gene,.confidenceRow{position:relative;display:grid;grid-template-columns:90px 1fr 35px;align-items:center;gap:10px;margin:14px 0;color:#ffffffb5}.gene div,.confidenceRow div{height:9px;border-radius:99px;background:#ffffff12;overflow:hidden}.gene b,.confidenceRow b{display:block;height:100%;border-radius:inherit;background:linear-gradient(90deg,#00e5ff,#ff2edc)}.aiOrb{height:86px;width:86px;border-radius:32px;display:grid;place-items:center;font-weight:1000;font-size:28px;background:linear-gradient(135deg,#00e5ff44,#ff2edc33);border:1px solid #00e5ff55;box-shadow:0 0 60px #00e5ff44}.intelPanel h3{color:#ffffff88}.intelPanel h2{font-size:28px;letter-spacing:-.04em}.intelPanel p,.copy,.memo{color:#ffffffaa;line-height:1.6}.impactStack{display:grid;gap:8px}.impactStack span{padding:10px 12px;border-radius:16px;background:#ffffff0b;border:1px solid #ffffff12}.moduleGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.wide{grid-column:span 2}.thesis{font-size:32px;line-height:1.08;letter-spacing:-.05em}.thesis span{color:#00e5ff}.miniStats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.metric{padding:14px;border-radius:18px;background:#0000003b;border:1px solid #ffffff14}.metric small{display:block;color:#ffffff75}.metric b{font-size:24px}.orbitBox{height:310px;position:relative;border-radius:28px;border:1px solid #ffffff10;background:radial-gradient(circle at 50% 50%,#00e5ff22,transparent 22%),#0000002e}.pelotonDot{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);height:70px;width:70px;border-radius:50%;display:grid;place-items:center;background:#00e5ff22;border:1px solid #00e5ff66;font-size:32px;font-weight:1000}.threat{position:absolute;border:1px solid #ff2edc44;background:#ff2edc14;border-radius:18px;padding:10px;min-width:92px}.threat b{display:block;font-size:11px}.threat span{color:#ff8ee8;font-weight:1000}.t0{left:9%;top:16%}.t1{right:12%;top:18%}.t2{left:12%;bottom:14%}.t3{right:9%;bottom:15%}.t4{left:39%;top:7%}.split{display:grid;grid-template-columns:1fr 1fr;gap:12px}.split div{padding:18px;border-radius:24px;background:#00000030;border:1px solid #ffffff12}.split h2{font-size:42px;margin:8px 0}.heat{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.heat div{min-height:95px;border-radius:24px;padding:18px;border:1px solid #ffffff16}.heat b{font-size:30px}.heat span{display:block;color:#ffffffb0}.actionGrid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}.action{text-align:left;border:1px solid #ffffff12;background:#ffffff08;color:white;border-radius:22px;padding:15px;cursor:pointer}.action.active{border-color:#00e5ff77;background:#00e5ff18;box-shadow:0 0 40px #00e5ff22}.action strong,.action span,.action small{display:block}.action span{margin:8px 0;color:#00e5ff;font-weight:1000}.action small{color:#ffffff88;line-height:1.4}.horizon{height:190px;border-radius:28px;border:1px solid #ffffff10;background:linear-gradient(180deg,transparent,#00e5ff10);display:flex;align-items:flex-end;gap:10px;padding:18px}.mount{flex:1;min-height:50px;border-radius:20px 20px 8px 8px;background:linear-gradient(180deg,#00e5ff,#ff2edc);display:flex;align-items:flex-start;justify-content:center;padding-top:8px;font-weight:1000}.badge{margin:auto auto 16px;width:150px;height:150px;border-radius:44px;display:grid;place-items:center;text-align:center;font-weight:1000;background:linear-gradient(135deg,#00e5ff28,#ff2edc22);border:1px solid #00e5ff55;box-shadow:0 0 60px #00e5ff33}.badge span{color:#00e5ff}.check{display:flex;gap:10px;align-items:center;margin:10px 0;padding:10px;border-radius:16px;background:#ffffff08}.check b{color:#00e5ff}@keyframes spin{to{transform:rotate(360deg)}}@keyframes particle{from{opacity:0;transform:rotate(calc(var(--i)*19deg)) translateX(300px) scale(.5)}50%{opacity:1}to{opacity:0;transform:rotate(calc(var(--i)*19deg + 90deg)) translateX(70px) scale(1.2)}}.boardroom .ambient,.boardroom .mesh,.boardroom .particleField{display:none}.boardroom .panel,.boardroom .reactorPanel{background:#0b1020;box-shadow:none}@media(max-width:1180px){.heroGrid,.moduleGrid{grid-template-columns:1fr}.wide{grid-column:auto}.actionGrid{grid-template-columns:1fr 1fr}.sideRail{display:none}.app{grid-template-columns:1fr}.topbar{display:block}.topActions{margin-top:18px}.miniStats{grid-template-columns:1fr 1fr}}@media(max-width:640px){.surface{padding:16px}.topbar h1{font-size:42px}.actionGrid,.split,.heat{grid-template-columns:1fr}.reactorPanel{min-height:470px}.ring.r1{width:390px;height:390px}.ring.r2{width:300px;height:300px}.ticker{border-radius:22px}.tick{min-width:128px}}
`;
