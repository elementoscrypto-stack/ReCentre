import React, { useMemo, useState } from 'react';

const companies = {
  Peloton: { sector: 'Consumer Fitness Technology', level: 10, trust: 74, confidence: 68, drift: 18, alignment: 82, momentum: 61, risk: 32, category: 'Connected Fitness Hardware', newCategory: 'Confidence Commerce', note: 'Premium fitness brand facing category confusion and audience reconnection pressure.' },
  Nokia: { sector: 'Technology Infrastructure', level: 9, trust: 69, confidence: 72, drift: 21, alignment: 77, momentum: 58, risk: 28, category: 'Legacy Networks', newCategory: 'Trust Infrastructure', note: 'Strong heritage with opportunity to sharpen future-facing infrastructure story.' },
  BlackBerry: { sector: 'Cybersecurity Software', level: 11, trust: 66, confidence: 62, drift: 27, alignment: 70, momentum: 49, risk: 39, category: 'Legacy Mobile Security', newCategory: 'Enterprise Trust Intelligence', note: 'A trusted name requiring stronger modern category ownership.' },
  WeWork: { sector: 'Flexible Real Estate', level: 13, trust: 41, confidence: 36, drift: 52, alignment: 44, momentum: 31, risk: 74, category: 'Co-working Space', newCategory: 'Adaptive Space Confidence', note: 'High reputation damage with possible recovery through trust, focus and financial clarity.' },
  Apple: { sector: 'Consumer Technology', level: 4, trust: 91, confidence: 88, drift: 8, alignment: 94, momentum: 87, risk: 9, category: 'Premium Consumer Devices', newCategory: 'Integrated Life Computing', note: 'Strong market alignment with minor category expansion watch points.' },
};

const dictionary = [
  ['BUY', '+12', 'Confidence entering the system'],
  ['SELL', '-4', 'Confidence leaving the system'],
  ['DEAL', '+7', 'New relationship formed'],
  ['GAIN', '+8', 'Trust increasing'],
  ['LOSS', '-2', 'Trust decreasing'],
  ['BUILD', '+6', 'Structure strengthening'],
  ['DRIFT', '+18', 'Movement away from alignment'],
  ['CENTRE', '+82', 'Movement toward alignment'],
  ['LOCK', '91%', 'Customer retention'],
  ['FLOW', '83%', 'Healthy value movement'],
  ['VALUE', '+22', 'Perceived usefulness rising'],
  ['RISK', '18%', 'Failure probability'],
];

const nav = [
  'Company Pulse', 'Recovery Scanner', 'Company Explorer', 'Trust Engine', 'Market Signals',
  'Recovery Lab', 'Recovery Simulator', 'Strategy Engine', 'Category Studio', 'Recovery Timeline',
  'Executive Reports', 'AI Copilot'
];

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

