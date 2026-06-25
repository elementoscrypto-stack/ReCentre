import React, { useMemo, useState } from 'react';

const signalBase = [
  ['BUY', '+12', 'Confidence entering'],
  ['SELL', '-4', 'Confidence leaving'],
  ['GAIN', '+8', 'Trust increasing'],
  ['LOSS', '-2', 'Trust decreasing'],
  ['BUILD', '+6', 'Structure strengthening'],
  ['DRIFT', '+18', 'Market misalignment'],
  ['TRUST', '74', 'Belief in company'],
  ['DOUBT', '26', 'Belief leaving'],
  ['LOCK', '68%', 'Subscriber retention'],
  ['LEAK', '32%', 'Churn pressure'],
  ['FLOW', '81%', 'Healthy value movement'],
  ['RECENTRE', 'L5', 'Target state'],
];

const competitors = [
  { name: 'Apple Fitness+', pull: 82, angle: 15 },
  { name: 'YouTube Fitness', pull: 71, angle: 92 },
  { name: 'Tonal', pull: 59, angle: 170 },
  { name: 'Gyms', pull: 77, angle: 245 },
  { name: 'Lululemon Studio', pull: 46, angle: 312 },
];

const actions = [
  ['Lower hardware friction', '+11 Trust', '-5 Drift'],
  ['Bundle family subscription', '+8 Lock', '+6 Flow'],
  ['Rebuild instructor identity', '+12 Brand', '+7 Trust'],
  ['Launch affordable entry path', '+9 Audience', '-4 Leak'],
  ['Turn community into product', '+10 Loyalty', '+6 Growth'],
  ['Reframe as wellness operating system', '+13 Category', '+8 Value'],
];

const heat = [
  ['Premium Feel', 78], ['Affordability', 42], ['Motivation', 86], ['Culture', 71],
  ['Hardware Trust', 49], ['Subscription Value', 68], ['Community', 82], ['Growth Story', 45],
];

