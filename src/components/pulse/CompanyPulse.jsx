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

export default function CompanyPulse(){
  const pulse = calculatePulse();
  return <div className="pulse-grid">
    <CompanyCore pulse={pulse}/>
    <ExecutiveIntelligence/>
    <TelemetrySupervisorPanel/>
    <ConfidenceRiver/>
    <OpportunityGalaxy/>
    <CompanyDNA/>
    <CompanyWeather/>
    <RecoveryConstellation/>
    <RecoveryTimeline/>
    <RecoveryTimeMachine/>
  </div>
}
