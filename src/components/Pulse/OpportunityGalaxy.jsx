import React from 'react';
import GlassPanel from '../ui/GlassPanel';
import InfoHint from '../ui/InfoHint';

const ops = ['Family Bundle', 'AI Coach', 'Retail Access', 'Corporate Wellness', 'Instructor Brand', 'Financing'];

export default function OpportunityGalaxy() {
  return (
    <GlassPanel className="galaxy-panel">
      <div className="panel-head">
        <div>
          <div className="tiny-label">Opportunity Galaxy</div>
          <h3>Strategic moves orbiting the company</h3>
        </div>
        <InfoHint title="Opportunity Galaxy">
          Every organisation exists inside a universe of opportunities. The closer an opportunity orbits the core, the stronger its projected recovery impact.
        </InfoHint>
      </div>
      <div className="galaxy-stage">
        <div className="galaxy-sun">P</div>
        {ops.map((op, i) => <span key={op} className={`planet planet-${i}`}>{op}</span>)}
      </div>
    </GlassPanel>
  );
}
