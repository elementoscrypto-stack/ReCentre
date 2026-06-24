import React, { useMemo, useState } from "react";

const TELEMETRY = [
  { key: "BUY", value: 12, meaning: "Confidence entering the system", type: "good" },
  { key: "SELL", value: -4, meaning: "Confidence leaving the system", type: "bad" },
  { key: "DEAL", value: 7, meaning: "New relationship formed", type: "good" },
  { key: "GAIN", value: 8, meaning: "Trust increasing", type: "good" },
  { key: "LOSS", value: -2, meaning: "Trust decreasing", type: "bad" },
  { key: "DRIFT", value: 18, meaning: "Movement away from market alignment", type: "warn" },
  { key: "CENTRE", value: 82, meaning: "Movement toward alignment", type: "good" },
  { key: "BATTLE", value: 1, meaning: "Territory challenged", type: "bad", display: "Active" },
  { key: "LOT", value: 5, meaning: "Resource allocation", type: "warn" },
  { key: "BILL", value: 1.2, meaning: "Recovery cost exposure", type: "warn", display: "$1.2M" },
  { key: "WIN", value: 9, meaning: "Trust captured", type: "good" },
  { key: "CHANGE", value: 4, meaning: "Position changing", type: "good" },
];

const companies = [
  { name: "Nokia", level: 10, delta: -5, status: "Recovery" },
  { name: "Peloton", level: 9, delta: -3, status: "Drifting" },
  { name: "BlackBerry", level: 12, delta: -7, status: "Critical" },
  { name: "WeWork", level: 13, delta: -8, status: "Collapse" },
  { name: "Juicero", level: 14, delta: -9, status: "Failure" },
];

const formulaRows = [
  ["BUY", "TRUST", "GAIN"],
  ["SELL", "TRUST", "LOSS"],
  ["DRIFT", "PRESSURE", "RISK"],
  ["CENTRE", "CLARITY", "STABILITY"],
  ["BUILD", "TRUST", "VALUE"],
  ["REPAIR", "RELEVANCE", "GROWTH"],
  ["ALIGN", "VALUE", "RECENTRE"],
];

const nav = ["Command Centre", "Companies", "Trust Engine", "Telemetry", "Strategy Lab", "Recovery Simulator", "NOR / SOR Map", "Reports", "Boardroom", "Investor Mode", "Agency Mode", "Settings"];

