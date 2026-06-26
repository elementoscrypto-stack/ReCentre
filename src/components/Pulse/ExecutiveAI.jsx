import React from 'react';
import GlassPanel from '../ui/GlassPanel';
export default function ExecutiveAI({ company, selectedAction, setSelectedAction }) {
  return <GlassPanel title="Executive Intelligence" kicker="highest ROI action">
    <div className="aiCard"><p>Recommended move</p><h3>{selectedAction}</h3><span>Expected impact: +12 Trust, -8 Drift, +9 Recovery Probability</span></div>
    <div className="actionList">{company.actions.map(a => <button key={a} onClick={()=>setSelectedAction(a)} className={a===selectedAction?'active':''}>{a}</button>)}</div>
  </GlassPanel>
}
