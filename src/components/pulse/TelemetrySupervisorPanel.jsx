import GlassPanel from '../ui/GlassPanel';
import { superviseCompany } from '../../core/telemetry/TelemetrySupervisor';

export default function TelemetrySupervisorPanel() {
  const { directives } = superviseCompany();
  return <GlassPanel><div className="section-kicker">Telemetry Supervisor</div><h3>Supervising company signals</h3><p className="muted">Observes, measures, ranks and recommends without hiding the reasoning.</p><ul className="directive-list">{directives.map(d=><li key={d}>{d}</li>)}</ul></GlassPanel>;
}
