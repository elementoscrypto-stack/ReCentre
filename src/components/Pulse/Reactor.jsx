import React from 'react';
import GlassPanel from '../ui/GlassPanel';

const inboundSignals = ['BUY', 'GAIN', 'BUILD', 'FLOW', 'LOCK', 'CREATE'];
const outboundSignals = ['SELL', 'LOSS', 'LEAK', 'DRIFT'];
const stakeholderNodes = ['Customers', 'Competitors', 'Investors', 'Media', 'Employees'];

export default function Reactor({ company }) {
  const health = Math.max(0, Math.min(100, company.score || 71));
  const drift = Math.max(0, Math.min(100, company.drift || 31));
  const confidence = Math.max(0, Math.min(100, company.confidence || 82));
  const recovery = Math.max(0, Math.min(100, company.recoveryProbability || 74));

  return (
    <GlassPanel className="reactorPanel reactorV11">
      <div className="reactorHeader">
        <div>
          <p className="eyebrow">Company Pulse Reactor</p>
          <h3>Peloton Recovery Core</h3>
        </div>
        <div className="reactorMode">
          <span>LIVE</span>
          <b>Recovery Mission</b>
        </div>
      </div>

      <div className="reactorStage" style={{ '--health': `${health}%`, '--drift': `${drift}%`, '--confidence': `${confidence}%`, '--recovery': `${recovery}%` }}>
        <div className="reactorHalo haloOne" />
        <div className="reactorHalo haloTwo" />
        <div className="reactorHalo haloThree" />
        <div className="reactorHalo haloFour" />

        <div className="reactorAxis horizontal" />
        <div className="reactorAxis vertical" />

        <div className="reactorOrbit orbitTelemetry">
          {inboundSignals.map((signal, index) => (
            <span key={signal} className={`orbitLabel in label${index + 1}`}>{signal}</span>
          ))}
        </div>

        <div className="reactorOrbit orbitRisk">
          {outboundSignals.map((signal, index) => (
            <span key={signal} className={`orbitLabel out risk${index + 1}`}>{signal}</span>
          ))}
        </div>

        <div className="stakeholderOrbit">
          {stakeholderNodes.map((node, index) => (
            <span key={node} className={`stakeNode stake${index + 1}`}>{node}</span>
          ))}
        </div>

        {Array.from({ length: 22 }).map((_, index) => (
          <span key={`in-${index}`} className={`energyParticle particleIn particleIn${(index % 11) + 1}`} />
        ))}
        {Array.from({ length: 12 }).map((_, index) => (
          <span key={`out-${index}`} className={`energyParticle particleOut particleOut${(index % 6) + 1}`} />
        ))}

        <div className="companyCrystalWrap">
          <div className="crystalShard shardA" />
          <div className="crystalShard shardB" />
          <div className="crystalShard shardC" />
          <div className="companyCrystal">
            <span>{company.name}</span>
            <b>{company.score}</b>
            <small>Recovery Score</small>
          </div>
        </div>

        <div className="reactorReadout readoutA">
          <span>Trust Flow</span>
          <b>{company.trust || 68}%</b>
        </div>
        <div className="reactorReadout readoutB">
          <span>Market Drift</span>
          <b>{company.drift || 31}%</b>
        </div>
        <div className="reactorReadout readoutC">
          <span>AI Confidence</span>
          <b>{company.confidence || 82}%</b>
        </div>
        <div className="reactorReadout readoutD">
          <span>Recovery</span>
          <b>{company.recoveryProbability || 74}%</b>
        </div>
      </div>

      <div className="reactorTelemetryBars">
        <PulseBar label="Health" value={health} />
        <PulseBar label="Momentum" value={company.recoveryProbability || 74} />
        <PulseBar label="Confidence" value={confidence} />
        <PulseBar label="Drift Control" value={100 - drift} />
      </div>

      <div className="reactorStats upgradedStats">
        <div><span>Current Level</span><b>{company.level}</b></div>
        <div><span>Target</span><b>{company.target}</b></div>
        <div><span>Recovery Probability</span><b>{company.recoveryProbability}%</b></div>
        <div><span>AI Confidence</span><b>{company.confidence}%</b></div>
      </div>

      <p className="thesis reactorThesis">{company.thesis}</p>
    </GlassPanel>
  );
}

function PulseBar({ label, value }) {
  return (
    <div className="pulseBar">
      <div className="pulseBarMeta"><span>{label}</span><b>{value}%</b></div>
      <div className="pulseTrack"><i style={{ width: `${value}%` }} /></div>
    </div>
  );
}
