import React from 'react';
import MarketSignals from './MarketSignals';
import Reactor from './Reactor';
import TelemetrySupervisor from './TelemetrySupervisor';
import ConfidenceRiver from './ConfidenceRiver';
import RecoveryTimeline from './RecoveryTimeline';
import OpportunityGalaxy from './OpportunityGalaxy';
import CompanyDNA from './CompanyDNA';
import ExecutiveAI from './ExecutiveAI';

export default function CompanyPulse({ company, selectedAction, setSelectedAction }) {
  return <div className="pulseSurface">
    <MarketSignals signals={company.signals} />
    <div className="heroGrid">
      <CompanyDNA items={company.dna} />
      <Reactor company={company} />
      <ExecutiveAI company={company} selectedAction={selectedAction} setSelectedAction={setSelectedAction} />
    </div>
    <div className="lowerGrid">
      <ConfidenceRiver />
      <RecoveryTimeline timeline={company.timeline} />
      <OpportunityGalaxy items={company.opportunities} />
    </div>
    <TelemetrySupervisor rows={company.supervisor} />
  </div>
}
