import React, { useMemo, useState } from 'react';

const signals = [
  ['BUY', '+12', 'Confidence entering'], ['SELL', '-4', 'Confidence leaving'],
  ['LOCK', '71%', 'Subscriber retention'], ['LEAK', '29%', 'Churn pressure'],
  ['FLOW', '83%', 'Value movement'], ['BUILD', '+16', 'Recovery structure'],
  ['TRUST', '74', 'Belief signal'], ['DRIFT', '18', 'Market misalignment'],
  ['CENTRE', '82', 'Recovery alignment'], ['RISK', '21%', 'Confidence risk'],
];

const threats = [
  { name: 'Apple Fitness+', pull: 88, angle: 12, label: 'ecosystem gravity' },
  { name: 'Tonal', pull: 64, angle: 92, label: 'premium hardware' },
  { name: 'Gyms', pull: 72, angle: 184, label: 'offline habit return' },
  { name: 'YouTube Fitness', pull: 58, angle: 266, label: 'free content pressure' },
];

const actions = [
  { title: 'Lower hardware friction', impact: '+11 Trust', body: 'Rebuild access with lower upfront cost, refurbished bundles, and trial-led ownership.' },
  { title: 'Bundle family plans', impact: '+8 Lock', body: 'Move Peloton from single-user equipment into household wellness infrastructure.' },
  { title: 'Rebuild instructor identity', impact: '+12 Flow', body: 'Make community and personality the centre again, not just equipment performance.' },
  { title: 'Corporate wellness push', impact: '+7 Growth', body: 'Position Peloton as a workplace health and retention platform.' },
];

const certification = ['Subscriber churn stabilised', 'Hardware access simplified', 'Brand story sharpened', 'Instructor-led community revived', 'Recovery level reaches 5'];

function clamp(n, min, max) { return Math.max(min, Math.min(max, n)); }