export default function App() {
  const [companyName, setCompanyName] = useState('Peloton');
  const [activePage, setActivePage] = useState('Company Pulse');
  const [visualMode, setVisualMode] = useState('Insane Visual Mode');
  const [simBoost, setSimBoost] = useState(0);
  const company = companies[companyName] || companies.Peloton;

  const state = useMemo(() => {
    const improvedLevel = clamp(company.level - simBoost, 5, 15);
    const marketAlignment = clamp(company.alignment + simBoost * 7, 0, 100);
    const marketDrift = clamp(company.drift - simBoost * 5, 0, 100);
    const recoveryProgress = Math.round(((15 - improvedLevel) / 10) * 100);
    const status = improvedLevel <= 5 ? 'ReCentred' : improvedLevel <= 7 ? 'Recovery' : improvedLevel <= 10 ? 'Critical Focus' : 'High Risk';
    return { improvedLevel, marketAlignment, marketDrift, recoveryProgress, status };
  }, [company, simBoost]);

  const runSimulation = () => setSimBoost((v) => clamp(v + 1, 0, 5));
  const resetSimulation = () => setSimBoost(0);

  return (
    <div className={`app ${visualMode === 'Boardroom Mode' ? 'boardroom' : ''}`}>
      <aside className="sidebar">
        <div className="brand"><span className="cube">◇</span><strong>RECENTRE</strong></div>
        <div className="badge">THE WORLD'S FIRST<br /><b>BUSINESS RECOVERY OS</b></div>
        <nav>{nav.map((item) => <button key={item} onClick={() => setActivePage(item)} className={activePage === item ? 'active' : ''}><span>{iconFor(item)}</span>{item}</button>)}</nav>
        <div className="copilotCard"><div className="orb small"></div><b>AI Copilot</b><span>Online</span><p>“We don’t fix symptoms. We restore your position in the market.”</p><button>Chat with Copilot</button></div>
        <div className="operator"><span>👤</span><div><b>ReCentre OS</b><small>Operator</small></div></div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="search"><span>⌕</span><input placeholder="Search companies, sectors, or categories..." value={companyName} onChange={(e) => setCompanyName(e.target.value)} /></div>
          <div className="demoButtons">{Object.keys(companies).map((name) => <button key={name} onClick={() => { setCompanyName(name); setSimBoost(0); }}>{name}</button>)}</div>
          <select value={visualMode} onChange={(e) => setVisualMode(e.target.value)}><option>Insane Visual Mode</option><option>Boardroom Mode</option></select>
        </header>

        <section className="heroGrid">
          <div className="hero panel">
            <div className="copy">
              <p className="eyebrow">Company Pulse · {activePage}</p>
              <h1>Recover.<br />Rebuild.<br /><span>ReCentre.</span></h1>
              <p className="sub">The AI-powered recovery engine that diagnoses why companies decline, finds their true category nuance, and guides them back to Level 5.</p>
              <div className="actions"><button className="hot" onClick={runSimulation}>Run Scan →</button><button onClick={() => setActivePage('Recovery Lab')}>Open Lab ↗</button></div>
            </div>
            <div className="tower">
              {[15,12,10,7,5].map((level) => <div key={level} className={state.improvedLevel === level || (level===5 && state.improvedLevel===5) ? 'floor current' : 'floor'}><small>LEVEL</small><b>{level}</b><span>{level===15?'EXTINCTION':level===12?'DANGER':level===10?'INSTABILITY':level===7?'RECOVERY':'RECENTRED'}</span></div>)}
              <div className="portal"><div className="orb"></div></div>
            </div>
          </div>

          <div className="rightStack">
            <MetricPanel title="Delta Impact (Live)" rows={[['Trust','+23'],['Sentiment','+18'],['Relevance','+21'],['Revenue','+12'],['Audience Fit','+19']]} />
            <div className="panel nuance"><h3>Category Nuance</h3><p>Selected Nuance</p><h2>{company.newCategory}</h2><span>A new way to deliver confidence at scale.</span><div className="wireOrb"></div></div>
            <div className="panel shift"><h3>Result Level Shift</h3><div><b>{company.level}</b><span>→</span><b>{state.improvedLevel}</b></div><p>Levels improved <strong>-{company.level - state.improvedLevel}</strong></p><button onClick={() => setActivePage('Recovery Timeline')}>View Recovery Path</button></div>
          </div>
        </section>

        <section className="dashboard">
          <div className="panel companyCard wide">
            <h2>{companyName}</h2><p>{company.sector}</p><span>{company.note}</span>
            <div className="levelGauge"><div className="ring"><b>{state.improvedLevel}</b><small>{state.status}</small></div></div>
            <div className="metricsRow">
              <Dial label="TRUST" value={company.trust + simBoost * 3} delta="+8" />
              <Dial label="CONFIDENCE" value={company.confidence + simBoost * 4} delta="+6" />
              <Dial label="DRIFT" value={state.marketDrift} delta="-5" pink />
              <Dial label="ALIGNMENT" value={state.marketAlignment} delta="+9" />
              <Dial label="MOMENTUM" value={company.momentum + simBoost * 4} delta="+4" />
              <Dial label="RISK" value={clamp(company.risk - simBoost * 6, 0, 100)} delta="-3" pink />
              <Dial label="PROGRESS" value={state.recoveryProgress} delta="%" />
            </div>
          </div>

          <div className="panel chart"><h3>Trust Drift Over Time</h3><LineChart /></div>
          <div className="panel heat"><h3>Market Confidence Heatmap</h3><Heatmap /></div>
          <div className="panel simulator"><h3>Recovery Simulator</h3><div className="simLevels"><strong>{state.improvedLevel}</strong><span>Target Level</span><strong>5</strong></div><MiniPath /><button onClick={runSimulation}>Run Simulation</button><button className="ghost" onClick={resetSimulation}>Reset</button></div>
          <div className="panel ai"><h3>AI Strategy Copilot</h3><div className="chatBubble question">How do we reach Level 5?</div><div className="chatBubble answer">Focus on category clarity, trust rebuild, offer urgency, and audience reconnection. I’ve created a 30/60/90 day recovery plan.</div><button>View Recovery Plan</button></div>
        </section>

        <section className="signals panel">
          <div className="sectionHead"><h3>Market Signals Dictionary</h3><button>View all signals →</button></div>
          <div className="signalGrid">{dictionary.map(([name, value, meaning]) => <div className="signal" key={name}><b>{name}</b><strong>{value}</strong><small>= {meaning}</small></div>)}</div>
        </section>

        <section className="bottomGrid">
          <div className="panel companies"><h3>Recent Companies</h3>{Object.entries(companies).map(([name,c]) => <button key={name} onClick={() => setCompanyName(name)}><span>{name}</span><small>Level {c.level}</small><b>{c.level <= 5 ? 'Stable' : c.level > 12 ? 'Collapse' : 'Recovery'}</b></button>)}</div>
          <div className="panel balance"><h3>Recovery Balance</h3><div className="balanceBody"><div><h2>Market Alignment</h2><p>Aligned · Trusted · Stable · Growing</p><b>{state.marketAlignment}%</b></div><div className="radar"></div><div><h2>Market Drift</h2><p>Drifting · Confused · Risk · Unstable</p><b>{state.marketDrift}%</b></div></div></div>
          <div className="panel formulas"><h3>ReCentre Formula Language</h3>{['BUY + TRUST = GAIN','SELL + TRUST = LOSS','DRIFT + PRESSURE = RISK','CENTRE + CLARITY = STABILITY','BUILD + TRUST = VALUE','REPAIR + RELEVANCE = GROWTH','ALIGN + VALUE = RECENTRE'].map((f) => <code key={f}>{f}</code>)}</div>
          <div className="panel actionsPanel"><h3>Next Best Actions</h3>{['Rebuild Category Clarity','Reposition Core Offer','Reconnect Lost Audience','Strengthen Trust Signals'].map((a) => <div className="action" key={a}><span>{a}<small>High Impact</small></span><button onClick={runSimulation}>ACT</button></div>)}</div>
          <div className="panel towerOverview"><h3>Level Tower Overview</h3><div className="marketLine pink"></div><div className="marketLine cyan"></div><h2>Level {state.improvedLevel}</h2><p>Target <b>Level 5</b> · ReCentred</p></div>
        </section>
      </main>
      <style>{styles}</style>
    </div>
  );
}

