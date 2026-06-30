import GlassPanel from '../ui/GlassPanel';
import FutureBranches from './FutureBranches';
import DecisionLedger from './DecisionLedger';
import ExecutiveForecast from './ExecutiveForecast';

export default function RecoveryTimeMachine(){return <GlassPanel className="time-machine"><div className="section-kicker">Recovery Horizon / Time Machine</div><h2>Project every move before making it.</h2><p className="muted">Every decision becomes a future branch. Every branch carries signal chains, confidence, cost and recovery contribution.</p><FutureBranches/><DecisionLedger/><ExecutiveForecast/></GlassPanel>}
