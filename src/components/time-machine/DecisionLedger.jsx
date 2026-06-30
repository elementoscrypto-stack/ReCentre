import { recoveryActions } from '../../core/telemetry/RecoveryPhysics';
export default function DecisionLedger(){return <div className="decision-ledger"><h3>Decision Ledger</h3>{recoveryActions.map(a=><div className="ledger-row" key={a.name}><b>{a.name}</b><span>{a.signal}</span><em>{a.impact}</em><small>{a.confidence}</small></div>)}</div>}
