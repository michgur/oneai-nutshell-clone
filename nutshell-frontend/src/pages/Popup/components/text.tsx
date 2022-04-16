import React from 'react';

export function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg w-fit font-poppins font-semibold">{children}</h2>
  );
}
