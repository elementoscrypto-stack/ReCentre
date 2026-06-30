import { calculatePulse } from '../../core/telemetry/RecoveryPhysics';
import CompanyCore from './CompanyCore';
import TelemetrySupervisorPanel from './TelemetrySupervisorPanel';
import ConfidenceRiver from './ConfidenceRiver';
import OpportunityGalaxy from './OpportunityGalaxy';
import CompanyDNA from './CompanyDNA';
import ExecutiveIntelligence from './ExecutiveIntelligence';
import RecoveryTimeline from './RecoveryTimeline';
import CompanyWeather from './CompanyWeather';
import RecoveryConstellation from './RecoveryConstellation';
import RecoveryTimeMachine from '../time-machine/RecoveryTimeMachine';
import SignalOrchestra from './SignalOrchestra';
import LivingCompanySkeleton from './LivingCompanySkeleton';

export default function CompanyPulse(){
  const pulse = calculatePulse();
  return (
    <div className="pulse-grid pulse-grid-v2">
      <CompanyCore pulse={pulse}/>
      <ExecutiveIntelligence/>
      <TelemetrySupervisorPanel/>
      <ConfidenceRiver/>
      <OpportunityGalaxy/>
      <CompanyDNA/>
      <CompanyWeather/>
      <RecoveryConstellation/>
      <SignalOrchestra/>
      <LivingCompanySkeleton/>
      <RecoveryTimeline/>
      <RecoveryTimeMachine/>
    </div>
  )
}
