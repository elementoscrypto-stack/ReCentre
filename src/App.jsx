import React, { useMemo, useState } from 'react';

const DEMOS = {
  Peloton: { sector: 'Consumer Fitness', level: 9, trust: 52, drift: 48, growth: 39, value: 57, risk: 41 },
  Nokia: { sector: 'Network Technology', level: 7, trust: 66, drift: 31, growth: 48, value: 64, risk: 29 },
  WeWork: { sector: 'Flexible Workspace', level: 12, trust: 35, drift: 72, growth: 26, value: 38, risk: 74 },
  BlackBerry: { sector: 'Cybersecurity', level: 6, trust: 71, drift: 24, growth: 52, value: 69, risk: 22 },
  Apple: { sector: 'Consumer Technology', level: 3, trust: 88, drift: 11, growth: 78, value: 91, risk: 9 },
};

const SIGNALS = [
  ['BUY', '+12', 'Confidence entering'], ['SELL', '-4', 'Confidence leaving'],
  ['GAIN', '+8', 'Trust increasing'], ['LOSS', '-2', 'Trust decreasing'],
  ['BUILD', '+6', 'Structure strengthening'], ['DRIFT', '+18', 'Market misalignment'],
  ['TRUST', '74', 'Belief entering'], ['DOUBT', '26', 'Belief leaving'],
  ['FLOW', '83%', 'Healthy movement'], ['LOCK', '91%', 'Customer retention'],
  ['VALUE', '+22', 'Perceived usefulness'], ['RISK', '18%', 'Failure probability'],
];

const IN_FLOW = ['BUY', 'GAIN', 'BUILD', 'FLOW', 'CREATE', 'ATTRACT', 'LOCK', 'TRUST'];
const OUT_FLOW = ['SELL', 'LOSS', 'LEAK', 'DECAY', 'BREAK', 'REPEL', 'DOUBT', 'DRIFT'];
const OPPS = ['Rebrand', 'New Audience', 'Pricing Reset', 'Partnership', 'Product Focus', 'AI Layer', 'Enterprise Move', 'Trust Campaign'];
const DNA = ['Brand', 'Market', 'Audience', 'Pricing', 'Narrative', 'Product', 'Support', 'Innovation'];

export default function App() {
  const [company, setCompany] = useState('Peloton');
  const [view, setView] = useState('Insane Visual Mode');
  const [boost, setBoost] = useState(0);
  const data = DEMOS[company];

  const pulse = useMemo(() => {
    const recoveredLevel = Math.max(5, data.level - boost);
    const trust = Math.min(99, data.trust + boost * 7);
    const drift = Math.max(4, data.drift - boost * 8);
    const recovery = Math.min(96, 100 - recoveredLevel * 4 + boost * 7);
    const status = recoveredLevel <= 5 ? 'Level 5 ReCentred' : recoveredLevel <= 7 ? 'Recovery Motion' : recoveredLevel <= 10 ? 'Market Drift' : 'Critical Recovery';
    return { recoveredLevel, trust, drift, recovery, status };
  }, [data, boost]);

  function runRecovery() {
    setBoost((b) => (b >= 5 ? 0 : b + 1));
  }

  return (
    <div className="app">
      <div className="spaceGrid" />
      <div className="aurora a1" />
      <div className="aurora a2" />
      <div className="aurora a3" />

      <aside className="sidebar">
        <div className="brandMark">RC</div>
        <div>
          <h1>ReCentre</h1>
          <p>The operating system for company recovery</p>
        </div>
        <nav>
          {['Company Pulse', 'Recovery Scanner', 'Market Signals', 'Category Studio', 'Recovery Lab', 'Executive Reports', 'AI Copilot'].map((item, i) => (
            <button key={item} className={i === 0 ? 'navActive' : ''}>{item}</button>
          ))}
        </nav>
        <div className="sideCard">
          <span>Today’s Focus</span>
          <strong>Reduce drift, increase trust, return to Level 5.</strong>
        </div>
      </aside>

      <main className="surface">
        <header className="topbar">
          <div>
            <p className="eyebrow">Company Pulse</p>
            <h2>Recover. Rebuild. ReCentre.</h2>
          </div>
          <div className="controls">
            <select value={company} onChange={(e) => { setCompany(e.target.value); setBoost(0); }}>
              {Object.keys(DEMOS).map((x) => <option key={x}>{x}</option>)}
            </select>
            <button onClick={() => setView(view === 'Boardroom Mode' ? 'Insane Visual Mode' : 'Boardroom Mode')}>{view}</button>
            <button className="primary" onClick={runRecovery}>Run Recovery Simulation</button>
          </div>
        </header>

        <section className="ticker">
          {SIGNALS.map(([name, val, desc]) => (
            <div className="tick" key={name}>
              <b>{name}</b><span>{val}</span><small>{desc}</small>
            </div>
          ))}
        </section>

        <section className="heroGrid">
          <CompanyDNA trust={pulse.trust} drift={pulse.drift} />
          <Reactor company={company} sector={data.sector} pulse={pulse} />
          <ExecutiveAI pulse={pulse} runRecovery={runRecovery} />
        </section>

        <section className="lowerGrid">
          <ConfidenceRiver />
          <RecoveryHorizon pulse={pulse} />
          <OpportunityGalaxy />
        </section>

        <section className="wideGrid">
          <MarketGravity company={company} />
          <RecoveryTimeline />
          <SignalFormula />
        </section>
      </main>

      <style>{css}</style>
    </div>
  );
}

