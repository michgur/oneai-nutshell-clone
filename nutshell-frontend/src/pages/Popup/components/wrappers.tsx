import React from 'react';

export function Section({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return <div className={`grid ${className}`}>{children}</div>;
}
