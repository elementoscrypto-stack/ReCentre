import React from 'react';
import GlassPanel from '../ui/GlassPanel';
export default function Reactor({ company }) {
  return <GlassPanel className="reactorPanel">
    <div className="reactor">
      <div className="ring ring1" /><div className="ring ring2" /><div className="ring ring3" />
      <div className="particle p1" /><div className="particle p2" /><div className="particle p3" /><div className="particle p4" />
      <div className="coreCrystal"><span>{company.name}</span><b>{company.score}</b><small>Recovery Score</small></div>
    </div>
    <div className="reactorStats">
      <div><span>Current Level</span><b>{company.level}</b></div>
      <div><span>Target</span><b>{company.target}</b></div>
      <div><span>Recovery Probability</span><b>{company.recoveryProbability}%</b></div>
      <div><span>AI Confidence</span><b>{company.confidence}%</b></div>
    </div>
    <p className="thesis">{company.thesis}</p>
  </GlassPanel>
}