export default function App() {
  const [active, setActive] = useState("Command Centre");
  const [company, setCompany] = useState("Peloton");
  const [currentLevel, setCurrentLevel] = useState(10);
  const [simRunning, setSimRunning] = useState(false);
  const [visualMode, setVisualMode] = useState("Insane Visual Mode");

  const score = useMemo(() => {
    const levelShift = currentLevel - 5;
    return {
      trust: Math.max(55, 84 - levelShift * 2),
      confidence: Math.max(45, 78 - levelShift * 2),
      drift: Math.min(42, 8 + levelShift * 5),
      alignment: Math.min(90, 55 + (10 - currentLevel) * 4 + (currentLevel <= 5 ? 20 : 0)),
      momentum: Math.max(46, 72 - levelShift),
      risk: Math.max(12, currentLevel * 3 + 2),
      progress: Math.max(25, Math.round(((15 - currentLevel) / 10) * 100)),
    };
  }, [currentLevel]);

  function runSimulation() {
    setSimRunning(true);
    let step = currentLevel;
    const timer = setInterval(() => {
      step = Math.max(5, step - 1);
      setCurrentLevel(step);
      if (step === 5) {
        clearInterval(timer);
        setSimRunning(false);
      }
    }, 520);
  }

  function resetCrisis() {
    setCurrentLevel(10);
    setSimRunning(false);
  }

  return (
    <main className={`app ${visualMode === "Boardroom Mode" ? "boardroom" : ""}`}>
      <aside className="sidebar">
        <div className="brand">
          <div className="logoCube">◇</div>
          <div className="brandText">RECENTRE</div>
        </div>

        <div className="navList">
          {nav.map((item) => (
            <button key={item} onClick={() => setActive(item)} className={`navItem ${active === item ? "active" : ""}`}>
              <span className="navIcon">{iconFor(item)}</span>
              <span>{item}</span>
              {item === "Telemetry" && <em>LIVE</em>}
            </button>
          ))}
        </div>

        <div className="copilotCard">
          <div className="miniReactor"><span /></div>
          <b>AI Copilot</b>
          <small>Online</small>
          <p>“We don’t fix symptoms. We restore your position in the market.”</p>
          <button>Chat with Copilot</button>
        </div>
      </aside>

      <section className="shell">
        <header className="topbar">
          <div className="badge"><span>✺</span><b>THE WORLD’S FIRST</b><small>BUSINESS RECOVERY OS</small></div>
          <div className="search"><input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Search companies, sectors, or categories..." /><span>⌘K</span></div>
          <div className="topActions">
            <button>⌁</button><button>▣</button><button className="notify">◌<i>12</i></button>
            <select value={visualMode} onChange={(e) => setVisualMode(e.target.value)}>
              <option>Insane Visual Mode</option>
              <option>Boardroom Mode</option>
            </select>
          </div>
        </header>

        <div className="dashboard">
          <section className="heroPanel panel">
            <div className="heroCopy">
              <h1>When companies <span>lose their centre,</span><br />we <strong>ReCentre</strong> them.</h1>
              <p>The AI-powered recovery engine that diagnoses why companies decline, finds their true category nuance, and guides them back to Level 5.</p>
              <div className="heroButtons"><button className="primary" onClick={resetCrisis}>RUN SCAN <b>→</b></button><button>OPEN LAB ↗</button></div>
            </div>
            <RecoveryTower currentLevel={currentLevel} />
          </section>

          <section className="rightTop">
            <DeltaImpact />
            <CategoryNuance />
            <ResultShift currentLevel={currentLevel} />
          </section>

          <section className="metrics panel">
            <h3>LIVE TELEMETRY SIGNALS</h3><small>Real-time company vitals</small>
            <div className="rings">
              <MetricRing label="TRUST" value={score.trust} delta="+8" good />
              <MetricRing label="CONFIDENCE" value={score.confidence} delta="+6" good />
              <MetricRing label="DRIFT" value={score.drift} delta="+5" warn />
              <MetricRing label="ALIGNMENT" value={score.alignment} delta="+9" good />
              <MetricRing label="MOMENTUM" value={score.momentum} delta="+4" good />
              <MetricRing label="RISK" value={score.risk} delta="-3" bad />
              <MetricRing label="PROGRESS" value={score.progress} delta="" good suffix="%" />
            </div>
          </section>

          <section className="chartPanel panel"><TrustDriftGraph /></section>
          <section className="heatPanel panel"><Heatmap /></section>
          <section className="simPanel panel"><RecoverySimulator currentLevel={currentLevel} runSimulation={runSimulation} simRunning={simRunning} /></section>
          <section className="aiPanel panel"><AICopilot /></section>

          <section className="dictionary panel">
            <h3>RECENTRE TELEMETRY DICTIONARY <small>(LIVE SIGNALS)</small></h3>
            <div className="signalStrip">
              {TELEMETRY.map((t) => <Signal key={t.key} {...t} />)}
            </div>
          </section>

          <section className="companies panel"><RecentCompanies /></section>
          <section className="norSor panel"><NorSorBalance /></section>
          <section className="formula panel"><FormulaLanguage /></section>
          <section className="signalDash panel"><SignalDashboard currentLevel={currentLevel} /></section>
        </div>
      </section>

      <style>{css}</style>
    </main>
  );
}

function iconFor(item) {
  const m = { "Command Centre": "⌂", Companies: "▤", "Trust Engine": "◎", Telemetry: "◴", "Strategy Lab": "⌬", "Recovery Simulator": "♙", "NOR / SOR Map": "◈", Reports: "☷", Boardroom: "▥", "Investor Mode": "◍", "Agency Mode": "♧", Settings: "⚙" };
  return m[item] || "◇";
}

function RecoveryTower({ currentLevel }) {
  const levels = [15, 12, 10, 7, 5];
  const labels = {15: "EXTINCTION", 12: "DANGER", 10: "INSTABILITY", 7: "RECOVERY", 5: "RECENTRED"};
  return <div className="towerWrap">
    <div className="vortex" />
    <div className="tower">
      {levels.map((l) => <div key={l} className={`towerLevel ${l === currentLevel ? "current" : ""} ${l <= 7 ? "cool" : "hot"}`}>
        <small>LEVEL</small><b>{l}</b><span>{labels[l]}</span>
      </div>)}
      <div className="portal"><div className="person" /></div>
    </div>
  </div>;
}

