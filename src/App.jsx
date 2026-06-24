import React, { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  Award,
  BarChart3,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  Compass,
  Crosshair,
  Download,
  FileText,
  Flame,
  Gauge,
  Layers3,
  MessageSquare,
  Orbit,
  Radar,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Upload,
  Wand2,
  Zap,
} from "lucide-react";

const DEMOS = {
  Apple: {
    industry: "Consumer Technology",
    offer: "Premium device ecosystem with services and loyalty",
    trust: 82,
    relevance: 86,
    pressure: 41,
    sentiment: 78,
    growth: 72,
    competitor: "Samsung / Microsoft / Google",
  },
  Nokia: {
    industry: "Telecom Infrastructure",
    offer: "Legacy mobile heritage and network infrastructure brand",
    trust: 54,
    relevance: 49,
    pressure: 72,
    sentiment: 55,
    growth: 43,
    competitor: "Ericsson / Huawei / Samsung Networks",
  },
  Peloton: {
    industry: "Consumer Brand",
    offer: "Premium connected fitness subscription hardware",
    trust: 38,
    relevance: 41,
    pressure: 79,
    sentiment: 42,
    growth: 34,
    competitor: "Apple Fitness / Tonal / gyms",
  },
  WeWork: {
    industry: "Real Estate",
    offer: "Flexible office space with damaged investor trust",
    trust: 24,
    relevance: 46,
    pressure: 84,
    sentiment: 25,
    growth: 22,
    competitor: "Regus / Industrious / local coworking",
  },
  BlackBerry: {
    industry: "Cybersecurity",
    offer: "Security-first enterprise software after mobile decline",
    trust: 61,
    relevance: 52,
    pressure: 67,
    sentiment: 58,
    growth: 45,
    competitor: "CrowdStrike / Microsoft / Palo Alto",
  },
};

const LEVEL_LABELS = {
  1: "Minute Risk",
  2: "Stable Signal",
  3: "Light Drift",
  4: "Market Watch",
  5: "ReCentred",
  6: "Nuance Forming",
  7: "Recovery Motion",
  8: "Trust Strain",
  9: "Category Drift",
  10: "Critical Offering",
  11: "Confidence Loss",
  12: "Structural Weakness",
  13: "Collapse Warning",
  14: "Back-to-Back Replay",
  15: "Full Market Crisis",
};

