import React from 'react';
import GlassPanel from '../ui/GlassPanel';
import InfoHint from '../ui/InfoHint';

const strands = ['Brand', 'Pricing', 'Audience', 'Product', 'Leadership', 'Support', 'Culture'];

export default function CompanyDNA() {
  return (
    <GlassPanel className="dna-panel">
      <div className="panel-head">
        <div>
          <div className="tiny-label">Company DNA</div>
          <h3>Structural strands of recovery</h3>
        </div>
        <InfoHint title="Company DNA">
          Every company has structural DNA. Weak strands bend under pressure. Strong strands straighten and carry recovery momentum.
        </InfoHint>
      </div>
      <div className="dna-stage">
        {strands.map((s, i) => <div key={s} className={`dna-rung rung-${i}`}><span>{s}</span></div>)}
      </div>
    </GlassPanel>
  );
}