export default function App() {
  const [boost, setBoost] = useState(0);
  const [focus, setFocus] = useState('Subscription Recovery');

  const model = useMemo(() => {
    const trust = Math.min(92, 64 + boost * 4);
    const drift = Math.max(8, 38 - boost * 3);
    const level = Math.max(5, 9 - Math.floor(boost / 2));
    const recovery = Math.min(91, 58 + boost * 5);
    return { trust, drift, level, recovery };
  }, [boost]);

  const runAction = () => setBoost(v => Math.min(8, v + 1));
  const reset = () => setBoost(0);

  return (
    <div className="app">
      <div className="cosmos" />
      <div className="grid" />
      <div className="aurora a1" />
      <div className="aurora a2" />
      <div className="aurora a3" />

      <aside className="side">
        <div className="brandMark">R</div>
        <div>
          <h1>ReCentre</h1>
          <p>Company Recovery OS</p>
        </div>
        <nav>
          {['Company Pulse','Peloton Mission','Market Signals','Competitor Gravity','Recovery Actions','Board Memo','Level 5 Path'].map((n,i)=>(
            <button key={n} className={i===0?'active':''}><span>{String(i+1).padStart(2,'0')}</span>{n}</button>
          ))}
        </nav>
        <div className="cert">
          <b>Certification Path</b>
          <span>Level {model.level} → Level 5</span>
          <small>{model.recovery}% probability after actions</small>
        </div>
      </aside>

      <main className="main">
        <section className="ticker">
          {signalBase.map(([k,v,d]) => <div className="tick" key={k}><b>{k}</b><span>{v}</span><small>{d}</small></div>)}
        </section>

        <section className="heroSurface">
          <div className="heroCopy">
            <div className="eyebrow">PELOTON RECOVERY MISSION / LIVE PULSE</div>
            <h2>Recover subscription confidence. Rebuild category power. Return Peloton to Level 5.</h2>
            <p>
              ReCentre converts Peloton's trust, churn, pricing, hardware friction, competitor pull, and brand heat into a living recovery system.
            </p>
            <div className="heroButtons">
              <button onClick={runAction}>Run Recovery Action</button>
              <button className="ghost" onClick={reset}>Reset Mission</button>
            </div>
          </div>

          <div className="reactorWrap">
            <div className="reactor">
              <div className="ring r1" />
              <div className="ring r2" />
              <div className="ring r3" />
              <div className="ring r4" />
              {Array.from({length: 28}).map((_,i)=><i key={i} style={{'--i':i}} />)}
              <div className="core">
                <small>PELOTON</small>
                <strong>L{model.level}</strong>
                <span>{model.trust}% TRUST</span>
                <em>{model.drift}% DRIFT</em>
              </div>
            </div>
          </div>

          <div className="intel">
            <h3>Executive Intelligence</h3>
            <b>Today's highest ROI action</b>
            <p>Reduce hardware friction and reposition Peloton as a recurring wellness operating system, not a premium bike company.</p>
            <div className="impact"><span>Expected Trust Gain</span><b>+{11 + boost}</b></div>
            <div className="impact"><span>Recovery Probability</span><b>{model.recovery}%</b></div>
          </div>
        </section>

        <section className="layout">
          <Panel title="Company DNA Helix" subtitle="Weak segments bend. Strong segments straighten.">
            <div className="dna">
              {['Trust','Brand','Product','Price','Audience','Narrative','Support','Community','Growth'].map((x,i)=>(
                <div className="strand" key={x} style={{'--d':i}}><span>{x}</span><b>{Math.max(38, 88 - i*5 + boost*3)}%</b></div>
              ))}
            </div>
          </Panel>

          <Panel title="Recovery Horizon" subtitle="Projected movement toward Level 5.">
            <div className="horizon">
              {[12,10,9,8,7,6,5].map((l,i)=><div key={i} className="peak" style={{height:`${140-l*6+boost*6}px`}}><span>L{Math.max(5,l-Math.floor(boost/2))}</span></div>)}
              <div className="horizonLine" />
            </div>
          </Panel>

          <Panel title="Opportunity Galaxy" subtitle="The closest opportunities have the highest recovery pull.">
            <div className="galaxy">
              {['Family Plans','Instructor Brand','Low-Friction Hardware','Corporate Wellness','Community Events','AI Coaching'].map((x,i)=>(
                <div key={x} className={`planet p${i}`}>{x}</div>
              ))}
              <div className="sun">Peloton</div>
            </div>
          </Panel>
        </section>

        <section className="layout two">
          <Panel title="Confidence River" subtitle="Incoming confidence vs confidence leaving the system.">
            <div className="river">
              <div><h4>Incoming</h4>{['BUY','GAIN','BUILD','FLOW','CREATE','ATTRACT'].map(x=><span key={x}>{x}</span>)}</div>
              <div className="water"><i/><i/><i/><i/><i/></div>
              <div><h4>Outgoing</h4>{['SELL','LOSS','LEAK','DECAY','BREAK','REPEL'].map(x=><span className="hot" key={x}>{x}</span>)}</div>
            </div>
          </Panel>

          <Panel title="Market Gravity Engine" subtitle="Who is pulling attention away from Peloton?">
            <div className="gravity">
              <div className="companyDot">P</div>
              {competitors.map(c=><div key={c.name} className="orb" style={{'--a':`${c.angle}deg`, '--r':`${90+c.pull/2}px`}}><b>{c.name}</b><span>{c.pull}</span></div>)}
            </div>
          </Panel>
        </section>

        <section className="layout three">
          <Panel title="Brand Heat Zones" subtitle="Where Peloton is hot, cooling, or leaking trust.">
            <div className="heatmap">{heat.map(([k,v])=><div key={k} style={{'--v':v}}><b>{v}</b><span>{k}</span></div>)}</div>
          </Panel>
          <Panel title="Recovery Actions" subtitle="Click actions to improve the live pulse.">
            <div className="actions">{actions.map(([a,b,c])=><button key={a} onClick={runAction}><b>{a}</b><span>{b}</span><small>{c}</small></button>)}</div>
          </Panel>
          <Panel title="AI Board Memo" subtitle="Boardroom-ready recovery thesis.">
            <div className="memo">
              <h3>Recovery Thesis</h3>
              <p>Peloton's strongest path is to stop leading with hardware and reclaim the emotional category: guided performance, community accountability, and daily wellness momentum.</p>
              <ul><li>Protect subscription value.</li><li>Lower entry friction.</li><li>Make community the moat.</li><li>Rebuild category confidence.</li></ul>
            </div>
          </Panel>
        </section>
      </main>
      <style>{css}</style>
    </div>
  );
}

