import GlassPanel from '../ui/GlassPanel';
const opps=['Pricing','AI Coach','Corporate','Family Bundle','Retail','Coaching'];
export default function OpportunityGalaxy(){return <GlassPanel><div className="section-kicker">Opportunity Galaxy</div><h3>Recovery opportunities orbiting Peloton</h3><div className="galaxy">{opps.map((o,i)=><span className={`planet planet-${i}`} key={o}>{o}</span>)}</div></GlassPanel>}
