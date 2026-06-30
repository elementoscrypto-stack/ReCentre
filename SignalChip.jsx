import { decisionBranches } from '../../core/telemetry/DecisionGraph';
export default function FutureBranches(){return <div className="future-branches">{decisionBranches.map((b,i)=><div className={`branch b${i}`} key={b.decision}><strong>{b.decision}</strong><span>{b.chain.join(' → ')}</span><small>{b.result}</small></div>)}</div>}
