import React from 'react';
import MarketSignals from './MarketSignals';
import Reactor from './Reactor';
import TelemetrySupervisor from './TelemetrySupervisor';
import ConfidenceRiver from './ConfidenceRiver';
import CompanyDNA from './CompanyDNA';
import OpportunityGalaxy from './OpportunityGalaxy';
import ExecutiveAI from './ExecutiveAI';
import RecoveryHorizon from './RecoveryHorizon';
import RecoveryEngines from './RecoveryEngines';

export default function CompanyPulse({ section, setSection }) {
  return (
    <div className="pulse-page">
      <MarketSignals />
      <header className="pulse-hero">
        <div>
          <div className="eyebrow">Company Pulse</div>
          <h1>The living digital twin for Peloton recovery.</h1>
          <p>Every panel below is a different view of the same company state. The Core shows energy, the River shows flow, the DNA shows structure, the Galaxy shows opportunity, and the Supervisor explains what to do next.</p>
        </div>
        <button className="secondary-btn" onClick={() => setSection('time')}>Open Time Machine</button>
      </header>

      <div className="pulse-grid top-grid">
        <CompanyDNA />
        <Reactor />
        <ExecutiveAI />
      </div>

      <div className="pulse-grid middle-grid">
        <ConfidenceRiver />
        <TelemetrySupervisor />
        <OpportunityGalaxy />
      </div>

      <div className="anchor-row">
        {section === 'time' && <RecoveryHorizon />}
        {section === 'engines' && <RecoveryEngines />}
        {section !== 'time' && section !== 'engines' && (
          <>
            <RecoveryHorizon />
            <RecoveryEngines />
          </>
        )}
      </div>
    </div>
  );
}
