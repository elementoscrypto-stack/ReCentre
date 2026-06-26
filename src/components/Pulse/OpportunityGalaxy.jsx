import React from 'react';
import GlassPanel from '../ui/GlassPanel';
export default function OpportunityGalaxy({ items }) {
  return <GlassPanel title="Opportunity Galaxy" kicker="highest gravity recovery moves">
    <div className="galaxy"><div className="galaxyCore">L5</div>{items.map((o,i)=><div key={o.label} className={`planet planet${i+1}`}><b>{o.label}</b><span>{o.impact}</span></div>)}</div>
  </GlassPanel>
}