function DeltaImpact() {
  const rows = [["Trust", "+23"], ["Sentiment", "+18"], ["Relevance", "+21"], ["Revenue", "+12"], ["Audience Fit", "+19"]];
  return <div className="panel smallPanel"><h3>DELTA IMPACT <small>(Live)</small></h3>{rows.map(r => <div className="deltaRow" key={r[0]}><span>{r[0]}</span><b>{r[1]} ↗</b></div>)}</div>;
}
function CategoryNuance() { return <div className="panel smallPanel nuance"><h3>CATEGORY NUANCE</h3><small>Selected Nuance</small><h2>Confidence<br />Commerce</h2><p>A new way to deliver confidence at scale.</p><div className="wireOrb" /></div>; }
function ResultShift({ currentLevel }) { return <div className="panel smallPanel result"><h3>RESULT LEVEL SHIFT</h3><div><b>{currentLevel}</b><span>→</span><strong>5</strong></div><p>LEVELS IMPROVED</p><h2>-{Math.max(0, currentLevel - 5)}</h2><button>VIEW RECOVERY PATH</button></div>; }

function MetricRing({ label, value, delta, good, bad, warn, suffix = "" }) {
  const color = good ? "#22f2ee" : bad ? "#ff4b82" : warn ? "#bd4dff" : "#fff";
  return <div className="metricRing" style={{ "--v": `${value * 3.6}deg`, "--c": color }}><div className="ringInner"><b>{value}{suffix}</b>{delta && <span>{delta}</span>}</div><small>{label}</small></div>;
}

function TrustDriftGraph() {
  const points = "5,35 28,55 55,70 88,82 120,95 150,70 180,48 210,35 240,24 270,14 300,5";
  return <><h3>TRUST DRIFT OVER TIME</h3><svg viewBox="0 0 320 130" className="lineChart"><defs><linearGradient id="lineG" x1="0" x2="1"><stop stopColor="#ff4b82"/><stop offset="1" stopColor="#22f2ee"/></linearGradient></defs>{[20,50,80,110].map(y=><line key={y} x1="0" x2="320" y1={y} y2={y}/>) }<polyline points={points} fill="none" stroke="url(#lineG)" strokeWidth="4"/><circle cx="120" cy="95" r="4" fill="#ff4b82"/><circle cx="300" cy="5" r="4" fill="#22f2ee"/><text x="118" y="82">RECENTRE INITIATED</text></svg></>;
}
function Heatmap() {
  const rows = ["Customers", "Investors", "Employees", "Partners", "Media"];
  return <><h3>MARKET CONFIDENCE HEATMAP</h3><div className="heatRows">{rows.map((r,i)=><div className="heatRow" key={r}><span>{r}</span>{[0,1,2,3,4,5].map((_,j)=><i key={j} className={j<3?`hot h${i}`:`cool c${j}`} />)}</div>)}</div><div className="scale"><span>Low Trust</span><b/><span>High Trust</span></div></>;
}
function RecoverySimulator({ currentLevel, runSimulation, simRunning }) {
  return <><h3>RECOVERY SIMULATOR</h3><div className="simGrid"><div><small>Current Level</small><b>{currentLevel}</b></div><div><small>Target Level</small><strong>5</strong></div><svg viewBox="0 0 260 80"><polyline points="10,12 55,23 98,35 142,47 188,61 235,72"/><circle cx="10" cy="12" r="6"/><circle cx="55" cy="23" r="6"/><circle cx="98" cy="35" r="6"/><circle cx="142" cy="47" r="6"/><circle cx="188" cy="61" r="6"/><circle cx="235" cy="72" r="6"/></svg></div><button onClick={runSimulation} disabled={simRunning}>{simRunning ? "SIMULATING..." : "RUN SIMULATION"}</button></>;
}
function AICopilot() { return <><h3>AI STRATEGY COPILOT</h3><div className="chatQ">How do we reach Level 5?</div><div className="chatA"><div className="miniReactor"><span /></div><p>Focus on category clarity, trust rebuild, offer urgency, and audience reconnection. I’ve created a 30/60/90 day plan for you.</p></div><button>VIEW RECOVERY PLAN</button></>; }
function Signal({ key: k, value, meaning, type, display }) { return <div className={`signal ${type}`} title={meaning}><span>{k}</span><b>{display || `${value > 0 ? "+" : ""}${value}`}</b><small>{meaning}</small></div>; }
function RecentCompanies() { return <><h3>RECENT COMPANIES <small>View all →</small></h3>{companies.map(c=><div className="companyRow" key={c.name}><span>{c.name}</span><em>Level {c.level}</em><b>{c.delta}</b><strong>{c.status}</strong></div>)}</>; }
function NorSorBalance() { return <><h3>NOR / SOR BALANCE</h3><div className="balance"><div><h2>NOR</h2><p>ORDER</p><span>Aligned<br/>Trusted<br/>Stable<br/>Growing</span><b>68%</b></div><div className="radar"><i /></div><div><h2 className="sor">SOR</h2><p>CHAOS</p><span>Drifting<br/>Confused<br/>Risk<br/>Unstable</span><b className="sor">32%</b></div></div></>; }
function FormulaLanguage() { return <><h3>RECENTRE FORMULA LANGUAGE</h3>{formulaRows.map(r=><div className="formulaRow" key={r.join("")}><span>{r[0]}</span><em>+</em><span>{r[1]}</span><em>=</em><b>{r[2]}</b></div>)}</>; }
function SignalDashboard({ currentLevel }) { return <><h3>RECENTRE SIGNAL DASHBOARD</h3><div className="dashGrid"><div><p><b>BUY</b><span>+12</span></p><p><b>SELL</b><span>-4</span></p><p><b>GAIN</b><span>+8</span></p><p><b>LOSS</b><span>-2</span></p><p><b>TRUST</b><span>74</span></p><p><b>DOUBT</b><span>26</span></p></div><div><p><b>ALIGN</b><span>68</span></p><p><b>SKEW</b><span>32</span></p><p><b>DRIFT</b><span>18</span></p><p><b>CENTRE</b><span>82</span></p><div className="levelBox"><span>LEVEL</span><b>{currentLevel}</b><span>TARGET</span><b>5</b></div></div><div className="targetRadar" /></div><footer>● STATUS: RECOVERY IN PROGRESS</footer></>; }