export default function App() {
  const [intensity, setIntensity] = useState(72);
  const [churn, setChurn] = useState(29);
  const [pricing, setPricing] = useState(62);
  const [community, setCommunity] = useState(78);
  const [hardware, setHardware] = useState(41);

  const model = useMemo(() => {
    const recovery = Math.round((intensity * .22) + ((100 - churn) * .24) + (pricing * .16) + (community * .24) + (hardware * .14));
    const level = clamp(Math.round(15 - recovery / 8), 5, 12);
    const trust = clamp(Math.round(recovery * .92), 0, 100);
    const drift = clamp(100 - recovery, 0, 100);
    const probability = clamp(Math.round(recovery + 9), 0, 95);
    return { recovery, level, trust, drift, probability };
  }, [intensity, churn, pricing, community, hardware]);

  return (
    <div className="app">
      <div className="ambient a1" />
      <div className="ambient a2" />
      <div className="ambient a3" />
      <div className="grid" />
      <div className="scanlines" />

      <aside className="rail">
        <div className="brandOrb">R</div>
        <div className="brandText">
          <b>ReCentre</b>
          <span>Peloton Recovery OS</span>
        </div>
        {['Company Pulse', 'Threat Rings', 'Subscriber Engine', 'Recovery Forecast', 'Board Memo', 'Certification'].map((x, i) => (
          <button key={x} className={i === 0 ? 'nav active' : 'nav'}>{x}</button>
        ))}
        <div className="railCard">
          <span>Current mission</span>
          <b>Move Peloton to Level 5</b>
          <small>Target: ReCentred market position</small>
        </div>
      </aside>

      <main className="surface">
        <header className="topbar">
          <div>
            <p className="eyebrow">Company Pulse / Live Recovery Mission</p>
            <h1>Peloton Recovery Intelligence</h1>
          </div>
          <button className="primary">Run Recovery Simulation</button>
        </header>

        <section className="ticker">
          {signals.map((s, i) => <Signal key={s[0]} item={s} good={i % 3 !== 1} />)}
        </section>

        <section className="heroGrid">
          <div className="panel dnaPanel">
            <PanelTitle k="01" title="Company DNA Helix" />
            <Helix labels={['Trust', 'Price', 'Hardware', 'Community', 'Brand', 'Growth', 'Support']} />
          </div>

          <div className="reactorPanel">
            <div className="reactorShell">
              <div className="ring ring1" />
              <div className="ring ring2" />
              <div className="ring ring3" />
              <div className="particle p1" /><div className="particle p2" /><div className="particle p3" /><div className="particle p4" />
              <div className="coreCrystal">
                <span>PELOTON</span>
                <b>LEVEL {model.level}</b>
                <em>{model.probability}% recovery probability</em>
              </div>
            </div>
            <div className="reactorStats">
              <Metric title="Trust" value={model.trust} suffix="" />
              <Metric title="Drift" value={model.drift} suffix="%" danger />
              <Metric title="Target" value="L5" />
            </div>
          </div>

          <div className="panel aiPanel">
            <PanelTitle k="02" title="Executive Intelligence" />
            <div className="aiGlow">Today's highest ROI action</div>
            <h2>Reduce hardware friction while rebuilding instructor-led community.</h2>
            <p>Peloton should shift the story from premium equipment to recurring motivation, household wellness, and trusted coaching.</p>
            <div className="impactGrid">
              <Impact v="+11" l="Trust" /><Impact v="-6" l="Drift" /><Impact v="+9" l="Lock" />
            </div>
          </div>
        </section>

        <section className="lowerGrid">
          <div className="panel threatPanel">
            <PanelTitle k="03" title="Competitor Threat Rings" />
            <ThreatRings />
          </div>

          <div className="panel horizonPanel">
            <PanelTitle k="04" title="90-Day Recovery Horizon" />
            <Horizon level={model.level} />
          </div>

          <div className="panel controlsPanel">
            <PanelTitle k="05" title="Subscriber Confidence Engine" />
            <Control label="Intensity" value={intensity} set={setIntensity} />
            <Control label="Churn Pressure" value={churn} set={setChurn} />
            <Control label="Pricing Confidence" value={pricing} set={setPricing} />
            <Control label="Community Signal" value={community} set={setCommunity} />
            <Control label="Hardware Access" value={hardware} set={setHardware} />
          </div>
        </section>

        <section className="wideGrid">
          <div className="panel riverPanel">
            <PanelTitle k="06" title="Confidence River" />
            <div className="river">
              <div className="stream in"><b>Incoming confidence</b><span>BUY · GAIN · BUILD · FLOW · CREATE · ATTRACT</span></div>
              <div className="stream out"><b>Leaving confidence</b><span>SELL · LOSS · LEAK · DECAY · BREAK · REPEL</span></div>
            </div>
          </div>

          <div className="panel actionsPanel">
            <PanelTitle k="07" title="Recovery Action Cards" />
            <div className="actionList">{actions.map(a => <Action key={a.title} {...a} />)}</div>
          </div>
        </section>

        <section className="wideGrid last">
          <div className="panel memoPanel">
            <PanelTitle k="08" title="AI Board Memo" />
            <h2>Recovery thesis</h2>
            <p>Peloton's recovery path is strongest when the company stops defending hardware as the centre of the business and instead recategorizes itself as a recurring motivation, coaching, and household wellness platform.</p>
            <div className="memoLine"><span>Primary risk</span><b>Subscription fatigue + hardware price memory</b></div>
            <div className="memoLine"><span>Primary opportunity</span><b>Community-led retention and lower-friction access</b></div>
          </div>
          <div className="panel certPanel">
            <PanelTitle k="09" title="Level 5 Certification Path" />
            {certification.map((c, i) => <div className="check" key={c}><span>{i < 3 ? '✓' : '○'}</span>{c}</div>)}
          </div>
        </section>
      </main>
      <style>{css}</style>
    </div>
  );
}

function Signal({ item, good }) { return <div className={good ? 'sig good' : 'sig bad'}><b>{item[0]}</b><span>{item[1]}</span><small>{item[2]}</small></div>; }
function PanelTitle({ k, title }) { return <div className="panelTitle"><span>{k}</span><b>{title}</b></div>; }
function Metric({ title, value, suffix = '', danger }) { return <div className={danger ? 'metric danger' : 'metric'}><span>{title}</span><b>{value}{suffix}</b></div>; }
function Impact({ v, l }) { return <div className="impact"><b>{v}</b><span>{l}</span></div>; }
function Control({ label, value, set }) { return <label className="control"><span>{label}<b>{value}</b></span><input type="range" min="0" max="100" value={value} onChange={e => set(Number(e.target.value))} /></label>; }
function Action({ title, impact, body }) { return <div className="action"><b>{title}</b><span>{impact}</span><p>{body}</p></div>; }

