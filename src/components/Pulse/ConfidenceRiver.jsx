import React from 'react';
import GlassPanel from '../ui/GlassPanel';
export default function ConfidenceRiver() {
  const inFlow = ['BUY','GAIN','BUILD','FLOW','CREATE','ATTRACT'];
  const outFlow = ['SELL','LOSS','LEAK','DECAY','BREAK','REPEL'];
  return <GlassPanel title="Confidence River" kicker="value entering vs leaving">
    <div className="river"><div className="riverStream in">{inFlow.map(x => <span key={x}>{x}</span>)}</div><div className="riverStream out">{outFlow.map(x => <span key={x}>{x}</span>)}</div></div>
  </GlassPanel>
}
