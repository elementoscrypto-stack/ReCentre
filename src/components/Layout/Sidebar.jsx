import React from 'react';
const nav = ['Company Pulse','Telemetry Supervisor','Recovery Engine','Time Machine','Category Studio','Signal Graph','Executive Reports','AI Copilot'];
export default function Sidebar({ active }) {
  return <aside className="sidebar">
    <div className="brand"><div className="brandMark">R</div><div><h1>ReCentre</h1><p>Company Recovery OS</p></div></div>
    <nav>{nav.map(item => <button key={item} className={item===active?'navItem active':'navItem'}>{item}</button>)}</nav>
    <div className="sideCard"><span>Operating Thesis</span><b>Recover. Rebuild. ReCentre.</b><p>Telemetry supervises de-markation and category recovery.</p></div>
  </aside>
}
