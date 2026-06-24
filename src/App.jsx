import React, { useMemo, useState } from 'react';

const companies = {
  Peloton: { sector: 'Consumer Fitness Technology', level: 10, trust: 74, confidence: 68, drift: 18, alignment: 82, momentum: 61, risk: 32, category: 'Confidence Commerce' },
  Nokia: { sector: 'Network Infrastructure', level: 8, trust: 81, confidence: 72, drift: 14, alignment: 86, momentum: 58, risk: 24, category: 'Reliability Infrastructure' },
  BlackBerry: { sector: 'Enterprise Security', level: 9, trust: 77, confidence: 65, drift: 22, alignment: 73, momentum: 52, risk: 36, category: 'Trust Infrastructure' },
  WeWork: { sector: 'Flexible Workspaces', level: 13, trust: 42, confidence: 38, drift: 61, alignment: 39, momentum: 28, risk: 78, category: 'Adaptive Space Confidence' },
  Apple: { sector: 'Consumer Technology', level: 4, trust: 92, confidence: 89, drift: 7, alignment: 93, momentum: 84, risk: 9, category: 'Premium Ecosystem Trust' }
};

const signals = [
  ['BUY', '+12', 'Confidence entering the system'],
  ['SELL', '-4', 'Confidence leaving the system'],
  ['DEAL', '+7', 'New relationship formed'],
  ['GAIN', '+8', 'Trust increasing'],
  ['LOSS', '-2', 'Trust decreasing'],
  ['DRIFT', '+18', 'Movement away from alignment'],
  ['CENTRE', '+82', 'Movement toward recovery'],
  ['BATTLE', 'Active', 'Competitive pressure'],
  ['LOT', '+5', 'Resources allocated'],
  ['BILL', '$1.2M', 'Recovery investment'],
  ['CHANGE', '+4', 'Positioning shift']
];

const nav = ['Company Pulse', 'Companies', 'Trust Engine', 'Market Signals', 'Strategy Lab', 'Recovery Simulator', 'Market Map', 'Reports', 'Boardroom', 'Investor Mode', 'Agency Mode'];

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

