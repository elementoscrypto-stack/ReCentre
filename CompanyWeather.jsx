import ReactorCore from '../reactor/ReactorCore';
import GlassPanel from '../ui/GlassPanel';
import AnimatedValue from '../ui/AnimatedValue';

export default function CompanyCore({ pulse }) {
  return (
    <GlassPanel className="company-core-panel aurora-core-panel">
      <div className="core-header-row">
        <div>
          <div className="section-kicker">Company Core</div>
          <h1>The living digital twin of Peloton recovery.</h1>
          <p className="muted">Every signal enters the core, changes the company state, and redraws the recovery path toward Level 5.</p>
        </div>
        <div className="core-vital">
          <span>LIVE CORE</span>
          <b>{pulse.recovery}%</b>
        </div>
      </div>
      <ReactorCore pulse={pulse} />
      <div className="core-stats core-stats-v2">
        <AnimatedValue label="Trust" value={pulse.trust} />
        <AnimatedValue label="Recovery Probability" value={pulse.recovery} suffix="%" />
        <AnimatedValue label="Market Risk" value={pulse.risk} suffix="%" />
      </div>
    </GlassPanel>
  );
}
