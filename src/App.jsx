import React, { useMemo, useState } from 'react';

const signals = [
  ['BUY', '+12', 'Confidence entering'], ['SELL', '-4', 'Confidence leaving'],
  ['GAIN', '+8', 'Trust increasing'], ['LOSS', '-2', 'Trust loss'],
  ['BUILD', '+11', 'Structure strengthened'], ['DRIFT', '+18', 'Market drift'],
  ['TRUST', '74', 'Belief score'], ['DOUBT', '26', 'Doubt pressure'],
  ['LOCK', '82%', 'Retention lock'], ['LEAK', '18%', 'Churn leak'],
  ['FLOW', '81%', 'Value movement'], ['RECENTRE', 'L5', 'Target state'],
];

const competitors = [
  { name: 'Apple Fitness+', pull: 84, note: 'ecosystem gravity' },
  { name: 'Tonal', pull: 66, note: 'premium strength' },
  { name: 'Gyms', pull: 72, note: 'return-to-real-world' },
  { name: 'YouTube Fitness', pull: 58, note: 'free content pressure' },
];

const actions = [
  { title: 'Lower hardware friction', impact: '+11 Trust', detail: 'Subscription-first bundles reduce entry resistance.' },
  { title: 'Rebuild instructor-led identity', impact: '+9 Loyalty', detail: 'Make community and personalities the emotional moat.' },
  { title: 'Family / household plans', impact: '+8 Lock', detail: 'Turn one rider into a household subscription.' },
  { title: 'Corporate wellness channel', impact: '+7 Flow', detail: 'Create recurring B2B demand outside pure consumer cycles.' },
];

