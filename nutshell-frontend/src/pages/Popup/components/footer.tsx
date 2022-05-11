import React from 'react';
import openLogo from '../../../assets/img/logo-open.svg'
export default function Footer() {
  return (
    <footer className="bg-darkGray grid grid-cols-1fr items-center justify-items-center gap-x-4 p-4 py-3">
      <span className="grid grid-cols-auto-1fr gap-2 text-white font-light items-center font-mono tracking-tighter">
        By{' '}
        <span className="text-blue underline">
          <a
            target={'_blank'}
            href={'https://www.oneai.com/'}
            className="hover:text-cyan duration-300"
          >
            <img src={openLogo}/>
          </a>
        </span>
      </span>
    </footer>
  );
}