const css = `
*{box-sizing:border-box}body{margin:0;background:#030813;color:#eaf8ff;font-family:Inter,ui-sans-serif,system-ui,Segoe UI,Arial,sans-serif}.app{min-height:100vh;display:flex;background:radial-gradient(circle at 55% 0%,rgba(255,44,129,.18),transparent 24%),radial-gradient(circle at 75% 42%,rgba(34,242,238,.12),transparent 25%),#030813;overflow:hidden}.app:before{content:"";position:fixed;inset:0;background:linear-gradient(rgba(255,255,255,.026) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.026) 1px,transparent 1px);background-size:44px 44px;mask-image:linear-gradient(to bottom,#000,transparent 95%);pointer-events:none}.sidebar{width:260px;padding:22px 16px;border-right:1px solid rgba(34,242,238,.18);background:rgba(0,5,14,.72);backdrop-filter:blur(20px);display:flex;flex-direction:column;gap:22px}.brand{display:flex;align-items:center;gap:12px}.logoCube{height:40px;width:40px;display:grid;place-items:center;border:1px solid #ff4b82;border-radius:10px;background:linear-gradient(135deg,rgba(255,75,130,.28),rgba(34,242,238,.12));box-shadow:0 0 28px rgba(255,75,130,.42);font-size:26px}.brandText{font-size:24px;font-weight:900;letter-spacing:.08em}.navList{display:grid;gap:8px}.navItem{height:48px;border:1px solid transparent;background:transparent;color:rgba(234,248,255,.7);border-radius:12px;text-align:left;padding:0 14px;display:flex;align-items:center;gap:12px;cursor:pointer}.navItem:hover,.navItem.active{border-color:rgba(255,75,130,.45);background:linear-gradient(90deg,rgba(255,75,130,.22),rgba(34,242,238,.04));color:#fff;box-shadow:0 0 24px rgba(255,75,130,.16)}.navIcon{width:22px;font-size:18px}.navItem em{margin-left:auto;color:#ff4b82;border:1px solid rgba(255,75,130,.5);border-radius:6px;padding:2px 6px;font-size:10px}.copilotCard{margin-top:auto;border:1px solid rgba(34,242,238,.25);border-radius:16px;padding:16px;background:radial-gradient(circle at 80% 40%,rgba(255,75,130,.25),transparent 32%),rgba(10,22,38,.74)}.copilotCard small{display:block;color:#21f2ee}.copilotCard p{font-size:12px;color:rgba(234,248,255,.7)}button{font:inherit;color:inherit}.copilotCard button,.primary,.simPanel button,.aiPanel button,.result button{width:100%;height:40px;border:1px solid #22f2ee;border-radius:8px;background:linear-gradient(90deg,rgba(34,242,238,.18),rgba(34,242,238,.04));color:#9fffff;cursor:pointer}.shell{flex:1;padding:20px 28px;min-width:0}.topbar{height:58px;display:grid;grid-template-columns:280px 1fr 430px;gap:22px;align-items:center;margin-bottom:18px}.badge{height:54px;border:1px solid rgba(34,242,238,.35);border-radius:12px;background:rgba(8,23,38,.72);display:flex;align-items:center;gap:12px;padding:0 16px}.badge span{font-size:24px;color:#22f2ee}.badge b{display:block;color:#22f2ee;font-size:14px}.badge small{display:block;color:#fff;font-size:12px}.search{height:46px;border:1px solid rgba(130,170,210,.28);border-radius:12px;background:rgba(5,13,25,.8);display:flex;align-items:center;padding:0 16px}.search input{flex:1;background:transparent;border:0;outline:0;color:#fff;font-size:14px}.search span{color:rgba(255,255,255,.45)}.topActions{display:flex;justify-content:flex-end;gap:10px}.topActions button,.topActions select{height:46px;border:1px solid rgba(130,170,210,.28);border-radius:12px;background:rgba(5,13,25,.78);color:#d9f7ff;padding:0 14px}.notify{position:relative}.notify i{position:absolute;right:-6px;top:-8px;background:#ff2d7a;border-radius:999px;padding:2px 6px;font-size:11px}.dashboard{display:grid;grid-template-columns:1.65fr .7fr .65fr .7fr;grid-template-areas:"hero hero right right" "metrics metrics chart heat" "dict dict sim ai" "companies balance formula signal";gap:14px}.panel{border:1px solid rgba(34,242,238,.22);border-radius:14px;background:linear-gradient(180deg,rgba(10,25,42,.78),rgba(4,12,24,.72));box-shadow:inset 0 0 0 1px rgba(255,255,255,.03),0 20px 60px rgba(0,0,0,.28);backdrop-filter:blur(16px);padding:16px;position:relative;overflow:hidden}.panel h3{margin:0 0 10px;font-size:14px;font-weight:700;letter-spacing:.04em;color:#d8f8ff}.panel small{color:rgba(234,248,255,.55)}.heroPanel{grid-area:hero;height:520px;padding:32px;background:radial-gradient(circle at 58% 10%,rgba(255,75,130,.32),transparent 22%),radial-gradient(circle at 70% 75%,rgba(34,242,238,.32),transparent 20%),linear-gradient(90deg,rgba(5,14,26,.95),rgba(6,16,29,.72));display:grid;grid-template-columns:.9fr 1.1fr}.heroCopy h1{font-size:44px;line-height:1.08;margin:0 0 18px}.heroCopy h1 span{color:#ff4b82}.heroCopy h1 strong{color:#22f2ee}.heroCopy p{max-width:470px;color:rgba(234,248,255,.75);line-height:1.55}.heroButtons{display:flex;gap:14px;margin-top:26px}.heroButtons button{height:48px;border-radius:10px;border:1px solid rgba(130,170,210,.25);background:rgba(5,13,25,.65);padding:0 28px;cursor:pointer}.heroButtons .primary{background:linear-gradient(90deg,#ff2b78,rgba(255,75,130,.42));box-shadow:0 0 32px rgba(255,75,130,.48);border-color:#ff7aa8}.towerWrap{position:relative;height:100%;display:grid;place-items:center}.vortex{position:absolute;top:-80px;width:420px;height:170px;border-radius:50%;background:radial-gradient(ellipse at center,rgba(255,75,130,.52),rgba(255,75,130,.08) 42%,transparent 70%);filter:blur(1px);animation:pulse 2.6s infinite}.tower{height:430px;width:330px;clip-path:polygon(50% 0,78% 16%,94% 100%,6% 100%,22% 16%);background:linear-gradient(90deg,rgba(255,75,130,.32),rgba(8,18,30,.92) 38%,rgba(34,242,238,.32));border:1px solid rgba(34,242,238,.35);box-shadow:0 0 70px rgba(34,242,238,.2);padding:50px 54px 0;display:flex;flex-direction:column;align-items:center;gap:12px}.towerLevel{width:180px;text-align:center;border:1px solid rgba(255,255,255,.14);background:rgba(0,0,0,.35);padding:8px;border-radius:8px}.towerLevel b{font-size:34px;display:block}.towerLevel.hot b{color:#ff4b82}.towerLevel.cool b{color:#5fffff}.towerLevel span{font-size:11px}.towerLevel.current{box-shadow:0 0 28px rgba(255,255,255,.25);transform:scale(1.05)}.portal{margin-top:auto;margin-bottom:20px;width:110px;height:110px;border-radius:50%;background:radial-gradient(circle,#eaffff,#22f2ee 25%,rgba(34,242,238,.12) 58%,transparent 70%);display:grid;place-items:center;box-shadow:0 0 80px rgba(34,242,238,.75)}.person{width:12px;height:42px;background:#04101a;border-radius:8px 8px 2px 2px}.rightTop{grid-area:right;display:grid;grid-template-columns:1fr 1.05fr 1fr;gap:14px}.smallPanel{min-height:150px}.deltaRow{display:flex;justify-content:space-between;border-top:1px solid rgba(255,255,255,.08);padding:9px 0;font-size:13px}.deltaRow b{color:#22f2aa}.nuance h2{color:#22f2ee;margin:12px 0 8px;font-size:25px}.wireOrb,.targetRadar{position:absolute;right:15px;bottom:15px;width:92px;height:92px;border-radius:50%;border:1px solid rgba(34,242,238,.5);background:repeating-radial-gradient(circle,rgba(34,242,238,.18) 0 2px,transparent 2px 16px),repeating-conic-gradient(rgba(34,242,238,.32) 0 8deg,transparent 8deg 24deg);box-shadow:0 0 30px rgba(34,242,238,.2)}.result div{display:flex;align-items:center;gap:24px}.result b,.result strong{font-size:48px}.result b{color:#ff4b82}.result strong{color:#5fffff}.result h2{color:#22f2ee;margin:0 0 12px}.metrics{grid-area:metrics}.rings{display:grid;grid-template-columns:repeat(7,1fr);gap:12px;margin-top:12px}.metricRing{text-align:center}.metricRing:before{content:"";display:block;width:78px;height:78px;margin:auto;border-radius:50%;background:conic-gradient(var(--c) var(--v),rgba(255,255,255,.08) 0);box-shadow:0 0 26px color-mix(in srgb,var(--c),transparent 65%)}.ringInner{margin-top:-62px;height:62px;display:flex;flex-direction:column;align-items:center;justify-content:center}.ringInner b{font-size:24px}.ringInner span{font-size:12px;color:var(--c)}.metricRing small{display:block;margin-top:12px;font-size:11px}.chartPanel{grid-area:chart}.heatPanel{grid-area:heat}.lineChart{width:100%;height:140px}.lineChart line{stroke:rgba(255,255,255,.08)}.lineChart text{font-size:9px;fill:#cfefff}.heatRows{display:grid;gap:8px}.heatRow{display:grid;grid-template-columns:95px repeat(6,1fr);gap:7px;align-items:center;font-size:12px}.heatRow i{height:20px;border-radius:2px}.hot{background:rgba(255,75,130,.45)}.cool{background:rgba(34,242,238,.45)}.h1,.h2{background:rgba(255,75,130,.7)}.c4,.c5{background:rgba(34,242,238,.7)}.scale{display:flex;align-items:center;gap:10px;margin-top:14px;font-size:11px}.scale b{height:3px;flex:1;background:linear-gradient(90deg,#ff4b82,#22f2ee)}.simPanel{grid-area:sim}.simGrid{display:grid;grid-template-columns:70px 70px 1fr;gap:12px;align-items:center}.simGrid b,.simGrid strong{display:block;border:1px solid currentColor;border-radius:8px;text-align:center;font-size:30px;padding:8px;color:#ff4b82}.simGrid strong{color:#22f2ee}.simGrid svg{width:100%;height:80px}.simGrid polyline{fill:none;stroke:#ff79b0;stroke-width:2}.simGrid circle{fill:#0d1220;stroke:#ff79b0;stroke-width:3}.simPanel button{margin-top:12px}.aiPanel{grid-area:ai}.chatQ{margin-left:auto;background:rgba(150,190,220,.14);border-radius:8px;padding:12px;max-width:230px;font-size:12px}.chatA{display:flex;gap:12px;align-items:center;margin:16px 0}.chatA p{background:rgba(150,190,220,.14);border-radius:8px;padding:14px;font-size:13px;color:rgba(234,248,255,.75)}.miniReactor{width:54px;height:54px;border-radius:50%;background:radial-gradient(circle,#eaffff,#22f2ee 10%,rgba(34,242,238,.12) 42%,transparent 70%);display:grid;place-items:center;box-shadow:0 0 25px rgba(34,242,238,.45);flex:0 0 auto}.miniReactor span{width:20px;height:20px;border-radius:50%;border:1px solid #22f2ee}.dictionary{grid-area:dict}.dictionary h3{display:flex;justify-content:space-between}.signalStrip{display:grid;grid-template-columns:repeat(12,minmax(86px,1fr));gap:8px;overflow:auto}.signal{border:1px solid rgba(255,255,255,.12);border-radius:12px;background:rgba(0,0,0,.22);padding:10px;min-width:86px}.signal span{display:block;font-size:11px;color:#22f2ee}.signal b{font-size:18px}.signal small{display:none}.signal.bad span,.signal.bad b{color:#ff4b82}.signal.warn span,.signal.warn b{color:#f5a142}.companies{grid-area:companies}.companyRow{display:grid;grid-template-columns:1fr 70px 40px 80px;gap:8px;border-top:1px solid rgba(255,255,255,.08);padding:10px 0;font-size:13px}.companyRow b{color:#22f2ee}.companyRow strong{color:#ff4b82;font-weight:500}.norSor{grid-area:balance}.balance{display:grid;grid-template-columns:1fr 160px 1fr;align-items:center}.balance h2{color:#22f2ee;margin:0}.balance h2.sor,.balance b.sor{color:#ff4b82}.balance span{display:block;color:rgba(234,248,255,.65);line-height:1.7}.balance b{font-size:30px;color:#22f2ee}.radar{height:160px;border-radius:50%;background:repeating-radial-gradient(circle,rgba(255,255,255,.12) 0 1px,transparent 1px 20px),conic-gradient(from 20deg,rgba(34,242,238,.45),rgba(255,75,130,.5),rgba(34,242,238,.45));mask:radial-gradient(circle,transparent 0 12px,#000 13px);animation:spin 18s linear infinite}.formula{grid-area:formula}.formulaRow{display:grid;grid-template-columns:80px 20px 90px 20px 1fr;border-top:1px solid rgba(255,255,255,.08);padding:9px 0;font-size:13px}.formulaRow span{color:#22f2ee}.formulaRow b{color:#ff4b82}.signalDash{grid-area:signal}.dashGrid{display:grid;grid-template-columns:1fr 1fr 130px;gap:14px}.dashGrid p{display:flex;justify-content:space-between;margin:7px 0}.dashGrid b{color:#22f2ee}.dashGrid span{color:#fff}.levelBox{border:1px solid rgba(255,75,130,.4);border-radius:10px;padding:10px;display:grid;grid-template-columns:1fr 1fr}.signalDash footer{margin-top:12px;background:rgba(34,242,170,.1);color:#22f2aa;border-radius:999px;padding:8px 12px;font-size:12px}.boardroom{background:#07111d}.boardroom .vortex,.boardroom .towerWrap:before{display:none}.boardroom .panel{box-shadow:none;background:rgba(9,19,32,.9)}@keyframes pulse{50%{transform:scale(1.08);opacity:.65}}@keyframes spin{to{transform:rotate(360deg)}}@media(max-width:1200px){.sidebar{display:none}.topbar{grid-template-columns:1fr}.badge,.topActions{display:none}.dashboard{grid-template-columns:1fr;grid-template-areas:"hero" "right" "metrics" "chart" "heat" "sim" "ai" "dict" "companies" "balance" "formula" "signal"}.heroPanel{height:auto;grid-template-columns:1fr}.rightTop{grid-template-columns:1fr}.rings{grid-template-columns:repeat(2,1fr)}.signalStrip{grid-template-columns:repeat(2,1fr)}}
`;
