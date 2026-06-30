export default function ReactorSignals({ signals=[] }) { return <div className="reactor-signal-list">{signals.map(s=><span key={s.key}>{s.key}</span>)}</div>; }
