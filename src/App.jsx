import React, { useMemo, useState } from "react";

const DEMOS = {
  Apple: {
    sector: "Consumer Technology",
    offer: "Premium ecosystem of devices, services, privacy and lifestyle status",
    competitors: ["Samsung", "Google", "Microsoft"],
    trust: 82,
    relevance: 86,
    pressure: 48,
    sentiment: 78,
    growth: 72,
    copy: "Beautiful premium products with a trusted ecosystem and simple user experience.",
    reviews: "Love the ecosystem. Expensive but reliable. Some users feel upgrades are less exciting.",
    objections: "Too expensive, locked ecosystem, not innovative enough every year.",
  },
  Nokia: {
    sector: "Technology Infrastructure",
    offer: "Legacy mobile and network infrastructure brand seeking stronger market identity",
    competitors: ["Ericsson", "Huawei", "Cisco"],
    trust: 54,
    relevance: 49,
    pressure: 72,
    sentiment: 55,
    growth: 43,
    copy: "Reliable network solutions for modern enterprises and telecom operators.",
    reviews: "Reliable but not always seen as exciting. Strong engineering reputation.",
    objections: "Old brand perception, unclear category, slow innovation story.",
  },
  Peloton: {
    sector: "Consumer Fitness",
    offer: "Premium connected fitness subscription hardware with trust and demand pressure",
    competitors: ["Apple Fitness+", "Tonal", "NordicTrack"],
    trust: 38,
    relevance: 41,
    pressure: 79,
    sentiment: 42,
    growth: 34,
    copy: "Premium connected fitness for people who want motivating workouts at home.",
    reviews: "Great classes but expensive. Hardware commitment feels risky. Some churn after novelty fades.",
    objections: "Too expensive, subscription fatigue, takes up space, hard to justify after gyms reopened.",
  },
  WeWork: {
    sector: "Real Estate",
    offer: "Flexible office space with damaged investor trust and volatile demand",
    competitors: ["Regus", "Industrious", "Local coworking"],
    trust: 24,
    relevance: 46,
    pressure: 84,
    sentiment: 25,
    growth: 22,
    copy: "Flexible workspaces for teams that need inspiring offices without long commitments.",
    reviews: "Useful spaces but trust was damaged. Pricing and stability worries remain.",
    objections: "Financial instability, unclear long-term value, cheaper alternatives.",
  },
  BlackBerry: {
    sector: "Enterprise Security",
    offer: "Security-first enterprise software after mobile market decline",
    competitors: ["CrowdStrike", "Microsoft", "Palo Alto Networks"],
    trust: 61,
    relevance: 57,
    pressure: 68,
    sentiment: 58,
    growth: 45,
    copy: "Enterprise-grade security and embedded software for mission-critical systems.",
    reviews: "Trusted security name but brand still carries old phone-era confusion.",
    objections: "What is BlackBerry now? Strong trust, weak modern category clarity.",
  },
};

const SIGNALS = [
  ["BUY", "Confidence entering the system", "nor", 12],
  ["SELL", "Confidence leaving the system", "sor", -10],
  ["DEAL", "New relationship formed", "nor", 9],
  ["BILL", "Cost pressure or pricing event", "sor", -5],
  ["DRIFT", "Movement away from alignment", "sor", -12],
  ["BATTLE", "Competitive pressure event", "sor", -9],
  ["LOT", "Resource allocation decision", "nor", 7],
  ["PUT", "Strategic focus placed", "nor", 8],
  ["GAIN", "Trust increasing", "nor", 10],
  ["LOSS", "Trust decreasing", "sor", -11],
  ["BUILD", "Structure strengthened", "nor", 10],
  ["DECAY", "Structure weakening", "sor", -10],
  ["CENTRE", "Returning to Level 5", "nor", 14],
  ["REPLAY", "Repeating old failure", "sor", -13],
];

const MODES = ["Insane Visual", "Boardroom", "Investor", "Agency", "Founder", "Retail", "SaaS", "AI Company"];

