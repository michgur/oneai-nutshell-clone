import React, { useEffect } from 'react';
import { RecoilRoot, useSetRecoilState } from 'recoil';
import Footer from './components/footer';
import Header from './components/header';
import Main from './components/main';
import { urlState } from './lib/atoms';
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
  const setURL = useSetRecoilState(urlState);
  useEffect(() => {
    setURL(url);
  }, [url]);
  return (
    <div className="app-wrapper bg-dark h-full">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default Popup;