const weakWords = ["generic", "legacy", "damaged", "unclear", "premium", "decline", "subscription", "hardware", "space"];

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function App() {
  const [company, setCompany] = useState("Peloton");
  const [industry, setIndustry] = useState(DEMOS.Peloton.industry);
  const [offer, setOffer] = useState(DEMOS.Peloton.offer);
  const [trust, setTrust] = useState(DEMOS.Peloton.trust);
  const [relevance, setRelevance] = useState(DEMOS.Peloton.relevance);
  const [pressure, setPressure] = useState(DEMOS.Peloton.pressure);
  const [sentiment, setSentiment] = useState(DEMOS.Peloton.sentiment);
  const [growth, setGrowth] = useState(DEMOS.Peloton.growth);
  const [competitor, setCompetitor] = useState(DEMOS.Peloton.competitor);
  const [mode, setMode] = useState("Insane Visual");
  const [scanType, setScanType] = useState("Public Company");
  const [persona, setPersona] = useState("Founder Mode");
  const [simBoost, setSimBoost] = useState(0);
  const [notes, setNotes] = useState("Reviews mention price anxiety, weak urgency, and category confusion. Sales objections: too expensive, not essential, unclear long-term value.");
  const [copilot, setCopilot] = useState("How do we reach Level 5?");

  function loadDemo(name) {
    const d = DEMOS[name];
    setCompany(name);
    setIndustry(d.industry);
    setOffer(d.offer);
    setTrust(d.trust);
    setRelevance(d.relevance);
    setPressure(d.pressure);
    setSentiment(d.sentiment);
    setGrowth(d.growth);
    setCompetitor(d.competitor);
    setSimBoost(0);
  }

  const analysis = useMemo(() => {
    const effectiveTrust = clamp(trust + simBoost, 0, 100);
    const effectiveRelevance = clamp(relevance + simBoost * 0.8, 0, 100);
    const effectiveSentiment = clamp(sentiment + simBoost * 0.65, 0, 100);
    const effectiveGrowth = clamp(growth + simBoost * 0.5, 0, 100);
    const effectivePressure = clamp(pressure - simBoost * 0.55, 0, 100);

    const weakness =
      (100 - effectiveTrust) * 0.24 +
      (100 - effectiveRelevance) * 0.21 +
      effectivePressure * 0.23 +
      (100 - effectiveSentiment) * 0.17 +
      (100 - effectiveGrowth) * 0.15;

    const level = clamp(Math.round(1 + (weakness / 100) * 14), 1, 15);
    const isSOR = level > 7;

    const categoryMap = {
      "Consumer Technology": ["Ecosystem Confidence", "trusted premium ecosystem for loyal customers"],
      "Telecom Infrastructure": ["Network Trust Intelligence", "reliability-led infrastructure confidence"],
      "Consumer Brand": ["Confidence Commerce", "trust-first lifestyle recovery for cautious buyers"],
      "Real Estate": ["Adaptive Space Confidence", "buyer confidence in flexible physical networks"],
      Cybersecurity: ["Enterprise Trust Shield", "security confidence for risk-led enterprise buyers"],
    };

    const [newCategory, nuance] = categoryMap[industry] || ["Market Trust Recovery", "trust rebuild platform for a shifting market"];
    const damage = Math.round((100 - effectiveTrust) * 0.45 + (100 - effectiveSentiment) * 0.35 + effectivePressure * 0.2);
    const urgency = Math.round(effectiveRelevance * 0.45 + effectiveGrowth * 0.25 + (100 - effectivePressure) * 0.3);
    const coherence = Math.round((effectiveTrust + effectiveSentiment + effectiveRelevance) / 3);
    const pricingTrust = Math.round((effectiveTrust + effectiveSentiment + (100 - effectivePressure)) / 3);
    const cost = Math.max(25, Math.round((level - 5) * 65 + damage * 4));
    const weeks = Math.max(4, Math.round((level - 5) * 3 + damage / 10));
    const history = [12, 11, 10, 9, 7, 5].map((v, i) => clamp(v - Math.floor(simBoost / 12) - (i > 2 ? 1 : 0), 5, 15));
    const forecast = [level, clamp(level - 1, 5, 15), clamp(level - 2, 5, 15), clamp(level - 4, 5, 15), 5];

    return {
      effectiveTrust,
      effectiveRelevance,
      effectivePressure,
      effectiveSentiment,
      effectiveGrowth,
      weakness: Math.round(weakness),
      level,
      label: LEVEL_LABELS[level],
      isSOR,
      state: isSOR ? "SOR / Skewed Offering Risk" : "NOR / Perpendicular Trust Alignment",
      path: level >= 10 ? "10 → 7 → 5" : level > 5 ? "7 → 5" : "Hold Level 5",
      newCategory,
      nuance,
      damage,
      urgency,
      coherence,
      pricingTrust,
      cost,
      weeks,
      history,
      forecast,
    };
  }, [trust, relevance, pressure, sentiment, growth, simBoost, industry]);

  const highlightOffer = offer.split(/(\s+)/).map((part, idx) => {
    const clean = part.toLowerCase().replace(/[^a-z]/g, "");
    const bad = weakWords.includes(clean);
    return <span key={idx} className={bad ? "weak-word" : ""}>{part}</span>;
  });

  return (
    <main className={mode === "Boardroom" ? "app boardroom" : "app insane"}>
      <div className="bg-grid" />
      <div className={analysis.isSOR ? "sor-lines" : "nor-lines"} />

      <section className="shell">
        <nav className="topbar">
          <div className="brand">
            <div className="brand-icon"><Compass size={28} /></div>
            <div>
              <h1>ReCentre</h1>
              <p>Company de-markation & recategorization OS</p>
            </div>
          </div>
          <div className="top-actions">
            <button className="chip" onClick={() => setMode(mode === "Boardroom" ? "Insane Visual" : "Boardroom")}>{mode} Mode</button>
            <button className="magic" onClick={() => setSimBoost((x) => clamp(x + 12, 0, 60))}><Zap size={16} /> Run Recovery Simulation</button>
          </div>
        </nav>

        <header className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles size={16} /> 50x prototype upgrade build</div>
            <h2>Pull failing companies through a perpendicular trust machine.</h2>
            <p>Scan a company, detect trust drift, shatter the weak offering, form a new category nuance, and guide the business through <b>10 → 7 → 5</b>.</p>
            <div className="pill-row">
              <Pill icon={<Crosshair size={18} />} title="NOR" text="90° trust alignment" />
              <Pill icon={<Flame size={18} />} title="SOR" text="skewed risk state" />
              <Pill icon={<Award size={18} />} title="Level 5" text="ReCentred certification" />
            </div>
          </div>

          <CoreReactor analysis={analysis} company={company} />
        </header>

        <section className="layout">
          <aside className="panel scanner">
            <SectionTitle icon={<Search size={20} />} title="Live Company Search" />
            <div className="demo-grid">
              {Object.keys(DEMOS).map((name) => <button key={name} onClick={() => loadDemo(name)}>{name}</button>)}
            </div>

            <div className="mode-grid">
              {["Public Company", "Private Company"].map((x) => <button className={scanType === x ? "selected" : ""} key={x} onClick={() => setScanType(x)}>{x === "Private Company" ? <Upload size={14} /> : <Building2 size={14} />}{x}</button>)}
            </div>

            <label>Company<input value={company} onChange={(e) => setCompany(e.target.value)} /></label>
            <label>Sector<input value={industry} onChange={(e) => setIndustry(e.target.value)} /></label>
            <label>Competitors<input value={competitor} onChange={(e) => setCompetitor(e.target.value)} /></label>
            <label>Current Offering<textarea value={offer} onChange={(e) => setOffer(e.target.value)} /></label>

            <Slider label="Trust" value={trust} setValue={setTrust} />
            <Slider label="Relevance" value={relevance} setValue={setRelevance} />
            <Slider label="Competitor Pressure" value={pressure} setValue={setPressure} />
            <Slider label="Sentiment" value={sentiment} setValue={setSentiment} />
            <Slider label="Growth" value={growth} setValue={setGrowth} />
          </aside>

          <div className="main-stack">
            <div className="mini-modes">
              {["Investor Mode", "Agency Mode", "Founder Mode", "Retail Brand Mode", "SaaS Mode", "AI Company Mode"].map((x) => <button key={x} className={persona === x ? "active" : ""} onClick={() => setPersona(x)}>{x}</button>)}
            </div>

            <div className="grid-two">
              <ScoreHistory analysis={analysis} />
              <TrustGraph analysis={analysis} />
            </div>

            <div className="grid-three">
              <MetricCard icon={<ShieldCheck size={20} />} title="Brand Damage" value={`${analysis.damage}%`} text="Reputational pressure score" />
              <MetricCard icon={<Target size={20} />} title="Offer Urgency" value={`${analysis.urgency}%`} text="Do buyers need this now?" />
              <MetricCard icon={<FileText size={20} />} title="Narrative Coherence" value={`${analysis.coherence}%`} text="Does the company story make sense?" />
            </div>

            <div className="grid-two">
              <Heatmap analysis={analysis} />
              <GravityMap analysis={analysis} offer={offer} />
            </div>

            <div className="grid-two">
              <ShatterLab offer={offer} />
              <FusionCore analysis={analysis} />
            </div>

            <LevelTower current={analysis.level} />

            <div className="grid-two">
              <BeforeAfter offer={offer} analysis={analysis} />
              <RadarPanel analysis={analysis} />
            </div>

            <div className="grid-two">
              <RecoveryCards analysis={analysis} />
              <Checklist analysis={analysis} />
            </div>

            <div className="grid-two">
              <Intake title="Review Sentiment Intake" icon={<MessageSquare size={20} />} value={notes} setValue={setNotes} output="Trust leak detected: price anxiety + unclear long-term value." />
              <Intake title="Sales Objection Analyzer" icon={<AlertTriangle size={20} />} value={copilot} setValue={setCopilot} output="Copilot says: rebuild urgency, simplify category, prove trust in one sentence." />
            </div>

            <StrategyPanel analysis={analysis} company={company} persona={persona} />
          </div>
        </section>
      </section>
      <Style />
    </main>
  );
}

