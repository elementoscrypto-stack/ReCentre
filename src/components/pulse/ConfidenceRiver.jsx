import GlassPanel from '../ui/GlassPanel';
const incoming=['BUY','GAIN','BUILD','FLOW','LOCK','ATTRACT'];
const outgoing=['SELL','LOSS','LEAK','DECAY','DRIFT','DOUBT'];
export default function ConfidenceRiver(){return <GlassPanel><div className="section-kicker">Confidence River</div><h3>Value entering vs escaping</h3><div className="river"><div>{incoming.map(x=><span className="river-chip in" key={x}>{x}</span>)}</div><div>{outgoing.map(x=><span className="river-chip out" key={x}>{x}</span>)}</div><div className="river-stream"><i/><i/><i/><i/><i/></div></div></GlassPanel>}
