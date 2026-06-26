import React from 'react';
import GlassPanel from '../ui/GlassPanel';
export default function CompanyDNA({ items }) {
  return <GlassPanel title="Company DNA" kicker="structural recovery strands">
    <div className="dna">{items.map((item,i)=><div className="dnaRow" key={item.label}><span>{item.label}</span><div><i style={{width:`${item.value}%`}} /></div><b>{item.value}</b></div>)}</div>
  </GlassPanel>
}