function iconFor(item){ const map={ 'Company Pulse':'⌂','Recovery Scanner':'▣','Company Explorer':'◎','Trust Engine':'◌','Market Signals':'◉','Recovery Lab':'✦','Recovery Simulator':'⌁','Strategy Engine':'♢','Category Studio':'⬡','Recovery Timeline':'▤','Executive Reports':'▧','AI Copilot':'✺'}; return map[item] || '•'; }
function MetricPanel({title, rows}){ return <div className="panel metricPanel"><h3>{title}</h3>{rows.map(([k,v])=><div className="metricLine" key={k}><span>{k}</span><b>{v} ↗</b></div>)}</div>; }
function Dial({label,value,delta,pink}){ const deg=Math.round(value*3.6); return <div className="dial"><div className="dialCircle" style={{background:`conic-gradient(${pink?'#ff3b82':'#25f4ff'} ${deg}deg, rgba(255,255,255,.08) 0deg)`}}><div><b>{value}</b><small>{delta}</small></div></div><span>{label}</span></div>; }
function LineChart(){ return <svg viewBox="0 0 360 170" className="svg"><defs><linearGradient id="g" x1="0" x2="1"><stop stopColor="#ff3b82"/><stop offset="1" stopColor="#25f4ff"/></linearGradient></defs>{[0,1,2,3].map(i=><line key={i} x1="20" x2="340" y1={25+i*35} y2={25+i*35} stroke="rgba(255,255,255,.08)"/>)}<polyline points="25,45 60,65 95,82 130,108 165,132 200,92 235,60 270,42 305,28 340,18" fill="none" stroke="url(#g)" strokeWidth="4"/><g>{[25,60,95,130,165,200,235,270,305,340].map((x,i)=><circle key={i} cx={x} cy={[45,65,82,108,132,92,60,42,28,18][i]} r="4" fill={i<5?'#ff70a8':'#5ffaff'}/>)}</g></svg> }
function Heatmap(){ const rows=['Customers','Investors','Employees','Partners','Media']; return <div>{rows.map((r,i)=><div className="heatRow" key={r}><span>{r}</span>{Array.from({length:8},(_,j)=><i key={j} className={(j+i)%3===0?'hotCell':'coolCell'} />)}</div>)}<div className="heatLegend"><span>Low Trust</span><b></b><span>High Trust</span></div></div>; }
function MiniPath(){ return <svg viewBox="0 0 270 80" className="mini"><polyline points="15,12 65,22 110,35 155,48 205,62 250,70" fill="none" stroke="#ff70a8" strokeWidth="3"/>{[15,65,110,155,205,250].map((x,i)=><circle key={x} cx={x} cy={[12,22,35,48,62,70][i]} r="7" fill={i<3?'#ff3b82':'#25f4ff'} stroke="#fff" strokeOpacity=".5"/>)} </svg>; }

