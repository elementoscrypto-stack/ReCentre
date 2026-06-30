import GlassPanel from '../ui/GlassPanel';

const incoming = ['BUY','GAIN','BUILD','FLOW','ATTRACT','LOCK'];
const outgoing = ['SELL','LOSS','LEAK','DECAY','REPEL','DRIFT'];

export default function ConfidenceRiver(){
  return <GlassPanel className="confidence-river-panel river-v2">
    <div className="section-kicker">Confidence River</div>
    <h2>Watch confidence enter and escape the company.</h2>
    <div className="river-stage">
      <div className="river-lane incoming">{incoming.map((x,i)=><span key={x} style={{animationDelay:`${i*.22}s`}}>{x}</span>)}</div>
      <div className="river-core">VALUE FLOW</div>
      <div className="river-lane outgoing">{outgoing.map((x,i)=><span key={x} style={{animationDelay:`${i*.25}s`}}>{x}</span>)}</div>
      {Array.from({length:34}).map((_,i)=><i key={i} className={`river-dot rd${i%7}`}/>) }
    </div>
  </GlassPanel>
}
