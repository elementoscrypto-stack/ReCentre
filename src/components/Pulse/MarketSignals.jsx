import React from 'react';
import InfoHint from '../ui/InfoHint';

const signals = [
  ['BUY', '+12', 'Confidence entering your business'],
  ['SELL', '-4', 'Confidence leaving your business'],
  ['GAIN', '+8', 'Trust accumulated through positive outcomes'],
  ['LOSS', '-2', 'Trust reduced by negative experiences'],
  ['BUILD', '+6', 'Structural improvement'],
  ['LEAK', '-5', 'Value escaping the organisation'],
  ['FLOW', '83%', 'Healthy movement of value'],
  ['DRIFT', '18', 'Movement away from best position'],
  ['LOCK', '91%', 'Customer relationships strengthening'],
  ['RECENTRE', 'L5', 'Target recovery state'],
];

export default function MarketSignals() {
  return (
    <div className="signal-ribbon">
      <div className="ribbon-label">Market Signals <InfoHint title="Market Signals">ReCentre converts company events into plain business signals. The ribbon shows the current movement of confidence, trust, drift and recovery.</InfoHint></div>
      <div className="ticker-track">
        {[...signals, ...signals].map(([name, value, meaning], i) => (
          <div className="signal-chip" key={`${name}-${i}`}>
            <span>{name}</span>
            <strong>{value}</strong>
            <em>{meaning}</em>
          </div>
        ))}
      </div>
    </div>
  );
}
