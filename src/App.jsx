import React, { useMemo, useState } from 'react';

const demoCompanies = {
  Peloton: { sector: 'Consumer Fitness', level: 8, trust: 71, momentum: 54, position: 46, risk: 39, flow: 68, lock: 62, value: 57, drift: 42 },
  Nokia: { sector: 'Network Infrastructure', level: 7, trust: 76, momentum: 58, position: 61, risk: 32, flow: 72, lock: 70, value: 66, drift: 34 },
  Apple: { sector: 'Consumer Technology', level: 3, trust: 91, momentum: 86, position: 94, risk: 10, flow: 88, lock: 92, value: 93, drift: 12 },
  WeWork: { sector: 'Flexible Workspaces', level: 12, trust: 38, momentum: 24, position: 29, risk: 78, flow: 33, lock: 31, value: 35, drift: 81 },
  BlackBerry: { sector: 'Cybersecurity', level: 6, trust: 69, momentum: 51, position: 55, risk: 35, flow: 64, lock: 58, value: 62, drift: 37 },
};

const signals = [
  ['BUY', '+12', 'Confidence entering'], ['SELL', '-4', 'Confidence leaving'], ['GAIN', '+8', 'Trust increasing'],
  ['LOSS', '-2', 'Trust decreasing'], ['BUILD', '+6', 'Structure strengthening'], ['DRIFT', '+18', 'Market misalignment'],
  ['TRUST', '74', 'Belief in company'], ['VALUE', '+19', 'Perceived usefulness'], ['FLOW', '81%', 'Healthy value movement'],
  ['LOCK', '92%', 'Retention signal'], ['LEAD', '+14', 'Category leadership'], ['RISK', '18%', 'Failure pressure'],
];

const opportunities = ['New Product', 'New Audience', 'Partnership', 'Pricing', 'AI Layer', 'Acquisition', 'Rebrand'];
const dna = ['Trust', 'Brand', 'Product', 'Price', 'Audience', 'Narrative', 'Support', 'Competition', 'Innovation'];
const timeline = ['Failure Signal', 'Market Drift', 'Audience Leak', 'Recovery Plan', 'New Category', 'Level 5'];

