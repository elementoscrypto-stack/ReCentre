import React from 'react';

export default function WelcomeExperience({ onEnter }) {
  return (
    <main className="welcome">
      <div className="welcome-reactor">
        <div className="welcome-ring r1" />
        <div className="welcome-ring r2" />
        <div className="welcome-ring r3" />
        <div className="welcome-core">
          <span>ReCentre</span>
        </div>
        {['BUY', 'GAIN', 'FLOW', 'LOCK', 'TRUST', 'RECENTRE'].map((s, i) => (
          <b key={s} className={`welcome-signal s${i}`}>{s}</b>
        ))}
      </div>

      <div className="welcome-copy">
        <div className="eyebrow">The Operating System for Company Recovery</div>
        <h1>Every company drifts. ReCentre brings them back.</h1>
        <p>
          ReCentre turns business activity into living recovery intelligence. It observes market signals,
          detects strategic drift, explains what must be removed, forms stronger categories, and projects
          the decisions needed to return a company to a healthier position.
        </p>
        <div className="welcome-steps">
          <span>Observe</span>
          <span>Translate</span>
          <span>De-Mark</span>
          <span>Recategorize</span>
          <span>Project</span>
          <span>Recover</span>
        </div>
        <button className="primary-btn" onClick={onEnter}>Enter Company Pulse</button>
      </div>
    </main>
  );
}
