import React from 'react';

export function ExternalLink({ className, children }: any) {
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

export function IconLink({
  children,
  className,
  href,
  dataTip,
  dataFor,
  ariaLabel,
  onClick = () => {},
}: any) {
  return (
    <a
      className={`p-2 w-fit rounded-full ease-in-out transition duration-300 hover:bg-buttonHover ${className}`}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-tip={dataTip}
      data-for={dataFor}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
