import React, { useMemo, useState } from "react";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bot,
  Building2,
  ChevronRight,
  CircleDot,
  Compass,
  Download,
  FileText,
  Flame,
  Gauge,
  Grid3X3,
  Home,
  Layers3,
  LineChart,
  Map,
  Orbit,
  Radar,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingDown,
  Zap,
} from "lucide-react";

const nav = [
  [Home, "Command Centre"],
  [Search, "Company Scan"],
  [Radar, "Trust Radar"],
  [LineChart, "Score History"],
  [Orbit, "Category Gravity"],
  [Activity, "Recovery Simulator"],
  [Flame, "Failure Replay"],
  [Map, "Market Heatmap"],
  [Bot, "Strategy Engine"],
  [FileText, "Reports"],
  [Settings, "Settings"],
];

const levels = {
  1: "Minute Risk",
  5: "ReCentred",
  7: "Recovery Motion",
  10: "Critical Offering",
  12: "Structural Weakness",
  15: "Full Market Crisis",
};

const companies = {
  Peloton: {
    sector: "Consumer Fitness Technology",
    offer: "Premium connected fitness brand facing trust drift, relevance loss and category confusion.",
    trust: 38,
    relevance: 41,
    pressure: 79,
    sentiment: 42,
    growth: 34,
    old: "Connected Fitness Hardware",
    fresh: "Confidence Commerce",
    promise: "We help you show up, anytime, anywhere.",
  },
  WeWork: {
    sector: "Flexible Real Estate",
    offer: "Flexible office network with damaged investor confidence and category fatigue.",
    trust: 24,
    relevance: 46,
    pressure: 84,
    sentiment: 25,
    growth: 22,
    old: "Flexible Office Space",
    fresh: "Adaptive Space Confidence",
    promise: "We make workspace feel safe, flexible and financially clear.",
  },
  Nokia: {
    sector: "Technology Infrastructure",
    offer: "Legacy mobile memory rebuilt around secure network infrastructure.",
    trust: 54,
    relevance: 48,
    pressure: 72,
    sentiment: 55,
    growth: 43,
    old: "Legacy Mobile Brand",
    fresh: "Trust Infrastructure",
    promise: "We rebuild confidence through reliable network intelligence.",
  },
};

export default function App() {
  const [name, setName] = useState("Peloton");
  const [custom, setCustom] = useState("Peloton");
  const c = companies[name] || companies.Peloton;

  const analysis = useMemo(() => {
    const weakness =
      (100 - c.trust) * 0.24 +
      (100 - c.relevance) * 0.21 +
      c.pressure * 0.23 +
      (100 - c.sentiment) * 0.17 +
      (100 - c.growth) * 0.15;
    const level = Math.min(15, Math.max(1, Math.round(1 + (weakness / 100) * 14)));
    return {
      level,
      drift: Math.round(weakness),
      label: level >= 12 ? "Structural Weakness" : level >= 10 ? "Critical Offering" : "Recovery Motion",
      path: "10 → 7 → 5",
      forecast: Math.max(2.1, (level - 5) * 0.58).toFixed(1),
      confidence: Math.max(58, 100 - Math.round(weakness / 2)),
      history: [14, 12, 12, 10, 9, 7, 8, 6, 7, 4, 2, 1],
    };
  }, [c]);

  const metrics = [
    ["Trust", c.trust, "↓ 34%"],
    ["Relevance", c.relevance, "↓ 22%"],
    ["Competitor Pressure", c.pressure, "↑ 18%"],
    ["Sentiment", c.sentiment, "↓ 29%"],
    ["Growth Signal", c.growth, "↓ 31%"],
  ];

  const loadCompany = (value) => {
    setCustom(value);
    if (companies[value]) setName(value);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#020712] text-slate-100 selection:bg-cyan-300/30">
      <Background />

      <div className="relative mx-auto max-w-[1800px] px-3 py-4 lg:px-6">
        <Header analysis={analysis} />

        <div className="grid gap-4 xl:grid-cols-[270px_1fr_330px]">
          <LeftRail />

          <section className="grid gap-4">
            <TopBar custom={custom} loadCompany={loadCompany} />
            <HeroConsole company={name} c={c} analysis={analysis} metrics={metrics} />

            <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
              <ScoreHistory values={analysis.history} />
              <Heatmap />
              <GravityMap oldCat={c.old} newCat={c.fresh} />
              <FusionCore category={c.fresh} />
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
              <ShatterLab oldCat={c.old} />
              <RecoveryTower current={analysis.level} />
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.25fr_.75fr]">
              <RecoverySimulator />
              <Forecast analysis={analysis} />
            </div>

            <Architecture />
            <ThemeFooter />
          </section>

          <RightRail c={c} analysis={analysis} company={name} />
        </div>
      </div>

      <style>{css}</style>
    </main>
  );
}

