import React from 'react';

export default function InfoHint({ title, children }) {
  return (
    <span className="info-hint" tabIndex="0" aria-label={title}>
      i
      <span className="info-pop">
        <strong>{title}</strong>
        <span>{children}</span>
      </span>
    </span>
  );
}
