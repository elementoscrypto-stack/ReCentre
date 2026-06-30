export function calculatePulse(input = {}) {
  const trust = input.trust ?? 74;
  const drift = input.drift ?? 18;
  const centre = input.centre ?? 82;
  const flow = input.flow ?? 81;
  const lock = input.lock ?? 92;
  const risk = Math.max(0, Math.round((drift * 0.8) + ((100 - trust) * 0.25) + ((100 - flow) * 0.15)));
  const recovery = Math.min(99, Math.round((trust * 0.3) + (centre * 0.35) + (flow * 0.2) + (lock * 0.15)));
  const level = Math.max(5, Math.min(15, Math.round(15 - recovery / 9)));
  return { trust, drift, centre, flow, lock, risk, recovery, level, target: 5 };
}

export const recoveryActions = [
  { name:'Reduce hardware friction', signal:'BUY + FLOW', impact:'+11 Trust', confidence:'84%' },
  { name:'Bundle family membership', signal:'ATTRACT + LOCK', impact:'+8 Retention', confidence:'81%' },
  { name:'Reframe around coaching', signal:'BUILD + TRUST', impact:'+9 Category Confidence', confidence:'86%' },
  { name:'Expand corporate wellness', signal:'DEAL + GROW', impact:'+7 Demand', confidence:'76%' }
];