function clamp(n, min, max) { return Math.min(max, Math.max(min, n)); }
function levelName(level) {
  return {
    1: "Elite Stability", 2: "Healthy", 3: "Stable Signal", 4: "Watch", 5: "ReCentred",
    6: "Transition", 7: "Recovery Motion", 8: "Trust Strain", 9: "Category Drift", 10: "Critical Offering",
    11: "Confidence Loss", 12: "Structural Weakness", 13: "Collapse Warning", 14: "Back-to-Back Replay", 15: "Full Market Crisis"
  }[level];
}

export default function App() {
  const [company, setCompany] = useState("Peloton");
  const [data, setData] = useState(DEMOS.Peloton);
  const [mode, setMode] = useState("Insane Visual");
  const [activePage, setActivePage] = useState("Command Centre");
  const [copy, setCopy] = useState(DEMOS.Peloton.copy);
  const [reviews, setReviews] = useState(DEMOS.Peloton.reviews);
  const [objections, setObjections] = useState(DEMOS.Peloton.objections);
  const [signalBoost, setSignalBoost] = useState(0);
  const [log, setLog] = useState(["BUY = confidence entered", "DRIFT = category misalignment detected", "CENTRE = Level 5 target activated"]);
  const [chat, setChat] = useState("How do we reach Level 5?");

  const analysis = useMemo(() => {
    const weakness = (100 - data.trust) * .24 + (100 - data.relevance) * .21 + data.pressure * .23 + (100 - data.sentiment) * .17 + (100 - data.growth) * .15 - signalBoost;
    const level = clamp(Math.round(1 + weakness / 100 * 14), 1, 15);
    const alignment = clamp(100 - Math.round(weakness), 0, 100);
    const sor = clamp(Math.round(weakness), 0, 100);
    const nor = alignment;
    const isSOR = level > 7;
    const newCategory = data.sector.includes("Fitness") ? "Confidence Fitness" : data.sector.includes("Real Estate") ? "Adaptive Space Confidence" : data.sector.includes("Security") ? "Trust Infrastructure Security" : data.sector.includes("Technology") ? "Trust Infrastructure" : "Market Trust Recovery";
    const nuance = data.sector.includes("Fitness") ? "fitness people can believe in again without subscription fatigue" : data.sector.includes("Real Estate") ? "workspace confidence for cautious teams" : data.sector.includes("Security") ? "mission-critical trust for modern enterprise risk" : "reliability intelligence for a shifting market";
    const history = [12, 11, 10, 9, 7, 5].map((x, i) => clamp(x - Math.round(signalBoost / 18) + (i < 3 ? 0 : 0), 1, 15));
    const cost = Math.max(35, (level - 5) * 55);
    const months = Math.max(1, (level - 5) * 2);
    return { weakness: Math.round(weakness), level, label: levelName(level), nor, sor, isSOR, newCategory, nuance, history, cost, months };
  }, [data, signalBoost]);

  const signalTotals = useMemo(() => {
    const buy = clamp(data.trust + signalBoost, 0, 100);
    const sell = clamp(100 - data.trust + data.pressure / 3 - signalBoost / 2, 0, 100);
    const deal = clamp(data.growth + signalBoost / 2, 0, 100);
    const bill = clamp(100 - data.sentiment + data.pressure / 4, 0, 100);
    const drift = clamp(analysis.sor, 0, 100);
    const battle = clamp(data.pressure, 0, 100);
    const lot = clamp(data.relevance + signalBoost / 2, 0, 100);
    const centre = clamp(analysis.nor, 0, 100);
    return { BUY: buy, SELL: sell, DEAL: deal, BILL: bill, DRIFT: drift, BATTLE: battle, LOT: lot, CENTRE: centre };
  }, [data, signalBoost, analysis]);

  function loadDemo(name) {
    setCompany(name); setData(DEMOS[name]); setCopy(DEMOS[name].copy); setReviews(DEMOS[name].reviews); setObjections(DEMOS[name].objections); setSignalBoost(0);
    setLog([`LOAD = ${name} imported`, "SCAN = public company mode activated", "DRIFT = telemetry recalculated"]);
  }

  function applySignal(name, value) {
    setSignalBoost(v => clamp(v + value, -30, 55));
    setLog(l => [`${name} = ${value > 0 ? "NOR gain" : "SOR pressure"} applied`, ...l].slice(0, 7));
  }

  function runRecovery() {
    setSignalBoost(v => clamp(v + 12, -30, 55));
    setLog(l => ["CENTRE = recovery simulation moved company toward Level 5", "PUT = trust first", "LOT = product + support allocation", ...l].slice(0, 7));
  }

  function generateCopilot() {
    setLog(l => ["AI COPILOT = recommend BUY trust, SELL complexity, DEAL distribution, PUT clarity", ...l].slice(0, 7));
  }

  return (
    <main className={mode === "Boardroom" ? "app boardroom" : "app"}>
      <div className="ambient" />
      <aside className="sidebar panel">
        <div className="brand"><div className="logo">R</div><div><h1>ReCentre</h1><p>Telemetry Recovery OS</p></div></div>
        {[
          "Command Centre", "Company Search", "Trust Drift", "Heatmap", "Competitor Theft", "Audience Loss", "De-Markation", "Weakness Analyzer", "Nuance Fusion", "Gravity Map", "Rewrite Engine", "Trust Promise", "Recovery Simulator", "Failure Replay", "Level Tower", "AI Copilot", "Boardroom", "Investor Mode", "Agency Mode", "Lab Notes"
        ].map(p => <button key={p} onClick={() => setActivePage(p)} className={activePage === p ? "nav active" : "nav"}>{p}</button>)}
      </aside>

      <section className="workspace">
        <header className="topbar panel">
          <div><p className="eyebrow">{activePage}</p><h2>{company} · Level {analysis.level} · {analysis.label}</h2></div>
          <div className="modeRow">{MODES.map(m => <button key={m} className={mode === m ? "chip active" : "chip"} onClick={() => setMode(m)}>{m}</button>)}</div>
        </header>

        <section className="heroGrid">
          <div className="panel heroPanel">
            <div className={analysis.isSOR ? "reactor sor" : "reactor"}>
              <div className="ring r1" /><div className="ring r2" /><div className="ring r3" />
              <div className="core"><span>Level</span><b>{analysis.level}</b><small>{analysis.isSOR ? "SOR DRIFT" : "NOR ALIGN"}</small></div>
            </div>
            <div className="heroText">
              <p className="eyebrow">Telemetry foundation</p>
              <h3>BUY trust. SELL complexity. DEAL confidence. LOT recovery. CENTRE to Level 5.</h3>
              <p>Every company action becomes a signal. NOR signals straighten the company. SOR signals skew the offer until ReCentre breaks, fuses, and recategorizes it.</p>
              <button className="primary" onClick={runRecovery}>Run 10 → 7 → 5 Recovery Simulation</button>
            </div>
          </div>

          <div className="panel statePanel">
            <p className="eyebrow">Live signal totals</p>
            {Object.entries(signalTotals).map(([k, v]) => <Meter key={k} label={`${k} =`} value={Math.round(v)} danger={["SELL","BILL","DRIFT","BATTLE"].includes(k)} />)}
          </div>
        </section>

        <section className="grid3">
          <Card title="Live Company Search" sub="One-click demos + typed company field">
            <div className="demoRow">{Object.keys(DEMOS).map(n => <button key={n} className="demo" onClick={() => loadDemo(n)}>{n}</button>)}</div>
            <input value={company} onChange={e => setCompany(e.target.value)} placeholder="Type company" />
            <input value={data.sector} onChange={e => setData({...data, sector:e.target.value})} placeholder="Sector" />
          </Card>

          <Card title="Public / Private Intake" sub="Stocks, headlines, reviews or uploads">
            <div className="split"><button className="tile">Public = stocks, earnings, launches</button><button className="tile">Private = deck, copy, reviews</button></div>
            <textarea value={copy} onChange={e => setCopy(e.target.value)} />
          </Card>

          <Card title="Recovery Cost Estimate" sub="Estimate path to Level 5">
            <div className="big">${analysis.cost}k</div><p>{analysis.months} month estimated recovery path</p>
            <p className="note">LOT = allocate budget across product, support, narrative, and distribution.</p>
          </Card>
        </section>

        <section className="grid2">
          <Card title="Score History + Trust Drift Graph" sub="Level 12 → Level 5 recovery arc">
            <div className="bars">{analysis.history.map((h,i)=><div key={i} className="barWrap"><div className={h>10?"bar danger":h===5?"bar target":"bar"} style={{height:`${h*11}px`}}/><span>L{h}</span></div>)}</div>
          </Card>
          <Card title="NOR/SOR Geometry Engine" sub="Stable areas become 90°. Risk areas skew.">
            <div className="geometry"><div className="norBox">NOR = ALIGN + BUILD + GAIN</div><div className="sorBox">SOR = DRIFT + LOSS + REPLAY</div></div>
          </Card>
        </section>

        <section className="grid3">
          <Card title="Market Confidence Heatmap" sub="Audience trust by pressure zone"><Heat cells={[data.trust, data.relevance, data.sentiment, data.growth, 100-data.pressure, analysis.nor]} /></Card>
          <Card title="Category Gravity Map" sub="Old identity pulled into new category"><Gravity old={data.offer} next={analysis.newCategory} /></Card>
          <Card title="Old Offer Shatter" sub="Weak positioning breaks apart"><Shatter text={data.offer} /></Card>
        </section>

        <section className="grid2">
          <Card title="New Nuance Fusion Core" sub="Best new positioning forms in the reactor"><div className="fusion"><div className="miniCore"/><h3>{analysis.nuance}</h3><p>{analysis.newCategory}</p></div></Card>
          <Card title="15-Level Recovery Tower v2" sub="Replay trails and Level 5 target"><LevelTower current={analysis.level}/></Card>
        </section>

        <section className="grid3">
          <Card title="Competitor Theft Scanner" sub="Who is stealing trust, traffic, customers?">{data.competitors.map((c,i)=><Meter key={c} label={`${c} =`} value={clamp(data.pressure - i*10 + 8,0,100)} danger />)}</Card>
          <Card title="Audience Loss Detector" sub="Which segment leaves first?">{["Early Adopters","Power Users","Enterprise","Consumer"].map((x,i)=><Meter key={x} label={`${x} =`} value={clamp(analysis.sor - i*9,0,100)} danger />)}</Card>
          <Card title="Trust Radar v2" sub="Animated pulse spider map"><RadarGraphic vals={[data.trust,data.relevance,100-data.pressure,data.sentiment,data.growth]} /></Card>
        </section>

        <section className="grid2">
          <Card title="Offer Weakness Highlighter" sub="Weak words glow red">
            <textarea value={copy} onChange={e=>setCopy(e.target.value)} />
            <p className="highlight">{copy.split(" ").map((w,i)=> <span key={i} className={/premium|legacy|flexible|innovative|modern|leading|solution/i.test(w)?"weak":""}>{w} </span>)}</p>
          </Card>
          <Card title="Positioning Rewrite + Trust Promise" sub="Headline, subheading, CTA">
            <h3>{analysis.newCategory} for companies rebuilding trust.</h3>
            <p>We help {data.sector.toLowerCase()} teams restore confidence, remove drift, and return to a clear market centre.</p>
            <button className="primary">CTA = ReCentre My Company</button>
          </Card>
        </section>

        <section className="grid3">
          <Card title="Review Sentiment Intake" sub="Paste reviews; find trust leaks"><textarea value={reviews} onChange={e=>setReviews(e.target.value)} /><Meter label="Review Leak =" value={analysis.sor} danger /></Card>
          <Card title="Sales Objection Analyzer" sub="Paste objections; find category failure"><textarea value={objections} onChange={e=>setObjections(e.target.value)} /><Meter label="Objection Pressure =" value={clamp(analysis.sor+8,0,100)} danger /></Card>
          <Card title="Website Screenshot Analyzer" sub="Prototype placeholder for visual trust scan"><div className="screenshotBox">UPLOAD SCREENSHOT = visual trust scan</div><Meter label="Visual Trust =" value={data.sentiment} /></Card>
        </section>

        <section className="grid2">
          <Card title="10→7→5 Recovery Simulator" sub="Choose actions and watch level improve">
            <div className="actionGrid">{SIGNALS.map(([name, desc, type, val])=><button key={name} onClick={()=>applySignal(name,val)} className={type==="nor"?"action nor":"action sor"}><b>{name} =</b><span>{desc}</span></button>)}</div>
          </Card>
          <Card title="Failure Replay Timeline" sub="What went wrong?">
            {['Launch hype', 'Price friction', 'Competitor theft', 'Audience leak', 'Category drift', 'ReCentre'].map((x,i)=><div className="timeline" key={x}><b>{i+1}</b><span>{x}</span></div>)}
          </Card>
        </section>

        <section className="grid3">
          <Card title="Level 5 Checklist" sub="Certification requirements">{["Trust above 65", "Drift below 35", "Clear category", "Strong promise", "Recovery actions active"].map((x,i)=><div className="check" key={x}>✓ {x}</div>)}<button className="primary">Award Certification = Level 5 ReCentred</button></Card>
          <Card title="Before / After Category" sub="Old identity vs new market"><div className="beforeAfter"><div>{data.offer}</div><div>{analysis.newCategory}</div></div></Card>
          <Card title="Subscription Tiers" sub="Business model"><div className="tier">Free Scan</div><div className="tier">Pro Reports</div><div className="tier">Agency Dashboard</div></Card>
        </section>

        <section className="grid2">
          <Card title="AI Strategy Copilot" sub="Chat with the recovery engine">
            <input value={chat} onChange={e=>setChat(e.target.value)} />
            <button className="primary" onClick={generateCopilot}>Ask Copilot</button>
            <p className="copilot">Answer = BUY trust, SELL weak messaging, DEAL distribution, LOT support, PUT clarity, CENTRE the company to Level 5.</p>
          </Card>
          <Card title="ReCentre Lab Notes" sub="Why each recommendation exists">
            {log.map((x,i)=><p key={i} className="log">{x}</p>)}
          </Card>
        </section>

        <footer className="panel footer">
          <b>Shareable Public Scan Link =</b> recentre.ai/scan/{company.toLowerCase()} · <b>Executive Export =</b> Board PDF placeholder · <b>Confidence Comparison =</b> compare {company} vs competitor.
        </footer>
      </section>
      <style>{CSS}</style>
    </main>
  );
}

