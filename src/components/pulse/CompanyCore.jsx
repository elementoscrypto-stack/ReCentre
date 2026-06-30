import ReactorCore from '../reactor/ReactorCore';
import GlassPanel from '../ui/GlassPanel';
import AnimatedValue from '../ui/AnimatedValue';

export default function CompanyCore({ pulse }) {
  return (
    <GlassPanel className="company-core-panel">
      <div className="section-kicker">Company Core</div>
      <h1>The living digital twin of Peloton recovery.</h1>
      <p className="muted">Every signal enters the core, alters the company state, and changes the recovery path toward Level 5.</p>
      <ReactorCore pulse={pulse} />
      <div className="core-stats">
        <AnimatedValue label="Trust" value={pulse.trust} />
        <AnimatedValue label="Recovery" value={pulse.recovery} suffix="%" />
        <AnimatedValue label="Risk" value={pulse.risk} suffix="%" />
      </div>
    </GlassPanel>
  );
}
