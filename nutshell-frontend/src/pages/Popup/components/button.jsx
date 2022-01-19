import React from 'react';

export function Button({ children, className, onClick = () => {} }) {
  return (
    <button className={`py-2 px-8 ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
