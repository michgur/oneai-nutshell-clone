import React from 'react';
import logo from '../../../assets/img/logo.svg';
import { IconButton } from './button';
import { CloseButtonIcon } from './icons';

export default function Header() {
  const closeOnClick = () => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs: any) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        from: 'popup',
        subject: 'toggle',
      });
    });
  };
  return (
    <header className="bg-darkGray flex flex-row justify-between w-full gap-x-8 p-4">
      <div className="grid grid-cols-3-auto gap-x-4 font-light items-center font-mono tracking-tighter" >
        <button onClick={closeOnClick}>
        <img width={49} src={logo} alt="logo" />
        </button>
        <span className="text-white">
        <span className="text-pink text-2xl">Nutshell</span>
        </span>
      </div>
      <IconButton
        onClick={closeOnClick}
        ariaLabel="Close One AI nutshell"
        className={'text-cyan hover:text-blue'}
      >
        <CloseButtonIcon />
      </IconButton>
    </header>
  );
}
