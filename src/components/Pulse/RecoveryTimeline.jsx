import React from 'react';
import GlassPanel from '../ui/GlassPanel';
export default function RecoveryTimeline({ timeline }) {
  return <GlassPanel title="Recovery Horizon" kicker="forecast to Level 5">
    <div className="timeline">{timeline.map((t,i) => <div className="timeNode" key={t.label}><b>L{t.level}</b><span>{t.label}</span>{i < timeline.length-1 && <i />}</div>)}</div>
  </GlassPanel>
}