export default function App() {
  const [activeCompany, setActiveCompany] = useState('Peloton');
  const [activePage, setActivePage] = useState('Company Pulse');
  const [simBoost, setSimBoost] = useState(0);
  const c = companies[activeCompany];

  const model = useMemo(() => {
    const level = clamp(c.level - simBoost, 5, 15);
    const progress = Math.round(((15 - level) / 10) * 100);
    return {
      ...c,
      level,
      progress,
      target: 5,
      shift: `${c.level} → 5`,
      status: level <= 5 ? 'ReCentred' : level <= 7 ? 'Recovery' : level <= 10 ? 'Critical' : 'High Risk',
      trust: clamp(c.trust + simBoost * 4, 0, 100),
      confidence: clamp(c.confidence + simBoost * 5, 0, 100),
      drift: clamp(c.drift - simBoost * 4, 0, 100),
      alignment: clamp(c.alignment + simBoost * 4, 0, 100),
      momentum: clamp(c.momentum + simBoost * 3, 0, 100),
      risk: clamp(c.risk - simBoost * 6, 0, 100)
    };
  }, [c, simBoost]);

  function runScan() { setSimBoost(0); setActivePage('Company Pulse'); }
  function runSimulation() { setSimBoost((v) => clamp(v + 1, 0, c.level - 5)); }
  function resetSimulation() { setSimBoost(0); }

  return (
    <main className="app">
      <div className="bgGrid" />
      <aside className="sidebar">
        <div className="brand"><div className="logo">◇</div><strong>RECENTRE</strong></div>
        <div className="badge"><span>✦</span><div><b>THE WORLD'S FIRST</b><small>BUSINESS RECOVERY OS</small></div></div>
        <nav>{nav.map(item => <button key={item} onClick={() => setActivePage(item)} className={activePage===item?'active':''}>{item}</button>)}</nav>
        <div className="copilot"><div className="orb small"/><b>AI Copilot</b><span>Online</span><p>“We don’t fix symptoms. We restore your position in the market.”</p><button>Chat with Copilot</button></div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <input placeholder="Search companies, sectors, or categories..." onChange={(e)=>{ if(companies[e.target.value]) setActiveCompany(e.target.value); }} />
          <div className="topActions"><button>Signals</button><button>Alerts <b>12</b></button><button>Global View</button></div>
        </header>

        <div className="hero card">
          <div className="heroCopy">
            <h1>Recover.<br/><span>Rebuild.</span><br/>ReCentre.</h1>
            <p>The AI-powered recovery engine that diagnoses why companies decline, finds their true category nuance, and guides them back to Level 5.</p>
            <div className="heroBtns"><button onClick={runScan}>RUN SCAN →</button><button onClick={()=>setActivePage('Strategy Lab')}>OPEN LAB ↗</button></div>
          </div>
          <RecoveryTower level={model.level} />
          <div className="heroPanels">
            <MiniPanel title="Delta Impact" rows={[['Trust','+23'],['Sentiment','+18'],['Relevance','+21'],['Revenue','+12'],['Audience Fit','+19']]} />
            <div className="miniPanel"><h3>Category Nuance</h3><p>Selected Nuance</p><h2>{model.category}</h2><small>A new way to deliver confidence at scale.</small></div>
            <div className="miniPanel"><h3>Result Level Shift</h3><div className="shift"><span>{c.level}</span> → <span>5</span></div><p>Levels Improved</p><h2>-{c.level-5}</h2><button>View Recovery Path</button></div>
          </div>
        </div>

        <div className="metrics card">
          <h3>Live Market Signals</h3><div className="metricRow">
            <Gauge label="TRUST" value={model.trust} delta="+8" />
            <Gauge label="CONFIDENCE" value={model.confidence} delta="+6" />
            <Gauge label="DRIFT" value={model.drift} delta="-5" hot />
            <Gauge label="ALIGNMENT" value={model.alignment} delta="+9" />
            <Gauge label="MOMENTUM" value={model.momentum} delta="+4" />
            <Gauge label="RISK" value={model.risk} delta="-3" hot />
            <Gauge label="PROGRESS" value={model.progress} delta="L5" />
          </div></div>

        <div className="grid2">
          <Panel title="Trust Drift Over Time"><LineChart /></Panel>
          <Panel title="Market Confidence Heatmap"><Heatmap /></Panel>
          <Panel title="Recovery Simulator"><Simulator model={model} runSimulation={runSimulation} resetSimulation={resetSimulation} /></Panel>
          <Panel title="AI Strategy Copilot"><Copilot category={model.category} /></Panel>
        </div>

        <div className="signals card"><h3>ReCentre Telemetry Dictionary</h3><div className="signalScroller">{signals.map(([name,val,desc])=><div className="signal" key={name}><b>{name}</b><strong>{val}</strong><small>{desc}</small></div>)}</div></div>

        <div className="bottomGrid">
          <Panel title="Recent Companies"><CompanyList setActiveCompany={setActiveCompany} /></Panel>
          <Panel title="Recovery Balance"><Balance /></Panel>
          <Panel title="Formula Language"><Formula /></Panel>
          <Panel title="Signal Dashboard"><SignalDashboard model={model} /></Panel>
        </div>
      </section>
      <style>{css}</style>
    </main>
  );
}

