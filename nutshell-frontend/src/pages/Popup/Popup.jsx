import React, { useEffect } from 'react';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import Footer from './components/footer';
import Header from './components/header';
import Main from './components/main';
import { htmlDocumentState, urlState } from './lib/atoms';
import DataBUS from './lib/data-bus';
import './Popup.css';

const Popup = ({ url }) => {
  return (
    <RecoilRoot>
      <DataBUS />
      <App url={url} />
    </RecoilRoot>
  );
};

function App({ url }) {
  const setHtml = useSetRecoilState(htmlDocumentState);
  const setURL = useSetRecoilState(urlState);
  useEffect(() => {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      (tabs) => {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { from: 'popup', subject: 'DOMInfo' },
          (data) => {
            if (Boolean(data)) {
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