function Background() {
  return (
    <div className="pointer-events-none fixed inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,.16),transparent_35%),radial-gradient(circle_at_82%_16%,rgba(236,72,153,.18),transparent_30%),radial-gradient(circle_at_18%_50%,rgba(34,211,238,.13),transparent_32%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(148,163,184,.055)_1px,transparent_1px),linear-gradient(0deg,rgba(148,163,184,.04)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute left-[18%] top-0 h-full w-px bg-cyan-300/20 shadow-[0_0_80px_18px_rgba(34,211,238,.18)]" />
      <div className="absolute right-[24%] top-0 h-full w-px bg-pink-400/20 shadow-[0_0_90px_22px_rgba(236,72,153,.16)]" />
    </div>
  );
}

function Header({ analysis }) {
  return (
    <header className="mb-4 grid gap-4 rounded-[2rem] border border-cyan-300/15 bg-slate-950/55 p-5 shadow-2xl backdrop-blur-xl lg:grid-cols-[1fr_1.7fr_1fr]">
      <div className="panelClip border-cyan-300/20 p-5">
        <p className="text-xs font-black uppercase tracking-[.25em] text-cyan-300">Level 15 → Level 5</p>
        <h2 className="mt-2 text-3xl font-black leading-tight">Pull any company back to the market centre</h2>
        <p className="mt-4 text-sm leading-6 text-cyan-100/70">Vibrate time out of a poor offering and recategorize the new nuance into trust.</p>
      </div>

      <div className="text-center">
        <h1 className="text-6xl font-black tracking-tight md:text-8xl">
          Re<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-violet-300 to-cyan-300">Centre</span>
        </h1>
        <p className="mt-2 text-lg uppercase tracking-[.42em] text-white/70">De-Markation & Recategorization OS</p>
        <p className="mt-2 text-sm uppercase tracking-[.25em] text-cyan-100/60">The Perpendicular Trust Engine for Failing Companies</p>
      </div>

      <div className="panelClip border-pink-400/20 p-5">
        <p className="text-xs font-black uppercase tracking-[.22em] text-white/55">Current State</p>
        <h3 className="mt-1 text-4xl font-black text-rose-300">Level {analysis.level}</h3>
        <p className="mt-1 text-sm text-white/75">{analysis.label}</p>
        <p className="mt-5 text-xs font-black uppercase tracking-[.2em] text-cyan-300">Path to ReCentre</p>
        <p className="mt-1 text-2xl font-black text-cyan-200">{analysis.path}</p>
        <p className="mt-1 text-xs font-black uppercase text-rose-300">Replay loop active</p>
      </div>
    </header>
  );
}