const styles = `
*{box-sizing:border-box} body{margin:0;background:#030914;color:#eef7ff;font-family:Inter,ui-sans-serif,system-ui,Segoe UI,Arial,sans-serif}.app{min-height:100vh;display:grid;grid-template-columns:250px 1fr;background:radial-gradient(circle at 48% 0%,rgba(255,46,126,.22),transparent 32%),radial-gradient(circle at 62% 38%,rgba(28,225,255,.16),transparent 34%),#030914}.boardroom{filter:saturate(.72)}.sidebar{border-right:1px solid rgba(37,244,255,.22);background:linear-gradient(180deg,rgba(4,12,24,.92),rgba(4,12,24,.72));padding:22px 16px;position:sticky;top:0;height:100vh}.brand{display:flex;align-items:center;gap:12px;font-size:24px;letter-spacing:1px}.cube{display:grid;place-items:center;width:42px;height:42px;border:1px solid #ff4c93;border-radius:12px;box-shadow:0 0 28px rgba(255,61,130,.55);color:#ff70a8}.badge{margin:20px 0;padding:14px;border:1px solid rgba(37,244,255,.35);border-radius:14px;color:#6df6ff;background:rgba(37,244,255,.08);font-size:12px}nav{display:grid;gap:8px}nav button{height:44px;border:0;border-radius:12px;text-align:left;padding:0 14px;background:transparent;color:#b7c5d6;display:flex;gap:12px;align-items:center;font-size:14px;cursor:pointer}nav button.active,nav button:hover{background:linear-gradient(90deg,rgba(255,61,130,.28),rgba(255,61,130,.05));color:white;border:1px solid rgba(255,61,130,.35)}.copilotCard{position:absolute;left:16px;right:16px;bottom:92px;border:1px solid rgba(37,244,255,.22);border-radius:14px;padding:16px;background:rgba(9,22,38,.8);font-size:13px}.copilotCard span{color:#20f7c4;margin-left:5px}.copilotCard button,.panel button,.actions button,.topbar button{border:1px solid rgba(37,244,255,.45);background:rgba(37,244,255,.08);color:#dffcff;border-radius:10px;padding:10px 14px;cursor:pointer}.operator{position:absolute;left:16px;right:16px;bottom:20px;background:rgba(22,39,60,.8);border-radius:22px;padding:12px;display:flex;gap:10px;align-items:center}.operator small{display:block;color:#8ea2b6}.main{padding:18px 24px 34px;min-width:0}.topbar{display:grid;grid-template-columns:1fr auto 160px;gap:12px;align-items:center;margin-bottom:18px}.search{height:46px;border:1px solid rgba(111,145,180,.32);border-radius:14px;background:rgba(8,20,36,.72);display:flex;align-items:center;padding:0 16px;gap:10px}.search input{flex:1;background:transparent;border:0;outline:0;color:white}.demoButtons{display:flex;gap:8px}.demoButtons button{padding:8px 10px;border-color:rgba(255,255,255,.13);font-size:12px}.topbar select{background:#081426;color:white;border:1px solid rgba(111,145,180,.32);border-radius:12px;padding:12px}.panel{border:1px solid rgba(37,244,255,.22);border-radius:16px;background:linear-gradient(180deg,rgba(9,22,38,.83),rgba(5,13,25,.72));box-shadow:0 0 30px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.04);padding:18px;overflow:hidden}.heroGrid{display:grid;grid-template-columns:minmax(520px,1fr) 1fr;gap:18px}.hero{position:relative;min-height:500px;display:grid;grid-template-columns:1fr 380px;background:radial-gradient(circle at 68% 0%,rgba(255,42,125,.48),transparent 18%),radial-gradient(circle at 72% 72%,rgba(37,244,255,.42),transparent 18%),linear-gradient(115deg,rgba(8,20,36,.95),rgba(4,9,18,.72));}.hero:before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(0deg,rgba(255,255,255,.028) 1px,transparent 1px);background-size:44px 44px;mask-image:radial-gradient(circle at 70% 50%,black,transparent 70%)}.copy{position:relative;z-index:2;padding:10px}.eyebrow{color:#ff70a8;text-transform:uppercase;letter-spacing:2px;font-weight:800;font-size:12px}.hero h1{font-size:58px;line-height:.95;margin:14px 0}.hero h1 span{color:#25f4ff;text-shadow:0 0 28px rgba(37,244,255,.5)}.sub{max-width:520px;color:#bbc8d8;line-height:1.65}.actions{display:flex;gap:14px;margin-top:24px}.actions .hot{background:linear-gradient(135deg,#ff3b82,#ff70a8);box-shadow:0 0 28px rgba(255,61,130,.55);border-color:#ff70a8}.tower{position:relative;z-index:2;display:grid;align-content:end;justify-items:center;gap:8px;min-height:460px}.tower:before{content:"";position:absolute;bottom:80px;width:310px;height:430px;background:linear-gradient(180deg,rgba(255,61,130,.33),rgba(37,244,255,.28));clip-path:polygon(50% 0,88% 100%,12% 100%);filter:blur(3px);opacity:.9}.floor{position:relative;z-index:3;width:220px;text-align:center;border:1px solid rgba(255,255,255,.18);background:rgba(4,10,18,.65);padding:9px;border-radius:8px}.floor b{display:block;font-size:34px;color:#ff70a8}.floor:nth-child(n+4) b,.floor.current b{color:#61faff}.floor small,.floor span{display:block;font-size:10px;color:#dbe9ff}.portal{z-index:3;width:155px;height:90px;border-radius:50% 50% 0 0;border:2px solid #61faff;box-shadow:0 0 55px #25f4ff;display:grid;place-items:center}.orb{width:58px;height:58px;border-radius:50%;background:radial-gradient(circle,#fff,#25f4ff 35%,transparent 70%);box-shadow:0 0 55px #25f4ff}.small{width:45px;height:45px;margin-bottom:10px}.rightStack{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.rightStack .chart,.rightStack .heat,.rightStack .simulator,.rightStack .ai{grid-column:auto}.metricPanel h3,.panel h3{margin:0 0 14px;text-transform:uppercase;font-size:13px;letter-spacing:.7px;color:#cbd9ea}.metricLine{display:flex;justify-content:space-between;border-top:1px solid rgba(255,255,255,.08);padding:10px 0;color:#b8c6d6}.metricLine b{color:#20f7c4}.nuance h2{color:#6df6ff;margin:8px 0}.wireOrb{float:right;width:86px;height:86px;border-radius:50%;border:1px solid rgba(37,244,255,.5);background:repeating-radial-gradient(circle,rgba(37,244,255,.1) 0 2px,transparent 2px 14px)}.shift div{font-size:48px;display:flex;gap:20px;align-items:center}.shift b:first-child{color:#ff70a8}.shift b:last-child{color:#6df6ff}.dashboard{display:grid;grid-template-columns:1.35fr .7fr .7fr;gap:14px;margin-top:14px}.wide{grid-column:span 1}.companyCard{position:relative}.companyCard h2{font-size:38px;margin:0}.companyCard p{color:#6df6ff}.companyCard span{color:#bccbdd}.levelGauge{position:absolute;right:24px;top:24px}.ring{width:140px;height:140px;border-radius:50%;display:grid;place-items:center;text-align:center;background:radial-gradient(circle,#081426 55%,transparent 56%),conic-gradient(#ff3b82 0 45%,#25f4ff 45% 82%,rgba(255,255,255,.1) 0);box-shadow:0 0 45px rgba(255,61,130,.35)}.ring b{font-size:44px}.ring small{display:block;color:#cbd9ea}.metricsRow{display:grid;grid-template-columns:repeat(7,1fr);gap:12px;margin-top:38px}.dial{text-align:center}.dialCircle{width:82px;height:82px;border-radius:50%;display:grid;place-items:center;margin:auto}.dialCircle>div{width:62px;height:62px;border-radius:50%;background:#071322;display:grid;place-items:center}.dial b{font-size:22px}.dial small{color:#20f7c4}.dial span{display:block;font-size:11px;color:#b8c6d6;margin-top:8px}.svg{width:100%;height:190px}.heatRow{display:grid;grid-template-columns:90px repeat(8,1fr);gap:6px;align-items:center;margin:9px 0;color:#b7c5d6;font-size:12px}.heatRow i{height:22px;border-radius:2px}.hotCell{background:linear-gradient(90deg,#a83264,#ff4c93)}.coolCell{background:linear-gradient(90deg,#0d2b43,#1ed6e8)}.heatLegend{display:flex;gap:10px;align-items:center;justify-content:center;margin-top:16px;font-size:11px}.heatLegend b{width:160px;height:4px;background:linear-gradient(90deg,#ff3b82,#25f4ff)}.simLevels{display:flex;align-items:center;gap:12px}.simLevels strong{font-size:36px;border:1px solid rgba(37,244,255,.4);padding:8px 14px;border-radius:10px;color:#6df6ff}.simLevels strong:first-child{color:#ff70a8;border-color:rgba(255,61,130,.4)}.mini{width:100%;height:90px}.ghost{margin-left:8px;background:transparent!important}.chatBubble{padding:12px;border-radius:12px;background:rgba(255,255,255,.08);margin:10px 0;color:#c7d6e8}.question{margin-left:50px}.answer{border-left:2px solid #25f4ff}.signals{margin-top:14px}.sectionHead{display:flex;justify-content:space-between;align-items:center}.signalGrid{display:grid;grid-template-columns:repeat(12,1fr);gap:10px}.signal{border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:12px;background:rgba(255,255,255,.035)}.signal b{color:#6df6ff}.signal strong{display:block;margin:6px 0;color:#20f7c4}.signal:nth-child(2n) b,.signal:nth-child(2n) strong{color:#ff70a8}.signal small{color:#91a4b8}.bottomGrid{display:grid;grid-template-columns:1fr 1.35fr 1.1fr 1.1fr 1.1fr;gap:14px;margin-top:14px}.companies button{width:100%;display:grid;grid-template-columns:1fr auto auto;gap:10px;background:transparent;border:0;border-bottom:1px solid rgba(255,255,255,.08);color:white;text-align:left;padding:12px}.companies b{color:#20f7c4}.balanceBody{display:grid;grid-template-columns:1fr 160px 1fr;gap:16px;align-items:center}.balance h2:first-child,.balance b:first-child{color:#25f4ff}.balance h2:last-child{color:#ff70a8}.radar{width:160px;height:160px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.08) 0 2px,transparent 3px 18px),conic-gradient(from 20deg,#25f4ff,#ff3b82,#25f4ff);box-shadow:0 0 45px rgba(37,244,255,.25)}.formulas code{display:block;color:#dffcff;padding:8px 10px;border-radius:8px;background:rgba(255,255,255,.045);margin:5px 0}.action{display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,.06);padding:10px;border-radius:10px;margin:8px 0}.action small{display:block;color:#20f7c4}.towerOverview{position:relative}.marketLine{height:70px;border-bottom:2px solid;border-radius:50%;margin:8px}.pink{border-color:#ff3b82}.cyan{border-color:#25f4ff}.towerOverview h2{color:#ff70a8}.towerOverview b{color:#25f4ff}@media(max-width:1350px){.app{grid-template-columns:1fr}.sidebar{position:relative;height:auto}.copilotCard,.operator{position:relative;left:auto;right:auto;bottom:auto;margin-top:14px}.heroGrid,.dashboard,.bottomGrid{grid-template-columns:1fr}.rightStack{grid-template-columns:1fr}.metricsRow,.signalGrid{grid-template-columns:repeat(2,1fr)}.hero{grid-template-columns:1fr}.tower{min-height:520px}.topbar{grid-template-columns:1fr}.demoButtons{flex-wrap:wrap}}`;