function Helix({ labels }) {
  return <div className="helix">{labels.map((l, i) => <div className="gene" key={l} style={{ '--i': i }}><span>{l}</span><i /></div>)}</div>;
}

function ThreatRings() {
  return <div className="orbitBox">
    <div className="companyDot">P</div>
    {threats.map(t => <div key={t.name} className="threat" style={{ transform: `rotate(${t.angle}deg) translateX(${70 + t.pull/3}px) rotate(-${t.angle}deg)` }}><b>{t.name}</b><small>{t.label}</small></div>)}
    <div className="orbit o1"/><div className="orbit o2"/><div className="orbit o3"/>
  </div>;
}

function Horizon({ level }) {
  const points = [12, 10, 9, level, Math.max(5, level - 1), 5];
  return <div className="horizon"><svg viewBox="0 0 500 180" preserveAspectRatio="none">
    <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stopColor="#ff4fd8"/><stop offset=".55" stopColor="#22d3ee"/><stop offset="1" stopColor="#7cffc7"/></linearGradient></defs>
    <path d="M0 150 C80 115, 100 135, 160 105 C230 65, 250 100, 310 70 C375 40, 420 55, 500 28" fill="none" stroke="url(#g)" strokeWidth="5"/>
    <path d="M0 180 L0 150 C80 115, 100 135, 160 105 C230 65, 250 100, 310 70 C375 40, 420 55, 500 28 L500 180 Z" fill="rgba(34,211,238,.13)"/>
  </svg><div className="horizonLabels">{points.map((p,i)=><span key={i}>L{p}</span>)}</div></div>;
}

