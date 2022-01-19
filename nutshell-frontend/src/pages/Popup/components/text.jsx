import React from 'react';

export function SectionHeader({ children }) {
  return (
    <h2 className="font-lg text-light bg-title rounded py-2 px-4 w-fit">
      {children}
    </h2>
  );
}