export default function App() {
  const [intensity, setIntensity] = useState(72);
  const [recovery, setRecovery] = useState(58);
  const [mode, setMode] = useState('Cinematic');

  const level = useMemo(() => {
    const score = Math.round((100 - recovery) * 0.09 + intensity * 0.06 + 2.7);
    return Math.max(5, Math.min(12, score));
  }, [intensity, recovery]);

  const probability = Math.round(61 + recovery * 0.26 - intensity * 0.08);

  return (
    <main className="rc-root">
      <div className="ambient" />
      <div className="grid-surface" />
      <div className="aurora a1" />
      <div className="aurora a2" />
      <div className="aurora a3" />

      <section className="shell">
        <header className="topbar">
          <div className="brand">
            <div className="brand-mark">R</div>
            <div>
              <h1>ReCentre</h1>
              <p>Peloton recovery intelligence surface</p>
            </div>
          </div>
          <div className="nav-pills">
            {['Company Pulse', 'Recovery Lab', 'Market Signals', 'Board Memo'].map(x => <button key={x}>{x}</button>)}
          </div>
          <button className="primary">Run Recovery Simulation</button>
        </header>

        <div className="signal-ribbon">
          {signals.map(([k, v, d]) => (
            <div className="ticker" key={k}>
              <b>{k}</b><span>{v}</span><em>{d}</em>
            </div>
          ))}
        </div>

        <section className="hero-grid">
          <aside className="left-rail glass">
            <div className="section-title">Company DNA</div>
            {['Brand Heat', 'Subscriber Lock', 'Hardware Friction', 'Pricing Trust', 'Community Pull', 'Product Relevance'].map((x, i) => (
              <div className="dna-row" key={x}>
                <span>{x}</span>
                <div><i style={{ width: `${[78,82,46,59,88,64][i]}%` }} /></div>
              </div>
            ))}
            <div className="mode-box">
              <span>Visual Mode</span>
              <div className="segmented">
                {['Cinematic', 'Boardroom'].map(x => <button onClick={() => setMode(x)} className={mode === x ? 'on' : ''} key={x}>{x}</button>)}
              </div>
            </div>
          </aside>

          <section className="reactor-panel glass">
            <div className="reactor-copy">
              <p>Company Pulse</p>
              <h2>Peloton Recovery Reactor</h2>
              <span>Recover trust. Rebuild momentum. ReCentre the business.</span>
            </div>
            <div className="reactor-wrap">
              <div className="orbit orbit1" />
              <div className="orbit orbit2" />
              <div className="orbit orbit3" />
              <div className="particle p1" /><div className="particle p2" /><div className="particle p3" /><div className="particle p4" />
              <div className="core">
                <small>PELOTON</small>
                <strong>LEVEL {level}</strong>
                <span>Target Level 5</span>
                <em>{probability}% recovery probability</em>
              </div>
            </div>
            <div className="reactor-controls">
              <label>Market pressure <b>{intensity}</b><input type="range" min="10" max="100" value={intensity} onChange={e => setIntensity(+e.target.value)} /></label>
              <label>Recovery traction <b>{recovery}</b><input type="range" min="10" max="100" value={recovery} onChange={e => setRecovery(+e.target.value)} /></label>
            </div>
          </section>

          <aside className="right-rail glass">
            <div className="section-title">Executive Intelligence</div>
            <div className="ai-card hot">
              <span>Highest ROI Action</span>
              <h3>Reduce entry friction without weakening premium identity.</h3>
              <p>Bundle hardware, subscription and community value into one confidence-led offer.</p>
            </div>
            <div className="mini-metrics">
              <div><b>+11</b><span>Trust Gain</span></div>
              <div><b>-6</b><span>Drift Reduction</span></div>
              <div><b>+8</b><span>Subscriber Lock</span></div>
            </div>
          </aside>
        </section>

        <section className="lower-grid">
          <div className="glass horizon">
            <div className="section-title">90-Day Recovery Horizon</div>
            <div className="mountains"><div className="path" /></div>
            <div className="horizon-labels"><span>Today L{level}</span><span>30D L8</span><span>60D L7</span><span>90D L5</span></div>
          </div>

          <div className="glass galaxy">
            <div className="section-title">Competitor Threat Rings</div>
            <div className="galaxy-stage">
              <div className="planet main">Peloton</div>
              {competitors.map((c, i) => <div key={c.name} className={`planet c${i}`}><b>{c.name}</b><span>{c.pull}% {c.note}</span></div>)}
            </div>
          </div>

          <div className="glass river">
            <div className="section-title">Confidence River</div>
            <div className="river-flow in"><b>BUY · GAIN · BUILD · FLOW · ATTRACT</b></div>
            <div className="river-flow out"><b>SELL · LOSS · LEAK · DECAY · REPEL</b></div>
          </div>

          <div className="glass actions">
            <div className="section-title">Recovery Action Cards</div>
            {actions.map(a => <div className="action" key={a.title}><div><b>{a.title}</b><p>{a.detail}</p></div><span>{a.impact}</span></div>)}
          </div>
        </section>

        <section className="memo glass">
          <div>
            <p className="eyebrow">AI Board Memo</p>
            <h2>Peloton’s path to Level 5 is not only a fitness hardware recovery. It is a confidence recovery.</h2>
            <p>The business should shift perception from expensive connected equipment to a subscription-led motivation ecosystem. The recovery thesis is to increase lock-in, reduce upfront resistance, and make community the core market advantage.</p>
          </div>
          <div className="cert">
            <span>Certification Path</span>
            <b>Level 5 ReCentred</b>
            <small>Requires Trust 80+, Lock 85%, Drift under 12%, and clear category confidence.</small>
          </div>
        </section>
      </section>
      <style>{css}</style>
    </main>
  );
}

