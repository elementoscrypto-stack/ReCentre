import React from 'react';

export default function Background() {
  return (
    <div className="bg-stage" aria-hidden="true">
      <div className="bg-grid" />
      <div className="bg-orb orb-a" />
      <div className="bg-orb orb-b" />
      <div className="bg-orb orb-c" />
      <div className="bg-noise" />
      <div className="bg-scanline" />
    </div>
  );
}
