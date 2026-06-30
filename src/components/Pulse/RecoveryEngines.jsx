import React from 'react';
import GlassPanel from '../ui/GlassPanel';
import InfoHint from '../ui/InfoHint';

export default function RecoveryEngines() {
  return (
    <GlassPanel className="engines-panel">
      <div className="panel-head">
        <div>
          <div className="tiny-label">Recovery Engines</div>
          <h3>Strategic subtraction, then stronger category formation</h3>
        </div>
        <InfoHint title="Recovery Engines">
          De-Markation identifies what should stop defining the company. Recategorization forms a better strategic category around what the company can own next.
        </InfoHint>
      </div>
      <div className="engine-grid">
        <div><span>De-Markation</span><b>Remove premium hardware dependency</b><p>Strategic subtraction: stop letting the bike define the entire business.</p></div>
        <div><span>Recategorization</span><b>Premium Connected Coaching</b><p>Rebuild around subscription, instructors, motivation and measurable outcomes.</p></div>
        <div><span>Trust Promise</span><b>Fitness confidence without friction</b><p>Make the promise easier to believe, easier to start, and easier to keep.</p></div>
      </div>
    </GlassPanel>
  );
}
