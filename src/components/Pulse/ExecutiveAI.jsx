import React from 'react';
import GlassPanel from '../ui/GlassPanel';
import InfoHint from '../ui/InfoHint';

export default function ExecutiveAI() {
  return (
    <GlassPanel className="exec-panel">
      <div className="panel-head">
        <div>
          <div className="tiny-label">Executive Intelligence</div>
          <h3>Today’s highest-impact action</h3>
        </div>
        <InfoHint title="Executive Intelligence">
          Converts signal movement into board-level recommendations. Every recommendation includes impact, evidence, confidence and recovery contribution.
        </InfoHint>
      </div>
      <div className="ai-priority">Reduce hardware friction while strengthening subscription identity.</div>
      <div className="ai-grid">
        <span><b>+11</b> Trust Gain</span>
        <span><b>84%</b> Confidence</span>
        <span><b>-6</b> Drift</span>
        <span><b>90D</b> Horizon</span>
      </div>
      <p className="panel-explain">Peloton’s strongest recovery path is to make entry easier, protect instructor-led brand equity, and shift the story from premium bike ownership to premium connected coaching.</p>
    </GlassPanel>
  );
}
