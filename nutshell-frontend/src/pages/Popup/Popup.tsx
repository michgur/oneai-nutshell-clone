import React, { useEffect } from 'react';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import Footer from './components/footer';
import Header from './components/header';
import Main from './components/main';
import {
  htmlDocumentState,
  pageTitleAtom,
  urlState,
  userIDAtom,
} from './lib/atoms';
import DataBUS from './lib/data-bus';
import './Popup.css';

const Popup = () => {
  return (
    <RecoilRoot>
      <DataBUS />
      <App />
    </RecoilRoot>
  );
};

function App() {
  const setHtml = useSetRecoilState(htmlDocumentState);
  const setPageTitle = useSetRecoilState(pageTitleAtom);
  const setURL = useSetRecoilState(urlState);
  const setUserID = useSetRecoilState(userIDAtom);
  useEffect(() => {
    chrome.storage.sync.get(['USER_ID'], function (items) {
      console.debug('[Popup] user id:', items.USER_ID);
      setUserID(items.USER_ID);
    });
  }, []);
  useEffect(() => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        chrome.tabs.sendMessage(
          //@ts-ignore
          tabs[0].id,
          { from: 'popup', subject: 'DOMInfo' },
          (data) => {
            if (Boolean(data)) {
              setPageTitle(data.pageTitle);
              setHtml(data.html);
              setURL(data.url);
            }
          }
        );
      }
    );
  }, [setHtml, setURL]);

  return (
    <div className="app-wrapper bg-dark h-full">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default Popup;
