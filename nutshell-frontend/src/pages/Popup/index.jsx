import React from 'react';
import { render } from 'react-dom';
import './index.css';
import Popup from './Popup';

chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
  const url = tabs[0]?.url;
  if (url) {
    localStorage.setItem('OneAI_URL', url);
  }
  startApp(url);
});

const startApp = (url) => {
  render(<Popup />, window.document.querySelector('#app-container'));
};

if (module.hot) module.hot.accept();
