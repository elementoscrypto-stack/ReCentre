import React from 'react';
import GlassPanel from '../ui/GlassPanel';
export default function TelemetrySupervisor({ rows }) {
  return <GlassPanel title="Telemetry Supervisor" kicker="Supervising de-markation + recategorization">
    <div className="supervisorGrid">{rows.map(row => <div className="supervisorRow" key={row.name}>
      <div><b>{row.name}</b><span>{row.signal}</span></div>
      <div className="bar"><i style={{width: `${row.severity}%`}} /></div>
      <p>{row.action}</p>
    </div>)}</div>
  </GlassPanel>
}
