import React, { useState } from 'react';
import GlassPanel from '../ui/GlassPanel';
import InfoHint from '../ui/InfoHint';

const scenarios = {
  Conservative: [7, 7, 6, 6, 5],
  Balanced: [7, 6, 6, 5, 5],
  Aggressive: [7, 6, 5, 5, 4],
  Transformational: [7, 5, 5, 4, 3],
};

export default function RecoveryHorizon() {
  const [scenario, setScenario] = useState('Balanced');
  const path = scenarios[scenario];
  return (
    <GlassPanel className="horizon-panel">
      <div className="panel-head">
        <div>
          <div className="tiny-label">Recovery Horizon</div>
          <h3>Time Machine for company recovery</h3>
        </div>
        <InfoHint title="Recovery Horizon">
          The Time Machine projects how today’s decisions may influence trust, growth, customer confidence and market position across future recovery states.
        </InfoHint>
      </div>
      <div className="scenario-tabs">
        {Object.keys(scenarios).map(s => <button className={scenario === s ? 'active' : ''} onClick={() => setScenario(s)} key={s}>{s}</button>)}
      </div>
      <div className="future-line">
        {['Today', '30D', '90D', '180D', '1Y'].map((t, i) => (
          <div className="future-node" key={t}>
            <strong>L{path[i]}</strong>
            <span>{t}</span>
          </div>
        ))}
      </div>
      <div className="decision-ledger">
        <div><b>Family Bundle</b><span>ATTRACT + LOCK + GAIN</span><em>84%</em></div>
        <div><b>Simplify Pricing</b><span>BUILD + TRUST + FLOW</span><em>81%</em></div>
        <div><b>AI Coach</b><span>CREATE + VALUE + LOCK</span><em>76%</em></div>
      </div>
    </GlassPanel>
  );
}
