import React from 'react';
import { render } from 'react-dom';
import './index.css';
import Popup from './Popup';

// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
  console.log('##################', tabs[0]);
  const url = tabs[0]?.url;
  if (url) {
    localStorage.setItem('OneAI_URL', url);
  }
  startApp(url);
});

const startApp = (url) => {
  render(<Popup url={url} />, window.document.querySelector('#app-container'));
};

if (module.hot) module.hot.accept();
