import React from 'react';
import SignalChip from '../ui/SignalChip';
export default function MarketSignals({ signals }) {
  return <div className="signalRibbon">{signals.map(s => <SignalChip key={s.key} signal={s} />)}</div>
}
