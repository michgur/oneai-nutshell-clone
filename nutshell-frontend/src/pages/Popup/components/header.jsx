import React from 'react';
import logo from '../../../assets/img/logo.svg';

export default function Header() {
  return (
    <header className="grid grid-cols-2-auto w-fit gap-x-8 py-4">
      <img src={logo} alt="logo" />
      <h1 className="font-mono text-xl">One AI Nutshell</h1>
    </header>
  );
}