const css = `
*{box-sizing:border-box}body{margin:0;font-family:Inter,ui-sans-serif,system-ui,Segoe UI,Arial;background:#03040b;color:white}.rc-root{min-height:100vh;position:relative;overflow:hidden;padding:28px}.ambient{position:fixed;inset:0;background:radial-gradient(circle at 50% 20%,rgba(38,226,255,.16),transparent 28%),radial-gradient(circle at 80% 15%,rgba(255,46,221,.14),transparent 25%),linear-gradient(180deg,#050713,#02030a)}.grid-surface{position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px);background-size:54px 54px;mask-image:linear-gradient(to bottom,black,transparent 88%)}.aurora{position:fixed;border-radius:999px;filter:blur(70px);opacity:.6}.a1{width:520px;height:520px;background:#15e8ff33;left:-150px;top:-130px}.a2{width:620px;height:620px;background:#ff2edf2b;right:-180px;top:130px}.a3{width:520px;height:520px;background:#7c3cff2b;left:35%;bottom:-220px}.shell{position:relative;max-width:1480px;margin:auto}.topbar{height:76px;display:flex;align-items:center;justify-content:space-between;gap:18px;margin-bottom:18px}.brand{display:flex;align-items:center;gap:14px}.brand-mark{width:52px;height:52px;border:1px solid #7ff4ff55;border-radius:18px;display:grid;place-items:center;background:linear-gradient(135deg,#00eaff22,#ff2edf18);box-shadow:0 0 45px #00eaff33;font-weight:950;font-size:26px}.brand h1{margin:0;font-size:25px}.brand p{margin:2px 0 0;color:#9fb1c8;font-size:12px}.nav-pills{display:flex;gap:8px;flex-wrap:wrap}.nav-pills button,.primary,.segmented button{color:white;border:1px solid #ffffff18;background:#ffffff0b;border-radius:999px;padding:11px 14px;font-weight:800}.primary{background:linear-gradient(135deg,#00eaff33,#ff2edf2b);border-color:#7ff4ff55;box-shadow:0 0 50px #00eaff26}.signal-ribbon{display:grid;grid-template-columns:repeat(12,minmax(120px,1fr));gap:8px;margin-bottom:14px;overflow:auto}.ticker{border:1px solid #ffffff14;background:#081021cc;border-radius:18px;padding:10px 12px;box-shadow:inset 0 0 20px #ffffff06}.ticker b{font-size:12px;color:#7ff4ff}.ticker span{display:block;font-size:20px;font-weight:950}.ticker em{display:block;font-size:10px;color:#8190aa;font-style:normal}.glass{border:1px solid #ffffff14;background:linear-gradient(135deg,#ffffff10,#ffffff06);box-shadow:0 24px 90px #000b,inset 0 1px 0 #ffffff1a;backdrop-filter:blur(18px);border-radius:34px}.hero-grid{display:grid;grid-template-columns:300px 1fr 340px;gap:16px}.left-rail,.right-rail,.reactor-panel{min-height:610px;padding:22px}.section-title{font-weight:950;letter-spacing:.02em;margin-bottom:18px;color:#dffcff}.dna-row{margin:16px 0}.dna-row span{display:flex;color:#b7c6dc;font-size:13px;margin-bottom:8px}.dna-row div{height:10px;border-radius:999px;background:#ffffff0d;overflow:hidden}.dna-row i{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,#00eaff,#ff2edf);box-shadow:0 0 22px #00eaff66}.mode-box{margin-top:30px;padding:16px;border:1px solid #ffffff12;border-radius:24px;background:#00000022}.mode-box span{font-size:12px;color:#91a2bc}.segmented{display:flex;margin-top:10px;gap:8px}.segmented .on{background:#00eaff22;border-color:#7ff4ff55}.reactor-panel{position:relative;overflow:hidden;text-align:center}.reactor-panel:before{content:"";position:absolute;inset:16px;border-radius:30px;background:radial-gradient(circle at center,#00eaff16,transparent 35%),conic-gradient(from 90deg,transparent,#00eaff16,transparent,#ff2edf12,transparent);animation:spinbg 18s linear infinite}.reactor-copy{position:relative;z-index:2}.reactor-copy p,.eyebrow{color:#7ff4ff;text-transform:uppercase;letter-spacing:.18em;font-size:12px;font-weight:900}.reactor-copy h2{font-size:42px;margin:6px 0}.reactor-copy span{color:#a8b8d2}.reactor-wrap{position:relative;width:430px;height:430px;margin:28px auto}.orbit{position:absolute;inset:0;border-radius:50%;border:1px solid #7ff4ff44;box-shadow:0 0 45px #00eaff22}.orbit1{animation:spin 18s linear infinite}.orbit2{inset:42px;border-color:#ff2edf3f;animation:spin 12s linear infinite reverse}.orbit3{inset:86px;border-style:dashed;animation:spin 22s linear infinite}.core{position:absolute;inset:118px;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:radial-gradient(circle,#dffcff22,#00eaff13 48%,#0007);border:1px solid #7ff4ff66;box-shadow:0 0 95px #00eaff55}.core small{color:#7ff4ff;font-weight:900;letter-spacing:.2em}.core strong{font-size:44px}.core span,.core em{font-style:normal;color:#c9d6ea;font-size:13px}.particle{position:absolute;width:9px;height:9px;border-radius:50%;background:#7ff4ff;box-shadow:0 0 22px #7ff4ff;animation:particle 5s linear infinite}.p1{left:40px;top:120px}.p2{right:60px;top:90px;animation-delay:-1s;background:#ff6ff0}.p3{left:80px;bottom:70px;animation-delay:-2s}.p4{right:100px;bottom:110px;animation-delay:-3s;background:#ff6ff0}.reactor-controls{position:relative;z-index:2;display:grid;grid-template-columns:1fr 1fr;gap:16px}.reactor-controls label{text-align:left;color:#a9b8cf;font-size:13px}.reactor-controls b{float:right;color:white}.reactor-controls input{width:100%;accent-color:#7ff4ff}.ai-card{padding:18px;border:1px solid #ffffff14;border-radius:26px;background:#00000024}.ai-card span{color:#7ff4ff;font-size:12px;font-weight:900}.ai-card h3{font-size:24px;margin:10px 0}.ai-card p{color:#aebbd0;line-height:1.55}.hot{box-shadow:0 0 50px #ff2edf18}.mini-metrics{display:grid;grid-template-columns:1fr;gap:12px;margin-top:16px}.mini-metrics div{padding:16px;border:1px solid #ffffff12;border-radius:22px;background:#ffffff08}.mini-metrics b{display:block;font-size:26px}.mini-metrics span{color:#94a4bd;font-size:12px}.lower-grid{display:grid;grid-template-columns:1.15fr .85fr;gap:16px;margin-top:16px}.horizon,.galaxy,.river,.actions{padding:22px;min-height:310px}.mountains{height:200px;border-radius:26px;background:linear-gradient(180deg,#0c1730,#030713);position:relative;overflow:hidden;border:1px solid #ffffff10}.mountains:before{content:"";position:absolute;inset:0;background:linear-gradient(135deg,transparent 50%,#00eaff22 51%,transparent 58%),linear-gradient(35deg,transparent 45%,#ff2edf22 46%,transparent 64%)}.path{position:absolute;left:10%;bottom:30px;width:80%;height:4px;background:linear-gradient(90deg,#ff2edf,#00eaff,#6effbb);box-shadow:0 0 25px #00eaff;border-radius:999px;transform:rotate(-10deg)}.horizon-labels{display:flex;justify-content:space-between;color:#9babca;font-size:12px;margin-top:12px}.galaxy-stage{position:relative;height:240px}.planet{position:absolute;border:1px solid #7ff4ff44;background:#00eaff12;border-radius:999px;padding:14px 18px;box-shadow:0 0 40px #00eaff20}.planet span{display:block;color:#9eb0c8;font-size:11px}.main{left:38%;top:38%;font-weight:950}.c0{left:5%;top:12%}.c1{right:6%;top:18%}.c2{left:12%;bottom:8%}.c3{right:10%;bottom:12%}.river-flow{height:92px;border-radius:28px;display:grid;place-items:center;margin:14px 0;border:1px solid #ffffff12;position:relative;overflow:hidden}.river-flow:before{content:"";position:absolute;inset:0;background:repeating-linear-gradient(90deg,transparent 0 30px,#ffffff18 30px 32px);animation:river 3s linear infinite}.river-flow b{z-index:1}.river-flow.in{background:#00eaff12;color:#dffcff}.river-flow.out{background:#ff2edf10;color:#ffd8fb}.action{display:flex;justify-content:space-between;gap:12px;border:1px solid #ffffff12;background:#ffffff08;border-radius:24px;padding:14px;margin-bottom:10px}.action p{margin:5px 0 0;color:#98a8c0;font-size:13px}.action span{white-space:nowrap;color:#7ff4ff;font-weight:950}.memo{margin-top:16px;padding:28px;display:grid;grid-template-columns:1fr 320px;gap:22px}.memo h2{font-size:32px;margin:8px 0}.memo p{color:#aab9cf;line-height:1.65}.cert{border:1px solid #7ff4ff33;border-radius:28px;padding:20px;background:#00eaff10;display:flex;flex-direction:column;justify-content:center}.cert span{color:#7ff4ff;font-size:12px;text-transform:uppercase;letter-spacing:.15em;font-weight:900}.cert b{font-size:30px;margin:10px 0}.cert small{color:#adc0d8;line-height:1.5}@keyframes spin{to{transform:rotate(360deg)}}@keyframes spinbg{to{transform:rotate(360deg)}}@keyframes particle{to{transform:rotate(360deg) translateX(90px) rotate(-360deg)}}@keyframes river{to{background-position:120px 0}}@media(max-width:1100px){.hero-grid,.lower-grid,.memo{grid-template-columns:1fr}.nav-pills{display:none}.reactor-wrap{width:330px;height:330px}.core{inset:90px}.signal-ribbon{grid-template-columns:repeat(4,140px)}}@media(max-width:640px){.rc-root{padding:14px}.topbar{height:auto;align-items:flex-start;flex-direction:column}.reactor-copy h2{font-size:30px}.reactor-controls{grid-template-columns:1fr}.left-rail,.right-rail,.reactor-panel{min-height:auto}.core strong{font-size:32px}}
`;
