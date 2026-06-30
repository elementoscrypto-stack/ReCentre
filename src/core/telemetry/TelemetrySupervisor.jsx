import { calculatePulse } from './RecoveryPhysics';

export function superviseCompany(input) {
  const pulse = calculatePulse(input);
  const directives = [];
  if (pulse.drift > 15) directives.push('De-Markation required: legacy category pressure detected');
  if (pulse.trust < 80) directives.push('Trust repair active: strengthen confidence signals');
  if (pulse.centre > 75) directives.push('Recategorization viable: recovery movement confirmed');
  if (pulse.lock > 85) directives.push('Retention layer strong: protect subscription loyalty');
  return { pulse, directives };
}

export default superviseCompany;
