import { signals } from '../../core/telemetry/SignalDictionary';

const beams = [
  ['BUY','in'], ['GAIN','in'], ['BUILD','in'], ['FLOW','in'], ['LOCK','in'],
  ['SELL','out'], ['LOSS','out'], ['LEAK','out'], ['DRIFT','orbit']
];

export default function ReactorCore({ pulse }) {
  return (
    <div className="reactor-shell reactor-shell-v2" aria-label="Company Core Reactor">
      <div className="reactor-depth halo-a" />
      <div className="reactor-depth halo-b" />
      <div className="reactor-orbit orbit-one" />
      <div className="reactor-orbit orbit-two" />
      <div className="reactor-orbit orbit-three" />
      <div className="reactor-orbit orbit-four" />

      <div className="company-skeleton-shadow">
        <span className="sk-node n1"/><span className="sk-node n2"/><span className="sk-node n3"/><span className="sk-node n4"/>
        <span className="sk-line l1"/><span className="sk-line l2"/><span className="sk-line l3"/>
      </div>

      {beams.map((b, i)=><i key={b[0]} className={`signal-beam beam-${i} ${b[1]}`}/>) }

      <div className="reactor-crystal reactor-crystal-v2">
        <span>PELOTON</span>
        <b>LEVEL {pulse.level}</b>
        <small>Target Level {pulse.target}</small>
        <em>{pulse.recovery}% recovery</em>
      </div>

      {signals.slice(0, 10).map((s, i) => <span key={s.key} className={`reactor-signal s${i}`}>{s.key}<small>{s.value > 0 ? '+' : ''}{s.value}</small></span>)}
      {Array.from({ length: 70 }).map((_, i) => <i key={i} className={`particle v2-particle p${i % 14}`} />)}
      {Array.from({ length: 16 }).map((_, i) => <i key={`spark-${i}`} className={`micro-spark sp${i % 8}`} />)}
    </div>
  );
}