function RecoveryTower({ level }) {
  const levels = [15,12,10,7,5];
  return <div className="towerWrap"><div className="vortex"/><div className="tower">{levels.map(l=><div key={l} className={level<=l?'towerLevel on':'towerLevel'}><small>LEVEL</small><b>{l}</b><span>{l===15?'EXTINCTION':l===12?'DANGER':l===10?'INSTABILITY':l===7?'RECOVERY':'RECENTRED'}</span></div>)}<div className="portal"><div className="person">●</div></div></div></div>;
}
function MiniPanel({title, rows}) { return <div className="miniPanel"><h3>{title}</h3>{rows.map(r=><p key={r[0]}><span>{r[0]}</span><b>{r[1]} ↗</b></p>)}</div>; }
function Gauge({ label, value, delta, hot }) { return <div className={hot?'gauge hot':'gauge'}><div style={{'--p': `${value*3.6}deg`}}><span>{value}</span></div><b>{label}</b><small>{delta}</small></div>; }
function Panel({title, children}) { return <section className="card panel"><h3>{title}</h3>{children}</section>; }
function LineChart(){ return <svg viewBox="0 0 420 180" className="chart"><defs><linearGradient id="lineg" x1="0" x2="1"><stop stopColor="#ff3e83"/><stop offset="1" stopColor="#42f5ff"/></linearGradient></defs>{[0,1,2,3].map(i=><line key={i} x1="20" x2="400" y1={40+i*35} y2={40+i*35} />)}<polyline points="25,35 70,58 110,76 150,95 190,125 230,104 270,70 315,50 360,35 400,22"/><circle cx="400" cy="22" r="5"/></svg>; }
function Heatmap(){ const rows=['Customers','Investors','Employees','Partners','Media']; return <div className="heat">{rows.map((r,i)=><div key={r}><span>{r}</span>{[0,1,2,3,4,5].map(j=><i key={j} className={(j+i)%3===0?'pink':'cyan'} />)}</div>)}<small>Low Trust ━━━━━━━━━ High Trust</small></div>; }
function Simulator({ model, runSimulation, resetSimulation }){ return <div className="sim"><div><small>Current Level</small><b>{model.level}</b></div><div><small>Target Level</small><b>5</b></div><div className="simPath">10 • 9 • 8 • 7 • 6 • 5</div><button onClick={runSimulation}>RUN SIMULATION</button><button onClick={resetSimulation}>RESET</button></div>; }
function Copilot({category}){ return <div className="chat"><p className="bubble user">How do we reach Level 5?</p><p className="bubble ai">Focus on category clarity, trust rebuild, offer urgency, and audience reconnection. Target category: {category}.</p><button>VIEW RECOVERY PLAN</button></div>; }
function CompanyList({setActiveCompany}){ return <div className="companyList">{Object.keys(companies).map(name=><button key={name} onClick={()=>setActiveCompany(name)}><b>{name}</b><span>Level {companies[name].level}</span><em>{companies[name].level>10?'High Risk':'Recovery'}</em></button>)}</div>; }
function Balance(){ return <div className="balance"><div><b>Market Alignment</b><strong>68%</strong><p>Trusted · Stable · Growing</p></div><div><b>Market Drift</b><strong>32%</strong><p>Confused · Risk · Unstable</p></div><div className="radar"/></div>; }
function Formula(){ const f=['BUY + TRUST = GAIN','SELL + TRUST = LOSS','DRIFT + PRESSURE = RISK','CENTRE + CLARITY = STABILITY','BUILD + TRUST = VALUE','REPAIR + RELEVANCE = GROWTH','ALIGN + VALUE = RECENTRE']; return <div className="formula">{f.map(x=><p key={x}>{x}</p>)}</div>; }
function SignalDashboard({model}){ return <div className="sigDash"><div><p>BUY <b>+12</b></p><p>SELL <b>-4</b></p><p>GAIN <b>+8</b></p><p>LOSS <b>-2</b></p></div><div><p>TRUST <b>{model.trust}</b></p><p>DOUBT <b>{100-model.trust}</b></p><p>ALIGN <b>{model.alignment}</b></p><p>DRIFT <b>{model.drift}</b></p></div><div className="miniRadar"/><footer>STATUS: RECOVERY IN PROGRESS</footer></div>; }

