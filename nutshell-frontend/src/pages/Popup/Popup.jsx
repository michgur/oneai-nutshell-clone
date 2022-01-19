import React from 'react';
import { RecoilRoot } from 'recoil';
import Footer from './components/footer';
import Header from './components/header';
import Main from './components/main';
import './Popup.css';

const Popup = () => {
  return (
    <RecoilRoot>
      <App />
    </RecoilRoot>
  );
};

function App() {
  return (
    <div className="app-wrapper bg-dark inset-0 h-full absolute px-4">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default Popup;
