import React from 'react';
import close from '../../../assets/img/close.svg';
import logo from '../../../assets/img/logo.svg';
import { IconButton } from './button';

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
    <header className="flex flex-row justify-between w-full gap-x-8 p-4">
      <img src={logo} alt="logo" />
      <IconButton onClick={closeOnClick} ariaLabel="Close One AI nutshell">
        <img src={close} alt="close" />
      </IconButton>
    </header>
  );
}
