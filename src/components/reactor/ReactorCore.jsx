import { signals } from '../../core/telemetry/SignalDictionary';

export default function ReactorCore({ pulse }) {
  return (
    <div className="reactor-shell" aria-label="Company Core Reactor">
      <div className="reactor-orbit orbit-one" />
      <div className="reactor-orbit orbit-two" />
      <div className="reactor-orbit orbit-three" />
      <div className="reactor-crystal">
        <span>PELOTON</span>
        <b>LEVEL {pulse.level}</b>
        <small>Target Level {pulse.target}</small>
      </div>
      {signals.slice(0, 8).map((s, i) => <span key={s.key} className={`reactor-signal s${i}`}>{s.key}</span>)}
      {Array.from({ length: 34 }).map((_, i) => <i key={i} className={`particle p${i % 10}`} />)}
    </div>
  );
}
