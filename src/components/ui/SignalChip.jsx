import React from 'react';
export default function SignalChip({ signal }) {
  return <div className={`signalChip ${signal.type}`}>
    <b>{signal.key}</b><strong>{signal.value}</strong><span>{signal.meaning}</span>
  </div>
}