function LeftRail() {
  return (
    <aside className="grid gap-4">
      <div className="panel min-h-[565px] overflow-hidden p-5">
        <div className="portal mx-auto mt-2">
          <div className="portalRing" />
          <div className="portalRing r2" />
          <div className="portalCore" />
          <div className="human" />
        </div>
        <div className="mt-8 h-[220px] rounded-3xl border border-cyan-300/10 bg-[radial-gradient(circle,rgba(34,211,238,.18),transparent_34%),linear-gradient(180deg,transparent,rgba(34,211,238,.07))]" />
      </div>

      <div className="panel p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-cyan-300/10 text-cyan-200 shadow-[0_0_45px_rgba(34,211,238,.25)]"><Bot /></div>
          <div><h3 className="font-black text-cyan-100">AI Copilot</h3><p className="text-xs text-white/45">Recovery strategy</p></div>
        </div>
        <p className="text-sm leading-6 text-white/60">Ask anything about recovery, strategy, positioning and trust drift.</p>
        <div className="mt-4 flex rounded-2xl border border-cyan-300/15 bg-slate-950/70 p-2">
          <input className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-white/30" placeholder="Ask Copilot..." />
          <Send className="h-5 w-5 text-cyan-300" />
        </div>
      </div>
    </aside>
  );
}

function TopBar({ custom, loadCompany }) {
  return (
    <div className="panel flex flex-col gap-3 p-3 md:flex-row md:items-center">
      <div className="flex items-center gap-3 px-2">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-cyan-300 to-pink-400"><Sparkles className="h-5 w-5 text-slate-950" /></div>
        <b className="text-xl">ReCentre</b>
      </div>
      <div className="flex flex-1 items-center gap-2 rounded-2xl border border-cyan-300/15 bg-slate-950/70 px-3 py-2">
        <Search className="h-4 w-4 text-cyan-300" />
        <select value={custom} onChange={(e) => loadCompany(e.target.value)} className="w-full bg-transparent text-sm outline-none">
          {Object.keys(companies).map((x) => <option key={x}>{x}</option>)}
        </select>
      </div>
      <button className="toggle"><span /> Executive Mode</button>
    </div>
  );
}

function HeroConsole({ company, c, analysis, metrics }) {
  return (
    <div className="panel p-5">
      <div className="grid gap-5 lg:grid-cols-[1fr_260px_260px]">
        <div className="flex flex-col justify-between rounded-[1.6rem] border border-cyan-300/10 bg-slate-950/35 p-5">
          <div>
            <h2 className="text-4xl font-black uppercase">{company}</h2>
            <p className="mt-2 text-sm text-cyan-200">{c.sector}</p>
            <p className="mt-6 max-w-md text-sm leading-6 text-white/65">{c.offer}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <Tag>Public Company</Tag><Tag>Consumer Brand</Tag><Tag>SOR State</Tag>
          </div>
        </div>

        <div className="levelOrb">
          <div className="levelOrbInner">
            <p className="text-xs font-black uppercase tracking-[.2em] text-white/70">Level</p>
            <div className="text-7xl font-black">{analysis.level}</div>
            <p className="text-xs font-black uppercase tracking-[.16em] text-white/60">{analysis.label}</p>
          </div>
          <div className="sorBadge">SOR State<br />Skewed Offering Risk</div>
        </div>

        <MiniTrend />
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-5">
        {metrics.map(([label, value, delta]) => <MetricCard key={label} label={label} value={value} delta={delta} />)}
      </div>
    </div>
  );
}

function MiniTrend() {
  const pts = [85, 88, 75, 80, 70, 62, 64, 55, 48, 40, 35, 24];
  const path = pts.map((p, i) => `${i * 20},${100 - p}`).join(" ");
  return (
    <div className="rounded-[1.6rem] border border-cyan-300/10 bg-slate-950/35 p-5">
      <h3 className="text-sm font-black uppercase tracking-wider text-cyan-300">Trust Drift Over Time</h3>
      <svg viewBox="0 0 220 110" className="mt-5 h-36 w-full overflow-visible">
        {[0, 1, 2, 3].map((i) => <line key={i} x1="0" y1={i * 28} x2="220" y2={i * 28} stroke="rgba(148,163,184,.14)" />)}
        <polyline points={path} fill="none" stroke="rgb(251,113,133)" strokeWidth="3" />
        {pts.map((p, i) => <circle key={i} cx={i * 20} cy={100 - p} r="3" fill="rgb(251,113,133)" />)}
      </svg>
    </div>
  );
}