const css = `
*{box-sizing:border-box}body{margin:0;background:#020713;color:#eef7ff;font-family:Inter,ui-sans-serif,system-ui,Segoe UI,Arial,sans-serif}.app{min-height:100vh;display:grid;grid-template-columns:250px 1fr;gap:22px;padding:18px;background:radial-gradient(circle at 50% 0,#261029 0,#06101f 38%,#020713 72%);position:relative}.bgGrid{position:fixed;inset:0;background-image:linear-gradient(rgba(58,245,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,62,131,.05) 1px,transparent 1px);background-size:48px 48px;mask-image:linear-gradient(to bottom,#000,transparent 85%);pointer-events:none}.sidebar,.card{border:1px solid rgba(74,230,255,.22);background:linear-gradient(180deg,rgba(7,19,36,.86),rgba(3,9,20,.74));box-shadow:0 0 40px rgba(0,204,255,.08),inset 0 0 30px rgba(255,255,255,.02);backdrop-filter:blur(16px);border-radius:18px}.sidebar{position:sticky;top:18px;height:calc(100vh - 36px);padding:18px;display:flex;flex-direction:column}.brand{display:flex;align-items:center;gap:12px;font-size:22px;letter-spacing:1px}.logo{width:38px;height:38px;border:2px solid #ff3e83;border-radius:10px;display:grid;place-items:center;color:#42f5ff;box-shadow:0 0 24px rgba(255,62,131,.55)}.badge{display:flex;gap:10px;margin:22px 0;padding:12px;border:1px solid rgba(66,245,255,.35);border-radius:14px;background:rgba(66,245,255,.08)}.badge span{color:#42f5ff}.badge b{display:block;color:#42f5ff;font-size:12px}.badge small{color:#b8c5d8}nav{display:grid;gap:8px}nav button,.topActions button,.heroBtns button,.miniPanel button,.sim button,.chat button,.copilot button{border:1px solid rgba(74,230,255,.25);background:rgba(11,31,55,.6);color:#eaf8ff;border-radius:12px;padding:12px 14px;text-align:left;cursor:pointer}nav button.active, .heroBtns button:first-child{background:linear-gradient(90deg,rgba(255,62,131,.75),rgba(255,62,131,.25));border-color:#ff3e83;box-shadow:0 0 24px rgba(255,62,131,.45)}.copilot{margin-top:auto;padding:14px;border:1px solid rgba(74,230,255,.22);border-radius:16px;background:rgba(5,17,33,.8)}.copilot span{color:#24f0b6;margin-left:6px}.orb{width:88px;height:88px;margin:0 auto 10px;border-radius:50%;background:radial-gradient(circle,#fff 0,#42f5ff 8%,#123 20%,transparent 60%),conic-gradient(#42f5ff,#ff3e83,#42f5ff);box-shadow:0 0 45px #42f5ff}.orb.small{width:58px;height:58px}.workspace{position:relative;z-index:1}.topbar{height:54px;display:flex;gap:14px;margin-bottom:18px}.topbar input{flex:1;border:1px solid rgba(74,230,255,.22);background:rgba(4,13,26,.8);border-radius:14px;color:#fff;padding:0 22px;font-size:15px}.topActions{display:flex;gap:10px}.topActions b{color:#ff3e83}.hero{min-height:590px;padding:28px;display:grid;grid-template-columns:1fr 420px 1fr;gap:22px;overflow:hidden;position:relative}.hero:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 52% 0,rgba(255,62,131,.45),transparent 22%),radial-gradient(circle at 50% 85%,rgba(66,245,255,.35),transparent 28%)}.hero>*{position:relative;z-index:1}.hero h1{font-size:54px;line-height:1.05;margin:0 0 18px}.hero h1 span{color:#ff4e9c}.hero h1 span+br+*{color:#42f5ff}.hero p{color:#b9c7d8;line-height:1.7;max-width:500px}.heroBtns{display:flex;gap:14px;margin-top:24px}.heroBtns button{min-width:150px;text-align:center}.towerWrap{display:grid;place-items:center}.vortex{position:absolute;top:-160px;width:520px;height:260px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.5),rgba(255,62,131,.4) 15%,transparent 55%);filter:blur(4px);animation:pulse 3s infinite}.tower{width:310px;height:540px;clip-path:polygon(48% 0,75% 12%,94% 100%,6% 100%,25% 12%);background:linear-gradient(90deg,rgba(255,62,131,.35),rgba(66,245,255,.33)),linear-gradient(#111927,#071322);border:1px solid rgba(74,230,255,.25);box-shadow:0 0 90px rgba(66,245,255,.28);padding:48px 38px 20px;display:grid;gap:10px;align-content:start}.towerLevel{text-align:center;border:1px solid rgba(255,255,255,.12);background:rgba(0,0,0,.22);padding:10px;border-radius:12px}.towerLevel.on{box-shadow:0 0 26px rgba(255,62,131,.35)}.towerLevel b{font-size:38px;display:block}.towerLevel span,.towerLevel small{font-size:11px;color:#cfe}.portal{margin-top:auto;height:110px;border-radius:60px 60px 12px 12px;background:radial-gradient(circle,#fff,#42f5ff 20%,transparent 62%);display:grid;place-items:center}.person{filter:drop-shadow(0 0 12px #000)}.heroPanels{display:grid;gap:16px;align-content:start}.miniPanel{border:1px solid rgba(74,230,255,.22);border-radius:16px;padding:18px;background:rgba(5,15,29,.78)}.miniPanel h3,.card h3{margin:0 0 12px;text-transform:uppercase;letter-spacing:.8px;color:#cfe;font-size:14px}.miniPanel h2{color:#42f5ff;margin:8px 0}.miniPanel p{display:flex;justify-content:space-between;margin:10px 0}.miniPanel b{color:#24f0b6}.shift{font-size:42px;color:#fff}.shift span{color:#ff4e9c}.shift span:last-child{color:#42f5ff}.metrics{margin-top:18px;padding:18px}.metricRow{display:grid;grid-template-columns:repeat(7,1fr);gap:14px}.gauge{text-align:center}.gauge>div{margin:auto;width:78px;height:78px;border-radius:50%;background:conic-gradient(#42f5ff var(--p),rgba(255,255,255,.08) 0);display:grid;place-items:center;box-shadow:0 0 24px rgba(66,245,255,.25)}.gauge.hot>div{background:conic-gradient(#ff3e83 var(--p),rgba(255,255,255,.08) 0)}.gauge>div span{width:60px;height:60px;border-radius:50%;background:#071322;display:grid;place-items:center;font-size:24px}.gauge b,.gauge small{display:block}.gauge small{color:#24f0b6}.grid2,.bottomGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:18px;margin-top:18px}.bottomGrid{grid-template-columns:1.1fr 1.1fr 1fr 1fr}.panel{padding:18px}.chart{width:100%;height:190px}.chart line{stroke:rgba(255,255,255,.09)}.chart polyline{fill:none;stroke:url(#lineg);stroke-width:4}.chart circle{fill:#42f5ff}.heat{display:grid;gap:10px}.heat div{display:grid;grid-template-columns:120px repeat(6,1fr);gap:6px;align-items:center}.heat i{height:24px;border-radius:3px;background:rgba(66,245,255,.45)}.heat i.pink{background:rgba(255,62,131,.55)}.heat small{color:#ff70a8;text-align:center;margin-top:10px}.sim{display:grid;grid-template-columns:90px 90px 1fr;gap:14px;align-items:end}.sim b{display:block;font-size:42px;color:#ff4e9c;border:1px solid rgba(255,62,131,.35);border-radius:12px;padding:4px 12px}.sim div:nth-child(2) b{color:#42f5ff;border-color:rgba(66,245,255,.35)}.simPath{grid-column:1/-1;color:#ff9bc2;letter-spacing:8px}.sim button,.chat button{grid-column:auto;text-align:center}.chat{display:grid;gap:12px}.bubble{padding:14px;border-radius:14px;background:rgba(255,255,255,.06);max-width:80%}.bubble.user{margin-left:auto}.bubble.ai{border-left:3px solid #42f5ff}.signals{padding:18px;margin-top:18px}.signalScroller{display:grid;grid-template-columns:repeat(11,minmax(130px,1fr));gap:10px;overflow:auto}.signal{border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:12px;background:rgba(0,0,0,.2)}.signal b{color:#42f5ff}.signal strong{display:block;color:#24f0b6;font-size:20px}.signal small{color:#9fb0c4}.companyList{display:grid;gap:8px}.companyList button{display:grid;grid-template-columns:1fr 70px 70px;background:transparent;color:#fff;border:0;border-bottom:1px solid rgba(255,255,255,.08);padding:10px;text-align:left;cursor:pointer}.companyList em{color:#24f0b6}.balance{display:grid;grid-template-columns:1fr 1fr 150px;gap:12px}.balance strong{font-size:32px;color:#42f5ff}.balance div:nth-child(2) strong{color:#ff4e9c}.radar,.miniRadar{border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.7),rgba(255,62,131,.45) 12%,transparent 16%),repeating-radial-gradient(circle,transparent 0 18px,rgba(66,245,255,.25) 19px 20px),conic-gradient(#42f5ff,#ff3e83,#42f5ff);box-shadow:0 0 35px rgba(66,245,255,.2)}.formula p,.sigDash p{font-family:ui-monospace,Consolas,monospace;color:#42f5ff;background:rgba(255,255,255,.04);padding:8px 10px;border-radius:8px;margin:6px 0}.formula p:nth-child(even){color:#ff70a8}.sigDash{display:grid;grid-template-columns:1fr 1fr 110px;gap:10px}.miniRadar{width:100px;height:100px}.sigDash footer{grid-column:1/-1;color:#24f0b6;background:rgba(36,240,182,.08);padding:10px;border-radius:10px}@keyframes pulse{50%{transform:scale(1.08);opacity:.7}}@media(max-width:1200px){.app{grid-template-columns:1fr}.sidebar{position:relative;height:auto}.hero{grid-template-columns:1fr}.heroPanels,.bottomGrid,.grid2{grid-template-columns:1fr}.metricRow{grid-template-columns:repeat(2,1fr)}.signalScroller{grid-template-columns:repeat(2,1fr)}}
`;
