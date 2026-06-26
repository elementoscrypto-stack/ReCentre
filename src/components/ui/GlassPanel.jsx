import React from 'react';
export default function GlassPanel({ children, className='', title, kicker }) {
  return <section className={`glass ${className}`}>
    {(title || kicker) && <div className="panelHead"><div>{kicker && <p className="eyebrow">{kicker}</p>}{title && <h3>{title}</h3>}</div></div>}
    {children}
  </section>
}
