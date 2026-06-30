import Atmosphere from './design/motion/Atmosphere';
import CompanyPulse from './components/pulse/CompanyPulse';
import SignalChip from './components/ui/SignalChip';
import { signals } from './core/telemetry/SignalDictionary';

export default function App(){
  return <main className="app-shell">
    <Atmosphere />
    <aside className="nav-rail">
      <div className="brand-mark">R</div>
      <span>Pulse</span><span>Core</span><span>Signals</span><span>Horizon</span><span>AI</span>
    </aside>
    <section className="hero-surface">
      <div className="topbar">
        <div><small>ReCentre OS Core</small><h1>Company Pulse</h1></div>
        <div className="status-pill">Peloton Recovery Mission · Live Prototype</div>
      </div>
      <div className="signal-ribbon">{signals.slice(0,10).map(s=><SignalChip key={s.key} signal={s}/>)}</div>
      <CompanyPulse />
    </section>
  </main>
}