export default function App() {
  const [companyName, setCompanyName] = useState('Peloton');
  const [visualMode, setVisualMode] = useState('Insane Visual');
  const [step, setStep] = useState(0);
  const company = demoCompanies[companyName];

  const score = useMemo(() => {
    const base = Math.round((company.trust + company.momentum + company.position + company.flow + company.lock + company.value + (100 - company.risk) + (100 - company.drift)) / 8);
    const improved = Math.min(100, base + step * 4);
    const level = Math.max(5, company.level - step);
    return { base, improved, level, probability: Math.min(96, 48 + step * 9 + Math.round(company.trust / 6)) };
  }, [company, step]);

  const runRecovery = () => setStep((s) => Math.min(4, s + 1));
  const resetRecovery = () => setStep(0);

  return (
    <main className="rc-shell">
      <div className="ambient-grid" />
      <div className="orb orb-a" />
      <div className="orb orb-b" />
      <div className="orb orb-c" />

      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">R</div>
          <div>
            <h1>ReCentre</h1>
            <p>Company Pulse • Recovery Operating System</p>
          </div>
        </div>
        <div className="top-actions">
          <select value={companyName} onChange={(e) => { setCompanyName(e.target.value); setStep(0); }}>
            {Object.keys(demoCompanies).map((name) => <option key={name}>{name}</option>)}
          </select>
          <button onClick={() => setVisualMode(visualMode === 'Insane Visual' ? 'Boardroom' : 'Insane Visual')}>{visualMode}</button>
          <button className="primary" onClick={runRecovery}>Run Recovery</button>
        </div>
      </header>

      <section className="signal-ribbon">
        <div className="ticker-track">
          {[...signals, ...signals].map(([name, value, meaning], i) => (
            <div className={`signal ${value.startsWith('-') || name === 'DRIFT' || name === 'RISK' ? 'negative' : 'positive'}`} key={name + i}>
              <strong>{name}</strong><span>{value}</span><em>{meaning}</em>
            </div>
          ))}
        </div>
      </section>

      <section className="surface">
        <aside className="left-rail panel fused">
          <div className="section-title"><span>01</span><h2>Company DNA</h2></div>
          <div className="dna-helix">
            {dna.map((item, i) => {
              const value = [company.trust, 66, company.position, 58, company.lock, company.value, company.flow, 100-company.risk, company.momentum][i];
              return (
                <div className="dna-row" key={item} style={{ '--v': value }}>
                  <b>{item}</b><div className="dna-bar"><i /></div><span>{value}</span>
                </div>
              );
            })}
          </div>
          <div className="confidence-river">
            <h3>Confidence River</h3>
            <div className="river">
              <span>BUY</span><span>BUILD</span><span>GAIN</span><span>FLOW</span><span>CREATE</span>
            </div>
            <div className="leak">
              <span>SELL</span><span>LOSS</span><span>LEAK</span><span>DECAY</span>
            </div>
          </div>
        </aside>

        <section className="centre-stage">
          <div className="hero-copy">
            <div className="eyebrow">Executive Pulse</div>
            <h2>Recover. Rebuild. ReCentre.</h2>
            <p>Every company drifts. ReCentre turns live market signals into a recovery path toward Level 5.</p>
          </div>

          <div className="reactor-wrap">
            <div className="ring ring-1" />
            <div className="ring ring-2" />
            <div className="ring ring-3" />
            <div className="particle p1" /><div className="particle p2" /><div className="particle p3" />
            <div className="reactor-core">
              <span>{company.sector}</span>
              <h3>{companyName}</h3>
              <div className="score">{score.improved}</div>
              <p>Recovery Score</p>
              <div className="level-pill">Level {score.level} → Target 5</div>
            </div>
          </div>

          <div className="horizon panel fused">
            <div className="section-title"><span>02</span><h2>Recovery Horizon</h2></div>
            <div className="mountain-chart">
              {[12, 10, 8, 7, 6, 5].map((l, i) => (
                <div key={i} className="peak" style={{ '--h': `${(16-l)*12 + 24}px` }}>
                  <i /> <b>L{Math.max(5, l - step)}</b>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="right-rail panel fused">
          <div className="section-title"><span>03</span><h2>Recovery AI</h2></div>
          <div className="ai-card">
            <p>Today's highest impact action</p>
            <h3>Increase Trust, reduce Drift, rebuild the category promise.</h3>
            <div className="impact-grid">
              <span>+12 Trust</span><span>-8 Drift</span><span>+6 Growth</span><span>+9 Value</span>
            </div>
          </div>
          <button className="wide primary" onClick={runRecovery}>Apply Recommendation</button>
          <button className="wide" onClick={resetRecovery}>Reset Simulation</button>

          <div className="crystal-card">
            <h3>Company Health Crystal</h3>
            <div className={`crystal ${score.level > 9 ? 'cracked' : ''}`}>
              <span />
            </div>
            <p>{score.level > 9 ? 'Heavy fracture detected' : 'Crystal reforming toward Level 5'}</p>
          </div>
        </aside>
      </section>

      <section className="lower-grid">
        <div className="panel galaxy fused">
          <div className="section-title"><span>04</span><h2>Recovery Opportunity Galaxy</h2></div>
          <div className="galaxy-field">
            <div className="company-star">{companyName}</div>
            {opportunities.map((o, i) => <div className={`planet planet-${i}`} key={o}>{o}</div>)}
          </div>
        </div>

        <div className="panel gravity fused">
          <div className="section-title"><span>05</span><h2>Market Gravity Engine</h2></div>
          {['Customers', 'Competitors', 'Investors', 'Media', 'Employees', 'Suppliers'].map((x, i) => (
            <div className="gravity-row" key={x}><span>{x}</span><b style={{ width: `${42 + ((i * 13 + score.improved) % 52)}%` }} /></div>
          ))}
        </div>

        <div className="panel timeline fused">
          <div className="section-title"><span>06</span><h2>Recovery Timeline</h2></div>
          <div className="time-line">
            {timeline.map((t, i) => <div className={i <= step + 1 ? 'active' : ''} key={t}><b>{i + 1}</b><span>{t}</span></div>)}
          </div>
        </div>
      </section>

      <section className="formula-panel panel fused">
        <div className="section-title"><span>07</span><h2>ReCentre Telemetry Formulas</h2></div>
        {['BUY + TRUST = GAIN', 'SELL + TRUST = LOSS', 'DRIFT + PRESSURE = RISK', 'CENTRE + CLARITY = STABILITY', 'BUILD + TRUST = VALUE', 'REPAIR + RELEVANCE = GROWTH', 'ALIGN + VALUE = RECENTRE'].map((f) => <code key={f}>{f}</code>)}
      </section>

      <style>{styles}</style>
    </main>
  );
}

const styles = `
*{box-sizing:border-box} body{margin:0;background:#030512;color:#eef7ff;font-family:Inter,ui-sans-serif,system-ui,Segoe UI,Arial,sans-serif} button,select{font:inherit}
.rc-shell{position:relative;min-height:100vh;padding:24px;overflow:hidden;background:radial-gradient(circle at 50% 0%,#11245f55,transparent 42%),linear-gradient(135deg,#030512,#06071b 45%,#13051f)}
.ambient-grid{position:fixed;inset:0;background-image:linear-gradient(rgba(94,234,212,.055) 1px,transparent 1px),linear-gradient(90deg,rgba(94,234,212,.055) 1px,transparent 1px);background-size:64px 64px;mask-image:linear-gradient(to bottom,black,transparent 90%);pointer-events:none}.orb{position:fixed;border-radius:999px;filter:blur(65px);opacity:.45;pointer-events:none}.orb-a{width:520px;height:520px;background:#00e5ff;left:-150px;top:-130px}.orb-b{width:620px;height:620px;background:#ff2df7;right:-200px;top:120px}.orb-c{width:520px;height:520px;background:#604bff;left:35%;bottom:-260px}
.topbar{position:relative;z-index:2;display:flex;justify-content:space-between;gap:20px;align-items:center;margin:0 auto 18px;max-width:1500px}.brand-block{display:flex;gap:14px;align-items:center}.brand-mark{width:54px;height:54px;border:1px solid #5eead455;border-radius:18px;display:grid;place-items:center;background:linear-gradient(135deg,#20f6ff22,#ff35e622);box-shadow:0 0 50px #00e5ff44;font-weight:950;font-size:28px}.brand-block h1{margin:0;font-size:28px;letter-spacing:-.04em}.brand-block p{margin:2px 0 0;color:#9fb4c8;font-size:13px}.top-actions{display:flex;gap:10px;flex-wrap:wrap;justify-content:flex-end}select,button{border:1px solid #ffffff22;border-radius:16px;padding:12px 14px;background:#ffffff0d;color:#fff;box-shadow:inset 0 1px 0 #ffffff18}option{background:#06071b}.primary{background:linear-gradient(135deg,#00e5ff44,#ff2df733);border-color:#5eead477;box-shadow:0 0 28px #00e5ff22}.wide{width:100%;margin-top:10px}
.signal-ribbon{position:relative;z-index:2;max-width:1500px;margin:0 auto 18px;overflow:hidden;border:1px solid #ffffff18;border-radius:22px;background:#071025aa;backdrop-filter:blur(18px);box-shadow:0 20px 80px #0008}.ticker-track{display:flex;gap:10px;width:max-content;animation:ticker 35s linear infinite;padding:10px}.signal{min-width:190px;border-radius:16px;border:1px solid #ffffff12;padding:10px 12px;display:grid;grid-template-columns:auto auto;gap:2px 10px;background:#ffffff0b}.signal strong{letter-spacing:.08em}.signal span{font-weight:950;text-align:right}.signal em{grid-column:1/-1;font-style:normal;color:#8da4b8;font-size:11px}.positive span{color:#64ffda}.negative span{color:#ff6bd6}@keyframes ticker{to{transform:translateX(-50%)}}
.surface,.lower-grid{position:relative;z-index:2;max-width:1500px;margin:auto;display:grid;gap:18px}.surface{grid-template-columns:320px minmax(420px,1fr) 330px;align-items:stretch}.lower-grid{grid-template-columns:1.1fr .9fr 1fr;margin-top:18px}.panel,.fused{border:1px solid #ffffff18;background:linear-gradient(145deg,#ffffff10,#ffffff06);backdrop-filter:blur(20px);box-shadow:0 30px 100px #0007,inset 0 1px 0 #ffffff18;border-radius:30px}.panel{padding:20px}.section-title{display:flex;align-items:center;gap:12px;margin-bottom:18px}.section-title span{width:34px;height:34px;display:grid;place-items:center;border-radius:12px;background:#5eead41a;color:#67e8f9;font-weight:900}.section-title h2{margin:0;font-size:18px;letter-spacing:-.03em}
.left-rail,.right-rail{padding:20px}.dna-helix{display:grid;gap:13px}.dna-row{display:grid;grid-template-columns:82px 1fr 34px;align-items:center;gap:10px;font-size:12px;color:#b8c7d8}.dna-row b{color:#fff}.dna-bar{height:12px;border-radius:999px;background:#ffffff12;overflow:hidden;position:relative}.dna-bar i{position:absolute;inset:0 auto 0 0;width:calc(var(--v)*1%);border-radius:999px;background:linear-gradient(90deg,#00e5ff,#ff2df7)}.confidence-river{margin-top:24px;border-top:1px solid #ffffff12;padding-top:18px}.confidence-river h3{margin:0 0 12px}.river,.leak{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px}.river span,.leak span{border-radius:999px;padding:8px 10px;font-size:11px;font-weight:850}.river span{background:#00e5ff20;color:#9ffcff}.leak span{background:#ff2d6e20;color:#ffafcf}
.centre-stage{min-height:780px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:18px;border:1px solid #ffffff12;border-radius:34px;background:radial-gradient(circle at 50% 35%,#00e5ff18,transparent 30%),radial-gradient(circle at 50% 55%,#ff2df714,transparent 34%),#ffffff08;backdrop-filter:blur(20px);box-shadow:0 40px 130px #0008}.hero-copy{text-align:center;max-width:760px;padding-top:20px}.eyebrow{display:inline-flex;border:1px solid #5eead455;color:#a5f3fc;background:#00e5ff12;border-radius:999px;padding:8px 14px;font-weight:800;font-size:12px;text-transform:uppercase;letter-spacing:.12em}.hero-copy h2{font-size:clamp(42px,7vw,88px);line-height:.88;margin:16px 0 12px;letter-spacing:-.08em}.hero-copy p{margin:0 auto;color:#a8b9ca;max-width:620px;font-size:18px;line-height:1.6}.reactor-wrap{position:relative;width:min(590px,100%);height:520px;display:grid;place-items:center}.ring{position:absolute;border-radius:999px;border:1px solid #5eead433;box-shadow:0 0 50px #00e5ff18}.ring-1{width:520px;height:520px;animation:spin 22s linear infinite}.ring-2{width:400px;height:400px;border-color:#ff2df744;animation:spin 16s linear infinite reverse}.ring-3{width:280px;height:280px;border-color:#ffffff26;animation:spin 11s linear infinite}.reactor-core{position:relative;width:250px;height:250px;border-radius:50%;display:grid;place-items:center;text-align:center;padding:26px;background:radial-gradient(circle,#10244a 0,#09132d 55%,#040716 100%);border:1px solid #67e8f966;box-shadow:0 0 90px #00e5ff44, inset 0 0 60px #ff2df714}.reactor-core span{color:#9fb4c8;font-size:12px}.reactor-core h3{margin:0;font-size:30px;letter-spacing:-.05em}.score{font-size:68px;font-weight:950;line-height:.8;color:#fff;text-shadow:0 0 28px #00e5ff}.reactor-core p{margin:0;color:#9fb4c8}.level-pill{border:1px solid #ffffff22;border-radius:999px;padding:8px 12px;background:#ffffff12;font-size:12px}.particle{position:absolute;width:10px;height:10px;border-radius:50%;background:#64ffda;box-shadow:0 0 22px #64ffda}.p1{animation:orbit1 8s linear infinite}.p2{animation:orbit2 11s linear infinite}.p3{animation:orbit3 14s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}@keyframes orbit1{from{transform:rotate(0deg) translateX(255px)}to{transform:rotate(360deg) translateX(255px)}}@keyframes orbit2{from{transform:rotate(120deg) translateX(205px)}to{transform:rotate(480deg) translateX(205px)}}@keyframes orbit3{from{transform:rotate(240deg) translateX(150px)}to{transform:rotate(600deg) translateX(150px)}}
.horizon{width:100%;padding:18px}.mountain-chart{height:190px;display:flex;gap:16px;align-items:flex-end;padding:18px;border-radius:24px;background:linear-gradient(180deg,#ffffff08,#00000020)}.peak{flex:1;height:100%;display:flex;align-items:flex-end;justify-content:center;position:relative}.peak i{width:100%;height:var(--h);display:block;background:linear-gradient(180deg,#64ffda,#2c3cff);clip-path:polygon(50% 0,100% 100%,0 100%);filter:drop-shadow(0 0 18px #00e5ff66)}.peak b{position:absolute;bottom:8px;font-size:12px}
.ai-card{border:1px solid #ffffff12;border-radius:24px;background:#00000022;padding:18px}.ai-card p,.crystal-card p{color:#98adbf;margin:0 0 8px}.ai-card h3{font-size:22px;line-height:1.15;margin:0 0 16px}.impact-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.impact-grid span{border-radius:12px;background:#00e5ff14;color:#a5f3fc;padding:9px;font-weight:850;font-size:12px}.crystal-card{margin-top:20px;text-align:center}.crystal{position:relative;margin:16px auto;width:138px;height:138px;clip-path:polygon(50% 0,88% 24%,76% 82%,50% 100%,24% 82%,12% 24%);background:linear-gradient(135deg,#00e5ff,#7547ff,#ff2df7);box-shadow:0 0 55px #00e5ff66}.crystal.cracked:after{content:"";position:absolute;inset:0;background:linear-gradient(110deg,transparent 45%,#030512 46% 48%,transparent 49%)}
.galaxy-field{position:relative;height:360px;border-radius:26px;background:radial-gradient(circle,#00e5ff12,transparent 60%),#00000020;overflow:hidden}.company-star{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:130px;height:130px;border-radius:50%;display:grid;place-items:center;text-align:center;background:#071025;border:1px solid #67e8f966;box-shadow:0 0 70px #00e5ff55;font-weight:950}.planet{position:absolute;border:1px solid #ffffff24;background:#ffffff10;border-radius:999px;padding:10px 12px;font-size:12px;font-weight:800;box-shadow:0 0 24px #ff2df733}.planet-0{left:10%;top:18%}.planet-1{right:12%;top:14%}.planet-2{left:12%;bottom:20%}.planet-3{right:18%;bottom:18%}.planet-4{left:43%;top:8%}.planet-5{left:38%;bottom:8%}.planet-6{right:6%;top:48%}
.gravity-row{display:grid;grid-template-columns:100px 1fr;gap:12px;align-items:center;margin:15px 0}.gravity-row span{color:#b8c7d8}.gravity-row b{height:14px;border-radius:999px;background:linear-gradient(90deg,#00e5ff,#ff2df7);box-shadow:0 0 24px #00e5ff33}.time-line{display:grid;gap:14px}.time-line div{display:grid;grid-template-columns:36px 1fr;gap:10px;align-items:center;opacity:.45}.time-line div.active{opacity:1}.time-line b{height:36px;width:36px;border-radius:14px;display:grid;place-items:center;background:#ffffff12}.time-line .active b{background:#00e5ff22;color:#a5f3fc;box-shadow:0 0 20px #00e5ff33}.formula-panel{max-width:1500px;margin:18px auto 0;display:flex;gap:10px;flex-wrap:wrap;align-items:center}.formula-panel .section-title{width:100%;margin-bottom:8px}.formula-panel code{border:1px solid #ffffff14;border-radius:14px;padding:12px 14px;background:#00000025;color:#d6faff;font-weight:850}
@media(max-width:1150px){.surface{grid-template-columns:1fr}.lower-grid{grid-template-columns:1fr}.centre-stage{min-height:auto}.reactor-wrap{height:460px}.topbar{align-items:flex-start;flex-direction:column}.left-rail,.right-rail{order:2}}@media(max-width:640px){.rc-shell{padding:14px}.hero-copy h2{font-size:48px}.ring-1{width:360px;height:360px}.ring-2{width:285px;height:285px}.ring-3{width:210px;height:210px}.reactor-wrap{height:390px}.reactor-core{width:210px;height:210px}.score{font-size:54px}.surface,.lower-grid{gap:12px}.top-actions{width:100%}.top-actions>*{flex:1}.signal{min-width:160px}.mountain-chart{gap:8px}}
`;