function CoreReactor({ analysis, company }) {
  return <div className="panel core">
    <div className="reactor-ring ring-one" />
    <div className="reactor-ring ring-two" />
    <div className="reactor-glow" />
    <div className="core-top"><p>Executive State of Play</p><h3>{company}</h3><span>{analysis.state}</span></div>
    <div className="level-core"><Gauge size={34} /><strong>L{analysis.level}</strong><em>{analysis.label}</em></div>
    <div className="core-metrics"><Small label="Trust Drift" value={`${analysis.weakness}%`} /><Small label="Path" value={analysis.path} /><Small label="Target" value="L5" /></div>
  </div>;
}

function ScoreHistory({ analysis }) { return <div className="panel"><SectionTitle icon={<Activity size={20} />} title="ReCentre Score History" /><div className="barbox">{analysis.history.map((l,i)=><div className="barcol" key={i}><div style={{height:`${l*9}px`}} className={l===5?"bar good":l>10?"bar danger":"bar mid"}/><span>L{l}</span></div>)}</div></div>; }
function TrustGraph({ analysis }) { return <div className="panel"><SectionTitle icon={<BarChart3 size={20} />} title="Trust Drift Graph + Forecast" /><div className="linegraph">{analysis.forecast.map((l,i)=><div key={i} className="dot" style={{left:`${10+i*21}%`,bottom:`${100-l*5}%`}}><span>L{l}</span></div>)}</div></div>; }
function Heatmap({ analysis }) { const cells=[['Buyers',100-analysis.effectiveTrust],['Product',100-analysis.effectiveRelevance],['Story',100-analysis.effectiveSentiment],['Pricing',100-analysis.pricingTrust]]; return <div className="panel"><SectionTitle icon={<Radar size={20}/>} title="Market Confidence Heatmap"/><div className="heatgrid">{cells.map(([n,v])=><div key={n} className="heat" style={{background:`linear-gradient(135deg, rgba(217,70,239,${v/130}), rgba(103,232,249,${(100-v)/160}))`}}><b>{Math.round(v)}%</b><span>{n} pressure</span></div>)}</div></div>; }
function GravityMap({ analysis, offer }) { return <div className="panel"><SectionTitle icon={<Orbit size={20}/>} title="Category Gravity Map"/><div className="gravity"><div className="oldcat">Old: {offer}</div><ArrowRight className="arrow" size={34}/><div className="newcat">{analysis.newCategory}</div></div></div>; }
function ShatterLab({ offer }) { return <div className="panel"><SectionTitle icon={<AlertTriangle size={20}/>} title="Old Offer Shatter + Weakness Highlighter"/><div className="highlight">{offer.split(/(\s+)/).map((p,i)=>{const bad=weakWords.includes(p.toLowerCase().replace(/[^a-z]/g,'')); return <span key={i} className={bad?'weak-word':''}>{p}</span>})}</div><div className="shards">{offer.split(' ').slice(0,7).map((w,i)=><span key={i} style={{left:`${8+i*12}%`,top:`${20+(i%3)*22}%`}}>{w}</span>)}</div></div>; }
function FusionCore({ analysis }) { return <div className="panel fusion"><SectionTitle icon={<Sparkles size={20}/>} title="New Nuance Fusion Core"/><div className="fusion-orb"><h3>{analysis.nuance}</h3><p>New category: {analysis.newCategory}</p></div></div>; }
function LevelTower({ current }) { return <div className="panel"><SectionTitle icon={<Layers3 size={20}/>} title="15-Level Recovery Tower v2"/><div className="tower">{Array.from({length:15},(_,i)=>15-i).map(l=><div key={l} className={l===current?'now':l===5?'goal':l>10?'danger':''}><b>L{l}</b><span>{LEVEL_LABELS[l]}</span></div>)}</div></div>; }
function BeforeAfter({ offer, analysis }) { return <div className="panel"><SectionTitle icon={<RefreshCw size={20}/>} title="Category Before / After"/><div className="beforeafter"><div><small>Before</small><b>{offer}</b></div><div><small>After</small><b>{analysis.newCategory}</b></div></div></div>; }
function RadarPanel({ analysis }) { const vals=[analysis.effectiveTrust,analysis.effectiveRelevance,100-analysis.effectivePressure,analysis.effectiveSentiment,analysis.effectiveGrowth]; const pts=vals.map((v,i)=>{const a=(-90+i*72)*Math.PI/180; const r=25+v*.62; return [100+Math.cos(a)*r,100+Math.sin(a)*r].join(',')}).join(' '); return <div className="panel"><SectionTitle icon={<Radar size={20}/>} title="Trust Radar v2"/><svg viewBox="0 0 200 200" className="radarSvg"><circle cx="100" cy="100" r="80"/><circle cx="100" cy="100" r="52"/><circle cx="100" cy="100" r="24"/><polygon points={pts}/></svg></div>; }
function RecoveryCards({ analysis }) { return <div className="panel"><SectionTitle icon={<Wand2 size={20}/>} title="Recovery Action Cards"/><div className="actions"><button>30 days: simplify promise</button><button>60 days: launch new category page</button><button>90 days: certify Level 5 trust</button><p>Estimated recovery: <b>${analysis.cost}k</b> / <b>{analysis.weeks} weeks</b></p></div></div>; }
function Checklist({ analysis }) { const done=analysis.level<=5; return <div className="panel"><SectionTitle icon={<CheckCircle2 size={20}/>} title="Level 5 Checklist + Certification"/><ul className="checklist"><li>Clear category promise</li><li>Trust damage under control</li><li>Offer urgency restored</li><li>Competitor theft reduced</li></ul><div className={done?'cert on':'cert'}><Award size={22}/> Level 5 ReCentred</div></div>; }
function StrategyPanel({ analysis, company, persona }) { return <div className="panel strategy"><SectionTitle icon={<FileText size={20}/>} title="AI Strategy Copilot + Executive Report"/><h3>{company} should recategorize into <span>{analysis.newCategory}</span>.</h3><p>Mode: {persona}. ReCentre recommends rebuilding the trust promise, reducing category confusion, and moving through {analysis.path}.</p><div className="report-actions"><button><Download size={16}/> Export Board Report</button><button><CircleDollarSign size={16}/> Subscription: Pro Reports</button><button><MessageSquare size={16}/> Ask Copilot</button></div></div>; }
function Intake({ title, icon, value, setValue, output }) { return <div className="panel"><SectionTitle icon={icon} title={title}/><textarea className="bigtext" value={value} onChange={e=>setValue(e.target.value)}/><p className="output">{output}</p></div>; }
function MetricCard({ icon, title, value, text }) { return <div className="panel metric-card"><div>{icon}<span>{title}</span></div><b>{value}</b><p>{text}</p></div>; }
function SectionTitle({ icon, title }) { return <div className="section-title">{icon}<h3>{title}</h3></div>; }
function Slider({ label, value, setValue }) { return <div className="slider"><div><span>{label}</span><b>{value}</b></div><input type="range" min="0" max="100" value={value} onChange={e=>setValue(Number(e.target.value))}/></div>; }
function Small({ label, value }) { return <div className="small"><span>{label}</span><b>{value}</b></div>; }
function Pill({ icon, title, text }) { return <div className="pill">{icon}<b>{title}</b><span>{text}</span></div>; }

