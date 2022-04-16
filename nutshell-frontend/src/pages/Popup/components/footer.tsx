import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-darkGray grid grid-cols-1fr items-center justify-items-center gap-x-4 p-4 py-3">
      <span className="text-white font-light items-center font-mono tracking-tighter">
        By{' '}
        <span className="text-cyan underline">
          <a
            href={'https://www.oneai.com/'}
            className="hover:opacity-50 duration-300"
          >
            OneAi.com
          </a>
        </span>
      </span>
    </footer>
  );
}