function Card({title, sub, children}) { return <div className="panel card"><p className="eyebrow">{sub}</p><h3>{title}</h3>{children}</div>; }
function Meter({label,value,danger}) { return <div className="meter"><div><b>{label}</b><span>{value}%</span></div><div className="track"><i className={danger?"danger":""} style={{width:`${value}%`}} /></div></div>; }
function Heat({cells}) { return <div className="heat">{cells.map((v,i)=><div key={i} style={{background:`linear-gradient(135deg, rgba(255,50,140,${(100-v)/120}), rgba(50,230,255,${v/120}))`}}><b>{Math.round(v)}%</b><span>{["Audience","Product","Story","Growth","Anti-Battle","NOR"][i]}</span></div>)}</div>; }
function Gravity({old,next}) { return <div className="gravity"><div className="oldPlanet">{old}</div><div className="newPlanet">{next}</div><div className="beam" /></div>; }
function Shatter({text}) { return <div className="shatter">{text.split(" ").slice(0,9).map((w,i)=><span key={i} style={{left:`${8+i*9}%`,top:`${20+(i%3)*22}%`,transform:`rotate(${i%2?-12:14}deg)`}}>{w}</span>)}</div>; }
function LevelTower({current}) { return <div className="tower">{Array.from({length:15},(_,i)=>15-i).map(l=><div key={l} className={l===current?"level current":l===5?"level target":l>10?"level crisis":"level"}>L{l}<small>{levelName(l)}</small></div>)}</div>; }
function RadarGraphic({vals}) { const pts = vals.map((v,i)=>{const a=(-90+i*72)*Math.PI/180;const r=22+(v/100)*58;return [80+Math.cos(a)*r,80+Math.sin(a)*r].join(',')}).join(' '); return <svg viewBox="0 0 160 160" className="radar">{[25,50,75].map(r=><circle key={r} cx="80" cy="80" r={r}/>) }<polygon points={pts}/></svg>; }