function Panel({title, subtitle, children}){
  return <section className="panel"><header><h3>{title}</h3><p>{subtitle}</p></header>{children}</section>
}

const css = `
*{box-sizing:border-box} body{margin:0;background:#03040b;color:white;font-family:Inter,ui-sans-serif,system-ui,-apple-system,Segoe UI,Arial,sans-serif} button{font:inherit;color:inherit;cursor:pointer}.app{min-height:100vh;position:relative;overflow:hidden}.cosmos{position:fixed;inset:0;background:radial-gradient(circle at 50% 0%,rgba(31,211,255,.16),transparent 32%),radial-gradient(circle at 83% 18%,rgba(255,41,219,.15),transparent 35%),linear-gradient(135deg,#02030a,#071229 52%,#05020a)}.grid{position:fixed;inset:0;background-image:linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:48px 48px;mask-image:linear-gradient(to bottom,black,transparent 90%)}.aurora{position:fixed;border-radius:999px;filter:blur(60px);opacity:.5}.a1{width:500px;height:500px;background:#12dfff;left:-180px;top:70px}.a2{width:620px;height:620px;background:#fa29ff;right:-220px;top:120px}.a3{width:420px;height:420px;background:#7357ff;left:42%;bottom:-200px}.side{position:fixed;left:24px;top:24px;bottom:24px;width:250px;border:1px solid rgba(255,255,255,.12);background:linear-gradient(180deg,rgba(255,255,255,.12),rgba(255,255,255,.045));backdrop-filter:blur(22px);border-radius:34px;padding:22px;box-shadow:0 30px 90px rgba(0,0,0,.45);z-index:5}.brandMark{width:54px;height:54px;border-radius:20px;display:grid;place-items:center;background:linear-gradient(135deg,#49f3ff,#ff4cf3);font-weight:1000;font-size:26px;box-shadow:0 0 42px rgba(73,243,255,.4)}.side h1{margin:16px 0 0;font-size:25px}.side p{margin:3px 0 20px;color:rgba(255,255,255,.55);font-size:12px}.side nav{display:grid;gap:9px}.side nav button{text-align:left;border:1px solid transparent;background:transparent;border-radius:18px;padding:11px 12px;color:rgba(255,255,255,.64)}.side nav button span{font-size:10px;margin-right:9px;color:#52e9ff}.side nav button.active,.side nav button:hover{background:rgba(78,230,255,.12);border-color:rgba(78,230,255,.24);color:#fff}.cert{position:absolute;left:18px;right:18px;bottom:18px;border:1px solid rgba(73,243,255,.22);background:rgba(73,243,255,.08);border-radius:24px;padding:16px}.cert span,.cert small{display:block;color:rgba(255,255,255,.68);margin-top:6px}.main{position:relative;z-index:2;margin-left:300px;padding:24px 24px 70px}.ticker{height:74px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.065);backdrop-filter:blur(18px);border-radius:30px;display:flex;gap:12px;align-items:center;overflow:hidden;padding:12px;margin-bottom:18px}.tick{min-width:132px;border-right:1px solid rgba(255,255,255,.1);padding-right:14px}.tick b{display:block;font-size:12px;color:#7df4ff}.tick span{font-weight:1000;font-size:20px}.tick small{display:block;color:rgba(255,255,255,.45);font-size:10px}.heroSurface{min-height:570px;display:grid;grid-template-columns:1fr 520px 310px;gap:20px;border:1px solid rgba(255,255,255,.12);background:linear-gradient(135deg,rgba(255,255,255,.11),rgba(255,255,255,.04));backdrop-filter:blur(24px);border-radius:42px;padding:28px;box-shadow:0 40px 120px rgba(0,0,0,.42);position:relative;overflow:hidden}.heroSurface:before{content:'';position:absolute;inset:-2px;background:radial-gradient(circle at 52% 50%,rgba(79,234,255,.18),transparent 32%),radial-gradient(circle at 72% 20%,rgba(255,71,240,.13),transparent 24%);pointer-events:none}.heroCopy,.reactorWrap,.intel{position:relative;z-index:1}.eyebrow{display:inline-block;border:1px solid rgba(125,244,255,.25);background:rgba(125,244,255,.08);border-radius:999px;padding:9px 13px;color:#9bf8ff;font-size:12px;font-weight:800}.heroCopy h2{font-size:56px;line-height:.92;letter-spacing:-.06em;margin:22px 0;max-width:650px}.heroCopy p{color:rgba(255,255,255,.68);font-size:17px;line-height:1.7;max-width:580px}.heroButtons{display:flex;gap:12px;margin-top:28px}.heroButtons button,.actions button{border:1px solid rgba(125,244,255,.28);background:linear-gradient(135deg,rgba(125,244,255,.2),rgba(255,74,240,.16));border-radius:999px;padding:13px 18px;font-weight:900;box-shadow:0 0 40px rgba(73,243,255,.13)}.heroButtons .ghost{background:rgba(255,255,255,.06)}.reactorWrap{display:grid;place-items:center}.reactor{width:470px;height:470px;border-radius:999px;position:relative;display:grid;place-items:center}.ring{position:absolute;inset:0;border-radius:999px;border:1px solid rgba(125,244,255,.22);animation:spin 24s linear infinite}.r2{inset:38px;border-color:rgba(255,74,240,.22);animation-duration:17s;animation-direction:reverse}.r3{inset:78px;border-style:dashed;animation-duration:29s}.r4{inset:124px;border-color:rgba(255,255,255,.16);animation-duration:12s;animation-direction:reverse}.reactor i{position:absolute;left:50%;top:50%;width:7px;height:7px;border-radius:50%;background:#87f8ff;box-shadow:0 0 18px #87f8ff;transform:rotate(calc(var(--i)*13deg)) translateX(205px);animation:pulse 2.4s ease-in-out infinite;animation-delay:calc(var(--i)*-.08s)}.core{width:220px;height:220px;border-radius:50%;display:grid;place-items:center;text-align:center;background:radial-gradient(circle,rgba(125,244,255,.28),rgba(125,244,255,.08) 48%,rgba(0,0,0,.35));border:1px solid rgba(125,244,255,.38);box-shadow:0 0 90px rgba(73,243,255,.42),inset 0 0 45px rgba(255,255,255,.08)}.core strong{font-size:70px;line-height:.8}.core small{color:#a9fbff;font-weight:900}.core span{font-weight:900}.core em{font-style:normal;color:#ff8df7;font-size:13px}.intel{border:1px solid rgba(255,255,255,.12);background:rgba(0,0,0,.22);border-radius:30px;padding:22px;align-self:stretch}.intel h3,.panel h3{margin:0 0 6px}.intel p,.panel p{color:rgba(255,255,255,.6);line-height:1.55}.impact{display:flex;justify-content:space-between;margin-top:16px;padding:14px;border-radius:20px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.10)}.impact b{font-size:26px;color:#8af8ff}.layout{display:grid;grid-template-columns:1fr 1.5fr 1fr;gap:18px;margin-top:18px}.layout.two{grid-template-columns:1.05fr .95fr}.layout.three{grid-template-columns:1fr 1fr 1fr}.panel{border:1px solid rgba(255,255,255,.11);background:linear-gradient(135deg,rgba(255,255,255,.09),rgba(255,255,255,.035));backdrop-filter:blur(18px);border-radius:34px;padding:22px;min-height:310px;box-shadow:0 24px 70px rgba(0,0,0,.25)}.panel header{margin-bottom:16px}.dna{display:grid;gap:10px}.strand{height:26px;border-radius:99px;background:linear-gradient(90deg,rgba(125,244,255,.12),rgba(255,74,240,.14));border:1px solid rgba(255,255,255,.1);display:flex;justify-content:space-between;align-items:center;padding:0 12px;transform:translateX(calc(sin(var(--d))*10px))}.strand span{color:rgba(255,255,255,.72);font-size:12px}.horizon{height:225px;display:flex;align-items:end;gap:16px;position:relative;overflow:hidden;border-radius:26px;background:linear-gradient(to top,rgba(73,243,255,.12),transparent);padding:18px}.peak{flex:1;border-radius:20px 20px 4px 4px;background:linear-gradient(to top,#3ee9ff,#ff48f2);box-shadow:0 0 30px rgba(73,243,255,.2);display:flex;align-items:start;justify-content:center;padding-top:8px;font-weight:900}.horizonLine{position:absolute;left:20px;right:20px;bottom:82px;height:2px;background:linear-gradient(90deg,transparent,#9cfbff,transparent);box-shadow:0 0 24px #9cfbff}.galaxy,.gravity{height:235px;position:relative;border-radius:26px;background:radial-gradient(circle at 50% 50%,rgba(125,244,255,.14),transparent 45%);overflow:hidden}.sun,.companyDot{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);border-radius:999px;background:rgba(125,244,255,.18);border:1px solid rgba(125,244,255,.4);box-shadow:0 0 50px rgba(73,243,255,.35);padding:18px;font-weight:1000}.planet{position:absolute;border:1px solid rgba(255,255,255,.13);background:rgba(255,255,255,.08);border-radius:999px;padding:9px 12px;font-size:12px}.p0{left:8%;top:18%}.p1{right:10%;top:10%}.p2{left:12%;bottom:16%}.p3{right:8%;bottom:18%}.p4{left:43%;top:8%}.p5{left:40%;bottom:8%}.river{display:grid;grid-template-columns:1fr 1.2fr 1fr;gap:16px;align-items:center}.river h4{margin:0 0 12px}.river span{display:block;border-radius:999px;background:rgba(125,244,255,.11);border:1px solid rgba(125,244,255,.18);padding:8px 10px;margin:7px 0;font-size:12px;font-weight:900}.river span.hot{background:rgba(255,74,240,.1);border-color:rgba(255,74,240,.2)}.water{height:220px;border-radius:999px;background:linear-gradient(180deg,rgba(125,244,255,.24),rgba(255,74,240,.13));position:relative;overflow:hidden}.water i{position:absolute;left:20%;width:16px;height:16px;border-radius:50%;background:#9cfbff;box-shadow:0 0 20px #9cfbff;animation:flow 3s linear infinite}.water i:nth-child(2){left:40%;animation-delay:-.6s}.water i:nth-child(3){left:58%;animation-delay:-1.2s}.water i:nth-child(4){left:72%;animation-delay:-1.8s}.water i:nth-child(5){left:30%;animation-delay:-2.4s}.companyDot{width:62px;height:62px;display:grid;place-items:center;padding:0}.orb{position:absolute;left:50%;top:50%;transform:rotate(var(--a)) translateX(var(--r)) rotate(calc(-1 * var(--a)));font-size:11px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.08);border-radius:18px;padding:8px 10px}.orb span{display:block;color:#8ef8ff;font-weight:900}.heatmap{display:grid;grid-template-columns:1fr 1fr;gap:10px}.heatmap div{border-radius:22px;padding:14px;min-height:78px;background:linear-gradient(135deg,rgba(125,244,255,calc(var(--v)/160)),rgba(255,74,240,calc((100 - var(--v))/150)));border:1px solid rgba(255,255,255,.1)}.heatmap b{font-size:27px}.heatmap span{display:block;color:rgba(255,255,255,.65);font-size:12px}.actions{display:grid;gap:10px}.actions button{text-align:left;border-radius:22px;padding:13px 14px}.actions span,.actions small{display:inline-block;margin-right:10px;color:#9dfbff}.memo h3{font-size:28px}.memo li{margin:9px 0;color:rgba(255,255,255,.72)}@keyframes spin{to{transform:rotate(360deg)}}@keyframes pulse{50%{opacity:.25;transform:rotate(calc(var(--i)*13deg)) translateX(170px) scale(.6)}}@keyframes flow{from{top:-20px}to{top:240px}}@media(max-width:1150px){.side{position:relative;left:auto;top:auto;bottom:auto;width:auto;margin:16px}.main{margin-left:0;padding:16px}.heroSurface,.layout,.layout.two,.layout.three{grid-template-columns:1fr}.reactor{width:330px;height:330px}.reactor i{transform:rotate(calc(var(--i)*13deg)) translateX(145px)}.heroCopy h2{font-size:42px}.ticker{overflow:auto}}
`;
