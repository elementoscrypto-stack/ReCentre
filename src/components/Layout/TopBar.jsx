import React from 'react';
export default function TopBar({ company, mode, setMode }) {
  return <header className="topbar">
    <div><p className="eyebrow">Company Pulse</p><h2>{company} Recovery Mission</h2></div>
    <div className="topActions">
      <button className="ghostBtn">Share Scan</button>
      <button className="ghostBtn">Export Board Memo</button>
      <button className="primaryBtn" onClick={() => setMode(mode === 'boardroom' ? 'cinematic' : 'boardroom')}>{mode === 'boardroom' ? 'Insane Visual Mode' : 'Boardroom Mode'}</button>
    </div>
  </header>
}
