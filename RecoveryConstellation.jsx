import GlassPanel from '../ui/GlassPanel';

const rules = [
  ['LOSS + DRIFT','De-mark hardware dependency','ACTIVE'],
  ['TRUST + BUILD','Reframe around coaching','APPROVED'],
  ['LEAK + BLOCK','Simplify pricing bundle','HIGH'],
  ['CENTRE + GAIN','Project Level 5 path','RUNNING']
];

export default function TelemetrySupervisorPanel(){
  return <GlassPanel className="supervisor-panel v2-supervisor">
    <div className="section-kicker">Telemetry Supervisor</div>
    <h2>Supervising 127 Peloton recovery signals.</h2>
    <p className="muted">The supervisor observes every telemetry change, triggers de-markation when drift rises, and activates recategorization when a stronger future category appears.</p>
    <div className="supervisor-rules">
      {rules.map((r,i)=><div className="rule-card" key={r[0]}><span>{r[0]}</span><b>{r[1]}</b><em>{r[2]}</em><i /></div>)}
    </div>
  </GlassPanel>
}
