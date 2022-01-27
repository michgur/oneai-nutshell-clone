import React from 'react';
export function Button({ children, className, onClick = () => {} }: any) {
  return (
    <button className={`py-2 px-8 w-fit ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export function IconButton({
  children,
  className,
  onClick = () => {},
  dataTip,
  dataFor,
  ariaLabel,
}: any) {
  return (
    <button
      className={`p-2 w-fit rounded-full ease-in-out transition duration-300 hover:bg-buttonHover ${className}`}
      onClick={onClick}
      data-tip={dataTip}
      data-for={dataFor}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
