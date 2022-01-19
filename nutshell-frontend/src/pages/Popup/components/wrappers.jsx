import React from 'react';

export function Section({ className, children }) {
  return <div className={`grid ${className}`}>{children}</div>;
}
