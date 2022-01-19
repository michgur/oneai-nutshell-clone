import React from 'react';

export function ExternalLink({ className, children }) {
  return (
    <a
      className={`text-cyan ${className}`}
      href="https://www.oneai.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
