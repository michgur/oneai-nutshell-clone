import React, { useState } from 'react';
import logo from '../../../assets/img/logo.svg';
import { ROOT_APP_ID } from '../lib/utils';
import { IconButton } from './button';
import { CloseButtonIcon } from './icons';

export default function Header() {
  const [closedClicked, setClosedClicked] = useState(false);

  const closeOnClick = () => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs: any) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        from: 'popup',
        subject: 'toggle',
      });
    });
    setClosedClicked(true);
  };
  const totalCloseOnClick = () => {
    setClosedClicked(true);
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs: any) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        from: 'popup',
        subject: 'totalClose',
      });
    });
  };
  return (
    <>
      <header className="bg-darkGray flex flex-row justify-between w-full gap-x-4 px-2 py-4">
        <div className="grid grid-cols-3-auto gap-x-4 font-light items-center font-mono tracking-tighter">
          <div className="showButton">
            {closedClicked && (
              <button
                className="absolute hover:text-pink p-1 mt-[-10px] ml-[-10px] showme"
                onClick={totalCloseOnClick}
              >
                <CloseButtonIcon />
              </button>
            )}
            <button onClick={closeOnClick}>
              <img width={29} src={logo} alt="logo" />
            </button>
          </div>
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
    </>
  );
}
