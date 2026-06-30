import React from 'react';

export default function GlassPanel({ children, className = '', id }) {
  return <section id={id} className={`glass-panel ${className}`}>{children}</section>;
}
