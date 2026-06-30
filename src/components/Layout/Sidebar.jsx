import React from 'react';

const items = [
  ['pulse', 'Company Pulse', 'The living digital twin'],
  ['signals', 'Market Signals', 'Confidence entering and leaving'],
  ['supervisor', 'Telemetry Supervisor', 'The observing intelligence layer'],
  ['time', 'Recovery Horizon', 'The Time Machine'],
  ['engines', 'Recovery Engines', 'De-mark and recategorize'],
  ['intelligence', 'Executive Intelligence', 'Board-level next action'],
];

export default function Sidebar({ section, setSection }) {
  return (
    <aside className="sidebar">
      <div className="brand-mark">
        <div className="brand-core">R</div>
        <div>
          <div className="brand-name">ReCentre</div>
          <div className="brand-sub">Company Recovery OS</div>
        </div>
      </div>

      <nav className="side-nav">
        {items.map(([id, label, sub]) => (
          <button key={id} className={`nav-item ${section === id ? 'active' : ''}`} onClick={() => setSection(id)}>
            <span className="nav-dot" />
            <span>
              <strong>{label}</strong>
              <em>{sub}</em>
            </span>
          </button>
        ))}
      </nav>

      <div className="sidebar-card">
        <div className="tiny-label">Visitor guide</div>
        <p>Every panel explains what it is, why it matters, and what to do next.</p>
      </div>
    </aside>
  );
}
