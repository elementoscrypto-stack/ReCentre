import GlassPanel from '../ui/GlassPanel';

const branches = [
  { name:'Conservative', path:['Today','Pricing clarity','Retention lift','Level 7'], score:72 },
  { name:'Balanced', path:['Today','Family bundle','AI Coach','Level 6'], score:84 },
  { name:'Transformational', path:['Today','Coaching OS','Wellness network','Level 5'], score:91 }
];

const ledger = [
  ['Lower hardware friction','BUY + FLOW + TRUST','Level 8 → Level 7','84%'],
  ['Reframe around coaching','BUILD + PULL + CENTRE','Level 7 → Level 6','86%'],
  ['Bundle family memberships','ATTRACT + LOCK + GAIN','Retention +8','81%'],
  ['Launch AI coach','CREATE + FLOW + VALUE','Recovery +9','78%']
];

export default function RecoveryTimeMachine(){
  return <GlassPanel className="time-machine aurora-time-machine">
    <div className="time-machine-hero">
      <div>
        <div className="section-kicker">Recovery Horizon · Time Machine</div>
        <h2>Explore the future before the board commits to it.</h2>
        <p className="muted">Every move creates downstream telemetry. ReCentre projects the fine-grained signal chain, compares branches, and shows the clearest route toward Level 5.</p>
      </div>
      <button className="glow-action">Open Future Mode</button>
    </div>
    <div className="future-branches">
      {branches.map((b,i)=><div className={`future-branch fb${i}`} key={b.name}>
        <div className="branch-score"><span>{b.score}%</span><small>confidence</small></div>
        <b>{b.name}</b>
        <div className="branch-line">{b.path.map(p=><em key={p}>{p}</em>)}</div>
      </div>)}
    </div>
    <div className="decision-ledger-v2">
      {ledger.map(row=><div className="ledger-row" key={row[0]}><b>{row[0]}</b><span>{row[1]}</span><em>{row[2]}</em><i>{row[3]}</i></div>)}
    </div>
  </GlassPanel>
}