function RightRail({ c, analysis, company }) {
  return (
    <aside className="grid gap-4 content-start">
      <div className="panel p-5">
        <Title icon={<Orbit />} text="ReCentre Engine" />
        <div className="engineOrb mb-5" />
        <p className="text-xs font-black uppercase tracking-[.2em] text-cyan-300">Analyzing 147 Signals</p>
        {["Market Data", "Social Sentiment", "Review Intelligence", "Competitor Moves", "Category Drift", "Product Relevance", "Pricing Signal"].map((x) => (
          <div key={x} className="mt-2 flex items-center justify-between text-sm text-white/65"><span className="flex items-center gap-2"><CircleDot className="h-3 w-3" />{x}</span><span className="text-cyan-300">✓</span></div>
        ))}
      </div>

      <div className="panel p-5">
        <Title icon={<Bot />} text="AI Strategy Copilot" />
        <Bubble>What should we fix first to reach Level 5?</Bubble>
        <Bubble accent>Focus on rebuilding trust through a new category nuance and sharpened offer clarity.</Bubble>
        <div className="mt-4 flex rounded-2xl border border-cyan-300/15 bg-slate-950/70 p-2">
          <input className="min-w-0 flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-white/30" placeholder="Ask Copilot..." />
          <Send className="h-5 w-5 text-cyan-300" />
        </div>
      </div>

      <div className="panel p-5">
        <Title icon={<FileText />} text="Strategy Output Preview" />
        <SmallLabel>New Category</SmallLabel><h3 className="mb-4 text-xl font-black">{c.fresh}</h3>
        <SmallLabel>New Positioning Line</SmallLabel><p className="mb-4 text-lg font-bold">The fitness ecosystem that actually fits real life.</p>
        <SmallLabel>Trust Promise</SmallLabel><p className="text-white/75">{c.promise}</p>
        <button className="actionBtn mt-5">Generate Full Strategy <ChevronRight className="h-4 w-4" /></button>
      </div>

      <div className="panel p-5">
        <Title icon={<Download />} text="Executive Report" />
        <div className="rounded-2xl border border-cyan-300/15 bg-slate-950/75 p-4">
          <p className="text-cyan-200">ReCentre</p><h3 className="text-2xl font-black uppercase">{company}</h3><p className="text-sm text-white/50">Recovery Report<br />Level {analysis.level} → Level 5</p>
        </div>
        <button className="actionBtn mt-4">Download PDF <Download className="h-4 w-4" /></button>
      </div>

      <div className="panel p-5 text-center">
        <div className="badge mx-auto"><BadgeCheck className="h-12 w-12 text-cyan-200" /><b>LEVEL 5<br />RECENTRED</b><span>Trust • Nuance • Clarity</span></div>
      </div>
    </aside>
  );
}

function ScoreHistory({ values }) {
  return <Panel title="Score History" icon={<LineChart />}><div className="h-56 rounded-3xl border border-cyan-300/10 bg-slate-950/40 p-4"><svg viewBox="0 0 420 180" className="h-full w-full"><polyline points={values.map((v, i) => `${i * 38 + 12},${170 - v * 10}`).join(" ")} fill="none" stroke="rgb(34,211,238)" strokeWidth="3" />{values.map((v, i) => <circle key={i} cx={i * 38 + 12} cy={170 - v * 10} r="4" fill="rgb(34,211,238)" />)}<text x="300" y="35" fill="rgb(244,114,182)" fontSize="15" fontWeight="900">Replay Loop 10 → 7 → 5</text></svg></div></Panel>;
}