function Style() { return <style>{`
*{box-sizing:border-box} body{margin:0;font-family:Inter,ui-sans-serif,system-ui,Segoe UI,Arial;background:#03050d;color:white}.app{min-height:100vh;position:relative;overflow:hidden}.bg-grid{position:fixed;inset:0;background:linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(0deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:64px 64px}.nor-lines,.sor-lines{position:fixed;inset:0;pointer-events:none}.nor-lines{background:linear-gradient(90deg,transparent 49%,rgba(103,232,249,.08) 50%,transparent 51%),linear-gradient(0deg,transparent 49%,rgba(103,232,249,.08) 50%,transparent 51%)}.sor-lines{background:repeating-linear-gradient(115deg,rgba(217,70,239,.09) 0 1px,transparent 1px 46px);transform:skewY(-4deg) scale(1.1)}.insane:before{content:"";position:fixed;inset:-20%;background:radial-gradient(circle at 15% 10%,rgba(34,211,238,.2),transparent 28%),radial-gradient(circle at 85% 30%,rgba(217,70,239,.18),transparent 32%),radial-gradient(circle at 45% 90%,rgba(99,102,241,.22),transparent 30%)}.shell{position:relative;max-width:1500px;margin:0 auto;padding:28px}.topbar,.brand,.top-actions,.pill-row,.section-title,.core-metrics,.report-actions{display:flex;align-items:center;gap:12px}.topbar{justify-content:space-between;margin-bottom:34px}.brand-icon{display:grid;place-items:center;width:54px;height:54px;border-radius:20px;border:1px solid rgba(103,232,249,.35);background:rgba(103,232,249,.1);color:#a5f3fc;box-shadow:0 0 45px rgba(103,232,249,.25)}h1{font-size:28px;margin:0}p{color:rgba(255,255,255,.62);line-height:1.6}.brand p{margin:2px 0 0;font-size:12px}.hero-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:24px;margin-bottom:24px}.hero-copy{padding:42px 0}.eyebrow{display:inline-flex;gap:8px;align-items:center;border:1px solid rgba(103,232,249,.25);background:rgba(103,232,249,.1);padding:9px 14px;border-radius:999px;color:#cffafe;font-size:14px}.hero-copy h2{font-size:clamp(44px,6vw,84px);line-height:.92;margin:22px 0;font-weight:950;letter-spacing:-.06em}.hero-copy p{font-size:18px;max-width:780px}.pill{border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.06);padding:14px;border-radius:24px;display:grid;min-width:150px}.pill svg{color:#a5f3fc}.panel{position:relative;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.065);backdrop-filter:blur(18px);border-radius:30px;padding:22px;box-shadow:0 24px 80px rgba(0,0,0,.28);overflow:hidden}.boardroom .panel{background:rgba(255,255,255,.045);box-shadow:none}.core{min-height:470px}.reactor-ring{position:absolute;left:50%;top:50%;border-radius:50%;border:1px solid rgba(103,232,249,.22);transform:translate(-50%,-50%);animation:spin 18s linear infinite}.ring-one{width:360px;height:360px}.ring-two{width:250px;height:250px;animation-direction:reverse;border-color:rgba(217,70,239,.25)}.reactor-glow{position:absolute;left:50%;top:50%;width:170px;height:170px;border-radius:50%;background:rgba(103,232,249,.18);filter:blur(22px);transform:translate(-50%,-50%);animation:pulse 2s infinite}.core-top,.level-core,.core-metrics{position:relative;z-index:2}.core-top h3{font-size:42px;margin:6px 0}.core-top span{color:#67e8f9}.level-core{margin:70px auto 55px;display:grid;place-items:center;width:190px;height:190px;border-radius:50%;border:1px solid rgba(103,232,249,.34);background:rgba(0,0,0,.28);box-shadow:0 0 90px rgba(103,232,249,.28)}.level-core strong{font-size:54px}.level-core em{font-style:normal;color:rgba(255,255,255,.55);font-size:12px}.small{flex:1;border:1px solid rgba(255,255,255,.1);background:rgba(0,0,0,.22);padding:13px;border-radius:18px}.small span,.metric-card span{font-size:12px;color:rgba(255,255,255,.5)}.small b{display:block;margin-top:4px}.layout{display:grid;grid-template-columns:390px 1fr;gap:24px}.scanner{align-self:start;position:sticky;top:16px}.section-title{margin-bottom:16px}.section-title svg{color:#a5f3fc}.section-title h3{margin:0;font-size:18px}.demo-grid,.mode-grid,.mini-modes,.grid-two,.grid-three,.heatgrid,.tower,.beforeafter{display:grid;gap:12px}.demo-grid{grid-template-columns:repeat(2,1fr)}.mode-grid{grid-template-columns:repeat(2,1fr);margin:14px 0}.mini-modes{grid-template-columns:repeat(6,1fr)}button,.chip,.magic{border:1px solid rgba(103,232,249,.25);background:linear-gradient(135deg,rgba(103,232,249,.15),rgba(217,70,239,.13));color:white;border-radius:999px;padding:11px 14px;font-weight:800;cursor:pointer}button:hover{transform:translateY(-1px);border-color:rgba(103,232,249,.55)}.magic{display:flex;align-items:center;gap:8px}.selected,.active{background:rgba(103,232,249,.24);border-color:rgba(103,232,249,.6)!important}.scanner label{display:block;color:rgba(255,255,255,.6);font-size:13px;font-weight:700;margin-top:14px}input,textarea{width:100%;margin-top:7px;border:1px solid rgba(255,255,255,.12);background:rgba(0,0,0,.22);color:white;border-radius:16px;padding:12px;outline:none}textarea{min-height:82px;resize:vertical}.slider{margin:15px 0}.slider div{display:flex;justify-content:space-between;color:rgba(255,255,255,.65);font-size:13px}.slider input{accent-color:#67e8f9;padding:0}.main-stack{display:grid;gap:18px}.grid-two{grid-template-columns:repeat(2,minmax(0,1fr))}.grid-three{grid-template-columns:repeat(3,minmax(0,1fr))}.barbox{height:170px;border:1px solid rgba(255,255,255,.08);background:rgba(0,0,0,.22);border-radius:24px;padding:18px;display:flex;align-items:end;gap:12px}.barcol{flex:1;display:grid;align-items:end;text-align:center;color:rgba(255,255,255,.55);font-size:12px}.bar{border-radius:14px 14px 0 0;background:#67e8f9;box-shadow:0 0 25px rgba(103,232,249,.25)}.bar.danger{background:#e879f9}.bar.good{background:#6ee7b7}.linegraph{height:170px;border:1px solid rgba(255,255,255,.08);background:linear-gradient(115deg,rgba(103,232,249,.06),rgba(217,70,239,.07));border-radius:24px;position:relative}.dot{position:absolute;width:24px;height:24px;border-radius:50%;background:#67e8f9;box-shadow:0 0 28px rgba(103,232,249,.7);animation:pulse 1.8s infinite}.dot span{position:absolute;top:-26px;left:-7px;font-size:12px;color:rgba(255,255,255,.7)}.metric-card div{display:flex;align-items:center;gap:9px;color:#a5f3fc}.metric-card b{font-size:36px;display:block;margin-top:12px}.heatgrid{grid-template-columns:repeat(2,1fr)}.heat{min-height:105px;border:1px solid rgba(255,255,255,.1);border-radius:24px;padding:18px}.heat b{font-size:32px}.heat span{display:block;color:rgba(255,255,255,.62)}.gravity{height:230px;border:1px solid rgba(255,255,255,.08);background:rgba(0,0,0,.22);border-radius:24px;position:relative}.oldcat,.newcat{position:absolute;top:70px;width:36%;padding:18px;border-radius:22px;border:1px solid rgba(255,255,255,.1);font-weight:900}.oldcat{left:24px;background:rgba(217,70,239,.14);transform:skewX(-5deg)}.newcat{right:24px;background:rgba(103,232,249,.13);box-shadow:0 0 50px rgba(103,232,249,.18)}.arrow{position:absolute;left:48%;top:95px;color:#a5f3fc}.highlight{font-size:18px;line-height:1.9}.weak-word{background:rgba(217,70,239,.24);border:1px solid rgba(217,70,239,.35);border-radius:10px;padding:2px 6px;color:white}.shards{height:170px;position:relative;margin-top:15px;border-radius:24px;border:1px solid rgba(255,255,255,.08);background:rgba(0,0,0,.2);overflow:hidden}.shards span{position:absolute;border:1px solid rgba(217,70,239,.28);background:rgba(217,70,239,.16);padding:10px 13px;border-radius:16px;font-weight:900;animation:float 2.5s infinite alternate}.fusion-orb{min-height:250px;display:grid;place-items:center;text-align:center;border-radius:28px;border:1px solid rgba(103,232,249,.22);background:radial-gradient(circle,rgba(103,232,249,.2),rgba(217,70,239,.08),transparent 70%);animation:pulse 2.4s infinite}.fusion-orb h3{font-size:28px;max-width:420px}.tower{grid-template-columns:repeat(5,1fr)}.tower div{border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.045);border-radius:18px;padding:12px}.tower div span{display:block;color:rgba(255,255,255,.48);font-size:12px}.tower .now{border-color:#67e8f9;background:rgba(103,232,249,.18);box-shadow:0 0 35px rgba(103,232,249,.18);transform:scale(1.03)}.tower .goal{border-color:rgba(110,231,183,.5);background:rgba(110,231,183,.12)}.tower .danger{border-color:rgba(217,70,239,.25);background:rgba(217,70,239,.09);transform:skewX(-2deg)}.beforeafter{grid-template-columns:1fr 1fr}.beforeafter div{min-height:160px;border-radius:24px;border:1px solid rgba(255,255,255,.1);padding:20px;background:rgba(0,0,0,.2)}.beforeafter small{color:rgba(255,255,255,.45);display:block}.beforeafter b{font-size:22px;display:block;margin-top:12px}.radarSvg{width:100%;height:250px}.radarSvg circle{fill:none;stroke:rgba(255,255,255,.12)}.radarSvg polygon{fill:rgba(103,232,249,.22);stroke:#67e8f9;stroke-width:2;animation:pulse 2s infinite}.actions{display:grid;gap:10px}.actions p{margin:8px 0 0}.checklist{line-height:2;color:rgba(255,255,255,.68)}.cert{margin-top:14px;display:flex;gap:8px;align-items:center;border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:13px;color:rgba(255,255,255,.5)}.cert.on{border-color:rgba(110,231,183,.5);background:rgba(110,231,183,.13);color:white}.bigtext{min-height:150px}.output{border:1px solid rgba(103,232,249,.18);background:rgba(103,232,249,.08);padding:12px;border-radius:16px}.strategy h3{font-size:30px;margin:0 0 10px}.strategy h3 span{color:#67e8f9}@keyframes spin{to{transform:translate(-50%,-50%) rotate(360deg)}}@keyframes pulse{50%{transform:scale(1.06);opacity:.7}}@keyframes float{to{transform:translateY(-14px) rotate(5deg)}}@media(max-width:1100px){.hero-grid,.layout,.grid-two,.grid-three{grid-template-columns:1fr}.scanner{position:relative}.mini-modes{grid-template-columns:repeat(2,1fr)}}@media(max-width:720px){.shell{padding:16px}.topbar,.top-actions{align-items:flex-start;flex-direction:column}.tower,.heatgrid,.demo-grid,.mode-grid,.beforeafter{grid-template-columns:1fr}.hero-copy h2{font-size:44px}.core-metrics{flex-direction:column}.pill-row{flex-direction:column;align-items:stretch}}
`}</style>; }