function Reactor({ company, sector, pulse }) {
  return (
    <section className="reactorPanel glass">
      <div className="reactorShell">
        <div className="ring ring1" />
        <div className="ring ring2" />
        <div className="ring ring3" />
        <div className="ring ring4" />
        {Array.from({ length: 30 }).map((_, i) => <i key={i} className="particle" style={{ '--i': i }} />)}
        <div className="coreCrystal">
          <span>{sector}</span>
          <h3>{company}</h3>
          <strong>Level {pulse.recoveredLevel}</strong>
          <em>{pulse.status}</em>
        </div>
      </div>
      <div className="reactorStats">
        <Mini label="Trust" value={pulse.trust + '%'} />
        <Mini label="Market Drift" value={pulse.drift + '%'} />
        <Mini label="Recovery Probability" value={pulse.recovery + '%'} />
      </div>
    </section>
  );
}

function CompanyDNA({ trust, drift }) {
  return (
    <section className="glass dnaPanel">
      <PanelTitle kicker="Living Company Model" title="Company DNA" />
      <div className="helix">
        {DNA.map((d, i) => {
          const strength = Math.max(22, Math.min(96, trust - drift / 3 + i * 3));
          return <div className="gene" key={d} style={{ '--s': strength + '%', '--i': i }}><span>{d}</span><b>{Math.round(strength)}</b></div>;
        })}
      </div>
    </section>
  );
}

function ExecutiveAI({ pulse, runRecovery }) {
  return (
    <section className="glass aiPanel">
      <PanelTitle kicker="Executive Intelligence" title="Highest ROI Action" />
      <div className="aiOrb">AI</div>
      <h3>Increase pricing confidence and rewrite the market promise.</h3>
      <div className="impactGrid">
        <Mini label="Trust Gain" value="＋11" />
        <Mini label="Drift Cut" value="−8" />
        <Mini label="Recovery" value={pulse.recovery + '%'} />
      </div>
      <button className="primary full" onClick={runRecovery}>Apply Action</button>
    </section>
  );
}

function ConfidenceRiver() {
  return (
    <section className="glass riverPanel">
      <PanelTitle kicker="Signal Flow" title="Confidence River" />
      <div className="river">
        <div className="stream inStream">{IN_FLOW.map((x) => <span key={x}>{x}</span>)}</div>
        <div className="stream outStream">{OUT_FLOW.map((x) => <span key={x}>{x}</span>)}</div>
      </div>
    </section>
  );
}

function RecoveryHorizon({ pulse }) {
  const levels = [12, 10, 8, 7, 6, pulse.recoveredLevel, 5];
  return (
    <section className="glass horizonPanel">
      <PanelTitle kicker="AI Forecast" title="Recovery Horizon" />
      <div className="mountains">
        {levels.map((l, i) => <div key={i} className="mountain" style={{ height: `${(16 - l) * 9 + 28}px` }}><span>L{l}</span></div>)}
      </div>
      <p>Projected path: stabilize trust, reduce market drift, certify Level 5.</p>
    </section>
  );
}

function OpportunityGalaxy() {
  return (
    <section className="glass galaxyPanel">
      <PanelTitle kicker="Market Pull" title="Opportunity Galaxy" />
      <div className="galaxy">
        <div className="sun">VALUE</div>
        {OPPS.map((o, i) => <span key={o} className="planet" style={{ '--i': i }}>{o}</span>)}
      </div>
    </section>
  );
}

