import GlassPanel from '../ui/GlassPanel';
const strands=['Brand','Pricing','Audience','Product','Technology','Support','Culture'];
export default function CompanyDNA(){return <GlassPanel><div className="section-kicker">Company DNA</div><h3>Structural strands</h3><div className="dna">{strands.map((s,i)=><div className="dna-row" key={s}><span>{s}</span><b style={{width:`${62+i*5}%`}} /></div>)}</div></GlassPanel>}