function Heatmap() {
  return <Panel title="Market Confidence Heatmap" icon={<Map />}><div className="heat h-56 rounded-3xl border border-cyan-300/10"><span>HIGH RISK</span><b>HIGH TRUST</b></div></Panel>;
}

function GravityMap({ oldCat, newCat }) {
  return <Panel title="Category Gravity Map" icon={<Orbit />}><div className="relative h-56 rounded-3xl border border-cyan-300/10 bg-slate-950/40"><div className="gravity old"><b>{oldCat}</b><span>Old Category</span></div><div className="gravity fresh"><b>{newCat}</b><span>New Category</span></div><div className="gravityLine" /></div></Panel>;
}

function FusionCore({ category }) {
  return <Panel title="New Nuance Fusion Core" icon={<Sparkles />}><div className="fusion h-72"><div><h3>{category}</h3><p>A trust-first category experience that fits real life.</p></div></div></Panel>;
}

function ShatterLab({ oldCat }) {
  return <Panel title="Old Offer Shatter" icon={<Flame />}><div className="shatter h-72">{oldCat.split(" ").map((x, i) => <span key={i} style={{ left: `${20 + i * 13}%`, top: `${28 + (i % 3) * 18}%` }}>{x}</span>)}<button>Shattering Failed Narrative</button></div></Panel>;
}

function RecoveryTower({ current }) {
  return <Panel title="15 Level Recovery Tower" icon={<Layers3 />}><div className="tower h-72"><div className="rings">{Array.from({ length: 9 }, (_, i) => <i key={i} style={{ bottom: `${i * 20 + 22}px`, width: `${220 - i * 12}px` }} />)}</div><b className="towerLabel l15">Level 15</b><b className="towerLabel l10">Level 10</b><b className="towerLabel l7">Level 7</b><b className="towerLabel l5">Level 5</b><p>PATH: 10 → 7 → 5</p></div></Panel>;
}

function RecoverySimulator() {
  const actions = ["Reposition", "Rebuild Trust", "Refocus Offer", "Reignite Growth"];
  return <Panel title="Recovery Simulator" icon={<Activity />}><div className="grid gap-3 md:grid-cols-4">{actions.map((x) => <button className="sim" key={x}><b>{x}</b><span>{x === "Reposition" ? "Create new category nuance & story" : x === "Rebuild Trust" ? "Fix reviews, service & experience" : x === "Refocus Offer" ? "Simplify, clarify, create urgency" : "Acquisition, retention, expansion engine"}</span></button>)}</div></Panel>;
}

function Forecast({ analysis }) {
  return <Panel title="Forecast to Level 5" icon={<TrendingDown />}><div className="rounded-3xl border border-cyan-300/10 bg-slate-950/40 p-5"><SmallLabel>Estimated Time</SmallLabel><h3 className="text-2xl font-black">{analysis.forecast} Months</h3><SmallLabel>Confidence of Recovery</SmallLabel><h3 className="text-2xl font-black text-cyan-300">{analysis.confidence}%</h3><svg viewBox="0 0 220 70" className="mt-3 h-20 w-full"><polyline points="0,60 20,58 40,50 60,48 80,39 100,42 120,30 140,26 160,20 180,12 200,6 220,0" fill="none" stroke="rgb(34,211,238)" strokeWidth="3" /></svg></div></Panel>;
}