function MarketGravity({ company }) {
  return (
    <section className="glass gravityPanel">
      <PanelTitle kicker="Stakeholder Orbit" title="Market Gravity Engine" />
      <div className="gravityMap">
        <div className="companyNode">{company}</div>
        {['Customers', 'Competitors', 'Investors', 'Media', 'Employees', 'Partners'].map((x, i) => <span key={x} style={{ '--i': i }}>{x}</span>)}
      </div>
    </section>
  );
}

function RecoveryTimeline() {
  return (
    <section className="glass timelinePanel">
      <PanelTitle kicker="Failure Replay" title="Recovery Timeline" />
      <div className="timeline">
        {['Failure', 'Drift', 'Customer Loss', 'New Promise', 'Recovery', 'Level 5'].map((x) => <div key={x}><b>{x}</b><span /></div>)}
      </div>
    </section>
  );
}

function SignalFormula() {
  return (
    <section className="glass formulaPanel">
      <PanelTitle kicker="Telemetry Logic" title="Signal Formula Language" />
      {['BUY + TRUST = GAIN', 'SELL + TRUST = LOSS', 'DRIFT + PRESSURE = RISK', 'CENTRE + CLARITY = STABILITY', 'REPAIR + RELEVANCE = GROWTH'].map((f) => <code key={f}>{f}</code>)}
    </section>
  );
}

function PanelTitle({ kicker, title }) { return <div className="panelTitle"><span>{kicker}</span><h3>{title}</h3></div>; }
function Mini({ label, value }) { return <div className="mini"><span>{label}</span><b>{value}</b></div>; }

