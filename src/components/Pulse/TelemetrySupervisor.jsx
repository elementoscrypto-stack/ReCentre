import React from 'react';
import GlassPanel from '../ui/GlassPanel';
import InfoHint from '../ui/InfoHint';

const rules = [
  ['LOSS + DRIFT', 'De-Markation required', 'Active'],
  ['BLOCK + LEAK', 'Pricing friction detected', 'High'],
  ['TRUST + BUILD', 'Subscription loyalty stabilising', 'Positive'],
  ['PULL + GAIN', 'Instructor brand remains valuable', 'Strong'],
];

export default function TelemetrySupervisor() {
  return (
    <GlassPanel className="supervisor-panel">
      <div className="panel-head">
        <div>
          <div className="tiny-label">Telemetry Supervisor</div>
          <h3>The observing intelligence layer</h3>
        </div>
        <InfoHint title="Telemetry Supervisor">
          The Supervisor watches every company signal, identifies patterns, and decides which recovery engine should activate. It observes, measures, ranks, and recommends.
        </InfoHint>
      </div>
      <p className="panel-explain">Monitoring 127 live recovery signals. Highest priority: reduce hardware friction and strengthen subscription confidence.</p>
      <div className="rule-list">
        {rules.map(([formula, result, state]) => (
          <div className="rule" key={formula}>
            <span>{formula}</span>
            <strong>{result}</strong>
            <em>{state}</em>
          </div>
        ))}
      </div>
      <div className="supervisor-actions">
        <button>Approve De-Markation</button>
        <button>Generate New Category</button>
        <button>Simulate Recovery</button>
      </div>
    </GlassPanel>
  );
}
