import React from 'react';
import { render } from 'react-dom';
import './index.css';
import Popup from './Popup';

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  console.log('##################', tabs[0]);
  const url = tabs[0].url;
  startApp(url);
});

const startApp = (url) => {
  render(<Popup url={url} />, window.document.querySelector('#app-container'));
};

if (module.hot) module.hot.accept();