const css = `
*{box-sizing:border-box}body{margin:0;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Arial;background:#03050d;color:white}button,select{font:inherit}.app{min-height:100vh;display:grid;grid-template-columns:270px 1fr;position:relative;overflow:hidden}.spaceGrid{position:fixed;inset:0;background:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:62px 62px;mask-image:radial-gradient(circle at 55% 35%,black,transparent 80%)}.aurora{position:fixed;border-radius:999px;filter:blur(80px);opacity:.55;pointer-events:none}.a1{width:520px;height:520px;background:#00d9ff;left:220px;top:-120px}.a2{width:520px;height:520px;background:#ff3df2;right:-150px;top:180px}.a3{width:620px;height:620px;background:#6d5cff;left:40%;bottom:-300px}.sidebar{position:relative;z-index:2;padding:28px 20px;border-right:1px solid rgba(255,255,255,.09);background:rgba(3,5,13,.68);backdrop-filter:blur(28px);min-height:100vh}.brandMark{width:58px;height:58px;border-radius:22px;display:grid;place-items:center;font-weight:1000;font-size:20px;background:linear-gradient(135deg,rgba(0,217,255,.22),rgba(255,61,242,.18));border:1px solid rgba(255,255,255,.18);box-shadow:0 0 45px rgba(0,217,255,.22)}h1{margin:16px 0 0;font-size:28px}h1+p{margin:5px 0 28px;color:rgba(255,255,255,.55);font-size:13px;line-height:1.5}nav{display:grid;gap:9px}nav button{border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.04);color:rgba(255,255,255,.68);border-radius:18px;padding:13px 14px;text-align:left;cursor:pointer}.navActive{background:linear-gradient(90deg,rgba(0,217,255,.18),rgba(255,61,242,.08));color:white;border-color:rgba(0,217,255,.28)}.sideCard{margin-top:28px;border:1px solid rgba(0,217,255,.18);background:rgba(0,217,255,.08);border-radius:24px;padding:18px}.sideCard span,.eyebrow,.panelTitle span,.mini span{color:rgba(255,255,255,.52);font-size:12px;text-transform:uppercase;letter-spacing:.12em}.sideCard strong{display:block;margin-top:8px;line-height:1.4}.surface{position:relative;z-index:1;padding:28px;min-width:0}.topbar{display:flex;align-items:center;justify-content:space-between;gap:20px}.topbar h2{font-size:42px;margin:4px 0 0;letter-spacing:-.04em}.controls{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}.controls select,.controls button,.primary{border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.07);color:white;border-radius:999px;padding:11px 15px;cursor:pointer}.primary{background:linear-gradient(135deg,#00d9ff,#8d5cff 55%,#ff3df2);color:#02040a;font-weight:900;box-shadow:0 0 40px rgba(0,217,255,.28)}.full{width:100%;margin-top:14px}.ticker{margin:22px 0;display:flex;gap:10px;overflow:hidden;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.045);border-radius:26px;padding:12px;backdrop-filter:blur(18px)}.tick{min-width:132px;border-right:1px solid rgba(255,255,255,.08);padding:4px 10px}.tick b{font-size:13px}.tick span{margin-left:9px;color:#5ff4ff;font-weight:900}.tick small{display:block;color:rgba(255,255,255,.4);margin-top:3px;font-size:10px}.heroGrid{display:grid;grid-template-columns:260px minmax(420px,1fr) 300px;gap:18px}.lowerGrid{display:grid;grid-template-columns:1fr 1.4fr 1fr;gap:18px;margin-top:18px}.wideGrid{display:grid;grid-template-columns:1fr 1.2fr 1fr;gap:18px;margin-top:18px}.glass{position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.105);background:linear-gradient(145deg,rgba(255,255,255,.095),rgba(255,255,255,.035));border-radius:32px;padding:20px;box-shadow:inset 0 1px 0 rgba(255,255,255,.11),0 30px 90px rgba(0,0,0,.32);backdrop-filter:blur(26px)}.glass:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 30% 0%,rgba(0,217,255,.13),transparent 42%),radial-gradient(circle at 80% 20%,rgba(255,61,242,.11),transparent 42%);pointer-events:none}.panelTitle{position:relative;z-index:1}.panelTitle h3{margin:5px 0 16px;font-size:22px}.reactorPanel{min-height:560px;display:flex;flex-direction:column;justify-content:space-between}.reactorShell{height:420px;position:relative;display:grid;place-items:center}.ring{position:absolute;border-radius:50%;border:1px solid rgba(95,244,255,.22);box-shadow:0 0 35px rgba(0,217,255,.14)}.ring1{width:390px;height:390px;animation:spin 30s linear infinite}.ring2{width:305px;height:305px;border-color:rgba(255,61,242,.22);animation:spin 22s linear reverse infinite}.ring3{width:225px;height:225px;border-style:dashed;animation:spin 15s linear infinite}.ring4{width:455px;height:160px;transform:rotate(-12deg);border-color:rgba(255,255,255,.12);animation:tilt 6s ease-in-out infinite}.particle{position:absolute;width:5px;height:5px;border-radius:50%;background:#6ff7ff;box-shadow:0 0 18px #6ff7ff;transform:rotate(calc(var(--i)*12deg)) translateX(198px);animation:particle 3s ease-in-out infinite;animation-delay:calc(var(--i)*-.12s)}.coreCrystal{width:190px;height:190px;border-radius:50%;display:grid;place-items:center;text-align:center;padding:20px;background:radial-gradient(circle,#effcff 0,#72f4ff 7%,rgba(0,217,255,.18) 46%,rgba(255,61,242,.12) 100%);border:1px solid rgba(255,255,255,.32);box-shadow:0 0 90px rgba(0,217,255,.45),inset 0 0 40px rgba(255,255,255,.24);z-index:2}.coreCrystal span{font-size:10px;color:rgba(0,20,35,.75);font-weight:900;text-transform:uppercase}.coreCrystal h3{margin:0;color:#02040a;font-size:26px}.coreCrystal strong{font-size:38px;color:#02040a}.coreCrystal em{font-style:normal;color:#03101a;font-size:12px;font-weight:900}.reactorStats,.impactGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;position:relative;z-index:2}.mini{border:1px solid rgba(255,255,255,.09);background:rgba(0,0,0,.22);border-radius:20px;padding:14px}.mini b{display:block;margin-top:6px;font-size:22px}.helix{position:relative;z-index:2;display:grid;gap:10px}.gene{position:relative;height:37px;border-radius:999px;border:1px solid rgba(255,255,255,.08);background:rgba(0,0,0,.2);overflow:hidden;transform:translateX(calc(sin(var(--i))*10px))}.gene:before{content:"";position:absolute;inset:0 auto 0 0;width:var(--s);background:linear-gradient(90deg,rgba(0,217,255,.75),rgba(255,61,242,.45));box-shadow:0 0 22px rgba(0,217,255,.35)}.gene span,.gene b{position:relative;z-index:1;line-height:37px}.gene span{padding-left:14px}.gene b{float:right;padding-right:14px}.aiOrb{width:78px;height:78px;border-radius:28px;display:grid;place-items:center;background:linear-gradient(135deg,#00d9ff,#ff3df2);color:#02040a;font-weight:1000;font-size:28px;box-shadow:0 0 70px rgba(255,61,242,.3)}.aiPanel h3{font-size:25px;line-height:1.05;margin:20px 0}.river{position:relative;z-index:1;height:210px;display:grid;grid-template-columns:1fr 1fr;gap:14px}.stream{position:relative;overflow:hidden;border-radius:26px;border:1px solid rgba(255,255,255,.08);background:rgba(0,0,0,.22);padding:16px;display:flex;flex-wrap:wrap;align-content:center;gap:10px}.stream:after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0 20px,rgba(255,255,255,.08) 21px 22px);animation:flow 3s linear infinite}.outStream:after{animation-direction:reverse}.stream span{position:relative;z-index:1;border-radius:999px;padding:8px 10px;font-size:12px;font-weight:900;background:rgba(0,217,255,.14);border:1px solid rgba(0,217,255,.2)}.outStream span{background:rgba(255,61,242,.13);border-color:rgba(255,61,242,.2)}.mountains{height:210px;display:flex;align-items:flex-end;gap:10px;position:relative;z-index:1}.mountain{flex:1;border-radius:18px 18px 6px 6px;background:linear-gradient(180deg,rgba(95,244,255,.85),rgba(141,92,255,.35));box-shadow:0 0 35px rgba(0,217,255,.18);display:grid;place-items:end center;padding-bottom:8px}.mountain span{font-weight:900;font-size:12px}.horizonPanel p{color:rgba(255,255,255,.58);position:relative;z-index:1}.galaxy{height:230px;position:relative;display:grid;place-items:center}.sun{width:92px;height:92px;border-radius:50%;display:grid;place-items:center;background:rgba(0,217,255,.18);border:1px solid rgba(0,217,255,.3);box-shadow:0 0 50px rgba(0,217,255,.25);font-weight:1000}.planet{position:absolute;left:50%;top:50%;padding:7px 10px;border-radius:999px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);font-size:11px;font-weight:800;transform:rotate(calc(var(--i)*45deg)) translateX(104px) rotate(calc(var(--i)*-45deg));animation:orbitPulse 3s ease-in-out infinite;animation-delay:calc(var(--i)*-.2s)}.gravityMap{height:250px;position:relative;display:grid;place-items:center}.companyNode{width:104px;height:104px;border-radius:50%;display:grid;place-items:center;text-align:center;background:rgba(0,217,255,.16);border:1px solid rgba(0,217,255,.3);font-weight:1000}.gravityMap span{position:absolute;left:50%;top:50%;transform:rotate(calc(var(--i)*60deg)) translateX(135px) rotate(calc(var(--i)*-60deg));font-size:12px;background:rgba(255,255,255,.07);padding:8px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.1)}.timeline{display:grid;grid-template-columns:repeat(6,1fr);gap:8px;position:relative;z-index:1}.timeline div{min-height:150px;border-radius:22px;border:1px solid rgba(255,255,255,.08);background:rgba(0,0,0,.22);padding:13px;display:flex;flex-direction:column;justify-content:space-between}.timeline span{height:7px;border-radius:999px;background:linear-gradient(90deg,#ff3df2,#00d9ff)}.formulaPanel code{display:block;position:relative;z-index:1;padding:12px 14px;margin:9px 0;border-radius:16px;border:1px solid rgba(255,255,255,.08);background:rgba(0,0,0,.22);color:#91f8ff;font-weight:800;white-space:normal}@keyframes spin{to{transform:rotate(360deg)}}@keyframes tilt{50%{transform:rotate(12deg) scale(1.04)}}@keyframes particle{50%{transform:rotate(calc(var(--i)*12deg + 25deg)) translateX(145px);opacity:.35}}@keyframes flow{to{background-position:80px 0}}@keyframes orbitPulse{50%{filter:brightness(1.5);box-shadow:0 0 24px rgba(0,217,255,.25)}}@media(max-width:1180px){.app{grid-template-columns:1fr}.sidebar{min-height:auto;display:none}.heroGrid,.lowerGrid,.wideGrid{grid-template-columns:1fr}.reactorPanel{min-height:auto}.topbar{align-items:flex-start;flex-direction:column}.surface{padding:18px}.topbar h2{font-size:34px}.ticker{overflow:auto}.reactorShell{height:360px}.ring1{width:310px;height:310px}.ring2{width:250px;height:250px}.ring3{width:180px;height:180px}.ring4{width:330px}.particle{display:none}}@media(max-width:620px){.reactorStats,.impactGrid{grid-template-columns:1fr}.timeline{grid-template-columns:1fr 1fr}.controls{justify-content:flex-start}.coreCrystal{width:165px;height:165px}.coreCrystal strong{font-size:30px}.topbar h2{font-size:29px}}
`;
