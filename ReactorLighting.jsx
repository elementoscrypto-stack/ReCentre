import GlassPanel from '../ui/GlassPanel';
import { signals } from '../../core/telemetry/SignalDictionary';

const instruments = {
  BUY:'Strings', SELL:'Low Brass', GAIN:'Pulse Bells', LOSS:'Cello', BUILD:'Percussion', DRIFT:'Low Synth', CENTRE:'Choir', FLOW:'Harp', LOCK:'Bassline', LEAK:'Static'
};

export default function SignalOrchestra(){
  return <GlassPanel className="signal-orchestra-panel">
    <div className="section-kicker">Signal Orchestra</div>
    <h2>Every business signal has a motion signature.</h2>
    <p className="muted">ReCentre choreographs telemetry like an executive instrument panel: confidence enters, risk escapes, recovery converges.</p>
    <div className="orchestra-grid">
      {signals.slice(0,10).map((s,i)=><div className={`orchestra-row ${s.polarity}`} key={s.key}>
        <span>{s.key}</span><i>{instruments[s.key] || 'Signal'}</i><b>{s.value > 0 ? '+' : ''}{s.value}</b><em style={{'--h':`${Math.abs(s.value) * 1.1 + 20}px`}} /></div>)}
    </div>
  </GlassPanel>
}