const CSS = `
*{box-sizing:border-box}body{margin:0;font-family:Inter,ui-sans-serif,system-ui;background:#02040b;color:white}.app{min-height:100vh;display:grid;grid-template-columns:280px 1fr;gap:18px;padding:18px;position:relative;overflow:hidden}.ambient:before{content:"";position:fixed;inset:-20%;background:radial-gradient(circle at 15% 15%,rgba(0,229,255,.22),transparent 28%),radial-gradient(circle at 85% 20%,rgba(255,42,184,.2),transparent 26%),radial-gradient(circle at 50% 100%,rgba(93,92,255,.22),transparent 30%),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(0deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:auto,auto,auto,72px 72px,72px 72px;z-index:-2}.panel{border:1px solid rgba(255,255,255,.12);background:linear-gradient(135deg,rgba(255,255,255,.09),rgba(255,255,255,.045));border-radius:28px;box-shadow:0 24px 80px rgba(0,0,0,.35);backdrop-filter:blur(18px)}.sidebar{padding:18px;position:sticky;top:18px;height:calc(100vh - 36px);overflow:auto}.brand{display:flex;gap:12px;align-items:center;margin-bottom:18px}.logo{width:46px;height:46px;border-radius:16px;display:grid;place-items:center;background:linear-gradient(135deg,#35e8ff,#ff3ec8);font-weight:1000}.brand h1,.brand p{margin:0}.brand p,.eyebrow,.note{color:rgba(255,255,255,.55);font-size:12px}.nav{width:100%;text-align:left;background:transparent;color:rgba(255,255,255,.62);border:0;border-radius:16px;padding:11px 12px;cursor:pointer}.nav.active,.nav:hover{background:rgba(0,229,255,.13);color:white}.workspace{display:grid;gap:18px}.topbar{padding:18px;display:flex;gap:18px;justify-content:space-between;align-items:center}.topbar h2{margin:0;font-size:22px}.modeRow,.demoRow,.actionGrid{display:flex;flex-wrap:wrap;gap:8px}.chip,.demo,.primary,.action,.tile{border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.07);color:white;border-radius:999px;padding:10px 12px;font-weight:800;cursor:pointer}.chip.active,.primary{background:linear-gradient(135deg,rgba(0,229,255,.28),rgba(255,62,200,.22));border-color:rgba(0,229,255,.35)}.heroGrid{display:grid;grid-template-columns:1.5fr .8fr;gap:18px}.heroPanel{display:grid;grid-template-columns:300px 1fr;gap:24px;padding:28px;align-items:center}.reactor{height:280px;position:relative;display:grid;place-items:center}.ring{position:absolute;border:1px solid rgba(0,229,255,.35);border-radius:50%;animation:spin 18s linear infinite}.r1{width:260px;height:260px}.r2{width:200px;height:200px;border-color:rgba(255,62,200,.35);animation-direction:reverse}.r3{width:135px;height:135px}.reactor.sor{filter:hue-rotate(95deg);transform:skewX(-4deg)}.core{width:150px;height:150px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle,rgba(0,229,255,.33),rgba(0,0,0,.65));box-shadow:0 0 80px rgba(0,229,255,.35);text-align:center}.core b{font-size:54px}.heroText h3{font-size:42px;line-height:1;margin:0 0 14px}.heroText p{color:rgba(255,255,255,.64);line-height:1.7}.statePanel,.card{padding:20px}.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}.card h3{margin:5px 0 14px}.meter{margin:12px 0}.meter>div:first-child{display:flex;justify-content:space-between;font-size:13px}.track{height:10px;background:rgba(255,255,255,.08);border-radius:99px;overflow:hidden;margin-top:6px}.track i{display:block;height:100%;background:linear-gradient(90deg,#30e8ff,#63ffbf);border-radius:99px}.track i.danger{background:linear-gradient(90deg,#ff3ec8,#ff7a45)}input,textarea{width:100%;border:1px solid rgba(255,255,255,.12);background:rgba(0,0,0,.22);border-radius:16px;color:white;padding:12px;margin:8px 0;outline:none}textarea{min-height:88px}.big{font-size:46px;font-weight:1000}.split{display:grid;grid-template-columns:1fr 1fr;gap:8px}.bars{height:180px;display:flex;align-items:end;gap:12px}.barWrap{flex:1;display:grid;align-items:end;text-align:center;color:rgba(255,255,255,.6);font-size:12px}.bar{background:linear-gradient(#34e8ff,#5977ff);border-radius:16px 16px 4px 4px;min-height:20px}.bar.danger{background:linear-gradient(#ff3ec8,#ff7a45)}.bar.target{background:linear-gradient(#4dffbd,#2fff6d)}.geometry{display:grid;grid-template-columns:1fr 1fr;gap:16px}.norBox,.sorBox{padding:40px 20px;border-radius:22px;border:1px solid rgba(255,255,255,.12);font-weight:1000}.norBox{background:rgba(0,229,255,.13)}.sorBox{background:rgba(255,62,200,.13);transform:skewX(-6deg)}.heat{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.heat div{height:95px;border-radius:20px;border:1px solid rgba(255,255,255,.12);padding:14px;display:flex;flex-direction:column;justify-content:end}.gravity{height:240px;position:relative;border-radius:22px;background:rgba(0,0,0,.22);overflow:hidden}.oldPlanet,.newPlanet{position:absolute;border:1px solid rgba(255,255,255,.16);padding:18px;border-radius:24px;max-width:42%;font-weight:900}.oldPlanet{left:18px;top:78px;background:rgba(255,62,200,.13);transform:skewX(-6deg)}.newPlanet{right:18px;top:58px;border-radius:50%;background:rgba(0,229,255,.15);box-shadow:0 0 50px rgba(0,229,255,.25)}.beam{position:absolute;left:44%;top:50%;width:100px;height:2px;background:#30e8ff;box-shadow:0 0 20px #30e8ff}.shatter{height:240px;position:relative;background:rgba(0,0,0,.22);border-radius:22px;overflow:hidden}.shatter span{position:absolute;padding:10px 14px;border:1px solid rgba(255,62,200,.3);background:rgba(255,62,200,.13);border-radius:14px;font-weight:900;animation:float 2.5s ease-in-out infinite alternate}.fusion{min-height:240px;display:grid;place-items:center;text-align:center}.miniCore{width:120px;height:120px;border-radius:50%;border:1px solid rgba(0,229,255,.5);box-shadow:0 0 70px rgba(0,229,255,.35);animation:pulse 2s infinite}.tower{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}.level{border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.055);border-radius:16px;padding:10px;font-weight:1000}.level small{display:block;color:rgba(255,255,255,.48);font-size:10px}.level.current{background:rgba(0,229,255,.2);box-shadow:0 0 35px rgba(0,229,255,.24)}.level.target{background:rgba(0,255,150,.16)}.level.crisis{background:rgba(255,62,200,.12);transform:skewX(-4deg)}.radar{width:100%;height:220px}.radar circle{fill:none;stroke:rgba(255,255,255,.14)}.radar polygon{fill:rgba(0,229,255,.24);stroke:#30e8ff;stroke-width:2;animation:pulse 2s infinite}.weak{color:#ff7adf;text-shadow:0 0 14px #ff3ec8;font-weight:1000}.actionGrid{display:grid;grid-template-columns:repeat(2,1fr)}.action{border-radius:18px;text-align:left;display:grid}.action.nor{background:rgba(0,229,255,.12)}.action.sor{background:rgba(255,62,200,.12)}.timeline,.check,.log,.tier{padding:11px 12px;border:1px solid rgba(255,255,255,.1);border-radius:15px;margin:8px 0;background:rgba(255,255,255,.05)}.beforeAfter{display:grid;grid-template-columns:1fr 1fr;gap:12px}.beforeAfter div{padding:24px;border-radius:20px;border:1px solid rgba(255,255,255,.12)}.beforeAfter div:first-child{background:rgba(255,62,200,.12);transform:skewX(-5deg)}.beforeAfter div:last-child{background:rgba(0,229,255,.12)}.footer{padding:18px;color:rgba(255,255,255,.65)}.boardroom .ambient:before{background:#07101b}.boardroom .ring,.boardroom .shatter span{animation:none}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{transform:scale(1.06);opacity:.7}}@keyframes float{to{translate:0 -12px}}@media(max-width:1100px){.app{grid-template-columns:1fr}.sidebar{position:relative;height:auto}.heroGrid,.heroPanel,.grid2,.grid3{grid-template-columns:1fr}.topbar{display:block}.heroText h3{font-size:32px}}`;
