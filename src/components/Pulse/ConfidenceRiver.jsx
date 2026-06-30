import React from 'react';
import GlassPanel from '../ui/GlassPanel';
import InfoHint from '../ui/InfoHint';

export default function ConfidenceRiver() {
  return (
    <GlassPanel className="river-panel">
      <div className="panel-head">
        <div>
          <div className="tiny-label">Confidence River</div>
          <h3>Where value enters and escapes</h3>
        </div>
        <InfoHint title="Confidence River">
          Confidence flows through every organisation. Incoming signals show trust entering. Outgoing signals show trust, value, or attention escaping.
        </InfoHint>
      </div>
      <div className="river-stage">
        <div className="river-line incoming"><span>BUY</span><span>BUILD</span><span>GAIN</span><span>FLOW</span><span>ATTRACT</span></div>
        <div className="river-core">PELOTON</div>
        <div className="river-line outgoing"><span>SELL</span><span>LOSS</span><span>LEAK</span><span>DECAY</span><span>REPEL</span></div>
      </div>
    </GlassPanel>
  );
}