function Architecture() {
  const items = ["Header", "TrustMetrics", "LevelGauge", "ScoreHistory", "HeatmapWorld", "CategoryGravity", "ShatterAnimation", "NuanceFusionCore", "RecoveryTower", "RecoverySimulator", "ForecastPanel", "StrategyOutput", "AICopilot", "ReportExport", "CertificationBadge"];
  return <div className="panel p-5"><Title icon={<Grid3X3 />} text="Component Breakdown & System Architecture" /><div className="grid gap-3 md:grid-cols-3 xl:grid-cols-5">{items.map((x) => <div key={x} className="codeCard"><b>&lt;{x} /&gt;</b><span>props: &#123; signal, state, gradient &#125;</span></div>)}</div></div>;
}

function ThemeFooter() {
  return <footer className="panel mb-2 grid gap-4 p-5 md:grid-cols-6"><FooterBlock title="Colours"><div className="flex gap-2">{["#fb3568","#22d3ee","#2dd4bf","#d946ef","#a78bfa","#64748b","#f97316"].map((c) => <i key={c} className="h-6 w-6 rounded-full" style={{ background: c }} />)}</div></FooterBlock><FooterBlock title="Typography">Orbitron / Exo 2<br />Inter / Space Grotesk</FooterBlock><FooterBlock title="Layout System">NOR perpendicular cards, grids, 90°</FooterBlock><FooterBlock title="SOR Skewed">Angles, diagonals, warning state</FooterBlock><FooterBlock title="Animations">Particles, glows, shatter, fusion, orbit</FooterBlock><FooterBlock title="UI Feel">Insane, immersive, magical, futuristic</FooterBlock></footer>;
}

function Panel({ title, icon, children }) { return <div className="panel p-5"><Title icon={icon} text={title} />{children}</div>; }
function Title({ icon, text }) { return <div className="mb-4 flex items-center gap-2"><div className="text-cyan-300">{React.cloneElement(icon, { className: "h-5 w-5" })}</div><h3 className="text-sm font-black uppercase tracking-[.14em] text-cyan-200">{text}</h3></div>; }
function Tag({ children }) { return <span className="rounded-lg border border-violet-300/20 bg-violet-300/10 px-3 py-1 text-xs font-black uppercase text-violet-200">{children}</span>; }
function MetricCard({ label, value, delta }) { return <div className="metric"><SmallLabel>{label}</SmallLabel><h3>{value}<span>/100</span></h3><p>{delta}</p><svg viewBox="0 0 100 35"><polyline points="0,30 12,26 24,28 36,18 48,22 60,11 72,14 84,8 100,15" fill="none" stroke="rgb(251,113,133)" strokeWidth="2" /></svg></div>; }
function SmallLabel({ children }) { return <p className="text-xs font-black uppercase tracking-[.12em] text-cyan-200/70">{children}</p>; }
function Bubble({ children, accent }) { return <div className={`mt-3 rounded-2xl border p-4 text-sm leading-6 ${accent ? "border-cyan-300/15 bg-cyan-300/10 text-cyan-100" : "border-white/10 bg-slate-950/60 text-white/70"}`}>{children}</div>; }
function FooterBlock({ title, children }) { return <div><h4 className="mb-2 text-xs font-black uppercase tracking-[.18em] text-pink-300">{title}</h4><div className="text-sm leading-6 text-white/60">{children}</div></div>; }

const css = `
.panel{border:1px solid rgba(34,211,238,.16);background:linear-gradient(180deg,rgba(15,23,42,.72),rgba(2,6,23,.82));box-shadow:0 0 0 1px rgba(255,255,255,.03) inset,0 22px 70px rgba(0,0,0,.35);border-radius:22px;backdrop-filter:blur(18px)}
.panelClip{border:1px solid;border-radius:20px;background:rgba(2,6,23,.58);clip-path:polygon(0 0,94% 0,100% 18%,100% 100%,6% 100%,0 82%)}
.toggle{display:flex;align-items:center;gap:9px;border:1px solid rgba(34,211,238,.18);border-radius:999px;background:rgba(15,23,42,.75);padding:10px 14px;font-size:12px;color:rgba(255,255,255,.7)}.toggle span{width:34px;height:18px;border-radius:999px;background:rgb(244,63,94);box-shadow:0 0 18px rgba(244,63,94,.8)}
.portal{position:relative;width:210px;height:280px}.portalRing,.portalRing:before{position:absolute;inset:20px 10px;border-radius:50%;border:2px solid rgba(34,211,238,.5);box-shadow:0 0 50px rgba(34,211,238,.45);animation:spin 20s linear infinite}.portalRing:before{content:"";inset:22px;border-color:rgba(217,70,239,.45);animation:none}.portalRing.r2{inset:52px 42px;border-color:rgba(99,102,241,.45);animation-direction:reverse}.portalCore{position:absolute;left:50%;top:35%;width:48px;height:170px;transform:translateX(-50%);background:linear-gradient(180deg,rgba(34,211,238,.8),transparent);filter:blur(14px)}.human{position:absolute;left:50%;bottom:25px;width:16px;height:42px;transform:translateX(-50%);border-radius:999px;background:#020617;box-shadow:0 0 22px rgba(34,211,238,.9)}
.levelOrb{position:relative;display:grid;place-items:center;min-height:300px}.levelOrb:before{content:"";position:absolute;width:245px;height:245px;border-radius:50%;border:8px solid rgba(244,63,94,.65);box-shadow:0 0 60px rgba(244,63,94,.5),inset 0 0 60px rgba(244,63,94,.22);animation:pulse 2.2s ease-in-out infinite}.levelOrb:after{content:"";position:absolute;width:180px;height:180px;border-radius:50%;border:1px solid rgba(34,211,238,.35);animation:spin 13s linear infinite}.levelOrbInner{text-align:center;z-index:1}.sorBadge{position:absolute;bottom:10px;border:1px solid rgba(244,63,94,.4);border-radius:14px;padding:10px 20px;text-align:center;text-transform:uppercase;font-weight:900;font-size:12px;color:#fda4af;background:rgba(244,63,94,.09)}
.metric{border:1px solid rgba(34,211,238,.16);border-radius:14px;background:rgba(15,23,42,.62);padding:16px}.metric h3{font-size:30px;font-weight:900}.metric h3 span{font-size:13px;color:rgba(255,255,255,.6)}.metric p{color:#fb7185;font-size:13px;font-weight:900}.actionBtn{display:flex;width:100%;align-items:center;justify-content:center;gap:8px;border:1px solid rgba(34,211,238,.35);border-radius:14px;background:rgba(34,211,238,.08);padding:12px;text-transform:uppercase;font-size:12px;font-weight:900;color:#67e8f9}.engineOrb{height:185px;border-radius:24px;background:radial-gradient(circle at 50% 50%,rgba(244,114,182,.9),rgba(34,211,238,.28) 18%,transparent 52%),repeating-radial-gradient(circle,rgba(34,211,238,.35) 0 1px,transparent 1px 18px);animation:pulse 2.4s infinite ease-in-out}
.heat{position:relative;overflow:hidden;background:radial-gradient(circle at 28% 48%,rgba(244,63,94,.75),transparent 31%),radial-gradient(circle at 67% 42%,rgba(34,211,238,.72),transparent 34%),radial-gradient(circle at 50% 60%,rgba(217,70,239,.45),transparent 38%),#020617}.heat:before{content:"";position:absolute;inset:35px;background:linear-gradient(35deg,transparent 45%,rgba(255,255,255,.22) 50%,transparent 55%);filter:blur(20px)}.heat span,.heat b{position:absolute;bottom:14px;font-size:11px}.heat span{left:18px;color:#fb7185}.heat b{right:18px;color:#67e8f9}.gravity{position:absolute;top:68px;width:118px;height:118px;border-radius:999px;display:grid;place-items:center;text-align:center;padding:16px}.gravity b{font-size:13px}.gravity span{font-size:11px;color:rgba(255,255,255,.55)}.gravity.old{left:35px;border:1px solid rgba(244,63,94,.35);background:radial-gradient(circle,rgba(244,63,94,.35),transparent 65%)}.gravity.fresh{right:35px;border:1px solid rgba(34,211,238,.45);background:radial-gradient(circle,rgba(34,211,238,.45),transparent 65%);box-shadow:0 0 55px rgba(34,211,238,.28)}.gravityLine{position:absolute;left:155px;right:155px;top:126px;height:2px;background:linear-gradient(90deg,#fb7185,#22d3ee);box-shadow:0 0 20px #22d3ee}
.fusion{position:relative;display:grid;place-items:center;overflow:hidden;border:1px solid rgba(34,211,238,.16);border-radius:22px;background:radial-gradient(circle,rgba(34,211,238,.24),transparent 38%),#020617}.fusion:before,.fusion:after{content:"";position:absolute;width:245px;height:245px;border-radius:50%;border:1px solid rgba(34,211,238,.35);animation:spin 14s linear infinite}.fusion:after{width:170px;height:170px;border-color:rgba(217,70,239,.45);animation-direction:reverse}.fusion div{text-align:center;z-index:1}.fusion h3{font-size:26px;font-weight:900}.fusion p{color:rgba(255,255,255,.6);font-size:13px}.shatter{position:relative;overflow:hidden;border:1px solid rgba(244,63,94,.18);border-radius:22px;background:radial-gradient(circle,rgba(244,63,94,.28),transparent 33%),#020617}.shatter span{position:absolute;border:1px solid rgba(244,63,94,.28);background:rgba(244,63,94,.12);border-radius:12px;padding:10px 14px;font-weight:900;animation:float 2.2s ease-in-out infinite alternate}.shatter button{position:absolute;left:50%;bottom:20px;transform:translateX(-50%);border:1px solid rgba(217,70,239,.4);border-radius:999px;background:rgba(217,70,239,.13);padding:10px 22px;text-transform:uppercase;font-weight:900;color:#f0abfc}.tower{position:relative;overflow:hidden;border:1px solid rgba(34,211,238,.16);border-radius:22px;background:radial-gradient(circle at 50% 95%,rgba(34,211,238,.28),transparent 35%),#020617}.rings i{position:absolute;left:50%;height:26px;transform:translateX(-50%);border:2px solid rgba(34,211,238,.5);border-radius:50%;box-shadow:0 0 25px rgba(34,211,238,.25);background:linear-gradient(90deg,rgba(34,211,238,.1),rgba(217,70,239,.1))}.towerLabel{position:absolute;right:22px;font-size:12px}.l15{top:30px;color:#f0abfc}.l10{top:95px;color:#fb7185}.l7{top:145px;color:#c084fc}.l5{top:197px;color:#5eead4}.tower p{position:absolute;bottom:18px;width:100%;text-align:center;font-weight:900;color:#fda4af}.sim{border:1px solid rgba(34,211,238,.16);border-radius:16px;background:rgba(15,23,42,.58);padding:18px;text-align:left}.sim b{display:block;color:#67e8f9;text-transform:uppercase}.sim span{font-size:13px;color:rgba(255,255,255,.55)}.codeCard{border:1px solid rgba(34,211,238,.12);border-radius:12px;background:rgba(15,23,42,.55);padding:14px}.codeCard b{display:block;color:#67e8f9;font-family:monospace}.codeCard span{font-size:12px;color:rgba(255,255,255,.48)}.badge{display:grid;place-items:center;width:210px;height:210px;border:5px double rgba(226,232,240,.7);border-radius:50%;background:radial-gradient(circle,rgba(34,211,238,.28),rgba(15,23,42,.7));box-shadow:0 0 40px rgba(34,211,238,.2)}.badge b{font-size:20px}.badge span{font-size:11px;color:rgba(255,255,255,.6)}
select option{background:#020617}.footer{}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{transform:scale(1.04);opacity:.75}}@keyframes float{to{translate:0 -13px;rotate:5deg}}
@media(max-width:900px){.levelOrb:before{width:210px;height:210px}.portal{display:none}.gravityLine{left:130px;right:130px}}
`;