const css = `
*{box-sizing:border-box} body{margin:0;font-family:Inter,ui-sans-serif,system-ui,Segoe UI,Arial;background:#030613;color:white} .app{min-height:100vh;position:relative;overflow:hidden;display:flex}.grid{position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:64px 64px;mask-image:radial-gradient(circle at 55% 35%,#000,transparent 85%)}.scanlines{position:fixed;inset:0;background:repeating-linear-gradient(0deg,rgba(255,255,255,.025) 0 1px,transparent 1px 5px);pointer-events:none}.ambient{position:fixed;border-radius:50%;filter:blur(70px);opacity:.6}.a1{width:520px;height:520px;background:#0ea5e9;left:-170px;top:-130px}.a2{width:620px;height:620px;background:#d946ef;right:-210px;top:180px}.a3{width:520px;height:520px;background:#14f195;left:42%;bottom:-260px;opacity:.24}.rail{position:fixed;left:22px;top:22px;bottom:22px;width:250px;border:1px solid rgba(255,255,255,.1);background:linear-gradient(180deg,rgba(255,255,255,.09),rgba(255,255,255,.035));backdrop-filter:blur(24px);border-radius:34px;padding:22px;z-index:5;box-shadow:0 30px 80px rgba(0,0,0,.35)}.brandOrb{width:56px;height:56px;border-radius:20px;background:radial-gradient(circle,#fff,#22d3ee 45%,#7c3aed);display:grid;place-items:center;color:#07111f;font-weight:1000;font-size:28px;box-shadow:0 0 60px rgba(34,211,238,.55)}.brandText{margin:14px 0 24px;display:flex;flex-direction:column}.brandText b{font-size:24px}.brandText span,.railCard span,small{color:rgba(255,255,255,.55)}.nav{width:100%;text-align:left;border:1px solid transparent;background:transparent;color:rgba(255,255,255,.65);padding:13px 14px;border-radius:18px;margin:3px 0;font-weight:800}.nav.active,.nav:hover{background:rgba(34,211,238,.13);border-color:rgba(34,211,238,.25);color:#fff}.railCard{position:absolute;left:18px;right:18px;bottom:18px;border:1px solid rgba(34,211,238,.18);background:rgba(34,211,238,.08);padding:16px;border-radius:24px;display:flex;flex-direction:column;gap:6px}.surface{width:calc(100% - 300px);margin-left:300px;padding:26px 28px 40px;position:relative;z-index:2}.topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}.eyebrow{color:#67e8f9;text-transform:uppercase;letter-spacing:.16em;font-size:12px;font-weight:900}.topbar h1{font-size:46px;line-height:.95;margin:0;letter-spacing:-.05em}.primary{border:0;color:#06111b;background:linear-gradient(135deg,#fff,#67e8f9,#f0abfc);font-weight:1000;padding:15px 20px;border-radius:999px;box-shadow:0 0 50px rgba(34,211,238,.35)}.ticker{display:grid;grid-template-columns:repeat(10,minmax(110px,1fr));gap:10px;margin-bottom:18px;overflow:auto}.sig{min-width:110px;border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:12px;background:rgba(255,255,255,.055)}.sig b{display:block}.sig span{font-size:20px;font-weight:1000}.sig.good span{color:#7cffc7}.sig.bad span{color:#ff76df}.sig small{display:block;font-size:10px}.heroGrid{display:grid;grid-template-columns:270px 1fr 320px;gap:18px;min-height:520px}.panel,.reactorPanel{border:1px solid rgba(255,255,255,.1);background:linear-gradient(145deg,rgba(255,255,255,.1),rgba(255,255,255,.035));backdrop-filter:blur(28px);border-radius:34px;box-shadow:inset 0 1px 0 rgba(255,255,255,.08),0 24px 80px rgba(0,0,0,.35);position:relative;overflow:hidden}.panel{padding:20px}.panel:before,.reactorPanel:before{content:"";position:absolute;inset:-2px;background:radial-gradient(circle at 20% 10%,rgba(34,211,238,.16),transparent 32%),radial-gradient(circle at 80% 20%,rgba(217,70,239,.16),transparent 34%);pointer-events:none}.panelTitle{position:relative;z-index:1;display:flex;align-items:center;gap:10px;margin-bottom:16px}.panelTitle span{width:34px;height:34px;border-radius:12px;background:rgba(34,211,238,.13);display:grid;place-items:center;color:#67e8f9;font-weight:1000}.panelTitle b{font-size:15px}.reactorPanel{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px}.reactorShell{width:430px;height:430px;max-width:100%;position:relative;display:grid;place-items:center}.ring{position:absolute;border-radius:50%;border:1px solid rgba(103,232,249,.3);box-shadow:0 0 55px rgba(34,211,238,.18)}.ring1{inset:18px;animation:spin 22s linear infinite}.ring2{inset:58px;border-color:rgba(240,171,252,.35);animation:spin 16s linear infinite reverse}.ring3{inset:102px;border-style:dashed;animation:spin 12s linear infinite}.coreCrystal{width:190px;height:190px;background:linear-gradient(135deg,rgba(34,211,238,.3),rgba(217,70,239,.22));clip-path:polygon(50% 0,92% 25%,92% 75%,50% 100%,8% 75%,8% 25%);display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center;filter:drop-shadow(0 0 45px rgba(34,211,238,.45));animation:breathe 3s ease-in-out infinite}.coreCrystal span{font-size:13px;letter-spacing:.18em;color:#cffafe}.coreCrystal b{font-size:44px;line-height:1}.coreCrystal em{font-size:12px;color:rgba(255,255,255,.7);font-style:normal}.particle{position:absolute;width:10px;height:10px;border-radius:50%;background:#67e8f9;box-shadow:0 0 22px #67e8f9;animation:orbit 5s linear infinite}.p1{animation-delay:0s}.p2{animation-delay:-1.2s}.p3{animation-delay:-2.5s}.p4{animation-delay:-3.8s}.reactorStats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;width:100%}.metric{background:rgba(0,0,0,.24);border:1px solid rgba(255,255,255,.08);padding:14px;border-radius:20px}.metric span{color:rgba(255,255,255,.55);font-size:12px}.metric b{display:block;font-size:26px}.metric.danger b{color:#ff76df}.helix{height:420px;position:relative;margin-top:10px}.gene{--x:calc(sin(var(--i))*30px);position:absolute;left:20px;right:20px;top:calc(18px + var(--i)*54px);height:32px;border-radius:999px;background:linear-gradient(90deg,rgba(34,211,238,.16),rgba(217,70,239,.12));border:1px solid rgba(255,255,255,.1);transform:translateX(calc((var(--i) - 3)*7px));display:flex;align-items:center;justify-content:space-between;padding:0 12px}.gene i{width:10px;height:10px;border-radius:50%;background:#67e8f9;box-shadow:0 0 16px #67e8f9}.aiPanel h2,.memoPanel h2{font-size:28px;line-height:1.05;letter-spacing:-.04em}.aiPanel p,.memoPanel p,.action p{color:rgba(255,255,255,.62);line-height:1.6}.aiGlow{display:inline-flex;padding:8px 11px;border-radius:999px;background:rgba(124,255,199,.12);color:#7cffc7;font-weight:900;font-size:12px}.impactGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:20px}.impact{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:12px}.impact b{font-size:24px;color:#7cffc7}.impact span{display:block;color:rgba(255,255,255,.55);font-size:12px}.lowerGrid{display:grid;grid-template-columns:1fr 1.5fr 1fr;gap:18px;margin-top:18px}.orbitBox{height:310px;position:relative;display:grid;place-items:center}.companyDot{width:72px;height:72px;border-radius:50%;display:grid;place-items:center;background:radial-gradient(circle,#fff,#67e8f9);color:#07111f;font-weight:1000;font-size:30px;z-index:2}.orbit{position:absolute;border-radius:50%;border:1px solid rgba(255,255,255,.1)}.o1{width:160px;height:160px}.o2{width:230px;height:230px}.o3{width:300px;height:300px}.threat{position:absolute;left:50%;top:50%;width:116px;margin-left:-58px;margin-top:-25px;border:1px solid rgba(240,171,252,.25);background:rgba(217,70,239,.12);border-radius:18px;padding:9px;text-align:center;z-index:3}.threat b{font-size:12px}.threat small{display:block;font-size:10px}.horizon{height:310px;position:relative}.horizon svg{width:100%;height:250px}.horizonLabels{display:flex;justify-content:space-between;color:rgba(255,255,255,.65);font-weight:900}.control{display:block;margin:12px 0}.control span{display:flex;justify-content:space-between;color:rgba(255,255,255,.66);font-size:13px;font-weight:800}.control input{width:100%;accent-color:#67e8f9}.wideGrid{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:18px}.river{display:grid;grid-template-columns:1fr 1fr;gap:14px}.stream{min-height:130px;border-radius:26px;border:1px solid rgba(255,255,255,.1);padding:18px;position:relative;overflow:hidden}.stream:after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(100deg,transparent 0 18px,rgba(255,255,255,.08) 18px 20px);animation:river 6s linear infinite}.stream.in{background:linear-gradient(135deg,rgba(34,211,238,.13),rgba(124,255,199,.08))}.stream.out{background:linear-gradient(135deg,rgba(217,70,239,.13),rgba(255,80,120,.06))}.stream b,.stream span{position:relative;z-index:1;display:block}.stream span{margin-top:16px;color:rgba(255,255,255,.6)}.actionList{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.action{border:1px solid rgba(255,255,255,.1);background:rgba(0,0,0,.22);border-radius:22px;padding:14px}.action span{float:right;color:#7cffc7;font-weight:1000}.memoLine,.check{display:flex;justify-content:space-between;gap:14px;border-top:1px solid rgba(255,255,255,.08);padding:14px 0}.memoLine span{color:rgba(255,255,255,.55)}.check{justify-content:flex-start;align-items:center;color:rgba(255,255,255,.76)}.check span{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;background:rgba(124,255,199,.13);color:#7cffc7;font-weight:1000}@keyframes spin{to{transform:rotate(360deg)}}@keyframes breathe{50%{transform:scale(1.06);filter:drop-shadow(0 0 80px rgba(34,211,238,.75))}}@keyframes orbit{from{transform:rotate(0deg) translateX(205px) rotate(0deg)}to{transform:rotate(360deg) translateX(205px) rotate(-360deg)}}@keyframes river{to{background-position:160px 0}}@media(max-width:1180px){.rail{position:relative;width:auto;left:auto;top:auto;bottom:auto;margin:16px}.app{display:block}.surface{margin-left:0;width:100%;padding:16px}.heroGrid,.lowerGrid,.wideGrid{grid-template-columns:1fr}.ticker{grid-template-columns:repeat(5, minmax(110px,1fr))}.railCard{position:static;margin-top:18px}.topbar{display:block}.topbar h1{font-size:38px}}@media(max-width:680px){.ticker{grid-template-columns:repeat(2,1fr)}.reactorShell{width:330px;height:330px}.heroGrid{min-height:auto}.river,.actionList{grid-template-columns:1fr}.topbar h1{font-size:34px}.surface{padding:12px}}
`;
