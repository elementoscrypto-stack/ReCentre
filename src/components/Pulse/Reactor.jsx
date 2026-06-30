import React from 'react';
import InfoHint from '../ui/InfoHint';

const orbitSignals = ['BUY', 'GAIN', 'BUILD', 'FLOW', 'LOCK', 'TRUST'];
const marketNodes = ['Customers', 'Competitors', 'Media', 'Investors', 'Employees'];

export default function Reactor() {
  return (
    <div className="reactor-wrap">
      <div className="reactor-title-row">
        <div>
          <div className="tiny-label">Company Core</div>
          <h2>Peloton digital twin</h2>
        </div>
        <InfoHint title="Company Core">
          The Company Core is the living visual summary of organisational health. Positive signals strengthen the core. Negative signals create pressure and recovery urgency.
        </InfoHint>
      </div>

      <div className="reactor">
        <div className="reactor-ring ring-outer" />
        <div className="reactor-ring ring-mid" />
        <div className="reactor-ring ring-inner" />
        <div className="reactor-grid" />
        <div className="crystal">
          <div className="crystal-face" />
          <div className="crystal-copy">
            <span>PELOTON</span>
            <strong>LEVEL 7</strong>
            <em>Recovery Motion</em>
          </div>
        </div>
        {orbitSignals.map((s, i) => <span key={s} className={`orbit-chip chip-${i}`}>{s}</span>)}
        {marketNodes.map((s, i) => <span key={s} className={`market-node node-${i}`}>{s}</span>)}
        {Array.from({ length: 26 }, (_, i) => <i key={i} className={`particle p${i}`} />)}
      </div>

      <div className="core-metrics">
        <Metric label="Health" value="78" />
        <Metric label="Momentum" value="64" />
        <Metric label="Confidence" value="84" />
        <Metric label="Recovery" value="71" />
      </div>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="core-metric">
      <span>{label}</span>
      <strong>{value}</strong>
      <div className="bar"><i style={{ width: `${value}%` }} /></div>
    </div>
  );
}
