import GlassPanel from '../ui/GlassPanel';
const events=['Market drift','Hardware friction','Subscription focus','Category rebuild','Level 5'];
export default function RecoveryTimeline(){return <GlassPanel className="timeline-panel"><div className="section-kicker">Recovery Timeline</div><div className="timeline-line">{events.map((e,i)=><div key={e} className="time-node"><b>{i===0?'Past':i===4?'Target':`${i*45}D`}</b><span>{e}</span></div>)}</div></GlassPanel>}
