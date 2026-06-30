import GlassPanel from '../ui/GlassPanel';

const opportunities = [
  ['AI Coach','+9 Trust','86%'], ['Family Bundle','+8 Lock','81%'], ['Corporate Wellness','+7 Demand','76%'], ['Instructor IP','+10 Pull','88%'], ['Lower Hardware Friction','+11 Flow','84%'], ['Retail Refresh','+6 Buy','72%']
];

export default function OpportunityGalaxy(){
  return <GlassPanel className="opportunity-panel galaxy-v2">
    <div className="section-kicker">Opportunity Galaxy</div>
    <h2>Strategic moves orbiting Peloton.</h2>
    <div className="galaxy-stage">
      <div className="galaxy-core">P</div>
      {opportunities.map((o,i)=><div key={o[0]} className={`planet pl${i}`}><b>{o[0]}</b><span>{o[1]}</span><em>{o[2]}</em></div>)}
    </div>
  </GlassPanel>
}
