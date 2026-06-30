import GlassPanel from '../ui/GlassPanel';

const nodes = ['Brand','Pricing','Subscribers','Hardware','Instructors','Retail','AI Coach','Wellness'];

export default function LivingCompanySkeleton(){
  return <GlassPanel className="skeleton-panel">
    <div className="section-kicker">Company Skeleton</div>
    <h2>The structure behind the pulse.</h2>
    <div className="skeleton-map">
      {nodes.map((n,i)=><div key={n} className={`skeleton-node sn${i}`}><span>{n}</span></div>)}
      <div className="skeleton-core">PELOTON</div>
    </div>
  </GlassPanel>
}
